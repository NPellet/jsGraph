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

  getDataToUseFlat() {

    let dataToUse = this.dataInUse ? this.dataInUse : this.data;

    let arr = new Array( dataToUse.length * 2 ).fill( 0 );
    let j = 0;
    for ( var i = 0, l = dataToUse.length; i < l; i += 1 ) {
      arr[ j ] = dataToUse[ i ][ 0 ];
      arr[ j + 1 ] = dataToUse[ i ][ 1 ];
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

      if ( arrX.length - 1 > from ) {

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

  checkMonotonicity() {

    let i = 0;
    const l = this.data.length;
    let dir = this.data[ 1 ][ 0 ] > this.data[ 0 ][ 0 ];

    for ( ; i < l; i++ ) {
      if ( dir !== ( this.data[ 1 ][ 0 ] > this.data[ 0 ][ 0 ] ) ) {
        return false;
      }
    }

    return true;
  }

  requireMonotonicity() {
    if ( !this.checkMonotonicity() ) {
      throw "The x wave must be monotonic";
    }
  }

  invert( data ) {
    let d = data || this.data;
    d.reverse();
    return d;
  }

  resampleForDisplay( options ) { // Serie redrawing

    let i = 0;

    this.requireMonotonicity();

    let inverting = false;
    
    if ( this.data[ 1 ][ 0 ] < this.data[ 0 ][ 0 ] ) {
      this.invert();
      inverting = true;
    }

    const l = this.getLength();

    let data = [],
      dataMinMax = [],
      resampleSum, resampleMin, resampleMax, resampleNum, resample_x_start, resample_x_px_start;

    let x_px;

    let dataY = this.getDataY();
    let dataX = this.getDataX();

    let doing_mean = false;
    let firstPointIndex = 0;

    if ( !options.xPosition ) {
      throw "No position calculation method provided";
    }

    if ( !options.resampleToPx ) {
      throw "No \"resampleToPx\" method was provided. Unit: px per point";
    }

    for ( ; i < l; i++ ) {

      if ( options.minX > dataX[ i ] ) {

        firstPointIndex = i;
        continue;
      }

      x_px = options.xPosition( dataX[ i ] );

      if ( !doing_mean ) {

        if ( !firstPointIndex ) {

          firstPointIndex = i;
        }

        while ( isNaN( dataY[ i ] ) ) {
          i++;
        }

        resampleSum = resampleMin = resampleMax = dataY[ firstPointIndex ];
        resampleNum = 1;
        resample_x_px_start = x_px;
        resample_x_start = dataX[ i ];
        firstPointIndex = 0;

        doing_mean = true;

        continue;
      }

      if ( Math.abs( x_px - resample_x_px_start ) > options.resampleToPx || i == l || isNaN( dataY[ i ] ) ) {

        let xpos = ( resample_x_start + dataX[ i ] ) / 2;

        data.push( [
          xpos,
          resampleSum / resampleNum
        ] );

        dataMinMax.push( xpos, resampleMin, resampleMax );

        if ( options.maxX !== undefined && dataX > options.maxX ) {
          return;
        }

        doing_mean = false;

        continue;
      }

      resampleSum += dataY[ i ];
      resampleNum++;

      resampleMin = Math.min( resampleMin, dataY[ i ] );
      resampleMax = Math.max( resampleMax, dataY[ i ] );
    }

    if ( inverting ) {
      this.dataInUse = this.invert( data );
      inverting = true;
      return this.invert( dataMinMax );
    }

    this.dataInUse = data;
    return dataMinMax;
  }
};

export default Waveform