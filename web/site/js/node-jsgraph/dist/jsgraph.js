(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Graph"] = factory();
	else
		root["Graph"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, __webpack_require__(1), __webpack_require__(2), __webpack_require__(5), __webpack_require__(6), __webpack_require__(8), __webpack_require__(9), __webpack_require__(10), __webpack_require__(11), __webpack_require__(15), __webpack_require__(16), __webpack_require__(17), __webpack_require__(18), __webpack_require__(19), __webpack_require__(20), __webpack_require__(21), __webpack_require__(22), __webpack_require__(23), __webpack_require__(42), __webpack_require__(24), __webpack_require__(25), __webpack_require__(26), __webpack_require__(27), __webpack_require__(28), __webpack_require__(29), __webpack_require__(30), __webpack_require__(31), __webpack_require__(32), __webpack_require__(33), __webpack_require__(34), __webpack_require__(35), __webpack_require__(36), __webpack_require__(37), __webpack_require__(38), __webpack_require__(40), __webpack_require__(41)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(module, require('./graph.core'), require('./graph.position'), require('./graph.legend'), require('./graph.axis.x'), require('./graph.axis.y'), require('./graph.axis.x.bar'), require('./graph.axis.x.time'), require('./series/graph.serie.line'), require('./series/graph.serie.bar'), require('./series/graph.serie.box'), require('./series/graph.serie.line.colored'), require('./series/graph.serie.scatter'), require('./series/graph.serie.zone'), require('./series/graph.serie.densitymap'), require('./series/graph.serie.contour'), require('./shapes/graph.shape'), require('./shapes/graph.shape.areaundercurve'), require('./shapes/graph.shape.arrow'), require('./shapes/graph.shape.ellipse'), require('./shapes/graph.shape.label'), require('./shapes/graph.shape.polyline'), require('./shapes/graph.shape.line'), require('./shapes/graph.shape.nmrintegral'), require('./shapes/graph.shape.peakintegration2d'), require('./shapes/graph.shape.rect'), require('./shapes/graph.shape.cross'), require('./shapes/graph.shape.peakboundariescenter'), require('./plugins/graph.plugin'), require('./plugins/graph.plugin.drag'), require('./plugins/graph.plugin.shape'), require('./plugins/graph.plugin.selectScatter'), require('./plugins/graph.plugin.zoom'), require('./plugins/graph.plugin.timeseriemanager'), require('./plugins/graph.plugin.serielinedifference'), require('./plugins/graph.plugin.axissplitting'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod, global.graph, global.graph, global.graph, global.graphAxis, global.graphAxis, global.graphAxisX, global.graphAxisX, global.graphSerie, global.graphSerie, global.graphSerie, global.graphSerieLine, global.graphSerie, global.graphSerie, global.graphSerie, global.graphSerie, global.graph, global.graphShape, global.graphShape, global.graphShape, global.graphShape, global.graphShape, global.graphShape, global.graphShape, global.graphShape, global.graphShape, global.graphShape, global.graphShape, global.graph, global.graphPlugin, global.graphPlugin, global.graphPlugin, global.graphPlugin, global.graphPlugin, global.graphPlugin, global.graphPlugin);
	    global.graph = mod.exports;
	  }
	})(this, function (module, _graph, _graph3, _graph5, _graphAxis, _graphAxis3, _graphAxisX, _graphAxisX3, _graphSerie, _graphSerie3, _graphSerie5, _graphSerieLine, _graphSerie7, _graphSerie9, _graphSerie11, _graphSerie13, _graph7, _graphShape, _graphShape3, _graphShape5, _graphShape7, _graphShape9, _graphShape11, _graphShape13, _graphShape15, _graphShape17, _graphShape19, _graphShape21, _graph9, _graphPlugin, _graphPlugin3, _graphPlugin5, _graphPlugin7, _graphPlugin9, _graphPlugin11, _graphPlugin13) {
	  'use strict';

	  var _graph2 = _interopRequireDefault(_graph);

	  var _graph4 = _interopRequireDefault(_graph3);

	  var _graph6 = _interopRequireDefault(_graph5);

	  var _graphAxis2 = _interopRequireDefault(_graphAxis);

	  var _graphAxis4 = _interopRequireDefault(_graphAxis3);

	  var _graphAxisX2 = _interopRequireDefault(_graphAxisX);

	  var _graphAxisX4 = _interopRequireDefault(_graphAxisX3);

	  var _graphSerie2 = _interopRequireDefault(_graphSerie);

	  var _graphSerie4 = _interopRequireDefault(_graphSerie3);

	  var _graphSerie6 = _interopRequireDefault(_graphSerie5);

	  var _graphSerieLine2 = _interopRequireDefault(_graphSerieLine);

	  var _graphSerie8 = _interopRequireDefault(_graphSerie7);

	  var _graphSerie10 = _interopRequireDefault(_graphSerie9);

	  var _graphSerie12 = _interopRequireDefault(_graphSerie11);

	  var _graphSerie14 = _interopRequireDefault(_graphSerie13);

	  var _graph8 = _interopRequireDefault(_graph7);

	  var _graphShape2 = _interopRequireDefault(_graphShape);

	  var _graphShape4 = _interopRequireDefault(_graphShape3);

	  var _graphShape6 = _interopRequireDefault(_graphShape5);

	  var _graphShape8 = _interopRequireDefault(_graphShape7);

	  var _graphShape10 = _interopRequireDefault(_graphShape9);

	  var _graphShape12 = _interopRequireDefault(_graphShape11);

	  var _graphShape14 = _interopRequireDefault(_graphShape13);

	  var _graphShape16 = _interopRequireDefault(_graphShape15);

	  var _graphShape18 = _interopRequireDefault(_graphShape17);

	  var _graphShape20 = _interopRequireDefault(_graphShape19);

	  var _graphShape22 = _interopRequireDefault(_graphShape21);

	  var _graph10 = _interopRequireDefault(_graph9);

	  var _graphPlugin2 = _interopRequireDefault(_graphPlugin);

	  var _graphPlugin4 = _interopRequireDefault(_graphPlugin3);

	  var _graphPlugin6 = _interopRequireDefault(_graphPlugin5);

	  var _graphPlugin8 = _interopRequireDefault(_graphPlugin7);

	  var _graphPlugin10 = _interopRequireDefault(_graphPlugin9);

	  var _graphPlugin12 = _interopRequireDefault(_graphPlugin11);

	  var _graphPlugin14 = _interopRequireDefault(_graphPlugin13);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  // Corrent naming is important here !

	  _graph2.default.registerConstructor("graph.position", _graph4.default);

	  _graph2.default.registerConstructor("graph.axis.x", _graphAxis2.default);
	  _graph2.default.registerConstructor("graph.axis.y", _graphAxis4.default);
	  _graph2.default.registerConstructor("graph.axis.x.bar", _graphAxisX2.default);
	  _graph2.default.registerConstructor("graph.axis.x.time", _graphAxisX4.default);

	  _graph2.default.registerConstructor("graph.serie.line", _graphSerie2.default);
	  _graph2.default.registerConstructor("graph.serie.line.color", _graphSerieLine2.default);
	  _graph2.default.registerConstructor("graph.serie.contour", _graphSerie14.default);
	  _graph2.default.registerConstructor("graph.serie.bar", _graphSerie4.default);
	  _graph2.default.registerConstructor("graph.serie.box", _graphSerie6.default);
	  _graph2.default.registerConstructor("graph.serie.scatter", _graphSerie8.default);
	  _graph2.default.registerConstructor("graph.serie.zone", _graphSerie10.default);
	  _graph2.default.registerConstructor("graph.serie.densitymap", _graphSerie12.default);

	  _graph2.default.registerConstructor(_graph2.default.SERIE_LINE, _graphSerie2.default);
	  _graph2.default.registerConstructor(_graph2.default.SERIE_LINE_COLORED, _graphSerieLine2.default);
	  _graph2.default.registerConstructor(_graph2.default.SERIE_CONTOUR, _graphSerie14.default);
	  _graph2.default.registerConstructor(_graph2.default.SERIE_BAR, _graphSerie4.default);
	  _graph2.default.registerConstructor(_graph2.default.SERIE_BOX, _graphSerie6.default);
	  _graph2.default.registerConstructor(_graph2.default.SERIE_SCATTER, _graphSerie8.default);
	  _graph2.default.registerConstructor(_graph2.default.SERIE_ZONE, _graphSerie10.default);
	  _graph2.default.registerConstructor(_graph2.default.SERIE_DENSITYMAP, _graphSerie12.default);

	  //Graph.registerConstructor( "graph.serie.line.broken", GraphSerieLineBroken );

	  _graph2.default.registerConstructor("graph.plugin.shape", _graphPlugin4.default);
	  _graph2.default.registerConstructor("graph.plugin.drag", _graphPlugin2.default);
	  _graph2.default.registerConstructor("graph.plugin.zoom", _graphPlugin8.default);
	  _graph2.default.registerConstructor("graph.plugin.selectScatter", _graphPlugin6.default);
	  _graph2.default.registerConstructor("graph.plugin.timeSerieManager", _graphPlugin10.default);
	  _graph2.default.registerConstructor("graph.plugin.serielinedifference", _graphPlugin12.default);
	  _graph2.default.registerConstructor("graph.plugin.serieLineDifference", _graphPlugin12.default);
	  _graph2.default.registerConstructor("graph.plugin.axissplitting", _graphPlugin14.default);

	  _graph2.default.registerConstructor("graph.shape", _graph8.default);
	  _graph2.default.registerConstructor("graph.shape.areaundercurve", _graphShape2.default);
	  _graph2.default.registerConstructor("graph.shape.arrow", _graphShape4.default);
	  _graph2.default.registerConstructor("graph.shape.ellipse", _graphShape6.default);
	  _graph2.default.registerConstructor("graph.shape.label", _graphShape8.default);
	  _graph2.default.registerConstructor("graph.shape.polyline", _graphShape10.default);
	  _graph2.default.registerConstructor("graph.shape.line", _graphShape12.default);
	  _graph2.default.registerConstructor("graph.shape.nmrintegral", _graphShape14.default);
	  _graph2.default.registerConstructor("graph.shape.peakintegration2d", _graphShape16.default);
	  //  Graph.registerConstructor( "graph.shape.peakinterval", GraphShapePeakInterval );
	  //  Graph.registerConstructor( "graph.shape.peakinterval2", GraphShapePeakInterval2 );
	  //  Graph.registerConstructor( "graph.shape.rangex", GraphShapeRangeX );
	  _graph2.default.registerConstructor("graph.shape.rect", _graphShape18.default);
	  _graph2.default.registerConstructor("graph.shape.rectangle", _graphShape18.default);
	  _graph2.default.registerConstructor("graph.shape.cross", _graphShape20.default);
	  //Graph.registerConstructor( "graph.shape.zoom2d", GraphShapeZoom2D );
	  _graph2.default.registerConstructor("graph.shape.peakboundariescenter", _graphShape22.default);

	  //   Graph.registerConstructor( "graph.toolbar", GraphToolbar );
	  _graph2.default.registerConstructor("graph.legend", _graph6.default);

	  module.exports = _graph2.default;
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(2), __webpack_require__(3), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('./graph.position'), require('./graph.util'), require('./dependencies/eventEmitter/EventEmitter'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.graph, global.graph, global.EventEmitter);
	    global.graphCore = mod.exports;
	  }
	})(this, function (exports, _graph, _graph3, _EventEmitter) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _graph2 = _interopRequireDefault(_graph);

	  var util = _interopRequireWildcard(_graph3);

	  var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

	  function _interopRequireWildcard(obj) {
	    if (obj && obj.__esModule) {
	      return obj;
	    } else {
	      var newObj = {};

	      if (obj != null) {
	        for (var key in obj) {
	          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	        }
	      }

	      newObj.default = obj;
	      return newObj;
	    }
	  }

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

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

	    fontSize: 12,
	    fontFamily: 'Myriad Pro, Helvetica, Arial',

	    plugins: {},
	    pluginAction: {},
	    mouseActions: [],
	    wheel: {},
	    dblclick: {},

	    shapesUnselectOnClick: true,
	    shapesUniqueSelection: true
	  };

	  var _constructors = new Map();

	  /** 
	   * Entry class of jsGraph that creates a new graph.
	   * @extends EventEmitter
	   * @tutorial basic
	   */
	  class Graph extends _EventEmitter2.default {

	    /**
	     * Graph constructor
	     * @param {(HTMLElement|String)} wrapper - The DOM Wrapper element or the element ```id``` where it can be found
	     * @param {GraphOptions} [ options ] - The options of the graph
	     * @param {Object} [ axis ] - The list of axes
	     * @param {Array} axis.left - The list of left axes
	     * @param {Array} axis.bottom - The list of bottom axes
	     * @param {Array} axis.top - The list of top axes
	     * @param {Array} axis.right - The list of right axes
	     * @example var graph = new Graph("someDomID");
	     * @example var graph = new Graph("someOtherDomID", { title: 'Graph title', paddingRight: 100 } );
	     */
	    constructor(wrapper, options, axis) {

	      super();

	      /*
	        The unique ID of the graph
	        @name Graph#uniqueid
	        @type String
	      */
	      this._creation = util.guid();

	      if (typeof wrapper == "string") {
	        wrapper = document.getElementById(wrapper);
	      } else if (typeof wrapper.length == "number") {
	        wrapper = wrapper[0];
	      }

	      if (!wrapper) {
	        throw "The wrapper DOM element was not found.";
	      }

	      if (!wrapper.appendChild) {
	        throw "The wrapper appears to be an invalid HTMLElement";
	      }

	      wrapper.style['-webkit-user-select'] = 'none';
	      wrapper.style['-moz-user-select'] = 'none';
	      wrapper.style['-o-user-select'] = 'none';
	      wrapper.style['-ms-user-select'] = 'none';
	      wrapper.style['user-select'] = 'none';

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

	      this.prevented = false;

	      this.axis = {
	        left: [],
	        top: [],
	        bottom: [],
	        right: []
	      };

	      this.shapes = [];
	      this.shapesLocked = false;
	      this.plugins = {};

	      for (var i in this.options.pluginAction) {
	        this.options.pluginAction.plugin = i;
	        this.options.mouseActions.push(this.options.pluginAction);
	      }

	      this.selectedShapes = [];

	      this.ns = 'http://www.w3.org/2000/svg';
	      this.nsxlink = "http://www.w3.org/1999/xlink";
	      this.series = [];
	      this._dom = wrapper;
	      this._axesHaveChanged = true;

	      if (this.options.hasOwnProperty('padding') && util.isNumeric(this.options.padding)) {
	        this.options.paddingTop = this.options.paddingBottom = this.options.paddingLeft = this.options.paddingRight = this.options.padding;
	      }

	      // DOM
	      var wrapperStyle = getComputedStyle(wrapper);
	      var w = parseInt(wrapperStyle.width);
	      var h = parseInt(wrapperStyle.height);

	      this._doDom();

	      this.setSize(w, h);
	      this._resize();
	      _registerEvents(this);

	      this.currentAction = false;

	      // Load all axes
	      if (axis) {
	        for (var i in axis) {
	          for (var j = 0, l = axis[i].length; j < l; j++) {

	            switch (i) {

	              case 'top':
	                this.getTopAxis(j, axis[i][j]);
	                break;
	              case 'bottom':
	                this.getBottomAxis(j, axis[i][j]);
	                break;
	              case 'left':
	                this.getLeftAxis(j, axis[i][j]);
	                break;
	              case 'right':
	                this.getRightAxis(j, axis[i][j]);
	                break;
	            }
	          }
	        }
	      }

	      this._pluginsInit();
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
	    getId() {
	      return this._creation;
	    }

	    /** 
	     * Returns the graph wrapper element passed during the graph creation
	     * @public
	     * @return {HTMLElement} The DOM element wrapping the graph
	     */
	    getWrapper() {
	      return this._dom;
	    }

	    /**
	     * Sets an option of the graph
	     * @param {String} name - Option name
	     * @param value - New option value
	     * @returns {Graph} - Graph instance
	     */
	    setOption(name, val) {
	      this.options[name] = val;
	      return this;
	    }

	    /**
	     *  Sets the title of the graph
	     */
	    setTitle(title) {
	      this.options.title = title;
	      this.domTitle.textContent = title;
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

	    /**
	     * Calls a repaint of the container. Used internally when zooming on the graph, or when <code>.autoscaleAxes()</code> is called (see {@link Graph#autoscaleAxes}).<br />
	     * To be called after axes min/max are expected to have changed (e.g. after an <code>axis.zoom( from, to )</code>) has been called
	     * @param {Boolean} onlyIfAxesHaveChanged - Triggers a redraw only if min/max values of the axes have changed.
	     * @return {Boolean} if the redraw has been successful
	     */
	    redraw(onlyIfAxesHaveChanged) {

	      if (!this.width || !this.height) {
	        return;
	      }

	      if (!this.sizeSet) {
	        this._resize();
	        this.executeRedrawSlaves();
	        return true;
	      } else {

	        if (!onlyIfAxesHaveChanged || haveAxesChanged(this) || hasSizeChanged(this)) {
	          this.executeRedrawSlaves();
	          refreshDrawingZone(this);
	          return true;
	        }
	      }

	      this.executeRedrawSlaves(true);
	      return false;
	    }

	    executeRedrawSlaves(noLegend) {
	      this._pluginsExecute("preDraw");
	    }

	    /**
	     * Draw the graph and the series. This method will only redraw what is necessary. You may trust its use when you have set new data to series, changed serie styles or called for a zoom on an axis.
	     */
	    draw() {

	      this.updateLegend(true);
	      this.drawSeries(this.redraw(true));
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
	    setWidth(width, skipResize) {
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
	    setHeight(height, skipResize) {
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
	    resize(w, h) {
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
	    setSize(w, h) {
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
	    getDrawingHeight(useCache) {
	      if (useCache && this.innerHeight) {
	        return this.innerHeight;
	      }
	      return this.innerHeight = this.height - this.options.paddingTop - this.options.paddingBottom;
	    }

	    /**
	     * Returns the width of the drawable zone, including the space used by the axes
	     * @param {Boolean} useCache - Use cached value. Useful if one is sure the graph hasn't changed dimension. Automatically called after a Graph.resize();
	     * @returns {Number} Width of the graph
	     */
	    getDrawingWidth(useCache) {
	      if (useCache && this.innerWidth) {
	        return this.innerWidth;
	      }
	      return this.innerWidth = this.width - this.options.paddingLeft - this.options.paddingRight;
	    }

	    /**
	     * Caches the wrapper offset in the page.<br />
	     * The position of the wrapper is used when processing most of mouse events and it is fetched via the jQuery function .offset().
	     * If performance becomes a critical issue in your application, <code>cacheOffset()</code> should be used to store the offset position. It should be ensured that the graph doesn't move in the page. If one can know when the graph has moved, <code>cacheOffset()</code> should be called again to update the offset position.
	     * @see Graph#uncacheOffset
	     */
	    cacheOffset() {
	      this.offsetCached = util.getOffset(this._dom);
	    }

	    /**
	     * Un-caches the wrapper offset value
	     * @see Graph#cacheOffset
	     */
	    uncacheOffset() {
	      this.offsetCached = false;
	    }

	    /**
	     * Returns the x axis at a certain index. If any top axis exists and no bottom axis exists, returns or creates a top axis. Otherwise, creates or returns a bottom axis
	     * Caution ! The <code>options</code> parameter will only be effective if an axis is created
	     * @param {Number} [ index=0 ] - The index of the axis
	     * @param {Object} [ options={} ] - The options to pass to the axis constructor
	     */
	    getXAxis(index, options) {
	      if (this.axis.top.length > 0 && this.axis.bottom.length == 0) {
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
	    getYAxis(index, options) {

	      if (this.axis.right.length > 0 && this.axis.left.length == 0) {
	        return this.getRightAxis(index, options);
	      }

	      return this.getLeftAxis(index, options);
	    }

	    /**
	     * Returns the top axis at a certain index. Creates it if non-existant
	     * @param {Number} [ index=0 ] - The index of the axis
	     * @param {Object} [ options={} ] - The options to pass to the axis constructor
	     */
	    getTopAxis(index, options) {
	      return _getAxis(this, index, options, 'top');
	    }

	    /**
	     * Returns the bottom axis at a certain index. Creates it if non-existant
	     * @param {Number} [ index=0 ] - The index of the axis
	     * @param {Object} [ options={} ] - The options to pass to the axis constructor
	     */
	    getBottomAxis(index, options) {
	      return _getAxis(this, index, options, 'bottom');
	    }

	    /**
	     * Returns the left axis at a certain index. Creates it if non-existant
	     * @param {Number} [ index=0 ] - The index of the axis
	     * @param {Object} [ options={} ] - The options to pass to the axis constructor
	     */
	    getLeftAxis(index, options) {
	      return _getAxis(this, index, options, 'left');
	    }

	    /**
	     * Returns the right axis at a certain index. Creates it if non-existant
	     * @param {Number} [ index=0 ] - The index of the axis
	     * @param {Object} [ options={} ] - The options to pass to the axis constructor
	     */
	    getRightAxis(index, options) {
	      return _getAxis(this, index, options, 'right');
	    }

	    /**
	     * Sets a bottom axis
	     * @param {Axis} axis - The axis instance to set
	     * @param {Number} [ index=0 ] - The index of the axis
	     */
	    setXAxis(axis, index) {
	      this.setBottomAxis(axis, index);
	    }

	    /**
	     * Sets a left axis
	     * @param {Axis} axis - The axis instance to set
	     * @param {Number} [ index=0 ] - The index of the axis
	     */
	    setYAxis(axis, index) {
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
	    setLeftAxis(axis, index) {
	      index = index || 0;

	      if (this.axis.left[index]) {
	        this.axis.left[index].kill();
	      }
	      this.axis.left[index] = axis;
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
	    setRightAxis(axis, index) {
	      index = index || 0;

	      if (this.axis.right[index]) {
	        this.axis.right[index].kill();
	      }
	      this.axis.right[index] = axis;
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
	    setTopAxis(axis, index) {
	      index = index || 0;

	      if (this.axis.top[index]) {
	        this.axis.top[index].kill();
	      }
	      this.axis.top[index] = axis;
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
	    setBottomAxis(axis, index) {
	      index = index || 0;

	      if (this.axis.bottom[index]) {
	        this.axis.bottom[index].kill();
	      }
	      this.axis.bottom[index] = axis;
	    }

	    killAxis(axis, noRedraw = false, noSerieKill = false) {

	      var index;

	      if (axis.isX()) {

	        if ((index = this.axis.bottom.indexOf(axis)) > -1) {
	          this.axis.bottom.splice(index, 1);
	        }

	        if ((index = this.axis.top.indexOf(axis)) > -1) {
	          this.axis.top.splice(index, 1);
	        }

	        if (!noSerieKill) {
	          this.series.map(serie => {

	            if (serie.getXAxis() == axis) {
	              serie.kill();
	            }
	          });
	        }
	      }

	      if (axis.isY()) {

	        if ((index = this.axis.left.indexOf(axis)) > -1) {
	          this.axis.left.splice(index, 1);
	        }

	        if ((index = this.axis.right.indexOf(axis)) > -1) {
	          this.axis.right.splice(index, 1);
	        }

	        if (!noSerieKill) {
	          this.series.map(serie => {

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
	    hasXAxis(axis) {
	      return this.hasTopAxis(axis) || this.hasBottomAxis(axis);
	    }

	    /**
	     * Determines if an x axis belongs to the graph
	     * @param {Axis} axis - The axis instance to check
	     */
	    hasYAxis(axis) {
	      return this.hasLeftAxis(axis) || this.hasRightAxis(axis);
	    }

	    /**
	     * Determines if an x axis belongs to top axes list of the graph
	     * @param {Axis} axis - The axis instance to check
	     */
	    hasTopAxis(axis) {
	      return this.hasAxis(axis, this.axis.top);
	    }

	    /**
	     * Determines if an x axis belongs to bottom axes list of the graph
	     * @param {Axis} axis - The axis instance to check
	     */
	    hasBottomAxis(axis) {
	      return this.hasAxis(axis, this.axis.bottom);
	    }

	    /**
	     * Determines if a y axis belongs to left axes list of the graph
	     * @param {Axis} axis - The axis instance to check
	     */
	    hasLeftAxis(axis) {
	      return this.hasAxis(axis, this.axis.left);
	    }

	    /**
	     * Determines if a y axis belongs to right axes list of the graph
	     * @param {Axis} axis - The axis instance to check
	     */
	    hasRightAxis(axis) {
	      return this.hasAxis(axis, this.axis.right);
	    }

	    /**
	     * Determines if an axis belongs to a list of axes
	     * @param {Axis} axis - The axis instance to check
	     * @param {Array} axisList - The list of axes to check
	     * @private
	     */
	    hasAxis(axis, axisList) {
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
	     * Autoscales the x and y axes of the graph<br />
	     * Repains the canvas
	     */
	    autoscaleAxes() {

	      this._applyToAxes("setMinMaxToFitSeries", null, true, true);

	      //this._applyToAxes( "scaleToFitAxis", [ this.getYAxis() ], false, true )
	      // X is not always ascending... 
	    }

	    /**
	     * Sets the background color
	     * @param {String} color - An SVG accepted color for the background
	     * @return {Graph} The current graph instance
	     */
	    setBackgroundColor(color) {

	      this.rectEvent.setAttribute('fill', color);
	      return this;
	    }
	    getAxisState() {

	      var state = {};
	      for (var i in this.axis) {
	        state[i] = this.axis[i].map(function (axis) {
	          return [axis.getCurrentMin(), axis.getCurrentMax()];
	        });
	      }
	      return state;
	    }
	    setAxisState(state) {

	      var j, l;
	      for (var i in state) {

	        if (!this.axis[i]) {
	          continue;
	        }

	        for (j = 0, l = state[i].length; j < l; j++) {

	          if (!this.axis[i][j]) {
	            continue;
	          }

	          this.axis[i][j].setCurrentMin(state[i][j][0]);
	          this.axis[i][j].setCurrentMax(state[i][j][1]);
	        }
	      }

	      this.draw();
	    }
	    saveAxisState(savedName) {
	      this.savedAxisState = this.savedAxisState || {};
	      this.savedAxisState[savedName] = this.getAxisState();
	      return this;
	    }
	    recallAxisState(stateName) {
	      if (this.savedAxisState[savedName]) {
	        this.recallAxisState(this.savedAxisState[savedName]);
	      }
	      return this;
	    }

	    _applyToAxis(type) {

	      switch (type) {

	        case 'string':
	          return function (type, func, params) {
	            //    params.splice(1, 0, type);

	            for (var i = 0; i < this.axis[type].length; i++) {
	              this.axis[type][i][func].apply(this.axis[type][i], params);
	            }
	          };
	          break;

	        case 'function':
	          return function (type, func, params) {
	            for (var i = 0; i < this.axis[type].length; i++) {
	              func.call(this, this.axis[type][i], type, params);
	            }
	          };
	          break;
	      }
	    }

	    /**
	     * Calculates the minimal or maximal value of the axis. Currently, alias of getBoudaryAxisFromSeries
	     */
	    getBoundaryAxis(axis, minmax) {

	      var valSeries = this.getBoundaryAxisFromSeries(axis, minmax);
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
	    getBoundaryAxisFromSeries(axis, minmax) {

	      var min = minmax == 'min',
	          val,
	          func = axis.isX() ? ['getMinX', 'getMaxX'] : ['getMinY', 'getMaxY'],
	          func2use = func[min ? 0 : 1],
	          infinity2use = min ? +Infinity : -Infinity,
	          currentSerie,
	          serie,
	          series,
	          serieValue,
	          i,
	          l;

	      val = min ? Number.MAX_SAFE_INTEGER : Number.MIN_SAFE_INTEGER;
	      series = this.getSeriesFromAxis(axis, true);

	      for (i = 0, l = series.length; i < l; i++) {

	        serie = series[i];

	        if (!serie.isShown()) {
	          continue;
	        }

	        serieValue = serie[func2use]();

	        val = Math[minmax](isNaN(val) ? infinity2use : val, isNaN(serieValue) ? infinity2use : serieValue);
	      }

	      return val;
	    }

	    /**
	     *  Returns all the series associated to an axis
	     *  @param {Axis} axis - The axis to which the series belong
	     *  @returns {Serie[]} An array containing the list of series that belong to the axis
	     */
	    getSeriesFromAxis(axis) {
	      var series = [],
	          i = this.series.length - 1;
	      for (; i >= 0; i--) {
	        if (this.series[i].getXAxis() == axis || this.series[i].getYAxis() == axis) {
	          series.push(this.series[i]);
	        }
	      }

	      return series;
	    }

	    /**
	     * Determines the maximum and minimum of each axes, based on {@link Graph#getBoundaryAxis}. It is usually called internally, but if the data of series has changed, called this function to make sure that minimum / maximum of the axes are properly updated.
	     * @see Graph#getBoundaryAxis
	     */
	    updateDataMinMaxAxes() {

	      var axisvars = ['bottom', 'top', 'left', 'right'],
	          axis,
	          j,
	          l,
	          i,
	          xy;

	      for (j = 0, l = axisvars.length; j < l; j++) {

	        for (i = this.axis[axisvars[j]].length - 1; i >= 0; i--) {

	          axis = this.axis[axisvars[j]][i];
	          xy = j < 2 ? 'x' : 'y';

	          if (axis.disabled) {
	            continue;
	          }

	          //console.log( axisvars[ j ], this.getBoundaryAxisFromSeries( this.axis[ axisvars[ j ] ][ i ], xy, 'min'), this.getBoundaryAxisFromSeries( this.axis[ axisvars[ j ] ][ i ], xy, 'max') );

	          axis.setMinValueData(this.getBoundaryAxis(this.axis[axisvars[j]][i], 'min'));
	          axis.setMaxValueData(this.getBoundaryAxis(this.axis[axisvars[j]][i], 'max'));
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
	    _applyToAxes(func, params, tb, lr) {

	      var ax = [],
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
	    findAxesLinkedTo(axis) {

	      var axes = [];
	      this._applyToAxes(function (a) {

	        if (a.linkedToAxis && a.linkedToAxis.axis == axis) {
	          axes.push(a);
	        }
	      }, {}, axis instanceof this.getConstructor("graph.axis.x"), axis instanceof this.getConstructor("graph.axis.y"));

	      return axes;
	    }
	    _axisHasChanged(axis) {
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
	    newSerie(name, options, type) {

	      if (!type) {
	        type = Graph.SERIE_LINE;
	      }

	      var serie;
	      if (serie = this.getSerie(name)) {
	        return serie;
	      }

	      if (!(serie = makeSerie(this, name, options, type))) {
	        return;
	      };

	      this.series.push(serie);
	      //    this.updateLegend();

	      this.emit("newSerie", serie);
	      return serie;
	    }

	    /** 
	     * Looks for an existing serie by name or by index and returns it.
	     * The index of the serie follows the creation sequence (0 for the first one, 1 for the second one, ...)
	     * @param {(String|Number)} name - The name or the index of the serie
	     * @returns {Serie}
	     */
	    getSerie(name) {

	      if (typeof name == 'number') {
	        return this.series[name] || false;
	      }
	      var i = 0,
	          l = this.series.length;

	      for (; i < l; i++) {

	        if (this.series[i].getName() == name) {

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
	     * Draws a specific serie
	     * @param {Serie} serie - The serie to redraw
	     * @param {Boolean} force - Forces redraw even if no data has changed
	     */
	    drawSerie(serie, force) {

	      if (!serie.draw) {
	        throw "Serie has no method draw";
	      }

	      serie.draw(force);
	    }

	    /**
	     * Redraws all visible series
	     * @param {Boolean} force - Forces redraw even if no data has changed
	     */
	    drawSeries(force) {

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
	    selectSerie(serie, selectName) {

	      if (!(typeof serie == "object")) {
	        serie = this.getSerie(serie);
	      }

	      if (this.selectedSerie == serie && this.selectedSerie.selectionType == selectName) {
	        return;
	      }

	      if (this.selectedSerie !== serie) {
	        this.unselectSerie(serie);
	      }

	      this.selectedSerie = serie;
	      this.triggerEvent('onSelectSerie', serie);

	      serie.select(selectName || "selected");
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
	    unselectSerie(serie) {
	      serie.unselect();
	      this.selectedSerie = false;
	      this.triggerEvent('onUnselectSerie', serie);
	    }

	    /**
	     * Returns all the shapes associated to a serie. Shapes can (but don't have to) be associated to a serie. The position of the shape can then be relative to the same axes as the serie.
	     * @param {Serie} serie - The serie containing the shapes
	     * @returns {Shape[]} An array containing a list of shapes associated to the serie
	     */
	    getShapesOfSerie(serie) {

	      var shapes = [];
	      var i = this.shapes.length - 1;

	      for (; i >= 0; i--) {

	        if (this.shapes[i].getSerie() == serie) {
	          shapes.push(this.shapes[i]);
	        }
	      }

	      return shapes;
	    }
	    makeToolbar(toolbarData) {

	      var constructor = this.getConstructor("graph.toolbar");
	      if (constructor) {
	        return this.toolbar = new constructor(this, toolbarData);
	      } else {
	        return util.throwError("No constructor exists for toolbar");
	      }
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
	    newShape(shapeType, shapeData, mute, shapeProperties) {

	      var self = this,
	          response;

	      if (!mute) {

	        this.emit('beforeNewShape', shapeData);

	        if (this.prevent(false)) {
	          return false;
	        }
	      }

	      // Backward compatibility
	      if (typeof shapeType == "object") {
	        mute = shapeData;
	        shapeData = shapeType;
	        shapeType = shapeData.type;
	      }

	      shapeData = shapeData || {};
	      shapeData._id = util.guid();

	      var constructor;
	      if (typeof shapeType == "function") {
	        constructor = shapeType;
	      } else {
	        constructor = this.getConstructor("graph.shape." + shapeType);
	      }

	      if (!constructor) {
	        return util.throwError("No constructor for this shape");
	      }

	      var shape = new constructor(this, shapeData);

	      if (!shape) {
	        return util.throwError("Failed to construct shape.");
	      }

	      shape.type = shapeType;
	      shape.graph = this;
	      shape._data = shapeData;

	      shape.init(this, shapeProperties);

	      if (shapeData.position) {

	        for (var i = 0, l = shapeData.position.length; i < l; i++) {
	          shape.setPosition(new _graph2.default(shapeData.position[i]), i);
	        }
	      }

	      if (shapeData.properties !== undefined) {
	        shape.setProperties(shapeData.properties);
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
	        shape.setProp("attributes", shapeData.attributes);
	      }

	      if (shapeData.handles !== undefined) {
	        shape.setProp('handles', shapeData.handles);
	      }

	      if (shapeData.selectOnMouseDown !== undefined) {
	        shape.setProp("selectOnMouseDown", true);
	      }

	      if (shapeData.selectOnClick !== undefined) {
	        shape.setProp("selectOnClick", true);
	      }

	      if (shapeData.highlightOnMouseOver !== undefined) {
	        shape.setProp("highlightOnMouseOver", true);
	      }

	      if (shapeData.labelEditable) {
	        shape.setProp("labelEditable", shapeData.labelEditable);
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
	        }
	      }

	      shape.createHandles();

	      this.shapes.push(shape);

	      if (!mute) {
	        this.emit('newShape', shape, shapeData);
	      }

	      return shape;
	    }

	    /**
	     * Creates a new position. Arguments are passed to the position constructor
	     * @param {...*} var_args
	     * @see Position
	     */
	    newPosition(var_args) {

	      return new _graph2.default(...arguments);

	      // 18 September 2016 Norman: What is that ?
	      Array.prototype.unshift.call(arguments, null);
	      return new (Function.prototype.bind.apply(_graph2.default, arguments))();
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
	    selectShape(shape, mute) {

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
	        this.emit("beforeShapeSelect", shape);
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
	        this.emit("shapeSelect", shape);
	      }
	    }

	    /**
	     * Unselects a shape
	     * @param {Shape} shape - The shape to unselect
	     * @param {Boolean} mute - Unselect the shape quietly
	     */
	    unselectShape(shape, mute) {

	      if (this.selectedShapes.indexOf(shape) == -1) {
	        return;
	      }

	      if (!mute) {
	        this.emit("beforeShapeUnselect", shape);
	      }

	      if (this.cancelUnselectShape) {
	        this.cancelUnselectShape = false;
	        return;
	      }

	      shape._unselect();

	      this.selectedShapes.splice(this.selectedShapes.indexOf(shape), 1);

	      if (!mute) {
	        this.emit("shapeUnselect", shape);
	      }
	    }

	    /**
	     * Unselects all shapes
	     * @param {Boolean} [ mute = false ] - Mutes all unselection events
	     * @return {Graph} The current graph instance
	     */
	    unselectShapes(mute) {

	      while (this.selectedShapes[0]) {
	        this.unselectShape(this.selectedShapes[0], mute);
	      }

	      return this;
	    }
	    _removeShape(shape) {
	      this.shapes.splice(this.shapes.indexOf(shape), 1);
	    }
	    appendShapeToDom(shape) {
	      this.getLayer(shape.getLayer(), 'shape').appendChild(shape.group);
	    }
	    removeShapeFromDom(shape) {
	      this.getLayer(shape.getLayer(), 'shape').removeChild(shape.group);
	    }
	    appendSerieToDom(serie) {
	      this.getLayer(serie.getLayer(), 'serie').appendChild(serie.groupMain);
	    }
	    removeSerieFromDom(serie) {
	      this.getLayer(serie.getLayer(), 'serie').removeChild(serie.groupMain);
	    }
	    getLayer(layer, mode) {

	      if (!this.layers[layer]) {

	        this.layers[layer] = [];

	        this.layers[layer][0] = document.createElementNS(this.ns, 'g');
	        this.layers[layer][0].setAttribute('data-layer', layer);
	        this.layers[layer][1] = document.createElementNS(this.ns, 'g');
	        this.layers[layer][2] = document.createElementNS(this.ns, 'g');

	        this.layers[layer][0].appendChild(this.layers[layer][1]);
	        this.layers[layer][0].appendChild(this.layers[layer][2]);

	        var i = 1,
	            prevLayer;

	        while (!(prevLayer = this.layers[layer - i]) && layer - i >= 0) {
	          i++;
	        }

	        if (!prevLayer) {

	          this.plotGroup.insertBefore(this.layers[layer][0], this.plotGroup.firstChild);
	        } else if (prevLayer.nextSibling) {

	          this.plotGroup.insertBefore(this.layers[layer][0], prevLayer.nextSibling);
	        } else {

	          this.plotGroup.appendChild(this.layers[layer][0]);
	        }
	      }

	      return this.layers[layer][mode == 'shape' ? 2 : 1];
	    }
	    focus() {
	      this._dom.focus();
	    }
	    elementMoving(movingElement) {
	      this.bypassHandleMouse = movingElement;
	    }
	    stopElementMoving(element) {

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
	        var line = document.createElementNS(this.ns, 'line');
	        line.setAttribute('stroke', 'black');
	        line.setAttribute('shape-rendering', 'crispEdges');
	        line.setAttribute('stroke-linecap', 'square');
	        line.setAttribute('display', 'none');
	        this.closingLines[els[i]] = line;
	        this.graphingZone.appendChild(line);
	      }
	    }
	    isMouseActionAllowed(e, action) {

	      if (action.type !== e.type && (action.type !== undefined || e.type !== "mousedown") && !((e.type === 'wheel' || e.type === 'mousewheel') && action.type == 'mousewheel')) {
	        return;
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

	      return e.shiftKey == action.shift && e.ctrlKey == action.ctrl && e.metaKey == action.meta && e.altKey == action.alt;
	    }
	    forcePlugin(plugin) {
	      this.forcedPlugin = plugin;
	    }
	    unforcePlugin() {
	      this.forcedPlugin = false;
	    }
	    _pluginsExecute(funcName, args) {

	      //			Array.prototype.splice.apply(args, [0, 0, this]);

	      for (var i in this.plugins) {

	        if (this.plugins[i] && this.plugins[i][funcName]) {

	          this.plugins[i][funcName].apply(this.plugins[i], args);
	        }
	      }
	    }
	    _pluginExecute(which, func, args) {

	      //Array.prototype.splice.apply( args, [ 0, 0, this ] );
	      if (!which) {
	        return;
	      }

	      if (this.plugins[which] && this.plugins[which][func]) {

	        this.plugins[which][func].apply(this.plugins[which], args);
	      }
	    }

	    pluginYieldActiveState() {
	      this.activePlugin = false;
	    }

	    _serieExecute(which, func, args) {

	      if (typeof serie !== 'object') {
	        serie = this.getSerie(serie);
	      }

	      if (typeof serie[func] == 'function') {
	        serie.apply(serie, args);
	      }
	    }
	    _pluginsInit() {

	      var constructor, pluginName, pluginOptions;

	      for (var i in this.options.plugins) {

	        pluginName = i;
	        pluginOptions = this.options.plugins[i];

	        constructor = this.getConstructor("graph.plugin." + pluginName);

	        if (constructor) {

	          var options = util.extend(true, {}, constructor.defaults(), pluginOptions);
	          this.plugins[pluginName] = new constructor(options);

	          util.mapEventEmission(this.plugins[pluginName].options, this.plugins[pluginName]);
	          this.plugins[pluginName].init(this, pluginOptions);
	        } else {
	          util.throwError("Plugin \"" + pluginName + "\" has not been registered");
	        }
	      }
	    }

	    /**
	     * Returns an initialized plugin
	     * @param {String} pluginName
	     * @returns {Plugin} The plugin which name is <pluginName>
	     */
	    getPlugin(pluginName) {
	      var plugin = this.plugins[pluginName];

	      if (!plugin) {
	        return util.throwError("Plugin \"" + pluginName + "\" has not been loaded or properly registered");
	      }

	      return plugin;
	    }
	    triggerEvent() {
	      var func = arguments[0],
	          args = Array.prototype.splice.apply(arguments, [0, 1]);

	      if (typeof this.options[func] == "function") {
	        return this.options[func].apply(this, arguments);
	      }

	      return;
	    }

	    /**
	     * Creates a legend. Only one legend is allowed per graph
	     * @param {Object} options - The legend options
	     */
	    makeLegend(options) {

	      if (this.legend) {
	        return this.legend;
	      }

	      var constructor = this.getConstructor("graph.legend");
	      if (constructor) {
	        this.legend = new constructor(this, options);
	      } else {
	        return util.throwError("Graph legend is not available as it has not been registered");
	      }

	      //    this.legend.update();

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

	    /**
	     * Kills the graph
	     **/
	    kill() {
	      this._dom.removeChild(this.dom);
	    }
	    _removeSerie(serie) {
	      this.series.splice(this.series.indexOf(serie), 1);
	    }
	    contextListen(target, menuElements, callback) {

	      var self = this;

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
	      //		console.log('unlock');
	      this.shapesLocked = false;
	    }
	    prevent(arg) {
	      var curr = this.prevented;
	      if (arg != -1) {
	        this.prevented = arg == undefined || arg;
	      }
	      return curr;
	    }
	    _getXY(e) {

	      var x = e.pageX,
	          y = e.pageY;

	      var pos = this.offsetCached || util.getOffset(this._dom);

	      x -= pos.left /* - window.scrollX*/;
	      y -= pos.top /* - window.scrollY*/;

	      return {
	        x: x,
	        y: y
	      };
	    }
	    _resize() {

	      if (!this.width || !this.height) {
	        return;
	      }

	      this.getDrawingWidth();
	      this.getDrawingHeight();

	      this.sizeSet = true;
	      this.dom.setAttribute('width', this.width);
	      this.dom.setAttribute('height', this.height);
	      this.domTitle.setAttribute('x', this.width / 2);

	      this.requireLegendUpdate();
	      this.draw();
	    }
	    _doDom() {

	      // Create SVG element, set the NS
	      this.dom = document.createElementNS(this.ns, 'svg');
	      this.dom.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
	      //this.dom.setAttributeNS(this.ns, 'xmlns:xlink', this.nsxml);  
	      util.setAttributeTo(this.dom, {
	        'xmlns': this.ns,
	        'font-family': this.options.fontFamily,
	        'font-size': this.options.fontSize
	      });

	      this._dom.appendChild(this.dom);

	      this._dom.setAttribute('tabindex', 1);

	      this._dom.style.outline = "none";

	      this.defs = document.createElementNS(this.ns, 'defs');
	      this.dom.appendChild(this.defs);

	      this.groupEvent = document.createElementNS(this.ns, 'g');

	      this.rectEvent = document.createElementNS(this.ns, 'rect');
	      util.setAttributeTo(this.rectEvent, {
	        'pointer-events': 'fill',
	        'fill': 'transparent'
	      });
	      this.groupEvent.appendChild(this.rectEvent);

	      this.dom.appendChild(this.groupEvent);

	      // Handling graph title
	      this.domTitle = document.createElementNS(this.ns, 'text');
	      this.setTitle(this.options.title);
	      util.setAttributeTo(this.domTitle, {
	        'text-anchor': 'middle',
	        'y': 20
	      });
	      this.groupEvent.appendChild(this.domTitle);
	      //

	      this.graphingZone = document.createElementNS(this.ns, 'g');
	      this.updateGraphingZone();

	      this.groupEvent.appendChild(this.graphingZone);

	      /*  this.shapeZoneRect = document.createElementNS(this.ns, 'rect');
	      //this.shapeZoneRect.setAttribute('pointer-events', 'fill');
	      this.shapeZoneRect.setAttribute('fill', 'transparent');
	      this.shapeZone.appendChild(this.shapeZoneRect);
	      */
	      this.axisGroup = document.createElementNS(this.ns, 'g');
	      this.graphingZone.appendChild(this.axisGroup);

	      this.groupGrids = document.createElementNS(this.ns, 'g');
	      this.groupGrids.setAttribute('clip-path', 'url(#_clipplot' + this._creation + ')');

	      this.groupPrimaryGrids = document.createElementNS(this.ns, 'g');
	      this.groupSecondaryGrids = document.createElementNS(this.ns, 'g');

	      this.axisGroup.appendChild(this.groupGrids);

	      this.groupGrids.appendChild(this.groupSecondaryGrids);
	      this.groupGrids.appendChild(this.groupPrimaryGrids);

	      this.plotGroup = document.createElementNS(this.ns, 'g');
	      this.graphingZone.appendChild(this.plotGroup);

	      // 5 September 2014. I encountered a case here shapeZone must be above plotGroup
	      /*this.shapeZone = document.createElementNS( this.ns, 'g' );
	      this.graphingZone.appendChild( this.shapeZone );
	      */

	      this.layers = [];

	      this._makeClosingLines();

	      this.clip = document.createElementNS(this.ns, 'clipPath');
	      this.clip.setAttribute('id', '_clipplot' + this._creation);
	      this.defs.appendChild(this.clip);

	      this.clipRect = document.createElementNS(this.ns, 'rect');
	      this.clip.appendChild(this.clipRect);
	      this.clip.setAttribute('clipPathUnits', 'userSpaceOnUse');

	      this.markerArrow = document.createElementNS(this.ns, 'marker');
	      this.markerArrow.setAttribute('viewBox', '0 0 10 10');
	      this.markerArrow.setAttribute('id', 'arrow' + this._creation);
	      this.markerArrow.setAttribute('refX', '6');
	      this.markerArrow.setAttribute('refY', '5');
	      this.markerArrow.setAttribute('markerUnits', 'strokeWidth');
	      this.markerArrow.setAttribute('markerWidth', '8');
	      this.markerArrow.setAttribute('markerHeight', '6');
	      this.markerArrow.setAttribute('orient', 'auto');
	      //this.markerArrow.setAttribute('fill', 'context-stroke');
	      //this.markerArrow.setAttribute('stroke', 'context-stroke');

	      var pathArrow = document.createElementNS(this.ns, 'path');
	      pathArrow.setAttribute('d', 'M 0 0 L 10 5 L 0 10 z');
	      //pathArrow.setAttribute( 'fill', 'context-stroke' );
	      this.markerArrow.appendChild(pathArrow);

	      this.defs.appendChild(this.markerArrow);

	      // Horionzal split marker for axis 
	      this.markerHorizontalSplit = document.createElementNS(this.ns, 'marker');
	      this.markerHorizontalSplit.setAttribute('viewBox', '0 0 6 8');
	      this.markerHorizontalSplit.setAttribute('id', 'horionzalsplit_' + this.getId());
	      this.markerHorizontalSplit.setAttribute('refX', '3');
	      this.markerHorizontalSplit.setAttribute('refY', '4');
	      this.markerHorizontalSplit.setAttribute('markerUnits', 'strokeWidth');
	      this.markerHorizontalSplit.setAttribute('markerWidth', '6');
	      this.markerHorizontalSplit.setAttribute('markerHeight', '8');

	      var path = document.createElementNS(this.ns, 'line');
	      path.setAttribute('x1', '0');
	      path.setAttribute('y1', '8');

	      path.setAttribute('x2', '6');
	      path.setAttribute('y2', '0');

	      path.setAttribute('stroke', 'black');
	      this.markerHorizontalSplit.appendChild(path);

	      this.defs.appendChild(this.markerHorizontalSplit);

	      // Vertical split marker for axis 
	      this.markerVerticalSplit = document.createElementNS(this.ns, 'marker');
	      this.markerVerticalSplit.setAttribute('viewBox', '0 0 8 6');
	      this.markerVerticalSplit.setAttribute('id', 'verticalsplit_' + this.getId());
	      this.markerVerticalSplit.setAttribute('refX', '4');
	      this.markerVerticalSplit.setAttribute('refY', '3');
	      this.markerVerticalSplit.setAttribute('markerUnits', 'strokeWidth');
	      this.markerVerticalSplit.setAttribute('markerWidth', '8');
	      this.markerVerticalSplit.setAttribute('markerHeight', '6');

	      var path = document.createElementNS(this.ns, 'line');

	      path.setAttribute('x1', '0');
	      path.setAttribute('y1', '0');

	      path.setAttribute('x2', '8');
	      path.setAttribute('y2', '6');

	      path.setAttribute('stroke', 'black');
	      this.markerVerticalSplit.appendChild(path);
	      this.defs.appendChild(this.markerVerticalSplit);

	      this.vertLineArrow = document.createElementNS(this.ns, 'marker');
	      this.vertLineArrow.setAttribute('viewBox', '0 0 10 10');
	      this.vertLineArrow.setAttribute('id', 'verticalline' + this._creation);
	      this.vertLineArrow.setAttribute('refX', '0');
	      this.vertLineArrow.setAttribute('refY', '5');
	      this.vertLineArrow.setAttribute('markerUnits', 'strokeWidth');
	      this.vertLineArrow.setAttribute('markerWidth', '20');
	      this.vertLineArrow.setAttribute('markerHeight', '10');
	      this.vertLineArrow.setAttribute('orient', 'auto');
	      //this.vertLineArrow.setAttribute('fill', 'context-stroke');
	      //this.vertLineArrow.setAttribute('stroke', 'context-stroke');
	      this.vertLineArrow.setAttribute('stroke-width', '1px');

	      var pathVertLine = document.createElementNS(this.ns, 'path');
	      pathVertLine.setAttribute('d', 'M 0 -10 L 0 10');
	      pathVertLine.setAttribute('stroke', 'black');

	      this.vertLineArrow.appendChild(pathVertLine);

	      this.defs.appendChild(this.vertLineArrow);

	      this.plotGroup.setAttribute('clip-path', 'url(#_clipplot' + this._creation + ')');

	      this.bypassHandleMouse = false;
	    }

	    updateGraphingZone() {
	      util.setAttributeTo(this.graphingZone, {
	        'transform': 'translate(' + this.options.paddingLeft + ', ' + this.options.paddingTop + ')'
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

	    trackingLine(options) {

	      var self = this;

	      if (options) {
	        this.options.trackingLine = options;
	      }

	      // Individual tracking
	      if (options.mode == "individual") {

	        if (options.series) {
	          options.series.map(function (sOptions) {

	            if (typeof sOptions.serie !== "object") {
	              sOptions.serie = this.getSerie(sOptions.serie);
	            }

	            self.addSerieToTrackingLine(sOptions.serie, sOptions);
	          });
	        }
	      } else {
	        options.series.map(function (serie) {
	          serie.serie.disableTracking();
	        });
	      }

	      this.trackingLine = this.newShape('line', util.extend(true, {
	        position: [{
	          y: 'min'
	        }, {
	          y: 'max'
	        }],
	        stroke: 'black',
	        layer: -1
	      }, options.trackingLineShapeOptions));
	      this.trackingLine.draw();

	      return this.trackingLine;
	    }
	    addSerieToTrackingLine(serie, options) {

	      var self = this;

	      if (!this.options.trackingLine) {
	        this.trackingLine({
	          mode: 'individual'
	        });
	      }

	      serie.enableTracking(function (serie, index, x, y) {

	        if (index) {

	          self.trackingLine.show();
	          var closestIndex = index.xIndexClosest;
	          self.trackingLine.getPosition(0).x = serie.getData()[0][index.closestIndex * 2];
	          self.trackingLine.getPosition(1).x = serie.getData()[0][index.closestIndex * 2];
	          self.trackingLine.redraw();

	          serie._trackingLegend = _trackingLegendSerie(self, {
	            serie: serie
	          }, x, y, serie._trackingLegend, options.textMethod ? options.textMethod : function (output) {

	            for (var i in output) {

	              return output[i].serie.serie.getName() + ": " + output[i].serie.serie.getYAxis().valueToHtml(output[i].yValue);
	              break;
	            }
	          }, self.trackingLine.getPosition(0).x);

	          serie._trackingLegend.style.display = "block";
	        }
	      }, function (serie) {
	        self.trackingLine.hide();

	        if (serie.trackingShape) {
	          serie.trackingShape.hide();
	        }

	        if (serie._trackingLegend) {
	          serie._trackingLegend.style.display = "none";
	        }

	        serie._trackingLegend = _trackingLegendSerie(self, {
	          serie: serie
	        }, false, false, serie._trackingLegend, false, false);
	      });
	    }

	    /**
	     * Returns a graph created from a schema
	     * @param {Object} schema - The schema (see https://github.com/cheminfo/json-chart/blob/master/chart-schema.json)
	     * @param {HTMLElement} wrapper - The wrapping element
	     * @returns {Graph} Newly created graph
	     */
	    static fromSchema(schema, wrapper) {

	      var graph;
	      var options = {};
	      var axes = {
	        left: [],
	        top: [],
	        right: [],
	        bottom: []
	      };
	      var axesIndices = [];

	      if (schema.title) {
	        options.title = schema.title;
	      }

	      if (schema.axis) {

	        schema.axis.map(function (schemaAxis) {

	          if (!schemaAxis.type) {
	            util.throwError("Axis type is required (top, bottom, left or right)");
	          }

	          var axisOptions = {};
	          if (schemaAxis.label) {
	            axisOptions.labelValue = schemaAxis.label;
	          }

	          if (schemaAxis.unit !== undefined) {
	            axisOptions.unit = schemaAxis.unit;
	          }

	          if (schemaAxis.unitWrapperAfter !== undefined) {
	            axisOptions.unitWrapperAfter = schemaAxis.unitWrapperAfter;
	          }

	          if (schemaAxis.unitWrapperBefore !== undefined) {
	            axisOptions.unitWrapperBefore = schemaAxis.unitWrapperBefore;
	          }

	          if (schemaAxis.min !== undefined) {
	            axisOptions.forcedMin = schemaAxis.min;
	          }

	          if (schemaAxis.max !== undefined) {
	            axisOptions.forcedMax = schemaAxis.max;
	          }

	          if (schemaAxis.flip !== undefined) {
	            axisOptions.flipped = schemaAxis.flip;
	          }

	          axes[schemaAxis.type].push(axisOptions);
	          schemaAxis._jsGraphIndex = axes[schemaAxis.type].length - 1;
	        });
	      }

	      graph = new Graph(wrapper, options, axes);

	      if (schema.width) {
	        graph.setWidth(schema.width);
	      }

	      if (schema.height) {
	        graph.setHeight(schema.width);
	      }

	      graph._resize();

	      if (schema.data) {

	        schema.data.map(function (schemaSerie) {

	          var serieType = schemaSerie.type,
	              serie,
	              serieOptions = {},
	              serieAxis;

	          switch (schemaSerie.type) {

	            case 'bar':
	              util.throwError("Bar charts not supported");
	              serieType = false;
	              break;

	            case 'scatter':
	              serieType = Graph.SERIE_SCATTER;
	              break;

	            case 'box':
	              serieType = Graph.SERIE_BOX;

	              if (schemaSerie.orientation == 'x' || schemaSerie.orientation == 'y') {
	                serieOptions.orientation = schemaSerie.orientation;
	              }
	              break;

	            default:
	              serieType = Graph.SERIE_LINE;
	              break;
	          }

	          if (!serieType) {
	            util.throwError("No valid serie type was found");
	            return;
	          }

	          serie = graph.newSerie(schemaSerie.id || schemaSerie.label || util.guid(), serieOptions, serieType);

	          if (schemaSerie.lineStyle) {

	            schemaSerie.lineStyle.map(function (style) {

	              var styleSerie = {};
	              style.styleName = style.styleName || "unselected";

	              switch (serieType) {

	                case Graph.SERIE_LINE:
	                  if (style.lineWidth !== undefined) {
	                    styleSerie.lineWidth = style.lineWidth;
	                  }

	                  if (style.color !== undefined) {
	                    styleSerie.lineColor = style.color;
	                  }

	                  if (style.lineStyle) {
	                    styleSerie.lineStyle = style.lineStyle;
	                  }

	                  serie.setStyle(styleSerie, style.styleName);
	                  break;
	              }
	            });
	          }

	          if (schemaSerie.style) {

	            schemaSerie.style.map(function (style) {

	              var styleSerie = {};
	              style.styleName = style.styleName || "unselected";

	              if (!Array.isArray(style.styles)) {
	                style.styles = [style.styles];
	              }

	              var styles = style.styles.map(function (style) {

	                switch (serieType) {

	                  case Graph.SERIE_LINE:

	                    return {
	                      type: style.shape,
	                      zoom: style.zoom,
	                      strokeWidth: style.lineWidth,
	                      strokeColor: style.lineColor,
	                      fillColor: style.color,
	                      points: style.points
	                    };

	                    break;

	                  case Graph.SERIE_BOX:

	                    return style;

	                    break;

	                  case Graph.SERIE_SCATTER:

	                    break;
	                }
	              });

	              switch (serieType) {

	                case Graph.SERIE_LINE:

	                  serie.setMarkers(styles, style.styleName);
	                  break;

	                case Graph.SERIE_SCATTER:

	                  serie.setStyle(styles, {}, style.styleName);
	                  break;

	                case Graph.SERIE_BOX:

	                  serie.setStyle(styles[0], style.stylename);
	                  break;
	              }
	            });
	          }

	          if (schemaSerie.errorX || schemaSerie.errorY) {
	            var errors = [];
	            if (schemaSerie.errorX) {

	              for (var i = 0, l = schemaSerie.errorX.length; i < l; i++) {

	                errors[i] = errors[i] || [[], []];

	                errors[i][0][0] = schemaSerie.errorX[i];
	              }
	            }

	            if (schemaSerie.errorY) {

	              for (var i = 0, l = schemaSerie.errorY.length; i < l; i++) {

	                errors[i] = errors[i] || [[]];
	                errors[i][1][0] = schemaSerie.errorY[i];
	              }
	            }

	            serie.setDataError(errors) // Adds the error data
	            .setErrorStyle([{
	              type: 'bar',
	              x: {},
	              y: {}
	            }]); // Display bar errors
	          }

	          if (schema.axis) {
	            serieAxis = schema.axis[schemaSerie.xAxis];

	            if (!serieAxis || serieAxis.type !== 'top' && serieAxis.type !== 'bottom') {
	              util.warn("No x axis found. Setting automatically");
	              serie.setXAxis(graph.getXAxis(0));
	            } else {
	              if (serieAxis.type == 'top') {
	                serie.setXAxis(graph.getTopAxis(serieAxis._jsGraphIndex));
	              } else if (serieAxis.type == 'bottom') {
	                serie.setXAxis(graph.getBottomAxis(serieAxis._jsGraphIndex));
	              }
	            }

	            serieAxis = schema.axis[schemaSerie.yAxis];

	            if (!serieAxis || serieAxis.type !== 'left' && serieAxis.type !== 'right') {
	              util.warn("No y axis found. Setting automatically");
	              serie.setYAxis(graph.getYAxis(0));
	            } else {
	              if (serieAxis.type == 'left') {
	                serie.setYAxis(graph.getLeftAxis(serieAxis._jsGraphIndex));
	              } else if (serieAxis.type == 'right') {
	                serie.setYAxis(graph.getRightAxis(serieAxis._jsGraphIndex));
	              }
	            }
	          } else {
	            util.warn("No axes found. Setting automatically");
	            serie.autoAxis();
	          }

	          switch (serieType) {

	            case Graph.SERIE_BOX:
	              serie.setData(schemaSerie.boxes);

	              break;

	            default:
	            case Graph.SERIE_SCATTER:
	            case Graph.SERIE_LINE:

	              serie.setData([{
	                x: schemaSerie.x,
	                y: schemaSerie.y
	              }]);

	              break;
	          }
	        });
	      }

	      graph.autoscaleAxes();
	      graph.draw();

	      return graph;
	    }

	    exportToSchema() {

	      let schema = {};

	      schema.title = this.options.title;

	      schema.width = this.getWidth();
	      schema.height = this.getHeight();

	      let axesPositions = ['top', 'bottom', 'left', 'right'];
	      let axesExport = [];
	      let allaxes = {
	        x: [],
	        y: []
	      };

	      axesPositions.map(axisPosition => {

	        if (!this.axis[axisPosition]) {
	          return;
	        }

	        axesExport = axesExport.concat(this.axis[axisPosition].map(axis => {
	          return {

	            type: axisPosition,
	            label: axis.options.label,
	            unit: axis.options.unit,
	            min: axis.options.forcedMin,
	            max: axis.options.forcedMax,
	            flip: axis.options.flipped

	          };
	        }));

	        if (axisPosition == 'top' || axisPosition == 'bottom') {
	          allaxes.x = allaxes.x.concat(this.axis[axisPosition]);
	        } else {
	          allaxes.y = allaxes.y.concat(this.axis[axisPosition]);
	        }
	      });

	      schema.axis = axesExport;

	      let seriesExport = [];

	      let toType = type => {
	        switch (type) {

	          case Graph.SERIE_LINE:
	            return 'line';
	            break;

	          case Graph.SERIE_BAR:
	            return 'bar';
	            break;

	          case Graph.SERIE_SCATTER:
	            return 'scatter';
	            break;
	        }
	      };

	      let exportData = (serie, x) => {

	        let data = [];

	        switch (serie.getType()) {

	          case Graph.SERIE_LINE:

	            for (var i = 0; i < serie.data.length; i++) {

	              for (var j = 0; j < serie.data[i].length - 1; j += 2) {

	                data.push(serie.data[i][j + (x && serie.isFlipped() || !x && !serie.isFlipped() ? 1 : 0)]);
	              }
	            }
	            break;

	          case Graph.SERIE_SCATTER:

	            for (var j = 0; j < serie.data.length - 1; j += 2) {

	              data.push(serie.data[i + (x && serie.isFlipped() || !x && !serie.isFlipped() ? 1 : 0)]);
	            }

	            break;
	        }

	        return data;
	      };

	      schema.data = seriesExport.concat(this.series.map(serie => {

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

	            styleObj.styles = styleObj.styles.concat((serie.styles[stylename].markers || []).map(markers => {
	              return {
	                shape: markers.type,
	                zoom: markers.zoom,
	                lineWidth: markers.strokeWidth,
	                lineColor: markers.strokeColor,
	                color: markers.fillColor,
	                points: markers.points
	              };
	            }));
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
	      }));

	      return schema;
	    }

	    /**
	     * Registers a constructor to jsGraph. Constructors are used on a later basis by jsGraph to create series, shapes or plugins
	     * @param {String} constructorName - The name of the constructor
	     * @param {Function} constructor - The constructor method
	     * @see Graph.getConstructor
	     * @static
	     */
	    static registerConstructor(constructorName, constructor) {

	      if (_constructors.has(constructorName)) {
	        return util.throwError("Constructor " + constructor + " already exists.");
	      }

	      _constructors.set(constructorName, constructor);
	    }

	    /**
	     * Returns a registered constructor
	     * @param {String} constructorName - The constructor name to look for
	     * @returns {Function} The registered constructor
	     * @throws Error
	     * @see Graph.registerConstructor
	     * @static
	     */
	    static getConstructor(constructorName, softFail) {

	      if (!_constructors.has(constructorName)) {

	        if (softFail) {
	          return false;
	        }

	        return util.throwError("Constructor \"" + constructorName + "\" doesn't exist");
	      }

	      return _constructors.get(constructorName);
	    }

	  }

	  // Adds getConstructor to the prototype. Cannot do that in ES6 classes
	  Graph.prototype.getConstructor = Graph.getConstructor;

	  function makeSerie(graph, name, options, type) {

	    var constructor = graph.getConstructor(type, true);
	    if (!constructor && typeof type == "string") {
	      constructor = graph.getConstructor("graph.serie." + type, true);
	    }
	    if (constructor) {

	      var serie = new constructor();
	      serie.init(graph, name, options);
	      graph.appendSerieToDom(serie);
	    } else {

	      return util.throwError("No constructor exists for the serie type provided. Use Graph.registerConstructor( name, constructor ); first is you use your own series");
	    }

	    return serie;
	  };

	  function getAxisLevelFromSpan(span, level) {

	    for (var i = 0, l = level.length; i < l; i++) {

	      var possible = true;
	      for (var k = 0, m = level[i].length; k < m; k++) {

	        if (!(span[0] < level[i][k][0] && span[1] < level[i][k][0] || span[0] > level[i][k][1] && span[1] > level[i][k][1])) {
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

	  function refreshDrawingZone(graph) {

	    var i, j, l, xy, min, max, axis;
	    var shift = {
	      top: [],
	      bottom: [],
	      left: [],
	      right: []
	    };

	    var levels = {
	      top: [],
	      bottom: [],
	      left: [],
	      right: []
	    };

	    graph._painted = true;
	    // Apply to top and bottom
	    graph._applyToAxes(function (axis, position) {
	      if (axis.disabled || axis.floating) {
	        return;
	      }

	      var level = getAxisLevelFromSpan(axis.getSpan(), levels[position]);
	      axis.setLevel(level);

	      shift[position][level] = Math.max(axis.getAxisPosition(), shift[position][level] || 0);
	    }, false, true, false);

	    var shiftTop = shift.top.reduce(function (prev, curr) {
	      return prev + curr;
	    }, 0);

	    var shiftBottom = shift.bottom.reduce(function (prev, curr) {
	      return prev + curr;
	    }, 0);

	    [shift.top, shift.bottom].map(function (arr) {
	      arr.reduce(function (prev, current, index) {
	        arr[index] = prev + current;
	        return prev + current;
	      }, 0);
	    });

	    // Apply to top and bottom
	    graph._applyToAxes(function (axis, position) {

	      if (axis.disabled || axis.floating) {
	        return;
	      }

	      axis.setShift(shift[position][axis.getLevel()]);
	    }, false, true, false);

	    // Applied to left and right
	    graph._applyToAxes(function (axis, position) {

	      if (axis.disabled) {
	        return;
	      }

	      axis.setMinPx(shiftTop);
	      axis.setMaxPx(graph.getDrawingHeight(true) - shiftBottom);

	      if (axis.floating) {
	        return;
	      }

	      // First we need to draw it in order to determine the width to allocate
	      // graph is done to accomodate 0 and 100000 without overlapping any element in the DOM (label, ...)

	      // Let's not draw dependant axes yet
	      let drawn = !axis.linkedToAxis ? axis.draw() : 0;

	      // Get axis position gives the extra shift that is common
	      var level = getAxisLevelFromSpan(axis.getSpan(), levels[position]);
	      axis.setLevel(level);
	      shift[position][level] = Math.max(drawn, shift[position][level] || 0);
	    }, false, false, true);

	    var shift2 = util.extend(true, {}, shift);

	    // Applied to left and right
	    graph._applyToAxes(function (axis, position) {

	      if (axis.disabled) {
	        return;
	      }

	      if (axis.floating) {
	        return;
	      }

	      shift2[position][axis.getLevel()] = Math.max(shift[position][axis.getLevel()], axis.equalizePosition(shift[position][axis.getLevel()]));
	    }, false, false, true);

	    shift = shift2;

	    var shiftLeft = shift.left.reduce(function (prev, curr) {
	      return prev + curr;
	    }, 0);

	    var shiftRight = shift.right.reduce(function (prev, curr) {
	      return prev + curr;
	    }, 0);

	    [shift.left, shift.right].map(function (arr) {
	      arr.reduce(function (prev, current, index) {
	        arr[index] = prev + current;
	        return prev + current;
	      }, 0);
	    });

	    // Apply to left and right
	    graph._applyToAxes((axis, position) => {

	      if (axis.disabled || axis.floating) {
	        return;
	      }
	      axis.setShift(shift[position][axis.getLevel()]);
	    }, false, false, true);

	    // Apply to top and bottom
	    graph._applyToAxes(function (axis, position) {

	      if (axis.disabled) {
	        return;
	      }

	      axis.setMinPx(shiftLeft);
	      axis.setMaxPx(graph.getDrawingWidth(true) - shiftRight);

	      if (axis.floating) {
	        return;
	      }

	      if (!axis.linkedToAxis) {
	        axis.draw();
	      }
	    }, false, true, false);

	    // Floating axes
	    graph._applyToAxes(function (axis) {

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
	    }, false, true, true);

	    _closeLine(graph, 'right', graph.getDrawingWidth(true), graph.getDrawingWidth(true), shiftTop, graph.getDrawingHeight(true) - shiftBottom);
	    _closeLine(graph, 'left', 0, 0, shiftTop, graph.getDrawingHeight(true) - shiftBottom);
	    _closeLine(graph, 'top', shiftLeft, graph.getDrawingWidth(true) - shiftRight, 0, 0);
	    _closeLine(graph, 'bottom', shiftLeft, graph.getDrawingWidth(true) - shiftRight, graph.getDrawingHeight(true) - shiftBottom, graph.getDrawingHeight(true) - shiftBottom);

	    graph.clipRect.setAttribute('y', shiftTop);
	    graph.clipRect.setAttribute('x', shiftLeft);
	    graph.clipRect.setAttribute('width', graph.getDrawingWidth() - shiftLeft - shiftRight);
	    graph.clipRect.setAttribute('height', graph.getDrawingHeight() - shiftTop - shiftBottom);

	    graph.rectEvent.setAttribute('y', shiftTop + graph.getPaddingTop());
	    graph.rectEvent.setAttribute('x', shiftLeft + graph.getPaddingLeft());

	    graph.drawingSpaceWidth = graph.getDrawingWidth() - shiftLeft - shiftRight;
	    graph.drawingSpaceHeight = graph.getDrawingHeight() - shiftTop - shiftBottom;

	    graph.rectEvent.setAttribute('width', graph.drawingSpaceWidth);
	    graph.rectEvent.setAttribute('height', graph.drawingSpaceHeight);

	    graph.drawingSpaceMinX = shiftLeft + graph.getPaddingLeft(); // + "px";
	    graph.drawingSpaceMinY = shiftTop + graph.getPaddingTop(); // + "px";
	    graph.drawingSpaceMaxX = graph.getDrawingWidth() - shiftRight + graph.getPaddingLeft(); // + "px";
	    graph.drawingSpaceMaxY = graph.getDrawingHeight() - shiftBottom + graph.getPaddingTop(); //  + "px";

	    /*
	    graph.shapeZoneRect.setAttribute('x', shift[1]);
	    graph.shapeZoneRect.setAttribute('y', shift[2]);
	    graph.shapeZoneRect.setAttribute('width', graph.getDrawingWidth() - shift[2] - shift[3]);
	    graph.shapeZoneRect.setAttribute('height', graph.getDrawingHeight() - shift[1] - shift[0]);
	    */
	    graph.shift = shift;
	    graph.redrawShapes(); // Not sure this should be automatic here. The user should be clever.
	  }

	  function _registerEvents(graph) {
	    var self = graph;

	    graph._dom.addEventListener('keydown', function (e) {

	      // Not sure this has to be prevented

	      if ((e.keyCode == 8 || e.keyCode == 127) && self.selectedShapes) {

	        e.preventDefault();
	        e.stopPropagation();

	        self.selectedShapes.map(function (shape) {
	          shape.kill();
	        });
	      }
	    });

	    graph.groupEvent.addEventListener('mousemove', function (e) {
	      //e.preventDefault();
	      var coords = self._getXY(e);
	      _handleMouseMove(self, coords.x, coords.y, e);
	    });

	    graph.dom.addEventListener('mouseleave', function (e) {

	      _handleMouseLeave(self);
	    });

	    graph.groupEvent.addEventListener('mousedown', function (e) {

	      self.focus();

	      //   e.preventDefault();
	      if (e.which == 3 || e.ctrlKey) {
	        return;
	      }

	      var coords = self._getXY(e);
	      _handleMouseDown(self, coords.x, coords.y, e);
	    });

	    graph.dom.addEventListener('mouseup', function (e) {

	      graph.emit("mouseUp", e);
	      //   e.preventDefault();
	      var coords = self._getXY(e);

	      _handleMouseUp(self, coords.x, coords.y, e);
	    });

	    graph.dom.addEventListener('dblclick', function (e) {

	      graph.emit("dblClick", e);

	      //      e.preventDefault();

	      //      if ( self.clickTimeout ) {
	      //       window.clearTimeout( self.clickTimeout );
	      //    }

	      var coords = self._getXY(e);
	      //    self.cancelClick = true;

	      _handleDblClick(self, coords.x, coords.y, e);
	    });

	    // Norman 26 june 2015: Do we really need the click timeout ?

	    graph.groupEvent.addEventListener('click', function (e) {

	      // Cancel right click or Command+Click
	      if (e.which == 3 || e.ctrlKey) {
	        return;
	      }

	      //   e.preventDefault();
	      var coords = self._getXY(e);
	      //    if ( self.clickTimeout ) {
	      //     window.clearTimeout( self.clickTimeout );
	      //  }

	      // Only execute the action after 100ms
	      // self.clickTimeout = window.setTimeout( function() {

	      //  if ( self.cancelClick ) {
	      //   self.cancelClick = false;
	      //   return;
	      // }

	      if (!self.prevent(false)) {
	        _handleClick(self, coords.x, coords.y, e);
	      }

	      //}, 200 );
	    });

	    graph.groupEvent.addEventListener('mousewheel', function (e) {

	      var deltaY = e.wheelDeltaY || e.wheelDelta || -e.deltaY;
	      _handleMouseWheel(self, deltaY, e);

	      return false;
	    });

	    graph.groupEvent.addEventListener('wheel', function (e) {

	      var deltaY = e.wheelDeltaY || e.wheelDelta || -e.deltaY;
	      _handleMouseWheel(self, deltaY, e);

	      return false;
	    });
	  }

	  function _handleMouseDown(graph, x, y, e) {

	    var self = graph;

	    if (graph.forcedPlugin) {

	      graph.activePlugin = graph.forcedPlugin;
	      graph._pluginExecute(graph.activePlugin, 'onMouseDown', [graph, x, y, e]);
	      return;
	    }

	    checkMouseActions(graph, e, [graph, x, y, e], 'onMouseDown');
	  }

	  function _handleMouseMove(graph, x, y, e) {

	    if (graph.bypassHandleMouse) {
	      graph.bypassHandleMouse.handleMouseMove(e);
	      return;
	    }

	    if (graph.activePlugin && graph._pluginExecute(graph.activePlugin, 'onMouseMove', [graph, x, y, e])) {
	      return;
	    };

	    //			return;

	    graph._applyToAxes('handleMouseMove', [x - graph.options.paddingLeft, e], true, false);
	    graph._applyToAxes('handleMouseMove', [y - graph.options.paddingTop, e], false, true);

	    if (!graph.activePlugin) {
	      var index;

	      if (graph.options.trackingLine && graph.options.trackingLine.snapToSerie) {

	        if (graph.options.trackingLine.mode == "common") {

	          var snapToSerie = graph.options.trackingLine.snapToSerie;
	          index = snapToSerie.handleMouseMove(false, true);

	          if (!index) {

	            graph.trackingLine.hide();
	          } else {

	            graph.trackingLine.show();
	            var closestIndex = index.xIndexClosest;
	            graph.trackingLine.getPosition(0).x = snapToSerie.getData()[0][closestIndex * 2];
	            graph.trackingLine.getPosition(1).x = snapToSerie.getData()[0][closestIndex * 2];
	            graph.trackingLine.redraw();

	            var x = snapToSerie.getXAxis().getPx(graph.trackingLine.getPosition(0).x) + graph.options.paddingLeft;
	          }

	          var series = graph.options.trackingLine.series;

	          if (!series) {

	            series = graph.getSeries().map(function (serie) {
	              return {
	                serie: serie,
	                withinPx: 20,
	                withinVal: -1
	              };
	            });
	          }

	          graph._trackingLegend = _trackingLegendSerie(graph, series, x, y, graph._trackingLegend, graph.options.trackingLine.textMethod, graph.trackingLine.getPosition(1).x);
	        }
	      }
	    }

	    if (graph.options.onMouseMoveData) {
	      var results = {};

	      for (var i = 0; i < graph.series.length; i++) {

	        results[graph.series[i].getName()] = graph.series[i].handleMouseMove(false, true);
	      }

	      graph.options.onMouseMoveData.call(graph, e, results);
	    }

	    checkMouseActions(graph, e, [graph, x, y, e], 'onMouseMove');

	    return;
	  }

	  function checkMouseActions(graph, e, parameters, methodName) {

	    var keyComb = graph.options.mouseActions,
	        i,
	        l;

	    for (i = 0, l = keyComb.length; i < l; i++) {

	      if (keyComb[i].plugin) {
	        // Is it a plugin ?

	        if (graph.forcedPlugin == keyComb[i].plugin || graph.isMouseActionAllowed(e, keyComb[i])) {

	          if (keyComb[i].options) {
	            parameters.push(keyComb[i].options);
	          }

	          graph.activePlugin = keyComb[i].plugin; // Lease the mouse action to the current action
	          graph._pluginExecute(keyComb[i].plugin, methodName, parameters);
	          return true;
	        }
	      } else if (keyComb[i].callback && graph.isMouseActionAllowed(e, keyComb[i])) {

	        if (keyComb[i].options) {
	          parameters.push(keyComb[i].options);
	        }

	        keyComb[i].callback.apply(graph, parameters);
	        return true;
	      } else if (keyComb[i].series) {

	        var series;
	        if (keyComb[i].series === 'all') {
	          series = graph.series;
	        }

	        if (!Array.isArray(keyComb[i].series)) {
	          series = [series];
	        }

	        if (keyComb[i].options) {
	          parameters.push(keyComb[i].options);
	        }

	        for (var j = 0; j < series.length; i++) {
	          graph._serieExecute(series[i], methodName, parameters);
	        }
	        return true;
	      }
	    }

	    return false;
	  };

	  var _trackingLegendSerie = function (graph, serie, x, y, legend, textMethod, xValue) {

	    var justCreated = false;

	    if (!Array.isArray(serie)) {
	      serie = [serie];
	    }

	    var output = [];

	    if (!legend) {
	      justCreated = true;
	      legend = _makeTrackingLegend(graph);
	    }

	    serie.map(function (serie) {

	      var index = serie.serie.handleMouseMove(xValue, false);

	      if (!index || !textMethod) {

	        if (serie.serie.trackingShape) {
	          serie.serie.trackingShape.hide();
	        }

	        return legend;
	      }

	      // Should we display the dot ?
	      if (serie.withinPx > 0 && Math.abs(x - graph.options.paddingLeft - serie.serie.getXAxis().getPx(serie.serie.getData()[0][index.xIndexClosest * 2])) - serie.withinPx > 1e-14 || serie.withinVal > 0 && Math.abs(serie.serie.getXAxis().getVal(x - graph.options.paddingLeft) - serie.serie.getData()[0][index.xIndexClosest * 2]) - serie.withinVal > serie.serie.getXAxis().getVal(x - graph.options.paddingLeft) / 100000) {

	        if (serie.serie.trackingShape) {
	          serie.serie.trackingShape.hide();
	        }
	      } else {

	        output[serie.serie.getName()] = {

	          xIndex: index.xIndexClosest,
	          yValue: serie.serie.getData()[0][index.xIndexClosest * 2 + 1],
	          xValue: serie.serie.getData()[0][index.xIndexClosest * 2],
	          serie: serie,
	          index: index

	        };

	        if (!serie.serie.trackingShape) {

	          serie.serie.trackingShape = graph.newShape("ellipse", {

	            fillColor: serie.serie.getLineColor(),
	            strokeColor: "White",
	            strokeWidth: serie.serie.getLineWidth()

	          }).setSerie(serie.serie).setProp('rx', serie.serie.getLineWidth() * 3).setProp('ry', serie.serie.getLineWidth() * 3).forceParentDom(serie.serie.groupMain).draw();
	        }

	        serie.serie.trackingShape.show();
	        serie.serie.trackingShape.getPosition(0).x = serie.serie.getData()[0][index.xIndexClosest * 2];
	        serie.serie.trackingShape.redraw();
	      }
	    }); // End map

	    if (Object.keys(output).length == 0 || !textMethod) {
	      legend.style.display = "none";
	    } else {

	      if (legend.style.display == "none" || justCreated) {

	        forceTrackingLegendMode(graph, legend, x, y, true);
	      } else {
	        _trackingLegendMove(graph, legend, x, y);
	      }

	      legend.style.display = "block";
	      var txt = textMethod(output, xValue, x, y);

	      legend.innerHTML = txt;

	      //legend.innerHTML = textMethod( output, xValue, x, y );
	    }

	    return legend;
	  };

	  var forceTrackingLegendMode = function (graph, legend, toX, toY, skip) {

	    var ratio = 0,
	        start = Date.now(),
	        h = legend.offsetHeight,
	        startX = parseInt(legend.style.marginLeft.replace("px", "") || 0),
	        startY = parseInt(legend.style.marginTop.replace("px", "") || 0);

	    toX = toX > graph.getWidth() / 2 ? toX - toX % 10 - 20 - legend.offsetWidth : toX - toX % 10 + 30;
	    toY = toY - toY % 10 + h / 2;

	    if (skip) {
	      legend.style.marginLeft = toX + "px";
	      legend.style.marginTop = toY + "px";
	      return;
	    }

	    function next() {

	      var progress = (Date.now() - start) / 200;
	      if (progress > 1) {
	        progress = 1;
	      }

	      legend.style.marginLeft = (toX - startX) * progress + startX + "px";
	      legend.style.marginTop = (toY - startY) * progress + startY + "px";

	      if (progress < 1) {
	        window.requestAnimationFrame(next);
	      }
	    }

	    window.requestAnimationFrame(next);
	  };

	  var _trackingLegendMove = util.debounce(forceTrackingLegendMode, 50);

	  function _makeTrackingLegend(graph) {

	    var group = document.createElement('div');
	    group.setAttribute('class', 'trackingLegend');
	    group.style.position = 'absolute';
	    group.style.borderRadius = '4px';
	    group.style.boxShadow = "1px 1px 3px 0px rgba(100,100,100,0.6)";
	    group.style.border = "2px solid #333333";
	    group.style.backgroundColor = "rgba(255, 255, 255, 0.5 )";
	    group.style.pointerEvents = "none";
	    group.style.paddingTop = "5px";
	    group.style.paddingBottom = "5px";
	    group.style.paddingLeft = "10px";
	    group.style.paddingRight = "10px";

	    graph.getWrapper().insertBefore(group, graph.getDom());

	    return group;
	  }

	  function _handleDblClick(graph, x, y, e) {
	    //	var _x = x - graph.options.paddingLeft;
	    //	var _y = y - graph.options.paddingTop;
	    var pref = graph.options.dblclick;
	    checkMouseActions(graph, e, [x, y, e], 'onDblClick');
	    /*
	        if ( !pref ||  !pref.type ) {
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

	  function _handleMouseUp(graph, x, y, e) {

	    if (graph.bypassHandleMouse) {
	      graph.bypassHandleMouse.handleMouseUp(e);
	      graph.activePlugin = false;
	      return;
	    }

	    graph._pluginExecute(graph.activePlugin, 'onMouseUp', [graph, x, y, e]);
	    graph.activePlugin = false;
	  }

	  function _handleClick(graph, x, y, e) {

	    graph.emit('click', [graph, x, y, e]);

	    // Not on a shape

	    if (!e.target.jsGraphIsShape && !graph.prevent(false) && graph.options.shapesUnselectOnClick) {

	      graph.unselectShapes();
	    }
	  }

	  function _getAxis(graph, num, options, pos) {

	    var options = options || {};
	    var inst;

	    var _availableAxes = {

	      def: {
	        x: graph.getConstructor("graph.axis.x"),
	        y: graph.getConstructor("graph.axis.y")
	      },

	      time: {
	        x: graph.getConstructor("graph.axis.x.time")
	      },

	      bar: {
	        x: graph.getConstructor("graph.axis.x.bar")
	      }
	    };

	    switch (options.type) {

	      case 'time':
	        var axisInstance = _availableAxes.time;
	        break;

	      case 'bar':
	        var axisInstance = _availableAxes.bar;
	        break;

	      case 'broken':
	        var axisInstance = _availableAxes.broken;
	        break;

	      default:
	        var axisInstance = _availableAxes.def;
	        break;
	    }

	    switch (pos) {

	      case 'top':
	      case 'bottom':
	        inst = axisInstance.x;
	        break;

	      case 'left':
	      case 'right':
	        inst = axisInstance.y;
	        break;
	    }

	    num = num || 0;

	    if (typeof num == "object") {
	      options = num;
	      num = 0;
	    }

	    if (!graph.axis[pos][num]) {
	      graph.axis[pos][num] = new inst(graph, pos, options);
	      graph.axis[pos][num].init(graph, options);
	    }

	    return graph.axis[pos][num];
	  }

	  function _closeLine(graph, mode, x1, x2, y1, y2) {

	    if (graph.options.close === false) {
	      return;
	    }

	    var l = 0;

	    graph.axis[mode].map(function (g) {

	      if (g.isDisplayed() && !g.floating) {
	        l++;
	      }
	    });

	    if ((graph.options.close === true || graph.options.close[mode]) && l == 0) {

	      graph.closingLines[mode].setAttribute('display', 'block');
	      graph.closingLines[mode].setAttribute('x1', x1);
	      graph.closingLines[mode].setAttribute('x2', x2);
	      graph.closingLines[mode].setAttribute('y1', y1);
	      graph.closingLines[mode].setAttribute('y2', y2);
	    } else {

	      graph.closingLines[mode].setAttribute('display', 'none');
	    }
	  }

	  function _handleMouseWheel(graph, delta, e) {

	    if (checkMouseActions(graph, e, [delta, e], 'onMouseWheel')) {
	      e.preventDefault();
	      e.stopPropagation();
	    }
	  }

	  function _handleMouseLeave(graph) {

	    if (graph.options.handleMouseLeave) {
	      graph.options.handleMouseLeave.call(graph);
	    }
	  }

	  function haveAxesChanged(graph) {
	    var temp = graph._axesHaveChanged;
	    graph._axesHaveChanged = false;
	    return temp;
	  }

	  function hasSizeChanged(graph) {
	    var temp = graph._sizeChanged;
	    graph._sizeChanged = false;
	    return temp;
	  }

	  // Constants
	  Graph.SERIE_LINE = Symbol();
	  Graph.SERIE_SCATTER = Symbol();
	  Graph.SERIE_CONTOUR = Symbol();
	  Graph.SERIE_BAR = Symbol();
	  Graph.SERIE_BOX = Symbol();
	  Graph.SERIE_ZONE = Symbol();
	  Graph.SERIE_LINE_COLORED = Symbol();
	  Graph.SERIE_ZONE = Symbol();
	  Graph.SERIE_DENSITYMAP = Symbol();

	  Graph.TICKS_OUTSIDE = Symbol();
	  Graph.TICKS_INSIDE = Symbol();
	  Graph.TICKS_CENTERED = Symbol();

	  exports.default = Graph;
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports);
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports);
	    global.graphPosition = mod.exports;
	  }
	})(this, function (exports) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  function _parsePx(px) {
	    if (px && px.indexOf && px.indexOf('px') > -1) {
	      return parseInt(px.replace('px', ''));
	    }
	    return false;
	  };

	  function isNumeric(n) {
	    return !isNaN(parseFloat(n)) && isFinite(n);
	  }

	  /**
	   * Utility class to compute positioning
	   * @class
	   */
	  class Position {

	    constructor(x, y, dx, dy) {

	      if (typeof x == "object") {
	        this.x = x.x;
	        this.y = x.y;
	        this.dx = x.dx;
	        this.dy = x.dy;
	      } else {
	        this.x = x;
	        this.y = y;
	        this.dx = dx;
	        this.dy = dy;
	      }
	    }

	    /**
	     *  Computes the position of the position
	     *  @param {Graph} graph - The graph for which the position has to be computed
	     *  @param {AxisX} xAxis - The x axis to consider (has to belong to the graph)
	     *  @param {AxisY} yAxis - The y axis to consider (has to belong to the graph)
	     *  @param {Serie} [serie] - For non-existing y value, use a serie to compute it automatically from the serie data
	     *  @return {Object} An object in the format ```{x: xPx, y: yPx}``` containing the position in pixels of the position
	     */
	    compute(graph, xAxis, yAxis, serie) {

	      if (!graph || !xAxis || !yAxis || !graph.hasXAxis || !graph.hasYAxis) {
	        graph.throw();
	      }

	      if (!graph.hasXAxis(xAxis)) {
	        throw "Graph does not contain the x axis that was used as a parameter";
	      }

	      if (!graph.hasYAxis(yAxis)) {
	        throw "Graph does not contain the x axis that was used as a parameter";
	      }

	      return this._compute(graph, xAxis, yAxis, serie);
	    }

	    _compute(graph, xAxis, yAxis, serie) {

	      var relativeTo = this._relativeTo;
	      if (relativeTo) {
	        var relativeToComputed = relativeTo._compute(graph, xAxis, yAxis, serie);
	      }

	      var parsed,
	          pos = {
	        x: false,
	        y: false
	      };

	      if (!xAxis) {
	        xAxis = graph.getXAxis();
	      }

	      if (!yAxis) {
	        yAxis = graph.getYAxis();
	      }

	      for (var i in pos) {

	        var axis = i == 'x' ? xAxis : yAxis;
	        var val = this[i];
	        var dval = this["d" + i];

	        if (val === undefined && (dval !== undefined && relativeTo === undefined || relativeTo === undefined)) {

	          if (i == 'x') {

	            if (dval === undefined) {
	              continue;
	            }

	            pos[i] = relativeTo ? relativeTo[i] : axis.getPos(0);
	          } else if (this.x && serie) {

	            if (_parsePx(this.x) !== false) {
	              console.warn("You have defined x in px and not y. Makes no sense. Returning 0 for y");
	              pos[i] = 0;
	            } else {

	              var closest = serie.searchClosestValue(this.x);

	              if (!closest) {
	                console.warn("Could not find y position for x = " + this.x + " on serie \"" + serie.getName() + "\". Returning 0 for y.");
	                pos[i] = 0;
	              } else {
	                pos[i] = serie.getY(closest.yMin);
	              }
	            }
	          }
	        } else if (val !== undefined) {
	          pos[i] = this.getPx(val, axis);
	        }

	        if (dval !== undefined) {

	          var def = val !== undefined || relativeToComputed == undefined || relativeToComputed[i] == undefined ? pos[i] : relativeToComputed[i];

	          if (i == 'y' && relativeToComputed && relativeToComputed.x !== undefined && relativeToComputed.y == undefined) {

	            if (!serie) {
	              throw "Error. No serie exists. Cannot find y value";
	              return;
	            }

	            var closest = serie.searchClosestValue(relativeTo.x);
	            if (closest) {
	              def = serie.getY(closest.yMin);
	            }

	            //console.log( relativeTo.x, closest, serie.getY( closest.yMin ), def );
	          }

	          if ((parsed = _parsePx(dval)) !== false) {
	            // dx in px => val + 10px

	            pos[i] = def + parsed; // return integer (will be interpreted as px)
	          } else if (parsed = this._parsePercent(dval)) {

	            pos[i] = def + this._getPositionPx(parsed, true, axis, graph); // returns xx%
	          } else if (axis) {

	            pos[i] = def + axis.getRelPx(dval); // px + unittopx
	          }
	        }
	      }

	      return pos;
	    }

	    _getPositionPx(value, x, axis, graph) {

	      var parsed;

	      if ((parsed = _parsePx(value)) !== false) {
	        return parsed; // return integer (will be interpreted as px)
	      }

	      if ((parsed = this._parsePercent(value)) !== false) {
	        return parsed / 100 * (x ? graph.getDrawingWidth() : graph.getDrawingHeight());
	      } else if (axis) {
	        return axis.getPos(value);
	      }
	    }

	    _parsePercent(percent) {
	      if (percent && percent.indexOf && percent.indexOf('%') > -1) {
	        return percent;
	      }
	      return false;
	    }

	    /**
	     *  Computes the value in pixels of an amplitude (or a distance) for a certain axis
	     *  @param {Number} value - The value in axis unit
	     *  @param {Axis} Axis - The x axis to consider (has to belong to the graph)
	     *  @return {String} The value in pixels, e.g. "20px"
	     */
	    getDeltaPx(value, axis) {
	      var v;
	      if ((v = _parsePx(value)) !== false) {
	        return v + "px";
	      } else {

	        return axis.getRelPx(value) + "px";
	      }
	    }

	    deltaPosition(mode, delta, axis) {

	      mode = mode == 'y' ? 'y' : 'x';
	      var ref = this[mode],
	          refd = this['d' + mode],
	          refPx,
	          deltaPx;

	      if (ref !== undefined) {
	        if ((refPx = _parsePx(ref)) !== false) {

	          if ((deltaPx = _parsePx(delta)) !== false) {
	            this[mode] = refPx + deltaPx + "px";
	          } else {
	            this[mode] = refPx + axis.getRelPx(delta) + "px";
	          }
	        } else {

	          ref = this.getValPosition(ref, axis);

	          if ((deltaPx = _parsePx(delta)) !== false) {
	            this[mode] = ref + axis.getRelVal(deltaPx);
	          } else {
	            this[mode] = ref + delta;
	          }
	        }
	      } else if (refd !== undefined) {

	        if (mode == 'y' && ref === undefined && !this._relativeTo) {
	          // This means that the shape is placed by the x value. Therefore, the dy is only a stand-off.
	          // Therefore, we do nothing
	          return;
	        }

	        if ((refPx = _parsePx(refd)) !== false) {

	          if ((deltaPx = _parsePx(delta)) !== false) {
	            this['d' + mode] = refPx + deltaPx + "px";
	          } else {
	            this['d' + mode] = refPx + axis.getRelPx(delta) + "px";
	          }
	        } else {

	          refd = this.getValPosition(refd, axis);

	          if ((deltaPx = _parsePx(delta)) !== false) {
	            this['d' + mode] = refd + axis.getRelVal(deltaPx);
	          } else {
	            this['d' + mode] = refd + delta;
	          }
	        }
	      }
	    }

	    getValPosition(rel, axis) {

	      if (rel == 'max') {
	        return axis.getMaxValue();
	      }

	      if (rel == 'min') {
	        return axis.getMinValue();
	      }

	      return rel;
	    }

	    /**
	     *  Computes a value in pixels
	     *  @param {Number} value - The value in axis unit
	     *  @param {Axis} axis - The x or y axis to consider (has to belong to the graph)
	     *  @param {Boolean} rel - Whether or not the value is a distance 
	     *  @return {(Number|String)} The computed value
	     */
	    getPx(value, axis, rel) {

	      var parsed;

	      if (typeof value == "function") {

	        return value(axis, rel);
	      } else if ((parsed = _parsePx(value)) !== false) {

	        return parsed; // return integer (will be interpreted as px)
	      } else if (parsed = this._parsePercent(value)) {

	        return parsed; // returns xx%
	      } else if (axis) {

	        if (value == "min") {

	          return axis.getMinPx();
	        } else if (value == "max") {

	          return axis.getMaxPx();
	        } else if (rel) {

	          return axis.getRelPx(value);
	        } else if (isNumeric(value)) {

	          return axis.getPos(value);
	        }
	      }
	    }

	    getPxRel(value, axis) {
	      return this.getPx(value, axis, true);
	    }

	    /**
	     *  Assigns the current position as relative to another. This is used when a position is used with "dx" or "dy" and not "x" or "y"
	     *  @param {Position} pos - The reference position
	     *  @return {Position} The current position
	     */
	    relativeTo(pos) {
	      this._relativeTo = Position.check(pos);
	      return this;
	    }

	    /**
	     *  Checks if an object is a position. If not, creates a new Position instance with the ```pos``` object. If a new position is created, ```callback``` is fired with the position as a unique parameter. The return of the function, if not false, should be a ```Position``` instance which serves as the reference position.
	     *  @example Position.check( { x: 1, y: 2 }, function() { return someOtherPosition; } );
	     *  @param {(Object|Position)} pos - The position object or the object fed into the constructor
	     *  @param {Function} callback - The callback fired if a new position is created
	     *  @return {Position} The resulting position object
	     */
	    static check(pos, callback) {
	      if (pos instanceof Position) {
	        return pos;
	      }

	      var posObject = new Position(pos);

	      if (pos && pos.relativeTo) {
	        var position;
	        if (position = callback(pos.relativeTo)) {
	          posObject.relativeTo(position);
	        }
	      }

	      return posObject;
	    }
	  }

	  exports.default = Position;
	});

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports);
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports);
	    global.graphUtil = mod.exports;
	  }
	})(this, function (exports) {
	  "use strict";

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports.setAttributeTo = setAttributeTo;
	  exports.mapEventEmission = mapEventEmission;
	  exports.guid = guid;
	  exports.throwError = throwError;
	  exports.warn = warn;
	  exports.isNumeric = isNumeric;
	  exports.hue2rgb = hue2rgb;
	  exports.hslToRgb = hslToRgb;
	  exports.saveDomAttributes = saveDomAttributes;
	  exports.hasSavedAttribute = hasSavedAttribute;
	  exports.overwriteDomAttribute = overwriteDomAttribute;
	  exports.restoreDomAttributes = restoreDomAttributes;
	  exports.debounce = debounce;
	  exports.SVGParser = SVGParser;
	  exports.reverseArray = reverseArray;
	  exports.getOffset = getOffset;
	  exports.setCSS = setCSS;
	  exports.ajaxGet = ajaxGet;
	  exports.extend = extend;
	  exports.mix = mix;
	  exports.emptyDom = emptyDom;
	  /**
	   * Easy set attribute method to apply to a SVG Element the attributes listed. Optional namespacing
	   * @param {SVGElement} to - The SVG element to apply the attributes to
	   * @param {Object<String,Any>} attr - A key/value hashmap of attributes
	   * @param {String} [ ns = undefined ] - The namespace to use (with <code>setAttributeNS</code>). Default if without namespacing
	   */
	  function setAttributeTo(to, params, ns) {
	    var i;

	    if (ns) {
	      for (i in params) {
	        to.setAttributeNS(ns, i, params[i]);
	      }
	    } else {
	      for (i in params) {
	        to.setAttribute(i, params[i]);
	      }
	    }
	  };

	  /**
	   * Maps old-style events defined within the creation (i.e. <code>{ onMouseOver: function() }</code>) to modern event listening <code>.on("mouseover")</code>
	   * The function will read any object and select the ones starting with "on"
	   * @params {Object} options - An option object to read the events from
	   * @param {Object} source - The source object to which the options belong
	   * @example util.mapEventEmission( this.options, this );
	   */
	  function mapEventEmission(options, source) {

	    if (!source) {
	      source = this;
	    }

	    var eventName;

	    for (var i in options) {

	      // Starts with onXXX
	      if (i.indexOf("on") == 0 && typeof options[i] == "function") {
	        eventName = i.substring(2);
	        eventName = eventName.substring(0, 1).toLowerCase() + eventName.substring(1);

	        if (source.on) {

	          (function (j) {

	            source.on(eventName, function () {
	              options[j].apply(source, arguments);
	            });
	          })(i);
	        }
	      }
	    }
	  };

	  /**
	   * @link http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
	   * @return {String} a random id
	   */
	  function guid() {
	    // 
	    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
	      var r = Math.random() * 16 | 0,
	          v = c == 'x' ? r : r & 0x3 | 0x8;
	      return v.toString(16);
	    });
	  };

	  function throwError(message) {
	    console.error(message);
	  };

	  function warn(message) {
	    console.warn(message);
	  };

	  /**
	   * Checks if a variable is a numeric or not
	   * @return {Boolean} <code>true</code> for a numeric value, false otherwise
	   */
	  function isNumeric(obj) {
	    return !Array.isArray(obj) && obj - parseFloat(obj) + 1 >= 0;
	  };

	  /**
	   * @see http://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
	   * Converts an HSL color value to RGB. Conversion formula
	   * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
	   * Assumes h, s, and l are contained in the set [0, 1] and
	   * returns r, g, and b in the set [0, 255].
	   *
	   * @param   Number  h       The hue
	   * @param   Number  s       The saturation
	   * @param   Number  l       The lightness
	   * @return  Array           The RGB representation
	   */
	  function hue2rgb(p, q, t) {
	    if (t < 0) t += 1;
	    if (t > 1) t -= 1;
	    if (t < 1 / 6) return p + (q - p) * 6 * t;
	    if (t < 1 / 2) return q;
	    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
	    return p;
	  };

	  function hslToRgb(h, s, l) {
	    var r, g, b;

	    if (s == 0) {
	      r = g = b = l; // achromatic
	    } else {

	      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
	      var p = 2 * l - q;
	      r = hue2rgb(p, q, h + 1 / 3);
	      g = hue2rgb(p, q, h);
	      b = hue2rgb(p, q, h - 1 / 3);
	    }

	    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
	  };

	  function saveDomAttributes(to, attributes, identification) {

	    if (!to) return;

	    to._savedAttributesIds = to._savedAttributesIds || [];

	    if (to._savedAttributesIds.indexOf(identification) > -1) {
	      restoreDomAttributes(to, identification);
	    }

	    to._savedAttributes = to._savedAttributes || {};
	    to._attributes = to._attributes || {};
	    to._attributes[identification] = attributes;

	    to._savedAttributesIds.push(identification);

	    for (var i in attributes) {

	      if (!to._savedAttributes[i]) {
	        to._savedAttributes[i] = to.getAttribute(i);
	      }

	      to.setAttribute(i, attributes[i]);
	    }
	  };

	  function hasSavedAttribute(dom, attr) {
	    return dom._savedAttributes && dom._savedAttributes[attr] !== undefined;
	  }

	  function overwriteDomAttribute(dom, attribute, newValue) {
	    if (hasSavedAttribute(dom, attribute)) {
	      dom._savedAttributes[attribute] = newValue;
	    }
	  }

	  function restoreDomAttributes(to, identification) {

	    if (!to || !to._savedAttributesIds) {
	      return;
	    }

	    to._savedAttributesIds.splice(to._savedAttributesIds.indexOf(identification), 1);
	    delete to._attributes[identification];

	    var attrs = {};

	    for (var i in to._savedAttributes) {
	      attrs[i] = to._savedAttributes[i];
	    };

	    for (var i = 0, l = to._savedAttributesIds.length; i < l; i++) {

	      for (var j in to._attributes[to._savedAttributesIds[i]]) {
	        attrs[j] = to._attributes[to._savedAttributesIds[i]][j];
	      }
	    }

	    for (var j in attrs) {
	      to.setAttribute(j, attrs[j]);
	    }
	  };

	  // https://davidwalsh.name/function-debounce
	  function debounce(func, wait, immediate) {
	    var timeout;
	    return function () {
	      var context = this,
	          args = arguments;
	      var later = function () {
	        timeout = null;
	        if (!immediate) func.apply(context, args);
	      };
	      var callNow = immediate && !timeout;
	      clearTimeout(timeout);
	      timeout = setTimeout(later, wait);
	      if (callNow) func.apply(context, args);
	    };
	  };

	  function SVGParser(svgString) {

	    var parser = new DOMParser();
	    var doc = parser.parseFromString(svgString, "image/svg+xml");
	    // returns a SVGDocument, which also is a Document.

	    return doc;
	  };

	  // http://stackoverflow.com/questions/5276953/what-is-the-most-efficient-way-to-reverse-an-array-in-javascript
	  function reverseArray(array) {
	    var left = null;
	    var right = null;
	    var length = array.length;
	    for (left = 0, right = length - 1; left < right; left += 1, right -= 1) {
	      var temporary = array[left];
	      array[left] = array[right];
	      array[right] = temporary;
	    }
	    return array;
	  };

	  // jQuery.fn.offset
	  function getOffset(el) {
	    var rect = el.getBoundingClientRect();
	    return {
	      top: rect.top + document.body.scrollTop,
	      left: rect.left + document.body.scrollLeft
	    };
	  };

	  // jQuery.fn.css
	  function setCSS(element, values) {
	    var style = element.style;
	    for (var i in values) {
	      style[i] = values[i];
	    }
	  };

	  function ajaxGet(options) {
	    return new Promise(function (resolve, reject) {
	      var request = new XMLHttpRequest();
	      request.open(options.type || 'GET', options.url, true);
	      if (options.json) request.setRequestHeader('Accept', 'application/json');
	      request.onload = function () {
	        if (request.status === 200) {
	          var response = request.responseText;
	          if (options.json) response = JSON.parse(response);
	          resolve(response);
	        } else {
	          reject(new Error('Request error: ' + request.status));
	        }
	      };
	      request.onerror = function () {
	        reject(new Error('Network error: ' + request.status));
	      };
	      request.send();
	    });
	  };

	  // https://raw.githubusercontent.com/justmoon/node-extend/888f153645115d1c6aa9a7e346e8e9cd9a83de9b/index.js
	  // Copyright (c) 2014 Stefan Thomas
	  var hasOwn = Object.prototype.hasOwnProperty;
	  var toStr = Object.prototype.toString;

	  var isArray = function isArray(arr) {
	    if (typeof Array.isArray === 'function') {
	      return Array.isArray(arr);
	    }

	    return toStr.call(arr) === '[object Array]';
	  };

	  var isPlainObject = function isPlainObject(obj) {
	    if (!obj || toStr.call(obj) !== '[object Object]') {
	      return false;
	    }

	    var hasOwnConstructor = hasOwn.call(obj, 'constructor');
	    var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
	    // Not own constructor property must be Object
	    if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
	      return false;
	    }

	    // Own properties are enumerated firstly, so to speed up,
	    // if last one is own, then all properties are own.
	    var key;
	    for (key in obj) {/**/}

	    return typeof key === 'undefined' || hasOwn.call(obj, key);
	  };

	  function extend() {
	    var options, name, src, copy, copyIsArray, clone;
	    var target = arguments[0];
	    var i = 1;
	    var length = arguments.length;
	    var deep = false;

	    // Handle a deep copy situation
	    if (typeof target === 'boolean') {
	      deep = target;
	      target = arguments[1] || {};
	      // skip the boolean and the target
	      i = 2;
	    } else if (typeof target !== 'object' && typeof target !== 'function' || target == null) {
	      target = {};
	    }

	    for (; i < length; ++i) {
	      options = arguments[i];
	      // Only deal with non-null/undefined values
	      if (options != null) {
	        // Extend the base object
	        for (name in options) {
	          src = target[name];
	          copy = options[name];

	          // Prevent never-ending loop
	          if (target !== copy) {
	            // Recurse if we're merging plain objects or arrays
	            if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
	              if (copyIsArray) {
	                copyIsArray = false;
	                clone = src && isArray(src) ? src : [];
	              } else {
	                clone = src && isPlainObject(src) ? src : {};
	              }

	              // Never move original objects, clone them
	              target[name] = extend(deep, clone, copy);

	              // Don't bring in undefined values
	            } else if (typeof copy !== 'undefined') {
	              target[name] = copy;
	            }
	          }
	        }
	      }
	    }

	    // Return the modified object
	    return target;
	  };

	  exports.isArray = isArray;
	  exports.isPlainObject = isPlainObject;
	  function mix(baseClass, mixin) {

	    for (let prop in mixin) {

	      if (mixin.hasOwnProperty(prop)) {
	        baseClass.prototype[prop] = mixin[prop];
	      }
	    }
	  }

	  function emptyDom(dom) {
	    while (dom.firstChild) {
	      dom.removeChild(dom.firstChild);
	    }
	  }
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory();
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory();
	    global.EventEmitter = mod.exports;
	  }
	})(this, function () {
	  'use strict';

	  /*!
	   * EventEmitter v4.2.9 - git.io/ee
	   * Oliver Caldwell
	   * MIT license
	   * @preserve
	   */

	  !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    'use strict';

	    /**
	     * Class for managing events.
	     * Can be extended to provide event functionality in other classes.
	     *
	     * @class EventEmitter Manages event registering and emitting.
	     */

	    function EventEmitter() {}

	    // Shortcuts to improve speed and size
	    var proto = EventEmitter.prototype;

	    /**
	     * Finds the index of the listener for the event in its storage array.
	     *
	     * @param {Function[]} listeners Array of listeners to search through.
	     * @param {Function} listener Method to look for.
	     * @return {Number} Index of the specified listener, -1 if not found
	     * @api private
	     */
	    function indexOfListener(listeners, listener) {
	      var i = listeners.length;
	      while (i--) {
	        if (listeners[i].listener === listener) {
	          return i;
	        }
	      }

	      return -1;
	    }

	    /**
	     * Alias a method while keeping the context correct, to allow for overwriting of target method.
	     *
	     * @param {String} name The name of the target method.
	     * @return {Function} The aliased method
	     * @api private
	     */
	    function alias(name) {
	      return function aliasClosure() {
	        return this[name].apply(this, arguments);
	      };
	    }

	    /**
	     * Returns the listener array for the specified event.
	     * Will initialise the event object and listener arrays if required.
	     * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
	     * Each property in the object response is an array of listener functions.
	     *
	     * @param {String|RegExp} evt Name of the event to return the listeners from.
	     * @return {Function[]|Object} All listener functions for the event.
	     */
	    proto.getListeners = function getListeners(evt) {
	      var events = this._getEvents();
	      var response;
	      var key;

	      // Return a concatenated array of all matching events if
	      // the selector is a regular expression.
	      if (evt instanceof RegExp) {
	        response = {};
	        for (key in events) {
	          if (events.hasOwnProperty(key) && evt.test(key)) {
	            response[key] = events[key];
	          }
	        }
	      } else {
	        response = events[evt] || (events[evt] = []);
	      }

	      return response;
	    };

	    /**
	     * Takes a list of listener objects and flattens it into a list of listener functions.
	     *
	     * @param {Object[]} listeners Raw listener objects.
	     * @return {Function[]} Just the listener functions.
	     */
	    proto.flattenListeners = function flattenListeners(listeners) {
	      var flatListeners = [];
	      var i;

	      for (i = 0; i < listeners.length; i += 1) {
	        flatListeners.push(listeners[i].listener);
	      }

	      return flatListeners;
	    };

	    /**
	     * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
	     *
	     * @param {String|RegExp} evt Name of the event to return the listeners from.
	     * @return {Object} All listener functions for an event in an object.
	     */
	    proto.getListenersAsObject = function getListenersAsObject(evt) {
	      var listeners = this.getListeners(evt);
	      var response;

	      if (listeners instanceof Array) {
	        response = {};
	        response[evt] = listeners;
	      }

	      return response || listeners;
	    };

	    /**
	     * Adds a listener function to the specified event.
	     * The listener will not be added if it is a duplicate.
	     * If the listener returns true then it will be removed after it is called.
	     * If you pass a regular expression as the event name then the listener will be added to all events that match it.
	     *
	     * @param {String|RegExp} evt Name of the event to attach the listener to.
	     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.addListener = function addListener(evt, listener) {
	      var listeners = this.getListenersAsObject(evt);
	      var listenerIsWrapped = typeof listener === 'object';
	      var key;

	      for (key in listeners) {
	        if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
	          listeners[key].push(listenerIsWrapped ? listener : {
	            listener: listener,
	            once: false
	          });
	        }
	      }

	      return this;
	    };

	    /**
	     * Alias of addListener
	     */
	    proto.on = alias('addListener');

	    /**
	     * Semi-alias of addListener. It will add a listener that will be
	     * automatically removed after its first execution.
	     *
	     * @param {String|RegExp} evt Name of the event to attach the listener to.
	     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.addOnceListener = function addOnceListener(evt, listener) {
	      return this.addListener(evt, {
	        listener: listener,
	        once: true
	      });
	    };

	    /**
	     * Alias of addOnceListener.
	     */
	    proto.once = alias('addOnceListener');

	    /**
	     * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
	     * You need to tell it what event names should be matched by a regex.
	     *
	     * @param {String} evt Name of the event to create.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.defineEvent = function defineEvent(evt) {
	      this.getListeners(evt);
	      return this;
	    };

	    /**
	     * Uses defineEvent to define multiple events.
	     *
	     * @param {String[]} evts An array of event names to define.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.defineEvents = function defineEvents(evts) {
	      for (var i = 0; i < evts.length; i += 1) {
	        this.defineEvent(evts[i]);
	      }
	      return this;
	    };

	    /**
	     * Removes a listener function from the specified event.
	     * When passed a regular expression as the event name, it will remove the listener from all events that match it.
	     *
	     * @param {String|RegExp} evt Name of the event to remove the listener from.
	     * @param {Function} listener Method to remove from the event.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.removeListener = function removeListener(evt, listener) {
	      var listeners = this.getListenersAsObject(evt);
	      var index;
	      var key;

	      for (key in listeners) {
	        if (listeners.hasOwnProperty(key)) {
	          index = indexOfListener(listeners[key], listener);

	          if (index !== -1) {
	            listeners[key].splice(index, 1);
	          }
	        }
	      }

	      return this;
	    };

	    /**
	     * Alias of removeListener
	     */
	    proto.off = alias('removeListener');

	    /**
	     * Adds listeners in bulk using the manipulateListeners method.
	     * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
	     * You can also pass it a regular expression to add the array of listeners to all events that match it.
	     * Yeah, this function does quite a bit. That's probably a bad thing.
	     *
	     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
	     * @param {Function[]} [listeners] An optional array of listener functions to add.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.addListeners = function addListeners(evt, listeners) {
	      // Pass through to manipulateListeners
	      return this.manipulateListeners(false, evt, listeners);
	    };

	    /**
	     * Removes listeners in bulk using the manipulateListeners method.
	     * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	     * You can also pass it an event name and an array of listeners to be removed.
	     * You can also pass it a regular expression to remove the listeners from all events that match it.
	     *
	     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
	     * @param {Function[]} [listeners] An optional array of listener functions to remove.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.removeListeners = function removeListeners(evt, listeners) {
	      // Pass through to manipulateListeners
	      return this.manipulateListeners(true, evt, listeners);
	    };

	    /**
	     * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
	     * The first argument will determine if the listeners are removed (true) or added (false).
	     * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	     * You can also pass it an event name and an array of listeners to be added/removed.
	     * You can also pass it a regular expression to manipulate the listeners of all events that match it.
	     *
	     * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
	     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
	     * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
	      var i;
	      var value;
	      var single = remove ? this.removeListener : this.addListener;
	      var multiple = remove ? this.removeListeners : this.addListeners;

	      // If evt is an object then pass each of its properties to this method
	      if (typeof evt === 'object' && !(evt instanceof RegExp)) {
	        for (i in evt) {
	          if (evt.hasOwnProperty(i) && (value = evt[i])) {
	            // Pass the single listener straight through to the singular method
	            if (typeof value === 'function') {
	              single.call(this, i, value);
	            } else {
	              // Otherwise pass back to the multiple function
	              multiple.call(this, i, value);
	            }
	          }
	        }
	      } else {
	        // So evt must be a string
	        // And listeners must be an array of listeners
	        // Loop over it and pass each one to the multiple method
	        i = listeners.length;
	        while (i--) {
	          single.call(this, evt, listeners[i]);
	        }
	      }

	      return this;
	    };

	    /**
	     * Removes all listeners from a specified event.
	     * If you do not specify an event then all listeners will be removed.
	     * That means every event will be emptied.
	     * You can also pass a regex to remove all events that match it.
	     *
	     * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.removeEvent = function removeEvent(evt) {
	      var type = typeof evt;
	      var events = this._getEvents();
	      var key;

	      // Remove different things depending on the state of evt
	      if (type === 'string') {
	        // Remove all listeners for the specified event
	        delete events[evt];
	      } else if (evt instanceof RegExp) {
	        // Remove all events matching the regex.
	        for (key in events) {
	          if (events.hasOwnProperty(key) && evt.test(key)) {
	            delete events[key];
	          }
	        }
	      } else {
	        // Remove all listeners in all events
	        delete this._events;
	      }

	      return this;
	    };

	    /**
	     * Alias of removeEvent.
	     *
	     * Added to mirror the node API.
	     */
	    proto.removeAllListeners = alias('removeEvent');

	    /**
	     * Emits an event of your choice.
	     * When emitted, every listener attached to that event will be executed.
	     * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
	     * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
	     * So they will not arrive within the array on the other side, they will be separate.
	     * You can also pass a regular expression to emit to all events that match it.
	     *
	     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	     * @param {Array} [args] Optional array of arguments to be passed to each listener.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.emitEvent = function emitEvent(evt, args) {
	      var listeners = this.getListenersAsObject(evt);
	      var listener;
	      var i;
	      var key;
	      var response;

	      for (key in listeners) {
	        if (listeners.hasOwnProperty(key)) {
	          i = listeners[key].length;

	          while (i--) {
	            // If the listener returns true then it shall be removed from the event
	            // The function is executed either with a basic call or an apply if there is an args array
	            listener = listeners[key][i];

	            if (listener.once === true) {
	              this.removeListener(evt, listener.listener);
	            }

	            response = listener.listener.apply(this, args || []);

	            if (response === this._getOnceReturnValue()) {
	              this.removeListener(evt, listener.listener);
	            }
	          }
	        }
	      }

	      return this;
	    };

	    /**
	     * Alias of emitEvent
	     */
	    proto.trigger = alias('emitEvent');

	    /**
	     * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
	     * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
	     *
	     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	     * @param {...*} Optional additional arguments to be passed to each listener.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.emit = function emit(evt) {
	      var args = Array.prototype.slice.call(arguments, 1);
	      return this.emitEvent(evt, args);
	    };

	    /**
	     * Sets the current value to check against when executing listeners. If a
	     * listeners return value matches the one set here then it will be removed
	     * after execution. This value defaults to true.
	     *
	     * @param {*} value The new value to check for when executing listeners.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.setOnceReturnValue = function setOnceReturnValue(value) {
	      this._onceReturnValue = value;
	      return this;
	    };

	    /**
	     * Fetches the current value to check against when executing listeners. If
	     * the listeners return value matches this one then it should be removed
	     * automatically. It will return true by default.
	     *
	     * @return {*|Boolean} The current value to check for or the default, true.
	     * @api private
	     */
	    proto._getOnceReturnValue = function _getOnceReturnValue() {
	      if (this.hasOwnProperty('_onceReturnValue')) {
	        return this._onceReturnValue;
	      } else {
	        return true;
	      }
	    };

	    /**
	     * Fetches the events object and creates one if required.
	     *
	     * @return {Object} The events storage object.
	     * @api private
	     */
	    proto._getEvents = function _getEvents() {
	      return this._events || (this._events = {});
	    };

	    return EventEmitter;
	  }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(2), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('./graph.position'), require('./graph.util'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.graph, global.graph);
	    global.graphLegend = mod.exports;
	  }
	})(this, function (exports, _graph, _graph3) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _graph2 = _interopRequireDefault(_graph);

	  var util = _interopRequireWildcard(_graph3);

	  function _interopRequireWildcard(obj) {
	    if (obj && obj.__esModule) {
	      return obj;
	    } else {
	      var newObj = {};

	      if (obj != null) {
	        for (var key in obj) {
	          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	        }
	      }

	      newObj.default = obj;
	      return newObj;
	    }
	  }

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  /** 
	   * Default legend configuration
	   * @name LegendOptionsDefault
	   * @object
	   * @static
	   * @prop {Boolean} frame - <code>true</code> to display a frame around the legend
	   * @prop {Number} frameWidth - The width of the frame stroke
	   * @prop {String} frameColor - The stroke color of the frame
	   * @prop {String} backgroundColor - The background color of the frame
	   * @prop {Number} paddingLeft - The left padding
	   * @prop {Number} paddingRight - The right padding
	   * @prop {Number} paddingTop - The top padding
	   * @prop {Number} paddingBottom - The bottom padding
	   * @prop {Boolean} shapesToggleable - <code>true</code> to toggle the shapes linked to serie with its status (shown or hidden)
	   * @prop {Boolean} isSerieHideable - <code>true</code> to allow series to be hidden through the legend
	   * @prop {Boolean} isSerieSelectable - <code>true</code> to allow series to be selected through the legend
	   */
	  var legendDefaults = {

	    backgroundColor: 'rgba(255, 255, 255, 0.8)',
	    frame: true,
	    frameWidth: 1,
	    frameColor: 'black',
	    paddingTop: 10,
	    paddingLeft: 10,
	    paddingBottom: 10,
	    paddingRight: 10,
	    frameRounding: 0,

	    movable: false,

	    shapesToggleable: true,
	    isSerieHideable: true,
	    isSerieSelectable: true

	  };

	  /** 
	   * Legend constructor. You should not call this method directly, but rather use {@link graph.makeLegend}
	   * @example var legend = graph.makeLegend( {  backgroundColor: 'rgba(255, 255, 255, 0.8)',
	   * frame: true,
	   * frameWidth: 1,
	   * frameColor: 'black',
	   * paddingTop: 10,
	   * paddingLeft: 10,
	   * paddingBottom: 10,
	   * paddingRight: 10,
	   * frameRounding: 3,
	   *
	   * movable: false,
	   *
	   * shapesToggleable: true,
	   * isSerieHideable: true,
	   * isSerieSelectable: true
	   * } );
	   */
	  class Legend {

	    constructor(graph, options) {

	      this.options = util.extend({}, legendDefaults, options);

	      this.graph = graph;
	      this.svg = document.createElementNS(this.graph.ns, 'g');
	      this.subG = document.createElementNS(this.graph.ns, 'g');

	      this.groups = [];
	      this.rect = document.createElementNS(this.graph.ns, 'rect');
	      this.rectBottom = document.createElementNS(this.graph.ns, 'rect');

	      this.rect.setAttribute('x', 0);
	      this.rect.setAttribute('y', 0);

	      this.rectBottom.setAttribute('x', 0);
	      this.rectBottom.setAttribute('y', 0);

	      this.series = false;

	      this.svg.setAttribute('display', 'none');
	      this.pos = {
	        x: undefined,
	        y: undefined,
	        transformX: 0,
	        transformY: 0
	      };

	      this.setEvents();

	      this.eyeId = util.guid();
	      this.eyeCrossedId = util.guid();

	      var eyeClosed = util.SVGParser('<svg xmlns="http://www.w3.org/2000/svg"><symbol id="' + this.eyeCrossedId + '" viewBox="0 -256 1850 1850"><rect pointer-events="fill" fill="transparent" x="-256" y="0" width="2106" height="1850" /><g transform="matrix(1,0,0,-1,30.372881,1214.339)"><path d="m 555,201 78,141 q -87,63 -136,159 -49,96 -49,203 0,121 61,225 Q 280,812 128,576 295,318 555,201 z m 389,759 q 0,20 -14,34 -14,14 -34,14 -125,0 -214.5,-89.5 Q 592,829 592,704 q 0,-20 14,-34 14,-14 34,-14 20,0 34,14 14,14 14,34 0,86 61,147 61,61 147,61 20,0 34,14 14,14 14,34 z m 363,191 q 0,-7 -1,-9 Q 1201,954 991,576 781,198 675,9 l -49,-89 q -10,-16 -28,-16 -12,0 -134,70 -16,10 -16,28 0,12 44,87 Q 349,154 228.5,262 108,370 20,507 0,538 0,576 q 0,38 20,69 153,235 380,371 227,136 496,136 89,0 180,-17 l 54,97 q 10,16 28,16 5,0 18,-6 13,-6 31,-15.5 18,-9.5 33,-18.5 15,-9 31.5,-18.5 16.5,-9.5 19.5,-11.5 16,-10 16,-27 z m 37,-447 Q 1344,565 1265,450.5 1186,336 1056,286 l 280,502 q 8,-45 8,-84 z m 448,-128 q 0,-35 -20,-69 Q 1733,443 1663,362 1513,190 1315.5,95 1118,0 896,0 l 74,132 q 212,18 392.5,137 180.5,119 301.5,307 -115,179 -282,294 l 63,112 q 95,-64 182.5,-153 87.5,-89 144.5,-184 20,-34 20,-69 z" fill="#c0c0c0"></path></g></symbol></svg>');
	      //  var eyeClosed = util.SVGParser('<svg xmlns="http://www.w3.org/2000/svg"><symbol id="' + this.eyeId + '" viewBox="0 0 100 100"><rect fill="black" x="0" y="0" width="100" height="100" /></symbol></svg>');

	      /* var eyeClosed = document.createElementNS( this.graph.ns, "symbol");
	        eyeClosed.setAttribute('id', this.eyeId );
	        eyeClosed.setAttribute("viewBox", '0 0 100 100');
	         var rect = document.createElementNS( this.graph.ns, "rect" );
	        rect.setAttribute('width', 100 );
	        rect.setAttribute('height', 100 );
	        rect.setAttribute('x', 0 );
	        rect.setAttribute('y', 0 );
	        rect.setAttribute('fill', 'black');
	        eyeClosed.appendChild( rect );
	      */
	      var eye = util.SVGParser('<svg xmlns="http://www.w3.org/2000/svg"><symbol id="' + this.eyeId + '" viewBox="0 -256 1850 1850"><rect pointer-events="fill" x="-256" y="0" fill="transparent" width="2106" height="1850" /><g transform="matrix(1,0,0,-1,30.372881,1259.8983)"><path d="m 1664,576 q -152,236 -381,353 61,-104 61,-225 0,-185 -131.5,-316.5 Q 1081,256 896,256 711,256 579.5,387.5 448,519 448,704 448,825 509,929 280,812 128,576 261,371 461.5,249.5 662,128 896,128 1130,128 1330.5,249.5 1531,371 1664,576 z M 944,960 q 0,20 -14,34 -14,14 -34,14 -125,0 -214.5,-89.5 Q 592,829 592,704 q 0,-20 14,-34 14,-14 34,-14 20,0 34,14 14,14 14,34 0,86 61,147 61,61 147,61 20,0 34,14 14,14 14,34 z m 848,-384 q 0,-34 -20,-69 Q 1632,277 1395.5,138.5 1159,0 896,0 633,0 396.5,139 160,278 20,507 0,542 0,576 q 0,34 20,69 140,229 376.5,368 236.5,139 499.5,139 263,0 499.5,-139 236.5,-139 376.5,-368 20,-35 20,-69 z" fill="#444444" /></g></symbol></svg>');

	      this.svg.appendChild(document.adoptNode(eye.documentElement.firstChild));
	      this.svg.appendChild(document.adoptNode(eyeClosed.documentElement.firstChild));

	      this.svg.appendChild(this.subG);

	      this.applyStyle();
	    }

	    /** 
	     * Sets the position of the legend
	     * @param {Position} position - the position to set the legend to versus the graph main axes ({@link Graph#getXAxis} and {@link Graph#getYAxis})
	     * @param {String} alignToX - "right" or "left". References the legend right or left boundary using the position parameter
	     * @param {String} alignToY - "top" or "bottom". References the legend top or bottom boundary using the position parameter
	     * @example legend.setPosition( { x: 'max', y: '0px' }, 'right', 'top' ); // The rightmost side of the legend will at the maximum value of the axis, and will be positioned at the top
	     */
	    setPosition(position, alignToX, alignToY) {

	      if (!position) {
	        return;
	      }

	      this.position = position;
	      this.alignToX = alignToX || 'left';
	      this.alignToY = alignToY || 'top';
	    }

	    setDraggable(bln) {
	      this.options.movable = bln;
	    }

	    setAutoPosition(position) {

	      if (['bottom', 'left', 'top', 'right'].indexOf(position = position.toLowerCase()) > -1) {
	        this.autoPosition = position;
	        return this;
	      }

	      this.requireDelayedUpdate();
	      this.autoPosition = false;
	    }

	    autoPosition() {
	      return this.setAutoPosition(...arguments);
	    }

	    buildLegendBox() {

	      var series = this.series || this.graph.getSeries(),
	          posX = 0,
	          posY = this.options.paddingTop;

	      if (!this.autoPosition) {
	        this.graph.graphingZone.appendChild(this.getDom());
	      } else {
	        this.graph.getDom().appendChild(this.getDom());
	      }

	      for (var i = 0, l = series.length; i < l; i++) {

	        if (series[i].excludedFromLegend && !this.series) {
	          continue;
	        }

	        if (this.autoPosition == 'bottom' || this.autoPosition == 'top') {

	          var bbox = getBBox(this.groups[i]);

	          if (posX + bbox.width > this.graph.getDrawingWidth() - this.options.paddingRight) {
	            posY += 16;
	            posX = 0;
	          }
	        }

	        this.groups[i].setAttribute('transform', "translate( " + posX + ", " + posY + ")");

	        if (this.autoPosition == 'bottom' || this.autoPosition == 'top') {

	          posX += bbox.width + 10;
	          posY += 0;
	        } else {

	          posX = 0;
	          posY += 16;
	        }
	      }

	      var bbox = getBBox(this.subG);

	      /* Independant on box position */
	      this.width = bbox.width + this.options.paddingRight + this.options.paddingLeft;
	      this.height = bbox.height + this.options.paddingBottom + this.options.paddingTop;

	      this.rect.setAttribute('width', this.width);
	      this.rect.setAttribute('height', this.height);
	      this.rect.setAttribute('fill', 'none');
	      this.rect.setAttribute('pointer-events', 'fill');

	      this.rect.setAttribute('display', 'none');

	      if (this.options.movable) {
	        this.rectBottom.style.cursor = "move";
	      }

	      this.rectBottom.setAttribute('width', this.width);
	      this.rectBottom.setAttribute('height', this.height);

	      this.rectBottom.setAttribute('x', bbox.x - this.options.paddingLeft);
	      this.rectBottom.setAttribute('y', bbox.y - this.options.paddingTop);
	      /* End independant on box position */

	      this.position = this.position || {};

	      switch (this.autoPosition) {

	        case 'bottom':
	          this.position.y = this.graph.getHeight() + "px";
	          this.position.x = (this.graph.getWidth() - this.width) / 2 + "px";
	          this.alignToY = "bottom";
	          this.alignToX = false;
	          break;

	        case 'left':
	          this.position.x = "6px";
	          this.position.y = (this.graph.getHeight() - this.height) / 2 + "px";
	          this.alignToX = "left";
	          this.alignToY = false;
	          break;

	        case 'right':
	          this.position.x = this.graph.getWidth() + "px";
	          this.position.y = (this.graph.getHeight() - this.height) / 2 + "px";
	          this.alignToX = "right";
	          this.alignToY = false;
	          break;

	        case 'top':
	          this.position.x = (this.graph.getWidth() - this.width) / 2 + "px";
	          this.position.y = "10px";
	          this.alignToY = "top";
	          this.alignToX = false;
	          break;
	      }

	      if (this.autoPosition) {
	        switch (this.autoPosition) {

	          case 'bottom':
	            this.graph.options.paddingBottom = this.height + 10;
	            break;

	          case 'left':
	            this.graph.options.paddingLeft = this.width + 5;
	            break;

	          case 'right':
	            this.graph.options.paddingRight = this.width + 10;
	            break;

	          case 'top':
	            this.graph.options.paddingTop = this.height + 14;
	            break;
	        }

	        this.graph.updateGraphingZone();
	        this.graph.getDrawingHeight();
	        this.graph.getDrawingWidth();
	        // this.graph.redraw( false );
	      }

	      this.bbox = bbox;
	    }

	    calculatePosition() {

	      var pos = _graph2.default.check(this.position);
	      let poscoords = pos.compute(this.graph, this.graph.getXAxis(), this.graph.getYAxis());

	      if (!poscoords) {
	        return;
	      }

	      if (this.alignToX == "right") {
	        poscoords.x -= this.width;
	        poscoords.x += this.bbox.x;
	      } else {
	        //poscoords.x -= this.bbox.x;
	      }

	      if (this.alignToY == "bottom") {
	        poscoords.y -= this.height;
	        poscoords.y += this.bbox.y;
	      } else {
	        poscoords.y += this.bbox.y;
	      }

	      this.pos.transformX = poscoords.x;
	      this.pos.transformY = poscoords.y;

	      this._setPosition();
	    }

	    /** 
	     * Updates the legend position and content
	     */
	    update(onlyIfRequired) {

	      if (this.graph.isDelayedUpdate() || !this._requiredUpdate && onlyIfRequired) {
	        return;
	      }

	      this._requiredUpdate = false;

	      var self = this;

	      this.applyStyle();

	      while (this.subG.hasChildNodes()) {
	        this.subG.removeChild(this.subG.lastChild);
	      }

	      this.svg.insertBefore(this.rectBottom, this.svg.firstChild);

	      var series = this.series || this.graph.getSeries(),
	          line,
	          text,
	          g;

	      if (series.length > 0) {
	        this.svg.setAttribute('display', 'block');
	      } else {
	        return;
	      }

	      if (this.autoPosition == 'bottom' || this.autoPosition == 'top') {
	        var fullWidth = this.graph.getDrawingWidth();
	      }

	      var posX, posY;

	      for (var i = 0, l = series.length; i < l; i++) {

	        if (series[i].excludedFromLegend && !this.series) {
	          continue;
	        }

	        (function (j) {

	          var g,
	              line,
	              text,
	              xPadding = 0;

	          if (this.autoPosition == 'bottom' || this.autoPosition == 'top') {
	            var fullWidth = this.graph.getDrawingWidth();
	          }

	          g = document.createElementNS(self.graph.ns, 'g');
	          var rect = document.createElementNS(self.graph.ns, 'rect');

	          self.subG.appendChild(g);

	          g.appendChild(rect);

	          var line = series[j].getSymbolForLegend();
	          var marker = series[j].getMarkerForLegend();
	          var text = series[j].getTextForLegend();

	          var dx = 35;

	          if (this.isHideable()) {
	            dx += 20;

	            var eyeUse = document.createElementNS(self.graph.ns, "use");
	            eyeUse.setAttributeNS('http://www.w3.org/1999/xlink', "xlink:href", "#" + this.eyeId);
	            eyeUse.setAttribute("width", 15);
	            eyeUse.setAttribute("height", 15);
	            eyeUse.setAttribute("x", 35);
	            eyeUse.setAttribute("y", -8);

	            eyeUse.addEventListener("click", function (e) {
	              e.stopPropagation();

	              var id;
	              if (series[j].isShown()) {
	                series[j].hide();
	                id = self.eyeCrossedId;
	              } else {
	                series[j].show();
	                id = self.eyeId;
	              }

	              eyeUse.setAttributeNS('http://www.w3.org/1999/xlink', "xlink:href", "#" + id);
	            });
	          }

	          text.setAttribute('transform', 'translate(' + dx + ', 3)');

	          if (line) {
	            g.appendChild(line);
	          }

	          if (series[j].getType() == "scatter") {
	            line.setAttribute('transform', 'translate( 20, 0 )');
	          }

	          if (marker) {
	            g.appendChild(marker);
	          }

	          if (eyeUse) {
	            g.appendChild(eyeUse);
	          }

	          g.appendChild(text);

	          var bbox = getBBox(g);

	          rect.setAttribute('x', bbox.x);
	          rect.setAttribute('y', bbox.y);
	          rect.setAttribute('width', bbox.width);
	          rect.setAttribute('height', bbox.height);
	          rect.setAttribute('fill', 'none');
	          rect.setAttribute('pointer-events', 'fill');

	          self.groups[j] = g;

	          g.addEventListener('click', function (e) {

	            var serie = series[j];

	            if (self.isSelectable() && !serie.isSelected()) {

	              self.graph.selectSerie(serie);
	            } else {

	              self.graph.unselectSerie(serie);
	            }

	            e.preventDefault();
	            e.stopPropagation();
	          });
	        }).call(this, i);
	      }

	      this.svg.appendChild(this.rect);
	      this.buildLegendBox();
	      this.calculatePosition();
	    }

	    /** 
	     * @return {Boolean} true or false depending if the series can be hidden or not
	     */
	    isHideable() {
	      return this.options.isSerieHideable;
	    }

	    notHideable() {
	      this.options.isSerieHideable = false;
	      return this;
	    }

	    hideable() {
	      this.options.isSerieHideable = true;
	      return this;
	    }

	    set seriesHideable(hideable) {
	      this.options.isSerieHideable = !!hideable;
	    }

	    /**
	     *  @type {Boolean}
	     */
	    get seriesHideable() {
	      return this.options.isSerieHideable;
	    }

	    /** 
	     * @return {Boolean} true or false depending if the series can be selected or not
	     */
	    isSelectable() {
	      return this.options.isSerieSelectable;
	    }

	    /** 
	     * @return {Boolean} true or false depending if the series can be t or not
	     */
	    isToggleShapes() {
	      return this.options.shapesToggleable;
	    }

	    /** 
	     * @return {SVGGroupElement} The SVG group element wrapping the legend
	     */
	    getDom() {
	      return this.svg;
	    }

	    setEvents() {

	      var self = this;
	      var pos = this.pos;

	      var mousedown = function (e) {

	        e.stopPropagation();
	        console.log("down");
	        if (self.options.movable) {
	          pos.x = e.clientX;
	          pos.y = e.clientY;

	          e.preventDefault();
	          self.mousedown = true;
	          self.graph.elementMoving(self);

	          self.rect.setAttribute('display', 'block');
	        }
	      };

	      var mousemove = function (e) {
	        self.handleMouseMove(e);
	      };

	      this.rectBottom.addEventListener('mousedown', mousedown);
	      this.svg.addEventListener('click', function (e) {
	        e.stopPropagation();
	      });
	      this.svg.addEventListener('dblclick', function (e) {
	        e.stopPropagation();
	      });
	      this.rectBottom.addEventListener('mousemove', mousemove);
	      this.rect.addEventListener('mousemove', mousemove);
	    }

	    handleMouseUp(e) {

	      e.stopPropagation();
	      e.preventDefault();
	      this.mousedown = false;
	      this.rect.setAttribute('display', 'none');
	      this.graph.elementMoving(false);
	    }

	    handleMouseMove(e) {

	      if (!this.mousedown) {
	        return;
	      }

	      var pos = this.pos;

	      var deltaX = e.clientX - pos.x;
	      var deltaY = e.clientY - pos.y;

	      pos.transformX += deltaX;
	      pos.transformY += deltaY;

	      pos.x = e.clientX;
	      pos.y = e.clientY;

	      e.stopPropagation();
	      e.preventDefault();

	      this._setPosition();
	    }

	    _setPosition() {

	      var pos = this.pos;
	      if (!isNaN(pos.transformX) && !isNaN(pos.transformY) && pos.transformX !== false && pos.transformY !== false) {
	        this.svg.setAttribute('transform', 'translate(' + pos.transformX + ', ' + pos.transformY + ')');
	      }
	    }

	    /** 
	     * Re-applies the legend style
	     */
	    applyStyle() {

	      if (this.options.frame) {
	        this.rectBottom.setAttribute('stroke', this.options.frameColor);
	        this.rectBottom.setAttribute('stroke-width', this.options.frameWidth + "px");
	        this.rectBottom.setAttribute('rx', this.options.frameRounding);
	        this.rectBottom.setAttribute('ry', this.options.frameRounding);
	      }

	      this.rectBottom.setAttribute('fill', this.options.backgroundColor);
	    }

	    /** 
	     * Re-applies the legend style
	     * @param {...(GraphSerie|GraphSerie[])} a serie or an array of series
	     */
	    fixSeries() {
	      var series = [];

	      if (arguments[0] === false) {
	        this.series = false;
	        this.update();
	        return;
	      }

	      for (var i = 0, l = arguments.length; i < l; i++) {
	        if (Array.isArray(arguments[i])) {
	          series = series.concat(arguments[i]);
	        } else {
	          series.push(arguments[i]);
	        }
	      }

	      this.update();
	      this.series = series;
	    }

	    fixSeriesAdd(serie) {
	      this.series = this.series || [];
	      this.series.push(serie);
	    }

	    requireDelayedUpdate() {
	      this._requiredUpdate = true;
	    }

	  }

	  function getBBox(svgElement) {
	    // Firefox throws when trying to call getBBox() on elements
	    // that are not yet rendered.
	    try {
	      return svgElement.getBBox();
	    } catch (e) {
	      return {
	        height: 0,
	        width: 0,
	        x: 0,
	        y: 0
	      };
	    }
	  }

	  exports.default = Legend;
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(7)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('./graph.axis'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.graph);
	    global.graphAxisX = mod.exports;
	  }
	})(this, function (exports, _graph) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _graph2 = _interopRequireDefault(_graph);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  /** 
	   * Generic constructor of a y axis
	   * @augments Axis
	   */
	  class AxisX extends _graph2.default {

	    constructor(graph, topbottom, options = {}) {

	      super(graph, topbottom, options);
	      this.top = topbottom == 'top';
	    }

	    /**
	     *  @private
	     *  Returns the position of the axis, used by refreshDrawingZone in core module
	     */
	    getAxisPosition() {

	      if (!this.options.display) {
	        return 0;
	      }

	      var size = (this.options.tickPosition == 1 ? 8 : 20) + this.graph.options.fontSize * 1;

	      if (this.getLabel()) {
	        size += this.graph.options.fontSize;
	      }

	      return size;
	    }

	    /**
	     *  @returns {Boolean} always ```true```
	     */
	    isX() {
	      return true;
	    }

	    /**
	     *  @returns {Boolean} always ```false```
	     */
	    isY() {
	      return false;
	    }

	    /**
	     *  @private
	     *  Used to set the x position of the axis
	     */
	    setShift(shift) {

	      this.shift = shift;
	      if (this.getShift() === undefined || !this.graph.getDrawingHeight()) {
	        return;
	      }

	      this.group.setAttribute('transform', 'translate(0 ' + (this.floating ? this.getShift() : this.top ? this.shift : this.graph.getDrawingHeight() - this.shift) + ')');
	    }

	    /**
	     *  Caclulates the maximum tick height
	     *  @return {Number} The maximum tick height
	     */
	    getMaxSizeTick() {
	      return (this.top ? -1 : 1) * (this.options.tickPosition == 1 ? 10 : 10);
	    }

	    /**
	     *  Draws a tick. Mostly used internally but it can be useful if you want to make your own axes
	     *  @param {Number} value - The value in axis unit to place the tick
	     *  @param {Number} level - The importance of the tick
	     *  @param {Object} options - Further options to be passed to ```setTickContent```
	     *  @param {Number} forcedPos - Forces the position of the tick (for axis dependency)
	     */
	    drawTick(value, level, options, forcedPos) {

	      var self = this,
	          val;

	      val = forcedPos || this.getPos(value);

	      if (val == undefined || isNaN(val)) {
	        return;
	      }

	      var tick = this.nextTick(level, function (tick) {

	        tick.setAttribute('y1', (self.top ? 1 : -1) * self.tickPx1 * self.tickScaling[level]);
	        tick.setAttribute('y2', (self.top ? 1 : -1) * self.tickPx2 * self.tickScaling[level]);

	        if (level == 1) {
	          tick.setAttribute('stroke', self.getPrimaryTicksColor());
	        } else {
	          tick.setAttribute('stroke', self.getSecondaryTicksColor());
	        }
	      });

	      //      tick.setAttribute( 'shape-rendering', 'crispEdges' );
	      tick.setAttribute('x1', val);
	      tick.setAttribute('x2', val);

	      this.nextGridLine(level == 1, val, val, 0, this.graph.getDrawingHeight());

	      //  this.groupTicks.appendChild( tick );
	      if (level == 1) {
	        var tickLabel = this.nextTickLabel(function (tickLabel) {

	          tickLabel.setAttribute('y', (self.top ? -1 : 1) * ((self.options.tickPosition == 1 ? 8 : 20) + (self.top ? 10 : 0)));
	          tickLabel.setAttribute('text-anchor', 'middle');
	          if (self.getTicksLabelColor() !== 'black') {
	            tickLabel.setAttribute('fill', self.getTicksLabelColor());
	          }
	          tickLabel.style.dominantBaseline = 'hanging';
	        });

	        tickLabel.setAttribute('x', val);
	        this.setTickContent(tickLabel, value, options);
	      }
	      //    this.ticks.push( tick );

	      return [tick, tickLabel];
	    }

	    drawLabel() {
	      // Place label correctly
	      this.label.setAttribute('text-anchor', 'middle');
	      this.label.setAttribute('x', Math.abs(this.getMaxPx() + this.getMinPx()) / 2);
	      this.label.setAttribute('y', (this.top ? -1 : 1) * ((this.options.tickPosition == 1 ? 10 : 25) + this.graph.options.fontSize));
	      this.labelTspan.textContent = this.getLabel();
	    }

	    draw() {
	      var tickWidth = super.draw(...arguments);
	      this.drawSpecifics();

	      return tickWidth;
	    }
	    /**
	     *  Paints the label, the axis line and anything else specific to x axes
	     */
	    drawSpecifics() {

	      // Adjusts group shift
	      //this.group.setAttribute('transform', 'translate(0 ' + this.getShift() + ')');

	      this.drawLabel();

	      this.line.setAttribute('x1', this.getMinPx());
	      this.line.setAttribute('x2', this.getMaxPx());
	      this.line.setAttribute('y1', 0);
	      this.line.setAttribute('y2', 0);

	      this.line.setAttribute('stroke', this.getAxisColor());

	      if (!this.top) {

	        this.labelTspan.style.dominantBaseline = 'hanging';
	        this.expTspan.style.dominantBaseline = 'hanging';
	        this.expTspanExp.style.dominantBaseline = 'hanging';

	        this.unitTspan.style.dominantBaseline = 'hanging';
	        this.preunitTspan.style.dominantBaseline = 'hanging';
	      }

	      var span = this.getSpan();
	      this.line.setAttribute('marker-start', !this.options.splitMarks || span[0] == 0 ? "" : "url(#horionzalsplit_" + this.graph.getId() + ")");
	      this.line.setAttribute('marker-end', !this.options.splitMarks || span[1] == 1 ? "" : "url(#horionzalsplit_" + this.graph.getId() + ")");
	    }

	    /**
	     *  @private
	     */
	    _draw0Line(px) {

	      if (!this._0line) {
	        this._0line = document.createElementNS(this.graph.ns, 'line');
	      }
	      this._0line.setAttribute('x1', px);
	      this._0line.setAttribute('x2', px);

	      this._0line.setAttribute('y1', 0);
	      this._0line.setAttribute('y2', this.getMaxPx());

	      this._0line.setAttribute('stroke', 'black');
	      this.groupGrids.appendChild(this._0line);
	    }

	    /**
	     *  @private
	     */
	    handleMouseMoveLocal(x, y, e) {
	      x -= this.graph.getPaddingLeft();
	      this.mouseVal = this.getVal(x);
	    }

	    /**
	     *  Caches the minimum px and maximum px position of the axis. Includes axis spans and flipping. Mostly used internally
	     */
	    setMinMaxFlipped() {

	      var interval = this.maxPx - this.minPx;

	      if (isNaN(interval)) {
	        return;
	      }

	      var maxPx = interval * this.options.span[1] + this.minPx - this.options.marginMax;
	      var minPx = interval * this.options.span[0] + this.minPx + this.options.marginMin;

	      this.minPxFlipped = this.isFlipped() ? maxPx : minPx;
	      this.maxPxFlipped = this.isFlipped() ? minPx : maxPx;
	    }

	  }

	  exports.default = AxisX;
	});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1), __webpack_require__(4), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('./graph.core'), require('./dependencies/eventEmitter/EventEmitter'), require('./graph.util'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.graph, global.EventEmitter, global.graph);
	    global.graphAxis = mod.exports;
	  }
	})(this, function (exports, _graph, _EventEmitter, _graph3) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _graph2 = _interopRequireDefault(_graph);

	  var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

	  var util = _interopRequireWildcard(_graph3);

	  function _interopRequireWildcard(obj) {
	    if (obj && obj.__esModule) {
	      return obj;
	    } else {
	      var newObj = {};

	      if (obj != null) {
	        for (var key in obj) {
	          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	        }
	      }

	      newObj.default = obj;
	      return newObj;
	    }
	  }

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  /** 
	   * Default graph parameters
	   * @name AxisOptionsDefault
	   * @object
	   * @static
	   * @memberof Axis
	   * @prop {Boolean} display - Whether to display or not the axis
	   * @prop {Boolean} flipped - Flips the axis (maximum and minimum will be inverted)
	   * @prop {Numner} axisDataSpacing.min - The spacing of the at the bottom of the axis. The value is multiplied by the (max - min) values given by the series (0.1 means 10% of the serie width / height).
	   * @prop {Number} axisDataSpacing.max - The spacing of the at the top of the axis. The value is multiplied by the (max - min) values given by the series (0.1 means 10% of the serie width / height).
	   * @prop {String} unitModification - Used to change the units of the axis in a defined way. Currently, "time" and "time:min.sec" are supported. They will display the value in days, hours, minutes and seconds and the data should be expressed in seconds.
	   * @prop {Boolean} primaryGrid - Whether or not to display the primary grid (on the main ticks)
	   * @prop {Boolean} secondaryGrid - Whether or not to display the secondary grid (on the secondary ticks)
	   * @prop {Number} tickPosition - Sets the position of the ticks with regards to the axis ( 1 = inside, 2 = centered, 3 = outside ).
	   * @prop {Number} nbTicksPrimary - The number of primary ticks to use (approximately)
	   * @prop {Number} nbTicksSecondary - The number of secondary ticks to use (approximately)
	   * @prop {Number} ticklabelratio - Scaling factor on the labels under each primary ticks
	   * @prop {Number} exponentialFactor - Scales the labels under each primary ticks by 10^(exponentialFactor)
	   * @prop {Number} exponentialLabelFactor - Scales the axis label by 10^(exponentialFactor)
	   * @prop {Number} ticklabelratio - Scaling factor on the labels under each primary ticks
	   * @prop {Boolean} logScale - Display the axis in log scale (base 10)
	   * @prop {(Number|Boolean)} forcedMin - Use a number to force the minimum value of the axis (becomes independant of its series)
	   * @prop {(Number|Boolean)} forcedMax - Use a number to force the maximum value of the axis (becomes independant of its series)
	   */
	  const defaults = {
	    lineAt0: false,
	    display: true,
	    flipped: false,
	    axisDataSpacing: {
	      min: 0.1,
	      max: 0.1
	    },
	    unitModification: false,
	    primaryGrid: true,
	    secondaryGrid: true,

	    primaryGridColor: "#f0f0f0",
	    secondaryGridColor: "#f0f0f0",

	    primaryGridWidth: 1,
	    secondaryGridWidth: 1,

	    shiftToZero: false,
	    tickPosition: 1,
	    nbTicksPrimary: 3,
	    nbTicksSecondary: 10,
	    ticklabelratio: 1,
	    exponentialFactor: 0,
	    exponentialLabelFactor: 0,
	    logScale: false,
	    forcedMin: false,
	    forcedMax: false,

	    span: [0, 1],
	    marginMin: 0,
	    marginMax: 0,

	    scientificScale: false,
	    scientificScaleExponent: false,
	    engineeringScale: false,
	    unit: false,
	    unitWrapperBefore: '',
	    unitWrapperAfter: '',

	    splitMarks: false
	  };

	  /** 
	   * Axis constructor. Usually not instanced directly, but for custom made axes, that's possible
	   * @class Axis
	   * @static
	   * @augments EventEmitter
	   * @example function myAxis() {};
	   * myAxis.prototype = new Graph.getConstructor("axis");
	   * graph.setBottomAxis( new myAxis( { } ) );
	   */
	  class Axis extends _EventEmitter2.default {

	    constructor() {
	      super();
	    }

	    init(graph, options, overwriteoptions) {

	      this.unitModificationTimeTicks = [[1, [1, 2, 5, 10, 20, 30]], [60, [1, 2, 5, 10, 20, 30]], [3600, [1, 2, 6, 12]], [3600 * 24, [1, 2, 3, 4, 5, 10, 20, 40]]];

	      var self = this;
	      this.graph = graph;
	      this.options = util.extend(true, {}, defaults, overwriteoptions, options);

	      this.group = document.createElementNS(this.graph.ns, 'g');
	      this.hasChanged = true;

	      this.rectEvent = document.createElementNS(this.graph.ns, 'rect');
	      this.rectEvent.setAttribute('pointer-events', 'fill');
	      this.rectEvent.setAttribute('fill', 'transparent');
	      this.group.appendChild(this.rectEvent);

	      this.graph.axisGroup.appendChild(this.group); // Adds to the main axiszone

	      this.line = document.createElementNS(this.graph.ns, 'line');
	      this.line.setAttribute('stroke', 'black');
	      this.line.setAttribute('shape-rendering', 'crispEdges');
	      this.line.setAttribute('stroke-linecap', 'square');
	      this.groupTicks = document.createElementNS(this.graph.ns, 'g');
	      this.groupTickLabels = document.createElementNS(this.graph.ns, 'g');

	      this.group.appendChild(this.groupTicks);
	      this.group.appendChild(this.groupTickLabels);
	      this.group.appendChild(this.line);

	      this.labelValue;

	      this.label = document.createElementNS(this.graph.ns, 'text');

	      this.labelTspan = document.createElementNS(this.graph.ns, 'tspan'); // Contains the main label
	      this.preunitTspan = document.createElementNS(this.graph.ns, 'tspan'); // Contains the scaling unit
	      this.unitTspan = document.createElementNS(this.graph.ns, 'tspan'); // Contains the unit
	      this.expTspan = document.createElementNS(this.graph.ns, 'tspan'); // Contains the exponent (x10)
	      this.expTspanExp = document.createElementNS(this.graph.ns, 'tspan'); // Contains the exponent value

	      this.label.appendChild(this.labelTspan);
	      this.label.appendChild(this.preunitTspan);
	      this.label.appendChild(this.unitTspan);
	      this.label.appendChild(this.expTspan);
	      this.label.appendChild(this.expTspanExp);

	      this.preunitTspan.setAttribute('dx', 6);
	      this.expTspan.setAttribute('dx', 6);
	      this.expTspanExp.setAttribute('dy', -5);
	      this.expTspanExp.setAttribute('font-size', "0.8em");

	      this.label.setAttribute('text-anchor', 'middle');

	      this.setTickPosition(this.options.tickPosition);

	      this.gridLinePath = {
	        primary: "",
	        secondary: ""
	      };

	      this.gridPrimary = document.createElementNS(this.graph.ns, "path");
	      this.gridSecondary = document.createElementNS(this.graph.ns, "path");

	      this.graph.groupPrimaryGrids.appendChild(this.gridPrimary);
	      this.graph.groupSecondaryGrids.appendChild(this.gridSecondary);

	      this.setGridLinesStyle();

	      this.group.appendChild(this.label);

	      this.groupSeries = document.createElementNS(this.graph.ns, 'g');
	      this.group.appendChild(this.groupSeries);

	      this.widthHeightTick = 0;

	      this.ticks = {};
	      this.ticksLabels = [];
	      this.tickScaling = {
	        1: 3,
	        2: 2,
	        3: 1,
	        4: 0.5
	      };

	      this.currentTick = {};
	      this.lastCurrentTick = {};

	      this.series = [];
	      this.totalDelta = 0;
	      this.currentAction = false;

	      this.group.addEventListener('mousemove', function (e) {
	        e.preventDefault();
	        var coords = self.graph._getXY(e);
	        self.handleMouseMoveLocal(coords.x, coords.y, e);

	        for (var i = 0, l = self.series.length; i < l; i++) {
	          self.series[i].handleMouseMove(false, true);
	        }
	      });

	      this.labels = [];
	      this.group.addEventListener('click', function (e) {
	        e.preventDefault();
	        var coords = self.graph._getXY(e);
	        self.addLabel(self.getVal(coords.x - self.graph.getPaddingLeft()));
	      });

	      this.axisRand = Math.random();
	      this.clip = document.createElementNS(this.graph.ns, 'clipPath');
	      this.clip.setAttribute('id', '_clip' + this.axisRand);
	      this.graph.defs.appendChild(this.clip);

	      this.clipRect = document.createElementNS(this.graph.ns, 'rect');
	      this.clip.appendChild(this.clipRect);
	      this.clip.setAttribute('clipPathUnits', 'userSpaceOnUse');

	      this.graph._axisHasChanged(this);
	    }

	    handleMouseMoveLocal() {}

	    /**
	     * Hides the axis
	     * @memberof Axis
	     * @return {Axis} The current axis
	     */
	    hide() {
	      this.options.display = false;
	      return this;
	    }

	    /**
	     * Shows the axis
	     * @memberof Axis
	     * @return {Axis} The current axis
	     */
	    show() {
	      this.options.display = true;
	      return this;
	    }

	    /**
	     * Shows or hides the axis
	     * @memberof Axis
	     * @param {Boolean} display - true to display the axis, false to hide it
	     * @return {Axis} The current axis
	     */
	    setDisplay(bool) {
	      this.options.display = !!bool;
	      return this;
	    }

	    /**
	     * @memberof Axis
	     * @return {Boolean} A boolean indicating the displayed state of the axis
	     */
	    isDisplayed() {
	      return this.options.display;
	    }

	    isShown() {
	      return this.isDisplayed(...arguments);
	    }

	    kill(noRedraw, noSerieKill) {
	      this.graph.killAxis(this, noRedraw, noSerieKill);
	    }
	    /**
	     * Forces the appearence of a straight perpendicular line at value 0
	     * @param {Boolean} lineAt0 - true to display the line, false not to.
	     * @memberof Axis
	     * @return {Axis} The current axis
	     */
	    setLineAt0(bool) {
	      this.options.lineAt0 = !!bool;
	    }

	    // Used to adapt the 0 of the axis to the zero of another axis that has the same direction

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
	    adaptTo(axis, thisValue, foreignValue, preference) {

	      if (!axis) {
	        this.options.adaptTo = false;
	        return this;
	      }

	      this.options.adaptTo = {
	        axis: axis,
	        thisValue: thisValue,
	        foreignValue: foreignValue,
	        preference: preference
	      };

	      this.adapt();

	      return this;
	    }

	    /**
	     * Adapts maximum and minimum of the axis if options.adaptTo is defined
	     * @memberof Axis
	     * @returns {Axis} The current axis
	     * @since 1.13.2
	     */
	    adapt() {

	      if (!this.options.adaptTo) {
	        return;
	      }

	      if (!axis) var val;

	      var axis = this.options.adaptTo.axis,
	          current = this.options.adaptTo.thisValue,
	          foreign = this.options.adaptTo.foreignValue;

	      if (axis.currentAxisMin === undefined || axis.currentAxisMax === undefined) {
	        axis.setMinMaxToFitSeries();
	      }

	      if (this.options.forcedMin !== false && this.options.forcedMax == false || this.options.adaptTo.preference !== "max") {

	        if (this.options.forcedMin !== false) {
	          this.currentAxisMin = this.options.forcedMin;
	        } else {
	          this.currentAxisMin = this._zoomed ? this.getCurrentMin() : this.getMinValue() - (current - this.getMinValue()) * (this.options.axisDataSpacing.min * (axis.getCurrentMax() - axis.getCurrentMin()) / (foreign - axis.getCurrentMin()));
	        }

	        if (this.currentAxisMin == current) {
	          this.currentAxisMin -= this.options.axisDataSpacing.min * this.getInterval();
	        }

	        var use = this.options.forcedMin !== false ? this.options.forcedMin : this.currentAxisMin;
	        this.currentAxisMax = (current - use) * (axis.getCurrentMax() - axis.getCurrentMin()) / (foreign - axis.getCurrentMin()) + use;
	      } else {

	        if (this.options.forcedMax !== false) {
	          this.currentAxisMax = this.options.forcedMax;
	        } else {
	          this.currentAxisMax = this._zoomed ? this.getCurrentMax() : this.getMaxValue() + (this.getMaxValue() - current) * (this.options.axisDataSpacing.max * (axis.getCurrentMax() - axis.getCurrentMin()) / (axis.getCurrentMax() - foreign));
	        }

	        if (this.currentAxisMax == current) {
	          this.currentAxisMax += this.options.axisDataSpacing.max * this.getInterval();
	        }

	        var use = this.options.forcedMax !== false ? this.options.forcedMax : this.currentAxisMax;

	        this.currentAxisMin = (current - use) * (axis.getCurrentMin() - axis.getCurrentMax()) / (foreign - axis.getCurrentMax()) + use;
	      }

	      this.graph._axisHasChanged(this);
	    }

	    // Floating axis. Adapts axis position orthogonally to another axis at a defined value. Not taken into account for margins

	    /**
	     * Makes the axis floating (not aligned to the right or the left anymore). You need to specify another axis (perpendicular) and a value at which this axis should be located
	     * @param {Axis} axis - The axis on which the current axis should be aligned to
	     * @param {Number} value - The value on which the current axis should be aligned
	     * @memberof Axis
	     * @return {Axis} The current axis
	     * @example graph.getYAxis().setFloat( graph.getBottomAxis(), 0 ); // Alignes the y axis with the origin of the bottom axis
	     */
	    setFloating(axis, value) {

	      this.floating = true;
	      this.floatingAxis = axis;
	      this.floatingValue = value;

	      return this;
	    }

	    /**
	     * @memberof Axis
	     * @return {Axis} The axis referencing the floating value of the current axis
	     */
	    getFloatingAxis() {
	      return this.floatingAxis;
	    }

	    /**
	     * @memberof Axis
	     * @return {Axis} The value to which the current axis is aligned to
	     */
	    getFloatingValue() {
	      return this.floatingValue;
	    }

	    /**
	     * Sets the axis data spacing
	     * @memberof Axis
	     * @see AxisOptionsDefault
	     * @param {Number} min - The spacing at the axis min value
	     * @param {Number} [ max = min ] - The spacing at the axis max value. If omitted, will be equal to the "min" parameter
	     * @return {Axis} The current axis
	     */
	    setAxisDataSpacing(val1, val2) {
	      this.options.axisDataSpacing.min = val1;
	      this.options.axisDataSpacing.max = val2 || val1;
	      return this;
	    }

	    dataSpacing() {
	      return this.setAxisDataSpacing(...arguments);
	    }

	    /**
	     * Sets the axis data spacing at the minimum of the axis
	     * @memberof Axis
	     * @see AxisOptionsDefault
	     * @param {Number} min - The spacing at the axis min value
	     * @return {Axis} The current axis
	     */
	    setAxisDataSpacingMin(val) {
	      this.options.axisDataSpacing.min = val;
	    }

	    /**
	     * Sets the axis data spacing at the maximum of the axis
	     * @memberof Axis
	     * @see AxisOptionsDefault
	     * @param {Number} max - The spacing at the axis max value
	     * @return {Axis} The current axis
	     */
	    setAxisDataSpacingMax(val) {
	      this.options.axisDataSpacing.max = val;
	    }

	    setMinPx(px) {

	      this.minPx = px;
	      this.setMinMaxFlipped();
	    }

	    setMaxPx(px) {

	      this.maxPx = px;
	      this.setMinMaxFlipped();
	    }

	    /**
	     * @memberof Axis
	     * @return {Number} The position in px of the bottom of the axis
	     */
	    getMinPx() {
	      return this.minPxFlipped;
	    }

	    /**
	     * @memberof Axis
	     * @return {Number} The position in px of the top of the axis
	     */
	    getMaxPx(px) {
	      return this.maxPxFlipped;
	    }

	    getMathMaxPx() {
	      return this.maxPx;
	    }

	    getMathMinPx() {
	      return this.minPx;
	    }

	    // Returns the true minimum of the axis. Either forced in options or the one from the data

	    /**
	     * Retrieves the minimum possible value of the axis. Can be set by "forcedMin", "adapt0ToAxis" or by the values of the series the axis contains. Does not take into account any zooming.
	     * @memberof Axis
	     * @return {Number} The minimum possible value of the axis
	     */
	    getMinValue() {
	      return this.options.forcedMin !== false ? this.options.forcedMin : this.dataMin;
	    }

	    /**
	     * Retrieves the maximum possible value of the axis. Can be set by "forcedMax", "adapt0ToAxis" or by the values of the series the axis contains. Does not take into account any zooming.
	     * @memberof Axis
	     * @return {Number} The maximum possible value of the axis
	     */
	    getMaxValue() {
	      return this.options.forcedMax !== false ? this.options.forcedMax : this.dataMax;
	    }

	    setMinValueData(min) {
	      this.dataMin = min;
	    }

	    setMaxValueData(max) {
	      this.dataMax = max;
	    }

	    /**
	     * Forces the minimum value of the axis (no more dependant on the serie values)
	     * @memberof Axis
	     * @param {Number} min - The minimum value of the axis
	     * @param {Boolean} noRescale - ```true``` to prevent the axis to rescale to set this minimum. Rescales anyway if current min is lower than the value
	     * @return {Axis} The current axis
	     */
	    forceMin(min, noRescale) {
	      this.options.forcedMin = min;

	      this.setCurrentMin(noRescale ? this.getCurrentMin() : undefined);
	      this.graph._axisHasChanged(this);
	      return this;
	    }

	    /**
	     * Forces the maximum value of the axis (no more dependant on the serie values).
	     * @memberof Axis
	     * @param {Number} max - The maximum value of the axis
	     * @param {Boolean} noRescale - ```true``` to prevent the axis to rescale to set this maximum. Rescales anyway if current max is higher than the value
	     * @return {Axis} The current axis
	     */
	    forceMax(max, noRescale) {
	      this.options.forcedMax = max;

	      this.setCurrentMax(noRescale ? this.getCurrentMax() : undefined);
	      this.graph._axisHasChanged(this);
	      return this;
	    }

	    /**
	     * Retrieves the forced minimum of the axis
	     * @memberof Axis
	     * @return {Number} The maximum possible value of the axis
	     */
	    getForcedMin() {
	      return this.options.forcedMin;
	    }

	    /**
	     * Retrieves the forced minimum of the axis
	     * @memberof Axis
	     * @return {Number} The maximum possible value of the axis
	     */
	    getForcedMax() {
	      return this.options.forcedMax;
	    }

	    /**
	     * Forces the min and max values of the axis to the min / max values of another axis
	     * @param {Axis} axis - The axis from which the min / max values are retrieved.
	     * @memberof Axis
	     * @return {Axis} The current axis
	     */
	    forceToAxis(axis) {
	      if (axis.getMaxValue && axis.getMinValue) {
	        this.options.forcedMin = axis.getMinValue();
	        this.options.forcedMax = axis.getMaxValue();
	      }

	      return this;
	    }

	    getNbTicksPrimary() {
	      return this.options.nbTicksPrimary;
	    }

	    setNbTicksPrimary(nb) {
	      this.options.nbTicksPrimary = nb;
	    }

	    getNbTicksSecondary() {
	      return this.options.nbTicksSecondary;
	    }

	    handleMouseMove(px, e) {
	      this.mouseVal = this.getVal(px);
	    }

	    handleMouseWheel(delta, e, baseline) {

	      delta = Math.min(0.2, Math.max(-0.2, delta));

	      if (baseline == "min") {
	        baseline = this.getMinValue();
	      } else if (baseline == "max") {
	        baseline = this.getMaxValue();
	      } else if (!baseline) {
	        baseline = 0;
	      }

	      this._doZoomVal((this.getCurrentMax() - baseline) * (1 + delta) + baseline, (this.getCurrentMin() - baseline) * (1 + delta) + baseline);

	      this.graph.draw();
	      //	this.graph.drawSeries(true);
	    }

	    set zoomLock(bln) {
	      this._zoomLocked = bln;
	    }

	    get zoomLock() {
	      return this._zoomLocked || false;
	    }

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
	    zoom(val1, val2, forceLock) {

	      if (!forceLock && this.zoomLock) {
	        return;
	      }

	      return this._doZoomVal(val1, val2, true);
	    }

	    _doZoomVal(val1, val2, mute) {

	      return this._doZoom(this.getPx(val1), this.getPx(val2), val1, val2, mute);
	    }

	    _doZoom(px1, px2, val1, val2, mute) {

	      //if(this.options.display || 1 == 1) {
	      var val1 = val1 !== undefined ? val1 : this.getVal(px1);
	      var val2 = val2 !== undefined ? val2 : this.getVal(px2);

	      this.setCurrentMin(Math.min(val1, val2));
	      this.setCurrentMax(Math.max(val1, val2));

	      this.cacheCurrentMin();
	      this.cacheCurrentMax();
	      this.cacheInterval();

	      this._zoomed = true;

	      this.adapt();

	      this._hasChanged = true;

	      // New method
	      if (!mute) {
	        this.emit("zoom", [this.currentAxisMin, this.currentAxisMax, this]);
	      }

	      return this;
	    }

	    getSerieShift() {
	      return this._serieShift;
	    }

	    getSerieScale() {
	      return this._serieScale;
	    }

	    getMouseVal() {
	      return this.mouseVal;
	    }

	    getUnitPerTick(px, nbTick, valrange) {

	      var umin;
	      var pxPerTick = px / nbTicks; // 1000 / 100 = 10 px per tick
	      if (!nbTick) {
	        nbTick = px / 10;
	      } else {
	        nbTick = Math.min(nbTick, px / 10);
	      }

	      // So now the question is, how many units per ticks ?
	      // Say, we have 0.0004 unit per tick
	      var unitPerTick = valrange / nbTick;

	      switch (this.options.unitModification) {

	        case 'time':
	        case 'time:min.sec':

	          var max = this.getModifiedValue(this.getMaxValue()),
	              units = [[60, 'min'], [3600, 'h'], [3600 * 24, 'd']];

	          if (max < 3600) {
	            // to minutes
	            umin = 0;
	          } else if (max < 3600 * 24) {
	            umin = 1;
	          } else {
	            umin = 2;
	          }

	          var breaked = false;
	          for (var i = 0, l = this.unitModificationTimeTicks.length; i < l; i++) {
	            for (var k = 0, m = this.unitModificationTimeTicks[i][1].length; k < m; k++) {
	              if (unitPerTick < this.unitModificationTimeTicks[i][0] * this.unitModificationTimeTicks[i][1][k]) {
	                breaked = true;
	                break;
	              }
	            }
	            if (breaked) {
	              break;
	            }
	          }

	          //i and k contain the good variable;
	          if (i !== this.unitModificationTimeTicks.length) {
	            unitPerTickCorrect = this.unitModificationTimeTicks[i][0] * this.unitModificationTimeTicks[i][1][k];
	          } else {
	            unitPerTickCorrect = 1;
	          }

	          break;

	        default:

	          // We take the log
	          var decimals = Math.floor(Math.log(unitPerTick) / Math.log(10));
	          /*
	          Example:
	          13'453 => Math.log10() = 4.12 => 4
	          0.0000341 => Math.log10() = -4.46 => -5
	          */

	          var numberToNatural = unitPerTick * Math.pow(10, -decimals);

	          /*
	          Example:
	          13'453 (4) => 1.345
	          0.0000341 (-5) => 3.41
	          */

	          this.decimals = -decimals;

	          var possibleTicks = [1, 2, 5, 10];
	          var closest = false;
	          for (var i = possibleTicks.length - 1; i >= 0; i--) {
	            if (!closest || Math.abs(possibleTicks[i] - numberToNatural) < Math.abs(closest - numberToNatural)) {
	              closest = possibleTicks[i];
	            }
	          }

	          // Ok now closest is the number of unit per tick in the natural number
	          /*
	          Example:
	          13'453 (4) (1.345) => 1
	          0.0000341 (-5) (3.41) => 5
	          */

	          // Let's scale it back
	          var unitPerTickCorrect = closest * Math.pow(10, decimals);

	          /*
	          Example:
	          13'453 (4) (1.345) (1) => 10'000
	          0.0000341 (-5) (3.41) (5) => 0.00005
	          */
	          break;
	      }

	      var nbTicks = valrange / unitPerTickCorrect;

	      var pxPerTick = px / nbTick;
	      return [unitPerTickCorrect, nbTicks, pxPerTick];
	    }

	    /**
	     * Resets the min and max of the serie to fit the series it contains
	     * @memberof Axis
	     * @return {Axis} The current axis
	     */
	    setMinMaxToFitSeries(noNotify) {

	      var interval = this.getInterval();

	      if (this.options.logScale) {

	        this.currentAxisMin = Math.max(1e-50, this.getMinValue() * 0.9);
	        this.currentAxisMax = Math.max(1e-50, this.getMaxValue() * 1.1);
	      } else {

	        this.currentAxisMin = this.getMinValue();
	        this.currentAxisMax = this.getMaxValue();

	        if (this.getForcedMin() === false) {
	          this.currentAxisMin -= this.options.axisDataSpacing.min * interval;
	        }

	        if (this.getForcedMax() === false) {
	          this.currentAxisMax += this.options.axisDataSpacing.max * interval;
	        }
	      }

	      if (isNaN(this.currentAxisMin) || isNaN(this.currentAxisMax)) {
	        this.currentAxisMax = undefined;
	        this.currentAxisMin = undefined;
	      }

	      this.cacheCurrentMin();
	      this.cacheCurrentMax();
	      this.cacheInterval();

	      this._zoomed = false;

	      this.adapt();

	      if (!noNotify) {
	        this.graph._axisHasChanged(this);
	      }

	      this.emit("zoomOutFull", [this.currentAxisMin, this.currentAxisMax, this]);

	      return this;
	    }

	    /**
	     * @memberof Axis
	     * @return {Number} the maximum interval ( max - min ) of the axis ( not nessarily the current one )
	     */
	    getInterval() {
	      return this.getMaxValue() - this.getMinValue();
	    }

	    /**
	     * @memberof Axis
	     * @return {Number} the maximum interval ( max - min ) of the axis ( not nessarily the current one )
	     */
	    getCurrentInterval() {
	      return this.cachedInterval;
	    }

	    /**
	     * @memberof Axis
	     * @return {Number} The current minimum value of the axis
	     */
	    getCurrentMin() {
	      return this.cachedCurrentMin;
	    }

	    /**
	     * @memberof Axis
	     * @return {Number} The current maximum value of the axis
	     */
	    getCurrentMax() {
	      return this.cachedCurrentMax;
	    }

	    /**
	     * Caches the current axis minimum
	     * @memberof Axis
	     */
	    cacheCurrentMin() {
	      this.cachedCurrentMin = this.currentAxisMin == this.currentAxisMax ? this.options.logScale ? this.currentAxisMin / 10 : this.currentAxisMin - 1 : this.currentAxisMin;
	    }

	    /**
	     * Caches the current axis maximum
	     * @memberof Axis
	     */
	    cacheCurrentMax() {
	      this.cachedCurrentMax = this.currentAxisMax == this.currentAxisMin ? this.options.logScale ? this.currentAxisMax * 10 : this.currentAxisMax + 1 : this.currentAxisMax;
	    }

	    /**
	     * Caches the current interval
	     * @memberof Axis
	     */
	    cacheInterval() {
	      this.cachedInterval = this.cachedCurrentMax - this.cachedCurrentMin;
	    }

	    /**
	     * Sets the current minimum value of the axis. If lower that the forced value, the forced value is used
	     * @memberof Axis
	     * @param {Number} val - The new minimum value
	     * @return {Axis} The current axis
	     */
	    setCurrentMin(val) {

	      if (val === undefined || this.getForcedMin() !== false && val < this.getForcedMin()) {
	        val = this.getMinValue();
	      }

	      this.currentAxisMin = val;
	      if (this.options.logScale) {
	        this.currentAxisMin = Math.max(1e-50, val);
	      }

	      this.graph._axisHasChanged(this);
	      return this;
	    }

	    /**
	     * Sets the current maximum value of the axis. If higher that the forced value, the forced value is used
	     * @memberof Axis
	     * @param {Number} val - The new maximum value
	     * @return {Axis} The current axis
	     */
	    setCurrentMax(val) {

	      if (val === undefined || this.getForcedMax() !== false && val > this.getForcedMax()) {
	        val = this.getMaxValue();
	      }

	      this.currentAxisMax = val;

	      if (this.options.logScale) {
	        this.currentAxisMax = Math.max(1e-50, val);
	      }

	      this.graph._axisHasChanged(this);
	    }

	    /**
	     * Sets the flipping state of the axis. If enabled, the axis is descending rather than ascending.
	     * @memberof Axis
	     * @param {Boolean} flip - The new flipping state of the axis
	     * @return {Axis} The current axis
	     */
	    flip(flip) {
	      this.options.flipped = flip;
	      this.setMinMaxFlipped();
	      return this;
	    }
	    /*
	      setMinMaxFlipped() {
	         var interval = this.maxPx - this.minPx;
	        var maxPx = this.maxPx - interval * this.options.span[ 0 ];
	        var minPx = this.maxPx - interval * this.options.span[ 1 ];
	         this.minPxFlipped = this.isFlipped() ? maxPx : minPx;
	        this.maxPxFlipped = this.isFlipped() ? minPx : maxPx;
	         // this.minPx = minPx;
	        //this.maxPx = maxPx;
	      }
	    */
	    /**
	     * @memberof Axis
	     * @return {Boolean} The current flipping state of the axis
	     */
	    isFlipped() {
	      return this.options.flipped;
	    }

	    _draw() {
	      // Redrawing of the axis

	      var self = this;
	      var visible;

	      //    this.drawInit();

	      this.cacheCurrentMax();
	      this.cacheCurrentMin();
	      this.cacheInterval();

	      if (this.currentAxisMin == undefined || this.currentAxisMax == undefined) {
	        this.setMinMaxToFitSeries(true); // We reset the min max as a function of the series
	      }

	      //   this.setSlaveAxesBoundaries();

	      // The data min max is stored in this.dataMin, this.dataMax

	      //var widthPx = this.maxPx - this.minPx;
	      var widthPx = Math.abs(this.getMaxPx() - this.getMinPx());
	      var valrange = this.getCurrentInterval();

	      /* Number of px per unit */
	      /* Example: width: 1000px
	      /* 			10 - 100 => 11.11
	      /*			0 - 2 => 500
	      /*			0 - 0.00005 => 20'000'000
	      */

	      if (!this.options.display) {
	        this.line.setAttribute('display', 'none');
	        return 0;
	      }

	      this.line.setAttribute('display', 'block');

	      if (this.options.scientificScale == true) {

	        if (this.options.scientificScaleExponent) {

	          this.scientificExponent = this.options.scientificScaleExponent;
	        } else {
	          this.scientificExponent = Math.floor(Math.log(Math.max(Math.abs(this.getCurrentMax()), Math.abs(this.getCurrentMin()))) / Math.log(10));
	        }
	      } else {
	        this.scientificExponent = 0;
	      }

	      /************************************/
	      /*** DRAWING LABEL ******************/
	      /************************************/

	      this.gridLinePath.primary = "";
	      this.gridLinePath.secondary = "";

	      /*
	      var label;
	      if ( label = this.getLabel() ) {
	        // Sets the label
	        this.labelTspan.textContent = label;
	      }
	      */

	      this.writeUnit();

	      var letter;

	      if (this.options.unitDecade && this.options.unit && this.scientificExponent !== 0 && (this.scientificExponent = this.getEngineeringExponent(this.scientificExponent)) && (letter = this.getExponentGreekLetter(this.scientificExponent))) {

	        this.preunitTspan.innerHTML = letter;
	        this.preunitTspan.setAttribute('display', 'visible');
	        this.unitTspan.setAttribute('dx', 0);
	      } else if (this.scientificExponent !== 0 && !isNaN(this.scientificExponent)) {

	        if (this.options.engineeringScale) {
	          this.scientificExponent = this.getEngineeringExponent(this.scientificExponent);
	        }

	        this.preunitTspan.textContent = "";
	        this.preunitTspan.setAttribute('display', 'none');

	        this.expTspan.setAttribute('display', 'visible');
	        this.expTspanExp.setAttribute('display', 'visible');

	        this.expTspan.textContent = "x10";
	        this.expTspanExp.textContent = this.scientificExponent;
	      } else {

	        if (!this.options.unit) {
	          this.unitTspan.setAttribute('display', 'none');
	        }

	        this.preunitTspan.setAttribute('display', 'none');
	        this.expTspan.setAttribute('display', 'none');
	        this.expTspanExp.setAttribute('display', 'none');
	      }

	      if (!this.options.hideTicks) {

	        this.resetTicksLength();

	        if (this.linkedToAxis) {
	          // px defined, linked to another axis

	          this.linkedToAxis.deltaPx = 10;
	          var widthHeight = this.drawLinkedToAxisTicksWrapper(widthPx, valrange);
	        } else if (!this.options.logScale) {
	          // So the setting is: How many ticks in total ? Then we have to separate it

	          var widthHeight = this.drawLinearTicksWrapper(widthPx, valrange);
	        } else {

	          var widthHeight = this.drawLogTicks();
	        }
	      } else {
	        var widthHeight = 0;
	      }

	      this.removeUselessTicks();
	      this.removeUselessTickLabels();

	      this.gridPrimary.setAttribute('d', this.gridLinePath.primary);
	      this.gridSecondary.setAttribute('d', this.gridLinePath.secondary);

	      // Looks for axes linked to this current axis
	      var axes = this.graph.findAxesLinkedTo(this);
	      axes.map(function (axis) {

	        if (!axis.linkedToAxis) {
	          return;
	        }
	        axis.setMinPx(self.getMinPx());
	        axis.setMaxPx(self.getMaxPx());

	        axis.draw();
	      });

	      /************************************/
	      /*** DRAW CHILDREN IMPL SPECIFIC ****/
	      /************************************/

	      //   this.drawSpecifics();
	      if (this.options.lineAt0 && this.getCurrentMin() < 0 && this.getCurrentMax() > 0) {
	        this._draw0Line(this.getPx(0));
	      }

	      return widthHeight;
	    }

	    writeUnit() {
	      if (this.options.unit) {

	        this.unitTspan.setAttribute('display', 'visible');
	        this.unitTspan.setAttribute('dx', 5);

	        this.expTspan.setAttribute('display', 'none');
	        this.expTspanExp.setAttribute('display', 'none');
	        this.unitTspan.innerHTML = this.options.unitWrapperBefore + this.options.unit.replace(/\^([-+0-9]*)/g, "<tspan dy='-5' font-size='0.7em'>$1</tspan>") + this.options.unitWrapperAfter;
	      } else {
	        this.unitTspan.setAttribute('display', 'none');
	      }
	    }

	    getExponentGreekLetter(val) {
	      switch (val) {

	        case 3:
	          return "k";
	          break;

	        case 6:
	          return "M";
	          break;

	        case 9:
	          return 'G';
	          break;

	        case 12:
	          return "T";
	          break;

	        case 15:
	          return "E";
	          break;

	        case -3:
	          return "m";
	          break;

	        case -6:
	          return "&mu;";
	          break;

	        case -9:
	          return 'n';
	          break;

	        case -12:
	          return 'p';
	          break;

	        case -15:
	          return 'f';
	          break;
	      }
	    }

	    drawLinearTicksWrapper(widthPx, valrange) {

	      let tickPrimaryUnit;

	      if (this.options.primaryTickUnit) {

	        tickPrimaryUnit = this.options.primaryTickUnit;
	      } else {

	        tickPrimaryUnit = this.getUnitPerTick(widthPx, this.getNbTicksPrimary(), valrange)[0];

	        if (this.options.maxPrimaryTickUnit && this.options.maxPrimaryTickUnit < tickPrimaryUnit) {
	          tickPrimaryUnit = this.options.maxPrimaryTickUnit;
	        } else if (this.options.minPrimaryTickUnit && this.options.minPrimaryTickUnit > tickPrimaryUnit) {
	          tickPrimaryUnit = this.options.minPrimaryTickUnit;
	        }
	      }

	      // We need to get here the width of the ticks to display the axis properly, with the correct shift
	      return this.drawTicks(tickPrimaryUnit, this.secondaryTicks());
	    }

	    forcePrimaryTickUnit(primaryInterval) {
	      this.options.primaryTickUnit = primaryInterval;
	    }

	    forcePrimaryTickUnitMax(value) {
	      this.options.maxPrimaryTickUnit = value;
	    }

	    forcePrimaryTickUnitMin(value) {
	      this.options.minPrimaryTickUnit = value;
	    }

	    getPrimaryTickUnit() {
	      return this.incrTick;
	    }

	    setTickLabelRatio(tickRatio) {
	      this.options.ticklabelratio = tickRatio;
	    }

	    draw() {

	      this._widthLabels = 0;
	      var drawn = this._draw();
	      this._widthLabels += drawn;
	      return drawn;
	    }

	    drawTicks(primary, secondary) {

	      var unitPerTick = primary,
	          min = this.getCurrentMin(),
	          max = this.getCurrentMax(),
	          widthHeight = 0,
	          secondaryIncr,
	          incrTick,
	          subIncrTick,
	          loop = 0;

	      if (secondary) {
	        secondaryIncr = unitPerTick / secondary;
	      }

	      incrTick = this.options.shiftToZero ? this.dataMin - Math.ceil((this.dataMin - min) / unitPerTick) * unitPerTick : Math.floor(min / unitPerTick) * unitPerTick;
	      this.incrTick = primary;

	      while (incrTick <= max) {

	        loop++;
	        if (loop > 200) {
	          break;
	        }

	        if (secondary) {

	          subIncrTick = incrTick + secondaryIncr;
	          this.subIncrTick = subIncrTick;
	          //widthHeight = Math.max(widthHeight, this.drawTick(subIncrTick, 1));
	          var loop2 = 0;

	          while (subIncrTick < incrTick + unitPerTick) {
	            loop2++;
	            if (loop2 > 100) {
	              break;
	            }

	            if (subIncrTick < min || subIncrTick > max) {
	              subIncrTick += secondaryIncr;
	              continue;
	            }

	            this.drawTickWrapper(subIncrTick, false, Math.abs(subIncrTick - incrTick - unitPerTick / 2) < 1e-4 ? 2 : 3);

	            subIncrTick += secondaryIncr;
	          }
	        }

	        if (incrTick < min || incrTick > max) {
	          incrTick += primary;
	          continue;
	        }

	        this.drawTickWrapper(incrTick, true, 1);
	        incrTick += primary;
	      }

	      this.widthHeightTick = this.getMaxSizeTick();
	      return this.widthHeightTick;
	    }

	    nextTick(level, callback) {

	      this.ticks[level] = this.ticks[level] || [];
	      this.lastCurrentTick[level] = this.lastCurrentTick[level] || 0;
	      this.currentTick[level] = this.currentTick[level] || 0;

	      if (this.currentTick[level] >= this.ticks[level].length) {
	        var tick = document.createElementNS(this.graph.ns, 'line');
	        this.groupTicks.appendChild(tick);
	        this.ticks[level].push(tick);

	        callback(tick);
	      }

	      var tick = this.ticks[level][this.currentTick[level]];

	      if (this.currentTick[level] >= this.lastCurrentTick[level]) {
	        tick.setAttribute('display', 'visible');
	      }

	      this.currentTick[level]++;

	      return tick;
	    }

	    nextTickLabel(callback) {

	      this.ticksLabels = this.ticksLabels || [];
	      this.lastCurrentTickLabel = this.lastCurrentTickLabel || 0;
	      this.currentTickLabel = this.currentTickLabel || 0;

	      if (this.currentTickLabel >= this.ticksLabels.length) {

	        var tickLabel = document.createElementNS(this.graph.ns, 'text');
	        this.groupTickLabels.appendChild(tickLabel);
	        this.ticksLabels.push(tickLabel);
	        callback(tickLabel);
	      }

	      var tickLabel = this.ticksLabels[this.currentTickLabel];

	      if (this.currentTickLabel >= this.lastCurrentTickLabel) {
	        tickLabel.setAttribute('display', 'visible');
	      }

	      this.currentTickLabel++;

	      return tickLabel;
	    }

	    removeUselessTicks() {

	      for (var j in this.currentTick) {

	        for (var i = this.currentTick[j]; i < this.ticks[j].length; i++) {
	          this.ticks[j][i].setAttribute('display', 'none');
	        }

	        this.lastCurrentTick[j] = this.currentTick[j];
	        this.currentTick[j] = 0;
	      }
	    }

	    removeUselessTickLabels() {

	      for (var i = this.currentTickLabel; i < this.ticksLabels.length; i++) {
	        this.ticksLabels[i].setAttribute('display', 'none');
	      }

	      this.lastCurrentTickLabel = this.currentTickLabel;
	      this.currentTickLabel = 0;
	    }
	    /*
	      doGridLine() {
	        var gridLine = document.createElementNS( this.graph.ns, 'line' );
	        this.groupGrids.appendChild( gridLine );
	        return gridLine;
	      };*/

	    nextGridLine(primary, x1, x2, y1, y2) {

	      if (!(primary && this.options.primaryGrid || !primary && this.options.secondaryGrid)) {
	        return;
	      }

	      this.gridLinePath[primary ? "primary" : "secondary"] += "M " + x1 + " " + y1 + " L " + x2 + " " + y2;
	    }

	    setGridLineStyle(gridLine, primary) {

	      gridLine.setAttribute('shape-rendering', 'crispEdges');
	      gridLine.setAttribute('stroke', primary ? this.getPrimaryGridColor() : this.getSecondaryGridColor());
	      gridLine.setAttribute('stroke-width', primary ? this.getPrimaryGridWidth() : this.getSecondaryGridWidth());
	      gridLine.setAttribute('stroke-opacity', primary ? this.getPrimaryGridOpacity() : this.getSecondaryGridOpacity());

	      var dasharray;
	      if (dasharray = primary ? this.getPrimaryGridDasharray() : this.getSecondaryGridDasharray()) {
	        gridLine.setAttribute('stroke-dasharray', dasharray);
	      }
	    }

	    setGridLinesStyle() {
	      this.setGridLineStyle(this.gridPrimary, true);
	      this.setGridLineStyle(this.gridSecondary, false);
	      return this;
	    }

	    resetTicksLength() {}

	    secondaryTicks() {
	      return this.options.nbTicksSecondary;
	    }

	    drawLogTicks() {
	      var min = this.getCurrentMin(),
	          max = this.getCurrentMax();
	      var incr = Math.min(min, max);
	      var max = Math.max(min, max);

	      if (incr < 1e-50) {
	        incr = 1e-50;
	      }

	      if (Math.log(incr) - Math.log(max) > 20) {
	        max = Math.pow(10, Math.log(incr) * 20);
	      }

	      var optsMain = {
	        fontSize: '1.0em',
	        exponential: true,
	        overwrite: false
	      };
	      if (incr < 0) incr = 0;
	      var pow = incr == 0 ? 0 : Math.floor(Math.log(incr) / Math.log(10));
	      var incr = 1,
	          k = 0,
	          val;
	      while ((val = incr * Math.pow(10, pow)) < max) {
	        if (incr == 1) {
	          // Superior power
	          if (val > min) this.drawTickWrapper(val, true, 1, optsMain);
	        }
	        if (incr == 10) {
	          incr = 1;
	          pow++;
	        } else {

	          if (incr != 1 && val > min) {

	            this.drawTickWrapper(val, false, 2, {
	              overwrite: "",
	              fontSize: '0.6em'
	            });
	          }

	          incr++;
	        }
	      }

	      this.widthHeightTick = this.getMaxSizeTick();
	      return this.widthHeightTick;
	    }

	    drawTickWrapper(value, label, level, options) {

	      //var pos = this.getPos( value );

	      this.drawTick(value, level, options);
	    }

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
	    linkToAxis(axis, scalingFunction, decimals) {

	      this.linkedToAxis = {
	        axis: axis,
	        scalingFunction: scalingFunction,
	        decimals: decimals || 1
	      };
	    }

	    drawLinkedToAxisTicksWrapper(widthPx, valrange) {

	      var opts = this.linkedToAxis,
	          px = 0,
	          val,
	          t,
	          i = 0,
	          l,
	          delta2;

	      // Redrawing the main axis ? Why ?
	      //opts.axis.draw();

	      if (!opts.deltaPx) {
	        opts.deltaPx = 10;
	      }

	      do {

	        val = opts.scalingFunction(opts.axis.getVal(px + this.getMinPx()));

	        if (opts.decimals) {
	          this.decimals = opts.decimals;
	        }

	        t = this.drawTick(val, 1, {}, px + this.getMinPx());

	        if (!t) {
	          console.log(val, px, this.getMinPx());
	          console.error("Problem here");
	          break;
	        }

	        l = String(t[1].textContent).length * 8;
	        delta2 = Math.round(l / 5) * 5;

	        if (delta2 > opts.deltaPx) {
	          opts.deltaPx = delta2;
	          //     this.drawInit();
	          this.drawLinkedToAxisTicksWrapper(widthPx, valrange);
	          return;
	        }

	        i++;

	        px += opts.deltaPx;
	      } while (px < widthPx);
	    }

	    /**
	     * Transform a value into pixels, according to the axis scaling. The value is referenced to the drawing wrapper, not the the axis minimal value
	     * @param {Number} value - The value to translate into pixels
	     * @memberof Axis
	     * @return {Number} The value transformed into pixels
	     */
	    getPos(value) {
	      return this.getPx(value);
	    }

	    /**
	     * @alias Axis~getPos
	     */
	    getPx(value) {
	      //      if(this.getMaxPx() == undefined)
	      //        console.log(this);
	      //console.log(this.getMaxPx(), this.getMinPx(), this.getCurrentInterval());
	      // Ex 50 / (100) * (1000 - 700) + 700

	      //console.log( value, this.getCurrentMin(), this.getMaxPx(), this.getMinPx(), this.getCurrentInterval() );
	      if (!this.options.logScale) {

	        return (value - this.getCurrentMin()) / this.getCurrentInterval() * (this.getMaxPx() - this.getMinPx()) + this.getMinPx();
	      } else {
	        // 0 if value = min
	        // 1 if value = max

	        if (value < 0) return;

	        var value = (Math.log(value) - Math.log(this.getCurrentMin())) / (Math.log(this.getCurrentMax()) - Math.log(this.getCurrentMin())) * (this.getMaxPx() - this.getMinPx()) + this.getMinPx();

	        return value;
	      }
	    }

	    /**
	     * @alias Axis~getPos
	     */
	    getRoundedPx(value) {
	      //      if(this.getMaxPx() == undefined)
	      //        console.log(this);
	      //console.log(this.getMaxPx(), this.getMinPx(), this.getCurrentInterval());
	      // Ex 50 / (100) * (1000 - 700) + 700

	      //console.log( value, this.getCurrentMin(), this.getMaxPx(), this.getMinPx(), this.getCurrentInterval() );
	      return Math.round(this.getPx(value) * 10) / 10;
	    }

	    /**
	     * Transform a pixel position (referenced to the graph zone, not to the axis minimum) into a value, according to the axis scaling.
	     * @param {Number} pixels - The number of pixels to translate into a value
	     * @memberof Axis
	     * @return {Number} The axis value corresponding to the pixel position
	     */
	    getVal(px) {

	      if (!this.options.logScale) {

	        return (px - this.getMinPx()) / (this.getMaxPx() - this.getMinPx()) * this.getCurrentInterval() + this.getCurrentMin();
	      } else {

	        return Math.exp((px - this.getMinPx()) / (this.getMaxPx() - this.getMinPx()) * (Math.log(this.getCurrentMax()) - Math.log(this.getCurrentMin())) + Math.log(this.getCurrentMin()));
	      }
	    }

	    /**
	     * Transform a delta value into pixels
	     * @param {Number} value - The value to translate into pixels
	     * @return {Number} The value transformed into pixels
	     * @example graph.getBottomAxis().forceMin( 20 ).forceMax( 50 ).getRelPx( 2 ); // Returns how many pixels will be covered by 2 units. Let's assume 600px of width, it's ( 2 / 30 ) * 600 = 40px
	     */
	    getRelPx(delta) {

	      return delta / this.getCurrentInterval() * (this.getMaxPx() - this.getMinPx());
	    }

	    /**
	     * Transform a delta pixels value into value
	     * @param {Number} pixels - The pixel to convert into a value
	     * @return {Number} The delta value corresponding to delta pixels
	     * @see Axis~getRelPx
	     * @example graph.getBottomAxis().forceMin( 20 ).forceMax( 50 ).getRelVal( 40 ); // Returns 2 (for 600px width)
	     */
	    getRelVal(px) {
	      return px / (this.getMaxPx() - this.getMinPx()) * this.getCurrentInterval();
	    }

	    valueToText(value) {

	      if (this.scientificExponent) {

	        value /= Math.pow(10, this.scientificExponent);
	        return value.toFixed(1);
	      } else {

	        value = value * Math.pow(10, this.getExponentialFactor()) * Math.pow(10, this.getExponentialLabelFactor());
	        if (this.options.shiftToZero) {
	          value -= this.dataMin;
	        }
	        if (this.options.ticklabelratio) {
	          value *= this.options.ticklabelratio;
	        }
	        if (this.options.unitModification) {
	          value = this.modifyUnit(value, this.options.unitModification);
	          return value;
	        }

	        var dec = this.decimals - this.getExponentialFactor() - this.getExponentialLabelFactor();

	        if (isNaN(value)) {
	          return "";
	        }

	        if (dec > 0) {
	          return value.toFixed(dec);
	        }

	        return value.toFixed(0);
	      }
	    }

	    /**
	     *  Computes a value and returns it in HTML formatting
	     *  @memberof Axis
	     *  @param {Number} value - The value to compute
	     *  @param {Boolean} noScaling - Does not display scaling
	     *  @param {Boolean} noUnits - Does not display units
	     *  @return {String} An HTML string containing the computed value
	     *  @example graph.getXAxis().setUnit( "m" ).setUnitDecade( true ).setScientific( true );
	     *  graph.getXAxis().valueToHtml( 3500 ); // Returns "3.5 km"
	     *  @see Axis#valueToText
	     */
	    valueToHtml(value, noScaling, noUnits) {

	      var text = this.valueToText(value);
	      var letter;

	      if (this.options.unitDecade && this.options.unit && this.scientificExponent !== 0 && (this.scientificExponent = this.getEngineeringExponent(this.scientificExponent)) && (letter = this.getExponentGreekLetter(this.scientificExponent))) {

	        text += letter;
	      } else if (this.scientificExponent !== 0 && !isNaN(this.scientificExponent) && !noScaling) {
	        text += "x10";
	        text += '<sup>' + this.scientificExponent + '</sup>';
	      }

	      if (this.options.unit && !noUnits) {

	        text += this.options.unit.replace(/\^([-+0-9]*)/g, "<sup>$1</sup>");
	      }

	      return text;
	    }

	    getModifiedValue(value) {
	      if (this.options.ticklabelratio) {
	        value *= this.options.ticklabelratio;
	      }

	      if (this.options.shiftToZero) {
	        value -= this.getMinValue() * (this.options.ticklabelratio || 1);
	      }

	      return value;
	    }

	    modifyUnit(value, mode) {

	      var text = "";
	      var incr = this.incrTick;

	      switch (mode) {

	        case 'time':
	          // val must be in seconds => transform in hours / days / months
	          var max = this.getModifiedValue(this.getMaxValue()),
	              first,
	              units = [[60, 'min'], [3600, 'h'], [3600 * 24, 'd']];
	          var umin;
	          if (max < 3600) {
	            // to minutes
	            umin = 0;
	          } else if (max < 3600 * 24) {
	            umin = 1;
	          } else if (max < 3600 * 24 * 30) {
	            umin = 2;
	          }

	          if (!units[umin]) {
	            return false;
	          }

	          value = value / units[umin][0];
	          var valueRounded = Math.floor(value);
	          text = valueRounded + units[umin][1];

	          // Addind lower unit for precision
	          umin--;
	          while (incr < 1 * units[umin + 1][0] && umin > -1) {

	            first = false;
	            value = (value - valueRounded) * units[umin + 1][0] / units[umin][0];
	            valueRounded = Math.round(value);
	            text += " " + valueRounded + units[umin][1];
	            umin--;
	          }

	          break;

	        case 'time:min.sec':
	          value = value / 60;
	          var valueRounded = Math.floor(value);
	          var s = Math.round((value - valueRounded) * 60) + "";
	          s = s.length == 1 ? '0' + s : s;
	          text = valueRounded + "." + s;
	          break;
	      }

	      return text;
	    }

	    getExponentialFactor() {
	      return this.options.exponentialFactor;
	    }

	    setExponentialFactor(value) {
	      this.options.exponentialFactor = value;
	    }

	    setExponentialLabelFactor(value) {
	      this.options.exponentialLabelFactor = value;
	    }

	    getExponentialLabelFactor() {
	      return this.options.exponentialLabelFactor;
	    }

	    /**
	     * Sets the label of the axis
	     * @param {Number} label - The label to display under the axis
	     * @memberof Axis
	     * @return {Axis} The current axis
	     */
	    setLabel(label) {
	      this.options.labelValue = label;
	      return this;
	    }

	    /**
	     * @memberof Axis
	     * @return {String} The label value
	     */
	    getLabel() {
	      return this.options.labelValue;
	    }

	    setSpan(_from, _to) {

	      this.options.span = [_from, _to];
	      return this;
	    }

	    getSpan() {
	      return this.options.span;
	    }

	    setLevel(level) {
	      this._level = level;
	      return this;
	    }

	    getLevel() {
	      return this._level;
	    }

	    setShift(shift) {
	      this.shift = shift;
	    }

	    getShift() {
	      return this.shift;
	    }

	    /**
	     * Changes the tick position
	     * @param {Number} pos - The new position ( "outside", "centered" or "inside" )
	     * @memberof Axis
	     * @return {Axis} The current axis
	     */
	    setTickPosition(pos) {
	      switch (pos) {
	        case 3:
	        case 'outside':
	        case _graph2.default.TICKS_OUTSIDE:
	          pos = 3;
	          break;

	        case 2:
	        case 'centered':
	        case _graph2.default.TICKS_CENTERED:
	          pos = 2;
	          break;

	        default:
	        case 1:
	        case 'inside':
	        case _graph2.default.TICKS_INSIDE:
	          pos = 1;
	          break;
	      }

	      this.options.tickPosition = pos;

	      switch (this.options.tickPosition) {
	        case 3:
	          this.tickPx1 = -2;
	          this.tickPx2 = 0;
	          break;

	        case 2:
	          this.tickPx1 = -1;
	          this.tickPx2 = 1;
	          break;

	        case 1:
	          this.tickPx1 = 0;
	          this.tickPx2 = 2;
	          break;
	      }

	      return this;
	    }

	    /**
	     * Displays or hides the axis grids
	     * @param {Boolean} on - true to enable the grids, false to disable them
	     * @memberof Axis
	     * @return {Axis} The current axis
	     */
	    setGrids(on) {
	      this.options.primaryGrid = on;
	      this.options.secondaryGrid = on;
	      return this;
	    }

	    /**
	     * Displays or hides the axis primary grid
	     * @param {Boolean} on - true to enable the grids, false to disable it
	     * @memberof Axis
	     * @return {Axis} The current axis
	     */
	    setPrimaryGrid(on) {
	      this.options.primaryGrid = on;
	      return this;
	    }

	    /**
	     * Displays or hides the axis secondary grid
	     * @param {Boolean} on - true to enable the grids, false to disable it
	     * @memberof Axis
	     * @return {Axis} The current axis
	     */
	    setSecondaryGrid(on) {
	      this.options.secondaryGrid = on;
	      return this;
	    }

	    /**
	     * Enables primary grid
	     * @memberof Axis
	     * @return {Axis} The current axis
	     */
	    primaryGridOn() {
	      return this.setPrimaryGrid(true);
	    }

	    /**
	     * Disables primary grid
	     * @memberof Axis
	     * @return {Axis} The current axis
	     */
	    primaryGridOff() {
	      return this.setPrimaryGrid(false);
	    }

	    /**
	     * Enables secondary grid
	     * @memberof Axis
	     * @return {Axis} The current axis
	     */
	    secondaryGridOn() {
	      return this.setSecondaryGrid(true);
	    }

	    /**
	     * Disables secondary grid
	     * @return {Axis} The current axis
	     */
	    secondaryGridOff() {
	      return this.setSecondaryGrid(false);
	    }

	    /**
	     * Enables all the grids
	     * @return {Axis} The current axis
	     */
	    gridsOn() {
	      return this.setGrids(true);
	    }

	    /**
	     * Disables all the grids
	     * @return {Axis} The current axis
	     */
	    gridsOff() {
	      return this.setGrids(false);
	    }

	    /**
	     * @alias Axis#gridsOff
	     */
	    turnGridsOff() {
	      return this.gridsOff(...arguments);
	    }

	    /**
	     * @alias Axis#gridsOn
	     */
	    turnGridsOn() {
	      return this.gridsOn(...arguments);
	    }

	    /**
	     * Sets the axis color
	     * @memberof Axis
	     * @param {String} color - The color to set the axis
	     * @return {Axis} The current axis
	     * @since 1.13.2
	     */
	    setAxisColor(color) {
	      this.options.axisColor = color;
	      return this;
	    }

	    /**
	     * Gets the axis color
	     * @memberof Axis
	     * @return {String} The color of the axis
	     * @since 1.13.2
	     */
	    getAxisColor(color) {
	      return this.options.axisColor || 'black';
	    }

	    /**
	     * Sets the color of the main ticks
	     * @memberof Axis
	     * @param {String} color - The new color of the primary ticks
	     * @return {Axis} The current axis
	     * @since 1.13.2
	     */
	    setPrimaryTicksColor(color) {
	      this.options.primaryTicksColor = color;
	      return this;
	    }

	    /**
	     * Gets the color of the main ticks
	     * @memberof Axis
	     * @return {String} The color of the primary ticks
	     * @since 1.13.2
	     */
	    getPrimaryTicksColor(color) {
	      return this.options.primaryTicksColor || 'black';
	    }

	    /**
	     * Sets the color of the secondary ticks
	     * @memberof Axis
	     * @param {String} color - The new color of the secondary ticks
	     * @return {Axis} The current axis
	     * @since 1.13.2
	     */
	    setSecondaryTicksColor(color) {
	      this.options.secondaryTicksColor = color;
	      return this;
	    }

	    /**
	     * Gets the color of the secondary ticks
	     * @memberof Axis
	     * @return {String} The color of the secondary ticks
	     * @since 1.13.2
	     */
	    getSecondaryTicksColor(color) {
	      return this.options.secondaryTicksColor || 'black';
	    }

	    /**
	     * Sets the color of the tick labels
	     * @memberof Axis
	     * @param {String} color - The new color of the tick labels
	     * @return {Axis} The current axis
	     * @since 1.13.2
	     */
	    setTicksLabelColor(color) {
	      this.options.ticksLabelColor = color;
	      return this;
	    }

	    /**
	     * Gets the color of the tick labels
	     * @memberof Axis
	     * @return {String} The color of the tick labels
	     * @since 1.13.2
	     */
	    getTicksLabelColor(color) {
	      return this.options.ticksLabelColor || 'black';
	    }

	    /**
	     * Sets the color of the primary grid
	     * @memberof Axis
	     * @param {String} color - The primary grid color
	     * @return {Axis} The current axis
	     * @since 1.13.3
	     */
	    setPrimaryGridColor(color) {
	      this.options.primaryGridColor = color;
	      return this;
	    }

	    /**
	     * Gets the color of the primary grid
	     * @memberof Axis
	     * @return {String} color - The primary grid color
	     * @since 1.13.3
	     */
	    getPrimaryGridColor() {
	      return this.options.primaryGridColor;
	    }

	    /**
	     * Sets the color of the primary grid
	     * @memberof Axis
	     * @param {String} color - The primary grid color
	     * @return {Axis} The current axis
	     * @since 1.13.3
	     */
	    setSecondaryGridColor(color) {
	      this.options.secondaryGridColor = color;
	      return this;
	    }

	    /**
	     * Gets the color of the secondary grid
	     * @memberof Axis
	     * @return {String} color - The secondary grid color
	     * @since 1.13.3
	     */
	    getSecondaryGridColor() {
	      return this.options.secondaryGridColor;
	    }

	    /**
	     * Sets the width of the primary grid lines
	     * @memberof Axis
	     * @param {Number} width - The width of the primary grid lines
	     * @return {Axis} The current axis
	     * @since 1.13.3
	     */
	    setPrimaryGridWidth(width) {
	      this.options.primaryGridWidth = width;
	      return this;
	    }

	    /**
	     * Gets the width of the primary grid lines
	     * @memberof Axis
	     * @return {Number} width - The width of the primary grid lines
	     * @since 1.13.3
	     */
	    getPrimaryGridWidth() {
	      return this.options.primaryGridWidth;
	    }

	    /**
	     * Sets the width of the secondary grid lines
	     * @memberof Axis
	     * @param {Number} width - The width of the secondary grid lines
	     * @return {Axis} The current axis
	     * @since 1.13.3
	     */
	    setSecondaryGridWidth(width) {
	      this.options.secondaryGridWidth = width;
	      return this;
	    }

	    /**
	     * Gets the width of the secondary grid lines
	     * @memberof Axis
	     * @return {Number} width - The width of the secondary grid lines
	     * @since 1.13.3
	     */
	    getSecondaryGridWidth() {
	      return this.options.secondaryGridWidth;
	    }

	    /**
	     * Sets the opacity of the primary grid lines
	     * @memberof Axis
	     * @param {Number} opacity - The opacity of the primary grid lines
	     * @return {Axis} The current axis
	     * @since 1.13.3
	     */
	    setPrimaryGridOpacity(opacity) {
	      this.options.primaryGridOpacity = opacity;
	      return this;
	    }

	    /**
	     * Gets the opacity of the primary grid lines
	     * @memberof Axis
	     * @return {Number} opacity - The opacity of the primary grid lines
	     * @since 1.13.3
	     */
	    getPrimaryGridOpacity() {
	      return this.options.primaryGridOpacity;
	    }

	    /**
	     * Sets the opacity of the secondary grid lines
	     * @memberof Axis
	     * @param {Number} opacity - The opacity of the secondary grid lines
	     * @return {Axis} The current axis
	     * @since 1.13.3
	     */
	    setSecondaryGridOpacity(opacity) {
	      this.options.secondaryGridOpacity = opacity;
	      return this;
	    }

	    /**
	     * Gets the opacity of the secondary grid lines
	     * @memberof Axis
	     * @return {Number} opacity - The opacity of the secondary grid lines
	     * @since 1.13.3
	     */
	    getSecondaryGridOpacity() {
	      return this.options.secondaryGridOpacity;
	    }

	    /**
	     * Sets the dasharray of the primary grid lines
	     * @memberof Axis
	     * @param {String} dasharray - The dasharray of the primary grid lines
	     * @return {Axis} The current axis
	     * @since 1.13.3
	     */
	    setPrimaryGridDasharray(dasharray) {
	      this.options.primaryGridDasharray = dasharray;
	      return this;
	    }

	    /**
	     * Gets the dasharray of the primary grid lines
	     * @memberof Axis
	     * @return {String} dasharray - The dasharray of the primary grid lines
	     * @since 1.13.3
	     */
	    getPrimaryGridDasharray() {
	      return this.options.primaryGridDasharray;
	    }

	    /**
	     * Sets the dasharray of the secondary grid lines
	     * @memberof Axis
	     * @param {String} dasharray - The dasharray of the secondary grid lines
	     * @return {Axis} The current axis
	     * @since 1.13.3
	     */
	    setSecondaryGridDasharray(dasharray) {
	      this.options.secondaryGridDasharray = dasharray;
	      return this;
	    }

	    /**
	     * Gets the dasharray of the secondary grid lines
	     * @memberof Axis
	     * @return {String} dasharray - The dasharray of the secondary grid lines
	     * @since 1.13.3
	     */
	    getSecondaryGridDasharray() {
	      return this.options.secondaryGridDasharray;
	    }

	    /**
	     * Sets the color of the label
	     * @memberof Axis
	     * @param {String} color - The new color of the label
	     * @return {Axis} The current axis
	     * @since 1.13.2
	     */
	    setLabelColor(color) {
	      this.options.labelColor = color;
	    }

	    /**
	     * Gets the color of the label
	     * @memberof Axis
	     * @return {String} The color of the label
	     * @since 1.13.2
	     */
	    getLabelColor() {
	      return this.options.labelColor;
	    }

	    setTickContent(dom, val, options) {
	      if (!options) options = {};

	      if (options.overwrite || !options.exponential) {

	        dom.textContent = options.overwrite || this.valueToText(val);
	      } else {
	        var log = Math.round(Math.log(val) / Math.log(10));
	        var unit = Math.floor(val * Math.pow(10, -log));

	        dom.textContent = unit != 1 ? unit + "x10" : "10";
	        var tspan = document.createElementNS(this.graph.ns, 'tspan');
	        tspan.textContent = log;
	        tspan.setAttribute('font-size', '0.7em');
	        tspan.setAttribute('dy', -5);
	        dom.appendChild(tspan);
	      }

	      if (options.fontSize) {
	        dom.setAttribute('font-size', options.fontSize);
	      }
	    }

	    /**
	     * @memberof Axis
	     * @returns {Boolean} true if it is an x axis, false otherwise
	     */
	    isX() {
	      return false;
	    }

	    /**
	     * @memberof Axis
	     * @returns {Boolean} true if it is an y axis, false otherwise
	     */
	    isY() {
	      return false;
	    }

	    /**
	     * Sets the unit of the axis
	     * @param {String} unit - The unit of the axis
	     * @return {Axis} The current axis
	     * @memberof Axis
	     * @since 1.13.3
	     */
	    setUnit(unit) {
	      this.options.unit = unit;
	      return this;
	    }

	    /**
	     * Sets characters wrapping the unit
	     * @param {String} before - The string to insert before
	     * @param {String} after - The string to insert after
	     * @return {Axis} The current axis
	     * @memberof Axis
	     * @example axis.setUnitWrapper("[", "]").setUnit('m'); // Will display [m]
	     * @since 1.13.3
	     */
	    setUnitWrapper(before, after) {
	      this.options.unitWrapperBefore = before;
	      this.options.unitWrapperAfter = after;
	      return this;
	    }

	    /**
	     * Allows the unit to scale with thousands
	     * @param {Boolean} on - Enables this mode
	     * @return {Axis} The current axis
	     * @memberof Axis
	     * @since 1.13.3
	     */
	    setUnitDecade(on) {
	      this.options.unitDecade = on;
	      return this;
	    }

	    /**
	     * Enable the scientific mode for the axis values. This way, big numbers can be avoided, e.g. "1000000000" would be displayed 1 with 10<sup>9</sup> or "G" shown on near the axis unit.
	     * @param {Boolean} on - Enables the scientific mode
	     * @return {Axis} The current axis
	     * @memberof Axis
	     * @since 1.13.3
	     */
	    setScientific(on) {
	      this.options.scientificScale = on;
	      return this;
	    }

	    /**
	     * In the scientific mode, forces the axis to take a specific power of ten. Useful if you want to show kilometers instead of meters for example. In this case you would use "3" as a value.
	     * @param {Number} scientificScaleExponent - Forces the scientific scale to take a defined power of ten
	     * @return {Axis} The current axis
	     * @memberof Axis
	     * @since 1.13.3
	     * @see Axis#setScientific
	     */
	    setScientificScaleExponent(scientificScaleExponent) {
	      this.options.scientificScaleExponent = scientificScaleExponent;
	      return this;
	    }

	    /**
	     * The engineer scaling is similar to the scientific scaling ({@link Axis#setScientificScale}) but allowing only mupltiples of 3 to be used to scale the axis (for instance, go from grams to kilograms while skipping decagrams and hexagrams)
	     * @param {Boolean} engineeringScaling - <code>true</code> to turn on the engineering scaling
	     * @return {Axis} The current axis
	     * @memberof Axis
	     * @since 1.13.3
	     * @see Axis#setScientific
	     */
	    setEngineering(engineeringScaling) {
	      //bool
	      this.options.scientificScale = engineeringScaling;
	      this.options.engineeringScale = engineeringScaling;
	      return this;
	    }

	    /**
	     * Calculates the closest engineering exponent from a scientific exponent
	     * @param {Number} scientificExponent - The exponent of 10 based on which the axis will be scaled
	     * @return {Number} The appropriate engineering exponent
	     * @memberof Axis
	     * @since 1.13.3
	     * @private
	     */
	    getEngineeringExponent(scientificExponent) {

	      if (scientificExponent > 0) {
	        scientificExponent -= scientificExponent % 3;
	      } else {
	        scientificExponent -= (3 - -scientificExponent % 3) % 3;
	      }

	      return scientificExponent;
	    }

	    /**
	     * Enables log scaling
	     * @param {Boolean} logScale - ```true``` to enable the log scaling, ```false``` to disable it
	     * @return {Axis} The current axis
	     * @memberof Axis
	     * @since 1.13.3
	     */
	    setLogScale(log) {
	      this.options.logScale = log;
	      return this;
	    }

	    isZoomed() {
	      return !(this.currentAxisMin == this.getMinValue() || this.currentAxisMax == this.getMaxValue());
	    }

	    hasAxis() {
	      return false;
	    }

	    getType() {
	      return null;
	    }
	  }

	  /**
	   *  @alias Axis#getVal
	   */
	  Axis.prototype.getValue = Axis.prototype.getVal;

	  /**
	   *  @alias Axis#getRelPx
	   */
	  Axis.prototype.getDeltaPx = Axis.prototype.getRelPx;

	  exports.default = Axis;
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(7)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('./graph.axis'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.graph);
	    global.graphAxisY = mod.exports;
	  }
	})(this, function (exports, _graph) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _graph2 = _interopRequireDefault(_graph);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  /** 
	   * Generic constructor of a y axis
	   * @extends Axis
	   */
	  class AxisY extends _graph2.default {

	    constructor(graph, leftright, options) {

	      super(graph, leftright, options);
	      this.leftright = leftright;
	      this.left = leftright == 'left';
	    }

	    /**
	     *  @private
	     */
	    setAxisPosition(shift) {
	      this.shiftPosition = shift;
	    }

	    getAxisPosition(shift) {
	      return this.shiftPosition || 0;
	    }

	    getAdditionalWidth() {
	      let pos = 0;
	      if (this.getLabel()) {
	        pos += this.graph.options.fontSize;
	      }

	      if (this.isShown()) {
	        pos += Math.abs(this.tickMargin);
	      }
	      return pos;
	    }

	    /**
	     *  @returns {Boolean} always ```false```
	     */
	    isX() {
	      return false;
	    }

	    /**
	     *  @returns {Boolean} always ```true```
	     */
	    isY() {
	      return true;
	    }

	    /**
	     *  @private
	     */
	    resetTicksLength() {
	      this.longestTick = [false, 0];
	    }

	    /**
	     *  @private
	     */
	    getMaxSizeTick() {
	      // Gives an extra margin of 5px
	      return this.longestTick && this.longestTick[0] ? this.longestTick[0].getComputedTextLength() + 5 : 0; //(this.left ? 10 : 0);
	    }

	    draw() {

	      this.tickMargin = this.left ? -5 - this.tickPx1 * this.tickScaling[1] : 5 + this.tickPx1 * this.tickScaling[1];
	      var tickWidth = super.draw(...arguments);
	      tickWidth += this.getAdditionalWidth();
	      this.drawSpecifics(tickWidth);

	      this.fullwidthlabel = tickWidth;

	      return tickWidth;
	    }

	    equalizePosition(width) {

	      this.placeLabel(this.left ? -width : width);

	      if (this.getLabel()) {
	        return width + this.graph.options.fontSize;
	      }

	      return 0;
	    }

	    /**
	     *  @private
	     */
	    drawTick(value, level, options, forcedPos) {
	      var pos;

	      var self = this,
	          group = this.groupTicks,
	          tickLabel;

	      pos = forcedPos || this.getPos(value);

	      if (pos == undefined || isNaN(pos)) {
	        return;
	      }

	      var tick = this.nextTick(level, tick => {

	        tick.setAttribute('x1', (this.left ? 1 : -1) * this.tickPx1 * this.tickScaling[level]);
	        tick.setAttribute('x2', (this.left ? 1 : -1) * this.tickPx2 * this.tickScaling[level]);

	        if (level == 1) {
	          tick.setAttribute('stroke', this.getPrimaryTicksColor());
	        } else {
	          tick.setAttribute('stroke', this.getSecondaryTicksColor());
	        }
	      });

	      tick.setAttribute('y1', pos);
	      tick.setAttribute('y2', pos);

	      this.nextGridLine(level == 1, 0, this.graph.getDrawingWidth(), pos, pos);

	      //  this.groupTicks.appendChild( tick );
	      if (level == 1) {
	        var tickLabel = this.nextTickLabel(tickLabel => {

	          tickLabel.setAttribute('x', this.tickMargin);
	          if (this.getTicksLabelColor() !== 'black') {
	            tickLabel.setAttribute('fill', this.getTicksLabelColor());
	          }

	          if (this.left) {
	            tickLabel.setAttribute('text-anchor', 'end');
	          } else {
	            tickLabel.setAttribute('text-anchor', 'start');
	          }
	          tickLabel.style.dominantBaseline = 'central';
	        });

	        tickLabel.setAttribute('y', pos);
	        this.setTickContent(tickLabel, value, options);

	        if (String(tickLabel.textContent).length >= this.longestTick[1]) {
	          this.longestTick[0] = tickLabel;
	          this.longestTick[1] = String(tickLabel.textContent).length;
	        }
	      }
	    }

	    drawLabel() {

	      if (this.getLabelColor() !== 'black') {
	        this.label.setAttribute('fill', this.getLabelColor());
	      }

	      this.label.setAttribute('dominant-baseline', !this.left ? 'hanging' : 'auto');
	      this.labelTspan.textContent = this.getLabel();
	    }

	    placeLabel(y) {
	      this.label.setAttribute('transform', 'translate(' + y + ', ' + Math.abs(this.getMaxPx() + this.getMinPx()) / 2 + ') rotate(-90)');
	    }

	    /**
	     *  @private
	     */
	    drawSpecifics() {
	      // Place label correctly
	      //this.label.setAttribute('x', (this.getMaxPx() - this.getMinPx()) / 2);
	      /* 
	      if ( !this.left ) {
	         this.labelTspan.style.dominantBaseline = 'hanging';
	        this.expTspan.style.dominantBaseline = 'hanging';
	        this.expTspanExp.style.dominantBaseline = 'hanging';
	         this.unitTspan.style.dominantBaseline = 'hanging';
	        this.preunitTspan.style.dominantBaseline = 'hanging';
	      }
	      */
	      this.line.setAttribute('y1', this.getMinPx());
	      this.line.setAttribute('y2', this.getMaxPx());
	      this.line.setAttribute('x1', 0);
	      this.line.setAttribute('x2', 0);

	      this.line.setAttribute('stroke', this.getAxisColor());

	      var span = this.getSpan();
	      this.line.setAttribute('marker-start', !this.options.splitMarks || span[0] == 0 ? "" : "url(#verticalsplit_" + this.graph.getId() + ")");
	      this.line.setAttribute('marker-end', !this.options.splitMarks || span[1] == 1 ? "" : "url(#verticalsplit_" + this.graph.getId() + ")");
	    }

	    /**
	     *  @private
	     */
	    setShift(shift) {

	      this.shift = shift;

	      if (!this.shift || !this.graph.getWidth()) {
	        return;
	      }

	      let xshift = this.shift;
	      xshift = this.floating ? xshift : this.isLeft() ? xshift : this.graph.getWidth() - this.graph.getPaddingRight() - this.graph.getPaddingLeft() - xshift;
	      this.group.setAttribute('transform', 'translate( ' + xshift + ' 0 )');
	      this.drawLabel();
	    }

	    /**
	     *  @private
	     */
	    isLeft() {
	      return this.left;
	    }

	    /**
	     *  @private
	     */
	    isRight() {
	      return !this.left;
	    }

	    /**
	     *  @private
	     */
	    isFlipped() {
	      return !this.options.flipped;
	    }

	    /**
	     *  @private
	     */
	    _draw0Line(px) {

	      if (!this._0line) {
	        this._0line = document.createElementNS(this.graph.ns, 'line');
	      }

	      this._0line.setAttribute('y1', px);
	      this._0line.setAttribute('y2', px);

	      this._0line.setAttribute('x1', 0);
	      this._0line.setAttribute('x2', this.graph.getDrawingWidth());

	      this._0line.setAttribute('stroke', 'black');
	      this.groupGrids.appendChild(this._0line);
	    }

	    /**
	     *  @private
	     */
	    handleMouseMoveLocal(x, y, e) {
	      y -= this.graph.getPaddingTop();
	      this.mouseVal = this.getVal(y);
	    }

	    /**
	     * Scales the axis with respect to the series contained in an x axis
	     * @param {Axis} [ axis = graph.getXAxis() ] - The X axis to use as a reference
	     * @param {Serie} [ excludeSerie ] - A serie to exclude
	     * @param {Number} [ start = xaxis.getCurrentMin() ] - The start of the boundary
	     * @param {Number} [ end = xaxis.getCurrentMax() ] - The end of the boundary
	     * @param {Boolean} [ min = true ] - Adapt the min
	     * @param {Boolean} [ max = true ] - Adapt the max
	     * @returns {Axis} The current axis
	     */
	    scaleToFitAxis(axis, excludeSerie, start, end, min, max) {
	      //console.log( axis instanceof GraphAxis );
	      if (!axis || !axis.isX()) {
	        axis = this.graph.getXAxis();
	      }

	      if (isNaN(start)) {
	        start = axis.getCurrentMin();
	      }

	      if (isNaN(end)) {
	        end = axis.getCurrentMax();
	      }

	      if (min === undefined) {
	        min = true;
	      }

	      if (max === undefined) {
	        max = true;
	      }

	      if (typeof excludeSerie == "number") {
	        end = start;
	        start = excludeSerie;
	        excludeSerie = false;
	      }

	      var maxV = -Infinity,
	          minV = Infinity,
	          j = 0;

	      for (var i = 0, l = this.graph.series.length; i < l; i++) {

	        if (!this.graph.series[i].isShown()) {
	          continue;
	        }

	        if (this.graph.series[i] == excludeSerie) {
	          continue;
	        }

	        if (!(this.graph.series[i].getXAxis() == axis) || this.graph.series[i].getYAxis() !== this) {
	          continue;
	        }

	        j++;

	        maxV = max ? Math.max(maxV, this.graph.series[i].getMax(start, end)) : 0;
	        minV = min ? Math.min(minV, this.graph.series[i].getMin(start, end)) : 0;
	      }

	      if (j == 0) {

	        this.setMinMaxToFitSeries(); // No point was found
	      } else {

	        // If we wanted originally to resize min and max. Otherwise we use the current value
	        minV = min ? minV : this.getCurrentMin();
	        maxV = max ? maxV : this.getCurrentMax();

	        var interval = maxV - minV;

	        minV -= this.options.axisDataSpacing.min * interval;
	        maxV += this.options.axisDataSpacing.max * interval;

	        this._doZoomVal(minV, maxV);
	      }

	      return this;
	    }

	    /**
	     *  Caches the minimum px and maximum px position of the axis. Includes axis spans and flipping. Mostly used internally
	     *  @return {Axis} The current axis instance
	     */
	    setMinMaxFlipped() {

	      var interval = this.maxPx - this.minPx;

	      if (isNaN(interval)) {
	        return;
	      }

	      var maxPx = this.maxPx - interval * this.options.span[0] - this.options.marginMin;
	      var minPx = this.maxPx - interval * this.options.span[1] + this.options.marginMax;

	      this.minPxFlipped = this.isFlipped() ? maxPx : minPx;
	      this.maxPxFlipped = this.isFlipped() ? minPx : maxPx;
	    }

	  }

	  exports.default = AxisY;
	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(6)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('./graph.axis.x'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.graphAxis);
	    global.graphAxisXBar = mod.exports;
	  }
	})(this, function (exports, _graphAxis) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _graphAxis2 = _interopRequireDefault(_graphAxis);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  /** 
	   * Generic constructor of a y axis
	   * @class AxisXBar
	   * @augments Axis
	   */
	  class AxisXBar extends _graphAxis2.default {

	    constructor(graph, topbottom, options = {}) {
	      super(graph, topbottom, options);
	    }

	    /**
	     * @param {Object[]} categories - Categories array
	     * @param {(String|Number)} categories[].title - The title of the category (to be dispalyed)
	     * @param {(String|Number)} categories[].name - The name of the category (to indentify series)
	     * @returns {AxisBar} The current axis instance
	     */
	    set categories(categories) {
	      this._barCategories = categories;
	      return this;
	    }

	    draw() {

	      var self = this,
	          tickLabel,
	          width = this.graph.drawingSpaceWidth,
	          elements = this._barCategories;

	      this.forceMin(0);
	      this.forceMax(1);

	      this.cacheCurrentMin();
	      this.cacheCurrentMax();
	      this.cacheInterval();

	      if (!elements) {
	        return;
	      }

	      if (!Array.isArray(elements)) {
	        elements = [elements];
	      }

	      // this.drawInit();

	      //var widthPerElement = width / elements.length;
	      for (var i = 0; i <= elements.length; i++) {
	        this.drawTick(i / elements.length, 2);

	        if (i < elements.length) {
	          tickLabel = this.nextTickLabel(function (tickLabel) {

	            tickLabel.setAttribute('y', (self.top ? -1 : 1) * ((self.options.tickPosition == 1 ? 8 : 20) + (self.top ? 10 : 0)));
	            tickLabel.setAttribute('text-anchor', 'middle');
	            if (self.getTicksLabelColor() !== 'black') {
	              tickLabel.setAttribute('fill', self.getTicksLabelColor());
	            }
	            tickLabel.style.dominantBaseline = 'hanging';
	          });

	          tickLabel.setAttribute('x', this.getPos((i + 0.5) / elements.length));
	          tickLabel.textContent = elements[i].title;
	        }
	      }

	      this.drawSpecifics();
	      return this;
	    }

	    /**
	     * Sets the series automatically
	     * @returns {AxisBar} The current axis instance
	     */
	    autoSeries() {

	      let series = [];
	      for (let serie of this.graph.series) {
	        if (serie.getXAxis() == this) {
	          series.push(serie);
	        }
	      }

	      this.setSeries(...series);
	      return this;
	    }

	    /**
	     * Sets the series that should belong to the axis
	     * @param {...(Series|Number|String)} series - List of series identified either by their instance, or their index (string or number)
	     * @returns {AxisBar} The current axis instance
	     */
	    setSeries() {

	      var self = this;
	      this.series = arguments;

	      Array.prototype.map.call(this.series, function (serie, index) {

	        if (!(typeof serie == "object")) {
	          serie = self.graph.getSerie(serie);
	        }

	        if (serie.setCategoryConfig) {
	          serie.setCategoryConfig(index, self._barCategories, self.series.length);
	        }
	      });

	      this._getUsedCategories();

	      return this;
	    }

	    _getUsedCategories() {

	      let categories = {},
	          total = 0;

	      Array.prototype.map.call(this.series, serie => {
	        let usedCategories = serie.getUsedCategories();
	        for (let cat of usedCategories) {

	          if (!categories.hasOwnProperty(cat)) {
	            categories[cat] = 1;
	            total += 1;
	          }

	          categories[cat]++;
	          total++;
	        }
	      });

	      let accumulator = 0;
	      for (let i in categories) {
	        let temp = categories[i];
	        categories[i] = accumulator;
	        accumulator += temp;
	      }

	      let dispatchedCategories = {};

	      let i = 0;
	      Array.prototype.map.call(this.series, serie => {

	        let scategories = serie.getUsedCategories(),
	            indices = {};

	        scategories.map(cat => {

	          dispatchedCategories[cat] = dispatchedCategories[cat] || 0.5;
	          indices[cat] = (categories[cat] + dispatchedCategories[cat]) / total;
	          dispatchedCategories[cat]++;
	        });

	        serie.setDataIndices(indices, total);
	        i++;
	      });
	    }

	    getType() {
	      return 'category';
	    }
	  }

	  exports.default = AxisXBar;
	});

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(7), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('./graph.axis'), require('./graph.util'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.graph, global.graph);
	    global.graphAxisXTime = mod.exports;
	  }
	})(this, function (exports, _graph, _graph3) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _graph2 = _interopRequireDefault(_graph);

	  var util = _interopRequireWildcard(_graph3);

	  function _interopRequireWildcard(obj) {
	    if (obj && obj.__esModule) {
	      return obj;
	    } else {
	      var newObj = {};

	      if (obj != null) {
	        for (var key in obj) {
	          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	        }
	      }

	      newObj.default = obj;
	      return newObj;
	    }
	  }

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  var axisFormat = [{

	    threshold: 20,
	    increments: {

	      1: {
	        increment: 1, // 1 minute
	        unit: 'i',
	        format: 'HH"h"MM (dd/mm/yy)'
	      },

	      2: { // 10 seconds
	        increment: 1,
	        unit: 's',
	        format: 'MM:ss"s"'
	      }
	    }
	  }, {

	    threshold: 50,
	    increments: {

	      1: {
	        increment: 1, // 1 minute
	        unit: 'i',
	        format: 'HH"h"MM (dd/mm/yy)'
	      },

	      2: { // 2 seconds
	        increment: 2,
	        unit: 's',
	        format: 'MM:ss"s"'
	      }
	    }
	  }, {

	    threshold: 100,
	    increments: {

	      1: {
	        increment: 1, // 1 minute
	        unit: 'i',
	        format: 'HH"h"MM (dd/mm/yy)'
	      },

	      2: { // 5 seconds
	        increment: 5,
	        unit: 's',
	        format: 'MM:ss"s"'
	      }
	    }
	  }, {

	    threshold: 600,
	    increments: {

	      1: {
	        increment: 10, // 1 minute
	        unit: 'i',
	        format: 'HH"h"MM (dd/mm/yy)'
	      },

	      2: { // 10 seconds
	        increment: 30,
	        unit: 's',
	        format: 'MM:ss"s"'
	      }
	    }
	  }, { // One day

	    threshold: 1000,
	    increments: {

	      1: { // 1h
	        increment: 1,
	        unit: 'h',
	        format: 'HH"h"MM (dd/mm/yy)'
	      },

	      2: { // 10 minutes
	        increment: 10,
	        unit: 'i',
	        format: 'MM"min"'
	      }
	    }
	  }, { // One day

	    threshold: 1500,
	    increments: {

	      1: {
	        increment: 1, // One day on the first axis
	        unit: 'd',
	        format: 'dd/mm/yyyy'
	      },

	      2: {
	        increment: 1,
	        unit: 'i',
	        format: 'H"h"MM'
	      }
	    }
	  }, { // One day

	    threshold: 3000,
	    increments: {

	      1: {
	        increment: 1, // One day on the first axis
	        unit: 'd',
	        format: 'dd/mm/yyyy'
	      },

	      2: {
	        increment: 2,
	        unit: 'i',
	        format: 'H"h"MM'
	      }
	    }
	  }, { // One day

	    threshold: 8000,
	    increments: {

	      1: {
	        increment: 1, // One day on the first axis
	        unit: 'd',
	        format: 'dd/mm/yyyy'
	      },

	      2: {
	        increment: 10,
	        unit: 'i',
	        format: 'H"h"MM'
	      }
	    }
	  }, { // One day

	    threshold: 26400,
	    increments: {

	      1: {
	        increment: 1, // One day on the first axis
	        unit: 'd',
	        format: 'dd/mm/yyyy'
	      },

	      2: {
	        increment: 20,
	        unit: 'i',
	        format: 'H"h"MM'
	      }
	    }
	  }, { // One day

	    threshold: 86400,
	    increments: {

	      1: {
	        increment: 1, // One day on the first axis
	        unit: 'd',
	        format: 'dd/mm/yyyy'
	      },

	      2: {
	        increment: 1,
	        unit: 'h',
	        format: 'H"h"MM'
	      }
	    }
	  }, { // One day

	    threshold: 200000,
	    increments: {

	      1: {

	        increment: 1,
	        unit: 'd',
	        format: 'dd/mm/yyyy'
	      },

	      2: {

	        increment: 2, // One day on the first axis
	        unit: 'h',
	        format: 'H"h"MM'
	      }
	    }
	  }, { // One day

	    threshold: 400000,
	    increments: {

	      1: {

	        increment: 1,
	        unit: 'd',
	        format: 'dd/mm/yyyy'
	      },

	      2: {

	        increment: 6, // One day on the first axis
	        unit: 'h',
	        format: 'H"h"MM'
	      }
	    }
	  }, { // One day

	    threshold: 1400000,
	    increments: {

	      1: {

	        increment: 1,
	        unit: 'd',
	        format: 'dd/mm/yyyy'
	      },

	      2: {

	        increment: 12, // One day on the first axis
	        unit: 'h',
	        format: 'HH"h"MM'
	      }
	    }
	  }, { // One day

	    threshold: 6400000,
	    increments: {

	      1: {

	        increment: 1,
	        unit: 'm',
	        format: 'mmmm yyyy'
	      },

	      2: {

	        increment: 1, // One day on the first axis
	        unit: 'd',
	        format: 'dd'
	      }
	    }
	  }, { // One day

	    threshold: 12400000,
	    increments: {

	      1: {

	        increment: 1,
	        unit: 'm',
	        format: 'mmmm yyyy'
	      },

	      2: {

	        increment: 2, // One day on the first axis
	        unit: 'd',
	        format: 'dd'
	      }
	    }
	  }, { // One day

	    threshold: 86400000 * 0.5,
	    increments: {

	      1: {

	        increment: 1,
	        unit: 'm',
	        format: 'mmmm yyyy'
	      },

	      2: {

	        increment: 7, // One day on the first axis
	        unit: 'd',
	        format: 'dd'
	      }
	    }
	  }, { // One day

	    threshold: 86400000 * 0.8,
	    increments: {

	      1: {

	        increment: 1,
	        unit: 'm',
	        format: 'mmmm yyyy'
	      },

	      2: {

	        increment: 15, // One day on the first axis
	        unit: 'd',
	        format: 'dd'
	      }
	    }
	  }, { // One month

	    threshold: 86400000 * 1,
	    increments: {

	      1: {
	        increment: 1,
	        unit: 'y',
	        format: 'yyyy'
	      },

	      2: {

	        increment: 3, // One day on the first axis
	        unit: 'm',
	        format: 'mm/yyyy'
	      }
	    }
	  }, { // One month

	    threshold: 86400000 * 2,
	    increments: {

	      1: {

	        increment: 1,
	        unit: 'y',
	        format: 'yyyy'
	      },

	      2: {

	        increment: 4, // One day on the first axis
	        unit: 'm',
	        format: 'mm/yyyy'
	      }
	    }
	  }, { // One month

	    threshold: 86400000 * 10,
	    increments: {

	      1: {

	        increment: 1,
	        unit: 'y',
	        format: 'yyyy'
	      },

	      2: {

	        increment: 6, // One day on the first axis
	        unit: 'm',
	        format: 'mm/yyyy'
	      }
	    }
	  }, { // One month

	    threshold: 86400000 * 12,
	    increments: {

	      1: {

	        increment: 1,
	        unit: 'y',
	        format: 'yyyy'
	      },

	      2: {

	        increment: 1, // One day on the first axis
	        unit: 'y',
	        format: 'yyyy'
	      }
	    }
	  }];

	  /*
	   * Date Format 1.2.3
	   * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
	   * MIT license
	   *
	   * Includes enhancements by Scott Trenda <scott.trenda.net>
	   * and Kris Kowal <cixar.com/~kris.kowal/>
	   *
	   * Accepts a date, a mask, or a date and a mask.
	   * Returns a formatted version of the given date.
	   * The date defaults to the current date/time.
	   * The mask defaults to dateFormat.masks.default.
	   */

	  var dateFormat = function () {
	    var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[WLloSZ]|"[^"]*"|'[^']*'/g,
	        timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
	        timezoneClip = /[^-+\dA-Z]/g,
	        pad = function (val, len) {
	      val = String(val);
	      len = len || 2;
	      while (val.length < len) val = "0" + val;
	      return val;
	    },
	        getWeek = function (d, f) {
	      var onejan = new Date(d[f + 'FullYear'](), 0, 1);
	      return Math.ceil(((d - onejan) / 86400000 + onejan[f + 'Day']() + 1) / 7);
	    };

	    // Regexes and supporting functions are cached through closure
	    return function (date, mask, utc) {
	      var dF = dateFormat;

	      // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
	      if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
	        mask = date;
	        date = undefined;
	      }

	      // Passing date through Date applies Date.parse, if necessary
	      date = date ? new Date(date) : new Date();
	      if (isNaN(date)) throw SyntaxError("invalid date:" + date);

	      mask = String(dF.masks[mask] || mask || dF.masks["default"]);

	      // Allow setting the utc argument via the mask
	      if (mask.slice(0, 4) == "UTC:") {
	        mask = mask.slice(4);
	        utc = true;
	      }

	      var _ = utc ? "getUTC" : "get",
	          d = date[_ + "Date"](),
	          D = date[_ + "Day"](),
	          m = date[_ + "Month"](),
	          y = date[_ + "FullYear"](),
	          H = date[_ + "Hours"](),
	          M = date[_ + "Minutes"](),
	          s = date[_ + "Seconds"](),
	          L = date[_ + "Milliseconds"](),
	          o = utc ? 0 : date.getTimezoneOffset(),
	          flags = {
	        d: d,
	        dd: pad(d),
	        ddd: dF.i18n.dayNames[D],
	        dddd: dF.i18n.dayNames[D + 7],
	        m: m + 1,
	        mm: pad(m + 1),
	        mmm: dF.i18n.monthNames[m],
	        mmmm: dF.i18n.monthNames[m + 12],
	        yy: String(y).slice(2),
	        yyyy: y,
	        h: H % 12 || 12,
	        hh: pad(H % 12 || 12),
	        H: H,
	        HH: pad(H),
	        M: M,
	        MM: pad(M),
	        s: s,
	        ss: pad(s),
	        l: pad(L, 3),
	        L: pad(L > 99 ? Math.round(L / 10) : L),
	        t: H < 12 ? "a" : "p",
	        tt: H < 12 ? "am" : "pm",
	        T: H < 12 ? "A" : "P",
	        TT: H < 12 ? "AM" : "PM",
	        Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
	        o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
	        S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10],
	        W: getWeek(date, _)
	      };

	      return mask.replace(token, function ($0) {
	        return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
	      });
	    };
	  }();

	  // Some common format strings
	  dateFormat.masks = {
	    "default": "ddd mmm dd yyyy HH:MM:ss",
	    shortDate: "m/d/yy",
	    mediumDate: "mmm d, yyyy",
	    longDate: "mmmm d, yyyy",
	    fullDate: "dddd, mmmm d, yyyy",
	    shortTime: "h:MM TT",
	    mediumTime: "h:MM:ss TT",
	    longTime: "h:MM:ss TT Z",
	    isoDate: "yyyy-mm-dd",
	    isoTime: "HH:MM:ss",
	    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
	    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
	  };

	  // Internationalization strings
	  dateFormat.i18n = {
	    dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	    monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
	  };

	  /* END DATE FORMAT */

	  function getClosestIncrement(value, basis) {
	    return Math.round(value / basis) * basis;
	  }

	  function roundDate(date, format) {

	    switch (format.unit) {

	      case 's':
	        // Round at n hour

	        date.setSeconds(getClosestIncrement(date.getSeconds(), format.increment));
	        date.setMilliseconds(0);

	        break;

	      case 'i':
	        // Round at n hour

	        date.setMinutes(getClosestIncrement(date.getMinutes(), format.increment));
	        date.setSeconds(0);
	        date.setMilliseconds(0);

	        break;

	      case 'h':
	        // Round at n hour

	        date.setHours(getClosestIncrement(date.getHours(), format.increment));

	        date.setMinutes(0);
	        date.setSeconds(0);
	        date.setMilliseconds(0);

	        break;

	      case 'd':

	        date.setMinutes(0);
	        date.setSeconds(0);
	        date.setMilliseconds(0);
	        date.setHours(0);

	        date.setDate(getClosestIncrement(date.getDate(), format.increment));

	        break;

	      case 'm':

	        date.setMinutes(0);
	        date.setSeconds(0);
	        date.setMilliseconds(0);
	        date.setHours(0);
	        date.setDate(1);

	        date.setMonth(getClosestIncrement(date.getMonth(), format.increment));

	        break;

	      case 'y':

	        date.setMinutes(0);
	        date.setSeconds(0);
	        date.setMilliseconds(0);
	        date.setHours(0);
	        date.setDate(1);
	        date.setMonth(0);

	        //date.setYear( getClosest( date.getDate(), format.increment ) );

	        break;

	      default:
	        throw "Date format not recognized";
	        break;
	    }

	    return date;
	  }

	  function incrementDate(date, format) {

	    switch (format.unit) {

	      case 's':

	        date.setSeconds(date.getSeconds() + format.increment);
	        date.setMilliseconds(0);

	        break;

	      case 'i':

	        date.setMinutes(date.getMinutes() + format.increment);
	        date.setSeconds(0);
	        date.setMilliseconds(0);

	        break;

	      case 'h':
	        // Round at n hour

	        date.setHours(date.getHours() + format.increment);
	        date.setMinutes(0);
	        date.setSeconds(0);
	        date.setMilliseconds(0);

	        break;

	      case 'd':

	        date.setDate(date.getDate() + format.increment);
	        date.setMinutes(0);
	        date.setSeconds(0);
	        date.setMilliseconds(0);
	        date.setHours(0);

	        break;

	      case 'm':

	        date.setMonth(date.getMonth() + format.increment);
	        date.setMinutes(0);
	        date.setSeconds(0);
	        date.setMilliseconds(0);
	        date.setHours(0);
	        date.setDate(1);

	        break;

	      case 'y':

	        date.setFullYear(date.getFullYear() + format.increment);

	        date.setMinutes(0);
	        date.setSeconds(0);
	        date.setMilliseconds(0);
	        date.setHours(0);
	        date.setDate(1);
	        date.setMonth(0);

	        break;

	      default:
	        throw "Date format not recognized";
	        break;
	    }

	    return date;
	  }

	  function getGroup(axis, level, number) {

	    if (axis.groups[level][number]) {
	      axis.groups[level][number].group.setAttribute('display', 'block');
	      return axis.groups[level][number];
	    }

	    var g = {

	      group: document.createElementNS(axis.graph.ns, 'g'),
	      text: document.createElementNS(axis.graph.ns, 'text')
	    };

	    var line = document.createElementNS(axis.graph.ns, 'line');

	    line.setAttribute('stroke', 'black');
	    line.setAttribute('y1', 0);
	    switch (level) {

	      case 2:

	        line.setAttribute('y2', 6);
	        g.text.setAttribute('y', 15);

	        g.line = line;

	        g.group.appendChild(g.line);
	        break;

	      case 1:

	        line.setAttribute('y2', 20);
	        g.text.setAttribute('y', 10);

	        g.line1 = line;
	        g.line2 = line.cloneNode();

	        g.group.appendChild(g.line1);
	        g.group.appendChild(g.line2);

	        break;
	    }

	    g.text.setAttribute('text-anchor', 'middle');
	    g.text.setAttribute('dominant-baseline', 'middle');

	    g.group.appendChild(g.text);

	    axis.getWrapper(level).appendChild(g.group);

	    return axis.groups[level][number] = g;
	  }

	  function hideGroups(axis, level, from) {

	    for (; from < axis.groups[level].length; from++) {

	      hideGroup(axis.groups[level][from]);
	    }
	  }

	  function hideGroup(group) {
	    group.group.setAttribute('display', 'none');
	  }

	  function getDateText(date, format) {

	    return dateFormat(date, format);
	  }

	  function renderGroup(level, group, text, minPx, maxPx, x1, x2) {

	    switch (level) {

	      case 1:

	        var x1B = Math.max(minPx, Math.min(maxPx, x1)),
	            x2B = Math.max(minPx, Math.min(maxPx, x2));

	        if (isNaN(x2B) || isNaN(x1B)) {
	          return;
	        }

	        group.line1.setAttribute('x1', x1B);
	        group.line2.setAttribute('x1', x2B);

	        group.line1.setAttribute('x2', x1B);
	        group.line2.setAttribute('x2', x2B);

	        group.text.setAttribute('x', (x1B + x2B) / 2);

	        while (text.length * 8 > x2B - x1B) {

	          text = text.substr(0, text.length - 2) + ".";

	          if (text.length == 1) {
	            text = "";
	            break;
	          }
	        }

	        group.text.textContent = text;
	        break;

	      case 2:

	        if (x1 < minPx || x1 > maxPx) {

	          hideGroup(group);
	          return;
	        }

	        group.line.setAttribute('x1', x1);
	        group.line.setAttribute('x2', x1);
	        group.text.setAttribute('x', x1);
	        group.text.textContent = text;

	        break;
	    }
	  }

	  class GraphXAxis extends _graph2.default {

	    constructor(graph, topbottom, options) {

	      super(...arguments);
	    }

	    init(graph, options) {

	      super.init(graph, options);

	      this.wrapper = {
	        1: document.createElementNS(graph.ns, 'g'),
	        2: document.createElementNS(graph.ns, 'g')
	      };
	      this.groups = {
	        1: [],
	        2: []
	      };

	      var rect = document.createElementNS(graph.ns, 'rect');
	      rect.setAttribute('fill', '#c0c0c0');
	      rect.setAttribute('stroke', '#808080');
	      rect.setAttribute('height', '20');
	      rect.setAttribute('x', '0');
	      rect.setAttribute('y', '0');

	      this.rect = rect;

	      this.wrapper[1].appendChild(this.rect);

	      //    this.init( graph, options );

	      this.group.appendChild(this.wrapper[1]);
	      this.group.appendChild(this.wrapper[2]);

	      this.wrapper[1].setAttribute('transform', 'translate( 0, 25 )');
	      this.wrapper[2].setAttribute('transform', 'translate( 0, 00 )');
	    }

	    draw() {
	      // Redrawing of the axis
	      var visible;

	      //this.drawInit();

	      this.cacheCurrentMax();
	      this.cacheCurrentMin();

	      if (this.currentAxisMin == undefined || this.currentAxisMax == undefined) {
	        this.setMinMaxToFitSeries(true); // We reset the min max as a function of the series
	      }

	      this.line.setAttribute('x1', this.getMinPx());
	      this.line.setAttribute('x2', this.getMaxPx());
	      this.line.setAttribute('y1', 0);
	      this.line.setAttribute('y2', 0);

	      var widthPx = this.maxPx - this.minPx;
	      var widthTime = this.getCurrentInterval();

	      var timePerPx = widthTime / widthPx;

	      var maxVal = this.getCurrentMax();
	      var minVal = this.getCurrentMin();

	      this.rect.setAttribute('width', widthPx);
	      this.rect.setAttribute('x', this.minPx);

	      if (!maxVal || !minVal) {
	        return 0;
	      }

	      var currentFormat;

	      for (i = 0; i < axisFormat.length; i++) {

	        if (axisFormat[i].threshold > timePerPx) {
	          currentFormat = axisFormat[i];

	          break;
	        }
	      }

	      if (!currentFormat) {
	        currentFormat = axisFormat[axisFormat.length - 1];
	      }

	      var xVal1,
	          xVal2,
	          level = 0,
	          dateFirst,
	          currentDate,
	          text,
	          group,
	          i;

	      for (level = 1; level <= 2; level++) {

	        if (!util.isNumeric(minVal)) {
	          hideGroups(this, level, 0);
	          break;
	        }

	        dateFirst = new Date(minVal);

	        currentDate = roundDate(dateFirst, currentFormat.increments[level]);

	        i = 0;

	        do {
	          /** @ignore */
	          text = getDateText(currentDate, currentFormat.increments[level].format);
	          group = getGroup(this, level, i);

	          xVal1 = this.getPx(currentDate.getTime());
	          currentDate = incrementDate(currentDate, currentFormat.increments[level]);
	          xVal2 = this.getPx(currentDate.getTime());

	          renderGroup(level, group, text, this.getMinPx(), this.getMaxPx(), xVal1, xVal2);

	          i++;
	          if (i > 100) {
	            break;
	          }
	        } while (currentDate.getTime() < maxVal);

	        hideGroups(this, level, i);
	      }
	    }

	    isX() {
	      return true;
	    }

	    getWrapper(level) {
	      return this.wrapper[level];
	    }

	    setShift(shift, totalDimension) {
	      this.shift = shift;
	      this.group.setAttribute('transform', 'translate(0 ' + (this.top ? this.shift : this.graph.getDrawingHeight() - this.shift) + ')');
	    }

	    getAxisPosition() {
	      return 60;
	    }

	    setMinMaxFlipped() {

	      var interval = this.maxPx - this.minPx;
	      var maxPx = interval * this.options.span[1] + this.minPx;
	      var minPx = interval * this.options.span[0] + this.minPx;

	      this.minPxFlipped = this.isFlipped() ? maxPx : minPx;
	      this.maxPxFlipped = this.isFlipped() ? minPx : maxPx;
	    }

	  }

	  exports.default = GraphXAxis;
	});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1), __webpack_require__(12), __webpack_require__(13), __webpack_require__(3), __webpack_require__(14)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('../graph.core'), require('./graph.serie'), require('./slotoptimizer'), require('../graph.util'), require('../mixins/graph.mixin.errorbars'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.graph, global.graph, global.slotoptimizer, global.graph, global.graphMixin);
	    global.graphSerieLine = mod.exports;
	  }
	})(this, function (exports, _graph, _graph3, _slotoptimizer, _graph5, _graphMixin) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _graph2 = _interopRequireDefault(_graph);

	  var _graph4 = _interopRequireDefault(_graph3);

	  var _slotoptimizer2 = _interopRequireDefault(_slotoptimizer);

	  var util = _interopRequireWildcard(_graph5);

	  var _graphMixin2 = _interopRequireDefault(_graphMixin);

	  function _interopRequireWildcard(obj) {
	    if (obj && obj.__esModule) {
	      return obj;
	    } else {
	      var newObj = {};

	      if (obj != null) {
	        for (var key in obj) {
	          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	        }
	      }

	      newObj.default = obj;
	      return newObj;
	    }
	  }

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  /**
	   * @name SerieLineDefaultOptions
	   * @object
	   * @static
	   * @memberof SerieLine
	   */
	  const defaults = {

	    lineColor: 'black',
	    lineStyle: 1,
	    flip: false,
	    label: "",
	    lineWidth: 1,

	    markers: false,
	    trackMouse: false,
	    trackMouseLabel: false,
	    trackMouseLabelRouding: 1,
	    lineToZero: false,

	    autoPeakPicking: false,
	    autoPeakPickingNb: 4,
	    autoPeakPickingMinDistance: 10,
	    autoPeakPickingFormat: false,
	    autoPeakPickingAllowAllY: false,

	    selectableOnClick: true,

	    markersIndependant: false
	  };

	  /** 
	   * Serie line
	   * @example graph.newSerie( name, options, "line" );
	   * @see Graph#newSerie
	   * @extends Serie
	   */
	  class SerieLine extends _graph4.default {

	    constructor() {
	      super(...arguments);
	    }

	    /**
	     * Initializes the serie
	     * @memberof SerieLine
	     */
	    init(graph, name, options) {

	      var self = this;

	      this.selectionType = "unselected";
	      this.markerFamilies = {};

	      this.graph = graph;
	      this.name = name;

	      this.options = util.extend(true, {}, defaults, options || {}); // Creates options
	      util.mapEventEmission(this.options, this); // Register events

	      // Creates an empty style variable
	      this.styles = {};

	      // Unselected style
	      this.styles.unselected = {
	        lineColor: this.options.lineColor,
	        lineStyle: this.options.lineStyle,
	        lineWidth: this.options.lineWidth,
	        markers: this.options.markers
	      };

	      this.styles.selected = {
	        lineWidth: 3
	      };

	      this.extendStyles();
	      this.markersDom = new Map();

	      this.shown = true;

	      this.data = [];
	      this._isMinOrMax = {
	        x: {
	          min: false,
	          max: false
	        },
	        y: {
	          min: false,
	          max: false
	        }
	      };

	      // Optimize is no markerPoints => save loops
	      //      this.markerPoints = {};

	      this.groupLines = document.createElementNS(this.graph.ns, 'g');
	      this.domMarker = document.createElementNS(this.graph.ns, 'path');
	      this.domMarker.style.cursor = 'pointer';

	      this.groupMain = document.createElementNS(this.graph.ns, 'g');
	      this.additionalData = {};

	      this.marker = document.createElementNS(this.graph.ns, 'circle');
	      this.marker.setAttribute('fill', 'black');
	      this.marker.setAttribute('r', 3);
	      this.marker.setAttribute('display', 'none');

	      this.markerLabel = document.createElementNS(this.graph.ns, 'text');
	      this.markerLabelSquare = document.createElementNS(this.graph.ns, 'rect');
	      this.markerLabelSquare.setAttribute('fill', 'white');
	      this.domMarkerHover = {};
	      this.domMarkerSelect = {};
	      this.markerHovered = 0;
	      this.groupMarkerSelected = document.createElementNS(this.graph.ns, 'g');

	      this.markerPoints = {};

	      //this.scale = 1;
	      //this.shift = 0;
	      this.lines = [];

	      this.groupMain.appendChild(this.groupLines);

	      this.groupMain.appendChild(this.marker);

	      this.groupMain.appendChild(this.groupMarkerSelected);
	      this.groupMain.appendChild(this.markerLabelSquare);
	      this.groupMain.appendChild(this.markerLabel);

	      this.groupMarkers = document.createElementNS(this.graph.ns, 'g');
	      this.groupMain.appendChild(this.groupMarkers);

	      this.independantMarkers = [];

	      if (this.initExtended1) {
	        this.initExtended1();
	      }

	      if (this.options.autoPeakPicking) {

	        this.picks = this.picks || [];

	        for (var n = 0, m = this.options.autoPeakPickingNb; n < m; n++) {

	          var shape = this.graph.newShape({

	            type: 'label',
	            label: {
	              text: "",
	              position: {
	                x: 0
	              },
	              anchor: 'middle'

	            },

	            selectable: true,

	            shapeOptions: {
	              minPosY: 15
	            }

	          });

	          shape.draw();
	          shape.setSerie(self);
	          self.picks.push(shape);
	        }
	      }

	      this.groupLines.addEventListener('click', function (e) {

	        if (self.options.selectableOnClick) {

	          if (self.isSelected()) {

	            self.graph.unselectSerie(self);
	          } else {
	            self.graph.selectSerie(self);
	          }
	        }
	      });

	      if (this.options.markers) {
	        this.setMarkers(this.options.markers, "unselected");
	      }
	    }

	    /**
	       * Sets the options of the serie
	       * @see SerieLineDefaultOptions
	       * @param {Object} options - A object containing the options to set
	       * @return {SerieLine} The current serie
	       * @memberof SerieLine
	       
	    */
	    setOptions(options) {
	      this.options = util.extend(true, {}, SerieLine.prototype.defaults, options || {});
	      // Unselected style
	      this.styles.unselected = {
	        lineColor: this.options.lineColor,
	        lineStyle: this.options.lineStyle,
	        markers: this.options.markers
	      };

	      this.applyLineStyles();
	      return this;
	    }

	    calculateSlots() {

	      var self = this;
	      this.slotsData = {};
	      for (var i = 0, l = this.slots.length; i < l; i++) {
	        this.calculateSlot(this.slots[i], i);
	      }
	    }

	    slotCalculator(slot, slotNumber) {

	      return (0, _slotoptimizer2.default)({

	        min: this.minX,
	        max: this.maxX,
	        data: this.data,
	        slot: slot,
	        slotNumber: slotNumber,
	        flip: this.getFlip()

	      });
	    }

	    calculateSlot(slot, slotNumber) {
	      var self = this;
	      this.slotsData[slot] = this.slotCalculator(slot, slotNumber);
	      this.slotsData[slot].then(function (data) {

	        self.slotsData[slot] = data;
	        return data;
	      });
	    }

	    onMouseOverMarker(e, index) {

	      var toggledOn = this.toggleMarker(index, true, true);
	      if (this.options.onMouseOverMarker) {

	        this.options.onMouseOverMarker(index, this.infos ? this.infos[index[0]] || false : false, [this.data[index[1]][index[0] * 2], this.data[index[1]][index[0] * 2 + 1]]);
	      }
	    }

	    onMouseOutMarker(e, index) {
	      this.markersOffHover();
	      if (this.options.onMouseOutMarker) {
	        this.options.onMouseOutMarker(index, this.infos ? this.infos[index[0]] || false : false, [this.data[index[1]][index[0] * 2], this.data[index[1]][index[0] * 2 + 1]]);
	      }
	    }

	    /**
	     * Selects one of the markers of the serie
	     * @param {Number} index - The point index to select (starting at 0)
	     * @param {Boolean} [force = undefined] - Forces state of the marker. <code>true</code> forces selection, <code>false</code> forces deselection. <code>undefined</code> toggles the state of the marker
	     * @param {Boolean} [hover = false] - <code>true</code> to set the selection in mode "hover" (will disappear on mouse out of the marker). <code>false</code> to set the selection in mode "select" (will disappear when another marker is selected)
	     * @returns {Boolean} The new state of the marker
	     * @memberof SerieLine
	     */
	    toggleMarker(index, force, hover) {

	      var i = index[0],
	          k = index[1] || 0;

	      index = index.join();

	      var _on;
	      if (typeof force === 'undefined') {
	        _on = !hover ? !this.domMarkerSelect[index] : !this.domMarkerHover[index];
	      }
	      var el = this['domMarker' + (hover ? 'Hover' : 'Select')];

	      if (_on || force === true) {

	        if (!el[index]) {

	          var dom = document.createElementNS(this.graph.ns, 'path');

	          this.setMarkerStyleTo(dom, this.markerFamilies[this.selectionType][this.getMarkerCurrentFamily(i)]);
	          this['domMarker' + (hover ? 'Hover' : 'Select')][index] = dom;
	          this.groupMarkerSelected.appendChild(dom);
	        } else {
	          dom = el[index];
	        }

	        var x, y;

	        if (this.mode == 'x_equally_separated') {
	          x = this._xDataToUse[k].x + i * this._xDataToUse[k].dx;
	          y = this.data[k][i];
	        } else {
	          x = this.data[k][i * 2];
	          y = this.data[k][i * 2 + 1];
	        }

	        x = this.getX(x);
	        y = this.getY(y);

	        dom.setAttribute('d', "M " + x + " " + y + " " + this.getMarkerPath(this.markerFamilies[this.selectionType][this.getMarkerCurrentFamily(i)], 1));

	        if (hover) {
	          this.markerHovered++;
	        }
	      } else if (!_on || force === false) {

	        if (hover && this.domMarkerHover[index] && !this.domMarkerSelect[index] || this.domMarkerSelect[index]) {

	          if (!el[index]) {
	            return;
	          }

	          this.groupMarkerSelected.removeChild(el[index]);

	          delete el[index];

	          if (hover) this.markerHovered--;
	        }
	      }

	      return _on;
	    }

	    /**
	     * Toggles off markers that have the hover mode "on"
	     * @returns {SerieLine} The current serie
	     * @memberof SerieLine
	     */
	    markersOffHover() {

	      for (var i in this.domMarkerHover) {
	        this.toggleMarker(i.split(','), false, true);
	      }
	      return this;
	    }

	    /**
	     * Toggles off markers that have the select mode "on"
	     * @returns {SerieLine} The current serie
	     * @memberof SerieLine
	     */
	    markersOffSelect() {

	      for (var i in this.domMarkerSelect) {
	        this.toggleMarker(i.split(','), false, false);
	      }
	      return this;
	    }

	    onClickOnMarker(e, index) {

	      var toggledOn = this.toggleMarker(index);

	      if (toggledOn && this.options.onSelectMarker) {
	        this.options.onSelectMarker(index, this.infos ? this.infos[index[0]] || false : false);
	      }

	      if (!toggledOn && this.options.onUnselectMarker) {
	        this.options.onUnselectMarker(index, this.infos ? this.infos[index[0]] || false : false);
	      }

	      if (this.options.onToggleMarker) {
	        this.options.onToggleMarker(index, this.infos ? this.infos[index[0]] || false : false, toggledOn);
	      }
	    }

	    _getMarkerIndexFromEvent(e) {
	      var px = this.graph._getXY(e);

	      //  return this.searchIndexByPxXY( ( px.x ), ( px.y ) );
	      return this.searchIndexByPxXY(px.x - this.graph.getPaddingLeft(), px.y - this.graph.getPaddingTop());
	    }

	    onMouseWheel() {}

	    /**
	     * Cleans the DOM from the serie internal object (serie and markers). Mostly used internally when a new {@link Serie#setData} is called
	     * @returns {SerieLine} The current serie
	     * @memberof SerieLine
	     */
	    empty() {

	      for (var i = 0, l = this.lines.length; i < l; i++) {
	        this.groupLines.removeChild(this.lines[i]);
	      }
	      this.lines = [];

	      return this;
	    }

	    /**
	     * Applies a selection to the serie
	     * @param {String} [ selectionType = "selected" ] - The selection name
	     * @returns {SerieLine} The current serie
	     * @see SerieLine#unselect
	     * @memberof SerieLine
	     */
	    select(selectionType) {

	      selectionType = selectionType || "selected";

	      this.selected = selectionType !== "unselected";

	      if (this.areMarkersShown() || this.areMarkersShown(selectionType)) {
	        this.selectionType = selectionType;

	        this.draw(true); // Drawing is absolutely required here
	        this.applyLineStyles();
	      } else {
	        this.selectionType = selectionType;
	        this.applyLineStyles();
	      }

	      this.applyLineStyle(this.getSymbolForLegend());
	      return this;
	    }

	    /**
	     * Removes the selection to the serie. Effectively, calls {@link SerieLine#select}("unselected").
	     * @returns {SerieLine} The current serie
	     * @see SerieLine#select
	     * @memberof SerieLine
	     */
	    unselect() {

	      this.selected = false;
	      return this.select("unselected");
	    }

	    /**
	     * Degrades the data of the serie. This option is used for big data sets that have monotoneously increasing (or decreasing) x values.
	     * For example, a serie containing 1'000'000 points, displayed over 1'000px, will have 1'000 points per pixel. Often it does not make sense to display more than 2-3 points per pixel.
	     * <code>degrade( pxPerPoint )</code> allows a degradation of the serie, based on a a number of pixel per point. It computes the average of the data that would be displayed over each pixel range, as well as the minimum value and maximum value of the serie.
	     * It then creates a zone serie that will be show the minimum and maximum values over each pixel ranges, and the averaged data will be used in the current serie.
	     * @param {Object} options - A object containing the options to set
	     * @return {SerieLine} The newly created zone serie
	     * @example var zone = serie.degrade( 0.5, { fillColor: 'rgba(100, 100, 100, 0.2' } ); // Will display 2 points per pixels
	     * zone.setLineColor('red');
	     * @memberof SerieLine
	     */
	    degrade(pxPerP, options) {

	      var serie = this.graph.newSerie(this.name + "_degraded", options, _graph2.default.SERIE_ZONE);

	      this.degradationPx = pxPerP;

	      if (!serie) {
	        return;
	      }

	      serie.setData([]);

	      serie.setXAxis(this.getXAxis());
	      serie.setYAxis(this.getYAxis());

	      this.degradationSerie = serie;

	      return serie;
	    }

	    drawInit() {

	      var data, xData;

	      this.currentLineId = 0;
	      this.counter = 0;
	      this._drawn = true;
	      this.currentLine = "";

	      // Degradation
	      if (this.degradationPx) {

	        data = getDegradedData(this);
	        xData = data[1];
	        data = data[0];
	        this._dataToUse = data;
	        this._xDataToUse = xData;
	      } else {

	        this._dataToUse = this.data;
	        this._xDataToUse = this.xData;
	      }

	      this._optimizeMonotoneous = this.isXMonotoneous();

	      this.optimizeMonotoneousDirection = this.XMonotoneousDirection() && !this.getXAxis().isFlipped() || !this.XMonotoneousDirection() && this.getXAxis().isFlipped();

	      this._optimizeBreak;
	      this._optimizeBuffer;

	      // Slots
	      this._slotToUse = false;
	      if (this.options.useSlots && this.slots && this.slots.length > 0) {
	        if (this.isFlipped()) {
	          var slot = this.graph.getDrawingHeight() * (this.maxY - this.minY) / (this.getYAxis().getCurrentMax() - this.getYAxis().getCurrentMin());
	        } else {
	          var slot = this.graph.getDrawingWidth() * (this.maxX - this.minX) / (this.getXAxis().getCurrentMax() - this.getXAxis().getCurrentMin());
	        }

	        for (var y = 0, z = this.slots.length; y < z; y++) {
	          if (slot < this.slots[y]) {
	            this._slotToUse = this.slotsData[this.slots[y]];
	            this._slotId = y;
	            break;
	          }
	        }
	      }

	      this.detectedPeaks = [];
	      this.lastYPeakPicking = false;
	    }

	    removeLinesGroup() {
	      this._afterLinesGroup = this.groupLines.nextSibling;
	      this.groupMain.removeChild(this.groupLines);
	    }

	    insertLinesGroup() {

	      if (!this._afterLinesGroup) {
	        throw "Could not find group after lines to insertion.";
	      }

	      this.groupMain.insertBefore(this.groupLines, this._afterLinesGroup);
	      this._afterLinesGroup = false;
	    }

	    removeExtraLines() {

	      var i = this.currentLineId,
	          l = this.lines.length;

	      for (; i < l; i++) {
	        this.groupLines.removeChild(this.lines[i]);
	      }

	      this.lines.splice(this.currentLineId, l - this.currentLineId);
	      this.currentLineId = 0;
	    }

	    detectPeaks(x, y) {

	      if (!this.options.autoPeakPicking) {
	        return;
	      }

	      if (!this.options.lineToZero) {

	        if (!this.lastYPeakPicking) {

	          this.lastYPeakPicking = [y, x];
	        } else {

	          if (y >= this.lastYPeakPicking[0] && this.lookForMaxima || y <= this.lastYPeakPicking[0] && this.lookForMinima) {

	            this.lastYPeakPicking = [y, x];
	          } else if (y < this.lastYPeakPicking[0] && this.lookForMaxima || y > this.lastYPeakPicking[0] && this.lookForMinima) {

	            if (this.lookForMinima) {
	              this.lookForMinima = false;
	              this.lookForMaxima = true;
	            } else {

	              this.lookForMinima = true;
	              this.lookForMaxima = false;

	              this.detectedPeaks.push(this.lastYPeakPicking);
	              this.lastYPeakPicking = false;
	            }

	            this.lastYPeakPicking = [y, x];
	          }
	        }
	      } else {
	        this.detectedPeaks.push([y, x]);
	      }
	    }

	    /**
	     * Draws the serie
	     * @memberof SerieLine
	     */
	    draw(force) {
	      // Serie redrawing

	      if (force || this.hasDataChanged()) {
	        this.drawInit();

	        var data = this._dataToUse,
	            xData = this._xDataToUse,
	            slotToUse = this._slotToUse;

	        this.removeLinesGroup();
	        this.eraseMarkers();

	        this.lookForMaxima = true;
	        this.lookForMinima = false;

	        if (this.error) {
	          this.errorDrawInit();
	        }

	        if (!this._draw_slot()) {

	          if (this.mode == 'x_equally_separated') {

	            this._draw_equally_separated();
	          } else {

	            this._draw_standard();
	          }
	        }

	        if (this.error) {
	          this.errorDraw();
	        }

	        this.makePeakPicking();
	        this.removeExtraLines();
	        this.insertMarkers();
	        this.insertLinesGroup();
	      }

	      // Unhovers everything
	      for (var i in this.domMarkerHover) {
	        this.toggleMarker(i.split(','), false, true);
	      }

	      // Deselects everything
	      for (var i in this.domMarkerSelect) {
	        this.toggleMarker(i.split(','), false, false);
	      }

	      this.applyLineStyle(this.getSymbolForLegend());

	      if (this.hasStyleChanged(this.selectionType)) {
	        this.updateStyle();
	      }

	      this.dataHasChanged(false);
	    }

	    _draw_standard() {

	      var self = this,
	          data = this._dataToUse,
	          toBreak,
	          i = 0,
	          l = data.length,
	          j,
	          k,
	          m,
	          x,
	          y,
	          k,
	          o,
	          lastX = false,
	          lastY = false,
	          xpx,
	          ypx,
	          xpx2,
	          ypx2,
	          xAxis = this.getXAxis(),
	          yAxis = this.getYAxis(),
	          xMin = xAxis.getCurrentMin(),
	          yMin = yAxis.getCurrentMin(),
	          xMax = xAxis.getCurrentMax(),
	          yMax = yAxis.getCurrentMax();

	      // Y crossing
	      var yLeftCrossingRatio, yLeftCrossing, yRightCrossingRatio, yRightCrossing, xTopCrossingRatio, xTopCrossing, xBottomCrossingRatio, xBottomCrossing;

	      var incrXFlip = 0;
	      var incrYFlip = 1;

	      var pointOutside = false;
	      var lastPointOutside = false;
	      var pointOnAxis;

	      if (this.isFlipped()) {
	        incrXFlip = 1;
	        incrYFlip = 0;
	      }

	      for (i = 0; i < l; i++) {

	        toBreak = false;
	        this.counter1 = i;

	        this.currentLine = "";
	        j = 0;
	        k = 0;
	        m = data[i].length;

	        for (j = 0; j < m; j += 2) {

	          x = data[i][j + incrXFlip];
	          y = data[i][j + incrYFlip];

	          if (x < xMin && lastX < xMin || x > xMax && lastX > xMax || (y < yMin && lastY < yMin || y > yMax && lastY > yMax) && !this.options.lineToZero) {
	            lastX = x;
	            lastY = y;
	            lastPointOutside = true;
	            continue;
	          }

	          this.counter2 = j / 2;

	          if (this.markersShown()) {
	            this.getMarkerCurrentFamily(this.counter2);
	          }

	          xpx2 = this.getX(x);
	          ypx2 = this.getY(y);

	          if (xpx2 == xpx && ypx2 == ypx) {
	            continue;
	          }

	          pointOutside = x < xMin || y < yMin || x > xMax || y > yMax;

	          if (this.options.lineToZero) {
	            pointOutside = x < xMin || x > xMax;

	            if (pointOutside) {
	              continue;
	            }
	          } else {

	            if (pointOutside || lastPointOutside) {

	              if ((lastX === false || lastY === false) && !lastPointOutside) {

	                xpx = xpx2;
	                ypx = ypx2;
	                lastX = x;
	                lastY = y;
	              } else {

	                pointOnAxis = [];
	                // Y crossing
	                yLeftCrossingRatio = (x - xMin) / (x - lastX);
	                yLeftCrossing = y - yLeftCrossingRatio * (y - lastY);
	                yRightCrossingRatio = (x - xMax) / (x - lastX);
	                yRightCrossing = y - yRightCrossingRatio * (y - lastY);

	                // X crossing
	                xTopCrossingRatio = (y - yMin) / (y - lastY);
	                xTopCrossing = x - xTopCrossingRatio * (x - lastX);
	                xBottomCrossingRatio = (y - yMax) / (y - lastY);
	                xBottomCrossing = x - xBottomCrossingRatio * (x - lastX);

	                if (yLeftCrossingRatio < 1 && yLeftCrossingRatio > 0 && yLeftCrossing !== false && yLeftCrossing < yMax && yLeftCrossing > yMin) {
	                  pointOnAxis.push([xMin, yLeftCrossing]);
	                }

	                if (yRightCrossingRatio < 1 && yRightCrossingRatio > 0 && yRightCrossing !== false && yRightCrossing < yMax && yRightCrossing > yMin) {
	                  pointOnAxis.push([xMax, yRightCrossing]);
	                }

	                if (xTopCrossingRatio < 1 && xTopCrossingRatio > 0 && xTopCrossing !== false && xTopCrossing < xMax && xTopCrossing > xMin) {
	                  pointOnAxis.push([xTopCrossing, yMin]);
	                }

	                if (xBottomCrossingRatio < 1 && xBottomCrossingRatio > 0 && xBottomCrossing !== false && xBottomCrossing < xMax && xBottomCrossing > xMin) {
	                  pointOnAxis.push([xBottomCrossing, yMax]);
	                }

	                if (pointOnAxis.length > 0) {

	                  if (!pointOutside) {
	                    // We were outside and now go inside

	                    if (pointOnAxis.length > 1) {
	                      console.error("Programmation error. Please e-mail me.");
	                      console.log(pointOnAxis, xBottomCrossing, xTopCrossing, yRightCrossing, yLeftCrossing, y, yMin, yMax, lastY);
	                    }

	                    this._createLine();
	                    this._addPoint(this.getX(pointOnAxis[0][0]), this.getY(pointOnAxis[0][1]), pointOnAxis[0][0], pointOnAxis[0][1], false, false, false);
	                    this._addPoint(xpx2, ypx2, lastX, lastY, false, false, true);
	                  } else if (!lastPointOutside) {
	                    // We were inside and now go outside

	                    if (pointOnAxis.length > 1) {
	                      console.error("Programmation error. Please e-mail me.");
	                      console.log(pointOnAxis, xBottomCrossing, xTopCrossing, yRightCrossing, yLeftCrossing, y, yMin, yMax, lastY);
	                    }

	                    this._addPoint(this.getX(pointOnAxis[0][0]), this.getY(pointOnAxis[0][1]), pointOnAxis[0][0], pointOnAxis[0][1], false, false, false);
	                  } else {

	                    // No crossing: do nothing
	                    if (pointOnAxis.length == 2) {
	                      this._createLine();

	                      this._addPoint(this.getX(pointOnAxis[0][0]), this.getY(pointOnAxis[0][1]), pointOnAxis[0][0], pointOnAxis[0][1], false, false, false);
	                      this._addPoint(this.getX(pointOnAxis[1][0]), this.getY(pointOnAxis[1][1]), pointOnAxis[0][0], pointOnAxis[0][1], false, false, false);
	                    }
	                  }
	                } else if (!pointOutside) {
	                  this._addPoint(xpx2, ypx2, lastX, lastY, j, false, false);
	                } // else {
	                // Norman:
	                // This else case is not the sign of a bug. If yLeftCrossing == 0 or 1 for instance, pointOutside or lastPointOutside will be true
	                // However, there's no need to draw anything because the point is on the axis and will already be covered.
	                // 28 Aug 2015

	                /*
	                  if ( lastPointOutside !== pointOutside ) {
	                    console.error( "Programmation error. A crossing should have been found" );
	                    console.log( yLeftCrossing, yLeftCrossingRatio, yMax, yMin );
	                    console.log( yRightCrossing, yRightCrossingRatio, yMax, yMin );
	                    console.log( xTopCrossing, xTopCrossingRatio, xMax, xMin );
	                    console.log( xBottomCrossing, xBottomCrossingRatio, xMax, xMin );
	                    console.log( pointOutside, lastPointOutside )
	                   }
	                  */
	                // }
	              }

	              xpx = xpx2;
	              ypx = ypx2;
	              lastX = x;
	              lastY = y;

	              lastPointOutside = pointOutside;

	              continue;
	            }
	          }

	          if (isNaN(xpx2) || isNaN(ypx2)) {
	            if (this.counter > 0) {

	              this._createLine();
	            }
	            continue;
	          }

	          // OPTIMIZATION START
	          if (!this._optimize_before(xpx2, ypx2)) {
	            continue;
	          }
	          // OPTIMIZATION END

	          this._addPoint(xpx2, ypx2, x, y, j, false, true);

	          this.detectPeaks(x, y);

	          // OPTIMIZATION START
	          if (!this._optimize_after(xpx2, ypx2)) {
	            toBreak = true;
	            break;
	          }
	          // OPTIMIZATION END

	          xpx = xpx2;
	          ypx = ypx2;

	          lastX = x;
	          lastY = y;
	        }

	        this._createLine();

	        if (toBreak) {
	          break;
	        }
	      }

	      if (this._tracker) {

	        if (this._trackerDom) {
	          this._trackerDom.remove();
	        }

	        var cloned = this.groupLines.cloneNode(true);
	        this.groupMain.appendChild(cloned);

	        for (var i = 0, l = cloned.children.length; i < l; i++) {

	          cloned.children[i].setAttribute('stroke', 'transparent');
	          cloned.children[i].setAttribute('stroke-width', '25px');
	          cloned.children[i].setAttribute('pointer-events', 'stroke');
	        }

	        self._trackerDom = cloned;

	        self.groupMain.addEventListener("mousemove", function (e) {
	          var coords = self.graph._getXY(e),
	              ret = self.handleMouseMove(false, false);
	          self._trackingCallback(self, ret, coords.x, coords.y);
	        });

	        self.groupMain.addEventListener("mouseleave", function (e) {
	          self._trackingOutCallback(self);
	        });
	      }
	      return this;
	    }

	    _draw_slot() {

	      var self = this;
	      if (this._slotToUse) {

	        if (this._slotToUse.done) {

	          this._slotToUse.done(function (data) {
	            self.drawSlot(data, self._slotId);
	          });
	        } else {

	          this.drawSlot(this._slotToUse, self._slotId);
	        }
	        return true;
	      }

	      return false;
	    }

	    _draw_equally_separated() {

	      var i = 0,
	          data = this._dataToUse,
	          xData = this._xDataToUse,
	          l = data.length,
	          j,
	          k,
	          m,
	          x,
	          y,
	          xpx,
	          ypx,
	          toBreak,
	          currentLine;

	      for (; i < l; i++) {

	        currentLine = "M ";
	        j = 0;
	        k = 0;
	        m = data[i].length;

	        this.counter1 = i;

	        for (; j < m; j += 1) {

	          this.counter2 = j;

	          if (this.markersShown()) {

	            this.getMarkerCurrentFamily(k);
	          }

	          if (!this.isFlipped()) {

	            x = xData[i].x + j * xData[i].dx;
	            y = data[i][j];

	            xpx = this.getX(x);
	            ypx = this.getY(y);
	          } else {

	            y = xData[i].x + j * xData[i].dx;
	            x = data[i][j];

	            ypx = this.getX(y);
	            xpx = this.getY(x);
	          }

	          // OPTIMIZATION START
	          if (!this._optimize_before(xpx, ypx)) {
	            continue;
	          }
	          // OPTIMIZATION END

	          this._addPoint(xpx, ypx, x, y, j, false, false);

	          // OPTIMIZATION START
	          if (!this._optimize_after(xpx, ypx)) {
	            toBreak = true;
	            break;
	          }
	          // OPTIMIZATION END
	        }

	        this._createLine();

	        if (toBreak) {
	          break;
	        }
	      }
	    }

	    _optimize_before(xpx, ypx) {

	      if (!this._optimizeMonotoneous) {
	        return true;
	      }

	      if (this.optimizeMonotoneousDirection && xpx < this.getXAxis().getMathMinPx() || !this.optimizeMonotoneousDirection && xpx > this.getXAxis().getMathMaxPx()) {

	        //      if ( xpx < this._optimizeMinPxX ) {

	        this._optimizeBuffer = [xpx, ypx];
	        return false;
	      }

	      if (this._optimizeBuffer) {

	        this._addPoint(this._optimizeBuffer[0], this._optimizeBuffer[1], false, false, false, false, false);
	        this._optimizeBuffer = false;
	      }

	      return true;
	    }

	    _optimize_after(xpx, ypx) {

	      if (!this._optimizeMonotoneous) {
	        return true;
	      }

	      if (this.optimizeMonotoneousDirection && xpx > this.getXAxis().getMathMaxPx() || !this.optimizeMonotoneousDirection && xpx < this.getXAxis().getMathMinPx()) {

	        return false;
	      }

	      return true;
	    }

	    /**
	     * Hides the automatic peak picking (see the autoPeakPicking option)
	     * @memberof SerieLine
	     */
	    hidePeakPicking(lock) {

	      if (!this._hidePeakPickingLocked) {
	        this._hidePeakPickingLocked = lock;
	      }

	      hidePeakPicking(this);
	    }

	    /**
	     * Shows the automatic peak picking (see the autoPeakPicking option)
	     * @memberof SerieLine
	     */
	    showPeakPicking(unlock) {

	      if (this._hidePeakPickingLocked && !unlock) {
	        return;
	      }

	      showPeakPicking(this);
	    }

	    killPeakPicking() {

	      if (this.picks) {
	        for (var i = 0, l = this.picks.length; i < l; i++) {
	          this.picks[i].kill();
	        }
	      }
	    }

	    kill() {
	      super.kill();
	      this.killPeakPicking();
	    }

	    /**
	     * @param {Number} k - Index of the point for which we should get the family
	     * @memberof SerieLine
	     */
	    getMarkerCurrentFamily(k) {

	      if (!this.markerPoints || !this.markerPoints[this.selectionType]) {
	        return;
	      }

	      var family;

	      for (var z = 0; z < this.markerPoints[this.selectionType].length; z++) {
	        if (this.markerPoints[this.selectionType][z][0] <= k) {
	          // This one is a possibility !
	          if (this.markerPoints[this.selectionType][z][1] >= k) {
	            // Verify that it's in the boundary
	            this.markerCurrentFamily = this.markerPoints[this.selectionType][z][2];
	            family = this.markerFamilies[this.selectionType][this.markerCurrentFamily];
	          }
	        } else {
	          break;
	        }
	      }

	      if (!family) {
	        return false;
	      }
	      this.getMarkerDom(family);
	      return this.markerCurrentFamily;
	    }

	    drawSlot(slotToUse, y) {

	      var k = 0;
	      var i = 0,
	          xpx,
	          ypx,
	          max;
	      var j;

	      if (this.isFlipped()) {

	        var dataPerSlot = this.slots[y] / (this.maxY - this.minY);

	        var slotInit = Math.floor((this.getYAxis().getCurrentMin() - this.minY) * dataPerSlot);
	        var slotFinal = Math.ceil((this.getYAxis().getCurrentMax() - this.minY) * dataPerSlot);
	      } else {

	        var dataPerSlot = this.slots[y] / (this.maxX - this.minX);

	        var slotInit = Math.floor((this.getXAxis().getCurrentMin() - this.minX) * dataPerSlot);
	        var slotFinal = Math.ceil((this.getXAxis().getCurrentMax() - this.minX) * dataPerSlot);
	      }

	      for (j = slotInit; j <= slotFinal; j++) {

	        if (!slotToUse[j]) {
	          continue;
	        }

	        if (this.isFlipped()) {

	          ypx = Math.floor(this.getY(slotToUse[j].x));
	          max = this.getX(slotToUse[j].max);

	          /*if ( this.options.autoPeakPicking ) {
	              allY.push( [ slotToUse[ j ].max, slotToUse[ j ].x ] );
	            }
	          * @memberof SerieLine
	          */
	          this._addPoint(this.getX(slotToUse[j].start), ypx, false, false, false, false, false);
	          this._addPoint(max, ypx, false, false, false, true, false);
	          this._addPoint(this.getX(slotToUse[j].min), ypx, false, false, false, false, false);
	          this._addPoint(this.getX(slotToUse[j].stop), ypx, false, false, false, true, false);

	          //    k++;
	        } else {

	          xpx = Math.floor(this.getX(slotToUse[j].x));
	          max = this.getY(slotToUse[j].max);

	          if (this.options.autoPeakPicking) {
	            allY.push([slotToUse[j].max, slotToUse[j].x]);
	          }

	          this._addPoint(xpx, this.getY(slotToUse[j].start), false, false, false, false, false);
	          this._addPoint(xpx, max, false, false, false, true, false);
	          this._addPoint(xpx, this.getY(slotToUse[j].min), false, false, false, false, false);
	          this._addPoint(xpx, this.getY(slotToUse[j].stop), false, false, false, true, false);

	          //this.counter ++;
	        }
	      }

	      this._createLine();
	      i++;
	    }

	    setMarkerStyleTo(dom, family) {

	      if (!dom || !family) {
	        console.trace();
	        throw "Cannot set marker style. DOM does not exist.";
	      }

	      dom.setAttribute('fill', family.fillColor || 'transparent');
	      dom.setAttribute('stroke', family.strokeColor || this.getLineColor());
	      dom.setAttribute('stroke-width', family.strokeWidth || 1);
	    }

	    /**
	     * Hides the tracking marker (see the trackMouse option)
	     * @memberof SerieLine
	     */
	    hideTrackingMarker() {
	      this.marker.setAttribute('display', 'none');
	      this.markerLabel.setAttribute('display', 'none');
	      this.markerLabelSquare.setAttribute('display', 'none');
	    }

	    _addPoint(xpx, ypx, x, y, j, move, allowMarker) {
	      var pos;

	      /*if( ! this.currentLineId ) {
	          throw "No current line"
	        }* @memberof SerieLine
	      */

	      if (isNaN(xpx) || isNaN(ypx)) {
	        return;
	      }

	      if (this.counter == 0) {
	        this.currentLine = 'M ';
	      } else {

	        if (this.options.lineToZero || move) this.currentLine += 'M ';else this.currentLine += "L ";
	      }

	      this.currentLine += xpx;
	      this.currentLine += " ";
	      this.currentLine += ypx;
	      this.currentLine += " ";

	      if (this.options.lineToZero && (pos = this.getYAxis().getPos(0)) !== undefined) {

	        this.currentLine += "L ";
	        this.currentLine += xpx;
	        this.currentLine += " ";
	        this.currentLine += pos;
	        this.currentLine += " ";
	      }

	      if (this.error) {
	        this.errorAddPoint(j, x, y, xpx, ypx);
	      }

	      if (!this.markerPoints) {
	        this.counter++;

	        return;
	      }

	      let family;
	      if (this.markersShown() && allowMarker !== false && (family = this.markerFamilies[this.selectionType || "unselected"])) {
	        drawMarkerXY(this, family[this.markerCurrentFamily], xpx, ypx, this.markersDom.get(family[this.markerCurrentFamily]));
	      }

	      this.counter++;
	    }

	    // Returns the DOM
	    _createLine() {

	      var i = this.currentLineId++,
	          line;

	      // Creates a line if needed
	      if (this.lines[i]) {
	        line = this.lines[i];
	      } else {

	        line = document.createElementNS(this.graph.ns, 'path');
	        this.applyLineStyle(line);
	        this.groupLines.appendChild(line);
	        this.lines[i] = line;
	      }

	      if (this.counter == 0) {
	        line.setAttribute('d', '');
	      } else {
	        line.setAttribute('d', this.currentLine);
	      }

	      this.currentLine = "M ";
	      this.counter = 0;

	      return line;
	    }

	    /**
	     * Reapply the current style to the serie lines elements. Mostly used internally
	     * @memberof SerieLine
	     */
	    applyLineStyles() {

	      for (var i = 0; i < this.lines.length; i++) {
	        this.applyLineStyle(this.lines[i]);
	      }
	    }

	    /**
	     * Applies the current style to a line element. Mostly used internally
	     * @memberof SerieLine
	     */
	    applyLineStyle(line) {

	      line.setAttribute('stroke', this.getLineColor());
	      line.setAttribute('stroke-width', this.getLineWidth());
	      if (this.getLineDashArray()) {
	        line.setAttribute('stroke-dasharray', this.getLineDashArray());
	      } else {
	        line.removeAttribute('stroke-dasharray');
	      }
	      line.setAttribute('fill', 'none');
	      //	line.setAttribute('shape-rendering', 'optimizeSpeed');
	    }

	    /**
	     * Updates the current style (lines + legend) of the serie. Use this method if you have explicitely changed the options of the serie
	     * @example var opts = { lineColor: 'red' };
	     * var s = graph.newSerie( "name", opts ).setData( someData );
	     * opts.lineColor = 'green';
	     * s.updateStyle(); // Sets the lineColor to green
	     * s.draw(); // Would also do the same thing, but recalculates the whole serie display (including (x,y) point pairs)
	     * @memberof SerieLine
	     */
	    updateStyle() {
	      this.applyLineStyles();
	      this.setLegendSymbolStyle();

	      this.styleHasChanged(false);
	    }

	    // Revised August 2014. Ok
	    getMarkerPath(family, add) {

	      var z = family.zoom || 1,
	          add = add || 0,
	          el = [];

	      switch (family.type) {

	        case 2:
	          el = ['m', -2, -2, 'l', 4, 4, 'm', -4, 0, 'l', 4, -4];
	          break;

	        case 3:
	          el = ['m', -2, 0, 'l', 4, 0, 'm', -2, -2, 'l', 0, 4];
	          break;

	        case 4:
	          el = ['m', -1, -1, 'l', 2, 0, 'l', -1, 2, 'z'];
	          break;

	        default:
	        case 1:
	          el = ['m', -2, -2, 'l', 4, 0, 'l', 0, 4, 'l', -4, 0, 'z'];
	          break;

	      }

	      if ((z == 1 || !z) && !add) {
	        return el.join(" ");
	      }

	      var num = "number";

	      if (!el) {
	        return;
	      }

	      for (var i = 0, l = el.length; i < l; i++) {

	        if (typeof el[i] == num) {

	          el[i] *= z + add;
	        }
	      }

	      return el.join(" ");
	    }

	    // Revised August 2014. Ok
	    getMarkerDom(family) {

	      var self = this;

	      if (!this.markersDom.has(family)) {

	        var dom = document.createElementNS(this.graph.ns, 'path');
	        this.setMarkerStyleTo(dom, family);
	        this.markersDom.set(family, {
	          dom: dom,
	          path: ""
	        });

	        dom.addEventListener('mouseover', function (e) {
	          var closest = self._getMarkerIndexFromEvent(e);
	          self.onMouseOverMarker(e, closest);
	        });

	        dom.addEventListener('mouseout', function (e) {
	          var closest = self._getMarkerIndexFromEvent(e);
	          self.onMouseOutMarker(e, closest);
	        });

	        dom.addEventListener('click', function (e) {
	          var closest = self._getMarkerIndexFromEvent(e);
	          self.onClickOnMarker(e, closest);
	        });
	      }

	      return family.dom;
	    }

	    // In case markers are not grouped in families but independant
	    getMarkerDomIndependant(index1, index2, family) {

	      var self = this;
	      var index = index1 + "," + index2;

	      if (!this.independantMarkers[index]) {

	        var dom = document.createElementNS(this.graph.ns, 'path');
	        this.setMarkerStyleTo(dom, family);

	        dom.addEventListener('mouseover', function (e) {

	          self.onMouseOverMarker(e, [index2, index1]);
	        });

	        dom.addEventListener('mouseout', function (e) {

	          self.onMouseOutMarker(e, [index2, index1]);
	        });

	        dom.addEventListener('click', function (e) {
	          self.onClickOnMarker(e, [index2, index1]);
	        });

	        this.independantMarkers[index] = dom;
	      }

	      this.groupMarkers.appendChild(this.independantMarkers[index]);

	      return this.independantMarkers[index];
	    }

	    /**
	     * Searches the closest point pair (x,y) to the a pair of pixel position
	     * @param {Number} x - The x position in pixels (from the left)
	     * @param {Number} y - The y position in pixels (from the left)
	     * @returns {Number} Index in the data array of the closest (x,y) pair to the pixel position passed in parameters
	     * @memberof SerieLine
	     */
	    searchIndexByPxXY(x, y) {

	      var oldDist = false,
	          xyindex = false,
	          dist;

	      var xData = this._xDataToUse,
	          p_x,
	          p_y;

	      if (this.mode == "x_equally_separated") {

	        for (var i = 0, l = this.data.length; i < l; i++) {
	          for (var k = 0, m = this.data[i].length; k < m; k += 1) {

	            p_x = xData[i].x + k * xData[i].dx;
	            p_y = this.data[i][k];
	            dist = Math.pow(this.getX(p_x) - x, 2) + Math.pow(this.getY(p_y) - y, 2);
	            //console.log(x, y, dist, this.data[i][k], this.data[i][k + 1]);

	            if (!oldDist || dist < oldDist) {
	              oldDist = dist;
	              xyindex = [k, i];
	            }
	          }
	        }
	      } else {

	        for (var i = 0, l = this.data.length; i < l; i++) {
	          for (var k = 0, m = this.data[i].length; k < m; k += 2) {

	            p_x = this.data[i][k];
	            p_y = this.data[i][k + 1];
	            dist = Math.pow(this.getX(p_x) - x, 2) + Math.pow(this.getY(p_y) - y, 2);
	            if (!oldDist || dist < oldDist) {
	              oldDist = dist;
	              xyindex = [k / 2, i];
	            }
	          }
	        }
	      }

	      return xyindex;
	    }

	    /**
	     * Performs a binary search to find the closest point index to an x value. For the binary search to work, it is important that the x values are monotoneous.
	     * @param {Number} valX - The x value to search for
	     * @returns {Object} Index in the data array of the closest (x,y) pair to the pixel position passed in parameters
	     * @memberof SerieLine
	     */
	    searchClosestValue(valX) {

	      var xMinIndex;

	      for (var i = 0; i < this.data.length; i++) {

	        if (valX <= this.data[i][this.data[i].length - 2] && valX >= this.data[i][0]) {
	          xMinIndex = this._searchBinary(valX, this.data[i], false);
	        } else if (valX >= this.data[i][this.data[i].length - 2] && valX <= this.data[i][0]) {
	          xMinIndex = this._searchBinary(valX, this.data[i], true);
	        } else {
	          continue;
	        }

	        return {
	          dataIndex: i,
	          xMin: this.data[i][xMinIndex],
	          xMax: this.data[i][xMinIndex + 2],
	          yMin: this.data[i][xMinIndex + 1],
	          yMax: this.data[i][xMinIndex + 3],
	          xBeforeIndex: xMinIndex / 2,
	          xAfterIndex: xMinIndex / 2 + 1,
	          xBeforeIndexArr: xMinIndex,
	          xClosest: (Math.abs(this.data[i][xMinIndex + 2] - valX) < Math.abs(this.data[i][xMinIndex] - valX) ? xMinIndex + 2 : xMinIndex) / 2
	        };
	      }
	    }

	    handleMouseMove(xValue, doMarker) {

	      var valX = xValue || this.getXAxis().getMouseVal(),
	          xMinIndex,
	          xMin,
	          yMin,
	          xMax,
	          yMax;

	      var value = this.searchClosestValue(valX);

	      if (!value) return;

	      var ratio = (valX - value.xMin) / (value.xMax - value.xMin);
	      var intY = (1 - ratio) * value.yMin + ratio * value.yMax;

	      if (doMarker && this.options.trackMouse) {

	        if (value.xMin == undefined) {

	          return false;
	        } else {

	          var x = this.getX(this.getFlip() ? intY : valX);
	          var y = this.getY(this.getFlip() ? valX : intY);

	          this.marker.setAttribute('display', 'block');
	          this.marker.setAttribute('cx', x);
	          this.marker.setAttribute('cy', y);

	          this.markerLabel.setAttribute('display', 'block');
	          this.markerLabelSquare.setAttribute('display', 'block');
	          switch (this.options.trackMouseLabel) {
	            case false:
	              break;

	            default:
	              this.markerLabel.textContent = this.options.trackMouseLabel.replace('<x>', valX.toFixed(this.options.trackMouseLabelRouding)).replace('<y>', intY.toFixed(this.options.trackMouseLabelRouding));
	              break;
	          }

	          this.markerLabel.setAttribute('x', x + 5);
	          this.markerLabel.setAttribute('y', y - 5);

	          this.markerLabelSquare.setAttribute('x', x + 5);
	          this.markerLabelSquare.setAttribute('y', y - 5 - this.graph.options.fontSize);
	          this.markerLabelSquare.setAttribute('width', this.markerLabel.getComputedTextLength() + 2);
	          this.markerLabelSquare.setAttribute('height', this.graph.options.fontSize + 2);
	        }
	      }

	      return {
	        xBefore: value.xMin,
	        xAfter: value.xMax,
	        yBefore: value.yMin,
	        yAfter: value.yMax,
	        trueX: valX,
	        interpolatedY: intY,
	        xBeforeIndex: value.xBeforeIndex,
	        xIndexClosest: value.xClosest
	      };
	    }

	    _searchBinary(target, haystack, reverse) {
	      var seedA = 0,
	          length = haystack.length,
	          seedB = length - 2;

	      if (haystack[seedA] == target) return seedA;

	      if (haystack[seedB] == target) return seedB;

	      var seedInt;
	      var i = 0;

	      while (true) {
	        i++;
	        if (i > 100) {
	          throw "Error loop";
	        }

	        seedInt = (seedA + seedB) / 2;
	        seedInt -= seedInt % 2; // Always looks for an x.

	        if (seedInt == seedA || haystack[seedInt] == target) return seedInt;

	        //		console.log(seedA, seedB, seedInt, haystack[seedInt]);
	        if (haystack[seedInt] <= target) {
	          if (reverse) seedB = seedInt;else seedA = seedInt;
	        } else if (haystack[seedInt] > target) {
	          if (reverse) seedA = seedInt;else seedB = seedInt;
	        }
	      }
	    }

	    /**
	     * Gets the maximum value of the y values between two x values. The x values must be monotoneously increasing
	     * @param {Number} startX - The start of the x values
	     * @param {Number} endX - The end of the x values
	     * @returns {Number} Maximal y value in between startX and endX
	     * @memberof SerieLine
	     */
	    getMax(start, end) {

	      var start2 = Math.min(start, end),
	          end2 = Math.max(start, end),
	          v1 = this.searchClosestValue(start2),
	          v2 = this.searchClosestValue(end2),
	          i,
	          j,
	          max = -Infinity,
	          initJ,
	          maxJ;

	      //      console.log( start2, end2, v1, v2 );

	      if (!v1) {
	        start2 = this.minX;
	        v1 = this.searchClosestValue(start2);
	      }

	      if (!v2) {
	        end2 = this.maxX;
	        v2 = this.searchClosestValue(end2);
	      }

	      if (!v1 || !v2) {
	        return -Infinity;
	      }

	      for (i = v1.dataIndex; i <= v2.dataIndex; i++) {
	        initJ = i == v1.dataIndex ? v1.xBeforeIndexArr : 0;
	        maxJ = i == v2.dataIndex ? v2.xBeforeIndexArr : this.data[i].length;

	        for (j = initJ; j <= maxJ; j += 2) {
	          max = Math.max(max, this.data[i][j + 1]);
	        }
	      }

	      return max;
	    }

	    /**
	     * Gets the minimum value of the y values between two x values. The x values must be monotoneously increasing
	     * @param {Number} startX - The start of the x values
	     * @param {Number} endX - The end of the x values
	     * @returns {Number} Maximal y value in between startX and endX
	     * @memberof SerieLine
	     */
	    getMin(start, end) {

	      var start2 = Math.min(start, end),
	          end2 = Math.max(start, end),
	          v1 = this.searchClosestValue(start2),
	          v2 = this.searchClosestValue(end2),
	          i,
	          j,
	          min = Infinity,
	          initJ,
	          maxJ;

	      if (!v1) {
	        start2 = this.minX;
	        v1 = this.searchClosestValue(start2);
	      }

	      if (!v2) {
	        end2 = this.maxX;
	        v2 = this.searchClosestValue(end2);
	      }

	      if (!v1 || !v2) {
	        return Infinity;
	      }

	      for (i = v1.dataIndex; i <= v2.dataIndex; i++) {
	        initJ = i == v1.dataIndex ? v1.xBeforeIndexArr : 0;
	        maxJ = i == v2.dataIndex ? v2.xBeforeIndexArr : this.data[i].length;

	        for (j = initJ; j <= maxJ; j += 2) {
	          min = Math.min(min, this.data[i][j + 1]);
	        }
	      }

	      return min;
	    }

	    /* LINE STYLE * @memberof SerieLine
	     */

	    setStyle(style, selectionType = "unselected") {
	      //console.log( style, selectionType );
	      this.styles[selectionType] = style;
	      this.styleHasChanged(selectionType);
	    }

	    setLineStyle(number, selectionType = "unselected", applyToSelected) {

	      selectionType = selectionType;
	      this.styles[selectionType] = this.styles[selectionType] || {};
	      this.styles[selectionType].lineStyle = number;

	      if (applyToSelected) {
	        this.setLineStyle(number, "selected");
	      }

	      this.styleHasChanged(selectionType);

	      return this;
	    }

	    getLineStyle(selectionType) {
	      return this.getStyle(selectionType).lineStyle;
	    }

	    getLineDashArray(selectionType = this.selectionType || "unselected") {

	      switch (this.getStyle(selectionType).lineStyle) {

	        case 2:
	          return "1, 1";
	          break;
	        case 3:
	          return "2, 2";
	          break;
	        case 3:
	          return "3, 3";
	          break;
	        case 4:
	          return "4, 4";
	          break;
	        case 5:
	          return "5, 5";
	          break;

	        case 6:
	          return "5 2";
	          break;
	        case 7:
	          return "2 5";
	          break;

	        case 8:
	          return "4 2 4 4";
	          break;
	        case 9:
	          return "1,3,1";
	          break;
	        case 10:
	          return "9 2";
	          break;
	        case 11:
	          return "2 9";
	          break;

	        case false:
	        case 1:
	          return false;
	          break;

	        default:
	          return this.styles[selectionType].lineStyle;
	          break;
	      }

	      this.styleHasChanged(selectionType);
	    }

	    getStyle(selectionType = this.selectionType || "unselected") {
	      return this.styles[selectionType];
	    }

	    extendStyles() {
	      for (var i in this.styles) {

	        var s = this.styles[i];
	        if (s) {
	          this.styles[i] = util.extend(true, {}, this.styles.unselected, s);
	        }
	      }
	    }

	    extendStyle(styleTarget, styleOrigin) {
	      var s = this.styles[styleTarget];

	      this.styles[styleTarget] = util.extend(true, {}, this.styles[styleOrigin || "unselected"], s || {});

	      this.styles[styleTarget].markers.map(function (marker) {
	        if (marker.dom) {
	          marker.dom = "";
	        }
	      });

	      this._recalculateMarkerPoints(styleTarget, this.styles[styleTarget].markers);
	      this.styleHasChanged(styleTarget);
	    }

	    /*  * @memberof SerieLine
	     */

	    setLineWidth(width, selectionType, applyToSelected) {

	      selectionType = selectionType || "unselected";
	      this.styles[selectionType] = this.styles[selectionType] || {};
	      this.styles[selectionType].lineWidth = width;

	      if (applyToSelected) {
	        this.setLineWidth(width, "selected");
	      }

	      this.styleHasChanged(selectionType);

	      return this;
	    }

	    getLineWidth(selectionType) {

	      return this.getStyle(selectionType).lineWidth || 1;
	    }

	    /* LINE COLOR * @memberof SerieLine
	     */
	    setLineColor(color, selectionType, applyToSelected) {

	      selectionType = selectionType || "unselected";
	      this.styles[selectionType] = this.styles[selectionType] || {};
	      this.styles[selectionType].lineColor = color;

	      if (applyToSelected) {
	        this.setLineColor(color, "selected");
	      }

	      this.styleHasChanged(selectionType);

	      return this;
	    }

	    getLineColor(selectionType) {

	      return this.getStyle(selectionType).lineColor || "black";
	    }

	    /* * @memberof SerieLine
	     */

	    /* MARKERS * @memberof SerieLine
	     */
	    showMarkers(selectionType, redraw) {
	      selectionType = selectionType || "unselected";
	      this.styles[selectionType] = this.styles[selectionType] || {};
	      this.styles[selectionType].showMarkers = true;

	      if (redraw && this._drawn) {
	        this.draw(true);
	      } else {
	        this.styleHasChanged(selectionType);
	      }

	      return this;
	    }

	    hideMarkers(selectionType, redraw) {

	      selectionType = selectionType || "unselected";
	      this.styles[selectionType].showMarkers = false;

	      if (redraw && this._drawn) {
	        this.draw(true);
	      } else {
	        this.styleHasChanged(selectionType);
	      }
	      return this;
	    }

	    markersShown(selectionType) {
	      return this.getStyle(selectionType).showMarkers !== false;
	    }

	    areMarkersShown() {
	      return this.markersShown.apply(this, arguments);
	    }

	    isMarkersShown() {
	      return this.markersShown.apply(this, arguments);
	    }

	    // Multiple markers
	    setMarkers(families, selectionType, applyToSelected) {
	      // Family has to be an object
	      // Family looks like
	      /*
	      {
	      	type: 1,
	      	zoom: 1,
	      	strokeWidth: 1,
	      	strokeColor: '',
	      	fillColor: '',
	            points: []
	      }
	      * @memberof SerieLine
	      */

	      this.styles[selectionType || "unselected"] = this.styles[selectionType || "unselected"] || {};

	      this.showMarkers(selectionType, false);

	      if (!Array.isArray(families) && typeof families == 'object') {
	        families = [families];
	      } else if (!families) {

	        families = [{
	          type: 1,
	          zoom: 1,
	          points: 'all'
	        }];
	      }

	      this.styles[selectionType || "unselected"].markers = families;

	      if (applyToSelected) {
	        this.styles["selected"].markers = util.extend(true, {}, families);
	      }

	      this._recalculateMarkerPoints(selectionType, families);
	      this.styleHasChanged(selectionType);
	      this.dataHasChanged(true); // Data has not really changed, but marker placing is performed during the draw method
	      return this;
	    }

	    setMarkersPoints(points, family, selectionType) {
	      this._extendMarkers("points", points, family, selectionType, true);
	    }

	    setMarkersColor(color, family, selectionType) {
	      this._extendMarkers("color", color, family, selectionType);
	    }

	    setMarkersType(type, family, selectionType) {
	      this._extendMarkers("type", type, family, selectionType);
	    }

	    setMarkersZoom(zoom, family, selectionType) {
	      this._extendMarkers("zoom", zoom, family, selectionType);
	    }

	    setMarkersStrokeColor(strokeColor, family, selectionType) {
	      this._extendMarkers("strokeColor", strokeColor, family, selectionType);
	    }

	    setMarkersStrokeWidth(strokeWidth, family, selectionType) {
	      this._extendMarkers("strokeWidth", strokeWidth, family, selectionType);
	    }

	    setMarkersFillColor(fillColor, family, selectionType) {
	      this._extendMarkers("fillColor", fillColor, family, selectionType);
	    }

	    _extendMarkers(type, value, family, selectionType, recalculatePoints) {

	      family = family || 0;
	      selectionType = selectionType || "unselected";

	      if (!this.styles[selectionType] || !this.styles[selectionType].markers) {
	        return;
	      }

	      this.styles[selectionType].markers[family][type] = value;

	      if (recalculatePoints) {
	        this._recalculateMarkerPoints(selectionType, this.styles[selectionType].markers);
	      }

	      if (!this.markersDom[this.styles[selectionType].markers[family]]) {
	        // DOM doesn't exist yet.
	        return;
	      }

	      this.setMarkerStyleTo(this.markersDom[this.styles[selectionType].markers[family]].dom, this.styles[selectionType].markers[family]);
	    }

	    _recalculateMarkerPoints(selectionType, families) {

	      var markerPoints = [];
	      // Overwriting any other undefined families
	      markerPoints.push([0, Infinity, null]);

	      for (var i = 0, k = families.length; i < k; i++) {

	        families[i].markerPath = this.getMarkerPath(families[i]);

	        if (!families[i].points) {
	          families[i].points = 'all';
	        }

	        if (!Array.isArray(families[i].points)) {
	          families[i].points = [families[i].points];
	        }

	        for (var j = 0, l = families[i].points.length; j < l; j++) {

	          if (families[i].points[j] == 'all') {

	            markerPoints.push([0, Infinity, i]);
	          } else if (!Array.isArray(families[i].points[j])) {

	            markerPoints.push([families[i].points[j], families[i].points[j], i]);
	            //markerPoints.push( [ family[ i ].points[ j ] + 1, null ] );
	          } else {

	            markerPoints.push([families[i].points[j][0], families[i].points[j][1], i]);
	          }
	        }
	      }

	      this.markerFamilies[selectionType || "unselected"] = families;

	      // Let's sort if by the first index.
	      markerPoints.sort(function (a, b) {
	        return a[0] - b[0] || (a[2] == null ? -1 : 1);
	      });

	      this.markerPoints[selectionType || "unselected"] = markerPoints;
	    }

	    insertMarkers(selectionType) {

	      if (!this.markerFamilies || !this.markerFamilies[selectionType || this.selectionType] || this.options.markersIndependant) {
	        return;
	      }

	      for (var i = 0, l = this.markerFamilies[selectionType || this.selectionType].length; i < l; i++) {

	        if (!this.markersDom.has(this.markerFamilies[selectionType || this.selectionType][i])) {
	          continue;
	        }

	        let dom = this.markersDom.get(this.markerFamilies[selectionType || this.selectionType][i]);

	        dom.dom.setAttribute('d', dom.path);

	        this.groupMarkers.appendChild(dom.dom);
	        this.currentMarkersSelectionType = this.selectionType;
	      }
	    }

	    getMarkerForLegend() {

	      if (!this.markerPoints || !this.markerPoints[this.selectionType]) {
	        return;
	      }

	      if (!this.markerForLegend) {

	        var marker = document.createElementNS(this.graph.ns, 'path');
	        this.setMarkerStyleTo(marker, this.markerFamilies[this.selectionType][0]);

	        marker.setAttribute('d', "M 14 0 " + this.getMarkerPath(this.markerFamilies[this.selectionType][0]));

	        this.markerForLegend = marker;
	      }

	      return this.markerForLegend;
	    }

	    eraseMarkers() {

	      var self = this;

	      if (this.options.markersIndependant) {

	        for (var i in this.independantMarkers) {
	          self.groupMarkers.removeChild(this.independantMarkers[i]);
	        }

	        this.independantMarkers = {};
	      } else if (this.currentMarkersSelectionType) {

	        this.markersDom.forEach(function (el) {

	          if (!el.dom) {
	            return;
	          }

	          if (el.dom.parentNode !== self.groupMarkers) {
	            return;
	          }

	          self.groupMarkers.removeChild(el.dom);
	          el.path = "";
	        });

	        this.currentMarkersSelectionType = false;
	      }
	    }

	    showImpl() {
	      this.showPeakPicking();
	    }

	    hideImpl() {
	      this.hidePeakPicking();
	    }

	    XIsMonotoneous() {
	      this.xmonotoneous = true;
	      return this;
	    }

	    isXMonotoneous() {
	      return this.xmonotoneous || false;
	    }

	    XMonotoneousDirection() {

	      return this.data && this.data[0] && this.data[0][2] - this.data[0][0] > 0;
	    }

	    makePeakPicking() {

	      var self = this;
	      var ys = this.detectedPeaks;

	      var x,
	          px,
	          passed = [],
	          px,
	          i = 0,
	          l = ys.length,
	          k,
	          m,
	          y,
	          index;

	      var selected = self.graph.selectedShapes.map(function (shape) {
	        return shape.getProp('xval');
	      });

	      ys.sort(function (a, b) {
	        return b[0] - a[0];
	      });

	      m = 0;

	      for (; i < l; i++) {

	        x = ys[i][1];
	        px = self.getX(x);
	        k = 0;
	        y = self.getY(ys[i][0]);

	        if (px < self.getXAxis().getMinPx() || px > self.getXAxis().getMaxPx()) {
	          continue;
	        }

	        if (!self.options.autoPeakPickingAllowAllY && (y > self.getYAxis().getMinPx() || y < self.getYAxis().getMaxPx())) {

	          continue;
	        }

	        // Distance check
	        for (; k < passed.length; k++) {
	          if (Math.abs(passed[k] - px) < self.options.autoPeakPickingMinDistance) {
	            break;
	          }
	        }
	        if (k < passed.length) {
	          continue;
	        }

	        // Distance check end

	        // If the retained one has already been selected somewhere, continue;
	        if ((index = selected.indexOf(x)) > -1) {
	          passed.push(px);
	          continue;
	        }

	        if (!self.picks[m]) {
	          return;
	        }

	        //console.log( this.getYAxis().getDataMax(), this.getYAxis().getCurrentMin(), y );
	        //    self.picks[ m ].show();

	        if (this.getYAxis().getPx(ys[i][0]) - 20 < 0) {

	          self.picks[m].setLabelPosition({
	            x: x,
	            y: "5px"
	          });

	          self.picks[m].setLabelBaseline('hanging');
	        } else {

	          self.picks[m].setLabelBaseline('no-change');

	          self.picks[m].setLabelPosition({
	            x: x,
	            y: ys[i][0],
	            dy: "-15px"
	          });
	        }

	        self.picks[m].setProp('xval', x);

	        if (self.options.autoPeakPickingFormat) {

	          self.picks[m].setLabelText(self.options.autoPeakPickingFormat.call(self.picks[m], x, m));
	        } else {
	          self.picks[m].setLabelText(String(Math.round(x * 1000) / 1000));
	        }

	        self.picks[m].makeLabels();

	        m++;
	        while (self.picks[m] && self.picks[m].isSelected()) {
	          m++;
	        }

	        if (passed.length == self.options.autoPeakPickingNb) {
	          break;
	        }
	      }
	    }
	  }

	  function drawMarkerXY(graph, family, x, y, markerDom) {

	    if (!family) {
	      return;
	    }

	    if (graph.options.markersIndependant) {
	      var dom = graph.getMarkerDomIndependant(graph.counter1, graph.counter2, family);
	      var p = 'M ' + x + ' ' + y + ' ';
	      p += family.markerPath + ' ';

	      dom.setAttribute('d', p);
	    }

	    markerDom.path = markerDom.path || "";
	    markerDom.path += 'M ' + x + ' ' + y + ' ';
	    markerDom.path += family.markerPath + ' ';
	  }

	  function getDegradedData(graph) {
	    // Serie redrawing

	    var self = graph,
	        xpx,
	        ypx,
	        xpx2,
	        ypx2,
	        i = 0,
	        l = graph.data.length,
	        j = 0,
	        k,
	        m,
	        degradationMin,
	        degradationMax,
	        degradationNb,
	        degradationValue,
	        degradation,
	        degradationMinMax = [],
	        incrXFlip = 0,
	        incrYFlip = 1,
	        degradeFirstX,
	        degradeFirstXPx,
	        optimizeMonotoneous = graph.isXMonotoneous(),
	        optimizeMaxPxX = graph.getXAxis().getMathMaxPx(),
	        optimizeBreak,
	        buffer;

	    if (graph.isFlipped()) {
	      incrXFlip = 1;
	      incrYFlip = 0;
	    }

	    var datas = [];
	    var xData = [],
	        dataY = [],
	        sum = 0;

	    if (graph.mode == 'x_equally_separated') {

	      if (graph.isFlipped()) {
	        return [graph.data, graph.xData];
	      }

	      dataY = [];

	      for (; i < l; i++) {

	        j = 0;
	        k = 0;
	        m = graph.data[i].length;

	        var delta = Math.round(graph.degradationPx / graph.getXAxis().getRelPx(graph.xData[i].dx));

	        if (delta == 1) {
	          xData.push(graph.xData[i]);
	          datas.push(graph.data[i]);
	        }

	        degradationMin = Infinity;
	        degradationMax = -Infinity;

	        for (; j < m; j += 1) {

	          xpx = graph.xData[i].x + j * graph.xData[i].dx;

	          if (optimizeMonotoneous && xpx < 0) {
	            buffer = [xpx, ypx, graph.data[i][j]];
	            continue;
	          }

	          if (optimizeMonotoneous && buffer) {

	            sum += buffer[2];
	            degradationMin = Math.min(degradationMin, buffer[2]);
	            degradationMax = Math.max(degradationMax, buffer[2]);

	            buffer = false;
	            k++;
	          }

	          sum += graph.data[i][j];
	          degradationMin = Math.min(degradationMin, graph.data[i][j]);
	          degradationMax = Math.max(degradationMax, graph.data[i][j]);

	          if (j % delta == 0 && j > 0 || optimizeBreak) {

	            dataY.push(sum / delta);

	            degradationMinMax.push(graph.xData[i].x + j * graph.xData[i].dx - delta / 2 * graph.xData[i].dx, degradationMin, degradationMax);

	            degradationMin = Infinity;
	            degradationMax = -Infinity;

	            sum = 0;
	          }

	          if (optimizeMonotoneous && xpx > optimizeMaxPxX) {

	            optimizeBreak = true;

	            break;
	          }

	          k++;
	        }

	        datas.push(dataY);
	        xData.push({
	          dx: delta * graph.xData[i].dx,
	          x: graph.xData[i].x + delta * graph.xData[i].dx / 2
	        });
	      }

	      if (graph.degradationSerie) {
	        graph.degradationSerie.setData(degradationMinMax);
	        graph.degradationSerie.draw();
	      }

	      return [datas, xData];
	    }

	    for (; i < l; i++) {

	      j = 0;
	      k = 0;
	      m = graph.data[i].length;

	      degradationNb = 0;
	      degradationValue = 0;

	      degradationMin = Infinity;
	      degradationMax = -Infinity;

	      var data = [];
	      for (; j < m; j += 2) {

	        xpx2 = graph.getX(graph.data[i][j + incrXFlip]);

	        if (optimizeMonotoneous && xpx2 < 0) {

	          buffer = [xpx2, graph.getY(graph.data[i][j + incrYFlip]), graph.data[i][j + incrXFlip], graph.data[i][j + incrYFlip]];

	          continue;
	        }

	        if (optimizeMonotoneous && buffer) {

	          degradationValue += buffer[3];
	          degradationNb++;

	          degradationMin = Math.min(degradationMin, buffer[3]);
	          degradationMax = Math.max(degradationMax, buffer[3]);

	          degradeFirstX = buffer[2];
	          degradeFirstXPx = buffer[0];

	          buffer = false;
	          k++;
	        } else if (degradeFirstX === undefined) {

	          degradeFirstX = graph.data[i][j + incrXFlip];
	          degradeFirstXPx = xpx2;
	        }

	        if (Math.abs(xpx2 - degradeFirstXPx) > graph.degradationPx && j < m) {

	          data.push((degradeFirstX + graph.data[i][j + incrXFlip]) / 2, degradationValue / degradationNb);

	          degradationMinMax.push((graph.data[i][j + incrXFlip] + degradeFirstX) / 2, degradationMin, degradationMax);

	          if (degradeFirstXPx > optimizeMaxPxX) {

	            break;
	          }

	          degradeFirstX = undefined;
	          degradationNb = 0;
	          degradationValue = 0;
	          degradationMin = Infinity;
	          degradationMax = -Infinity;

	          k++;
	        }

	        degradationValue += graph.data[i][j + incrYFlip];
	        degradationNb++;

	        degradationMin = Math.min(degradationMin, graph.data[i][j + incrYFlip]);
	        degradationMax = Math.max(degradationMax, graph.data[i][j + incrYFlip]);

	        if (optimizeMonotoneous && xpx2 > optimizeMaxPxX) {

	          optimizeBreak = true;
	        }

	        xpx = xpx2;
	        ypx = ypx2;
	      }

	      datas.push(data);

	      if (optimizeBreak) {

	        break;
	      }
	    }

	    if (graph.degradationSerie) {
	      graph.degradationSerie.setData(degradationMinMax);
	      graph.degradationSerie.draw();
	    }

	    return [datas];
	  }

	  function hidePeakPicking(graph) {

	    if (!graph.picks) {
	      return;
	    }
	    for (var i = 0; i < graph.picks.length; i++) {
	      graph.picks[i].hide();
	    }
	  }

	  function showPeakPicking(graph) {

	    if (!graph.picks) {
	      return;
	    }

	    for (var i = 0; i < graph.picks.length; i++) {
	      graph.picks[i].show();
	    }
	  }

	  util.mix(SerieLine, _graphMixin2.default);

	  exports.default = SerieLine;
	});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(4), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('../dependencies/eventEmitter/EventEmitter'), require('../graph.util'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.EventEmitter, global.graph);
	    global.graphSerie = mod.exports;
	  }
	})(this, function (exports, _EventEmitter, _graph) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

	  var util = _interopRequireWildcard(_graph);

	  function _interopRequireWildcard(obj) {
	    if (obj && obj.__esModule) {
	      return obj;
	    } else {
	      var newObj = {};

	      if (obj != null) {
	        for (var key in obj) {
	          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	        }
	      }

	      newObj.default = obj;
	      return newObj;
	    }
	  }

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  /**
	   * Serie class to be extended
	   * @static
	   */
	  class Serie extends _EventEmitter2.default {

	    constructor() {
	      super(...arguments);
	    }

	    /** 
	     * Sets data to the serie
	     * @memberof Serie
	     * @param {(Object|Array|Array[])} data - The data of the serie
	     * @param {Boolean} [ oneDimensional=false ] - In some cases you may need to force the 1D type. This is required when one uses an array or array to define the data (see examples)
	     * @param {String} [ type=float ] - Specify the type of the data. Use <code>int</code> to save memory (half the amount of bytes allocated to the data).
	     * @example serie.setData( [ [ x1, y1 ], [ x2, y2 ], ... ] );
	     * @example serie.setData( [ x1, y1, x2, y2, ... ] ); // Faster
	     * @example serie.setData( [ [ x1, y1, x2, y2, ..., xn, yn ] , [ xm, ym, x(m + 1), y(m + 1), ...] ], true ) // 1D array with a gap in the middle
	     * @example serie.setData( { x: x0, dx: spacing, y: [ y1, y2, y3, y4 ] } ); // Data with equal x separation. Fastest way
	     */
	    setData(data, oneDimensional, type) {

	      function isArray(arr) {
	        var stringed = Object.prototype.toString.call(arr);
	        return stringed === '[object Array]' || stringed === '[object Int16Array]' || stringed === '[object Int32Array]' || stringed === '[object Float32Array]' || stringed === '[object Float64Array]' || stringed === '[object Uint8Array]' || stringed === '[object Uint16Array]' || stringed === '[object Uint32Array]' || stringed === '[object Int8Array]';
	      }

	      var z = 0,
	          x,
	          dx,
	          oneDimensional = oneDimensional || false,
	          type = type || 'float',
	          arr,
	          total = 0,
	          continuous;

	      // In its current form, empty is a performance hindering method because it forces all the DOM to be cleared.
	      // We shouldn't need that for the lines
	      //this.empty();

	      this.minX = Number.MAX_SAFE_INTEGER;
	      this.maxX = Number.MIN_SAFE_INTEGER;
	      this.minY = Number.MAX_SAFE_INTEGER;
	      this.maxY = Number.MIN_SAFE_INTEGER;

	      var isDataArray = isArray(data);

	      // Single object
	      var datas = [];

	      if (!isDataArray && typeof data == 'object') {
	        data = [data];
	      } else if (isDataArray && !isArray(data[0]) && typeof data[0] !== 'object') {
	        // [100, 103, 102, 2143, ...]
	        data = [data];
	        oneDimensional = true;
	      } else if (isDataArray && isArray(data[0]) && data[0].length > 2) {
	        oneDimensional = true;
	      } else if (!isDataArray) {
	        util.throwError("Data is not an array");
	        return;
	      }

	      // [[100, 0.145], [101, 0.152], [102, 0.153], [...]] ==> [[[100, 0.145], [101, 0.152], [102, 0.153], [...]]]
	      var isData0Array = isArray(data[0]);

	      var isData00Array = isArray(data[0][0]);

	      if (isData0Array && !oneDimensional && !isData00Array) {
	        data = [data];
	      }
	      if (isData0Array) {

	        for (var i = 0, k = data.length; i < k; i++) {

	          arr = this._addData(type, !oneDimensional ? data[i].length * 2 : data[i].length);
	          datas.push(arr);
	          z = 0;

	          for (var j = 0, l = data[i].length; j < l; j++) {

	            if (!oneDimensional) {
	              arr[z] = data[i][j][0];

	              this._checkX(arr[z]);
	              z++;
	              arr[z] = data[i][j][1];
	              this._checkY(arr[z]);
	              z++;
	              total++;
	            } else {
	              // 1D Array
	              arr[z] = data[i][j];
	              this[j % 2 == 0 ? '_checkX' : '_checkY'](arr[z]);

	              z++;
	              total += j % 2 ? 1 : 0;
	            }
	          }
	        }
	      } else if (typeof data[0] == 'object') {

	        if (data[0].x) {

	          for (var i = 0, l = data.length; i < l; i++) {

	            var arr = this._addData(type, data[i].x.length * 2);
	            datas.push(arr);

	            z = 0;
	            for (var j = 0, m = data[0].x.length; j < m; j++) {
	              // Several piece of data together
	              arr[z] = data[i].x[j];
	              z++;
	              arr[z] = data[i].y[j];
	              z++;
	              this._checkX(data[i].x[j]);
	              this._checkY(data[i].y[j]);
	              total++;
	            }
	          }
	        } else {

	          this.mode = 'x_equally_separated';

	          var number = 0,
	              numbers = [],
	              datas = [],
	              k = 0,
	              o;

	          if (!data[0].y) {
	            console.log(data);
	            util.throwError("No y data");
	            return;
	          }

	          for (var i = 0, l = data.length; i < l; i++) {
	            // Several piece of data together
	            number += data[i].y.length;
	            continuous = i != 0 && (!data[i + 1] || data[i].x + data[i].dx * data[i].y.length == data[i + 1].x);
	            if (!continuous) {
	              datas.push(this._addData(type, number));
	              numbers.push(number);
	              number = 0;
	            }
	          }

	          this.xData = [];

	          number = 0;
	          k = 0;
	          z = 0;

	          for (var i = 0, l = data.length; i < l; i++) {
	            x = data[i].x;
	            dx = data[i].dx;

	            this.xData.push({
	              x: x,
	              dx: dx
	            });

	            o = data[i].y.length;
	            this._checkX(x);
	            this._checkX(x + dx * o);

	            for (var j = 0; j < o; j++) {
	              /*datas[k][z] = (x + j * dx);
	              this._checkX(datas[k][z]);
	              z++;*/
	              // 30 june 2014. To save memory I suggest that we do not add this stupid data.

	              datas[k][z] = data[i].y[j];
	              this._checkY(datas[k][z]);
	              z++;
	              total++;
	            }
	            number += data[i].y.length;

	            if (numbers[k] == number) {
	              k++;
	              number = 0;
	              z = 0;
	            }
	          }
	        }
	      }

	      // Determination of slots for low res spectrum
	      var w = (this.maxX - this.minX) / this.graph.getDrawingWidth(),
	          ws = [];

	      var min = this.graph.getDrawingWidth() * 4;
	      var max = total / 4;

	      var min = this.graph.getDrawingWidth();
	      var max = total;

	      this.data = datas;

	      if (min > 0) {

	        while (min < max) {
	          ws.push(min);
	          min *= 4;
	        }

	        this.slots = ws;

	        if (this.options.useSlots) {

	          this.calculateSlots();
	        }
	      }

	      if (this.isFlipped()) {

	        var maxX = this.maxX;
	        var maxY = this.maxY;
	        var minX = this.minX;
	        var minY = this.minY;

	        this.maxX = maxY;
	        this.maxY = maxX;

	        this.minX = minY;
	        this.minY = minX;
	      }

	      this.dataHasChanged();
	      this.graph.updateDataMinMaxAxes();
	      return this;
	    }

	    _addData(type, howmany) {

	      switch (type) {
	        case 'int':
	          var size = howmany * 4; // 4 byte per number (32 bits)
	          break;
	        case 'float':
	          var size = howmany * 8; // 4 byte per number (64 bits)
	          break;
	      }

	      var arr = new ArrayBuffer(size);

	      switch (type) {
	        case 'int':
	          return new Int32Array(arr);
	          break;

	        default:
	        case 'float':
	          return new Float64Array(arr);
	          break;
	      }
	    }

	    /**
	     * Removes all the data from the serie, without redrawing
	     * @returns {Serie} The current serie
	     */
	    clearData() {
	      this.setData([]);
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
	    setOptions(options) {
	      this.options = options || {};
	    }

	    /**
	     * Sets the options of the serie (no extension of default options)
	     * @param {String} name - The option name
	     * @param value - The option value
	     * @memberof Serie
	     * @example serie.setOption('selectableOnClick', true );
	     */
	    setOption(name, value) {
	      this.options[name] = value;
	    }

	    /**
	     * Removes the serie from the graph. The method doesn't perform any axis autoscaling or repaint of the graph. This should be done manually.
	     * @return {Serie} The current serie instance
	     * @memberof Serie
	     */
	    kill(noLegendUpdate) {

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
	    hide(hideShapes) {
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

	      this.emit("hide");

	      return this;
	    }

	    /**
	     * Shows the serie
	     * @memberof Serie
	     * @param {Boolean} [showShapes=false] - <code>true</code> to show the shapes associated to the serie
	     * @returns {Serie} The current serie
	     */
	    show(showShapes) {
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

	      this.emit("show");

	      return this;
	    }

	    hideImpl() {}
	    showImpl() {}

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
	     * Returns the x position of a certain value in pixels position, based on the serie's axis
	     * @memberof Serie
	     * @param {Number} val - Value to convert to pixels position
	     * @returns {Number} The x position in px corresponding to the x value
	     */
	    getX(val) {
	      return (val = this.getXAxis().getPx(val)) - val % 0.2;
	    }

	    /**
	     * Returns the y position of a certain value in pixels position, based on the serie's axis
	     * @memberof Serie
	     * @param {Number} val - Value to convert to pixels position
	     * @returns {Number} The y position in px corresponding to the y value
	     */
	    getY(val) {
	      return (val = this.getYAxis().getPx(val)) - val % 0.2;
	    }

	    /**
	     * Returns the selection state of the serie. Generic for most serie types
	     * @memberof Serie
	     * @returns {Boolean} <code>true</code> if the serie is selected, <code>false</code> otherwise
	     */
	    isSelected() {
	      return this.selected || this.selectionType !== "unselected";
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
	      this.graph.updateDataMinMaxAxes();
	      return this;
	    }

	    /**
	     * Assigns an x axis to the serie
	     * @memberof Serie
	     * @param {Axis|Number} axis - The axis to use as an x axis. If an integer, {@link Graph#getXAxis} or {@link Graph#getYAxis} will be used
	     * @returns {Serie} The current serie
	     * @example serie.setXAxis( graph.getTopAxis( 1 ) ); // Assigns the second top axis to the serie
	     */
	    setXAxis(axis) {

	      if (typeof axis == "number") {
	        this.xaxis = this.isFlipped() ? this.graph.getYAxis(axis) : this.graph.getXAxis(axis);
	      } else {
	        this.xaxis = axis;
	      }

	      this.graph.updateDataMinMaxAxes();

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
	      if (typeof axis == "number") {
	        this.xaxis = this.isFlipped() ? this.graph.getXAxis(axis) : this.graph.getYAxis(axis);
	      } else {
	        this.yaxis = axis;
	      }

	      this.graph.updateDataMinMaxAxes();

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

	    /**
	     * Computes and returns a line SVG element with the same line style as the serie, or width 20px
	     * @returns {SVGElement}
	     * @memberof Serie
	     */
	    getSymbolForLegend() {

	      if (!this.lineForLegend) {

	        var line = document.createElementNS(this.graph.ns, 'line');
	        this.applyLineStyle(line);

	        line.setAttribute('x1', 5);
	        line.setAttribute('x2', 25);
	        line.setAttribute('y1', 0);
	        line.setAttribute('y2', 0);

	        line.setAttribute('cursor', 'pointer');

	        this.lineForLegend = line;
	      }

	      return this.lineForLegend;
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
	      this.options.layer = parseInt(layerIndex) || 1;
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

	    setStyle(style, selectionType = "unselected") {
	      //console.log( style, selectionType );
	      this.styles[selectionType] = style;
	      this.styleHasChanged(selectionType);
	    }

	    /**
	     * Notifies jsGraph that the style of the serie has changed and needs to be redrawn on the next repaint
	     * @param {String} selectionType - The selection for which the style may have changed
	     * @returns {Serie} The current serie
	     * @memberof Serie
	     */
	    styleHasChanged(selectionType = "unselected") {
	      this._changedStyles = this._changedStyles || {};

	      if (selectionType === false) {
	        for (var i in this._changedStyles) {
	          this._changedStyles[i] = false;
	        }
	      } else {
	        this._changedStyles[selectionType || "unselected"] = true;
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
	    hasStyleChanged(selectionType) {
	      this._changedStyles = this._changedStyles || {};
	      return this._changedStyles[selectionType || "unselected"];
	    }

	    /**
	     * Notifies jsGraph that the data of the serie has changed
	     * @returns {Serie} The current serie
	     * @memberof Serie
	     */
	    dataHasChanged(arg) {
	      this._dataHasChanged = arg === undefined || arg;
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
	    select() {
	      this.selected = true;
	      return this;
	    }

	    /**
	     * Flags the serie as unselected
	     * @returns {Serie} The current serie
	     * @memberof Serie
	     */
	    unselect() {
	      this.selected = false;
	      return this;
	    }

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
	      this._trackingCallback = hoverCallback;
	      this._trackingOutCallback = outCallback;

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
	      this._trackingCallback = null;
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

	    set excludedFromLegend(bln = true) {
	      this._excludedFromLegend = bln;
	    }

	    get excludedFromLegend() {
	      return !!this._excludedFromLegend;
	    }

	    setDataIndices(categories, nb) {
	      this.categoryIndices = categories;
	      this.nbCategories = nb;
	    }
	  }

	  exports.default = Serie;
	});

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require("../graph.util"));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.graph);
	    global.slotoptimizer = mod.exports;
	  }
	})(this, function (exports, _graph) {
	  "use strict";

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  exports.default = function (toOptimize) {

	    if (!slotWorker) {
	      createWorker();
	    }

	    var requestId = util.guid();
	    toOptimize._queueId = requestId;
	    var resolve;
	    var prom = new Promise(function (_resolve) {
	      resolve = _resolve;
	    });
	    queue[requestId] = {
	      promise: prom,
	      resolve: resolve
	    };

	    slotWorker.postMessage(toOptimize);
	    return queue[requestId].promise;
	  };

	  var util = _interopRequireWildcard(_graph);

	  function _interopRequireWildcard(obj) {
	    if (obj && obj.__esModule) {
	      return obj;
	    } else {
	      var newObj = {};

	      if (obj != null) {
	        for (var key in obj) {
	          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	        }
	      }

	      newObj.default = obj;
	      return newObj;
	    }
	  }

	  var slotWorker;
	  var queue = {};

	  function createWorker() {

	    var workerUrl = URL.createObjectURL(new Blob([" ( " + function () {
	      onmessage = function (e) {

	        var data = e.data.data,
	            slotNb = e.data.slotNumber,
	            slot = e.data.slot,
	            flip = e.data.flip,
	            max = e.data.max,
	            min = e.data.min,
	            slotNumber,
	            dataPerSlot = slot / (max - min);

	        var slotsData = [];

	        for (var j = 0, k = data.length; j < k; j++) {

	          for (var m = 0, n = data[j].length; m < n; m += 2) {

	            slotNumber = Math.floor((data[j][m] - min) * dataPerSlot);

	            slotsData[slotNumber] = slotsData[slotNumber] || {
	              min: data[j][m + 1],
	              max: data[j][m + 1],
	              start: data[j][m + 1],
	              stop: false,
	              x: data[j][m]
	            };

	            slotsData[slotNumber].stop = data[j][m + 1];
	            slotsData[slotNumber].min = Math.min(data[j][m + 1], slotsData[slotNumber].min);
	            slotsData[slotNumber].max = Math.max(data[j][m + 1], slotsData[slotNumber].max);
	          }
	        }

	        postMessage({
	          slotNumber: slotNb,
	          slot: slot,
	          data: slotsData,
	          _queueId: e.data._queueId
	        });
	      };
	    }.toString() + ")()"], {
	      type: 'application/javascript'
	    }));

	    slotWorker = new Worker(workerUrl);

	    slotWorker.onmessage = function (e) {
	      var id = e.data._queueId;
	      delete e.data._queueId;
	      queue[id].resolve(e.data.data);
	      delete queue[id];
	    };
	  }
	});

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('../graph.util'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.graph);
	    global.graphMixinErrorbars = mod.exports;
	  }
	})(this, function (exports, _graph) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var util = _interopRequireWildcard(_graph);

	  function _interopRequireWildcard(obj) {
	    if (obj && obj.__esModule) {
	      return obj;
	    } else {
	      var newObj = {};

	      if (obj != null) {
	        for (var key in obj) {
	          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	        }
	      }

	      newObj.default = obj;
	      return newObj;
	    }
	  }

	  var ErrorBarMixin = {

	    doErrorDraw: function (orientation, error, originVal, originPx, xpx, ypx) {

	      if (!(error instanceof Array)) {
	        error = [error];
	      }

	      var functionName = orientation == 'y' ? 'getY' : 'getX';
	      var bars = orientation == 'y' ? ['top', 'bottom'] : ['left', 'right'];
	      var j;

	      if (isNaN(xpx) || isNaN(ypx)) {
	        return;
	      }

	      for (var i = 0, l = error.length; i < l; i++) {

	        if (error[i] instanceof Array) {
	          // TOP

	          j = bars[0];
	          this.errorstyles[i].paths[j] += " M " + xpx + " " + ypx;
	          this.errorstyles[i].paths[j] += this.makeError(orientation, i, this[functionName](originVal + error[i][0]), originPx, j);

	          j = bars[1];
	          this.errorstyles[i].paths[j] += " M " + xpx + " " + ypx;
	          this.errorstyles[i].paths[j] += this.makeError(orientation, i, this[functionName](originVal - error[i][1]), originPx, j);
	        } else {

	          j = bars[0];

	          this.errorstyles[i].paths[j] += " M " + xpx + " " + ypx;
	          this.errorstyles[i].paths[j] += this.makeError(orientation, i, this[functionName](originVal + error[i]), originPx, j);
	          j = bars[1];
	          this.errorstyles[i].paths[j] += " M " + xpx + " " + ypx;
	          this.errorstyles[i].paths[j] += this.makeError(orientation, i, this[functionName](originVal - error[i]), originPx, j);
	        }
	      }
	    },

	    makeError: function (orientation, level, coord, origin, quadOrientation) {

	      var method;
	      switch (this.errorstyles[level].type) {
	        case 'bar':
	          method = "makeBar";
	          break;

	        case 'box':
	          method = "makeBox";
	          break;
	      }

	      return this[method + orientation.toUpperCase()](coord, origin, this.errorstyles[level][quadOrientation]);
	    },

	    makeBarY: function (coordY, origin, style) {
	      if (!coordY || !style) {
	        return;
	      }
	      var width = !util.isNumeric(style.width) ? 10 : style.width;
	      return " V " + coordY + " m -" + width / 2 + " 0 h " + width + " m -" + width / 2 + " 0 V " + origin + " ";
	    },

	    makeBoxY: function (coordY, origin, style) {
	      if (!coordY || !style) {
	        return;
	      }
	      return " m 5 0 V " + coordY + " h -10 V " + origin + " m 5 0 ";
	    },

	    makeBarX: function (coordX, origin, style) {
	      if (!coordX || !style) {
	        return;
	      }
	      var height = !util.isNumeric(style.width) ? 10 : style.width;
	      return " H " + coordX + " m 0 -" + height / 2 + " v " + height + " m 0 -" + height / 2 + " H " + origin + " ";
	    },

	    makeBoxX: function (coordX, origin, style) {
	      if (!coordX || !style) {
	        return;
	      }
	      return " v 5 H " + coordX + " v -10 H " + origin + " v 5 ";
	    },

	    check: function (index, valY, valX) {

	      var dx, dy;

	      if (this.getType() == Graph.SERIE_LINE || this.getType() == Graph.SERIE_SCATTER) {

	        if (!(dx = this.data[index * 2]) || !(dy = this.data[index * 2 + 1])) {
	          //
	          return;
	        }
	      }

	      if (dx === undefined) {
	        return;
	      }

	      for (var i = 0, l = valY.length; i < l; i++) {

	        if (Array.isArray(valY[i])) {

	          if (!isNaN(valY[i][0])) {
	            this._checkY(dy + valY[i][0]);
	          }

	          if (!isNaN(valY[i][1])) {
	            this._checkY(dy - valY[i][1]);
	          }
	        } else {

	          if (!isNaN(valY[i])) {
	            this._checkY(dy + valY[i]);
	            this._checkY(dy - valY[i]);
	          }
	        }
	      }

	      for (var i = 0, l = valX.length; i < l; i++) {

	        if (Array.isArray(valX[i])) {

	          if (!isNaN(valX[i][0])) {
	            this._checkX(dx - valX[i][0]);
	          }

	          if (!isNaN(valX[i][1])) {
	            this._checkX(dx + valX[i][1]);
	          }
	        } else {

	          if (!isNaN(valY[i])) {
	            this._checkX(dx - valX[i]);
	            this._checkX(dx + valX[i]);
	          }
	        }
	      }
	    },
	    /**
	     *  Sets the data error values
	     */
	    setDataError: function (error, noCheck) {
	      this.error = error;

	      if (!noCheck) {
	        for (let i = 0, l = this.error.length; i < l; i++) {

	          if (this.error[i]) {

	            this.check(i, this.error[i][0], this.error[i][1]);
	          }
	        }
	      }

	      this.dataHasChanged();
	      this.graph.updateDataMinMaxAxes();
	      return this;
	    },

	    /**
	     *
	     *  @example serie.setErrorStyle( [ { type: 'bar', x: {} }, { type: 'box', top: { strokeColor: 'green', fillColor: 'olive' }, bottom: { strokeColor: 'red', fillColor: "#800000" }  } ] );
	     */
	    setErrorStyle: function (errorstyles) {

	      var self = this;

	      errorstyles = errorstyles || ['box', 'bar'];

	      // Ensure array
	      if (!Array.isArray(errorstyles)) {
	        errorstyles = [errorstyles];
	      }

	      var styles = [];
	      var pairs = [['y', 'top', 'bottom'], ['x', 'left', 'right']];

	      function makePath(style) {

	        style.dom = document.createElementNS(self.graph.ns, 'path');
	        style.dom.setAttribute('fill', style.fillColor || 'none');
	        style.dom.setAttribute('stroke', style.strokeColor || 'black');
	        style.dom.setAttribute('stroke-opacity', style.strokeOpacity || 1);
	        style.dom.setAttribute('fill-opacity', style.fillOpacity || 1);
	        style.dom.setAttribute('stroke-width', style.strokeWidth || 1);

	        self.groupMain.appendChild(style.dom);
	      }

	      for (var i = 0; i < errorstyles.length; i++) {
	        // i is bar or box

	        styles[i] = {};

	        if (typeof errorstyles[i] == "string") {

	          errorstyles[i] = {
	            type: errorstyles[i],
	            y: {}
	          };
	        }

	        styles[i].type = errorstyles[i].type;

	        for (var j = 0, l = pairs.length; j < l; j++) {

	          if (errorstyles[i].all) {

	            errorstyles[i][pairs[j][1]] = util.extend(true, {}, errorstyles[i].all);
	            errorstyles[i][pairs[j][2]] = util.extend(true, {}, errorstyles[i].all);
	          }

	          if (errorstyles[i][pairs[j][0]]) {
	            //.x, .y

	            errorstyles[i][pairs[j][1]] = util.extend(true, {}, errorstyles[i][pairs[j][0]]);
	            errorstyles[i][pairs[j][2]] = util.extend(true, {}, errorstyles[i][pairs[j][0]]);
	          }

	          for (var k = 1; k <= 2; k++) {

	            if (errorstyles[i][pairs[j][k]]) {

	              styles[i][pairs[j][k]] = errorstyles[i][pairs[j][k]];
	              makePath(styles[i][pairs[j][k]]);
	            }
	          }
	        }
	      }
	      /*
	            // None is defined
	            if( ! errorstyles[ i ].top && ! errorstyles[ i ].bottom ) {
	               styles[ i ].top = errorstyles[ i ];
	              styles[ i ].top.dom = document.createElementNS( this.graph.ns, 'path' );
	              styles[ i ].bottom = errorstyles[ i ];
	              styles[ i ].bottom.dom = document.createElementNS( this.graph.ns, 'path' );
	             } else if( errrostyles[ i ].top ) {
	               styles[ i ].bottom = null; // No bottom displayed
	              styles[ i ].top = errrostyles[ i ].top;
	              styles[ i ].top.dom = document.createElementNS( this.graph.ns, 'path' );
	             } else {
	               styles[ i ].bottom = errorstyles[ i ].bottom;
	              styles[ i ].bottom.dom = document.createElementNS( this.graph.ns, 'path' );
	              styles[ i ].top = null;
	            }
	      */

	      this.errorstyles = styles;

	      return this;
	    },

	    errorDrawInit: function () {
	      var error;
	      //  var pathError = "M 0 0 ";

	      if (this.errorstyles) {

	        for (var i = 0, l = this.errorstyles.length; i < l; i++) {

	          this.errorstyles[i].paths = {
	            top: "",
	            bottom: "",
	            left: "",
	            right: ""
	          };
	        }
	      }
	    },

	    errorAddPoint: function (j, dataX, dataY, xpx, ypx) {

	      var error;
	      if (this.error && (error = this.error[j / 2])) {

	        //    pathError += "M " + xpx + " " + ypx;

	        if (error[0]) {
	          this.doErrorDraw('y', error[0], dataY, ypx, xpx, ypx);
	        }

	        if (error[1]) {
	          this.doErrorDraw('x', error[1], dataX, xpx, xpx, ypx);
	        }
	      }
	    },

	    errorAddPointBarChart: function (j, posY, xpx, ypx) {
	      var error;
	      if (this.error && (error = this.error[j])) {
	        this.doErrorDraw('y', error, posY, ypx, xpx, ypx);
	      }
	    },

	    errorDraw: function () {

	      if (this.error && this.errorstyles) {

	        for (var i = 0, l = this.errorstyles.length; i < l; i++) {

	          for (var j in this.errorstyles[i].paths) {

	            if (this.errorstyles[i][j] && this.errorstyles[i][j].dom) {
	              this.errorstyles[i][j].dom.setAttribute('d', this.errorstyles[i].paths[j]);
	            }
	          }
	        }
	      }
	    }

	  };

	  exports.default = ErrorBarMixin;
	});

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(3), __webpack_require__(11), __webpack_require__(14)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('../graph.util'), require('./graph.serie.line'), require('../mixins/graph.mixin.errorbars'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.graph, global.graphSerie, global.graphMixin);
	    global.graphSerieBar = mod.exports;
	  }
	})(this, function (exports, _graph, _graphSerie, _graphMixin) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var util = _interopRequireWildcard(_graph);

	  var _graphSerie2 = _interopRequireDefault(_graphSerie);

	  var _graphMixin2 = _interopRequireDefault(_graphMixin);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  function _interopRequireWildcard(obj) {
	    if (obj && obj.__esModule) {
	      return obj;
	    } else {
	      var newObj = {};

	      if (obj != null) {
	        for (var key in obj) {
	          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	        }
	      }

	      newObj.default = obj;
	      return newObj;
	    }
	  }

	  /** 
	   * Represents a bar serie.  
	     Needs to be used exclusively with a bar axis ({@link AxisXBar}).  
	     Supports error bars, line color, line width, fill color, fill opacity.
	   * @example graph.newSerie("serieName", { fillColor: 'red', fillOpacity: 0.2 }, "bar" );
	   * @extends Serie
	   */
	  class SerieBar extends _graphSerie2.default {

	    constructor() {
	      super();
	    }

	    init(graph, name, options) {
	      this.graph = graph;
	      this.name = name;
	      this.options = options || {};

	      this.groupMain = document.createElementNS(this.graph.ns, 'g');

	      this.pathDom = document.createElementNS(this.graph.ns, 'path');
	      this.groupMain.appendChild(this.pathDom);

	      // Creates an empty style variable
	      this.styles = {};

	      // Unselected style
	      this.styles.unselected = {
	        lineColor: this.options.lineColor,
	        lineStyle: this.options.lineStyle,
	        lineWidth: this.options.lineWidth,
	        fillColor: this.options.fillColor,
	        fillOpacity: this.options.fillOpacity,
	        markers: this.options.markers
	      };
	    }

	    /** 
	     *  Sets the data of the bar serie
	     *  @param {Object} data
	     *  @example serie.setData( { "cat1": val1, "cat2": val2, "cat4": val4 } );
	     *  @return {SerieBar} The current serie instance
	     */
	    setData(data) {

	      this.data = data;
	      this.minY = Number.MAX_SAFE_INTEGER;
	      this.maxY = Number.MIN_SAFE_INTEGER;

	      for (var i in this.data) {
	        this._checkY(this.data[i]);
	      }

	      return this;
	    }

	    /** 
	     *  Sets the fill color
	     */
	    setFillColor(fillColor, selectionType, applyToSelected) {

	      selectionType = selectionType || "unselected";
	      this.styles[selectionType] = this.styles[selectionType] || {};
	      this.styles[selectionType].fillColor = fillColor;

	      if (applyToSelected) {
	        this.setFillColor(fillColor, "selected");
	      }

	      this.styleHasChanged(selectionType);

	      return this;
	    }

	    /** 
	     *  Returns the fill color
	     */
	    getFillColor(selectionType) {
	      return this.getStyle(selectionType).fillColor;
	    }

	    /*  
	     * @memberof SerieBar
	     */
	    setFillOpacity(opacity, selectionType, applyToSelected) {

	      selectionType = selectionType || "unselected";
	      this.styles[selectionType] = this.styles[selectionType] || {};
	      this.styles[selectionType].fillOpacity = opacity;

	      if (applyToSelected) {
	        this.setLineWidth(opacity, "selected");
	      }

	      this.styleHasChanged(selectionType);

	      return this;
	    }

	    getFillOpacity(selectionType) {

	      return this.getStyle(selectionType).fillOpacity || 1;
	    }

	    /**
	     * Reapply the current style to the serie lines elements. Mostly used internally
	     */
	    applyLineStyles() {
	      this.applyLineStyle(this.pathDom);
	    }

	    /**
	     * Applies the current style to a line element. Mostly used internally
	     * @memberof SerieBar
	     */
	    applyLineStyle(line) {

	      line.setAttribute('stroke', this.getLineColor());
	      line.setAttribute('stroke-width', this.getLineWidth());
	      if (this.getLineDashArray()) {
	        line.setAttribute('stroke-dasharray', this.getLineDashArray());
	      } else {
	        line.removeAttribute('stroke-dasharray');
	      }
	      line.setAttribute('fill', this.getFillColor());
	      line.setAttribute('fill-opacity', this.getFillOpacity() || 1);
	    }

	    draw() {

	      var path = "";
	      var categoryNumber, position;

	      if (this.error) {
	        this.errorDrawInit();
	      }

	      for (var i in this.data) {

	        if (!this.categoryIndices[i]) {
	          continue;
	        }

	        path += "M " + this.getXAxis().getPos(this.categoryIndices[i]) + " " + this.getYAxis().getPos(0) + " V " + this.getYAxis().getPos(this.data[i]) + " h " + this.getXAxis().getDeltaPx(1 / this.nbCategories) + " V " + this.getYAxis().getPos(0);

	        if (this.error) {
	          this.errorAddPointBarChart(i, this.data[i], this.getXAxis().getPos(this.categoryIndices[i] + 0.5 / this.nbCategories), this.getYAxis().getPos(this.data[i]));
	        }
	      }

	      if (this.error) {
	        this.errorDraw();
	      }

	      this.pathDom.setAttribute('d', path);
	      this.applyLineStyles();
	    }

	    // Markers now allowed
	    setMarkers() {}

	    getUsedCategories() {
	      return Object.keys(this.data);
	    }

	  }

	  exports.default = SerieBar;
	});

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(12), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('./graph.serie'), require('../graph.util'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.graph, global.graph);
	    global.graphSerieBox = mod.exports;
	  }
	})(this, function (exports, _graph, _graph3) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _graph2 = _interopRequireDefault(_graph);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  /**
	   * @name SerieZoneDefaultOptions
	   * @object
	   * @static
	   * @param {String} fillColor - The color to fill the zone with
	   * @param {String} lineColor - The line color
	   * @param {String} lineWidth - The line width (in px)
	   */
	  const defaults = {

	    orientation: 'y',
	    maxBoxWidth: 20,

	    defaultStyle: {

	      meanLineColor: 'rgb( 100, 0, 0 )',
	      meanLineWidth: 2,

	      boxAboveLineWidth: 1,
	      boxAboveLineColor: 'rgb( 0, 0, 0 )',
	      boxAboveFillColor: 'transparent',
	      boxAboveFillOpacity: 1,
	      boxBelowLineWidth: 1,
	      boxBelowLineColor: 'rgb( 0, 0, 0 )',
	      boxBelowFillColor: 'transparent',
	      boxBelowFillOpacity: 1,

	      barAboveLineColor: 'rgba( 0, 0, 0, 1 )',
	      barAboveLineWidth: 1,
	      barBelowLineColor: 'rgba( 0, 0, 0, 1 )',
	      barBelowLineWidth: 1,

	      outlierLineWidth: 1,
	      outlierLineColor: 'rgb( 255, 255, 255 )',
	      outlierFillColor: 'rgb( 0, 0, 0 )',
	      outlierFillOpacity: 1
	    }

	  };
	  /** 
	   * @static
	   * @extends Serie
	   * @example graph.newSerie( name, options, "scatter" );
	   * @see Graph#newSerie
	   */
	  class SerieBox extends _graph2.default {

	    constructor() {
	      super();
	    }

	    init(graph, name, options) {
	      this.graph = graph;
	      this.name = name;
	      this.options = (0, _graph3.extend)(true, {}, defaults, options || {}); // Creates options

	      this.groupMain = document.createElementNS(this.graph.ns, 'g');

	      this.pathDom = document.createElementNS(this.graph.ns, 'path');
	      this.groupMain.appendChild(this.pathDom);

	      // Creates an empty style variable
	      this.styles = {};

	      // Unselected style
	      this.styles.unselected = this.options.defaultStyle;
	    }

	    /** 
	     *  Sets the data of the bar serie
	     *  @param {Object} data
	     *  @example serie.setData( [ { x: 'cat', Q2: valMean, Q1: valBoxMin, Q3: valBoxMax, whiskers: [ val1, val2 ], outliers: [ ...yList ] } ] );
	     *  @return {SerieBar} The current serie instance
	     */
	    setData(data, noRescale) {

	      this.data = data;

	      if (!Array.isArray(data)) {
	        return;
	      }

	      let axisref, axisval, methodref, methodval, blnX;

	      if (this.options.orientation == 'y') {
	        axisref = this.getXAxis();
	        axisval = this.getYAxis();
	        methodref = this._checkX.bind(this);
	        methodval = this._checkY.bind(this);
	        blnX = true;

	        this.minY = data[0].Q2;
	        this.maxY = data[0].Q2;
	        this.maxX = data[0].x;
	        this.minX = data[0].x;
	      } else {
	        axisref = this.getYAxis();
	        axisval = this.getXAxis();
	        methodref = this._checkY.bind(this);
	        methodval = this._checkX.bind(this);
	        blnX = false;

	        this.minX = data[0].Q2;
	        this.maxX = data[0].Q2;
	        this.maxY = data[0].y;
	        this.minY = data[0].y;
	      }

	      if (noRescale) {
	        methodref = function () {};
	        methodval = function () {};
	      }

	      if (!axisref || !axisval) {
	        (0, _graph3.throwError)("Error in setting data of the box serie. The X and Y axes must be set beforehand");
	      }

	      for (var i in this.data) {

	        if (blnX) {
	          methodref(this.data[i].x);
	          this.data[i].pos = this.data[i].x;
	        } else {
	          methodref(this.data[i].y);
	          this.data[i].pos = this.data[i].y;
	        }

	        if (this.data[i].Q3) {
	          methodval(this.data[i].Q3);
	        }

	        if (this.data[i].Q1) {
	          methodval(this.data[i].Q1);
	        }

	        if (this.data[i].whiskers) {

	          if (Array.isArray(this.data[i].whiskers)) {

	            if (this.data[i].whiskers.length > 0) {
	              methodval(this.data[i].whiskers[0]);
	            }

	            if (this.data[i].whiskers.length > 1) {
	              methodval(this.data[i].whiskers[1]);
	            }
	          } else {
	            methodval(this.data[i].whiskers);
	            this.data[i].whiskers = [this.data[i].whiskers];
	          }
	        } else {
	          this.data[i].whiskers = [];
	        }

	        if (Array.isArray(this.data[i].outliers)) {
	          this.data[i].outliers.map(val => methodval(val));
	        } else {
	          this.data[i].outliers = [];
	        }
	      }

	      this.dataHasChanged();
	      this.graph.updateDataMinMaxAxes();

	      return this;
	    }

	    _style(type, styleValue, selectionType = "unselected", applyToSelected = false) {
	      this.styles[selectionType] = this.styles[selectionType] || {};
	      this.styles[selectionType][type] = styleValue;

	      if (applyToSelected) {
	        this._set(type, styleValue, "selected");
	      }

	      this.styleHasChanged(selectionType);
	      return this;
	    }

	    _gstyle(type, selectionType) {
	      return this.getStyle(selectionType)[type];
	    }

	    getStyle(selectionType = "unselected") {

	      return this.styles[selectionType] || {};
	    }

	    /** 
	     *  Sets the mean line color
	     *  @param {String} color - The mean line color
	     *  @returns {SerieBox} The current serie instance
	     */
	    setMeanLineColor() {
	      return this._style('meanLineColor', ...arguments);
	    }

	    /** 
	     *  Returns the mean line color
	     */
	    getMeanLineColor() {
	      return this._gstyle('meanLineColor', ...arguments);
	    }

	    setStyle(style, selectionType = "unselected") {
	      //console.log( style, selectionType );
	      this.styles[selectionType] = (0, _graph3.extend)({}, defaults.defaultStyle, this.styles.unselected, style);
	      this.styleHasChanged(selectionType);
	    }

	    /** 
	     *  Sets the mean line width
	     *  @param {Number} width - The line width
	     *  @returns {SerieBox} The current serie instance
	     */
	    setMeanLineWidth() {
	      return this._style('meanLineWidth', ...arguments);
	    }

	    /** 
	     *  Returns the mean line width
	     */
	    getMeanLineWidth() {
	      return this._gstyle('meanLineWidth', ...arguments);
	    }

	    /** 
	     *  Sets the box line color
	     *  @param {Number} color - The color of the box above the median
	     *  @returns {SerieBox} The current serie instance
	     */
	    setBoxAboveLineColor() {
	      return this._style('boxAboveLineColor', ...arguments);
	    }

	    /** 
	     *  Returns the box line color
	     */
	    getBoxAboveLineColor() {
	      return this._gstyle('boxAboveLineColor', ...arguments);
	    }

	    /** 
	     *  Sets the fill color
	     *  @param {Number} color - The color of the box below the median
	     *  @returns {SerieBox} The current serie instance
	     */
	    setBoxBelowLineColor() {
	      return this._style('boxBelowLineColor', ...arguments);
	    }

	    /** 
	     *  Returns the fill color
	     */
	    getBoxBelowLineColor() {
	      return this._gstyle('boxBelowLineColor', ...arguments);
	    }

	    /** 
	     *  Sets the fill color
	     *  @param {Number} width - The contour width of the box above the median
	     *  @returns {SerieBox} The current serie instance
	     */
	    setBoxAboveLineWidth() {
	      return this._style('boxAboveLineWidth', ...arguments);
	    }

	    /** 
	     *  Returns the fill color
	     */
	    getBoxAboveLineWidth() {
	      return this._gstyle('boxAboveLineWidth', ...arguments);
	    }

	    /** 
	     *  Sets the fill color
	     *  @param {Number} width - The contour width of the box below the median
	     *  @returns {SerieBox} The current serie instance
	     */
	    setBoxBelowLineWidth() {
	      return this._style('boxBelowLineWidth', ...arguments);
	    }

	    /** 
	     *  Returns the fill color
	     */
	    getBoxBelowLineWidth() {
	      return this._gstyle('boxBelowLineWidth', ...arguments);
	    }

	    /** 
	     *  Sets the fill color
	     *  @param {String} color - The fill color of the box above the median
	     *  @returns {SerieBox} The current serie instance
	     */
	    setBoxAboveFillColor() {
	      return this._style('boxAboveFillColor', ...arguments);
	    }

	    /** 
	     *  Returns the fill color
	     */
	    getBoxAboveFillColor() {
	      return this._gstyle('boxAboveFillColor', ...arguments);
	    }

	    /** 
	     *  Sets the fill color
	     *  @param {String} color - The fill color of the box below the median
	     *  @returns {SerieBox} The current serie instance
	     */
	    setBoxBelowFillColor() {
	      return this._style('boxBelowFillColor', ...arguments);
	    }

	    /** 
	     *  Returns the fill color
	     */
	    getBoxBelowFillColor() {
	      return this._gstyle('boxBelowFillColor', ...arguments);
	    }

	    /** 
	     *  Sets the fill color
	     *  @param {Number} opacity - The fill opacity of the box above the median
	     *  @returns {SerieBox} The current serie instance
	     */
	    setBoxAboveFillOpacity() {
	      return this._style('boxAboveFillOpacity', ...arguments);
	    }

	    /** 
	     *  Returns the fill color
	     */
	    getBoxAboveFillOpacity() {
	      return this._gstyle('boxAboveFillOpacity', ...arguments);
	    }

	    /** 
	     *  Sets the fill color
	     *  @param {Number} opacity - The fill opacity of the box below the median
	     *  @returns {SerieBox} The current serie instance
	     */
	    setBoxBelowFillOpacity() {
	      return this._style('boxBelowFillOpacity', ...arguments);
	    }

	    /** 
	     *  Returns the fill color
	     */
	    getBoxBelowFillOpacity() {
	      return this._gstyle('boxBelowFillOpacity', ...arguments);
	    }

	    /** 
	     *  Sets the whisker color
	     *  @param {String} color - The line color of the whisker above the median
	     *  @returns {SerieBox} The current serie instance
	     */
	    setBarAboveLineColor() {
	      return this._style('barAboveLineColor', ...arguments);
	    }

	    /** 
	     *  Returns the fill color
	     */
	    getBarAboveLineColor() {
	      return this._gstyle('barAboveLineColor', ...arguments);
	    }

	    /** 
	     *  Sets the fill color
	     *  @param {String} color - The line color of the whisker below the median
	     *  @returns {SerieBox} The current serie instance
	     */
	    setBarBelowLineColor() {
	      return this._style('barBelowLineColor', ...arguments);
	    }

	    /** 
	     *  Returns the fill color
	     */
	    getBarBelowLineColor() {
	      return this._gstyle('barBelowLineColor', ...arguments);
	    }

	    /** 
	     *  Sets the fill color
	     *  @param {Number} width - The line width of the whisker above the median
	     *  @returns {SerieBox} The current serie instance
	     */
	    setBarAboveLineWidth() {
	      return this._style('barAboveLineWidth', ...arguments);
	    }

	    /** 
	     *  Returns the fill color
	     */
	    getBarAboveLineWidth() {
	      return this._gstyle('barAboveLineWidth', ...arguments);
	    }

	    /** 
	     *  Sets the fill color
	     *  @param {Number} width - The line width of the whisker below the median
	     *  @returns {SerieBox} The current serie instance
	     */
	    setBarBelowLineWidth() {
	      return this._style('barBelowLineWidth', ...arguments);
	    }

	    /** 
	     *  Returns the fill color
	     */
	    getBarBelowLineWidth() {
	      return this._gstyle('barBelowLineWidth', ...arguments);
	    }

	    /** 
	     *  Sets the fill color
	     *  @param {String} color - The outlier stroke color
	     *  @returns {SerieBox} The current serie instance
	     */
	    setOutlierLineColor() {
	      return this._style('outlierLineColor', ...arguments);
	    }

	    /** 
	     *  Returns the box line color
	     */
	    getOutlierLineColor() {
	      return this._gstyle('outlierLineColor', ...arguments);
	    }

	    /** 
	     *  Sets the stroke width
	     *  @param {Number} width - The outlier stroke width
	     *  @returns {SerieBox} The current serie instance
	     */
	    setOutlierLineWidth() {
	      return this._style('outlierLineWidth', ...arguments);
	    }

	    /** 
	     *  Returns the fill color
	     */
	    getOutlierLineWidth() {
	      return this._gstyle('outlierLineWidth', ...arguments);
	    }

	    /** 
	     *  Sets the fill color
	     *  @param {String} color - The outlier fill color
	     *  @returns {SerieBox} The current serie instance
	     */
	    setOutlierFillColor() {
	      return this._style('outlierFillColor', ...arguments);
	    }

	    /** 
	     *  Returns the fill color
	     */
	    getOutlierFillColor() {
	      return this._gstyle('outlierFillColor', ...arguments);
	    }

	    /** 
	     *  Sets the outlier fill opacity
	     *  @param {Number} opacity - The outlier fill opacity
	     *  @returns {SerieBox} The current serie instance
	     */
	    setOutlierFillOpacity() {
	      return this._style('outlierFillOpacity', ...arguments);
	    }

	    /** 
	     *  Returns the outlier fill opacity
	     */
	    getOutlierFillOpacity() {
	      return this._gstyle('outlierFillOpacity', ...arguments);
	    }

	    /**
	     * Reapply the current style to the serie lines elements. Mostly used internally
	     *  @returns {SerieBox} The current serie instance
	     */
	    applyLineStyles() {
	      this.applyLineStyle(this.pathDom);
	    }

	    /**
	     * Applies the current style to a line element. Mostly used internally
	     * @memberof SerieBar
	     */
	    applyLineStyle(line) {

	      line.setAttribute('stroke', this.getLineColor());
	      line.setAttribute('stroke-width', this.getLineWidth());
	      line.removeAttribute('stroke-dasharray');
	      line.setAttribute('fill', this.getFillColor());
	      line.setAttribute('fill-opacity', this.getFillOpacity() || 1);
	    }

	    draw() {

	      if (!this.data) {
	        return;
	      }

	      let position;
	      let axis = this.options.orientation == 'y' ? this.getYAxis() : this.getXAxis();
	      let axis2 = this.options.orientation == 'y' ? this.getXAxis() : this.getYAxis();
	      let boxOtherDimension; // width or height of the box
	      let useCategories = false;
	      let mean, boxAbove, boxBelow, barAbove, barBelow, outliers, posAbove, posBelow;
	      let categoryNumber;

	      (0, _graph3.emptyDom)(this.groupMain);

	      if (axis2.getType() == 'category') {

	        boxOtherDimension = axis2.getRelPx(0.8 / this.nbCategories);
	        useCategories = true;
	      } else {
	        // Get all the spacing and determine the smallest one
	        boxOtherDimension = this.options.maxBoxWidth;
	        //      console.log( boxOtherDimension );
	        for (var i = 0, l = this.data.length; i < l - 1; i++) {

	          //     console.log( Math.abs( axis.getPx( this.data[ i + 1 ].pos ) - axis.getPx( this.data[ i ].pos ) ), axis.getPx( this.data[ i + 1 ].pos ), axis.getPx( this.data[ i ].pos ) );
	          boxOtherDimension = Math.min(boxOtherDimension, Math.abs(axis2.getPx(this.data[i + 1].pos) - axis2.getPx(this.data[i].pos)));
	        }
	        // console.log( boxOtherDimension );
	      }

	      for (var i = 0, l = this.data.length; i < l; i++) {

	        if (axis2.getType() == 'category') {

	          let cat = this.options.orientation == 'y' ? this.data[i].x : this.data[i].y;

	          if (!this.categoryIndices.hasOwnProperty(cat)) {

	            if (Array.isArray(this._linkedToScatterSeries)) {
	              for (let scatter_serie of this._linkedToScatterSeries) {

	                if (scatter_serie.categoryIndices.hasOwnProperty(cat)) {

	                  position = [axis2.getPos(scatter_serie.categoryIndices[cat]) + 1.2 * boxOtherDimension / 2];

	                  if (this.options.orientation == 'y') {
	                    axis = scatter_serie.getYAxis();
	                  } else {
	                    axis = scatter_serie.getXAxis();
	                  }

	                  break;
	                }
	              }
	            }
	          } else {

	            position = [axis2.getPos(this.categoryIndices[cat]) + 1.2 * boxOtherDimension / 2];
	          }
	        } else {

	          position = [axis2.getPos(this.options.orientation == 'y' ? this.data[i].x : this.data[i].y), boxOtherDimension];
	        }

	        mean = axis.getPos(this.data[i].Q2);
	        boxAbove = axis.getPos(this.data[i].Q3);
	        boxBelow = axis.getPos(this.data[i].Q1);

	        this.data[i].whiskers.map(val => {

	          if (val < this.data[i].Q1) {
	            barBelow = axis.getPos(val);
	          } else {
	            barAbove = axis.getPos(val);
	          }
	        });

	        outliers = this.data[i].outliers.map(val => axis.getPos(val));

	        var lineMean = document.createElementNS(this.graph.ns, 'line');

	        this.applyMeanStyle(lineMean);

	        var rectAbove = document.createElementNS(this.graph.ns, 'rect');
	        var rectBelow = document.createElementNS(this.graph.ns, 'rect');

	        if (this.options.orientation == 'y') {

	          rectAbove.setAttribute('width', boxOtherDimension);
	          rectAbove.setAttribute('x', position[0] - boxOtherDimension / 2);

	          rectBelow.setAttribute('width', boxOtherDimension);
	          rectBelow.setAttribute('x', position[0] - boxOtherDimension / 2);

	          lineMean.setAttribute('x1', position[0] - boxOtherDimension / 2);
	          lineMean.setAttribute('x2', position[0] + boxOtherDimension / 2);
	          lineMean.setAttribute('y1', mean);
	          lineMean.setAttribute('y2', mean);
	        } else {

	          rectAbove.setAttribute('height', boxOtherDimension);
	          rectAbove.setAttribute('y', position[0] - boxOtherDimension / 2);

	          rectBelow.setAttribute('height', boxOtherDimension);
	          rectBelow.setAttribute('y', position[0] - boxOtherDimension / 2);

	          lineMean.setAttribute('y1', position[0] - boxOtherDimension / 2);
	          lineMean.setAttribute('y2', position[0] + boxOtherDimension / 2);
	          lineMean.setAttribute('x1', mean);
	          lineMean.setAttribute('x2', mean);
	        }

	        this.boxPos(rectAbove, mean, boxAbove, this.options.orientation == 'x');
	        this.boxPos(rectBelow, mean, boxBelow, this.options.orientation == 'x');

	        this.applyBoxStyle(rectAbove, rectBelow);

	        var whiskerAbove = document.createElementNS(this.graph.ns, 'line');
	        var whiskerBelow = document.createElementNS(this.graph.ns, 'line');

	        if (this.options.orientation == 'y') {

	          if (barAbove !== undefined) {
	            whiskerAbove.setAttribute('y1', boxAbove);
	            whiskerAbove.setAttribute('y2', barAbove);
	            whiskerAbove.setAttribute('x1', position[0]);
	            whiskerAbove.setAttribute('x2', position[0]);
	          }

	          if (barBelow !== undefined) {
	            whiskerBelow.setAttribute('y1', boxBelow);
	            whiskerBelow.setAttribute('y2', barBelow);
	            whiskerBelow.setAttribute('x1', position[0]);
	            whiskerBelow.setAttribute('x2', position[0]);
	          }
	        } else {

	          if (barAbove !== undefined) {
	            whiskerAbove.setAttribute('x1', boxAbove);
	            whiskerAbove.setAttribute('x2', barAbove);
	            whiskerAbove.setAttribute('y1', position[0]);
	            whiskerAbove.setAttribute('y2', position[0]);
	          }

	          if (barBelow !== undefined) {
	            whiskerBelow.setAttribute('x1', boxBelow);
	            whiskerBelow.setAttribute('x2', barBelow);
	            whiskerBelow.setAttribute('y1', position[0]);
	            whiskerBelow.setAttribute('y2', position[0]);
	          }
	        }

	        outliers.map(outliervalue => {

	          let outlier = document.createElementNS(this.graph.ns, 'circle');

	          outlier.setAttribute('r', 2);

	          if (this.options.orientation == 'y') {

	            outlier.setAttribute('cx', position[0]);
	            outlier.setAttribute('cy', outliervalue);
	          } else {

	            outlier.setAttribute('cy', position[0]);
	            outlier.setAttribute('cx', outliervalue);
	          }

	          this.setOutlierStyle(outlier);

	          this.groupMain.appendChild(outlier);
	        });

	        if (barAbove !== undefined) {
	          this.groupMain.appendChild(whiskerAbove);
	        }

	        if (barBelow !== undefined) {
	          this.groupMain.appendChild(whiskerBelow);
	        }

	        if (boxAbove !== undefined) {
	          this.groupMain.appendChild(rectAbove);
	        }

	        if (boxBelow !== undefined) {
	          this.groupMain.appendChild(rectBelow);
	        }

	        this.groupMain.appendChild(lineMean);

	        this.applyWhiskerStyle(whiskerAbove, whiskerBelow);
	      }
	    }

	    applyBoxStyle(above, below) {

	      above.setAttribute('stroke', this.getBoxAboveLineColor());
	      above.setAttribute('stroke-width', this.getBoxAboveLineWidth());

	      if (this.getBoxAboveFillColor() !== undefined) {
	        above.setAttribute('fill', this.getBoxAboveFillColor());
	      }
	      if (this.getBoxAboveFillOpacity() !== undefined) {
	        above.setAttribute('fill-opacity', this.getBoxAboveFillOpacity());
	      }

	      below.setAttribute('stroke', this.getBoxBelowLineColor());
	      below.setAttribute('stroke-width', this.getBoxBelowLineWidth());

	      if (this.getBoxBelowFillColor() !== undefined) {
	        below.setAttribute('fill', this.getBoxBelowFillColor());
	      }
	      if (this.getBoxAboveFillOpacity() !== undefined) {
	        below.setAttribute('fill-opacity', this.getBoxBelowFillOpacity());
	      }
	    }

	    applyWhiskerStyle(above, below) {

	      above.setAttribute('stroke', this.getBarAboveLineColor());
	      above.setAttribute('stroke-width', this.getBarAboveLineWidth());

	      below.setAttribute('stroke', this.getBarBelowLineColor());
	      below.setAttribute('stroke-width', this.getBarBelowLineWidth());
	    }

	    applyMeanStyle(line) {

	      line.setAttribute('stroke', this.getMeanLineColor());
	      line.setAttribute('stroke-width', this.getMeanLineWidth());
	    }

	    setOutlierStyle(outlier) {

	      outlier.setAttribute('stroke', this.getOutlierLineColor());
	      outlier.setAttribute('stroke-width', this.getOutlierLineWidth());

	      if (this.getBoxBelowFillColor() !== undefined) {
	        outlier.setAttribute('fill', this.getOutlierFillColor());
	      }
	      if (this.getBoxAboveFillOpacity() !== undefined) {
	        outlier.setAttribute('fill-opacity', this.getOutlierFillOpacity());
	      }
	    }
	    /**
	     * Returns the index of a category based on its name
	     * @param {String} name - The name of the category
	     */
	    getCategoryIndex(name) {

	      if (!this.categories) {
	        throw new Error("No categories were defined. Probably axis.setSeries was not called");
	      }

	      for (var i = 0; i < this.categories.length; i++) {

	        if (this.categories[i].name == name) {
	          return i;
	        }
	      }

	      return false;
	    }

	    // Markers now allowed
	    setMarkers() {}

	    boxPos(box, mean, extremity, blnX) {

	      if (mean > extremity) {

	        box.setAttribute(blnX ? 'x' : 'y', extremity);
	        box.setAttribute(blnX ? 'width' : 'height', mean - extremity);
	      } else {

	        box.setAttribute(blnX ? 'x' : 'y', mean);
	        box.setAttribute(blnX ? 'width' : 'height', extremity - mean);
	      }
	    }

	    getUsedCategories() {
	      let xymode = this.options.orientation == 'y' ? 'x' : 'y';

	      let categories = this.data.map(d => d[xymode]);

	      if (Array.isArray(this._linkedToScatterSeries)) {
	        this._linkedToScatterSeries.map(scatter_serie => {

	          scatter_serie.getUsedCategories().map(scatter_serie_cat => {
	            let index;
	            if ((index = categories.indexOf(scatter_serie_cat)) > -1) {
	              categories.splice(index, 1);
	            }
	          });
	        });
	      }

	      return categories;
	    }

	    linkToScatterSerie(...series) {
	      this._linkedToScatterSeries = series;
	    }
	  }

	  exports.default = SerieBox;
	});

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(11), __webpack_require__(3), __webpack_require__(14)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('./graph.serie.line'), require('../graph.util'), require('../mixins/graph.mixin.errorbars'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.graphSerie, global.graph, global.graphMixin);
	    global.graphSerieLineColored = mod.exports;
	  }
	})(this, function (exports, _graphSerie, _graph, _graphMixin) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _graphSerie2 = _interopRequireDefault(_graphSerie);

	  var util = _interopRequireWildcard(_graph);

	  var _graphMixin2 = _interopRequireDefault(_graphMixin);

	  function _interopRequireWildcard(obj) {
	    if (obj && obj.__esModule) {
	      return obj;
	    } else {
	      var newObj = {};

	      if (obj != null) {
	        for (var key in obj) {
	          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	        }
	      }

	      newObj.default = obj;
	      return newObj;
	    }
	  }

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  /** 
	   * Colored serie line
	   * @example graph.newSerie( name, options, "color" );
	   * @see Graph#newSerie
	   * @augments SerieLine
	   */
	  class SerieLineColor extends _graphSerie2.default {

	    constructor() {
	      super(...arguments);
	    }

	    initExtended1() {

	      this.lines = this.lines || {};
	      if (this.initExtended2) {
	        this.initExtended2();
	      }
	    }

	    setColors(colors) {
	      this.color = colors;
	    }

	    _draw_standard() {

	      var self = this,
	          data = this._dataToUse,
	          toBreak,
	          i = 0,
	          l = data.length,
	          j,
	          k,
	          m,
	          x,
	          y,
	          k,
	          o,
	          lastX = false,
	          lastY = false,
	          xpx,
	          ypx,
	          xpx2,
	          ypx2,
	          xAxis = this.getXAxis(),
	          yAxis = this.getYAxis(),
	          xMin = xAxis.getCurrentMin(),
	          yMin = yAxis.getCurrentMin(),
	          xMax = xAxis.getCurrentMax(),
	          yMax = yAxis.getCurrentMax();

	      // Y crossing
	      var yLeftCrossingRatio, yLeftCrossing, yRightCrossingRatio, yRightCrossing, xTopCrossingRatio, xTopCrossing, xBottomCrossingRatio, xBottomCrossing;

	      var incrXFlip = 0;
	      var incrYFlip = 1;

	      var pointOutside = false;
	      var lastPointOutside = false;
	      var pointOnAxis;

	      this.eraseLines();

	      if (this.isFlipped()) {
	        incrXFlip = 1;
	        incrYFlip = 0;
	      }

	      for (i = 0; i < l; i++) {

	        toBreak = false;
	        this.counter1 = i;

	        this.currentLine = "";
	        j = 0;
	        k = 0;
	        m = data[i].length;

	        for (j = 0; j < m; j += 2) {

	          x = data[i][j + incrXFlip];
	          y = data[i][j + incrYFlip];

	          if (x < xMin && lastX < xMin || x > xMax && lastX > xMax || (y < yMin && lastY < yMin || y > yMax && lastY > yMax) && !this.options.lineToZero) {
	            lastX = x;
	            lastY = y;
	            lastPointOutside = true;
	            continue;
	          }

	          this.counter2 = j / 2;

	          if (this.markersShown()) {
	            this.getMarkerCurrentFamily(this.counter2);
	          }

	          xpx2 = this.getX(x);
	          ypx2 = this.getY(y);

	          if (xpx2 == xpx && ypx2 == ypx) {
	            continue;
	          }

	          pointOutside = x < xMin || y < yMin || x > xMax || y > yMax;
	          /*
	                  if ( this.options.lineToZero ) {
	                    pointOutside = ( x < xMin || x > xMax );
	                     if ( pointOutside ) {
	                      continue;
	                    }
	                  } else {
	                     if ( pointOutside || lastPointOutside ) {
	                       if ( ( lastX === false || lastY === false ) && !lastPointOutside ) {
	                         xpx = xpx2;
	                        ypx = ypx2;
	                        lastX = x;
	                        lastY = y;
	                       } else {
	                         pointOnAxis = [];
	                        // Y crossing
	                        yLeftCrossingRatio = ( x - xMin ) / ( x - lastX );
	                        yLeftCrossing = y - yLeftCrossingRatio * ( y - lastY );
	                        yRightCrossingRatio = ( x - xMax ) / ( x - lastX );
	                        yRightCrossing = y - yRightCrossingRatio * ( y - lastY );
	                         // X crossing
	                        xTopCrossingRatio = ( y - yMin ) / ( y - lastY );
	                        xTopCrossing = x - xTopCrossingRatio * ( x - lastX );
	                        xBottomCrossingRatio = ( y - yMax ) / ( y - lastY );
	                        xBottomCrossing = x - xBottomCrossingRatio * ( x - lastX );
	                         if ( yLeftCrossingRatio < 1 && yLeftCrossingRatio > 0 && yLeftCrossing !== false && yLeftCrossing < yMax && yLeftCrossing > yMin ) {
	                          pointOnAxis.push( [ xMin, yLeftCrossing ] );
	                        }
	                         if ( yRightCrossingRatio < 1 && yRightCrossingRatio > 0 && yRightCrossing !== false && yRightCrossing < yMax && yRightCrossing > yMin ) {
	                          pointOnAxis.push( [ xMax, yRightCrossing ] );
	                        }
	                         if ( xTopCrossingRatio < 1 && xTopCrossingRatio > 0 && xTopCrossing !== false && xTopCrossing < xMax && xTopCrossing > xMin ) {
	                          pointOnAxis.push( [ xTopCrossing, yMin ] );
	                        }
	                         if ( xBottomCrossingRatio < 1 && xBottomCrossingRatio > 0 && xBottomCrossing !== false && xBottomCrossing < xMax && xBottomCrossing > xMin ) {
	                          pointOnAxis.push( [ xBottomCrossing, yMax ] );
	                        }
	                         if ( pointOnAxis.length > 0 ) {
	                           if ( !pointOutside ) { // We were outside and now go inside
	                             if ( pointOnAxis.length > 1 ) {
	                              console.error( "Programmation error. Please e-mail me." );
	                              console.log( pointOnAxis, xBottomCrossing, xTopCrossing, yRightCrossing, yLeftCrossing, y, yMin, yMax, lastY );
	                            }
	                             this._createLine();
	                            this._addPoint( this.getX( pointOnAxis[ 0 ][ 0 ] ), this.getY( pointOnAxis[ 0 ][ 1 ] ), pointOnAxis[ 0 ][ 0 ], pointOnAxis[ 0 ][ 1 ], false, false, false );
	                            this._addPoint( xpx2, ypx2, lastX, lastY, false, false, true );
	                           } else if ( !lastPointOutside ) { // We were inside and now go outside
	                             if ( pointOnAxis.length > 1 ) {
	                              console.error( "Programmation error. Please e-mail me." );
	                              console.log( pointOnAxis, xBottomCrossing, xTopCrossing, yRightCrossing, yLeftCrossing, y, yMin, yMax, lastY );
	                            }
	                             this._addPoint( this.getX( pointOnAxis[ 0 ][ 0 ] ), this.getY( pointOnAxis[ 0 ][ 1 ] ), pointOnAxis[ 0 ][ 0 ], pointOnAxis[ 0 ][ 1 ], false, false, false );
	                           } else {
	                             // No crossing: do nothing
	                            if ( pointOnAxis.length == 2 ) {
	                              this._createLine();
	                               this._addPoint( this.getX( pointOnAxis[ 0 ][ 0 ] ), this.getY( pointOnAxis[ 0 ][ 1 ] ), pointOnAxis[ 0 ][ 0 ], pointOnAxis[ 0 ][ 1 ], false, false, false );
	                              this._addPoint( this.getX( pointOnAxis[ 1 ][ 0 ] ), this.getY( pointOnAxis[ 1 ][ 1 ] ), pointOnAxis[ 0 ][ 0 ], pointOnAxis[ 0 ][ 1 ], false, false, false );
	                            }
	                           }
	                        } else if ( !pointOutside ) {
	                          this._addPoint( xpx2, ypx2, lastX, lastY, j, false, false );
	                        }
	                      }
	                       xpx = xpx2;
	                      ypx = ypx2;
	                      lastX = x;
	                      lastY = y;
	                       lastPointOutside = pointOutside;
	                       continue;
	                    }
	                   }*/

	          if (isNaN(xpx2) || isNaN(ypx2)) {
	            if (this.counter > 0) {

	              //      this._createLine();
	            }
	            continue;
	          }

	          // OPTIMIZATION START
	          if (!this._optimize_before(xpx2, ypx2)) {
	            continue;
	          }
	          // OPTIMIZATION END

	          var color = this.colors[i][j / 2];

	          this._addPoint(xpx2, ypx2, x, y, xpx, ypx, lastX, lastY, j, color, false, true);

	          this.detectPeaks(x, y);

	          // OPTIMIZATION START
	          if (!this._optimize_after(xpx2, ypx2)) {
	            toBreak = true;
	            break;
	          }
	          // OPTIMIZATION END

	          xpx = xpx2;
	          ypx = ypx2;

	          lastX = x;
	          lastY = y;
	        }

	        // this._createLine();

	        if (toBreak) {
	          break;
	        }
	      }

	      this.latchLines();

	      if (this._tracker) {

	        if (this._trackerDom) {
	          this._trackerDom.remove();
	        }

	        var cloned = this.groupLines.cloneNode(true);
	        this.groupMain.appendChild(cloned);

	        for (var i = 0, l = cloned.children.length; i < l; i++) {

	          cloned.children[i].setAttribute('stroke', 'transparent');
	          cloned.children[i].setAttribute('stroke-width', '25px');
	          cloned.children[i].setAttribute('pointer-events', 'stroke');
	        }

	        self._trackerDom = cloned;

	        self.groupMain.addEventListener("mousemove", function (e) {
	          var coords = self.graph._getXY(e),
	              ret = self.handleMouseMove(false, false);
	          self._trackingCallback(self, ret, coords.x, coords.y);
	        });

	        self.groupMain.addEventListener("mouseleave", function (e) {
	          self._trackingOutCallback(self);
	        });
	      }
	      return this;
	    }

	    _addPoint(xpx, ypx, x, y, xpxbefore, ypxbefore, xbefore, ybefore, j, color, move, allowMarker) {

	      if (xpxbefore === undefined || ypxbefore === undefined) {
	        return;
	      }

	      if (isNaN(xpx) || isNaN(ypx)) {
	        return;
	      }

	      var line = this.lines[color];
	      if (!line) {
	        line = this.lines[color] = {
	          object: document.createElementNS(this.graph.ns, 'path'),
	          path: "",
	          color: color
	        };
	        line.object.setAttribute('stroke', color);
	        line.color = color;
	        //      this.applyLineStyle( line );
	        this.groupLines.appendChild(line.object);
	      }

	      line.path += "M " + xpxbefore + " " + ypxbefore + " L " + xpx + " " + ypx;

	      if (this.error) {
	        this.errorAddPoint(j, x, y, xpx, ypx);
	      }

	      if (this.markersShown() && allowMarker !== false) {
	        drawMarkerXY(this, this.markerFamilies[this.selectionType][this.markerCurrentFamily], xpx, ypx);
	      }
	    }

	    removeExtraLines() {}

	    // Returns the DOM
	    latchLines() {

	      for (var i in this.lines) {
	        this.lines[i].object.setAttribute('d', this.lines[i].path);
	      }
	    }

	    // Returns the DOM
	    eraseLines() {

	      for (var i in this.lines) {
	        this.lines[i].path = "";
	        this.lines[i].object.setAttribute('d', "");
	      }
	    }

	    /**
	     * Applies the current style to a line element. Mostly used internally
	     * @memberof SerieLine
	     */
	    applyLineStyle(line) {

	      //line.setAttribute( 'stroke', this.getLineColor() );
	      line.setAttribute('stroke-width', this.getLineWidth());
	      if (this.getLineDashArray()) {
	        line.setAttribute('stroke-dasharray', this.getLineDashArray());
	      } else {
	        line.removeAttribute('stroke-dasharray');
	      }
	      line.setAttribute('fill', 'none');
	      //	line.setAttribute('shape-rendering', 'optimizeSpeed');
	    }
	  }

	  exports.default = SerieLineColor;
	});

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(12), __webpack_require__(3), __webpack_require__(14)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('./graph.serie'), require('../graph.util'), require('../mixins/graph.mixin.errorbars'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.graph, global.graph, global.graphMixin);
	    global.graphSerieScatter = mod.exports;
	  }
	})(this, function (exports, _graph, _graph3, _graphMixin) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _graph2 = _interopRequireDefault(_graph);

	  var util = _interopRequireWildcard(_graph3);

	  var _graphMixin2 = _interopRequireDefault(_graphMixin);

	  function _interopRequireWildcard(obj) {
	    if (obj && obj.__esModule) {
	      return obj;
	    } else {
	      var newObj = {};

	      if (obj != null) {
	        for (var key in obj) {
	          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	        }
	      }

	      newObj.default = obj;
	      return newObj;
	    }
	  }

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  const defaults = {};

	  var type = "scatter";

	  /** 
	   * @static
	   * @augments Serie
	   * @example graph.newSerie( name, options, "scatter" );
	   * @see Graph#newSerie
	   */
	  class SerieScatter extends _graph2.default {

	    constructor() {
	      super(...arguments);
	    }

	    /**
	     * Initializes the series
	     * @private
	     */
	    init(graph, name, options) {

	      var self = this;

	      this.graph = graph;
	      this.name = name;

	      this.id = Math.random() + Date.now();

	      this.shapes = []; // Stores all shapes

	      this.shown = true;
	      this.options = util.extend(true, {}, defaults, options);
	      this.data = [];

	      this.shapesDetails = [];
	      this.shapes = [];

	      this._type = type;

	      util.mapEventEmission(this.options, this);

	      this._isMinOrMax = {
	        x: {
	          min: false,
	          max: false
	        },
	        y: {
	          min: false,
	          max: false
	        }
	      };

	      this.groupPoints = document.createElementNS(this.graph.ns, 'g');
	      this.groupMain = document.createElementNS(this.graph.ns, 'g');

	      this.additionalData = {};

	      this.selectedStyleGeneral = {};
	      this.selectedStyleModifiers = {};

	      this.groupPoints.addEventListener('mouseover', function (e) {
	        var id = parseInt(e.target.parentElement.getAttribute('data-shapeid'));
	        self.emit("mouseover", id, self.data[id * 2], self.data[id * 2 + 1]);
	      });

	      this.groupPoints.addEventListener('mouseout', function (e) {
	        var id = parseInt(e.target.parentElement.getAttribute('data-shapeid'));
	        self.emit("mouseout", id, self.data[id * 2], self.data[id * 2 + 1]);
	      });

	      this.minX = Number.MAX_VALUE;
	      this.minY = Number.MAX_VALUE;
	      this.maxX = Number.MIN_VALUE;
	      this.maxY = Number.MIN_VALUE;

	      this.groupMain.appendChild(this.groupPoints);
	      this.currentAction = false;

	      if (this.initExtended1) {
	        this.initExtended1();
	      }

	      this.styles = {};
	      this.styles.unselected = {};
	      this.styles.selected = {};

	      this.styles.unselected.default = {
	        shape: 'circle',
	        cx: 0,
	        cy: 0,
	        r: 3,
	        stroke: 'transparent',
	        fill: "black"
	      };

	      this.styles.selected.default = {
	        shape: 'circle',
	        cx: 0,
	        cy: 0,
	        r: 4,
	        stroke: 'transparent',
	        fill: "black"
	      };
	    }

	    /** 
	     * Sets data to the serie. The data serie is the same one than for a line serie, however the object definition is not available here
	     * @see GraphSerie#setData
	     */
	    setData(data, oneDimensional, type) {

	      var z = 0,
	          x,
	          dx,
	          oneDimensional = oneDimensional || "2D",
	          type = type || 'float',
	          arr,
	          total = 0,
	          continuous;

	      this.empty();
	      this.shapesDetails = [];
	      this.shapes = [];

	      if (!data instanceof Array) {
	        return this;
	      }

	      if (data instanceof Array && !(data[0] instanceof Array) && typeof data[0] !== "object") {
	        // [100, 103, 102, 2143, ...]
	        oneDimensional = "1D";
	      }

	      var _2d = oneDimensional == "2D";

	      arr = this._addData(type, _2d ? data.length * 2 : data.length);

	      z = 0;

	      for (var j = 0, l = data.length; j < l; j++) {

	        if (_2d) {
	          arr[z] = data[j][0];
	          this._checkX(arr[z]);
	          z++;
	          arr[z] = data[j][1];
	          this._checkY(arr[z]);
	          z++;
	          total++;
	        } else {
	          // 1D Array
	          arr[z] = data[j];
	          this[j % 2 == 0 ? '_checkX' : '_checkY'](arr[z]);
	          z++;
	          total += j % 2 ? 1 : 0;
	        }
	      }

	      this.dataHasChanged();
	      this.graph.updateDataMinMaxAxes();

	      this.data = arr;

	      return this;
	    }

	    /** 
	     * Applies for x as the category axis
	     * @example serie.setData( { x: "someName", y: [ ...values ] } );
	     */
	    setDataCategory(data) {

	      for (var i in data) {

	        if (Array.isArray(data[i].y)) {

	          for (let j of data[i].y) {

	            this._checkY(j);
	          }
	        }
	      }

	      this.dataHasChanged();
	      this.graph.updateDataMinMaxAxes();

	      this.data = data;

	      return this;
	    }

	    /**
	     * Removes all DOM points
	     * @private
	     */
	    empty() {

	      while (this.groupPoints.firstChild) {
	        this.groupPoints.removeChild(this.groupPoints.firstChild);
	      }
	    }

	    getSymbolForLegend() {

	      if (this.symbol) {
	        return this.symbol;
	      }

	      var g = document.createElementNS(this.graph.ns, 'g');
	      g.setAttribute('data-shapeid', -1);
	      var shape = this.doShape(g, this.styles["unselected"].default);

	      var style = this.getStyle("unselected", -1, true);

	      for (var i in style[-1]) {
	        if (i == "shape") {
	          continue;
	        }
	        shape.setAttribute(i, style[-1][i]);
	      }

	      return g;
	    }

	    /**
	     * Sets style to the scatter points
	     * First argument is the style applied by default to all points
	     * Second argument is an array of modifiers that allows customization of any point of the scatter plot. Data for each elements of the array will augment <code>allStyles</code>, so be sure to reset the style if needed.
	     * All parameters - except <code>shape</code> - will be set as parameters to the DOM element of the shape
	     *
	     * @example
	     * var modifiers = [];
	     * modifiers[ 20 ] = { shape: 'circle', r: 12, fill: 'rgba(0, 100, 255, 0.3)', stroke: 'rgb(0, 150, 255)' };
	     * serie.setStyle( { shape: 'circle', r: 2, fill: 'rgba(255, 0, 0, 0.3)', stroke: 'rgb(255, 100, 0)' }, modifiers ); // Will modify scatter point n°20
	     *
	     * @param {Object} allStyles - The general style for all markers
	     * @param {Object} [ modifiers ] - The general style for all markers
	     * @param {String} [ selectionMode="unselected" ] - The selection mode to which this style corresponds. Default is unselected
	     *
	     */
	    setStyle(all, modifiers, mode) {

	      if (typeof modifiers == "string") {
	        mode = modifiers;
	        modifiers = false;
	      }

	      if (mode === undefined) {
	        mode = "unselected";
	      }
	      /*
	      if( ! this.styles[ mode ] ) {
	       }
	       if ( mode !== "selected" && mode !== "unselected" ) {
	        throw "Style mode is not correct. Should be selected or unselected";
	      }
	      */
	      this.styles[mode] = this.styles[mode] || {};
	      this.styles[mode].all = all;
	      this.styles[mode].modifiers = modifiers;

	      this.styleHasChanged(mode);

	      return this;
	    }

	    /**
	     * Redraws the serie
	     * @private
	     * @param {force} Boolean - Forces redraw even if the data hasn't changed
	     */
	    draw(force) {
	      // Serie redrawing

	      if (!force && !this.hasDataChanged() && !this.hasStyleChanged('unselected')) {
	        return;
	      }

	      var x,
	          y,
	          xpx,
	          ypx,
	          j = 0,
	          k,
	          m,
	          currentLine,
	          max,
	          self = this;

	      var isCategory = this.getXAxis().getType() == 'category';

	      this._drawn = true;

	      this.dataHasChanged(false);
	      this.styleHasChanged(false);

	      this.groupMain.removeChild(this.groupPoints);

	      var incrXFlip = 0;
	      var incrYFlip = 1;

	      if (this.getFlip()) {
	        incrXFlip = 1;
	        incrYFlip = 0;
	      }

	      var totalLength = this.data.length / 2;
	      var keys = [];

	      j = 0;
	      k = 0;
	      m = this.data.length;

	      if (this.error) {
	        this.errorDrawInit();
	      }

	      if (isCategory) {

	        let k = 0;

	        for (; j < m; j += 1) {

	          if (!this.categoryIndices.hasOwnProperty(this.data[j].x)) {
	            continue;
	          }

	          //     let position = calculatePosition( categoryNumber, this.order, this.nbSeries, this.categories.length );

	          //xpx = this.getX( categoryNumber );

	          let ys = this.data[j].y,
	              l = ys.length,
	              i = 0;

	          if (this.error) {
	            //   this.errorAddPoint( j, position[ 0 ] + position[ 1 ] / 2, 0, this.getX( position[ 0 ] + position[ 1 ] / 2 ), ypx );
	          }

	          for (let y of this.data[j].y) {

	            //let xpos = i / ( l - 1 ) * ( position[ 1 ] ) + position[ 0 ];
	            let xpos = i / (l - 1) * (0.8 / this.nbCategories) + this.categoryIndices[this.data[j].x] + 0.1 / this.nbCategories;

	            ypx = this.getY(y);
	            xpx = this.getX(xpos);
	            i++;

	            this.shapesDetails[k] = this.shapesDetails[k] || [];
	            this.shapesDetails[k][0] = xpx;
	            this.shapesDetails[k][1] = ypx;
	            keys.push(k);
	            k++;
	          }
	        }
	      } else {
	        for (; j < m; j += 2) {

	          if (this.data[j + incrXFlip] < this.getXAxis().getCurrentMin() || this.data[j + incrXFlip] > this.getXAxis().getCurrentMax() || this.data[j + incrYFlip] < this.getYAxis().getCurrentMin() || this.data[j + incrYFlip] > this.getYAxis().getCurrentMax()) {
	            continue;
	          }

	          xpx = this.getX(this.data[j + incrXFlip]);
	          ypx = this.getY(this.data[j + incrYFlip]);

	          if (this.error) {
	            this.errorAddPoint(j, this.data[j + incrXFlip], this.data[j + incrYFlip], xpx, ypx);
	          }

	          this.shapesDetails[j / 2] = this.shapesDetails[j / 2] || [];
	          this.shapesDetails[j / 2][0] = xpx;
	          this.shapesDetails[j / 2][1] = ypx;
	          keys.push(j / 2);

	          //this.shapes[ j / 2 ] = this.shapes[ j / 2 ] ||  undefined;
	        }
	      }

	      if (this.error) {
	        this.errorDraw();
	      }

	      // This will automatically create the shapes      
	      this.applyStyle("unselected", keys);

	      this.groupMain.appendChild(this.groupPoints);
	    }

	    _addPoint(xpx, ypx, k) {

	      var g = document.createElementNS(this.graph.ns, 'g');
	      g.setAttribute('transform', 'translate(' + xpx + ', ' + ypx + ')');
	      g.setAttribute('data-shapeid', k);

	      if (this.extraStyle && this.extraStyle[k]) {

	        shape = this.doShape(g, this.extraStyle[k]);
	      } else if (this.stdStylePerso) {

	        shape = this.doShape(g, this.stdStylePerso);
	      } else {

	        shape = this.doShape(g, this.stdStyle);
	      }

	      this.shapes[k] = shape;
	      this.groupPoints.appendChild(g);
	    }

	    doShape(group, shape) {
	      var el = document.createElementNS(this.graph.ns, shape.shape);
	      group.appendChild(el);
	      return el;
	    }

	    getStyle(selection, index, noSetPosition) {

	      var selection = selection || 'unselected';
	      var indices;

	      var styles = {};

	      if (typeof index == "number") {
	        indices = [index];
	      } else if (Array.isArray(index)) {
	        indices = index;
	      }

	      var shape, index, modifier, style, j; // loop variables
	      var styleAll;

	      if (this.styles[selection].all !== undefined) {

	        styleAll = this.styles[selection].all;

	        if (typeof styleAll == "function") {

	          styleAll = styleAll();
	        } else if (styleAll === false) {

	          styleAll = {};
	        }
	      }

	      var i = 0,
	          l = indices.length;

	      for (; i < l; i++) {

	        index = indices[i];
	        shape = this.shapes[index];

	        if ((modifier = this.styles[selection].modifiers) && (typeof modifier == "function" || modifier[index])) {

	          if (typeof modifier == "function") {

	            style = modifier(index, shape);
	          } else if (modifier[index]) {

	            style = modifier[index];
	          }

	          var tmp = util.extend({}, styleAll, style);
	          style = util.extend(style, tmp);
	        } else if (styleAll !== undefined) {

	          style = styleAll;
	        } else {

	          style = this.styles[selection].default;
	        }

	        if (!shape) {
	          // Shape doesn't exist, let's create it

	          var g = document.createElementNS(this.graph.ns, 'g');
	          g.setAttribute('data-shapeid', index);
	          this.shapes[index] = this.doShape(g, style);
	          this.groupPoints.appendChild(g);
	          shape = this.shapes[index];
	        }

	        if (!noSetPosition) {
	          shape.parentNode.setAttribute('transform', 'translate(' + this.shapesDetails[index][0] + ', ' + this.shapesDetails[index][1] + ')');
	        }

	        styles[index] = style;
	      }

	      return styles;
	    }

	    applyStyle(selection, index, noSetPosition) {

	      var i, j;
	      var styles = this.getStyle(selection, index, noSetPosition);

	      for (i in styles) {

	        for (j in styles[i]) {

	          if (j !== "shape") {

	            if (styles[i][j]) {

	              this.shapes[i].setAttribute(j, styles[i][j]);
	            } else {

	              this.shapes[i].removeAttribute(j);
	            }
	          }
	        }
	      }
	    }

	    unselectPoint(index) {
	      this.selectPoint(index, false);
	    }

	    selectPoint(index, setOn, selectionType) {

	      if (this.shapesDetails[index][2] && this.shapesDetails[index][2] == selectionType) {
	        return;
	      }

	      if (typeof setOn == "string") {
	        selectionType = setOn;
	        setOn = undefined;
	      }

	      if (Array.isArray(index)) {
	        return this.selectPoints(index);
	      }

	      if (this.shapes[index] && this.shapesDetails[index]) {

	        if ((this.shapesDetails[index][2] || setOn === false) && setOn !== true) {

	          var selectionStyle = this.shapesDetails[index][2];
	          this.shapesDetails[index][2] = false;

	          var allStyles = this.getStyle(selectionStyle, index, true);
	          for (var i in allStyles[index]) {
	            this.shapes[index].removeAttribute(i);
	          }

	          this.applyStyle("unselected", index, true);
	        } else {

	          selectionType = selectionType || "selected";
	          this.shapesDetails[index][2] = selectionType;

	          this.applyStyle(selectionType, index, true);
	        }
	      }
	    }

	    getUsedCategories() {

	      if (typeof this.data[0] == 'object') {
	        return this.data.map(d => d.x);
	      }

	      return [];
	    }

	  }

	  util.mix(SerieScatter, _graphMixin2.default);

	  exports.default = SerieScatter;
	});

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(12), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('./graph.serie'), require('../graph.util'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.graph, global.graph);
	    global.graphSerieZone = mod.exports;
	  }
	})(this, function (exports, _graph, _graph3) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _graph2 = _interopRequireDefault(_graph);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  /**
	   * @name SerieZoneDefaultOptions
	   * @object
	   * @static
	   * @param {String} fillColor - The color to fill the zone with
	   * @param {String} lineColor - The line color
	   * @param {String} lineWidth - The line width (in px)
	   */
	  const defaults = {
	    fillColor: 'rgba( 0, 0, 0, 0.1 )',
	    lineColor: 'rgba( 0, 0, 0, 1 )',
	    lineWidth: '1px'
	  };
	  /** 
	   * @static
	   * @extends Serie
	   * @example graph.newSerie( name, options, "scatter" );
	   * @see Graph#newSerie
	   */
	  class SerieZone extends _graph2.default {

	    constructor() {
	      super(...arguments);
	    }

	    init(graph, name, options) {

	      var self = this;

	      this.graph = graph;
	      this.name = name;

	      this.selectionType = "unselected";

	      this.id = Math.random() + Date.now();

	      this.shown = true;
	      this.options = (0, _graph3.extend)(true, {}, defaults, options);
	      this.data = [];

	      this.groupZones = document.createElementNS(this.graph.ns, 'g');
	      this.groupMain = document.createElementNS(this.graph.ns, 'g');

	      this.lineZone = document.createElementNS(this.graph.ns, 'path');
	      this.lineZone.setAttribute('stroke', 'black');
	      this.lineZone.setAttribute('stroke-width', '1px');

	      this.additionalData = {};

	      this.minX = Number.MAX_VALUE;
	      this.minY = Number.MAX_VALUE;
	      this.maxX = Number.MIN_VALUE;
	      this.maxY = Number.MIN_VALUE;

	      this.groupMain.appendChild(this.groupZones);

	      this.groupZones.appendChild(this.lineZone);

	      this.currentAction = false;

	      this.applyLineStyle(this.lineZone);
	      this.styleHasChanged();

	      this.clip = document.createElementNS(this.graph.ns, 'clipPath');
	      this.clipId = (0, _graph3.guid)();
	      this.clip.setAttribute('id', this.clipId);

	      this.graph.defs.appendChild(this.clip);

	      this.clipRect = document.createElementNS(this.graph.ns, 'rect');
	      this.clip.appendChild(this.clipRect);
	      this.clip.setAttribute('clipPathUnits', 'userSpaceOnUse');

	      this.groupMain.setAttribute('clip-path', 'url(#' + this.clipId + ')');
	    }

	    /**
	     * Sets the data
	     */
	    setData(data, arg, type) {

	      var z = 0,
	          x,
	          dx,
	          arg = arg || "2D",
	          type = type || 'float',
	          arr,
	          total = 0,
	          continuous;

	      this.data = [];
	      this.dataHasChanged();

	      if (!data instanceof Array) {
	        return;
	      }

	      var length;

	      if (data instanceof Array && !(data[0] instanceof Array)) {
	        // [100, 103, 102, 2143, ...]
	        arg = "1D";
	        length = data.length * 1.5;

	        if (!(data[1] instanceof Array)) {
	          arg = "1D_flat";
	          length = data.length * 1;
	        }
	      } else {

	        if (data instanceof Array && !(data[0][1] instanceof Array)) {
	          // [100, 103, 102, 2143, ...]
	          arg = "2D_flat";
	          length = data.length * 3;
	        } else {
	          arg = "2D";
	          length = data.length * 3;
	        }
	      }

	      arr = this._addData(type, length);

	      z = 0;

	      for (var j = 0, l = data.length; j < l; j++) {

	        if (arg == "2D" || arg == "2D_flat") {

	          arr[z] = data[j][0];
	          this._checkX(arr[z]);
	          z++;

	          if (arg == "2D") {

	            arr[z] = data[j][1][0];
	            this._checkY(arr[z]);
	            z++;
	            total++;

	            arr[z] = data[j][1][1];
	            this._checkY(arr[z]);
	            z++;
	            total++;
	          } else {

	            arr[z] = data[j][1];
	            this._checkY(arr[z]);
	            z++;
	            total++;

	            arr[z] = data[j][2];
	            this._checkY(arr[z]);
	            z++;
	            total++;
	          }
	        } else if (arg == "1D_flat") {
	          // 1D Array

	          if (j % 3 == 0) {
	            arr[z] = data[j];
	            this._checkX(arr[z]);
	            z++;
	            total++;

	            continue;
	          }

	          arr[z] = data[j];
	          this._checkY(arr[z]);
	          z++;
	          total++;
	        } else {

	          if (j % 2 == 0) {
	            arr[z] = data[j];
	            this._checkX(arr[z]);
	            z++;
	            total++;
	            continue;
	          }

	          arr[z] = data[j][0];
	          this_checkY(arr[z]);
	          z++;
	          total++;

	          arr[z] = data[j][1];
	          this_checkY(arr[z]);
	          z++;
	          total++;
	        }
	      }

	      this.graph.updateDataMinMaxAxes();
	      this.data = arr;
	      this.dataHasChanged();

	      return this;
	    }

	    _addData(type, howmany) {

	      switch (type) {
	        case 'int':
	          var size = howmany * 4; // 4 byte per number (32 bits)
	          break;
	        case 'float':
	          var size = howmany * 8; // 4 byte per number (64 bits)
	          break;
	      }

	      var arr = new ArrayBuffer(size);

	      switch (type) {
	        case 'int':
	          return new Int32Array(arr);
	          break;

	        default:
	        case 'float':
	          return new Float64Array(arr);
	          break;
	      }
	    }

	    /**
	     * Removes all the dom concerning this serie from the drawing zone
	     */
	    empty() {

	      while (this.group.firstChild) {
	        this.group.removeChild(this.group.firstChild);
	      }
	    }

	    /**
	     * Redraws the serie
	     * @private
	     *
	     * @param {force} Boolean - Forces redraw even if the data hasn't changed
	     */
	    draw(force) {
	      // Serie redrawing

	      if (force || this.hasDataChanged()) {

	        var x,
	            y,
	            xpx,
	            ypx1,
	            ypx2,
	            j = 0,
	            k,
	            m,
	            currentLine,
	            max,
	            self = this;

	        var xmin = this.getXAxis().getMinPx(),
	            xmax = this.getXAxis().getMaxPx(),
	            ymin = this.getYAxis().getMinPx(),
	            ymax = this.getYAxis().getMaxPx();

	        this.clipRect.setAttribute("x", Math.min(xmin, xmax));
	        this.clipRect.setAttribute("y", Math.min(ymin, ymax));
	        this.clipRect.setAttribute("width", Math.abs(xmax - xmin));
	        this.clipRect.setAttribute("height", Math.abs(ymax - ymin));

	        this._drawn = true;

	        this.groupMain.removeChild(this.groupZones);

	        var totalLength = this.data.length / 2;

	        j = 0;
	        k = 0;
	        m = this.data.length;

	        var error;

	        var lineTop = "";
	        var lineBottom = "";

	        var buffer;

	        for (; j < m; j += 3) {

	          xpx = this.getX(this.data[j]);
	          ypx1 = this.getY(this.data[j + 1]);
	          ypx2 = this.getY(this.data[j + 2]);

	          if (xpx < 0) {
	            buffer = [xpx, ypx1, ypx2];
	            continue;
	          }

	          if (buffer) {

	            if (lineBottom !== "") {
	              lineBottom = " L " + lineBottom;
	            }

	            lineTop += buffer[0] + "," + Math.max(buffer[1], buffer[2]) + " L ";
	            lineBottom = xpx + "," + Math.min(buffer[1], buffer[2]) + lineBottom;

	            buffer = false;
	            k++;
	          }

	          if (lineBottom !== "") {
	            lineBottom = " L " + lineBottom;
	          }

	          if (ypx2 > ypx1) {
	            lineTop += xpx + "," + ypx1 + " L ";
	            lineBottom = xpx + "," + ypx2 + lineBottom;
	          } else {
	            lineTop += xpx + "," + ypx2 + " L ";
	            lineBottom = xpx + "," + ypx1 + lineBottom;
	          }

	          if (xpx > this.getXAxis().getMaxPx()) {
	            break;
	          }
	        }

	        if (lineTop.length > 0 && lineBottom.length > 0) {
	          this.lineZone.setAttribute('d', "M " + lineTop + lineBottom + " z");
	        } else {
	          this.lineZone.setAttribute('d', "");
	        }

	        this.groupMain.appendChild(this.groupZones);
	      }

	      if (this.hasStyleChanged(this.selectionType)) {
	        this.applyLineStyle(this.lineZone);
	        this.styleHasChanged(false);
	      }
	    }

	    /**
	     * Applies the computed style to the DOM element fed as a parameter
	     * @private
	     *
	     * @param {SVGLineElement} line - The line to which the style has to be applied to
	     */
	    applyLineStyle(line) {

	      line.setAttribute('stroke', this.getLineColor());
	      line.setAttribute('stroke-width', this.getLineWidth());
	      line.setAttribute('fill', this.getFillColor());
	      line.setAttribute('fill-opacity', this.getFillOpacity());
	      line.setAttribute('stroke-opacity', this.getLineOpacity());
	    }

	    /**
	     * Sets the line width
	     *
	     * @param {Number} width - The line width
	     * @returns {SerieZone} - The current serie
	     */
	    setLineWidth(width) {
	      this.options.lineWidth = width;
	      this.styleHasChanged();
	      return this;
	    }

	    /**
	     * Gets the line width
	     *
	     * @returns {Number} - The line width
	     */
	    getLineWidth() {
	      return this.options.lineWidth;
	    }

	    /**
	     * Sets the line opacity
	     *
	     * @param {Number} opacity - The line opacity
	     * @returns {SerieZone} - The current serie
	     */
	    setLineOpacity(opacity) {
	      this.options.lineOpacity = opacity;
	      this.styleHasChanged();
	      return this;
	    }

	    /**
	     * Gets the line opacity
	     *
	     * @returns {Number} - The line opacity
	     */
	    getLineOpacity() {
	      return this.options.lineOpacity;
	    }

	    /**
	     * Sets the line color
	     *
	     * @param {String} color - The line color
	     * @returns {SerieZone} - The current serie
	     */
	    setLineColor(color) {
	      this.options.lineColor = color;
	      this.styleHasChanged();
	      return this;
	    }

	    /**
	     * Gets the line width
	     *
	     * @returns {Number} - The line width
	     */
	    getLineColor() {
	      return this.options.lineColor;
	    }

	    /**
	     * Sets the fill opacity
	     *
	     * @param {Number} opacity - The fill opacity
	     * @returns {SerieZone} - The current serie
	     */
	    setFillOpacity(opacity) {
	      this.options.fillOpacity = opacity;
	      this.styleHasChanged();
	      return this;
	    }

	    /**
	     * Gets the fill opacity
	     *
	     * @returns {Number} - The fill opacity
	     */
	    getFillOpacity() {
	      return this.options.fillOpacity;
	    }

	    /**
	     * Sets the fill color
	     *
	     * @param {Number} width - The line width
	     * @returns {Number} - The line width
	     */
	    setFillColor(color) {
	      this.options.fillColor = color;
	      this.styleHasChanged();
	      return this;
	    }

	    /**
	     * Gets the fill color
	     *
	     * @returns {Number} - The fill color
	     */
	    getFillColor() {
	      return this.options.fillColor;
	    }

	    /**
	     * Gets the maximum value of the y values between two x values. The x values must be monotoneously increasing
	     * @param {Number} startX - The start of the x values
	     * @param {Number} endX - The end of the x values
	     * @returns {Number} Maximal y value in between startX and endX
	     */
	    getMax(start, end) {

	      var start2 = Math.min(start, end),
	          end2 = Math.max(start, end),
	          v1 = this.searchClosestValue(start2),
	          v2 = this.searchClosestValue(end2),
	          i,
	          j,
	          max = -Infinity,
	          initJ,
	          maxJ;

	      //      console.log( start2, end2, v1, v2 );

	      if (!v1) {
	        start2 = this.minX;
	        v1 = this.searchClosestValue(start2);
	      }

	      if (!v2) {
	        end2 = this.maxX;
	        v2 = this.searchClosestValue(end2);
	      }

	      if (!v1 || !v2) {
	        return -Infinity;
	      }

	      for (i = v1.dataIndex; i <= v2.dataIndex; i++) {
	        initJ = i == v1.dataIndex ? v1.xBeforeIndexArr : 0;
	        maxJ = i == v2.dataIndex ? v2.xBeforeIndexArr : this.data[i].length;

	        for (j = initJ; j <= maxJ; j += 3) {
	          max = Math.max(max, this.data[i][j + 1], this.data[i][j + 2]);
	        }
	      }

	      return max;
	    }

	    /**
	     * Gets the minimum value of the y values between two x values. The x values must be monotoneously increasing
	     * @param {Number} startX - The start of the x values
	     * @param {Number} endX - The end of the x values
	     * @returns {Number} Maximal y value in between startX and endX
	     */
	    getMin(start, end) {

	      var start2 = Math.min(start, end),
	          end2 = Math.max(start, end),
	          v1 = this.searchClosestValue(start2),
	          v2 = this.searchClosestValue(end2),
	          i,
	          j,
	          min = Infinity,
	          initJ,
	          maxJ;

	      if (!v1) {
	        start2 = this.minX;
	        v1 = this.searchClosestValue(start2);
	      }

	      if (!v2) {
	        end2 = this.maxX;
	        v2 = this.searchClosestValue(end2);
	      }

	      if (!v1 || !v2) {
	        return Infinity;
	      }

	      for (i = v1.dataIndex; i <= v2.dataIndex; i++) {
	        initJ = i == v1.dataIndex ? v1.xBeforeIndexArr : 0;
	        maxJ = i == v2.dataIndex ? v2.xBeforeIndexArr : this.data[i].length;

	        for (j = initJ; j <= maxJ; j += 3) {
	          min = Math.min(min, this.data[i][j + 1], this.data[i][j + 2]);
	        }
	      }

	      return min;
	    }

	    /**
	     * Performs a binary search to find the closest point index to an x value. For the binary search to work, it is important that the x values are monotoneous.
	     * @param {Number} valX - The x value to search for
	     * @returns {Object} Index in the data array of the closest (x,y) pair to the pixel position passed in parameters
	     */
	    searchClosestValue(valX) {

	      var xMinIndex;

	      for (var i = 0; i < this.data.length; i++) {

	        if (valX <= this.data[i][this.data[i].length - 3] && valX >= this.data[i][0]) {
	          xMinIndex = this._searchBinary(valX, this.data[i], false);
	        } else if (valX >= this.data[i][this.data[i].length - 3] && valX <= this.data[i][0]) {
	          xMinIndex = this._searchBinary(valX, this.data[i], true);
	        } else {
	          continue;
	        }

	        return {
	          dataIndex: i,
	          xMin: this.data[i][xMinIndex],
	          xMax: this.data[i][xMinIndex + 3],
	          yMin: this.data[i][xMinIndex + 1],
	          yMax: this.data[i][xMinIndex + 4],
	          xBeforeIndex: xMinIndex / 3,
	          xAfterIndex: xMinIndex / 3 + 1,
	          xBeforeIndexArr: xMinIndex,
	          xClosest: (Math.abs(this.data[i][xMinIndex + 3] - valX) < Math.abs(this.data[i][xMinIndex] - valX) ? xMinIndex + 3 : xMinIndex) / 2
	        };
	      }
	    }

	    _searchBinary(target, haystack, reverse) {
	      var seedA = 0,
	          length = haystack.length,
	          seedB = length - 3;

	      if (haystack[seedA] == target) return seedA;

	      if (haystack[seedB] == target) return seedB;

	      var seedInt;
	      var i = 0;

	      while (true) {
	        i++;
	        if (i > 100) {
	          throw "Error loop";
	        }

	        seedInt = (seedA + seedB) / 3;
	        seedInt -= seedInt % 3; // Always looks for an x.

	        if (seedInt == seedA || haystack[seedInt] == target) return seedInt;

	        //    console.log(seedA, seedB, seedInt, haystack[seedInt]);
	        if (haystack[seedInt] <= target) {
	          if (reverse) seedB = seedInt;else seedA = seedInt;
	        } else if (haystack[seedInt] > target) {
	          if (reverse) seedA = seedInt;else seedB = seedInt;
	        }
	      }
	    }

	  }

	  exports.default = SerieZone;
	});

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(12), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('./graph.serie'), require('../graph.util'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.graph, global.graph);
	    global.graphSerieDensitymap = mod.exports;
	  }
	})(this, function (exports, _graph, _graph3) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _graph2 = _interopRequireDefault(_graph);

	  var util = _interopRequireWildcard(_graph3);

	  function _interopRequireWildcard(obj) {
	    if (obj && obj.__esModule) {
	      return obj;
	    } else {
	      var newObj = {};

	      if (obj != null) {
	        for (var key in obj) {
	          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	        }
	      }

	      newObj.default = obj;
	      return newObj;
	    }
	  }

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  /**
	   * @name SerieDensityMapDefaultOptions
	   * @object
	   * @static
	   * @memberof SerieDensityMap
	   */
	  const defaults = {};

	  /** 
	   * Density map serie
	   * @example graph.newSerie( name, options, "densitymap" );
	   * @see Graph#newSerie
	   * @augments Serie
	   */
	  class SerieDensityMap extends _graph2.default {

	    /**
	     * Initializes the serie
	     * @private
	     * @memberof SerieDensityMap
	     */
	    init(graph, name, options) {

	      this.options = util.extend(true, {}, defaults, options || {}); // Creates options
	      util.mapEventEmission(this.options, this); // Register events

	      this.graph = graph;
	      this.groupMain = document.createElementNS(this.graph.ns, 'g');

	      this.rects = [];
	      this.paths = [];

	      this.recalculateBinsOnDraw = false;
	    }

	    /**
	     * Sets the data of the serie. Careful, only one format allowed for now.
	     * @memberof SerieDensityMap
	     * @param {Array} data - A vector containing 2-elements arrays
	     * @return {SerieDensityMap} The current instance
	     * @example serie.setData( [ [ x1, y1 ], [ x2, y2 ], ..., [ xn, yn ] ] );
	     */
	    setData(data) {

	      this.minX = this.maxX = this.minY = this.maxY = 0;
	      var i = 0,
	          l = data.length;
	      this.data = data;

	      this.minX = Number.POSITIVE_INFINITY;
	      this.minY = Number.POSITIVE_INFINITY;
	      this.maxX = Number.NEGATIVE_INFINITY;
	      this.maxY = Number.NEGATIVE_INFINITY;

	      for (i = 0; i < l; i++) {
	        this._checkX(data[i][0]);
	        this._checkY(data[i][1]);
	      }

	      this.dataHasChanged();
	      this.graph.updateDataMinMaxAxes();

	      return this;
	    }

	    /**
	     * Calculates the bins from the (x,y) dataset
	     * @memberof SerieDensityMap
	     * @param {Number} fromX - The first x element to consider
	     * @param {Number} deltaX - The x spacing between two bins
	     * @param {Number} numX - The number of x bins
	     * @param {Number} fromY - The first y element to consider
	     * @param {Number} deltaY - The y spacing between two bins
	     * @param {Number} numY - The number of y bins
	     * @return {Array} The generated density map
	     * @see SerieDensityMap#autoBins
	     * @see SerieDensityMap#autoColorMapBinBoundaries
	     * @see SerieDensityMap#setPxPerBin
	     */
	    calculateDensity(fromX, deltaX, numX, fromY, deltaY, numY) {

	      var densitymap = [],
	          i,
	          l = this.data.length,
	          indexX,
	          indexY;

	      var binMin = Number.POSITIVE_INFINITY;
	      var binMax = Number.NEGATIVE_INFINITY;

	      for (i = 0; i < l; i++) {
	        indexX = ~~((this.data[i][0] - fromX) / deltaX);
	        indexY = ~~((this.data[i][1] - fromY) / deltaY);

	        if (indexX > numX || indexY > numY || indexX < 0 || indexY < 0) {
	          continue;
	        }

	        densitymap[indexX] = densitymap[indexX] || [];
	        densitymap[indexX][indexY] = densitymap[indexX][indexY] + 1 || 1;

	        binMin = densitymap[indexX][indexY] < binMin ? densitymap[indexX][indexY] : binMin;
	        binMax = densitymap[indexX][indexY] > binMax ? densitymap[indexX][indexY] : binMax;
	        //binMax = Math.max( binMax, densitymap[ indexX ][ indexY ] );
	      }

	      this.maxIndexX = numX;
	      this.maxIndexY = numY;

	      this.binMin = binMin;
	      this.binMax = binMax;

	      this.deltaX = deltaX;
	      this.deltaY = deltaY;

	      this.fromX = fromX;
	      this.fromY = fromY;

	      this.numX = numX;
	      this.numY = numY;

	      this.densitymap = densitymap;
	      return densitymap;
	    }

	    /**
	     * Calculates the bins from the (x,y) dataset using bin weighing
	     * Will assign a set of (x,y) to the 4 neighbouring bins according to its exact position
	     * @memberof SerieDensityMap
	     * @param {Number} fromX - The first x element to consider
	     * @param {Number} deltaX - The x spacing between two bins
	     * @param {Number} numX - The number of x bins
	     * @param {Number} fromY - The first y element to consider
	     * @param {Number} deltaY - The y spacing between two bins
	     * @param {Number} numY - The number of y bins
	     * @return {Array} The generated density map
	     * @see SerieDensityMap#autoBins
	     * @see SerieDensityMap#autoColorMapBinBoundaries
	     * @see SerieDensityMap#setPxPerBin
	     */
	    calculateDensityWeighted(fromX, deltaX, numX, fromY, deltaY, numY) {

	      var densitymap = [],
	          i,
	          l = this.data.length,
	          indexX,
	          indexY;

	      var binMin = Number.POSITIVE_INFINITY;
	      var binMax = Number.NEGATIVE_INFINITY;

	      var compX, compY;
	      var exactX, exactY;
	      var indexXLow, indexXHigh, indexYLow, indexYHigh;

	      for (i = 0; i < l; i++) {
	        exactX = (this.data[i][0] - fromX) / deltaX - 0.5;
	        exactY = (this.data[i][1] - fromY) / deltaY - 0.5;

	        indexX = Math.floor(exactX);
	        indexY = Math.floor(exactY);

	        indexXLow = indexX; //Math.floor( exactX );
	        indexYLow = indexY; //Math.floor( exactY );

	        indexXHigh = indexX + 1; //Math.ceil( exactX );
	        indexYHigh = indexY + 1; //Math.ceil( exactY );

	        compX = 1 - (exactX - indexX);
	        compY = 1 - (exactY - indexY);

	        //console.log( exactY, indexY );
	        //console.log( compY, indexYLow, indexYHigh );
	        if (indexX > numX || indexY > numY || indexX < 0 || indexY < 0) {
	          continue;
	        }

	        densitymap[indexXLow] = densitymap[indexXLow] || [];
	        densitymap[indexXHigh] = densitymap[indexXHigh] || [];

	        densitymap[indexXLow][indexYLow] = densitymap[indexXLow][indexYLow] || 0;
	        densitymap[indexXHigh][indexYLow] = densitymap[indexXHigh][indexYLow] || 0;
	        densitymap[indexXLow][indexYHigh] = densitymap[indexXLow][indexYHigh] || 0;
	        densitymap[indexXHigh][indexYHigh] = densitymap[indexXHigh][indexYHigh] || 0;

	        densitymap[indexXLow][indexYLow] += compX * compY;
	        densitymap[indexXHigh][indexYLow] += (1 - compX) * compY;
	        densitymap[indexXLow][indexYHigh] += compX * (1 - compY);
	        densitymap[indexXHigh][indexYHigh] += (1 - compX) * (1 - compY);

	        // A loop would be nicer, but would it be faster ?
	        binMin = densitymap[indexXLow][indexYLow] < binMin ? densitymap[indexXLow][indexYLow] : binMin;
	        binMax = densitymap[indexXLow][indexYLow] > binMax ? densitymap[indexXLow][indexYLow] : binMax;
	        binMin = densitymap[indexXHigh][indexYLow] < binMin ? densitymap[indexXHigh][indexYLow] : binMin;
	        binMax = densitymap[indexXHigh][indexYLow] > binMax ? densitymap[indexXHigh][indexYLow] : binMax;
	        binMin = densitymap[indexXLow][indexYHigh] < binMin ? densitymap[indexXLow][indexYHigh] : binMin;
	        binMax = densitymap[indexXLow][indexYHigh] > binMax ? densitymap[indexXLow][indexYHigh] : binMax;
	        binMin = densitymap[indexXHigh][indexYHigh] < binMin ? densitymap[indexXHigh][indexYHigh] : binMin;
	        binMax = densitymap[indexXHigh][indexYHigh] > binMax ? densitymap[indexXHigh][indexYHigh] : binMax;

	        //binMax = Math.max( binMax, densitymap[ indexX ][ indexY ] );
	      }

	      this.maxIndexX = numX;
	      this.maxIndexY = numY;

	      this.binMin = binMin;
	      this.binMax = binMax;

	      this.deltaX = deltaX;
	      this.deltaY = deltaY;

	      this.fromX = fromX;
	      this.fromY = fromY;

	      this.numX = numX;
	      this.numY = numY;

	      this.densitymap = densitymap;
	      return densitymap;
	    }

	    /**
	     * Calculates the density map based on the minimum and maximum values found in the data array
	     * @memberof SerieDensityMap
	     * @param {Number} [ numX = 400 ] - The number of x bins
	     * @param {Number} [ numY = numX ] - The number of y bins
	     * @return {SerieDensityMap} The current instance
	     * @see SerieDensityMap#calculateDensity
	     */
	    autoBins(numX, numY) {

	      this.numX = numX || 400;
	      this.numY = numY || this.numX;

	      this.calculateDensity(this.minX, (this.maxX - this.minX) / numX, numX, this.minY, (this.maxY - this.minY) / numY, numY);

	      this.recalculateBinsOnDraw = false;

	      return this;
	    }

	    /**
	     * Only calculates the density map upon redraw based on the current state of the graph. In this mode, a fixed number of pixels per bin is used to calculate the number of bins and fed into 
	     * the calculation of the density map. In this method, the color map spans on the full scale of the density map values (i.e. a subrange cannot be defined, like you would do using {@link SerieDensityMap#setColorMapBinBoundaries}).
	     * @memberof SerieDensityMap
	     * @param {Number} pxPerBinX - The number of x bins per pixels. Should be an integer, but technically it doesn't have to
	     * @param {Number} pxPerBinY - The number of y bins per pixels. Should be an integer, but technically it doesn't have to
	     * @param {Boolean} weightedDensityMap - Whether jsGraph should use weighted density mapping or not
	     * @return {SerieDensityMap} The current instance
	     * @see SerieDensityMap#calculateDensity
	     */
	    setPxPerBin(pxPerBinX, pxPerBinY, weightedDensityMap) {

	      if (pxPerBinX) {
	        this.calculationDensityMap({
	          from: 'min',
	          to: 'max',
	          pxPerBin: pxPerBinX,
	          weighted: weightedDensityMap
	        });
	      }

	      if (pxPerBinY) {
	        this.calculationDensityMap(false, {
	          from: 'min',
	          to: 'max',
	          pxPerBin: pxPerBinY,
	          weighted: weightedDensityMap
	        });
	      }

	      return this;
	    }

	    /**
	     * Sets bins in the ```x``` or ```y``` direction based on a from value, a to value and a number of bins.
	     * @memberof SerieDensityMap
	     * @param {String} mode - ```x``` or ```y```
	     * @param {Number} from - The from value of the bin for the calculation with ```calculateDensityMap```
	     * @param {Number} to - The to value
	     * @param {Number} num - The number of bins
	     * @return {SerieDensityMap} The current instance
	     * @see SerieDensityMap#calculateDensity
	     */
	    setBinsFromTo(mode, from, to, num) {

	      this.densityMapCalculation = this.densityMapCalculation || {};

	      this.densityMapCalculation[mode] = {
	        from: from,
	        to: to,
	        numBins: num
	      };
	      this.calculationDensityMap();
	      return this;
	    }

	    calculationDensityMap(x, y) {

	      this.method = this.calculateDensityAdvanced;
	      this.densityMapCalculation = this.densityMapCalculation || {};

	      if (x) {
	        this.densityMapCalculation.x = x;
	      }

	      if (y) {
	        this.densityMapCalculation.y = y;
	      }
	    }

	    calculateDensityAdvanced() {

	      var results = {
	        x: {
	          from: 0,
	          num: 0,
	          delta: 0,
	          weighing: false
	        },

	        y: {
	          from: 0,
	          num: 0,
	          delta: 0,
	          weighing: false
	        }
	      };

	      var widthValues = {
	        x: this.graph.drawingSpaceWidth,
	        y: this.graph.drawingSpaceHeight
	      };
	      var axisGetter = {
	        x: this.getXAxis,
	        y: this.getYAxis
	      };

	      var weighing = false;

	      for (var i in this.densityMapCalculation) {

	        if (this.densityMapCalculation[i].weighted) {
	          weighing = true;
	          results[i].weighing = true;
	        }

	        if (this.densityMapCalculation[i].pxPerBin) {

	          // In value

	          var from = this.densityMapCalculation[i].from == 'min' ? axisGetter[i].call(this).getCurrentMin() : this.densityMapCalculation[i].from;
	          var to = this.densityMapCalculation[i].to == 'max' ? axisGetter[i].call(this).getCurrentMax() : this.densityMapCalculation[i].to;

	          // In px
	          var dimension = Math.abs(axisGetter[i].call(this).getRelPx(to - from));
	          results[i].num = Math.ceil(widthValues[i] / this.densityMapCalculation[i].pxPerBin);

	          //console.log( from, from - axisGetter[ i ].call( this ).getRelVal( ( results[ i ].num * this.densityMapCalculation[ i ].pxPerBin - dimension ) / 2 ), ( results[ i ].num * this.densityMapCalculation[ i ].pxPerBin - dimension ) / 2 );
	          results[i].from = from - Math.abs(axisGetter[i].call(this).getRelVal((results[i].num * this.densityMapCalculation[i].pxPerBin - dimension) / 2));
	          results[i].delta = Math.abs(axisGetter[i].call(this).getRelVal(this.densityMapCalculation[i].pxPerBin));
	        } else {

	          results[i].num = this.densityMapCalculation[i].numBins || 400;
	          results[i].from = this.densityMapCalculation[i].from == 'min' ? axisGetter[i].call(this).getCurrentMin() : this.densityMapCalculation[i].from;
	          results[i].delta = this.densityMapCalculation[i].to ? ((this.densityMapCalculation[i].to == 'max' ? axisGetter[i].call(this).getCurrentMax() : this.densityMapCalculation[i].to) - results[i].from) / results[i].num : this.densityMapCalculate[i].delta;
	        }

	        //      console.log( axisGetter[ i ].call( this ).getCurrentMin(), axisGetter[ i ].call( this ).getCurrentMax(), )
	      }
	      //console.log( this.getYAxis().getCurrentMin(), this.getYAxis().getCurrentMax(), this.graph.drawingSpaceHeight );

	      //console.log( this.densityMapCalculation );

	      (weighing ? this.calculateDensityWeighted : this.calculateDensity).call(this, results.x.from, results.x.delta, results.x.num, results.y.from, results.y.delta, results.y.num);
	    }

	    /**
	     * Selects a subrange of bins for the color mapping. There is no need to recalculate the color map after calling this method
	     * @memberof SerieDensityMap
	     * @param {Number} binMin - The minimum bin value
	     * @param {Number} binMax - The maximum bin value
	     * @return {SerieDensityMap} The current instance
	     * @example // In this case, all bins with values below binMin * 2 (the middle scale) will be rendered with the first color of the color map
	     * serie.setColorMapBinBoundaries( serie.binMin * 2, serie.binMax ); 
	     */
	    setColorMapBinBoundaries(min, max) {
	      this.colorMapMin = min;
	      this.colorMapMax = max;
	      return this;
	    }

	    /**
	     * Calls {@link SerieDensityMap#setColorMapBinBoundaries} using the minimum and maximum bin values calculated by {@link SerieDensityMap#calculateDensity}. This function must be called, since colorMinMap and colorMaxMap are not set automatically when the density map is calculated.
	     * @memberof SerieDensityMap
	     * @param {Number} binMin - The minimum bin value
	     * @param {Number} binMax - The maximum bin value
	     * @return {SerieDensityMap} The current instance
	     */
	    autoColorMapBinBoundaries() {
	      this.colorMapMin = this.binMin;
	      this.colorMapMax = this.binMax;
	      return this;
	    }

	    /**
	     * Allows the use of a callback to determine the color map min and max value just before the density map is redrawn. This is very useful when the density map is recalculate before redraw, such as in the case where bins per pixels are used
	     * @memberof SerieDensityMap
	     * @param {(String|Function)} callback - The callback function to call. Should return an array with two elements ```[ colorMapMin, colorMapMax ]```. This parameter can also take the value ```auto```, in which case ```autoColorMapBinBoundaries``` will be called before redraw
	     * @return {SerieDensityMap} The current instance
	     */
	    onRedrawColorMapBinBoundaries(callback) {
	      this.callbackColorMapMinMax = callback;
	      return this;
	    }

	    /**
	     * Generates a color map based on a serie of HSL(A) values. 
	     * @summary Colors can scale linearly, logarithmically (enhances short range differences) or exponentially (enhances long range differences).
	     * One word of advice though. SVG being not canvas, jsGraph has to create a path for each color value of the color map. In other words, if you're asking for 16-bit coloring (65536 values), 65536 SVG paths will be created and your browser will start to suffer from it.
	     * As of now, all the colors in colorStops will be places at equal distances from each other between <code>colorMapMin</code> and <code>colorMapMax</code> set by {@link autoColorMapBinBoundaries} or {@link setColorMapBinBoundaries}
	     * @memberof SerieDensityMap
	     * @param {Array<Object>} colorStops - An array of objects, each having the following format: <code>{ h: [ 0-360], s: 0-1, l: 0-1, a: 0-1}</code>
	     * @param {Number} numColors - The number of colors to compute.
	     * @param {String} [ method = "linear" ] - The method to use to calculate the density map: <code>linear</code>, <code>exp</code>, or <code>log</code>
	     * @return {SerieDensityMap} The current instance
	     */
	    colorMapHSL(colorStops, numColors, method) {

	      method = method || "linear";

	      var methods = {
	        "exp": function (value) {
	          return (Math.exp(value / numColors * 1) - Math.exp(0)) / (Math.exp(1) - Math.exp(0));
	        },
	        "log": function (value) {
	          return (Math.log(value + 1) - Math.log(1)) / (Math.log(numColors + 1) - Math.log(1));
	        },
	        "linear": function (value) {
	          return (value - 0) / (numColors - 0);
	        }
	      };

	      var k = 0,
	          colorMap = [],
	          opacities = [];

	      var color = {
	        h: null,
	        s: null,
	        l: null,
	        a: null
	      };

	      var ratio, first;

	      var slices = colorStops.length - 1;

	      for (var i = 0; i <= numColors; i++) {

	        ratio = methods[method](i);

	        first = Math.floor(ratio * slices);

	        if (first == colorStops.length - 1) {
	          // Handle 1
	          first = slices - 1;
	        }

	        ratio = (ratio - first / slices) / (1 / slices);

	        for (var j in color) {
	          color[j] = (colorStops[first + 1][j] - colorStops[first][j]) * ratio + colorStops[first][j];
	        }

	        colorMap[k] = "hsl(" + color.h + ", " + Math.round(color.s * 100) + "%, " + Math.round(color.l * 100) + "%)"; //this.HSVtoRGB( color.h, color.s, color.v );
	        opacities[k] = color.a;
	        k++;
	      }

	      this.opacities = opacities;
	      this.colorMap = colorMap;
	      this.colorMapNum = numColors;
	      return this;
	    }

	    /**
	     * Calls {@link SerieDensityMap#colorMapHSV} using 100 colors.
	     * @memberof SerieDensityMap
	     * @param {Array<Object>} colorStops - An array of objects, each having the following format: <code>{ h: [ 0-360], s: 0-1, l: 0-1, a: 0-1}</code>
	     * @param {String} [ method = "linear" ] - The method to use to calculate the density map: <code>linear</code>, <code>exp</code> or <code>log</code>
	     * @return {SerieDensityMap} The current instance
	     */
	    autoColorMapHSL(colorStops, method) {
	      this.colorMapHSV(colorStops, 100, method || "linear");
	      return this;
	    }

	    /*  byteToHex( b ) {
	          return hexChar[ ( b >> 4 ) & 0x0f ] + hexChar[ b & 0x0f ];
	        }
	        */
	    /*
	      HSVtoRGB( h, s, v ) {
	        var r, g, b, i, f, p, q, t;
	        if ( arguments.length === 1 ) {
	          s = h.s, v = h.v, h = h.h;
	        }
	        i = Math.floor( h * 6 );
	        f = h * 6 - i;
	        p = v * ( 1 - s );
	        q = v * ( 1 - f * s );
	        t = v * ( 1 - ( 1 - f ) * s );
	        switch ( i % 6 ) {
	          case 0:
	            r = v, g = t, b = p;
	            break;
	          case 1:
	            r = q, g = v, b = p;
	            break;
	          case 2:
	            r = p, g = v, b = t;
	            break;
	          case 3:
	            r = p, g = q, b = v;
	            break;
	          case 4:
	            r = t, g = p, b = v;
	            break;
	          case 5:
	            r = v, g = p, b = q;
	            break;
	        }
	        return "#" + this.byteToHex( Math.floor( r * 255 ) ) + this.byteToHex( Math.floor( g * 255 ) ) + this.byteToHex( Math.floor( b * 255 ) );
	      }
	    */

	    /**
	     * Returns the color index (```[ 0 - 1 ]```) for a certain value, based on colorMapMin and colorMapMax.
	     * @memberof SerieDensityMap
	     * @param {Number} binValue - The value of the bin
	     * @return {Number} The color index
	     */
	    getColorIndex(binValue) {

	      return Math.max(0, Math.min(this.colorMapNum, Math.floor((binValue - this.colorMapMin) / (this.colorMapMax - this.colorMapMin) * this.colorMapNum)));
	    }

	    /**
	     * Draws the serie
	     * @memberof SerieDensityMap
	     * @private
	     */
	    draw() {

	      var colorIndex;

	      if (this.method) {
	        this.method();
	      }

	      if (!this.callbackColorMapMinMax && (this.colorMapMin == undefined || this.colorMapMax == undefined) || this.callbackColorMapMinMax == 'auto') {
	        this.autoColorMapBinBoundaries();
	      } else {
	        var val = this.callbackColorMapMinMax(this.binMin, this.binMax);

	        this.setColorMapBinBoundaries(val[0], val[1]);
	      }

	      var deltaXPx = this.getXAxis().getRelPx(this.deltaX),
	          deltaYPx = this.getYAxis().getRelPx(this.deltaY);

	      for (var i = 0; i < this.paths.length; i++) {
	        this.paths[i] = "";
	      }

	      for (var i = 0; i < this.maxIndexX; i++) {

	        for (var j = 0; j < this.maxIndexY; j++) {

	          if (this.densitymap[i] == undefined || this.densitymap[i][j] == undefined) {
	            continue;
	          }

	          colorIndex = this.getColorIndex(this.densitymap[i][j]);
	          if (!this.paths[colorIndex]) {
	            this.paths[colorIndex] = "";
	          }

	          this.paths[colorIndex] += " M " + this.getXAxis().getPx(i * this.deltaX + this.fromX) + " " + this.getYAxis().getPx(j * this.deltaY + this.fromY) + " h " + deltaXPx + " v " + deltaYPx + " h -" + deltaXPx + " z";

	          ;
	        }
	      }
	      /*
	          this.maxIndexX = indexX;
	          this.maxIndexY = indexY;*/

	      this.drawRects();
	    }

	    /**
	     * Draws the rectangles
	     * @memberof SerieDensityMap
	     * @private
	     */
	    drawRects() {

	      for (var i = 0; i < this.paths.length; i++) {

	        if (!this.rects[i]) {
	          this.rects[i] = document.createElementNS(this.graph.ns, "path");
	          this.rects[i].setAttribute('shape-rendering', 'crispEdges');
	        }

	        if (this.paths[i] !== undefined) {
	          this.rects[i].setAttribute('d', this.paths[i]);
	          this.rects[i].setAttribute('fill', this.colorMap[i]);
	          this.rects[i].setAttribute('fill-opacity', this.opacities[i]);
	        }
	        this.groupMain.appendChild(this.rects[i]);
	      }
	    }

	    /**
	     * Sets the options of the serie
	     * @see SerieDensityMapDefaultOptions
	     * @param {Object} options - A object containing the options to set
	     * @return {SerieDensityMap} The current serie
	     * @memberof SerieDensityMap
	     */
	    setOptions(options) {
	      this.options = util.extend(true, {}, defaults, options || {});
	      // Unselected style

	      return this;
	    }
	  }

	  exports.default = SerieDensityMap;
	});

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(11), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('./graph.serie.line'), require('../graph.util'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.graphSerie, global.graph);
	    global.graphSerieContour = mod.exports;
	  }
	})(this, function (exports, _graphSerie, _graph) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _graphSerie2 = _interopRequireDefault(_graphSerie);

	  var util = _interopRequireWildcard(_graph);

	  function _interopRequireWildcard(obj) {
	    if (obj && obj.__esModule) {
	      return obj;
	    } else {
	      var newObj = {};

	      if (obj != null) {
	        for (var key in obj) {
	          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	        }
	      }

	      newObj.default = obj;
	      return newObj;
	    }
	  }

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  /** 
	   * Constructor for the contour serie. Do not use this constructor directly, but use the {@link Graph#newSerie} method
	   * @private
	   * @extends Serie
	   * @example graph.newSerie( name, options, "contour" );
	   * @see Graph#newSerie
	   */
	  class SerieContour extends _graphSerie2.default {

	    constructor() {
	      super(...arguments);

	      this.negativeDelta = 0;
	      this.positiveDelta = 0;

	      this.negativeThreshold = 0;
	      this.positiveThreshold = 0;
	    }

	    /**
	     * Sets the contour lines
	     * @memberof SerieContour.prototype
	     * @param {Object} data - The object data
	     * @param {Number} data.minX - The minimum x value
	     * @param {Number} data.maxX - The maximum x value
	     * @param {Number} data.minY - The minimum y value
	     * @param {Number} data.maxY - The maximum y value
	     * @param {Object[]} data.segments - The segments making up the contour lines
	     * @param {Number[]} data.segments.lines - An array of alternating (x1,y1,x2,y2) quadruplet
	     * @param {Number} data.segments.zValue - The corresponding z-value of this array
	     * @return {Serie} The current serie
	     */
	    setData(data, arg, type) {

	      var z = 0;
	      var x,
	          dx,
	          arg = arg || "2D",
	          type = type || 'float',
	          i,
	          l = data.length,
	          j,
	          k,
	          arr,
	          datas = [];

	      if (!(data instanceof Array)) {

	        if (typeof data == 'object') {
	          // Def v2
	          this.minX = data.minX;
	          this.minY = data.minY;
	          this.maxX = data.maxX;
	          this.maxY = data.maxY;

	          data = data.segments;
	          l = data.length;
	        }
	      }

	      for (i = 0; i < l; i++) {
	        k = data[i].lines.length;
	        arr = this._addData(type, k);

	        for (j = 0; j < k; j += 2) {

	          arr[j] = data[i].lines[j];
	          this._checkX(arr[j]);
	          arr[j + 1] = data[i].lines[j + 1];
	          this._checkY(arr[j + 1]);
	        }

	        datas.push({
	          lines: arr,
	          zValue: data[i].zValue
	        });
	      }
	      this.data = datas;
	      this.graph.updateDataMinMaxAxes();

	      this.dataHasChanged(true);

	      return this;
	    }

	    /**
	     * Draws the serie if the data has changed
	     * @memberof SerieContour.prototype
	     * @param {Boolean} force - Forces redraw even if the data hasn't changed
	     * @return {Serie} The current serie
	     */
	    draw(force) {

	      if (force || this.hasDataChanged()) {

	        this.currentLine = 0;
	        var x,
	            y,
	            xpx,
	            ypx,
	            xpx2,
	            ypx2,
	            i = 0,
	            l = this.data.length,
	            j = 0,
	            k,
	            m,
	            currentLine,
	            domLine,
	            arr;
	        this.minZ = Infinity;
	        this.maxZ = -Infinity;

	        var next = this.groupLines.nextSibling;
	        this.groupMain.removeChild(this.groupLines);
	        this.zValues = {};

	        var incrXFlip = 0;
	        var incrYFlip = 1;
	        if (this.getFlip()) {
	          incrXFlip = 0;
	          incrYFlip = 1;
	        }

	        var minY = this.getYAxis().getCurrentMin();
	        var minX = this.getXAxis().getCurrentMin();

	        var maxX = this.getXAxis().getCurrentMax();
	        var maxY = this.getYAxis().getCurrentMax();

	        this.counter = 0;
	        this.currentLineId = 0;

	        for (; i < l; i++) {
	          this.currentLine = "";
	          j = 0;
	          k = 0;

	          for (arr = this.data[i].lines, m = arr.length; j < m; j += 4) {

	            var lastxpx, lastypx;

	            if (arr[j + incrXFlip] < minX && arr[j + 2 + incrXFlip] < minX || arr[j + incrYFlip] < minY && arr[j + 2 + incrYFlip] < minY || arr[j + incrYFlip] > maxY && arr[j + 2 + incrYFlip] > maxY || arr[j + incrXFlip] > maxX && arr[j + 2 + incrXFlip] > maxX) {
	              continue;
	            }

	            xpx2 = this.getX(arr[j + incrXFlip]);
	            ypx2 = this.getY(arr[j + incrYFlip]);

	            xpx = this.getX(arr[j + 2 + incrXFlip]);
	            ypx = this.getY(arr[j + 2 + incrYFlip]);

	            if (xpx == xpx2 && ypx == ypx2) {
	              continue;
	            }

	            /*	if( j > 0 && ( lastxpx !== undefined && lastypx !== undefined && Math.abs( xpx2 - lastxpx ) <= 30 && Math.abs( ypx2 - lastypx ) <= 30 ) ) {
	            currentLine += "L";
	            } else {
	            currentLine += "M";	
	            }
	            */

	            this.currentLine += "M ";
	            this.currentLine += xpx2;
	            this.currentLine += " ";
	            this.currentLine += ypx2;

	            this.currentLine += "L ";
	            this.currentLine += xpx;
	            this.currentLine += " ";
	            this.currentLine += ypx;

	            this.counter++;

	            lastxpx = xpx;
	            lastypx = ypx;

	            k++;
	          }

	          this.currentLine += " z";

	          domLine = this._createLine();
	          domLine.setAttribute('data-zvalue', this.data[i].zValue);

	          this.zValues[this.data[i].zValue] = {
	            dom: domLine
	          };

	          this.minZ = Math.min(this.minZ, this.data[i].zValue);
	          this.maxZ = Math.max(this.maxZ, this.data[i].zValue);
	        }

	        i++;

	        for (i = this.currentLine + 1; i < this.lines.length; i++) {
	          this.groupLines.removeChild(this.lines[i]);
	          this.lines.splice(i, 1);
	        }

	        i = 0;

	        for (; i < l; i++) {
	          this.setColorTo(this.lines[i], this.data[i].zValue, this.minZ, this.maxZ);
	        }

	        this.onMouseWheel(0, {
	          shiftKey: false
	        });
	        this.groupMain.insertBefore(this.groupLines, next);
	      } else if (this.hasStyleChanged(this.selectionType)) {

	        for (; i < l; i++) {
	          this.setColorTo(this.lines[i], this.data[i].zValue, this.minZ, this.maxZ);
	        }
	      }
	    }

	    onMouseWheel(delta, e, fixed, positive) {

	      delta /= 250;

	      if (fixed !== undefined) {

	        if (!positive) {
	          this.negativeThreshold = -fixed * this.minZ;
	          this.negativeDelta = -Math.pow(Math.abs(this.negativeThreshold / -this.minZ), 1 / 3);
	        }

	        if (positive) {
	          this.positiveThreshold = fixed * this.maxZ;
	          this.positiveDelta = Math.pow(this.positiveThreshold / this.maxZ, 1 / 3);
	        }
	      } else {

	        if (!e.shiftKey || !this.options.hasNegative) {

	          this.positiveDelta = Math.min(1, Math.max(0, this.positiveDelta + Math.min(0.1, Math.max(-0.1, delta))));
	          this.positiveThreshold = this.maxZ * Math.pow(this.positiveDelta, 3);
	        } else {

	          this.negativeDelta = Math.min(0, Math.max(-1, this.negativeDelta + Math.min(0.1, Math.max(-0.1, delta))));
	          this.negativeThreshold = -this.minZ * Math.pow(this.negativeDelta, 3);
	        }
	      }

	      if (isNaN(this.positiveDelta)) {
	        this.positiveDelta = 0;
	      }

	      if (isNaN(this.negativeDelta)) {
	        this.negativeDelta = 0;
	      }

	      for (var i in this.zValues) {

	        this.zValues[i].dom.setAttribute('display', i >= 0 && i >= this.positiveThreshold || i <= 0 && i <= this.negativeThreshold ? 'block' : 'none');
	      }

	      if (this._shapeZoom) {

	        if (!this.options.hasNegative) {
	          this._shapeZoom.hideHandleNeg();
	        } else {

	          this._shapeZoom.setHandleNeg(-Math.pow(this.negativeDelta, 3), this.minZ);
	          this._shapeZoom.showHandleNeg();
	        }

	        this._shapeZoom.setHandlePos(Math.pow(this.positiveDelta, 3), this.maxZ);
	      }
	    }

	    /**
	     * Sets rainbow colors based on hsl format
	     * @memberof SerieContour.prototype
	     * @param {Object} colors
	     * @param {Object} colors.fromPositive
	     * @param {Number} colors.fromPositive.h
	     * @param {Number} colors.fromPositive.s
	     * @param {Number} colors.fromPositive.l
	     
	     * @param {Object} colors.toPositive
	     * @param {Number} colors.toPositive.h
	     * @param {Number} colors.toPositive.s
	     * @param {Number} colors.toPositive.l
	     
	      * @param {Object} colors.fromNegative
	     * @param {Number} colors.fromNegative.h
	     * @param {Number} colors.fromNegative.s
	     * @param {Number} colors.fromNegative.l
	     
	      * @param {Object} colors.toNegative
	     * @param {Number} colors.toNegative.h
	     * @param {Number} colors.toNegative.s
	     * @param {Number} colors.toNegative.l
	     * @return {Serie} The current serie
	     */
	    setDynamicColor(colors) {
	      this.lineColors = colors;

	      this.styleHasChanged();
	    }

	    setNegative(bln) {
	      this.options.hasNegative = bln;

	      if (bln) {
	        this.negativeThreshold = 0;
	      }
	    }

	    setColorTo(line, zValue, min, max) {

	      if (!this.lineColors) {
	        return;
	      }

	      var hsl = {
	        h: 0,
	        s: 0,
	        l: 0
	      };

	      for (var i in hsl) {

	        if (zValue > 0) {
	          hsl[i] = this.lineColors.fromPositive[i] + (this.lineColors.toPositive[i] - this.lineColors.fromPositive[i]) * (zValue / max);
	        } else {
	          hsl[i] = this.lineColors.fromNegative[i] + (this.lineColors.toNegative[i] - this.lineColors.fromNegative[i]) * (zValue / min);
	        }
	      }

	      hsl.h /= 360;

	      var rgb = util.hslToRgb(hsl.h, hsl.s, hsl.l);

	      line.setAttribute('stroke', 'rgb(' + rgb.join() + ')');
	    }

	    getSymbolForLegend() {

	      if (!this.lineForLegend) {

	        var line = document.createElementNS(this.graph.ns, 'ellipse');

	        line.setAttribute('cx', 7);
	        line.setAttribute('cy', 0);
	        line.setAttribute('rx', 8);
	        line.setAttribute('ry', 3);

	        line.setAttribute('cursor', 'pointer');
	        this.lineForLegend = line;
	      }

	      this.applyLineStyle(this.lineForLegend, this.maxZ);

	      return this.lineForLegend;
	    }

	    applyLineStyle(line, overwriteValue) {
	      line.setAttribute('stroke', this.getLineColor());
	      line.setAttribute('stroke-width', this.getLineWidth() + (this.isSelected() ? 2 : 0));
	      if (this.getLineDashArray()) {
	        line.setAttribute('stroke-dasharray', this.getLineDashArray());
	      }
	      line.setAttribute('fill', 'none');

	      this.setColorTo(line, overwriteValue !== undefined ? overwriteValue : line.getAttribute('data-zvalue'), this.minZ, this.maxZ);
	      //  line.setAttribute('shape-rendering', 'optimizeSpeed');

	      this.hasStyleChanged(false);
	    }

	    setShapeZoom(shape) {
	      this._shapeZoom = shape;
	    }

	  }

	  exports.default = SerieContour;
	});

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(2), __webpack_require__(3), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('../graph.position'), require('../graph.util'), require('../dependencies/eventEmitter/EventEmitter'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.graph, global.graph, global.EventEmitter);
	    global.graphShape = mod.exports;
	  }
	})(this, function (exports, _graph, _graph3, _EventEmitter) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _graph2 = _interopRequireDefault(_graph);

	  var util = _interopRequireWildcard(_graph3);

	  var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

	  function _interopRequireWildcard(obj) {
	    if (obj && obj.__esModule) {
	      return obj;
	    } else {
	      var newObj = {};

	      if (obj != null) {
	        for (var key in obj) {
	          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	        }
	      }

	      newObj.default = obj;
	      return newObj;
	    }
	  }

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  /** 
	   * Shape class that should be extended
	   * @class Shape
	   * @static
	   */
	  class Shape extends _EventEmitter2.default {

	    constructor() {
	      super();
	    }

	    /**
	     * Initializes the shape
	     * @param {Graph} graph - The graph containing the shape
	     * @param {Object} properties - The properties object (not copied)
	     * @return {Shape} The current shape
	     */
	    init(graph, properties) {

	      var self = this;

	      this.graph = graph;
	      this.properties = properties || {};
	      this.handles = [];
	      this.options = this.options || {};

	      this.group = document.createElementNS(this.graph.ns, 'g');

	      this._selected = false;
	      this.createDom();

	      if (this._dom) {
	        this._dom.jsGraphIsShape = this;
	      }

	      this.group.jsGraphIsShape = this;

	      this.classes = [];
	      this.transforms = [];

	      if (this._data.masker) {

	        var maskPath = document.createElementNS(this.graph.ns, 'mask');
	        this.maskingId = Math.random();
	        maskPath.setAttribute('id', this.maskingId);

	        this.maskDomWrapper = document.createElementNS(this.graph.ns, 'rect');
	        this.maskDomWrapper.setAttribute('fill', 'white');
	        maskPath.appendChild(this.maskDomWrapper);

	        var maskDom = this._dom.cloneNode();
	        maskPath.appendChild(maskDom);

	        this.maskDom = maskDom;

	        this.graph.defs.appendChild(maskPath);
	      }

	      if (this.group) {

	        if (this._dom) {
	          this.group.appendChild(this._dom);
	        }

	        this.group.addEventListener('mouseover', function (e) {

	          self.handleMouseOver(e);
	        });

	        this.group.addEventListener('mouseout', function (e) {

	          self.handleMouseOut(e);
	        });

	        this.group.addEventListener('mousedown', function (e) {

	          self.graph.focus();

	          self.handleMouseDown(e);
	        });

	        this.group.addEventListener('click', function (e) {
	          self.handleClick(e);
	        });

	        this.group.addEventListener('dblclick', function (e) {

	          //e.preventDefault();
	          // e.stopPropagation();

	          self.handleDblClick(e);
	        });
	      }

	      //			this.group.appendChild(this.rectEvent);

	      this.initImpl();

	      this.graph.emit("shapeNew", this);
	      return this;
	    }

	    /**
	     * Implentation of the init method. To be extended if necessary on extended Shape classes
	     */
	    initImpl() {}

	    /**
	     * @return {Object} The shape's underlying data object
	     */
	    getData() {
	      return this._data;
	    }

	    /**
	     * @returns {String} The type of the shape
	     */
	    getType() {
	      return this.type;
	    }

	    /**
	     * Removes the shape from the DOM and unlinks it from the graph
	     */
	    kill(keepDom) {

	      this.graph.removeShapeFromDom(this);

	      if (!keepDom) {
	        this.graph._removeShape(this);
	      }

	      this.graph.stopElementMoving(this);
	      this.graph.emit("shapeRemoved", this);

	      this._inDom = false;
	    }

	    /**
	     * Hides the shape
	     * @return {Shape} The current shape
	     */
	    hide() {

	      if (this.hidden) {
	        return;
	      }

	      this.hidden = true;
	      this.group.style.display = 'none';
	      return this;
	    }

	    /**
	     * Shows the shape
	     * @return {Shape} The current shape
	     */
	    show() {

	      if (!this.hidden) {
	        return;
	      }

	      this.hidden = false;
	      this.group.style.display = 'block';
	      this.redraw();
	      return this;
	    }

	    /**
	     * Adds a class to the shape DOM
	     * @param {String} className - The class to add
	     * @return {Shape} The current shape
	     */
	    addClass(className) {
	      this.classes = this.classes || [];
	      if (this.classes.indexOf(className) == -1) {
	        this.classes.push(className);
	      }
	      this.makeClasses();
	      return this;
	    }

	    /**
	     * Removes a class from the shape DOM
	     * @param {String} className - The class to remove
	     * @return {Shape} The current shape
	     */
	    removeClass(className) {
	      this.classes.splice(this.classes.indexOf(className), 1);
	      this.makeClasses();
	      return this;
	    }

	    /**
	     * Builds the classes
	     * @private
	     * @return {Shape} The current shape
	     */
	    makeClasses() {

	      if (this._dom) {
	        this._dom.setAttribute('class', this.classes.join(" "));
	      }

	      return this;
	    }

	    /**
	     * Triggers a ```shapeChanged``` event on the graph
	     * @return {Shape} The current shape
	     */
	    changed(event) {

	      if (event) {
	        this.graph.emit(event, this);
	      }

	      this.graph.emit('shapeChanged', this);
	      return this;
	    }

	    /**
	     * Creates an event receptacle with the coordinates of the shape bounding box
	     * @return {Shape} The current shape
	     */
	    setEventReceptacle() {

	      if (!this.rectEvent) {
	        this.rectEvent = document.createElementNS(this.graph.ns, 'rect');
	        this.rectEvent.setAttribute('pointer-events', 'fill');
	        this.rectEvent.setAttribute('fill', 'transparent');
	        this.group.appendChild(this.rectEvent);
	        this.rectEvent.jsGraphIsShape = this;
	      }

	      var box = this.group.getBBox();
	      this.rectEvent.setAttribute('x', box.x);
	      this.rectEvent.setAttribute('y', box.y - 10);
	      this.rectEvent.setAttribute('width', box.width);
	      this.rectEvent.setAttribute('height', box.height + 20);
	    }

	    /**
	     * Assigns a serie to the shape
	     * @param {Serie} The serie that owns the shape
	     * @return {Shape} The current shape
	     */
	    setSerie(serie) {
	      this.serie = serie;
	      this.xAxis = serie.getXAxis();
	      this.yAxis = serie.getYAxis();
	      return this;
	    }

	    /**
	     * @return {Serie} The serie associated to the shape
	     */
	    getSerie() {
	      return this.serie;
	    }

	    /**
	     * Assigns the shape to the default x and y axes of the graph, only if they don't exist yet
	     * @return {Shape} The current shape
	     * @see Graph#getXAxis
	     * @see Graph#getYAxis
	     */
	    autoAxes() {

	      if (!this.xAxis) {
	        this.xAxis = this.graph.getXAxis();
	      }

	      if (!this.yAxis) {
	        this.yAxis = this.graph.getYAxis();
	      }

	      return this;
	    }

	    /**
	     * Assigns the shape to an x axis
	     * @param {XAxis} The X axis related to the shape
	     * @return {Shape} The current shape
	     */
	    setXAxis(axis) {
	      this.xAxis = axis;
	      return this;
	    }

	    /**
	     * Assigns the shape to an y axis
	     * @param {YAxis} The Y axis related to the shape
	     * @return {Shape} The current shape
	     */
	    setYAxis(axis) {
	      this.yAxis = axis;
	    }

	    /**
	     * Returns the x axis associated to the shape. If non-existent, assigns it automatically
	     * @return {XAxis} The x axis associated to the shape. 
	     */
	    getXAxis() {

	      if (!this.xAxis) {
	        this.autoAxes();
	      }

	      return this.xAxis;
	    }

	    /**
	     * Returns the y axis associated to the shape. If non-existent, assigns it automatically
	     * @return {YAxis} The y axis associated to the shape. 
	     */
	    getYAxis() {

	      if (!this.yAxis) {
	        this.autoAxes();
	      }

	      return this.yAxis;
	    }

	    /**
	     * Sets the layer of the shape
	     * @param {Number} layer - The layer number (1 being the lowest)
	     * @return {Shape} The current shape
	     * @see Shape#getLayer
	     */
	    setLayer(layer) {
	      this.setProp('layer', layer);
	      return this;
	    }

	    /**
	     * Returns the layer on which the shape is placed
	     * @return {Number} The layer number (1 being the lowest layer)
	     */
	    getLayer() {
	      var layer = this.getProp('layer');

	      if (layer !== undefined) {
	        return layer;
	      }

	      return 1;
	    }

	    /**
	     * Initial drawing of the shape. Adds it to the DOM and creates the labels. If the shape was already in the DOM, the method simply recreates the labels and reapplies the shape style, unless ```force``` is set to ```true```
	     * @param {Boolean} force - Forces adding the shape to the DOM (useful if the shape has changed layer)
	     * @return {Shape} The current shape
	     */
	    draw(force) {

	      if (!this._inDom || force) {

	        this.appendToDom();
	        this._inDom = true;
	      }

	      this.makeLabels();
	      this.redraw();
	      this.applyStyle();

	      return this;
	    }

	    /**
	     * Redraws the shape. Repositions it, applies the style and updates the labels
	     * @return {Shape} The current shape
	     */
	    redraw() {

	      if (this.hidden) {
	        return this;
	      }

	      this.position = this.applyPosition();

	      this.redrawImpl();
	      if (!this.position) {
	        return this;
	      }

	      this.updateLabels();
	      this._applyTransforms();
	      return this;
	    }

	    /**
	     * Implementation of the redraw method. Extended Shape classes should override this method
	     */
	    redrawImpl() {}

	    /**
	     * Sets all dumpable properties of the shape
	     * @param {Object} properties - The properties object
	     * @return {Shape} The current shape
	     */
	    setProperties(properties) {
	      this.properties = properties;

	      if (!Array.isArray(this.properties.position)) {
	        this.properties.position = [this.properties.position];
	      }
	      var self = this;
	      for (var i = 0, l = this.properties.position.length; i < l; i++) {

	        var pos = _graph2.default.check(this.properties.position[i], function (relativeTo) {
	          return self.getRelativePosition(relativeTo);
	        });

	        this.properties.position[i] = pos;
	      }

	      this.emit("propertiesChanged");
	      return this;
	    }

	    getRelativePosition(relativePosition) {

	      var result;
	      if ((result = /position([0-9]*)/.exec(relativePosition)) !== null) {
	        return this.getPosition(result[1]);
	      } else if ((result = /labelPosition([0-9]*)/.exec(relativePosition)) !== null) {
	        return this.getLabelPosition(result[1]);
	      }
	    }

	    /**
	     * Gets all dumpable properties of the shape
	     * @return {Object} properties - The properties object
	     */
	    getProperties(properties) {
	      return this.properties;
	    }

	    /**
	     * Sets a property to the shape that is remembered and can be later reexported (or maybe reimported)
	     * @param {String} prop - The property to save
	     * @param val - The value to save
	     * @param [ index = 0 ] - The index of the property array to save the property
	     * @return {Shape} The current shape
	     */
	    setProp(prop, val, index) {
	      this.properties = this.properties || {};
	      this.properties[prop] = this.properties[prop] || [];
	      this.properties[prop][index || 0] = val;
	      this.emit("propertyChanged", prop);
	      return this;
	    }

	    /**
	     * Returns a property of the shape
	     * @param {String} prop - The property to retrieve
	     * @param [ index = 0 ] - The index of the property array
	     */
	    getProp(prop, index) {
	      return (this.properties[prop] || [])[index || 0];
	    }

	    /**
	     * Returns all the properties of the shape
	     * @param {String} prop - The property to retrieve
	     */
	    getProps(prop, index) {
	      return this.properties[prop] || [];
	    }

	    /**
	     * Adds a property to the property array
	     * @param {String} prop - The property to add
	     * @param val - The value to save
	     */
	    addProp(prop, value) {
	      this.properties[prop] = this.properties[prop] || [];
	      this.properties[prop].push(value);
	    }

	    /**
	     * Resets the property array
	     * @param {String} prop - The property to reset
	     */
	    resetProp(prop) {
	      this.properties[prop] = [];
	    }

	    /**
	     * Sets a DOM property to the shape
	     */
	    setDom(prop, val, noForce) {
	      if (this._dom) {

	        if (!noForce || !util.hasSavedAttribute(this._dom, prop)) {
	          this._dom.setAttribute(prop, val);
	        }
	      }
	    }

	    /**
	     * Sets a DOM property to the shape group
	     */
	    setDomGroup(prop, val) {
	      if (this.group) {
	        this.group.setAttribute(prop, val);
	      }
	    }

	    /**
	     * Saves the stroke color
	     * @return {Shape} The current shape
	     */
	    setStrokeColor(color) {
	      this.setProp('strokeColor', color);
	      this.overwriteSavedProp('stroke', color);
	      this.applySelectedStyle();
	      return this;
	    }

	    /**
	     * Returns the stroke color
	     * @return {String} The stroke color of the shape
	     */
	    getStrokeColor() {
	      return this.getProp('strokeColor');
	    }

	    /**
	     * Saves the fill color
	     * @param {String} color - The filling color
	     * @return {Shape} The current shape
	     */
	    setFillColor(color) {
	      this.setProp('fillColor', color);
	      this.overwriteSavedProp('fill', color);
	      this.applySelectedStyle();
	      return this;
	    }

	    /**
	     * Returns the fill color
	     * @return {String} The fill color of the shape
	     */
	    getFillColor() {
	      return this.getProp('fillColor');
	    }

	    /**
	     * Saves the opacity of the filling color of the shape
	     * @param {Number} opacity - The filling opacity (0 to 1)
	     * @return {Shape} The current shape
	     */
	    setFillOpacity(opacity) {
	      this.setProp('fillOpacity', opacity);
	      this.overwriteSavedProp('fill-opacity', opacity);
	      this.applySelectedStyle();
	      return this;
	    }

	    /**
	     * Saves the stroke width
	     * @param {String} width - The stroke width
	     * @return {Shape} The current shape
	     */
	    setStrokeWidth(width) {
	      this.setProp('strokeWidth', width);
	      this.overwriteSavedProp('stroke-width', width);
	      this.applySelectedStyle();
	      return this;
	    }

	    /**
	     * Returns the stroke width
	     * @return {String} The stroke width of the shape
	     */
	    getStrokeWidth() {
	      return this.getProp('strokeWidth');
	    }

	    /**
	     * Saves the stroke dash array
	     * @param {String} dasharray - The dasharray string
	     * @example shape.setStrokeDasharray("5,5,1,4");
	     * shape.applyStyle();
	     * @return {Shape} The current shape
	     */
	    setStrokeDasharray(dasharray) {
	      this.setProp('strokeDasharray', dasharray);
	      this.overwriteSavedProp('stroke-dasharray', dasharray);
	      this.applySelectedStyle();
	      return this;
	    }

	    /**
	     * Sets any extra attributes to the DOM element of the shape
	     * @param {Object<String,String>} attributes - An extra attribute array to apply to the shape DOM
	     * @example shape.setAttributes( { "data-bindable" : true } );
	     * shape.applyStyle();
	     * @return {Shape} The current shape
	     */
	    setAttributes(attributes) {
	      this.setProp("attributes", attributes);
	      return this;
	    }

	    overwriteSavedProp(prop, newValue) {
	      util.overwriteDomAttribute(this._dom, prop, newValue);
	    }

	    /**
	     * Adds an extra attribute to the shape
	     * @param {String} attributeName - The name of the attribute
	     * @param {String} attributeValue - The value of the attribute
	     * @return {Shape} The current shape
	     */
	    addAttribute(attributeName, attributeValue) {
	      var added = {};
	      added[attributeName] = attributeValue;
	      this.addProp("attributes", added);
	      return this;
	    }

	    /**
	     * Adds a transform property to the shape.
	     * @param {String} type - The transform type ("rotate", "transform" or "scale")
	     * @param {String} args - The arguments following the transform
	     * @return {Shape} The current shape
	     */
	    addTransform(type, args) {
	      this.addProp('transforms', {
	        type: type,
	        arguments: Array.isArray(args) ? args : [args]
	      });
	      return this;
	    }

	    /**
	     * Resets the transforms
	     * @see Shape#addTransform
	     * @return {Shape} The current shape
	     */
	    resetTransforms() {
	      this.resetProp('transforms');
	      return this;
	    }

	    /**
	     * Sets the text of the label
	     * @param {String} text - The text of the label
	     * @param {Number} [ index = 0 ] - The index of the label
	     * @return {Shape} The current shape
	     */
	    setLabelText(text, index) {
	      this.setProp('labelText', text, index || 0);
	      return this;
	    }

	    /**
	     * Returns the text of the label
	     * @param {Number} [ index = 0 ] - The index of the label
	     * @return {String} The text of the label
	     */
	    getLabelText(text, index) {
	      return this.getProp('labelText', index || 0);
	    }

	    /**
	     * Displays a hidden label
	     * @param {Number} [ index = 0 ] - The index of the label
	     * @return {Shape} The current shape
	     */
	    displayLabel(index) {
	      this.setProp('labelVisible', true, index || 0);
	      return this;
	    }

	    /**
	     * Hides a displayed label
	     * @param {Number} [ index = 0 ] - The index of the label
	     * @return {Shape} The current shape
	     */
	    hideLabel(index) {
	      this.setProp('labelVisible', false, index || 0);
	      return this;
	    }

	    /**
	     * Sets the color of the label
	     * @param {String} color - The color of the label
	     * @param {Number} [ index = 0 ] - The index of the label
	     * @return {Shape} The current shape
	     */
	    setLabelColor(color, index) {
	      this.setProp('labelColor', color, index || 0);
	      return this;
	    }

	    /**
	     * Sets the font size of the label
	     * @param {String} size - The font size (in px) of the label
	     * @param {Number} [ index = 0 ] - The index of the label
	     * @return {Shape} The current shape
	     */
	    setLabelFontSize(size, index) {
	      this.setProp('labelFontSize', size, index || 0);
	      return this;
	    }

	    /**
	     * Returns the position of the label
	     * @param {Number} [ index = 0 ] - The index of the label
	     * @return {Position} The current position of the label
	     */
	    getLabelPosition(index) {
	      return this.getProp('labelPosition', index || 0);
	    }

	    /**
	     * Sets the position of the label
	     * @param {Position} position - The position of the label
	     * @param {Number} [ index = 0 ] - The index of the label
	     * @return {Shape} The current shape
	     */
	    setLabelPosition(position, index) {

	      var self;
	      var pos = _graph2.default.check(position, function (relativeTo) {
	        return self.getRelativePosition(relativeTo);
	      });

	      this.setProp('labelPosition', pos, index || 0);
	      return this;
	    }

	    /**
	     * Sets the angle of the label
	     * @param {Number} angle - The angle of the label in degrees (0 to 360°)
	     * @param {Number} [ index = 0 ] - The index of the label
	     * @return {Shape} The current shape
	     */
	    setLabelAngle(angle, index) {
	      this.setProp('labelAngle', angle, index || 0);
	      return this;
	    }

	    /**
	     * Sets the baseline of the label, which affects its y position with respect to the text direction. For text along the x direction, different baselines will reference differently the text to the ```y``` coordinate.
	     * @param {String} baseline - The baseline of the label. Most common baselines are ```no-change```, ```central```, ```middle``` and ```hanging```. You will find an explanation of those significations on the [corresponding MDN article]{@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/dominant-baseline}
	     * @param {Number} [ index = 0 ] - The index of the label
	     * @return {Shape} The current shape
	     */
	    setLabelBaseline(baseline, index) {
	      this.setProp('labelBaseline', baseline, index || 0);
	      return this;
	    }

	    /**
	     * Sets the anchoring of the label. 
	     * @param {String} anchor - The anchor of the label. Values can be ```start```, ```middle```, ```end``` or ```inherit```.
	     * @param {Number} [ index = 0 ] - The index of the label
	     * @return {Shape} The current shape
	     */
	    setLabelAnchor(anchor, index) {
	      this.setProp('labelAnchor', anchor, index || 0);
	      return this;
	    }

	    /**
	     * Sets the anchoring of the label. 
	     * @param {String} size - The font size in px
	     * @param {Number} [ index = 0 ] - The index of the label
	     * @return {Shape} The current shape
	     */
	    setLabelSize(size, index) {
	      this.setProp('labelSize', size, index || 0);
	      return this;
	    }

	    /**
	     * Sets the color of the stroke of the label. 
	     * @param {String} color - The color of the stroke
	     * @param {Number} [ index = 0 ] - The index of the label
	     * @return {Shape} The current shape
	     */
	    setLabelStrokeColor(color, index) {
	      this.setProp('labelStrokeColor', color, index || 0);
	      return this;
	    }

	    /**
	     * Sets the width of the stroke of the label. 
	     * @param {Number} width - The width of the stroke
	     * @param {Number} [ index = 0 ] - The index of the label
	     * @return {Shape} The current shape
	     */
	    setLabelStrokeWidth(width, index) {
	      this.setProp('labelStrokeWidth', width, index || 0);
	      return this;
	    }

	    /**
	     * Applies the generic style to the shape. This is a method that applies to most shapes, hence should not be overridden. However if you create a bundle of shapes that extend another one, you may use it to set common style properties to all your shapes.
	     * @return {Shape} The current shape
	     */
	    applyGenericStyle() {

	      this.setDom("fill", this.getProp("fillColor"), true);
	      this.setDom("fill-opacity", this.getProp("fillOpacity"), true);
	      this.setDom("stroke", this.getProp("strokeColor"), true);
	      this.setDom("stroke-width", this.getProp("strokeWidth"), true);
	      this.setDom("stroke-dasharray", this.getProp("strokeDasharray"), true);

	      var attributes = this.getProps("attributes");
	      for (var j = 0, l = attributes.length; j < l; j++) {

	        for (var i in attributes[j]) {
	          this.setDom(i, typeof attributes[j][i] == "function" ? attributes[j][i].call(this, i) : attributes[j][i], true);
	        }
	      }

	      this._applyTransforms();

	      return this;
	    }

	    /**
	     * Applies the style to the shape. This method can be extended to apply specific style to the shapes
	     * @return {Shape} The current shape
	     */
	    applyStyle() {
	      return this.applyGenericStyle();
	    }

	    /**
	     * Returns a computed position object
	     * @param {(Number|Position)} [ index = 0 ] - The index of the position to compute
	     * @param {Position} relToPosition - A base position from which to compute the position (useful for <code>dx</code> values)
	     * @return {Object} The computed position object in the format <code>{ x: x_in_px, y: y_in_px }</code>
	     */
	    calculatePosition(index) {

	      var position;

	      position = index instanceof _graph2.default ? index : this.getPosition(index);

	      if (!position) {
	        return;
	      }

	      if (position && position.compute) {
	        return position.compute(this.graph, this.getXAxis(), this.getYAxis(), this.getSerie());
	      }

	      this.graph.throw();
	    }

	    /**
	     * Returns a stored position object
	     * @param {Number} [ index = 0 ] - The index of the position to compute
	     * @return {Position} The current shape
	     */
	    getPosition(index) {

	      var pos = this.getProp('position', index || 0);
	      this.setProp('position', pos = _graph2.default.check(pos), index);
	      return pos;
	    }

	    /**
	     * Sets a position object
	     * @param {Position} position - The position object to store
	     * @param {Number} [ index = 0 ] - The index of the position to store
	     * @return {Position} The current shape
	     */
	    setPosition(position, index) {

	      var self = this;
	      var pos = _graph2.default.check(position, function (relativeTo) {
	        return self.getRelativePosition(relativeTo);
	      });

	      return this.setProp('position', pos, index || 0);
	    }

	    /**
	     * Applies the style to the shape. This method can be extended to apply specific style to the shapes
	     * @private
	     * @return {Shape} The current shape
	     */
	    _applyTransforms() {

	      var transforms = this.getProp('transforms'),
	          transformString = "";

	      if (!transforms) {
	        return;
	      }
	      transforms = Array.isArray(transforms) ? transforms : [transforms];

	      if (transforms.length == 0) {
	        return;
	      }

	      for (var i = 0; i < transforms.length; i++) {

	        transformString += transforms[i].type + "(";

	        switch (transforms[i].type) {

	          case 'translate':

	            transformString += _graph2.default.getDeltaPx(transforms[i].arguments[0], this.getXAxis()).replace('px', '');
	            transformString += ", ";
	            transformString += _graph2.default.getDeltaPx(transforms[i].arguments[1], this.getYAxis()).replace('px', '');
	            break;

	          case 'rotate':

	            transformString += transforms[i].arguments[0];
	            transformString += ", ";

	            if (this.transforms[i].arguments.length == 1) {
	              var p = this.getPosition(0);
	              transformString += p.x + ", " + p.y;
	            } else {

	              transformString += _graph2.default.getDeltaPx(transforms[i].arguments[1], this.getXAxis()).replace('px', '');
	              transformString += ", ";
	              transformString += _graph2.default.getDeltaPx(transforms[i].arguments[2], this.getYAxis()).replace('px', '');
	            }

	            break;
	        }

	        transformString += ") ";
	      }

	      this.setDomGroup('transform', transformString);
	      return this;
	    }

	    /**
	     * Creates all the labels
	     * @private
	     * @returns {Shape} The current shape
	     */
	    makeLabels() {

	      var self = this;
	      this._labels = this._labels || [];

	      this._labels.map(function (label) {
	        self.group.removeChild(label);
	      });

	      this._labels = [];

	      var i = 0;

	      while (this.getProp("labelText", i)) {

	        if (!self._labels[i]) {
	          self._labels[i] = document.createElementNS(self.graph.ns, 'text');
	          self._labels[i].setAttribute('data-label-i', i);
	          self._labels[i].jsGraphIsShape = self;
	          self.group.appendChild(this._labels[i]);

	          self._labels[i].addEventListener('dblclick', function (e) {
	            e.stopPropagation();
	            self.labelDblClickListener(e);
	          });
	        }
	        i++;
	      }

	      this.updateLabels();

	      return this;
	    }

	    /**
	     * Determines if the label is editable
	     * @param {Number} labelIndex - The index of the label
	     * @return {Boolean} ```true``` if the label is editable, ```false``` otherwise
	     */
	    isLabelEditable(labelIndex) {
	      return this.getProp('labelEditable', labelIndex || 0);
	    }

	    /**
	     * Applies the label data to the dom object
	     * @private
	     * @param {Number} labelIndex - The index of the label
	     * @returns {Shape} The current shape
	     */
	    updateLabels() {

	      var self = this;
	      this._labels = this._labels || [];

	      for (var i = 0, l = this._labels.length; i < l; i++) {
	        this._applyLabelData(i);
	      }
	    }

	    /**
	     * Applies the label data to the dom object
	     * @private
	     * @param {Number} labelIndex - The index of the label
	     * @returns {Shape} The current shape
	     */
	    _applyLabelData(labelIndex) {

	      labelIndex = labelIndex || 0;

	      /** Sets the position */

	      var visible = this.getProp('labelVisible', labelIndex);

	      if (visible === false) {
	        this._labels[labelIndex].setAttribute('display', 'none');
	        return;
	      } else {
	        this._labels[labelIndex].setAttribute('display', 'initial');
	      }

	      var position = this.calculatePosition(_graph2.default.check(this.getProp("labelPosition", labelIndex)));

	      if (isNaN(position.x) || isNaN(position.y)) {
	        /*console.warn( "Cannot compute positioning for labelIndex " + labelIndex + " with text " + this.getProp( "labelText", labelIndex ) );
	        console.log( this, this._labels );
	        console.trace();*/
	        return;
	      }

	      if (position.x != "NaNpx" && !isNaN(position.x) && position.x !== "NaN" && position.x !== false) {

	        this._labels[labelIndex].setAttribute('x', position.x);
	        this._labels[labelIndex].setAttribute('y', position.y);
	      }

	      /** Sets the angle */
	      var currAngle = this.getProp('labelAngle', labelIndex) || 0;
	      if (currAngle != 0) {

	        var x = this._labels[labelIndex].getAttribute('x'),
	            y = this._labels[labelIndex].getAttribute('y');

	        this._labels[labelIndex].setAttribute('transform', 'rotate(' + currAngle + ' ' + x + ' ' + y + ')');
	      }

	      /** Sets the baseline */
	      this._labels[labelIndex].setAttribute('dominant-baseline', this.getProp('labelBaseline', labelIndex) || 'no-change');

	      /** Sets the baseline */
	      this._labels[labelIndex].textContent = this.getProp('labelText', labelIndex);

	      /** Sets the color */
	      this._labels[labelIndex].setAttribute("fill", this.getProp('labelColor', labelIndex) || 'black');

	      /** Sets the size */
	      this._labels[labelIndex].setAttribute("font-size", this.getProp('labelSize', labelIndex) + "px" || "12px");

	      /** Sets the anchor */
	      this._labels[labelIndex].setAttribute('text-anchor', this._getLabelAnchor(labelIndex));

	      /** Sets the stroke */
	      this._labels[labelIndex].setAttribute('stroke', this.getProp('labelStrokeColor', labelIndex));

	      /** Sets the stroke */
	      this._labels[labelIndex].setAttribute('stroke-width', this.getProp('labelStrokeWidth', labelIndex) + "px");

	      this._labels[labelIndex].setAttribute('stroke-location', 'outside');

	      return this;
	    }

	    /**
	     * Returns the anchor of the label
	     * @private
	     * @param {Number} labelIndex - The index of the label
	     * @returns {String} The anchor in SVG string
	     */
	    _getLabelAnchor(labelIndex) {
	      var anchor = this.getProp('labelAnchor', labelIndex);
	      switch (anchor) {
	        case 'middle':
	        case 'start':
	        case 'end':
	          return anchor;
	          break;

	        case 'right':
	          return 'end';
	          break;

	        case 'left':
	          return 'start';
	          break;

	        default:
	          return 'start';
	          break;
	      }
	    }

	    /**
	     * Returns the shape selection status
	     * @returns {Boolean} true is the shape is selected, false otherwise
	     */
	    isSelected() {
	      return this._selectStatus || false;
	    }

	    /**
	     * Sets or queries whether the shape can have handles. Even if the property is set to false, the getter can return true if the property ```statichandles``` is true (used when handles never disappear)
	     * @param {Boolean} setter - If used, defined if the shape has handles or not
	     * @returns {Boolean} true is the shape has handles, false otherwise
	     * @example Shape.hasHandles( true ); // Sets that the shape has handles
	     * @example Shape.hasHandles( false ); // Sets that the shape has no handles
	     * @example Shape.hasHandles( ); // Queries the shape to determine if it has handles or not. Also returns true if handles are static
	     */
	    hasHandles(setter) {

	      if (setter !== undefined) {
	        this.setProp('handles', setter);
	      }

	      return !!this.getProp('handles') || !!this.getProp('statichandles');
	    }

	    /**
	     * Adds shape handles 
	     * @private 
	     * @return {Shape} The current shape
	     */
	    addHandles() {

	      if (this.isLocked()) {
	        return;
	      }

	      if (!this.handlesInDom) {

	        this.handlesInDom = true;

	        for (var i = 1; i < this.handles.length; i++) {

	          if (this.handles[i]) {
	            this.group.appendChild(this.handles[i]);
	          }
	        }
	      }

	      return this;
	    }

	    /**
	     * Remove shape handles 
	     * @private 
	     * @return {Shape} The current shape
	     */
	    removeHandles() {

	      this.hideHandles();
	      this.handles = [];
	    }

	    /**
	     * Hide shape handles 
	     * @private 
	     * @return {Shape} The current shape
	     */
	    hideHandles() {

	      if (!this.handlesInDom) {
	        return this;
	      }

	      for (var i = 1; i < this.handles.length; i++) {
	        this.group.removeChild(this.handles[i]);
	      }

	      this.handlesInDom = false;
	      return this;
	    }

	    /**
	     * @protected
	     * @return {Boolean} ```true``` if the handles are in the DOM
	     */
	    areHandlesInDom() {

	      return this.handlesInDom;
	    }

	    /**
	     * Selects the shape. Should only be called from jsGraph main instance
	     * @private
	     * @param {Boolean} [ mute = false ] - Mutes the method (no event emission)
	     * @returns {Shape} the current shape
	     */
	    _select(mute) {

	      if (!this.isSelectable()) {
	        return false;
	      }

	      // Put on the stack
	      this.appendToDom();
	      //this.graph.appendShapeToDom( this ); // Put the shape on top of the stack !

	      this._selectStatus = true;

	      this.applySelectedStyle();

	      if (this.hasHandles() && !this.hasStaticHandles()) {
	        this.addHandles();
	        this.setHandles();
	      }

	      if (!mute) {
	        this.graph.emit("shapeSelected", this);
	      }
	    }

	    applySelectedStyle() {

	      if (!this._selectStatus) {
	        return;
	      }

	      var style = this.getSelectStyle();
	      var style2 = {};
	      for (var i in style) {
	        if (typeof style[i] == "function") {
	          style2[i] = style[i].call(this);
	        } else {
	          style2[i] = style[i];
	        }
	      }

	      util.saveDomAttributes(this._dom, style2, 'select');
	    }

	    /**
	     * Unselects the shape. Should only be called from jsGraph main instance
	     * @private
	     * @param {Boolean} [ mute = false ] - Mutes the method (no event emission)
	     * @returns {Shape} the current shape
	     */
	    _unselect(mute) {

	      this._selectStatus = false;

	      util.restoreDomAttributes(this._dom, 'select');

	      if (this.hasHandles() && !this.hasStaticHandles()) {
	        this.hideHandles();
	      }

	      if (!mute) {
	        this.graph.emit("shapeUnselected", this);
	      }
	    }

	    /**
	     * Returns the special style of the shape when it is selected.
	     * @see Shape#setSelectStyle
	     * @param {Object<String,String>} The SVG attributes to apply to the shape
	     */
	    getSelectStyle() {
	      return this.selectStyle;
	    }

	    /**
	     * Defines the style that is applied to the shape when it is selected. The style extends the default style of the shape
	     * @param {Object<String,String>} [ attr = {} ] - The SVG attributes to apply to the shape
	     * @example rectangle.setSelectStyle( { fill: 'red' } );
	     * @returns {Shape} the current shape
	     */
	    setSelectStyle(attr) {
	      this.selectStyle = attr;
	      this.applySelectedStyle(); // Maybe the shape is already selected
	      return this;
	    }

	    /**
	     * Assigns static handles to the shape. In this mode, handles will not disappear
	     * @param {Boolean} staticHandles - true to enable static handles, false to disable them.
	     * @returns {Shape} the current shape
	     */
	    setStaticHandles(staticHandles) {
	      this.setProp('staticHandles', staticHandles);
	    }

	    /**
	     * @returns {Boolean} ```true``` if the shape has static handles, ```false``` otherwise
	     */
	    hasStaticHandles(staticHandles) {
	      return !!this.getProp('staticHandles');
	    }

	    /**
	     * Creates the handles for the shape
	     * @param {Number} nb - The number of handles
	     * @param {String} type - The type of SVG shape to use
	     * @param {Object<String,String>} [ attr = {} ] - The SVG attributes to apply to the handles
	     * @param {Function} [ callbackEach ] - An additional callback the user can provide to further personalize the handles
	     * @returns {Shape} the current shape
	     * @private
	     */
	    _createHandles(nb, type, attr, callbackEach) {

	      if (this.handles && this.handles.length > 0) {
	        return;
	      }

	      var self = this;

	      for (var i = 1, l = nb; i <= l; i++) {

	        (function (j) {

	          var self = this;

	          var handle = document.createElementNS(self.graph.ns, type);
	          handle.jsGraphIsShape = true;

	          if (attr) {
	            for (var k in attr) {
	              handle.setAttribute(k, attr[k]);
	            }
	          }

	          handle.addEventListener('mousedown', function (e) {

	            if (self.isResizable()) {

	              e.preventDefault();
	              e.stopPropagation();

	              self.graph.emit("beforeShapeResize", self);

	              if (!self.graph.prevent(false)) {

	                self.resizing = true;
	                self.handleSelected = j;
	                self.handleMouseDown(e);
	              }
	            }
	          });

	          if (callbackEach) {
	            callbackEach(self.handles[j]);
	          }

	          self.handles[j] = handle;
	        }).call(this, i);
	      }

	      return this.handles;
	    }

	    /**
	     * Creates the handles for the shape. Should be implemented by the children shapes classes.
	     */
	    createHandles() {}

	    /**
	     * Handles mouse down event
	     * @private
	     * @param {Event} e - The native event.prototype
	     */
	    handleMouseDownImpl() {}

	    /**
	     * Handles the mouse move event
	     * @private
	     * @param {Event} e - The native event.prototype
	     */
	    handleMouseMoveImpl() {}

	    /**
	     * Handles mouse up event
	     * @private
	     * @param {Event} e - The native event.prototype
	     */
	    handleMouseUpImpl() {}

	    /**
	     * Called when the shape is created
	     * @private
	     * @param {Event} e - The native event.prototype
	     */
	    handleCreateImpl() {}

	    /**
	     * Handles mouse down events
	     * @param {Event} e - The native event
	     * @return The result of the {@link Shape#handleMouseDownImpl} method.prototype
	     */
	    handleMouseDown(e) {

	      //this.handleSelected = false;

	      if (this.isLocked()) {
	        return;
	      }

	      if (this.isMovable() || this.isResizable()) {

	        this.graph.elementMoving(this);
	      }

	      if (this.getProp('selectOnMouseDown')) {
	        this.graph.selectShape(this);
	      }

	      if (this.isMovable()) {
	        if (!this.resizing) {

	          this.graph.emit("beforeShapeMove", self);

	          if (!this.graph.prevent(false)) {

	            this.moving = true;
	          }
	        } else {}
	      }

	      this._mouseCoords = this.graph._getXY(e);
	      return this.handleMouseDownImpl(e, this._mouseCoords);
	    }

	    /**
	     * Handles mouse click events
	     * @param {Event} e - The native event
	     * @return The result of the {@link Shape#handleMouseDownClick} method
	     * @private
	     */
	    handleClick(e) {

	      if (this.getProp('selectOnClick')) {
	        this.graph.selectShape(this);
	      }

	      if (!this.isSelectable()) {
	        return false;
	      }

	      if (!e.shiftKey) {
	        this.graph.unselectShapes();
	      }

	      this.graph.selectShape(this);
	    }

	    /**
	     * Handles mouse click events
	     * @param {Event} e - The native event
	     * @return The result of the {@link Shape#handleMouseUpImpl} method
	     * @private
	     */
	    handleMouseMove(e) {
	      //console.log( this.resizinh, this.moving, this.isSelected(), this._mouseCoords );
	      if ((this.resizing || this.moving) && !this.isSelected()) {
	        this.graph.selectShape(this);
	      }

	      this.graph.emit("beforeShapeMouseMove", this);

	      if (this.graph.prevent(false) || !this._mouseCoords) {
	        return false;
	      }

	      var coords = this.graph._getXY(e);
	      var deltaX = this.getXAxis().getRelVal(coords.x - this._mouseCoords.x),
	          deltaY = this.getYAxis().getRelVal(coords.y - this._mouseCoords.y);

	      if (deltaX != 0 || deltaY !== 0) {
	        this.preventUnselect = true;
	      }

	      this._mouseCoords = coords;

	      var ret = this.handleMouseMoveImpl(e, deltaX, deltaY, coords.x - this._mouseCoords.x, coords.y - this._mouseCoords.y);

	      return ret;
	    }

	    /**
	     * Handles mouse up events
	     * @param {Event} e - The native event
	     * @return The result of the {@link Shape#handleMouseUpImpl} method
	     * @private
	     */
	    handleMouseUp(e) {

	      if (this.moving) {

	        this.graph.emit("shapeMoved", this);
	      }

	      if (this.handleSelected || this.resize) {

	        this.graph.emit("shapeResized", this);
	      }

	      this.moving = false;
	      this.resizing = false;
	      this.handleSelected = false;
	      this.graph.elementMoving(false);

	      return this.handleMouseUpImpl(e);
	    }

	    /**
	     * Handles double click events
	     * @param {Event} e - The native event
	     * @return The result of the {@link Shape#handleMouseDblClickImpl} method
	     * @private
	     */
	    handleDblClick(e) {}

	    /**
	     * Handles mouse over events
	     * @param {Event} e - The native event
	     * @return The result of the {@link Shape#handleMouseOverImpl} method
	     * @private
	     */
	    handleMouseOver() {

	      if (this.getProp("highlightOnMouseOver")) {

	        if (!this.moving && !this.resizing) {
	          this.highlight();
	        }
	      }

	      this.graph.emit("shapeMouseOver", this);
	    }

	    /**
	     * Handles mouse out events
	     * @param {Event} e - The native event
	     * @return The result of the {@link Shape#handleMouseOutImpl} method
	     * @private
	     */
	    handleMouseOut() {

	      if (this.getProp("highlightOnMouseOver")) {
	        this.unHighlight();
	      }

	      this.graph.emit("shapeMouseOut", this);
	    }

	    /*
	     *  Updated July 1st, 2015
	     */

	    /**
	     * Locks the shape (prevents selection, resizing and moving)
	     * @return {Shape} The current shape
	     */
	    lock() {
	      this.setProp('locked', true);
	      return this;
	    }

	    /**
	     * Unlocks the shape (prevents selection, resizing and moving)
	     * @return {Shape} The current shape
	     */
	    unlock() {
	      this.setProp('locked', false);
	      return this;
	    }

	    /**
	     * @return {Boolean} True if the shape is locked, false otherwise
	     */
	    isLocked() {
	      return this.getProp('locked') || this.graph.shapesLocked;
	    }

	    /**
	     * Makes the shape moveable
	     * @return {Shape} The current shape
	     */
	    movable(bln) {
	      this.setProp('movable', true);
	    }

	    /**
	     * Makes the shape non-moveable
	     * @return {Shape} The current shape
	     */
	    unmovable() {
	      this.setProp('movable', false);
	      return false;
	    }

	    /**
	     * @return {Boolean} True if the shape is movable, false otherwise
	     */
	    isMovable() {
	      return this.getProp('movable');
	    }

	    /**
	     * Makes the shape resizable
	     * @return {Shape} The current shape
	     */
	    resizable() {
	      this.setProp('resizable', true);
	    }

	    /**
	     * Makes the shape non-resizable
	     * @return {Shape} The current shape
	     */
	    unresizable() {
	      this.setProp('resizable', false);
	    }

	    /**
	     * @return {Boolean} True if the shape is resizable, false otherwise
	     */
	    isResizable() {
	      return this.getProp('resizable');
	    }

	    /**
	     * Makes the shape selectable
	     * @return {Shape} The current shape
	     */
	    selectable() {
	      this.setProp('selectable', true);
	    }

	    /**
	     * Makes the shape non-selectable
	     * @return {Shape} The current shape
	     */
	    unselectable() {
	      this.graph.unselectShape(this);
	      this.setProp('selectable', false);
	    }

	    /**
	     * @return {Boolean} True if the shape is selectable, false otherwise
	     */
	    isSelectable() {
	      return this.getProp('selectable');
	    }

	    /**
	     * Highlights the shape with attributes
	     * @returns {Shape} The current shape
	     * @param {Object<String,String>} [ attributes ] - A hashmap of attributes to apply. If omitted, {@link Shape#getHighlightAttributes} will be called
	     * @param {String} [ saveDomName=highlight ] - The name to which the current shape attributes will be saved to be recovered later with the {@link Shape#unHighlight} method
	     * @example shape.highlight( { fill: 'red', 'fill-opacity': 0.5 } );
	     * @see Shape#unHighlight
	     */
	    highlight(attributes, saveDomName) {

	      if (!attributes) {
	        attributes = this.getHighlightAttributes();
	      }

	      if (!saveDomName) {
	        saveDomName = "highlight";
	      }

	      util.saveDomAttributes(this._dom, attributes, saveDomName);
	      this.highlightImpl();
	      return this;
	    }

	    /**
	     * Removes the highlight properties from the same
	     * @returns {Shape} The current shape 
	     * @param {String} [ saveDomName=highlight ] - The name to which the current shape attributes will be saved to be recovered later with the {@link Shape#unHighlight} method
	     * @see Shape#highlight
	     */
	    unHighlight(saveDomName) {

	      if (!saveDomName) {
	        saveDomName = "highlight";
	      }

	      util.restoreDomAttributes(this._dom, saveDomName);
	      this.unHighlightImpl();
	      return this;
	    }

	    highlightImpl() {}
	    unHighlightImpl() {}

	    /**
	     * @returns {Object} The attributes taken by the shape when highlighted
	     * @see Shape#highlight
	     */
	    getHighlightAttributes() {
	      return this._highlightAttributes;
	    }

	    /**
	     * Sets the attributes the shape will take when highlighted
	     * @param {Object<String,String>} [ attributes ] - A hashmap of attributes to apply when the shape is highlighted
	     * @returns {Shape} The current shape
	     * @see Shape#highlight
	     */
	    setHighlightAttributes(attributes) {
	      this._highlightAttributes = attributes;
	      return this;
	    }

	    /**
	     * Returns the masking id of the shape. Returns null if the shape does not behave as a mask
	     * @returns {String} The ```id``` attribute of the shape
	     */
	    getMaskingID() {
	      return this.maskingId;
	    }

	    /**
	     * Masks the current shape with another shape passed as the first parameter of the method
	     * @param {Shape} maskingShape - The shape used to mask the current shape
	     * @return {Shape} The current shape
	     */
	    maskWith(maskingShape) {

	      var maskingId;

	      if (maskingId = maskingShape.getMaskingID()) {

	        this._dom.setAttribute('mask', 'url(#' + maskingId + ')');
	      } else {

	        this._dom.removeAttribute('mask');
	      }
	    }

	    /**
	     * Manually updates the mask of the shape. This is needed because the shape needs to be surrounded by a white rectangle (because transparent is treated as black and will not render the shape)
	     * This method will work well for rectangles but should be overridden for other shapes
	     * @return {Shape} The current shape
	     * @todo Explore a way to make it compatible for all kinds of shapes. Maybe the masker position should span the whole graph...
	     */
	    updateMask() {
	      return;
	      if (!this.maskDom) {
	        return;
	      }

	      var position = {
	        x: 'min',
	        y: 'min'
	      };
	      var position2 = {
	        x: 'max',
	        y: 'max'
	      };

	      position = this._getPosition(position);
	      position2 = this._getPosition(position2);

	      this.maskDomWrapper.setAttribute('x', Math.min(position.x, position2.x));
	      this.maskDomWrapper.setAttribute('y', Math.min(position.y, position2.y));

	      this.maskDomWrapper.setAttribute('width', Math.abs(position2.x - position.x));
	      this.maskDomWrapper.setAttribute('height', Math.abs(position2.y - position.y));

	      for (var i = 0; i < this._dom.attributes.length; i++) {
	        this.maskDom.setAttribute(this._dom.attributes[i].name, this._dom.attributes[i].value);
	      }

	      this.maskDom.setAttribute('fill', 'black');

	      return this;
	    }

	    labelDblClickListener(e) {

	      var i = parseInt(e.target.getAttribute('data-label-i'));

	      var self = this;

	      if (isNaN(i)) {
	        return;
	      }

	      if (!this.isLabelEditable(i)) {
	        return;
	      }

	      e.preventDefault();
	      e.stopPropagation();

	      var shapeLabel = document.createElement('input');
	      shapeLabel.setAttribute('type', 'text');
	      shapeLabel.setAttribute('value', self.getProp('labelText', i));
	      self.graph._dom.prepend(shapeLabel);
	      util.setCSS(shapeLabel, {
	        position: 'absolute',
	        marginTop: parseInt(e.target.getAttribute('y').replace('px', '')) - 10 + 'px',
	        marginLeft: parseInt(e.target.getAttribute('x').replace('px', '')) - 50 + 'px',
	        textAlign: 'center',
	        width: '100px'
	      });
	      shapeLabel.addEventListener('blur', function () {
	        self.setLabelText(shapeLabel.getAttribute('value'), i);
	        self._labels[i].textContent = shapeLabel.getAttribute('value');
	        shapeLabel.remove();
	        self.changed("shapeLabelChanged");
	      });
	      shapeLabel.addEventListener('keyup', function (e) {
	        e.stopPropagation();
	        e.preventDefault();
	        if (e.keyCode === 13) {
	          shapeLabel.dispatchEvent(new Event('blur'));
	        }
	      });
	      shapeLabel.addEventListener('keypress', function (e) {
	        e.stopPropagation();
	      });
	      shapeLabel.addEventListener('keydown', function (e) {
	        e.stopPropagation();
	      });
	      shapeLabel.focus();
	    }

	    /**
	     * Appends the shape DOM to its parent
	     * @private
	     * @return {Shape} The current shape
	     */
	    appendToDom() {

	      if (this._forcedParentDom) {

	        this._forcedParentDom.appendChild(this.group);
	      } else {
	        this.graph.appendShapeToDom(this);
	      }
	      return this;
	    }

	    /**
	     * Forces the DOM parent (instead of the normal layer)
	     * @return {Shape} The current shape
	     */
	    forceParentDom(dom) {

	      this._forcedParentDom = dom;

	      return this;
	    }
	  }

	  /**
	   * @alias Shape#calculatePosition
	   */
	  Shape.prototype.computePosition = Shape.prototype.calculatePosition;

	  /**
	   * @alias Shape#displayLabel
	   */
	  Shape.prototype.showLabel = Shape.prototype.displayLabel;

	  /**
	   * @alias Shape#kill
	   */
	  Shape.prototype.remove = Shape.prototype.kill;

	  exports.default = Shape;
	});

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(22)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('./graph.shape'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.graph);
	    global.graphShapeAreaundercurve = mod.exports;
	  }
	})(this, function (exports, _graph) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _graph2 = _interopRequireDefault(_graph);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  /**
	   *  Displays a surface under a line serie
	   *  @extends GraphShape
	   */
	  class ShapeSurfaceUnderCurve extends _graph2.default {

	    createDom() {
	      this._dom = document.createElementNS(this.graph.ns, 'path');
	    }

	    createHandles() {

	      this._createHandles(2, 'line', {
	        'stroke-width': '3',
	        'stroke': 'transparent',
	        'pointer-events': 'stroke',
	        'cursor': 'ew-resize'
	      });
	    }

	    handleMouseMoveImpl(e, deltaX, deltaY) {

	      if (this.isLocked()) {
	        return;
	      }

	      if (this.moving) {

	        this.getPosition(0).deltaPosition('x', deltaX, this.getXAxis());
	        this.getPosition(1).deltaPosition('x', deltaX, this.getXAxis());
	      } else if (this.serie && this.handleSelected) {

	        this.resizingPosition = this.handleSelected == 1 ? this.getPosition(0) : this.getPosition(1);

	        var value = this.serie.searchClosestValue(this.getXAxis().getVal(this.graph._getXY(e).x - this.graph.getPaddingLeft()));

	        if (!value) {
	          return;
	        }

	        if (this.resizingPosition.x != value.xMin) {
	          this.preventUnselect = true;
	        }

	        this.resizingPosition.x = value.xMin;
	      } else if (this.handleSelected) {

	        this.resizingPosition = this.handleSelected == 1 ? this.getPosition(0) : this.getPosition(1);
	        this.resizingPosition.deltaPosition('x', deltaX, this.getXAxis());
	      }

	      this.applyPosition();
	    }
	    /*
	        redrawImpl: function() {
	          //var doDraw = this.setPosition();
	          //	this.setDom('fill', 'url(#' + 'patternFill' + this.graph._creation + ')')
	           if ( this.position != this.doDraw ) {
	            this.group.setAttribute( "visibility", this.position ? "visible" : 'hidden' );
	            this.doDraw = this.position;
	          }
	        },
	    */
	    applyPosition() {

	      if (!this.serie) {
	        return;
	      }

	      var posXY = this.computePosition(0),
	          posXY2 = this.computePosition(1),
	          w = Math.abs(posXY.x - posXY2.x),
	          x = Math.min(posXY.x, posXY2.x);

	      //  this.reversed = x == posXY2.x;

	      if (w < 2 || x + w < 0 || x > this.graph.getDrawingWidth()) {
	        this.setDom('d', "");
	        return false;
	      }

	      var v1 = this.serie.searchClosestValue(this.getPosition(0).x),
	          v2 = this.serie.searchClosestValue(this.getPosition(1).x),
	          v3,
	          i,
	          j,
	          init,
	          max,
	          k,
	          x,
	          y,
	          firstX,
	          firstY,
	          currentLine,
	          maxY = 0,
	          minY = Number.MAX_VALUE;

	      if (!v1 || !v2) {
	        return false;
	      }

	      if (v1.xBeforeIndex > v2.xBeforeIndex) {
	        v3 = v1;
	        v1 = v2;
	        v2 = v3;

	        //this.handleSelected = ( this.handleSelected == 1 ) ? 2 : 1;
	      }

	      this.counter = 0;

	      for (i = v1.dataIndex; i <= v2.dataIndex; i++) {
	        this.currentLine = "";
	        init = i == v1.dataIndex ? v1.xBeforeIndexArr : 0;
	        max = i == v2.dataIndex ? v2.xBeforeIndexArr : this.serie.data[i].length;
	        k = 0;

	        if (init == max) {
	          max++;
	        }

	        for (j = init; j <= max; j += 2) {

	          x = this.serie.getX(this.serie.data[i][j + 0]);
	          y = this.serie.getY(this.serie.data[i][j + 1]);

	          maxY = Math.max(this.serie.data[i][j + 1], maxY);
	          minY = Math.min(this.serie.data[i][j + 1], minY);

	          if (j == init) {
	            this.firstX = x;
	            this.firstY = y;
	          }

	          if (k > 0) {
	            this.currentLine += " L " + x + " " + y + " ";
	          } else {
	            this.currentLine += " M " + x + " " + y + " ";
	          }

	          //this.serie._addPoint( x, y, false, this.currentLine );
	          k++;
	        }

	        this.lastX = x;
	        this.lastY = y;

	        if (!this.firstX || !this.firstY || !this.lastX || !this.lastY) {
	          return;
	        }

	        this.currentLine += " V " + this.getYAxis().getPx(0) + " H " + this.firstX + " z";
	        this.setDom('d', this.currentLine);
	      }

	      this.maxY = this.serie.getY(maxY);
	      this.setHandles();

	      this.changed();

	      return true;
	    }

	    setHandles() {

	      if (!this.firstX) {
	        return;
	      }

	      var posXY = this.computePosition(0),
	          posXY2 = this.computePosition(1);

	      if (posXY.x < posXY2.x) {

	        this.handles[1].setAttribute('x1', this.firstX);
	        this.handles[1].setAttribute('x2', this.firstX);

	        this.handles[2].setAttribute('x1', this.lastX);
	        this.handles[2].setAttribute('x2', this.lastX);
	      } else {

	        this.handles[1].setAttribute('x1', this.lastX);
	        this.handles[1].setAttribute('x2', this.lastX);

	        this.handles[2].setAttribute('x1', this.firstX);
	        this.handles[2].setAttribute('x2', this.firstX);
	      }
	      this.handles[1].setAttribute('y1', this.getYAxis().getMaxPx());
	      this.handles[1].setAttribute('y2', this.serie.getY(0));

	      this.handles[2].setAttribute('y1', this.getYAxis().getMaxPx());
	      this.handles[2].setAttribute('y2', this.serie.getY(0));
	    }
	  }

	  exports.default = ShapeSurfaceUnderCurve;
	});

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(3), __webpack_require__(22)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('../graph.util'), require('./graph.shape'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.graph, global.graph);
	    global.graphShapeEllipse = mod.exports;
	  }
	})(this, function (exports, _graph, _graph2) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var util = _interopRequireWildcard(_graph);

	  var _graph3 = _interopRequireDefault(_graph2);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  function _interopRequireWildcard(obj) {
	    if (obj && obj.__esModule) {
	      return obj;
	    } else {
	      var newObj = {};

	      if (obj != null) {
	        for (var key in obj) {
	          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	        }
	      }

	      newObj.default = obj;
	      return newObj;
	    }
	  }

	  /**
	   * Displays an ellipse
	   * @extends Shape
	   */
	  class ShapeEllipse extends _graph3.default {

	    constructor(graph, options) {
	      super(graph, options);
	    }

	    createDom() {
	      this._dom = document.createElementNS(this.graph.ns, 'ellipse');
	    }

	    applyPosition() {

	      var pos = this.computePosition(0);

	      this.setDom('cx', pos.x || 0);
	      this.setDom('cy', pos.y || 0);

	      this.setDom('rx', this.getProp('rx') || 0);
	      this.setDom('ry', this.getProp('ry') || 0);

	      return true;
	    }

	    handleMouseUpImpl() {
	      this.triggerChange();
	    }

	    handleMouseMoveImpl(e, deltaX, deltaY, deltaXPx, deltaYPx) {
	      return;
	    }
	  }

	  exports.default = ShapeEllipse;
	});

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(22)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('./graph.shape'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.graph);
	    global.graphShapeLabel = mod.exports;
	  }
	})(this, function (exports, _graph) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _graph2 = _interopRequireDefault(_graph);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  /**
	   * Blank shape used to display label
	   * Use myShapelabel.setLabelText(); and associated methods
	   * @extend GraphShape
	   */
	  class ShapeLabel extends _graph2.default {

	    constructor(graph, options) {

	      super(graph, options);
	    }

	    createDom() {
	      return false;
	    }

	    applyPosition() {
	      return true;
	    }
	  }

	  exports.default = ShapeLabel;
	});

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(22)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('./graph.shape'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.graph);
	    global.graphShapePolyline = mod.exports;
	  }
	})(this, function (exports, _graph) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _graph2 = _interopRequireDefault(_graph);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  /** 
	   * Represents a line that extends the Shape class. Used by the plugin {@link PluginSerieLineDifference}
	   * @extends Shape
	   * @see Graph#newShape
	   */
	  class ShapePolyline extends _graph2.default {

	    constructor(graph, options) {
	      super(graph, options);
	    }

	    /**
	     * Creates the DOM
	     * @private
	     * @return {Shape} The current shape
	     */
	    createDom() {

	      this._dom = document.createElementNS(this.graph.ns, 'path');
	      this.setStrokeColor('black');
	      this.setStrokeWidth(1);
	    }

	    /**
	     * No handles for the polyline
	     * @private
	     * @return {Shape} The current shape
	     */
	    createHandles() {}

	    /**
	     *  Force the points of the polyline already computed in pixels
	     *  @param {String} a SVG string to be used in the ```d``` attribute of the path.
	     *  @return {ShapePolyline} The current polyline instance
	     */
	    setPointsPx(points) {
	      this.pxPoints = points;
	      return this;
	    }

	    /**
	     * Recalculates the positions and applies them
	     * @private
	     * @return {Boolean} Whether the shape should be redrawn
	     */
	    applyPosition() {

	      if (this.pxPoints) {
	        this.setDom('d', this.pxPoints);
	      } else if (this.points) {

	        var xAxis, yAxis;

	        if (this.serie) {

	          xAxis = this.serie.getXAxis();
	          yAxis = this.serie.getYAxis();
	        } else if (this.xAxis && this.yAxis) {

	          xAxis = this.xAxis;
	          yAxis = this.yAxis;
	        }

	        this.setDom('d', 'M ' + this.points.map(function (p) {
	          return xAxis.getPx(p[0]) + ", " + yAxis.getPx(p[1]);
	        }).join(" L "));
	      }

	      return true;
	    }
	  }

	  exports.default = ShapePolyline;
	});

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(22)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('./graph.shape'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.graph);
	    global.graphShapeLine = mod.exports;
	  }
	})(this, function (exports, _graph) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _graph2 = _interopRequireDefault(_graph);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  /** 
	   * Represents a line
	   * @extends Shape
	   * @see Graph#newShape
	   */
	  class ShapeLine extends _graph2.default {

	    constructor(graph, options) {
	      super(graph, options);
	    }

	    /**
	     * Creates the DOM
	     * @private
	     * @return {Shape} The current shape
	     */
	    createDom() {

	      this._dom = document.createElementNS(this.graph.ns, 'line');

	      this.setStrokeColor('black');
	      this.setStrokeWidth(1);
	    }

	    /**
	     * Creates the handles
	     * @private
	     * @return {Shape} The current shape
	     */
	    createHandles() {

	      this._createHandles(2, 'rect', {
	        transform: "translate(-3 -3)",
	        width: 6,
	        height: 6,
	        stroke: "black",
	        fill: "white",
	        cursor: 'nwse-resize'
	      });
	    }

	    /**
	     * Recalculates the positions and applies them
	     * @private
	     * @return {Boolean} Whether the shape should be redrawn
	     */
	    applyPosition() {

	      var position = this.calculatePosition(0);
	      var position2 = this.calculatePosition(1);

	      if (!position || !position.x || !position.y) {
	        return;
	      }

	      this.setDom('x2', position.x);
	      this.setDom('y2', position.y);

	      this.setDom('y1', position2.y);
	      this.setDom('x1', position2.x);

	      this.currentPos2x = position2.x;
	      this.currentPos2y = position2.y;

	      this.currentPos1x = position.x;
	      this.currentPos1y = position.y;

	      return true;
	    }

	    /**
	     * Handles mouse move events
	     * @private
	     */
	    handleMouseMoveImpl(e, deltaX, deltaY, deltaXPx, deltaYPx) {

	      if (this.isLocked()) {
	        return;
	      }

	      var pos = this.getPosition(0);
	      var pos2 = this.getPosition(1);

	      var posToChange;
	      if (this.handleSelected == 1) {

	        posToChange = pos;
	      } else if (this.handleSelected == 2) {

	        posToChange = pos2;
	      }

	      if (posToChange) {

	        if (!this._data.vertical) {
	          posToChange.deltaPosition('x', deltaX, this.getXAxis());
	        }

	        if (!this._data.horizontal) {
	          posToChange.deltaPosition('y', deltaY, this.getYAxis());
	        }
	      }

	      if (this.moving) {

	        // If the pos2 is defined by a delta, no need to move them
	        if (pos.x) {
	          pos.deltaPosition('x', deltaX, this.getXAxis());
	        }
	        if (pos.y) {
	          pos.deltaPosition('y', deltaY, this.getYAxis());
	        }

	        // If the pos2 is defined by a delta, no need to move them
	        if (pos2.x) {
	          pos2.deltaPosition('x', deltaX, this.getXAxis());
	        }
	        if (pos2.y) {
	          pos2.deltaPosition('y', deltaY, this.getYAxis());
	        }
	      }

	      if (this._data.forcedCoords) {

	        var forced = this._data.forcedCoords;

	        if (forced.y !== undefined) {

	          if (typeof forced.y == "function") {
	            pos2.y = pos.y = forced.y(this);
	          } else {
	            pos2.y = forced.y;
	            pos.y = forced.y;
	          }
	        }

	        if (forced.x !== undefined) {

	          if (typeof forced.x == "function") {
	            pos2.x = pos.x = forced.x(this);
	          } else {
	            pos2.x = forced.x;
	            pos.x = forced.x;
	          }
	        }
	      }

	      if (this.rectEvent) {
	        this.setEventReceptacle();
	      }

	      this.redraw();
	      this.changed();
	      this.setHandles();

	      return true;
	    }

	    /**
	     * Sets the handle position
	     * @private
	     */
	    setHandles() {

	      if (!this.areHandlesInDom()) {
	        return;
	      }

	      if (isNaN(this.currentPos1x)) {
	        return;
	      }

	      this.handles[1].setAttribute('x', this.currentPos1x);
	      this.handles[1].setAttribute('y', this.currentPos1y);

	      this.handles[2].setAttribute('x', this.currentPos2x);
	      this.handles[2].setAttribute('y', this.currentPos2y);
	    }

	    /**
	     * Creates an line receptacle with the coordinates of the line, but continuous and thicker
	     * @return {Shape} The current shape
	     */
	    setEventReceptacle() {

	      if (!this.currentPos1x) {
	        return;
	      }

	      if (!this.rectEvent) {
	        this.rectEvent = document.createElementNS(this.graph.ns, 'line');
	        this.rectEvent.setAttribute('pointer-events', 'stroke');
	        this.rectEvent.setAttribute('stroke', 'transparent');
	        this.rectEvent.jsGraphIsShape = this;
	        this.group.appendChild(this.rectEvent);
	      }

	      this.rectEvent.setAttribute('x1', this.currentPos1x);
	      this.rectEvent.setAttribute('y1', this.currentPos1y);
	      this.rectEvent.setAttribute('x2', this.currentPos2x);
	      this.rectEvent.setAttribute('y2', this.currentPos2y);
	      this.rectEvent.setAttribute("stroke-width", this.getProp("strokeWidth") + 2);
	    }
	  }

	  exports.default = ShapeLine;
	});

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(23), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('./graph.shape.areaundercurve'), require('../graph.position'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.graphShape, global.graph);
	    global.graphShapeNmrintegral = mod.exports;
	  }
	})(this, function (exports, _graphShape, _graph) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _graphShape2 = _interopRequireDefault(_graphShape);

	  var _graph2 = _interopRequireDefault(_graph);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  /**
	   * Displays an integral with NMR style
	   * @extends ShapeSurfaceUnderCurve
	   */
	  class ShapeNMRIntegral extends _graphShape2.default {

	    constructor(graph, options) {
	      super(graph, options);
	      this.nbHandles = 2;
	    }

	    createHandles() {

	      this._createHandles(2, 'rect', {
	        transform: "translate(-3 -3)",
	        width: 6,
	        height: 6,
	        stroke: "black",
	        fill: "white"
	      });
	    }

	    applyPosition() {

	      var posXY = this.calculatePosition(0),
	          posXY2 = this.calculatePosition(1),
	          w,
	          x,
	          axis = this.getAxis(),
	          points = [];

	      let baseLine = this.yBaseline;

	      if (!posXY || !posXY2) {
	        return;
	      }

	      if (!this.serie.isFlipped()) {

	        baseLine = this.getYAxis().getPx(0) - baseLine;

	        w = Math.abs(posXY.x - posXY2.x);
	        x = Math.min(posXY.x, posXY2.x);
	      } else {

	        baseLine = this.getXAxis().getPx(0) - baseLine;

	        w = Math.abs(posXY.y - posXY2.y);
	        x = Math.min(posXY.y, posXY2.y);
	      }

	      this.computedBaseline = baseLine;
	      this.reversed = x == posXY2.x;

	      var pos1 = this.getPosition(0);
	      var pos2 = this.getPosition(1);

	      if (axis == 'x' && (w < 2 || x + w < 0 || x > this.graph.getDrawingWidth()) || axis == 'y' && (w < 2 || x + w < 0 || x > this.graph.getDrawingHeight())) {

	        points = [[0, 0]];
	        this.hideLabel(0);
	        this.setDom("d", "");
	        this.hideHandles();
	      } else {

	        this.showLabel(0);

	        var v1 = this.serie.searchClosestValue(pos1[axis]),
	            v2 = this.serie.searchClosestValue(pos2[axis]),
	            v3,
	            i,
	            j,
	            init,
	            max,
	            k,
	            x,
	            y,
	            firstX,
	            firstY,
	            currentLine = "",
	            maxY = 0,
	            incrYFlip = 1,
	            incrXFlip = 0,
	            minY = Number.MAX_VALUE;

	        if (!v1 || !v2) {
	          return false;
	        }

	        posXY.y = v1.yMin;
	        posXY2.y = v2.yMin;

	        if (v1.xBeforeIndex > v2.xBeforeIndex) {
	          v3 = v1;
	          v1 = v2;
	          v2 = v3;
	        }

	        var firstX,
	            firstY,
	            lastX,
	            lastY,
	            firstXVal,
	            firstYVal,
	            lastXVal,
	            lastYVal,
	            sum = 0,
	            diff;
	        var ratio = this.scaling;

	        if (this.serie.isFlipped()) {
	          incrYFlip = 0;
	          incrXFlip = 1;
	        }

	        for (i = v1.dataIndex; i <= v2.dataIndex; i++) {

	          init = i == v1.dataIndex ? v1.xBeforeIndexArr : 0;
	          max = i == v2.dataIndex ? v2.xBeforeIndexArr : this.serie.data[i].length;
	          k = 0;

	          for (j = init; j <= max; j += 2) {

	            x = this.serie.getX(this.serie.data[i][j + incrXFlip]);
	            y = this.serie.getY(this.serie.data[i][j + incrYFlip]);

	            if (this.serie.isFlipped()) {
	              var x2 = x;
	              x = y;
	              y = x2;
	            }

	            if (!firstX) {
	              firstX = x;
	              firstY = y;
	              firstXVal = this.serie.data[i][j + incrXFlip];
	              firstYVal = this.serie.data[i][j + incrYFlip];
	            }

	            if (lastX == undefined) {
	              lastX = x;
	              lastY = y;

	              lastXVal = this.serie.data[i][j + incrXFlip];
	              lastYVal = this.serie.data[i][j + incrYFlip];

	              continue;
	            }

	            sum += (this.serie.data[i][j + incrXFlip] - lastXVal) * this.serie.data[i][j + incrYFlip] * 0.5;

	            lastXVal = this.serie.data[i][j + incrXFlip];

	            if (x == lastX && y == lastY) {
	              continue;
	            }

	            lastX = x;
	            lastY = y;

	            points.push([x, sum]);
	            k++;
	          }

	          this.lastX = x;
	          this.lastY = y;

	          if (!firstX || !firstY || !this.lastX || !this.lastY) {
	            return;
	          }
	        }

	        if (sum == 0) {
	          sum = 1; // Will look line a line anyway
	        }

	        var ratio;

	        if (!this._ratio) {
	          ratio = 150 / sum;
	        } else {
	          ratio = this._ratio;
	        }

	        for (var i = 0, l = points.length; i < l; i++) {
	          //   console.log( points[ i ][ 1 ] / sum );
	          points[i][1] = baseLine - points[i][1] * ratio;

	          if (i == 0) {
	            this.firstPointX = points[i][0];
	            this.firstPointY = points[i][1];
	          }
	          currentLine += " L " + points[i][incrXFlip] + ", " + points[i][incrYFlip] + " ";

	          this.lastPointX = points[i][0];
	          this.lastPointY = points[i][1];
	        }

	        this.points = points;
	        this.sum = sum;

	        var lastY = firstY,
	            lastX = this.lastX;

	        var interX = firstX;
	        diff = Math.min(20, lastX - firstX);

	        if (this.serie.isFlipped()) {
	          currentLine = " M " + baseLine + ", " + firstX + " " + currentLine;
	        } else {
	          currentLine = " M " + firstX + ", " + baseLine + " " + currentLine;
	        }

	        this.setDom('d', currentLine);

	        this.firstX = firstX;
	        this.firstY = firstY;

	        this.maxY = this.serie.getY(maxY);
	        if (this._selected) {
	          this.select();
	        }

	        this.setHandles();
	      }

	      this.setLabelPosition(new _graph2.default({
	        x: (pos1.x + pos2.x) / 2,
	        y: (this.firstPointY + this.lastPointY) / 2 + "px"
	      }));

	      this.updateLabels();
	      this.changed();

	      return true;
	    }

	    getAxis() {
	      return this._data.axis || 'x';
	    }

	    /**
	     * User to screen coordinate transform. In (unit)/(px), (unit) being the unit of the integral (x * y)
	     * @type {Number}
	     */
	    set ratio(r = 1) {
	      this._ratio = r;
	    }

	    get ratio() {
	      return this._ratio;
	    }

	    set yBaseline(y = 30) {
	      this._yBaseline = y;
	    }

	    get yBaseline() {
	      return this._yBaseline || 30;
	    }

	    selectStyle() {
	      this.setDom('stroke-width', '2px');
	    }

	    selectHandles() {} // Cancel areaundercurve

	    setHandles() {

	      if (this.points == undefined) {
	        return;
	      }

	      if (!this.isSelected()) {
	        return;
	      }

	      this.addHandles();

	      var posXY = this.computePosition(0),
	          posXY2 = this.computePosition(1);

	      if (posXY.x < posXY2.x) {

	        this.handles[1].setAttribute('x', this.firstPointX);
	        this.handles[1].setAttribute('y', this.firstPointY);
	        this.handles[2].setAttribute('x', this.lastPointX);
	        this.handles[2].setAttribute('y', this.lastPointY);
	      } else {

	        this.handles[2].setAttribute('x', this.firstPointX);
	        this.handles[2].setAttribute('y', this.firstPointY);
	        this.handles[1].setAttribute('x', this.lastPointX);
	        this.handles[1].setAttribute('y', this.lastPointY);
	      }
	    }
	  }

	  exports.default = ShapeNMRIntegral;
	});

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(30)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('./graph.shape.rect'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.graphShape);
	    global.graphShapePeakintegration2d = mod.exports;
	  }
	})(this, function (exports, _graphShape) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _graphShape2 = _interopRequireDefault(_graphShape);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  class ShapePeakIntegration2D extends _graphShape2.default {

	    constructor(graph, options) {

	      super(graph, options);
	      this.nbHandles = 4;
	    }

	    createDom() {

	      this._dom = document.createElementNS(this.graph.ns, 'rect');
	      this._dom.element = this;

	      this.createHandles(this.nbHandles, 'rect', {
	        transform: "translate(-3 -3)",
	        width: 6,
	        height: 6,
	        stroke: "black",
	        fill: "white",
	        cursor: 'nwse-resize'
	      });
	    }

	    redrawImpl() {

	      this.setPosition();
	      this.setHandles();
	      this.setBindableToDom(this._dom);
	    }

	  }

	  exports.default = ShapePeakIntegration2D;
	});

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(22), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('./graph.shape'), require('../graph.util'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.graph, global.graph);
	    global.graphShapeRect = mod.exports;
	  }
	})(this, function (exports, _graph, _graph3) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _graph2 = _interopRequireDefault(_graph);

	  var util = _interopRequireWildcard(_graph3);

	  function _interopRequireWildcard(obj) {
	    if (obj && obj.__esModule) {
	      return obj;
	    } else {
	      var newObj = {};

	      if (obj != null) {
	        for (var key in obj) {
	          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	        }
	      }

	      newObj.default = obj;
	      return newObj;
	    }
	  }

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  /** 
	   * Represents a rectangle that extends the Shape class
	   * @class ShapeRectangle
	   * @augments Shape
	   * @see Graph#newShape
	   */
	  class ShapeRectangle extends _graph2.default {

	    constructor(graph, options) {
	      super(graph, options);
	    }

	    /**
	     * Creates the DOM
	     * @private
	     * @return {Shape} The current shape
	     */
	    createDom() {
	      var self = this;
	      this._dom = document.createElementNS(this.graph.ns, 'rect');

	      this.setStrokeColor('black');
	      this.setStrokeWidth(1);
	      this.setFillColor('transparent');

	      return this;
	    }

	    /**
	     * Creates the Handles
	     * @private
	     * @return {Shape} The current shape
	     */
	    createHandles() {
	      if (!this.hasHandles()) {
	        return;
	      }

	      /*
	            this._data.handles = this._data.handles ||  {
	              type: 'corners'
	            };
	      */
	      var handles = this.getProp('handles');

	      if (typeof handles != "object") {
	        handles = {};
	      }

	      if (!handles.type) {
	        handles.type = "corners";
	      }

	      switch (handles.type) {

	        case 'sides':

	          util.extend(handles, {
	            sides: {
	              top: true,
	              bottom: true,
	              left: true,
	              right: true
	            }
	          });

	          var j = 0;
	          for (var i in handles.sides) {
	            if (handles.sides[i]) {
	              j++;
	            }
	          }

	          this._createHandles(j, 'g').map(function (g) {

	            var r = document.createElementNS(self.graph.ns, 'rect');
	            r.setAttribute('x', '-3');
	            r.setAttribute('width', '6');
	            r.setAttribute('y', '-6');
	            r.setAttribute('height', '12');
	            r.setAttribute('stroke', 'black');
	            r.setAttribute('fill', 'white');
	            r.setAttribute('cursor', 'pointer');

	            g.appendChild(r);
	          });

	          var j = 1;

	          for (var i in handles.sides) {
	            if (handles.sides[i]) {
	              this.handles[i] = this['handle' + j];
	              this.sides[j] = i;
	              j++;
	            }
	          }

	          break;

	        case 'corners':
	          this._createHandles(4, 'rect', {
	            transform: "translate(-3 -3)",
	            width: 6,
	            height: 6,
	            stroke: "black",
	            fill: "white"
	          });

	          if (this.handles) {
	            this.handles[2].setAttribute('cursor', 'nesw-resize');
	            this.handles[4].setAttribute('cursor', 'nesw-resize');

	            this.handles[1].setAttribute('cursor', 'nwse-resize');
	            this.handles[3].setAttribute('cursor', 'nwse-resize');
	          }

	          break;

	      }
	      return this;
	    }

	    /**
	     * Updates the position
	     * @memberof ShapeRectangle
	     * @private
	     * @return {Shape} The current shape
	     */
	    applyPosition() {

	      var pos = this.computePosition(0),
	          pos2 = this.computePosition(1),
	          x,
	          y,
	          width,
	          height;

	      if (pos.x < pos2.x) {
	        x = pos.x;
	        width = pos2.x - pos.x;
	      } else {
	        x = pos2.x;
	        width = pos.x - pos2.x;
	      }

	      if (pos.y < pos2.y) {
	        y = pos.y;
	        height = pos2.y - pos.y;
	      } else {
	        y = pos2.y;
	        height = pos.y - pos2.y;
	      }

	      this.currentX = x;
	      this.currentY = y;
	      this.currentW = width;
	      this.currentH = height;

	      if (!isNaN(x) && !isNaN(y) && x !== false && y !== false) {

	        this.setDom('width', width);
	        this.setDom('height', height);
	        this.setDom('x', x);
	        this.setDom('y', y);

	        this.setHandles();
	        this.updateMask();

	        return true;
	      }

	      return false;
	    }

	    /**
	     * Implements mouse move event
	     * @private
	     * @return {Shape} The current shape
	     */
	    handleMouseMoveImpl(e, deltaX, deltaY, deltaXPx, deltaYPx) {

	      var handles = this.getProp('handles');

	      if (!this.moving && !this.handleSelected) {
	        return;
	      }

	      var pos = this.getPosition(0);
	      var pos2 = this.getPosition(1);

	      var invX = this.getXAxis().isFlipped(),
	          invY = this.getYAxis().isFlipped(),
	          posX = pos.x,
	          posY = pos.y,
	          pos2X = pos2.x,
	          pos2Y = pos2.y;

	      if (this.moving) {

	        pos.deltaPosition('x', deltaX, this.getXAxis());
	        pos.deltaPosition('y', deltaY, this.getYAxis());

	        pos2.deltaPosition('x', deltaX, this.getXAxis());
	        pos2.deltaPosition('y', deltaY, this.getYAxis());
	      } else {

	        switch (handles.type) {

	          case 'sides':
	            // Do nothing for now

	            switch (this.sides[this.handleSelected]) {

	              case 'left':
	                pos.deltaPosition('x', deltaX, this.getXAxis());
	                break;

	              case 'right':
	                pos2.deltaPosition('x', deltaX, this.getXAxis());
	                break;

	              case 'top':
	                pos.deltaPosition('y', deltaY, this.getYAxis());
	                break;

	              case 'bottom':
	                pos2.deltaPosition('y', deltaY, this.getYAxis());
	                break;

	            }

	            break;

	          case 'corners':
	          default:

	            if (this.handleSelected == 1) {

	              pos.deltaPosition('x', deltaX, this.getXAxis());
	              pos.deltaPosition('y', deltaY, this.getYAxis());
	            } else if (this.handleSelected == 2) {

	              pos2.deltaPosition('x', deltaX, this.getXAxis());
	              pos.deltaPosition('y', deltaY, this.getYAxis());
	            } else if (this.handleSelected == 3) {

	              pos2.deltaPosition('y', deltaY, this.getYAxis());
	              pos2.deltaPosition('x', deltaX, this.getXAxis());
	            } else if (this.handleSelected == 4) {

	              pos.deltaPosition('x', deltaX, this.getXAxis());
	              pos2.deltaPosition('y', deltaY, this.getYAxis());
	            }

	            break;

	        }
	      }

	      this.redraw();
	      this.changed();
	      this.setHandles();

	      return true;
	    }

	    /**
	     * Places handles properly
	     * @private
	     * @return {Shape} The current shape
	     */
	    setHandles() {

	      if (this.isLocked() || !this.isSelectable() && !this._staticHandles) {
	        return;
	      }

	      if (!this.handlesInDom) {
	        return;
	      }

	      var pos = this.computePosition(0);
	      var pos2 = this.computePosition(1);

	      var handles = this.getProp('handles');

	      switch (handles.type) {

	        case 'sides':

	          if (this.handles.left) {
	            this.handles.left.setAttribute('transform', 'translate(' + this.currentX + ' ' + (this.currentY + this.currentH / 2) + ')');
	          }

	          if (this.handles.right) {
	            this.handles.right.setAttribute('transform', 'translate( ' + (this.currentX + this.currentW) + ' ' + (this.currentY + this.currentH / 2) + ')');
	          }

	          if (this.handles.top) {
	            this.handles.top.setAttribute('transform', 'translate( ' + (this.currentX + this.currentW / 2) + ' ' + this.currentY + ')');
	          }

	          if (this.handles.bottom) {
	            this.handles.bottom.setAttribute('transform', 'translate( ' + (this.currentX + this.currentW / 2) + ' ' + (this.currentY + this.currentH) + ')');
	          }

	          break;

	        case 'corners':
	        default:

	          this.handles[1].setAttribute('x', pos.x);
	          this.handles[1].setAttribute('y', pos.y);

	          this.handles[2].setAttribute('x', pos2.x);
	          this.handles[2].setAttribute('y', pos.y);

	          this.handles[3].setAttribute('x', pos2.x);
	          this.handles[3].setAttribute('y', pos2.y);

	          this.handles[4].setAttribute('x', pos.x);
	          this.handles[4].setAttribute('y', pos2.y);

	          break;

	      }
	    }

	  }

	  exports.default = ShapeRectangle;
	});

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(22)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('./graph.shape'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.graph);
	    global.graphShapeCross = mod.exports;
	  }
	})(this, function (exports, _graph) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _graph2 = _interopRequireDefault(_graph);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  /**
	   *  Displays a cross
	   *  @extends Shape
	   */
	  class ShapeCross extends _graph2.default {

	    constructor(graph, options) {
	      super(graph, options);
	      this.nbHandles = 1;
	    }

	    /**
	     * Width of the cross, also available from the constructor
	     * @type {Number} width
	     */
	    get width() {
	      return this.options.width || 10;
	    }

	    set width(l = 10) {
	      this.options.width = l;
	    }

	    createDom() {

	      this._dom = document.createElementNS(this.graph.ns, 'path');
	      this._dom.setAttribute('d', 'M -' + this.width / 2 + ' 0 h ' + this.width + ' m -' + this.width / 2 + ' -' + this.width / 2 + ' v ' + this.width + '');
	    }

	    createHandles() {

	      this._createHandles(this.nbHandles, 'rect', {
	        transform: "translate(-3 -3)",
	        width: 6,
	        height: 6,
	        stroke: "black",
	        fill: "white",
	        cursor: 'nwse-resize'
	      });
	    }
	    applyPosition() {

	      var position = this.calculatePosition(0);
	      if (!position || !position.x || !position.y) {
	        return;
	      }

	      this.setDom('transform', 'translate( ' + position.x + ', ' + position.y + ')');

	      this.currentPos1x = position.x;
	      this.currentPos1y = position.y;

	      return true;
	    }

	    redrawImpl() {

	      this.setHandles();
	    }

	    handleCreateImpl() {

	      return;
	    }

	    handleMouseDownImpl(e) {

	      this.moving = true;

	      return true;
	    }

	    handleMouseUpImpl() {

	      this.triggerChange();
	      return true;
	    }

	    handleMouseMoveImpl(e, deltaX, deltaY, deltaXPx, deltaYPx) {

	      if (this.isLocked()) {
	        return;
	      }

	      var pos = this.getFromData('pos');

	      if (this.moving) {

	        pos.x = this.graph.deltaPosition(pos.x, deltaX, this.getXAxis());
	        pos.y = this.graph.deltaPosition(pos.y, deltaY, this.getYAxis());
	      }

	      this.redrawImpl();

	      return true;
	    }

	    createHandles() {

	      this._createHandles(1, 'rect', {
	        transform: "translate(-3 -3)",
	        width: 6,
	        height: 6,
	        stroke: "black",
	        fill: "white",
	        cursor: 'nwse-resize'
	      });
	    }

	    setHandles() {

	      if (!this.areHandlesInDom()) {
	        return;
	      }

	      if (isNaN(this.currentPos1x)) {
	        return;
	      }

	      this.handles[1].setAttribute('x', this.currentPos1x);
	      this.handles[1].setAttribute('y', this.currentPos1y);
	    }

	    selectStyle() {
	      this.setDom('stroke', 'red');
	      this.setDom('stroke-width', '2');
	    }
	  }

	  exports.default = ShapeCross;
	});

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(27)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('./graph.shape.line'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.graphShape);
	    global.graphShapePeakboundariescenter = mod.exports;
	  }
	})(this, function (exports, _graphShape) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _graphShape2 = _interopRequireDefault(_graphShape);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  /**
	   *  Shows a horizontal line with three little vertical bars. Very useful to demonstrate a peak start, end and middle value
	   *  @extends ShapeLine
	   */
	  class ShapePeakBoundaries extends _graphShape2.default {

	    constructor(graph) {
	      super(graph);
	      this.lineHeight = 6;
	    }

	    createDom() {

	      this._dom = document.createElementNS(this.graph.ns, 'line');
	      this.line1 = document.createElementNS(this.graph.ns, 'line');
	      this.line2 = document.createElementNS(this.graph.ns, 'line');
	      this.line3 = document.createElementNS(this.graph.ns, 'line');

	      this.rectBoundary = document.createElementNS(this.graph.ns, 'path');

	      this.rectBoundary.setAttribute('fill', 'transparent');
	      this.rectBoundary.setAttribute('stroke', 'none');
	      this.rectBoundary.setAttribute('pointer-events', 'fill');

	      this.rectBoundary.jsGraphIsShape = true;

	      this.group.appendChild(this.rectBoundary);
	      this.group.appendChild(this.line1);
	      this.group.appendChild(this.line2);
	      this.group.appendChild(this.line3);
	      this._dom.element = this;
	    }

	    createHandles() {
	      this._createHandles(3, 'rect', {
	        transform: "translate(-3 -3)",
	        width: 6,
	        height: 6,
	        stroke: "black",
	        fill: "white",
	        cursor: 'nwse-resize'
	      });
	    }

	    redrawImpl() {

	      this.line1.setAttribute('stroke', this.getStrokeColor());
	      this.line2.setAttribute('stroke', this.getStrokeColor());
	      this.line3.setAttribute('stroke', this.getStrokeColor());

	      this.line1.setAttribute('stroke-width', this.getStrokeWidth());
	      this.line2.setAttribute('stroke-width', this.getStrokeWidth());
	      this.line3.setAttribute('stroke-width', this.getStrokeWidth());

	      this.setHandles();
	      this.redrawLines();
	    }

	    /**
	     * @memberof ShapePeakBoundaries
	     * Redraws the vertical lines according to the positions.
	     * Position 0 is the left line, position 1 is the right line and position 2 is the center line
	     * @returns {ShapePeakBoundaries} The shape instance
	     */
	    redrawLines() {

	      var posLeft = this.computePosition(0);
	      var posRight = this.computePosition(1);
	      var posCenter = this.computePosition(2);

	      if (posLeft.x && posRight.x && posCenter.x && this.posYPx) {

	        var height = this.lineHeight;
	        this.rectBoundary.setAttribute('d', 'M ' + posLeft.x + ' ' + (this.posYPx - height) + ' v ' + 2 * height + ' H ' + posRight.x + " v " + -2 * height + "z");
	        this.line1.setAttribute('x1', posLeft.x);
	        this.line1.setAttribute('x2', posLeft.x);

	        this.line2.setAttribute('x1', posRight.x);
	        this.line2.setAttribute('x2', posRight.x);

	        this.line3.setAttribute('x1', posCenter.x);
	        this.line3.setAttribute('x2', posCenter.x);

	        this._dom.setAttribute('x1', posLeft.x);
	        this._dom.setAttribute('x2', posRight.x);

	        this.redrawY(height);
	      }

	      return this;
	    }

	    /**
	     * @memberof ShapePeakBoundaries
	     * Redraws the vertical positions of the shape
	     * @returns {ShapePeakBoundaries} The shape instance
	     */
	    redrawY() {

	      if (!this.posYPx) {
	        return this;
	      }

	      var height = this.lineHeight;

	      this.line1.setAttribute('y1', this.posYPx - height);
	      this.line1.setAttribute('y2', this.posYPx + height);

	      this.line2.setAttribute('y1', this.posYPx - height);
	      this.line2.setAttribute('y2', this.posYPx + height);

	      this.line3.setAttribute('y1', this.posYPx - height);
	      this.line3.setAttribute('y2', this.posYPx + height);

	      this._dom.setAttribute('y1', this.posYPx);
	      this._dom.setAttribute('y2', this.posYPx);

	      return this;
	    }

	    setHandles() {

	      if (!this.posYPx) {
	        return;
	      }

	      var posLeft = this.computePosition(0);
	      var posRight = this.computePosition(1);
	      var posCenter = this.computePosition(2);

	      if (posLeft.x && posRight.x && posCenter.x) {

	        this.handles[1].setAttribute('x', posLeft.x);
	        this.handles[1].setAttribute('y', this.posYPx);

	        this.handles[2].setAttribute('x', posRight.x);
	        this.handles[2].setAttribute('y', this.posYPx);

	        this.handles[3].setAttribute('x', posCenter.x);
	        this.handles[3].setAttribute('y', this.posYPx);
	      }
	    }

	    /**
	     * @memberof ShapePeakBoundaries
	     * Sets the y position of the shape
	     * @param {Number} y - The y position in px
	     * @returns {ShapePeakBoundaries} The shape instance
	     */
	    setY(y) {
	      this.posYPx = y;
	      return this;
	    }

	    /**
	     * @memberof ShapePeakBoundaries
	     * Sets the height of the peak lines
	     * @param {Number} height - The height of the lines in px
	     * @returns {ShapePeakBoundaries} The shape instance
	     */
	    setLineHeight(height) {
	      this.lineHeihgt = height;
	    }

	    handleMouseMoveImpl(e, deltaX, deltaY) {

	      if (this.isLocked()) {
	        return;
	      }

	      var posLeft = this.getPosition(0);
	      var posRight = this.getPosition(1);
	      var posCenter = this.getPosition(2);

	      switch (this.handleSelected) {

	        case 1:
	          // left
	          posLeft.deltaPosition('x', deltaX, this.getXAxis());

	          if (Math.abs(posCenter.x - posRight.x) > Math.abs(posRight.x - posLeft.x) || Math.abs(posCenter.x - posLeft.x) > Math.abs(posRight.x - posLeft.x)) {
	            posCenter.x = posLeft.x + (posRight.x - posLeft.x) * 0.1;
	          }
	          break;

	        case 2:
	          // left

	          posRight.deltaPosition('x', deltaX, this.getXAxis());

	          if (Math.abs(posCenter.x - posRight.x) > Math.abs(posRight.x - posLeft.x) || Math.abs(posCenter.x - posLeft.x) > Math.abs(posRight.x - posLeft.x)) {
	            posCenter.x = posRight.x + (posLeft.x - posRight.x) * 0.1;
	          }

	          break;

	        case 3:
	          // left

	          posCenter.deltaPosition('x', deltaX, this.getXAxis());

	          if (Math.abs(posCenter.x - posRight.x) > Math.abs(posRight.x - posLeft.x) || Math.abs(posCenter.x - posLeft.x) > Math.abs(posRight.x - posLeft.x)) {
	            return;
	          } else {}

	          break;

	      }

	      this.setLabelPosition({
	        y: this.getLabelPosition(0).y,
	        x: posCenter.x
	      });

	      this.updateLabels();
	      this.redrawLines();
	      this.setHandles();
	    }

	    applyPosition() {

	      this.redrawLines();
	      return true;
	    }

	  }

	  exports.default = ShapePeakBoundaries;
	});

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(4)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('../dependencies/eventEmitter/EventEmitter'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.EventEmitter);
	    global.graphPlugin = mod.exports;
	  }
	})(this, function (exports, _EventEmitter) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  /**
	   * Represents a plugin
	   * @interface
	   */
	  class Plugin extends _EventEmitter2.default {

	    static defaults() {
	      return {};
	    }

	    constructor(options) {
	      super(...arguments);
	      this.options = options;
	    }

	    /**
	     * Init function called by jsGraph on load
	     */
	    init() {}

	    /**
	     * Handles the mousedown event from jsGraph
	     * @param {Graph} graph - The graph instance
	     * @param {Number} x - The x position in px
	     * @param {Number} y - The y position in px
	     * @param {Event} e - The original event
	     * @param {SVGElement} target - The target element
	     */
	    onMouseDown() {}

	    /**
	     * Handles the mouseup event from jsGraph
	     * @param {Graph} graph - The graph instance
	     * @param {Number} x - The x position in px
	     * @param {Number} y - The y position in px
	     * @param {Event} e - The original event
	     * @param {SVGElement} target - The target element
	     */
	    onMouseUp() {}

	    /**
	     * Handles the mousemove event from jsGraph
	     * @param {Graph} graph - The graph instance
	     * @param {Number} x - The x position in px
	     * @param {Number} y - The y position in px
	     * @param {Event} e - The original event
	     * @param {SVGElement} target - The target element
	     */
	    onMouseMove() {}
	  }

	  exports.default = Plugin;
	});

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(33)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require("./graph.plugin"));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.graph);
	    global.graphPluginDrag = mod.exports;
	  }
	})(this, function (exports, _graph) {
	  "use strict";

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _graph2 = _interopRequireDefault(_graph);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  /** 
	   * Constructor for the drag plugin. Do not use this constructor directly.
	   * @class PluginDrag
	   * @implements Plugin
	   */
	  class PluginDrag extends _graph2.default {

	    static defaults() {
	      return {

	        dragX: true,
	        dragY: true,
	        persistanceX: false,
	        persistanceY: false

	      };
	    }

	    /**
	     * @private
	     */
	    init(graph) {

	      this.graph = graph;
	      this.time = null;
	      this.totaltime = 2000;
	    }

	    /**
	     * @private
	     */
	    onMouseDown(graph, x, y, e, target) {
	      this._draggingX = x;
	      this._draggingY = y;

	      this._lastDraggingX = this._draggingX;
	      this._lastDraggingY = this._draggingY;

	      this.stopAnimation = true;

	      this.moved = false;

	      return true;
	    }

	    /**
	     * @memberof PluginDrag
	     * @private
	     */
	    onMouseMove(graph, x, y, e, target) {

	      var deltaX = x - this._draggingX;
	      var deltaY = y - this._draggingY;

	      if (this.options.dragX) {
	        graph._applyToAxes(function (axis) {
	          axis.setCurrentMin(axis.getVal(axis.getMinPx() - deltaX));
	          axis.setCurrentMax(axis.getVal(axis.getMaxPx() - deltaX));
	        }, false, true, false);
	      }

	      if (this.options.dragY) {

	        graph._applyToAxes(function (axis) {
	          axis.setCurrentMin(axis.getVal(axis.getMinPx() - deltaY));
	          axis.setCurrentMax(axis.getVal(axis.getMaxPx() - deltaY));
	        }, false, false, true);
	      }

	      this._lastDraggingX = this._draggingX;
	      this._lastDraggingY = this._draggingY;

	      this._draggingX = x;
	      this._draggingY = y;

	      this.moved = true;

	      this.time = Date.now();

	      this.emit("dragging");

	      graph.draw(true);
	    }

	    onMouseUp(graph, x, y, e, target) {

	      var dt = Date.now() - this.time;

	      if (x == this._lastDraggingX || y == this._lastDraggingY) {

	        if (this.moved) {
	          this.emit("dragged");
	        }

	        return;
	      }

	      this.speedX = (x - this._lastDraggingX) / dt;
	      this.speedY = (y - this._lastDraggingY) / dt;

	      if (isNaN(this.speedX) || isNaN(this.speedY)) {
	        this.emit("dragged");
	        return;
	      }

	      graph._applyToAxes(function (axis) {
	        axis._pluginDragMin = axis.getCurrentMin();
	        axis._pluginDragMax = axis.getCurrentMax();
	      }, false, true, true);

	      this.stopAnimation = false;
	      this.accelerationX = -this.speedX / this.totaltime;
	      this.accelerationY = -this.speedY / this.totaltime;

	      if (this.options.persistanceX || this.options.persistanceY) {

	        this._persistanceMove(graph);
	      } else {

	        this.emit("dragged");
	      }
	    }

	    _persistanceMove(graph) {

	      var self = this;

	      if (self.stopAnimation) {
	        self.emit("dragged");
	        return;
	      }

	      window.requestAnimationFrame(function () {

	        var dt = Date.now() - self.time;
	        var dx = (0.5 * self.accelerationX * dt + self.speedX) * dt;
	        var dy = (0.5 * self.accelerationY * dt + self.speedY) * dt;

	        if (self.options.persistanceX) {

	          graph._applyToAxes(function (axis) {

	            axis.setCurrentMin(-axis.getRelVal(dx) + axis._pluginDragMin);
	            axis.setCurrentMax(-axis.getRelVal(dx) + axis._pluginDragMax);

	            axis.cacheCurrentMin();
	            axis.cacheCurrentMax();
	            axis.cacheInterval();
	          }, false, true, false);
	        }

	        if (self.options.persistanceY) {

	          graph._applyToAxes(function (axis) {

	            axis.setCurrentMin(-axis.getRelVal(dy) + axis._pluginDragMin);
	            axis.setCurrentMax(-axis.getRelVal(dy) + axis._pluginDragMax);

	            axis.cacheCurrentMin();
	            axis.cacheCurrentMax();
	            axis.cacheInterval();
	          }, false, false, true);
	        }

	        graph.draw();

	        if (dt < self.totaltime) {
	          self.emit("dragging");
	          self._persistanceMove(graph);
	        } else {
	          self.emit("dragged");
	        }
	      });
	    }
	  }

	  exports.default = PluginDrag;
	});

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(33), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('./graph.plugin'), require('../graph.util'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.graph, global.graph);
	    global.graphPluginShape = mod.exports;
	  }
	})(this, function (exports, _graph, _graph3) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _graph2 = _interopRequireDefault(_graph);

	  var util = _interopRequireWildcard(_graph3);

	  function _interopRequireWildcard(obj) {
	    if (obj && obj.__esModule) {
	      return obj;
	    } else {
	      var newObj = {};

	      if (obj != null) {
	        for (var key in obj) {
	          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	        }
	      }

	      newObj.default = obj;
	      return newObj;
	    }
	  }

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  /**
	   * @class PluginShape
	   * @implements Plugin
	   */
	  class PluginShape extends _graph2.default {

	    constructor() {
	      super(...arguments);
	    }

	    /**
	     * Init method
	     * @private
	     */
	    init(graph, options) {

	      this.graph = graph;
	      this.shapeType = options.type;
	    }

	    /**
	     * Sets the shape that is created by the plugin
	     * @param {String} shapeType - The type of the shape
	     */
	    setShape(shapeType) {
	      this.shapeInfo.shapeType = shapeType;
	    }

	    /**
	     * @private
	     */
	    onMouseDown(graph, x, y, e, target) {

	      if (!this.shapeType && !this.options.url) {
	        return;
	      }

	      var self = this,
	          selfPlugin = this;

	      var xVal, yVal;

	      this.count = this.count || 0;

	      x -= graph.getPaddingLeft();
	      y -= graph.getPaddingTop();

	      xVal = graph.getXAxis().getVal(x);
	      yVal = graph.getYAxis().getVal(y);

	      var shapeInfo = {

	        position: [{
	          x: xVal,
	          y: yVal
	        }, {
	          x: xVal,
	          y: yVal
	        }],

	        onChange: function (newData) {
	          graph.triggerEvent('onAnnotationChange', newData);
	        },

	        locked: false,
	        selectable: true,
	        resizable: true,
	        movable: true
	      };

	      util.extend(true, shapeInfo, this.options);

	      this.emit("beforeNewShape", shapeInfo, e);

	      if (this.graph.prevent(false)) {
	        return;
	      }

	      var shape = graph.newShape(shapeInfo.type, shapeInfo);

	      this.emit("createdShape", shape, e);

	      if (shape) {
	        self.currentShape = shape;
	        self.currentShapeEvent = e;
	      }

	      graph.once("mouseUp", function () {
	        self.emit("newShape", shape);
	      });
	    }

	    /**
	     * @private
	     */
	    onMouseMove(graph, x, y, e) {

	      var self = this;
	      if (self.currentShape) {

	        self.count++;

	        var shape = self.currentShape;

	        self.currentShape = false;

	        if (graph.selectedSerie) {
	          shape.setSerie(graph.selectedSerie);
	        }

	        shape.resizing = true;

	        if (shape.options && shape.options.onCreate) {
	          shape.options.onCreate.call(shape);
	        }

	        shape.draw();

	        graph.selectShape(shape);

	        shape.handleMouseDown(self.currentShapeEvent, true);
	        shape.handleSelected = 1;
	        shape.handleMouseMove(e, true);
	      }
	    }

	    /**
	     * @private
	     */
	    onMouseUp() {

	      var self = this;
	      if (self.currentShape) {
	        // No need to kill it as it hasn't been actually put in the dom right now
	        //self.currentShape.kill();
	        self.currentShape = false;
	      }
	    }

	  }

	  exports.default = PluginShape;
	});

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(3), __webpack_require__(33)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('../graph.util'), require('./graph.plugin'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.graph, global.graph);
	    global.graphPluginSelectScatter = mod.exports;
	  }
	})(this, function (exports, _graph, _graph2) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var util = _interopRequireWildcard(_graph);

	  var _graph3 = _interopRequireDefault(_graph2);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  function _interopRequireWildcard(obj) {
	    if (obj && obj.__esModule) {
	      return obj;
	    } else {
	      var newObj = {};

	      if (obj != null) {
	        for (var key in obj) {
	          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	        }
	      }

	      newObj.default = obj;
	      return newObj;
	    }
	  }

	  /**
	   * @extends Plugin
	   */
	  class PluginSelectScatter extends _graph3.default {

	    constructor() {
	      super(...arguments);
	    }

	    /**
	     * Init method
	     * @private
	     */
	    init(graph, options) {

	      this._path = document.createElementNS(graph.ns, 'path');

	      util.setAttributeTo(this._path, {
	        'display': 'none',
	        'fill': 'rgba(0,0,0,0.1)',
	        'stroke': 'rgba(0,0,0,1)',
	        'shape-rendering': 'crispEdges',
	        'x': 0,
	        'y': 0,
	        'height': 0,
	        'width': 0,
	        'd': ''
	      });

	      this.graph = graph;

	      graph.dom.appendChild(this._path);
	    }

	    /**
	     * Assigns the scatter serie that should be selected to the plugin
	     * @param {ScatterSerie} serie - The serie
	     * @return {PluginSelectScatter} The current plugin instance
	     */
	    setSerie(serie) {
	      this.serie = serie;
	    }

	    /**
	     * @private
	     */
	    onMouseDown(graph, x, y, e, mute) {

	      if (!this.serie) {
	        return;
	      }

	      this.path = 'M ' + x + ' ' + y + ' ';
	      this.currentX = x;
	      this.currentY = y;

	      this.xs = [this.serie.getXAxis().getVal(x - graph.getPaddingLeft())];
	      this.ys = [this.serie.getYAxis().getVal(y - graph.getPaddingTop())];
	      this._path.setAttribute('d', '');
	      this._path.setAttribute('display', 'block');
	    }

	    /**
	     * @private
	     */
	    onMouseMove(graph, x, y, e, mute) {

	      if (Math.pow(x - this.currentX, 2) + Math.pow(y - this.currentY, 2) > 25) {

	        this.path += " L " + x + " " + y + " ";
	        this.currentX = x;
	        this.currentY = y;

	        this.xs.push(this.serie.getXAxis().getVal(x - graph.getPaddingLeft()));
	        this.ys.push(this.serie.getYAxis().getVal(y - graph.getPaddingTop()));

	        this._path.setAttribute('d', this.path + " z");

	        this.findPoints();
	      }
	    }

	    /**
	     * @private
	     */
	    findPoints() {

	      var data = this.serie.data;
	      var selected = [];
	      var counter = 0,
	          j2;
	      for (var i = 0, l = data.length; i < l; i += 2) {

	        counter = 0;
	        for (var j = 0, k = this.xs.length; j < k; j += 1) {

	          if (j == k - 1) {
	            j2 = 0;
	          } else {
	            j2 = j + 1;
	          }

	          if (this.ys[j] < data[i + 1] && this.ys[j2] > data[i + 1] || this.ys[j] > data[i + 1] && this.ys[j2] < data[i + 1]) {

	            if (data[i] > (data[i + 1] - this.ys[j]) / (this.ys[j2] - this.ys[j]) * (this.xs[j2] - this.xs[j]) + this.xs[j]) {
	              counter++;
	            }
	          }
	        }

	        if (counter % 2 == 1) {
	          selected.push(i / 2);
	          this.serie.selectPoint(i / 2, true, "selected");
	        } else {
	          this.serie.unselectPoint(i / 2);
	        }
	      }

	      this.selected = selected;
	      this.emit("selectionProcess", selected);
	    }

	    /**
	     * @private
	     */
	    onMouseUp(graph, x, y, e) {
	      this._path.setAttribute('display', 'none');
	      this.emit("selectionEnd", this.selected);
	    }

	  }

	  exports.default = PluginSelectScatter;
	});

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(3), __webpack_require__(33)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('../graph.util'), require('./graph.plugin'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.graph, global.graph);
	    global.graphPluginZoom = mod.exports;
	  }
	})(this, function (exports, _graph, _graph2) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var util = _interopRequireWildcard(_graph);

	  var _graph3 = _interopRequireDefault(_graph2);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  function _interopRequireWildcard(obj) {
	    if (obj && obj.__esModule) {
	      return obj;
	    } else {
	      var newObj = {};

	      if (obj != null) {
	        for (var key in obj) {
	          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	        }
	      }

	      newObj.default = obj;
	      return newObj;
	    }
	  }

	  /**
	   * @class PluginZoom
	   * @implements Plugin
	   */
	  class PluginZoom extends _graph3.default {

	    constructor() {
	      super(...arguments);
	    }

	    static defaults() {

	      return {
	        "axes": "all"
	      };
	    }

	    /**
	     * Init method
	     * @private
	     */
	    init(graph, options) {

	      this._zoomingGroup = document.createElementNS(graph.ns, 'g');
	      this._zoomingSquare = document.createElementNS(graph.ns, 'rect');
	      this._zoomingSquare.setAttribute('display', 'none');

	      util.setAttributeTo(this._zoomingSquare, {
	        'display': 'none',
	        'fill': 'rgba(171,12,12,0.2)',
	        'stroke': 'rgba(171,12,12,1)',
	        'shape-rendering': 'crispEdges',
	        'x': 0,
	        'y': 0,
	        'height': 0,
	        'width': 0
	      });

	      this.graph = graph;
	      graph.groupEvent.appendChild(this._zoomingGroup);
	      this._zoomingGroup.appendChild(this._zoomingSquare);
	    }

	    /**
	     * @private
	     */
	    onMouseDown(graph, x, y, e, mute) {
	      console.log('zoomdown');
	      var zoomMode = this.options.zoomMode;

	      if (!zoomMode) {
	        return;
	      }

	      this._zoomingMode = zoomMode;

	      if (x === undefined) {
	        this._backedUpZoomMode = this._zoomingMode;
	        this._zoomingMode = 'y';
	        x = 0;
	      }

	      if (y === undefined) {
	        this._backedUpZoomMode = this._zoomingMode;
	        this._zoomingMode = 'x';
	        y = 0;
	      }

	      this._zoomingXStart = x;
	      this._zoomingYStart = y;
	      this.x1 = x - graph.getPaddingLeft();
	      this.y1 = y - graph.getPaddingTop();

	      this._zoomingSquare.setAttribute('width', 0);
	      this._zoomingSquare.setAttribute('height', 0);
	      this._zoomingSquare.setAttribute('display', 'block');

	      switch (this._zoomingMode) {

	        case 'x':
	          this._zoomingSquare.setAttribute('y', graph.options.paddingTop);
	          this._zoomingSquare.setAttribute('height', graph.getDrawingHeight() - graph.shift.bottom);
	          break;

	        case 'y':
	          this._zoomingSquare.setAttribute('x', graph.options.paddingLeft /* + this.shift[1]*/);
	          this._zoomingSquare.setAttribute('width', graph.getDrawingWidth() /* - this.shift[1] - this.shift[2]*/);
	          break;

	        case 'forceY2':

	          this.y2 = graph.getYAxis().getPx(this.options.forcedY) + graph.options.paddingTop;

	          break;

	      }

	      if (this.options.onZoomStart && !mute) {
	        this.options.onZoomStart(graph, x, y, e, mute);
	      }
	    }

	    /**
	     * @private
	     */
	    onMouseMove(graph, x, y, e, mute) {

	      //	this._zoomingSquare.setAttribute('display', 'none');

	      //	this._zoomingSquare.setAttribute('transform', 'translate(' + Math.random() + ', ' + Math.random() + ') scale(10, 10)');
	      switch (this._zoomingMode) {

	        case 'xy':
	          this._zoomingSquare.setAttribute('x', Math.min(this._zoomingXStart, x));
	          this._zoomingSquare.setAttribute('y', Math.min(this._zoomingYStart, y));
	          this._zoomingSquare.setAttribute('width', Math.abs(this._zoomingXStart - x));
	          this._zoomingSquare.setAttribute('height', Math.abs(this._zoomingYStart - y));

	          break;

	        case 'forceY2':
	          this._zoomingSquare.setAttribute('y', Math.min(this._zoomingYStart, this.y2));
	          this._zoomingSquare.setAttribute('height', Math.abs(this._zoomingYStart - this.y2));
	          this._zoomingSquare.setAttribute('x', Math.min(this._zoomingXStart, x));
	          this._zoomingSquare.setAttribute('width', Math.abs(this._zoomingXStart - x));

	          break;

	        case 'x':
	          this._zoomingSquare.setAttribute('x', Math.min(this._zoomingXStart, x));
	          this._zoomingSquare.setAttribute('width', Math.abs(this._zoomingXStart - x));

	          break;

	        case 'y':
	          this._zoomingSquare.setAttribute('y', Math.min(this._zoomingYStart, y));
	          this._zoomingSquare.setAttribute('height', Math.abs(this._zoomingYStart - y));
	          break;

	      }

	      if (this.options.onZoomMove && !mute) {

	        this.options.onZoomMove(graph, x, y, e, mute);
	      }
	      //		this._zoomingSquare.setAttribute('display', 'block');
	    }

	    /**
	     * @private
	     */
	    onMouseUp(graph, x, y, e, mute) {

	      var self = this;
	      this.removeZone();
	      var _x = x - graph.options.paddingLeft;
	      var _y = y - graph.options.paddingTop;

	      if (x - this._zoomingXStart == 0 && this._zoomingMode != 'y' || y - this._zoomingYStart == 0 && this._zoomingMode != 'x') {
	        return;
	      }

	      graph.cancelClick = true;

	      if (this.options.transition || this.options.smooth) {

	        var modeX = false,
	            modeY = false;

	        if (this._zoomingMode == 'x' || this._zoomingMode == 'xy' || this._zoomingMode == 'forceY2') {

	          this.fullX = false;
	          this.toAxes(function (axis) {

	            axis._pluginZoomMin = axis.getCurrentMin();
	            axis._pluginZoomMax = axis.getCurrentMax();

	            axis._pluginZoomMinFinal = Math.min(axis.getVal(_x), axis.getVal(self.x1));
	            axis._pluginZoomMaxFinal = Math.max(axis.getVal(_x), axis.getVal(self.x1));
	          }, false, true, false);

	          modeX = true;
	        }

	        if (this._zoomingMode == 'y' || this._zoomingMode == 'xy') {

	          this.fullY = false;
	          this.toAxes(function (axis) {

	            axis._pluginZoomMin = axis.getCurrentMin();
	            axis._pluginZoomMax = axis.getCurrentMax();

	            axis._pluginZoomMinFinal = Math.min(axis.getVal(_y), axis.getVal(self.y1));
	            axis._pluginZoomMaxFinal = Math.max(axis.getVal(_y), axis.getVal(self.y1));
	          }, false, false, true);

	          modeY = true;
	        }

	        if (this._zoomingMode == 'forceY2') {

	          this.fullY = false;
	          this.toAxes(function (axis) {

	            axis._pluginZoomMin = axis.getCurrentMin();
	            axis._pluginZoomMax = axis.getCurrentMax();

	            axis._pluginZoomMinFinal = Math.min(axis.getVal(self.y2), axis.getVal(self.y1));
	            axis._pluginZoomMaxFinal = Math.max(axis.getVal(self.y2), axis.getVal(self.y1));
	          }, false, false, true);

	          modeY = true;
	        }

	        this.transition(modeX, modeY, "zoomEnd");
	      } else {

	        switch (this._zoomingMode) {
	          case 'x':
	            this.fullX = false;
	            this.toAxes('_doZoom', [_x, this.x1], true, false);
	            break;
	          case 'y':
	            this.fullY = false;
	            this.toAxes('_doZoom', [_y, this.y1], false, true);
	            break;
	          case 'xy':
	            this.fullX = false;
	            this.fullY = false;
	            this.toAxes('_doZoom', [_x, this.x1], true, false);
	            this.toAxes('_doZoom', [_y, this.y1], false, true);
	            break;

	          case 'forceY2':

	            this.fullX = false;
	            this.fullY = false;

	            this.toAxes('_doZoom', [_x, this.x1], true, false);
	            this.toAxes('_doZoom', [this.y1, this.y2], false, true);

	            break;
	        }

	        graph.prevent(true);
	        graph.draw();

	        if (this._backedUpZoomMode) {
	          this._zoomingMode = this._backedUpZoomMode;
	        }

	        this.emit("zoomed");

	        graph.pluginYieldActiveState();
	      }
	    }

	    /**
	     * @private
	     */
	    removeZone() {
	      this._zoomingSquare.setAttribute('display', 'none');
	    }

	    /**
	     * @private
	     */
	    onMouseWheel(delta, e, options) {

	      if (!options) {
	        options = {};
	      }

	      if (!options.baseline) {
	        options.baseline = 0;
	      }

	      /*var serie;
	      if ( ( serie = this.graph.getSelectedSerie() ) ) {
	         if ( serie.getYAxis().handleMouseWheel( delta, e ) ) {
	          return;
	        }
	      }*/

	      var doX = options.direction == 'x';
	      var doY = !(options.direction !== 'y');

	      this.toAxes('handleMouseWheel', [delta, e, options.baseline], doX, doY);

	      this.graph.drawSeries();
	    }

	    /**
	     * @private
	     */
	    onDblClick(x, y, e, pref, mute) {

	      var graph = this.graph;
	      this.emit("beforeDblClick", {
	        graph: graph,
	        x: x,
	        y: y,
	        pref: pref,
	        e: e,
	        mute: mute
	      });

	      if (graph.prevent(false)) {
	        return;
	      }

	      if (this.options.transition || this.options.smooth) {

	        var modeX = false,
	            modeY = false;

	        if (pref.mode == 'xtotal' || pref.mode == 'total') {

	          this.toAxes(function (axis) {
	            axis._pluginZoomMin = axis.getCurrentMin();
	            axis._pluginZoomMax = axis.getCurrentMax();

	            axis._pluginZoomMinFinal = axis.getMinValue();
	            axis._pluginZoomMaxFinal = axis.getMaxValue();
	          }, false, true, false);

	          modeX = true;
	        }

	        if (pref.mode == 'ytotal' || pref.mode == 'total') {

	          this.toAxes(function (axis) {

	            axis._pluginZoomMin = axis.getCurrentMin();
	            axis._pluginZoomMax = axis.getCurrentMax();

	            axis._pluginZoomMinFinal = axis.getMinValue();
	            axis._pluginZoomMaxFinal = axis.getMaxValue();
	          }, false, false, true);

	          modeY = true;
	        }

	        if (pref.mode == 'gradualX' || pref.mode == 'gradualY' || pref.mode == 'gradual' || pref.mode == 'gradualXY') {

	          var x = false,
	              y = false;

	          if (pref.mode == 'gradualX' || pref.mode == 'gradual' || pref.mode == 'gradualXY') {
	            x = true;
	            modeX = true;
	          }

	          if (pref.mode == 'gradualY' || pref.mode == 'gradual' || pref.mode == 'gradualXY') {
	            y = true;
	            modeY = true;
	          }

	          this.toAxes(function (axis) {

	            axis._pluginZoomMin = axis.getCurrentMin();
	            axis._pluginZoomMax = axis.getCurrentMax();

	            axis._pluginZoomMinFinal = axis.getCurrentMin() - (axis.getCurrentMax() - axis.getCurrentMin());
	            axis._pluginZoomMaxFinal = axis.getCurrentMax() + (axis.getCurrentMax() - axis.getCurrentMin());
	          }, false, x, y);
	        }

	        this.transition(modeX, modeY, "dblClick");
	        return;
	      }

	      var xAxis = this.graph.getXAxis(),
	          yAxis = this.graph.getYAxis();

	      if (pref.mode == 'xtotal') {

	        this.toAxes("setMinMaxToFitSeries", null, true, false);
	        this.fullX = true;
	        this.fullY = false;
	      } else if (pref.mode == 'ytotal') {

	        this.toAxes("setMinMaxToFitSeries", null, false, true);
	        this.fullX = false;
	        this.fullY = true;
	      } else if (pref.mode == 'total') {

	        this.toAxes("setMinMaxToFitSeries", null, true, true);

	        this.fullX = true;
	        this.fullY = true;
	        // Nothing to do here
	        /*        this.graph._applyToAxes( function( axis ) {
	             axis.emit( 'zoom', axis.currentAxisMin, axis.currentAxisMax, axis );
	           }, null, true, true );
	        */
	      } else {

	        x -= this.graph.options.paddingLeft;
	        y -= this.graph.options.paddingTop;

	        var xMin = xAxis.getCurrentMin(),
	            xMax = xAxis.getCurrentMax(),
	            xActual = xAxis.getVal(x),
	            diffX = xMax - xMin,
	            yMin = yAxis.getCurrentMin(),
	            yMax = yAxis.getCurrentMax(),
	            yActual = yAxis.getVal(y),
	            diffY = yMax - yMin;

	        if (pref.mode == 'gradualXY' || pref.mode == 'gradualX') {

	          var ratio = (xActual - xMin) / (xMax - xMin);
	          xMin = Math.max(xAxis.getMinValue(), xMin - diffX * ratio);
	          xMax = Math.min(xAxis.getMaxValue(), xMax + diffX * (1 - ratio));
	          xAxis.setCurrentMin(xMin);
	          xAxis.setCurrentMax(xMax);

	          if (xAxis.options.onZoom) {
	            xAxis.options.onZoom(xMin, xMax);
	          }

	          xAxis.cacheCurrentMin();
	          xAxis.cacheCurrentMax();
	          xAxis.cacheInterval();
	        }

	        if (pref.mode == 'gradualXY' || pref.mode == 'gradualY') {

	          var ratio = (yActual - yMin) / (yMax - yMin);
	          yMin = Math.max(yAxis.getMinValue(), yMin - diffY * ratio);
	          yMax = Math.min(yAxis.getMaxValue(), yMax + diffY * (1 - ratio));
	          yAxis.setCurrentMin(yMin);
	          yAxis.setCurrentMax(yMax);

	          if (yAxis.options.onZoom) {
	            yAxis.options.onZoom(yMin, yMax);
	          }

	          yAxis.cacheCurrentMin();
	          yAxis.cacheCurrentMax();
	          yAxis.cacheInterval();
	        }
	      }

	      this.graph.draw();
	      /*
	          this.emit( "dblClick", {
	            graph: graph,
	            x: x,
	            y: y,
	            pref: pref,
	            e: e,
	            mute: mute
	          } );
	           if ( this.options.onDblClick && !mute ) {
	            this.options.onDblClick( graph, x, y, e, mute );
	          }*/
	    }

	    transition(modeX, modeY, eventName) {

	      var self = this,
	          maxTime = 500;

	      if (!self.gradualUnzoomStart) {
	        self.gradualUnzoomStart = Date.now();
	      }

	      window.requestAnimationFrame(function () {

	        var dt = Date.now() - self.gradualUnzoomStart;

	        if (dt > maxTime) {
	          dt = maxTime;
	        }
	        var progress = Math.sin(dt / maxTime * Math.PI / 2);

	        self.toAxes(function (axis) {

	          axis.setCurrentMin(axis._pluginZoomMin + (axis._pluginZoomMinFinal - axis._pluginZoomMin) * progress);
	          axis.setCurrentMax(axis._pluginZoomMax + (axis._pluginZoomMaxFinal - axis._pluginZoomMax) * progress);

	          axis.cacheCurrentMin();
	          axis.cacheCurrentMax();
	          axis.cacheInterval();
	        }, false, modeX, modeY);

	        self.graph.draw();

	        if (dt < maxTime) {

	          self.transition(modeX, modeY, eventName);
	          self.emit("zooming");
	        } else {

	          self.emit("zoomed");
	          self.graph.pluginYieldActiveState();

	          if (eventName) {
	            self.emit(eventName);
	          }
	          self.gradualUnzoomStart = 0;
	        }
	      });
	    }

	    isFullX() {
	      return this.fullX;
	    }

	    isFullY() {
	      return this.fullY;
	    }

	    toAxes(func, params, tb, lr) {

	      var axes = this.options.axes;

	      if (!axes || axes == 'serieSelected' && !this.graph.getSelectedSerie()) {
	        axes = 'all';
	      }

	      switch (axes) {

	        case 'all':
	          this.graph._applyToAxes.apply(this.graph, arguments);
	          break;

	        case 'serieSelected':

	          var serie = this.graph.getSelectedSerie();
	          if (serie) {

	            if (tb) {

	              if (typeof func == "string") {
	                serie.getXAxis()[func].apply(serie.getXAxis(), params);
	              } else {
	                func.apply(serie.getXAxis(), params);
	              }
	            }

	            if (lr) {

	              if (typeof func == "string") {
	                serie.getYAxis()[func].apply(serie.getYAxis(), params);
	              } else {
	                func.apply(serie.getYAxis(), params);
	              }
	            }
	          }

	          break;

	        default:

	          if (!Array.isArray(axes)) {
	            axes = [axes];
	          }

	          for (let axis of axes) {

	            if (axis.isX() && tb) {
	              // Not the best check

	              if (typeof func == "string") {
	                axis[func].apply(axis, params);
	              } else {
	                func.apply(axis, params);
	              }
	            } else if (axis.isY() && lr) {
	              // Not the best check

	              if (typeof func == "string") {
	                axis[func].apply(axis, params);
	              } else {
	                func.apply(axis, params);
	              }
	            }
	          }
	          break;
	      }
	    }

	  }

	  exports.default = PluginZoom;
	});

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1), __webpack_require__(39), __webpack_require__(33), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('../graph.core'), require('../graph.lru'), require('./graph.plugin'), require('../graph.util'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.graph, global.graph, global.graph, global.graph);
	    global.graphPluginTimeseriemanager = mod.exports;
	  }
	})(this, function (exports, _graph, _graph3, _graph5, _graph7) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _graph2 = _interopRequireDefault(_graph);

	  var _graph4 = _interopRequireDefault(_graph3);

	  var _graph6 = _interopRequireDefault(_graph5);

	  var util = _interopRequireWildcard(_graph7);

	  function _interopRequireWildcard(obj) {
	    if (obj && obj.__esModule) {
	      return obj;
	    } else {
	      var newObj = {};

	      if (obj != null) {
	        for (var key in obj) {
	          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	        }
	      }

	      newObj.default = obj;
	      return newObj;
	    }
	  }

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  /**
	   * @class PluginTimeSerieManager
	   * @implements Plugin
	   */
	  class PluginTimeSerieManager extends _graph6.default {

	    constructor() {

	      super(...arguments);

	      this.series = [];
	      this.plugins = [];
	      this.currentSlots = {};

	      this.requestLevels = {};
	      this.update = (noRecalculate, force) => {

	        this.series.forEach(function (serie) {

	          this.updateSerie(serie, noRecalculate);
	        });

	        if (!noRecalculate) {
	          this.recalculateSeries(force);
	        }
	      };
	    }

	    static defaults() {

	      return {

	        LRUName: "PluginTimeSerieManager",
	        intervals: [1000, 15000, 60000, 900000, 3600000, 8640000],
	        maxParallelRequests: 3,
	        optimalPxPerPoint: 2,
	        nbPoints: 1000,
	        url: ""
	      };
	    }

	    /**
	     * Init method
	     * @private
	     * @memberof PluginTimeSerieManager
	     */
	    init(graph, options) {
	      this.graph = graph;
	      _graph4.default.create(this.options.LRUName, 200);
	      this.requestsRunning = 0;
	    }

	    setURL(url) {
	      this.options.url = url;
	      return this;
	    }

	    setAvailableIntervals() {
	      this.options.intervals = arguments;
	    }

	    newSerie(serieName, serieOptions, serieType, dbElements, noZoneSerie) {
	      var s = this.graph.newSerie(serieName, serieOptions, serieType);

	      this.currentSlots[serieName] = {
	        min: 0,
	        max: 0,
	        interval: 0
	      };

	      s.on("hide", function () {

	        if (s._zoneSerie) {

	          s._zoneSerie.hide();
	        }
	      });

	      s.on("show", function () {

	        if (s._zoneSerie) {
	          s._zoneSerie.show();
	        }
	      });

	      s.setInfo("timeSerieManagerDBElements", dbElements);

	      if (!noZoneSerie) {
	        s._zoneSerie = this.graph.newSerie(serieName + "_zone", {}, _graph2.default.SERIE_ZONE);
	      }

	      this.series.push(s);
	      return s;
	    }

	    registerPlugin(plugin, event) {

	      var index;
	      if ((index = this.plugins.indexOf(plugin)) > -1) {

	        for (var i = 1; i < arguments.length; i++) {
	          plugin.removeListener(arguments[i], this.update);
	        }
	      }

	      for (var i = 1; i < arguments.length; i++) {
	        plugin.on(arguments[i], this.update);
	      }
	    }

	    updateSerie(serie, noRecalculate) {

	      var self = this;
	      var from = serie.getXAxis().getCurrentMin();
	      var to = serie.getXAxis().getCurrentMax();
	      var priority = 1;

	      var optimalInterval = this.getOptimalInterval(to - from);
	      var optimalIntervalIndex = this.options.intervals.indexOf(optimalInterval);
	      var interval;

	      for (var i = optimalIntervalIndex - 1; i <= optimalIntervalIndex + 1; i++) {

	        interval = this.options.intervals[i];
	        var startSlotId = self.computeSlotID(from, interval);
	        var endSlotId = self.computeSlotID(to, interval);

	        var intervalMultipliers = [[2, 5, 6], [1, 2, 4], [0, 1, 3]];

	        intervalMultipliers.forEach(function (multiplier) {

	          var firstSlotId = startSlotId - multiplier[0] * (endSlotId - startSlotId);
	          var lastSlotId = endSlotId + multiplier[0] * (endSlotId - startSlotId);

	          var slotId = firstSlotId;

	          while (slotId <= lastSlotId) {

	            if (self.computeTimeMin(slotId, interval) > Date.now()) {
	              break;
	            }

	            self.register(serie, slotId, interval, interval == optimalInterval ? multiplier[1] : multiplier[2], true, noRecalculate);
	            slotId++;
	          }
	        });
	      }

	      this.processRequests();
	    }

	    register(serie, slotId, interval, priority, noProcess, noRecalculate) {

	      var id = this.computeUniqueID(serie, slotId, interval);

	      var data = _graph4.default.get(this.options.LRUName, id);

	      if (!data || this.computeTimeMax(slotId, interval) > Date.now() && data.timeout < Date.now() - (noRecalculate ? 5000 : 100000) && priority == 1) {

	        this.request(serie, slotId, interval, priority, id, noProcess);
	      }
	    }

	    request(serie, slotId, interval, priority, slotName, noProcess) {

	      for (var i in this.requestLevels) {

	        if (i == priority) {
	          continue;
	        }

	        if (this.requestLevels[i][slotName]) {

	          if (this.requestLevels[i][slotName][0] !== 1) {
	            // If the request is not pending

	            delete this.requestLevels[i][slotName];
	          } else {
	            this.requestLevels[i][slotName][5] = priority;
	          }
	        }
	      }

	      if (this.requestLevels[priority] && this.requestLevels[priority][slotName]) {
	        return;
	      }

	      this.requestLevels[priority] = this.requestLevels[priority] || {};
	      this.requestLevels[priority][slotName] = [0, slotName, serie.getName(), slotId, interval, priority, serie.getInfo('timeSerieManagerDBElements')];

	      if (!noProcess) {
	        this.processRequests();
	      }
	    }

	    processRequests() {

	      if (this.requestsRunning >= this.options.maxParallelRequests) {
	        return;
	      }

	      var self = this,
	          currentLevelChecking = 1,
	          requestToMake;

	      while (true) {

	        for (var i in this.requestLevels[currentLevelChecking]) {

	          if (this.requestLevels[currentLevelChecking][i][0] == 1) {
	            // Running request
	            continue;
	          }

	          requestToMake = this.requestLevels[currentLevelChecking][i];
	          break;
	        }

	        if (requestToMake) {
	          break;
	        }

	        currentLevelChecking++;

	        if (currentLevelChecking > 10) {
	          return;
	        }
	      }

	      this.requestsRunning++;

	      if (!requestToMake) {
	        return;
	      }

	      requestToMake[0] = 1;

	      util.ajaxGet({

	        url: this.getURL(requestToMake),
	        method: 'GET',
	        json: true

	      }).done(function (data) {

	        if (data.status == 1) {
	          // Success

	          self.requestsRunning--;

	          delete self.requestLevels[currentLevelChecking][i];

	          _graph4.default.store(self.options.LRUName, requestToMake[1], data.data); // Element 1 is the unique ID
	          self.processRequests();

	          if (requestToMake[5] == 1 && Object.keys(self.requestLevels[1]).length == 0) {

	            self.recalculateSeries(true);
	          }
	        }
	      });
	    }

	    computeTimeMax(slotId, interval) {
	      return (slotId + 1) * (interval * this.options.nbPoints);
	    }

	    computeTimeMin(slotId, interval) {
	      return slotId * (interval * this.options.nbPoints);
	    }

	    getURL(requestElements) {

	      var url = this.options.url.replace("<measurementid>", requestElements[2]).replace('<from>', this.computeTimeMin(requestElements[3], requestElements[4])).replace('<to>', this.computeTimeMax(requestElements[3], requestElements[4])).replace('<interval>', requestElements[4]);

	      var dbElements = requestElements[6] || {};

	      for (var i in dbElements) {
	        url = url.replace("<" + i + ">", dbElements[i]);
	      }

	      return url;
	    }

	    getOptimalInterval(totalspan) {

	      var optimalInterval = (this.options.optimalPxPerPoint || 1) * totalspan / this.graph.getDrawingWidth(),
	          diff = Infinity,
	          optimalIntervalAmongAvailable;

	      this.options.intervals.forEach(function (interval) {

	        var newDiff = Math.min(diff, Math.abs(interval - optimalInterval));
	        if (diff !== newDiff) {

	          optimalIntervalAmongAvailable = interval;
	          diff = newDiff;
	        }
	      });

	      return optimalIntervalAmongAvailable || 1000;
	    }

	    computeUniqueID(serie, slotId, interval) {
	      var extra = "";
	      var info = serie.getInfo('timeSerieManagerDBElements');
	      for (var i in info) {
	        extra += ";" + i + ":" + info[i];
	      }

	      return serie.getName() + ";" + slotId + ";" + interval + extra;
	    }

	    computeSlotID(time, interval) {
	      return Math.floor(time / (interval * this.options.nbPoints));
	    }

	    computeSlotTime(slotId, interval) {
	      return slotId * (interval * this.options.nbPoints);
	    }

	    getZoneSerie(serie) {
	      return serie._zoneSerie;
	    }

	    updateZoneSerie(serieName) {

	      var serie = this.graph.getSerie(serieName);

	      if (!serie) {
	        return;
	      }

	      if (!serie._zoneSerie) {
	        return;
	      }

	      serie._zoneSerie.setXAxis(serie.getXAxis());
	      serie._zoneSerie.setYAxis(serie.getYAxis());
	      serie._zoneSerie.setFillColor(serie.getLineColor());
	      serie._zoneSerie.setLineColor(serie.getLineColor());
	      serie._zoneSerie.setFillOpacity(0.2);
	      serie._zoneSerie.setLineOpacity(0.3);
	    }

	    recalculateSeries(force) {

	      var self = this;

	      if (this.locked) {
	        return;
	      }

	      this.changed = false;

	      this.series.map(function (serie) {
	        self.recalculateSerie(serie, force);
	      });

	      /*if ( this.changed ) {
	          self.graph._applyToAxes( "scaleToFitAxis", [ this.graph.getXAxis(), false, undefined, undefined, false, true ], false, true );
	        }
	      */
	      this.changed = false;
	      //self.graph.autoscaleAxes();

	      self.graph.draw();
	    }

	    recalculateSerie(serie, force) {

	      var from = serie.getXAxis().getCurrentMin(),
	          to = serie.getXAxis().getCurrentMax(),
	          interval = this.getOptimalInterval(to - from);

	      var startSlotId = this.computeSlotID(from, interval);
	      var endSlotId = this.computeSlotID(to, interval);

	      var data = [];
	      var dataMinMax = [];
	      var lruData;

	      if (!force && interval == this.currentSlots[serie.getName()].interval && this.currentSlots[serie.getName()].min <= startSlotId && this.currentSlots[serie.getName()].max >= endSlotId) {
	        return;
	      }

	      startSlotId -= 2;
	      endSlotId += 2;

	      this.currentSlots[serie.getName()].min = startSlotId;
	      this.currentSlots[serie.getName()].max = endSlotId;
	      this.currentSlots[serie.getName()].interval = interval;

	      var slotId = startSlotId;

	      while (slotId <= endSlotId) {

	        if (lruData = _graph4.default.get(this.options.LRUName, this.computeUniqueID(serie, slotId, interval))) {

	          data = data.concat(lruData.data.mean);
	          dataMinMax = dataMinMax.concat(lruData.data.minmax);
	        } else {

	          this.recalculateSerieUpwards(serie, slotId, interval, data, dataMinMax);
	        }

	        slotId++;
	      }

	      this.changed = true;

	      serie.setData(data);

	      if (serie._zoneSerie) {
	        serie._zoneSerie.setData(dataMinMax);
	      }
	    }

	    setIntervalCheck(interval) {

	      if (this.interval) {
	        clearInterval(this.interval);
	      }

	      var self = this;

	      this.interval = setInterval(function () {
	        self.update(true, false);
	      }, interval);
	    }

	    recalculateSerieUpwards(serie, downSlotId, downInterval, data, dataMinMax) {

	      var intervals = this.options.intervals.slice(0);
	      intervals.sort();

	      var nextInterval = intervals[intervals.indexOf(downInterval) + 1] || -1;
	      var lruData;
	      if (nextInterval < 0) {
	        return [];
	      }

	      var newSlotTime = this.computeSlotTime(downSlotId, downInterval);
	      var newSlotTimeEnd = this.computeSlotTime(downSlotId + 1, downInterval);
	      var newSlotId = this.computeSlotID(newSlotTime, nextInterval),
	          start = false;

	      if (lruData = _graph4.default.get(this.options.LRUName, this.computeUniqueID(serie, newSlotId, nextInterval))) {

	        for (var i = 0, l = lruData.data.mean.length; i < l; i += 2) {

	          if (lruData.data.mean[i] < newSlotTime) {
	            continue;
	          } else if (start === false) {
	            start = i;
	          }

	          if (lruData.data.mean[i] >= newSlotTimeEnd) {

	            data = data.concat(lruData.data.mean.slice(start, i));
	            dataMinMax = data.concat(lruData.data.minmax.slice(start, i));

	            return;
	          }
	        }
	      }

	      return this.recalculateSerieUpwards(serie, newSlotId, nextInterval, data, dataMinMax);
	    }

	    lockRedraw() {
	      this.locked = true;
	    }

	    unlockRedraw() {
	      this.locked = false;
	    }

	    isRedrawLocked() {
	      return !!this.locked;
	    }
	  }

	  exports.default = PluginTimeSerieManager;
	});

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports);
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports);
	    global.graphLru = mod.exports;
	  }
	})(this, function (exports) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports.create = create;
	  exports.get = get;
	  exports.store = store;
	  exports.empty = empty;
	  exports.exist = exist;
	  var memory = {},
	      memoryHead = {},
	      memoryCount = {},
	      memoryLimit = {};

	  function createStoreMemory(store, limit) {
	    limit = limit || 50;
	    if (!memory[store]) {
	      memory[store] = {};
	      memoryCount[store] = 0;
	    }

	    memoryLimit[store] = limit;
	  }

	  function getFromMemory(store, index) {
	    var obj, head;

	    if (memory[store] && memory[store][index]) {

	      head = memoryHead[store];

	      obj = memory[store][index];
	      obj.prev = head;
	      obj.next = head.next;
	      head.next.prev = obj;
	      head.next = obj;

	      memoryHead[store] = obj;
	      return obj.data;
	    }
	  }

	  function storeInMemory(store, index, data) {

	    var toStore, toDelete, head;
	    if (memory[store] && memoryCount[store] !== undefined && memoryLimit[store]) {
	      head = memoryHead[store];

	      if (memory[store][index]) {

	        getFromMemory(store, index);
	        memory[store][index].data.data = data;
	        memory[store][index].data.timeout = Date.now();
	      } else {

	        toStore = {
	          data: {
	            data: data,
	            timeout: Date.now()
	          }
	        };

	        if (typeof head == 'undefined') {
	          toStore.prev = toStore;
	          toStore.next = toStore;
	        } else {
	          toStore.prev = head.prev;
	          toStore.next = head.next;
	          head.next.prev = toStore;
	          head.next = toStore;
	        }

	        memoryHead[store] = toStore;
	        memory[store][index] = toStore;
	        memoryCount[store]++;
	      }

	      // Remove oldest one
	      if (memoryCount[store] > memoryLimit[store] && head) {
	        toDelete = head.next;
	        head.next.next.prev = head;
	        head.next = head.next.next;
	        toDelete.next.next = undefined;
	        toDelete.next.prev = undefined;
	        memoryCount[store]--;
	      }

	      return data;
	    }
	  }

	  function create(store, limitMemory) {
	    createStoreMemory(store, limitMemory);
	  };

	  function get(store, index) {
	    var result;
	    if ((result = getFromMemory(store, index)) != undefined) {
	      return result;
	    }
	  }

	  function store(store, index, value) {
	    storeInMemory(store, index, value);
	    return value;
	  };

	  function empty(store) {
	    emptyMemory(store);
	  };

	  function exist(store) {
	    return memory[store];
	  }
	});

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(33)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('./graph.plugin'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.graph);
	    global.graphPluginSerielinedifference = mod.exports;
	  }
	})(this, function (exports, _graph) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _graph2 = _interopRequireDefault(_graph);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  /**
	   * @class PluginSerieLineDifference
	   * @implements Plugin
	   */
	  class PluginSerieLineDifference extends _graph2.default {

	    constructor() {
	      super(...arguments);
	    }

	    static defaults() {
	      return {

	        positiveStyle: {

	          fillColor: 'green',
	          fillOpacity: 0.2,
	          strokeWidth: 0
	        },

	        negativeStyle: {
	          fillColor: 'red',
	          fillOpacity: 0.2,
	          strokeWidth: 0
	        },

	        from: 0,
	        to: 0
	      };
	    }

	    /**
	     * Init method
	     * @private
	     */
	    init(graph, options) {
	      this.graph = graph;

	      this.pathsPositive = [];
	      this.pathsNegative = [];

	      this.positivePolyline = this.graph.newShape('polyline').draw();

	      this.positivePolyline.setFillColor(this.options.positiveStyle.fillColor).setFillOpacity(this.options.positiveStyle.fillOpacity).setStrokeWidth(this.options.positiveStyle.strokeWidth).applyStyle();

	      this.negativePolyline = this.graph.newShape('polyline').draw();

	      this.negativePolyline.setFillColor(this.options.negativeStyle.fillColor).setFillOpacity(this.options.negativeStyle.fillOpacity).setStrokeWidth(this.options.negativeStyle.strokeWidth).applyStyle();
	    }

	    /**
	     * Assigns the two series for the shape. Postive values are defined when ```serieTop``` is higher than ```serieBottom```.
	     * @param {SerieLine} serieTop - The top serie
	     * @param {SerieLine} serieBottom - The bottom serie
	     */
	    setSeries(serieTop, serieBottom) {
	      this.serie1 = serieTop;
	      this.serie2 = serieBottom;
	    }

	    /**
	     * Assigns the boundaries
	     */
	    setBoundaries(from, to) {
	      this.options.from = from;
	      this.options.to = to;
	    }

	    /**
	     * @returns the starting value used to draw the zone
	     */
	    getFrom() {
	      return this.options.from;
	    }

	    /**
	     * @returns the ending value used to draw the zone
	     */
	    getTo() {
	      return this.options.to;
	    }

	    /**
	     * Calculates and draws the zone series
	     * @returns {Plugin} The current plugin instance
	     */
	    draw() {

	      var self = this;
	      var s1 = this.serie1.searchClosestValue(this.getFrom());
	      var i1, j1, i2, j2, y, y2, crossing;

	      var top = [];
	      var bottom = [];

	      var bottomBroken;

	      if (!s1) {
	        i1 = 0;
	        j1 = 0;
	      } else {

	        i1 = s1.dataIndex;
	        j1 = s1.xAfterIndex * 2;
	      }

	      y = this.interpolate(this.serie1, this.getFrom());
	      top.push(this.getFrom()); // x 
	      top.push(y); // y

	      y = this.interpolate(this.serie2, this.getFrom());
	      bottom.push(this.getFrom()); // x 
	      bottom.push(y); // y

	      var s2;

	      var order;

	      function nextSet() {

	        if (order === true) {
	          self.pathsPositive.push([top, bottom]);
	        } else if (order === false) {
	          self.pathsNegative.push([top, bottom]);
	        }

	        top = [];
	        bottom = [];
	        order = undefined;
	      }
	      var ended;
	      for (; i1 < this.serie1.data.length; i1++) {

	        for (; j1 < this.serie1.data[i1].length; j1 += 2) {

	          if (this.serie1.data[i1][j1] > this.getTo()) {
	            // FINISHED !

	            y = this.interpolate(this.serie1, this.getTo());
	            y2 = this.interpolate(this.serie2, this.getTo());

	            crossing = this.computeCrossing(top[top.length - 2], top[top.length - 1], this.getTo(), y, bottom[bottom.length - 2], bottom[bottom.length - 1], this.getTo(), y2);

	            if (crossing) {

	              top.push(crossing.x);
	              top.push(crossing.y);
	              bottom.push(crossing.x);
	              bottom.push(crossing.y);
	              nextSet();
	              top.push(crossing.x);
	              top.push(crossing.y);
	              bottom.push(crossing.x);
	              bottom.push(crossing.y);

	              order = this.serie1.data[i1][j1 + 1] > this.serie2.data[i2][j2 + 1];
	            }

	            top.push(this.getTo()); // x 
	            top.push(y); // y

	            bottom.push(this.getTo()); // x 
	            bottom.push(y2); // y

	            ended = true;
	            break;
	          }

	          if (!s2) {
	            s2 = this.serie2.searchClosestValue(this.serie1.data[i1][j1]); // Finds the first point

	            if (s2) {
	              i2 = s2.dataIndex;
	              j2 = s2.xBeforeIndex * 2;

	              // TODO: Add here first points

	              y = this.interpolate(this.serie2, this.serie1.data[i1][j1]);

	              top.push(this.serie1.data[i1][j1]); // x 
	              top.push(this.serie1.data[i1][j1 + 1]); // y

	              bottom.push(this.serie1.data[i1][j1]); // x 
	              bottom.push(y); // y

	              order = this.serie1.data[i1][j1 + 1] > y;
	            } else {
	              continue;
	            }
	          }

	          bottomBroken = false;

	          crossing = this.computeCrossing(top[top.length - 2], top[top.length - 1], this.serie1.data[i1][j1], this.serie1.data[i1][j1 + 1], bottom[bottom.length - 2], bottom[bottom.length - 1], this.serie2.data[i2][j2], this.serie2.data[i2][j2 + 1]);

	          if (crossing) {

	            top.push(crossing.x);
	            top.push(crossing.y);
	            bottom.push(crossing.x);
	            bottom.push(crossing.y);
	            nextSet();
	            top.push(crossing.x);
	            top.push(crossing.y);
	            bottom.push(crossing.x);
	            bottom.push(crossing.y);

	            order = this.serie1.data[i1][j1 + 1] > this.serie2.data[i2][j2 + 1];
	          }

	          while (this.serie2.data[i2][j2] < this.serie1.data[i1][j1]) {

	            bottom.push(this.serie2.data[i2][j2]);
	            bottom.push(this.serie2.data[i2][j2 + 1]);

	            j2 += 2;
	            if (j2 == this.serie2.data[i2].length) {
	              bottomBroken = this.serie2.data[i2][j2 - 2];
	              i2++;
	              j2 = 0;
	              break;
	            }

	            crossing = this.computeCrossing(top[top.length - 2], top[top.length - 1], this.serie1.data[i1][j1], this.serie1.data[i1][j1 + 1], bottom[bottom.length - 2], bottom[bottom.length - 1], this.serie2.data[i2][j2], this.serie2.data[i2][j2 + 1]);

	            if (crossing) {

	              top.push(crossing.x);
	              top.push(crossing.y);
	              bottom.push(crossing.x);
	              bottom.push(crossing.y);
	              nextSet();
	              top.push(crossing.x);
	              top.push(crossing.y);
	              bottom.push(crossing.x);
	              bottom.push(crossing.y);

	              order = this.serie1.data[i1][j1 + 1] > this.serie2.data[i2][j2 + 1];
	            }
	          }

	          if (bottomBroken === false) {
	            top.push(this.serie1.data[i1][j1]);
	            top.push(this.serie1.data[i1][j1 + 1]);
	          } else {

	            top.push(bottomBroken);
	            top.push(this.interpolate(this.serie1, bottomBroken));

	            s2 = false;
	            j1 -= 2;
	            nextSet();
	          }
	        }

	        if (ended) {
	          nextSet();
	          break;
	        }
	        // End of X

	        if (y = this.interpolate(this.serie2, top[top.length - 2])) {
	          bottom.push(top[top.length - 2]);
	          bottom.push(y);
	        }

	        nextSet();

	        j1 = 0;
	        s2 = false;
	      }

	      var d = this.pathsPositive.reduce(makePaths, "");
	      this.positivePolyline.setPointsPx(d).redraw();

	      var d = this.pathsNegative.reduce(makePaths, "");
	      this.negativePolyline.setPointsPx(d).redraw();

	      //pathsBottom.map( function( map ) { makePaths( map, self.options.negativeStyle ); } );

	      function makePaths(d, path) {

	        for (var i = 0; i < path[0].length; i += 2) {
	          if (i == 0) {
	            d += "M ";
	          }
	          d += " " + Math.round(self.serie1.getXAxis().getPx(path[0][i])) + ", " + Math.round(self.serie1.getYAxis().getPx(path[0][i + 1]));
	          if (i < path[0].length - 2) {
	            d += " L ";
	          }
	        }

	        for (var i = path[1].length - 2; i >= 0; i -= 2) {
	          d += " L " + Math.round(self.serie2.getXAxis().getPx(path[1][i])) + ", " + Math.round(self.serie2.getYAxis().getPx(path[1][i + 1]));
	          if (i == 0) {
	            d += " z ";
	          }
	        }
	        return d;
	      }
	    }

	    /**
	     * Finds the interpolated y value at point ```valX``` of the serie ```serie```
	     * @returns {(Number|Boolean)} The interpolated y value is possible, ```false``` otherwise
	     * @param {Serie} serie - The serie for which the y value should be computed
	     * @param {Number} valX - The x value
	     */
	    interpolate(serie, valX) {

	      var value = serie.searchClosestValue(valX);

	      if (!value) {
	        return false;
	      }

	      if (value.xMax == undefined) {
	        return value.yMin;
	      }

	      if (value.xMin == undefined) {
	        return value.yMax;
	      }

	      var ratio = (valX - value.xMin) / (value.xMax - value.xMin);
	      return (1 - ratio) * value.yMin + ratio * value.yMax;
	    }

	    /**
	     * Finds the crossing point between two vector and returns it, or ```false``` if it is not within the x boundaries
	     * @returns {(Object|Boolean)} An object containing the crossing point in the following format: ```{ x: xCrossing, y: yCrossing }``` or ```false``` if no crossing point can be found
	     * @param {Number} x11 - First x point of the first vector
	     * @param {Number} y11 - First y point of the first vector
	     * @param {Number} x12 - Second x point of the first vector
	     * @param {Number} y12 - Second y point of the first vector
	     * @param {Number} x21 - First x point of the second vector
	     * @param {Number} y21 - First y point of the second vector
	     * @param {Number} y22 - Second x point of the second vector
	     * @param {Number} y22 - Second y point of the second vector
	     */
	    computeCrossing(x11, y11, x12, y12, x21, y21, x22, y22) {
	      var a1 = (y12 - y11) / (x12 - x11);
	      var a2 = (y22 - y21) / (x22 - x21);

	      var b1 = y12 - a1 * x12;
	      var b2 = y22 - a2 * x22;

	      if (x11 == x12 || x21 == x22) {

	        return false;
	      }

	      if (a1 == a2) {
	        return {
	          x: x11,
	          y1: y11,
	          y2: y11
	        };
	      }

	      var x = (b1 - b2) / (a2 - a1);

	      if (x > x12 || x < x11 || x < x21 || x > x22) {
	        return false;
	      }

	      return {
	        x: x,
	        y: a1 * x + b1
	      };
	    }

	    /**
	     * @returns The positive polyline
	     */
	    getPositivePolyline() {
	      return this.positivePolyline;
	    }

	    /**
	     * @returns The negative polyline
	     */
	    getNegativePolyline() {
	      return this.negativePolyline;
	    }

	  }

	  exports.default = PluginSerieLineDifference;
	});

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1), __webpack_require__(6), __webpack_require__(8), __webpack_require__(3), __webpack_require__(11), __webpack_require__(18), __webpack_require__(33), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require("../graph.core"), require("../graph.axis.x"), require("../graph.axis.y"), require("../graph.util"), require("../series/graph.serie.line"), require("../series/graph.serie.scatter"), require("./graph.plugin"), require("../graph.axis"));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.graph, global.graphAxis, global.graphAxis, global.graph, global.graphSerie, global.graphSerie, global.graph, global.graph);
	    global.graphPluginAxissplitting = mod.exports;
	  }
	})(this, function (exports, _graph, _graphAxis, _graphAxis3, _graph3, _graphSerie, _graphSerie3, _graph4, _graph6) {
	  "use strict";

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _graph2 = _interopRequireDefault(_graph);

	  var _graphAxis2 = _interopRequireDefault(_graphAxis);

	  var _graphAxis4 = _interopRequireDefault(_graphAxis3);

	  var util = _interopRequireWildcard(_graph3);

	  var _graphSerie2 = _interopRequireDefault(_graphSerie);

	  var _graphSerie4 = _interopRequireDefault(_graphSerie3);

	  var _graph5 = _interopRequireDefault(_graph4);

	  var _graph7 = _interopRequireDefault(_graph6);

	  function _interopRequireWildcard(obj) {
	    if (obj && obj.__esModule) {
	      return obj;
	    } else {
	      var newObj = {};

	      if (obj != null) {
	        for (var key in obj) {
	          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	        }
	      }

	      newObj.default = obj;
	      return newObj;
	    }
	  }

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  class SerieLineExtended extends _graphSerie2.default {

	    constructor() {
	      super(...arguments);
	      this.subSeries = [];
	    }

	    setData() {
	      super.setData(...arguments);
	      this.subSeries.map(sub => {
	        sub.data = this.data;
	      });
	      return this;
	    }

	    draw() {
	      this.eraseMarkers();
	      return this;
	    }

	    getSymbolForLegend() {
	      if (!this.subSeries[0]) {
	        return false;
	      }

	      return this.subSeries[0].getSymbolForLegend();
	    }

	    getMarkerForLegend() {
	      if (!this.subSeries[0]) {
	        return false;
	      }

	      return this.subSeries[0].getMarkerForLegend();
	    }
	  }

	  class SerieScatterExtended extends _graphSerie4.default {

	    constructor() {
	      super(...arguments);
	      this.subSeries = [];
	    }

	    setData() {
	      super.setData(...arguments);
	      this.subSeries.map(sub => {
	        sub.data = this.data;
	      });
	      return this;
	    }

	    draw() {
	      return this;
	    }

	    getSymbolForLegend() {
	      if (!this.subSeries[0]) {
	        return false;
	      }

	      return this.subSeries[0].getSymbolForLegend();
	    }

	    getMarkerForLegend() {
	      if (!this.subSeries[0]) {
	        return false;
	      }

	      return this.subSeries[0].getMarkerForLegend();
	    }
	  }

	  var excludingMethods = ['constructor', 'init', 'draw', 'setLineColor', 'setLineWidth', 'setLineStyle', 'getLineColor', 'getLineWidth', 'getLineStyle', 'setMarkers', 'showMarkers', 'hideMarkers', 'getMarkerDom', 'getMarkerDomIndependant', 'getMarkerPath', 'eraseMarkers', '_recalculateMarkerPoints'];
	  var addMethods = [];

	  Object.getOwnPropertyNames(_graphSerie2.default.prototype).concat(addMethods).map(function (i) {

	    if (excludingMethods.indexOf(i) > -1) {
	      return;
	    }

	    SerieLineExtended.prototype[i] = function (j) {

	      return function () {

	        var args = arguments;
	        this.subSeries.map(subSerie => {
	          subSerie[j](...args);
	        });
	      };
	    }(i);
	  });

	  /** 
	   * Axis splitting plugin
	   * @augments Plugin
	   */
	  class PluginAxisSplitting extends _graph5.default {

	    constructor(options) {
	      super(...arguments);
	      this.series = new Map();
	    }

	    static defaults() {

	      return {
	        axes: {
	          margins: {
	            high: 5,
	            low: 5
	          }
	        }
	      };
	    }

	    init(graph) {
	      this.graph = graph;
	    }

	    /**
	     *  Creates a new bottom split axis
	     *  @param {Object} [ options = {} ] The axis options
	     *  @return {Axis} The newly created split axis
	     */
	    newXAxis(options) {
	      return newBottomAxis(options);
	    }

	    /**
	     *  Creates a new left split axis
	     *  @param {Object} [ options = {} ] The axis options
	     *  @return {Axis} The newly created split axis
	     */
	    newYAxis(options) {
	      return newLeftAxis(options);
	    }

	    /**
	     *  Creates a new top split axis
	     *  @param {Object} [ options = {} ] The axis options
	     *  @return {Axis} The newly created split axis
	     */
	    newTopAxis(options) {
	      options = this.getOptions(options);
	      return new SplitXAxis(this.graph, "top", options);
	    }

	    /**
	     *  Creates a new bottom split axis
	     *  @param {Object} [ options = {} ] The axis options
	     *  @return {Axis} The newly created split axis
	     */
	    newBottomAxis(options) {
	      options = this.getOptions(options);
	      return new SplitXAxis(this.graph, "bottom", options);
	    }

	    /**
	     *  Creates a new left split axis
	     *  @param {Object} [ options = {} ] The axis options
	     *  @return {Axis} The newly created split axis
	     */
	    newLeftAxis(options) {
	      options = this.getOptions(options);
	      return new SplitYAxis(this.graph, "left", options);
	    }

	    /**
	     *  Creates a new right split axis
	     *  @param {Object} [ options = {} ] The axis options
	     *  @return {Axis} The newly created split axis
	     */
	    newRightAxis(options) {
	      options = this.getOptions(options);
	      return new SplitYAxis(this.graph, "right", options);
	    }

	    getOptions(options) {
	      var defaults = {
	        marginMin: this.options.axes.margins.low,
	        marginMax: this.options.axes.margins.high
	      };
	      return util.extend(true, defaults, options);
	    }

	    preDraw() {

	      var xAxis, yAxis;

	      //    for ( let { serie } of this.series.values() ) {
	      this.series.forEach(({
	        serie
	      }) => {

	        xAxis = serie.getXAxis();
	        yAxis = serie.getYAxis();

	        let splits = 1;

	        if (xAxis.splitNumber) {
	          splits *= xAxis.splitNumber;
	        }

	        if (yAxis.splitNumber) {
	          splits *= yAxis.splitNumber;
	        }

	        while (serie.subSeries.length < splits) {

	          const name = serie.getName() + "_" + serie.subSeries.length;

	          const s = this.graph.newSerie(name, {}, serie.getType() || _graph2.default.SERIE_LINE);

	          s.excludedFromLegend = true;
	          s.styles = serie.styles;
	          s.data = serie.data; // Copy data

	          if (serie.getType() == _graph2.default.SERIE_LINE) {
	            s.markerPoints = serie.markerPoints;
	            s.markerFamilies = serie.markerFamilies;
	          }

	          serie.subSeries.push(s);
	        }

	        while (serie.subSeries.length > splits) {

	          let subserie = this.graph.getSerie(serie.getName() + "_" + (serie.subSeries.length - 1));

	          if (subserie && subserie.kill) {
	            subserie.kill();
	          }
	          serie.subSeries.pop();
	        }

	        if (!serie.getXAxis().splitNumber && serie.getXAxis().splitAxis) {
	          serie.getXAxis().splitAxis();
	        }

	        if (!serie.getYAxis().splitNumber && serie.getYAxis().splitAxis) {
	          serie.getYAxis().splitAxis();
	        }

	        // Re-assign axes to the sub series
	        serie.subSeries.map((sserie, index) => {

	          var xSubAxis, ySubAxis;

	          //sserie.groupMarkers = firstSubSerie.groupMarkers;

	          if (serie.getXAxis().getSubAxis) {
	            let subAxisIndex = index % (xAxis.splitNumber || 1);
	            xSubAxis = serie.getXAxis().getSubAxis(subAxisIndex);
	          } else {
	            xSubAxis = serie.getXAxis();
	          }

	          sserie.setXAxis(xSubAxis);

	          if (serie.getYAxis().getSubAxis) {

	            let subAxisIndex = Math.floor(index / (xAxis.splitNumber || 1));
	            ySubAxis = serie.getYAxis().getSubAxis(subAxisIndex);
	          } else {
	            ySubAxis = serie.getYAxis();
	          }

	          sserie.setYAxis(ySubAxis);

	          sserie.draw(true);
	        });
	        //}
	      });
	    }

	    /**
	     *  Creates a new serie
	     *  @param {(String|Number)} name - The name of the serie
	     *  @param {Object} [ options = {} ] The options of the serie
	     *  @param {String} type - The type of the serie
	     *  @return {Serie} The created serie
	     */
	    newSerie(name, options = {}, type) {

	      switch (type) {

	        case 'line':
	          return newLineSerie(name, options);
	          break;

	        case 'scatter':
	          return newScatterSerie(name, options);
	          break;
	      }

	      throw "Cannot create a split serie of type " + type;
	    }

	    /**
	     *  Creates a new line serie
	     *  @param {(String|Number)} name - The name of the serie
	     *  @param {Object} [ options = {} ] The options of the serie
	     *  @return {Serie} The created serie
	     */
	    newLineSerie(name, options) {
	      var serieObj = {
	        type: "lineSerie",
	        serie: new SerieLineExtended(name, options, "line")
	      };
	      this.series.set(name, serieObj);
	      serieObj.serie.init(this.graph, name, options);
	      this.graph.series.push(serieObj.serie);
	      return serieObj.serie;
	    }

	    /**
	     *  Creates a new scatter serie
	     *  @param {(String|Number)} name - The name of the serie
	     *  @param {Object} [ options = {} ] The options of the serie
	     *  @return {Serie} The created serie
	     */
	    newScatterSerie(name, options) {
	      var serieObj = {
	        type: "scatterSerie",
	        serie: new SerieScatterExtended(name, options, "scatter")
	      };
	      this.series.set(name, serieObj);
	      serieObj.serie.init(this.graph, options);
	      this.graph.series.push(serieObj.serie);
	      return serieObj.serie;
	    }

	  }

	  var defaultAxisConstructorOptions = {
	    splitMarks: true
	  };

	  var SplitAxis = function (mixin) {

	    var delegateMethods = ['turnGridsOff', 'turnGridsOn', 'gridsOff', 'gridsOn', 'setEngineering', 'setScientificScaleExponent', 'setScientific', 'setLabelColor', 'setSecondaryGridDasharray', 'setPrimaryGridDasharray', 'setSecondaryGridsOpacity', 'setPrimaryGridOpacity', 'setSecondaryGridWidth', 'setPrimaryGridWidth', 'setSecondaryGridColor', 'setPrimaryGridColor', 'setTicksLabelColor', 'setSecondaryTicksColor', 'setPrimaryTicksColor', 'setAxisColor', 'secondaryGridOn', 'secondaryGridOff', 'primaryGridOff', 'primaryGridOn', 'setSecondaryGrid', 'setPrimaryGrid', 'setGrids', 'setTickPosition', 'setExponentialFactor', 'setExponentialLabelFactor', 'setGridLinesStyle', 'forcePrimaryTickUnitMin', 'forcePrimaryTickUnitMax', 'forcePrimaryTickUnit', 'flip', 'show', 'hide', 'setDisplay'];

	    /** 
	     * Split axis
	     * @mixes AxisX
	     * @mixes AxisY
	     * @name SplitAxis
	     * @static
	     */
	    var cl = class SplitAxis extends mixin {

	      constructor(graph, position, options = {}) {

	        super(graph, position, options);
	        this.axes = [];
	        this.position = position;
	        this.constructorOptions = util.extend(true, {}, defaultAxisConstructorOptions, options);

	        this._splitVal = [];
	      }

	      /**
	       *  Calls a callback onto each chunk axes. The callback receives two parameters: 1) the ```axis``` itself and 2) the ```index``` of the axis in the stack
	       *  @param {Function} callback - The callback to be applied to each axes
	       *  @return {SplitAxis} The current axis instance
	       */
	      all(callback) {

	        if (!(typeof callback == "function")) {
	          return;
	        }

	        this.axes.map(callback);
	        return this;
	      }

	      /**
	       *  Splits the axis into chunks at the positions defined as a list of parameters.
	       *  @param {Function} ...splits - The positions of axis splitting
	       *  @return {SplitAxis} The current axis instance
	       *  @example axis.splitAxis( 0.2, 0.5, 0.8 ); // Creates 4 chunks (0-20%, 20%-50%, 50%-80%, 80%-100%)
	       */
	      splitAxis(...splits) {

	        splits.push(1);
	        let splitNumber = splits.length;

	        while (this.axes.length > splitNumber) {
	          this.axes.pop().kill(true, true);
	        }

	        while (this.axes.length < splitNumber) {
	          let axis = new (this.getConstructor())(this.graph, this.position, this.constructorOptions);
	          this.axes.push(axis);
	          axis.zoomLock = true;
	          axis.init(this.graph, this.constructorOptions);
	        }

	        let from = 0;
	        let i = 0;
	        for (let axis of this.axes) {

	          axis.options.marginMin = 10;
	          axis.options.marginMax = 10;

	          if (i == 0) {
	            axis.options.marginMin = 0;
	          }

	          if (i == this.axes.length - 1) {
	            axis.options.marginMax = 0;
	          }

	          axis.setSpan(from, from = splits[i]);
	          axis.setMinMaxFlipped();
	          i++;
	        }

	        this._splits = splits;
	        return this;
	      }

	      /**
	       *  Fixes the major tick interval of all axes based on the one provided as a parameter
	       *  @param {Number} axisIndex - The index of the reference axis (starting at 0)
	       *  @return {SplitAxis} The current axis instance
	       */
	      fixGridIntervalBasedOnAxis(axisIndex) {

	        this.fixGridFor = axisIndex;
	        this.graph._axisHasChanged();
	        return this;
	      }

	      /**
	       *  Spreads the chunks of the axis based on the relative interval of each one of them, so that the unit / px is constant for each chunk
	       *  @param {Boolean} bln - ```true``` to enable the spread, ```false``` otherwise
	       *  @return {SplitAxis} The current axis instance
	       */
	      splitSpread(bln) {
	        this.autoSpread = !!bln;
	        return this;
	      }

	      hasAxis(axis) {
	        return this.axes.indexOf(axis) > -1;
	      }

	      _splitSpread() {

	        let splits = [],
	            total = 0,
	            currentSplit = 0;
	        //console.log( this._splitVal );
	        for (let split of this._splitVal) {
	          total += split[1] - split[0];
	        }

	        for (let split of this._splitVal) {

	          splits.push(currentSplit += (split[1] - split[0]) / total);
	        }

	        splits.pop();
	        this.splitAxis(...splits);
	      }

	      /**
	       *  Defines the boundaries of each chunk in axis unit.
	       *  @param {Array<(Array|Number)>} values - An array of either 2-component arrays (from-to) or number (mean)
	       *  @example axis.setChunkBoundaries( [ [ 12, 20 ], [ 100, 200 ] ] ); // First chunk from 12 to 20, second one from 100 to 200
	       *  @example axis.setChunkBoundaries( [ 12, [ 100, 200 ] ] ); // Second chunk from 100 to 200, first chunk with a mean at 12 and min / max determined by the relative widths of the chunks
	       *  @return {SplitAxis} The current axis instance
	       */
	      setChunkBoundaries(values) {

	        let index = 0,
	            baseWidth,
	            baseWidthIndex;

	        for (let axis of this.axes) {
	          // List all axes

	          // Two elements in the array => becomes the new reference
	          if (Array.isArray(values[index]) && values[index].length > 1 && !baseWidth) {
	            baseWidth = values[index][1] - values[index][0];
	            baseWidthIndex = index;
	          }

	          if (values[index].length == 1 || !Array.isArray(values[index])) {
	            axis._mean = values[index];

	            if (Array.isArray(axis._mean)) {
	              axis._mean = axis._mean[0];
	            }
	          } else {

	            axis.forceMin(values[index][0]).forceMax(values[index][1]);
	          }

	          index++;
	        }

	        this._baseWidthVal = baseWidth;
	        this._baseWidthIndex = baseWidthIndex;

	        this._splitVal = values;

	        this.graph._axisHasChanged();

	        return this;
	      }

	      setMinMaxToFitSeries() {

	        if (!this._splitVal || this._splitVal.length < 1) {
	          super.setMinMaxToFitSeries(...arguments);
	          this._splitVal[0] = this._splitVal[0] || [];
	          this._splitVal[this._splitVal.length - 1] = this._splitVal[this._splitVal.length - 1] || [];

	          this._splitVal[0][0] = this.getCurrentMin();
	          this._splitVal[this._splitVal.length - 1][1] = this.getCurrentMax();
	          this.setChunkBoundaries(this._splitVal);
	        }
	      }

	      draw() {

	        if (this.autoSpread) {
	          this._splitSpread();
	        }

	        let max = 0;
	        let unit;
	        let subAxis;
	        let spanReference;

	        if (this._baseWidthIndex >= 0 && (subAxis = this.getSubAxis(this._baseWidthIndex))) {
	          spanReference = subAxis.getSpan();
	        }

	        subAxis = undefined;

	        if (this.fixGridFor >= 0 && (subAxis = this.getSubAxis(this.fixGridFor))) {

	          if (subAxis._mean !== undefined) {
	            let width = (subAxis.getSpan()[1] - subAxis.getSpan()[0]) / (spanReference[1] - spanReference[0]) * this._baseWidthVal;
	            subAxis.forceMin(subAxis._mean - width / 2);
	            subAxis.forceMax(subAxis._mean + width / 2);
	          }

	          max = subAxis.draw();
	          unit = subAxis.getPrimaryTickUnit();
	        }

	        this.axes.map(axis => {

	          if (subAxis === axis) {
	            return;
	          }

	          if (axis._mean !== undefined) {
	            let width = (axis.getSpan()[1] - axis.getSpan()[0]) / (spanReference[1] - spanReference[0]) * this._baseWidthVal;
	            axis.forceMin(axis._mean - width / 2);
	            axis.forceMax(axis._mean + width / 2);
	          }

	          if (unit) {
	            axis.forcePrimaryTickUnit(unit);
	          }

	          max = Math.max(max, axis.draw());
	        });

	        //    this.drawLabel();
	        this.writeUnit();

	        return max;
	      }

	      setMinPx(min) {

	        super.setMinPx(min);
	        for (let axis of this.axes) {
	          axis.setMinPx(min);
	        }
	      }

	      setMaxPx(max) {

	        super.setMaxPx(max);

	        for (let axis of this.axes) {
	          axis.setMaxPx(max);
	        }
	      }

	      setShift() {

	        super.setShift(...arguments);

	        for (let axis of this.axes) {
	          axis.setShift(...arguments);
	        }
	      }

	      init() {
	        super.init(...arguments);
	        this.splitAxis();
	      }

	      getAxisPosition() {
	        var max = 0;

	        this.axes.map(axis => {
	          max = Math.max(max, axis.getAxisPosition());
	        });

	        return max;
	      }

	      getSubAxis(index) {

	        if (this.axes.length <= index) {
	          throw "Impossible to reach axis. Index " + index + " is out of range";
	        }

	        return this.axes[index];
	      }

	      get splitNumber() {
	        return this._splits.length;
	      }
	    };

	    delegateMethods.map(methodName => {

	      cl.prototype[methodName] = function (method) {

	        return function () {
	          //super[ method ]( ...arguments )

	          this.axes.map(axis => {
	            axis[method](...arguments);
	          });
	          return this;
	        };
	      }(methodName);
	    });

	    return cl;
	  };

	  class SplitXAxis extends SplitAxis(_graphAxis2.default) {

	    constructor(graph, topbottom, options) {
	      super(...arguments);
	      this.topbottom = topbottom;
	    }

	    getConstructor() {
	      return _graphAxis2.default;
	    }

	    getAxisPosition() {
	      var max = super.getAxisPosition(...arguments);

	      this.labelPosY = max;

	      if (this.getLabel()) {
	        max += this.graph.options.fontSize;
	      }

	      return max;
	    }

	    drawLabel() {
	      super.drawLabel();
	      this.label.setAttribute('y', (this.top ? -1 : 1) * (this.graph.options.fontSize + this.labelPosY));
	    }

	    draw() {
	      var height = super.draw(...arguments);
	      this.drawLabel();
	      return height;
	    }

	  }

	  class SplitYAxis extends SplitAxis(_graphAxis4.default) {

	    constructor(graph, leftright, options) {
	      super(...arguments);
	      ///this.leftright = leftright;
	    }

	    getConstructor() {
	      return _graphAxis4.default;
	    }
	    /*
	      draw() {
	         if ( this.getLabel() ) {
	          this.axes.map( ( axis ) => {
	            axis.setAxisPosition( this.graph.options.fontSize );
	          } ); // Extra shift allowed for the label
	          //this.setShift( this.graph.options.fontSize );
	        }
	        return super.draw( ...arguments );
	      }
	    */
	    drawLabel() {
	      super.drawLabel();
	    }

	    equalizePosition(width) {

	      var widthAfter = width;

	      if (this.getLabel()) {
	        this.axes.map(axis => {
	          widthAfter = Math.max(axis.equalizePosition(width), widthAfter);
	        }); // Extra shift allowed for the label
	        //this.setShift( this.graph.options.fontSize );
	      }

	      if (this.getLabel()) {
	        this.placeLabel(this.left ? -widthAfter : widthAfter);
	        return widthAfter + this.graph.options.fontSize;
	      }
	    }

	  }

	  util.mix(SplitXAxis, new _graphAxis2.default());
	  util.mix(SplitYAxis, new _graphAxis4.default());

	  exports.default = PluginAxisSplitting;
	});

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(27)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('./graph.shape.line'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.graphShape);
	    global.graphShapeArrow = mod.exports;
	  }
	})(this, function (exports, _graphShape) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _graphShape2 = _interopRequireDefault(_graphShape);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  /**
	   *  Displays an arrow
	   *  @extends GraphShapeLine
	   */
	  class ShapeArrow extends _graphShape2.default {

	    constructor(graph) {

	      super(graph);
	    }

	    createDom() {

	      this._dom = document.createElementNS(this.graph.ns, 'line');
	      this._dom.setAttribute('marker-end', 'url(#arrow' + this.graph._creation + ')');

	      this.createHandles(this.nbHandles, 'rect', {
	        transform: "translate(-3 -3)",
	        width: 6,
	        height: 6,
	        stroke: "black",
	        fill: "white",
	        cursor: 'nwse-resize'
	      });

	      this.setStrokeColor('black');
	      this.setStrokeWidth(1);
	    }
	  }

	  exports.default = ShapeArrow;
	});

/***/ }
/******/ ])
});
;