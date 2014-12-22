define( function() {

	return [ function( domGraph ) {

		var graphinstance = new Graph( domGraph, function( graphinstance ) {

			var serie = graphinstance.newSerie("serieTest", { }, 'line')
				.setLabel( "My serie" )
				.autoAxis()
				.setData( series[ 0 ] );

			serie.setLineWidth( 2, "selection1");
			serie.setLineColor( "green", "selection1");
			serie.setLineStyle( 2, "selection1");
			

			serie.setMarkers( 

					[
						{
							type: 3,
							points: [ 10, 22, 42 ],
							fill: 'transparent',
							strokeWidth: 4,
							zoom: 3,
							strokeColor: 'green'

						}
					],

					"selection3"
				);

			serie.setMarkers( 

					[
						{
							type: 3,
							points: [ 20, 25, 45 ],
							fill: 'transparent',
							strokeWidth: 4,
							zoom: 3,
							strokeColor: 'red'

						}
					],

					"selection2"
				);

			serie.showMarkers("selection3");
					
		




			var i = 0;
			window.setInterval( function() {
				i++;
				serie.select( "selection" + ( i % 3 + 1) );
			}, 1000 );
			

			graphinstance.redraw( );
			graphinstance.drawSeries();	

		} );
		

	}, "Basic", [ 


	

	]

	];

} );