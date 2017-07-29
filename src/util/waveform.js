import FitLM from './fit_lm'
import {
  extend
} from '../graph.util'

import aggregator from './data_aggregator'

class Waveform {

  constructor( data = [], xOffset = 0, xScale = 1 ) {

    this.xOffset = xOffset;
    this.xScale = xScale;
    this.setData( data );
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
  setData( data, dataX = null ) {

    /* First, we must treat the case of the array of array for backward compatibility */
    if ( Array.isArray( data[ 0 ] ) ) {
      let x = [];
      let y = [];
      data.forEach( ( el ) => {
        x.push( el[ 0 ] );
        y.push( el[ 1 ] );
      } );

      this.setXWaveform( x );
      data = y;
    }

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

    if ( dataX ) {
      this.setXWaveform( dataX );
    }
    return this;
  }

  getY( index, optimized ) {

    if ( optimized && this.dataInUse ) {
      return this.dataInUse.y[ index ] * this.getScale() + this.getShift();
    }

    return this.data[ index ] * this.getScale() + this.getShift();
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

      if ( Array.isArray( waveform ) ) {
        waveform = new Waveform( waveform );
      } else {
        throw "Cannot set X waveform. Data is not a valid array."
      }
    }

    this.xdata = waveform;
    this.computeXMinMax();
    return this;
  }

  hasXWaveform() {
    return !!this.xdata;
  }

  getXWaveform() {
    if ( this.xdata ) {
      return this.xdata;
    }

    var wave = new Waveform();
    for ( var i = 0; i < this.getLength(); i += 1 ) {
      wave.append( this.getX( i ) );
    }
    return wave;
  }

  rescaleX( offset, scale ) {
    this.xScale = scale;
    this.xOffset = offset;
    this.computeXMinMax();
    return this;
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
      this._setData( ( constructor ).from( this.data ) );
    }

    if ( this.hasXWaveform() ) {
      this.getXWaveform().setTypedArrayClass( constructor );
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

  recalculateMinMaxNewPoint( x, y ) {
    if ( x < this.minX || this.minX === undefined ) {
      this.minX = x;
    }

    if ( x > this.maxX || this.maxX === undefined ) {
      this.maxX = x;
    }

    if ( y < this.minY || this.minY === undefined ) {
      this.minY = y;
    }

    if ( y > this.maxY || this.maxY === undefined ) {
      this.maxY = y;
    }

  }

  prepend( x, y ) {

    if ( typeof x == "function" ) {
      x = x( this );
    }

    if ( typeof y == "function" ) {
      y = y( this );
    }

    if ( this.xdata ) {
      this.xdata.prepend( null, x );
    } else if ( x !== null ) {
      this.xdata = this.getXWaveform();
      this.xdata.prepend( null, x );
    } else {
      this.xOffset -= this.xScale;
    }

    this.data.unshift( y );
    this.recalculateMinMaxNewPoint( x, y );
    return this;
  }

  append( x, y ) {

    if ( typeof x == "function" ) {
      x = x( this );
    }

    if ( typeof y == "function" ) {
      y = y( this );
    }

    if ( this.xdata ) {
      this.xdata.append( null, x );
    } else if ( x !== null ) {
      this.xdata = this.getXWaveform();
      this.xdata.append( null, x );
    }

    if ( this.monotoneous ) {
      if ( y > this.data[ this.data.y ] && this.getMonotoneousAscending() === false ) {
        this.monotoneous = false;
      } else if ( y < this.data[ this.data.y ] && this.getMonotoneousAscending() === true ) {
        this.monotoneous = false;
      }
    }

    if ( this.data.length == 1 || this._monotoneousAscending === undefined ) {

      this.monotoneous = true;

      if ( y == this.data[ 0 ] ) {
        this._monotoneousAscending = undefined;
      } else {
        this._monotoneousAscending = y > this.data[ 0 ];
      }
    }

    this.data.push( y );
    this.recalculateMinMaxNewPoint( x, y );

    return this;
  }

  _makeArray( length ) {

    const constructor = this.getTypedArrayClass();
    if ( constructor ) {
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

      const b1 = this.xOffset + this.xScale * this.getLength(),
        b2 = this.xOffset;

      this.minX = Math.min( b1, b2 );
      this.maxX = Math.max( b1, b2 );
    }
  }

  getDataInUse() {
    return this.dataInUse ||  this.data;
  }

  getIndexFromX( xval, useDataToUse = false, roundingMethod = Math.round ) {

    if ( !this.isXMonotoneous() ) {
      throw "Impossible to get the index from the x value for a non-monotoneous wave !"
    }

    let data, xdata, position;

    xval -= this.getXShift();

    if ( useDataToUse && this.dataInUse ) {
      xdata = this.dataInUse.x;
    } else if ( this.xdata ) {
      xdata = this.xdata.getData();
    }

    if ( xdata ) {
      position = binarySearch( xval, xdata, !( this.xdata ? this.xdata.getMonotoneousAscending() : this.xScale > 0 ) );

      if( useDataToUse && this.dataInUse && this.dataInUseType == "aggregate" ) { // In case of aggregation, round to the closest element of 4.
        return position - ( position % 4 );
      }

      return position;

    } else {
      return Math.max( 0, Math.min( this.getLength() - 1, roundingMethod( ( xval - this.xOffset ) / ( this.xScale ) ) ) );
    }
  }


  getXMin() {
    return this.minX + this.getXShift();
  }

  getXMax() {
    return this.maxX + this.getXShift();
  }

  getYMin() {
    return this.minY * this.getScale() + this.getShift();
  }

  getYMax() {
    return this.maxY * this.getScale() + this.getShift();
  }

  getMin() {
    return this.minY * this.getScale() + this.getShift();
  }

  getMax() {
    return this.maxY * this.getScale() + this.getShift();
  }

  getMinX() {
    return this.minX + this.getXShift();
  }

  getMaxX() {
    return this.maxX + this.getXShift();
  }

  getMinY() {
    return this.minY * this.getScale() + this.getShift();
  }

  getMaxY() {
    return this.maxY * this.getScale() + this.getShift();
  }

  getDataY() {
    return this.data;
  }

  getData( optimized ) {
    if ( !optimized ||  !this.dataInUse ) {
      return this.data;
    }
    return this.dataInUse.y;
  }

  setShift( shift = 0 ) {

    // We must update the min and the max of the y data
    //this.minY += ( shift - this.getShift() );
    //this.maxY += ( shift - this.getShift() );
    this.shift = shift;
    return this;
  }

  getShift() {
    return this.shift ||  0;
  }

  getScale() {
    return this.scale ||  1;
  }

  setScale( scale = 1 ) {

    // this.minY = ( this.minY - this.getShift() ) * scale;
    // this.maxY = ( this.maxY - this.getShift() ) * scale;
    this.scale = scale;
  }

  setXShift( shift = 0 ) {

    if ( !this.hasXWaveform ) {
      return this;
    }

    // We must update the min and the max of the x data
    // That's important for when the data has already been set
    //  this.minX += ( shift - this.getXShift() );
    //    this.maxX += ( shift - this.getXShift() );
    this.getXWaveform().setShift( shift );
    return this;
  }

  getXShift( shift = 0 ) {

    if ( !this.hasXWaveform ) {
      return 0;
    }

    return this.getXWaveform().getShift();
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

    var self = this;

    return new Promise( function( resolver, rejector ) {

      var fit = new FitLM( extend( {}, {
        dataY: self,
        dataX: self.getXWaveform(),
        done: function( results ) {
          resolver( results );
        },

        waveform: new Waveform()
      }, options ) );

      fit.init();
      fit.fit();
    } );
  }

  getX( index, optimized ) {

    if ( optimized && this.dataInUse ) {
      return this.dataInUse.x[ index ] + this.getXShift();
    }

    if ( this.xdata ) {
      return this.xdata.data[ index ] + this.getXShift();
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

      if ( arrY.length - 1 > from ) {
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
      this._monotoneousAscending = !this._monotoneousAscending;
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

    if ( ( this.xdata && !this.xdata.getMonotoneousAscending() ) || ( !this.xdata && this.xScale < -0 ) ) {
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

    this.dataInUseType = "resampled";
    this.dataInUse = data;
    return dataMinMax;
  }

  interpolate( x ) {

    let xIndex;
    let yData = this.getDataY();

    if ( this.xdata ) {
      let xData = this.xdata.getData(),
        xIndex = binarySearch( x, xData, !this.xdata.getMonotoneousAscending() );

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

  getMonotoneousAscending() {

    if ( !this.isMonotoneous() ) {
      return "The waveform is not monotoneous";
    }

    return this._monotoneousAscending;
  }

  getXMonotoneousAscending() {
    if ( this.xdata ) {
      return this.xdata.getMonotoneousAscending();
    }

    return this.xScale > 0;
  }

  isXMonotoneousAscending() {
    return this.getXMonotoneousAscending( ...arguments );
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

  log() {
    return this.logBase( 10 );
  }

  ln() {
    return this.logBase( Math.E )
  }

  logBase( base ) {

    let logBase = Math.log( base );
    this.data.map( ( valY ) => {

      return Math.log( valY ) / logBase;
    } )
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

    this._dataAggregating = {};
    this._dataAggregated = {};

    var pow2 = pow2floor( this.getLength() );

    this._dataAggregating = aggregator( {

      min: this.getMinX(),
      max: this.getMaxX(),
      data: this.data,
      xdata: this.xdata ? this.xdata.getData() : undefined,
      xScale: this.xScale,
      xOffset: this.xOffset,
      numPoints: pow2

    } ).then( ( event ) => {

      this._dataAggregated = event.aggregates;
      this._dataAggregating = false;
    } );

  }

  hasAggregation() {
    return !!this._dataAggregated;
  }

  selectAggregatedData( pxWidth, minX, maxX ) {

    if ( pxWidth < 2 ) {
      return false;
    }

    var level = pow2ceil( pxWidth );

    if ( this._dataAggregated[ level ] ) {

      this.dataInUseType = "aggregate";
      this.dataInUse = this._dataAggregated[ level ];
      return;
    } else if ( this._dataAggregating ) {

      return this._dataAggregating;
    }

    this.dataInUseType = "none";
    this.dataInUse = {
      y: this.data,
      x: this.getXWaveform().data
    };
  }

  duplicate( alsoDuplicateXWave ) {
    var newWaveform = new Waveform();
    newWaveform._setData( this.getDataY().slice() );

    if ( this.xdata ) {
      if ( alsoDuplicateXWave ) {
        newWaveform.setXWaveform( this.xdata.duplicate() );
      } else {
        newWaveform.setXWaveform( this.xdata );
      }
    } else {
      newWaveform.xOffset = this.xOffset;
      newWaveform.xScale = this.xScale;
    }

    return newWaveform;
  }

  findLocalMinMax( xRef, xWithin, type ) {

    let index = this.getIndexFromX( xRef ),
      indexPlus = this.getIndexFromX( xRef + xWithin ),
      indexMinus = this.getIndexFromX( xRef - xWithin ),
      yVal = this.getY( index ),
      tmp;

    if ( indexPlus < indexMinus ) {
      tmp = indexPlus;
      indexPlus = indexMinus;
      indexMinus = tmp;
    }

    let curr, currI;

    if ( type == 'max' ) {

      curr = Number.NEGATIVE_INFINITY;

      for ( var i = indexMinus; i <= indexPlus; i++ ) {

        if ( this.getY( i ) > curr ) {
          curr = this.getY( i );
          currI = i;
        }
      }
    } else {

      curr = Number.POSITIVE_INFINITY;

      for ( var i = indexMinus; i <= indexPlus; i++ ) {

        if ( this.getY( i ) < curr ) {
          curr = this.getY( i );
          currI = i;
        }
      }
    }

    if ( currI == indexMinus || currI == indexPlus ) {
      return false;
    }

    return this.getX( currI );
  }

  warn( text ) {
    if ( console ) {
      console.warn( text );
    }
  }

};

const MULTIPLY = Symbol();
const ADD = Symbol();
const SUBTRACT = Symbol();
const DIVIDE = Symbol();

// http://stackoverflow.com/questions/26965171/fast-nearest-power-of-2-in-javascript
function pow2ceil( v ) {
  v--;
  var p = 2;
  while ( ( v >>= 1 ) ) {
    p <<= 1;
  }
  return p;
}

function pow2floor( v ) {

  var p = 1;

  while ( ( v >>= 1 ) ) {
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
    } else {
      return false;
    }

    nanDirection *= -1;
  }
}

export default Waveform