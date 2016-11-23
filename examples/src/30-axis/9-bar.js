
define( function() {

	return [ function( domGraph ) {

		var graphinstance = new Graph( domGraph, {

		}, { bottom: [ { type: 'bar' } ] } );

			
			graphinstance.getBottomAxis().categories = [ 
				{ title: "First", name: '1st'}, 
				{ title: "Sec ", name: 2 }, 
				{ title: "Third ", name: 3 }, 
				{ title: "Fourth", name: "fourth"} 
			];
    		
			graphinstance.newSerie("test", {}, "bar" ).setData( { "1st": 4, 3: 5 } ).autoAxis().setFillColor('red').setFillOpacity(0.1).setLineColor('red');
			graphinstance.newSerie("test2", {}, "bar" ).setData( { "1st": 5, 3: 2 } ).autoAxis().setFillColor('blue').setFillOpacity(0.1).setLineColor('blue');
			graphinstance.newSerie("test3", {}, "bar" ).setData( { "1st": 1, 2: 2, 3: 2, "fourth": 3 } ).autoAxis().setFillColor('green').setFillOpacity(0.1).setLineColor('green');

			graphinstance.getSerie("test").setDataError( { "1st": [ [ 0.2, 0.6 ] ], 3: 1 } ).setErrorStyle( [ { type: 'bar', y: {} } ] );
			graphinstance.getBottomAxis().autoSeries();
    		graphinstance.autoscaleAxes();

    		graphinstance.getLeftAxis().forceMin( 0 );

			graphinstance.draw( );
		
			
			
		},

		"", 
		[ 
		]


	];


} );
