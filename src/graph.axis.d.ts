import Graph from './graph.core';
import { EventEmitter } from './mixins/graph.mixin.event.js';
export declare enum TickPosition {
    OUTSIDE = "outside",
    INSIDE = "inside",
    CENTERED = "centered"
}
declare type TickPosition_t = 1 | 2 | 3 | "centered" | "outside" | "inside" | TickPosition;
/**
 * @member name     : Name of the axis, can be reference later
 * @member label    : Displayed label
 * @member display  : Whether or not the axis is displayed
 * @member hideWhenNoSeriesShown  : Whether or not the axis should be displayed along with its bound series
 * @member flipped  : Flips the axis direction (min->max ==> max->min)
 * @member axisDataSpacing :  Additional spacing between the min/max of the data and the automatically calculated min/max of the graph. Expressed as a fraction of the total span. Does not apply to a zoomed axes, or when forced boundaries are in place
 * @member axisDataSpacing.min: Spacing towards the data min
 * @member axisDataSpacing.max: Spacing towards the data max
 * @member primaryGrid  : Whether or not the primary grid should be displayed
 * @member secondaryGrid : Whether or not the secondary grid should be displayed
 *
 * @member hideTicks: Do not show ticks, nor any tick labels
 * @member tickLabels: Whether or not to show the tick labels (does not affect the ticks themselves)
 * @member tickPosition : Position of the ticks with respect to the axis line
 * @member nbTicksPrimary : Approximate number of primary ticks. This is only an indication for the axis and is not enforced
 * @member primaryTickUnit : Forces the spacing between two ticks (in axis unit, not px units)
 * @member maxPrimaryTickUnit : Gives a maximum boundary to the distance between two ticks (in axis units, not px units)
 * @member minPrimaryTickUnit : Gives a minimum boundary to the distance between two ticks (in axis units, not px units)
 * @member nbTicksSecondary : Number of secondary ticks to be displayed between two primary ticks,
 
 * @member ticklabelratio : Scaled the tick label content by a multiplicator
 * @member exponentialFactor: Scales the tick values by 10^factor. Works on top of ticklabelratio (i.e. they both sum up)
 * @member shiftToZero: Whether or not the axis should be shifted down by its min values (putting effectively its minimum at 0)

 * @member logScale: Display the axis as a logarithmic scale
 * @member forcedMin: Forces the minimum boundary of the axis (may still be zoomed). Use false to toggle off
 * @member forcedMax: Forces the maximum boundary of the axis (may still be zoomed). Use false to toggle off
 * @member highestMax: Sets the highest maximum value the axis can take
 * @member lowestMin: Sets the highest maximum value the axis can take
 *
 * @member lineAt: Shows a perpendicular line at the given value (in axis unit). Useful for example to show the axis lines at x=0 or y=0
 *
 *
 * @member primaryGridWidth: Width of the lines making the primary grid
 * @member primaryGridColor: Color of the primary grid lines (e.g. "red", or #ff0000")
 * @member primaryGridDasharray: Dasharray of the grid (see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray)
 * @member primaryGridOpacity: Opacity of the primary grid lines
 * @member primaryTicksColor: Color of the primary ticks (e.g. "red", or #ff0000")
 *
 * @member secondaryGridWidth: Width of the lines making the secondary grid
 * @member secondaryGridColor: Color of the secondary grid lines (e.g. "red", or #ff0000")
 * @member secondaryGridDasharray: Dasharray of the grid (see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray)
 * @member secondaryGridOpacity: Opacity of the secondary grid lines
 * @member secondaryTicksColor: Color of the secondary ticks (e.g. "red", or #ff0000")
 *
 * @member span: Restrict the axis displayed span (in the px dimension), as a function of the total height. Values are given as a ratio
 * @member marginMin: Margin below the axis (adds a whitespace below the min span value)
 * @member marginMax: Margin above the axis (adds a whitespace above the max span value)
 *
 * @member scientificScale: Turns on/off scientific scaling. Data is scaled to scientific units and 10^X is displayed in the axis label
 * @member scientificScaleExponent: Forces X, when scientificScale is true (see scientificScale)
 * @member engineeringScale: Forces X to be a multiple of 3, when scientificScale is true (see scientificScale)
 *
 * @member unit: Sets the unit of the axis
 * @member unitWrapperBefore: Shows this sequence of character before the unit (e.g. "(")
 * @member unitWrapperAfter: Shows this sequence of character after the unit (e.g. ")")
 * @member unitInTicks: Show the axis unit in the dicks
 * @member unitDecade: Instead of showing 10^x in the axis label, converts it to an SI multiple (f, p, n, u, m, k, M, G, T) and display the letter together with the unit
 *
 *
 * @member tickLabelOffset: Use this value to adjust the spacing between the tick value and the label
 *
 * @member currentAxisMin: Current min value of the axis (use this to reload a zoomed value from a saved state)
 * @member currentAxisMax: Current max value of the axis (use this to reload a zoomed value from a saved state)
 *
 * @member useKatexForLabel: Use a katex render to show the axis label
 * @member tickLabelRotation: Rotate the labels by a certain amount angle (in degrees)
 *
 *
 * @member formatTickLabel: Customisation function that takes a label value (in axis unit) and returns the value to be displayed
 * @member labelFont: Font-family used for the label
 * @member axisColor: Color of the main axis line
 * @member labelColor: Color of the axis label
 * @member ticksLabelColor: Color of the ticks label
   
 */
export declare type GraphAxisOptions = {
    name: string;
    label: string;
    display: boolean;
    hideWhenNoSeriesShown: boolean;
    flipped: boolean;
    axisDataSpacing: {
        min: number;
        max: number;
    };
    primaryGrid: boolean;
    secondaryGrid: boolean;
    tickPosition: TickPosition_t;
    nbTicksPrimary: number;
    primaryTickUnit?: undefined | number;
    maxPrimaryTickUnit?: undefined | number;
    minPrimaryTickUnit?: undefined | number;
    nbTicksSecondary: number;
    ticklabelratio: number;
    exponentialFactor: number;
    exponentialLabelFactor: number;
    logScale: boolean;
    forcedMin: false | number;
    forcedMax: false | number;
    lineAt: number | false;
    unitModification: string | false;
    hideTicks: boolean;
    primaryGridWidth: number;
    primaryGridColor: string;
    primaryGridDasharray: string;
    primaryGridOpacity: number;
    primaryTicksColor: string;
    secondaryGridWidth: number;
    secondaryGridColor: string;
    secondaryGridDasharray: string;
    secondaryGridOpacity: number;
    secondaryTicksColor: string;
    shiftToZero: boolean;
    tickLabels: boolean;
    span: [number, number];
    marginMin: number;
    marginMax: number;
    scientificScale: boolean;
    scientificScaleExponent: boolean;
    engineeringScale: boolean;
    unitInTicks: boolean;
    unit: false | string;
    unitWrapperBefore: false | string;
    unitWrapperAfter: false | string;
    tickLabelOffset: number;
    highestMax: number;
    lowestMin: number;
    labelValue: string;
    adaptTo: false | {
        axis: Axis;
        thisValue: number;
        foreignValue: number;
        preference: "min" | "max";
    };
    currentAxisMin: number;
    currentAxisMax: number;
    useKatexForLabel: boolean;
    unitDecade: boolean;
    tickLabelRotation?: number;
    formatTickLabel?: Function;
    labelFont?: string;
    axisColor?: string;
    labelColor?: string;
    ticksLabelColor?: string;
};
export declare const tickScaling: {
    1: number;
    2: number;
    3: number;
    4: number;
};
interface Axis {
    addLabel: (args: any) => SVGElement;
    setMinMaxFlipped(): void;
}
declare abstract class Axis extends EventEmitter implements Axis {
    protected graph: Graph;
    protected options: GraphAxisOptions;
    protected group: SVGElement;
    private rectEvent;
    private _lines;
    protected line: SVGElement;
    private groupTicks;
    private groupTickLabels;
    private hasChanged;
    protected label: SVGElement;
    protected labelTspan: SVGElement;
    private preunit;
    protected unitTspan: SVGElement;
    protected expTspan: SVGElement;
    protected expTspanExp: SVGElement;
    private gridLinePath;
    private gridPrimary;
    private gridSecondary;
    private groupSeries;
    private widthHeightTick;
    private _hidden;
    private ticks;
    private currentTick;
    private lastCurrentTick;
    private labels;
    private cachedInterval;
    private ticksLabels;
    private series;
    private _zoomed;
    protected floating: boolean;
    private floatingAxis;
    private floatingValue;
    protected minPx: number;
    protected maxPx: any;
    protected minPxFlipped: number;
    protected maxPxFlipped: number;
    private dataMin;
    private dataMax;
    protected mouseVal: number;
    private _zoomLocked;
    /**
     * Axis constructor.
     * @class Axis
     * @static
     * @example function myAxis() {};
     * myAxis.prototype = new Graph.getConstructor("axis");
     * graph.setBottomAxis( new myAxis( { } ) );
     */
    constructor();
    init(graph: Graph, options: Partial<GraphAxisOptions>): void;
    handleMouseMoveLocal(x: number, y: number, e: MouseEvent): void;
    /**
     * Hides the axis
     * @memberof Axis
     * @return {Axis} The current axis
     */
    hide(): this;
    /**
     * Shows the axis
     * @memberof Axis
     * @return {Axis} The current axis
     */
    show(): this;
    /**
     * Shows or hides the axis
     * @memberof Axis
     * @param {Boolean} display - true to display the axis, false to hide it
     * @return {Axis} The current axis
     */
    setDisplay(display: boolean): this;
    /**
     * @memberof Axis
     * @return {Boolean} A boolean indicating the displayed state of the axis
     */
    isDisplayed(): any;
    isShown(): any;
    private markChanged;
    hideGroup(): void;
    showGroup(): void;
    kill(noRedraw: any, noSerieKill: any): void;
    /**
     * Forces the appearence of a straight perpendicular line at value 0
     * @param {Array<Number>} atValues - An array of x or y values where the lines are displayed
     * @memberof Axis
     * @return {Axis} The current axis
     */
    setLineAt(atValues: any): this;
    /**
     * Aligns ```thisValue``` of the axis to ```foreignValue``` of another axis
     * @param {(Axis|Boolean)} axis - The axis with which the 0 should be aligned. Use "false" to deactivate the adapt to 0 mode.
     * @param {Number} thisValue - The value of the current axis that should be aligned
     * @param {Number} foreignValue - The value of the reference axis that should be aligned
     * @param {String} preference - "min" or "max". Defined the boundary that should behave the more normally
     * @memberof Axis
     * @return {Axis} The current axis
     * @since 1.13.2
     */
    adaptTo(axis: any, thisValue: any, foreignValue: any, preference: any): this;
    /**
     * Adapts maximum and minimum of the axis if options.adaptTo is defined
     * @memberof Axis
     * @returns {Axis} The current axis
     * @since 1.13.2
     */
    adapt(): void;
    /**
     * Makes the axis floating (not aligned to the right or the left anymore). You need to specify another axis (perpendicular) and a value at which this axis should be located
     * @param {Axis} axis - The axis on which the current axis should be aligned to
     * @param {Number} value - The value on which the current axis should be aligned
     * @memberof Axis
     * @return {Axis} The current axis
     * @example graph.getYAxis().setFloat( graph.getBottomAxis(), 0 ); // Alignes the y axis with the origin of the bottom axis
     */
    setFloating(axis: Axis, value: number): this;
    /**
     * @memberof Axis
     * @return {Axis} The axis referencing the floating value of the current axis
     */
    getFloatingAxis(): Axis;
    /**
     * @memberof Axis
     * @return {Axis} The value to which the current axis is aligned to
     */
    getFloatingValue(): number;
    /**
     * Sets the axis data spacing
     * @memberof Axis
     * @see AxisOptionsDefault
     * @param min - The spacing at the axis min value
     * @param max = min - The spacing at the axis max value. If omitted, will be equal to the "min" parameter
     * @return {Axis} The current axis
     */
    setAxisDataSpacing(val1: number, val2?: number): this;
    dataSpacing(val1: number, val2?: number): this;
    /**
     * Sets the axis data spacing at the minimum of the axis
     * @memberof Axis
     * @see AxisOptionsDefault
     * @param {Number} min - The spacing at the axis min value
     * @return {Axis} The current axis
     */
    setAxisDataSpacingMin(val: number): void;
    /**
     * Sets the axis data spacing at the maximum of the axis
     * @memberof Axis
     * @see AxisOptionsDefault
     * @param {Number} max - The spacing at the axis max value
     * @return {Axis} The current axis
     */
    setAxisDataSpacingMax(val: number): void;
    setMinPx(px: number): void;
    setMaxPx(px: any): void;
    /**
     * @memberof Axis
     * @return {Number} The position in px of the bottom of the axis
     */
    getMinPx(): number;
    /**
     * @memberof Axis
     * @return {Number} The position in px of the top of the axis
     */
    getMaxPx(): number;
    getMathMaxPx(): any;
    getMathMinPx(): number;
    /**
     * Retrieves the minimum possible value of the axis. Can be set by "forcedMin", "adapt0ToAxis" or by the values of the series the axis contains. Does not take into account any zooming.
     * @memberof Axis
     * @return {Number} The minimum possible value of the axis
     */
    getMinValue(): number;
    /**
     * Retrieves the maximum possible value of the axis. Can be set by "forcedMax", "adapt0ToAxis" or by the values of the series the axis contains. Does not take into account any zooming.
     * @memberof Axis
     * @return {Number} The maximum possible value of the axis
     */
    getMaxValue(): number;
    setMinValueData(min: number): void;
    setMaxValueData(max: number): void;
    /**
     * Retrieves the maximum possible value of the axis based only on the data. Does not take into account the possible axis forcing
     * @memberof Axis
     * @return {Number} The maximum possible value of the axis
     */
    getDataMax(): number;
    /**
     * Retrieves the minimum possible value of the axis based only on the data. Does not take into account the possible axis forcing
     * @memberof Axis
     * @return {Number} The minimum possible value of the axis
     */
    getDataMin(): number;
    /**
     * Sets the highest maximum value of the axis.
     * @memberof Axis
     * @param {Number} max - The maximum value of the axis
     * @return {Axis} The current axis
     */
    setLowestMin(lowestMin: any): void;
    /**
     * Forces the minimum value of the axis (no more dependant on the serie values)
     * @memberof Axis
     * @param {Number} min - The minimum value of the axis
     * @param {Boolean} noRescale - ```true``` to prevent the axis to rescale to set this minimum. Rescales anyway if current min is lower than the value. Defaults to ```false```
     * @return {Axis} The current axis
     */
    forceMin(min: any, noRescale?: boolean): this;
    /**
     * Sets the highest maximum value of the axis.
     * @memberof Axis
     * @param {Number} max - The maximum value of the axis
     * @return {Axis} The current axis
     */
    setHighestMax(highestMax: any): void;
    /**
     * Forces the maximum value of the axis (no more dependant on the serie values).
     * @memberof Axis
     * @param {Number} max - The maximum value of the axis
     * @param {Boolean} noRescale - ```true``` to prevent the axis to rescale to set this maximum. Rescales anyway if current max is higher than the value
     * @return {Axis} The current axis
     */
    forceMax(max: any, noRescale?: boolean): this;
    /**
     * Retrieves the forced minimum of the axis
     * @memberof Axis
     * @return {Number} The maximum possible value of the axis
     */
    getForcedMin(): number | false;
    /**
     * Retrieves the forced minimum of the axis
     * @memberof Axis
     * @return {Number} The maximum possible value of the axis
     */
    getForcedMax(): number | false;
    /**
     * Forces the min and max values of the axis to the min / max values of another axis
     * @param {Axis} axis - The axis from which the min / max values are retrieved.
     * @memberof Axis
     * @return {Axis} The current axis
     */
    forceToAxis(axis: any): this;
    getNbTicksPrimary(): number;
    setNbTicksPrimary(nb: any): void;
    getNbTicksSecondary(): number;
    setNbTicksSecondary(nb: any): this;
    handleMouseMove(px: any): void;
    handleMouseWheel(delta: any, e: any, baseline: any): void;
    set zoomLock(bln: any);
    get zoomLock(): any;
    /**
     * Performs a zoom on the axis, without redraw afterwards
     * @param {Number} val1 - The new axis minimum
     * @param {Number} val2 - The new axis maximum
     * @memberof Axis
     * @return {Axis} The current axis
     * @example
     * graph.getBottomAxis().zoom( 50, 70 ); // Axis boundaries will be 50 and 70 after next redraw
     * graph.redraw();
     * @example
     * graph.getBottomAxis().forceMin( 0 ).forceMax( 100 ).zoom( 50, 70 );  // Axis boundaries will be 50 and 70 after next redraw
     * graph.draw();
     * graph.autoscaleAxes(); // New bottom axis boundaries will be 0 and 100, not 50 and 70 !
     * graph.draw();
     */
    zoom(val1: any, val2: any, forceLock: any): this;
    _doZoomVal(val1: any, val2: any, mute: any): this;
    _doZoom(px1: any, px2: any, val1: any, val2: any, mute: any): this;
    getSerieShift(): any;
    getSerieScale(): any;
    getMouseVal(): number;
    getUnitPerTick(px: any, nbTick: any, valrange: any): number[];
    /**
     * Resets the min and max of the serie to fit the series it contains
     * @memberof Axis
     * @return {Axis} The current axis
     */
    setMinMaxToFitSeries(noNotify?: boolean): this;
    getDefaultMin(): number;
    getDefaultMax(): number;
    /**
     * @memberof Axis
     * @return {Number} the maximum interval ( max - min ) of the axis ( not nessarily the current one )
     */
    getInterval(): number;
    /**
     * @memberof Axis
     * @return {Number} the maximum interval ( max - min ) of the axis ( not nessarily the current one )
     */
    getCurrentInterval(): number;
    /**
     * @memberof Axis
     * @return {Number} The current minimum value of the axis
     */
    getCurrentMin(): number;
    /**
     * @memberof Axis
     * @return {Number} The current maximum value of the axis
     */
    getCurrentMax(): number;
    /**
     * Caches the current axis minimum
     * @memberof Axis
     */
    cacheCurrentMin(): void;
    /**
     * Caches the current axis maximum
     * @memberof Axis
     */
    cacheCurrentMax(): void;
    /**
     * Caches the current interval
     * @memberof Axis
     */
    cacheInterval(): void;
    cache(): void;
    /**
     * Sets the current minimum value of the axis. If lower that the forced value, the forced value is used
     * @memberof Axis
     * @param {Number} val - The new minimum value
     * @return {Axis} The current axis
     */
    setCurrentMin(val: any): this;
    /**
     * Sets the current maximum value of the axis. If higher that the forced value, the forced value is used
     * @memberof Axis
     * @param {Number} val - The new maximum value
     * @return {Axis} The current axis
     */
    setCurrentMax(val: any): void;
    /**
     * Sets the flipping state of the axis. If enabled, the axis is descending rather than ascending.
     * @memberof Axis
     * @param {Boolean} flip - The new flipping state of the axis
     * @return {Axis} The current axis
     */
    flip(flip: any): this;
    /**
     * @memberof Axis
     * @return {Boolean} The current flipping state of the axis
     */
    isFlipped(): boolean;
    _draw(): number;
    drawLines(): void;
    writeUnit(): void;
    getExponentGreekLetter(val: any): "" | "p" | "k" | "M" | "G" | "T" | "E" | "m" | "&mu;" | "n" | "f";
    drawLinearTicksWrapper(widthPx: any, valrange: any): number;
    forcePrimaryTickUnit(primaryInterval: any): void;
    forcePrimaryTickUnitMax(value: any): void;
    forcePrimaryTickUnitMin(value: any): void;
    getPrimaryTickUnit(): any;
    setTickLabelRatio(tickRatio: any): this;
    setTickLabelRotation(angle: any): this;
    doesHideWhenNoSeriesShown(): boolean;
    draw(): number;
    drawTicks(primary: any, secondary: any): number;
    nextTick(level: any, callback: any): Element;
    nextTickLabel(callback: any): SVGTextElement;
    removeUselessTicks(): void;
    removeUselessTickLabels(): void;
    nextGridLine(primary: any, x1: any, x2: any, y1: any, y2: any): void;
    setGridLineStyle(gridLine: any, primary: any): void;
    setGridLinesStyle(): this;
    resetTicksLength(): void;
    secondaryTicks(): number;
    drawLogTicks(): number;
    drawTickWrapper(value: number, label: boolean, level: 1 | 2 | 3, options?: any): void;
    /**
     * Used to scale the master axis into the slave axis
     * @function SlaveAxisScalingFunction
     * @param {Number} val - The master value to convert into a slave value
     * @returns undefined
     */
    /**
     * Makes this axis a slave. This can be used to show the same data with different units, specifically when a conversion function exists from axis -> slaveAxis but not in reverse. This axis should actually have no series.
     * @param {Axis} axis - The master axis
     * @param {SlaveAxisScalingFunction} scalingFunction - The scaling function used to map masterValue -> slaveValue
     * @param {Number} decimals - The number of decimals to round the value to
     * @memberof Axis
     * @return {Number} The width or height used by the axis (used internally)
     */
    linkToAxis(axis: any, scalingFunction: any, decimals: any): void;
    drawLinkedToAxisTicksWrapper(widthPx: number, valrange: any): number;
    /**
     * Transform a value into pixels, according to the axis scaling. The value is referenced to the drawing wrapper, not the the axis minimal value
     * @param {Number} value - The value to translate into pixels
     * @memberof Axis
     * @return {Number} The value transformed into pixels
     */
    getPos(value: any): number;
    /**
     * @alias Axis~getPos
     */
    getPx(value: number): number;
    /**
     * @alias Axis~getPos
     */
    getRoundedPx(value: any): number;
    /**
     * Transform a pixel position (referenced to the graph zone, not to the axis minimum) into a value, according to the axis scaling.
     * @param {Number} pixels - The number of pixels to translate into a value
     * @memberof Axis
     * @return {Number} The axis value corresponding to the pixel position
     */
    getVal(px: number): number;
    /**
     * Transform a delta value into pixels
     * @param {Number} value - The value to translate into pixels
     * @return {Number} The value transformed into pixels
     * @example graph.getBottomAxis().forceMin( 20 ).forceMax( 50 ).getRelPx( 2 ); // Returns how many pixels will be covered by 2 units. Let's assume 600px of width, it's ( 2 / 30 ) * 600 = 40px
     */
    getRelPx(delta: any): number;
    /**
     * Transform a delta pixels value into value
     * @param {Number} pixels - The pixel to convert into a value
     * @return {Number} The delta value corresponding to delta pixels
     * @see Axis~getRelPx
     * @example graph.getBottomAxis().forceMin( 20 ).forceMax( 50 ).getRelVal( 40 ); // Returns 2 (for 600px width)
     */
    getRelVal(px: any): number;
    setFormatTickLabel(method: any): this;
    valueToText(value: any, forceDecimals: any): any;
    /**
     *  Computes a value and returns it in HTML formatting
     *  @memberof Axis
     *  @param {Number} value - The value to compute
     *  @param {Boolean} noScaling - Does not display scaling
     *  @param {Boolean} noUnits - Does not display units
     * @param {Number} [forceDecimals=0] - Force the precision of the display
     *  @return {String} An HTML string containing the computed value
     *  @example graph.getXAxis().setUnit( "m" ).setUnitDecade( true ).setScientific( true );
     *  graph.getXAxis().valueToHtml( 3500 ); // Returns "3.5 km"
     *  @see Axis#valueToText
     */
    valueToHtml(value: any, noScaling: any, noUnits: any, forceDecimals?: number): any;
    getModifiedValue(value: any): any;
    modifyUnit(value: any, mode: any): string | false;
    setExponentialFactor(value: any): this;
    getExponentialFactor(): number;
    setExponentialLabelFactor(value: any): this;
    getExponentialLabelFactor(): number;
    setLabelExponentialFactor(value: any): this;
    getLabelExponentialFactor(): number;
    setName(name: any): this;
    /**
     * Sets the label of the axis
     * @param {Number} label - The label to display under the axis
     * @memberof Axis
     * @return {Axis} The current axis
     */
    setLabel(label: string): this;
    setLabelFont(font: any): this;
    /**
     * @memberof Axis
     * @return {String} The label value
     */
    getLabel(): string;
    setSpan(_from: any, _to: any): this;
    getSpan(): [number, number];
    setLevel(level: any): this;
    getLevel(): any;
    setShift(shift: any): void;
    getShift(): any;
    /**
     * Changes the tick position
     * @param {Number} pos - The new position ( "outside", "centered" or "inside" )
     * @memberof Axis
     * @return {Axis} The current axis
     */
    setTickPosition(pos: 1 | 2 | 3 | "outside" | "centered" | "inside" | TickPosition): this;
    /**
     * Displays or hides the axis grids
     * @param {Boolean} on - true to enable the grids, false to disable them
     * @memberof Axis
     * @return {Axis} The current axis
     */
    setGrids(on: any): this;
    /**
     * Displays or hides the axis primary grid
     * @param {Boolean} on - true to enable the grids, false to disable it
     * @memberof Axis
     * @return {Axis} The current axis
     */
    setPrimaryGrid(on: any): this;
    /**
     * Displays or hides the axis secondary grid
     * @param {Boolean} on - true to enable the grids, false to disable it
     * @memberof Axis
     * @return {Axis} The current axis
     */
    setSecondaryGrid(on: any): this;
    /**
     * Enables primary grid
     * @memberof Axis
     * @return {Axis} The current axis
     */
    primaryGridOn(): this;
    /**
     * Disables primary grid
     * @memberof Axis
     * @return {Axis} The current axis
     */
    primaryGridOff(): this;
    /**
     * Enables secondary grid
     * @memberof Axis
     * @return {Axis} The current axis
     */
    secondaryGridOn(): this;
    /**
     * Disables secondary grid
     * @return {Axis} The current axis
     */
    secondaryGridOff(): this;
    /**
     * Enables all the grids
     * @return {Axis} The current axis
     */
    gridsOn(): this;
    /**
     * Disables all the grids
     * @return {Axis} The current axis
     */
    gridsOff(): this;
    /**
     * @alias Axis#gridsOff
     */
    turnGridsOff(): this;
    /**
     * @alias Axis#gridsOn
     */
    turnGridsOn(): this;
    /**
     * Sets the color of the axis, the ticks and the label
     * @memberof Axis
     * @param {String} color - The new color of the primary ticks
     * @return {Axis} The current axis
     * @since 2.0.82
     */
    setColor(color?: string): this;
    /**
     * Sets the axis color
     * @memberof Axis
     * @param {String} color - The color to set the axis
     * @return {Axis} The current axis
     * @since 1.13.2
     */
    setAxisColor(color: any): this;
    /**
     * Gets the axis color
     * @memberof Axis
     * @return {String} The color of the axis
     * @since 1.13.2
     */
    getAxisColor(): string;
    setTickLabelOffset(offsetValue: any): this;
    /**
     * Sets the color of the main ticks
     * @memberof Axis
     * @param {String} color - The new color of the primary ticks
     * @return {Axis} The current axis
     * @since 1.13.2
     */
    setPrimaryTicksColor(color: any): this;
    /**
     * Gets the color of the main ticks
     * @memberof Axis
     * @return {String} The color of the primary ticks
     * @since 1.13.2
     */
    getPrimaryTicksColor(): string;
    /**
     * Sets the color of the secondary ticks
     * @memberof Axis
     * @param {String} color - The new color of the secondary ticks
     * @return {Axis} The current axis
     * @since 1.13.2
     */
    setSecondaryTicksColor(color: any): this;
    /**
     * Gets the color of the secondary ticks
     * @memberof Axis
     * @return {String} The color of the secondary ticks
     * @since 1.13.2
     */
    getSecondaryTicksColor(): string;
    /**
     * Sets the color of the tick labels
     * @memberof Axis
     * @param {String} color - The new color of the tick labels
     * @return {Axis} The current axis
     * @since 1.13.2
     */
    setTicksLabelColor(color: any): this;
    /**
     * Gets the color of the tick labels
     * @memberof Axis
     * @return {String} The color of the tick labels
     * @since 1.13.2
     */
    getTicksLabelColor(): string;
    /**
     * Sets the color of the primary grid
     * @memberof Axis
     * @param {String} color - The primary grid color
     * @return {Axis} The current axis
     * @since 1.13.3
     */
    setPrimaryGridColor(color: any): this;
    /**
     * Gets the color of the primary grid
     * @memberof Axis
     * @return {String} color - The primary grid color
     * @since 1.13.3
     */
    getPrimaryGridColor(): string;
    /**
     * Sets the color of the primary grid
     * @memberof Axis
     * @param {String} color - The primary grid color
     * @return {Axis} The current axis
     * @since 1.13.3
     */
    setSecondaryGridColor(color: any): this;
    /**
     * Gets the color of the secondary grid
     * @memberof Axis
     * @return {String} color - The secondary grid color
     * @since 1.13.3
     */
    getSecondaryGridColor(): string;
    /**
     * Sets the width of the primary grid lines
     * @memberof Axis
     * @param {Number} width - The width of the primary grid lines
     * @return {Axis} The current axis
     * @since 1.13.3
     */
    setPrimaryGridWidth(width: any): this;
    /**
     * Gets the width of the primary grid lines
     * @memberof Axis
     * @return {Number} width - The width of the primary grid lines
     * @since 1.13.3
     */
    getPrimaryGridWidth(): number;
    /**
     * Sets the width of the secondary grid lines
     * @memberof Axis
     * @param {Number} width - The width of the secondary grid lines
     * @return {Axis} The current axis
     * @since 1.13.3
     */
    setSecondaryGridWidth(width: any): this;
    /**
     * Gets the width of the secondary grid lines
     * @memberof Axis
     * @return {Number} width - The width of the secondary grid lines
     * @since 1.13.3
     */
    getSecondaryGridWidth(): number;
    /**
     * Sets the opacity of the primary grid lines
     * @memberof Axis
     * @param {Number} opacity - The opacity of the primary grid lines
     * @return {Axis} The current axis
     * @since 1.13.3
     */
    setPrimaryGridOpacity(opacity: any): this;
    /**
     * Gets the opacity of the primary grid lines
     * @memberof Axis
     * @return {Number} opacity - The opacity of the primary grid lines
     * @since 1.13.3
     */
    getPrimaryGridOpacity(): number;
    /**
     * Sets the opacity of the secondary grid lines
     * @memberof Axis
     * @param {Number} opacity - The opacity of the secondary grid lines
     * @return {Axis} The current axis
     * @since 1.13.3
     */
    setSecondaryGridOpacity(opacity: any): this;
    /**
     * Gets the opacity of the secondary grid lines
     * @memberof Axis
     * @return {Number} opacity - The opacity of the secondary grid lines
     * @since 1.13.3
     */
    getSecondaryGridOpacity(): number;
    /**
     * Sets the dasharray of the primary grid lines
     * @memberof Axis
     * @param {String} dasharray - The dasharray of the primary grid lines
     * @return {Axis} The current axis
     * @since 1.13.3
     */
    setPrimaryGridDasharray(dasharray: any): this;
    /**
     * Gets the dasharray of the primary grid lines
     * @memberof Axis
     * @return {String} dasharray - The dasharray of the primary grid lines
     * @since 1.13.3
     */
    getPrimaryGridDasharray(): string;
    /**
     * Sets the dasharray of the secondary grid lines
     * @memberof Axis
     * @param {String} dasharray - The dasharray of the secondary grid lines
     * @return {Axis} The current axis
     * @since 1.13.3
     */
    setSecondaryGridDasharray(dasharray: any): this;
    /**
     * Gets the dasharray of the secondary grid lines
     * @memberof Axis
     * @return {String} dasharray - The dasharray of the secondary grid lines
     * @since 1.13.3
     */
    getSecondaryGridDasharray(): string;
    /**
     * Sets the color of the label
     * @memberof Axis
     * @param {String} color - The new color of the label
     * @return {Axis} The current axis
     * @since 1.13.2
     */
    setLabelColor(color: any): this;
    /**
     * Gets the color of the label
     * @memberof Axis
     * @return {String} The color of the label
     * @since 1.13.2
     */
    getLabelColor(): string;
    setTickContent(dom: any, val: any, options: any): void;
    /**
     * @memberof Axis
     * @returns {Boolean} true if it is an x axis, false otherwise
     */
    isX(): boolean;
    /**
     * @memberof Axis
     * @returns {Boolean} true if it is an y axis, false otherwise
     */
    isY(): boolean;
    /**
     * Sets the unit of the axis
     * @param {String} unit - The unit of the axis
     * @return {Axis} The current axis
     * @memberof Axis
     * @since 1.13.3
     */
    setUnit(unit: any): this;
    /**
     * Places the unit in every tick
     * @param {Boolean} bool - ```true``` to place the unit, ```false``` otherwise
     * @return {Axis} The current axis
     * @memberof Axis
     * @since 2.0.44
     */
    setUnitInTicks(bool: any): this;
    /**
     * Sets characters wrapping the unit
     * @param {String} before - The string to insert before
     * @param {String} after - The string to insert after
     * @return {Axis} The current axis
     * @memberof Axis
     * @example axis.setUnitWrapper("[", "]").setUnit('m'); // Will display [m]
     * @since 1.13.3
     */
    setUnitWrapper(before: any, after: any): this;
    /**
     * Allows the unit to scale with thousands
     * @param {Boolean} on - Enables this mode
     * @return {Axis} The current axis
     * @memberof Axis
     * @since 1.13.3
     */
    setUnitDecade(on: any): this;
    /**
     * Enable the scientific mode for the axis values. This way, big numbers can be avoided, e.g. "1000000000" would be displayed 1 with 10<sup>9</sup> or "G" shown on near the axis unit.
     * @param {Boolean} on - Enables the scientific mode
     * @return {Axis} The current axis
     * @memberof Axis
     * @since 1.13.3
     */
    setScientific(on?: boolean): this;
    /**
     * In the scientific mode, forces the axis to take a specific power of ten. Useful if you want to show kilometers instead of meters for example. In this case you would use "3" as a value.
     * @param {Number} scientificScaleExponent - Forces the scientific scale to take a defined power of ten
     * @return {Axis} The current axis
     * @memberof Axis
     * @since 1.13.3
     * @see Axis#setScientific
     */
    setScientificScaleExponent(scientificScaleExponent: any): this;
    /**
     * The engineer scaling is similar to the scientific scaling ({@link Axis#setScientificScale}) but allowing only mupltiples of 3 to be used to scale the axis (for instance, go from grams to kilograms while skipping decagrams and hexagrams)
     * @param {Boolean} engineeringScaling - <code>true</code> to turn on the engineering scaling
     * @return {Axis} The current axis
     * @memberof Axis
     * @since 1.13.3
     * @see Axis#setScientific
     */
    setEngineering(engineeringScaling: any): this;
    /**
     * Calculates the closest engineering exponent from a scientific exponent
     * @param {Number} scientificExponent - The exponent of 10 based on which the axis will be scaled
     * @return {Number} The appropriate engineering exponent
     * @memberof Axis
     * @since 1.13.3
     * @private
     */
    getEngineeringExponent(scientificExponent: any): any;
    /**
     * Enables log scaling
     * @param {Boolean} logScale - ```true``` to enable the log scaling, ```false``` to disable it
     * @return {Axis} The current axis
     * @memberof Axis
     * @since 1.13.3
     */
    setLogScale(log: any): this;
    isZoomed(): boolean;
    hasAxis(): boolean;
    getType(): any;
    useKatexForLabel(use?: boolean): this;
}
export default Axis;
