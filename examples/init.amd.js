
requirejs.config({

	baseUrl: '../',
	paths: {
		'jquery': 'src/dependencies/jquery/dist/jquery',
		'katex': 'node_modules/katex/dist/katex'
	}	
});

//import Graph from '../src/graph.core'

require( [ 'dist/jsgraph-es6', 'katex', 'examples/series' ] , function( disted, katex, series ) {

console.log( katex );
	window.katex = katex;
	window.contour = series.contour;
	window.series = series.numeric;
	window.Graph = disted;	

	require( [ 'examples/loadexamples'] );
	
} );
