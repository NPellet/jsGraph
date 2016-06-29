
define( function() {

	return [ function( domGraph ) {

	var graph = new Graph( domGraph, { 
		
	}, { });

	graph.getXAxis().turnGridsOff();
	graph.getYAxis().turnGridsOff();
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





	for( var i = 0; i < Math.PI * 1000; i += 0.001 ) {
		data.push( [ Math.sin( i ) * Math.sin( i ) + Math.pow( Math.random(), 1.2 ) / 5, Math.cos( i ) - Math.sin( i )  + Math.pow( Math.random(), 1.2 ) / 5 ] );
	}

	
	var s = graph.newSerie("a", {}, "densitymap").setData( data ).autoAxis();
	s.autoBins( 100, 100 );
	s.autoColorMapHSV( { h: 1, s: 0.4, v: 0.2 }, { h: 0, s: 1, v:1 } );

	graph.autoscaleAxes();

	graph.draw();
	}, 

	"",
	[ ] 
];


} );
