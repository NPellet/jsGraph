define( function() {

	return [ 

    function( domGraph ) {

        var graphinstance = new Graph( domGraph, {

          plugins: {
            'graph.plugin.shape': {
              type: 'rangex',
              color: [ 0, 100, 100 ],
              fillColor: 'rgba(0,100,100,0.3)',
              strokeColor: 'rgba(0,100,100,1)',
              strokeWidth: 2
            }
          },

          pluginAction: {
            'graph.plugin.shape': { shift: false, ctrl: false }
          }
        },

        function( graphinstance ) {

            graphinstance.getXAxis().forceMin( 0 );
            graphinstance.getXAxis().forceMax( 100 );

            graphinstance.getYAxis().forceMin( 0 );
            graphinstance.getYAxis().forceMax( 100 );

            graphinstance.updateAxes();


          graphinstance.redraw( );
          graphinstance.drawSeries();       


        } );


}, "Shapes", 

[
]
]


});


