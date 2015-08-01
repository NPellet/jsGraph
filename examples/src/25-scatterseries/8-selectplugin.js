define( function() {

	return [ function( domGraph ) {

		var selectedDom = $("<div />");
		$( "#" + domGraph ).parent().append( selectedDom );

		var graphinstance = new Graph( domGraph, {

			plugins: {
				'selectScatter': {},
			},

			pluginAction: {
				'selectScatter': { shift: false, ctrl: false, alt: true }
			}
		} );

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

		var plugin = graphinstance.getPlugin('selectScatter');
		plugin.setSerie( serie );

		plugin.on('selectionProcess', function( selectedIndices ) {
			selectedDom.html( "Selected number: " + selectedIndices.length + "<br />Selected indices: " + selectedIndices.join(", ") );
		} );

		plugin.on('selectionEnd', function( selectedIndices ) {
			selectedDom.html( "Selection has ended. Number of selection: " + selectedIndices.length );		
		} );
	
		graphinstance.draw( );
		

		
	}, "Selection plugin", [
		"The selection plugin is here to allow you to select with the mouse a subset of the scatter plot.",
		"The data can then be extracted and used for further analysis, calculations, display, ...",
		"To begin point selection, click somewhere on the graph and start circling the values you want to select."
	] ];

} );