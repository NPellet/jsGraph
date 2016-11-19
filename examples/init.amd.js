
requirejs.config({

	baseUrl: '../',
	paths: {
		'jquery': 'src/dependencies/jquery/dist/jquery'
	}
});

//import Graph from '../src/graph.core'

require( [ 'dist/jsgraph-es6', 'examples/series' ] , function( disted, series ) {

	window.contour = series.contour;
	window.series = series.numeric;
	window.Graph = disted;	

	require( [ 'examples/loadexamples'] );
	
} );
