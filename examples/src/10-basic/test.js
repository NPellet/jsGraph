
define( ['jquery'], function($) {

	return [ function( domGraph ) {

	var graph = new Graph( domGraph, {
    
  } );


  $.getJSON( "src/10-basic/chargeDensity.json", {}, function( sine ) {

    var s = graph.newSerie("Density", {}, "line" )
          .setLineColor('green')
          .autoAxis()
          .setYAxis( graph.getLeftAxis( 1 ) )
          .setData( sine );

          graph.autoscaleAxes();
    graph.draw();

  });



  $.getJSON( "src/10-basic/potential.json", {}, function( sine ) {

    graph.newSerie("Potential", {}, "line" )
          .setLineColor('red')
          .autoAxis()
          .setYAxis( graph.getLeftAxis( 0 ) )
          .setData( sine );

    graph.autoscaleAxes();
    graph.draw();

  });



  $.getJSON( "src/10-basic/electricField.json", {}, function( sine ) {

    graph.newSerie("Electricfield", {}, "line" )
          .setLineColor('blue')
          .autoAxis()
          .setYAxis( graph.getLeftAxis( 2 ) )
          .setData( sine );

    graph.autoscaleAxes();
    graph.draw();

  });



  $.getJSON( "src/10-basic/currentgradient.json", {}, function( sine ) {

    graph.newSerie("currentgradient", {}, "line" )
          .setLineColor('grey')
          .autoAxis()
          .setYAxis( graph.getLeftAxis( 3 ) )
          .setData( sine )
          ;

    graph.autoscaleAxes();
    graph.draw();

  });



  $.getJSON( "src/10-basic/current.json", {}, function( sine ) {

    graph.newSerie("current", {}, "line" )
          .setLineColor('yellow')
          .autoAxis()
          .setYAxis( graph.getLeftAxis( 4 ) )
          .setData( sine );

    graph.autoscaleAxes();
    graph.draw();

  });

		}, 

		"Basic example", 
		[ 'Setting up a chart takes only a couple lines. Call <code>new Graph( domElement );</code> to start a graph. Render it with <code>graph.draw();</code>', 'To add a serie, call <code>graph.newSerie( "serieName" )</code>. To set data, call <code>serie.setData()</code> method.'] 
	];


} );
