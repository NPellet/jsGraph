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
define( [ 'require', 'graphs/graph.serieaxis' ], function( require, GraphSerieAxis ) {

	var GraphSerieAxisY = function() {};
	$.extend(GraphSerieAxisY.prototype, GraphSerieAxis.prototype, {
		
		getX: function(value) {
			
			var x = - Math.round(1000 * (((value - this.minY) / (this.maxY - this.minY)))) / 1000  * (this.axis.totalDimension - this.axis._widthLabels) - this.axis._widthLabels - 5;
			return x;
		},

		getY: function(value) {
			
			var y = Math.round(1000*(((value - this.axis.getActualMin()) / (this.axis._getActualInterval())) * (this.axis.getMaxPx() - this.axis.getMinPx()) + this.axis.getMinPx())) / 1000;
			//if((this.axis.isFlipped() && y < this.axis.getMaxPx() || y > this.axis.getMinPx()) || (!this.axis.isFlipped() && (y > this.axis.getMaxPx() || y < this.axis.getMinPx())))
		//		return;
			return y;
		},


		getMinX: function() {
			return this.minY;
		},

		getMaxX: function() {
			return this.maxY;
		},

		getMinY: function() {
			return this.minX;
		},

		getMaxY: function() {
			return this.maxX;
		}

	});


	return GraphSerieAxisY;

});