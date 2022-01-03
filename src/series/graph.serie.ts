
// @ts-nocheck
import Graph, { ns } from '../graph.core';

// @ts-ignore
import * as util from '../graph.util.js';
// @ts-ignore
import { EventEmitter } from '../mixins/graph.mixin.event';
// @ts-ignore
import { SerieOptions, SerieStyle } from '../../types/series'


// @ts-ignore
import {
  Waveform
} from '../util/waveform';


const defaultOptions: Partial<SerieOptions> = {
  redrawShapesAfterDraw: false
};

class Serie extends EventEmitter {

  public options: SerieOptions
  protected graph: Graph | undefined;
  private name: string
  protected groupMain: SVGElement
  protected symbolLegendContainer: SVGElement
  private _activeStyleName: string = "unselected"
  private _unselectedStyleName: string = "unselected";
  private _changedStyles: { [x: string]: boolean } = {}

  protected minX: number | undefined;
  protected maxX: number | undefined;
  protected minY: number | undefined;
  protected maxY: number | undefined;


  private styles: {
    [x: string]: {
      base?: string,
      data: SerieStyle
    }
  }

  protected shown: boolean = true;
  protected selected: boolean = false;
  protected waveform: Waveform | undefined = undefined;

  constructor(graph: Graph, name: string, options: Partial<SerieOptions>) {

    super();

    this.options = util.extend(
      true, {},
      options
    );

    this.graph = graph;
    this.name = name;
    this.groupMain = document.createElementNS(ns, 'g');
    this.symbolLegendContainer = document.createElementNS(ns, 'g');

    this.init();
    // Creates an empty style variable
    this.styles = {};
  }

  init() { }

  extendOptions<T extends SerieOptions>(options: T): T {
    options = util.extend(true, {}, defaultOptions, options);
    return options;
  }


  postInit() { }

  draw(force: boolean) {
    throw new Error("Method draw must be implemented");
  }

  beforeDraw() { }

  afterDraw() {
    if (this.options.redrawShapesAfterDraw) {
      this.graph.getShapesOfSerie(this).forEach((shape) => {
        shape.redraw();
      });
    }

    this.emit('draw');
  }

  /**
   * Sets data to the serie
   * @memberof Serie
   * @param {(Object|Array|Array[])} data - The data of the serie
   * @param {Boolean} [ oneDimensional=false ] - In some cases you may need to force the 1D type. This is required when one uses an array or array to define the data (see examples)
   * @param{String} [ type=float ] - Specify the type of the data. Use <code>int</code> to save memory (half the amount of bytes allocated to the data).
  */
  setData(data: Waveform) {
    if (data instanceof Waveform) {
      return this.setWaveform(data);
    }

    throw 'Setting data other than waveforms in not supported by default. You must implemented this method in the inherited class.';
  }


  /**
   * Removes all the data from the serie, without redrawing
   * @returns {Serie} The current serie
   */
  clearData() {
    this.setData(new Waveform());
    return this;
  }

  /**
   * Returns the data in its current form
   * @returns {Array.<(Float64Array|Int32Array)>} An array containing the data chunks. Has only one member if the data has no gaps
   * @memberof Serie
   */
  getData() {
    return this.data;
  }

  /**
   * Sets the options of the serie (no extension of default options)
   * @param {Object} options - The options of the serie
   * @memberof Serie
   */
  setOptions(options: Partial<SerieOptions>) {
    this.options = util.extend(options || {}, defaultOptions);
  }

  /**
   * Sets the options of the serie (no extension of default options)
   * @param {String} name - The option name
   * @param value - The option value
   * @memberof Serie
   * @example serie.setOption('selectableOnClick', true );
   */
  setOption<T extends keyof SerieOptions>(name: T, value: SerieOptions[T]) {
    this.options[name] = value;
  }

  /**
   * Removes the serie from the graph. The method doesn't perform any axis autoscaling or repaint of the graph. This should be done manually.
   * @return {Serie} The current serie instance
   * @memberof Serie
   */
  kill(noLegendUpdate: boolean) {
    this.graph.removeSerieFromDom(this);
    this.graph._removeSerie(this);

    if (this.graph.legend && !noLegendUpdate) {
      this.graph.legend.update();
    }

    this.graph = undefined;
    return this;
  }

  /**
   * Hides the serie
   * @memberof Serie
   * @param {Boolean} [ hideShapes = false ] - <code>true</code> to hide the shapes associated to the serie
   * @returns {Serie} The current serie
   */
  hide(hideShapes = this.options.bindShapesToDisplayState, mute = false) {
    this.hidden = true;
    this.groupMain.setAttribute('display', 'none');

    this.getSymbolForLegend().setAttribute('opacity', 0.5);
    this.getTextForLegend().setAttribute('opacity', 0.5);

    this.hideImpl();

    if (hideShapes) {
      var shapes = this.graph.getShapesOfSerie(this);
      for (var i = 0, l = shapes.length; i < l; i++) {
        shapes[i].hide();
      }
    }

    if (!mute) {
      this.emit('hide');
    }

    if (
      this.getXAxis().doesHideWhenNoSeriesShown() ||
      this.getYAxis().doesHideWhenNoSeriesShown()
    ) {
      this.graph.draw(true);
    }

    if (
      this.graph.hasPlugin('peakPicking') &&
      this.graph.getPlugin('peakPicking').getSerie() == this
    ) {
      this.graph.getPlugin('peakPicking').hidePeakPicking();
    }

    return this;
  }

  /**
   * Shows the serie
   * @memberof Serie
   * @param {Boolean} [showShapes=false] - <code>true</code> to show the shapes associated to the serie
   * @returns {Serie} The current serie
   */
  show(showShapes = this.options.bindShapesToDisplayState, mute = false) {
    this.hidden = false;
    this.groupMain.setAttribute('display', 'block');

    this.getSymbolForLegend().setAttribute('opacity', 1);
    this.getTextForLegend().setAttribute('opacity', 1);

    this.showImpl();

    this.draw(true);

    if (showShapes) {
      var shapes = this.graph.getShapesOfSerie(this);
      for (var i = 0, l = shapes.length; i < l; i++) {
        shapes[i].show();
      }
    }

    if (!mute) {
      this.emit('show');
    }

    if (
      this.getXAxis().doesHideWhenNoSeriesShown() ||
      this.getYAxis().doesHideWhenNoSeriesShown()
    ) {
      this.graph.draw(true);
    }

    if (
      this.graph.hasPlugin('peakPicking') &&
      this.graph.getPlugin('peakPicking').getSerie() == this
    ) {
      this.graph.getPlugin('peakPicking').showPeakPicking();
    }

    return this;
  }

  hideImpl() { }
  showImpl() { }

  /**
   * Toggles the display of the serie (effectively, calls <code>.show()</code> and <code>.hide()</code> alternatively on each call)
   * @memberof Serie
   * @param {Boolean} [hideShapes=false] - <code>true</code> to hide the shapes associated to the serie
   * @returns {Serie} The current serie
   */
  toggleDisplay() {
    if (!this.isShown()) {
      this.show();
    } else {
      this.hide();
    }

    return this;
  }

  /**
   * Determines if the serie is currently visible
   * @memberof Serie
   * @returns {Boolean} The current visibility status of the serie
   */
  isShown() {
    return !this.hidden;
  }

  /**
   * Checks that axes assigned to the serie have been defined and have proper values
   * @memberof Serie
   */
  axisCheck() {
    if (!this.getXAxis() || !this.getYAxis()) {
      throw 'No axis exist for this serie. Check that they were properly assigned';
    }

    if (
      isNaN(this.getXAxis().getCurrentMin()) ||
      isNaN(this.getXAxis().getCurrentMax()) ||
      isNaN(this.getYAxis().getCurrentMin()) ||
      isNaN(this.getYAxis().getCurrentMax())
    ) {
      throw 'Axis min and max values are not defined. Try autoscaling';
    }
  }
  /**
   * Returns the x position of a certain value in pixels position, based on the serie's axis
   * @memberof Serie
   * @param {Number} val - Value to convert to pixels position
   * @returns {Number} The x position in px corresponding to the x value
   */
  getX(val) {
    return (val = this.getXAxis().getPx(val)) - (val % 0.2);
  }

  /**
   * Returns the y position of a certain value in pixels position, based on the serie's axis
   * @memberof Serie
   * @param {Number} val - Value to convert to pixels position
   * @returns {Number} The y position in px corresponding to the y value
   */
  getY(val) {
    return (val = this.getYAxis().getPx(val)) - (val % 0.2);
  }

  /**
   * Returns the selection state of the serie. Generic for most serie types
   * @memberof Serie
   * @returns {Boolean} <code>true</code> if the serie is selected, <code>false</code> otherwise
   */
  isSelected() {
    return this._activeStyleName == 'selected';
  }

  _checkX(val) {
    this.minX = Math.min(this.minX, val);
    this.maxX = Math.max(this.maxX, val);
  }

  _checkY(val) {

    this.minY = Math.min(this.minY, val);
    this.maxY = Math.max(this.maxY, val);
  }

  /**
   * Getter for the serie name
   * @memberof Serie
   * @returns {String} The serie name
   */
  getName() {
    return this.name;
  }

  /* AXIS */

  /**
   * Assigns axes automatically, based on {@link Graph#getXAxis} and {@link Graph#getYAxis}.
   * @memberof Serie
   * @returns {Serie} The current serie
   */
  autoAxis() {
    if (this.isFlipped()) {
      this.setXAxis(this.graph.getYAxis());
      this.setYAxis(this.graph.getXAxis());
    } else {
      this.setXAxis(this.graph.getXAxis());
      this.setYAxis(this.graph.getYAxis());
    }

    // After axes have been assigned, the graph axes should update their min/max
    this.graph.updateDataMinMaxAxes(false);
    return this;
  }

  /**
   * @alias autoAxis
   */
  autoAxes() {
    return this.autoAxis();
  }

  /**
   * Assigns an x axis to the serie
   * @memberof Serie
   * @param {Axis|Number} axis - The axis to use as an x axis. If an integer, {@link Graph#getXAxis} or {@link Graph#getYAxis} will be used
   * @returns {Serie} The current serie
   * @example serie.setXAxis( graph.getTopAxis( 1 ) ); // Assigns the second top axis to the serie
   */
  setXAxis(axis) {
    if (typeof axis == 'number') {
      this.xaxis = this.isFlipped() ?
        this.graph.getYAxis(axis) :
        this.graph.getXAxis(axis);
    } else {
      this.xaxis = axis;
    }

    this.graph.updateDataMinMaxAxes(false);

    return this;
  }

  /**
   * Assigns an y axis to the serie
   * @memberof Serie
   * @param {Axis|Number} axis - The axis to use as an y axis. If an integer, {@link Graph#getXAxis} or {@link Graph#getYAxis} will be used
   * @returns {Serie} The current serie
   * @example serie.setYAxis( graph.getLeftAxis( 4 ) ); // Assigns the 5th left axis to the serie
   */
  setYAxis(axis) {
    if (typeof axis == 'number') {
      this.xaxis = this.isFlipped() ?
        this.graph.getXAxis(axis) :
        this.graph.getYAxis(axis);
    } else {
      this.yaxis = axis;
    }

    this.graph.updateDataMinMaxAxes(false);

    return this;
  }

  /**
   * Assigns two axes to the serie
   * @param {GraphAxis} axis1 - First axis to assign to the serie (x or y)
   * @param {GraphAxis} axis2 - Second axis to assign to the serie (y or x)
   * @returns {Serie} The current serie
   * @memberof Serie
   */
  setAxes() {
    for (var i = 0; i < 2; i++) {
      if (arguments[i]) {
        this[arguments[i].isX() ? 'setXAxis' : 'setYAxis'](arguments[i]);
      }
    }

    this.graph.updateDataMinMaxAxes(false);

    return this;
  }

  /**
   * @returns {GraphAxis} The x axis assigned to the serie
   * @memberof Serie
   */
  getXAxis() {
    return this.xaxis;
  }

  /**
   * @returns {GraphAxis} The y axis assigned to the serie
   * @memberof Serie
   */
  getYAxis() {
    return this.yaxis;
  }

  /* */

  /* DATA MIN MAX */

  /**
   * @returns {Number} Lowest x value of the serie's data
   * @memberof Serie
   */
  getMinX() {
    return this.minX;
  }

  /**
   * @returns {Number} Highest x value of the serie's data
   * @memberof Serie
   */
  getMaxX() {
    return this.maxX;
  }

  /**
   * @returns {Number} Lowest y value of the serie's data
   * @memberof Serie
   */
  getMinY() {
    return this.minY;
  }

  /**
   * @returns {Number} Highest y value of the serie's data
   * @memberof Serie
   */
  getMaxY() {
    return this.maxY;
  }

  getWaveform() {
    if (!this.waveform) {
      this.waveform = Graph.newWaveform();
    }
    return this.waveform;
  }

  getWaveforms() {
    return [this.waveform];
  }

  setWaveform(waveform) {
    if (!(waveform instanceof Waveform)) {
      console.trace();
      console.error(waveform);
      throw new Error(
        'Cannot assign waveform to serie. Waveform is not of the proper Waveform instance'
      );
    }

    this.waveform = waveform;
    this.dataHasChanged();
    this.graph.updateDataMinMaxAxes(false);


    return this;
  }

  /**
   * Computes and returns a line SVG element with the same line style as the serie, or width 20px
   * @returns {SVGElement}
   * @memberof Serie
   */
  getSymbolForLegend() {
    if (!this.lineForLegend) {
      var line = document.createElementNS(this.graph.ns, 'line');
      this.applyLineStyle(line);

      line.setAttribute('x1', "5");
      line.setAttribute('x2', "25");
      line.setAttribute('y1', "0");
      line.setAttribute('y2', "0");

      line.setAttribute('cursor', 'pointer');

      this.lineForLegend = line;
    }

    return this.lineForLegend;
  }

  _getSymbolForLegendContainer(): SVGElement {
    return this.symbolLegendContainer;
  }

  extendStyle(data: Object, styleName: string = 'unselected', baseStyleName: string = 'unselected') {
    this.styles[styleName] = this.styles[styleName] || { base: baseStyleName, data: {} }
    util.extend(this.styles[styleName].data, data);
  }

  setStyle(json, styleName = 'unselected', baseStyleName = 'unselected') {

    this.styles[styleName] = {
      base: baseStyleName,
      data: json
    };

    this.styleHasChanged(styleName);

    return this;
  };

  getStyle(styleName) {
    if (!this.styles[styleName]) {
      return Graph.getStyle(styleName);
    }
    return this._buildStyle(styleName);
  }

  getRawStyles() {
    return this.styles;
  }

  getRawStyle(styleName) {
    this.styles[styleName] = this.styles[styleName] || { data: {} };
    return this.styles[styleName].data;
  }

  activateStyle(styleName) {
    this._activeStyleName = styleName;
    this._unselectedStyleName = styleName;
    this.computeActiveStyle();
    this.styleHasChanged(styleName);
  }

  setActiveStyle(styleName) {
    return this.activateStyle(styleName);
  }

  getActiveStyle() {
    return this._activeStyleName;
  }

  getActiveStyleName() {
    return this.getActiveStyle();
  }

  computeStyles() {
    for (let i in this.styles) {
      this.computeStyle(i);
    }
  }

  computeStyle(styleName) {
    this.computedStyle = this.computedStyle || {};
    this.computedStyle[styleName] = this.getStyle(styleName);
  }

  computeActiveStyle() {
    this.computedStyle = this.computedStyle || {};
    this.computedStyle[this.getActiveStyle()] = this.getStyle(this.getActiveStyle());
  }

  protected recomputeActiveStyleIfNeeded() {
    if (this.hasStyleChanged(this.getActiveStyle())) {
      this.computeActiveStyle();
      this.updateStyle();
    }
  }

  getComputedStyle(style = this.getActiveStyle()) {
    return this.computedStyle[style];
  }

  getComputedStyles() {
    return this.computedStyle;
  }

  private _buildStyle(styleName: string) {
    let base: string | undefined = this.styles[styleName].base;
    if (base == styleName) {
      base = undefined;
    }

    if (base === undefined) {
      return util.extend(true, {}, this.styles[styleName].data);
    } else {
      return util.extend(true, {}, this.getStyle(base), this.styles[styleName].data);
    }
  }



  /**
   * Explicitely applies the line style to the SVG element returned by {@link Serie#getSymbolForLegend}
   * @see Serie#getSymbolForLegend
   * @returns {SVGElement}
   * @memberof Serie
   */
  setLegendSymbolStyle() {
    this.applyLineStyle(this.getSymbolForLegend());
  }

  /**
   * @alias Serie#setLegendSymbolStyle 
   * @memberof Serie
   */
  updateStyle() {
    this.setLegendSymbolStyle();
    this.graph.updateLegend();
  }

  /**
   * Computes and returns a text SVG element with the label of the serie as a text, translated by 35px
   * @returns {SVGElement}
   * @memberof Serie
   * @see Serie#getLabel
   */
  getTextForLegend() {
    if (!this.textForLegend) {
      var text = document.createElementNS(this.graph.ns, 'text');
      text.setAttribute('cursor', 'pointer');
      text.textContent = this.getLabel();

      this.textForLegend = text;
    }

    return this.textForLegend;
  }

  /**
   * @returns {Number} The current index of the serie
   * @memberof Serie
   */
  getIndex() {
    return this.graph.series.indexOf(this);
  }

  /**
   * @returns {String} The label or, alternatively - the name of the serie
   * @memberof Serie
   */
  getLabel() {
    return this.options.label || this.name;
  }

  /**
   * Sets the label of the serie. Note that this does not automatically updates the legend
   * @param {String} label - The new label of the serie
   * @returns {Serie} The current serie
   * @memberof Serie
   */
  setLabel(label) {
    this.options.label = label;

    if (this.textForLegend) {
      this.textForLegend.textContent = label;
    }

    this.graph.requireLegendUpdate();
    return this;
  }

  /* FLIP */

  /**
   * Assigns the flipping value of the serie. A flipped serie will have inverted axes. However this method does not automatically re-assigns the axes of the serie. Call {@link Serie#autoAxis} to re-assign the axes automatically, or any other axis setting method.
   * @param {Boolean} [flipped=false] - <code>true</code> to flip the serie
   * @returns {Serie} The current serie
   * @memberof Serie
   */
  setFlip(flipped) {
    this.options.flip = flipped;
    return this;
  }

  /**
   * @returns {Boolean} <code>true</code> if the serie is flipped, <code>false</code> otherwise
   * @memberof Serie
   */
  getFlip() {
    return this.options.flip;
  }

  /**
   * @alias Serie#getFlip
   * @memberof Serie
   */
  isFlipped() {
    return this.options.flip;
  }

  /**
   * Sets the layer onto which the serie should be displayed. This method does not trigger a graph redraw.
   * @memberof Serie
   * @param {Number} layerIndex=1 - The index of the layer into which the serie will be drawn
   * @returns {Serie} The current serie
   */
  setLayer(layerIndex) {
    let newLayer = parseInt(layerIndex) || 1;

    if (newLayer !== this.options.layer) {
      this.options.layer = newLayer;
      this.graph.appendSerieToDom(this);
    }

    return this;
  }

  /**
   * Sets the layer onto which the serie should be displayed. This method does not trigger a graph redraw.
   * @memberof Serie
   * @returns {Nunber} The index of the layer into which the serie will be drawn
   */
  getLayer() {
    return this.options.layer || 1;
  }



  /**
   * Notifies jsGraph that the style of the serie has changed and needs to be redrawn on the next repaint
   * @param {String} selectionType - The selection for which the style may have changed
   * @returns {Serie} The current serie
   * @memberof Serie
   */
  styleHasChanged(selectionType: string | false = 'unselected') {
    this._changedStyles = this._changedStyles || {};

    if (selectionType === false) {
      for (var i in this._changedStyles) {
        this._changedStyles[i] = false;
      }
    } else {
      this._changedStyles[selectionType ? selectionType : 'unselected'] = true;
    }

    this.graph.requireLegendUpdate();
    return this;
  }

  /**
   * Checks if the style has changed for a selection type
   * @param {String} selectionType - The selection for which the style may have changed
   * @returns {Boolean} <code>true</code> if the style has changed
   * @private
   * @memberof Serie
   */
  hasStyleChanged(selectionType = 'unselected') {

    let s;
    this._changedStyles = this._changedStyles || {};
    do {
      if (this._changedStyles[selectionType]) {
        return true;
      }

      s = this.styles[selectionType];


      if (!s || s.base == selectionType) {
        break;
      }
      selectionType = s.base;
    } while (true);
    return false;
  }

  /**
   * Notifies jsGraph that the data of the serie has changed
   * @returns {Serie} The current serie
   * @memberof Serie
   */
  dataHasChanged(arg?: any) {
    this._dataHasChanged = arg === undefined || arg;

    if (this.waveform) {
      this.minX = this.waveform.getXMin();
      this.maxX = this.waveform.getXMax();
      this.minY = this.waveform.getMin();
      this.maxY = this.waveform.getMax();
    }
    return this;
  }

  /**
   * Checks if the data has changed
   * @returns {Boolean} <code>true</code> if the data has changed
   * @private
   * @memberof Serie
   */
  hasDataChanged() {
    return this._dataHasChanged;
  }

  /**
   * Set a key/value arbitrary information to the serie. It is particularly useful if you have this serie has a reference through an event for instance, and you want to retrieve data associated to it
   * @param {String} prop - The property
   * @param value - The value
   * @returns {Serie} The current serie
   * @see Serie#getInfo
   * @memberof Serie
   */
  setInfo(prop, value) {
    this.infos = this.infos || {};
    this.infos[prop] = value;
    return this;
  }

  /**
   * Retrives an information value from its key
   * @param {String} prop - The property
   * @returns The value associated to the prop parameter
   * @see Serie#setInfo
   * @memberof Serie
   */
  getInfo(prop, value) {
    return (this.infos || {})[prop];
  }

  /**
   * @deprecated
   * @memberof Serie
   */
  setAdditionalData(data) {
    this.additionalData = data;
    return this;
  }

  /**
   * @deprecated
   * @memberof Serie
   */
  getAdditionalData() {
    return this.additionalData;
  }

  /**
   * Flags the serie as selected
   * @returns {Serie} The current serie
   * @memberof Serie
   */
  select(selectName) {
    if (selectName == 'unselected') {
      return this;
    }
    this._unselectedStyleName = this._activeStyleName;
    this._activeStyleName = 'selected';
    this.selected = true;

    this.applyStyle();
    return this;
  }

  /**
   * Flags the serie as unselected
   * @returns {Serie} The current serie
   * @memberof Serie
   */
  unselect() {
    this.selected = false;
    this.activateStyle(this._unselectedStyleName);

    this.applyStyle();
    return this;
  }

  applyStyle() { }
  /**
   * Allows mouse tracking of the serie
   * @memberof Serie
   * @returns {Serie} The current serie
   * @param {Function} hoverCallback - Function to be called when the mouse enters the serie area
   * @param {Function} outCallback - Function to be called when the mouse exits the serie area
   * @private
   */
  enableTracking(hoverCallback, outCallback) {
    this._tracker = true;
    this.options.tracking = {};
    return this;
  }

  /**
   * Disables mouse tracking of the serie
   * @memberof Serie
   * @returns {Serie} The current serie
   * @private
   */
  disableTracking() {
    if (this._trackerDom) {
      this._trackerDom.remove();
      this._trackerDom = null;
    }

    this._tracker = false;
    return this;
  }

  /**
   *  Allows mouse tracking of the serie
   *  @memberof Serie
   *  @param {Object} options - The tracking line options
   *  @returns {Serie} The current serie
   */
  allowTrackingLine(options) {
    options = options || {};
    this.graph.addSerieToTrackingLine(this, options);
  }

  getMarkerForLegend() {
    return false;
  }

  get type() {
    return this._type;
  }

  getType() {
    return this._type;
  }

  excludeFromLegend() {
    this._excludedFromLegend = true;
    return this;
  }

  includeInLegend() {
    this._excludedFromLegend = false;
    return this;
  }

  setDataIndices(categories, nb) {
    this.categoryIndices = categories;
    this.nbCategories = nb;
  }

  hasErrors() {
    if (!this.waveform) {
      return false;
    }

    return this.waveform.hasErrorBars();
  }
}

export default Serie;


