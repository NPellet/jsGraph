import { SerieInterface } from '../../types/series';
import { SERIE_TYPE } from '../graph';
import Graph from '../graph.core';
import SerieScatter, { SerieScatterOptions } from './graph.serie.scatter';
export declare enum Dasharray {
    PLAIN = 0,
    DOTTED = 1,
    DASHED_SM = 2,
    DASHED = 3,
    DASHED_LG = 4,
    DASHED_XL = 5,
    DASHED_SM_INTV_LG = 6,
    DASHED_LG_INTV_SM = 7,
    DASHED_SM_INTV_XL = 8,
    DASHED_XL_INTV_SM = 9,
    DASHED_INTV_ALT = 10,
    DASHED_DOTTED = 11
}
export declare type Dash_t = Dasharray | string | Array<string>;
export declare type LineStyle = {
    color: string;
    width: number;
    style: Dash_t;
};
export interface SerieLineOptions extends SerieScatterOptions {
    lineStyle?: LineStyle;
    trackMouse?: boolean;
    lineToZero?: boolean;
    selectableOnClick?: boolean;
    overflowX?: boolean;
    overflowY?: boolean;
}
/**
 * Serie line
 * @example graph.newSerie( name, options, "line" );
 * @see Graph#newSerie
 * @extends Serie
 */
declare class SerieLine extends SerieScatter implements SerieInterface {
    private options;
    private _lineForLegend;
    private _degradationPx;
    protected currentLine: string;
    protected counter: number;
    protected lines: SVGPolylineElement[];
    constructor(graph: Graph, name: string, options: SerieLineOptions);
    protected init(): void;
    protected extendLineOptions<T extends SerieLineOptions>(options: T): T;
    getType(): SERIE_TYPE;
    applyStyle(): void;
    onMouseWheel(): void;
    /**
     * Cleans the DOM from the serie internal object (serie and markers). Mostly used internally when a new {@link Serie#setData} is called
     * @returns {SerieLine} The current serie
     * @memberof SerieLine
     */
    private empty;
    /**
     * Removes the selection to the serie. Effectively, calls {@link SerieLine#select}("unselected").
     * @returns {SerieLine} The current serie
     * @see SerieLine#select
     * @memberof SerieLine
     */
    unselect(): this;
    /**
     * Computes and returns a line SVG element with the same line style as the serie, or width 20px
     * @returns {SVGElement}
     * @memberof SerieLine
     */
    getSymbolForLegend(): SVGElement;
    /**
     * Degrades the data of the serie. This option is used for big data sets that have monotoneously increasing (or decreasing) x values.
     * For example, a serie containing 1'000'000 points, displayed over 1'000px, will have 1'000 points per pixel. Often it does not make sense to display more than 2-3 points per pixel.
     * <code>degrade( pxPerPoint )</code> allows a degradation of the serie, based on a a number of pixel per point. It computes the average of the data that would be displayed over each pixel range
     * Starting from jsGraph 2.0, it does not calculate the minimum and maximum and creates the zone serie anymore
     * @return {SerieLine} The current serie instance
     * @example serie.degrade( 0.5 ); // Will display 2 points per pixels
     * @memberof SerieLine
     */
    degrade(pxPerP: number): this;
    noDegrade(): void;
    protected drawInit(force: any): boolean;
    removeLinesGroup(): void;
    insertLinesGroup(): void;
    removeExtraLines(): void;
    /**
     * Draws the serie
     * @memberof SerieLine
     */
    draw(force: any): void;
    _draw(): this;
    _getIterativeBounds(waveform: any, xMin: any, xMax: any): {
        i: number;
        l: any;
    };
    kill(): void;
    isPointOutside(x: any, y: any, xMin: any, xMax: any, yMin: any, yMax: any): boolean;
    calculateAxisCrossing(x: any, y: any, lastX: any, lastY: any, xMin: any, xMax: any, yMin: any, yMax: any): any[];
    _addPoint(xpx: any, ypx: any, x: any, y: any, j: any, move: any, allowMarker: any): void;
    _createLine(): any;
    /**
     * Reapply the current style to the serie lines elements. Mostly used internally
     * @memberof SerieLine
     */
    applyLineStyles(): void;
    /**
     * Applies the current style to a line element. Mostly used internally
     * @memberof SerieLine
     */
    applyLineStyle(line: any): void;
    /**
     * Updates the current style (lines + legend) of the serie. Use this method if you have explicitely changed the options of the serie
     * @example var opts = { lineColor: 'red' };
     * var s = graph.newSerie( "name", opts ).setData( someData );
     * opts.lineColor = 'green';
     * s.updateStyle(); // Sets the lineColor to green
     * s.draw(); // Would also do the same thing, but recalculates the whole serie display (including (x,y) point pairs)
     * @memberof SerieLine
     */
    updateStyle(): void;
    getMarkerPath(family: any, add: any): string;
    /**
     * Searches the closest point pair (x,y) to the a pair of pixel position
     * @param {Number} x - The x position in pixels (from the left)
     * @param {Number} y - The y position in pixels (from the left)
     * @returns {Number} Index in the data array of the closest (x,y) pair to the pixel position passed in parameters
     * @memberof SerieLine
     */
    handleMouseMove(xValue: any, doMarker: any, yValue: any): false | {
        xBefore: any;
        xAfter: any;
        yBefore: any;
        yAfter: any;
        trueX: any;
        indexClosest: any;
        interpolatedY: any;
        xClosest: number;
        yClosest: number;
    };
    /**
     * Gets the maximum value of the y values between two x values. The x values must be monotoneously increasing
     * @param {Number} startX - The start of the x values
     * @param {Number} endX - The end of the x values
     * @returns {Number} Maximal y value in between startX and endX
     * @memberof SerieLine
     */
    getMax(start: any, end: any): number;
    /**
     * Gets the minimum value of the y values between two x values. The x values must be monotoneously increasing
     * @param {Number} startX - The start of the x values
     * @param {Number} endX - The end of the x values
     * @returns {Number} Maximal y value in between startX and endX
     * @memberof SerieLine
     */
    getMin(start: any, end: any): number;
    getRawLineStyle(styleName?: string): any;
    setLineStyle(number: Dash_t, selectionType: string, applyToSelected: any): this;
    getLineStyle(selectionType: any): Dash_t;
    getLineDashArray(styleName?: string): string;
    /** @memberof SerieLine
     */
    setLineWidth(width: any, selectionType: any, applyToSelected: any): this;
    getLineWidth(): any;
    setLineColor(color: any, selectionType: any, applyToSelected: any): this;
    getLineColor(): any;
    setFillColor(color: any, selectionType: any, applyToSelected: any): this;
    getFillColor(): any;
    /** @memberof SerieLine
     */
    isMonotoneous(): boolean;
    findLocalMinMax(xRef: any, xWithin: any, type: any): number | false;
    /**
     * Performs a binary search to find the closest point index to an x value. For the binary search to work, it is important that the x values are monotoneous.
     * If the serie is not monotoneously ascending, then a Euclidian search is made
     * @param {Number} valX - The x value to search for
     * @param {number} valY - The y value to search for. Optional. When omitted, only a search in x will be done
     * @param {Number} withinPxX - The maximum distance in X
     * @param {number} withinPxY - The maximum distance in Y
     * @param {string} useAxis - ```x``` or ```y```. Use only the value of x or y to find the closest point
     * @returns {Object} Index in the data array of the closest (x,y) pair to the pixel position passed in parameters
     * @memberof SerieLine
     */
    getClosestPointToXY(valX?: any, valY?: any, withinPxX?: number, withinPxY?: number, useAxis?: boolean, usePx?: boolean): false | {
        indexBefore: any;
        indexAfter: any;
        xExact: any;
        indexClosest: any;
        interpolatedY: number;
        xClosest: number;
        yClosest: number;
    };
}
export default SerieLine;
