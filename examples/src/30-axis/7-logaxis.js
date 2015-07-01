define( function() {

	return [ function( domGraph ) {

		var s = [];
		for( var i = 1; i < 1000 ; i += 1 ) {
			
			s.push( Math.pow( 10, - i / 100 ) );
			s.push( 2 * Math.pow( 10, ( - i / 1000 ) ) );
		}

		var graphinstance = new Graph( domGraph, { }, {

				bottom: [ {
					logScale: true
				} ],

			} );



		graphinstance.newSerie("logscale")
			.setLabel( "My serie" )
			.autoAxis()
			.setData( s )
			.setLineColor('red');

		
		graphinstance.redraw( );
		graphinstance.drawSeries( );



	}, "", [ 


		]
	]

} );