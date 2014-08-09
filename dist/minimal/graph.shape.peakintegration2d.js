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
define(["require","./graph.shape.rect"],function(t,e){var i=5,s=function(t,e){this.options=e||{},this.init(t),this.nbHandles=4,this.createHandles(this.nbHandles,"rect",{transform:"translate(-3 -3)",width:6,height:6,stroke:"black",fill:"white",cursor:"nwse-resize"})};return $.extend(s.prototype,e.prototype,{createDom:function(){this._dom=document.createElementNS(this.graph.ns,"rect"),this._dom.element=this},redrawImpl:function(){this.setPosition(),this.setHandles(),this.setBindableToDom(this._dom)},highlight:function(){this._dom.setAttribute("stroke-width","5"),this.setLinesY(i+2)},unhighlight:function(){this.setStrokeWidth(),this.setLinesY(i)}}),s});