import Graph from '../../../src/graph.js';

const domGraph = 'graph';

var graph = new Graph( domGraph );
graph.resize( 400, 300 );

graph
  .newSerie(
    'cat2',
    {
      maxBoxWidth: 10
    },
    Graph.SERIE_BOX
  )
  .autoAxis()
  .setData( [
    { x: 0, Q1: -1, Q2: 2, Q3: 5, whiskers: [ -5, 10 ], outliers: [ -7 ] },
    { x: 1, Q1: 5, Q2: 7, Q3: 15, whiskers: [ -3, 16 ], outliers: [ -5, 15 ] },
    { x: 2, Q1: 3, Q2: 8, Q3: 9, whiskers: [ 1, 11 ], outliers: [ 0, -2, 12 ] },
    { x: 3, Q1: -2, Q2: 1, Q3: 3, whiskers: [ -4, 6 ], outliers: [ -6, 8 ] }
  ] );

graph.draw();
