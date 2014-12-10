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
				.setStyle(
					{ shape: 'circle', r: 2, fill: 'rgba(255, 0, 0, 0.3)', stroke: 'rgb(255, 100, 0)' }
				)
				.setStyle(
					{ stroke: 'green', fill: 'rgba(20, 255, 40, 0.5)', transform: 'scale(2, 2)' },
					"selected"
				);


			serie.on("mouseout", function() {
				console.log( 'mouseout' );
			})

			graphinstance.redraw( );
			graphinstance.drawSeries();	

			

			var index, lastIndex;
			window.setInterval( function() {

				if( lastIndex ) {
					serie.selectPoint( lastIndex, false ); // Unselect
				}


				index = Math.round( Math.random() * ( series[ 0 ].length / 2 - 1 ) );
				serie.selectPoint( index );
				lastIndex = index;


			}, 1000 )

		} );

	}, "Scatter plot", [ 


	"Use <code>onMouseover</code> and <code>onMouseout</code> events to know when the mouse scans over an element of the scatter serie"


	]

	];

} );