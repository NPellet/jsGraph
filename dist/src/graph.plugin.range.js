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

	var plugin = function() {};

	plugin.prototype = {

		init: function() {},
	
		onMouseDown: function(graph, x, y, e, target) {
			var self = graph;
			this.count = this.count || 0;
			if(this.count == graph.options.rangeLimitX)
				return;
			x -= graph.getPaddingLeft(), xVal = graph.getXAxis().getVal( x );

			var shape = graph.makeShape({type: 'rangeX', pos: {x: xVal, y: 0}, pos2: {x: xVal, y: 0}}, {
				onChange: function(newData) {
					self.triggerEvent('onAnnotationChange', newData);
				}
			}, true);

			if(require) {
				require(['src/util/context'], function(Context) {
					Context.listen(shape._dom, [
						[ '<li><a><span class="ui-icon ui-icon-cross"></span> Remove range zone</a></li>', 
						function(e) {
							shape.kill();
						} ]
					]);
				});
			}

			var color = Util.getNextColorRGB(this.count, graph.options.rangeLimitX);
			
			shape.set('fillColor', 'rgba(' + color + ', 0.3)');
			shape.set('strokeColor', 'rgba(' + color + ', 0.9)');
			this.count++;
			shape.handleMouseDown(e, true);
			shape.draw();
		}
	}


	return plugin;
});
