
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


			var wrapper = $("#graph").get(0);
			$("#graph").empty();

		try {
			var schema = JSON.parse( val );
		} catch ( e ) {
			console.error( e );
		}
			var graph = Graph.fromSchema( schema, wrapper );

			graph.resize( 500, 300 );
			graph.drawSeries( true );
		
	})

} );