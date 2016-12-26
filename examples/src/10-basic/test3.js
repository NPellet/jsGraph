
define( ['jquery'], function( $ ) {

	return [ function( domGraph ) {


$.get( '../web/sources/datasets/density.txt', {}, function( txt ) {


	var data = txt
		.split( "\n" )
		.map( function( el ) { 
			return el.split("\t" ).map( parseFloat ) 
		} );

	var graph = new Graph( domGraph );
	graph.resize( 400, 300 );
		graph.resize( 400, 600 );
			graph.resize( 400, 100 );

	graph.getXAxis().turnGridsOff();
	graph.getYAxis().turnGridsOff();
	
	var s = graph.newSerie("s1", {}, "densitymap");
	s.autoAxis().setData( data );
	s.setPxPerBin( 5, 5, false );

	s.colorMapHSL( [
		{ h: 270, s: 1, l: 0.5 }, // Black
		{ h: 0, s: 1, l: 0.5 }, // Red
	], 300 ); // Use 300 colors

	graph.draw();

} );


	}, 

		"Basic example", 
		[ 'Setting up a chart takes only a couple lines. Call <code>new Graph( domElement );</code> to start a graph. Render it with <code>graph.redraw();</code>', 'To add a serie, call <code>graph.newSerie( "serieName" )</code>. To set data, call <code>serie.setData()</code> method.'] 
	];


} );
