
define( [ 'require', './graph.shape' ], function( require, GraphShape ) {


	var GraphRect = function(graph) {
		this.init(graph);

		this.graph = graph;

		this.createHandles( 4, 'rect', { 
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
		
		createHandles: function( nb, type, attr ) {

			var self = this;

			for( var i = 1; i <= nb; i ++ ) {

				( function( j ) {

					self['handle' + j ] = document.createElementNS(self.graph.ns, type);

					for( var k in attr ) {
						self['handle' + j ].setAttribute( k, attr[ k ] );
					}

					self[ 'handle' + j ].addEventListener( 'mousedown', function(e) {

						console.log( e );

						e.preventDefault();
						e.stopPropagation();
						
						self.handleSelected = j;
						self.handleMouseDown( e );
					} );

				} ) ( i );
				
			}
		},

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

			if(width < 0) {
				x = x + width;
				width = - width;
			}

			if(height < 0) {
				y = y + height;
				height = - height;
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

			this.setData('width', w);
			this.setData('height', h);
			this.setData('pos', pos);
			
			this.setPosition();

		},




		select: function() {

			this._selected = true;
			this.selectStyle();
			this.graph.selectShape(this);
		},

		unselect: function() {

			if( this.handlesInDom ) {

				this.handlesInDom = false;
				this.group.removeChild(this.handle1);
				this.group.removeChild(this.handle2);
				this.group.removeChild(this.handle3);
				this.group.removeChild(this.handle4);
			}
			
		},

		setHandles: function() {

			if( ! this._selected || this.currentX == undefined ) {
				return;
			}

			if( ! this.handlesInDom ) {

				this.handlesInDom = true;
				this.group.appendChild(this.handle1);
				this.group.appendChild(this.handle2);
				this.group.appendChild(this.handle3);
				this.group.appendChild(this.handle4);
			}


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