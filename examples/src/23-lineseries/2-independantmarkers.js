define( function() {

	return [ function( domGraph ) {

		var graphinstance = new Graph( domGraph, function( graphinstance ) {

			var serie = graphinstance.newSerie("serieTest", { markersIndependant: true }, 'line')
				.setLabel( "My serie" )
				.autoAxis()
				.setData( series[ 0 ] );


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
					]
				);

			serie.extendStyles();


			

			graphinstance.redraw( );
			graphinstance.drawSeries();	

		} );
		

	}, "Independant markers", [ 

		"Independant markers removes an additional jsGraph optimization that can lead to issues when mouse events are associated with markers.",
		"In case markers are very close to each other, some events may not fire, as they are all part of a same DOM element. With independant markers, all usual marker features are preserved, but each marker has now its own DOM element.",
		"This may slow things down a little bit, but if you don't have too many of them it should be fine."
	

	]

	];

} );