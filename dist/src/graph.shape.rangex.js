/* !
* Graphing JavaScript Library v0.4.0
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
* Date: 09-08-2014
*/


define( [ 'require', 'graphs/graph.shape.areaundercurve' ], function( require, GraphSurfaceUnderCurve ) {

	var GraphRangeX = function(graph) { this.init(graph); };
	$.extend(GraphRangeX.prototype, GraphSurfaceUnderCurve.prototype, {

		createDom: function() {
			this._dom = document.createElementNS(this.graph.ns, 'rect');
			this._dom.setAttribute('class', 'rangeRect');
			this._dom.setAttribute('cursor', 'move');
			this.handle1 = this._makeHandle();
			this.handle2 = this._makeHandle();
			
			this.setDom('cursor', 'move');
			this.doDraw = undefined;	
		},

		setPosition: function() {
			var posXY = this._getPosition(this.getFromData('pos')),
				posXY2 = this._getPosition(this.getFromData('pos2'), this.getFromData('pos')),
				w = Math.abs(posXY.x - posXY2.x),
				x = Math.min(posXY.x, posXY2.x);
			this.reversed = x == posXY2.x;

			if(w < 2 || x + w < 0 || x > this.graph.getDrawingWidth()) {
				return false;
			}

			this.group.appendChild(this.handle1);
			this.group.appendChild(this.handle2);

			this.handle1.setAttribute('transform', 'translate(' + (x - 6) + " " + ((this.graph.getDrawingHeight() - this.graph.shift[0]) / 2 - 10) + ")");
			this.handle2.setAttribute('transform', 'translate(' + (x + w - 6) + " " + ((this.graph.getDrawingHeight() - this.graph.shift[0]) / 2 - 10) + ")");
			this.setDom('x', x);
			this.setDom('width', w);
			this.setDom('y', 0);
			this.setDom('height', this.graph.getDrawingHeight() - this.graph.shift[0]);

			return true;
		},

		_makeHandle: function() {


			var rangeHandle = document.createElementNS(this.graph.ns, 'g');
			rangeHandle.setAttribute('id', "rangeHandle" + this.graph._creation);
			var r = document.createElementNS(this.graph.ns, 'rect');
			r.setAttribute('rx', 0);
			r.setAttribute('ry', 0);
			r.setAttribute('stroke', 'black');
			r.setAttribute('fill', 'white');

			r.setAttribute('width', 10);
			r.setAttribute('height', 20);
			r.setAttribute('x', 0);
			r.setAttribute('y', 0);
			r.setAttribute('shape-rendering', 'crispEdges');
			r.setAttribute('cursor', 'ew-resize');
			rangeHandle.appendChild(r);

			var l = document.createElementNS(this.graph.ns, 'line');
			l.setAttribute('x1', 4);
			l.setAttribute('x2', 4);
			l.setAttribute('y1', 4);
			l.setAttribute('y2', 18);
			l.setAttribute('stroke', 'black');
			l.setAttribute('shape-rendering', 'crispEdges');
			l.setAttribute('cursor', 'ew-resize');
			rangeHandle.appendChild(l);

			var l = document.createElementNS(this.graph.ns, 'line');
			l.setAttribute('x1', 6);
			l.setAttribute('x2', 6);
			l.setAttribute('y1', 4);
			l.setAttribute('y2', 18);
			l.setAttribute('stroke', 'black');
			l.setAttribute('shape-rendering', 'crispEdges');
			l.setAttribute('cursor', 'ew-resize');
			rangeHandle.appendChild(l);

			return rangeHandle;
		}
	});

	return GraphRangeX;
});