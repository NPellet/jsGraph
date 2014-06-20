
requirejs.config({
	paths: {
		'jquery': './lib/components/jquery/dist/jquery.min'
	}
});

require( [ 'src/graph' ] , function( Graph ) {

	var functions = [

function( domGraph ) {

	var graph = new Graph( domGraph );
	
	graph.newSerie("serieTest")
		.setLabel( "My serie" )
		.autoAxis()
		.setData( [ [1, 2], [2, 5], [3, 10] ] )
		.showMarkers( true )
		.setMarkerType( 1 );

	graph.newSerie("serieTest")
		.setLabel( "My serie 2" )
		.autoAxis()
		.setData( [ [2, 4], [3, 1], [5, 20] ] )
		.setLineColor('red');


	graph.makeLegend({
		frame: true,
		frameWidth: 1,
		frameColor: "green",
		backgroundColor: "blue"
	});

	graph.redraw( );
	graph.drawSeries();	
}



	]



	for( var i = 0, l = functions.length ; i < l ; i ++ ) {

		functions[ i ]("example-1-graph");
		$("#example-1-source").html( functions[ i ].toString() );



	}




} );