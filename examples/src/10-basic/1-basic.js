
define( function() {

	return [ function( domGraph ) {

	var graphinstance = new Graph( domGraph, { 

  plugins: {
        'zoom': { zoomMode: 'x' },
      },

      pluginAction: {
        'zoom': { shift: false, ctrl: false }
      },

      
      wheel: {
        type: 'plugin',
        plugin: 'zoom',
        options: {
          direction: 'y'
        }
      },

      dblclick: {
        type: 'plugin',
        plugin: 'zoom',
        options: {
          mode: 'total'
        }
      },

    }, { } );
		graphinstance.redraw( );
		

  var series2 = [

    [ 1, 1, 2, 3, 3, 1],
    [ 1, 2, 2, 3, 3, 2],
    [ 1, 3, 2, 2, 3, 3]
  ]



	graphinstance.newSerie("temp_nh" )
        .autoAxis()
        .XIsMonotoneous()
;

	graphinstance.draw();

  var i = 0;
  setInterval( function() {
    i++;
console.log( i % 3 );
    graphinstance.newSerie("temp_nh" ).setData( series2[ i % 3 ] );

    if(i % 3 == 0 ) {
      graphinstance.autoscaleAxes();
    }
    graphinstance.draw();
  }, 3000 )
	

	//graphinstance.drawSeries();

/*
      var serie2 = [ 1850, 100, 1900 , 0, 1950, -100 ];
      graphinstance.newSerie("222")
        .autoAxis()
        .setData( serie2 )
        .setMarkers();
  */    
	

		}, 

		"Basic example", 
		[ 'Setting up a chart takes only a couple lines. Call <code>new Graph( domElement );</code> to start a graph. Render it with <code>graph.draw();</code>', 'To add a serie, call <code>graph.newSerie( "serieName" )</code>. To set data, call <code>serie.setData()</code> method.'] 
	];


} );
