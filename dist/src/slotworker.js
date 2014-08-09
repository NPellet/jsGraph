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


onmessage = function( e ) {
	var data = e.data.data;
	var slotNb = e.data.slotNumber;
	var slot = e.data.slot;
	var flip = e.data.flip;
	var max = e.data.max;
	var min = e.data.min;

	var dataPerSlot = slot / (max - min);

	var incrXFlip = 0;
	var incrYFlip = 1;

	if( flip ) {
		incrXFlip = 1;
		incrYFlip = 0;
	}



	this.slotsData = [];

	for(var j = 0, k = data.length; j < k ; j ++ ) {

		for(var m = 0, n = data[ j ].length ; m < n ; m += 2 ) {

			slotNumber = Math.floor( ( data[ j ][ m ] - min ) * dataPerSlot );
			this.slotsData[ slotNumber ] = this.slotsData[ slotNumber ] || { 
					min: data[ j ][ m + incrYFlip ], 
					max: data[ j ][ m + incrYFlip ], 
					start: data[ j ][ m + incrYFlip ],
					stop: false,
					x: data[ j ][ m + incrXFlip ] };

			this.slotsData[ slotNumber ].stop = data[ j ][ m + incrYFlip ];
			this.slotsData[ slotNumber ].min = Math.min( data[ j ][ m + incrYFlip ], this.slotsData[ slotNumber ].min );
			this.slotsData[ slotNumber ].max = Math.max( data[ j ][ m + incrYFlip ], this.slotsData[ slotNumber ].max );

		}
	}

	postMessage( { slotNumber: slotNb, slot: slot, data: this.slotsData } );
};