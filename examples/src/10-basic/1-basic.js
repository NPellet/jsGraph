
define( function() {

	return [ function( domGraph ) {

	var graphinstance = new Graph( domGraph, { }, { } );
		graphinstance.redraw( );
		
	graphinstance.on("newSerie", function( serie ) {
		console.log( serie );
	})

	var serie = [
  [
    2,
    0.20172022811706417
  ],
  [
    3,
    0.29849959996151115
  ],
  [
    4,
    0.331488021989808
  ],
  [
    5,
    0.36291957080114007
  ],
  [
    6,
    0.3967407038427501
  ],
  [
    7,
    0.4238313004507036
  ]
]

	graphinstance.newSerie("temp_nh", { lineToZero: true } )
        .autoAxis()
        .setData( serie );

	graphinstance.draw();
	

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
		[ 'Setting up a chart takes only a couple lines. Call <code>new Graph( domElement );</code> to start a graph. Render it with <code>graph.redraw();</code>', 'To add a serie, call <code>graph.newSerie( "serieName" )</code>. To set data, call <code>serie.setData()</code> method.'] 
	];


} );
