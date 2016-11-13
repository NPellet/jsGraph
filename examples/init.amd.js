
requirejs.config({

	baseUrl: '../',
	paths: {
		'jquery': 'src/dependencies/jquery/dist/jquery'
	}
});

require( [ 'dist/jsgraph-es6', 'examples/series' ] , function( Graph, series ) {

	window.contour = series.contour;
	window.series = series.numeric;
	window.Graph = Graph;

	require( [ 'examples/loadexamples'] );
	
} );
