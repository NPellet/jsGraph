import GraphPosition from './graph.position'
import * as util from './graph.util'
import EventEmitter from './dependencies/eventEmitter/EventEmitter'

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
}

var _constructors = new Map();

/** 
 * Entry class of jsGraph that creates a new graph.
 * @extends EventEmitter
 * @tutorial basic
 */
class Graph extends EventEmitter {

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
  constructor( wrapper, options, axis ) {

    super();

    /*
      The unique ID of the graph
      @name Graph#uniqueid
      @type String
    */
    this._creation = util.guid();

    if ( typeof wrapper == "string" ) {
      wrapper = document.getElementById( wrapper );
    } else if ( typeof wrapper.length == "number" ) {
      wrapper = wrapper[ 0 ];
    }

    if ( !wrapper ) {
      throw "The wrapper DOM element was not found.";
    }

    if ( !wrapper.appendChild ) {
      throw "The wrapper appears to be an invalid HTMLElement";
    }

    wrapper.style[ '-webkit-user-select' ] = 'none';
    wrapper.style[ '-moz-user-select' ] = 'none';
    wrapper.style[ '-o-user-select' ] = 'none';
    wrapper.style[ '-ms-user-select' ] = 'none';
    wrapper.style[ 'user-select' ] = 'none';

    /** 
     * @object
     * @memberof Graph
     * @name Graph#options
     * @type GraphOptions
     * @default {@link GraphOptionsDefault}
     * Access directly the options of the graph using this public object.
     * @example graph.options.mouseActions.push( {  } );
     */
    this.options = util.extend( {}, GraphOptionsDefault, options );

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

    for ( var i in this.options.pluginAction ) {
      this.options.pluginAction.plugin = i;
      this.options.mouseActions.push( this.options.pluginAction );
    }

    this.selectedShapes = [];

    this.ns = 'http://www.w3.org/2000/svg';
    this.nsxlink = "http://www.w3.org/1999/xlink";
    this.series = [];
    this._dom = wrapper;
    this._axesHaveChanged = true;

    if ( this.options.hasOwnProperty( 'padding' ) && util.isNumeric( this.options.padding ) ) {
      this.options.paddingTop = this.options.paddingBottom = this.options.paddingLeft = this.options.paddingRight = this.options.padding;
    }

    // DOM
    var wrapperStyle = getComputedStyle( wrapper );
    var w = parseInt( wrapperStyle.width );
    var h = parseInt( wrapperStyle.height );

    this._doDom();

    this.setSize( w, h );
    this._resize();
    _registerEvents( this );

    this.currentAction = false;

    // Load all axes
    if ( axis ) {
      for ( var i in axis ) {
        for ( var j = 0, l = axis[ i ].length; j < l; j++ ) {

          switch ( i ) {

            case 'top':
              this.getTopAxis( j, axis[ i ][ j ] );
              break;
            case 'bottom':
              this.getBottomAxis( j, axis[ i ][ j ] );
              break;
            case 'left':
              this.getLeftAxis( j, axis[ i ][ j ] );
              break;
            case 'right':
              this.getRightAxis( j, axis[ i ][ j ] );
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
  setOption( name, val ) {
    this.options[ name ] = val;
    return this;
  }

  /**
   *  Sets the title of the graph
   */
  setTitle( title ) {
    this.options.title = title;
    this.domTitle.textContent = title;
  }

  /**
   *  Shows the title of the graph
   */
  displayTitle() {
    this.domTitle.setAttribute( 'display', 'inline' );
  }

  /**
   *  Hides the title of the graph
   */
  hideTitle() {
    this.domTitle.setAttribute( 'display', 'none' );
  }

  /**
   * Calls a repaint of the container. Used internally when zooming on the graph, or when <code>.autoscaleAxes()</code> is called (see {@link Graph#autoscaleAxes}).<br />
   * To be called after axes min/max are expected to have changed (e.g. after an <code>axis.zoom( from, to )</code>) has been called
   * @param {Boolean} onlyIfAxesHaveChanged - Triggers a redraw only if min/max values of the axes have changed.
   * @return {Boolean} if the redraw has been successful
   */
  redraw( onlyIfAxesHaveChanged ) {

    if ( !this.width || !this.height ) {
      return;
    }

    if ( !this.sizeSet ) {
      this._resize();
      this.executeRedrawSlaves();
      return true;

    } else {

      if ( !onlyIfAxesHaveChanged || haveAxesChanged( this ) || hasSizeChanged( this ) ) {
        this.executeRedrawSlaves();
        refreshDrawingZone( this );
        return true;
      }
    }

    this.executeRedrawSlaves( true );
    return false;
  }

  executeRedrawSlaves( noLegend ) {
    this._pluginsExecute( "preDraw" );

  }

  /**
   * Draw the graph and the series. This method will only redraw what is necessary. You may trust its use when you have set new data to series, changed serie styles or called for a zoom on an axis.
   */
  draw( force ) {

    this.updateLegend( true );
    this.drawSeries( this.redraw( true && !force ) );
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
    if ( this.legend ) {
      this.legend.update();
    }
    this.draw();
    if ( this.legend ) {
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
  setWidth( width, skipResize ) {
    this.width = width;
    if ( !skipResize ) {
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
  setHeight( height, skipResize ) {
    this.height = height;
    if ( !skipResize ) {
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
  resize( w, h ) {
    if ( w && h ) {
      this.setSize( w, h );
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
  setSize( w, h ) {
    this.setWidth( w, true );
    this.setHeight( h, true );
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
  getDrawingHeight( useCache ) {
    if ( useCache && this.innerHeight ) {
      return this.innerHeight;
    }
    return ( this.innerHeight = ( this.height - this.options.paddingTop - this.options.paddingBottom ) );
  }

  /**
   * Returns the width of the drawable zone, including the space used by the axes
   * @param {Boolean} useCache - Use cached value. Useful if one is sure the graph hasn't changed dimension. Automatically called after a Graph.resize();
   * @returns {Number} Width of the graph
   */
  getDrawingWidth( useCache ) {
    if ( useCache && this.innerWidth ) {
      return this.innerWidth;
    }
    return ( this.innerWidth = ( this.width - this.options.paddingLeft - this.options.paddingRight ) );
  }

  /**
   * Caches the wrapper offset in the page.<br />
   * The position of the wrapper is used when processing most of mouse events and it is fetched via the jQuery function .offset().
   * If performance becomes a critical issue in your application, <code>cacheOffset()</code> should be used to store the offset position. It should be ensured that the graph doesn't move in the page. If one can know when the graph has moved, <code>cacheOffset()</code> should be called again to update the offset position.
   * @see Graph#uncacheOffset
   */
  cacheOffset() {
    this.offsetCached = util.getOffset( this._dom );
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
  getXAxis( index, options ) {
    if ( this.axis.top.length > 0 && this.axis.bottom.length == 0 ) {
      return this.getTopAxis( index, options );
    }

    return this.getBottomAxis( index, options );
  }

  /**
   * Returns the y axis at a certain index. If any right axis exists and no left axis exists, returns or creates a right axis. Otherwise, creates or returns a left axis
   * Caution ! The <code>options</code> parameter will only be effective if an axis is created
   * @param {Number} [ index=0 ] - The index of the axis
   * @param {Object} [ options={} ] - The options to pass to the axis constructor
   */
  getYAxis( index, options ) {

    if ( this.axis.right.length > 0 && this.axis.left.length == 0 ) {
      return this.getRightAxis( index, options );
    }

    return this.getLeftAxis( index, options );
  }

  /**
   * Returns the top axis at a certain index. Creates it if non-existant
   * @param {Number} [ index=0 ] - The index of the axis
   * @param {Object} [ options={} ] - The options to pass to the axis constructor
   */
  getTopAxis( index, options ) {
    return _getAxis( this, index, options, 'top' );
  }

  /**
   * Returns the bottom axis at a certain index. Creates it if non-existant
   * @param {Number} [ index=0 ] - The index of the axis
   * @param {Object} [ options={} ] - The options to pass to the axis constructor
   */
  getBottomAxis( index, options ) {
    return _getAxis( this, index, options, 'bottom' );
  }

  /**
   * Returns the left axis at a certain index. Creates it if non-existant
   * @param {Number} [ index=0 ] - The index of the axis
   * @param {Object} [ options={} ] - The options to pass to the axis constructor
   */
  getLeftAxis( index, options ) {
    return _getAxis( this, index, options, 'left' );
  }

  /**
   * Returns the right axis at a certain index. Creates it if non-existant
   * @param {Number} [ index=0 ] - The index of the axis
   * @param {Object} [ options={} ] - The options to pass to the axis constructor
   */
  getRightAxis( index, options ) {
    return _getAxis( this, index, options, 'right' );
  }

  /**
   * Sets a bottom axis
   * @param {Axis} axis - The axis instance to set
   * @param {Number} [ index=0 ] - The index of the axis
   */
  setXAxis( axis, index ) {
    this.setBottomAxis( axis, index );
  }

  /**
   * Sets a left axis
   * @param {Axis} axis - The axis instance to set
   * @param {Number} [ index=0 ] - The index of the axis
   */
  setYAxis( axis, index ) {
    this.setLeftAxis( axis, index );
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
  setLeftAxis( axis, index ) {
    index = index || 0;

    if ( this.axis.left[ index ] ) {
      this.axis.left[ index ].kill();
    }
    this.axis.left[ index ] = axis;
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
  setRightAxis( axis, index ) {
    index = index || 0;

    if ( this.axis.right[ index ] ) {
      this.axis.right[ index ].kill();
    }
    this.axis.right[ index ] = axis;
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
  setTopAxis( axis, index ) {
    index = index || 0;

    if ( this.axis.top[ index ] ) {
      this.axis.top[ index ].kill();
    }
    this.axis.top[ index ] = axis;
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
  setBottomAxis( axis, index ) {
    index = index || 0;

    if ( this.axis.bottom[ index ] ) {
      this.axis.bottom[ index ].kill();
    }
    this.axis.bottom[ index ] = axis;
  }

  killAxis( axis, noRedraw = false, noSerieKill = false ) {

    var index;

    if ( axis.isX() ) {

      if ( ( index = this.axis.bottom.indexOf( axis ) ) > -1 ) {
        this.axis.bottom.splice( index, 1 );
      }

      if ( ( index = this.axis.top.indexOf( axis ) ) > -1 ) {
        this.axis.top.splice( index, 1 );
      }

      if ( !noSerieKill ) {
        this.series.map( ( serie ) => {

          if ( serie.getXAxis() == axis ) {
            serie.kill();
          }
        } );
      }
    }

    if ( axis.isY() ) {

      if ( ( index = this.axis.left.indexOf( axis ) ) > -1 ) {
        this.axis.left.splice( index, 1 );
      }

      if ( ( index = this.axis.right.indexOf( axis ) ) > -1 ) {
        this.axis.right.splice( index, 1 );
      }

      if ( !noSerieKill ) {
        this.series.map( ( serie ) => {

          if ( serie.getYAxis() == axis ) {
            serie.kill();
          }
        } );
      }
    }

    this.axisGroup.removeChild( axis.group ); // Removes all DOM
    this.groupPrimaryGrids.removeChild( axis.gridPrimary );
    this.groupSecondaryGrids.removeChild( axis.gridSecondary );

    if ( !noRedraw ) {
      this.draw( true );
    }
  }

  /**
   * Determines if an x axis belongs to the graph
   * @param {Axis} axis - The axis instance to check
   */
  hasXAxis( axis ) {
    return this.hasTopAxis( axis ) ||  this.hasBottomAxis( axis );
  }

  /**
   * Determines if an x axis belongs to the graph
   * @param {Axis} axis - The axis instance to check
   */
  hasYAxis( axis ) {
    return this.hasLeftAxis( axis ) ||  this.hasRightAxis( axis );
  }

  /**
   * Determines if an x axis belongs to top axes list of the graph
   * @param {Axis} axis - The axis instance to check
   */
  hasTopAxis( axis ) {
    return this.hasAxis( axis, this.axis.top );
  }

  /**
   * Determines if an x axis belongs to bottom axes list of the graph
   * @param {Axis} axis - The axis instance to check
   */
  hasBottomAxis( axis ) {
    return this.hasAxis( axis, this.axis.bottom );
  }

  /**
   * Determines if a y axis belongs to left axes list of the graph
   * @param {Axis} axis - The axis instance to check
   */
  hasLeftAxis( axis ) {
    return this.hasAxis( axis, this.axis.left );
  }

  /**
   * Determines if a y axis belongs to right axes list of the graph
   * @param {Axis} axis - The axis instance to check
   */
  hasRightAxis( axis ) {
    return this.hasAxis( axis, this.axis.right );
  }

  /**
   * Determines if an axis belongs to a list of axes
   * @param {Axis} axis - The axis instance to check
   * @param {Array} axisList - The list of axes to check
   * @private
   */
  hasAxis( axis, axisList ) {
    for ( var i = 0, l = axisList.length; i < l; i++ ) {
      if ( axisList[ i ] == axis ) {
        return true;
      }

      if ( axisList[ i ].hasAxis( axis ) ) {
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

    this._applyToAxes( "setMinMaxToFitSeries", null, true, true );

    //this._applyToAxes( "scaleToFitAxis", [ this.getYAxis() ], false, true )
    // X is not always ascending... 
  }

  /**
   * Sets the background color
   * @param {String} color - An SVG accepted color for the background
   * @return {Graph} The current graph instance
   */
  setBackgroundColor( color ) {

    this.rectEvent.setAttribute( 'fill', color );
    return this;
  }
  getAxisState() {

    var state = {};
    for ( var i in this.axis ) {
      state[ i ] = this.axis[ i ].map( function( axis ) {
        return [ axis.getCurrentMin(), axis.getCurrentMax() ];
      } );
    }
    return state;
  }
  setAxisState( state ) {

    var j, l;
    for ( var i in state ) {

      if ( !this.axis[ i ] ) {
        continue;
      }

      for ( j = 0, l = state[ i ].length; j < l; j++ ) {

        if ( !this.axis[ i ][ j ] ) {
          continue;
        }

        this.axis[ i ][ j ].setCurrentMin( state[ i ][ j ][ 0 ] );
        this.axis[ i ][ j ].setCurrentMax( state[ i ][ j ][ 1 ] );
      }
    }

    this.draw();
  }
  saveAxisState( savedName ) {
    this.savedAxisState = this.savedAxisState || {};
    this.savedAxisState[ savedName ] = this.getAxisState();
    return this;
  }
  recallAxisState( stateName ) {
    if ( this.savedAxisState[ savedName ] ) {
      this.recallAxisState( this.savedAxisState[ savedName ] );
    }
    return this;
  }

  _applyToAxis( type ) {

    switch ( type ) {

      case 'string':
        return function( type, func, params ) {
          //    params.splice(1, 0, type);

          for ( var i = 0; i < this.axis[ type ].length; i++ ) {
            this.axis[ type ][ i ][ func ].apply( this.axis[ type ][ i ], params );
          }
        };
        break;

      case 'function':
        return function( type, func, params ) {
          for ( var i = 0; i < this.axis[ type ].length; i++ ) {
            func.call( this, this.axis[ type ][ i ], type, params );
          }
        }
        break;
    }
  }

  /**
   * Calculates the minimal or maximal value of the axis. Currently, alias of getBoudaryAxisFromSeries
   */
  getBoundaryAxis( axis, minmax ) {

    var valSeries = this.getBoundaryAxisFromSeries( axis, minmax );
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
  getBoundaryAxisFromSeries( axis, minmax ) {

    var min = minmax == 'min',
      val,
      func = axis.isX() ? [ 'getMinX', 'getMaxX' ] : [ 'getMinY', 'getMaxY' ],
      func2use = func[ min ? 0 : 1 ],
      infinity2use = min ? +Infinity : -Infinity,
      currentSerie,
      serie,
      series,
      serieValue,
      i,
      l;

    val = min ? Number.MAX_SAFE_INTEGER : Number.MIN_SAFE_INTEGER;
    series = this.getSeriesFromAxis( axis, true );

    for ( i = 0, l = series.length; i < l; i++ ) {

      serie = series[ i ];

      if ( !serie.isShown() ) {
        continue;
      }

      serieValue = serie[ func2use ]();

      val = Math[ minmax ]( isNaN( val ) ? infinity2use : val, isNaN( serieValue ) ? infinity2use : serieValue );
    }

    return val;
  }

  /**
   *  Returns all the series associated to an axis
   *  @param {Axis} axis - The axis to which the series belong
   *  @returns {Serie[]} An array containing the list of series that belong to the axis
   */
  getSeriesFromAxis( axis ) {
    var series = [],
      i = this.series.length - 1;
    for ( ; i >= 0; i-- ) {
      if ( this.series[ i ].getXAxis() == axis || this.series[ i ].getYAxis() == axis ) {
        series.push( this.series[ i ] );
      }
    }

    return series;
  }

  /**
   * Determines the maximum and minimum of each axes, based on {@link Graph#getBoundaryAxis}. It is usually called internally, but if the data of series has changed, called this function to make sure that minimum / maximum of the axes are properly updated.
   * @see Graph#getBoundaryAxis
   */
  updateDataMinMaxAxes() {

    var axisvars = [ 'bottom', 'top', 'left', 'right' ],
      axis,
      j,
      l,
      i,
      xy;

    for ( j = 0, l = axisvars.length; j < l; j++ ) {

      for ( i = this.axis[ axisvars[ j ] ].length - 1; i >= 0; i-- ) {

        axis = this.axis[ axisvars[ j ] ][ i ];
        xy = j < 2 ? 'x' : 'y';

        if ( axis.disabled ) {
          continue;
        }

        //console.log( axisvars[ j ], this.getBoundaryAxisFromSeries( this.axis[ axisvars[ j ] ][ i ], xy, 'min'), this.getBoundaryAxisFromSeries( this.axis[ axisvars[ j ] ][ i ], xy, 'max') );

        axis.setMinValueData( this.getBoundaryAxis( this.axis[ axisvars[ j ] ][ i ], 'min' ) );
        axis.setMaxValueData( this.getBoundaryAxis( this.axis[ axisvars[ j ] ][ i ], 'max' ) );

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
  _applyToAxes( func, params, tb, lr ) {

    var ax = [],
      i = 0,
      l;

    if ( tb || tb == undefined ) {
      ax.push( 'top' );
      ax.push( 'bottom' );
    }
    if ( lr || lr == undefined ) {
      ax.push( 'left' );
      ax.push( 'right' );
    }

    for ( l = ax.length; i < l; i++ ) {
      this._applyToAxis( typeof func ).call( this, ax[ i ], func, params );
    }
  }

  /**
   * Axes can be dependant of one another (for instance for unit conversions)
   * Finds and returns all the axes that are linked to a specific axis. Mostly used internally.
   * @param {Axis} axis - The axis that links one or multiple other dependant axes
   * @returns {Axis[]} The list of axes linked to the axis passed as parameter
   */
  findAxesLinkedTo( axis ) {

    var axes = [];
    this._applyToAxes( function( a ) {

      if ( a.linkedToAxis && a.linkedToAxis.axis == axis ) {
        axes.push( a );
      }
    }, {}, axis instanceof this.getConstructor( "graph.axis.x" ), axis instanceof this.getConstructor( "graph.axis.y" ) );

    return axes;
  }
  _axisHasChanged( axis ) {
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
  newSerie( name, options, type ) {

    if ( !type ) {
      type = Graph.SERIE_LINE;
    }

    var serie;
    if ( serie = this.getSerie( name ) ) {
      return serie;
    }

    if ( !( serie = makeSerie( this, name, options, type ) ) ) {
      return;
    };

    this.series.push( serie );
    //    this.updateLegend();

    this.emit( "newSerie", serie );
    return serie;
  }

  /** 
   * Looks for an existing serie by name or by index and returns it.
   * The index of the serie follows the creation sequence (0 for the first one, 1 for the second one, ...)
   * @param {(String|Number)} name - The name or the index of the serie
   * @returns {Serie}
   */
  getSerie( name ) {

    if ( typeof name == 'number' ) {
      return this.series[ name ] ||  false;
    }
    var i = 0,
      l = this.series.length;

    for ( ; i < l; i++ ) {

      if ( this.series[ i ].getName() == name ) {

        return this.series[ i ];

      }
    }

    return false
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
  drawSerie( serie, force ) {

    if ( !serie.draw ) {
      throw "Serie has no method draw";
    }

    serie.draw( force );
  }

  /**
   * Redraws all visible series
   * @param {Boolean} force - Forces redraw even if no data has changed
   */
  drawSeries( force ) {

    if ( !this.width || !this.height ) {
      return;
    }

    var i = this.series.length - 1;
    for ( ; i >= 0; i-- ) {
      if ( this.series[ i ].isShown() ) {
        this.drawSerie( this.series[ i ], force );
      }
    }
  }

  /**
   * @alias Graph#removeSeries
   */
  resetSeries() {
    this.removeSeries()
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
    while ( this.series[ 0 ] ) {
      this.series[ 0 ].kill( true );
    }
    this.series = [];

    if ( this.legend ) {
      this.legend.update();
    }
  }

  /**
   * Selects a serie. Only one serie per graph can be selected.
   * @param {Serie} serie - The serie to select
   * @param {String} selectName="selected" - The name of the selection
   */
  selectSerie( serie, selectName ) {

    if ( !( typeof serie == "object" ) ) {
      serie = this.getSerie( serie );
    }

    if ( this.selectedSerie == serie && this.selectedSerie.selectionType == selectName ) {
      return;
    }

    if ( this.selectedSerie !== serie ) {
      this.unselectSerie( serie );
    }

    this.selectedSerie = serie;
    this.triggerEvent( 'onSelectSerie', serie );

    serie.select( selectName || "selected" );
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
  unselectSerie( serie ) {
    serie.unselect();
    this.selectedSerie = false;
    this.triggerEvent( 'onUnselectSerie', serie );
  }

  /**
   * Returns all the shapes associated to a serie. Shapes can (but don't have to) be associated to a serie. The position of the shape can then be relative to the same axes as the serie.
   * @param {Serie} serie - The serie containing the shapes
   * @returns {Shape[]} An array containing a list of shapes associated to the serie
   */
  getShapesOfSerie( serie ) {

    var shapes = [];
    var i = this.shapes.length - 1;

    for ( ; i >= 0; i-- ) {

      if ( this.shapes[ i ].getSerie() == serie ) {
        shapes.push( this.shapes[ i ] );
      }
    }

    return shapes;
  }
  makeToolbar( toolbarData ) {

    var constructor = this.getConstructor( "graph.toolbar" );
    if ( constructor ) {
      return this.toolbar = new constructor( this, toolbarData );
    } else {
      return util.throwError( "No constructor exists for toolbar" );
    }
  }

  /**
   *  Returns all shapes from the graph
   */
  getShapes() {
    return this.shapes ||  [];
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
  newShape( shapeType, shapeData, mute, shapeProperties ) {

    var self = this,
      response;

    this.prevent( false );

    if ( !mute ) {

      this.emit( 'beforeNewShape', shapeData );

      if ( this.prevent( false ) ) {
        return false;
      }
    }

    // Backward compatibility
    if ( typeof shapeType == "object" ) {
      mute = shapeData;
      shapeData = shapeType;
      shapeType = shapeData.type;
    }

    shapeData = shapeData || {};
    shapeData._id = util.guid();

    var constructor;
    if ( typeof shapeType == "function" ) {
      constructor = shapeType;
    } else {
      constructor = this.getConstructor( "graph.shape." + shapeType );
    }

    if ( !constructor ) {
      return util.throwError( "No constructor for this shape" );
    }

    var shape = new constructor( this, shapeData );

    if ( !shape ) {
      return util.throwError( "Failed to construct shape." );
    }

    shape.type = shapeType;
    shape.graph = this;
    shape._data = shapeData;

    shape.init( this, shapeProperties );

    if ( shapeData.position ) {

      for ( var i = 0, l = shapeData.position.length; i < l; i++ ) {
        shape.setPosition( new GraphPosition( shapeData.position[ i ] ), i );
      }
    }

    if ( shapeData.properties !== undefined ) {
      shape.setProperties( shapeData.properties );
    }

    /* Setting shape properties */
    if ( shapeData.fillColor !== undefined ) {
      shape.setFillColor( shapeData.fillColor );
    }

    if ( shapeData.fillOpacity !== undefined ) {
      shape.setFillOpacity( shapeData.fillOpacity );
    }

    if ( shapeData.strokeColor !== undefined ) {
      shape.setStrokeColor( shapeData.strokeColor );
    }

    if ( shapeData.strokeWidth !== undefined ) {
      shape.setStrokeWidth( shapeData.strokeWidth );
    }

    if ( shapeData.layer !== undefined ) {
      shape.setLayer( shapeData.layer );
    }

    if ( shapeData.locked == true ) {
      shape.lock();
    }

    if ( shapeData.movable == true ) {
      shape.movable();
    }

    if ( shapeData.selectable == true ) {
      shape.selectable();
    }

    if ( shapeData.resizable == true ) {
      shape.resizable();
    }

    if ( shapeData.attributes !== undefined ) {
      shape.setProp( "attributes", shapeData.attributes );
    }

    if ( shapeData.handles !== undefined ) {
      shape.setProp( 'handles', shapeData.handles );
    }

    if ( shapeData.selectOnMouseDown !== undefined ) {
      shape.setProp( "selectOnMouseDown", true );
    }

    if ( shapeData.selectOnClick !== undefined ) {
      shape.setProp( "selectOnClick", true );
    }

    if ( shapeData.highlightOnMouseOver !== undefined ) {
      shape.setProp( "highlightOnMouseOver", true );
    }

    if ( shapeData.labelEditable ) {
      shape.setProp( "labelEditable", shapeData.labelEditable );
    }

    if ( shapeData.labels && !shapeData.label ) {
      shapeData.label = shapeData.labels;
    }

    if ( shapeData.label !== undefined ) {

      if ( !Array.isArray( shapeData.label ) ) {
        shapeData.label = [  shapeData.label ];
      }

      for ( var i = 0, l = shapeData.label.length; i < l; i++ ) {

        shape.showLabel( i );
        shape.setLabelText( shapeData.label[ i ].text, i );
        shape.setLabelPosition( shapeData.label[ i ].position, i );
        shape.setLabelColor( shapeData.label[ i ].color || 'black', i );
        shape.setLabelSize( shapeData.label[ i ].size, i );
        shape.setLabelAngle( shapeData.label[ i ].angle || 0, i );
        shape.setLabelBaseline( shapeData.label[ i ].baseline || 'no-change', i );
        shape.setLabelAnchor( shapeData.label[ i ].anchor || 'start', i );
      }
    }

    shape.createHandles();

    this.shapes.push( shape );

    if ( !mute ) {
      this.emit( 'newShape', shape, shapeData );
    }

    return shape;
  }

  /**
   * Creates a new position. Arguments are passed to the position constructor
   * @param {...*} var_args
   * @see Position
   */
  newPosition( var_args ) {

    return new GraphPosition( ...arguments );

    // 18 September 2016 Norman: What is that ?
    Array.prototype.unshift.call( arguments, null );
    return new( Function.prototype.bind.apply( GraphPosition, arguments ) );
  }

  /**
   *  Redraws all shapes. To be called if their definitions have changed
   */
  redrawShapes() {

    //this.graphingZone.removeChild(this.shapeZone);
    for ( var i = 0, l = this.shapes.length; i < l; i++ ) {
      this.shapes[ i ].redraw();
    }
    //this.graphingZone.insertBefore(this.shapeZone, this.axisGroup);
  }

  /**
   *  Removes all shapes from the graph
   */
  removeShapes() {
    for ( var i = 0, l = this.shapes.length; i < l; i++ ) {
      if ( this.shapes[ i ] && this.shapes[ i ].kill ) {
        this.shapes[ i ].kill( true );
      }
    }
    this.shapes = [];
  }

  /**
   * Selects a shape
   * @param {Shape} shape - The shape to select
   * @param {Boolean} mute - Select the shape quietly
   */
  selectShape( shape, mute ) {

    // Already selected. Returns false

    if ( !shape ) {
      return;
    }

    if ( this.selectedShapes.indexOf( shape ) > -1 ) {
      return false;
    }

    if ( !shape.isSelectable() ) {
      return false;
    }

    if ( !mute ) {
      this.emit( "beforeShapeSelect", shape );
    }

    if ( this.prevent( false ) ) {
      return;
    }

    if ( this.selectedShapes.length > 0 && this.options.shapesUniqueSelection )  { // Only one selected shape at the time

      this.unselectShapes( mute );
    }

    shape._select( mute );
    this.selectedShapes.push( shape );

    if ( !mute ) {
      this.emit( "shapeSelect", shape );
    }
  }

  /**
   * Unselects a shape
   * @param {Shape} shape - The shape to unselect
   * @param {Boolean} mute - Unselect the shape quietly
   */
  unselectShape( shape, mute ) {

    if ( this.selectedShapes.indexOf( shape ) == -1 ) {
      return;
    }

    if ( !mute ) {
      this.emit( "beforeShapeUnselect", shape );
    }

    if ( this.cancelUnselectShape ) {
      this.cancelUnselectShape = false;
      return;
    }

    shape._unselect();

    this.selectedShapes.splice( this.selectedShapes.indexOf( shape ), 1 );

    if ( !mute ) {
      this.emit( "shapeUnselect", shape );
    }

  }

  /**
   * Unselects all shapes
   * @param {Boolean} [ mute = false ] - Mutes all unselection events
   * @return {Graph} The current graph instance
   */
  unselectShapes( mute ) {

    while ( this.selectedShapes[ 0 ] ) {
      this.unselectShape( this.selectedShapes[  0 ], mute );
    }

    return this;
  }
  _removeShape( shape ) {
    this.shapes.splice( this.shapes.indexOf( shape ), 1 );
  }
  appendShapeToDom( shape ) {
    this.getLayer( shape.getLayer(), 'shape' ).appendChild( shape.group );
  }
  removeShapeFromDom( shape ) {
    this.getLayer( shape.getLayer(), 'shape' ).removeChild( shape.group );
  }
  appendSerieToDom( serie ) {
    this.getLayer( serie.getLayer(), 'serie' ).appendChild( serie.groupMain );
  }
  removeSerieFromDom( serie ) {
    this.getLayer( serie.getLayer(), 'serie' ).removeChild( serie.groupMain );
  }
  getLayer( layer, mode ) {

    if ( !this.layers[ layer ] ) {

      this.layers[ layer ] = [];

      this.layers[ layer ][ 0 ] = document.createElementNS( this.ns, 'g' );
      this.layers[ layer ][ 0 ].setAttribute( 'data-layer', layer );
      this.layers[ layer ][ 1 ] = document.createElementNS( this.ns, 'g' );
      this.layers[ layer ][ 2 ] = document.createElementNS( this.ns, 'g' );

      this.layers[ layer ][ 0 ].appendChild( this.layers[ layer ][ 1 ] );
      this.layers[ layer ][ 0 ].appendChild( this.layers[ layer ][ 2 ] );

      var i = 1,
        prevLayer;

      while ( !( prevLayer = this.layers[ layer - i ] ) && layer - i >= 0 ) {
        i++;
      }

      if ( !prevLayer ) {

        this.plotGroup.insertBefore( this.layers[ layer ][ 0 ], this.plotGroup.firstChild );

      } else if ( prevLayer.nextSibling ) {

        this.plotGroup.insertBefore( this.layers[ layer ][ 0 ], prevLayer.nextSibling );

      } else {

        this.plotGroup.appendChild( this.layers[ layer ][ 0 ] );

      }
    }

    return this.layers[ layer ][ mode == 'shape' ? 2 : 1 ];

  }
  focus()  {
    this._dom.focus();
  }
  elementMoving( movingElement ) {
    this.bypassHandleMouse = movingElement;
  }
  stopElementMoving( element ) {

    if ( element && element == this.bypassHandleMouse ) {
      this.bypassHandleMouse = false;
    } else if ( !element ) {
      this.bypassHandleMouse = false;
    }
  }
  _makeClosingLines() {

    this.closingLines = {};
    var els = [ 'top', 'bottom', 'left', 'right' ],
      i = 0,
      l = 4;
    for ( ; i < l; i++ ) {
      var line = document.createElementNS( this.ns, 'line' );
      line.setAttribute( 'stroke', 'black' );
      line.setAttribute( 'shape-rendering', 'crispEdges' );
      line.setAttribute( 'stroke-linecap', 'square' );
      line.setAttribute( 'display', 'none' );
      this.closingLines[ els[ i ] ] = line;
      this.graphingZone.appendChild( line );
    }
  }
  isMouseActionAllowed( e, action ) {

    if ( action.type !== e.type &&  ( action.type !== undefined || e.type !== "mousedown" ) && !( ( e.type === 'wheel' || e.type === 'mousewheel' ) && action.type == 'mousewheel' ) ) {
      return;
    }

    if ( action.shift === undefined ) {
      action.shift = false;
    }

    if ( action.ctrl === undefined ) {
      action.ctrl = false;
    }

    if ( action.meta === undefined ) {
      action.meta = false;
    }

    if ( action.alt === undefined ) {
      action.alt = false;
    }

    return ( e.shiftKey == action.shift && e.ctrlKey == action.ctrl && e.metaKey == action.meta && e.altKey == action.alt );
  }
  forcePlugin( plugin ) {
    this.forcedPlugin = plugin;
  }
  unforcePlugin() {
    this.forcedPlugin = false;
  }
  _pluginsExecute( funcName, args ) {

    //			Array.prototype.splice.apply(args, [0, 0, this]);

    for ( var i in this.plugins ) {

      if ( this.plugins[ i ] && this.plugins[ i ][ funcName ] ) {

        this.plugins[ i ][ funcName ].apply( this.plugins[ i ], args );

      }
    }
  }
  _pluginExecute( which, func, args ) {

    //Array.prototype.splice.apply( args, [ 0, 0, this ] );
    if ( !which ) {
      return;
    }

    if ( this.plugins[ which ] && this.plugins[ which ][ func ] ) {

      this.plugins[ which ][ func ].apply( this.plugins[ which ], args );
    }
  }

  pluginYieldActiveState() {
    this.activePlugin = false;
  }

  _serieExecute( which, func, args ) {

    if ( typeof serie !== 'object' ) {
      serie = this.getSerie( serie );
    }

    if ( typeof serie[ func ] == 'function' ) {
      serie.apply( serie, args );
    }
  }
  _pluginsInit() {

    var constructor, pluginName, pluginOptions;

    for ( var i in this.options.plugins ) {

      pluginName = i;
      pluginOptions = this.options.plugins[ i ];

      constructor = this.getConstructor( "graph.plugin." + pluginName );

      if ( constructor ) {

        var options = util.extend( true, {}, constructor.defaults(), pluginOptions );
        this.plugins[ pluginName ] = new constructor( options );

        util.mapEventEmission( this.plugins[ pluginName ].options, this.plugins[  pluginName ] );
        this.plugins[ pluginName ].init( this, pluginOptions );

      } else {
        util.throwError( "Plugin \"" + pluginName + "\" has not been registered" );
      }
    }
  }

  /**
   * Returns an initialized plugin
   * @param {String} pluginName
   * @returns {Plugin} The plugin which name is <pluginName>
   */
  getPlugin( pluginName ) {
    var plugin = this.plugins[ pluginName ];

    if ( !plugin ) {
      return util.throwError( "Plugin \"" + pluginName + "\" has not been loaded or properly registered" );
    }

    return plugin;
  }
  triggerEvent() {
    var func = arguments[ 0 ],
      args = Array.prototype.splice.apply( arguments, [ 0, 1 ] );

    if ( typeof this.options[ func ] == "function" ) {
      return this.options[ func ].apply( this, arguments );
    }

    return;
  }

  /**
   * Creates a legend. Only one legend is allowed per graph
   * @param {Object} options - The legend options
   */
  makeLegend( options ) {

    if ( this.legend ) {
      return this.legend;
    }

    var constructor = this.getConstructor( "graph.legend" );
    if ( constructor ) {
      this.legend = new constructor( this, options );
    } else {
      return util.throwError( "Graph legend is not available as it has not been registered" );
    }

    //    this.legend.update();

    return this.legend;
  }

  /**
   * Redraws the legend if it exists
   * @param {Boolean} [ onlyIfRequired = false ] ```true``` to redraw the legend only when it actually needs to be updated
   * @return {Graph} The graph instance
   */
  updateLegend( onlyIfRequired = false ) {

    if ( !this.legend ) {
      return;
    }

    this.legend.update( onlyIfRequired );
    return this;
  }

  /**
   * @returns {Legend} The legend item
   */
  getLegend() {
    if ( !this.legend ) {
      return;
    }

    return this.legend;

  }

  requireLegendUpdate() {

    if ( !this.legend ) {
      return;
    }

    this.legend.requireDelayedUpdate();
  }

  /**
   * Kills the graph
   **/
  kill() {
    this._dom.removeChild( this.dom );
  }
  _removeSerie( serie ) {
    this.series.splice( this.series.indexOf( serie ), 1 );
  }
  contextListen( target, menuElements, callback ) {

    var self = this;

    if ( this.options.onContextMenuListen ) {
      return this.options.onContextMenuListen( target, menuElements, callback );
    }
  }
  lockShapes() {
    this.shapesLocked = true;

    // Removes the current actions of the shapes
    for ( var i = 0, l = this.shapes.length; i < l; i++ ) {
      this.shapes[ i ].moving = false;
      this.shapes[ i ].resizing = false;
    }
  }
  unlockShapes() {
    //		console.log('unlock');
    this.shapesLocked = false;
  }
  prevent( arg ) {
    var curr = this.prevented;
    if ( arg != -1 ) {
      this.prevented = ( arg == undefined ) || arg;
    }
    return curr;
  }
  _getXY( e ) {

    var x = e.pageX,
      y = e.pageY;

    var pos = this.offsetCached || util.getOffset( this._dom );

    x -= pos.left /* - window.scrollX*/ ;
    y -= pos.top /* - window.scrollY*/ ;

    return {
      x: x,
      y: y
    };
  }
  _resize() {

    if ( !this.width || !this.height ) {
      return;
    }

    this.getDrawingWidth();
    this.getDrawingHeight();

    this.sizeSet = true;
    this.dom.setAttribute( 'width', this.width );
    this.dom.setAttribute( 'height', this.height );
    this.domTitle.setAttribute( 'x', this.width / 2 );

    this.requireLegendUpdate();

    this.draw( true );
  }
  _doDom() {

    // Create SVG element, set the NS
    this.dom = document.createElementNS( this.ns, 'svg' );
    this.dom.setAttributeNS( "http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink" );
    //this.dom.setAttributeNS(this.ns, 'xmlns:xlink', this.nsxml);  
    util.setAttributeTo( this.dom, {
      'xmlns': this.ns,
      'font-family': this.options.fontFamily,
      'font-size': this.options.fontSize
    } );

    this._dom.appendChild( this.dom );

    this._dom.setAttribute( 'tabindex', 1 );

    this._dom.style.outline = "none";

    this.defs = document.createElementNS( this.ns, 'defs' );
    this.dom.appendChild( this.defs );

    this.groupEvent = document.createElementNS( this.ns, 'g' );

    this.rectEvent = document.createElementNS( this.ns, 'rect' );
    util.setAttributeTo( this.rectEvent, {
      'pointer-events': 'fill',
      'fill': 'transparent'
    } );
    this.groupEvent.appendChild( this.rectEvent );

    this.dom.appendChild( this.groupEvent );

    // Handling graph title
    this.domTitle = document.createElementNS( this.ns, 'text' );
    this.setTitle( this.options.title );
    util.setAttributeTo( this.domTitle, {
      'text-anchor': 'middle',
      'y': 20
    } );
    this.groupEvent.appendChild( this.domTitle );
    //

    this.graphingZone = document.createElementNS( this.ns, 'g' );
    this.updateGraphingZone();

    this.groupEvent.appendChild( this.graphingZone );

    /*  this.shapeZoneRect = document.createElementNS(this.ns, 'rect');
    //this.shapeZoneRect.setAttribute('pointer-events', 'fill');
    this.shapeZoneRect.setAttribute('fill', 'transparent');
    this.shapeZone.appendChild(this.shapeZoneRect);
  */
    this.axisGroup = document.createElementNS( this.ns, 'g' );
    this.graphingZone.appendChild( this.axisGroup );

    this.groupGrids = document.createElementNS( this.ns, 'g' );
    this.groupGrids.setAttribute( 'clip-path', 'url(#_clipplot' + this._creation + ')' );

    this.groupPrimaryGrids = document.createElementNS( this.ns, 'g' );
    this.groupSecondaryGrids = document.createElementNS( this.ns, 'g' );

    this.axisGroup.appendChild( this.groupGrids );

    this.groupGrids.appendChild( this.groupSecondaryGrids );
    this.groupGrids.appendChild( this.groupPrimaryGrids );

    this.plotGroup = document.createElementNS( this.ns, 'g' );
    this.graphingZone.appendChild( this.plotGroup );

    // 5 September 2014. I encountered a case here shapeZone must be above plotGroup
    /*this.shapeZone = document.createElementNS( this.ns, 'g' );
    this.graphingZone.appendChild( this.shapeZone );
*/

    this.layers = [];

    this._makeClosingLines();

    this.clip = document.createElementNS( this.ns, 'clipPath' );
    this.clip.setAttribute( 'id', '_clipplot' + this._creation );
    this.defs.appendChild( this.clip );

    this.clipRect = document.createElementNS( this.ns, 'rect' );
    this.clip.appendChild( this.clipRect );
    this.clip.setAttribute( 'clipPathUnits', 'userSpaceOnUse' );

    this.markerArrow = document.createElementNS( this.ns, 'marker' );
    this.markerArrow.setAttribute( 'viewBox', '0 0 10 10' );
    this.markerArrow.setAttribute( 'id', 'arrow' + this._creation );
    this.markerArrow.setAttribute( 'refX', '6' );
    this.markerArrow.setAttribute( 'refY', '5' );
    this.markerArrow.setAttribute( 'markerUnits', 'strokeWidth' );
    this.markerArrow.setAttribute( 'markerWidth', '8' );
    this.markerArrow.setAttribute( 'markerHeight', '6' );
    this.markerArrow.setAttribute( 'orient', 'auto' );
    //this.markerArrow.setAttribute('fill', 'context-stroke');
    //this.markerArrow.setAttribute('stroke', 'context-stroke');

    var pathArrow = document.createElementNS( this.ns, 'path' );
    pathArrow.setAttribute( 'd', 'M 0 0 L 10 5 L 0 10 z' );
    //pathArrow.setAttribute( 'fill', 'context-stroke' );
    this.markerArrow.appendChild( pathArrow );

    this.defs.appendChild( this.markerArrow );

    // Horionzal split marker for axis 
    this.markerHorizontalSplit = document.createElementNS( this.ns, 'marker' );
    this.markerHorizontalSplit.setAttribute( 'viewBox', '0 0 6 8' );
    this.markerHorizontalSplit.setAttribute( 'id', 'horionzalsplit_' + this.getId() );
    this.markerHorizontalSplit.setAttribute( 'refX', '3' );
    this.markerHorizontalSplit.setAttribute( 'refY', '4' );
    this.markerHorizontalSplit.setAttribute( 'markerUnits', 'strokeWidth' );
    this.markerHorizontalSplit.setAttribute( 'markerWidth', '6' );
    this.markerHorizontalSplit.setAttribute( 'markerHeight', '8' );

    var path = document.createElementNS( this.ns, 'line' );
    path.setAttribute( 'x1', '0' );
    path.setAttribute( 'y1', '8' );

    path.setAttribute( 'x2', '6' );
    path.setAttribute( 'y2', '0' );

    path.setAttribute( 'stroke', 'black' );
    this.markerHorizontalSplit.appendChild( path );

    this.defs.appendChild( this.markerHorizontalSplit );

    // Vertical split marker for axis 
    this.markerVerticalSplit = document.createElementNS( this.ns, 'marker' );
    this.markerVerticalSplit.setAttribute( 'viewBox', '0 0 8 6' );
    this.markerVerticalSplit.setAttribute( 'id', 'verticalsplit_' + this.getId() );
    this.markerVerticalSplit.setAttribute( 'refX', '4' );
    this.markerVerticalSplit.setAttribute( 'refY', '3' );
    this.markerVerticalSplit.setAttribute( 'markerUnits', 'strokeWidth' );
    this.markerVerticalSplit.setAttribute( 'markerWidth', '8' );
    this.markerVerticalSplit.setAttribute( 'markerHeight', '6' );

    var path = document.createElementNS( this.ns, 'line' );

    path.setAttribute( 'x1', '0' );
    path.setAttribute( 'y1', '0' );

    path.setAttribute( 'x2', '8' );
    path.setAttribute( 'y2', '6' );

    path.setAttribute( 'stroke', 'black' );
    this.markerVerticalSplit.appendChild( path );
    this.defs.appendChild( this.markerVerticalSplit );

    this.vertLineArrow = document.createElementNS( this.ns, 'marker' );
    this.vertLineArrow.setAttribute( 'viewBox', '0 0 10 10' );
    this.vertLineArrow.setAttribute( 'id', 'verticalline' + this._creation );
    this.vertLineArrow.setAttribute( 'refX', '0' );
    this.vertLineArrow.setAttribute( 'refY', '5' );
    this.vertLineArrow.setAttribute( 'markerUnits', 'strokeWidth' );
    this.vertLineArrow.setAttribute( 'markerWidth', '20' );
    this.vertLineArrow.setAttribute( 'markerHeight', '10' );
    this.vertLineArrow.setAttribute( 'orient', 'auto' );
    //this.vertLineArrow.setAttribute('fill', 'context-stroke');
    //this.vertLineArrow.setAttribute('stroke', 'context-stroke');
    this.vertLineArrow.setAttribute( 'stroke-width', '1px' );

    var pathVertLine = document.createElementNS( this.ns, 'path' );
    pathVertLine.setAttribute( 'd', 'M 0 -10 L 0 10' );
    pathVertLine.setAttribute( 'stroke', 'black' );

    this.vertLineArrow.appendChild( pathVertLine );

    this.defs.appendChild( this.vertLineArrow );

    this.plotGroup.setAttribute( 'clip-path', 'url(#_clipplot' + this._creation + ')' );

    this.bypassHandleMouse = false;
  }

  updateGraphingZone() {
    util.setAttributeTo( this.graphingZone, {
      'transform': 'translate(' + this.options.paddingLeft + ', ' + this.options.paddingTop + ')'
    } );

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

  trackingLine( options ) {

    var self = this;

    if ( options ) {
      this.options.trackingLine = options;
    }

    // Individual tracking
    if ( options.mode == "individual" ) {

      if ( options.series ) {
        options.series.map( function( sOptions ) {

          if ( typeof sOptions.serie !== "object" ) {
            sOptions.serie = this.getSerie( sOptions.serie );
          }

          self.addSerieToTrackingLine( sOptions.serie, sOptions );

        } );
      }
    } else {
      options.series.map( function( serie ) {
        serie.serie.disableTracking();
      } );
    }

    this.trackingLine = this.newShape( 'line', util.extend( true, { 
      position: [ {
        y: 'min'
      }, {
        y: 'max'
      } ],
      stroke: 'black',
      layer: -1
    }, options.trackingLineShapeOptions ) );
    this.trackingLine.draw();

    return this.trackingLine;

  }
  addSerieToTrackingLine( serie, options ) {

    var self = this;

    if ( !this.options.trackingLine ) {
      this.trackingLine( {
        mode: 'individual'
      } );
    }

    serie.enableTracking( function( serie, index, x, y ) {

      if ( index ) {

        self.trackingLine.show();
        var closestIndex = index.xIndexClosest;
        self.trackingLine.getPosition( 0 ).x = serie.getData()[ 0 ][ index.closestIndex * 2 ];
        self.trackingLine.getPosition( 1 ).x = serie.getData()[ 0 ][ index.closestIndex * 2 ];
        self.trackingLine.redraw();

        serie._trackingLegend = _trackingLegendSerie( self, {
          serie: serie
        }, x, y, serie._trackingLegend, options.textMethod ? options.textMethod : function( output ) {

          for ( var i in output ) {

            return output[ i ].serie.serie.getName() + ": " + output[ i ].serie.serie.getYAxis().valueToHtml( output[ i ].yValue )
            break;
          }

        }, self.trackingLine.getPosition( 0 ).x );

        serie._trackingLegend.style.display = "block";
      }
    }, function( serie ) {
      self.trackingLine.hide();

      if ( serie.trackingShape ) {
        serie.trackingShape.hide();
      }

      if ( serie._trackingLegend ) {
        serie._trackingLegend.style.display = "none";
      }

      serie._trackingLegend = _trackingLegendSerie( self, {
        serie: serie
      }, false, false, serie._trackingLegend, false, false );

    } );

  }

  /**
   * Returns a graph created from a schema
   * @param {Object} schema - The schema (see https://github.com/cheminfo/json-chart/blob/master/chart-schema.json)
   * @param {HTMLElement} wrapper - The wrapping element
   * @returns {Graph} Newly created graph
   */
  static fromSchema( schema, wrapper ) {

    var graph;
    var options = {};
    var axes = {
      left: [],
      top: [],
      right: [],
      bottom: []
    };
    var axesIndices = [];

    if ( schema.title ) {
      options.title = schema.title;
    }

    if ( schema.axis ) {

      schema.axis.map( function( schemaAxis ) {

        if ( !schemaAxis.type ) {
          util.throwError( "Axis type is required (top, bottom, left or right)" );
        }

        var axisOptions = {};
        if ( schemaAxis.label ) {
          axisOptions.labelValue = schemaAxis.label;
        }

        if ( schemaAxis.unit !== undefined ) {
          axisOptions.unit = schemaAxis.unit;
        }

        if ( schemaAxis.unitWrapperAfter !== undefined ) {
          axisOptions.unitWrapperAfter = schemaAxis.unitWrapperAfter;
        }

        if ( schemaAxis.unitWrapperBefore !== undefined ) {
          axisOptions.unitWrapperBefore = schemaAxis.unitWrapperBefore;
        }

        if ( schemaAxis.min !== undefined ) {
          axisOptions.forcedMin = schemaAxis.min;
        }

        if ( schemaAxis.max !== undefined ) {
          axisOptions.forcedMax = schemaAxis.max;
        }

        if ( schemaAxis.flip !== undefined ) {
          axisOptions.flipped = schemaAxis.flip;
        }

        axes[ schemaAxis.type ].push( axisOptions );
        schemaAxis._jsGraphIndex = axes[ schemaAxis.type ].length - 1;

      } );
    }

    graph = new Graph( wrapper, options, axes );

    if ( schema.width ) {
      graph.setWidth( schema.width );
    }

    if ( schema.height ) {
      graph.setHeight( schema.width );
    }

    graph._resize();

    if ( schema.data ) {

      schema.data.map( function( schemaSerie ) {

        var serieType = schemaSerie.type,
          serie,
          serieOptions = {},
          serieAxis;

        switch ( schemaSerie.type ) {

          case 'bar':
            util.throwError( "Bar charts not supported" );
            serieType = false;
            break;

          case 'scatter':
            serieType = Graph.SERIE_SCATTER;
            break;

          case 'box':
            serieType = Graph.SERIE_BOX;

            if ( schemaSerie.orientation == 'x' ||  schemaSerie.orientation == 'y' ) {
              serieOptions.orientation = schemaSerie.orientation;
            }
            break;

          default:
            serieType = Graph.SERIE_LINE;
            break;
        }

        if ( !serieType ) {
          util.throwError( "No valid serie type was found" );
          return;
        }

        serie = graph.newSerie( schemaSerie.id || schemaSerie.label || util.guid(), serieOptions, serieType );

        if ( schemaSerie.lineStyle ) {

          schemaSerie.lineStyle.map( function( style ) {

            var styleSerie = {};
            style.styleName = style.styleName || "unselected";

            switch ( serieType ) {

              case Graph.SERIE_LINE:
                if ( style.lineWidth !== undefined ) {
                  styleSerie.lineWidth = style.lineWidth;
                }

                if ( style.color !== undefined ) {
                  styleSerie.lineColor = style.color;
                }

                if ( style.lineStyle ) {
                  styleSerie.lineStyle = style.lineStyle;
                }

                serie.setStyle( styleSerie, style.styleName );
                break;
            }

          } );
        }

        if ( schemaSerie.style ) {

          schemaSerie.style.map( function( style ) {

            var styleSerie = {};
            style.styleName = style.styleName || "unselected";

            if ( !Array.isArray( style.styles ) ) {
              style.styles = [ style.styles ];
            }

            var styles = style.styles.map( function( style ) {

              switch ( serieType ) {

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
            } );

            switch ( serieType ) {

              case Graph.SERIE_LINE:

                serie.setMarkers( styles, style.styleName );
                break;

              case Graph.SERIE_SCATTER:

                serie.setStyle( styles, {}, style.styleName );
                break;

              case Graph.SERIE_BOX:

                serie.setStyle( styles[ 0 ], style.stylename );
                break;
            }

          } );
        }

        if ( schemaSerie.errorX ||  schemaSerie.errorY ) {
          var errors = [];
          if ( schemaSerie.errorX ) {

            for ( var i = 0, l = schemaSerie.errorX.length; i < l; i++ ) {

              errors[ i ] = errors[ i ] || [
                [],
                []
              ];

              errors[ i ][ 0 ][ 0 ] = schemaSerie.errorX[ i ];
            }
          }

          if ( schemaSerie.errorY ) {

            for ( var i = 0, l = schemaSerie.errorY.length; i < l; i++ ) {

              errors[ i ] = errors[ i ] || [
                []
              ];
              errors[ i ][ 1 ][ 0 ] = schemaSerie.errorY[ i ];
            }
          }

          serie.setDataError( errors ) // Adds the error data
            .setErrorStyle( [ {
              type: 'bar',
              x: {},
              y: {}
            } ] ); // Display bar errors
        }

        if ( schema.axis ) {
          serieAxis = schema.axis[ schemaSerie.xAxis ];

          if ( !serieAxis || (  serieAxis.type !== 'top' && serieAxis.type !== 'bottom' ) ) {
            util.warn( "No x axis found. Setting automatically" );
            serie.setXAxis( graph.getXAxis( 0 ) );
          } else {
            if ( serieAxis.type == 'top' ) {
              serie.setXAxis( graph.getTopAxis( serieAxis._jsGraphIndex ) );
            } else if ( serieAxis.type == 'bottom' ) {
              serie.setXAxis( graph.getBottomAxis( serieAxis._jsGraphIndex ) );
            }
          }

          serieAxis = schema.axis[ schemaSerie.yAxis ];

          if ( !serieAxis || (  serieAxis.type !== 'left' && serieAxis.type !== 'right' ) ) {
            util.warn( "No y axis found. Setting automatically" );
            serie.setYAxis( graph.getYAxis( 0 ) );
          } else {
            if ( serieAxis.type == 'left' ) {
              serie.setYAxis( graph.getLeftAxis( serieAxis._jsGraphIndex ) );
            } else if ( serieAxis.type == 'right' ) {
              serie.setYAxis( graph.getRightAxis( serieAxis._jsGraphIndex ) );
            }
          }

        } else {
          util.warn( "No axes found. Setting automatically" );
          serie.autoAxis();
        }

        switch ( serieType ) {

          case Graph.SERIE_BOX:
            serie.setData( schemaSerie.boxes );

            break;

          default:
          case Graph.SERIE_SCATTER:
          case Graph.SERIE_LINE:

            serie.setData( [ {
              x: schemaSerie.x,
              y: schemaSerie.y
            } ] );

            break;
        }
      } );

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

    let axesPositions = [ 'top', 'bottom', 'left', 'right' ];
    let axesExport = [];
    let allaxes = {
      x: [],
      y: []
    };

    axesPositions.map( ( axisPosition ) => {

      if ( !this.axis[ axisPosition ] ) {
        return;
      }

      axesExport = axesExport.concat( this.axis[ axisPosition ].map( ( axis ) => {
        return {

          type: axisPosition,
          label: axis.options.label,
          unit: axis.options.unit,
          min: axis.options.forcedMin,
          max: axis.options.forcedMax,
          flip: axis.options.flipped

        }
      } ) );

      if ( axisPosition == 'top' || axisPosition == 'bottom' ) {
        allaxes.x = allaxes.x.concat( this.axis[ axisPosition ] );
      } else {
        allaxes.y = allaxes.y.concat( this.axis[ axisPosition ] );
      }
    } );

    schema.axis = axesExport;

    let seriesExport = [];

    let toType = ( type ) => {
      switch ( type ) {

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
    }

    let exportData = ( serie, x ) => {

      let data = [];

      switch ( serie.getType() ) {

        case Graph.SERIE_LINE:

          for ( var i = 0; i < serie.data.length; i++ ) {

            for ( var j = 0; j < serie.data[ i ].length - 1; j += 2 ) {

              data.push( serie.data[ i ][ j + ( ( x && serie.isFlipped() ||  !x && !serie.isFlipped() ) ? 1 : 0 ) ] );
            }
          }
          break;

        case Graph.SERIE_SCATTER:

          for ( var j = 0; j < serie.data.length - 1; j += 2 ) {

            data.push( serie.data[ i + ( ( x && serie.isFlipped() ||  !x && !serie.isFlipped() ) ? 1 : 0 ) ] );
          }

          break;
      }

      return data;
    }

    schema.data = seriesExport.concat( this.series.map( ( serie ) => {

      let style = [];
      let linestyle = [];

      if ( serie.getType() == Graph.SERIE_LINE ) {

        for ( var stylename in serie.styles ) {
          linestyle.push( {
            styleName: stylename,
            color: serie.styles[ stylename ].lineColor,
            lineWidth: serie.styles[ stylename ].lineWidth,
            lineStyle: serie.styles[ stylename ].lineStyle,
          } );

          let styleObj = {
            styleName: stylename,
            styles: []
          };
          style.push( styleObj );

          styleObj.styles = styleObj.styles.concat( ( serie.styles[ stylename ].markers || [] ).map( ( markers ) => {
            return {
              shape: markers.type,
              zoom: markers.zoom,
              lineWidth: markers.strokeWidth,
              lineColor: markers.strokeColor,
              color: markers.fillColor,
              points: markers.points
            }
          } ) );

        }
      }

      return {
        label: serie.getLabel(),
        id: serie.getName(),
        type: toType( serie.getType() ),
        x: exportData( serie, true ),
        y: exportData( serie, false ),
        xAxis: allaxes.x.indexOf( serie.getXAxis() ),
        yAxis: allaxes.y.indexOf( serie.getYAxis() ),
        style: style,
        lineStyle: linestyle
      }
    } ) );

    return schema;
  }

  /**
   * Registers a constructor to jsGraph. Constructors are used on a later basis by jsGraph to create series, shapes or plugins
   * @param {String} constructorName - The name of the constructor
   * @param {Function} constructor - The constructor method
   * @see Graph.getConstructor
   * @static
   */
  static registerConstructor( constructorName, constructor ) {

    if ( _constructors.has( constructorName ) ) {
      return util.throwError( "Constructor " + constructor + " already exists." );
    }

    _constructors.set( constructorName, constructor );
  }

  /**
   * Returns a registered constructor
   * @param {String} constructorName - The constructor name to look for
   * @returns {Function} The registered constructor
   * @throws Error
   * @see Graph.registerConstructor
   * @static
   */
  static getConstructor( constructorName, softFail ) {

    if ( !_constructors.has( constructorName ) ) {

      if ( softFail ) {
        return false;
      }

      return util.throwError( "Constructor \"" + constructorName + "\" doesn't exist" );
    }

    return _constructors.get( constructorName );
  }

}

// Adds getConstructor to the prototype. Cannot do that in ES6 classes
Graph.prototype.getConstructor = Graph.getConstructor;

function makeSerie( graph, name, options, type ) {

  var constructor = graph.getConstructor( type, true );
  if ( !constructor && typeof type == "string" ) {
    constructor = graph.getConstructor( "graph.serie." + type, true );
  }
  if ( constructor ) {

    var serie = new constructor();
    serie.init( graph, name, options );
    graph.appendSerieToDom( serie );

  } else {

    return util.throwError( "No constructor exists for the serie type provided. Use Graph.registerConstructor( name, constructor ); first is you use your own series" );

  }

  return serie;
};

function getAxisLevelFromSpan( span, level ) {

  for ( var i = 0, l = level.length; i < l; i++ ) {

    var possible = true;
    for ( var k = 0, m = level[ i ].length; k < m; k++ ) {

      if ( !( ( span[ 0 ] < level[ i ][ k ][ 0 ] && span[ 1 ] < level[ i ][ k ][ 0 ] ) || ( ( span[ 0 ] > level[ i ][ k ][ 1 ] && span[ 1 ] > level[ i ][ k ][ 1 ] ) ) ) ) {
        possible = false;
      }
    }

    if ( possible ) {

      level[ i ].push( span );
      return i;
    }
  }

  level.push( [ span ] );
  return ( level.length - 1 );
}

function refreshDrawingZone( graph ) {

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
  graph._applyToAxes( function( axis, position ) {
    if ( axis.disabled ||  axis.floating ) {
      return;
    }

    var level = getAxisLevelFromSpan( axis.getSpan(), levels[ position ] );
    axis.setLevel( level );

    shift[ position ][ level ] = Math.max( axis.getAxisPosition(), ( shift[ position ][ level ] || 0 ) );

  }, false, true, false );

  var shiftTop = shift.top.reduce( function( prev, curr ) {
    return prev + curr;
  }, 0 );

  var shiftBottom = shift.bottom.reduce( function( prev, curr ) {
    return prev + curr;
  }, 0 );

  [ shift.top, shift.bottom ].map( function( arr ) {
    arr.reduce( function( prev, current, index ) {
      arr[ index ] = prev + current;
      return prev + current;
    }, 0 );
  } );

  // Apply to top and bottom
  graph._applyToAxes( function( axis, position ) {

    if ( axis.disabled ||  axis.floating ) {
      return;
    }

    axis.setShift( shift[ position ][ axis.getLevel() ] );

  }, false, true, false );

  // Applied to left and right
  graph._applyToAxes( function( axis, position ) {

    if ( axis.disabled ) {
      return;
    }

    axis.setMinPx( shiftTop );
    axis.setMaxPx( graph.getDrawingHeight( true ) - shiftBottom );

    if ( axis.floating ) {
      return;
    }

    // First we need to draw it in order to determine the width to allocate
    // graph is done to accomodate 0 and 100000 without overlapping any element in the DOM (label, ...)

    // Let's not draw dependant axes yet
    let drawn = ( !axis.linkedToAxis ) ? axis.draw() : 0;

    // Get axis position gives the extra shift that is common
    var level = getAxisLevelFromSpan( axis.getSpan(), levels[ position ] );
    axis.setLevel( level );
    shift[ position ][ level ] = Math.max( drawn, shift[ position ][ level ] || 0 );

  }, false, false, true );

  var shift2 = util.extend( true, {}, shift );

  // Applied to left and right
  graph._applyToAxes( function( axis, position ) {

    if ( axis.disabled ) {
      return;
    }

    if ( axis.floating ) {
      return;
    }

    shift2[ position ][ axis.getLevel() ] = Math.max( shift[ position ][ axis.getLevel() ], axis.equalizePosition( shift[ position ][ axis.getLevel() ] ) );

  }, false, false, true );

  shift = shift2;

  var shiftLeft = shift.left.reduce( function( prev, curr ) {
    return prev + curr;
  }, 0 );

  var shiftRight = shift.right.reduce( function( prev, curr ) {
    return prev + curr;
  }, 0 );

  [ shift.left, shift.right ].map( function( arr ) {
    arr.reduce( function( prev, current, index ) {
      arr[ index ] = prev + current;
      return prev + current;
    }, 0 );
  } );

  // Apply to left and right
  graph._applyToAxes( ( axis, position ) => {

    if ( axis.disabled ||  axis.floating ) {
      return;
    }
    axis.setShift( shift[ position ][ axis.getLevel() ] );

  }, false, false, true );

  // Apply to top and bottom
  graph._applyToAxes( function( axis, position ) {

    if ( axis.disabled ) {
      return;
    }

    axis.setMinPx( shiftLeft );
    axis.setMaxPx( graph.getDrawingWidth( true ) - shiftRight );

    if ( axis.floating ) {
      return;
    }

    if ( !axis.linkedToAxis ) {
      axis.draw();
    }

  }, false, true, false );

  // Floating axes
  graph._applyToAxes( function( axis ) {

    if ( !axis.floating ) {
      return;
    }

    var floatingAxis = axis.getFloatingAxis();
    var floatingValue = axis.getFloatingValue();
    var floatingPx = floatingAxis.getPx( floatingValue );

    axis.setShift( floatingPx );

    if ( !axis.linkedToAxis ) {
      axis.draw();
    }

  }, false, true, true );

  _closeLine( graph, 'right', graph.getDrawingWidth( true ), graph.getDrawingWidth( true ), shiftTop, graph.getDrawingHeight( true ) - shiftBottom );
  _closeLine( graph, 'left', 0, 0, shiftTop, graph.getDrawingHeight( true ) - shiftBottom );
  _closeLine( graph, 'top', shiftLeft, graph.getDrawingWidth( true ) - shiftRight, 0, 0 );
  _closeLine( graph, 'bottom', shiftLeft, graph.getDrawingWidth( true ) - shiftRight, graph.getDrawingHeight( true ) - shiftBottom, graph.getDrawingHeight( true ) - shiftBottom );

  graph.clipRect.setAttribute( 'y', shiftTop );
  graph.clipRect.setAttribute( 'x', shiftLeft );
  graph.clipRect.setAttribute( 'width', graph.getDrawingWidth() - shiftLeft - shiftRight );
  graph.clipRect.setAttribute( 'height', graph.getDrawingHeight() - shiftTop - shiftBottom );

  graph.rectEvent.setAttribute( 'y', shiftTop + graph.getPaddingTop() );
  graph.rectEvent.setAttribute( 'x', shiftLeft + graph.getPaddingLeft() );

  graph.drawingSpaceWidth = graph.getDrawingWidth() - shiftLeft - shiftRight;
  graph.drawingSpaceHeight = graph.getDrawingHeight() - shiftTop - shiftBottom;

  graph.rectEvent.setAttribute( 'width', graph.drawingSpaceWidth );
  graph.rectEvent.setAttribute( 'height', graph.drawingSpaceHeight );

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

function _registerEvents( graph ) {
  var self = graph;

  graph._dom.addEventListener( 'keydown', function( e ) {

    // Not sure this has to be prevented

    if ( ( e.keyCode == 8 || e.keyCode == 127 ) && self.selectedShapes ) {

      e.preventDefault();
      e.stopPropagation();

      self.selectedShapes.map( function( shape ) {
        shape.kill();
      } );
    }

  } );

  graph.groupEvent.addEventListener( 'mousemove', function( e ) {
    //e.preventDefault();
    var coords = self._getXY( e );
    _handleMouseMove( self, coords.x, coords.y, e );
  } );

  graph.dom.addEventListener( 'mouseleave', function( e ) {

    _handleMouseLeave( self );
  } );

  graph.groupEvent.addEventListener( 'mousedown', function( e ) {

    self.focus();

    //   e.preventDefault();
    if ( e.which == 3 || e.ctrlKey ) {
      return;
    }

    var coords = self._getXY( e );
    _handleMouseDown( self, coords.x, coords.y, e );

  } );

  graph.dom.addEventListener( 'mouseup', function( e ) {

    graph.emit( "mouseUp", e );
    //   e.preventDefault();
    var coords = self._getXY( e );

    _handleMouseUp( self, coords.x, coords.y, e );

  } );

  graph.dom.addEventListener( 'dblclick', function( e ) {

    graph.emit( "dblClick", e );

    //      e.preventDefault();

    //      if ( self.clickTimeout ) {
    //       window.clearTimeout( self.clickTimeout );
    //    }

    var coords = self._getXY( e );
    //    self.cancelClick = true;

    _handleDblClick( self, coords.x, coords.y, e );
  } );

  // Norman 26 june 2015: Do we really need the click timeout ?

  graph.groupEvent.addEventListener( 'click', function( e ) {

    // Cancel right click or Command+Click
    if ( e.which == 3 || e.ctrlKey ) {
      return;
    }

    //   e.preventDefault();
    var coords = self._getXY( e );
    //    if ( self.clickTimeout ) {
    //     window.clearTimeout( self.clickTimeout );
    //  }

    // Only execute the action after 100ms
    // self.clickTimeout = window.setTimeout( function() {

    //  if ( self.cancelClick ) {
    //   self.cancelClick = false;
    //   return;
    // }

    if ( !self.prevent( false ) ) {
      _handleClick( self, coords.x, coords.y, e );
    }

    //}, 200 );
  } );

  graph.groupEvent.addEventListener( 'mousewheel', function( e ) {

    var deltaY = e.wheelDeltaY || e.wheelDelta || -e.deltaY;
    _handleMouseWheel( self, deltaY, e );

    return false;
  } );

  graph.groupEvent.addEventListener( 'wheel', function( e ) {

    var deltaY = e.wheelDeltaY || e.wheelDelta || -e.deltaY;
    _handleMouseWheel( self, deltaY, e );

    return false;
  } );
}

function _handleMouseDown( graph, x, y, e ) {

  var self = graph;

  if ( graph.forcedPlugin ) {

    graph.activePlugin = graph.forcedPlugin;
    graph._pluginExecute( graph.activePlugin, 'onMouseDown', [ graph, x, y, e ] );
    return;
  }

  checkMouseActions( graph, e, [ graph, x, y, e ], 'onMouseDown' );
}

function _handleMouseMove( graph, x, y, e ) {

  if ( graph.bypassHandleMouse ) {
    graph.bypassHandleMouse.handleMouseMove( e );
    return;
  }

  if ( graph.activePlugin && graph._pluginExecute( graph.activePlugin, 'onMouseMove', [ graph, x, y, e ] ) ) {
    return;
  };

  //			return;

  graph._applyToAxes( 'handleMouseMove', [ x - graph.options.paddingLeft, e ], true, false );
  graph._applyToAxes( 'handleMouseMove', [ y - graph.options.paddingTop, e ], false, true );

  if ( !graph.activePlugin ) {
    var index;

    if ( graph.options.trackingLine && graph.options.trackingLine.snapToSerie ) {

      if ( graph.options.trackingLine.mode == "common" ) {

        var snapToSerie = graph.options.trackingLine.snapToSerie;
        index = snapToSerie.handleMouseMove( false, true );

        if ( !index ) {

          graph.trackingLine.hide();

        } else {

          graph.trackingLine.show();
          var closestIndex = index.xIndexClosest;
          graph.trackingLine.getPosition( 0 ).x = snapToSerie.getData()[ 0 ][ closestIndex * 2 ];
          graph.trackingLine.getPosition( 1 ).x = snapToSerie.getData()[ 0 ][ closestIndex * 2 ];
          graph.trackingLine.redraw();

          var x = snapToSerie.getXAxis().getPx( graph.trackingLine.getPosition( 0 ).x ) + graph.options.paddingLeft;

        }

        var series = graph.options.trackingLine.series;

        if ( !series ) {

          series = graph.getSeries().map( function( serie ) {
            return {
              serie: serie,
              withinPx: 20,
              withinVal: -1
            };
          } );
        }

        graph._trackingLegend = _trackingLegendSerie( graph, series, x, y, graph._trackingLegend, graph.options.trackingLine.textMethod, graph.trackingLine.getPosition( 1 ).x );
      }
    }
  }

  if ( graph.options.onMouseMoveData ) {
    var results = {};

    for ( var i = 0; i < graph.series.length; i++ ) {

      results[ graph.series[ i ].getName() ] = graph.series[ i ].handleMouseMove( false, true );

    }

    graph.options.onMouseMoveData.call( graph, e, results );
  }

  checkMouseActions( graph, e, [  graph, x, y, e ], 'onMouseMove' );

  return;

}

function checkMouseActions( graph, e, parameters, methodName ) {

  var keyComb = graph.options.mouseActions,
    i, l;

  for ( i = 0, l = keyComb.length; i < l; i++ ) {

    if ( keyComb[ i ].plugin ) { // Is it a plugin ?

      if ( graph.forcedPlugin == keyComb[ i ].plugin || graph.isMouseActionAllowed( e, keyComb[ i ] ) ) {

        if ( keyComb[ i ].options ) {
          parameters.push( keyComb[ i ].options );
        }

        graph.activePlugin = keyComb[ i ].plugin; // Lease the mouse action to the current action
        graph._pluginExecute( keyComb[ i ].plugin, methodName, parameters );
        return true;
      }

    } else if ( keyComb[ i ].callback && graph.isMouseActionAllowed( e, keyComb[ i ] ) ) {

      if ( keyComb[ i ].options ) {
        parameters.push( keyComb[ i ].options );
      }

      keyComb[ i ].callback.apply( graph, parameters );
      return true;

    } else if ( keyComb[ i ].series ) {

      var series;
      if ( keyComb[ i ].series === 'all' ) {
        series = graph.series;
      }

      if ( !Array.isArray( keyComb[ i ].series ) ) {
        series = [  series ];
      }

      if ( keyComb[ i ].options ) {
        parameters.push( keyComb[ i ].options );
      }

      for ( var j = 0; j < series.length; i++ ) {
        graph._serieExecute( series[  i ], methodName, parameters );
      }
      return true;
    }
  }

  return false;

};

var _trackingLegendSerie = function( graph, serie, x, y, legend, textMethod, xValue ) {

  var justCreated = false;

  if ( !Array.isArray( serie ) ) {
    serie = [ serie ];
  }

  var output = [];

  if ( !legend ) {
    justCreated = true;
    legend = _makeTrackingLegend( graph );
  }

  serie.map( function( serie ) {

    var index = serie.serie.handleMouseMove( xValue, false );

    if ( !index ||  !textMethod ) {

      if ( serie.serie.trackingShape ) {
        serie.serie.trackingShape.hide();
      }

      return legend;
    }

    // Should we display the dot ?
    if (
      ( serie.withinPx > 0 && Math.abs( x - graph.options.paddingLeft - serie.serie.getXAxis().getPx( serie.serie.getData()[ 0 ][ index.xIndexClosest * 2 ] ) ) - serie.withinPx > 1e-14 ) ||
      ( serie.withinVal > 0 && Math.abs( serie.serie.getXAxis().getVal( x - graph.options.paddingLeft ) - serie.serie.getData()[ 0 ][ index.xIndexClosest * 2 ] ) - serie.withinVal > serie.serie.getXAxis().getVal( x - graph.options.paddingLeft ) / 100000 )
    ) {

      if ( serie.serie.trackingShape ) {
        serie.serie.trackingShape.hide();
      }

    } else {

      output[ serie.serie.getName() ] = {

        xIndex: index.xIndexClosest,
        yValue: serie.serie.getData()[ 0 ][ index.xIndexClosest * 2 + 1 ],
        xValue: serie.serie.getData()[ 0 ][ index.xIndexClosest * 2 ],
        serie: serie,
        index: index

      };

      if ( !serie.serie.trackingShape ) {

        serie.serie.trackingShape = graph.newShape( "ellipse", {

            fillColor: serie.serie.getLineColor(),
            strokeColor: "White",
            strokeWidth: serie.serie.getLineWidth()

          } )
          .setSerie( serie.serie )
          .setProp( 'rx', serie.serie.getLineWidth() * 3 )
          .setProp( 'ry', serie.serie.getLineWidth() * 3 )
          .forceParentDom( serie.serie.groupMain )
          .draw();
      }

      serie.serie.trackingShape.show();
      serie.serie.trackingShape.getPosition( 0 ).x = serie.serie.getData()[ 0 ][ index.xIndexClosest * 2 ];
      serie.serie.trackingShape.redraw();
    }

  } ); // End map

  if ( Object.keys( output ).length == 0 ||  !textMethod ) {
    legend.style.display = "none";
  } else {

    if ( legend.style.display == "none" ||  justCreated ) {

      forceTrackingLegendMode( graph, legend, x, y, true );
    } else {
      _trackingLegendMove( graph, legend, x, y );
    }

    legend.style.display = "block";
    var txt = textMethod( output, xValue, x, y );

    legend.innerHTML = txt;

    //legend.innerHTML = textMethod( output, xValue, x, y );

  }

  return legend;

};

var forceTrackingLegendMode = function( graph, legend, toX, toY, skip ) {

  var ratio = 0,
    start = Date.now(),
    h = legend.offsetHeight,
    startX = parseInt( legend.style.marginLeft.replace( "px", "" ) ||  0 ),
    startY = parseInt( legend.style.marginTop.replace( "px", "" ) ||  0 );

  toX = ( toX > graph.getWidth() / 2 ) ? ( ( toX - toX % 10 - 20 ) - legend.offsetWidth ) : ( toX - toX % 10 + 30 );
  toY = ( toY - toY % 10 + h / 2 );

  if ( skip ) {
    legend.style.marginLeft = ( toX ) + "px";
    legend.style.marginTop = ( toY ) + "px";
    return;
  }

  function next() {

    var progress = ( Date.now() - start ) / 200;
    if ( progress > 1 ) {
      progress = 1;
    }

    legend.style.marginLeft = ( ( toX - startX ) * progress + startX ) + "px";
    legend.style.marginTop = ( ( toY - startY ) * progress + startY ) + "px";

    if ( progress < 1 ) {
      window.requestAnimationFrame( next );
    }
  }

  window.requestAnimationFrame( next );
};

var _trackingLegendMove = util.debounce( forceTrackingLegendMode, 50 );

function _makeTrackingLegend( graph ) {

  var group = document.createElement( 'div' );
  group.setAttribute( 'class', 'trackingLegend' );
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

  graph.getWrapper().insertBefore( group, graph.getDom() );

  return group;
}

function _handleDblClick( graph, x, y, e ) {
  //	var _x = x - graph.options.paddingLeft;
  //	var _y = y - graph.options.paddingTop;
  var pref = graph.options.dblclick;
  checkMouseActions( graph, e, [ x, y, e ], 'onDblClick' );
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

function _handleMouseUp( graph, x, y, e ) {

  if ( graph.bypassHandleMouse ) {
    graph.bypassHandleMouse.handleMouseUp( e );
    graph.activePlugin = false;
    return;
  }

  graph._pluginExecute( graph.activePlugin, 'onMouseUp', [ graph, x, y, e ] );
  graph.activePlugin = false;
}

function _handleClick( graph, x, y, e ) {

  graph.emit( 'click', [ graph, x, y, e ] );

  // Not on a shape

  if ( !e.target.jsGraphIsShape && !graph.prevent( false ) && graph.options.shapesUnselectOnClick ) {

    graph.unselectShapes();
  }

}

function _getAxis( graph, num, options, pos ) {

  var options = options || {};
  var inst;

  var _availableAxes = {

    def: {
      x: graph.getConstructor( "graph.axis.x" ),
      y: graph.getConstructor( "graph.axis.y" )
    },

    time: {
      x: graph.getConstructor( "graph.axis.x.time" )
    },

    bar: {
      x: graph.getConstructor( "graph.axis.x.bar" )
    }
  };

  switch ( options.type ) {

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

  switch ( pos ) {

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

  if ( typeof num == "object" ) {
    options = num;
    num = 0;
  }

  if ( !graph.axis[ pos ][ num ] ) {
    graph.axis[ pos ][ num ] = new inst( graph, pos, options );
    graph.axis[ pos ][ num ].init( graph, options );
  }

  return graph.axis[ pos ][ num ];
}

function _closeLine( graph, mode, x1, x2, y1, y2 ) {

  if ( graph.options.close === false ) {
    return;
  }

  var l = 0;

  graph.axis[ mode ].map( function( g ) {

    if ( g.isDisplayed() && !g.floating ) {
      l++;
    }
  } );

  if ( ( graph.options.close === true || graph.options.close[ mode ] ) && l == 0 ) {

    graph.closingLines[ mode ].setAttribute( 'display', 'block' );
    graph.closingLines[ mode ].setAttribute( 'x1', x1 );
    graph.closingLines[ mode ].setAttribute( 'x2', x2 );
    graph.closingLines[ mode ].setAttribute( 'y1', y1 );
    graph.closingLines[ mode ].setAttribute( 'y2', y2 );

  } else {

    graph.closingLines[ mode ].setAttribute( 'display', 'none' );

  }
}

function _handleMouseWheel( graph, delta, e ) {

  if ( checkMouseActions( graph, e, [ delta, e ], 'onMouseWheel' ) ) {
    e.preventDefault();
    e.stopPropagation();
  }

}

function _handleMouseLeave( graph ) {

  if ( graph.options.handleMouseLeave ) {
    graph.options.handleMouseLeave.call( graph );

  }

}

function haveAxesChanged( graph ) {
  var temp = graph._axesHaveChanged;
  graph._axesHaveChanged = false;
  return temp;
}

function hasSizeChanged( graph ) {
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

export default Graph;