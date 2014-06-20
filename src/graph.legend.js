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

				g = document.createElementNS(this.graph.ns, 'g');
				g.setAttribute('transform', "translate(0, " + (i * 20 + 10) + ")" );

				this.svg.appendChild( g );

				line = document.createElementNS(this.graph.ns, 'line');
				series[ i ].applyLineStyle( line );

				line.setAttribute('x1', 0);
				line.setAttribute('x2', 30);
				line.setAttribute('y1', 0);
				line.setAttribute('y2', 0);


				if( series[ i ].markersShown() ) {
					var marker = document.createElementNS(this.graph.ns, 'path');
					series[ i ].setMarkerStyleTo( marker , true);
					marker.setAttribute('d', "M 15 0 " + series[ i ].getMarkerPath(series[ i ].options.markers.zoom + 1).join(" "));
				}

				text = document.createElementNS(this.graph.ns, 'text');
				text.setAttribute('transform', 'translate(35, 3)');
				text.textContent = series[ i ].getLabel();
				
				g.appendChild( line );

				if( series[ i ].markersShown() ) {
					g.appendChild( marker );	
				}
				
				g.appendChild( text );
			}

			this.rect.setAttribute('width', 200);
			this.rect.setAttribute('height', series.length * 20 );
			this.rect.setAttribute('fill', 'none');
			this.rect.setAttribute('pointer-events', 'fill');
			this.rect.style.cursor = "move";


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

			this.rect.addEventListener('mousedown', function( e ) {

				console.log( e );

				pos.x = e.clientX;
				pos.y = e.clientY;
				e.stopPropagation();
				e.preventDefault();
				self.mousedown = true;
				self.graph.annotationMoving( self );
			});

			this.rect.addEventListener('mousemove', function( e ) {
				
				self.handleMouseMove( e );
			});

		},

		handleMouseUp: function( e ) {

			e.stopPropagation();
			e.preventDefault();
			this.mousedown = false;

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