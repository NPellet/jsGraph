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
define([],function(){var n=function(){};return n.prototype={init:function(){},onMouseDown:function(n,t,o,i){var e=n;if(this.count=this.count||0,this.count!=n.options.rangeLimitX){t-=n.getPaddingLeft(),xVal=n.getXAxis().getVal(t);var a=n.makeShape({type:"rangeX",pos:{x:xVal,y:0},pos2:{x:xVal,y:0}},{onChange:function(n){e.triggerEvent("onAnnotationChange",n)}},!0);require&&require(["src/util/context"],function(n){n.listen(a._dom,[['<li><a><span class="ui-icon ui-icon-cross"></span> Remove range zone</a></li>',function(){a.kill()}]])});var r=Util.getNextColorRGB(this.count,n.options.rangeLimitX);a.set("fillColor","rgba("+r+", 0.3)"),a.set("strokeColor","rgba("+r+", 0.9)"),this.count++,a.handleMouseDown(i,!0),a.draw()}}},n});