define( function() {

	return [ function( domGraph ) {

		var s = [];
		for( var i = 1; i < 1000 ; i += 1 ) {
			
			s.push( Math.pow( 10, - i / 100 ) );
			s.push( 2 * Math.pow( 10, ( - i / 1000 ) ) );
		}

		var graphinstance = new Graph( domGraph, {


				wheel: {
					type: 'plugin',
					plugin: 'zoom',
					options: {
						direction: 'y'
					}
				},

				dblclick: {
					type: 'plugin',
					plugin: 'zoom',
					options: {
						mode: 'total'
					}
				},

				plugins: {
					'zoom': { zoomMode: 'xy' },
				},

				pluginAction: {
					'zoom': { shift: false, ctrl: false }
				}
				

				 }, {

				bottom: [ {
					logScale: true
				} ]

			} );



		graphinstance.newSerie("logscale")
			.setLabel( "My serie" )
			.autoAxis()
			.setData( s )
			.setLineColor('red');

		
		graphinstance.draw( );
		



	}, "", [ 


		]
	]

} );