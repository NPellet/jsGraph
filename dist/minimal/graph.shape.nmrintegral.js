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
define(["require","graphs/graph.shape.areaundercurve"],function(t,s){var i=function(t,s){this.init(t,"nmrintegral"),this.options=s||{},this.options.axis=this.options.axis||"x",this.nbHandles=2,this.createHandles(this.nbHandles,"rect",{transform:"translate(-3 -3)",width:6,height:6,stroke:"black",fill:"white",cursor:"nwse-resize"})};return $.extend(i.prototype,s.prototype,{setPosition:function(){var t,s,i=this.yBaseline||30,e=this._getPosition(this.getFromData("pos")),a=this._getPosition(this.getFromData("pos2"),this.getFromData("pos")),h=this.options.axis;if(e&&a){if(this.serie.isFlipped()?(i=this.serie.getXAxis().getPx(0)-i,t=Math.abs(e.y-a.y),s=Math.min(e.y,a.y)):(i=this.serie.getYAxis().getPx(0)-i,t=Math.abs(e.x-a.x),s=Math.min(e.x,a.x)),this.computedBaseline=i,this.reversed=s==a.x,"x"==h){if(2>t||0>s+t||s>this.graph.getDrawingWidth())return!1}else if(2>t||0>s+t||s>this.graph.getDrawingHeight())return!1;{var r,n,o,d,l,x,s,p,g,f,u=this.serie.searchClosestValue(this.getFromData("pos")[h]),c=this.serie.searchClosestValue(this.getFromData("pos2")[h]),m="",b=0,v=1,y=0;Number.MAX_VALUE}if(!u||!c)return!1;u.xBeforeIndex>c.xBeforeIndex&&(r=u,u=c,c=r);var g,f,P,A,I,Y,D,F,M,B=0,H=(this.scaling,[]);for(this.serie.isFlipped()&&(v=0,y=1),n=u.dataIndex;n<=c.dataIndex;n++){for(d=n==u.dataIndex?u.xBeforeIndexArr:0,l=n==c.dataIndex?c.xBeforeIndexArr:this.serie.data[n].length,x=0,o=d;l>=o;o+=2){if(s=this.serie.getX(this.serie.data[n][o+y]),p=this.serie.getY(this.serie.data[n][o+v]),this.serie.isFlipped()){var X=s;s=p,p=X}g||(g=s,f=p,I=this.serie.data[n][o+y],Y=this.serie.data[n][o+v]),void 0!=P?(B+=Math.abs((this.serie.data[n][o+y]-D)*(this.serie.data[n][o+v]-Y)*.5),(s!=P||p!=A)&&(P=s,A=p,H.push([s,B]),x++)):(P=s,A=p,D=this.serie.data[n][o+y],F=this.serie.data[n][o+v])}if(this.lastX=s,this.lastY=p,!(g&&f&&this.lastX&&this.lastY))return}0==B&&(B=1),this.maxPx||(this.maxPx=50),this.ratio||(this.ratio=1);for(var w=this.maxIntegration||B,n=0,_=H.length;_>n;n++)H[n][1]=i-H[n][1]/B*this.maxPx*(B/w)*this.ratio,0==n&&(this.firstPointY=H[n][1]),m+=" L "+H[n][y]+", "+H[n][v]+" ",this.lastPointY=H[n][1];this.points=H,this.lastSum=B;var A=f,P=this.lastX;return M=Math.min(20,P-g),m=this.serie.isFlipped()?" M "+i+", "+g+" "+m:" M "+g+", "+i+" "+m,this.setDom("d",m),this.firstX=g,this.firstY=f,this.maxY=this.serie.getY(b),this._selected&&this.select(),this.setHandles(),!0}},setScale:function(t,s){this.maxPx=t,this.maxIntegration=s},setYBaseline:function(t){this.yBasline=t},selectStyle:function(){this.setDom("stroke-width","2px")},selectHandles:function(){},setHandles:function(){this._selected&&void 0!=this.points&&(this.addHandles(),this.handle1.setAttribute("x",this.points[0][0]),this.handle1.setAttribute("y",this.points[0][1]),this.handle2.setAttribute("x",this.points[this.points.length-1][0]-1),this.handle2.setAttribute("y",this.points[this.points.length-1][1]))}}),i});