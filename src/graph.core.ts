// @ts-nocheck

// @ts-ignore
import GraphPosition from './graph.position.js';
// @ts-ignore
import * as util from './graph.util.js';
// @ts-ignore
import GraphJSON from './renderer/mixin.js';
// @ts-ignore
import EventMixin, { EventEmitter } from './mixins/graph.mixin.event.js';
// @ts-ignore
import { Waveform, WaveformHash } from './util/waveform';
// @ts-ignore
import { SerieStyle, SERIE_DEFAULT_STYLE, SERIE_TYPE } from '../types/series';

export const __VERSION__ = "0.0.1"
export const ns = 'http://www.w3.org/2000/svg';
export const nsxlink = 'http://www.w3.org/1999/xlink';

type _constructor = { new(...args: any): any }
type constructorKey_t = string | SERIE_TYPE


enum AxisPositionE {
  TOP = "top",
  BOTTOM = "bottom",
  LEFT = "left",
  RIGHT = "right"
}

type AxisPosition = "top" | "bottom" | "left" | "right";


/**
 * Default graph parameters
 * @name Graph~GraphOptionsDefault
 * @name GraphOptions
 * @object
 * @static
 * @memberof Graph
 * @prop {String} title - Title of the graph
 * @prop {Number} paddingTop - The top padding
 * @prop {Number} paddingLeft - The left padding
 * @prop {Number} paddingRight - The right padding
 * @prop {Number} paddingBottom - The bottom padding
 * @prop {(Number|Boolean)} padding - A common padding value for top, bottom, left and right
 * @prop {Number} fontSize - The basic text size of the graphs
 * @prop {Number} fontFamily - The basic font family. Should be installed on the computer of the user
 * @prop {Object.<String,Object>} plugins - A list of plugins to import with their options
 * @prop {Object.<String,Object>} pluginAction - The default key combination to access those actions
 * @prop {Object.<String,Object>} mouseActions - Alias of pluginActions
 * @prop {Object.<String,Object>} keyActions - Defines what happens when keys are pressed
 * @prop {Object} wheel - Define the mouse wheel action
 * @prop {Object} dblclick - Define the double click action
 * @prop {Boolean} shapesUniqueSelection - true to allow only one shape to be selected at the time
 * @prop {Boolean} shapesUnselectOnClick - true to unselect all shapes on click
 */
const GraphOptionsDefault = {
  title: '',

  paddingTop: 30,
  paddingBottom: 5,
  paddingLeft: 20,
  paddingRight: 20,

  close: {
    left: true,
    right: true,
    top: true,
    bottom: true
  },

  closeColor: 'black',

  fontSize: 12,
  fontFamily: 'Myriad Pro, Helvetica, Arial',

  plugins: {},
  pluginAction: {},
  mouseActions: [],
  keyActions: [],
  wheel: {},
  dblclick: {},

  shapesUnselectOnClick: true,
  shapesUniqueSelection: true
};


type AxesPos = "top" | "bottom" | "left" | "right";
type Axes<T> = Record<AxesPos, Array<T>>

/**
 * Entry class of jsGraph that creates a new graph.
 * @tutorial basic
 */
class Graph extends EventEmitter {

  public ns: string
  public nsxlink: string;

  public uid: string = util.guid();
  private wrapper: HTMLElement | undefined;
  public options: any;
  private prevented: boolean = false;
  protected axis: Axes<any>;
  private shapes: Array<any>;
  private shapesLocked: boolean = false;
  private plugins: any;
  selectedShapes: any[];
  series: any[];
  public _axesHaveChanged: boolean;
  currentAction: boolean;
  height: any;
  width: any;
  dom: SVGElement;
  domTitle: any;
  sizeSet: any;

  _lockUpdate: boolean = false;
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
  drawn: boolean = false;
  closingLines: any;
  graphingZone: any;
  forcedPlugin: any;
  activePlugin: string | undefined;
  zAxis: any;
  groupGrids: any;
  groupEvent: SVGElement;
  _sizeChanged: boolean = false;
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
  //shift: { top: any[]; bottom: any[]; left: any[]; right: any[]; };
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
  constructor(wrapper?: HTMLElement, options?: any, axes: Axes<any> = { [AxisPositionE.TOP]: [], [AxisPositionE.BOTTOM]: [], [AxisPositionE.LEFT]: [], [AxisPositionE.RIGHT]: [] }) {

    super();

    this.ns = ns;
    this.nsxlink = nsxlink;

    if (wrapper === Object(wrapper) && !(wrapper instanceof HTMLElement)) {
      // Wrapper is options
      options = wrapper;
      wrapper = undefined;
    }

    if (!options) {
      options = {};
    }

    if (!options.axes) {
      options.axes = axes;
    }


    /**
     * @object
     * @memberof Graph
     * @name Graph#options
     * @type GraphOptions
     * @default {@link GraphOptionsDefault}
     * Access directly the options of the graph using this public object.
     * @example graph.options.mouseActions.push( {  } );
     */
    this.options = util.extend({}, GraphOptionsDefault, options);
    // Options declaration must be placed before the doDom operation

    // doDom is a private method. We bind it to this thanks to ES6 features


    this.dom = document.createElementNS(ns, 'svg');

    if (wrapper) {
      this.setWrapper(wrapper);
    }


    this.axis = {
      [AxisPositionE.LEFT]: [],
      [AxisPositionE.TOP]: [],
      [AxisPositionE.BOTTOM]: [],
      [AxisPositionE.RIGHT]: []
    };

    this.shapes = [];
    this.shapesLocked = false;
    this.plugins = {};

    for (var i in this.options.pluginAction) {
      this.options.pluginAction.plugin = i;
      this.options.mouseActions.push(this.options.pluginAction);
    }

    this.selectedShapes = [];

    this.series = [];
    //this._dom = wrapper;
    this._axesHaveChanged = true;

    if (
      this.options.hasOwnProperty('padding') &&
      util.isNumeric(this.options.padding)
    ) {
      this.options.paddingTop = this.options.paddingBottom = this.options.paddingLeft = this.options.paddingRight = this.options.padding;
    }

    this.currentAction = false;

    // Load all axes
    if (options.axes) {
      for (var i in options.axes) {
        for (var j = 0, l = options.axes[i].length; j < l; j++) {
          switch (i) {
            case 'top':
              this.getTopAxis(j, options.axes[i][j]);
              break;
            case 'left':
              this.getLeftAxis(j, options.axes[i][j]);
              break;
            case 'right':
              this.getRightAxis(j, options.axes[i][j]);
              break;
            case 'bottom':
              this.getBottomAxis(j, options.axes[i][j]);
              break;

            default:
              // Do not do anything
              break;
          }
        }
      }
    }

    this._pluginsInit();






    // Create SVG element, set the NS
    this.dom.setAttributeNS(
      'http://www.w3.org/2000/xmlns/',
      'xmlns:xlink',
      'http://www.w3.org/1999/xlink'
    );
    //this.dom.setAttributeNS(this.ns, 'xmlns:xlink', this.nsxml);
    util.setAttributeTo(this.dom, {
      xmlns: ns,
      'font-family': this.options.fontFamily,
      'font-size': this.options.fontSize
    });

    try {
      util.setAttributeTo(this.dom, {
        // eslint-disable-next-line no-undef
        'data-jsgraph-version': __VERSION__
      });
    } catch (e) {
      // ignore
    }

    this.defs = document.createElementNS(ns, 'defs');
    this.dom.appendChild(this.defs);

    this.groupEvent = document.createElementNS(ns, 'g');

    this.rectEvent = document.createElementNS(ns, 'rect');
    util.setAttributeTo(this.rectEvent, {
      'pointer-events': 'fill',
      fill: 'transparent'
    });
    this.groupEvent.appendChild(this.rectEvent);

    this.dom.appendChild(this.groupEvent);

    // Handling graph title
    this.domTitle = document.createElementNS(ns, 'text');
    this.setTitle(this.options.title);
    if (this.options.titleFontSize) {
      this.setTitleFontSize(this.options.titleFontSize);
    }
    if (this.options.titleFontColor) {
      this.setTitleFontSize(this.options.titleFontColor);
    }
    if (this.options.titleFontFamily) {
      this.setTitleFontFamily(this.options.titleFontFamily);
    }

    util.setAttributeTo(this.domTitle, {
      'text-anchor': 'middle',
      y: 20
    });
    this.groupEvent.appendChild(this.domTitle);
    //

    this.graphingZone = document.createElementNS(ns, 'g');
    this.updateGraphingZone();

    this.groupEvent.appendChild(this.graphingZone);

    /*  this.shapeZoneRect = document.createElementNS(this.ns, 'rect');
    //this.shapeZoneRect.setAttribute('pointer-events', 'fill');
    this.shapeZoneRect.setAttribute('fill', 'transparent');
    this.shapeZone.appendChild(this.shapeZoneRect);
  */
    this.axisGroup = document.createElementNS(ns, 'g');
    this.graphingZone.appendChild(this.axisGroup);

    this.groupGrids = document.createElementNS(ns, 'g');

    // With the z stacking, this should probably be removed
    this.groupGrids.setAttribute('clip-path', 'url(#_clipplot' + this.uid + ')');

    this.groupPrimaryGrids = document.createElementNS(ns, 'g');
    this.groupSecondaryGrids = document.createElementNS(ns, 'g');

    this.axisGroup.appendChild(this.groupGrids);

    this.groupGrids.appendChild(this.groupSecondaryGrids);
    this.groupGrids.appendChild(this.groupPrimaryGrids);

    this.plotGroup = document.createElementNS(ns, 'g');
    this.graphingZone.appendChild(this.plotGroup);

    // 5 September 2014. I encountered a case here shapeZone must be above plotGroup
    /*this.shapeZone = document.createElementNS( this.ns, 'g' );
    this.graphingZone.appendChild( this.shapeZone );
  */

    this.layers = [];

    this._makeClosingLines();

    this.clip = document.createElementNS(ns, 'clipPath');
    this.clip.setAttribute('id', `_clipplot${this.uid}`);
    this.defs.appendChild(this.clip);

    this.clipRect = document.createElementNS(ns, 'rect');
    this.clip.appendChild(this.clipRect);
    this.clip.setAttribute('clipPathUnits', 'userSpaceOnUse');

    this.markerArrow = document.createElementNS(ns, 'marker');
    this.markerArrow.setAttribute('viewBox', '0 0 10 10');
    this.markerArrow.setAttribute('id', `arrow${this.uid}`);
    this.markerArrow.setAttribute('refX', '6');
    this.markerArrow.setAttribute('refY', '5');
    this.markerArrow.setAttribute('markerUnits', 'strokeWidth');
    this.markerArrow.setAttribute('markerWidth', '8');
    this.markerArrow.setAttribute('markerHeight', '6');
    this.markerArrow.setAttribute('orient', 'auto');
    //this.markerArrow.setAttribute('fill', 'context-stroke');
    //this.markerArrow.setAttribute('stroke', 'context-stroke');

    var pathArrow = document.createElementNS(ns, 'path');
    pathArrow.setAttribute('d', 'M 0 0 L 10 5 L 0 10 z');
    //pathArrow.setAttribute( 'fill', 'context-stroke' );
    this.markerArrow.appendChild(pathArrow);

    this.defs.appendChild(this.markerArrow);

    // Horionzal split marker for axis
    this.markerHorizontalSplit = document.createElementNS(ns, 'marker');
    this.markerHorizontalSplit.setAttribute('viewBox', '0 0 6 8');
    this.markerHorizontalSplit.setAttribute(
      'id',
      `horionzalsplit_${this.getId()}`
    );
    this.markerHorizontalSplit.setAttribute('refX', '3');
    this.markerHorizontalSplit.setAttribute('refY', '4');
    this.markerHorizontalSplit.setAttribute('markerUnits', 'strokeWidth');
    this.markerHorizontalSplit.setAttribute('markerWidth', '6');
    this.markerHorizontalSplit.setAttribute('markerHeight', '8');

    var path = document.createElementNS(ns, 'line');
    path.setAttribute('x1', '0');
    path.setAttribute('y1', '8');

    path.setAttribute('x2', '6');
    path.setAttribute('y2', '0');

    path.setAttribute('stroke', 'black');
    this.markerHorizontalSplit.appendChild(path);

    this.defs.appendChild(this.markerHorizontalSplit);

    // Vertical split marker for axis
    this.markerVerticalSplit = document.createElementNS(ns, 'marker');
    this.markerVerticalSplit.setAttribute('viewBox', '0 0 8 6');
    this.markerVerticalSplit.setAttribute('id', `verticalsplit_${this.getId()}`);
    this.markerVerticalSplit.setAttribute('refX', '4');
    this.markerVerticalSplit.setAttribute('refY', '3');
    this.markerVerticalSplit.setAttribute('markerUnits', 'strokeWidth');
    this.markerVerticalSplit.setAttribute('markerWidth', '8');
    this.markerVerticalSplit.setAttribute('markerHeight', '6');

    var path = document.createElementNS(ns, 'line');

    path.setAttribute('x1', '0');
    path.setAttribute('y1', '0');

    path.setAttribute('x2', '8');
    path.setAttribute('y2', '6');

    path.setAttribute('stroke', 'black');
    this.markerVerticalSplit.appendChild(path);
    this.defs.appendChild(this.markerVerticalSplit);

    this.vertLineArrow = document.createElementNS(ns, 'marker');
    this.vertLineArrow.setAttribute('viewBox', '0 0 10 10');
    this.vertLineArrow.setAttribute('id', `verticalline${this.uid}`);
    this.vertLineArrow.setAttribute('refX', '0');
    this.vertLineArrow.setAttribute('refY', '5');
    this.vertLineArrow.setAttribute('markerUnits', 'strokeWidth');
    this.vertLineArrow.setAttribute('markerWidth', '20');
    this.vertLineArrow.setAttribute('markerHeight', '10');
    this.vertLineArrow.setAttribute('orient', 'auto');
    //this.vertLineArrow.setAttribute('fill', 'context-stroke');
    //this.vertLineArrow.setAttribute('stroke', 'context-stroke');
    this.vertLineArrow.setAttribute('stroke-width', '1px');

    var pathVertLine = document.createElementNS(ns, 'path');
    pathVertLine.setAttribute('d', 'M 0 -10 L 0 10');
    pathVertLine.setAttribute('stroke', 'black');

    this.vertLineArrow.appendChild(pathVertLine);

    this.defs.appendChild(this.vertLineArrow);

    // Removed with z stacking ?
    this.plotGroup.setAttribute('clip-path', 'url(#_clipplot' + this.uid + ')');

    this.bypassHandleMouse = false;


  }

  setWrapper(wrapper: HTMLElement | string) {

    if (typeof wrapper == 'string') {
      wrapper = document.getElementById(wrapper) as HTMLElement;
    }

    if (!wrapper) {
      throw new Error('The wrapper DOM element was not found.');
    }

    if (!wrapper.appendChild) {
      throw new Error('The wrapper appears to be an invalid HTMLElement');
    }

    wrapper.style.userSelect = 'none';
    wrapper.style.position = 'relative';
    wrapper.style.outline = 'none';

    // Why would that be necessary ?
    // wrapper.setAttribute( 'tabindex', 1 );

    this.wrapper = wrapper;

    // DOM

    if (!this.height || !this.width) {
      var wrapperStyle = getComputedStyle(wrapper);
      var w = parseInt(wrapperStyle.width, 10);
      var h = parseInt(wrapperStyle.height, 10);
      this.setSize(w, h);
      this._resize();
    }

    wrapper.appendChild(this.dom);

    this._registerEvents();
  }


  private _registerEvents() {

    if (!this.wrapper) {
      throw 'No wrapper exists. Cannot register the events.';
    }

    this.dom.setAttribute('tabindex', "0");

    this.dom.addEventListener('keydown', (e: KeyboardEvent) => {
      _handleKey(this, e, 'keydown');
    });

    this.dom.addEventListener('keypress', (e: KeyboardEvent) => {
      _handleKey(this, e, 'keypress');
    });

    this.dom.addEventListener('keyup', (e: KeyboardEvent) => {
      _handleKey(this, e, 'keyup');
    });
    // Not sure this has to be prevented

    // August 17th, 2017: I extended the graph.groupEvent to the more general graph.dom to make the zoom plugin more
    // intuitive. Let us see if it breaks another example...
    this.dom.addEventListener('mousemove', (e: MouseEvent) => {
      //e.preventDefault();
      const coords = this._getXY(e);
      _handleMouseMove(this, coords.x, coords.y, e);
    });

    this.dom.addEventListener('mouseleave', (e) => {
      _handleMouseLeave(this);
    });

    this.groupEvent.addEventListener('mousedown', (e) => {
      this.focus();

      //   e.preventDefault();
      if (e.which == 3 || e.ctrlKey) {
        return;
      }

      var coords = this._getXY(e);
      _handleMouseDown(this, coords.x, coords.y, e);
    });

    this.dom.addEventListener('mouseup', (e) => {
      this.emit('mouseUp', e);
      const coords = this._getXY(e);

      _handleMouseUp(this, coords.x, coords.y, e);
    });

    this.wrapper.addEventListener('mouseup', (e: MouseEvent) => {
      e.stopPropagation();
    });

    this.dom.addEventListener('dblclick', (e: MouseEvent) => {
      this.emit('dblClick', e);
      const coords = this._getXY(e);

      _handleDblClick(this, coords.x, coords.y, e);
    });

    this.groupEvent.addEventListener('click', (e) => {
      // Cancel right click or Command+Click
      if (e.which == 3 || e.ctrlKey) {
        return;
      }

      //   e.preventDefault();
      var coords = this._getXY(e);

      if (!this.prevent(false)) {
        _handleClick(this, coords.x, coords.y, e);
      }

      //}, 200 );
    });
    /*
      this.groupEvent.addEventListener('mousewheel', (e: WheelEvent) => {
        var deltaY =  -e.deltaY;
        var coords = this._getXY(e);
        _handleMouseWheel(this, deltaY, coords.x, coords.y, e);
    
        return false;
      });
    */
    this.groupEvent.addEventListener('wheel', (e: WheelEvent) => {
      const coords = this._getXY(e);
      const deltaY = -e.deltaY;
      _handleMouseWheel(this, deltaY, coords.x, coords.y, e);

      return false;
    });
  }

  /**
   * Returns the graph SVG wrapper element
   * @public
   * @return {SVGElement} The DOM element wrapping the graph
   */
  getDom() {
    return this.dom;
  }

  /**
   * Returns the unique id representing the graph
   * @public
   * @return {String} The unique ID of the graph
   */
  getId(): string {
    return this.uid;
  }

  /**
   * Returns the graph wrapper element passed during the graph creation
   * @public
   * @return {HTMLElement} The DOM element wrapping the graph
   */
  getWrapper(): HTMLElement {
    if (!this.wrapper) {
      throw "Wrapper does not exist";
    }
    return this.wrapper;
  }

  /**
   * Sets an option of the graph
   * @param {String} name - Option name
   * @param value - New option value
   * @returns {Graph} - Graph instance
   */
  setOption(name: string, val: any) {
    this.options[name] = val;
    return this;
  }

  /**
   *  Sets the title of the graph
   */
  setTitle(title: string) {
    this.options.title = title;
    this.domTitle.textContent = title;
  }

  setTitleFontSize(fontSize: string) {
    this.domTitle.setAttribute('font-size', fontSize);
  }

  setTitleFontColor(fontColor: string) {
    this.domTitle.setAttribute('fill', fontColor);
  }

  setTitleFontFamily(fontColor: string) {
    this.domTitle.setAttribute('font-family', fontColor);
  }

  /**
   *  Shows the title of the graph
   */
  displayTitle() {
    this.domTitle.setAttribute('display', 'inline');
  }

  /**
   *  Hides the title of the graph
   */
  hideTitle() {
    this.domTitle.setAttribute('display', 'none');
  }

  hide() {
    if (this.dom.style.display !== 'none') {
      this.dom.style.display = 'none';
    }
  }

  show() {
    if (this.dom.style.display == 'none') {
      this.dom.style.display = 'initial';
    }
  }

  /**
   * Calls a repaint of the container. Used internally when zooming on the graph, or when <code>.autoscaleAxes()</code> is called (see {@link Graph#autoscaleAxes}).<br />
   * To be called after axes min/max are expected to have changed (e.g. after an <code>axis.zoom( from, to )</code>) has been called
   * @param {Boolean} onlyIfAxesHaveChanged - Triggers a redraw only if min/max values of the axes have changed.
   * @return {Boolean} if the redraw has been successful
   */
  redraw(onlyIfAxesHaveChanged: boolean, force: boolean): boolean {
    if (!this.width || !this.height) {
      return false;
    }


    if (!this.sizeSet) {
      this._resize();
      this.executeRedrawSlaves();
      return true;
    } else {
      if (
        !onlyIfAxesHaveChanged ||
        force ||
        haveAxesChanged(this) ||
        hasSizeChanged(this)
      ) {
        this.executeRedrawSlaves();
        this.refreshDrawingZone();
        return true;
      }
    }

    this.executeRedrawSlaves();
    return false;
  }

  executeRedrawSlaves() {
    this._pluginsExecute('preDraw');
  }

  /**
   * Draw the graph and the series. This method will only redraw what is necessary. You may trust its use when you have set new data to series, changed serie styles or called for a zoom on an axis.
   */
  draw(force: boolean = false) {
    this.drawn = true;
    this.updateLegend(true);
    this.drawSeries(this.redraw(true, force));

    this._pluginsExecute('postDraw');
  }

  /**
   *  Prevents the graph, the series and the legend from redrawing automatically. Valid until {@link Graph#resumeUpdate} is called
   *  @memberof Graph
   *  @return {Graph} The current graph instance
   *  @see {@link Graph#resumeUpdate}
   *  @see {@link Graph#doUpdate}
   *  @since 1.16.19
   */
  delayUpdate() {
    this._lockUpdate = true;
    return this;
  }

  /**
   *  Forces legend and graph update, even is {@link Graph#delayUpdate} has been called before.
   *  @memberof Graph
   *  @return {Graph} The current graph instance
   *  @see {@link Graph#delayUpdate}
   *  @see {@link Graph#resumeUpdate}
   *  @since 1.16.19
   */
  doUpdate() {
    if (this.legend) {
      this.legend.update();
    }
    this.draw();
    if (this.legend) {
      this.legend.update();
    }
    return this;
  }

  /**
   *  Cancels the effect of {@link Graph#delayUpdate}, but does not redraw the graph automatically
   *  @memberof Graph
   *  @return {Graph} The current graph instance
   *  @see {@link Graph#delayUpdate}
   *  @see {@link Graph#doUpdate}
   *  @since 1.16.19
   */
  resumeUpdate() {
    this._lockUpdate = false;
    return this;
  }

  isDelayedUpdate() {
    return this._lockUpdate;
  }

  /**
   * Sets the total width of the graph
   * @param {Number} width - The new width of the graph
   * @param {Boolean} skipResize - <code>true</code> to defer graph repaint. Use {@link Graph#resize} to force repain later on. (Useful if many graph sizing operations are done successively)
   * @see Graph#setHeight
   * @see Graph#resize
   */
  setWidth(width: number, skipResize: boolean) {
    this.width = width;
    if (!skipResize) {
      this._resize();
    }
  }

  /**
   * Sets the total height of the graph
   * @param {Number} height - The new height of the graph
   * @param {Boolean} skipResize - <code>true</code> to defer graph repaint. Use {@link Graph#resize} to force repain later on. (Useful if many graph sizing operations are done successively)
   * @see Graph#setWidth
   * @see Graph#resize
   */
  setHeight(height: number, skipResize: boolean) {
    this.height = height;
    if (!skipResize) {
      this._resize();
    }
  }

  /**
   * Sets the new dimension of the graph and repaints it. If width and height are omitted, a simple refresh is done.
   * @param {Number} [ width ] - The new width of the graph
   * @param {Number} [ height ] - The new height of the graph
   * @see Graph#setWidth
   * @see Graph#setHeight
   * @return {Graph} The current graph
   */
  resize(w: number, h: number) {
    if (w && h) {
      this.setSize(w, h);
    }

    this._resize();
    return this;
  }

  /**
   * Sets the new dimension of the graph without repainting it. Use {@link Graph#resize} to perform the actual resizing of the graph.
   * @param {Number} [ width ] - The new width of the graph
   * @param {Number} [ height ] - The new height of the graph
   * @see Graph#setWidth
   * @see Graph#setHeight
   * @see Graph#resize
   */
  setSize(w: number, h: number) {
    this.setWidth(w, true);
    this.setHeight(h, true);
    this.getDrawingHeight();
    this.getDrawingWidth();
  }

  /**
   * Returns the width of the graph (set by setSize, setWidth or resize methods)
   * @return {Number} Width of the graph
   */
  getWidth() {
    return this.width;
  }

  /**
   * Returns the height of the graph (set by setSize, setHeight or resize methods)
   * @return {Number} Height of the graph
   */
  getHeight() {
    return this.height;
  }

  /**
   * Returns the top padding of the graph (space between the top of the svg container and the topmost axis)
   * @return {Number} paddingTop
   */
  getPaddingTop() {
    return this.options.paddingTop;
  }

  /**
   * Returns the left padding of the graph (space between the left of the svg container and the leftmost axis)
   * @return {Number} paddingTop
   */
  getPaddingLeft() {
    return this.options.paddingLeft;
  }

  /**
   * Returns the bottom padding of the graph (space between the bottom of the svg container and the bottommost axis)
   * @return {Number} paddingTop
   */
  getPaddingBottom() {
    return this.options.paddingBottom;
  }

  /**
   * Returns the right padding of the graph (space between the right of the svg container and the rightmost axis)
   * @return {Number} paddingRight
   */
  getPaddingRight() {
    return this.options.paddingRight;
  }

  /**
   * Returns the height of the drawable zone, including the space used by the axes
   * @param {Boolean} useCache - Use cached value. Useful if one is sure the graph hasn't changed dimension. Automatically called after a Graph.resize();
   * @returns {Number} Height of the graph
   */
  getDrawingHeight(useCache: boolean = true) {
    if (useCache && this.innerHeight) {
      return this.innerHeight;
    }
    return (this.innerHeight =
      this.height - this.options.paddingTop - this.options.paddingBottom);
  }

  /**
   * Returns the width of the drawable zone, including the space used by the axes
   * @param {Boolean} useCache - Use cached value. Useful if one is sure the graph hasn't changed dimension. Automatically called after a Graph.resize();
   * @returns {Number} Width of the graph
   */
  getDrawingWidth(useCache: boolean = true) {
    if (useCache && this.innerWidth) {
      return this.innerWidth;
    }
    return (this.innerWidth =
      this.width - this.options.paddingLeft - this.options.paddingRight);
  }

  /**
   * Caches the wrapper offset in the page.<br />
   * The position of the wrapper is used when processing most of mouse events and it is fetched via the jQuery function .offset().
   * If performance becomes a critical issue in your application, <code>cacheOffset()</code> should be used to store the offset position. It should be ensured that the graph doesn't move in the page. If one can know when the graph has moved, <code>cacheOffset()</code> should be called again to update the offset position.
   * @see Graph#uncacheOffset
   */
  cacheOffset() {
    this.offsetCached = util.getOffset(this.wrapper);
  }

  /**
   * Un-caches the wrapper offset value
   * @see Graph#cacheOffset
   */
  uncacheOffset() {
    this.offsetCached = false;
  }

  getNumAxes(position: AxisPosition) {
    return this.axis[position].length;
  }

  /**
   * Returns the x axis at a certain index. If any top axis exists and no bottom axis exists, returns or creates a top axis. Otherwise, creates or returns a bottom axis
   * Caution ! The <code>options</code> parameter will only be effective if an axis is created
   * @param {Number} [ index=0 ] - The index of the axis
   * @param {Object} [ options={} ] - The options to pass to the axis constructor
   */
  getXAxis(index: number = 0, options = {}) {
    if (this.axis[AxisPositionE.TOP].length > 0 && this.axis[AxisPositionE.BOTTOM].length == 0) {
      return this.getTopAxis(index, options);
    }

    return this.getBottomAxis(index, options);
  }

  /**
   * Returns the y axis at a certain index. If any right axis exists and no left axis exists, returns or creates a right axis. Otherwise, creates or returns a left axis
   * Caution ! The <code>options</code> parameter will only be effective if an axis is created
   * @param {Number} [ index=0 ] - The index of the axis
   * @param {Object} [ options={} ] - The options to pass to the axis constructor
   */
  getYAxis(index: number = 0, options = {}) {
    if (this.axis[AxisPositionE.RIGHT].length > 0 && this.axis[AxisPositionE.LEFT].length == 0) {
      return this.getRightAxis(index, options);
    }

    return this.getLeftAxis(index, options);
  }

  /**
   * Returns the top axis at a certain index. Creates it if non-existant
   * @param {Number} [ index=0 ] - The index of the axis
   * @param {Object} [ options={} ] - The options to pass to the axis constructor
   */
  getTopAxis(index: number = 0, options = {}) {
    return this._getAxis(index, options, AxisPositionE.TOP);
  }

  /**
   * Returns the bottom axis at a certain index. Creates it if non-existant
   * @param {Number} [ index=0 ] - The index of the axis
   * @param {Object} [ options={} ] - The options to pass to the axis constructor
   */
  getBottomAxis(index: number = 0, options = {}) {
    return this._getAxis(index, options, AxisPositionE.BOTTOM);
  }

  /**
   * Returns the left axis at a certain index. Creates it if non-existant
   * @param {Number} [ index=0 ] - The index of the axis
   * @param {Object} [ options={} ] - The options to pass to the axis constructor
   */
  getLeftAxis(index: number = 0, options = {}) {
    return this._getAxis(index, options, AxisPositionE.LEFT);
  }

  /**
   * Returns the right axis at a certain index. Creates it if non-existant
   * @param {Number} [ index=0 ] - The index of the axis
   * @param {Object} [ options={} ] - The options to pass to the axis constructor
   */
  getRightAxis(index: number = 0, options = {}) {
    return this._getAxis(index, options, AxisPositionE.RIGHT);
  }

  /**
   * Sets a bottom axis
   * @param {Axis} axis - The axis instance to set
   * @param {Number} [ index=0 ] - The index of the axis
   */
  setXAxis(axis: any, index: number) {
    this.setBottomAxis(axis, index);
  }

  /**
   * Sets a left axis
   * @param {Axis} axis - The axis instance to set
   * @param {Number} [ index=0 ] - The index of the axis
   */
  setYAxis(axis: any, index: number) {
    this.setLeftAxis(axis, index);
  }

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
  setLeftAxis(axis: any, index: number) {
    index = index || 0;

    if (this.axis[AxisPositionE.LEFT][index]) {
      this.axis[AxisPositionE.LEFT][index].kill();
    }
    this.axis[AxisPositionE.LEFT][index] = axis;
  }

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
  setRightAxis(axis: any, index: number) {
    index = index || 0;

    if (this.axis[AxisPositionE.RIGHT][index]) {
      this.axis[AxisPositionE.RIGHT][index].kill();
    }
    this.axis[AxisPositionE.RIGHT][index] = axis;
  }

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
  setTopAxis(axis: any, index: number) {
    index = index || 0;

    if (this.axis[AxisPositionE.TOP][index]) {
      this.axis[AxisPositionE.TOP][index].kill();
    }
    this.axis[AxisPositionE.TOP][index] = axis;
  }

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
  setBottomAxis(axis: any, index: number) {
    index = index || 0;

    if (this.axis[AxisPositionE.BOTTOM][index]) {
      this.axis[AxisPositionE.BOTTOM][index].kill();
    }
    this.axis[AxisPositionE.BOTTOM][index] = axis;
  }

  killAxis(axis: any, noRedraw = false, noSerieKill = false) {
    var index;

    if (axis.isX()) {
      if ((index = this.axis[AxisPositionE.BOTTOM].indexOf(axis)) > -1) {
        this.axis[AxisPositionE.BOTTOM].splice(index, 1);
      }

      if ((index = this.axis[AxisPositionE.TOP].indexOf(axis)) > -1) {
        this.axis[AxisPositionE.TOP].splice(index, 1);
      }

      if (!noSerieKill) {
        this.series.forEach((serie) => {
          if (serie.getXAxis() == axis) {
            serie.kill();
          }
        });
      }
    }

    if (axis.isY()) {
      if ((index = this.axis[AxisPositionE.LEFT].indexOf(axis)) > -1) {
        this.axis[AxisPositionE.LEFT].splice(index, 1);
      }

      if ((index = this.axis[AxisPositionE.RIGHT].indexOf(axis)) > -1) {
        this.axis[AxisPositionE.RIGHT].splice(index, 1);
      }

      if (!noSerieKill) {
        this.series.forEach((serie) => {
          if (serie.getYAxis() == axis) {
            serie.kill();
          }
        });
      }
    }

    this.axisGroup.removeChild(axis.group); // Removes all DOM
    this.groupPrimaryGrids.removeChild(axis.gridPrimary);
    this.groupSecondaryGrids.removeChild(axis.gridSecondary);

    if (!noRedraw) {
      this.draw(true);
    }
  }

  /**
   * Determines if an x axis belongs to the graph
   * @param {Axis} axis - The axis instance to check
   */
  hasXAxis(axis: any) {
    return this.hasTopAxis(axis) || this.hasBottomAxis(axis);
  }

  /**
   * Determines if an x axis belongs to the graph
   * @param {Axis} axis - The axis instance to check
   */
  hasYAxis(axis: any) {
    return this.hasLeftAxis(axis) || this.hasRightAxis(axis);
  }

  /**
   * Determines if an x axis belongs to top axes list of the graph
   * @param {Axis} axis - The axis instance to check
   */
  hasTopAxis(axis: any) {
    return this.hasAxis(axis, this.axis[AxisPositionE.TOP]);
  }

  /**
   * Determines if an x axis belongs to bottom axes list of the graph
   * @param {Axis} axis - The axis instance to check
   */
  hasBottomAxis(axis: any) {
    return this.hasAxis(axis, this.axis[AxisPositionE.BOTTOM]);
  }

  /**
   * Determines if a y axis belongs to left axes list of the graph
   * @param {Axis} axis - The axis instance to check
   */
  hasLeftAxis(axis: any) {
    return this.hasAxis(axis, this.axis[AxisPositionE.LEFT]);
  }

  /**
   * Determines if a y axis belongs to right axes list of the graph
   * @param {Axis} axis - The axis instance to check
   */
  hasRightAxis(axis: any) {
    return this.hasAxis(axis, this.axis[AxisPositionE.RIGHT]);
  }

  /**
   * Determines if an axis belongs to a list of axes
   * @param {Axis} axis - The axis instance to check
   * @param {Array} axisList - The list of axes to check
   * @private
   */
  hasAxis(axis: any, axisList: Array<any>) {
    for (var i = 0, l = axisList.length; i < l; i++) {
      if (axisList[i] == axis) {
        return true;
      }

      if (axisList[i].hasAxis(axis)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Autoscales the x and y axes of the graph.
   * Does not repaint the canvas
   * @return {Graph} The current graph instance
   */
  autoscaleAxes() {
    this._applyToAxes('setMinMaxToFitSeries', null, true, true);

    //this._applyToAxes( "scaleToFitAxis", [ this.getYAxis() ], false, true )
    // X is not always ascending...
    return this;
  }

  // See #138
  /**
   *  @alias Graph#autoscaleAxes
   */
  autoscale() {
    return this.autoscaleAxes();
  }

  // See #138
  /**
   *  @alias Graph#autoscaleAxes
   */
  autoScale() {
    return this.autoscaleAxes();
  }

  // See #138
  /**
   *  @alias Graph#autoscaleAxes
   */
  autoScaleAxes() {
    return this.autoscaleAxes();
  }

  // See #138
  /**
   *  Autoscales a particular axis
   *  @param {Axis} The axis to rescale
   *  @return {Graph} The current graph instance
   */
  autoScaleAxis(axis: any) {
    if (!axis) {
      return this;
    }

    axis.setMinMaxToFitSeries();
    return this;
  }

  gridsOff() {
    this._applyToAxes(
      (axis: any) => {
        axis.gridsOff();
      },
      undefined,
      true,
      true
    );
  }
  gridsOn() {
    this._applyToAxes(
      (axis: any) => {
        axis.gridsOn();
      },
      undefined,
      true,
      true
    );
  }

  /**
   * Sets the background color
   * @param {String} color - An SVG accepted color for the background
   * @return {Graph} The current graph instance
   */
  setBackgroundColor(color: string) {
    this.rectEvent.setAttribute('fill', color);
    return this;
  }

  getAxisState() {

    var state: Axes<[number, number]> = {
      [AxisPositionE.TOP]: [],
      [AxisPositionE.BOTTOM]: [],
      [AxisPositionE.LEFT]: [],
      [AxisPositionE.RIGHT]: []
    };

    for (let key in AxisPositionE) {

      // @ts-ignore
      const a = this.axis[key];
      const out: Array<[number, number]> = a.map(function (axis: any) {
        return [axis.getCurrentMin(), axis.getCurrentMax()];
      });


      // @ts-ignore
      state[key] = out;
    }
    return state;
  }

  setAxisState(state: Axes<[Number, Number]>) {
    var j, l;
    for (var i in state) {
      // @ts-ignore
      if (!this.axis[i]) {
        continue;
      }
      // @ts-ignore
      for (j = 0, l = state[i].length; j < l; j++) {
        // @ts-ignore
        if (!this.axis[i][j]) {
          continue;
        }
        // @ts-ignore
        this.axis[i][j].setCurrentMin(state[i][j][0]);
        // @ts-ignore
        this.axis[i][j].setCurrentMax(state[i][j][1]);
      }
    }

    this.draw();
  }

  saveAxisState(savedName: string) {
    this.savedAxisState = this.savedAxisState || {};
    this.savedAxisState[savedName] = this.getAxisState();
    return this;
  }

  recallAxisState(savedName: string) {
    if (this.savedAxisState[savedName]) {
      this.recallAxisState(this.savedAxisState[savedName]);
    }
    return this;
  }

  _applyToAxis(type: any) {
    switch (type) {
      case 'string':
        return (type: AxisPosition, func: any, params: any) => {
          //    params.splice(1, 0, type);

          for (var i = 0; i < this.axis[type].length; i++) {
            this.axis[type][i][func].apply(this.axis[type][i], params);
          }
        };

      case 'function':
        return (type: AxisPosition, func: any, params: any) => {
          for (var i = 0; i < this.axis[type].length; i++) {
            func.call(this, this.axis[type][i], type, params);
          }
        };

      default:
        throw new Error(
          'You must either execute a function or provide a string that registers a function'
        );
    }
  }

  /**
   * Calculates the minimal or maximal value of the axis. Currently, alias of getBoudaryAxisFromSeries
   */
  getBoundaryAxis(axis: any, minmax: any, usingZValues: any) {
    var valSeries = this.getBoundaryAxisFromSeries(axis, minmax, usingZValues);
    //  var valShapes = this.getBoundaryAxisFromShapes( axis, xy, minmax );

    return valSeries;
    //return Math[ minmax ]( valSeries, valShapes );
  }

  /**
   * Calculates the minimal or maximal value of the axis, based on the series that belong to it. The value is computed so that all series just fit in the value.
   * @memberof Graph.prototype
   * @param {Axis} axis - The axis for which the value should be computed
   * @param {minmax} minmax - The minimum or maximum to look for. "min" for the minimum, anything else for the maximum
   * @returns {Number} The minimimum or maximum of the axis based on its series
   */
  getBoundaryAxisFromSeries(axis: any, minmax: "min" | "max", usingZValues: boolean) {
    var min = minmax == 'min',
      val,
      func = axis.isX() ? ['getMinX', 'getMaxX'] : ['getMinY', 'getMaxY'],
      func2use = func[min ? 0 : 1],
      infinity2use = min ? +Infinity : -Infinity,
      serie,
      series,
      serieValue,
      i,
      l;

    val = infinity2use;
    series = this.getSeriesFromAxis(axis);

    for (i = 0, l = series.length; i < l; i++) {
      serie = series[i];

      if (!serie.isShown()) {
        continue;
      }

      serieValue = serie[func2use](usingZValues);
      val = Math[minmax](
        isNaN(val) ? infinity2use : val,
        isNaN(serieValue) ? infinity2use : serieValue
      );
    }

    return val;
  }

  /**
   *  Returns all the series associated to an axis
   *  @param {Axis} axis - The axis to which the series belong
   *  @returns {Serie[]} An array containing the list of series that belong to the axis
   */
  getSeriesFromAxis(axis: any) {
    var series = [],
      i = this.series.length - 1;

    for (; i >= 0; i--) {
      if (
        this.series[i].getXAxis() == axis ||
        this.series[i].getYAxis() == axis
      ) {
        series.push(this.series[i]);
      }
    }

    return series;
  }

  /**
   * Determines the maximum and minimum of each axes, based on {@link Graph#getBoundaryAxis}. It is usually called internally, but if the data of series has changed, called this function to make sure that minimum / maximum of the axes are properly updated.
   * @see Graph#getBoundaryAxis
   */
  updateDataMinMaxAxes(usingZValues: boolean) {
    var axisvars = ['bottom', 'top', 'left', 'right'],
      axis,
      j,
      l,
      i;

    for (let j in this.axis) {
      let j2 = j as AxisPosition;
      for (i = this.axis[j2].length - 1; i >= 0; i--) {
        axis = this.axis[j2][i];


        let min = this.getBoundaryAxis(
          this.axis[j2][i],
          'min',
          usingZValues
        );
        let max = this.getBoundaryAxis(
          this.axis[j2][i],
          'max',
          usingZValues
        );

        if (isFinite(max)) {
          axis.setMaxValueData(max);
        }
        if (isFinite(min)) {
          axis.setMinValueData(min);
        }
      }
    }
  }

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
  _applyToAxes(func: any, params: any, tb = false, lr = false) {
    var ax: Array<AxisPosition> = [],
      i = 0,
      l;

    if (tb || tb == undefined) {
      ax.push('top');
      ax.push('bottom');
    }
    if (lr || lr == undefined) {
      ax.push('left');
      ax.push('right');
    }

    for (l = ax.length; i < l; i++) {
      this._applyToAxis(typeof func).call(this, ax[i], func, params);
    }
  }

  /**
   * Axes can be dependant of one another (for instance for unit conversions)
   * Finds and returns all the axes that are linked to a specific axis. Mostly used internally.
   * @param {Axis} axis - The axis that links one or multiple other dependant axes
   * @returns {Axis[]} The list of axes linked to the axis passed as parameter
   */
  findAxesLinkedTo(axis: any) {
    var axes: Array<any> = [];
    this._applyToAxes(
      function (a: any) {
        if (a.linkedToAxis && a.linkedToAxis.axis == axis) {
          axes.push(a);
        }
      }, {},
      axis instanceof this.getConstructor('graph.axis.x'),
      axis instanceof this.getConstructor('graph.axis.y')
    );

    return axes;
  }

  _axisHasChanged(axis: any) {
    this._axesHaveChanged = true;
  }
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
  newSerie(name: string, options: any, type: SERIE_TYPE) {
    let serie;

    if (typeof options !== 'object' && !type) {
      type = options;
      options = {};
    }

    if (!type) {
      type = SERIE_TYPE.LINE;
    }

    if ((serie = this.getSerie(name))) {
      return serie;
    }

    let _c = this.getConstructor(type);
    serie = new _c(this, name, options);
    this.appendSerieToDom(serie);
    this.series.push(serie);

    this.emit('newSerie', serie);
    return serie;
  }
  /**
   * Looks for an existing serie by name or by index and returns it.
   * The index of the serie follows the creation sequence (0 for the first one, 1 for the second one, ...)
   * @param {(String|Number)} name - The name or the index of the serie
   * @returns {Serie}
   */
  getSerie(name: string | number | Function) {
    if (typeof name == 'number') {
      return this.series[name] || false;
    }

    if (typeof name == 'function') {
      name = name();
    }

    var i = 0,
      l = this.series.length;

    for (; i < l; i++) {
      if (this.series[i].getName() == name || this.series[i] == name) {
        return this.series[i];
      }
    }

    return false;
  }

  /**
   * Returns all the series
   * @returns {Serie[]} An array of all the series
   */
  getSeries() {
    return this.series;
  }

  /**
   * Returns all the series that correspond to one or multiple types
   * @param {...Symbol} type - The serie types to select
   * @returns {Serie[]} An array of all the series
   * @example graph.allSeries( Graph.SERIE_LINE, Graph.SERIE_ZONE );
   */
  allSeries(...types: SERIE_TYPE[]) {
    return this.series.filter((serie) => {
      return types.includes(serie.getType());
    });
  }

  /**
   * Sorts the series
   * @param {function} method - Sorting method (arguments: serieA, serieB)
   * @example graph.sortSeries( ( sA, sB ) => sA.label > sB.label ? 1 : -1 );
   */
  sortSeries(method: (a: any, b: any) => number) {
    this.series.sort(method);
    return this;
  }

  /**
   * Draws a specific serie
   * @param {Serie} serie - The serie to redraw
   * @param {Boolean} force - Forces redraw even if no data has changed
   */
  drawSerie(serie: any, force: boolean) {
    if (!serie.draw) {
      throw new Error('Serie has no method draw');
    }

    serie.draw(force);
  }

  /**
   * Redraws all visible series
   * @param {Boolean} force - Forces redraw even if no data has changed
   */
  drawSeries(force: boolean) {
    if (!this.width || !this.height) {
      return;
    }

    var i = this.series.length - 1;
    for (; i >= 0; i--) {
      if (this.series[i].isShown()) {
        this.drawSerie(this.series[i], force);
      }
    }
  }

  /**
   * @alias Graph#removeSeries
   */
  resetSeries() {
    this.removeSeries();
  }

  /**
   * @alias Graph#removeSeries
   */

  killSeries() {
    this.resetSeries();
  }

  killLegend() {
    if (this.legend) {
      this.legend.kill();
    }
    this.legend = undefined;
  }

  killShapes() {
    this.shapes.forEach((shape) => {
      shape.kill(false);
    });
  }

  /**
   * Removes all series from the graph
   */
  removeSeries() {
    while (this.series[0]) {
      this.series[0].kill(true);
    }
    this.series = [];

    if (this.legend) {
      this.legend.update();
    }
  }

  /**
   * Selects a serie. Only one serie per graph can be selected.
   * @param {Serie} serie - The serie to select
   * @param {String} selectName="selected" - The name of the selection
   */
  selectSerie(serie: any, selectName: string) {

    if (!(typeof serie == 'object')) {
      serie = this.getSerie(serie);
    }
    if (
      this.selectedSerie == serie &&
      this.selectedSerie.selectionType == selectName
    ) {
      return;
    }

    if (this.selectedSerie !== serie && this.selectedSerie) {
      this.unselectSerie(this.selectedSerie);
      return;
    }

    this.selectedSerie = serie;
    this.triggerEvent('onSelectSerie', serie);
    serie.select(selectName || 'selected');
  }

  /**
   * Returns the selected serie
   * @returns {(Serie|undefined)} The selected serie
   */
  getSelectedSerie() {
    return this.selectedSerie;
  }

  /**
   * Unselects a serie
   * @param {Serie} serie - The serie to unselect
   */
  unselectSerie(serie: any) {
    serie.unselect();
    this.selectedSerie = false;
    this.triggerEvent('onUnselectSerie', serie);
  }

  /**
   * Returns all the shapes associated to a serie. Shapes can (but don't have to) be associated to a serie. The position of the shape can then be relative to the same axes as the serie.
   * @param {Serie} serie - The serie containing the shapes
   * @returns {Shape[]} An array containing a list of shapes associated to the serie
   */
  getShapesOfSerie(serie: any) {
    var shapes = [];
    var i = this.shapes.length - 1;

    for (; i >= 0; i--) {
      if (this.shapes[i].getSerie() == serie) {
        shapes.push(this.shapes[i]);
      }
    }

    return shapes;
  }


  makeToolbar(toolbarData: any) {
    var _c = this.getConstructor('graph.toolbar');
    return (this.toolbar = new _c(this, toolbarData));
  }

  /**
   *  Returns all shapes from the graph
   */
  getShapes() {
    return this.shapes || [];
  }

  /**
   * Creates a new shape. jsGraph will look for the registered constructor "graph.shape.<shapeType>".
   * @param {String} shapeType - The type of the shape
   * @param {Object} [shapeData] - The options passed to the shape creator
   * @param {Boolean} [mute=false] - <code>true</code> to create the shape quietly
   * @param {Object} [shapeProperties] - The native object containing the shape properties in the jsGraph format (caution when using it)
   * @returns {Shape} The created shape
   * @see Graph#getConstructor
   */
  newShape(shapeType: string, shapeData: any, mute = false, shapeProperties: { simplified?: any } = {}) {
    this.prevent(false);

    if (!mute) {
      this.emit('beforeNewShape', shapeData);

      if (this.prevent(false)) {
        return false;
      }
    }
    // Backward compatibility
    if (typeof shapeType == 'object') {
      mute = shapeData;
      shapeData = shapeType;
      shapeType = shapeData.type;
    }

    shapeData = shapeData || {};
    shapeData._id = util.guid();

    var constructor;
    if (typeof shapeType == 'function') {
      constructor = shapeType;
    } else {
      constructor = this.getConstructor(`graph.shape.${shapeType}`);
    }

    if (!constructor) {
      return util.throwError('No constructor for this shape');
    }
    var shape = new constructor(this, shapeData);

    if (!shape) {
      return util.throwError('Failed to construct shape.');
    }

    shape.type = shapeType;
    shape.graph = this;
    shape._data = shapeData;
    if (shapeData.properties !== undefined) {
      shape.setProperties(shapeData.properties);
    }

    shape.init(
      this,
      shapeProperties,
      shapeProperties ? shapeProperties.simplified : false
    );

    if (shapeData.props !== undefined) {
      for (var p in shapeData.props) {
        shape.setProp(p, shapeData.props[p]);
      }
    }
    if (shapeData.position) {
      for (var i = 0, l = shapeData.position.length; i < l; i++) {
        shape.setPosition(new GraphPosition(shapeData.position[i]), i);
      }
    }
    /* Setting shape properties */
    if (shapeData.fillColor !== undefined) {
      shape.setFillColor(shapeData.fillColor);
    }

    if (shapeData.fillOpacity !== undefined) {
      shape.setFillOpacity(shapeData.fillOpacity);
    }

    if (shapeData.strokeColor !== undefined) {
      shape.setStrokeColor(shapeData.strokeColor);
    }

    if (shapeData.strokeWidth !== undefined) {
      shape.setStrokeWidth(shapeData.strokeWidth);
    }

    if (shapeData.layer !== undefined) {
      shape.setLayer(shapeData.layer);
    }

    if (shapeData.locked == true) {
      shape.lock();
    }

    if (shapeData.movable == true) {
      shape.movable();
    }

    if (shapeData.selectable == true) {
      shape.selectable();
    }

    if (shapeData.resizable == true) {
      shape.resizable();
    }

    if (shapeData.attributes !== undefined) {
      shape.setProp('attributes', shapeData.attributes);
    }

    if (shapeData.handles !== undefined) {
      shape.setProp('handles', shapeData.handles);
    }

    if (shapeData.selectOnMouseDown !== undefined) {
      shape.setProp('selectOnMouseDown', true);
    }

    if (shapeData.selectOnClick !== undefined) {
      shape.setProp('selectOnClick', true);
    }

    if (
      shapeData.transforms !== undefined &&
      Array.isArray(shapeData.transforms)
    ) {
      shapeData.transforms.forEach(({
        type,
        value
      }: { type: string, value: string }) => {
        shape.addTransform(type, value);
      });
    }

    if (shapeData.highlightOnMouseOver !== undefined) {
      shape.setProp('highlightOnMouseOver', true);
    }

    if (shapeData.labelEditable) {
      shape.setProp('labelEditable', shapeData.labelEditable);
    }

    if (shapeData.labels && !shapeData.label) {
      shapeData.label = shapeData.labels;
    }

    if (shapeData.label !== undefined) {
      if (!Array.isArray(shapeData.label)) {
        shapeData.label = [shapeData.label];
      }

      for (var i = 0, l = shapeData.label.length; i < l; i++) {
        shape.showLabel(i);
        shape.setLabelText(shapeData.label[i].text, i);
        shape.setLabelPosition(shapeData.label[i].position, i);
        shape.setLabelColor(shapeData.label[i].color || 'black', i);
        shape.setLabelSize(shapeData.label[i].size, i);
        shape.setLabelAngle(shapeData.label[i].angle || 0, i);
        shape.setLabelBaseline(shapeData.label[i].baseline || 'no-change', i);
        shape.setLabelAnchor(shapeData.label[i].anchor || 'start', i);
        shape.setLabelBackgroundColor(
          shapeData.label[i].backgroundColor || 'transparent',
          i
        );
        shape.setLabelBackgroundOpacity(
          shapeData.label[i].backgroundOpacity || 1,
          i
        );
      }
    }

    if (shapeData.serie) {
      shape.setSerie(this.getSerie(shapeData.serie));
    }
    shape.createHandles();
    shape.applyStyle();

    this.shapes.push(shape);

    if (!mute) {
      this.emit('newShape', shape, shapeData);
    }

    return shape;
  }

  /**
   * Creates a new position. Arguments are passed to the position constructor
   * @param {...*} varArgs
   * @see Position
   */
  newPosition() {
    return new GraphPosition(...arguments);

    // 18 September 2016 Norman: What is that ?
    //Array.prototype.unshift.call( arguments, null );
    //return new( Function.prototype.bind.apply( GraphPosition, arguments ) )();
  }

  /**
   *  Redraws all shapes. To be called if their definitions have changed
   */
  redrawShapes() {
    //this.graphingZone.removeChild(this.shapeZone);
    for (var i = 0, l = this.shapes.length; i < l; i++) {
      this.shapes[i].redraw();
    }
    //this.graphingZone.insertBefore(this.shapeZone, this.axisGroup);
  }

  /**
   *  Removes all shapes from the graph
   */
  removeShapes() {
    for (var i = 0, l = this.shapes.length; i < l; i++) {
      if (this.shapes[i] && this.shapes[i].kill) {
        this.shapes[i].kill(true);
      }
    }
    this.shapes = [];
  }

  /**
   * Selects a shape
   * @param {Shape} shape - The shape to select
   * @param {Boolean} mute - Select the shape quietly
   */
  selectShape(shape: any, mute: boolean) {
    // Already selected. Returns false

    if (!shape) {
      return;
    }

    if (this.selectedShapes.indexOf(shape) > -1) {
      return false;
    }

    if (!shape.isSelectable()) {
      return false;
    }

    if (!mute) {
      this.emit('beforeShapeSelect', shape);
    }

    if (this.prevent(false)) {
      return;
    }

    if (this.selectedShapes.length > 0 && this.options.shapesUniqueSelection) {
      // Only one selected shape at the time

      this.unselectShapes(mute);
    }

    shape._select(mute);
    this.selectedShapes.push(shape);

    if (!mute) {
      this.emit('shapeSelect', shape);
    }
  }

  getSelectedShapes() {
    return this.selectedShapes;
  }

  /**
   * Unselects a shape
   * @param {Shape} shape - The shape to unselect
   * @param {Boolean} mute - Unselect the shape quietly
   */
  unselectShape(shape: any, mute: boolean) {
    if (this.selectedShapes.indexOf(shape) == -1) {
      return;
    }

    if (!mute) {
      this.emit('beforeShapeUnselect', shape);
    }

    if (this.cancelUnselectShape) {
      this.cancelUnselectShape = false;
      return;
    }

    shape._unselect();

    this.selectedShapes.splice(this.selectedShapes.indexOf(shape), 1);

    if (!mute) {
      this.emit('shapeUnselect', shape);
    }
  }

  /**
   * Unselects all shapes
   * @param {Boolean} [ mute = false ] - Mutes all unselection events
   * @return {Graph} The current graph instance
   */
  unselectShapes(mute: boolean) {
    while (this.selectedShapes[0]) {
      this.unselectShape(this.selectedShapes[0], mute);
    }

    return this;
  }

  _removeShape(shape: any) {
    this.shapes.splice(this.shapes.indexOf(shape), 1);
  }

  appendShapeToDom(shape: any) {

    if (!this.wrapper) {
      return;
    }
    if (shape.isHTML()) {
      this.wrapper.insertBefore(shape._dom, this.dom);
    }

    this.getLayer(shape.getLayer(), 'shape').appendChild(
      shape.simplified ? shape._dom : shape.group
    );
  }

  removeShapeFromDom(shape: any) {

    if (!this.wrapper) {
      return;
    }
    if (shape.isHTML()) {
      this.wrapper.removeChild(shape._dom);
    }

    this.getLayer(shape.getLayer(), 'shape').removeChild(shape.group);
  }

  appendSerieToDom(serie: any) {
    this.getLayer(serie.getLayer(), 'serie').appendChild(serie.groupMain);
  }

  removeSerieFromDom(serie: any) {
    this.getLayer(serie.getLayer(), 'serie').removeChild(serie.groupMain);
  }

  getLayer(layer: any, mode: string) {
    if (!this.layers[layer]) {
      this.layers[layer] = [];

      this.layers[layer][0] = document.createElementNS(ns, 'g');
      this.layers[layer][0].setAttribute('data-layer', layer);
      this.layers[layer][1] = document.createElementNS(ns, 'g');
      this.layers[layer][2] = document.createElementNS(ns, 'g');

      this.layers[layer][0].appendChild(this.layers[layer][1]);
      this.layers[layer][0].appendChild(this.layers[layer][2]);

      var i = 1,
        prevLayer;

      while (!(prevLayer = this.layers[layer - i]) && layer - i >= 0) {
        i++;
      }

      if (!prevLayer) {
        this.plotGroup.insertBefore(
          this.layers[layer][0],
          this.plotGroup.firstChild
        );
      } else if (prevLayer.nextSibling) {
        this.plotGroup.insertBefore(
          this.layers[layer][0],
          prevLayer.nextSibling
        );
      } else {
        this.plotGroup.appendChild(this.layers[layer][0]);
      }
    }

    return this.layers[layer][mode == 'shape' ? 2 : 1];
  }

  focus() {
    if (!this.wrapper) {
      return;
    }
    this.wrapper.focus();
  }

  elementMoving(movingElement: any) {
    this.bypassHandleMouse = movingElement;
  }

  stopElementMoving(element: any) {
    if (element && element == this.bypassHandleMouse) {
      this.bypassHandleMouse = false;
    } else if (!element) {
      this.bypassHandleMouse = false;
    }
  }

  _makeClosingLines() {
    this.closingLines = {};
    var els = ['top', 'bottom', 'left', 'right'],
      i = 0,
      l = 4;
    for (; i < l; i++) {
      var line = document.createElementNS(ns, 'line');
      line.setAttribute('stroke', this.options.closeColor);
      line.setAttribute('shape-rendering', 'crispEdges');
      line.setAttribute('stroke-linecap', 'square');
      line.setAttribute('display', 'none');
      this.closingLines[els[i]] = line;
      this.graphingZone.appendChild(line);
    }
  }

  isActionAllowed(e: any, action: any) {
    if (
      action.type !== e.type &&
      (action.type !== undefined || e.type !== 'mousedown') &&
      !(
        (e.type === 'wheel' || e.type === 'mousewheel') &&
        action.type == 'mousewheel'
      )
    ) {
      return;
    }

    if (
      action.enabled &&
      (typeof action.enabled == 'function' ?
        !action.enabled(this) :
        !action.enabled)
    ) {
      return;
    }

    if (action.key) {
      if (action.key !== e.keyCode) {
        let keyCheck = {
          backspace: 8,
          enter: 13,
          tab: 9,
          shift: 16,
          ctrl: 17,
          alt: 18,
          pause: 19,
          escape: 27,
          up: 33,
          down: 34,
          left: 37,
          right: 39
        };

        if (Object.keys(keyCheck).includes(action.key) && keyCheck[action.key as keyof typeof keyCheck] !== e.keyCode) {
          return;
        }
      }
    }

    if (action.shift === undefined) {
      action.shift = false;
    }

    if (action.ctrl === undefined) {
      action.ctrl = false;
    }

    if (action.meta === undefined) {
      action.meta = false;
    }

    if (action.alt === undefined) {
      action.alt = false;
    }

    return (
      e.shiftKey == action.shift &&
      e.ctrlKey == action.ctrl &&
      e.metaKey == action.meta &&
      e.altKey == action.alt
    );
  }

  forcePlugin(plugin: any) {
    this.forcedPlugin = plugin;
  }

  unforcePlugin() {
    this.forcedPlugin = false;
  }

  _pluginsExecute(funcName: string, ...args: any[]) {
    //			Array.prototype.splice.apply(args, [0, 0, this]);

    for (var i in this.plugins) {
      if (this.plugins[i] && this.plugins[i][funcName]) {
        this.plugins[i][funcName].apply(this.plugins[i], args);
      }
    }
  }

  _pluginExecute(which: string, func: string, args: any[]) {
    //Array.prototype.splice.apply( args, [ 0, 0, this ] );
    if (!which) {
      return;
    }

    if (this.plugins[which] && this.plugins[which][func]) {
      this.plugins[which][func].apply(this.plugins[which], args);
      return true;
    }
  }

  pluginYieldActiveState() {
    this.activePlugin = undefined;
  }

  _serieExecute(serie: any, func: string, ...args: any[]) {
    if (typeof serie !== 'object') {
      serie = this.getSerie(serie);
    }

    if (typeof serie[func] == 'function') {
      serie.apply(serie, ...args);
    }
  }
  _pluginsInit() {
    var constructor, pluginName, pluginOptions;

    for (var i in this.options.plugins) {
      pluginName = i;
      pluginOptions = this.options.plugins[i];

      constructor = this.getConstructor(`graph.plugin.${pluginName}`);

      if (constructor) {
        //var options = util.extend( true, {}, constructor.defaults(), pluginOptions );
        this.plugins[pluginName] = new constructor(pluginOptions);

        util.mapEventEmission(
          this.plugins[pluginName].options,
          this.plugins[pluginName]
        );
        this.plugins[pluginName].init(this, pluginOptions);
      } else {
        util.throwError(`Plugin "${pluginName}" has not been registered`);
      }
    }
  }

  /**
   * Returns an initialized plugin
   * @param {String} pluginName
   * @returns {Plugin} The plugin which name is <pluginName>
   */
  getPlugin(pluginName: string) {
    var plugin = this.plugins[pluginName];

    if (!plugin) {
      return util.throwError(
        `Plugin "${pluginName}" has not been loaded or properly registered`
      );
    }

    return plugin;
  }

  hasPlugin(pluginName: string) {
    return !!this.plugins[pluginName];
  }

  triggerEvent(func: string, ...args: any[]) {

    if (typeof this.options[func] == 'function') {
      return this.options[func].apply(this, args);
    }
  }

  /**
   * Creates a legend. Only one legend is allowed per graph
   * @param {Object} options - The legend options
   */
  makeLegend(options: any) {
    if (this.legend) {
      return this.legend;
    }

    var constructor = this.getConstructor('graph.legend');
    if (constructor) {
      this.legend = new constructor(this, options);
    } else {
      return util.throwError(
        'Graph legend is not available as it has not been registered'
      );
    }

    return this.legend;
  }

  /**
   * Redraws the legend if it exists
   * @param {Boolean} [ onlyIfRequired = false ] ```true``` to redraw the legend only when it actually needs to be updated
   * @return {Graph} The graph instance
   */
  updateLegend(onlyIfRequired = false) {
    if (!this.legend) {
      return;
    }

    this.legend.update(onlyIfRequired);
    return this;
  }

  /**
   * @returns {Legend} The legend item
   */
  getLegend() {
    if (!this.legend) {
      return;
    }

    return this.legend;
  }

  requireLegendUpdate() {
    if (!this.legend) {
      return;
    }

    this.legend.requireDelayedUpdate();
  }

  orthogonalProjectionSetup() {
    this.options.zAxis = util.extend(true, {
      maxZ: 10,
      minZ: 0,
      shiftX: -25,
      shiftY: -15,
      xAxis: this.getXAxis(),
      yAxis: this.getYAxis()
    });
  }

  orthogonalProjectionUpdate() {
    if (!this.zAxis) {
      this.zAxis = {
        g: document.createElementNS(ns, 'g'),
        l: document.createElementNS(ns, 'line')
      };

      this.zAxis.g.appendChild(this.zAxis.l);
      this.groupGrids.appendChild(this.zAxis.g);
    }

    let refAxisX = this.options.zAxis.xAxis;
    let refAxisY = this.options.zAxis.yAxis;

    var x0 = refAxisX.getMinPx();
    var y0 = refAxisY.getMinPx();

    var dx = refAxisX.getZProj(this.options.zAxis.maxZ);
    var dy = refAxisY.getZProj(this.options.zAxis.maxZ);

    this.zAxis.l.setAttribute('stroke', 'black');
    this.zAxis.l.setAttribute('x1', x0);
    this.zAxis.l.setAttribute('x2', x0 + dx);
    this.zAxis.l.setAttribute('y1', y0);
    this.zAxis.l.setAttribute('y2', y0 + dy);

    this.updateDataMinMaxAxes(true);

    var sort = this.series.map((serie) => {
      return [serie.getZPos(), serie];
    });

    sort.sort((sa, sb) => {
      return sb[0] - sa[0];
    });

    let i = 0;
    sort.forEach((s) => {
      s[1].setLayer(i);
      this.appendSerieToDom(s[1]);
      i++;
    });

    this.drawSeries(true);
  }

  /**
   * Kills the graph
   **/
  kill() {

    if (this.wrapper) {
      this.wrapper.removeChild(this.dom);
    }
  }
  _removeSerie(serie: any) {
    this.series.splice(this.series.indexOf(serie), 1);
    this._pluginsExecute('serieRemoved', serie);
  }
  contextListen(target: any, menuElements: any, callback: any) {
    if (this.options.onContextMenuListen) {
      return this.options.onContextMenuListen(target, menuElements, callback);
    }
  }
  lockShapes() {
    this.shapesLocked = true;

    // Removes the current actions of the shapes
    for (var i = 0, l = this.shapes.length; i < l; i++) {
      this.shapes[i].moving = false;
      this.shapes[i].resizing = false;
    }
  }
  unlockShapes() {
    this.shapesLocked = false;
  }
  prevent(arg: any) {
    var curr = this.prevented;
    if (arg != -1) {
      this.prevented = arg == undefined || arg;
    }
    return curr;
  }
  _getXY(e: MouseEvent) {
    var x = e.clientX,
      y = e.clientY;

    var pos = this.offsetCached || util.getOffset(this.wrapper);

    x -= pos.left;
    y -= pos.top;

    return {
      x: x,
      y: y
    };
  }
  _resize() {
    if (!this.width || !this.height) {
      return;
    }

    this.getDrawingWidth(false);
    this.getDrawingHeight(false);

    this.sizeSet = true;
    this.dom.setAttribute('width', this.width);
    this.dom.setAttribute('height', this.height);
    this.domTitle.setAttribute('x', this.width / 2);

    this._sizeChanged = true;

    if (this.drawn) {
      this.requireLegendUpdate();
      this.draw(true);
    }
  }

  updateGraphingZone() {
    util.setAttributeTo(this.graphingZone, {
      transform: `translate(${this.options.paddingLeft}, ${this.options.paddingTop
        })`
    });

    this._sizeChanged = true;
  }

  // We have to proxy the methods in case they are called anonymously
  getDrawingSpaceWidth() {
    return () => this.drawingSpaceWidth;
  }

  getDrawingSpaceHeight() {
    return () => this.drawingSpaceHeight;
  }

  getDrawingSpaceMinX() {
    return () => this.drawingSpaceMinX;
  }

  getDrawingSpaceMinY() {
    return () => this.drawingSpaceMinY;
  }

  getDrawingSpaceMaxX() {
    return () => this.drawingSpaceMaxX;
  }

  getDrawingSpaceMaxY() {
    return () => this.drawingSpaceMaxY;
  }

  tracking(options: any) {
    // This is the new alias
    return this.trackingLine(options);
  }

  /**
   *  Enables the line tracking
   *  @param {Object|Boolean} options - Defines the tracking behavior. If a boolean, simply enables or disables the existing tracking.
   */
  trackingLine(options: any) {
    var self = this;

    if (typeof options === 'boolean') {
      if (this.options.trackingLine) {
        this.options.trackingLine.enable = options;
      }
      return;
    }

    if (options) {
      this.options.trackingLine = options;
    }

    // One can enable / disable the tracking
    options.enable = options.enable === undefined ? true : !!options.enable;

    // Treat the series
    const seriesSet = new Set();
    let backupSeries = [];
    // If we defined an array, let's save it
    if (Array.isArray(options.series)) {
      options.series.forEach((serie: any) => {
        seriesSet.add(this.getSerie(serie));
      });
    } else if (options.series == 'all') {
      this.allSeries().forEach((serie: any) => seriesSet.add(serie));
    }

    options.series = seriesSet;

    // Individual tracking
    if (options.mode == 'individual') {
      seriesSet.forEach((serie: any) => {
        self.addSerieToTrackingLine(serie, options.serieOptions);
      });
    } else {
      /*
      options.series.forEach( ( serie ) => {
        serie.serie.disableTracking();
      } );
*/
      if (options.noLine) {
        return;
      }

      if (!this.trackingLineShape) {
        // Avoid multiple creation of tracking lines

        // Creates a new shape called trackingLine, in the first layer (below everything)
        this.trackingLineShape = this.newShape(
          'line',
          util.extend(
            true, {
            position: [{
              y: 'min'
            },
            {
              y: 'max'
            }
            ],
            stroke: 'black',
            layer: -1
          },
            options.trackingLineShapeOptions
          )
        );
      }

      this.trackingLineShape.draw();

      // return this.trackingLineShape;
    }
    //return this.trackingObject;
  }

  addSerieToTrackingLine(serie: any, options: any = {}) {
    // Safeguard when claled externally
    if (!this.options.trackingLine) {
      this.trackingLine({
        mode: 'individual'
      });
    }

    this.options.trackingLine.series.add(serie);

    let serieShape;
    if (this.options.trackingLine.serieShape) {
      serieShape = this.options.trackingLine.serieShape;
    } else {
      serieShape = {
        shape: 'ellipse',
        properties: {
          rx: [`${serie.getLineWidth() * 3}px`],
          ry: [`${serie.getLineWidth() * 3}px`]
        }
      };
    }

    serie.options.tracking = Object.assign({}, options);

    if (!serie.trackingShape) {
      serie.trackingShape = this.newShape(
        serieShape.shape, {
        fillColor: serie.getLineColor(),
        strokeColor: 'White',
        strokeWidth: serie.getLineWidth()
      },
        true,
        serieShape.properties
      )
        .setSerie(serie)
        .forceParentDom(serie.groupMain)
        .draw();
    }
    /*
      serie.serie.trackingShape.show();
      serie.serie.trackingShape.getPosition( 0 ).x = index.xClosest;

      if ( serieShape.magnet ) {

        let magnetOptions = serieShape.magnet,
          val = magnetOptions.within,
          minmaxpos;

        if ( magnetOptions.withinPx ) {
          val = serie.serie.getXAxis().getRelVal( magnetOptions.withinPx );
        }

        if ( ( minmaxpos = serie.serie.findLocalMinMax( index.xClosest, val, magnetOptions.mode ) ) ) {

          serie.serie.trackingShape.getPosition( 0 ).x = minmaxpos;
        }
      }

      serie.serie.trackingShape.redraw();

*/

    /*  serie.enableTracking( ( serie, index, x, y ) => {

      if ( this.options.trackingLine.enable ) {

        if ( index ) {

          if ( this.trackingObject ) {

            this.trackingObject.show();
            this.trackingObject.getPosition( 0 ).x = index.trueX; //serie.getData()[ 0 ][ index.closestIndex * 2 ];
            this.trackingObject.getPosition( 1 ).x = index.trueX; //serie.getData()[ 0 ][ index.closestIndex * 2 ];
            this.trackingObject.redraw();
          }

          serie._trackingLegend = _trackingLegendSerie( this, {
            serie: serie
          }, x, y, serie._trackingLegend, options.textMethod ? options.textMethod : trackingLineDefaultTextMethod, index.trueX );

          if ( serie._trackingLegend ) {
            serie._trackingLegend.style.display = 'block';
          }
        }
      }
    }, ( serie ) => {

      if ( this.trackingObject ) {
        this.trackingObject.hide();
      }

      if ( serie.trackingShape ) {
        serie.trackingShape.hide();
      }

      if ( serie._trackingLegend ) {
        serie._trackingLegend.style.display = 'none';
      }

      serie._trackingLegend = _trackingLegendSerie( this, {
        serie: serie
      }, false, false, serie._trackingLegend, false, false );

    } );
*/
  }

  /**
   *  Pass here the katex.render method to be used later
   *   @param {Function} renderer -  katexRendered - renderer
   *   @return {Graph} The current graph instance
   */
  setKatexRenderer(renderer: any) {
    this._katexRenderer = renderer;
  }

  hasKatexRenderer() {
    return !!this._katexRenderer;
  }

  renderWithKatex(katexValue: any, katexElement: any) {
    if (this._katexRenderer) {
      if (katexElement) {
        katexElement.removeChild(katexElement.firstChild);
      } else {
        katexElement = document.createElementNS(ns, 'foreignObject');
      }

      let div = document.createElement('div');

      katexElement.appendChild(div);
      this._katexRenderer(katexValue, div);

      return katexElement;
    }

    return false;
  }

  exportToSchema() {
    let schema: any = {};

    schema.title = this.options.title;

    schema.width = this.getWidth();
    schema.height = this.getHeight();

    let axesPositions = ['top', 'bottom', 'left', 'right'];
    let axesExport: Array<any> = [];
    let allaxes: { x: Array<any>, y: Array<any> } = {
      x: [],
      y: []
    };

    for (let pos in this.axis) {

      axesExport = axesExport.concat(
        this.axis[pos as AxisPosition].map((axis) => {
          return {
            type: pos,
            label: axis.options.label,
            unit: axis.options.unit,
            min: axis.options.forcedMin,
            max: axis.options.forcedMax,
            flip: axis.options.flipped
          };
        })
      );


      if (pos == 'top' || pos == 'bottom') {
        allaxes.x = allaxes.x.concat(this.axis[pos as AxisPosition]);
      } else {
        allaxes.y = allaxes.y.concat(this.axis[pos as AxisPosition]);
      }
    }

    schema.axis = axesExport;

    let seriesExport: Array<any> = [];

    let toType = (type: SERIE_TYPE | string) => {
      switch (type) {
        case SERIE_TYPE.BAR:
          return 'bar';

        case SERIE_TYPE.LINE_COLORED:
          return 'color';

        case SERIE_TYPE.SCATTER:
          return 'scatter';

        default:
        case SERIE_TYPE.LINE:
          return 'line';
      }
    };

    let exportData = (serie: any, x: any) => {
      let data = [];

      switch (serie.getType()) {
        case Graph.SERIE_LINE:
          for (var i = 0; i < serie.data.length; i++) {
            for (var j = 0; j < serie.data[i].length - 1; j += 2) {
              data.push(
                serie.data[i][
                j +
                ((x && serie.isFlipped()) || (!x && !serie.isFlipped()) ?
                  1 :
                  0)
                ]
              );
            }
          }
          break;

        case Graph.SERIE_SCATTER:
          for (var j = 0; j < serie.data.length - 1; j += 2) {
            data.push(
              serie.data[
              j +
              ((x && serie.isFlipped()) || (!x && !serie.isFlipped()) ?
                1 :
                0)
              ]
            );
          }

          break;
      }

      return data;
    };

    schema.data = seriesExport.concat(
      this.series.map((serie: any) => {
        let style = [];
        let linestyle = [];

        if (serie.getType() == Graph.SERIE_LINE) {
          for (var stylename in serie.styles) {
            linestyle.push({
              styleName: stylename,
              color: serie.styles[stylename].lineColor,
              lineWidth: serie.styles[stylename].lineWidth,
              lineStyle: serie.styles[stylename].lineStyle
            });

            let styleObj = {
              styleName: stylename,
              styles: []
            };
            style.push(styleObj);

            styleObj.styles = styleObj.styles.concat(
              (serie.styles[stylename].markers || []).map((markers: any) => {
                return {
                  shape: markers.type,
                  zoom: markers.zoom,
                  lineWidth: markers.strokeWidth,
                  lineColor: markers.strokeColor,
                  color: markers.fillColor,
                  points: markers.points
                };
              })
            );
          }
        }

        return {
          label: serie.getLabel(),
          id: serie.getName(),
          type: toType(serie.getType()),
          x: exportData(serie, true),
          y: exportData(serie, false),
          xAxis: allaxes.x.indexOf(serie.getXAxis()),
          yAxis: allaxes.y.indexOf(serie.getYAxis()),
          style: style,
          lineStyle: linestyle
        };
      })
    );

    return schema;
  }






  private _getAxis(num: number, options: any, pos: AxisPosition) {
    var options = options || {};
    var inst;

    var _availableAxes = {
      def: {
        x: this.getConstructor('graph.axis.x'),
        y: this.getConstructor('graph.axis.y')
      },

      time: {
        x: this.getConstructor('graph.axis.x.time'),
        y: undefined
      },

      bar: {
        x: this.getConstructor('graph.axis.x.bar'),
        y: undefined
      }
    };

    let axisInstance;
    switch (options.type) {
      case 'time':
        axisInstance = _availableAxes.time;
        break;

      case 'bar':
        axisInstance = _availableAxes.bar;
        break;


      default:
        axisInstance = _availableAxes.def;
        break;
    }

    switch (pos) {
      case 'top':
      case 'bottom':
        inst = axisInstance.x;
        break;

      case 'left':
      case 'right':

        if (!axisInstance.hasOwnProperty('y')) {
          throw "Axis does not exist for axis y";
        }
        inst = axisInstance.y;
        break;

      default:
        return;
    }

    num = num || 0;

    if (typeof num == 'object') {
      options = num;
      num = 0;
    }

    if (!this.axis[pos as AxisPosition][num]) {
      // @ts-ignore
      this.axis[pos as AxisPosition][num] = new inst(this, pos, options);
      this.axis[pos as AxisPosition][num]!.init(this, options);
    }

    return this.axis[pos][num];
  }

  private _closeLine(mode: AxisPosition, x1: number, x2: number, y1: number, y2: number) {
    if (this.options.close === false) {
      return;
    }

    var l = 0;

    this.axis[mode].map(function (g) {
      if (g.isDisplayed() && !g.floating) {
        l++;
      }
    });

    if ((this.options.close === true || this.options.close[mode]) && l == 0) {
      this.closingLines[mode].setAttribute('display', 'block');
      this.closingLines[mode].setAttribute('x1', x1);
      this.closingLines[mode].setAttribute('x2', x2);
      this.closingLines[mode].setAttribute('y1', y1);
      this.closingLines[mode].setAttribute('y2', y2);
    } else {
      this.closingLines[mode].setAttribute('display', 'none');
    }
  }


  private refreshDrawingZone() {
    var shift: Axes<number> = {
      top: [],
      bottom: [],
      left: [],
      right: []
    };

    var levels: Axes<number> = {
      top: [],
      bottom: [],
      left: [],
      right: []
    };

    // Apply to top and bottom
    this._applyToAxes(
      function (axis: any, position: AxisPosition) {
        if (!axis.isShown()) {
          axis.hideGroup();
          return;
        } else {
          axis.showGroup();
        }

        if (axis.floating) {
          return;
        }

        var level = getAxisLevelFromSpan(axis.getSpan(), levels[position]);
        axis.setLevel(level);

        shift[position][level] = Math.max(
          axis.getAxisPosition(),
          shift[position][level] || 0
        );
      },
      false,
      true,
      false
    );

    var shiftTop = shift.top.reduce(function (prev, curr) {
      return prev + curr;
    }, 0);

    var shiftBottom = shift.bottom.reduce(function (prev, curr) {
      return prev + curr;
    }, 0);

    this.drawingSpaceHeight = this.getDrawingHeight(false) - shiftTop - shiftBottom;

    [shift.top, shift.bottom].map(function (arr) {
      arr.reduce(function (prev, current, index) {
        arr[index] = prev + current;
        return prev + current;
      }, 0);
    });

    // Apply to top and bottom
    this._applyToAxes(
      function (axis: any, position: AxisPosition) {
        if (!axis.isShown() || axis.floating) {
          return;
        }

        axis.setShift(shift[position][axis.getLevel()]);
      },
      false,
      true,
      false
    );

    // Applied to left and right
    this._applyToAxes(
      (axis: any, position: AxisPosition) => {
        if (!axis.isShown()) {
          axis.hideGroup();
          // Don't return here. We need to go through the draw method as the axis must be assigned minPx and maxPx values.
          // This is because some series can still be visible although the axis isn't.
        } else {
          axis.showGroup();
        }
        axis.setMinPx(shiftTop);
        axis.setMaxPx(this.getDrawingHeight(true) - shiftBottom);
        if (axis.floating) {
          return;
        }

        // First we need to draw it in order to determine the width to allocate
        // graph is done to accomodate 0 and 100000 without overlapping any element in the DOM (label, ...)

        // Let's not draw dependant axes yet
        let drawn = !axis.linkedToAxis ? axis.draw() : 0;

        if (!axis.isShown()) {
          return;
        }
        // Get axis position gives the extra shift that is common
        var level = getAxisLevelFromSpan(axis.getSpan(), levels[position]);
        axis.setLevel(level);

        if (axis.options.forcedWidth) {
          shift[position][level] = axis.options.forcedWidth;
        } else {
          shift[position][level] = Math.max(drawn, shift[position][level] || 0);

          if (level < shift[position].length - 1) {
            shift[position][level] += 10;
          }
        }
      },
      false,
      false,
      true
    );

    var shift2 = util.extend(true, {}, shift);

    // Applied to left and right
    this._applyToAxes(
      function (axis: any, position: AxisPosition) {
        if (!axis.isShown() || axis.floating) {
          return;
        }

        shift2[position][axis.getLevel()] = Math.max(
          shift[position][axis.getLevel()],
          axis.equalizePosition(shift[position][axis.getLevel()])
        );
      },
      false,
      false,
      true
    );

    shift = shift2;

    var shiftLeft = shift.left.reduce(function (prev, curr) {
      return prev + curr;
    }, 0);

    var shiftRight = shift.right.reduce(function (prev, curr) {
      return prev + curr;
    }, 0);

    this.drawingSpaceWidth = this.getDrawingWidth() - shiftLeft - shiftRight;

    [shift.left, shift.right].forEach(function (arr) {
      arr.reduce(function (prev, current, index) {
        arr[index] = prev + current;
        return prev + current;
      }, 0);
    });

    // Apply to left and right
    this._applyToAxes(
      (axis: any, position: AxisPosition) => {
        if (!axis.isShown() || axis.floating) {
          return;
        }
        axis.setShift(shift[position][axis.getLevel()]);
      },
      false,
      false,
      true
    );

    // Apply to top and bottom
    this._applyToAxes(
      (axis: any, position: AxisPosition) => {
        if (!axis.isShown()) {
          //      return;
        }

        axis.setMinPx(shiftLeft);
        axis.setMaxPx(this.getDrawingWidth(true) - shiftRight);

        if (axis.floating) {
          return;
        }

        if (!axis.linkedToAxis) {
          axis.draw();
        }
      },
      false,
      true,
      false
    );

    // Floating axes
    this._applyToAxes(
      function (axis: any, pos: AxisPosition) {
        if (!axis.floating) {
          return;
        }

        var floatingAxis = axis.getFloatingAxis();
        var floatingValue = axis.getFloatingValue();
        var floatingPx = floatingAxis.getPx(floatingValue);

        axis.setShift(floatingPx);

        if (!axis.linkedToAxis) {
          axis.draw();
        }
      },
      false,
      true,
      true
    );

    this._closeLine(
      'right',
      this.getDrawingWidth(true),
      this.getDrawingWidth(true),
      shiftTop,
      this.getDrawingHeight(true) - shiftBottom
    );
    this._closeLine(
      'left',
      0,
      0,
      shiftTop,
      this.getDrawingHeight(true) - shiftBottom
    );
    this._closeLine(
      'top',
      shiftLeft,
      this.getDrawingWidth(true) - shiftRight,
      0,
      0
    );
    this._closeLine(
      'bottom',
      shiftLeft,
      this.getDrawingWidth(true) - shiftRight,
      this.getDrawingHeight(true) - shiftBottom,
      this.getDrawingHeight(true) - shiftBottom
    );

    this.clipRect.setAttribute('y', shiftTop.toString());
    this.clipRect.setAttribute('x', shiftLeft.toString());
    this.clipRect.setAttribute(
      'width',
      (this.getDrawingWidth() - shiftLeft - shiftRight).toString()
    );
    this.clipRect.setAttribute(
      'height',
      (this.getDrawingHeight() - shiftTop - shiftBottom).toString()
    );

    this.rectEvent.setAttribute('y', shiftTop + this.getPaddingTop());
    this.rectEvent.setAttribute('x', shiftLeft + this.getPaddingLeft());

    this.rectEvent.setAttribute('width', this.drawingSpaceWidth);
    this.rectEvent.setAttribute('height', this.drawingSpaceHeight);

    this.drawingSpaceMinX = shiftLeft + this.getPaddingLeft(); // + "px";
    this.drawingSpaceMinY = shiftTop + this.getPaddingTop(); // + "px";
    this.drawingSpaceMaxX =
      this.getDrawingWidth() - shiftRight + this.getPaddingLeft(); // + "px";
    this.drawingSpaceMaxY =
      this.getDrawingHeight() - shiftBottom + this.getPaddingTop(); //  + "px";

    // Apply to top and bottom
    this._applyToAxes(
      function (axis: any, position: AxisPosition) {
        if (!axis.isShown()) {
          return;
        }

        axis.drawLines();
      },
      false,
      true,
      true
    );

    /**
      this.shapeZoneRect.setAttribute('x', shift[1]);
      this.shapeZoneRect.setAttribute('y', shift[2]);
      this.shapeZoneRect.setAttribute('width', this.getDrawingWidth() - shift[2] - shift[3]);
      this.shapeZoneRect.setAttribute('height', this.getDrawingHeight() - shift[1] - shift[0]);
    */
    //this.shift = shift;
    this.redrawShapes(); // Not sure this should be automatic here. The user should be clever.
  }





  /**
   * Registers a constructor to jsGraph. Constructors are used on a later basis by jsGraph to create series, shapes or plugins
   * @param {String} constructorName - The name of the constructor
   * @param {Function} constructor - The constructor method
   * @see Graph.getConstructor
   * @static
   */

  static _constructors: Map<constructorKey_t, _constructor> = new Map();

  static registerConstructor(constructorKey: constructorKey_t, constructor: _constructor) {
    if (Graph._constructors.has(constructorKey)) {
      return util.throwError(`Constructor ${constructorKey} already exists.`);
    }

    Graph._constructors.set(constructorKey, constructor);
  }

  /**
   * Returns a registered constructor
   * @param  constructorKey - The constructor name to look for
   * @returns The registered constructor
   * @throws Error
   * @see Graph.registerConstructor
   * @static
   */
  static getConstructor(constructorKey: constructorKey_t): _constructor {
    if (!Graph._constructors.has(constructorKey)) {
      throw new Error(`Constructor "${constructorKey}" doesn't exist`)
    }

    return Graph._constructors.get(constructorKey)!;
  }

  getConstructor(constructorKey: constructorKey_t): _constructor {
    return Graph.getConstructor(constructorKey);
  }

  static newWaveform() {
    return new Waveform(...arguments);
  }

  static waveform() {
    return new Waveform(...arguments);
  }

  static newWaveformHash() {
    return new WaveformHash(...arguments);
  }

  static waveformHash() {
    return new WaveformHash(...arguments);
  }


  static _styles: Map<string, SerieStyle> = new Map()
  static saveStyle(styleName: string, json: SerieStyle) {
    Graph._styles.set(styleName, json);
  }

  static getStyle(styleName: string) {
    return Graph._styles.get(styleName) || SERIE_DEFAULT_STYLE;
  }
}


function getAxisLevelFromSpan(span: any, level: any) {
  for (var i = 0, l = level.length; i < l; i++) {
    var possible = true;
    for (var k = 0, m = level[i].length; k < m; k++) {
      if (
        !(
          (span[0] < level[i][k][0] && span[1] < level[i][k][0]) ||
          (span[0] > level[i][k][1] && span[1] > level[i][k][1])
        )
      ) {
        possible = false;
      }
    }

    if (possible) {
      level[i].push(span);
      return i;
    }
  }

  level.push([span]);
  return level.length - 1;
}


function _handleKey(graph: Graph, event: any, type: any) {
  var self = graph;
  if (graph.forcedPlugin) {
    graph.activePlugin = graph.forcedPlugin;
    graph._pluginExecute(graph.forcedPlugin, type, [graph, event]);
    return;
  }

  checkKeyActions(graph, event, [graph, event], type);
}

// Similar to checkMouseActions
function checkKeyActions(graph: Graph, e: any, parameters: any, methodName: any) {
  var keyComb = graph.options.keyActions,
    i: number,
    l: number;

  for (i = 0, l = keyComb.length; i < l; i++) {
    if (keyComb[i].plugin) {
      // Is it a plugin ?

      if (
        graph.forcedPlugin == keyComb[i].plugin ||
        graph.isActionAllowed(e, keyComb[i])
      ) {
        if (keyComb[i].options) {
          parameters.push(keyComb[i].options);
        }

        graph.activePlugin = keyComb[i].plugin; // Lease the mouse action to the current action
        graph._pluginExecute(keyComb[i].plugin, methodName, parameters);

        e.preventDefault();
        e.stopPropagation();

        return true;
      }
    } else if (keyComb[i].callback && graph.isActionAllowed(e, keyComb[i])) {
      if (keyComb[i].options) {
        parameters.push(keyComb[i].options);
      }

      e.preventDefault();
      e.stopPropagation();

      keyComb[i].callback.apply(graph, parameters);
      return true;
    }

    if (
      keyComb[i].removeSelectedShape &&
      graph.isActionAllowed(e, keyComb[i])
    ) {
      e.preventDefault();
      e.stopPropagation();

      graph.selectedShapes.map((shape) => {
        shape.kill(keyComb[i].keepInDom);
      });
    }

    /* else if ( keyComb[ i ].series ) {

      var series;
      if ( keyComb[ i ].series === 'all' ) {
        series = graph.series;
      }

      if ( !Array.isArray( keyComb[ i ].series ) ) {
        series = [ series ];
      }

      if ( keyComb[ i ].options ) {
        parameters.push( keyComb[ i ].options );
      }

      for ( var j = 0; j < series.length; i++ ) {
        graph._serieExecute( series[ i ], methodName, parameters );
      }
      return true;
    }*/
  }

  return false;
}


function _handleMouseDown(graph: Graph, x: number, y: number, e: any) {
  var self = graph;

  if (graph.forcedPlugin) {
    graph.activePlugin = graph.forcedPlugin;
    graph._pluginExecute(graph.forcedPlugin, 'onMouseDown', [graph, x, y, e]);
    return;
  }

  if (graph.activePlugin) {
    graph.activePlugin = undefined;
  }

  checkMouseActions(graph, e, [graph, x, y, e], 'onMouseDown');
}

function _handleMouseMove(graph: Graph, x: number, y: number, e: any) {
  if (graph.bypassHandleMouse) {
    graph.bypassHandleMouse.handleMouseMove(e);
    return;
  }

  if (
    graph.activePlugin &&
    graph._pluginExecute(graph.activePlugin, 'onMouseMove', [graph, x, y, e])
  ) {
    return;
  }

  let xRef;
  let xOverwritePx = x;

  //			return;

  graph._applyToAxes(
    'handleMouseMove',
    [x - graph.options.paddingLeft, e],
    true,
    false
  );
  graph._applyToAxes(
    'handleMouseMove',
    [y - graph.options.paddingTop, e],
    false,
    true
  );

  if (!graph.activePlugin) {
    var index;

    // Takes care of the tracking line
    if (graph.options.trackingLine && graph.options.trackingLine.enable) {
      if (
        graph.options.trackingLine.mode == 'common' &&
        graph.options.trackingLine.snapToSerie
      ) {
        var snapToSerie = graph.options.trackingLine.snapToSerie;
        index = snapToSerie.handleMouseMove(false, true);

        if (graph.trackingLineShape) {
          if (!index) {
            graph.trackingLineShape.hide();
          } else {
            graph.trackingLineShape.show();

            graph.trackingLineShape.getPosition(0).x = index.xClosest;
            graph.trackingLineShape.getPosition(1).x = index.xClosest;
            graph.trackingLineShape.redraw();

            xRef = index.xClosest; //
            xOverwritePx =
              snapToSerie.getXAxis().getPx(index.xClosest) +
              graph.options.paddingLeft;
          }
        }

        var series = graph.options.trackingLine.series;

        /*
        // Gets a default value
        if ( !series ) {
          series = graph.getSeries();map( function( serie ) {
            return {
              serie: serie,
              withinPx: 20,
              withinVal: -1
            };
          } );
        }*/

        if (!series) {
          return;
        }

        if (!index) {
          return;
        }
        graph._trackingLegend = _trackingLegendSerie(
          graph,
          series,
          xOverwritePx,
          y,
          graph._trackingLegend/*,
          graph.options.trackingLine.textMethod ?
            graph.options.trackingLine.textMethod :
            trackingLineDefaultTextMethod,
          xRef*/
        );
      } else if (graph.options.trackingLine.mode == 'individual') {
        // Series looping

        const output: Array<{ serie: any, closestPoint: any }> = [];
        graph.options.trackingLine.series.forEach((serie: any) => {
          //        const index = serie.handleMouseMove( false, true );
          //console.log( index );

          if (!serie.options.tracking) {
            return;
          }

          const closestPoint = serie.getClosestPointToXY(
            serie.getXAxis().getMouseVal(),
            serie.getYAxis().getMouseVal(),
            serie.options.tracking.withinPx,
            serie.options.tracking.withinPx,
            serie.options.tracking.useAxis,
            true
          );

          // When all legends are in common mode, let's make sure we remove the serie-specific legend
          if (graph.options.trackingLine.legendType == 'common') {
            serie._trackingLegend = _trackingLegendSerie(
              graph,
              [],
              false,
              false,
              serie._trackingLegend
            );
          }

          // What happens if there is no point ?
          if (!closestPoint) {
            if (serie.trackingShape) {
              serie.trackingShape.hide();

              if (graph.options.trackingLine.legendType == 'independent') {
                serie._trackingLegend = _trackingLegendSerie(
                  graph,
                  [],
                  false,
                  false,
                  serie._trackingLegend
                );
              }
            }
          } else {
            // We found a point: happy !
            if (serie.trackingShape) {
              serie.trackingShape.show();

              serie.trackingShape.setPosition({
                x: closestPoint.xClosest,
                y: closestPoint.yClosest
              });

              serie.trackingShape.redraw();

              // If we want one legend per serie, then we got to show it
              if (graph.options.trackingLine.legendType == 'independent') {
                serie._trackingLegend = _trackingLegendSerie(
                  graph,
                  [{
                    serie: serie,
                    closestPoint: closestPoint
                  }],
                  x,
                  y,
                  serie._trackingLegend
                );
              }
              serie.emit('track', e, closestPoint);
            }
          }

          if (closestPoint)
            output.push({
              serie: serie,
              closestPoint: closestPoint
            });
        });

        if (graph.options.trackingLine.legendType == 'common') {
          graph._trackingLegend = _trackingLegendSerie(
            graph,
            output,
            x,
            y,
            graph._trackingLegend
          );
        } else {
          graph._trackingLegend = _trackingLegendSerie(
            graph,
            [],
            false,
            false,
            graph._trackingLegend
          );
        }
      }
    }
  }
  // End takes care of the tracking line

  if (graph.options.mouseMoveData) {
    const results: { [x: string]: any } = {};

    for (let i = 0; i < graph.series.length; i++) {
      let serie = graph.series[i];
      if (!serie.options.tracking) {
        console.warn('Tracking not enabled for this serie');
        continue;
      }
      results[graph.series[i].getName()] = graph.series[i].getClosestPointToXY(
        undefined,
        undefined,
        serie.options.tracking.withinPxX || 0,
        serie.options.tracking.withinPxY || 0,
        serie.options.tracking.useAxis,
        true
      );
    }

    if (typeof graph.options.mouseMoveData == 'function') {
      graph.options.mouseMoveData.call(graph, e, results);
    }

    graph.emit('mouseMoveData', e, results);
  }

  checkMouseActions(graph, e, [graph, x, y, e], 'onMouseMove');
}

function checkMouseActions(graph: Graph, e: any, parameters: any, methodName: string) {
  var keyComb = graph.options.mouseActions,
    i,
    l,
    executed = false;

  for (i = 0, l = keyComb.length; i < l; i++) {
    if (keyComb[i].plugin) {
      // Is it a plugin ?

      if (
        graph.forcedPlugin == keyComb[i].plugin ||
        graph.isActionAllowed(e, keyComb[i])
      ) {
        if (keyComb[i].options) {
          parameters.push(keyComb[i].options);
        }

        // Lease the mouse action to the current action
        // 25.10.2017: Except for mousewheel. See #111
        if (e.type !== 'wheel' && e.type !== 'mousewheel') {
          graph.activePlugin = keyComb[i].plugin;
        }

        graph._pluginExecute(keyComb[i].plugin, methodName, parameters);
        executed = true;
        continue;
      }
    } else if (keyComb[i].callback && graph.isActionAllowed(e, keyComb[i])) {
      if (keyComb[i].options) {
        parameters.push(keyComb[i].options);
      }

      keyComb[i].callback.apply(graph, parameters);
      executed = true;
      continue;
    } else if (keyComb[i].series) {
      var series;
      if (keyComb[i].series === 'all') {
        series = graph.series;
      } else if (!Array.isArray(keyComb[i].series)) {
        series = [series];
      } else {
        throw "Not implemented"
      }

      if (keyComb[i].options) {
        parameters.push(keyComb[i].options);
      }

      for (var j = 0; j < series.length; i++) {
        graph._serieExecute(series[i], methodName, parameters);
      }
      executed = true;
      continue;
    }
  }

  return executed;
}

/**
 *
 * @returns {DOMElement} legend - The legend element, or the newly created one if it didn't exist
 */
var _trackingLegendSerie = function (
  graph: Graph,
  seriesOutput: any,
  posXPx: any,
  posYPx: any,
  legend: any
) {
  const textMethod =
    graph.options.trackingLine.textMethod || trackingLineDefaultTextMethod;

  var justCreated = false;
  if (!legend && graph.options.trackingLine.legend) {
    justCreated = true;
    legend = _makeTrackingLegend(graph);
  }
  if (!graph.options.trackingLine.legend) {
    return;
  }

  if (seriesOutput.length == 0) {
    legend.style.display = 'none';
    return legend;
  } else {
    if (legend.style.display == 'none' || justCreated) {
      forceTrackingLegendMode(graph, legend, posXPx, posYPx, true);
    } else {
      _trackingLegendMove(graph, legend, posXPx, posYPx);
    }

    legend.style.display = 'block';
    var txt = textMethod(seriesOutput, undefined, posXPx, posYPx);

    legend.innerHTML = txt;

    //legend.innerHTML = textMethod( output, xValue, x, y );
  }

  return legend;
};

var forceTrackingLegendMode = function (graph: Graph, legend: any, toX: number, toY: number, skip: boolean) {
  var start = Date.now(),
    h = legend.offsetHeight,
    startX = parseInt(legend.style.marginLeft.replace('px', '') || 0, 10),
    startY = parseInt(legend.style.marginTop.replace('px', '') || 0, 10);

  toX =
    toX > graph.getWidth() / 2 ?
      toX - (toX % 10) - 20 - legend.offsetWidth :
      toX - (toX % 10) + 30;
  toY = toY - (toY % 10) + h / 2;

  if (skip) {
    legend.style.marginLeft = `${toX}px`;
    legend.style.marginTop = `${toY}px`;
    return;
  }

  function next() {
    var progress = (Date.now() - start) / 200;
    if (progress > 1) {
      progress = 1;
    }

    legend.style.marginLeft = `${(toX - startX) * progress + startX}px`;
    legend.style.marginTop = `${(toY - startY) * progress + startY}px`;

    if (progress < 1) {
      window.requestAnimationFrame(next);
    }
  }

  window.requestAnimationFrame(next);
};

var _trackingLegendMove = (...args: any[]) => {
  util.debounce(forceTrackingLegendMode, 50)(...args);
};

function _makeTrackingLegend(graph: Graph) {
  var group: HTMLDivElement = document.createElement('div');
  group.setAttribute('class', 'trackingLegend');
  group.style.position = 'absolute';
  group.style.borderRadius = '4px';
  group.style.boxShadow = '1px 1px 3px 0px rgba(100,100,100,0.6)';
  group.style.border = '2px solid #333333';
  group.style.backgroundColor = 'rgba(255, 255, 255, 0.5 )';
  group.style.pointerEvents = 'none';
  group.style.paddingTop = '5px';
  group.style.paddingBottom = '5px';
  group.style.paddingLeft = '10px';
  group.style.paddingRight = '10px';

  graph.getWrapper().insertBefore(group, graph.getDom());

  return group;
}

const trackingLineDefaultTextMethod = (output: any) => {
  let txt = '';
  for (var i in output) {
    if (!output[i].closestPoint) {
      continue;
    }

    txt += `${output[i].serie.getName()}: ${output[i].serie
      .getYAxis()
      .valueToHtml(output[i].closestPoint.yClosest, undefined, undefined, 2)}
      `;
  }
  return txt;
};

function _handleDblClick(graph: Graph, x: number, y: number, e: MouseEvent) {
  // var _x = x - graph.options.paddingLeft;
  // var _y = y - graph.options.paddingTop;
  //var pref = graph.options.dblclick;
  checkMouseActions(graph, e, [x, y, e], 'onDblClick');
  /*
      if ( !pref || !pref.type ) {
        return;
      }

      switch ( pref.type ) {

        case 'plugin':

          var plugin;

          if ( ( plugin = graph.plugins[ pref.plugin ] ) ) {

            plugin.onDblClick( graph, x, y, pref.options, e );
          }

          break;
      }*/
}

function _handleMouseUp(graph: Graph, x: number, y: number, e: MouseEvent) {
  if (graph.bypassHandleMouse) {
    graph.bypassHandleMouse.handleMouseUp(e);
    graph.activePlugin = undefined;
    return;
  }

  if (graph.activePlugin)
    graph._pluginExecute(graph.activePlugin, 'onMouseUp', [graph, x, y, e]);
  graph.activePlugin = undefined;
}

function _handleClick(graph: Graph, x: number, y: number, e: MouseEvent) {
  graph.emit('click', [graph, x, y, e]);
  // Not on a shape
  checkMouseActions(graph, e, [x, y, e], 'onClick');

  if (
    //@ts-ignore
    !e.target.jsGraphIsShape &&
    !graph.prevent(false) &&
    graph.options.shapesUnselectOnClick
  ) {
    graph.unselectShapes(false);
  }
}


function _handleMouseWheel(graph: Graph, delta: number, coordX: number, coordY: number, e: WheelEvent) {
  if (checkMouseActions(graph, e, [delta, e, coordX, coordY], 'onMouseWheel')) {
    e.preventDefault();
    e.stopPropagation();
  }
}

function _handleMouseLeave(graph: Graph) {
  if (graph.options.handleMouseLeave) {
    graph.options.handleMouseLeave.call(graph);
  }
}

function haveAxesChanged(graph: Graph) {
  var temp = graph._axesHaveChanged;
  graph._axesHaveChanged = false;
  return temp;
}

function hasSizeChanged(graph: Graph) {
  var temp = graph._sizeChanged;
  graph._sizeChanged = false;
  return temp;
}

GraphJSON(Graph);

export default Graph;