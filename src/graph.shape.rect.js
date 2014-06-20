
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
			}

			if(width < 0) {
				x = x - width;
				width = - width;
			}

			if(height < 0) {
				y = y - height;
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

		}
	});

	return GraphRect;

});