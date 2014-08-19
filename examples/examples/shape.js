
define( function() {

	return [ function( domGraph ) {

			var graphinstance = new Graph( domGraph, function( graphinstance ) {

				graphinstance.setHeight( 240 );
				graphinstance.setWidth( 200 );

				graphinstance.newSerie("temp_nh")
					.setLabel( "My serie" )
					.autoAxis()
					.setLineColor('grey')
					.setData( series[ 0 ] );


				var shape = { type: 'cross', strokeColor: 'red', strokeWidth: 1, pos: { x: 1900, y: 0 } };

				graphinstance.makeShape( shape ).then( function( shape ) {
					shape.draw();
					shape.redrawImpl();

					console.log( shape );
				});


				graphinstance.redraw( );
				graphinstance.drawSeries();	

			} );
			

		}, 

		"Default functionnality", 
		[ 'Basic chart', 'Axis labels', 'Set graphinstance dimension'] 

	];


} );
