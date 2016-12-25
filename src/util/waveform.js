import FitLM from './fit_lm'
import {
  extend
} from '../graph.util'

import aggregator from './data_aggregator'

const MULTIPLY = Symbol();
const ADD = Symbol();
const SUBTRACT = Symbol();
const DIVIDE = Symbol();

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

  constructor() {

    this.xOffset = 0;
    this.xScale = 1;
  }

  /** [ [ x1, y1 ], [ x2, y2 ] ] */

  /*
  setDataXY( data ) {

    let newData = [ this._makeArray( data.length ), this._makeArray( data.length ) ],
      warnNaN = false;
    const nanable = this.isNaNAllowed();

    data.map( ( el, index ) => {

      if ( !nanable && ( el[ 0 ] !== el[ 0 ] || el[ 1 ] !== el[ 1 ] ) ) {
        warnNaN = true;
      }

      newData[ 0 ][ index ] = el[ 0 ];
      newData[ 1 ][ index ] = el[ 1 ];
    } );

    if ( warnNaN ) {
      this.warn( "Trying to assign NaN values to a typed array that does not support NaNs. 0's will be used instead" );
    }

    this._setData( ...newData );
    return this;
  }
*/
  setData( data ) {

      let newData = this._makeArray( data.length ),
        warnNaN = false;

      const nanable = this.isNaNAllowed();

      data.map( ( el, index ) => {

        if ( !nanable && ( el[ 0 ] !== el[ 0 ] || el[ 1 ] !== el[ 1 ] ) ) {
          warnNaN = true;
        }

        newData[ index ] = el;
      } );

      if ( warnNaN ) {
        this.warn( "Trying to assign NaN values to a typed array that does not support NaNs. 0's will be used instead" );
      }

      this._setData( newData );
      return this;
    }
    /*
      flipXY() {
        let temp;
        temp = this.data.x;
        this.data.x = this.data.y;
        this.data.y = temp;

        this._setData( this.data.x, this.data.y );
      }*/

  setXWaveform( waveform ) {

    if ( !( waveform instanceof Waveform ) ) {
      return;
    }

    this.xdata = waveform;
    this.computeXMinMax();
    return this;
  }

  rescaleX( offset, scale ) {
    this.xScale = scale;
    this.xOffset = offset;
    this.computeXMinMax();
  }

  getTypedArrayClass() {
    return this._typedArrayClass || false;
  }

  setTypedArrayClass( constructor ) {

    if ( this.getTypedArrayClass() && this.isNaNAllowed() && !this.isNaNAllowed( constructor ) ) {
      this.warn( "NaN values are not allowed by the new constructor (" + constructor.name + ") while it was allowed by the previous one (" + this._typedArrayClass.name + ")" );
    }

    if ( this.getTypedArrayClass() && this.isUnsigned() && !this.isUnsigned( constructor ) ) {
      this.warn( "You are switching from signed values to unsigned values. You may experience data corruption if there were some negative values." );
    }

    this._typedArrayClass = constructor;

    if ( this.data ) {
      this._setData( ( constructor ).from( this.data.x ), ( constructor ).from( this.data.y ) );
    }
  }

  isNaNAllowed( constructor = this._typedArrayClass ) {

    // The following types accept NaNs
    return constructor == Array ||  
      constructor == Float32Array ||  
      constructor == Float64Array;
  }

  isUnsigned( constructor = this._typedArrayClass ) {

    // The following types accept NaNs
    return constructor == Uint8Array ||  
      constructor == Uint8ClampedArray ||  
      constructor == Uint16Array ||
      constructor == Uint32Array;
  }

  _makeArray( length ) {

    let constructor;
    if ( constructor = this.getTypedArrayClass() ) {
      return new( constructor )( length );
    }
    return new Array( length );
  }

  _setData( dataY ) {
    const l = dataY.length;
    let i = 1,
      monoDir = dataY[ 1 ] > dataY[ 0 ],
      minY = dataY[ 0 ],
      maxY = dataY[ 0 ];

    this._monotoneous = true;

    for ( ; i < l; i++ ) {
      if ( dataY[ i ] !== dataY[ i - 1 ] && monoDir !== ( dataY[ i ] > dataY[ i - 1 ] ) ) {
        this._monotoneous = false;
      }

      if ( dataY[ i ] === dataY[ i ] ) { // NaN support
        minY = Math.min( dataY[ i ], minY );
        maxY = Math.max( dataY[ i ], maxY );
      }
    }

    if ( this._monotoneous ) {
      this._monotoneousAscending = dataY[ 1 ] > dataY[ 0 ];
    }

    this.minY = minY;
    this.maxY = maxY;

    this.data = dataY;

    this.computeXMinMax();

  }

  computeXMinMax() {

    if ( !this.data ) {
      return;
    }

    if ( this.xdata ) {

      this.minX = this.xdata.getMin();
      this.maxX = this.xdata.getMax();

    } else {
      this.minX = Math.min( this.xScale * this.getLength(), 0 ) + this.xOffset;
      this.maxX = Math.max( this.xScale * this.getLength(), 0 ) + this.xOffset;
    }
  }

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

  getDataY() {
    return this.data;
  }

  getData() {
    return this.data;
  }

  getLength() {
    return this.data.length;
  }

  getDataToUseFlat() {

    let l;
    let j = 0;
    let arr;

    if ( this.dataInUse ) {

      l = this.dataInUse.x.length;
      arr = new Array( l * 2 ).fill( 0 );

      for ( var i = 0; i < l; i += 1 ) {
        arr[ j ] = this.dataInUse.x[ i ];
        arr[ j + 1 ] = this.dataInUse.y[ i ];
        j += 2;
      }

    } else {

      l = this.getLength();
      arr = new Array( l * 2 ).fill( 0 );
      for ( var i = 0; i < l; i += 1 ) {
        arr[ j + 1 ] = this.data[ i ];
        arr[ j ] = this.getX( i );
        j += 2;
      }
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

  getX( index ) {

    if ( this.xdata ) {
      return this.xdata.data[ index ];
    } else {
      return this.xOffset + index * this.xScale;
    }
  }

  _integrateP( from = 0, to = this.getLength() - 1 ) {

    from = Math.round( from );
    to = Math.round( to );

    var l = to - from + 1;
    var sum = 0,
      delta;

    let deltaTot = 0;
    let diff;
    var arrY = this.getData();

    for ( ; from <= to; from++ ) {

      if ( arrX.length - 1 > from ) {
        diff = this.getX( from + 1 ) - this.getX( from );
        deltaTot += diff;
        sum += arrY[ from ] * diff;
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

    let i = 1,
      data = this.getData();
    const l = this.data.length;
    let dir = data[ 1 ] > data[ 0 ];

    for ( ; i < l; i++ ) {
      if ( data[ i ] !== data[ i - 1 ] && dir !== ( data[ i ] > data[ i - 1 ] ) ) {
        return this._monotoneous = false;
      }
    }

    this._monotoneousAscending = data[ 1 ] > data[ 0 ];
    return this._monotoneous = true;
  }

  requireXMonotonicity() {
    if ( this.xdata ) {
      this.xdata.requireMonotonicity();
    }
  }

  requireMonotonicity() {
    if ( !this.isMonotoneous() ) {
      throw "The wave must be monotonic";
    }
  }

  isMonotoneous() {
    return !!this._monotoneous;
  }

  isXMonotoneous() {
    if ( this.xdata ) {
      return this.xdata.isMonotoneous();
    }
    // Offset and scale is always monotoneous
    return true;
  }

  invert( data ) {

    let d = dataY || this.data;
    d.reverse();

    if ( this.isMonotoneous() ) {
      this.monotoneousDirection = !this.monotoneousDirection;
    }

    return d;
  }

  resampleForDisplay( options ) { // Serie redrawing

    let i = 0;

    this.requireXMonotonicity();

    let inverting = false,
      dataY = this.getDataY(),
      data = { 
        x: [],
        y: []
      },
      dataMinMax = [],
      resampleSum, resampleMin, resampleMax, resampleNum, resample_x_start, resample_x_px_start,
      x_px,
      doing_mean = false,
      firstPointIndex = 0,
      xval;

    const l = this.getLength();

    if ( !options.xPosition ) {
      throw "No position calculation method provided";
    }

    if ( !options.resampleToPx ) {
      throw "No \"resampleToPx\" method was provided. Unit: px per point";
    }

    if ( options.minX > options.maxX ) {
      let temp = options.minX;
      options.minX = options.maxX;
      options.maxX = temp;
    }

    if ( ( this.xdata && !this.xdata.getMonotoneousDirection ) || ( !this.xdata && this.xScale < -0 ) ) {
      inverting = true;
      i = l;
    }

    for ( ; inverting ? i > 0 : i < l; inverting ? i-- : i++ ) {

      xval = this.getX( i );

      if ( options.minX > xval ) {

        firstPointIndex = i;
        continue;
      }

      x_px = options.xPosition( xval );

      if ( !doing_mean ) {

        if ( !firstPointIndex ) {

          firstPointIndex = i;
        } else {

          data.x.push( xval );
          data.y.push( dataY[ firstPointIndex ] );

        }

        while ( isNaN( dataY[ i ] ) ) {

          if ( inverting ) {
            i--;
          } else {
            i++;
          }
        }

        resampleSum = resampleMin = resampleMax = dataY[ firstPointIndex ];
        resampleNum = 1;
        resample_x_px_start = x_px;
        resample_x_start = xval;
        firstPointIndex = 0;

        doing_mean = true;

        continue;
      }

      if ( Math.abs( x_px - resample_x_px_start ) > options.resampleToPx || i == l || i == 0 || isNaN( dataY[ i ] ) ) {

        let xpos = ( resample_x_start + xval ) / 2;

        data.x.push( xpos );
        data.y.push( resampleSum / resampleNum );

        dataMinMax.push( xpos, resampleMin, resampleMax );

        if ( options.maxX !== undefined && xval > options.maxX ) {

          break;
        }

        doing_mean = false;

        continue;
      }

      resampleSum += dataY[ i ];
      resampleNum++;

      resampleMin = Math.min( resampleMin, dataY[ i ] );
      resampleMax = Math.max( resampleMax, dataY[ i ] );
    }

    this.dataInUse = data;
    return dataMinMax;
  }

  interpolate( x ) {

    let xIndex;
    let yData = this.getDataY();

    if ( this.xdata ) {
      let xData = this.xdata.getData(),
        xIndex = binarySearch( x, xData, !this.getMonotoneousDirection() );

      if ( xData[ xIndex ] == x ) {
        return yData[ xIndex ];
      }
      return ( x - xData[ xIndex ] ) / ( xData[ xIndex + 1 ] - xData[ xIndex ] ) * ( yData[ xIndex + 1 ] - yData[ xIndex ] ) + yData[ xIndex ];

    } else {
      xIndex = ( x - this.xOffset ) / ( this.xScale );
      let xIndexF = Math.floor( xIndex );
      return ( xIndex - xIndexF ) * ( yData[ xIndexF + 1 ] - yData[ xIndexF ] ) + yData[ xIndexF ];
    }

  }

  getMonotoneousDirection() {
    return this.monotoneousDirection;
  }

  divide( numberOrWave ) {
    return this._arithmetic( numberOrWave, DIVIDE );
  }

  divideBy() {
    return this.divide( ...arguments );
  }

  multiply( numberOrWave ) {
    return this._arithmetic( numberOrWave, MULTIPLY );
  }

  multiplyBy() {
    return this.multiply( ...arguments );
  }

  add( numberOrWave ) {
    return this._arithmetic( numberOrWave, ADD );
  }

  addBy() {
    return this.add( ...arguments );
  }

  subtract( numberOrWave ) {
    return this._arithmetic( numberOrWave, SUBTRACT );
  }

  subtractBy() {
    return this.subtract( ...arguments );
  }

  _arithmetic( numberOrWave, operator ) {

    if ( numberOrWave instanceof Waveform ) {
      return this._waveArithmetic( numberOrWave, operator );
    } else if ( typeof numberOrWave == 'number' ) {

      return this._numberArithmetic( numberOrWave, operator );
    }
  }

  _numberArithmetic( num, operation ) {

    let i = 0,
      l = this.getLength();

    if ( operation == MULTIPLY ) {

      for ( ; i < l; i++ ) {
        this.data[ i ] *= num;
      }

      this.minY *= num;
      this.maxY *= num;
    } else if ( operation == DIVIDE ) {

      for ( ; i < l; i++ ) {
        this.data[ i ] /= num;
      }

      this.minY /= num;
      this.maxY /= num;
    } else if ( operation == ADD ) {

      for ( ; i < l; i++ ) {
        this.data[ i ] += num;
      }

      this.minY += num;
      this.maxY += num;
    } else if ( operation == SUBTRACT ) {

      for ( ; i < l; i++ ) {
        this.data[ i ] -= num;
      }

      this.minY -= num;
      this.maxY -= num;
    }

    return this;
  }

  _waveArithmetic( wave, operation ) {

    let yDataThis = this.getDataY(),

      i = 0;
    const l = this.getLength();
    this.requireXMonotonicity();
    wave.requireXMonotonicity();

    if ( operation == MULTIPLY ) {

      for ( ; i < l; i++ ) {
        yDataThis[ i ] *= wave.interpolate( this.getX( i ) );
      }
    } else if ( operation == DIVIDE ) {

      for ( ; i < l; i++ ) {
        yDataThis[ i ] /= wave.interpolate( this.getX( i ) );
      }
    } else if ( operation == ADD ) {

      for ( ; i < l; i++ ) {
        yDataThis[ i ] += wave.interpolate( this.getX( i ) );
      }
    } else if ( operation == SUBTRACT ) {

      for ( ; i < l; i++ ) {
        yDataThis[ i ] -= wave.interpolate( this.getX( i ) );
      }
    }

    this._setData( yDataThis );
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
        xdata: this.xdata ? this.xdata.getData() : undefined,
        xScale: this.xScale,
        xOffset: this.xOffset,
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

  duplicate( alsoDuplicateXWave ) {
    var newWaveform = new Waveform();
    newWaveform._setData( this.getDataY().slice() );

    if ( this.xdata ) {
      if ( alsoDuplicateXWave ) {
        newWaveform.setXWaveform( this.xdata.duplicate() );
      } else {
        newWaveform.setXWaveform( this.xdata.duplicate() );
      }
    } else {
      newWaveform.xOffset = this.xOffset;
      newWaveform.xScale = this.xScale;
    }

    return newWaveform;
  }

  warn( text ) {
    if ( console ) {
      console.warn( text );
    }
  }

};

export default Waveform