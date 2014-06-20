
requirejs.config({
	paths: {
		'jquery': './lib/components/jquery/dist/jquery.min'
	}
});

require( [ 'src/graph' ] , function( Graph ) {

	var g1 = new Graph( "example-1" );
	var legent = g1.makeLegend();
	var serie = g1.newSerie("serieTest").autoAxis().setData( [ [1, 2], [2, 5], [3, 10] ] );
	g1.redraw( );
	g1.drawSeries();	


});