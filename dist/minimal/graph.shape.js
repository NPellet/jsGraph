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
define(["require"],function(t){function e(t){if(Array.isArray(t))switch(t.length){case 3:return"rgb("+t.join(",")+")";case 4:return"rgba("+t.join(",")+")"}else if("object"==typeof t)return"rgb("+Math.round(255*t.r)+", "+Math.round(255*t.g)+", "+Math.round(255*t.b)+")";return t}var s=function(){};return s.prototype={init:function(t,e){var i=this;this.graph=t,this.properties={},this.group=document.createElementNS(this.graph.ns,"g"),this.options=this.options||{},e&&this.group.setAttribute("data-groupname",e),this._selected=!1,this.createDom(),this.setEvents(),this.classes=[],this.rectEvent=document.createElementNS(this.graph.ns,"rect"),this.rectEvent.setAttribute("pointer-events","fill"),this.rectEvent.setAttribute("fill","transparent"),this._dom&&(this.group.appendChild(this._dom),this._dom.addEventListener("mouseover",function(t){i.handleMouseOver(t)}),this._dom.addEventListener("mouseout",function(t){i.handleMouseOut(t)}),this._dom.addEventListener("mousedown",function(t){i.graph.focus(),t.preventDefault(),i.handleSelected=!1,i.moving=!0,i.handleMouseDown(t)}),this._dom.addEventListener("dblclick",function(t){t.preventDefault(),t.stopPropagation(),i.handleDblClick(t)})),this.graph.shapeZone.appendChild(this.group),this.initImpl()},addClass:function(t){this.classes=this.classes||[],-1==this.classes.indexOf(t)&&this.classes.push(t),this.makeClasses()},removeClass:function(t){this.classes.splice(this.classes.indexOf(t),1),this.makeClasses()},makeClasses:function(){this._dom.setAttribute("class",this.classes.join(" "))},initImpl:function(){},setOriginalData:function(t,e){this.data=t,this.events=e},triggerChange:function(){this.graph.triggerEvent("onAnnotationChange",this.data,this)},setEvents:function(){},setSelectableOnClick:function(){return},setBBox:function(){this.group.removeChild(this.rectEvent);var t=this.group.getBBox();this.rectEvent.setAttribute("x",t.x),this.rectEvent.setAttribute("y",t.y-10),this.rectEvent.setAttribute("width",t.width),this.rectEvent.setAttribute("height",t.height+20),this.group.appendChild(this.rectEvent)},setMouseOver:function(t){this.rectEvent.addEventListener("mouseover",t)},kill:function(){this.graph.shapeZone.removeChild(this.group),this.graph.removeShape(this),this.options.onRemove&&this.options.onRemove.call(this)},draw:function(){void 0==this.labelNumber&&this.setLabelNumber(1),this.setFillColor(),this.setStrokeColor(),this.setStrokeWidth(),this.setDashArray(),this.everyLabel(function(t){this.get("labelPosition",t)&&(this.setLabelText(t),this.setLabelSize(t),this.setLabelColor(t),this.setLabelPosition(t)),this.get("labelAnchor",t)&&this._forceLabelAnchor(t)})},redraw:function(){this.position=this.setPosition(),this.redrawImpl(),this.position&&(this.everyLabel(function(t){this.get("labelPosition",t)&&(this.setLabelPosition(t),this.setLabelAngle(t))}),this.afterDone&&this.afterDone())},redrawImpl:function(){},done:function(){},setSerie:function(t){this.serie=t},set:function(t,e,i){this.properties[t]=this.properties[t]||[],this.properties[t][i||0]=e,this.configuration=this.configuration||{sections:{shape_cfg:[{groups:{shape_cfg:[{}]}}]}},this.configuration.sections.shape_cfg[0].groups.shape_cfg[0][t]=[e]},get:function(t){return this.configuration=this.configuration||{sections:{shape_cfg:[{groups:{shape_cfg:[{}]}}]}},((this.configuration.sections.shape_cfg[0].groups.shape_cfg[0]||[])[t]||[])[0]},getFromData:function(t){return this.data[t]},setData:function(t,e){return this.data[t]=e},setDom:function(t,e){this._dom&&this._dom.setAttribute(t,e)},setPosition:function(){var t=this._getPosition(this.getFromData("pos"));return this.setDom("x",t.x),this.setDom("y",t.y),!0},setFillColor:function(){this.setDom("fill",e(this.get("fillColor")))},setStrokeColor:function(){this.setDom("stroke",e(this.get("strokeColor")))},setStrokeWidth:function(){this.setDom("stroke-width",this.get("strokeWidth"))},setDashArray:function(){this.get("strokeDashArray")&&this.setDom("stroke-dasharray",this.get("strokeDashArray"))},setLabelText:function(t){this.label&&(this.label[t].textContent=this.data.label[t].text)},setLabelColor:function(t){this.label&&this.label[t].setAttribute("fill",this.get("labelColor"))},setLabelSize:function(t){this.label&&this.label[t].setAttribute("font-size",this.get("labelSize"))},setLabelPosition:function(t){this.label&&this._setLabelPosition(t)},setLabelAngle:function(t){this.label&&this._setLabelAngle(t)},_getPosition:function(t,e){var i,s=i=!1;return this.serie&&(s=this.serie.getXAxis(),i=this.serie.getYAxis()),this.graph.getPosition(t,e,s,i,this.serie)},setLabelNumber:function(t){this.labelNumber=t,this._makeLabel()},everyLabel:function(t){for(var e=0;e<this.labelNumber;e++)t.call(this,e)},toggleLabel:function(t,e){this.labelNumber&&this.label[i]&&this.label[i].setAttribute("display",e?"block":"none")},_makeLabel:function(){var t=this;this.label=this.label||[],this.everyLabel(function(e){this.label[e]=document.createElementNS(this.graph.ns,"text"),this.label[e].addEventListener("mouseover",function(t){t.stopPropagation()}),this.label[e].addEventListener("mouseout",function(t){t.stopPropagation()}),this.label[e].addEventListener("dblclick",function(i){i.preventDefault(),i.stopPropagation(),$('<input type="text" />').attr("value",i.target.textContent).prependTo(t.graph._dom).css({position:"absolute","margin-top":parseInt(i.target.getAttribute("y").replace("px",""))-10+"px","margin-left":parseInt(i.target.getAttribute("x").replace("px",""))-50+"px",textAlign:"center",width:"100px"}).bind("blur",function(){$(this).remove(),t.data.label[e].text=$(this).prop("value"),t.label[e].textContent=$(this).prop("value"),t.triggerChange()}).bind("keyup",function(t){t.stopPropagation(),t.preventDefault(),13==t.keyCode&&$(this).trigger("blur")}).bind("keypress",function(t){t.stopPropagation()}).bind("keydown",function(t){t.stopPropagation()}).focus().get(0).select()}),t.group.appendChild(this.label[e])})},_setLabelPosition:function(t,e){var i=this.getFromData("pos");if(i){{this._getPosition(i)}if(!e)var e=this._getPosition(this.get("labelPosition",t),i)}else e={x:-1e3,y:-1e3};"NaNpx"!=e.x&&(this.label[t].setAttribute("x",e.x),this.label[t].setAttribute("y",e.y))},_setLabelAngle:function(t){var e=this.get("labelAngle",t)||0;if(0!=e){var i=this.label[t].getAttribute("x"),s=this.label[t].getAttribute("y");this.label[t].setAttribute("transform","rotate("+e+" "+i+" "+s+")")}},_forceLabelAnchor:function(t){this.label[t].setAttribute("text-anchor",this._getLabelAnchor())},_getLabelAnchor:function(){var t=this.get("labelAnchor");switch(t){case"middle":case"start":case"end":return t;case"right":return"end";case"left":return"start";default:return"start"}},setSelectable:function(t){this._selectable=t},select:function(){this._selected=!0,this.selectStyle(),this.setHandles(),this.graph.selectShape(this)},unselect:function(){this._selected=!1,this.setStrokeWidth(),this.setStrokeColor(),this.setDashArray(),this.setFillColor(),this.handlesInDom&&(this.handlesInDom=!1,this.removeHandles())},createHandles:function(t,e,i){if(!this.isLocked())for(var s=this,n=1;t>=n;n++)!function(t){s["handle"+t]=document.createElementNS(s.graph.ns,e);for(var n in i)s["handle"+t].setAttribute(n,i[n]);s["handle"+t].addEventListener("mousedown",function(e){e.preventDefault(),e.stopPropagation(),s.handleSelected=t,s.handleMouseDown(e)})}(n)},handleMouseDownImpl:function(){},handleMouseMoveImpl:function(){},handleMouseUpImpl:function(){},handleCreateImpl:function(){},handlers:{mouseUp:[function(t){return this.moving=!1,this.resize=!1,this.graph.shapeMoving(!1),this.handleMouseUpImpl(t)}],mouseMove:[function(t){var e=this.graph.getXY(t),i=this.serie.getXAxis().getRelVal(e.x-this.mouseCoords.x),s=this.serie.getYAxis().getRelVal(e.y-this.mouseCoords.y);(0!=i||0!==s)&&(this.preventUnselect=!0),this.mouseCoords=e;var n=this.handleMouseMoveImpl(t,i,s,e.x-this.mouseCoords.x,e.y-this.mouseCoords.y);return this.options&&(this.moving?this.options.onMove&&this.options.onMove.call(this):this.options.onResize&&this.options.onResize.call(this)),n}],mouseDown:[function(t){var e=this;return t.preventDefault(),this.graph.shapeZone.appendChild(this.group),this.graph.shapeMoving(this),this._selected||(this.preventUnselect=!0,this.timeoutSelect=window.setTimeout(function(){e.select(),e.timeoutSelect=!1},100)),this.mouseCoords=this.graph.getXY(t),this.handleMouseDownImpl(t,this.mouseCoords)}],mouseOver:[function(){var t;this.highlight(),this.addClass("hover"),(t=this._mouseOverCallbacks)&&t.fireWith(this,[this.data,this.parameters])}],mouseOut:[function(){var t;this.unhighlight(),this.removeClass("hover"),(t=this._mouseOutCallbacks)&&t.fireWith(this,[this.data,this.parameters])}]},handleMouseDown:function(t){this.callHandler("mouseDown",t)},handleMouseMove:function(t){return this.isLocked()?(this.graph.shapeMoving(!1),this.handleSelected=!1,void(this.moving=!0)):void this.callHandler("mouseMove",t)},handleMouseUp:function(t){this.callHandler("mouseUp",t)},handleMouseOver:function(){this.callHandler("mouseOver")},handleMouseOut:function(){this.callHandler("mouseOut")},removeHandles:function(){for(var t=1;t<=this.nbHandles;t++)this.group.removeChild(this["handle"+t])},callHandler:function(t){{var e,i=t;Array.prototype.shift.call(arguments)}if(e=s.prototype.handlers[i])for(var n=0,o=e.length;o>n;n++)e[n].apply(this,arguments);if(e=this.graph.shapeHandlers[i])for(var n=0,o=e.length;o>n;n++)e[n].apply(this,arguments)},addHandles:function(){if(!this.isLocked()&&!this.handlesInDom){this.handlesInDom=!0;for(var t=1;t<=this.nbHandles;t++)this["handle"+t]&&this.group.appendChild(this["handle"+t])}},handleDblClick:function(){this.configure()},configure:function(){var e=this,i=$("<div></div>").dialog({modal:!0,position:["center",50],width:"80%"});i.prev().remove(),i.parent().css("z-index",1e3),t(["require","lib/lib/forms/form"],function(t,s){var n=new s({});n.init();var o={sections:{shape_cfg:{options:{title:"Shape",icon:"info_rhombus"},groups:{shape_cfg:{options:{type:"list"},fields:e.getFieldsConfig()}}}}};n.setStructure(o),n.onStructureLoaded().done(function(){n.fill(e.getConfiguration())}),n.addButton("Cancel",{color:"blue"},function(){i.dialog("close")}),n.addButton("Save",{color:"green"},function(){e.setConfiguration(n.getValue()),i.dialog("close")}),n.onLoaded().done(function(){i.html(n.makeDom()),n.inDom()})})},getConfiguration:function(){return this.configuration=this.configuration||{}},setConfiguration:function(t){this.configuration=$.extend(!0,this.configuration,t)},isLocked:function(){return console.log(this),this.options.locked||this.graph.shapesLocked},lock:function(){this.options.locked=!0},unlock:function(){this.options.locked=!1},isBindable:function(){return this.options.bindable},setBindableToDom:function(){this.isBindable()&&this.addClass("bindable")},highlight:function(){},unhighlight:function(){}},s});