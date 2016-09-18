
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

      var left = graph.getPlugin('axissplitting').newLeftAxis();
      left.init( graph, {} );


      /*bottom.splitAxis( 0.5 );
      bottom.splitValues( [ [ 0,3], [6,14] ]);
      bottom.splitSpread( true );
      */

      bottom.splitAxis( 0.5 );
      bottom.splitValues( [ [ 0, 3 ], 7 ] );
      bottom.fixGridIntervalBasedOnAxis( 0 );

      left.splitAxis( 0.5 );
      left.splitValues( [ [ 0, 100 ], 1000 ] );

      bottom.gridsOff();
      bottom.setLabel("ABC");

      left.setPrimaryGridColor('red');
      left.setPrimaryGridOpacity( 0.1 );
      left.setPrimaryGridDasharray( "4, 4 " );
      left.setGridLinesStyle();
      left.secondaryGridOff();

      left.setTicksLabelColor('#00aa00');
      left.setPrimaryTicksColor('#00aa00');
      left.setSecondaryTicksColor('#0000aa');

      bottom.axes[ 0 ].setLabel("FIRST");
      bottom.axes[ 1 ].setLabel("SECOND");

      left.axes[ 0 ].setLabel("FIRST");
      left.axes[ 1 ].setLabel("SECOND");

      left.setLabel("GENERAL");

      graph.setBottomAxis( bottom, 0 );

      graph.setLeftAxis( left, 0 );

//console.log( bottom );
      
      var serie = graph.getPlugin('axissplitting').newLineSerie( "s1" )
        .autoAxis()
        .setXAxis( bottom )
        .setYAxis( left )
        .setData( [ 0, 0, 1, 1, 2, 3, 4, 6, 5, 10, 6, 10, 7, 6, 8, 5, 9, 4, 10, 3 ] );

      var serieScatter = graph
                .getPlugin('axissplitting')
                .newScatterSerie('scat', {})
                .autoAxis()
                .setData( [ 1, 1, 2, 3, 3, 1, 4, 6, 5, 1, 7,9, 8,3, 9, 2 ] )
                .setStyle( { shape: 'circle', r: 2, fill: 'rgba(255, 0, 0, 0.3)', stroke: 'rgb(255, 100, 0)' } );

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
