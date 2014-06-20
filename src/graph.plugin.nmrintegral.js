
define([], function() {

	return {

		init: function() {},
		
		onMouseDown: function(graph, x, y, e, target) {
			var self = graph;
			this.count = this.count || 0;
			x -= graph.getPaddingLeft(), xVal = graph.getXAxis().getVal(x);
			var color = Util.getNextColorRGB(this.count, 100);

			var shape = graph.makeShape({
					type: 'GraphNMRIntegral', 
					pos: {
						x: xVal, 
						y: 0
					}, 
					pos2: {
						x: xVal,
						y: 0
					},
					fillColor: 'transparent',
					strokeColor: 'rgba(' + color + ', 0.9)',
				
					onChange: function(newData) {
						self.triggerEvent('onAnnotationChange', newData);
					}
			}, {}, true);

			if(!shape) {
				return;
			}

			this.count++;

			shape.handleMouseDown(e, true);
			shape.draw();
		}
	}
});

