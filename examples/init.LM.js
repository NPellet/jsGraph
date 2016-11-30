

requirejs.config({

	baseUrl: '../',
	paths: {
		'jquery': 'src/dependencies/jquery/dist/jquery'
	}
});

//import Graph from '../src/graph.core'

require( [ 'jquery', 'dist/jsgraph-es6' ] , function( $, disted ) {

	
	window.Graph = disted;	




	var graph = new Graph( "graph", {
    
  } );


var sine;

function generateRandom() {
    var d = [];
    let amplitude = Math.random() * 1000;
    let phase = Math.random() * 2 * Math.PI;
    let y0 = Math.random() * 1000;
    let scale = Math.random() * 10;

    for( var i = 0; i < Math.PI * 2; i += 1 / 100 ) {
      d.push( [ i, Math.sin( i * scale + phase ) * amplitude + y0 ]  );
    }
console.log( scale, phase, amplitude, y0 );

  sine = Graph.newWaveform().setDataXY( d );
  
  density.setWaveform( sine );
  graph.autoscaleAxes();
  graph.draw();
  

}

    var density = graph.newSerie("Density", {}, "line" )
          .setLineColor('green')
          .autoAxis()
    //      .setWaveform( generateRandom() );

    generateRandom();

    graph.newSerie("fit", {}, "line" ).setLineColor('red').autoAxis();
    
    
    

function doFit( params ) {

    sine.fit( {

      function: function( x, params ) {
        return Math.sin( x * params[ 0 ] + params[ 1 ] ) * params[ 2 ] + params[ 3 ]; 
      },
      
      params: params,

      progress: function( waveform ) {

        graph.getSerie("fit").setWaveform( waveform );
        graph.draw();
      },

      done: function( waveform ) {
        graph.getSerie("fit").setWaveform( waveform );
        graph.draw();
      }
        }
    );
}

    graph.draw();

	$("#fit").on('click', function() {
		

		doFit( [ parseFloat( $("#p1").prop('value') ), parseFloat( $("#p2").prop('value') ), parseFloat( $("#p3").prop('value') ), parseFloat( $("#p4").prop('value') ) ] );

	} );


	$("#new").on('click', function() {
		generateRandom();
		
	} );


} );


