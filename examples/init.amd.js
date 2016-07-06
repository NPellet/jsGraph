
requirejs.config({

	baseUrl: '../',
	paths: {
		'jquery': 'src/dependencies/jquery/dist/jquery.min'
	}
});

require( [ 'jquery', 'src/graph', 'examples/series' ] , function( $, Graph, series ) {

	window.contour = series.contour;
	window.series = series.numeric;
	window.Graph = Graph;

	var options = {};

	require( [ 'examples/loadexamples'] );
	
} );
