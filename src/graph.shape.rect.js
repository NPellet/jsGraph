
define( [ 'require', './graph.shape' ], function( require, GraphShape ) {


	var GraphRect = function(graph) {
		this.init(graph);
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
				return true;
			}

			return false;
		},


		redrawImpl: function() {

		},

		handleCreateImpl: function() {
			this.resize = true;
			this.resizingElement = 3;

			
		},

		handleMouseDownImpl: function( e ) {

		},

		handleMouseUpImpl: function() {

		},

		handleMouseMoveImpl: function(e, deltaX, deltaY, deltaXPx, deltaYPx) {

			var w = this.getFromData('width') || 0;
			var h = this.getFromData('height') || 0;
			var pos = this.getFromData('pos');


			if( this.resizingElement == 3 ) {

				w = this.graph.deltaPosition( w, deltaX, this.serie.getXAxis() );
				h = this.graph.deltaPosition( h, deltaY, this.serie.getYAxis() );
			}

			this.setData('width', w);
			this.setData('height', h);
			this.setData('pos', pos);
			
			this.setPosition();

		}




























	});

	return GraphRect;

});