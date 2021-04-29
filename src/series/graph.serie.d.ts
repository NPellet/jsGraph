import { SerieOptions, SerieStyle } from '../../types/series';
import { Waveform } from '../util/waveform';
/**
 * Serie class to be extended
 * @static
 */
declare class Serie {
    options: SerieOptions;
    private graph;
    private name;
    protected groupMain: SVGElement;
    protected symbolLegendContainer: SVGElement;
    private _activeStyleName;
    private _unselectedStyleName;
    private styles;
    protected shown: boolean;
    protected selected: boolean;
    protected waveform: Waveform | undefined;
    constructor(graph: any, name: any, options: any);
    init(): void;
    extendOptions<T extends SerieOptions>(options: T): T;
    postInit(): void;
    draw(): void;
    beforeDraw(): void;
    afterDraw(): void;
    /**
     * Sets data to the serie
     * @memberof Serie
     * @param {(Object|Array|Array[])} data - The data of the serie
     * @param {Boolean} [ oneDimensional=false ] - In some cases you may need to force the 1D type. This is required when one uses an array or array to define the data (see examples)
     * @param{String} [ type=float ] - Specify the type of the data. Use <code>int</code> to save memory (half the amount of bytes allocated to the data).
     * @example serie.setData( [ [ x1, y1 ], [ x2, y2 ], ... ] );
     * @example serie.setData( [ x1, y1, x2, y2, ... ] ); // Faster
     * @example serie.setData( [ [ x1, y1, x2, y2, ..., xn, yn ] , [ xm, ym, x(m + 1), y(m + 1), ...] ], true ) // 1D array with a gap in the middle
     * @example serie.setData( { x: x0, dx: spacing, y: [ y1, y2, y3, y4 ] } ); // Data with equal x separation. Fastest way
     */
    setData(data: any, oneDimensional: any, type: any): this;
    _addData(type: any, howmany: any): any[];
    /**
     * Removes all the data from the serie, without redrawing
     * @returns {Serie} The current serie
     */
    clearData(): this;
    /**
     * Returns the data in its current form
     * @returns {Array.<(Float64Array|Int32Array)>} An array containing the data chunks. Has only one member if the data has no gaps
     * @memberof Serie
     */
    getData(): any;
    /**
     * Sets the options of the serie (no extension of default options)
     * @param {Object} options - The options of the serie
     * @memberof Serie
     */
    setOptions(options: any): void;
    /**
     * Sets the options of the serie (no extension of default options)
     * @param {String} name - The option name
     * @param value - The option value
     * @memberof Serie
     * @example serie.setOption('selectableOnClick', true );
     */
    setOption(name: any, value: any): void;
    /**
     * Removes the serie from the graph. The method doesn't perform any axis autoscaling or repaint of the graph. This should be done manually.
     * @return {Serie} The current serie instance
     * @memberof Serie
     */
    kill(noLegendUpdate: any): this;
    /**
     * Hides the serie
     * @memberof Serie
     * @param {Boolean} [ hideShapes = false ] - <code>true</code> to hide the shapes associated to the serie
     * @returns {Serie} The current serie
     */
    hide(hideShapes?: any, mute?: boolean): this;
    /**
     * Shows the serie
     * @memberof Serie
     * @param {Boolean} [showShapes=false] - <code>true</code> to show the shapes associated to the serie
     * @returns {Serie} The current serie
     */
    show(showShapes?: any, mute?: boolean): this;
    hideImpl(): void;
    showImpl(): void;
    /**
     * Toggles the display of the serie (effectively, calls <code>.show()</code> and <code>.hide()</code> alternatively on each call)
     * @memberof Serie
     * @param {Boolean} [hideShapes=false] - <code>true</code> to hide the shapes associated to the serie
     * @returns {Serie} The current serie
     */
    toggleDisplay(): this;
    /**
     * Determines if the serie is currently visible
     * @memberof Serie
     * @returns {Boolean} The current visibility status of the serie
     */
    isShown(): boolean;
    /**
     * Checks that axes assigned to the serie have been defined and have proper values
     * @memberof Serie
     */
    axisCheck(): void;
    /**
     * Returns the x position of a certain value in pixels position, based on the serie's axis
     * @memberof Serie
     * @param {Number} val - Value to convert to pixels position
     * @returns {Number} The x position in px corresponding to the x value
     */
    getX(val: any): number;
    /**
     * Returns the y position of a certain value in pixels position, based on the serie's axis
     * @memberof Serie
     * @param {Number} val - Value to convert to pixels position
     * @returns {Number} The y position in px corresponding to the y value
     */
    getY(val: any): number;
    /**
     * Returns the selection state of the serie. Generic for most serie types
     * @memberof Serie
     * @returns {Boolean} <code>true</code> if the serie is selected, <code>false</code> otherwise
     */
    isSelected(): boolean;
    _checkX(val: any): void;
    _checkY(val: any): void;
    /**
     * Getter for the serie name
     * @memberof Serie
     * @returns {String} The serie name
     */
    getName(): string;
    /**
     * Assigns axes automatically, based on {@link Graph#getXAxis} and {@link Graph#getYAxis}.
     * @memberof Serie
     * @returns {Serie} The current serie
     */
    autoAxis(): this;
    autoAxes(): this;
    /**
     * Assigns an x axis to the serie
     * @memberof Serie
     * @param {Axis|Number} axis - The axis to use as an x axis. If an integer, {@link Graph#getXAxis} or {@link Graph#getYAxis} will be used
     * @returns {Serie} The current serie
     * @example serie.setXAxis( graph.getTopAxis( 1 ) ); // Assigns the second top axis to the serie
     */
    setXAxis(axis: any): this;
    /**
     * Assigns an y axis to the serie
     * @memberof Serie
     * @param {Axis|Number} axis - The axis to use as an y axis. If an integer, {@link Graph#getXAxis} or {@link Graph#getYAxis} will be used
     * @returns {Serie} The current serie
     * @example serie.setYAxis( graph.getLeftAxis( 4 ) ); // Assigns the 5th left axis to the serie
     */
    setYAxis(axis: any): this;
    /**
     * Assigns two axes to the serie
     * @param {GraphAxis} axis1 - First axis to assign to the serie (x or y)
     * @param {GraphAxis} axis2 - Second axis to assign to the serie (y or x)
     * @returns {Serie} The current serie
     * @memberof Serie
     */
    setAxes(): this;
    /**
     * @returns {GraphAxis} The x axis assigned to the serie
     * @memberof Serie
     */
    getXAxis(): any;
    /**
     * @returns {GraphAxis} The y axis assigned to the serie
     * @memberof Serie
     */
    getYAxis(): any;
    /**
     * @returns {Number} Lowest x value of the serie's data
     * @memberof Serie
     */
    getMinX(): any;
    /**
     * @returns {Number} Highest x value of the serie's data
     * @memberof Serie
     */
    getMaxX(): any;
    /**
     * @returns {Number} Lowest y value of the serie's data
     * @memberof Serie
     */
    getMinY(): any;
    /**
     * @returns {Number} Highest y value of the serie's data
     * @memberof Serie
     */
    getMaxY(): any;
    getWaveform(): Waveform;
    getWaveforms(): Waveform[];
    setWaveform(waveform: any): this;
    /**
     * Computes and returns a line SVG element with the same line style as the serie, or width 20px
     * @returns {SVGElement}
     * @memberof Serie
     */
    getSymbolForLegend(): any;
    _getSymbolForLegendContainer(): SVGElement;
    extendStyle(data: Object, styleName?: string, baseStyleName?: string): void;
    setStyle(json: any, styleName?: string, baseStyleName?: string): this;
    getStyle(styleName: any): any;
    getRawStyles(): {
        [x: string]: {
            base: string;
            data: SerieStyle;
        };
    };
    getRawStyle(styleName: any): SerieStyle;
    activateStyle(styleName: any): void;
    setActiveStyle(styleName: any): void;
    getActiveStyle(): string;
    getActiveStyleName(): string;
    computeStyles(): void;
    computeStyle(styleName: any): void;
    computeActiveStyle(): void;
    getComputedStyle(style?: string): any;
    getComputedStyles(): any;
    private _buildStyle;
    /**
     * Explicitely applies the line style to the SVG element returned by {@link Serie#getSymbolForLegend}
     * @see Serie#getSymbolForLegend
     * @returns {SVGElement}
     * @memberof Serie
     */
    setLegendSymbolStyle(): void;
    /**
     * @alias Serie#setLegendSymbolStyle
     * @memberof Serie
     */
    updateStyle(): void;
    /**
     * Computes and returns a text SVG element with the label of the serie as a text, translated by 35px
     * @returns {SVGElement}
     * @memberof Serie
     * @see Serie#getLabel
     */
    getTextForLegend(): any;
    /**
     * @returns {Number} The current index of the serie
     * @memberof Serie
     */
    getIndex(): number;
    /**
     * @returns {String} The label or, alternatively - the name of the serie
     * @memberof Serie
     */
    getLabel(): any;
    /**
     * Sets the label of the serie. Note that this does not automatically updates the legend
     * @param {String} label - The new label of the serie
     * @returns {Serie} The current serie
     * @memberof Serie
     */
    setLabel(label: any): this;
    /**
     * Assigns the flipping value of the serie. A flipped serie will have inverted axes. However this method does not automatically re-assigns the axes of the serie. Call {@link Serie#autoAxis} to re-assign the axes automatically, or any other axis setting method.
     * @param {Boolean} [flipped=false] - <code>true</code> to flip the serie
     * @returns {Serie} The current serie
     * @memberof Serie
     */
    setFlip(flipped: any): this;
    /**
     * @returns {Boolean} <code>true</code> if the serie is flipped, <code>false</code> otherwise
     * @memberof Serie
     */
    getFlip(): any;
    /**
     * @alias Serie#getFlip
     * @memberof Serie
     */
    isFlipped(): any;
    /**
     * Sets the layer onto which the serie should be displayed. This method does not trigger a graph redraw.
     * @memberof Serie
     * @param {Number} layerIndex=1 - The index of the layer into which the serie will be drawn
     * @returns {Serie} The current serie
     */
    setLayer(layerIndex: any): this;
    /**
     * Sets the layer onto which the serie should be displayed. This method does not trigger a graph redraw.
     * @memberof Serie
     * @returns {Nunber} The index of the layer into which the serie will be drawn
     */
    getLayer(): any;
    /**
     * Notifies jsGraph that the style of the serie has changed and needs to be redrawn on the next repaint
     * @param {String} selectionType - The selection for which the style may have changed
     * @returns {Serie} The current serie
     * @memberof Serie
     */
    styleHasChanged(selectionType?: string | boolean): this;
    /**
     * Checks if the style has changed for a selection type
     * @param {String} selectionType - The selection for which the style may have changed
     * @returns {Boolean} <code>true</code> if the style has changed
     * @private
     * @memberof Serie
     */
    hasStyleChanged(selectionType?: string): boolean;
    /**
     * Notifies jsGraph that the data of the serie has changed
     * @returns {Serie} The current serie
     * @memberof Serie
     */
    dataHasChanged(arg: any): this;
    /**
     * Checks if the data has changed
     * @returns {Boolean} <code>true</code> if the data has changed
     * @private
     * @memberof Serie
     */
    hasDataChanged(): any;
    /**
     * Set a key/value arbitrary information to the serie. It is particularly useful if you have this serie has a reference through an event for instance, and you want to retrieve data associated to it
     * @param {String} prop - The property
     * @param value - The value
     * @returns {Serie} The current serie
     * @see Serie#getInfo
     * @memberof Serie
     */
    setInfo(prop: any, value: any): this;
    /**
     * Retrives an information value from its key
     * @param {String} prop - The property
     * @returns The value associated to the prop parameter
     * @see Serie#setInfo
     * @memberof Serie
     */
    getInfo(prop: any, value: any): any;
    /**
     * @deprecated
     * @memberof Serie
     */
    setAdditionalData(data: any): this;
    /**
     * @deprecated
     * @memberof Serie
     */
    getAdditionalData(): any;
    /**
     * Flags the serie as selected
     * @returns {Serie} The current serie
     * @memberof Serie
     */
    select(selectName: any): this;
    /**
     * Flags the serie as unselected
     * @returns {Serie} The current serie
     * @memberof Serie
     */
    unselect(): this;
    applyStyle(): void;
    /**
     * Allows mouse tracking of the serie
     * @memberof Serie
     * @returns {Serie} The current serie
     * @param {Function} hoverCallback - Function to be called when the mouse enters the serie area
     * @param {Function} outCallback - Function to be called when the mouse exits the serie area
     * @private
     */
    enableTracking(hoverCallback: any, outCallback: any): this;
    /**
     * Disables mouse tracking of the serie
     * @memberof Serie
     * @returns {Serie} The current serie
     * @private
     */
    disableTracking(): this;
    /**
     *  Allows mouse tracking of the serie
     *  @memberof Serie
     *  @param {Object} options - The tracking line options
     *  @returns {Serie} The current serie
     */
    allowTrackingLine(options: any): void;
    getMarkerForLegend(): boolean;
    get type(): any;
    getType(): any;
    excludeFromLegend(): this;
    includeInLegend(): this;
    setDataIndices(categories: any, nb: any): void;
    hasErrors(): boolean;
}
export default Serie;
