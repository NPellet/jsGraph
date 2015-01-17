define( function() {

	return [ function( domGraph ) {

		var selectedDom = $("<div />");
		$( "#" + domGraph ).parent().append( selectedDom );

		var graphinstance = new Graph( domGraph, {

			plugins: {
				'graph.plugin.selectScatter': {},
				
			},

			pluginAction: {
				'graph.plugin.selectScatter': { shift: false, ctrl: false }
			},

		 series: [ 'scatter' ]


		}, function( graphinstance ) {

			var modificators = [];
			
			var serie = graphinstance.newSerie("serieTest", { }, 'scatter')
				.setLabel( "My serie" )
				.autoAxis()
				.setData( series[ 0 ] )
				.setStyle( 
					{ shape: 'circle', r: 2, fill: 'rgba(255, 0, 0, 0.3)', stroke: 'rgb(255, 100, 1)' }
				)
				.setStyle(
					{
						fill: 'rgba(40, 150, 20, 0.3)',
						stroke: 'rgba( 40, 150, 20, 1)',
						r: 2
					},

					'selected'
				);

			graphinstance.getPlugin('graph.plugin.selectScatter').then( function( plugin ) {
				plugin.setSerie( serie );

				plugin.on('selectionProcess', function( selectedIndices ) {
					
					selectedDom.html( "Selected number: " + selectedIndices.length + "<br />Selected indices: " + selectedIndices.join(", ") );
					
				} );

				plugin.on('selectionEnd', function( selectedIndices ) {
					
					selectedDom.html( "Selection has ended. Number of selection: " + selectedIndices.length );
					
				} );
			});

			graphinstance.redraw( );
			graphinstance.drawSeries();	

		} );
		
	}, "Point selection plugin", [ ]

	];

} );