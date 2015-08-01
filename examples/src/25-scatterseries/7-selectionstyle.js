define( function() {

	return [ function( domGraph ) {

		var graphinstance = new Graph( domGraph );

		var modificators = [];
		
		var serie = graphinstance.newSerie("serieTest", {}, 'scatter')
			.setLabel( "My serie" )
			.autoAxis()
			.setData( series[ 0 ] )
			.setStyle(
				{ shape: 'circle', r: 2, fill: 'rgba(255, 0, 0, 0.3)', stroke: 'rgb(255, 100, 0)' }
			)
			.setStyle(
				{ stroke: 'green', fill: 'rgba(20, 255, 40, 0.5)', transform: 'scale(2, 2)' },
				"selected"
			)
			.setStyle(
				{ stroke: 'blue', fill: 'rgba(20, 250, 255, 0.5)', transform: 'scale(2, 2)' },
				"hover"
			)
			.setStyle(
				{ stroke: 'orange', fill: 'rgba(220, 255, 40, 0.5)', transform: 'scale(5, 5)' },
				"specialSelection"
			);

		serie.on("mouseout", function( index ) {
			serie.unselectPoint( index );
		});

		
		serie.on("mouseover", function( index ) {			
			serie.selectPoint( index, "hover" );
		});

		graphinstance.draw( );
		
		serie.selectPoint( 100, "specialSelection" );

		var index, lastIndex;
		window.setInterval( function() {

			if( lastIndex ) {
				serie.selectPoint( lastIndex, false ); // Unselect
			}

			index = Math.round( Math.random() * ( series[ 0 ].length / 2 - 1 ) );
			
			serie.selectPoint( index );
			lastIndex = index;

		}, 1000 );


	}, "Selected point styles", [ 


	"You may use different point to point selection styles. The <code>setStyle</code> takes a string as second or third argument to which your specific style has been assigned",
	"Call the selection using <code>serie.selectPoint( pointIndex, \"yourSpecificStyleName\")</code> to select it with your style or <code>serie.unselectPoint</code> to go back in the unselected mode"

	]

	];

} );