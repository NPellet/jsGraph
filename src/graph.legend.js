define( [], function() {


	var Legend = function( graph ) {

		this.graph = graph;
		this.svg = document.createElementNS(this.graph.ns, 'g');
		this.rect = document.createElementNS( this.graph.ns, 'rect' );

		this.rect.setAttribute( 'x', 0 );
		this.rect.setAttribute( 'y', 0 );

		this.pos = { x: undefined, y: undefined, transformX: 0, transformY: 0 }
		this.setEvents();
	};

	Legend.prototype = {

		update: function() {

			while( this.svg.hasChildNodes( ) ) {
    			this.svg.removeChild( this.svg.lastChild );
			}

			var series = this.graph.getSeries(),
				line,
				text,
				g;

				console.log( series );

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

				
				text = document.createElementNS(this.graph.ns, 'text');
				text.setAttribute('transform', 'translate(35, 3)');
				text.textContent = series[ i ].getLabel();
				
				g.appendChild( line );
				g.appendChild( text );
			}

			this.rect.setAttribute('width', 200);
			this.rect.setAttribute('height', series.length * 20 );
			this.rect.setAttribute('fill', 'none');
			this.rect.setAttribute('pointer-events', 'fill');
			this.rect.style.cursor = "move";

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
		}
	};

	return Legend;

} );