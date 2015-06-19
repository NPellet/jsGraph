var g;
$(document).ready( function() {

    $("#do").on('click', function() {

      g = new Graph( "graph" );

      for( var i = 0; i < 100000; i += 1 ) {


        g.redraw();
      }

    });

    var data = [0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0];

      $("#do2").on('click', function() {

        var name = "someSerie";
        for( var i = 0; i < 1000; i += 1 ) {

          if( serie = g.getSerie( name ) ) {
            serie.setData( data );
          } else {
            g.newSerie("someSerie", {}, "scatter").autoAxis().setData( data );
          }

          g.drawSeries();
          g.redraw();
        }

      });

});
