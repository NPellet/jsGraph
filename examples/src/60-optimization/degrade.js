
define( function() {

	return [ function( domGraph ) {

		var serie = [];
		var date = new Date();
		date.setTime( 0 )
		
		while( date.getTime() < 86400000 * 6 ) {
		
			serie.push( date.getTime() );
			serie.push( Math.sin( date.getHours() / 24 * Math.PI + Math.random() / 5 ) );
			date.setSeconds( date.getSeconds() + 1 );
		}

		var graphinstance = new Graph( domGraph, {

			plugins: {
				'zoom': { zoomMode: 'x' }
			},

			pluginAction: {
				'zoom': { shift: false, ctrl: false }
			},

			dblclick: {
				type: 'plugin',
				plugin: 'zoom',
				options: {
					mode: 'total'
				}
			}
		} );


	//	graphinstance.setBottomAxisAsTime();
	
		graphinstance.newSerie()
			.autoAxis()
			.setData( serie )
			.XIsMonotoneous()
			.degrade( 5 )
			.setFillColor('rgba(200, 0, 0, 0.2)')
			.setLineWidth(0)

		graphinstance.draw( );
					

		}, 

		"Degradation", 
		[ 'Degrade your serie by calling <code>serie.degrade( pxPerPoint )</code>. It will only display one point every <code>pxPerPoint</code> px, by averaging all the points within that range.', 'In addition, it records the min/max values within that particular pixel range and displays them in a zone serie.', '<code>serie.degrade()</code> return the zone serie that you can use as a reference', 'This example has more than 1 million points ! Try to zoom on it to see how fluid it is', 'Degradation is also implemented for series set as <code>{ x: x0, dx: delta, y: [ ... ] } without assigning additional memory !</code>' ] 

	];


} );
