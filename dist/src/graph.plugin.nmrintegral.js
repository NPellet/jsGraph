/*Copyright by Norman Pellet @2013*/

define([], function() {

	return function() {

		init: function() {},
		
		onMouseDown: function(graph, x, y, e, target) {
			var self = graph;
			this.count = this.count || 0;
			x -= graph.getPaddingLeft(), xVal = graph.getXAxis().getVal(x);
			var color = Util.getNextColorRGB(this.count, 100);

			graph.makeShape({

				type: 'nmrintegral', 
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

			}, {}, true).then( function( shape ) {

				if(!shape) {
					return;
				}

				this.count++;

				shape.handleMouseDown(e, true);
				shape.draw();
			});

		}
	}
});

