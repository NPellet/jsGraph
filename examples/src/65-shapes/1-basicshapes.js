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
             
             strokeWidth: 1,
            strokeColor: 'rgb(200, 200, 0)',
            fillColor: 'rgb(200, 0, 0)',
            selectable: true
        }).draw();


        
        graphinstance.draw();
     s.redraw();
     s.applyStyle();
     
        graphinstance.selectShape( s );

        s.setSelectStyle({
          stroke: function() {
          return this.getStrokeColor().replace(", 0)", ", 100)");
          },
          fill: function() {
          return this.getFillColor().replace(", 0)", ", 200)");
          },
          'stroke-width': 2
          });



        s.setStrokeColor('rgb(0, 100, 0)')
   //
//        s.applyStyle();
     
  //      s.setStrokeColor('black');
    //    s.applyStyle();
        //graphinstance.unselectShape( s );
        
        



}, "Shapes", 

[
]
]


});


