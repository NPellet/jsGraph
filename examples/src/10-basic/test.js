
define( function() {

	return [ function( domGraph ) {

	var graph = new Graph( domGraph, {

      plugins: {
        'drag': {
          persistanceX: true
        },
        'zoom': { zoomMode: 'xy' }
      },

      pluginAction: {
        'drag': { shift: false, ctrl: false },
        'zoom': { shift: true, ctrl: false }
      }
    
  } );

  
  graph
    .getLeftAxis()
    .setLogScale( false )
    .setLabel("Current")
    .setUnit("A")
    .setScientific( true )
    .setUnitDecade( true );

    graph.getBottomAxis().setLabel('dsf');
    


  var legend = graph.makeLegend().setDraggable( true );
    
  var sine = [];

  for( var i = 0, l = 1000000; i < l; i ++ ) {
    sine.push( i );
    sine.push( Math.sin( i / 1000 ) );
  }
  var s = graph.newSerie("Some serie", {}, "line" )
        .autoAxis()
        .setData( sine );

  graph.draw();

		}, 

		"Basic example", 
		[ 'Setting up a chart takes only a couple lines. Call <code>new Graph( domElement );</code> to start a graph. Render it with <code>graph.draw();</code>', 'To add a serie, call <code>graph.newSerie( "serieName" )</code>. To set data, call <code>serie.setData()</code> method.'] 
	];


} );
