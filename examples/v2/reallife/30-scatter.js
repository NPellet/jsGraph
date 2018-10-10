import Graph from '../../../src/graph.js';

const domGraph = 'graph';

var graph = new Graph( domGraph, {}, {} );

graph.resize( 400, 400 );

var s = graph.newSerie(
  'line',
  {
    markers: true,
    selectMarkerOnHover: true,
    onMouseOverMarker: ( index, x, y ) => {
      console.log( index, x, y );
    }
  },
  'line'
);
const waveform = Graph.newWaveform();

for ( var i = 0; i <= 12; i += 0.05 ) {
  // for( var j = 0; j < i; j += 1 / 200 ) {
  waveform.append(
    i,
    Math.cos( i ) * ( Math.random() + 0.5 ) + ( Math.random() - 0.9 )
  );
  //}
}

const neg = {
  fill: 'red'
};

const negLow = {
  fill: 'Crimson'
};

const pos = {
  fill: 'green'
};

const posHigh = {
  fill: 'ForestGreen'
};

const mean = waveform.mean();
const sdev = waveform.stddev();

const color = ( y ) => {
  if ( y < mean - sdev ) {
    return negLow;
  } else if ( y < mean ) {
    return neg;
  } else if ( y < mean + sdev ) {
    return pos;
  }

  return posHigh;
};

s.setMarkerStyle( undefined, ( x, y, index ) => color( y ), 'unselected' );

const line = graph.newShape( 'line' );
line.setPosition( { x: 'min', y: mean }, 0 );
line.setPosition( { x: 'max', y: mean }, 1 );
line.draw();

const line2 = graph.newShape( 'line' );
line2.setPosition( { x: 'min', y: mean - sdev }, 0 );
line2.setPosition( { x: 'max', y: mean - sdev }, 1 );
line2.draw();

const line3 = graph.newShape( 'line' );
line3.setPosition( { x: 'min', y: mean + sdev }, 0 );
line3.setPosition( { x: 'max', y: mean + sdev }, 1 );
line3.draw();

console.log( waveform.stddev() );
s.setWaveform( waveform ).autoAxis();

/*
var shown = true;
setInterval( () => {

  if( shown ) {
    s.hideMarkers();
    shown = false;
  } else {
    s.showMarkers();
    shown = true;
  }
}, 1000 )*/
graph.draw();
