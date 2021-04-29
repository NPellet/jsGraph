declare type XYData = {
    x: number[];
    y: number[];
};
declare class Waveform {
    private xOffset;
    private xScale;
    private shift;
    private scale;
    private errors;
    private _originalData;
    private _originalDataX;
    protected _xdata: Waveform | undefined;
    _data: number[];
    protected minX: number;
    protected maxX: number;
    protected minY: number;
    protected maxY: number;
    private _monotoneous;
    private _monotoneousAscending;
    private dataInUseType;
    private dataInUse;
    private _typedArrayClass;
    private _dataAggregating;
    private _dataAggregated;
    private _dataAggregationDirection;
    unit: string;
    xunit: string;
    constructor(data?: any[], xOffset?: number, xScale?: number);
    setData(data: Array<number>, dataX?: Array<number>): this;
    getYData(): number[];
    mutated(): this;
    getY(index: number, optimized?: boolean): number;
    setXWaveform(waveform: Waveform | Array<number>): this;
    hasXWaveform(): boolean;
    getXWaveform(): Waveform;
    rescaleX(offset: any, scale: any): this;
    getTypedArrayClass(): false | ArrayConstructor | Uint8ArrayConstructor | Uint8ClampedArrayConstructor | Uint16ArrayConstructor | Uint32ArrayConstructor | Float32ArrayConstructor | Float64ArrayConstructor;
    setTypedArrayClass(constructor: any): void;
    isNaNAllowed(constructor?: ArrayConstructor | Uint8ArrayConstructor | Uint8ClampedArrayConstructor | Uint16ArrayConstructor | Uint32ArrayConstructor | Float32ArrayConstructor | Float64ArrayConstructor): boolean;
    isUnsigned(constructor?: ArrayConstructor | Uint8ArrayConstructor | Uint8ClampedArrayConstructor | Uint16ArrayConstructor | Uint32ArrayConstructor | Float32ArrayConstructor | Float64ArrayConstructor): boolean;
    recalculateMinMaxNewPoint(x: any, y: any): void;
    calculateHistogram(xMin: number, xMax: number, dX: number): Waveform;
    prepend(x: any, y: any): this;
    append(x: any, y: any): this;
    concat(wave2: any): this;
    _makeArray(length: any): any[] | Uint8Array | Uint8ClampedArray | Uint16Array | Uint32Array | Float32Array | Float64Array;
    _setData(dataY: any): void;
    checkMinMaxErrorBars(): void;
    computeXMinMax(): void;
    getDataInUse(): number[] | XYData;
    getIndexFromVal(val: any, useDataToUse?: boolean, roundingMethod?: (x: number) => number): any;
    getIndexFromX(xval: any, useDataToUse?: boolean, roundingMethod?: (x: number) => number): any;
    getIndexFromY(yval: any, useDataToUse?: boolean, roundingMethod?: (x: number) => number): any;
    setAtIndex(index: any, value: any): void;
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
    getIndexFromXY(xval: any, yval: any, useDataToUse?: boolean, roundingMethod?: (x: number) => number, scaleX?: number, scaleY?: number): any;
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
    getIndexFromDataXY(valX: any, dataX: any, valY: any, dataY: any, scaleX?: number, scaleY?: number): number;
    /**
     * Uses binary search to find the index the closest to ```val``` in ```valCollection```.
     * @param {number} val
     * @param {array<number>} valCollection
     * @param {boolean} isAscending
     */
    getIndexFromMonotoneousData(val: any, valCollection: any, isAscending: any): any;
    findWithShortestDistance(options: any): any;
    getShortestDistanceToPoint(valX: any, valY: any, maxDistanceX: any, maxDistanceY: any): {
        shortestDistance: any;
        index: any;
    };
    getReductionType(): string;
    getXMin(): number;
    getXMax(): number;
    getYMin(): number;
    getYMax(): number;
    getMin(): number;
    getMax(): number;
    getMinX(): number;
    getMaxX(): number;
    getMinY(): number;
    getMaxY(): number;
    getDataMaxX(): number;
    getDataMinX(): number;
    getDataMaxY(): number;
    getDataMinY(): number;
    getDataY(): number[];
    getData(optimized?: boolean): number[];
    setShift(shift?: number): this;
    getShift(): number;
    getScale(): number;
    setScale(scale?: number): this;
    setXShift(shift?: number): this;
    getXShift(shift?: number): number;
    setXScale(scale?: number): this;
    getXScale(): number;
    getLength(): number;
    getDataToUseFlat(): any;
    fit(options: any): Promise<unknown>;
    getX(index: number, optimized?: boolean): number;
    getXRaw(index: number, optimized?: boolean): number;
    _integrateP(from?: number, to?: number): number[];
    integrateP(from: any, to: any): number;
    integrate(fromX: any, toX: any): number;
    average(p0?: number, p1?: number): number;
    mean(): number;
    stddev(): number;
    getAverageP(from: any, to: any): number;
    getAverageX(from: any, to: any): number;
    checkMonotonicity(): boolean;
    requireXMonotonicity(): void;
    requireMonotonicity(): void;
    isMonotoneous(): boolean;
    isXMonotoneous(): boolean;
    invert(data?: number[]): this;
    resampleForDisplay(options: any): any[];
    interpolate(x: any): number;
    interpolateIndex_X(index: any): number;
    getMonotoneousAscending(): boolean | "The waveform is not monotoneous";
    getXMonotoneousAscending(): boolean | "The waveform is not monotoneous";
    isXMonotoneousAscending(): boolean | "The waveform is not monotoneous";
    divide(numberOrWave: Waveform | number): this;
    divideBy(numberOrWave: Waveform | number): this;
    multiply(numberOrWave: Waveform | number): this;
    multiplyBy(numberOrWave: Waveform | number): this;
    log(): void;
    ln(): void;
    logBase(base: any): void;
    add(numberOrWave: Waveform | number): this;
    addBy(numberOrWave: Waveform | number): this;
    subtract(numberOrWave: Waveform | number): this;
    subtractBy(numberOrWave: Waveform | number): this;
    math(method: any): this;
    _arithmetic(numberOrWave: any, operator: any): this;
    _numberArithmetic(num: any, operation: any): this;
    _waveArithmetic(wave: any, operation: any): this;
    aggregate(direction?: string): void;
    hasAggregation(): boolean;
    selectAggregatedData(pxWidth: any): false | Promise<any>;
    duplicate(alsoDuplicateXWave?: boolean): Waveform;
    subrangeX(fromX: number, toX: number): Waveform;
    findLocalMinMax(xRef: any, xWithin: any, type: any): number | false;
    findLocalMinMaxIndex(indexMinus: any, indexPlus: any, type: any): number | false;
    warn(text: any): void;
    setUnit(unit: string): this;
    setXUnit(unit: string): this;
    getUnit(): string;
    getXUnit(): string;
    hasXUnit(): boolean;
    hasUnit(): boolean;
    findLevels(level: any, options: any): any[];
    findLevel(level: any, options: any): any;
    normalize(mode: any): void;
    filterNaN(): void;
    filterInfinity(): void;
    setErrorBarX(waveform: any): this;
    setErrorBarXBelow(waveform: any): this;
    setErrorBarXAbove(waveform: any): this;
    setErrorBoxX(waveform: any): this;
    setErrorBoxXBelow(waveform: any): this;
    setErrorBoxXAbove(waveform: any): this;
    setErrorBar(waveform: any, checkMinMax?: boolean): void;
    setErrorBarBelow(waveform: any, checkMinMax?: boolean): void;
    setErrorBarAbove(waveform: any, checkMinMax?: boolean): void;
    setErrorBox(waveform: any, checkMinMax?: boolean): void;
    setErrorBoxBelow(waveform: any, checkMinMax?: boolean): void;
    setErrorBoxAbove(waveform: any, checkMinMax?: boolean): void;
    getMaxError(i: any, side?: ErrorPosition): number;
    getMaxErrorType(i: any, side?: ErrorPosition, type?: ErrorType): any;
    getErrorBarXBelow(index: any): any;
    getErrorBarXAbove(index: any): any;
    getErrorBoxXBelow(index: any): any;
    getErrorBoxXAbove(index: any): any;
    getErrorBarYBelow(index: any): any;
    getErrorBarYAbove(index: any): any;
    getErrorBoxYBelow(index: any): any;
    getErrorBoxYAbove(index: any): any;
    getErrorX(index: any, side?: ErrorPosition, type?: ErrorType): any;
    getError(index: any, side?: ErrorPosition, type?: ErrorType): any;
    hasErrorBars(): boolean;
}
declare enum ErrorPosition {
    ABOVE = 0,
    BELOW = 1
}
declare enum ErrorType {
    BOX = 0,
    BAR = 1
}
declare class WaveformHash extends Waveform {
    hasXWaveform(): boolean;
    setXWaveform(data: Waveform | Array<number>): void;
    getYFromX(xValue: any): number;
    getY(index: any): number;
    getX(index: any): any;
    hasXUnit(): boolean;
    errorNotImplemented(): void;
    subrangeX(fromX: number, toX: number): void;
    duplicate(): void;
    aggregate(): void;
    _waveArithmetic(): void;
    interpolateIndex_X(index: any): void;
    getXMonotoneousAscending(): void;
    isXMonotoneousAscending(): void;
    interpolate(): void;
    resampleForDisplay(): void;
    isXMonotoneous(): void;
    rescaleX(): void;
    getXMin(): any;
    getXMax(): any;
    computeXMinMax(): void;
    setData(data: any): void;
    _setData(): void;
}
export { Waveform, WaveformHash };
