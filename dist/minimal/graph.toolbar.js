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
define([],function(){function t(){var t=document.createElementNS(a,"svg");return t.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xlink","http://www.w3.org/1999/xlink"),t.setAttribute("xmlns",a),t}function e(){var e=t(),r=document.createElementNS(a,"line");return r.setAttribute("x1",16),r.setAttribute("y1",3),r.setAttribute("x2",4),r.setAttribute("y2",15),r.setAttribute("stroke","#aa0000"),e.appendChild(r),e}function r(){var e=t(),r=document.createElementNS(a,"rect");return r.setAttribute("x",4),r.setAttribute("y",4),r.setAttribute("width",12),r.setAttribute("height",12),r.setAttribute("stroke","black"),r.setAttribute("fill","#dd0000"),e.appendChild(r),e}function n(){var e="M 4,18 C 8,10 14,1 18,18",r=t(),n=document.createElementNS(a,"path");n.setAttribute("d",e),n.setAttribute("stroke","black"),n.setAttribute("fill","transparent");var i=document.createElementNS(a,"path");return i.setAttribute("d",e+" Z"),i.setAttribute("stroke","red"),i.setAttribute("fill","rgba(255, 0, 0, 0.1)"),r.appendChild(i),r.appendChild(n),r}var i={buttons:["none","rect","line","areaundercurve"]},a="http://www.w3.org/2000/svg",s=function(t,e){var r=this;this.options=$.extend(!0,{},i,e),this.graph=t,this.div=$("<ul />").addClass("graph-toolbar"),this.graph.getPlugin("graphs/graph.plugin.shape").then(function(t){r.plugin=t,r.plugin&&(r.div.on("click","li",function(){var t=$(this).attr("data-shape");r.plugin.setShape(t),$(this).parent().children().removeClass("selected"),$(this).addClass("selected")}),r.makeButtons())})};return s.prototype={makeButtons:function(){for(var t=0,e=this.options.buttons.length;e>t;t++)this.div.append(this.makeButton(this.options.buttons[t]))},makeButton:function(t){var i=$("<li />");switch(t){case"line":i.html(e()).attr("data-shape","line");break;case"rect":i.html(r()).attr("data-shape","rect");break;case"areaundercurve":i.html(n()).attr("data-shape","areaundercurve")}return i},getDom:function(){return this.div}},s});