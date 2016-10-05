
define( ['jquery'], function( $ ) {

	return [ function( domGraph ) {
/*
	var graph = new Graph( domGraph, { 
		
	}, { });

	graph.resize(800, 100);
	graph.getXAxis().turnGridsOff().setDisplay( false );
	graph.getYAxis().turnGridsOff().setDisplay( false );

	var s = graph.newSerie("density", {}, "densitymap");
	var data = []; 

	for( var i = 1; i < 200; i ++ ) { 
		for( var j = 0; j < i; j ++ ) { 
			data.push( [ i + j / i, 0 ] );
		}
	}

	s.setData( data ).autoAxis();
	graph
		.getYAxis()
		.forceMin( -0.5 )
		.forceMax( 0.5 );

	//s.setPxPerBin( false, 20, true );
	s.setBinsFromTo( 'x', 0.5, 199.5, 199 );
	s.setBinsFromTo( 'y', -0.5, 0.5, 3 );

	s.colorMapHSL( [
		{ h: 0, s: 1, l: 0 }, // Black
		{ h: 0, s: 1, l: 0.5 }, // Red
		{ h: 60, s: 1, l: 0.5 } // Yellow
	], 300 ); // Use 300 colors
	graph.draw();


*/

	$.get( './src/10-basic/density.txt', {}, function( txt ) {
		var data = txt.split("\n").map( function(el ) { return el.split("\t" ).map( parseFloat ) } );
		var graph = new Graph( domGraph ).resize(350, 300);
		graph.getXAxis().turnGridsOff();
		graph.getYAxis().turnGridsOff();
		var s = graph.newSerie("s1", {}, "densitymap");
		s.setData( data ).autoAxis();
		s.setPxPerBin( 5, 5, false );
/*
		s.onRedrawColorMapBinBoundaries( function( min, max ) {
			return [ ( max + min ) / 2, max ];
		});
*/
		s.colorMapHSL( [
			{ h: 270, s: 1, l: 0.5 }, // Black
			{ h: 0, s: 1, l: 0.5 }, // Red
		], 300 ); // Use 300 colors
		graph.draw();
	});




	}, 

	"",
	[ ] 
];


} );
