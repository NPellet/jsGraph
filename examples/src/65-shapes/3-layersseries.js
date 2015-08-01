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
                  layer: Math.ceil( Math.random() * 3 ),

                  shapeOptions: {
                    locked: true
                  }
                  
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
                  layer: Math.ceil( Math.random() * 3 ),

                  shapeOptions: {
                    locked: true
                  }
              }).draw();
            }
          }

        var serie = [];
        for( var i = 0; i < 100 ; i ++ ) {

          serie.push( i );
          serie.push( Math.sin( i / 10 ) * Math.sin( i / 10 ) * 100 );

        }

        graphinstance.newSerie("", { layer: 2 } ).setData( serie ).autoAxis().setLineWidth( 3 ).setLineColor('red');
        
        graphinstance.draw( );
        
      

}, "Z-sorting of shapes/series", 

[
"The layer system applies for both shapes and series. Within a single layer, series are always behind the shapes.",
"This system may be used to display underlying shapes, such as colored zones."
]
]


});


