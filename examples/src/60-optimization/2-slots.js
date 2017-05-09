
define( ['./predicted'], function( predicted ) {
console.log( predicted );
	return [ function( domGraph ) {
		
			var graphinstance = new Graph( domGraph, {

				plugins: {
					'zoom': { zoomMode: 'x' }
				}
			} );
		
			var nmrserie = Graph.newWaveform();
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
