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
define([],function(){var e=function(){};return e.prototype={init:function(e,n){this.options=n,this.shapeType=n.type},setShape:function(e){this.shapeInfo.shapeType=e},onMouseDown:function(e,n,t,o){if(this.shapeType){var a,i,r=this;this.count=this.count||0,n-=e.getPaddingLeft(),t-=e.getPaddingTop(),a=e.getXAxis().getVal(n),i=e.getYAxis().getVal(t);{var h={pos:{x:a,y:i},pos2:{x:a,y:i},onChange:function(n){e.triggerEvent("onAnnotationChange",n)}};e.makeShape($.extend(h,this.options),{},!0).then(function(e){e&&(r.currentShape=e,r.currentShapeEvent=o)})}}},onMouseMove:function(e,n,t,o){var a=this;if(a.currentShape){a.count++;var i=a.currentShape;a.currentShape=!1,i.handleCreateImpl(),i.options&&i.options.onCreate&&i.options.onCreate.call(i),i.draw(),i.select(),i.handleMouseDown(a.currentShapeEvent,!0),i.handleMouseMove(o,!0)}},onMouseUp:function(){var e=this;e.currentShape&&(e.currentShape.kill(),e.currentShape=!1)}},e});