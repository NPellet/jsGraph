import { EventEmitter } from './mixins/graph.mixin.event.js';
import { Waveform, WaveformHash } from './util/waveform';
import { SerieStyle, SERIE_TYPE } from '../types/series';
export declare const __VERSION__ = "0.0.1";
export declare const ns = "http://www.w3.org/2000/svg";
export declare const nsxlink = "http://www.w3.org/1999/xlink";
declare type _constructor = {
    new (...args: any): any;
};
declare type constructorKey_t = string | SERIE_TYPE;
declare type AxisPosition = "top" | "bottom" | "left" | "right";
declare type AxesPos = "top" | "bottom" | "left" | "right";
declare type Axes<T> = Record<AxesPos, Array<T>>;
/**
 * Entry class of jsGraph that creates a new graph.
 * @tutorial basic
 */
declare class Graph extends EventEmitter {
    ns: string;
    nsxlink: string;
    uid: string;
    private wrapper;
    options: any;
    private prevented;
    protected axis: Axes<any>;
    private shapes;
    private shapesLocked;
    private plugins;
    selectedShapes: any[];
    series: any[];
    _axesHaveChanged: boolean;
    currentAction: boolean;
    height: any;
    width: any;
    dom: SVGElement;
    domTitle: any;
    sizeSet: any;
    _lockUpdate: boolean;
    legend: any;
    innerHeight: any;
    innerWidth: any;
    offsetCached: any;
    axisGroup: any;
    groupPrimaryGrids: SVGElement;
    groupSecondaryGrids: SVGElement;
    markerHorizontalSplit: SVGMarkerElement;
    markerVerticalSplit: SVGMarkerElement;
    markerArrow: SVGMarkerElement;
    clip: SVGClipPathElement;
    clipRect: SVGRectElement;
    rectEvent: any;
    savedAxisState: any;
    selectedSerie: any;
    toolbar: any;
    cancelUnselectShape: any;
    layers: any;
    plotGroup: any;
    bypassHandleMouse: any;
    drawn: boolean;
    closingLines: any;
    graphingZone: any;
    forcedPlugin: any;
    activePlugin: string | undefined;
    zAxis: any;
    groupGrids: any;
    groupEvent: SVGElement;
    _sizeChanged: boolean;
    drawingSpaceWidth: any;
    drawingSpaceHeight: any;
    drawingSpaceMinX: any;
    drawingSpaceMinY: any;
    drawingSpaceMaxX: any;
    drawingSpaceMaxY: any;
    trackingLineShape: any;
    _katexRenderer: any;
    vertLineArrow: SVGMarkerElement;
    static SERIE_BAR: any;
    static SERIE_LINE_COLORED: any;
    static SERIE_SCATTER: any;
    static SERIE_LINE: any;
    defs: SVGDefsElement;
    _trackingLegend: any;
    /**
     * Graph constructor
     * @param {(HTMLElement|String)} [wrapper ] - The DOM Wrapper element its ```id``` property. If you do not use the wrapper during the graph creation, use it with the @link{Graph.setWrapper} method
     * @param {GraphOptions} [ options ] - The options of the graph
     * @param {Object} [ axis ] - The list of axes
     * @param {Array} axis.left - The list of left axes
     * @param {Array} axis.bottom - The list of bottom axes
     * @param {Array} axis.top - The list of top axes
     * @param {Array} axis.right - The list of right axes
     * @example var graph = new Graph("someDomID");
     * @example var graph = new Graph("someOtherDomID", { title: 'Graph title', paddingRight: 100 } );
     */
    constructor();
    constructor(options: any);
    constructor(options: any, axes: Axes<any>);
    setWrapper(wrapper: HTMLElement | string): void;
    private _registerEvents;
    /**
     * Returns the graph SVG wrapper element
     * @public
     * @return {SVGElement} The DOM element wrapping the graph
     */
    getDom(): SVGElement;
    /**
     * Returns the unique id representing the graph
     * @public
     * @return {String} The unique ID of the graph
     */
    getId(): string;
    /**
     * Returns the graph wrapper element passed during the graph creation
     * @public
     * @return {HTMLElement} The DOM element wrapping the graph
     */
    getWrapper(): HTMLElement;
    /**
     * Sets an option of the graph
     * @param {String} name - Option name
     * @param value - New option value
     * @returns {Graph} - Graph instance
     */
    setOption(name: string, val: any): this;
    /**
     *  Sets the title of the graph
     */
    setTitle(title: string): void;
    setTitleFontSize(fontSize: string): void;
    setTitleFontColor(fontColor: string): void;
    setTitleFontFamily(fontColor: string): void;
    /**
     *  Shows the title of the graph
     */
    displayTitle(): void;
    /**
     *  Hides the title of the graph
     */
    hideTitle(): void;
    hide(): void;
    show(): void;
    /**
     * Calls a repaint of the container. Used internally when zooming on the graph, or when <code>.autoscaleAxes()</code> is called (see {@link Graph#autoscaleAxes}).<br />
     * To be called after axes min/max are expected to have changed (e.g. after an <code>axis.zoom( from, to )</code>) has been called
     * @param {Boolean} onlyIfAxesHaveChanged - Triggers a redraw only if min/max values of the axes have changed.
     * @return {Boolean} if the redraw has been successful
     */
    redraw(onlyIfAxesHaveChanged: boolean, force: boolean): boolean;
    executeRedrawSlaves(): void;
    /**
     * Draw the graph and the series. This method will only redraw what is necessary. You may trust its use when you have set new data to series, changed serie styles or called for a zoom on an axis.
     */
    draw(force?: boolean): void;
    /**
     *  Prevents the graph, the series and the legend from redrawing automatically. Valid until {@link Graph#resumeUpdate} is called
     *  @memberof Graph
     *  @return {Graph} The current graph instance
     *  @see {@link Graph#resumeUpdate}
     *  @see {@link Graph#doUpdate}
     *  @since 1.16.19
     */
    delayUpdate(): this;
    /**
     *  Forces legend and graph update, even is {@link Graph#delayUpdate} has been called before.
     *  @memberof Graph
     *  @return {Graph} The current graph instance
     *  @see {@link Graph#delayUpdate}
     *  @see {@link Graph#resumeUpdate}
     *  @since 1.16.19
     */
    doUpdate(): this;
    /**
     *  Cancels the effect of {@link Graph#delayUpdate}, but does not redraw the graph automatically
     *  @memberof Graph
     *  @return {Graph} The current graph instance
     *  @see {@link Graph#delayUpdate}
     *  @see {@link Graph#doUpdate}
     *  @since 1.16.19
     */
    resumeUpdate(): this;
    isDelayedUpdate(): boolean;
    /**
     * Sets the total width of the graph
     * @param {Number} width - The new width of the graph
     * @param {Boolean} skipResize - <code>true</code> to defer graph repaint. Use {@link Graph#resize} to force repain later on. (Useful if many graph sizing operations are done successively)
     * @see Graph#setHeight
     * @see Graph#resize
     */
    setWidth(width: number, skipResize: boolean): void;
    /**
     * Sets the total height of the graph
     * @param {Number} height - The new height of the graph
     * @param {Boolean} skipResize - <code>true</code> to defer graph repaint. Use {@link Graph#resize} to force repain later on. (Useful if many graph sizing operations are done successively)
     * @see Graph#setWidth
     * @see Graph#resize
     */
    setHeight(height: number, skipResize: boolean): void;
    /**
     * Sets the new dimension of the graph and repaints it. If width and height are omitted, a simple refresh is done.
     * @param {Number} [ width ] - The new width of the graph
     * @param {Number} [ height ] - The new height of the graph
     * @see Graph#setWidth
     * @see Graph#setHeight
     * @return {Graph} The current graph
     */
    resize(w: number, h: number): this;
    /**
     * Sets the new dimension of the graph without repainting it. Use {@link Graph#resize} to perform the actual resizing of the graph.
     * @param {Number} [ width ] - The new width of the graph
     * @param {Number} [ height ] - The new height of the graph
     * @see Graph#setWidth
     * @see Graph#setHeight
     * @see Graph#resize
     */
    setSize(w: number, h: number): void;
    /**
     * Returns the width of the graph (set by setSize, setWidth or resize methods)
     * @return {Number} Width of the graph
     */
    getWidth(): any;
    /**
     * Returns the height of the graph (set by setSize, setHeight or resize methods)
     * @return {Number} Height of the graph
     */
    getHeight(): any;
    /**
     * Returns the top padding of the graph (space between the top of the svg container and the topmost axis)
     * @return {Number} paddingTop
     */
    getPaddingTop(): any;
    /**
     * Returns the left padding of the graph (space between the left of the svg container and the leftmost axis)
     * @return {Number} paddingTop
     */
    getPaddingLeft(): any;
    /**
     * Returns the bottom padding of the graph (space between the bottom of the svg container and the bottommost axis)
     * @return {Number} paddingTop
     */
    getPaddingBottom(): any;
    /**
     * Returns the right padding of the graph (space between the right of the svg container and the rightmost axis)
     * @return {Number} paddingRight
     */
    getPaddingRight(): any;
    /**
     * Returns the height of the drawable zone, including the space used by the axes
     * @param {Boolean} useCache - Use cached value. Useful if one is sure the graph hasn't changed dimension. Automatically called after a Graph.resize();
     * @returns {Number} Height of the graph
     */
    getDrawingHeight(useCache?: boolean): any;
    /**
     * Returns the width of the drawable zone, including the space used by the axes
     * @param {Boolean} useCache - Use cached value. Useful if one is sure the graph hasn't changed dimension. Automatically called after a Graph.resize();
     * @returns {Number} Width of the graph
     */
    getDrawingWidth(useCache?: boolean): any;
    /**
     * Caches the wrapper offset in the page.<br />
     * The position of the wrapper is used when processing most of mouse events and it is fetched via the jQuery function .offset().
     * If performance becomes a critical issue in your application, <code>cacheOffset()</code> should be used to store the offset position. It should be ensured that the graph doesn't move in the page. If one can know when the graph has moved, <code>cacheOffset()</code> should be called again to update the offset position.
     * @see Graph#uncacheOffset
     */
    cacheOffset(): void;
    /**
     * Un-caches the wrapper offset value
     * @see Graph#cacheOffset
     */
    uncacheOffset(): void;
    getNumAxes(position: AxisPosition): number;
    /**
     * Returns the x axis at a certain index. If any top axis exists and no bottom axis exists, returns or creates a top axis. Otherwise, creates or returns a bottom axis
     * Caution ! The <code>options</code> parameter will only be effective if an axis is created
     * @param {Number} [ index=0 ] - The index of the axis
     * @param {Object} [ options={} ] - The options to pass to the axis constructor
     */
    getXAxis(index?: number, options?: {}): any;
    /**
     * Returns the y axis at a certain index. If any right axis exists and no left axis exists, returns or creates a right axis. Otherwise, creates or returns a left axis
     * Caution ! The <code>options</code> parameter will only be effective if an axis is created
     * @param {Number} [ index=0 ] - The index of the axis
     * @param {Object} [ options={} ] - The options to pass to the axis constructor
     */
    getYAxis(index?: number, options?: {}): any;
    /**
     * Returns the top axis at a certain index. Creates it if non-existant
     * @param {Number} [ index=0 ] - The index of the axis
     * @param {Object} [ options={} ] - The options to pass to the axis constructor
     */
    getTopAxis(index?: number, options?: {}): any;
    /**
     * Returns the bottom axis at a certain index. Creates it if non-existant
     * @param {Number} [ index=0 ] - The index of the axis
     * @param {Object} [ options={} ] - The options to pass to the axis constructor
     */
    getBottomAxis(index?: number, options?: {}): any;
    /**
     * Returns the left axis at a certain index. Creates it if non-existant
     * @param {Number} [ index=0 ] - The index of the axis
     * @param {Object} [ options={} ] - The options to pass to the axis constructor
     */
    getLeftAxis(index?: number, options?: {}): any;
    /**
     * Returns the right axis at a certain index. Creates it if non-existant
     * @param {Number} [ index=0 ] - The index of the axis
     * @param {Object} [ options={} ] - The options to pass to the axis constructor
     */
    getRightAxis(index?: number, options?: {}): any;
    /**
     * Sets a bottom axis
     * @param {Axis} axis - The axis instance to set
     * @param {Number} [ index=0 ] - The index of the axis
     */
    setXAxis(axis: any, index: number): void;
    /**
     * Sets a left axis
     * @param {Axis} axis - The axis instance to set
     * @param {Number} [ index=0 ] - The index of the axis
     */
    setYAxis(axis: any, index: number): void;
    /**
     * Sets a left axis
     * @param {Axis} axis - The axis instance to set
     * @param {Number} [ index=0 ] - The index of the axis
     * @see Graph#setBottomAxis
     * @see Graph#setTopAxis
     * @see Graph#setRightAxis
     * @see Graph#getLeftAxis
     * @see Graph#getYAxis
     */
    setLeftAxis(axis: any, index: number): void;
    /**
     * Sets a right axis
     * @param {Axis} axis - The axis instance to set
     * @param {Number} [ index=0 ] - The index of the axis
     * @see Graph#setBottomAxis
     * @see Graph#setLeftAxis
     * @see Graph#setTopAxis
     * @see Graph#getRightAxis
     * @see Graph#getYAxis
     */
    setRightAxis(axis: any, index: number): void;
    /**
     * Sets a top axis
     * @param {Axis} axis - The axis instance to set
     * @param {Number} [ index=0 ] - The index of the axis
     * @see Graph#setBottomAxis
     * @see Graph#setLeftAxis
     * @see Graph#setRightAxis
     * @see Graph#getBottomAxis
     * @see Graph#getXAxis
     */
    setTopAxis(axis: any, index: number): void;
    /**
     * Sets a bottom axis
     * @param {Axis} axis - The axis instance to set
     * @param {Number} [ index=0 ] - The index of the axis
     * @see Graph#setTopAxis
     * @see Graph#setLeftAxis
     * @see Graph#setRightAxis
     * @see Graph#getTopAxis
     * @see Graph#getXAxis
     */
    setBottomAxis(axis: any, index: number): void;
    killAxis(axis: any, noRedraw?: boolean, noSerieKill?: boolean): void;
    /**
     * Determines if an x axis belongs to the graph
     * @param {Axis} axis - The axis instance to check
     */
    hasXAxis(axis: any): boolean;
    /**
     * Determines if an x axis belongs to the graph
     * @param {Axis} axis - The axis instance to check
     */
    hasYAxis(axis: any): boolean;
    /**
     * Determines if an x axis belongs to top axes list of the graph
     * @param {Axis} axis - The axis instance to check
     */
    hasTopAxis(axis: any): boolean;
    /**
     * Determines if an x axis belongs to bottom axes list of the graph
     * @param {Axis} axis - The axis instance to check
     */
    hasBottomAxis(axis: any): boolean;
    /**
     * Determines if a y axis belongs to left axes list of the graph
     * @param {Axis} axis - The axis instance to check
     */
    hasLeftAxis(axis: any): boolean;
    /**
     * Determines if a y axis belongs to right axes list of the graph
     * @param {Axis} axis - The axis instance to check
     */
    hasRightAxis(axis: any): boolean;
    /**
     * Determines if an axis belongs to a list of axes
     * @param {Axis} axis - The axis instance to check
     * @param {Array} axisList - The list of axes to check
     * @private
     */
    hasAxis(axis: any, axisList: Array<any>): boolean;
    /**
     * Autoscales the x and y axes of the graph.
     * Does not repaint the canvas
     * @return {Graph} The current graph instance
     */
    autoscaleAxes(): this;
    /**
     *  @alias Graph#autoscaleAxes
     */
    autoscale(): this;
    /**
     *  @alias Graph#autoscaleAxes
     */
    autoScale(): this;
    /**
     *  @alias Graph#autoscaleAxes
     */
    autoScaleAxes(): this;
    /**
     *  Autoscales a particular axis
     *  @param {Axis} The axis to rescale
     *  @return {Graph} The current graph instance
     */
    autoScaleAxis(axis: any): this;
    gridsOff(): void;
    gridsOn(): void;
    /**
     * Sets the background color
     * @param {String} color - An SVG accepted color for the background
     * @return {Graph} The current graph instance
     */
    setBackgroundColor(color: string): this;
    getAxisState(): Axes<[number, number]>;
    setAxisState(state: Axes<[Number, Number]>): void;
    saveAxisState(savedName: string): this;
    recallAxisState(savedName: string): this;
    _applyToAxis(type: any): (type: AxisPosition, func: any, params: any) => void;
    /**
     * Calculates the minimal or maximal value of the axis. Currently, alias of getBoudaryAxisFromSeries
     */
    getBoundaryAxis(axis: any, minmax: any, usingZValues: any): any;
    /**
     * Calculates the minimal or maximal value of the axis, based on the series that belong to it. The value is computed so that all series just fit in the value.
     * @memberof Graph.prototype
     * @param {Axis} axis - The axis for which the value should be computed
     * @param {minmax} minmax - The minimum or maximum to look for. "min" for the minimum, anything else for the maximum
     * @returns {Number} The minimimum or maximum of the axis based on its series
     */
    getBoundaryAxisFromSeries(axis: any, minmax: "min" | "max", usingZValues: boolean): any;
    /**
     *  Returns all the series associated to an axis
     *  @param {Axis} axis - The axis to which the series belong
     *  @returns {Serie[]} An array containing the list of series that belong to the axis
     */
    getSeriesFromAxis(axis: any): any[];
    /**
     * Determines the maximum and minimum of each axes, based on {@link Graph#getBoundaryAxis}. It is usually called internally, but if the data of series has changed, called this function to make sure that minimum / maximum of the axes are properly updated.
     * @see Graph#getBoundaryAxis
     */
    updateDataMinMaxAxes(usingZValues: boolean): void;
    /**
     * Function that is called from {@link Graph#_applyToAxes}
     * @function
     * @name AxisCallbackFunction
     * @param {Axis} axis - The axis of the function
     * @param {String} type - The type of the axis (left,right,top,bottom)
     * @param params - The params passed in the _applyToAxis function.
     * @see Graph#_applyToAxes
     */
    /**
     * Applies a function to axes. The function will be executed once for every axis.
     * If func is a string, the internal function belonging to <strong>the axis</strong> will be called, with the params array flattened out (in this case, params must be an array).
     * If func is a function, the function will be called with the axis, its type and params as parameters. See {@link AxisCallbackFunction} for more details.
     * @param {(AxisCallbackFunction|String)} func - The function or function name to execute
     * @param params - Extra parameters to pass to the function
     * @param {Boolean} topbottom=false - True to apply to function to top and bottom axes
     * @param {Boolean} leftright=false - True to apply to function to left and right axes
     */
    _applyToAxes(func: any, params: any, tb?: boolean, lr?: boolean): void;
    /**
     * Axes can be dependant of one another (for instance for unit conversions)
     * Finds and returns all the axes that are linked to a specific axis. Mostly used internally.
     * @param {Axis} axis - The axis that links one or multiple other dependant axes
     * @returns {Axis[]} The list of axes linked to the axis passed as parameter
     */
    findAxesLinkedTo(axis: any): any[];
    _axisHasChanged(axis: any): void;
    /**
     * Creates a new serie.
     * If the a serie with the same name exists, returns this serie with update options.
     * The type of the serie is used to fetch the corresponding registered constructor registered with the name "graph.serie.<type>", e.g "line" will fetch the "graph.serie.line" prototype (built-in)<br />
     * Built-in series types are "line", "contour", "zone" and "scatter".
     * @param {String} name - The name of the serie (unique)
     * @param {Object} options - The serie options
     * @param {Type} type - The type of the serie.
     * @returns {Serie} The newly created serie
     */
    newSerie(name: string, options: any, type: SERIE_TYPE): any;
    /**
     * Looks for an existing serie by name or by index and returns it.
     * The index of the serie follows the creation sequence (0 for the first one, 1 for the second one, ...)
     * @param {(String|Number)} name - The name or the index of the serie
     * @returns {Serie}
     */
    getSerie(name: string | number | Function): any;
    /**
     * Returns all the series
     * @returns {Serie[]} An array of all the series
     */
    getSeries(): any[];
    /**
     * Returns all the series that correspond to one or multiple types
     * @param {...Symbol} type - The serie types to select
     * @returns {Serie[]} An array of all the series
     * @example graph.allSeries( Graph.SERIE_LINE, Graph.SERIE_ZONE );
     */
    allSeries(...types: SERIE_TYPE[]): any[];
    /**
     * Sorts the series
     * @param {function} method - Sorting method (arguments: serieA, serieB)
     * @example graph.sortSeries( ( sA, sB ) => sA.label > sB.label ? 1 : -1 );
     */
    sortSeries(method: (a: any, b: any) => number): this;
    /**
     * Draws a specific serie
     * @param {Serie} serie - The serie to redraw
     * @param {Boolean} force - Forces redraw even if no data has changed
     */
    drawSerie(serie: any, force: boolean): void;
    /**
     * Redraws all visible series
     * @param {Boolean} force - Forces redraw even if no data has changed
     */
    drawSeries(force: boolean): void;
    /**
     * @alias Graph#removeSeries
     */
    resetSeries(): void;
    /**
     * @alias Graph#removeSeries
     */
    killSeries(): void;
    killLegend(): void;
    killShapes(): void;
    /**
     * Removes all series from the graph
     */
    removeSeries(): void;
    /**
     * Selects a serie. Only one serie per graph can be selected.
     * @param {Serie} serie - The serie to select
     * @param {String} selectName="selected" - The name of the selection
     */
    selectSerie(serie: any, selectName: string): void;
    /**
     * Returns the selected serie
     * @returns {(Serie|undefined)} The selected serie
     */
    getSelectedSerie(): any;
    /**
     * Unselects a serie
     * @param {Serie} serie - The serie to unselect
     */
    unselectSerie(serie: any): void;
    /**
     * Returns all the shapes associated to a serie. Shapes can (but don't have to) be associated to a serie. The position of the shape can then be relative to the same axes as the serie.
     * @param {Serie} serie - The serie containing the shapes
     * @returns {Shape[]} An array containing a list of shapes associated to the serie
     */
    getShapesOfSerie(serie: any): any[];
    makeToolbar(toolbarData: any): any;
    /**
     *  Returns all shapes from the graph
     */
    getShapes(): any[];
    /**
     * Creates a new shape. jsGraph will look for the registered constructor "graph.shape.<shapeType>".
     * @param {String} shapeType - The type of the shape
     * @param {Object} [shapeData] - The options passed to the shape creator
     * @param {Boolean} [mute=false] - <code>true</code> to create the shape quietly
     * @param {Object} [shapeProperties] - The native object containing the shape properties in the jsGraph format (caution when using it)
     * @returns {Shape} The created shape
     * @see Graph#getConstructor
     */
    newShape(shapeType: string, shapeData: any, mute?: boolean, shapeProperties?: {
        simplified?: any;
    }): any;
    /**
     * Creates a new position. Arguments are passed to the position constructor
     * @param {...*} varArgs
     * @see Position
     */
    newPosition(): any;
    /**
     *  Redraws all shapes. To be called if their definitions have changed
     */
    redrawShapes(): void;
    /**
     *  Removes all shapes from the graph
     */
    removeShapes(): void;
    /**
     * Selects a shape
     * @param {Shape} shape - The shape to select
     * @param {Boolean} mute - Select the shape quietly
     */
    selectShape(shape: any, mute: boolean): boolean;
    getSelectedShapes(): any[];
    /**
     * Unselects a shape
     * @param {Shape} shape - The shape to unselect
     * @param {Boolean} mute - Unselect the shape quietly
     */
    unselectShape(shape: any, mute: boolean): void;
    /**
     * Unselects all shapes
     * @param {Boolean} [ mute = false ] - Mutes all unselection events
     * @return {Graph} The current graph instance
     */
    unselectShapes(mute: boolean): this;
    _removeShape(shape: any): void;
    appendShapeToDom(shape: any): void;
    removeShapeFromDom(shape: any): void;
    appendSerieToDom(serie: any): void;
    removeSerieFromDom(serie: any): void;
    getLayer(layer: any, mode: string): any;
    focus(): void;
    elementMoving(movingElement: any): void;
    stopElementMoving(element: any): void;
    _makeClosingLines(): void;
    isActionAllowed(e: any, action: any): boolean;
    forcePlugin(plugin: any): void;
    unforcePlugin(): void;
    _pluginsExecute(funcName: string, ...args: any[]): void;
    _pluginExecute(which: string, func: string, args: any[]): boolean;
    pluginYieldActiveState(): void;
    _serieExecute(serie: any, func: string, ...args: any[]): void;
    _pluginsInit(): void;
    /**
     * Returns an initialized plugin
     * @param {String} pluginName
     * @returns {Plugin} The plugin which name is <pluginName>
     */
    getPlugin(pluginName: string): any;
    hasPlugin(pluginName: string): boolean;
    triggerEvent(func: string, ...args: any[]): any;
    /**
     * Creates a legend. Only one legend is allowed per graph
     * @param {Object} options - The legend options
     */
    makeLegend(options: any): any;
    /**
     * Redraws the legend if it exists
     * @param {Boolean} [ onlyIfRequired = false ] ```true``` to redraw the legend only when it actually needs to be updated
     * @return {Graph} The graph instance
     */
    updateLegend(onlyIfRequired?: boolean): this;
    /**
     * @returns {Legend} The legend item
     */
    getLegend(): any;
    requireLegendUpdate(): void;
    orthogonalProjectionSetup(): void;
    orthogonalProjectionUpdate(): void;
    /**
     * Kills the graph
     **/
    kill(): void;
    _removeSerie(serie: any): void;
    contextListen(target: any, menuElements: any, callback: any): any;
    lockShapes(): void;
    unlockShapes(): void;
    prevent(arg: any): boolean;
    _getXY(e: MouseEvent): {
        x: number;
        y: number;
    };
    _resize(): void;
    updateGraphingZone(): void;
    getDrawingSpaceWidth(): () => any;
    getDrawingSpaceHeight(): () => any;
    getDrawingSpaceMinX(): () => any;
    getDrawingSpaceMinY(): () => any;
    getDrawingSpaceMaxX(): () => any;
    getDrawingSpaceMaxY(): () => any;
    tracking(options: any): void;
    /**
     *  Enables the line tracking
     *  @param {Object|Boolean} options - Defines the tracking behavior. If a boolean, simply enables or disables the existing tracking.
     */
    trackingLine(options: any): void;
    addSerieToTrackingLine(serie: any, options?: any): void;
    /**
     *  Pass here the katex.render method to be used later
     *   @param {Function} renderer -  katexRendered - renderer
     *   @return {Graph} The current graph instance
     */
    setKatexRenderer(renderer: any): void;
    hasKatexRenderer(): boolean;
    renderWithKatex(katexValue: any, katexElement: any): any;
    exportToSchema(): any;
    private _getAxis;
    private _closeLine;
    private refreshDrawingZone;
    /**
     * Registers a constructor to jsGraph. Constructors are used on a later basis by jsGraph to create series, shapes or plugins
     * @param {String} constructorName - The name of the constructor
     * @param {Function} constructor - The constructor method
     * @see Graph.getConstructor
     * @static
     */
    static _constructors: Map<constructorKey_t, _constructor>;
    static registerConstructor(constructorKey: constructorKey_t, constructor: _constructor): any;
    /**
     * Returns a registered constructor
     * @param  constructorKey - The constructor name to look for
     * @returns The registered constructor
     * @throws Error
     * @see Graph.registerConstructor
     * @static
     */
    static getConstructor(constructorKey: constructorKey_t): _constructor;
    getConstructor(constructorKey: constructorKey_t): _constructor;
    static newWaveform(): Waveform;
    static waveform(): Waveform;
    static newWaveformHash(): WaveformHash;
    static waveformHash(): WaveformHash;
    static _styles: Map<string, SerieStyle>;
    static saveStyle(styleName: string, json: SerieStyle): void;
    static getStyle(styleName: string): SerieStyle;
}
export default Graph;
