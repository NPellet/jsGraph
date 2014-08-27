
define( function() {

	return [ function( domGraph ) {

			var graphinstance = new Graph( domGraph );
			
			graphinstance.newSerie("temp_nh")
				.setLabel( "My serie" )
				.autoAxis()
				.setData( series[ 0 ] );

			graphinstance.getYAxis().setLabel( "Anomaly (°C)");
			graphinstance.getXAxis().setLabel( "Years");

			graphinstance.redraw( );
			graphinstance.drawSeries();
		}, 

		"Default functionnality", 
		[ 'Setting up a chart takes only a couple lines. Call <code>new Graph( domElement );</code> to start a graph. Render it with <code>graph.redraw();</code>', 'To add a serie, call <code>graph.newSerie( "serieName" )</code>. To set data, call <code>serie.setData()</code> method.'] 
	];


} );
