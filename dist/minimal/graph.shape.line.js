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
define(["require","graphs/graph.shape"],function(t,s){var i=function(t,s){this.init(t),this.options=s||{},this.nbHandles=2,this.createHandles(this.nbHandles,"rect",{transform:"translate(-3 -3)",width:6,height:6,stroke:"black",fill:"white",cursor:"nwse-resize"})};return $.extend(i.prototype,s.prototype,{createDom:function(){this._dom=document.createElementNS(this.graph.ns,"line")},setPosition:function(){var t=this._getPosition(this.getFromData("pos"));if(t.x&&t.y)return this.setDom("x2",t.x),this.setDom("y2",t.y),this.currentPos1x=t.x,this.currentPos1y=t.y,!0},setPosition2:function(){var t=this._getPosition(this.getFromData("pos2"),this.getFromData("pos"));t.x&&t.y&&(this.setDom("y1",t.y),this.setDom("x1",t.x),this.currentPos2x=t.x,this.currentPos2y=t.y)},redrawImpl:function(){this.setPosition(),this.setPosition2(),this.setHandles()},getLinkingCoords:function(){return{x:(this.currentPos2x+this.currentPos1x)/2,y:(this.currentPos2y+this.currentPos1y)/2}},handleCreateImpl:function(){this.resize=!0,this.handleSelected=2},handleMouseDownImpl:function(){return!0},handleMouseUpImpl:function(){return this.triggerChange(),!0},handleMouseMoveImpl:function(t,s,i){if(!this.isLocked()){var e=this.getFromData("pos"),o=this.getFromData("pos2");if(1==this.handleSelected&&(this.options.vertical||(e.x=this.graph.deltaPosition(e.x,s,this.serie.getXAxis())),this.options.horizontal||(e.y=this.graph.deltaPosition(e.y,i,this.serie.getYAxis()))),2==this.handleSelected&&(this.options.vertical||(o.x=this.graph.deltaPosition(o.x,s,this.serie.getXAxis())),this.options.horizontal||(o.y=this.graph.deltaPosition(o.y,i,this.serie.getYAxis()))),this.options.forcedCoords){var r=this.options.forcedCoords;void 0!==r.y&&(o.y=r.y,e.y=r.y),void 0!==r.x&&(o.x=r.x,e.x=r.x)}return this.moving&&(e.x=this.graph.deltaPosition(e.x,s,this.serie.getXAxis()),e.y=this.graph.deltaPosition(e.y,i,this.serie.getYAxis()),o.x=this.graph.deltaPosition(o.x,s,this.serie.getXAxis()),o.y=this.graph.deltaPosition(o.y,i,this.serie.getYAxis())),this.redrawImpl(),!0}},setHandles:function(){this.isLocked()||this._selected&&void 0!=this.currentPos1x&&(this.addHandles(),this.handle1.setAttribute("x",this.currentPos1x),this.handle1.setAttribute("y",this.currentPos1y),this.handle2.setAttribute("x",this.currentPos2x),this.handle2.setAttribute("y",this.currentPos2y))},selectStyle:function(){this.setDom("stroke","red"),this.setDom("stroke-width","2")}}),i});