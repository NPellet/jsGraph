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
define(["require","graphs/graph.shape.line"],function(t,e){var i=5,s=function(t,e){this.options=e||{},this.init(t),this.nbHandles=2,this.createHandles(this.nbHandles,"rect",{transform:"translate(-3 -3)",width:6,height:6,stroke:"black",fill:"white",cursor:"nwse-resize"})};return $.extend(s.prototype,e.prototype,{createDom:function(){this._dom=document.createElementNS(this.graph.ns,"line"),this.line1=document.createElementNS(this.graph.ns,"line"),this.line2=document.createElementNS(this.graph.ns,"line"),this.group.appendChild(this.line1),this.group.appendChild(this.line2),this.line1.setAttribute("stroke","black"),this.line2.setAttribute("stroke","black"),this._dom.element=this},redrawImpl:function(){this.setPosition(),this.setPosition2(),this.setHandles(),this.redrawLines(i),this.setBindableToDom(this._dom)},redrawLines:function(t){var e=this.findxs(),i=this._getPosition({x:e[0]}),s=this._getPosition({x:e[1]});i.x&&s.x&&this.currentPos2y&&this.currentPos1y&&(this.line1.setAttribute("x1",i.x),this.line1.setAttribute("x2",i.x),this.line2.setAttribute("x1",s.x),this.line2.setAttribute("x2",s.x),this.setLinesY(t))},setLinesY:function(t){this.line1.setAttribute("y1",this.currentPos2y-t),this.line1.setAttribute("y2",this.currentPos2y+t),this.line2.setAttribute("y1",this.currentPos1y-t),this.line2.setAttribute("y2",this.currentPos1y+t)},findxs:function(){var t=this._getPosition(this.getFromData("pos")),e=this._getPosition(this.getFromData("pos2"),this.getFromData("pos")),i=Math.abs(t.x-e.x),s=Math.min(t.x,e.x);if(this.reversed=s==e.x,2>i||0>s+i||s>this.graph.getDrawingWidth())return!1;{var r,n,h,a,o,l,s,d,u,x,c=this.serie.searchClosestValue(this.getFromData("pos").x),f=this.serie.searchClosestValue(this.getFromData("pos2").x);Number.MAX_VALUE}if(!c||!f)return!1;c.xBeforeIndex>f.xBeforeIndex&&(r=c,c=f,f=r);var u,x,g,p,b=0,m=(this.scaling,[]),A=[];for(n=c.dataIndex;n<=f.dataIndex;n++){for(a=n==c.dataIndex?c.xBeforeIndexArr:0,o=n==f.dataIndex?f.xBeforeIndexArr:this.serie.data[n].length,l=0,h=a;o>=h;h+=2)s=this.serie.data[n][h+0],d=this.serie.data[n][h+1],u||(u=s,x=d),void 0==g&&(g=s,p=d),b+=Math.abs((s-g)*(d-p)*.5),m.push(b),A.push(s),g=s,p=d,l++;if(this.lastX=s,this.lastY=d,!(u&&x&&this.lastX&&this.lastY))return!1}if(0==b)return[u,g];for(var y=.05*b,P=.95*b,k=!1,v=!1,n=0,I=m.length;I>n;n++)if(m[n]>y){k=n;break}for(var n=m.length;n>0;n--)if(m[n]<P){v=n;break}return[A[k],A[v]]},highlight:function(){this.isBindable()&&(this._dom.setAttribute("stroke-width","5"),this.setLinesY(i+2))},unhighlight:function(){this.isBindable()&&(this.setStrokeWidth(),this.setLinesY(i))}}),s});