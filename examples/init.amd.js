
requirejs.config({

	baseUrl: '../',
	paths: {
		'jquery': 'src/dependencies/jquery/dist/jquery'
	}
});

require( [ 'bin/app.bundle', 'examples/series' ] , function( Graph, series ) {

	window.contour = series.contour;
	window.series = series.numeric;
	console.log(Graph);
	window.Graph = Graph;

	require( [ 'examples/loadexamples'] );
	
} );
