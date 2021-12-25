// @ts-nocheck

// @ts-ignore
import * as util from '../graph.util.js';
// @ts-ignore
import aggregator from './data_aggregator.js';
// @ts-ignore
import FitLM from './fit_lm.js';

type ErrorBars = {
  nb: number,
  bars: {
    above?: Waveform,
    below?: Waveform
  },

  boxes: {
    above?: Waveform,
    below?: Waveform
  }
}

type XYData = {
  x: number[],
  y: number[]
}

class Waveform {

  private xOffset: number;
  private xScale: number;
  private shift: number;
  private scale: number;
  private errors: ErrorBars
  private _originalData: number[] = [];
  private _originalDataX: number[] | undefined = [];
  protected _xdata: Waveform | undefined;
  public _data: number[] = [];
  protected minX: number = Number.MIN_SAFE_INTEGER;
  protected maxX: number = Number.MAX_SAFE_INTEGER;
  protected minY: number = Number.MIN_SAFE_INTEGER;
  protected maxY: number = Number.MAX_SAFE_INTEGER;
  private _monotoneous: boolean = false;
  private _monotoneousAscending: boolean = false;
  private dataInUseType: string = "";

  private dataInUse: XYData = { x: [], y: [] };
  private _typedArrayClass: undefined | Uint16ArrayConstructor | Uint8ArrayConstructor | ArrayConstructor | Float32ArrayConstructor | Float64ArrayConstructor | Uint8ClampedArrayConstructor | Uint32ArrayConstructor;

  private _dataAggregating: Promise<any> | undefined;
  private _dataAggregated: { [x: number]: XYData } = {};

  private _dataAggregationDirection: string = "";
  unit: string;
  xunit: string;

  constructor(data = [], xOffset = 0, xScale = 1) {
    this.xOffset = xOffset;
    this.xScale = xScale;

    this.shift = 0;
    this.scale = 1;
    // Error bar handling
    this.errors = {
      nb: 0,
      bars: {

      },
      boxes: {

      }
    };

    this.setData(data);
  }

  setData(data: Array<number>, dataX?: Array<number>) {
    this._originalData = data;
    this._originalDataX = dataX;

    this._xdata = null;

    this.mutated();
    return this;
  }

  getYData() {
    return this._data;
  }

  mutated() {

    /* First, we must treat the case of the array of array for backward compatibility */
    let data;
    if (Array.isArray(this._originalData[0])) {
      let x = [];
      let y = [];
      this._originalData.forEach((el) => {
        x.push(el[0]);
        y.push(el[1]);
      });
      // This case has no mutation for the x variable, it's a brand new object
      this.setXWaveform(x);
      data = y;
    } else {
      data = this._originalData;
    }
    // Using typed array, we need to make a copy of the data
    const nanable = this.isNaNAllowed();
    let warnNaN = false;
    let newData;

    // Using typed arrays ?
    if (this.getTypedArrayClass()) {
      // Create the typed array
      newData = this._makeArray(data.length);

      data.forEach((el, index) => {
        if (!nanable && (el[0] !== el[0] || el[1] !== el[1])) {
          warnNaN = true;
        }
        // Copy all the data in it
        newData[index] = el;
      });

      if (warnNaN) {
        this.warn(
          "Trying to assign NaN values to a typed array that does not support NaNs. 0's will be used instead"
        );
      }
    } else {

      if (!nanable) {
        data.forEach((el, index) => {
          if (!nanable && (el[0] !== el[0] || el[1] !== el[1])) {
            warnNaN = true;
          }
        });
      }

      newData = data;
    }

    if (this._originalDataX) {
      if (this._xdata) {
        this._xdata.mutated();
      } else {
        this.setXWaveform(this._originalDataX);
      }
    }

    this._setData(newData);
    return this;
  }

  getY(index: number, optimized: boolean = false) {
    if (optimized && this.dataInUse) {
      return this.dataInUse.y[index] * this.getScale() + this.getShift();
    }

    return this._data[index] * this.getScale() + this.getShift();
  }

  /*
    flipXY() {
      let temp;
      temp = this.data.x;
      this.data.x = this.data.y;
      this.data.y = temp;

      this._setData( this.data.x, this.data.y );
    }*/

  setXWaveform(waveform: Waveform | Array<number>) {
    if (!(waveform instanceof Waveform)) {
      if (Array.isArray(waveform)) {
        waveform = new Waveform(waveform);
      } else {
        throw 'Cannot set X waveform. Data is not a valid array.';
      }
    }

    this._xdata = waveform;

    this.computeXMinMax();
    return this;
  }

  hasXWaveform() {
    return !!this._xdata;
  }

  getXWaveform() {
    if (this._xdata) {
      return this._xdata;
    }

    var wave = new Waveform();
    for (var i = 0; i < this.getLength(); i += 1) {
      wave.append(null, this.getX(i));
    }
    return wave;
  }

  rescaleX(offset, scale) {
    this.xScale = scale;
    this.xOffset = offset;
    this.computeXMinMax();
    return this;
  }

  getTypedArrayClass() {
    return this._typedArrayClass || false;
  }

  setTypedArrayClass(constructor) {
    if (
      this.getTypedArrayClass() &&
      this.isNaNAllowed() &&
      !this.isNaNAllowed(constructor)
    ) {
      this.warn(
        `NaN values are not allowed by the new constructor (${constructor.name
        }) while it was allowed by the previous one (${this._typedArrayClass})`
      );
    }

    if (
      this.getTypedArrayClass() &&
      this.isUnsigned() &&
      !this.isUnsigned(constructor)
    ) {
      this.warn(
        'You are switching from signed values to unsigned values. You may experience data corruption if there were some negative values.'
      );
    }

    this._typedArrayClass = constructor;

    if (this._data) {
      this._setData(constructor.from(this._data));
    }

    if (this.hasXWaveform()) {
      this.getXWaveform().setTypedArrayClass(constructor);
    }
  }

  isNaNAllowed(constructor = this._typedArrayClass) {
    // The following types accept NaNs
    return (
      constructor == Array ||
      constructor == Float32Array ||
      constructor == Float64Array
    );
  }

  isUnsigned(constructor = this._typedArrayClass) {
    // The following types accept NaNs
    return (
      constructor == Uint8Array ||
      constructor == Uint8ClampedArray ||
      constructor == Uint16Array ||
      constructor == Uint32Array
    );
  }

  recalculateMinMaxNewPoint(x, y) {
    if (x < this.minX || this.minX === undefined) {
      this.minX = x;
    }

    if (x > this.maxX || this.maxX === undefined) {
      this.maxX = x;
    }

    if (y < this.minY || this.minY === undefined) {
      this.minY = y;
    }

    if (y > this.maxY || this.maxY === undefined) {
      this.maxY = y;
    }
  }

  calculateHistogram(xMin: number, xMax: number, dX: number): Waveform {

    if (xMin == xMax) {
      xMin -= dX;
      xMax += dX;
    }

    const numBins = Math.ceil((xMax - xMin) / dX);
    if (xMax <= xMin || dX < 0 || isNaN(dX) || dX == undefined) {

      throw "xMin/xMax/dX is ill formed";
    }
    const newY = new Array(numBins);
    newY.fill(0);
    const newX = new Array(numBins);
    for (let i = 0; i < numBins; i++) {
      newX[i] = xMin + dX * i;
    }

    for (let i = 0; i < this.getLength(); i++) {
      let y = this.getY(i, false);
      const bin = Math.floor((y - xMin) / dX);

      newY[bin]++;
    }
    let w = new Waveform();
    w.setData(newY, newX);
    return w;
  }

  prepend(x, y) {
    if (typeof x == 'function') {
      x = x(this);
    }

    if (typeof y == 'function') {
      y = y(this);
    }

    if (this._xdata) {
      this._xdata.prepend(null, x);
    } else if (x !== null) {
      this._xdata = this.getXWaveform();
      this._xdata.prepend(null, x);
    } else {
      this.xOffset -= this.xScale;
    }

    this._data.unshift(y);
    this.recalculateMinMaxNewPoint(x, y);
    return this;
  }

  append(x, y) {
    if (typeof x == 'function') {
      x = x(this);
    }

    if (typeof y == 'function') {
      y = y(this);
    }

    if (this._xdata) {
      this._xdata.append(null, x);
    } else if (x !== null) {
      this._xdata = this.getXWaveform();
      this._xdata.append(null, x);
    }

    if (this._monotoneous) {
      if (
        y > this._data[this._data.length - 1] &&
        this.getMonotoneousAscending() === false
      ) {
        this._monotoneous = false;
      } else if (
        y < this._data[this._data.length - 1] &&
        this.getMonotoneousAscending() === true
      ) {
        this._monotoneous = false;
      }
    }

    if (this._data.length == 1 || this._monotoneousAscending === undefined) {
      this._monotoneous = true;

      if (y == this._data[0]) {
        this._monotoneousAscending = undefined;
      } else {
        this._monotoneousAscending = y > this._data[0];
      }
    }

    this._data.push(y);
    this.recalculateMinMaxNewPoint(x, y);

    return this;
  }

  concat(wave2) {
    if (!this._xdata) {
      this._xdata = this.getXWaveform();
    }

    if (!wave2.xdata) {
      wave2.xdata = wave2.getXWaveform();
    }

    this._data = this._data.concat(wave2.data);
    this._xdata._data = this._xdata._data.concat(wave2.xdata._data);

    this.checkMonotonicity();
    this._xdata.checkMonotonicity();

    this.computeXMinMax();

    return this;
  }

  _makeArray(length) {
    const constructor = this.getTypedArrayClass();
    if (constructor) {
      return new constructor(length);
    }
    return new Array(length);
  }

  _setData(dataY) {
    const l = dataY.length;
    let i = 1,
      monoDir = dataY[1] > dataY[0],
      minY = dataY[0],
      maxY = dataY[0];

    if (isNaN(minY)) {
      minY = Number.MAX_VALUE;
    }

    if (isNaN(maxY)) {
      maxY = -Number.MAX_VALUE;
    }

    this._monotoneous = true;

    for (; i < l; i++) {
      if (dataY[i] !== dataY[i - 1] && monoDir !== dataY[i] > dataY[i - 1]) {
        this._monotoneous = false;
      }

      if (dataY[i] === dataY[i]) {
        // NaN support
        minY = Math.min(dataY[i], minY);
        maxY = Math.max(dataY[i], maxY);
      }
    }
    if (this._monotoneous) {
      this._monotoneousAscending = dataY[1] > dataY[0];
    }

    this._data = dataY;

    this.minY = minY;
    this.maxY = maxY;
    this.checkMinMaxErrorBars();
    this.computeXMinMax();
  }

  checkMinMaxErrorBars() {
    let minY = this.minY,
      maxY = this.maxY,
      i = 0,
      l = this.getLength();

    if (this.hasErrorBars()) {
      // If prefer to loop again here

      for (i = 0; i < l; i++) {
        if (this._data[i] === this._data[i]) {
          // NaN support

          minY = Math.min(minY, this._data[i] - this.getMaxError(i, ErrorPosition.BELOW));
          maxY = Math.max(maxY, this._data[i] + this.getMaxError(i, ErrorPosition.ABOVE));
        }
      }

      this.minY = minY;
      this.maxY = maxY;
    } else {
      this.minY = minY;
      this.maxY = maxY;
    }
  }

  computeXMinMax() {
    if (!this._data) {
      return;
    }

    if (this._xdata) {
      this.minX = this._xdata.getMin();
      this.maxX = this._xdata.getMax();
    } else {
      const b1 = this.xOffset + this.xScale * this.getLength(),
        b2 = this.xOffset;

      this.minX = Math.min(b1, b2);
      this.maxX = Math.max(b1, b2);
    }
  }

  getDataInUse() {
    return this.dataInUse || this._data;
  }

  getIndexFromVal(val, useDataToUse = false, roundingMethod = Math.round) {
    let data;

    if (useDataToUse && this.dataInUse) {
      data = this.dataInUse.y;
    } else {
      data = this._data;
    }

    let position;

    position = this.getIndexFromMonotoneousData(
      val,
      data,
      this.getMonotoneousAscending()
    );

    if (useDataToUse && this.dataInUse && this.dataInUseType == 'aggregateY') {
      // In case of aggregation, round to the closest element of 4.
      return position - (position % 4);
    }

    return position;
  }

  getIndexFromX(xval, useDataToUse = false, roundingMethod = Math.round) {
    let xdata;

    let data, position;

    xval -= this.getXShift();
    xval /= this.getXScale();

    if (xval < this.getDataMinX()) {
      return false;
    }

    if (xval > this.getDataMaxX()) {
      return false;
    }

    if (useDataToUse && this.dataInUse) {
      xdata = this.dataInUse.x;
    } else if (this._xdata) {
      xdata = this._xdata.getData(useDataToUse);
    }

    if (this.hasXWaveform()) {

      if (this.isXMonotoneous()) {
        position = this._xdata.getIndexFromMonotoneousData(
          xval,
          xdata,
          this._xdata.getMonotoneousAscending(),
        );
      } else {
        position = euclidianSearch(xval, undefined, xdata, undefined, 1, undefined);

      }
    } else {
      position = Math.max(
        0,
        Math.min(
          this.getLength() - 1,
          roundingMethod((xval - this.xOffset) / this.xScale)
        )
      );
    }

    if (useDataToUse && this.dataInUse && this.dataInUseType == 'aggregateX') {
      // In case of aggregation, round to the closest element of 4.
      return position - (position % 4);
    }

    return position;
  }

  getIndexFromY(yval, useDataToUse = false, roundingMethod = Math.round) {
    let ydata;

    let data, position;

    yval -= this.getShift();
    yval /= this.getScale();

    if (yval < this.getDataMinY()) {
      return false;
    }

    if (yval > this.getDataMaxY()) {
      return false;
    }

    if (useDataToUse && this.dataInUse) {
      ydata = this.dataInUse.y;
    } else {
      ydata = this.getData(false);
    }

    position = euclidianSearch(undefined, yval, undefined, ydata, 1, undefined);

    if (useDataToUse && this.dataInUse && this.dataInUseType == 'aggregateX') {
      // In case of aggregation, round to the closest element of 4.
      return position - (position % 4);
    }

    return position;
  }

  /*
    getIndexFromX( xval, useDataToUse = false, roundingMethod = Math.round ) {
      if ( this.getXMin() > xval || this.getXMax() < xval ) {
        return false;
      }

      if ( this.hasXWaveform() ) {
        // The x value HAS to be rescaled

        position = this._xdata.getIndexFromMonotoneousData(
          xval,
          xdata,
          this._xdata.getMonotoneousAscending(),
          roundingMethod
        );
      } else {
        position = Math.max(
          0,
          Math.min(
            this.getLength() - 1,
            roundingMethod( ( xval - this.xOffset ) / this.xScale )
          )
        );
      }

      return position;
    }
  */

  setAtIndex(index, value) {
    this._data[index] = value;
  }
  /**
   * Finds the point in the data stack with the smalled distance based on an x and y value.
   * @param {number} xval
   * @param {number} yval
   * @param {boolean} useDataToUse
   * @param {function} roundingMethod
   * @param {number} scaleX
   * @param {number} scaleY
   * @returns {number} The index of the closest position
   */
  getIndexFromXY(
    xval,
    yval,
    useDataToUse = false,
    roundingMethod = Math.round,
    scaleX = 1,
    scaleY = 1
  ) {
    let xdata, ydata;

    if (useDataToUse && this.dataInUse) {
      xdata = this.dataInUse.x;
      ydata = this.dataInUse.y;
    } else if (this._xdata) {
      xdata = this._xdata._data;
      ydata = this._data;
    }

    let position;

    //  if ( this.isXMonotoneous() ) {
    // X lookup only
    //     position = this.getIndexFromX( xval, useDataToUse, roundingMethod );

    //   } else if ( !isNaN( yval ) ) {
    position = this.getIndexFromDataXY(
      xval,
      xdata,
      yval,
      ydata,
      scaleX,
      scaleY
    );
    //   } else {
    //     return;
    //   }

    if (useDataToUse && this.dataInUse && this.dataInUseType == 'aggregateX') {
      // In case of aggregation, round to the closest element of 4.
      return position - (position % 4);
    }

    return position;
  }

  /**
   * Finds the closest point in x and y direction.
   * @see euclidianSearch
   * @private
   * @param {number} valX
   * @param {array<number>} dataX
   * @param {number} valY
   * @param {array<number>} dataY
   * @param {number} [ scaleX = 1 ]
   * @param {number} [ scaleY = 1 ]
   *
   * @returns {number} The index of the closest point
   */
  getIndexFromDataXY(valX, dataX, valY, dataY, scaleX = 1, scaleY = 1) {
    let data, position;

    valX -= this.getXShift();
    valX /= this.getXScale();

    valY -= this.getShift();
    valY /= this.getScale();

    return euclidianSearch(valX, valY, dataX, dataY, scaleX, scaleY);
  }

  /**
   * Uses binary search to find the index the closest to ```val``` in ```valCollection```.
   * @param {number} val
   * @param {array<number>} valCollection
   * @param {boolean} isAscending
   */
  getIndexFromMonotoneousData(val, valCollection, isAscending) {
    if (!this.isMonotoneous()) {
      console.trace();
      throw 'Impossible to get the index from a non-monotoneous wave !';
    }

    val -= this.getShift();
    val /= this.getScale();

    return binarySearch(val, valCollection, !isAscending);
  }

  findWithShortestDistance(options) {
    if (!options.axisRef) {
      const index = this.getIndexFromXY(
        options.x,
        options.y,
        true,
        undefined,
        options.scaleX,
        options.scaleY
      );
      if (options.xMaxDistance && Math.abs(options.x - this.getX(index)) > Math.abs(options.xMaxDistance)) {
        return -1;
      }

      if (options.yMaxDistance && Math.abs(options.y - this.getY(index)) > Math.abs(options.yMaxDistance)) {
        return -1;
      }

      return index;
    } else {

      if (options.axisRef == 'x') {
        const index = this.getIndexFromX(options.x, true, undefined);

        if (options.xMaxDistance && Math.abs(options.x - this.getX(index)) > Math.abs(options.xMaxDistance)) {
          return -1;
        }

        return index;
      }

      if (options.axisRef == 'y') {
        const index = this.getIndexFromY(options.y, true, undefined);

        if (options.yMaxDistance && Math.abs(options.y - this.getY(index)) > Math.abs(options.yMaxDistance)) {
          return -1;
        }

        return index;
      }
    }
  }

  getShortestDistanceToPoint(valX, valY, maxDistanceX, maxDistanceY) {
    valX -= this.getXShift();
    valX /= this.getXScale();

    valY -= this.getShift();
    valY /= this.getScale();

    let x, y, y2, x2, i, distance, shortestDistance, shortestDistanceIndex;

    const point = {
      x: valX,
      y: valY
    };

    for (i = 0; i < this.getLength() - 1; i++) {
      shortestDistance = Number.MAX_SAFE_INTEGER;
      shortestDistanceIndex = 0;

      x = this.getX(i);
      y = this.getY(i);

      x2 = this.getX(i + 1);
      y2 = this.getY(i + 1);

      if (
        (maxDistanceX &&
          ((x - valX > maxDistanceX && x2 - valX > maxDistanceX) ||
            (valX - x > maxDistanceX && valX - x2 > maxDistanceX))) ||
        (maxDistanceY &&
          ((y - valY > maxDistanceY && y2 - valY > maxDistanceY) ||
            (valY - y > maxDistanceY && valY - y2 > maxDistanceY)))
      ) {
        continue;
      }

      distance = distToSegment(point, {
        x: x,
        y: y
      }, {
        x: x2,
        y: y2
      });
      if (distance < shortestDistance) {
        shortestDistance = distance;
        shortestDistanceIndex = i;
      }
    }

    return {
      shortestDistance: distance,
      index: shortestDistanceIndex
    };
  }
  getReductionType() {
    return this.dataInUseType;
  }

  getXMin() {
    return this.minX * this.getXScale() + this.getXShift();
  }

  getXMax() {
    return this.maxX * this.getXScale() + this.getXShift();
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
    return this.minX * this.getXScale() + this.getXShift();
  }

  getMaxX() {
    return this.maxX * this.getXScale() + this.getXShift();
  }

  getMinY() {
    return this.minY * this.getScale() + this.getShift();
  }

  getMaxY() {
    return this.maxY * this.getScale() + this.getShift();
  }

  getDataMaxX() {
    return this.maxX;
  }

  getDataMinX() {
    return this.minX;
  }

  getDataMaxY() {
    return this.maxY;
  }

  getDataMinY() {
    return this.minY;
  }

  getDataY() {
    return this._data;
  }

  getData(optimized: boolean = false) {
    if (!optimized || !this.dataInUse) {
      return this._data;
    }
    return this.dataInUse.y;
  }

  setShift(shift = 0) {
    // We must update the min and the max of the y data
    //this.minY += ( shift - this.getShift() );
    //this.maxY += ( shift - this.getShift() );
    this.shift = shift;
    return this;
  }

  getShift() {
    return this.shift || 0;
  }

  getScale() {
    return this.scale || 1;
  }

  setScale(scale = 1) {
    // this.minY = ( this.minY - this.getShift() ) * scale;
    // this.maxY = ( this.maxY - this.getShift() ) * scale;
    this.scale = scale;
    return this;
  }

  setXShift(shift = 0) {
    if (!this.hasXWaveform) {
      return this;
    }

    // We must update the min and the max of the x data
    // That's important for when the data has already been set
    //  this.minX += ( shift - this.getXShift() );
    //    this.maxX += ( shift - this.getXShift() );
    this.getXWaveform().setShift(shift);
    return this;
  }

  getXShift(shift = 0) {
    if (!this.hasXWaveform) {
      return 0;
    }

    return this.getXWaveform().getShift();
  }

  setXScale(scale = 1) {
    if (!this.hasXWaveform) {
      return this;
    }

    this.getXWaveform().setScale(scale);
    return this;
  }

  getXScale() {
    if (!this.hasXWaveform) {
      return 1;
    }

    return this.getXWaveform().getScale();
  }

  getLength() {
    return this._data.length;
  }

  getDataToUseFlat() {
    let l;
    let j = 0;
    let arr;

    if (this.dataInUse) {
      l = this.dataInUse.x.length;
      arr = new Array(l * 2).fill(0);

      for (var i = 0; i < l; i += 1) {
        arr[j] = this.dataInUse.x[i];
        arr[j + 1] = this.dataInUse.y[i];
        j += 2;
      }
    } else {
      l = this.getLength();
      arr = new Array(l * 2).fill(0);
      for (var i = 0; i < l; i += 1) {
        arr[j + 1] = this._data[i];
        arr[j] = this.getX(i);
        j += 2;
      }
    }

    return arr;
  }

  fit(options) {
    var self = this;

    return new Promise(function (resolver, rejector) {
      var fit = new FitLM(
        util.extend({}, {
          dataY: self,
          dataX: self.getXWaveform(),
          done: function (results) {
            resolver(results);
          },
          waveform: new Waveform()
        },
          options
        )
      );

      fit.init();
      fit.fit();
    });
  }

  getX(index: number, optimized: boolean = false) {
    if (optimized && this.dataInUse) {
      return this.dataInUse.x[index] * this.getXScale() + this.getXShift();
    }

    if (this._xdata) {
      return this._xdata._data[index] * this.getXScale() + this.getXShift();
    } else {
      return this.xOffset + index * this.xScale;
    }
  }

  getXRaw(index: number, optimized: boolean = false) {
    if (optimized && this.dataInUse) {
      return this.dataInUse.x[index];
    }

    if (this._xdata) {
      return this._xdata._data[index];
    } else {
      return index;
    }
  }

  _integrateP(from = 0, to = this.getLength() - 1) {
    from = Math.round(from);
    to = Math.round(to);

    if (from > to) {
      let temp = from;
      from = to;
      to = temp;
    }

    var l = to - from + 1;
    var sum = 0,
      delta;

    let deltaTot = 0;
    let diff;
    var arrY = this.getData(false);

    for (; from <= to; from++) {
      if (arrY.length - 1 > from) {
        diff = this.getX(from + 1) - this.getX(from);
        deltaTot += diff;
        sum += arrY[from] * diff;
      }
    }

    return [sum, l, deltaTot];
  }

  integrateP(from, to) {
    var val = this._integrateP(from, to);
    return val[0];
  }

  integrate(fromX, toX) {
    return this.integrateP(this.getIndexFromX(fromX), this.getIndexFromX(toX));
  }

  average(p0 = 0, p1 = this.getLength() - 1) {
    return this.getAverageP(p0, p1);
  }

  mean() {
    return this.average();
  }

  stddev() {
    let num = 0,
      denom = 0;
    const mean = this.mean();
    for (var i = 0; i < this.getLength(); i++) {
      num += (this.getY(i) - mean) ** 2;
      denom++;
    }

    return (num / denom) ** 0.5;
  }

  getAverageP(from, to) {
    var sum = this._integrateP(from, to);
    return sum[0] / sum[2];
  }

  getAverageX(from, to) {
    var sum = this.integrate(from, to);
    return sum[0] / sum[2];
  }

  checkMonotonicity() {
    let i = 1,
      data = this.getData(false);
    const l = this._data.length;
    let dir = data[1] > data[0];

    for (; i < l; i++) {
      if (data[i] !== data[i - 1] && dir !== data[i] > data[i - 1]) {
        return (this._monotoneous = false);
      }
    }

    this._monotoneousAscending = data[1] > data[0];
    return (this._monotoneous = true);
  }

  requireXMonotonicity() {
    if (this._xdata) {
      this._xdata.requireMonotonicity();
    }
  }

  requireMonotonicity() {
    if (!this.isMonotoneous()) {
      throw 'The wave must be monotonic';
    }
  }

  isMonotoneous() {
    return !!this._monotoneous;
  }

  isXMonotoneous() {
    if (this._xdata) {
      return this._xdata.isMonotoneous();
    }
    // Offset and scale is always monotoneous
    return true;
  }

  invert(data?: number[]) {
    let d = data || this._data;
    d.reverse();

    if (this._xdata) {
      this._xdata.invert();
    }

    if (this.isMonotoneous()) {
      this._monotoneousAscending = !this._monotoneousAscending;
    }

    return this;
  }

  resampleForDisplay(options) {
    // Serie redrawing

    let i = 0;

    this.requireXMonotonicity();

    let inverting = false,
      dataY = this.getDataY(),
      data = {
        x: [],
        y: []
      },
      dataMinMax = [],
      resampleSum,
      resampleMin,
      resampleMax,
      resampleNum,
      resample_x_start,
      resample_x_px_start,
      x_px,
      doing_mean = false,
      firstPointIndex = 0,
      xval;

    const l = this.getLength();

    if (!options.xPosition) {
      throw 'No position calculation method provided';
    }

    if (!options.resampleToPx) {
      throw 'No "resampleToPx" method was provided. Unit: px per point';
    }

    if (options.minX > options.maxX) {
      let temp = options.minX;
      options.minX = options.maxX;
      options.maxX = temp;
    }

    if (
      (this._xdata && !this._xdata.getMonotoneousAscending()) ||
      (!this._xdata && this.xScale < -0)
    ) {
      inverting = true;
      i = l;
    }

    for (; inverting ? i > 0 : i < l; inverting ? i-- : i++) {
      xval = this.getX(i);

      if (options.minX > xval) {
        firstPointIndex = i;
        continue;
      }

      x_px = options.xPosition(xval);

      if (!doing_mean) {
        if (!firstPointIndex) {
          firstPointIndex = i;
        } else {
          data.x.push(xval);
          data.y.push(dataY[firstPointIndex]);
        }

        while (isNaN(dataY[i])) {
          if (inverting) {
            i--;
          } else {
            i++;
          }
        }

        resampleSum = resampleMin = resampleMax = dataY[firstPointIndex];
        resampleNum = 1;
        resample_x_px_start = x_px;
        resample_x_start = xval;
        firstPointIndex = 0;

        doing_mean = true;

        continue;
      }

      if (
        Math.abs(x_px - resample_x_px_start) > options.resampleToPx ||
        i == l ||
        i == 0 ||
        isNaN(dataY[i])
      ) {
        let xpos = (resample_x_start + xval) / 2;

        data.x.push(xpos);
        data.y.push(resampleSum / resampleNum);

        dataMinMax.push(xpos, resampleMin, resampleMax);

        if (options.maxX !== undefined && xval > options.maxX) {
          break;
        }

        doing_mean = false;

        continue;
      }

      resampleSum += dataY[i];
      resampleNum++;

      resampleMin = Math.min(resampleMin, dataY[i]);
      resampleMax = Math.max(resampleMax, dataY[i]);
    }

    this.dataInUseType = 'resampled';
    this.dataInUse = data;
    return dataMinMax;
  }

  interpolate(x) {
    let yData = this.getDataY();
    let xIndex;

    if (this._xdata) {
      let xData = this._xdata.getData(false);

      try {
        xIndex = binarySearch(x, xData, !this._xdata.getMonotoneousAscending());
      } catch (e) {
        return NaN;
      }

      if (xData[xIndex] == x) {
        return yData[xIndex];
      }
      return (
        ((x - xData[xIndex]) / (xData[xIndex + 1] - xData[xIndex])) *
        (yData[xIndex + 1] - yData[xIndex]) +
        yData[xIndex]
      );
    } else {
      xIndex = (x - this.xOffset) / this.xScale;
      let xIndexF = Math.floor(xIndex);
      return (
        (xIndex - xIndexF) * (yData[xIndexF + 1] - yData[xIndexF]) +
        yData[xIndexF]
      );
    }
  }

  interpolateIndex_X(index) {
    let yData = this.getDataY();
    if (this._xdata) {
      let xData = this._xdata.getData();
      let indexStart = Math.floor(index);

      return (
        (index - indexStart) * (xData[indexStart + 1] - xData[indexStart]) +
        xData[indexStart]
      );
    }
  }

  getMonotoneousAscending() {
    if (!this.isMonotoneous()) {
      return 'The waveform is not monotoneous';
    }

    return this._monotoneousAscending;
  }

  getXMonotoneousAscending() {
    if (this._xdata) {
      return this._xdata.getMonotoneousAscending();
    }

    return this.xScale > 0;
  }

  isXMonotoneousAscending() {
    return this.getXMonotoneousAscending();
  }

  divide(numberOrWave: Waveform | number) {
    return this._arithmetic(numberOrWave, DIVIDE);
  }

  divideBy(numberOrWave: Waveform | number) {
    return this.divide(numberOrWave);
  }

  multiply(numberOrWave: Waveform | number) {
    return this._arithmetic(numberOrWave, MULTIPLY);
  }

  multiplyBy(numberOrWave: Waveform | number) {
    return this.multiply(numberOrWave);
  }

  log() {
    return this.logBase(10);
  }

  ln() {
    return this.logBase(Math.E);
  }

  logBase(base) {
    let logBase = Math.log(base);
    this._data.map((valY) => {
      return Math.log(valY) / logBase;
    });
  }

  add(numberOrWave: Waveform | number) {
    return this._arithmetic(numberOrWave, ADD);
  }

  addBy(numberOrWave: Waveform | number) {
    return this.add(numberOrWave);
  }

  subtract(numberOrWave: Waveform | number) {
    return this._arithmetic(numberOrWave, SUBTRACT);
  }

  subtractBy(numberOrWave: Waveform | number) {
    return this.subtract(numberOrWave);
  }

  math(method) {
    for (var i = 0; i < this.getLength(); i++) {
      this._data[i] = method(this.getY(i), this.getX(i));
    }

    this._setData(this._data);
    return this;
  }

  _arithmetic(numberOrWave, operator) {
    if (numberOrWave instanceof Waveform) {
      return this._waveArithmetic(numberOrWave, operator);
    } else if (typeof numberOrWave == 'number') {
      return this._numberArithmetic(numberOrWave, operator);
    }
  }

  _numberArithmetic(num, operation) {
    let i = 0,
      l = this.getLength();

    if (operation == MULTIPLY) {
      for (; i < l; i++) {
        this._data[i] *= num;
      }

      this.minY *= num;
      this.maxY *= num;
    } else if (operation == DIVIDE) {
      for (; i < l; i++) {
        this._data[i] /= num;
      }

      this.minY /= num;
      this.maxY /= num;
    } else if (operation == ADD) {
      for (; i < l; i++) {
        this._data[i] += num;
      }

      this.minY += num;
      this.maxY += num;
    } else if (operation == SUBTRACT) {
      for (; i < l; i++) {
        this._data[i] -= num;
      }

      this.minY -= num;
      this.maxY -= num;
    }

    return this;
  }

  _waveArithmetic(wave, operation) {
    let yDataThis = this.getDataY(),
      i = 0;
    const l = this.getLength();
    this.requireXMonotonicity();
    wave.requireXMonotonicity();

    if (this._xdata && wave.xdata) {
      const xSet = new Set<number>();
      const xData = this._xdata._data;
      const xData2 = wave.xdata._data;

      for (i = 0; i < xData.length; i++) {
        xSet.add(xData[i]);
      }

      for (i = 0; i < xData2.length; i++) {
        xSet.add(xData2[i]);
      }

      const xs = Array.from(xSet.values());
      xs.sort((a, b) => a - b);

      const ys = xs.map((x) => {
        if (operation == MULTIPLY) {
          return this.interpolate(x) * wave.interpolate(x);
        } else if (operation == DIVIDE) {
          return this.interpolate(x) / wave.interpolate(x);
        } else if (operation == ADD) {
          return this.interpolate(x) + wave.interpolate(x);
        } else if (operation == SUBTRACT) {
          return this.interpolate(x) - wave.interpolate(x);
        }
      });

      this._setData(ys);

      this._xdata._setData(xs);
    } else {
      if (operation == MULTIPLY) {
        for (; i < l; i++) {
          yDataThis[i] *= wave.interpolate(this.getX(i));
        }
      } else if (operation == DIVIDE) {
        for (; i < l; i++) {
          yDataThis[i] /= wave.interpolate(this.getX(i));
        }
      } else if (operation == ADD) {
        for (; i < l; i++) {
          yDataThis[i] += wave.interpolate(this.getX(i));
        }
      } else if (operation == SUBTRACT) {
        for (; i < l; i++) {
          yDataThis[i] -= wave.interpolate(this.getX(i));
        }
      }

      this._setData(yDataThis);
    }

    return this;
  }

  aggregate(direction = 'x') {

    this._dataAggregated = {};
    this._dataAggregationDirection = direction.toUpperCase();

    var pow2 = pow2floor(this.getLength());

    this._dataAggregating = aggregator({
      minX: this.minX,
      maxX: this.maxX,
      minY: this.minY,
      maxY: this.maxY,
      data: this._data,
      xdata: this._xdata ? this._xdata.getData() : undefined,
      xScale: this.xScale,
      xOffset: this.xOffset,
      numPoints: pow2,
      direction: direction
    }).then((event) => {
      this._dataAggregated = event.aggregates;
      this._dataAggregating = undefined;
    });
  }

  hasAggregation() {
    return !!this._dataAggregated;
  }

  selectAggregatedData(pxWidth) {
    if (pxWidth < 2) {
      return false;
    }
    /*
        if( direction !== this._dataAggregationDirection ) {
          throw "The data is not aggregated in that direction";
        }
    */

    var level = pow2ceil(pxWidth);

    if (this._dataAggregated[level]) {
      this.dataInUseType = `aggregate${this._dataAggregationDirection}`;
      this.dataInUse = this._dataAggregated[level];
      return;
    } else if (this._dataAggregating) {
      return this._dataAggregating;
    }

    this.dataInUseType = 'none';
    this.dataInUse = {
      y: this._data,
      x: this.getXWaveform()._data
    };
  }

  duplicate(alsoDuplicateXWave = true) {
    var newWaveform = new Waveform();
    newWaveform._setData(this.getDataY().slice());
    newWaveform.rescaleX(this.xOffset, this.xScale);
    newWaveform.setShift(this.getShift());
    newWaveform.setScale(this.getScale());

    if (this._xdata) {
      if (alsoDuplicateXWave) {
        newWaveform.setXWaveform(this._xdata.duplicate());
      } else {
        newWaveform.setXWaveform(this._xdata);
      }

      newWaveform.setXShift(this.getXShift());
      newWaveform.setXScale(this.getXScale());
    } else {
      newWaveform.xOffset = this.xOffset;
      newWaveform.xScale = this.xScale;
    }

    return newWaveform;
  }

  subrangeX(fromX: number, toX: number) {
    if (!this._xdata) {
      // We can select the new range from there

      let fromP = this.getIndexFromX(fromX),
        toP = this.getIndexFromX(toX);

      return new Waveform()
        .setData(this._data.slice(fromP, toP))
        .rescaleX(this.xOffset, this.xScale);
    } else {
      var waveform = new Waveform();

      let xdata = this.getXWaveform();
      const _dataX = xdata._data;
      for (var i = 0, l = this._data.length; i < l; i++) {
        if (this._data[i] >= fromX && this._data[i] < toX) {
          waveform.append(_dataX[i], this._data[i]);
        }
      }

      return waveform;
    }
  }

  findLocalMinMax(xRef, xWithin, type) {
    let index = this.getIndexFromX(xRef),
      indexPlus = this.getIndexFromX(xRef + xWithin),
      indexMinus = this.getIndexFromX(xRef - xWithin);

    return this.findLocalMinMaxIndex(indexMinus, indexPlus, type);
  }

  findLocalMinMaxIndex(indexMinus, indexPlus, type) {
    let tmp;

    if (indexPlus < indexMinus) {
      tmp = indexPlus;
      indexPlus = indexMinus;
      indexMinus = tmp;
    }

    let curr, currI;

    if (type == 'max') {
      curr = Number.NEGATIVE_INFINITY;

      for (var i = indexMinus; i <= indexPlus; i++) {
        if (this.getY(i) > curr) {
          curr = this.getY(i);
          currI = i;
        }
      }
    } else {
      curr = Number.POSITIVE_INFINITY;

      for (var i = indexMinus; i <= indexPlus; i++) {
        if (this.getY(i) < curr) {
          curr = this.getY(i);
          currI = i;
        }
      }
    }

    if (currI == indexMinus || currI == indexPlus) {
      return false;
    }

    return this.getX(currI);
  }

  warn(text) {
    if (console) {
      console.warn(text);
    }
  }

  setUnit(unit: string) {
    this.unit = unit;
    return this;
  }

  setXUnit(unit: string) {
    if (this.hasXWaveform()) {
      this._xdata.setUnit(unit);
    }

    this.xunit = unit;
    return this;
  }

  getUnit() {
    return this.unit || '';
  }

  getXUnit() {
    if (this.hasXWaveform()) {
      return this._xdata.getUnit();
    }

    return this.xunit || '';
  }

  hasXUnit() {
    return this.getXUnit().length > 0;
  }

  hasUnit() {
    return this.getUnit().length > 0;
  }

  findLevels(level, options) {
    options = util.extend({
      box: 1,
      edge: 'both',
      rounding: 'before',
      rangeP: [0, this.getLength()]
    },
      options
    );

    var lastLvlIndex = options.rangeP[0];
    var lvlIndex;
    var indices = [];
    var i = 0;

    while (
      (lvlIndex = this.findLevel(
        level,
        util.extend(true, {}, options, {
          rangeP: [lastLvlIndex, options.rangeP[1]]
        })
      ))
    ) {
      indices.push(lvlIndex);
      lastLvlIndex = Math.ceil(lvlIndex);

      i++;
      if (i > 1000) {
        return;
      }
    }

    return indices;
  }

  // Find the first level in the specified range
  findLevel(level, options) {
    options = util.extend({
      box: 1,
      edge: 'both',
      direction: 'ascending',
      rounding: 'before',
      rangeP: [0, this.getLength()]
    },
      options
    );

    if (options.rangeX) {
      options.rangeP = options.rangeX.map(this.getIndexFromX);
    }

    var value, below, i, j, l, increment;

    var box = options.box;

    if (box % 2 == 0) {
      box++;
    }

    if (options.direction == 'descending') {
      (i = options.rangeP[1]), (l = options.rangeP[0]), (increment = -1);
    } else {
      (i = options.rangeP[0]), (l = options.rangeP[1]), (increment = +1);
    }

    for (; ; i += increment) {
      if (options.direction == 'descending') {
        if (i < l) {
          break;
        }
      } else {
        if (i > l) {
          break;
        }
      }

      if (i < options.rangeP[0] + (box - 1) / 2) {
        continue;
      }

      if (i > options.rangeP[1] - (box - 1) / 2) {
        break;
      }

      value = this.getAverageP(i - (box - 1) / 2, i + (box - 1) / 2);

      if (below === undefined) {
        below = value < level;
        continue;
      }
      // Crossing up
      if (value >= level && below) {
        below = false;

        if (options.edge == 'ascending' || options.edge == 'both') {
          // Found something

          for (let j = i + (box - 1) / 2; j >= i - (box - 1) / 2; j--) {
            if (this._data[j] >= level && this._data[j - 1] <= level) {
              // Find a crossing

              switch (options.rounding) {
                case 'before':
                  return j - 1;
                  break;

                case 'after':
                  return j;
                  break;

                case 'interpolate':
                  return getIndexInterpolate(
                    level,
                    this._data[j],
                    this._data[j - 1],
                    j,
                    j - 1
                  );
                  break;
              }
            }
          }
        }
      } else if (value <= level && !below) {
        below = true;

        if (options.edge == 'descending' || options.edge == 'both') {
          for (j = i + (box - 1) / 2; j >= i - (box - 1) / 2; j--) {
            if (this._data[j] <= level && this._data[j - 1] >= level) {
              // Find a crossing

              switch (options.rounding) {
                case 'before':
                  return j - 1;
                  break;

                case 'after':
                  return j;
                  break;

                case 'interpolate':
                  return getIndexInterpolate(
                    level,
                    this._data[j],
                    this._data[j - 1],
                    j,
                    j - 1
                  );
                  break;
              }
            }
          }
        }
      }
    }
  }

  normalize(mode) {
    let factor, total, minValue, maxValue, ratio, i;

    if (mode == 'max1' || mode == 'max100') {
      factor = 1;

      if (mode == 'max100') {
        factor = 100;
      }

      maxValue = this._data[0];

      for (i = 1; i < this.getLength(); i++) {
        if (this._data[i] > maxValue) {
          maxValue = this._data[i];
        }
      }

      for (i = 0; i < this.getLength(); i++) {
        this._data[i] /= maxValue / factor;
      }
    } else if (mode == 'sum1') {
      total = 0;

      for (i = 0; i < this.getLength(); i++) {
        total += this._data[i];
      }

      for (i = 0; i < this.getLength(); i++) {
        this._data[i] /= total;
      }
    } else if (mode == 'max1min0') {
      (maxValue = this._data[0]), (minValue = this._data[0]);

      for (i = 1; i < this.getLength(); i++) {
        if (this._data[i] > maxValue) {
          maxValue = this._data[i];
        } else if (this._data[i] < minValue) {
          minValue = this._data[i];
        }
      }

      ratio = 1 / (maxValue - minValue);

      for (i = 0; i < this.getLength(); i++) {
        this._data[i] = (this._data[i] - minValue) * ratio;
      }
    }

    this.setData(this._data);
  }

  filterNaN() {
    const l = this._data.length - 1;
    for (var i = l; i >= 0; i--) {
      if (isNaN(this._data[i])) {
        this._data = this._data.splice(i, 1);

        if (this._xdata) {
          this._xdata._data.splice(i, 1);
        }
      }
    }
  }

  filterInfinity() {
    const l = this._data.length - 1;
    for (var i = l; i >= 0; i--) {
      if (!isFinite(this._data[i])) {
        this._data = this._data.splice(i, 1);

        if (this._xdata) {
          this._xdata._data.splice(i, 1);
        }
      }
    }
  }

  ////////////////////////////////////////////////////////////
  ///// HANDLING ERRORS   ////////////////////////////////////
  ////////////////////////////////////////////////////////////

  setErrorBarX(waveform) {
    if (!(waveform instanceof Waveform)) {
      waveform = new Waveform(waveform);
    }

    var xWave = this.getXWaveform();
    xWave.setErrorBar(waveform);
    return this;
  }

  setErrorBarXBelow(waveform) {
    if (!(waveform instanceof Waveform)) {
      waveform = new Waveform(waveform);
    }

    var xWave = this.getXWaveform();
    xWave.setErrorBarBelow(waveform);
    return this;
  }

  setErrorBarXAbove(waveform) {
    if (!(waveform instanceof Waveform)) {
      waveform = new Waveform(waveform);
    }

    var xWave = this.getXWaveform();
    xWave.setErrorBarAbove(waveform);
    return this;
  }

  setErrorBoxX(waveform) {
    if (!(waveform instanceof Waveform)) {
      waveform = new Waveform(waveform);
    }

    var xWave = this.getXWaveform();
    xWave.setErrorBoxAbove(waveform);
    xWave.setErrorBoxBelow(waveform);
    return this;
  }

  setErrorBoxXBelow(waveform) {
    if (!(waveform instanceof Waveform)) {
      waveform = new Waveform(waveform);
    }

    var xWave = this.getXWaveform();

    xWave.setErrorBoxBelow(waveform);
    return this;
  }

  setErrorBoxXAbove(waveform) {
    if (!(waveform instanceof Waveform)) {
      waveform = new Waveform(waveform);
    }

    var xWave = this.getXWaveform();
    xWave.setErrorBoxAbove(waveform);
    return this;
  }

  setErrorBar(waveform, checkMinMax = true) {
    if (!(waveform instanceof Waveform)) {
      waveform = new Waveform(waveform);
    }
    this.errors.nb++;
    this.errors.nb++;
    this.errors.bars.below = waveform;
    this.errors.bars.above = waveform;

    if (checkMinMax) {
      this._setData(this._data);
    }
  }

  setErrorBarBelow(waveform, checkMinMax = true) {
    if (!(waveform instanceof Waveform)) {
      waveform = new Waveform(waveform);
    }
    this.errors.nb++;
    this.errors.bars.below = waveform;

    if (checkMinMax) {
      this._setData(this._data);
    }
  }

  setErrorBarAbove(waveform, checkMinMax = true) {
    if (!(waveform instanceof Waveform)) {
      waveform = new Waveform(waveform);
    }

    this.errors.nb++;
    this.errors.bars.above = waveform;

    if (checkMinMax) {
      this._setData(this._data);
    }
  }

  setErrorBox(waveform, checkMinMax = true) {
    if (!(waveform instanceof Waveform)) {
      waveform = new Waveform(waveform);
    }
    this.errors.nb++;
    this.errors.nb++;
    this.errors.boxes.above = waveform;
    this.errors.boxes.below = waveform;

    if (checkMinMax) {
      this._setData(this._data);
    }
  }

  setErrorBoxBelow(waveform, checkMinMax = true) {
    if (!(waveform instanceof Waveform)) {
      waveform = new Waveform(waveform);
    }
    this.errors.nb++;
    this.errors.boxes.below = waveform;

    if (checkMinMax) {
      this._setData(this._data);
    }
  }

  setErrorBoxAbove(waveform, checkMinMax = true) {
    if (!(waveform instanceof Waveform)) {
      waveform = new Waveform(waveform);
    }

    this.errors.boxes.above = waveform;
    if (checkMinMax) {
      this._setData(this._data);
    }
  }

  getMaxError(i, side = ErrorPosition.ABOVE) {
    return Math.max(
      this.getMaxErrorType(i, side, ErrorType.BOX),
      this.getMaxErrorType(i, side, ErrorType.BAR)
    );
  }

  getMaxErrorType(i, side = ErrorPosition.ABOVE, type = ErrorType.BOX) {
    let stack;
    if (type == ErrorType.BOX) {
      stack = this.errors.boxes;
    } else if (type == ErrorType.BAR) {
      stack = this.errors.bars;
    } else {
      throw 'Unknown type of error';
    }

    let waveform;
    if (!(waveform = stack[side])) {
      if (side == ErrorPosition.ABOVE) {
        if (stack[side] == ErrorPosition.BELOW) {
          waveform = stack.below;
        }
      } else {
        if (stack[side] == ErrorPosition.ABOVE) {
          waveform = stack.above;
        }
      }
    }

    if (!waveform) {
      return 0;
    }

    return waveform.getY(i);
  }

  getErrorBarXBelow(index) {
    return this.getErrorX(index, ErrorPosition.BELOW, ErrorType.BAR);
  }
  getErrorBarXAbove(index) {
    return this.getErrorX(index, ErrorPosition.ABOVE, ErrorType.BAR);
  }
  getErrorBoxXBelow(index) {
    return this.getErrorX(index, ErrorPosition.BELOW, ErrorType.BOX);
  }
  getErrorBoxXAbove(index) {
    return this.getErrorX(index, ErrorPosition.ABOVE, ErrorType.BOX);
  }

  getErrorBarYBelow(index) {
    return this.getError(index, ErrorPosition.BELOW, ErrorType.BAR);
  }
  getErrorBarYAbove(index) {
    return this.getError(index, ErrorPosition.ABOVE, ErrorType.BAR);
  }
  getErrorBoxYBelow(index) {
    return this.getError(index, ErrorPosition.BELOW, ErrorType.BOX);
  }
  getErrorBoxYAbove(index) {
    return this.getError(index, ErrorPosition.ABOVE, ErrorType.BOX);
  }

  getErrorX(index, side = ErrorPosition.ABOVE, type = ErrorType.BAR) {
    if (!this.hasXWaveform()) {
      return false;
    }

    return this._xdata.getError(index, side, type);
  }

  getError(index, side = ErrorPosition.ABOVE, type = ErrorType.BAR) {
    let errors = type == ErrorType.BAR ? this.errors.bars : this.errors.boxes;

    if (!errors) {
      return false;
    }

    let wave;
    if ((wave = side == ErrorPosition.ABOVE ? errors.above : errors.below)) {
      /*console.log( wave );
            if ( wave == Waveform.ABOVE && side == Waveform.BELOW ) {
              wave = errors.above;
            } else if ( wave == Waveform.BELOW && side == Waveform.ABOVE ) {
              wave = errors.below;
            }
      */
      /*
            if ( !wave ) {
              return false;
            }
      */
      return wave.getY(index);
    }
  }

  hasErrorBars() {
    return (
      this.errors.nb > 0 || (this.hasXWaveform() && this._xdata.errors.nb > 0)
    );
  }
}

enum ErrorPosition {
  ABOVE,
  BELOW
}

enum ErrorType {
  BOX,
  BAR
}

const MULTIPLY = Symbol();
const ADD = Symbol();
const SUBTRACT = Symbol();
const DIVIDE = Symbol();

// http://stackoverflow.com/questions/26965171/fast-nearest-power-of-2-in-javascript
function pow2ceil(v) {
  v--;
  var p = 2;
  while ((v >>= 1)) {
    p <<= 1;
  }
  return p;
}

function pow2floor(v) {
  var p = 1;
  while ((v >>= 1)) {
    p <<= 1;
  }
  return p;
}

function getIndexInterpolate(
  value,
  valueBefore,
  valueAfter,
  indexBefore,
  indexAfter
) {
  return (
    ((value - valueBefore) / (valueAfter - valueBefore)) *
    (indexAfter - indexBefore) +
    indexBefore
  );
}

/**
 * @private
 * Performs a euclidian search (as opposed to a binary search where the data must be monotoneously increasing and where the search is only in x). This is useful to find the closest point to a position (for example the one of the mouse) for any kind of data.
 * The scaleX and scaleY parameters could be used to skew the search. For example, let's say that you want to search the closest point in pixel, and not in value, you would need to reflect the different axes scaling into the scaleX and scaleY parameter
 *
 * @param {number} targetX The x position we want to get close to
 * @param {number} targetY The y position we want to get close to
 * @param {array<number>} haystackX The source data (array of x's)
 * @param {array<number>} haystackY The source data (array of y's) (paired by index to the x array)
 * @param {number} [ scaleX = 1 ] X-scaler (the higher, the more importance given to the x distance)
 * @param {number} [ scaleY = 1 ] Y-scaler (the higher, the more importance given to the y distance)
 * @returns The index of the closest point
 */
function euclidianSearch(
  targetX,
  targetY,
  haystackX,
  haystackY,
  scaleX = 1,
  scaleY = 1
) {
  let distance = Number.MAX_VALUE,
    distance_i;

  let index = -1;

  if (targetX !== undefined && targetY == undefined) {

    for (var i = 0, l = haystackX.length; i < l; i++) {
      distance_i = Math.abs((targetX - haystackX[i]) * scaleX);
      if (distance_i < distance) {
        index = i;
        distance = distance_i;
      }
    }

  } else if (targetX == undefined && targetY !== undefined) {

    for (var i = 0, l = haystackY.length; i < l; i++) {
      distance_i = Math.abs((targetY - haystackY[i]) * scaleY);
      if (distance_i < distance) {
        index = i;
        distance = distance_i;
      }
    }

  } else {

    for (var i = 0, l = haystackX.length; i < l; i++) {
      distance_i =
        ((targetX - haystackX[i]) * scaleX) ** 2 +
        ((targetY - haystackY[i]) * scaleY) ** 2;

      if (distance_i < distance) {
        index = i;
        distance = distance_i;
      }
    }
  }

  return index;
}

function binarySearch(
  target,
  haystack,
  reverse = haystack[haystack.length - 1] < haystack[0],
  fineCheck = true
) {
  let seedA = 0,
    length = haystack.length,
    seedB = length - 1,
    seedInt,
    i = 0,
    nanDirection = 1;

  if (
    (!reverse && (haystack[0] > target || haystack[seedB] < target)) ||
    (reverse && (haystack[0] < target || haystack[seedB] > target))
  ) {
    throw new Error(`Target ${target} is not in the stack`);
  }

  if (haystack[seedA] == target) {
    return seedA;
  }

  if (haystack[seedB] == target) {
    return seedB;
  }

  while (true) {
    i++;
    if (i > 1000) {
      throw new Error('Error loop');
    }

    seedInt = Math.floor((seedA + seedB) / 2);

    //  seedInt -= seedInt % 2; // Always looks for an x.

    while (isNaN(haystack[seedInt])) {
      if (seedInt >= haystack.length - 1) {
        return haystack.length - 1;
      } else if (seedInt <= 0) {
        return 0;
      }

      seedInt += nanDirection;
    }

    if (haystack[seedInt] == target) {
      return seedInt;
    }

    if (seedInt == seedA || seedInt == seedB) {
      if (!fineCheck) {
        return seedInt;
      }

      if (
        Math.abs(target - haystack[seedA]) < Math.abs(target - haystack[seedB])
      ) {
        return seedA;
      }

      return seedB;
    }

    //    console.log(seedA, seedB, seedInt, haystack[seedInt]);
    if (haystack[seedInt] < target) {
      if (reverse) {
        seedB = seedInt;
      } else {
        seedA = seedInt;
      }
    } else if (haystack[seedInt] > target) {
      if (reverse) {
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

// Stores key: value
class WaveformHash extends Waveform {
  hasXWaveform() {
    return false;
  }

  setXWaveform(data: Waveform | Array<number>) {

    if (Array.isArray(data)) {
      throw "Waveform must be of a pure Waveform instance (and not an array)";
    }
    this._xdata = data;
  }

  getYFromX(xValue) {
    const index = this._xdata.indexOf(xValue);
    if (index == -1) {
      throw `Cannot find key ${xValue}`;
    }

    return this._data[index];
  }

  getY(index) {
    return this._data[index];
  }

  getX(index) {
    return this._xdata[index];
  }

  hasXUnit() {
    return false;
  }

  errorNotImplemented() {
    console.trace();
    throw 'Not available in hash waveform';
  }

  subrangeX(fromX: number, toX: number) {
    this.errorNotImplemented();
  }

  duplicate() {
    this.errorNotImplemented();
  }

  aggregate() {
    this.errorNotImplemented();
  }

  _waveArithmetic() {
    this.errorNotImplemented();
  }

  interpolateIndex_X(index) {
    this.errorNotImplemented();
  }

  getXMonotoneousAscending() {
    this.errorNotImplemented();
  }

  isXMonotoneousAscending() {
    this.errorNotImplemented();
  }

  interpolate() {
    this.errorNotImplemented();
  }

  resampleForDisplay() {
    this.errorNotImplemented();
  }

  isXMonotoneous() {
    this.errorNotImplemented();
  }

  rescaleX() {
    this.errorNotImplemented();
  }

  getXMin() {
    return undefined;
  }

  getXMax() {
    return undefined;
  }

  computeXMinMax() { }

  setData(data) {
    this._data = Object.values(data);
    this._xdata = Object.keys(data);

    this._setData();
  }

  _setData() {
    this.minY = Math.min(...this._data);
    this.maxY = Math.max(...this._data);

    this.checkMinMaxErrorBars();
  }
}

function dist2(v, w) {
  return (v.x - w.x) ** 2 + (v.y - w.y) ** 2;
}

function distToSegmentSquared(p, v, w) {
  var l2 = dist2(v, w);
  if (l2 == 0) return dist2(p, v);
  var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
  t = Math.max(0, Math.min(1, t));
  return dist2(p, {
    x: v.x + t * (w.x - v.x),
    y: v.y + t * (w.y - v.y)
  });
}

function distToSegment(p, v, w) {
  return distToSegmentSquared(p, v, w) ** 0.5;
}

export {
  Waveform,
  WaveformHash
};
