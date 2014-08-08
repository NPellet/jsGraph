/* !
* Graphing JavaScript Library v0.2.0
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