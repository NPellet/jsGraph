
define( ['./predicted'], function( predicted ) {

	return [ function( domGraph ) {
		
			var graphinstance = new Graph( domGraph, {

				plugins: {
					'zoom': { zoomMode: 'x' }
				}
			} ).resize(500,400);
		
			var nmrserie = Graph.newWaveform();

			nmrserie.setData( predicted[ 1 ], predicted[ 0 ] );
			nmrserie.aggregate();
			
			var s = graphinstance.newSerie( 'serie'  )
				.autoAxis()
				.setWaveform( nmrserie )
				.setLineColor('green');

			graphinstance.draw( );
		}, 
		"", 
		[]	
	];


} );
