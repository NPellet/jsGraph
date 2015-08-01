define( function() {

	return [ function( domGraph ) {

		var graphinstance = new Graph( domGraph );

		var modificators = [];
		
		var serie = graphinstance.newSerie("serieTest", {

			onMouseover: function( idInArray, valueX, valueY ) {
				console.log( "Mouseover event", idInArray, valueX, valueY );
			}

		}, 'scatter')
			.setLabel( "My serie" )
			.autoAxis()
			.setData( series[ 0 ] )
			.setStyle( { shape: 'circle', r: 2, fill: 'rgba(255, 0, 0, 0.3)', stroke: 'rgb(255, 100, 0)' } )
			

		serie.on("mouseout", function() {
			console.log( 'mouseout' );
		});

		serie.on("mouseover", function() {
			console.log( 'mouseover' );
		});

		graphinstance.draw( );
		


	}, "Mouse events", [ 

	"Use <code>onMouseover</code> and <code>onMouseout</code> options to know when the mouse scans over an element of the scatter serie",
	"The events can also be bound later on to the serie object using <code>serie.on( \"mouseout\", callback )</code>."

	]

	];

} );