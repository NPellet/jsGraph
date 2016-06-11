
requirejs.config({

	baseUrl: '../',
	paths: {
		'jquery': './src/dependencies/jquery/dist/jquery.min',
		'graph': './dist/jsgraph'
	}
});

require( [ 'jquery', './src/graph'] , function( $, Graph ) {

	window.Graph = Graph;
	
	$("textarea").bind('keyup', function() {

		var val = $( this ).prop( 'value' );

		try {

			var wrapper = $("#graph").get(0);
			$("#graph").empty();

			var schema = JSON.parse( val );
			var graph = Graph.fromSchema( schema, wrapper );

			graph.resize( 500, 300 );
			graph.drawSeries( true );
		} catch ( e ) {
			console.error( e );
		}
	})

} );