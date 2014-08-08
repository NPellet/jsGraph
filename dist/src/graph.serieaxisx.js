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

define( ['require', 'graphs/graph.serieaxis'], function( require, GraphSerieAxis ) {

	var GraphSerieAxisX = function() {};
	$.extend(GraphSerieAxisX.prototype, GraphSerieAxis.prototype, {	
		
		getY: function(value) {
			var y = - Math.round(1000 * (((value - this.minY) / (this.maxY - this.minY)))) / 1000  * (this.axis.totalDimension - this.axis._widthLabels) - this.axis._widthLabels;
			return y;
		},

		getX: function(value) {
			//console.log(value, this.axis.getActualMin())
			var x = Math.round(1000*(((value - this.axis.getActualMin()) / (this.axis._getActualInterval())) * (this.axis.getMaxPx() - this.axis.getMinPx()) + this.axis.getMinPx())) / 1000;	
			//if((this.axis.isFlipped() && (x < this.axis.getMaxPx() || x > this.axis.getMinPx())) || (!this.axis.isFlipped() && (x > this.axis.getMaxPx() || x < this.axis.getMinPx())))
			//	return;
			return x;
		},

		bindLabelHandlers: function(label) {
			var self = this;

			function clickHandler(e) {
				if(self.axis.currentAction !== false)
					return;
				self.axis.currentAction = 'labelDragging';
				e.stopPropagation();
				label.dragging = true;
				var coords = self.graph.getXY(e);
				label.draggingIniX = coords.x;
				label.draggingIniY = coords.y;
				self.labelDragging = label;
			}


			function clickHandlerMain(e) {
				if(self.axis.currentAction !== false)
					return;
				self.axis.currentAction = 'labelDraggingMain';
				e.preventDefault();
				e.stopPropagation();
				self.labelDragging = label;
			}
			
			label.labelDom.addEventListener('mousedown', clickHandler);
			label.rect.addEventListener('mousedown', clickHandler);
			label.rect.addEventListener('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
			});

			label.labelDom.addEventListener('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
			});


			label.path.addEventListener('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
			});

			label.path.addEventListener('mousedown', clickHandlerMain);
		}
	});

	return GraphSerieAxisX;

});