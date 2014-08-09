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
define(["require","./graph.shape.line"],function(t,e){var i=function(t){this.init(t)};return $.extend(i.prototype,e.prototype,{createDom:function(){this._dom=document.createElementNS(this.graph.ns,"line"),this._dom.setAttribute("marker-end","url(#verticalline"+this.graph._creation+")"),this._dom.setAttribute("marker-start","url(#verticalline"+this.graph._creation+")")},setLabelPosition:function(t){var e=this._getPosition(this.getFromData("pos")),i=this._getPosition(this.getFromData("pos2"),this.getFromData("pos"));this._setLabelPosition(t,this._getPosition(this.get("labelPosition",t),{x:(e.x+i.x)/2+"px",y:(e.y+i.y)/2+"px"}))},afterDone:function(){}}),i});