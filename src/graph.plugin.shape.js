define([], function() {

	"use strict";

	var plugin = function() { };

	plugin.prototype = {


		init: function( graph, options ) {

			this.shapeType = options.shapeType;

		},
		
		onMouseDown: function(graph, x, y, e, target) {
			
			var self = this,
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
					graph.triggerEvent('onAnnotationChange', newData);
				}

			}, {}, true ).then( function( shape ) {

				if( ! shape ) {
					return;
				}

				self.currentShape = shape;
				console.log(self.currentShape);
				self.currentShapeEvent = e;
				
			} );

		},

		onMouseMove: function( graph, x, y, e ) {

			var self = this;

			if( self.currentShape ) {

				self.count ++;
				
				var shape = self.currentShape;
				self.currentShape = false;

				shape.draw( );				
				shape.handleCreateImpl();
				shape.select();

				shape.handleMouseDown( self.currentShapeEvent, true );
				shape.handleMouseMove( e, true );
			}
		},

		onMouseUp: function( ) {
			var self = this;
			if( self.currentShape ) {
				self.currentShape.kill();
				self.currentShape = false;
			}
		}

	}

	return plugin;

});