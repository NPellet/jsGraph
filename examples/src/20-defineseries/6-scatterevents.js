define( function() {

	return [ function( domGraph ) {

		var graphinstance = new Graph( domGraph, { series: [ 'scatter' ] }, function( graphinstance ) {

			var modificators = [];
			
			var serie = graphinstance.newSerie("serieTest", {

				onMouseover: function( idInArray, valueX, valueY ) {
					console.log( "Mouseover event", idInArray, valueX, valueY );
				}

			}, 'scatter')
				.setLabel( "My serie" )
				.autoAxis()
				.setData( series[ 0 ] )
				.setDataStyle(
					{ shape: 'circle', r: 2, fill: 'rgba(255, 0, 0, 0.3)', stroke: 'rgb(255, 100, 0)' }
				);


			serie.on("mouseout", function() {
				console.log( 'mouseout' );
			})

			graphinstance.redraw( );
			graphinstance.drawSeries();	

		} );

	}, "Scatter plot", [ 


	"Use <code>onMouseover</code> and <code>onMouseout</code> events to know when the mouse scans over an element of the scatter serie"


	]

	];

} );