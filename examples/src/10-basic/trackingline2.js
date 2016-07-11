
define( [ 'jquery'], function( $ ) {

	return [ function( domGraph ) {

	var graph = new Graph( domGraph );
  graph.getYAxis().secondaryGridOff();
  graph.getXAxis().secondaryGridOff();

  graph.getYAxis().setPrimaryGridColor("#f0f0f0");
  graph.getXAxis().setPrimaryGridColor("#f0f0f0");
	
  graph.getYAxis().setUnit( "tons" ).setUnitDecade( true ).setScientific( true ).setEngineering( true ); 

  var coalConsumptionCA = {"request":{"command":"series","series_id":"ELEC.CONS_TOT.COW-CA-99.A"},"series":[{"series_id":"ELEC.CONS_TOT.COW-CA-99.A","name":"Total consumption : coal : California : all sectors : annual","units":"thousand tons","f":"A","description":"Summation of all types of coal; All sectors; ","copyright":"None","source":"EIA, U.S. Energy Information Administration","iso3166":"USA-CA","geography":"USA-CA","start":"2001","end":"2014","updated":"2015-03-27T14:00:55-0400","data":[["2014",876.417],["2013",915.246],["2012",1183.112],["2011",1539.699],["2010",1542.78],["2009",1521.939],["2008",1723.062],["2007",1752.384],["2006",1710.887],["2005",1676.522],["2004",1731.218],["2003",1727.233],["2002",1821.618],["2001",1739.07]]}]}

$.when( 
  $.getJSON("http://api.eia.gov/series/?api_key=060737529563C657DFA3E60961449915&series_id=ELEC.CONS_TOT.COW-CO-99.A", {}, function( data ) {

    var serie = graph.newSerie('CA').setLineColor("#2B65EC").setLineWidth( 2 );
    serie.setData( data.series[ 0 ].data );
    serie.autoAxis();

  } ),

  $.getJSON("http://api.eia.gov/series/?api_key=060737529563C657DFA3E60961449915&series_id=ELEC.CONS_TOT.COW-CA-99.A", {}, function( data ) {

    
    var serie = graph.newSerie('CO').setLineColor("#E42217").setLineWidth( 2 );/*.setMarkers( {


    } );*/

    serie.setMarkers( { type: 2, stroke: 'white', fill: '#E42217', 'stroke-width': 1 }, "tracking" );
  
    serie.setData( data.series[ 0 ].data );
    serie.autoAxis();


    
    

  } )
).then( function() {
/*

  var trackLine = graph.trackingLine( {
      
    mode: "common",
    snapToSerie: graph.getSerie("CA"),

    textMethod: function( output ) {
      var txt = "";
      if( output[ "CA" ] ) {
        txt += "California: " + Math.round( output[ "CA" ].yValue ) + " ktons<br />";
      }
      if( output[ "CO" ] ) {
        txt += "Colorado: " + Math.round( output[ "CO" ].yValue ) + " ktons";
      }

      return txt;
    },

    trackingLineShapeOptions: {
      strokeColor: '#c0c0c0'
    },

    series: [ 
      
    ]

  });*/

  graph.getSerie("CA").allowTrackingLine( {} );


    graph.autoscaleAxes();
    graph.draw();

} );

//




  /*var serie2 = graph.newSerie('test2');
  serie2.setData([0, 0, 4, 6])
  serie2.autoAxis();
*/
  graph.draw();
/*
  var trackLine = graph.trackingLine( {
    snapToSerie: serie,
    series: [ {

      serie: serie
    },
    {
      serie: serie2,
      withinPx: 10

    } ]

  });*/


		}, 

		"Basic example", 
		[ 'Setting up a chart takes only a couple lines. Call <code>new Graph( domElement );</code> to start a graph. Render it with <code>graph.draw();</code>', 'To add a serie, call <code>graph.newSerie( "serieName" )</code>. To set data, call <code>serie.setData()</code> method.'] 
	];


} );
