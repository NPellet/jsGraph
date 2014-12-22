define( function() {

	return [ 

    function( domGraph ) {

        var graphinstance = new Graph( domGraph, {

         
        },

        function( graphinstance ) {

            graphinstance.getXAxis().forceMin( 0 );
            graphinstance.getXAxis().forceMax( 50 );

            graphinstance.getYAxis().forceMin( 0 );
            graphinstance.getYAxis().forceMax( 50 );

            graphinstance.updateAxes();


            graphinstance.newShape({ 
                type: 'rect', 
                pos: { x: 10, y: 10 },
                pos2: { x: 20, y: 20 },
                 fillColor: 'red',

                 locked: true,
                 selectable: false

            }).then( function( shape ) {

              shape.draw();
              shape.redraw();
            } );


            graphinstance.newShape({ 
                type: 'rect', 
                pos: { x: 30, y: 10 },
                pos2: { x: 40, y: 20 },
                 fillColor: 'green',

                 locked: false,
                 selectable: true
                 
            }).then( function( shape ) {

              shape.draw();
              shape.redraw();
            } );



          graphinstance.redraw( );
          graphinstance.drawSeries();       


        } );


}, "Lock a shape", 

[
]
]


});


