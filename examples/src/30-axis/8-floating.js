define( function() {

	return [ function( domGraph ) {

		var serie = [ -10, -10, 20, 30 ];

		var graphinstance = new Graph( domGraph );

		graphinstance.getBottomAxis().setFloating( graphinstance.getLeftAxis(), 0 );

		graphinstance.newSerie("temperatures")
			.setLabel( "My serie" )
			.autoAxis()
			.setData( serie )
			.setLineColor('red');

		
		graphinstance.redraw( );
		graphinstance.drawSeries( );


	}, "Floating axis", [ ] 

	]

} );