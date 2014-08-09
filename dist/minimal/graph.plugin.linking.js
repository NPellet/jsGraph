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
define([require,"graphs/graph.shape"],function(){var n=function(){};return n.prototype={init:function(n,i,t){function e(n){a.islinking=!0;var i=n.graph.isLinking();if(!i){var t=n.graph.newLinkingLine(),e=n.getLinkingCoords();t.setAttribute("x1",e.x),t.setAttribute("y1",e.y),t.setAttribute("x2",e.x),t.setAttribute("y2",e.y),n.graph.linkA(n,t)}}function r(n,i){var t=n.graph.isLinking();if(t&&!n.graph.getLinkingB()){var e=n.graph.getLinkingLine(),r=n.graph.getXY(i);e.setAttribute("x2",r.x-n.graph.getPaddingLeft()),e.setAttribute("y2",r.y-n.graph.getPaddingTop())}}function s(n){var i=n.graph.isLinking();if(i){var t=n.graph.getLinkingA();if(t!=this){n.graph.linkB(n);var e=n.getLinkingCoords(),r=n.graph.getLinkingLine();r.setAttribute("x2",e.x),r.setAttribute("y2",e.y)}}}function g(n){var i=n.graph.isLinking();i&&n.graph.linkB(void 0)}function l(n){return n.graph.endLinking()}this.options=i;var a=this;this.graph=n,this.plugin=t;var h={linkA:function(n,i){this.linking.current.a=n,this.linking.current.line=i},linkB:function(n){this.linking.current.b=n},getLinkingA:function(){return this.linking.current.a},getLinkingB:function(){return this.linking.current.b},isLinking:function(){return!!this.linking.current.a},newLinkingLine:function(){var n=document.createElementNS(this.ns,"line");return n.setAttribute("class","graph-linkingline"),this.shapeZone.insertBefore(n,this.shapeZone.firstChild),n},getLinkingLine:function(){return this.linking.current.line},endLinking:function(){return this.linking.current.a==this.linking.current.b&&this.linking.current.a||!this.linking.current.b&&this.linking.current.a?(this.shapeZone.removeChild(this.linking.current.line),void(this.linking.current={})):(this.linking.current.line&&(this.linking.current.line.style.display="none",this.linking.links.push(this.linking.current),this.linking.current={}),this.linking.links[this.linking.links.length-1])},linkingReveal:function(){for(var n=0,i=this.linking.links.length;i>n;n++)this.linking.links[n].line.style.display="block"},linkingHide:function(){for(var n=0,i=this.linking.links.length;i>n;n++)this.linking.links[n].line.style.display="none"}};for(var k in h)n[k]=h[k];n.linking={current:{},links:[]},n.shapeHandlers.mouseDown.push(function(n){a.graph.allowPlugin(n,a.plugin)&&(this.moving=!1,this.handleSelected=!1,e(this,n,!0))}),n.shapeHandlers.mouseUp.push(function(){var n;(n=l(this))&&(n.a.linking=n.a.linking||0,n.a.linking++,n.b.linking=n.b.linking||0,n.b.linking++,n.a.addClass("linking"),n.b.addClass("linking"),n.a.addClass("linking"+n.a.linking),n.a.removeClass("linking"+(n.a.linking-1)),n.b.addClass("linking"+n.a.linking),n.b.removeClass("linking"+(n.a.linking-1)),a.options.onLinkCreate&&a.options.onLinkCreate(n.a,n.b))}),n.shapeHandlers.mouseMove.push(function(n){r(this,n,!0)}),n.shapeHandlers.mouseOver.push(function(n){s(this,n,!0)}),n.shapeHandlers.mouseOut.push(function(n){g(this,n,!0)})}},n});