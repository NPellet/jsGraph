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
define(["require","graphs/graph.axis"],function(t,i){var e=function(t,i,e){this.init(t,e),this.top="top"==i};return $.extend(e.prototype,i.prototype,{getAxisPosition:function(){var t=(1==this.options.tickPosition?15:25)+2*this.graph.options.fontSize;return this.options.allowedPxSerie&&this.series.length>0&&(t+=this.options.allowedPxSerie),t},getAxisWidthHeight:function(){},_setShift:function(){this.group.setAttribute("transform","translate(0 "+(this.top?this.shift:this.graph.getDrawingHeight()-this.shift)+")")},getMaxSizeTick:function(){return(this.top?-1:1)*(1==this.options.tickPosition?15:25)},drawTick:function(t,i,e,s){var h=(this.groupTicks,document.createElementNS(this.graph.ns,"line")),n=this.getPos(t);if(void 0!=n){if(h.setAttribute("shape-rendering","crispEdges"),h.setAttribute("x1",n),h.setAttribute("x2",n),h.setAttribute("y1",(this.top?1:-1)*this.tickPx1*e),h.setAttribute("y2",(this.top?1:-1)*this.tickPx2*e),i&&this.options.primaryGrid?this.doGridLine(!0,n,n,0,this.graph.getDrawingHeight()):!i&&this.options.secondaryGrid&&this.doGridLine(!1,n,n,0,this.graph.getDrawingHeight()),h.setAttribute("stroke","black"),this.groupTicks.appendChild(h),i){var r=(this.groupTickLabels,document.createElementNS(this.graph.ns,"text"));r.setAttribute("x",n),r.setAttribute("y",(this.top?-1:1)*((1==this.options.tickPosition?8:25)+(this.top?10:0))),r.setAttribute("text-anchor","middle"),r.style.dominantBaseline="hanging",this.setTickContent(r,t,s),this.graph.applyStyleText(r),this.groupTickLabels.appendChild(r)}this.ticks.push(h)}},drawSpecifics:function(){this.label.setAttribute("text-anchor","middle"),this.label.setAttribute("x",Math.abs(this.getMaxPx()-this.getMinPx())/2+this.getMinPx()),this.label.setAttribute("y",(this.top?-1:1)*((1==this.options.tickPosition?10:15)+this.graph.options.fontSize)),this.line.setAttribute("x1",this.getMinPx()),this.line.setAttribute("x2",this.getMaxPx()),this.line.setAttribute("y1",0),this.line.setAttribute("y2",0),this.labelTspan.style.dominantBaseline="hanging",this.expTspan.style.dominantBaseline="hanging",this.expTspanExp.style.dominantBaseline="hanging"},drawSeries:function(){if(this.shift){this.rectEvent.setAttribute("y",this.top?-this.shift:0),this.rectEvent.setAttribute("height",this.totalDimension),this.rectEvent.setAttribute("x",Math.min(this.getMinPx(),this.getMaxPx())),this.rectEvent.setAttribute("width",Math.abs(this.getMinPx()-this.getMaxPx())),this.clipRect.setAttribute("y",this.top?-this.shift:0),this.clipRect.setAttribute("height",this.totalDimension),this.clipRect.setAttribute("x",Math.min(this.getMinPx(),this.getMaxPx())),this.clipRect.setAttribute("width",Math.abs(this.getMinPx()-this.getMaxPx()));for(var t=0,i=this.series.length;i>t;t++)this.series[t].draw()}},_draw0Line:function(t){this._0line=document.createElementNS(this.graph.ns,"line"),this._0line.setAttribute("x1",t),this._0line.setAttribute("x2",t),this._0line.setAttribute("y1",0),this._0line.setAttribute("y2",this.getMaxPx()),this._0line.setAttribute("stroke","black"),this.groupGrids.appendChild(this._0line)},addSerie:function(t,i){var e=new GraphSerieAxisX(t,i);return e.setAxis(this),e.init(this.graph,t,i),e.autoAxis(),e.setXAxis(this),this.series.push(e),this.groupSeries.appendChild(e.groupMain),this.groupSeries.setAttribute("clip-path","url(#_clip"+this.axisRand+")"),e},handleMouseMoveLocal:function(t){t-=this.graph.getPaddingLeft(),this.mouseVal=this.getVal(t)},isXY:function(){return"x"}}),e});