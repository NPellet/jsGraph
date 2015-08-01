define( function() {

	return [ 

    function( domGraph ) {

        var graphinstance = new Graph( domGraph, { 


        dblclick: {
        type: 'plugin',
        plugin: 'zoom',
        options: {
          mode: 'total'
        }
      },

      plugins: {
        'zoom': { zoomMode: 'x' },
        'drag': {}
      },

      pluginAction: {
        'drag': { shift: true, ctrl: false },
        'zoom': { shift: false, ctrl: false }
      }
      

      } );
	// BEGIN IGNORE ON BUILD


	// END IGNORE ON BUILD
var axisProperties = { primaryGrid: false, secondaryGrid: false, nbTicksPrimary: 5 },
  xAxis2 = graphinstance.getXAxis( 1, axisProperties ),
  xAxis = graphinstance.getXAxis( 0, axisProperties ),
  leftAxis = graphinstance.getLeftAxis( 0, axisProperties );
  
  graphinstance.newSerie( "current" )
    .autoAxis()
    .setData( series[ 0 ] )
    .setLineColor('black');

  graphinstance.redraw( ); // Need to force an axis redraw first

  xAxis2.linkToAxis( xAxis, function( val ) { return val - new Date().getFullYear() }, 1 );
  
  graphinstance.getXAxis().setLabel( 'Year' );
  graphinstance.getXAxis( 1 ).setLabel( 'Year till now' );


  graphinstance.draw( );
  


}, "2 aligned axes", 

[]
];

});


