import FitLM from './fit_lm'
import {
  extend
} from '../graph.util'

import aggregator from './data_aggregator'

// http://stackoverflow.com/questions/26965171/fast-nearest-power-of-2-in-javascript
function pow2ceil( v ) {
  v--;
  var p = 2;
  while ( v >>= 1 ) {
    p <<= 1;
  }
  return p;
}

function binarySearch( target, haystack, reverse ) {

  let seedA = 0,
    length = haystack.length,
    seedB = ( length - 1 ),
    seedInt,
    i = 0,
    nanDirection = 1;

  if ( haystack[ seedA ] == target ) {
    return seedA;
  }

  if ( haystack[ seedB ] == target ) {
    return seedB;
  }

  while ( true ) {
    i++;
    if ( i > 100 ) {
      throw "Error loop";
    }

    seedInt = Math.floor( ( seedA + seedB ) / 2 );
    //  seedInt -= seedInt % 2; // Always looks for an x.

    while ( isNaN( haystack[ seedInt ] ) ) {
      seedInt += nanDirection;
    }

    if ( seedInt == seedA || haystack[ seedInt ] == target || seedInt == seedB ) {
      return seedInt;
    }

    //    console.log(seedA, seedB, seedInt, haystack[seedInt]);
    if ( haystack[ seedInt ] <= target ) {
      if ( reverse ) {
        seedB = seedInt;
      } else {
        seedA = seedInt;
      }
    } else if ( haystack[ seedInt ] > target ) {
      if ( reverse ) {
        seedA = seedInt;
      } else {
        seedB = seedInt;
      }
    }

    nanDirection *= -1;
  }
}

class Waveform {

  constructor() {}

  /** [ [   x1, y1 ], [ x2, y2 ] ] */
  setDataXY( data ) {
    this.data = data;
    this.dataUpdated();
    return this;
  }

  setDataY( data ) {
    this.data = data.map( ( el, index ) => [ index, el ] );
    this.dataUpdated();
    return this;
  }

  flipXY() {
    let temp;
    this.data = data.map( ( el ) => {
      temp = el[ 0 ];
      el[ 0 ] = el[ 1 ];
      el[ 1 ] = temp;
      return el;
    } );
    this.dataUpdated();
  }

  dataUpdated() {
    const l = this.data.length;
    let i = 0,
      monoDir = this.data[ 1 ][ 0 ] > this.data[ 0 ][ 0 ],
      minX = this.data[ 0 ][ 0 ],
      maxX = this.data[ 0 ][ 0 ],
      minY = this.data[ 0 ][ 1 ],
      maxY = this.data[ 0 ][ 1 ];

    this._monotoneous = true;

    for ( ; i < l; i++ ) {
      if ( monoDir !== ( this.data[ 1 ][ 0 ] > this.data[ 0 ][ 0 ] ) ) {
        this._monotoneous = false;
      }

      minX = Math.min( this.data[ i ][ 0 ], minX );
      maxX = Math.max( this.data[ i ][ 0 ], maxX );
      minY = Math.min( this.data[ i ][ 1 ], minY );
      maxY = Math.max( this.data[ i ][ 1 ], maxY );
    }

    this.minX = minX;
    this.maxX = maxX;
    this.minY = minY;
    this.maxY = maxY;
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
    /*
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
      */

  getXMin() {
    return this.minX;
  }

  getXMax() {
    return this.maxX;
  }

  getYMin() {
    return this.minY;
  }

  getYMax() {
    return this.maxY;
  }

  getMin() {
    return this.minY;
  }

  getMax() {
    return this.maxY;
  }

  getMinX() {
    return this.minX;
  }

  getMaxX() {
    return this.maxX;
  }

  getMinY() {
    return this.minY;
  }

  getMaxY() {
    return this.maxY;
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
        return this._monotoneous = false;
      }
    }

    return this._monotoneous = true;
  }

  requireMonotonicity() {
    if ( !this.isMonotoneous() ) {
      throw "The x wave must be monotonic";
    }
  }

  isMonotoneous() {
    return !!this._monotoneous;
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
      resampleSum, resampleMin, resampleMax, resampleNum, resample_x_start, resample_x_px_start,
      x_px,
      dataY = this.getDataY(),
      dataX = this.getDataX(),
      doing_mean = false,
      firstPointIndex = 0;

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

  multiply( numberOrWave ) {

    if ( numberOrWave instanceof Waveform ) {
      return this._multiplyByWave( numberOrWave );
    } else if ( typeof numberOrWave == 'number' ) {
      return this._multiplyByNumber( numberOrWave );
    }
  }

  _multiplyByNumber( num ) {

    let i = 0,
      l = this.getLength();

    for ( ; i < l; i++ ) {
      this.data[ i ][ 0 ] *= num;
    }
    return this;
  }

  _multiplyByWave( wave ) {

    let y = wave.getDataY();
    let i = 0,
      l = this.getLength();

    for ( ; i < l; i++ ) {
      this.data[ i ][ 0 ] *= y[ i ];
    }
    return this;
  }

  interpolate( x ) {

    let xData = this.getDataX(),
      yData = this.getDataY(),
      xIndex = binarySearch( x, xData, !this.getMonotoneousDirection() );

    return ( x - xData[ xIndex ] ) / ( xData[ xIndex + 1 ] - xData[ xIndex ] ) * ( yData[ xIndex + 1 ] - yData[ xIndex ] ) + yData[ xIndex ];
  }

  divide( numberOrWave ) {

    if ( numberOrWave instanceof Waveform ) {
      return this._multiplyByWave( numberOrWave );
    } else if ( typeof numberOrWave == 'number' ) {
      return this._multiplyByNumber( numberOrWave );
    }
  }

  _divideByNumber( num ) {

    let i = 0,
      l = this.getLength();

    for ( ; i < l; i++ ) {
      this.data[ i ][ 0 ] /= num;
    }
    return this;
  }

  _divideByWave( wave ) {

    let yDataThis = this.getDataY(),
      xDataThis = this.getDataX(),
      i = 0;

    const l = this.getLength();

    for ( ; i < l; i++ ) {

      yDataThis[ i ] /= wave.interpolate( xDataThis[ x ] );
    }

    return this;
  }

  aggregate() {

    const levels = 10;

    let level = 128; // 128 points

    let i = 0;

    this._dataAggregating = {};
    this._dataAggregated = {};

    for ( ; i < levels; i++ ) {

      this._dataAggregating[ level ] = aggregator( {

        min: this.getMinX(),
        max: this.getMaxX(),
        data: this.data,
        numPoints: level

      } ).then( ( data ) => {

        this._dataAggregated[ data.numPoints ] = data.data;
      } );

      if ( level > this.getLength() ) {
        break;
      }

      level *= 2;
    }
  }

  hasAggregation() {
    return !!this._dataAggregated;
  }

  getAggregatedData( pxWidth ) {

    var level = pow2ceil( pxWidth );
    if ( this._dataAggregated[ level ] ) {
      this.dataInUse = this._dataAggregated[ level ];
      return;
    } else if ( this._dataAggregating[ level ] ) {
      return this._dataAggregating[ level ];
    }

    this.dataInUse = this.data;
  }

};

export default Waveform