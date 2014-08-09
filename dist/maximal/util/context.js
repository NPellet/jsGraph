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
define(["jquery","jqueryui"],function(n){var t,t=function(){this.contextMenu};return t.prototype={listen:function(t,e,o,u){var c=this;e[0]instanceof Array||(e=[e]),t.addEventListener("contextmenu",function(t){o&&o(c.contextMenu);for(var i=0,s=e.length;s>i;i++)!function(n,e,o){(o&&o(t,n)||!o)&&c.contextMenu.append(n),n.bind("click",function(n){e&&e.call(this,t,n)})}(n(e[i][0]),e[i][1],e[i][2]);u&&u(c.contextMenu)},!0)},unlisten:function(n){n.removeEventListener("contextmenu")},getRootDom:function(){return this.dom},init:function(t){if(!this.initialized){this.initialized=!0;var e=this;this.dom=t;var o,u;t.addEventListener("contextmenu",function(t){e.contextMenu&&(e.contextMenu.hasClass("ui-menu")&&e.contextMenu.menu("destroy"),e.contextMenu.remove()),e.contextMenu=null,o=t.pageY,u=t.pageX;var c=n('<ul class="ci-contextmenu"></ul>').css({position:"absolute",left:u,top:o,"z-index":1e4}).appendTo(n("body"));e.contextMenu=c;var i=function(){e.contextMenu&&(e.contextMenu.hasClass("ui-menu")&&e.contextMenu.menu("destroy"),e.contextMenu.remove()),e.contextMenu=null,n(document).unbind("click",i)};n(document).bind("click",i)},!0),t.parentNode.addEventListener("contextmenu",function(n){if(e.contextMenu.children().length>0){e.contextMenu.menu({select:function(){}}),n.preventDefault(),n.stopPropagation();var t=e.contextMenu.height(),c=e.contextMenu.width(),i=document.documentElement.clientHeight,s=document.documentElement.clientWidth;return o+t>i&&e.contextMenu.css("top",Math.max(0,i-t-10)),u+c>s&&e.contextMenu.css("left",Math.max(0,s-c-10)),!1}},!1)}}},t});