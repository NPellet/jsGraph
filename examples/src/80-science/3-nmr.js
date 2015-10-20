
define( function() {


	return [ function( domGraph ) {

		$.getJSON('../_lib/nmr.json', {}, function( serie ) {


			var graphinstance = new Graph( domGraph, {

				wheel: {
					type: 'plugin',
					plugin: 'graph.plugin.zoom',
					options: {
						direction: 'y'
					}
				},

				dblclick: {
					type: 'plugin',
					plugin: 'graph.plugin.zoom',
					options: {
						mode: 'total'
					}
				},

				plugins: {
					'graph.plugin.zoom': { zoomMode: 'x' },
					'graph.plugin.drag': {}
				},

				pluginAction: {
					'graph.plugin.drag': { shift: true, ctrl: false },
					'graph.plugin.zoom': { shift: false, ctrl: false }
				}
				
			}, function( graphinstance) {
		
				graphinstance.getXAxis().flip( true );

				graphinstance.newSerie("nmr1d")
					.autoAxis()
					.setData( serie )
					.XIsMonotoneous();
					

				graphinstance.redraw( );
				graphinstance.drawSeries();	

			} );
		});
		

	}, "NMR example", [ 


		"This NMR contains more than 130'000 points. Play with it to evaluate the responsiveness of jsGraph !"

	 ] ];

} );