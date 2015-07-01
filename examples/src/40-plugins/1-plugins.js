
define( function() {


	return [ function( domGraph ) {

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
				'drag': {}
			},

			pluginAction: {
				'drag': { shift: true, ctrl: false },
				'zoom': { shift: false, ctrl: false }
			}
			
		} );
			
		graphinstance.newSerie("temp_nh")
			.autoAxis()
			.setData( series[ 3 ] )
			.setMarkers({ 
				type: 1,
				points: [ 'all' ],
				fill: true,
				fillColor: 'red'
			});

		graphinstance.redraw( );
		graphinstance.drawSeries();	

		
	}, "Plugin loading", [ 


		"You can load official plugins using the <code>plugins</code> key in the graph options. Use an object indexed by the plugin name and plugin options as values to load the plugins.",
		"You can easily develop your own plugins. Copy the development code and develop your plugin in the <code>./plugins/</code> folder",
		"Call plugins on double click or on mousewheel using the <code>dblclick</code> and <code>wheel</code> parameters"

	 ] ];

} );