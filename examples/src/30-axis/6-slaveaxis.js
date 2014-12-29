define( function() {

	return [ 

    function( domGraph ) {

        var graphinstance = new Graph( domGraph, { 


        dblclick: {
        type: 'plugin',
        plugin: 'graph.plugin.zoom',
        options: {
          mode: 'total'
        }
      },

      plugins: {
        'graph.plugin.zoom': { zoomMode: 'x' },
        'graph.plugin.drag': {}
      },

      pluginAction: {
        'graph.plugin.drag': { shift: true, ctrl: false },
        'graph.plugin.zoom': { shift: false, ctrl: false }
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


  xAxis2.linkToAxis( xAxis, function( val ) { return Math.pow( val + 2, 2 ); }, 1 );
  
  graphinstance.getXAxis().setLabel( 'Voltage (V)' );
  graphinstance.getYAxis().setLabel( 'Current (mA cm-2)' );

  graphinstance.redraw( );
  graphinstance.drawSeries();				


}, "2 aligned axes", 

[
[ 'Add more axis', 'Add as many axis on your graph as you want. Axis on the same side of the graph stack on each other automatically'], 
'You are required to link your series to the axis you want. <code>autoAxis()</code> will bind the serie to the first bottom axis and first left axis.',
'Use <code>axis.adapt0To( otherAxis[, mode, value ] )</code> to adapt the 0 of the axis to another one. If <code>mode</code> (min/max) and value are specified, the min or the max of the axis will take the value <code>value</code>. The other one will be determined by the position of the zero.'
]
];

});


