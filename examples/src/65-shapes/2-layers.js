define( function() {

	return [ 

    function( domGraph ) {

        var graphinstance = new Graph( domGraph );

        graphinstance.getXAxis().forceMin( 0 );
        graphinstance.getXAxis().forceMax( 100 );

        graphinstance.getYAxis().forceMin( 0 );
        graphinstance.getYAxis().forceMax( 100 );

        for( var i = 0; i < 10; i ++ ) {

          for( var j = 0; j < 10 ; j ++ ) {

            graphinstance.newShape({
        
                type: 'rect', 
                pos: { x: i * 10, y: j * 10 },
                pos2: { x: i * 10 + 8, y: j * 10 + 8 },
                fillColor: 'green',
                layer: Math.ceil( Math.random() * 2 )
                
            }).draw();
          }
        }


        for( var i = 0; i < 10; i ++ ) {

          for( var j = 0; j < 10 ; j ++ ) {

            graphinstance.newShape({ 
                type: 'rect', 
                pos: { x: i * 10 + 4, y: j * 10 + 4 },
                pos2: { x: i * 10 + 12, y: j * 10 + 12 },
                fillColor: 'rgba( 0, 0, 200, 0.5 )',
                layer: Math.ceil( Math.random() * 2 )
                
            }).draw();
          }
        }

        
        graphinstance.draw( );
        


}, "Shapes on various layers", 

[
"Create different layers containing shapes to sort them out in the z-direction. The sorting is based on a layered system as compared to an index system. Layers main contain several shapes for which the order is not warranted."
]
]


});


