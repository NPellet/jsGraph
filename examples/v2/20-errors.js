
var graph = new Graph( domGraph, { }, { } );

graph.resize( 400, 200 );

var s = graph.newSerie( "data", {}, "line" );

var waveform = Graph.newWaveform();
waveform.setData( [ 3, 4, 1, 0.2 ] );

s
  .setWaveform( data )
  .autoAxis();

graph.draw();
