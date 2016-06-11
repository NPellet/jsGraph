
define( function() {

	return [ function( domGraph ) {

	var graph = new Graph( domGraph, { 
			
		plugins: {
			 'zoom': { zoomMode: 'xy', transition: true },
			 'drag': {
		          persistanceX: true,
		          dragY: false
		        },

		},

		mouseActions: [
			{ plugin: 'zoom', shift: true, ctrl: false },
			{ plugin: 'drag', shift: false, ctrl: false },
			{ callback: function( ) { console.log('sd'); }, shift: true, alt: true },
			{ callback: function() { console.log('mousemove') }, shift: true, type: 'mousemove' },
			{ plugin: 'zoom', shift: true, type: 'mousewheel', options: { baseline: 0, direction: 'y' } },
			{ plugin: 'zoom', shift: true, type: 'dblclick', options: { mode: 'gradualXY' } }
		],

		dblclick: {
			type: 'plugin',
			plugin: 'zoom',
			options: {
				mode: 'gradual'
			}
		}
	}, { });

	var data = [];
	var colors = [];
//	http://stackoverflow.com/questions/17242144/javascript-convert-hsb-hsv-color-to-rgb-accurately
	/* accepts parameters
	 * h  Object = {h:x, s:y, v:z}
	 * OR 
	 * h, s, v
	*/

	var hexChar = ["0", "1", "2", "3", "4", "5", "6", "7","8", "9", "A", "B", "C", "D", "E", "F"];

	function byteToHex(b) {
	  return hexChar[(b >> 4) & 0x0f] + hexChar[b & 0x0f];
	}

	function HSVtoRGB(h, s, v) {
	    var r, g, b, i, f, p, q, t;
	    if (arguments.length === 1) {
	        s = h.s, v = h.v, h = h.h;
	    }
	    i = Math.floor(h * 6);
	    f = h * 6 - i;
	    p = v * (1 - s);
	    q = v * (1 - f * s);
	    t = v * (1 - (1 - f) * s);
	    switch (i % 6) {
	        case 0: r = v, g = t, b = p; break;
	        case 1: r = q, g = v, b = p; break;
	        case 2: r = p, g = v, b = t; break;
	        case 3: r = p, g = q, b = v; break;
	        case 4: r = t, g = p, b = v; break;
	        case 5: r = v, g = p, b = q; break;
	    }
	    return "#" + byteToHex( Math.floor(r * 255) ) + byteToHex( Math.floor(g * 255) ) + byteToHex( Math.floor(b * 255) );
	}

	for( var i = 0; i < Math.PI * 10; i += 0.001 ) {
		data.push( i );
		data.push( Math.sin( i ) );
		colors.push( HSVtoRGB( Math.pow(Math.sin( i ), 2), 0.8, 0.8 ) );
	}

		
		var s = graph.newSerie("a", {}, "line.color").autoAxis().setData(data);
		s.setColors([ colors ]);
		graph.draw();
		var date = Date.now();
		graph.drawSeries( true );

var j = 0;
		for( var i in s.lines ) {
			j++;
		}
		console.log( j );

	}, 

		"Basic example", 
		[ 'Setting up a chart takes only a couple lines. Call <code>new Graph( domElement );</code> to start a graph. Render it with <code>graph.redraw();</code>', 'To add a serie, call <code>graph.newSerie( "serieName" )</code>. To set data, call <code>serie.setData()</code> method.'] 
	];


} );
