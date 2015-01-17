define( function() {

	return [ function( domGraph ) {

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
					{ shape: 'circle', r: 2, fill: 'rgba(255, 0, 0, 0.3)', stroke: 'rgb(255, 100, 0)' }
				);

			graphinstance.getPlugin('graph.plugin.selectScatter').then( function( plugin ) {
				plugin.setSerie( serie );
			});

			graphinstance.redraw( );
			graphinstance.drawSeries();	

		} );
		

	}, "Basic", [ 


	"Display a scatter plot using <code>graph.newSerie(name, options, 'scatter')</code>. Setting the data remains the same", "To specify how the scattered points have to look like, use <code>serie.setDataStyle( general, modificators ).</code> The parameter <code>general</code> defines what all shapes look like. The parameter <code>modificator</code> (array) allows you to override the shapes for the points at the non-null indices of the array."


	]

	];

} );