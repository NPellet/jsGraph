define( function() {

	return [ function( domGraph ) {

		var s = [];
		for( var i = 1; i < 100 ; i += 1 ) {
			
			s.push( Math.pow( 10, - i / 100 ) );
			s.push( 2 * Math.pow( 10, ( - i / 1000 ) ) );
		}

		console.log( s );


		new Graph( domGraph, { }, {

				bottom: [ {
					logScale: true
				} ],

			}, function( graphinstance ) {	

				graphinstance.newSerie("logscale")
					.setLabel( "My serie" )
					.autoAxis()
					.setData( s )
					.setLineColor('red');

				
				graphinstance.redraw( );
				graphinstance.drawSeries( );

			}
		);


	}, "", [ 


		]
	]

} );