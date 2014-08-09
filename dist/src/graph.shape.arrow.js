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

define( [ 'require', 'graphs/graph.shape.line' ], function( require, GraphLine ) {

	var GraphArrow = function(graph) {
		this.init(graph);
	}

	$.extend(GraphArrow.prototype, GraphLine.prototype, {
		createDom: function() {
			this._dom = document.createElementNS(this.graph.ns, 'line');
			this._dom.setAttribute('marker-end', 'url(#arrow' + this.graph._creation + ')');
		}
	});

	var GraphShapeVerticalLine = function(graph) { this.init(graph); };
	$.extend(GraphShapeVerticalLine.prototype, GraphLine.prototype, {

		initImpl: function() {
			this._dom.style.cursor = 'ew-resize';
		},

		setEvents: function() {
			var self = this;
			this._dom.addEventListener('mousedown', function(e) {
				e.preventDefault();
				e.stopPropagation();
				self.handleMouseDown(e);
			});

			this._dom.addEventListener('mousemove', function(e) {
				e.preventDefault();
				e.stopPropagation();
				self.handleMouseMove(e);
			});

			this._dom.addEventListener('mouseup', function(e) {
				e.preventDefault();
				e.stopPropagation();
				self.handleMouseUp(e);
			});
		},

		handleMouseDown: function(e) {
			this.moving = true;
			this.graph.shapeMoving(this);
			this.coordsI = this.graph.getXY(e);
		},

		handleMouseMove: function(e) {
			if(!this.moving)
				return;
			var coords = this.graph.getXY(e),
				delta = this.graph.getXAxis().getRelPx(coords.x - this.coordsI.x),
				pos = this.getFromData('pos');
				pos.x += delta;

			this.coordsI = coords;
			this.setPosition();
/*
			if(this.graph.options.onVerticalTracking)
				this.options.onVerticalTracking(line.id, val, line.dasharray);*/
		},

		handleMouseUp: function() {
			this.moving = false;
			this.triggerChange();
		},

		setPosition: function() {
			
			var position = this._getPosition(this.getFromData('pos'));
			this.setDom('x1', position.x);
			this.setDom('x2', position.x);
			this.setDom('y1', this.graph.getYAxis().getMinPx());
			this.setDom('y2', this.graph.getYAxis().getMaxPx());
		},

		setPosition2: function() {}
	})

	return GraphArrow;

});