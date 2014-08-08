/* !
* Graphing JavaScript Library v0.3.0
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
			this._draggingX = x;
			this._draggingY = y;

			return true;
		},

		onMouseMove: function(graph, x, y, e, target) {
			var deltaX = x - this._draggingX;
			var deltaY = y - this._draggingY;

			graph.applyToAxes(function(axis) {
				axis.setCurrentMin(axis.getVal(axis.getMinPx() - deltaX));
				axis.setCurrentMax(axis.getVal(axis.getMaxPx() - deltaX));
			}, false, true, false);

			graph.applyToAxes(function(axis) {
				axis.setCurrentMin(axis.getVal(axis.getMinPx() - deltaY));
				axis.setCurrentMax(axis.getVal(axis.getMaxPx() - deltaY));
			}, false, false, true);

			this._draggingX = x;
			this._draggingY = y;

			graph.refreshDrawingZone(true);
			graph.drawSeries();
		}
	}

	return plugin;
});