
define( function() {

	return [ 

    function( domGraph ) {

    	var graph = new Graph( domGraph, {

        plugins: {
          'axissplitting': {}
        } 
      
      } );

      var bottom = graph.getPlugin('axissplitting').newBottomAxis();
      bottom.init( graph, {} );
      /*bottom.splitAxis( 0.5 );
      bottom.splitValues( [ [ 0,3], [6,14] ]);
      bottom.splitSpread( true );
      */

      bottom.splitAxis( 0.5 );
      bottom.splitValues( [ [ 0,3], 7 ]);

      bottom.fixGridIntervalBasedOnAxis( 0 );

      graph.setBottomAxis( bottom, 0 );

//console.log( bottom );
      
      var serie = graph.getPlugin('axissplitting').newLineSerie( "s1" )
        .autoAxis()
        .setXAxis( bottom )
  //      .setYAxis( left )
        .setData( [ 0, 0, 1, 1, 2, 3, 4, 6, 5, 10, 6, 10, 7, 6, 8, 5, 9, 4, 10, 3 ] );

      serie.setLineColor('red');
      serie.setMarkers();
      serie.showMarkers();

      graph.autoscaleAxes();
      graph.draw();


      //graph.getPlugin('serielinedifference').draw();

		}, 

		"Basic example", 
		[ 'Setting up a chart takes only a couple lines. Call <code>new Graph( domElement );</code> to start a graph. Render it with <code>graph.draw();</code>', 'To add a serie, call <code>graph.newSerie( "serieName" )</code>. To set data, call <code>serie.setData()</code> method.'] 
	];


} );
