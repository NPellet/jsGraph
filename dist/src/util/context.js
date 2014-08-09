/* !
* Graphing JavaScript Library v0.3.1
* https://github.com/NPellet/graph
* 
* Copyright (c) 2014 Norman Pellet
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE.
* 
* Date: 08-08-2014
*/

// Context menu
define( [ 'jquery', 'jqueryui' ], function( $ ) {

	var contextMenu;

	var contextMenu = function() {

		this.contextMenu;

	};

	contextMenu.prototype = {


		listen: function(dom, elements, onBeforeShow, onAfterShow) {
			var self = this;
			if(!(elements[0] instanceof Array))
				elements = [elements];
			
			dom.addEventListener('contextmenu', function(e) {	
				

				if( onBeforeShow ) {
					onBeforeShow( self.contextMenu );
				}

				for(var i = 0, l = elements.length; i < l; i++) {
					( 
						function(element, callbackClick, callbackOpen) {

							if( ( callbackOpen && callbackOpen( e, element ) ) || ! callbackOpen ) {
								self.contextMenu.append( element );
							}

							element.bind('click', function( e2 ) {

								if( callbackClick ) {

									callbackClick.call( this, e, e2 );
								}
							})

						}
					) ( $( elements[ i ][ 0 ] ), elements[ i ][ 1 ], elements[ i ][ 2 ] );
				}

				if( onAfterShow ) {
					onAfterShow( self.contextMenu );
				}

			}, true);
		},

		unlisten: function(dom) {
			dom.removeEventListener('contextmenu');
		},

		getRootDom: function() {
			return this.dom;
		},
		
		init: function(dom) {

			if( this.initialized ) {
				return;
			}

			this.initialized = true;
			var self = this;
			this.dom = dom;
			var top, left;
			dom.addEventListener('contextmenu', function(e) {

				//e.preventDefault();
				if( self.contextMenu ) {
					if( self.contextMenu.hasClass('ui-menu') ) {
						self.contextMenu.menu('destroy')
					}
					self.contextMenu.remove();
				} 

				self.contextMenu = null;
				top = e.pageY;
				left = e.pageX;
				var $menu = $('<ul class="ci-contextmenu"></ul>').css({
					'position': 'absolute',
					'left': left,
					'top': top,
					'z-index': 10000
				}).appendTo($("body"));

				self.contextMenu = $menu;

				var clickHandler = function() {
					
					//e.preventDefault();
					if( self.contextMenu ) {
						if( self.contextMenu.hasClass('ui-menu') ) {
							self.contextMenu.menu('destroy')
						}
						self.contextMenu.remove();
					} 

					self.contextMenu = null;
					$(document).unbind('click', clickHandler);
				}

				var rightClickHandler = function() {
					
					//e.preventDefault();
					if( self.contextMenu ) {
						if( self.contextMenu.hasClass('ui-menu') ) {
							self.contextMenu.menu('destroy')
						}
						self.contextMenu.remove();
					} 

					self.contextMenu = null;
				}
				
				$(document).bind('click', clickHandler);
		//		return false;

			}, true);


			dom.parentNode.addEventListener('contextmenu', function(e) {
				

				//contextMenu.height(contextMenu.height(document.documentElement.clientHeight))

				//console.log( contextMenu );
				if( self.contextMenu.children().length > 0 ) {
					self.contextMenu.menu({
						select: function(event, ui) {
							
						}
					});

					e.preventDefault();
					e.stopPropagation();
					
									// Move the menu if it would go beyond the viewport
				var height = self.contextMenu.height();
				var width = self.contextMenu.width();
				var clientH = document.documentElement.clientHeight;
				var clientW = document.documentElement.clientWidth;
				if(top+height>clientH) {
					self.contextMenu.css("top", Math.max(0, clientH-height-10));
				}
				if(left+width>clientW) {
					self.contextMenu.css("left", Math.max(0, clientW-width-10));
				}
					
					return false;
				}
				
			}, false);
		}


	}

	return contextMenu;
});
