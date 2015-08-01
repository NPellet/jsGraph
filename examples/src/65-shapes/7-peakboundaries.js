define( function() {

	return [ 

    function( domGraph ) {

        var graphinstance = new Graph( domGraph );

        graphinstance.getXAxis().forceMin( 0 );
        graphinstance.getXAxis().forceMax( 50 );

        graphinstance.getYAxis().forceMin( 0 );
        graphinstance.getYAxis().forceMax( 50 );

        var shape = graphinstance.newShape({ 
            type: 'peakboundariescenter', 
            pos: { x: 10, y: 10 },
            fillColor: 'rgba(200, 100, 100, 0.5)',
            strokeColor: 'black',
            locked: false,
            selectable: true,

            label: {
              position: {
                x: 4,
                y: 3
              },
              text: 'test'
            }
        });

          shape.setData('pos', { x: 10 } );
          shape.setData('pos2', { x: 2 } );
          shape.setData('posCenter', { x: 3 } );

          shape.setY( 20 );
          shape.draw();          
          graphinstance.draw( );

}, 'Drawing an peak boundary shape', 

[
]
]


});


