
define( ['./predicted'], function( predicted ) {

	return [ function( domGraph ) {
		
			var graphinstance = new Graph( domGraph, {

				plugins: {
					'zoom': { zoomMode: 'x', transition: true },
					'drag': {}
				},

				mouseActions: [
					{ plugin: 'zoom', shift: false, ctrl: false },
					{
						type: 'dblclick',
						plugin: 'zoom',
						options: {
							mode: 'total'
						}
					},
					{
						type: "mousewheel",
						plugin: 'zoom',
						options: {
							mode: 'y',
							direction: 'y'
						}
					}
				]

			} ).resize(500,400);
		
			var nmrserie = Graph.newWaveform();
predicted[ 1 ] = predicted[ 1 ].map( ( val ) => val + ( Math.random() - 0.5 ) * 1000000000000 );
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
