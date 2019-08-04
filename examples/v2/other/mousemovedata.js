import Graph from '../../../src/graph.js';

const domGraph = 'graph';

var graph = new Graph( domGraph, { mouseMoveData: true, mouseMoveDataOptions: { useAxis: 'x' } } );

graph.resize( 400, 300 );

const data2 = [
  1986,
  9.48093,
  1987,
  9.50349,
  1988,
  9.57039,
  1989,
  9.67934,
  1990,
  9.82672,
  1991,
  10.0078,
  1992,
  10.2173,
  1993,
  10.4492,
  1994,
  10.6978,
  1995,
  10.9574,
  1996,
  11.223,
  1997,
  11.4901,
  1998,
  11.7548,
  1999,
  12.0142,
  2000,
  12.2657,
  2001,
  12.5076,
  2002,
  12.7383,
  2003,
  32.9565,
  2004,
  13.1612,
  2005,
  13.3514,
  2006,
  13.5259,
  2007,
  13.6838,
  2008,
  13.8238,
  2009,
  13.9449,
  2010,
  14.0458,
  2011,
  14.1255,
  2012,
  14.1832,
  2013,
  14.2181,
  2014,
  14.2298
];

const wave2 = Graph.newWaveform().setData(
  data2.filter( ( el, index ) => index % 2 == 1 ),
  data2.filter( ( el, index ) => index % 2 == 0 ).map( ( v ) => v + 0.5 )
);

graph
  .newSerie( 'a' )
  .setLabel()
  .setLineStyle( 3 )
  .setLineColor( 'blue' )
  .setWaveform( wave2 )
  .autoAxis()
  .setStyle( { lineColor: 'red' } );

  graph.setTitle("My graph title");
  graph.setTitleFontColor('green');
  graph.setTitleFontFamily('Consolas');
  graph.setTitleFontSize( 24 );

graph.gridsOff();

graph.on('mouseMoveData', ( event, results ) => {
  if( results.a ) {
    console.log( results.a.xClosest, results.a.xExact );
  }
});

/*graph.makeLegend().notHideable().setAutoPosition('bottom');
graph.getLegend().update();*/
graph.draw();
