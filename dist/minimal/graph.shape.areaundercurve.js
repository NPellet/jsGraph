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
define(["require","graphs/graph.shape"],function(t,e){var i=function(t){this.init(t)};return $.extend(i.prototype,e.prototype,{createDom:function(){this._dom=document.createElementNS(this.graph.ns,"path"),this._dom.setAttribute("pointer-events","stroke")},handleCreateImpl:function(){this.resize=!0,this.resizingElement=2},handleMouseDownImpl:function(){},handleMouseUpImpl:function(){},handleMouseMoveImpl:function(t,e,i){if(!this.isLocked()){var s=this.getFromData("pos"),h=this.getFromData("pos2");if(this.moving)s.x=this.graph.deltaPosition(s.x,e,this.serie.getXAxis()),s.y=this.graph.deltaPosition(s.y,i,this.serie.getYAxis()),h.x=this.graph.deltaPosition(h.x,e,this.serie.getXAxis()),h.y=this.graph.deltaPosition(h.y,i,this.serie.getYAxis());else{this.resizingPosition=this.getFromData(this.reversed&&2==this.handleSelected||!this.reversed&&1==this.handleSelected?"pos":"pos2");var r=this.serie.searchClosestValue(this.serie.getXAxis().getVal(this.graph.getXY(t).x-this.graph.getPaddingLeft()));if(!r)return;this.resizingPosition.x!=r.xMin&&(this.preventUnselect=!0),this.resizingPosition.x=r.xMin}this.position=this.setPosition(),this.setHandles()}},redrawImpl:function(){this.position!=this.doDraw&&(this.group.setAttribute("visibility",this.position?"visible":"hidden"),this.doDraw=this.position)},setPosition:function(){var t=this._getPosition(this.getFromData("pos")),e=this._getPosition(this.getFromData("pos2"),this.getFromData("pos")),i=Math.abs(t.x-e.x),s=Math.min(t.x,e.x);if(this.reversed=s==e.x,2>i||0>s+i||s>this.graph.getDrawingWidth())return!1;var h,r,o,a,n,l,s,d,g,p=this.serie.searchClosestValue(this.getFromData("pos").x),x=this.serie.searchClosestValue(this.getFromData("pos2").x),u=0,f=Number.MAX_VALUE;if(!p||!x)return!1;for(p.xBeforeIndex>x.xBeforeIndex&&(h=p,p=x,x=h),r=p.dataIndex;r<=x.dataIndex;r++){for(g="M ",a=r==p.dataIndex?p.xBeforeIndexArr:0,n=r==x.dataIndex?x.xBeforeIndexArr:this.serie.data[r].length,l=0,o=a;n>=o;o+=2)s=this.serie.getX(this.serie.data[r][o+0]),d=this.serie.getY(this.serie.data[r][o+1]),u=Math.max(this.serie.data[r][o+1],u),f=Math.min(this.serie.data[r][o+1],f),o==a&&(this.firstX=s,this.firstY=d),g=this.serie._addPoint(g,s,d,l),l++;if(this.lastX=s,this.lastY=d,!(this.firstX&&this.firstY&&this.lastX&&this.lastY))return;g+=" V "+this.serie.getYAxis().getPx(0)+" H "+this.firstX+" z",this.setDom("d",g)}return this.maxY=this.serie.getY(u),this._selected&&this.select(),!0},select:function(){this.isLocked()||this.firstX&&this.lastX&&(this._selected=!0,this.selectHandles(),this.group.appendChild(this.handle1),this.group.appendChild(this.handle2),this.selectStyle(),this.graph.selectShape(this))},selectHandles:function(){this.handle1.setAttribute("x1",this.firstX),this.handle1.setAttribute("x2",this.firstX),this.handle2.setAttribute("x1",this.lastX),this.handle2.setAttribute("x2",this.lastX),this.handle1.setAttribute("y1",this.serie.getYAxis().getMaxPx()),this.handle1.setAttribute("y2",this.serie.getY(0)),this.handle2.setAttribute("y1",this.serie.getYAxis().getMaxPx()),this.handle2.setAttribute("y2",this.serie.getY(0))},selectStyle:function(){this.setDom("stroke","red"),this.setDom("stroke-width","2"),this.setDom("fill","rgba(255, 0, 0, 0.1)")},setLabelPosition:function(t){var e=(this.firstX+this.lastX)/2+"px",i=(this.lastPointY+this.firstPointY)/2+"px",s=this.serie.isFlipped();this._setLabelPosition(t,{x:s?i:e,y:s?e:i})},getFieldsConfig:function(){return{strokeWidth:{type:"float","default":1,title:"Stroke width"},strokeColor:{type:"color",title:"Stroke color"},fillColor:{type:"color",title:"Fill color"}}}}),i});