define( function( require, exports, module ) {
  module.exports = ( domGraph ) => {
    var graph = new Graph( domGraph, {}, {} );

    graph.resize( 400, 80 );
    graph
      .getXAxis()
      .forceMin( 0.5 )
      .forceMax( 1 )
      .forcePrimaryTickUnit( 0.1 );
    /*.turnGridsOff()
    .setDisplay( false );*/

    graph
      .getYAxis()
      .turnGridsOff()
      .setDisplay( false );

    var s = graph.newSerie( 'density', {}, 'densitymap' );
    var data = [];

    for ( var i = 0.5; i <= 1; i += 1 / 200 ) {
      // for( var j = 0; j < i; j += 1 / 200 ) {
      data.push( [ i ] );
      //}
    }

    s.setDensityMap( data, 0.5, 1 / 200, -0.5, 1 );

    s.autoAxis();

    graph
      .getYAxis()
      .forceMin( -0.5 )
      .forceMax( 0.5 );

    //s.setPxPerBin( false, 20, true );
    //s.setBinsFromTo( 'x', -0.005, 200, 1 );
    //s.setBinsFromTo( 'y', -0.5, 0.5, 1 );

    s.colorMapHSL(
      [
        { h: 0, s: 1, l: 0.5 }, // Red
        { h: 270, s: 1, l: 0.5 } // Yellow
      ],
      300
    ); // Use 300 colors

    for ( var i = 0.5; i <= 1; i += 0.05 ) {
      let s = graph.newShape( 'line' );
      s.setPosition( { x: i * 1, y: -0.5 }, 0 );
      s.setPosition( { x: i * 1, y: 0.5 }, 1 );

      s.setStrokeColor( 'black' );
      s.draw().redraw();
    }

    graph.draw();

    return graph;
  };
} );
