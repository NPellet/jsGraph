import GraphYAxis from './graph.axis.y';
import brokenAxis from './graph.axis.broken';

class GraphYAxisBroken extends brokenAxis( GraphYAxis ) {
  createBrokenLine( range ) {
    var line = document.createElementNS( this.graph.ns, 'line' );
    line.setAttribute( 'x1', '-5' );
    line.setAttribute( 'x2', '5' );
    line.setAttribute( 'y1', '-3' );
    line.setAttribute( 'y2', '3' );
    line.setAttribute( 'stroke', 'black' );

    return line;
  }

  placeBrokenLine( range, line, px ) {
    line.setAttribute( 'transform', 'translate(' + 0 + ', ' + px + ')' );
  }
}

export default GraphYAxisBroken;