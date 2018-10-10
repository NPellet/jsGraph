import Graph from '../../../src/graph.js';

const domGraph = 'graph';

var graph = new Graph( domGraph, {
  plugins: {
    serielinedifference: {},
    zoom: { zoomMode: 'xy' }
  },

  mouseActions: [ { plugin: 'zoom', shift: false, ctrl: false } ]
} );

graph.resize( 400, 300 );
graph.setTitle( 'Gas purchases in Baud (Switzerland)' );

graph
  .getYAxis()
  .setUnit( 'TJ' )
  .setLabel( 'Energy' )
  .setUnitWrapper( '[', ']' );
graph.getXAxis().setLabel( 'Years' );
/*
const data1 = [ 1986,6.934,1987,7.920,1988,7.623,1989,8.817,1990,8.978,1991,10.308,1992,10.285,1993,10.561,1994,10.013,1995,11.501,1996,12.308,1997,11.405,1998,11.651,1999,12.430,2000,12.147,2001,12.669,2002,12.312,2003,13.297,2004,13.951,2005,14.578,2006,13.927,2007,13.220,2008,13.938,2009,13.647,2010,15.565,2011,13.459,2012,14.767,2013,16.074,2014,13.921];
const data2 = [ 1986,9.48093,1987,9.50349,1988,9.57039,1989,9.67934,1990,9.82672,1991,10.0078,1992,10.2173,1993,10.4492,1994,10.6978,1995,10.9574,1996,11.223,1997,11.4901,1998,11.7548,1999,12.0142,2000,12.2657,2001,12.5076,2002,12.7383,2003,12.9565,2004,13.1612,2005,13.3514,2006,13.5259,2007,13.6838,2008,13.8238,2009,13.9449,2010,14.0458,2011,14.1255,2012,14.1832,2013,14.2181,2014,14.2298];
*/

const data1 = [
  1986,
  6.934,
  1987,
  7.92,
  1988,
  7.623,
  1989,
  8.817,
  1990,
  NaN,
  1991,
  10.308,
  1992,
  10.285,
  1993,
  10.561,
  1994,
  10.013,
  1995,
  11.501,
  1996,
  12.308,
  1997,
  11.405,
  1998,
  11.651,
  1999,
  12.43,
  2000,
  12.147,
  2001,
  12.669,
  2002,
  12.312,
  2003,
  13.297,
  2004,
  13.951,
  2005,
  14.578,
  2006,
  13.927,
  2007,
  13.22,
  2008,
  13.938,
  2009,
  13.647,
  2010,
  15.565,
  2011,
  13.459,
  2012,
  14.767,
  2013,
  16.074,
  2014,
  13.921
];
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
  12.9565,
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

const wave1 = Graph.newWaveform().setData(
  data1.filter( ( el, index ) => index % 2 == 1 ),
  data1.filter( ( el, index ) => index % 2 == 0 )
);
const wave2 = Graph.newWaveform().setData(
  data2.filter( ( el, index ) => index % 2 == 1 ),
  data2.filter( ( el, index ) => index % 2 == 0 ).map( ( v ) => v + 0.5 )
);

graph
  .newSerie( 'data' )
  .setLabel( 'Yearly' )
  .setLineWidth( 2 )
  .setMarkerStyle( { stroke: 'white', fill: '#2b1fcc' } )
  .setLineColor( '#2b1fcc' )
  .autoAxis()
  .setWaveform( wave1 );

graph
  .newSerie( 'median' )
  .setLabel( '10 years average' )
  .setLineStyle( 3 )
  .setLineColor( 'blue' )
  .setWaveform( wave2 )
  .autoAxis();

var serieTopName = 'data'; // Use here your serie name
var serieBottomName = 'median'; // Use here your serie name

var from = 1986; // From value. Must be specified.
var to = 2014; // To value. Must be specified.
// Note that you could use from = graph.getXAxis().getMinValue(); and to = graph.getXAxis().getMaxValue();

graph
  .getPlugin( 'serielinedifference' )
  .setSeries( graph.getSerie( serieTopName ), graph.getSerie( serieBottomName ) );
graph.getPlugin( 'serielinedifference' ).setBoundaries( from, to );
graph.getPlugin( 'serielinedifference' ).draw(); // Draws the shapes

/*graph.makeLegend().notHideable().setAutoPosition('bottom');
graph.getLegend().update();*/
graph.draw();
