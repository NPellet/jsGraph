/* !
* Graphing JavaScript Library v0.3.1
* https://github.com/NPellet/graph
* 
* Copyright (c) 2014 Norman Pellet
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE.
* 
* Date: 08-08-2014
*/
define([], function() {

	"use strict";

	var plugin = function() { };

	plugin.prototype = {

		init: function( graph, options ) {
			
			this.options = options;
			this.shapeType = options.type;
			
		},

		setShape: function( shapeType ) {
			this.shapeInfo.shapeType = shapeType;
		},

		onMouseDown: function( graph, x, y, e, target ) {
				
			if( ! this.shapeType ) {
				return;
			}

			var self = this,
				selfPlugin = this;
				
			var xVal, yVal;

			this.count = this.count || 0;

			x -= graph.getPaddingLeft( ),
			y -= graph.getPaddingTop( ),

			xVal = graph.getXAxis().getVal( x );
			yVal = graph.getYAxis().getVal( y );

			var shapeInfo = {

				pos: {
					x: xVal, 
					y: yVal
				}, 

				pos2: {
					x: xVal,
					y: yVal
				},

				onChange: function(newData) {
					graph.triggerEvent('onAnnotationChange', newData);
				}
			};


			var shape = graph.makeShape( $.extend( shapeInfo, this.options ), {}, true ).then( function( shape ) {

				if( ! shape ) {
					return;
				}

				self.currentShape = shape;
				self.currentShapeEvent = e;
			
			} );

		},

		onMouseMove: function( graph, x, y, e ) {

			var self = this;

			if( self.currentShape ) {

				self.count ++;
				
				var shape = self.currentShape;
				self.currentShape = false;


				shape.handleCreateImpl( );

				if( shape.options && shape.options.onCreate ) {
					shape.options.onCreate.call( shape );
				}
				shape.draw( );
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