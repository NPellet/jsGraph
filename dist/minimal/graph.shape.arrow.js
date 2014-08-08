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
define(["require","graphs/graph.shape.line"],function(t,e){var i=function(t){this.init(t)};$.extend(i.prototype,e.prototype,{createDom:function(){this._dom=document.createElementNS(this.graph.ns,"line"),this._dom.setAttribute("marker-end","url(#arrow"+this.graph._creation+")")}});var o=function(t){this.init(t)};return $.extend(o.prototype,e.prototype,{initImpl:function(){this._dom.style.cursor="ew-resize"},setEvents:function(){var t=this;this._dom.addEventListener("mousedown",function(e){e.preventDefault(),e.stopPropagation(),t.handleMouseDown(e)}),this._dom.addEventListener("mousemove",function(e){e.preventDefault(),e.stopPropagation(),t.handleMouseMove(e)}),this._dom.addEventListener("mouseup",function(e){e.preventDefault(),e.stopPropagation(),t.handleMouseUp(e)})},handleMouseDown:function(t){this.moving=!0,this.graph.shapeMoving(this),this.coordsI=this.graph.getXY(t)},handleMouseMove:function(t){if(this.moving){var e=this.graph.getXY(t),i=this.graph.getXAxis().getRelPx(e.x-this.coordsI.x),o=this.getFromData("pos");o.x+=i,this.coordsI=e,this.setPosition()}},handleMouseUp:function(){this.moving=!1,this.triggerChange()},setPosition:function(){var t=this._getPosition(this.getFromData("pos"));this.setDom("x1",t.x),this.setDom("x2",t.x),this.setDom("y1",this.graph.getYAxis().getMinPx()),this.setDom("y2",this.graph.getYAxis().getMaxPx())},setPosition2:function(){}}),i});