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
define([],function(){return{init:function(){},onMouseDown:function(n,t,o,e){var a=n;this.count=this.count||0,t-=n.getPaddingLeft(),xVal=n.getXAxis().getVal(t);var i=Util.getNextColorRGB(this.count,100),r=n.makeShape({type:"surfaceUnderCurve",pos:{x:xVal,y:0},pos2:{x:xVal,y:0},fillColor:"rgba("+i+", 0.3)",strokeColor:"rgba("+i+", 0.9)",onChange:function(n){a.triggerEvent("onAnnotationChange",n)}},{},!0);r&&(this.count++,r.handleMouseDown(e,!0),r.draw())}}});