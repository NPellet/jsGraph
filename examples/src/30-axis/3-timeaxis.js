
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
  1436911200000,
  1,
  1434664800000,
  1,
  1427238000000,
  1,
  1412373600000,
  1,
  1346450400000,
  1,
  1399672800000,
  1,
  1365199200000,
  1,
  1433628000000,
  1,
  1394924400000,
  1,
  1407967200000,
  1,
  1342476000000,
  1,
  1424905200000,
  1,
  1433196000000,
  1,
  1382824800000,
  1,
  1395788400000,
  1,
  1436997600000,
  1,
  1374530400000,
  1,
  1383433200000,
  1,
  1386370800000,
  1,
  1376085600000,
  1,
  1432072800000,
  1,
  1341266400000,
  1,
  1384642800000,
  1,
  1337551200000,
  1,
  1392937200000,
  1,
  1357340400000,
  1,
  1364767200000,
  1,
  1397685600000,
  1,
  1306620000000,
  1,
  1386284400000,
  1,
  1396216800000,
  1,
  1378850400000,
  1,
  1381960800000,
  1,
  1355698800000,
  1,
  1423350000000,
  1,
  1407189600000,
  1,
  1374357600000,
  1,
  1432591200000,
  1,
  1406152800000,
  1,
  1403042400000,
  1,
  1331679600000,
  1,
  1433023200000,
  2,
  1382914800000,
  2,
  1435010400000,
  3,
  1437516000000,
  3,
  1383951600000,
  3,
  1406498400000,
  4,
  1436047200000,
  5
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

	
		graphinstance.newSerie()
			.autoAxis()
			.setData( serie )
			.XIsMonotoneous()
			.degrade( 2 )
			.setFillColor('rgba(0,0,0,0.1)')
			.setLineColor('transparent');


		graphinstance.draw( );
		
			
			
		},

		"Time axis", 
		[ 

		'Noone really wants to display epoch values on an x axis. You can use <code>graph.setBottomAxisAsTime()</code> to notify that the bottom axis should be timed.',
		'It will enable a special rendering for the x axis shows the time according to the level of zooming you are using. It works great with the zoom plugin, with the data degradation and with the monotoneous option !'

		]


	];


} );
