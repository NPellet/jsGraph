
$.get( './datasets/density.txt', {}, function( txt ) {


	var data = txt
		.split( "\n" )
		.map( function( el ) { 
			return el.split("\t" ).map( parseFloat ) 
		} );

	var graph = new Graph( domGraph ).resize( 350, 300 );
	graph.resize( 400, 300 );

	graph.getXAxis().turnGridsOff();
	graph.getYAxis().turnGridsOff();
	
	var s = graph.newSerie("s1", {}, "densitymap");
	s.setData( data ).autoAxis();
	s.setPxPerBin( 5, 5, false );

	s.colorMapHSL( [
		{ h: 270, s: 1, l: 0.5 }, // Black
		{ h: 0, s: 1, l: 0.5 }, // Red
	], 300 ); // Use 300 colors

	graph.draw();

} );