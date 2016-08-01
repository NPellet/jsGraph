
define( function() {

	return [ function( domGraph ) {

	var graph = new Graph( domGraph, {

    plugins: {
      'serielinedifference': {}
    } 
  
  } );

graph
.newSerie("s1")
.autoAxis()
.setData( [ [ 0, 0, 1, 1, 2, 3 ], [ 4, 6, 5, 10, 6, 10 ], [ 7, 6, 8, 5, 9, 4, 10, 3 ] ] );

graph
.newSerie("s2")
.autoAxis().setData( [ [ 0, 4, 1, 3, 2, 1, 3, -1], [  4, -1, 5, 7, 6, 15], [  7, 7, 8, 1, 9, 1, 10, 1 ] ] )

  graph.draw();

  graph.getPlugin('serielinedifference').setSeries( graph.getSerie('s1'), graph.getSerie('s2') );
  graph.getPlugin('serielinedifference').setBoundaries(0, 10 );
  graph.getPlugin('serielinedifference').draw();

		}, 

		"Basic example", 
		[ 'Setting up a chart takes only a couple lines. Call <code>new Graph( domElement );</code> to start a graph. Render it with <code>graph.draw();</code>', 'To add a serie, call <code>graph.newSerie( "serieName" )</code>. To set data, call <code>serie.setData()</code> method.'] 
	];


} );
