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
define([], function() {

	var plugin = function() {};

	plugin.prototype = {

		init: function( graph ) {
			this.graph = graph;
		},
	
		process: function() {
			
			console.log( arguments );

			var series = arguments;
			console.log( series[ 0 ].data );
			console.log( series[ 0 ].getAdditionalData() );

			this.graph.makeShape( {

				type: 'rect',
				pos: {
					x: 0,
					y: 1000
				},

				pos2: {
					x: 10,
					y: 100000000
				},

				fillColor: [ 100, 100, 100, 0.3 ],
				strokeColor: [ 100, 100, 100, 0.9 ],
				strokeWidth: 1

			}).then( function( shape ) {

				shape.draw();
				shape.redraw();
			})

		}
	}


	return plugin;
});
