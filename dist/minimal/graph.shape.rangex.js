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
define(["require","graphs/graph.shape.areaundercurve"],function(t,e){var i=function(t){this.init(t)};return $.extend(i.prototype,e.prototype,{createDom:function(){this._dom=document.createElementNS(this.graph.ns,"rect"),this._dom.setAttribute("class","rangeRect"),this._dom.setAttribute("cursor","move"),this.handle1=this._makeHandle(),this.handle2=this._makeHandle(),this.setDom("cursor","move"),this.doDraw=void 0},setPosition:function(){var t=this._getPosition(this.getFromData("pos")),e=this._getPosition(this.getFromData("pos2"),this.getFromData("pos")),i=Math.abs(t.x-e.x),r=Math.min(t.x,e.x);return this.reversed=r==e.x,2>i||0>r+i||r>this.graph.getDrawingWidth()?!1:(this.group.appendChild(this.handle1),this.group.appendChild(this.handle2),this.handle1.setAttribute("transform","translate("+(r-6)+" "+((this.graph.getDrawingHeight()-this.graph.shift[0])/2-10)+")"),this.handle2.setAttribute("transform","translate("+(r+i-6)+" "+((this.graph.getDrawingHeight()-this.graph.shift[0])/2-10)+")"),this.setDom("x",r),this.setDom("width",i),this.setDom("y",0),this.setDom("height",this.graph.getDrawingHeight()-this.graph.shift[0]),!0)},_makeHandle:function(){var t=document.createElementNS(this.graph.ns,"g");t.setAttribute("id","rangeHandle"+this.graph._creation);var e=document.createElementNS(this.graph.ns,"rect");e.setAttribute("rx",0),e.setAttribute("ry",0),e.setAttribute("stroke","black"),e.setAttribute("fill","white"),e.setAttribute("width",10),e.setAttribute("height",20),e.setAttribute("x",0),e.setAttribute("y",0),e.setAttribute("shape-rendering","crispEdges"),e.setAttribute("cursor","ew-resize"),t.appendChild(e);var i=document.createElementNS(this.graph.ns,"line");i.setAttribute("x1",4),i.setAttribute("x2",4),i.setAttribute("y1",4),i.setAttribute("y2",18),i.setAttribute("stroke","black"),i.setAttribute("shape-rendering","crispEdges"),i.setAttribute("cursor","ew-resize"),t.appendChild(i);var i=document.createElementNS(this.graph.ns,"line");return i.setAttribute("x1",6),i.setAttribute("x2",6),i.setAttribute("y1",4),i.setAttribute("y2",18),i.setAttribute("stroke","black"),i.setAttribute("shape-rendering","crispEdges"),i.setAttribute("cursor","ew-resize"),t.appendChild(i),t}}),i});