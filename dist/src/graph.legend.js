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
define( [], function() {

	var legendDefaults = {
		frame: false,
		backgroundColor: 'transparent',
		frameWidth: 0,
		frameColor: 'transparent',
		paddingTop: 10,
		paddingLeft: 10,
		paddingBottom: 10,
		paddingRight: 10,

		movable: false
	}

	var Legend = function( graph, options ) {

		this.options = $.extend( {}, legendDefaults, options );

		this.graph = graph;
		this.svg = document.createElementNS(this.graph.ns, 'g');
		this.rect = document.createElementNS( this.graph.ns, 'rect' );
		this.rectBottom = document.createElementNS( this.graph.ns, 'rect' );

		this.rect.setAttribute( 'x', 0 );
		this.rect.setAttribute( 'y', 0 );

		this.rectBottom.setAttribute( 'x', 0 );
		this.rectBottom.setAttribute( 'y', 0 );

		this.pos = { x: undefined, y: undefined, transformX: 0, transformY: 0 }

		this.setEvents();

		this.applyStyle();
	};

	Legend.prototype = {

		setPosition: function( position, alignToX, alignToY ) {

			if( ! position ) {
				return;
			}
	
			var pos = this.graph.getPosition( position );
	
			if( alignToX == "right" ) {
				pos.x -= this.width;
			}

			if( alignToY == "bottom" ) {
				pos.y -= this.height;
			}
		
			this.pos.transformX = pos.x;
			this.pos.transformY = pos.y;
	
			this._setPosition();
		},

		update: function() {

			var self = this;
			this.applyStyle();

			while( this.svg.hasChildNodes( ) ) {
    			this.svg.removeChild( this.svg.lastChild );
			}


			this.svg.appendChild( this.rectBottom );

			var series = this.graph.getSeries(),
				line,
				text,
				g;

			

			for( var i = 0, l = series.length ; i < l ; i ++ ) {


				( function( j ) {

					var g, line, text;

					g = document.createElementNS(self.graph.ns, 'g');
					g.setAttribute('transform', "translate(0, " + (i * 16 + 10 + self.options.paddingTop) + ")" );

					self.svg.appendChild( g );

					var line = series[ j ].getSymbolForLegend();
					var marker = series[ j ].getMarkerForLegend();
					var text = series[ j ].getTextForLegend();

					g.appendChild( line );
					if( marker ) {
						g.appendChild( marker );	
					}
	
					g.appendChild( text );


					g.addEventListener('click', function( e ) {

						var serie = series[ j ];

						if( serie.isSelected() ) {
							
							serie.hide();
							self.graph.unselectSerie( serie );

						} else if( serie.isShown() ) {

							self.graph.selectSerie( serie );


						} else {
							serie.show();
	
						}
						
					} );

				}) ( i );
			}

			var bbox = this.svg.getBBox();

			this.width = bbox.width + this.options.paddingRight + this.options.paddingLeft;
			this.height = bbox.height + this.options.paddingBottom + this.options.paddingTop;

			this.rect.setAttribute('width', this.width );
			this.rect.setAttribute('height', this.height);
			this.rect.setAttribute('fill', 'none');
			this.rect.setAttribute('pointer-events', 'fill');

			this.rect.setAttribute('display', 'none');

			if( this.options.movable ) {
				this.rectBottom.style.cursor = "move";
			}

			this.rectBottom.setAttribute('width', this.width );
			this.rectBottom.setAttribute('height', this.height );
			
			this.rectBottom.setAttribute('x', bbox.x - this.options.paddingLeft );
			this.rectBottom.setAttribute('y', bbox.y - this.options.paddingTop );
			


			this.svg.appendChild( this.rect );
		},

		getDom: function() {
			return this.svg;
		},

		setEvents: function() {

			var self = this;
			var pos = this.pos;


			var mousedown = function( e ) {

				if( self.options.movable ) {
					pos.x = e.clientX;
					pos.y = e.clientY;
					e.stopPropagation();
					e.preventDefault();
					self.mousedown = true;
					self.graph.shapeMoving( self );

					self.rect.setAttribute('display', 'block');
				}
			};

			var mousemove = function( e ) {	
				self.handleMouseMove( e );
			}

			this.rectBottom.addEventListener('mousedown', mousedown);
			this.rectBottom.addEventListener('mousemove', mousemove);
			this.rect.addEventListener('mousemove', mousemove);
		},

		handleMouseUp: function( e ) {

			e.stopPropagation();
			e.preventDefault();
			this.mousedown = false;

			this.rect.setAttribute('display', 'none');

			this.graph.shapeStopMoving();
		},

		handleMouseMove: function( e ) {

			if( ! this.mousedown ) {
				return;
			}

			var pos = this.pos;

			var deltaX =  e.clientX - pos.x;
			var deltaY = e.clientY - pos.y;

			pos.transformX += deltaX;
			pos.transformY += deltaY;

			pos.x = e.clientX;
			pos.y = e.clientY;

			e.stopPropagation();
			e.preventDefault();

			this._setPosition();
		},

		_setPosition: function() {

			var pos = this.pos;
			this.svg.setAttribute('transform', 'translate(' + pos.transformX + ', ' + pos.transformY + ')');
		},

		applyStyle: function() {

			if( this.options.frame ) {
				this.rectBottom.setAttribute('stroke', this.options.frameColor );
				this.rectBottom.setAttribute('stroke-width', this.options.frameWidth + "px" );
			}

			this.rectBottom.setAttribute('fill', this.options.backgroundColor );

		}
	};

	return Legend;

} );