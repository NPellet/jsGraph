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
onmessage=function(t){var a=t.data.data,s=t.data.slotNumber,o=t.data.slot,l=t.data.flip,m=t.data.max,r=t.data.min,e=o/(m-r),i=0,h=1;l&&(i=1,h=0),this.slotsData=[];for(var u=0,b=a.length;b>u;u++)for(var n=0,N=a[u].length;N>n;n+=2)slotNumber=Math.floor((a[u][n]-r)*e),this.slotsData[slotNumber]=this.slotsData[slotNumber]||{min:a[u][n+h],max:a[u][n+h],start:a[u][n+h],stop:!1,x:a[u][n+i]},this.slotsData[slotNumber].stop=a[u][n+h],this.slotsData[slotNumber].min=Math.min(a[u][n+h],this.slotsData[slotNumber].min),this.slotsData[slotNumber].max=Math.max(a[u][n+h],this.slotsData[slotNumber].max);postMessage({slotNumber:s,slot:o,data:this.slotsData})};