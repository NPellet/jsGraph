define([], function() {

	var plugin = function() { };

	plugin.prototype = {

		init: function( graph, options ) {

			this.shapeType = options.shapeType;

		},
		
		onMouseDown: function(graph, x, y, e, target) {
			
			var self = graph,
				selfPlugin = this;
				
			var xVal, yVal;

			this.count = this.count || 0;

			x -= graph.getPaddingLeft( ),
			y -= graph.getPaddingTop( ),

			xVal = graph.getXAxis().getVal( x );
			yVal = graph.getYAxis().getVal( y );

			//var color = Util.getNextColorRGB(this.count, 100);
			var color = [100, 100, 100];

			var shape = graph.makeShape( {

				type: this.shapeType,
				pos: {
					x: xVal, 
					y: yVal
				}, 
				pos2: {
					x: xVal,
					y: yVal
				},
				fillColor: 'rgba(' + color + ', 0.3)',
				strokeColor: 'rgba(' + color + ', 0.9)',
			
				onChange: function(newData) {
					self.triggerEvent('onAnnotationChange', newData);
				}

			}, {}, true ).then( function( shape ) {

				shape.handleCreateImpl();

				if( ! shape ) {
					return;
				}

				self.count ++;
				shape.handleMouseDown( e, true );
				shape.draw( );
			} );

		}
	

	}

	return plugin;

});