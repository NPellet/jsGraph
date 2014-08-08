/* !
* Graphing JavaScript Library v0.3.0
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
define( [], function() {

	var toolbarDefaults = {
		
		buttons: [ 'none', 'rect', 'line', 'areaundercurve' ]
	

	}


	var ns = 'http://www.w3.org/2000/svg';
	var nsxlink = "http://www.w3.org/1999/xlink";
	
	function makeSvg() {
		var dom = document.createElementNS(ns, 'svg');
		dom.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
		dom.setAttribute('xmlns', ns);

		
		return dom;
	}
	

	function makeSvgLine() {

		var dom = makeSvg();

		var line = document.createElementNS( ns, 'line');
		line.setAttribute('x1', 16);
		line.setAttribute('y1', 3);
		line.setAttribute('x2', 4);
		line.setAttribute('y2', 15);

		line.setAttribute('stroke', '#aa0000');
		

		

		dom.appendChild( line );
		return dom;
	}



	function makeSvgRect() {

		var dom = makeSvg();
		var line = document.createElementNS( ns, 'rect');
		line.setAttribute('x', 4);
		line.setAttribute('y', 4);
		line.setAttribute('width', 12);
		line.setAttribute('height', 12);
		line.setAttribute('stroke', 'black');
		line.setAttribute('fill', '#dd0000');

		dom.appendChild( line );
		return dom;
	}


	function makeSvgAUC() {

		var pathD = "M 4,18 C 8,10 14,1 18,18";

		var dom = makeSvg();
		var path1 = document.createElementNS( ns, 'path' );
		path1.setAttribute('d', pathD);
		path1.setAttribute('stroke', "black");
		path1.setAttribute('fill', "transparent");

		var path2 = document.createElementNS( ns, 'path' );
		path2.setAttribute('d', pathD + " Z");
		path2.setAttribute('stroke', "red");
		path2.setAttribute('fill', "rgba(255, 0, 0, 0.1)");


		dom.appendChild( path2 );
		dom.appendChild( path1 );

		return dom;

	}


	var Toolbar = function( graph, options ) {

		var self = this;

		this.options = $.extend( true, {}, toolbarDefaults, options );
		this.graph = graph;
		this.div = $("<ul />").addClass('graph-toolbar');

		this.graph.getPlugin( 'graphs/graph.plugin.shape').then( function( plugin ) {

			self.plugin = plugin;

			if( ! self.plugin ) {
				return;
			}

			self.div.on('click', 'li', function( ) {

				var shape = $(this).attr('data-shape');
				self.plugin.setShape( shape );

				$(this).parent().children().removeClass('selected');
				$(this).addClass('selected');
			});


			self.makeButtons();
		});
	};

	Toolbar.prototype = {

		makeButtons: function() {

			var self = this;
			for( var i = 0, l = this.options.buttons.length ; i < l ; i ++ ) {

				this.div.append( this.makeButton( this.options.buttons[ i ] ) );
			}
		},

		makeButton: function( button ) {

			var div = $("<li />");
			switch( button ) {

				case 'line':
					div
						.html( makeSvgLine( ) )
						.attr('data-shape', 'line');
				break;

				case 'rect':
					div
						.html( makeSvgRect( ) )
						.attr('data-shape', 'rect');
				break;


				case 'areaundercurve':
					div
						.html( makeSvgAUC( ) )
						.attr('data-shape', 'areaundercurve');
				break;
			}

			return div;
		},

		getDom: function() {
			return this.div;
		}

	};

	return Toolbar;

} );