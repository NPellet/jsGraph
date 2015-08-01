define( function() {

	return [ 

    function( domGraph ) {

        var graphinstance = new Graph( domGraph, {

          plugins: {
            'shape': {
              type: 'rangex',
              color: [ 0, 100, 100 ],
              fillColor: 'rgba(0,100,100,0.3)',
              strokeColor: 'rgba(0,100,100,1)',
              strokeWidth: 1,
              resizable: true,
              locked: false
            }
          },

          pluginAction: {
            'shape': { shift: false, ctrl: false }
          }
        } );

     
        graphinstance.getXAxis().forceMin( 0 );
        graphinstance.getXAxis().forceMax( 100 );

        graphinstance.getYAxis().forceMin( 0 );
        graphinstance.getYAxis().forceMax( 100 );

        
        graphinstance.draw( );
        

}, "Shapes", 

[
]
]


});


