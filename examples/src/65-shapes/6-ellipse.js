define( function() {

	return [ 

    function( domGraph ) {

        var graphinstance = new Graph( domGraph );

        graphinstance.getXAxis().forceMin( 0 );
        graphinstance.getXAxis().forceMax( 50 );

        graphinstance.getYAxis().forceMin( 0 );
        graphinstance.getYAxis().forceMax( 50 );


        var shape = graphinstance.newShape({ 
            type: 'ellipse', 
            pos: { x: 10, y: 10 },
            fillColor: 'rgba(200, 100, 100, 0.5)',

            locked: true,
            selectable: false

        }).draw();

        shape.setR( '50px', '20px') ;

        shape.addTransform('translate', [ 20, 0 ])
        shape.addTransform('rotate', [ 20 ])
              

        graphinstance.draw( );
          


}, 'Drawing an ellipse', 

[
]
]


});


