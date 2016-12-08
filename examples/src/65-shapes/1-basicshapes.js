define( function() {

	return [ 

    function( domGraph ) {

        var graphinstance = new Graph( domGraph );

        graphinstance.getXAxis().forceMin( 0 );
        graphinstance.getXAxis().forceMax( 100 );

        graphinstance.getYAxis().forceMin( 0 );
        graphinstance.getYAxis().forceMax( 100 );

        var s = graphinstance.newShape({ 
            type: 'rect', 
            position: [ { x: 60, y: 80 },{ x: 20, y: 20 } ],
             strokeColor: 'red',
             strokeWidth: 1,
            fillColor: 'transparent',
            selectable: true
        }).draw();


        
        graphinstance.draw();
     
        s.setSelectStyle( { stroke: 'green' } );

        graphinstance.selectShape( s );
   //
        s.applyStyle();
     
        s.setStrokeColor('black');
        s.applyStyle();
        graphinstance.unselectShape( s );
        //s.redraw();
        



}, "Shapes", 

[
]
]


});


