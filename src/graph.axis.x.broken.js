import GraphXAxis from './graph.axis.x';
import brokenAxis from './graph.axis.broken';

class GraphXAxisBroken extends brokenAxis( GraphXAxis ) {
  createBrokenLine( range ) {
    var line = document.createElementNS( this.graph.ns, 'line' );
    line.setAttribute( 'x1', '-3' );
    line.setAttribute( 'x2', '3' );
    line.setAttribute( 'y1', '-5' );
    line.setAttribute( 'y2', '5' );
    line.setAttribute( 'stroke', 'black' );

    return line;
  }

  placeBrokenLine( range, line, px ) {
    line.setAttribute( 'transform', 'translate(' + px + ', ' + 0 + ')' );
  }
}

export default GraphXAxisBroken;