
define( function() {

	return [ function( domGraph ) {

	var graphinstance = new Graph( domGraph, { }, { } );
	
	graphinstance.getLeftAxis(0).setSpan( 0.0, 0.55 ).turnGridsOff().setLabel("Colorado");
	graphinstance.getLeftAxis(1).setSpan( 0.5, 1 ).turnGridsOff().setLabel("California");
	graphinstance.getLeftAxis(2).setSpan( 0.6, 0.8 ).turnGridsOff().setLabel("Kentucky");
	
	graphinstance.getBottomAxis().setPrimaryGridColor("rgba( 100, 100, 0, 0.5 )").setLabel("Year");

	var colorado = [[2015,17559.393],[2014,17944.255],[2013,18881.823],[2012,19263.158],[2011,18744.067],[2010,18978.981],[2009,17351.28],[2008,18961.826],[2007,19532.855],[2006,19707.00899],[2005,19013.11703],[2004,19251.20903],[2003,19595.836],[2002,19446.04],[2001,19764.973]];
	var california = [[2015,34522.242],[2014,39213.757],[2013,39474.651],[2012,38978.114],[2011,42542.656],[2010,41890.627],[2009,39271.173],[2008,42190.776],[2007,41064.161],[2006,41937.83301],[2005,40352.02201],[2004,39342.39199],[2003,38521.048],[2002,38604.897],[2001,41305.269]];
	var kentucky = [[2015,664.166],[2014,878.434],[2013,915.246],[2012,1183.112],[2011,1539.699],[2010,1542.78],[2009,1521.939],[2008,1723.062],[2007,1752.384],[2006,1710.887],[2005,1676.522],[2004,1731.218],[2003,1727.233],[2002,1821.618],[2001,1739.07]];

	graphinstance
		.newSerie( "colorado" )
		.setData( colorado )
		.autoAxis()
		.setYAxis( graphinstance.getLeftAxis( 0 ) )
		.setLineColor("#CF4E4E")
		.setLineWidth( 2 );

	graphinstance.getLeftAxis( 0 )
		.forceMin( 16000 )
		.forceMax( 19600 );

	graphinstance
		.newSerie( "california" )
		.setData( california )
		.autoAxis()
		.setYAxis( graphinstance.getLeftAxis( 1 ) )
		.setLineColor("#3EA63E")
		.setLineWidth( 2 );

	graphinstance
		.newSerie( "kentucky" )
		.setData( kentucky )
		.autoAxis()
		.setYAxis( graphinstance.getLeftAxis( 2 ) )
		.setLineColor("#2F7C7C")
		.setLineWidth( 2 );



	graphinstance.draw();

	}, 

		"Basic example", 
		[ 'Setting up a chart takes only a couple lines. Call <code>new Graph( domElement );</code> to start a graph. Render it with <code>graph.redraw();</code>', 'To add a serie, call <code>graph.newSerie( "serieName" )</code>. To set data, call <code>serie.setData()</code> method.'] 
	];


} );
