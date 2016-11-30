import FitLM from './fit_lm'
import {
  extend
} from '../graph.util'

class Waveform {

  constructor() {}

  /** [ [   x1, y1 ], [ x2, y2 ] ] */
  setDataXY( data ) {
    this.data = data;
    return this;
  }

  setDataY( data ) {
    this.data = data.map( ( el, index ) => [ index, el ] );
    return this;
  }

  _getMin( dim, from, to ) {

    let min = this.data[ from ][ dim ];
    for ( var i = from + 1; i <= to; i++ ) {
      min = this.data[ i ][ dim ] < min ? this.data[ i ][ dim ] : min;
    }
    return min;
  }

  _getMax( dim, from, to ) {
    let max = this.data[ from ][ dim ];
    for ( var i = from + 1; i <= to; i++ ) {
      max = this.data[ i ][ dim ] > max ? this.data[ i ][ dim ] : max;
    }
    return max;
  }

  getXMin( subsetFromIndex = 0, subsetToIndex = this.data.length - 1 ) {
    return this._getMin( 0, subsetFromIndex, subsetToIndex );
  }

  getXMax( subsetFromIndex = 0, subsetToIndex = this.data.length - 1 ) {
    return this._getMax( 0, subsetFromIndex, subsetToIndex );
  }

  getMin( subsetFromIndex = 0, subsetToIndex = this.data.length - 1 ) {
    return this._getMin( 1, subsetFromIndex, subsetToIndex );
  }

  getMax( subsetFromIndex = 0, subsetToIndex = this.data.length - 1 ) {
    return this._getMax( 1, subsetFromIndex, subsetToIndex );
  }

  getLength() {
    return this.data.length;
  }

  getDataY() {

    return this.data.map( ( el ) => el[ 1 ] );
  }

  getDataX() {
    return this.data.map( ( el ) => el[ 0 ] );
  }

  flatten() {
    let arr = new Array( this.data.length * 2 ).fill( 0 );
    let j = 0;
    for ( var i = 0, l = this.data.length; i < l; i += 1 ) {
      arr[ j ] = this.data[ i ][ 0 ];
      arr[ j + 1 ] = this.data[ i ][ 1 ];
      j += 2;
    }

    return arr;
  }

  fit( options ) {

    var fit = new FitLM( extend( {}, {
      dataY: this
    }, options ) );
    fit.init();
    fit.fit();
    return this;
  }

  _integrateP( from = 0, to = this.getLength() - 1 ) {

    from = Math.round( from );
    to = Math.round( to );

    var l = to - from + 1;
    var sum = 0,
      delta;

    let deltaTot = 0;
    var arrX = this.getDataX();
    var arrY = this.getDataY();

    for ( ; from <= to; from++ ) {

      if ( xWave.length - 1 > from ) {

        deltaTot += arrX[ from + 1 ] - arrX[ from ]
        sum += arrY[ from ] * ( arrX[ from + 1 ] - arrX[ from ] );
      }
    }
    return [ sum, l, deltaTot ];
  }

  integrateP( from, to ) {
    var val = this._integrateP( from, to );
    return val[ 0 ];
  }

  average( p0 = 0, p1 = this.getLength() - 1 ) {
    return this.getAverageP( p0, p1 );
  }

  mean() {
    return this.average();
  }

  getAverageP( from, to ) {
    var sum = this._integrateP( from, to );
    return sum[ 0 ] / sum[ 2 ];
  }

  getAverageX( from, to ) {
    var sum = this._integrateX( from, to );
    return sum[ 0 ] / sum[ 2 ];
  }
};

export default Waveform