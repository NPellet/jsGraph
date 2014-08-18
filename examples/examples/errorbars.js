define( function() {

	return [ function( domGraph ) {

		var serie = [],
			error = [];
		for( var i = 0; i < 1; i += 0.2  ) {
			serie.push([ i , Math.pow( i, 2 ) ]);
			error.push( [ [ [ Math.random() / 5, Math.random() / 5 ] ] ] );
		}
		var graphinstance = new Graph( domGraph );
		
		graphinstance.newSerie("serieTest", {}, "scatter")
			.setLabel( "My serie" )
			.autoAxis()
			.setData( serie )
			.setMaxErrorLevel( 1 )
			.setDataError( error );



		graphinstance.redraw( );
		graphinstance.drawSeries();	


	}, "Error bars", [ "Display error bars"] ];

});