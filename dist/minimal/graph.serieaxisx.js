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
define(["require","graphs/graph.serieaxis"],function(t,n){var i=function(){};return $.extend(i.prototype,n.prototype,{getY:function(t){var n=-Math.round(1e3*((t-this.minY)/(this.maxY-this.minY)))/1e3*(this.axis.totalDimension-this.axis._widthLabels)-this.axis._widthLabels;return n},getX:function(t){var n=Math.round(1e3*((t-this.axis.getActualMin())/this.axis._getActualInterval()*(this.axis.getMaxPx()-this.axis.getMinPx())+this.axis.getMinPx()))/1e3;return n},bindLabelHandlers:function(t){function n(n){if(e.axis.currentAction===!1){e.axis.currentAction="labelDragging",n.stopPropagation(),t.dragging=!0;var i=e.graph.getXY(n);t.draggingIniX=i.x,t.draggingIniY=i.y,e.labelDragging=t}}function i(n){e.axis.currentAction===!1&&(e.axis.currentAction="labelDraggingMain",n.preventDefault(),n.stopPropagation(),e.labelDragging=t)}var e=this;t.labelDom.addEventListener("mousedown",n),t.rect.addEventListener("mousedown",n),t.rect.addEventListener("click",function(t){t.preventDefault(),t.stopPropagation()}),t.labelDom.addEventListener("click",function(t){t.preventDefault(),t.stopPropagation()}),t.path.addEventListener("click",function(t){t.preventDefault(),t.stopPropagation()}),t.path.addEventListener("mousedown",i)}}),i});