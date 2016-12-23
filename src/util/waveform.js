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

  constructor() {}

  /** [ [ x1, y1 ], [ x2, y2 ] ] */
  setDataXY( data ) {

    let newData = [ this._makeArray( data.length ), this._makeArray( data.length ) ];
    data.map( ( el, index ) => {
      newData[ 0 ][ index ] = el[ 0 ];
      newData[ 1 ][ index ] = el[ 1 ];
    } );

    this._dataUpdated( ...newData );
    return this;
  }

  setDataY( data ) {

    let newData = [ this._makeArray( data.length ), this._makeArray( data.length ) ];
    data.map( ( el, index ) => {
      newData[ index ][ 1 ] = el;
      newData[ index ][ 0 ] = index;
    } );

    this._dataUpdated( ...newData );
    return this;
  }

  flipXY() {
    let temp;
    temp = this.data.x;
    this.data.x = this.data.y;
    this.data.y = temp;

    this._dataUpdated( this.data.x, this.data.y );
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
      this._dataUpdated( ( constructor ).from( this.data.x ), ( constructor ).from( this.data.y ) );
    }
  }

  isNaNAllowed( constructor = this._typedArrayClass ) {

    // The following types accept NaNs
    return
    constructor == Array ||  
      constructor == Float32Array ||  
      constructor == Float64Array;
  }

  isUnsigned( constructor = this._typedArrayClass ) {

    // The following types accept NaNs
    return
    constructor == Uint8Array ||  
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

  _dataUpdated( dataX, dataY ) {
    const l = dataX.length;
    let i = 1,
      monoDir = dataX[ 1 ] > dataX[ 0 ],
      minX = dataX[ 0 ],
      maxX = dataX[ 0 ],
      minY = dataY[ 0 ],
      maxY = dataY[ 0 ];

    this._monotoneous = true;

    for ( ; i < l; i++ ) {
      if ( dataX[ i ] !== dataX[ i - 1 ] && monoDir !== ( dataX[ i ] > dataX[ i - 1 ] ) ) {
        this._monotoneous = false;
      }

      minX = Math.min( dataX[ i ], minX );
      maxX = Math.max( dataX[ i ], maxX );
      minY = Math.min( dataY[ i ], minY );
      maxY = Math.max( dataY[ i ], maxY );
    }

    if ( this._monotoneous ) {
      this._monotoneousAscending = dataX[ 1 ] > dataX[ 0 ];
    }

    this.minX = minX;
    this.maxX = maxX;
    this.minY = minY;
    this.maxY = maxY;

    this.data = {
      x: dataX,
      y: dataY
    };
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

  getLength() {
    return this.data.x.length;
  }

  getDataY() {
    return this.data.y;
  }

  getDataX() {
    return this.data.x;
  }

  getDataToUseFlat() {

    let dataToUse = this.dataInUse ? this.dataInUse : this.data;

    let arr = new Array( this.getLength() * 2 ).fill( 0 );
    let j = 0;
    for ( var i = 0, l = this.getLength(); i < l; i += 1 ) {
      arr[ j ] = dataToUse.x[ i ];
      arr[ j + 1 ] = dataToUse.y[ i ];
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

    let i = 1,
      dataX = this.getDataX();

    const l = dataX.length;
    let dir = dataX[ 1 ] > dataX[ 0 ];

    for ( ; i < l; i++ ) {
      if ( dataX[ i ] !== dataX[ i - 1 ] && dir !== ( dataX[ i ] > dataX[ i - 1 ] ) ) {
        return this._monotoneous = false;
      }
    }

    this._monotoneousAscending = dataX[ 1 ] > dataX[ 0 ];

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

    d.x.reverse();
    d.y.reverse();

    if ( this.isMonotoneous() ) {
      this.monotoneousDirection = !this.monotoneousDirection;
    }

    return d;
  }

  resampleForDisplay( options ) { // Serie redrawing

    let i = 0;

    this.requireMonotonicity();

    let inverting = false,
      dataX = this.getDataX(),
      dataY = this.getDataY(),
      data = { 
        x: [],
        y: []
      },
      dataMinMax = [],
      resampleSum, resampleMin, resampleMax, resampleNum, resample_x_start, resample_x_px_start,
      x_px,
      doing_mean = false,
      firstPointIndex = 0;

    if ( dataX[ 1 ] < dataX[ 0 ] ) {
      this.invert();
      inverting = true;
    }

    const l = this.getLength();

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

        data.x.push( xpos );
        data.y.push( resampleSum / resampleNum );

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
      this.invert();
      inverting = true;
      return dataMinMax;
    }

    this.dataInUse = data;
    return dataMinMax;
  }

  interpolate( x ) {

    let xData = this.getDataX(),
      yData = this.getDataY(),
      xIndex = binarySearch( x, xData, !this.getMonotoneousDirection() );

    if ( xData[ xIndex ] == x ) {
      return yData[ xIndex ];
    }

    return ( x - xData[ xIndex ] ) / ( xData[ xIndex + 1 ] - xData[ xIndex ] ) * ( yData[ xIndex + 1 ] - yData[ xIndex ] ) + yData[ xIndex ];
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
      return this._waveArithmetic( numberOrWave, DIVIDE );
    } else if ( typeof numberOrWave == 'number' ) {

      return this._numberArithmetic( numberOrWave );
    }
  }

  _numberArithmetic( num ) {

    let i = 0,
      l = this.getLength();

    if ( operation == MULTIPLY ) {

      for ( ; i < l; i++ ) {
        this.data.y[ i ] *= num;
      }
    } else if ( operation == DIVIDE ) {

      for ( ; i < l; i++ ) {
        this.data.y[ i ] /= num;
      }
    } else if ( operation == ADD ) {

      for ( ; i < l; i++ ) {
        this.data.y[ i ] += num;
      }
    } else if ( operation == SUBTRACT ) {

      for ( ; i < l; i++ ) {
        this.data.y[ i ] -= num;
      }
    }

    return this;
  }

  _waveArithmetic( wave, operation ) {

    let yDataThis = this.getDataY(),
      xDataThis = this.getDataX(),
      i = 0;
    const l = this.getLength();
    this.requireMonotonicity();
    wave.requireMonotonicity();

    if ( operation == MULTIPLY ) {

      for ( ; i < l; i++ ) {
        yDataThis[ i ] *= wave.interpolate( xDataThis[ i ] );
      }
    } else if ( operation == DIVIDE ) {

      for ( ; i < l; i++ ) {
        yDataThis[ i ] /= wave.interpolate( xDataThis[ i ] );
      }
    } else if ( operation == ADD ) {

      for ( ; i < l; i++ ) {
        yDataThis[ i ] += wave.interpolate( xDataThis[ i ] );
      }
    } else if ( operation == SUBTRACT ) {

      for ( ; i < l; i++ ) {
        yDataThis[ i ] -= wave.interpolate( xDataThis[ i ] );
      }
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

  duplicate() {
    var newWaveform = new Waveform();
    newWaveform._dataUpdated( this.getDataX().slice(), this.getDataY().slice() );
    return newWaveform;
  }

};

export default Waveform