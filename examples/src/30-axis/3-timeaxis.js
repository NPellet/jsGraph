
define( function() {

	return [ function( domGraph ) {

		var serie = [];
		var date = new Date();
		date.setTime( date.getTime() - 86400000 * 3)
		
		while( date.getTime() < Date.now() ) {
		
			serie.push( date.getTime() );
			serie.push( Math.sin( date.getHours() / 24 * Math.PI + Math.random() / 5 ) );

			date.setSeconds( date.getSeconds() + 1 );
		}

		var serie = [
   1440000000000,
  28.330000000000002,
  1439996400000,
  28.36,
  1439992800000,
  28.22,
  1439989200000,
  28.400000000000002,
  1439985600000,
  28.45,
  1439982000000,
  29.69,
  1439978400000,
  30.22,
  1439974800000,
  30.18,
  1439971200000,
  30.330000000000002,
  1439967600000,
  30.330000000000002,
  1439964000000,
  30.26,
  1439960400000,
  30.37,
  1439956800000,
  30.3,
  1439953200000,
  30.14,
  1439949600000,
  30.16,
  1439946000000,
  29.96,
  1439942400000,
  29,
  1439938800000,
  29.2,
  1439935200000,
  28.76,
  1439931600000,
  28.62,
  1439928000000,
  28.900000000000002,
  1439924400000,
  28.92,
  1439920800000,
  27.740000000000002,
  1439917200000,
  27.47,
  1439913600000,
  27.55,
  1439910000000,
  27.05,
  1439906400000,
  27.26,
  1439902800000,
  27.810000000000002,
  1439874000000,
  29.63,
  1439870400000,
  29.79,
  1439866800000,
  29.85,
  1439863200000,
  30.05,
  1439859600000,
  30.060000000000002,
  1439856000000,
  30.02,
  1439852400000,
  30.150000000000002,
  1439848800000,
  30.22,
  1439845200000,
  30.14,
  1439841600000,
  30.21,
  1439838000000,
  30.310000000000002,
  1439834400000,
  30.25,
  1439830800000,
  30.26,
  1439827200000,
  30.42,
  1439823600000,
  30.43,
  1439820000000,
  30.25,
  1439816400000,
  30.23,
  1439812800000,
  30.150000000000002,
  1439809200000,
  29.88,
  1439805600000,
  29.75,
  1439802000000,
  29.8,
  1439798400000,
  29.63,
  1439794800000,
  29.53,
  1439791200000,
  29.66,
  1439787600000,
  29.69,
  1439784000000,
  29.67,
  1439780400000,
  29.82,
  1439776800000,
  29.88,
  1439773200000,
  29.84,
  1439769600000,
  29.95,
  1439766000000,
  30.060000000000002,
  1439762400000,
  30.01
]




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
			
		}, { bottom: [ { type: 'time' } ] } );

	
		var s = graphinstance.newSerie( "name", {
  
      "trackMouse": false,
      "markersIndependant": false,
      "lineToZero": false,
      "useSlots": false,
      "strokeWidth": 1

    })
			.autoAxis()
			.setData( serie )
			.XIsMonotoneous();

      s
			.degrade( 2 )
			.setFillColor('rgba(0,0,0,0.1)')
			.setLineColor('transparent')

      s
      .showMarkers()
      .setMarkers(     
        {

          type: 1,
          points: [ 'all' ],
          fill: true

        } );


		graphinstance.draw( );
		
			
			
		},

		"Time axis", 
		[ 

		'Noone really wants to display epoch values on an x axis. You can use <code>graph.setBottomAxisAsTime()</code> to notify that the bottom axis should be timed.',
		'It will enable a special rendering for the x axis shows the time according to the level of zooming you are using. It works great with the zoom plugin, with the data degradation and with the monotoneous option !'

		]


	];


} );
