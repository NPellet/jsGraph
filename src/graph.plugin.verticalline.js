
define( [], function() {

	return function() {

		init: function(graph) {
			var self = this;
			self.graph = graph;
			if(require) {
				require(['src/util/context'], function(Context) {
					Context.listen(graph._dom, [
						['<li><a><span class="ui-icon ui-icon-cross"></span> Add vertical line</a></li>', 
						function(e) {
							self.addLine(e);
						}]
					]);
				});
			}

		},


		addLine: function(e) {

			var self = this;
			this.count = this.count || 0;

			var coords = this.graph.getXY(e),
				x = this.graph.getXAxis().getVal(coords.x - this.graph.getPaddingLeft()),
				color = Util.getNextColorRGB(this.count, 10);

			var shape = this.graph.makeShape({
				type: 'verticalLine', 
				pos: {
					x: x, 
					y: 0
				}, 
				
				fillColor: 'rgba(' + color + ', 0.3)',
				strokeColor: 'rgba(' + color + ', 0.9)',
			
				onChange: function(newData) {
					self.graph.triggerEvent('onAnnotationChange', newData);
				}
			}, {}, true);

			if(!shape)
				return;

			this.count++;

	//		shape.handleMouseDown(e, true);
			shape.draw();
			shape.redraw();

		}
	}

});