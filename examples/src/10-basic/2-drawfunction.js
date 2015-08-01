
define( function() {

	return [ function( domGraph ) {

	var graphinstance = new Graph( domGraph, { }, { } );

	var serie = [ 0, 0, 1, 0, 2, 1, 3, 1, 4, 0, 5, 0 ];
	graphinstance.newSerie("temp_nh" ).autoAxis().setData( serie );

    graphinstance.autoscaleAxes();
	graphinstance.draw();

	graphinstance.getSerie("temp_nh").setLineColor('red');
	graphinstance.draw();

	graphinstance.getSerie("temp_nh").styles[ "unselected" ].lineColor = 'green';
	// Will not turn green unless an additional graphinstance.getSerie("temp_nh").styleHasChanged(); is called (there is no way to determine that the style has changed externally)
	graphinstance.draw();

	graphinstance.getSerie("temp_nh").setLineStyle( 2 );
	graphinstance.draw(); // Now not only will the serie become green, it will also become dashed. The style officially has changed.

	var serie = [ 0, 0, 1, 0, 2, 1, 3, 1, 4, 0, 5, 1 ];
	graphinstance.getSerie("temp_nh").setData( serie );
	graphinstance.draw(); // Data has changed, so it will be redrawn.

	graphinstance.getSerie("temp_nh").styleHasChanged();
	graphinstance.draw(); // Now it becomes green

	graphinstance.getSerie("temp_nh").setMarkers( [
		{
			type: 3,
			points: [ 0, 1, 4 ],
			fill: 'transparent',
			strokeWidth: 4,
			zoom: 3,
			strokeColor: 'green'
		}
	] ); // At this point, no markers yet
	graphinstance.draw(); // Now the markers appear



	}, 

		"Basic example", 
		[ 'Setting up a chart takes only a couple lines. Call <code>new Graph( domElement );</code> to start a graph. Render it with <code>graph.redraw();</code>', 'To add a serie, call <code>graph.newSerie( "serieName" )</code>. To set data, call <code>serie.setData()</code> method.'] 
	];


} );
