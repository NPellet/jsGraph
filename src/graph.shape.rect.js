
define( [ 'require', './graph.shape' ], function( require, GraphShape ) {


	var GraphRect = function(graph) {
		this.init(graph);

		this.graph = graph;
		this.nbHandles = 4;

		this.createHandles( this.nbHandles, 'rect', { 
										transform: "translate(-3 -3)", 
										width: 6, 
										height: 6, 
										stroke: "black", 
										fill: "white"
									} );

		this.handle2.setAttribute('cursor', 'nesw-resize');
		this.handle4.setAttribute('cursor', 'nesw-resize');

		this.handle1.setAttribute('cursor', 'nwse-resize');
		this.handle3.setAttribute('cursor', 'nwse-resize');

	}

	$.extend(GraphRect.prototype, GraphShape.prototype, {
		
	
		createDom: function() {
			this._dom = document.createElementNS(this.graph.ns, 'rect');
		},

		setWidthPx: function(px) {		this.set('width', px);	},
		setHeightPx: function(px) {		this.set('height', px);	},
		setFullWidth: function() {
			this.set('x', Math.min(this.serie.getXAxis().getMinPx(), this.serie.getXAxis().getMaxPx()));
			this.set('width', Math.abs(this.serie.getXAxis().getMaxPx() - this.serie.getXAxis().getMinPx()));
		},
		setFullHeight: function() {
			this.set('y', Math.min(this.serie.getYAxis().getMinPx(), this.serie.getYAxis().getMaxPx()));
			this.set('height', Math.abs(this.serie.getYAxis().getMaxPx() - this.serie.getYAxis().getMinPx()));
		},


		setPosition: function() {

			var width = this.getFromData('width'),
				height = this.getFromData('height');

			var pos = this._getPosition( this.getFromData('pos') ),
							x = pos.x,
			y = pos.y;


			if(width == undefined || height == undefined) {
				var position2 = this._getPosition(this.getFromData('pos2'));
				width = position2.x - pos.x;
				height = position2.y - pos.y;
			} else {
				width = this.graph.getPxRel( width, this.serie.getXAxis( ) );
				height = this.graph.getPxRel( height, this.serie.getYAxis( ) );
			}

			// At this stage, x and y are in px

			x = pos.x,
			y = pos.y;

			if( width < 0 ) {		
				x += width;
				width *= -1;
			}

			if( height < 0 ) {		
				y += height;
				height *= -1;
			}


			if( x !== NaN && x !== false && y !== NaN && y !== false) {
				this.setDom('width', width);
				this.setDom('height', height);
				this.setDom('x', x);
				this.setDom('y', y);


				this.currentX = x;
				this.currentY = y;
				this.currentW = width;
				this.currentH = height;

				this.setHandles();
				

				return true;
			}

			return false;
		},

		redrawImpl: function() {

		},

		handleCreateImpl: function() {
			this.resize = true;
			this.handleSelected = 3;	
		},

		handleMouseDownImpl: function( e ) {

		},

		handleMouseUpImpl: function() {

		},

		handleMouseMoveImpl: function(e, deltaX, deltaY, deltaXPx, deltaYPx) {

			var w = this.getFromData('width') || 0;
			var h = this.getFromData('height') || 0;
			var pos = this.getFromData('pos');


			if( this.handleSelected == 1 ) {

				pos.x = this.graph.deltaPosition( pos.x, deltaX, this.serie.getXAxis( ) );
				pos.y = this.graph.deltaPosition( pos.y, deltaY, this.serie.getYAxis( ) );

				w = this.graph.deltaPosition( w, - deltaX, this.serie.getXAxis( ) );
				h = this.graph.deltaPosition( h, - deltaY, this.serie.getYAxis( ) );
			}


			if( this.handleSelected == 2 ) {

				pos.y = this.graph.deltaPosition( pos.y, deltaY, this.serie.getYAxis( ) );
				w = this.graph.deltaPosition( w, deltaX, this.serie.getXAxis() );
				h = this.graph.deltaPosition( h, - deltaY, this.serie.getYAxis() );
			}


			if( this.handleSelected == 3 ) {

				w = this.graph.deltaPosition( w, deltaX, this.serie.getXAxis() );
				h = this.graph.deltaPosition( h, deltaY, this.serie.getYAxis() );


			}


			if( this.handleSelected == 4 ) {

				pos.x = this.graph.deltaPosition( pos.x, deltaX, this.serie.getXAxis( ) );
				w = this.graph.deltaPosition( w, - deltaX, this.serie.getXAxis() );
				h = this.graph.deltaPosition( h, deltaY, this.serie.getYAxis() );
			}

			var wpx = this.graph.getPxRel( w, this.serie.getXAxis( ) );
			var hpx = this.graph.getPxRel( h, this.serie.getYAxis( ) );


			if( wpx < 0 ) {
				
				pos.x = this.graph.deltaPosition( pos.x, w );
				w = - w;

				if( this.handleSelected == 1 ) this.handleSelected = 2;
				else if( this.handleSelected == 2 ) this.handleSelected = 1;
				else if( this.handleSelected == 3 ) this.handleSelected = 4;
				else if( this.handleSelected == 4 ) this.handleSelected = 3;


			}


			if( hpx < 0 ) {
				pos.y = this.graph.deltaPosition( pos.y, h );
				h = - h;
			
				if( this.handleSelected == 1 ) this.handleSelected = 4;
				else if( this.handleSelected == 2 ) this.handleSelected = 3;
				else if( this.handleSelected == 3 ) this.handleSelected = 2;
				else if( this.handleSelected == 4 ) this.handleSelected = 1;	
			}


			this.setData('width', w);
			this.setData('height', h);
			this.setData('pos', pos);
			
			this.setPosition();

		},

		setHandles: function() {

			if( ! this._selected || this.currentX == undefined ) {
				return;
			}


			this.addHandles();
			

			this.handle1.setAttribute('x', this.currentX);
			this.handle1.setAttribute('y', this.currentY);


			this.handle2.setAttribute('x', this.currentX + this.currentW);
			this.handle2.setAttribute('y', this.currentY);

			this.handle3.setAttribute('x', this.currentX + this.currentW);
			this.handle3.setAttribute('y', this.currentY + this.currentH);

			this.handle4.setAttribute('x', this.currentX);
			this.handle4.setAttribute('y', this.currentY + this.currentH);

		},

		selectStyle: function() {
			this.setDom('stroke', 'red');
			this.setDom('stroke-width', '2');
			this.setDom('fill', 'rgba(255, 0, 0, 0.1)');
		}




















	});

	return GraphRect;

});