define( [], function() {

	var legendDefaults = {
		frame: false,
		backgroundColor: 'transparent',
		frameWidth: 0,
		frameColor: 'transparent'
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
	};

	Legend.prototype = {

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

					g = document.createElementNS(self.graph.ns, 'g');
					g.setAttribute('transform', "translate(0, " + (i * 20 + 10) + ")" );

					self.svg.appendChild( g );

					line = document.createElementNS(self.graph.ns, 'line');
					series[ j ].applyLineStyle( line );

					line.setAttribute('x1', 0);
					line.setAttribute('x2', 30);
					line.setAttribute('y1', 0);
					line.setAttribute('y2', 0);

					line.setAttribute('cursor', 'pointer');

					if( series[ j ].markersShown() ) {
						var marker = document.createElementNS(self.graph.ns, 'path');
						series[ j ].setMarkerStyleTo( marker , true);
						marker.setAttribute('d', "M 15 0 " + series[ i ].getMarkerPath(series[ i ].options.markers.zoom + 1).join(" "));
					}

					text = document.createElementNS(self.graph.ns, 'text');
					text.setAttribute('transform', 'translate(35, 3)');
					text.setAttribute('cursor', 'pointer');
					text.textContent = series[ j ].getLabel();
					
					g.appendChild( line );

					if( series[ j ].markersShown() ) {
						g.appendChild( marker );	
					}
					
					g.appendChild( text );


					g.addEventListener('click', function( e ) {

						var serie = series[ j ];

						if( serie.isSelected() ) {
							
							serie.hide();

							line.setAttribute('opacity', 0.5);
							text.setAttribute('opacity', 0.5);

							self.graph.unselectSerie( serie );
							series[ j ].applyLineStyle( line );

						} else if( serie.isShown() ) {

							self.graph.selectSerie( serie );
							series[ j ].applyLineStyle( line );

						} else {
							serie.show();

							line.setAttribute('opacity', 1);
							text.setAttribute('opacity', 1);
							
						}
						
					} );

				}) ( i );
			}

			this.rect.setAttribute('width', 200);
			this.rect.setAttribute('height', series.length * 20 );
			this.rect.setAttribute('fill', 'none');
			this.rect.setAttribute('pointer-events', 'fill');
			this.rect.setAttribute('display', 'none');
			this.rectBottom.style.cursor = "move";

			this.rectBottom.setAttribute('width', 200);
			this.rectBottom.setAttribute('height', series.length * 20 );
			
			this.svg.appendChild( this.rect );
		},

		getDom: function() {
			return this.svg;
		},

		setEvents: function() {

			var self = this;
			var pos = this.pos;

			var mousedown = function( e ) {
				pos.x = e.clientX;
				pos.y = e.clientY;
				e.stopPropagation();
				e.preventDefault();
				self.mousedown = true;
				self.graph.annotationMoving( self );

				self.rect.setAttribute('display', 'block');
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

			this.graph.annotationStopMoving();
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