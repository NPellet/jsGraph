
define( function() {

	return [ function( domGraph ) {

	var graph = new Graph( domGraph );
	
  var serie = graph.newSerie('test');
  serie.setData([0, 0, 1, 1, 2, 2, 3, 1, 4, 0]);
  serie.autoAxis();
  graph.draw();

  var xAxis = graph.getXAxis();
  var yAxis = graph.getYAxis();

  xAxis.zoom(1, 3);
  yAxis.zoom(1, 2);
  graph.draw();

		}, 

		"Basic example", 
		[ 'Setting up a chart takes only a couple lines. Call <code>new Graph( domElement );</code> to start a graph. Render it with <code>graph.draw();</code>', 'To add a serie, call <code>graph.newSerie( "serieName" )</code>. To set data, call <code>serie.setData()</code> method.'] 
	];


} );
