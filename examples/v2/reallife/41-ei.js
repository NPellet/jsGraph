define( function( require, exports, module ) {
  module.exports = ( domGraph ) => {
    var data = {
      x: [
        13,
        14,
        15,
        16,
        17,
        19,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        37,
        41,
        42,
        43,
        44,
        45,
        46,
        47,
        48,
        56,
        57,
        58,
        59,
        60,
        61,
        75,
        76,
        77
      ],
      y: [
        10,
        50,
        400,
        10,
        20,
        60,
        10,
        110,
        400,
        110,
        1970,
        170,
        1600,
        40,
        70,
        10,
        40,
        260,
        1080,
        230,
        9999,
        510,
        1150,
        30,
        10,
        20,
        620,
        50,
        20,
        10,
        20,
        750,
        30
      ]
    };

    let wave = Graph.newWaveform().setData( data.y, data.x );

    let data2 = JSON.parse( JSON.stringify( data ) );
    data2.y[5] = 10000;
    let wave2 = Graph.newWaveform().setData( data2.y, data2.x );

    var graph = new Graph( domGraph, {
      plugins: {
        peakPicking: {}
      }
    } );

    graph.resize( 400, 400 );

    const eiSerie = graph
      .newSerie( 'ei', { lineToZero: true } )
      .autoAxis()
      .setWaveform( wave );

    graph.getPlugin( 'peakPicking' ).setSerie( eiSerie );

    graph.draw();

    //setTimeout( update, 2000 );

    return graph;
  };
} );
