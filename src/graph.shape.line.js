
define( [ 'require', './graph.shape' ], function( require, GraphShape ) {


	var GraphLine = function(graph) {
		this.init(graph);
	}
	$.extend(GraphLine.prototype, GraphShape.prototype, {
		createDom: function() {
			this._dom = document.createElementNS(this.graph.ns, 'line');
		},

		setPosition: function() {
			var position = this._getPosition(this.getFromData('pos'));
			if(!position.x || !position.y)
				return;
			this.setDom('x2', position.x);
			this.setDom('y2', position.y);
			return true;
		},

		setPosition2: function() {
			var position = this._getPosition(this.getFromData('pos2'), this.getFromData('pos'));
			if(!position.x || !position.y)
				return;
			this.setDom('x1', position.x);
			this.setDom('y1', position.y);
		},

		redrawImpl: function() {
			this.setPosition();
			this.setPosition2();
		}
	});

	return GraphLine;

});