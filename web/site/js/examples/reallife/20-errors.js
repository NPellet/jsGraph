import Graph from '../../../src/graph.js';

const domGraph = 'graph';

var graph = new Graph( domGraph, {}, {} );

graph.resize( 400, 200 );

var axis = new ( Graph.getConstructor( 'graph.axis.x.bar' ) )();
var options = {};
axis.init( graph, options );
graph.setBottomAxis( axis, 0 );

axis.categories = [
  { title: 'Category 1', name: 'cat1' },
  { title: 'Category 2', name: 'cat2' }
];

var wave1 = Graph.newWaveformHash( { cat1: 5, cat2: 12 } );
var wave2 = Graph.newWaveformHash( { cat1: 8, cat2: 10 } );
var errorWave2 = Graph.newWaveformHash( { cat1: 0.5, cat2: 3 } );
var errorWave1 = Graph.newWaveformHash( { cat1: 2, cat2: 4 } );
wave1.setErrorBar( errorWave1, true );
wave2.setErrorBar( errorWave2, true );

var s1 = graph.newSerie( 'serie1', {}, Graph.SERIE_BAR );
s1.autoAxis();

s1.setWaveform( wave1 );
s1.setLineColor( 'crimson' )
  .setFillColor( 'crimson' )
  .setFillOpacity( 0.5 );
s1.setErrorBarStyle( { all: { strokeColor: 'crimson' } } );

var s2 = graph.newSerie( 'serie2', {}, Graph.SERIE_BAR );
s2.autoAxis();

s2.setWaveform( wave2 );
s2.setLineColor( 'DarkGreen' )
  .setFillColor( 'DarkGreen' )
  .setFillOpacity( 0.5 );
s2.setErrorBarStyle( {
  top: { strokeColor: 'DarkGreen' },
  bottom: { strokeWidth: 3, strokeColor: 'DarkGreen' }
} );

/*
s1.setErrorStyle( [ { type: 'bar', y: { width: 10, strokeColor: 'crimson', strokeOpacity: 0.7 } } ] );


s1.setDataError( { "cat1": [ [ 2, 1 ] ], "cat2": [ 0.4 ] } );

s2.setErrorStyle( [ { type: 'bar', y: { width: 10, strokeColor: 'DarkGreen', strokeOpacity: 0.7 } } ] );
s2.setDataError( { "cat1": [ 0.9 ] } );
*/

graph.getYAxis().forceMin( 0 );
axis.setSeries( s1, s2 );
graph.draw();
/*
var waveform = Graph.newWaveform();
waveform.setData( [ 3, 4, 1, 0.2 ] );

s
  .setWaveform( data )
  .autoAxis();
*/
