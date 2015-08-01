define( function() {

	return [ function( domGraph ) {

		var graphinstance = new Graph( domGraph, { }, {

				top: [ {
					flipped: true,
					axisDataSpacing: { min: 0, max: 0 },
					primaryGrid: false,
					secondaryGrid: false,			
					labelValue: "Top axis"
				} ],

				right: [ {
					forcedMax: 0,
					axisDataSpacing: { min: 0 },
					tickPosition: 2,
					secondaryGrid: false
				} ]

			} );

			graphinstance.newSerie("temperatures")
				.setLabel( "My serie" )
				.autoAxis()
				.setData( series[ 0 ] )
				.setLineColor('red');

			
			graphinstance.draw( );
			



	}, "Top and right axis", [ 

		"Specify other axis than the defaults inside the graphs preferences.", 
		'<code>serie.autoAxis()</code> will bind to them automatically', 
		"Adjust the distance between the min/max of your data with the plot zone boundaries"

		]
	]

} );