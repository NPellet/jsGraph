import Graph from './graph.core'
import EventEmitter from './dependencies/eventEmitter/EventEmitter'
import * as util from './graph.util'

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

  span: [ 0, 1 ],
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
class Axis extends EventEmitter {

  constructor() {
    super();
  }

  init( graph, options, overwriteoptions ) {

    this.unitModificationTimeTicks = [
      [ 1, [ 1, 2, 5, 10, 20, 30 ] ],
      [ 60, [ 1, 2, 5, 10, 20, 30 ] ],
      [ 3600, [ 1, 2, 6, 12 ] ],
      [ 3600 * 24, [ 1, 2, 3, 4, 5, 10, 20, 40 ] ]
    ];

    var self = this;
    this.graph = graph;
    this.options = util.extend( true, {}, defaults, overwriteoptions, options );

    this.group = document.createElementNS( this.graph.ns, 'g' );
    this.hasChanged = true;

    this.rectEvent = document.createElementNS( this.graph.ns, 'rect' );
    this.rectEvent.setAttribute( 'pointer-events', 'fill' );
    this.rectEvent.setAttribute( 'fill', 'transparent' );
    this.group.appendChild( this.rectEvent );

    this.graph.axisGroup.appendChild( this.group ); // Adds to the main axiszone

    this.line = document.createElementNS( this.graph.ns, 'line' );
    this.line.setAttribute( 'stroke', 'black' );
    this.line.setAttribute( 'shape-rendering', 'crispEdges' );
    this.line.setAttribute( 'stroke-linecap', 'square' );
    this.groupTicks = document.createElementNS( this.graph.ns, 'g' );
    this.groupTickLabels = document.createElementNS( this.graph.ns, 'g' );

    this.group.appendChild( this.groupTicks );
    this.group.appendChild( this.groupTickLabels );
    this.group.appendChild( this.line );

    this.labelValue;

    this.label = document.createElementNS( this.graph.ns, 'text' );

    this.labelTspan = document.createElementNS( this.graph.ns, 'tspan' ); // Contains the main label
    this.preunitTspan = document.createElementNS( this.graph.ns, 'tspan' ); // Contains the scaling unit
    this.unitTspan = document.createElementNS( this.graph.ns, 'tspan' ); // Contains the unit
    this.expTspan = document.createElementNS( this.graph.ns, 'tspan' ); // Contains the exponent (x10)
    this.expTspanExp = document.createElementNS( this.graph.ns, 'tspan' ); // Contains the exponent value

    this.label.appendChild( this.labelTspan );
    this.label.appendChild( this.preunitTspan );
    this.label.appendChild( this.unitTspan );
    this.label.appendChild( this.expTspan );
    this.label.appendChild( this.expTspanExp );

    this.preunitTspan.setAttribute( 'dx', 6 );
    this.expTspan.setAttribute( 'dx', 6 );
    this.expTspanExp.setAttribute( 'dy', -5 );
    this.expTspanExp.setAttribute( 'font-size', "0.8em" );

    this.label.setAttribute( 'text-anchor', 'middle' );

    this.setTickPosition( this.options.tickPosition );

    this.gridLinePath = {
      primary: "",
      secondary: ""
    };

    this.gridPrimary = document.createElementNS( this.graph.ns, "path" );
    this.gridSecondary = document.createElementNS( this.graph.ns, "path" );

    this.graph.groupPrimaryGrids.appendChild( this.gridPrimary );
    this.graph.groupSecondaryGrids.appendChild( this.gridSecondary );

    this.setGridLinesStyle();

    this.group.appendChild( this.label );

    this.groupSeries = document.createElementNS( this.graph.ns, 'g' );
    this.group.appendChild( this.groupSeries );

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

    this.group.addEventListener( 'mousemove', function( e ) {
      e.preventDefault();
      var coords = self.graph._getXY( e );
      self.handleMouseMoveLocal( coords.x, coords.y, e );

      for ( var i = 0, l = self.series.length; i < l; i++ ) {
        self.series[ i ].handleMouseMove( false, true );
      }
    } );

    this.labels = [];
    this.group.addEventListener( 'click', function( e ) {
      e.preventDefault();
      var coords = self.graph._getXY( e );
      self.addLabel( self.getVal( coords.x - self.graph.getPaddingLeft() ) );
    } );

    this.axisRand = Math.random();
    this.clip = document.createElementNS( this.graph.ns, 'clipPath' );
    this.clip.setAttribute( 'id', '_clip' + this.axisRand );
    this.graph.defs.appendChild( this.clip );

    this.clipRect = document.createElementNS( this.graph.ns, 'rect' );
    this.clip.appendChild( this.clipRect );
    this.clip.setAttribute( 'clipPathUnits', 'userSpaceOnUse' );

    this.graph._axisHasChanged( this );
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
  setDisplay( bool ) {
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
    return this.isDisplayed( ...arguments );
  }

  kill( noRedraw, noSerieKill ) {
      this.graph.killAxis( this, noRedraw, noSerieKill );
    }
    /**
     * Forces the appearence of a straight perpendicular line at value 0
     * @param {Boolean} lineAt0 - true to display the line, false not to.
     * @memberof Axis
     * @return {Axis} The current axis
     */
  setLineAt0( bool ) {
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
  adaptTo( axis, thisValue, foreignValue, preference ) {

    if ( !axis ) {
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

    if ( !this.options.adaptTo ) {
      return;
    }

    if ( !axis )
      var val;

    var axis = this.options.adaptTo.axis,
      current = this.options.adaptTo.thisValue,
      foreign = this.options.adaptTo.foreignValue;

    if ( axis.currentAxisMin === undefined ||  axis.currentAxisMax === undefined ) {
      axis.setMinMaxToFitSeries();
    }

    if ( ( this.options.forcedMin !== false && this.options.forcedMax == false ) ||  ( this.options.adaptTo.preference !== "max" ) ) {

      if ( this.options.forcedMin !== false ) {
        this.currentAxisMin = this.options.forcedMin;
      } else {
        this.currentAxisMin = this._zoomed ? this.getCurrentMin() : this.getMinValue() - ( current - this.getMinValue() ) * ( this.options.axisDataSpacing.min * ( axis.getCurrentMax() - axis.getCurrentMin() ) / ( foreign - axis.getCurrentMin() ) );
      }

      if ( this.currentAxisMin == current ) {
        this.currentAxisMin -= this.options.axisDataSpacing.min * this.getInterval();
      }

      var use = this.options.forcedMin !== false ? this.options.forcedMin : this.currentAxisMin;
      this.currentAxisMax = ( current - use ) * ( axis.getCurrentMax() - axis.getCurrentMin() ) / ( foreign - axis.getCurrentMin() ) + use;

    } else {

      if ( this.options.forcedMax !== false ) {
        this.currentAxisMax = this.options.forcedMax;
      } else {
        this.currentAxisMax = this._zoomed ? this.getCurrentMax() : this.getMaxValue() + ( this.getMaxValue() - current ) * ( this.options.axisDataSpacing.max * ( axis.getCurrentMax() - axis.getCurrentMin() ) / ( axis.getCurrentMax() - foreign ) );
      }

      if ( this.currentAxisMax == current ) {
        this.currentAxisMax += this.options.axisDataSpacing.max * this.getInterval();
      }

      var use = this.options.forcedMax !== false ? this.options.forcedMax : this.currentAxisMax;

      this.currentAxisMin = ( current - use ) * ( axis.getCurrentMin() - axis.getCurrentMax() ) / ( foreign - axis.getCurrentMax() ) + use;
    }

    this.graph._axisHasChanged( this );
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
  setFloating( axis, value ) {

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
  setAxisDataSpacing( val1, val2 ) {
    this.options.axisDataSpacing.min = val1;
    this.options.axisDataSpacing.max = val2 || val1;
    return this;
  }

  dataSpacing() {
    return this.setAxisDataSpacing( ...arguments );
  }

  /**
   * Sets the axis data spacing at the minimum of the axis
   * @memberof Axis
   * @see AxisOptionsDefault
   * @param {Number} min - The spacing at the axis min value
   * @return {Axis} The current axis
   */
  setAxisDataSpacingMin( val ) {
    this.options.axisDataSpacing.min = val;
  }

  /**
   * Sets the axis data spacing at the maximum of the axis
   * @memberof Axis
   * @see AxisOptionsDefault
   * @param {Number} max - The spacing at the axis max value
   * @return {Axis} The current axis
   */
  setAxisDataSpacingMax( val ) {
    this.options.axisDataSpacing.max = val;
  }

  setMinPx( px ) {

    this.minPx = px;
    this.setMinMaxFlipped();
  }

  setMaxPx( px ) {

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
  getMaxPx( px ) {
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

  setMinValueData( min ) {
    this.dataMin = min;
  }

  setMaxValueData( max ) {
    this.dataMax = max;
  }

  /**
   * Forces the minimum value of the axis (no more dependant on the serie values)
   * @memberof Axis
   * @param {Number} min - The minimum value of the axis
   * @param {Boolean} noRescale - ```true``` to prevent the axis to rescale to set this minimum. Rescales anyway if current min is lower than the value
   * @return {Axis} The current axis
   */
  forceMin( min, noRescale ) {
    this.options.forcedMin = min;

    this.setCurrentMin( noRescale ? this.getCurrentMin() : undefined );
    this.graph._axisHasChanged( this );
    return this;
  }

  /**
   * Forces the maximum value of the axis (no more dependant on the serie values).
   * @memberof Axis
   * @param {Number} max - The maximum value of the axis
   * @param {Boolean} noRescale - ```true``` to prevent the axis to rescale to set this maximum. Rescales anyway if current max is higher than the value
   * @return {Axis} The current axis
   */
  forceMax( max, noRescale ) {
    this.options.forcedMax = max;

    this.setCurrentMax( noRescale ? this.getCurrentMax() : undefined );
    this.graph._axisHasChanged( this );
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
  forceToAxis( axis ) {
    if ( axis.getMaxValue && axis.getMinValue ) {
      this.options.forcedMin = axis.getMinValue();
      this.options.forcedMax = axis.getMaxValue();
    }

    return this;
  }

  getNbTicksPrimary() {
    return this.options.nbTicksPrimary;
  }

  setNbTicksPrimary( nb ) {
    this.options.nbTicksPrimary = nb;
  }

  getNbTicksSecondary() {
    return this.options.nbTicksSecondary;
  }

  handleMouseMove( px, e ) {
    this.mouseVal = this.getVal( px );
  }

  handleMouseWheel( delta, e, baseline ) {

    delta = Math.min( 0.2, Math.max( -0.2, delta ) );

    if ( baseline == "min" ) {
      baseline = this.getMinValue();
    } else if ( baseline == "max" ) {
      baseline = this.getMaxValue();
    } else if ( !baseline ) {
      baseline = 0;
    }

    this._doZoomVal(
      ( ( this.getCurrentMax() - baseline ) * ( 1 + delta ) ) + baseline, ( ( this.getCurrentMin() - baseline ) * ( 1 + delta ) ) + baseline
    );

    this.graph.draw();
    //	this.graph.drawSeries(true);

  }

  set zoomLock( bln ) {
    this._zoomLocked = bln;
  }

  get zoomLock() {
    return this._zoomLocked ||  false;
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
  zoom( val1, val2, forceLock ) {

    if ( !forceLock && this.zoomLock ) {
      return;
    }

    return this._doZoomVal( val1, val2, true );
  }

  _doZoomVal( val1, val2, mute ) {

    return this._doZoom( this.getPx( val1 ), this.getPx( val2 ), val1, val2, mute );
  }

  _doZoom( px1, px2, val1, val2, mute ) {

    //if(this.options.display || 1 == 1) {
    var val1 = val1 !== undefined ? val1 : this.getVal( px1 );
    var val2 = val2 !== undefined ? val2 : this.getVal( px2 );

    this.setCurrentMin( Math.min( val1, val2 ) );
    this.setCurrentMax( Math.max( val1, val2 ) );

    this.cacheCurrentMin();
    this.cacheCurrentMax();
    this.cacheInterval();

    this._zoomed = true;

    this.adapt();

    this._hasChanged = true;

    // New method
    if ( !mute ) {
      this.emit( "zoom", [ this.currentAxisMin, this.currentAxisMax, this ] );
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

  getUnitPerTick( px, nbTick, valrange ) {

    var umin;
    var pxPerTick = px / nbTicks; // 1000 / 100 = 10 px per tick
    if ( !nbTick ) {
      nbTick = px / 10;
    } else {
      nbTick = Math.min( nbTick, px / 10 );
    }

    // So now the question is, how many units per ticks ?
    // Say, we have 0.0004 unit per tick
    var unitPerTick = valrange / nbTick;

    switch ( this.options.unitModification ) {

      case 'time':
      case 'time:min.sec':

        var max = this.getModifiedValue( this.getMaxValue() ),
          units = [
            [ 60, 'min' ],
            [ 3600, 'h' ],
            [ 3600 * 24, 'd' ]
          ];

        if ( max < 3600 ) { // to minutes
          umin = 0;
        } else if ( max < 3600 * 24 ) {
          umin = 1;
        } else {
          umin = 2;
        }

        var breaked = false;
        for ( var i = 0, l = this.unitModificationTimeTicks.length; i < l; i++ ) {
          for ( var k = 0, m = this.unitModificationTimeTicks[ i ][ 1 ].length; k < m; k++ ) {
            if ( unitPerTick < this.unitModificationTimeTicks[ i ][ 0 ] * this.unitModificationTimeTicks[ i ][ 1 ][ k ] ) {
              breaked = true;
              break;
            }
          }
          if ( breaked ) {
            break;
          }
        }

        //i and k contain the good variable;
        if ( i !== this.unitModificationTimeTicks.length ) {
          unitPerTickCorrect = this.unitModificationTimeTicks[ i ][ 0 ] * this.unitModificationTimeTicks[ i ][ 1 ][ k ];
        } else {
          unitPerTickCorrect = 1;
        }

        break;

      default:

        // We take the log
        var decimals = Math.floor( Math.log( unitPerTick ) / Math.log( 10 ) );
        /*
  					Example:
  						13'453 => Math.log10() = 4.12 => 4
  						0.0000341 => Math.log10() = -4.46 => -5
  				*/

        var numberToNatural = unitPerTick * Math.pow( 10, -decimals );

        /*
  					Example:
  						13'453 (4) => 1.345
  						0.0000341 (-5) => 3.41
  				*/

        this.decimals = -decimals;

        var possibleTicks = [ 1, 2, 5, 10 ];
        var closest = false;
        for ( var i = possibleTicks.length - 1; i >= 0; i-- ) {
          if ( !closest || ( Math.abs( possibleTicks[ i ] - numberToNatural ) < Math.abs( closest - numberToNatural ) ) ) {
            closest = possibleTicks[ i ];
          }
        }

        // Ok now closest is the number of unit per tick in the natural number
        /*
  					Example:
  						13'453 (4) (1.345) => 1
  						0.0000341 (-5) (3.41) => 5
  				*/

        // Let's scale it back
        var unitPerTickCorrect = closest * Math.pow( 10, decimals );

        /*
  					Example:
  						13'453 (4) (1.345) (1) => 10'000
  						0.0000341 (-5) (3.41) (5) => 0.00005
  				*/
        break;
    }

    var nbTicks = valrange / unitPerTickCorrect;

    var pxPerTick = px / nbTick;
    return [ unitPerTickCorrect, nbTicks, pxPerTick ];
  }

  /**
   * Resets the min and max of the serie to fit the series it contains
   * @memberof Axis
   * @return {Axis} The current axis
   */
  setMinMaxToFitSeries( noNotify ) {

    var interval = this.getInterval();

    if ( this.options.logScale ) {

      this.currentAxisMin = Math.max( 1e-50, this.getMinValue() * 0.9 );
      this.currentAxisMax = Math.max( 1e-50, this.getMaxValue() * 1.1 );

    } else {

      this.currentAxisMin = this.getMinValue();
      this.currentAxisMax = this.getMaxValue();

      if ( this.getForcedMin() === false ) {
        this.currentAxisMin -= ( this.options.axisDataSpacing.min * interval );
      }

      if ( this.getForcedMax() === false ) {
        this.currentAxisMax += ( this.options.axisDataSpacing.max * interval );
      }
    }

    if ( isNaN( this.currentAxisMin ) || isNaN( this.currentAxisMax ) ) {
      this.currentAxisMax = undefined;
      this.currentAxisMin = undefined;
    }

    this.cacheCurrentMin();
    this.cacheCurrentMax();
    this.cacheInterval();

    this._zoomed = false;

    this.adapt();

    if ( !noNotify ) {
      this.graph._axisHasChanged( this );
    }

    this.emit( "zoomOutFull", [ this.currentAxisMin, this.currentAxisMax, this ] );

    return this;
  }

  /**
   * @memberof Axis
   * @return {Number} the maximum interval ( max - min ) of the axis ( not nessarily the current one )
   */
  getInterval() {
    return this.getMaxValue() - this.getMinValue()
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
    this.cachedCurrentMin = this.currentAxisMin == this.currentAxisMax ? ( this.options.logScale ? this.currentAxisMin / 10 : this.currentAxisMin - 1 ) : this.currentAxisMin;
  }

  /**
   * Caches the current axis maximum
   * @memberof Axis
   */
  cacheCurrentMax() {
    this.cachedCurrentMax = this.currentAxisMax == this.currentAxisMin ? ( this.options.logScale ? this.currentAxisMax * 10 : this.currentAxisMax + 1 ) : this.currentAxisMax;
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
  setCurrentMin( val ) {

    if ( val === undefined || ( this.getForcedMin() !== false && val < this.getForcedMin() ) ) {
      val = this.getMinValue();
    }

    this.currentAxisMin = val;
    if ( this.options.logScale ) {
      this.currentAxisMin = Math.max( 1e-50, val );
    }

    this.graph._axisHasChanged( this );
    return this;
  }

  /**
   * Sets the current maximum value of the axis. If higher that the forced value, the forced value is used
   * @memberof Axis
   * @param {Number} val - The new maximum value
   * @return {Axis} The current axis
   */
  setCurrentMax( val ) {

    if ( val === undefined || ( this.getForcedMax() !== false && val > this.getForcedMax() ) ) {
      val = this.getMaxValue();
    }

    this.currentAxisMax = val;

    if ( this.options.logScale ) {
      this.currentAxisMax = Math.max( 1e-50, val );
    }

    this.graph._axisHasChanged( this );
  }

  /**
   * Sets the flipping state of the axis. If enabled, the axis is descending rather than ascending.
   * @memberof Axis
   * @param {Boolean} flip - The new flipping state of the axis
   * @return {Axis} The current axis
   */
  flip( flip ) {
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

  _draw() { // Redrawing of the axis

    var self = this;
    var visible;

    //    this.drawInit();

    this.cacheCurrentMax();
    this.cacheCurrentMin();
    this.cacheInterval();

    if ( this.currentAxisMin == undefined || this.currentAxisMax == undefined ) {
      this.setMinMaxToFitSeries( true ); // We reset the min max as a function of the series

    }

    //   this.setSlaveAxesBoundaries();

    // The data min max is stored in this.dataMin, this.dataMax

    //var widthPx = this.maxPx - this.minPx;
    var widthPx = Math.abs( this.getMaxPx() - this.getMinPx() );
    var valrange = this.getCurrentInterval();

    /* Number of px per unit */
    /* Example: width: 1000px
			/* 			10 - 100 => 11.11
			/*			0 - 2 => 500
			/*			0 - 0.00005 => 20'000'000
			*/

    if ( !this.options.display ) {
      this.line.setAttribute( 'display', 'none' );
      return 0;
    }

    this.line.setAttribute( 'display', 'block' );

    if ( this.options.scientificScale == true ) {

      if ( this.options.scientificScaleExponent ) {

        this.scientificExponent = this.options.scientificScaleExponent;
      } else {
        this.scientificExponent = Math.floor( Math.log( Math.max( Math.abs( this.getCurrentMax() ), Math.abs( this.getCurrentMin() ) ) ) / Math.log( 10 ) );
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

    if ( this.options.unitDecade && this.options.unit && this.scientificExponent !== 0 && ( this.scientificExponent = this.getEngineeringExponent( this.scientificExponent ) ) && ( letter = this.getExponentGreekLetter( this.scientificExponent ) ) ) {

      this.preunitTspan.innerHTML = letter;
      this.preunitTspan.setAttribute( 'display', 'visible' );
      this.unitTspan.setAttribute( 'dx', 0 );

    } else if ( this.scientificExponent !== 0 && !isNaN( this.scientificExponent ) ) {

      if ( this.options.engineeringScale ) {
        this.scientificExponent = this.getEngineeringExponent( this.scientificExponent );
      }

      this.preunitTspan.textContent = "";
      this.preunitTspan.setAttribute( 'display', 'none' );

      this.expTspan.setAttribute( 'display', 'visible' );
      this.expTspanExp.setAttribute( 'display', 'visible' );

      this.expTspan.textContent = "x10";
      this.expTspanExp.textContent = this.scientificExponent;

    } else {

      if ( !this.options.unit ) {
        this.unitTspan.setAttribute( 'display', 'none' );
      }

      this.preunitTspan.setAttribute( 'display', 'none' );
      this.expTspan.setAttribute( 'display', 'none' );
      this.expTspanExp.setAttribute( 'display', 'none' );
    }

    if ( !this.options.hideTicks ) {

      this.resetTicksLength();

      if ( this.linkedToAxis ) { // px defined, linked to another axis

        this.linkedToAxis.deltaPx = 10;
        var widthHeight = this.drawLinkedToAxisTicksWrapper( widthPx, valrange );

      } else if ( !this.options.logScale ) {
        // So the setting is: How many ticks in total ? Then we have to separate it

        var widthHeight = this.drawLinearTicksWrapper( widthPx, valrange );

      } else {

        var widthHeight = this.drawLogTicks();

      }
    } else {
      var widthHeight = 0;
    }

    this.removeUselessTicks();
    this.removeUselessTickLabels();

    this.gridPrimary.setAttribute( 'd', this.gridLinePath.primary );
    this.gridSecondary.setAttribute( 'd', this.gridLinePath.secondary );

    // Looks for axes linked to this current axis
    var axes = this.graph.findAxesLinkedTo( this );
    axes.map( function( axis ) {

      if ( !axis.linkedToAxis ) {
        return;
      }
      axis.setMinPx( self.getMinPx() );
      axis.setMaxPx( self.getMaxPx() );

      axis.draw();

    } );

    /************************************/
    /*** DRAW CHILDREN IMPL SPECIFIC ****/
    /************************************/

    //   this.drawSpecifics();
    if ( this.options.lineAt0 && this.getCurrentMin() < 0 && this.getCurrentMax() > 0 ) {
      this._draw0Line( this.getPx( 0 ) );
    }

    return widthHeight;
  }

  writeUnit() {
    if ( this.options.unit ) {

      this.unitTspan.setAttribute( 'display', 'visible' );
      this.unitTspan.setAttribute( 'dx', 5 );

      this.expTspan.setAttribute( 'display', 'none' );
      this.expTspanExp.setAttribute( 'display', 'none' );
      this.unitTspan.innerHTML = this.options.unitWrapperBefore + this.options.unit.replace( /\^([-+0-9]*)/g, "<tspan dy='-5' font-size='0.7em'>$1</tspan>" ) + this.options.unitWrapperAfter;

    } else {
      this.unitTspan.setAttribute( 'display', 'none' );
    }

  }

  getExponentGreekLetter( val ) {
    switch ( val ) {

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

  drawLinearTicksWrapper( widthPx, valrange ) {

    let tickPrimaryUnit;

    if ( this.options.primaryTickUnit ) {

      tickPrimaryUnit = this.options.primaryTickUnit;

    } else {

      tickPrimaryUnit = this.getUnitPerTick( widthPx, this.getNbTicksPrimary(), valrange )[ 0 ];

      if ( this.options.maxPrimaryTickUnit && this.options.maxPrimaryTickUnit < tickPrimaryUnit ) {
        tickPrimaryUnit = this.options.maxPrimaryTickUnit;
      } else if ( this.options.minPrimaryTickUnit && this.options.minPrimaryTickUnit > tickPrimaryUnit ) {
        tickPrimaryUnit = this.options.minPrimaryTickUnit;
      }

    }

    // We need to get here the width of the ticks to display the axis properly, with the correct shift
    return this.drawTicks( tickPrimaryUnit, this.secondaryTicks() );
  }

  forcePrimaryTickUnit( primaryInterval ) {
    this.options.primaryTickUnit = primaryInterval;
  }

  forcePrimaryTickUnitMax( value ) {
    this.options.maxPrimaryTickUnit = value;
  }

  forcePrimaryTickUnitMin( value ) {
    this.options.minPrimaryTickUnit = value;
  }

  getPrimaryTickUnit() {
    return this.incrTick;
  }

  setTickLabelRatio( tickRatio ) {
    this.options.ticklabelratio = tickRatio;
  }

  draw() {

    this._widthLabels = 0;
    var drawn = this._draw();
    this._widthLabels += drawn;
    return drawn;
  }

  drawTicks( primary, secondary ) {

    var unitPerTick = primary,
      min = this.getCurrentMin(),
      max = this.getCurrentMax(),
      widthHeight = 0,
      secondaryIncr,
      incrTick,
      subIncrTick,
      loop = 0;

    if ( secondary ) {
      secondaryIncr = unitPerTick / secondary;
    }

    incrTick = this.options.shiftToZero ? this.dataMin - Math.ceil( ( this.dataMin - min ) / unitPerTick ) * unitPerTick : Math.floor( min / unitPerTick ) * unitPerTick;
    this.incrTick = primary;

    while ( incrTick <= max ) {

      loop++;
      if ( loop > 200 ) {
        break;
      }

      if ( secondary ) {

        subIncrTick = incrTick + secondaryIncr;
        this.subIncrTick = subIncrTick;
        //widthHeight = Math.max(widthHeight, this.drawTick(subIncrTick, 1));
        var loop2 = 0;

        while ( subIncrTick < incrTick + unitPerTick ) {
          loop2++;
          if ( loop2 > 100 ) {
            break;
          }

          if ( subIncrTick < min || subIncrTick > max ) {
            subIncrTick += secondaryIncr;
            continue;
          }

          this.drawTickWrapper( subIncrTick, false, Math.abs( subIncrTick - incrTick - unitPerTick / 2 ) < 1e-4 ? 2 : 3 );

          subIncrTick += secondaryIncr;
        }
      }

      if ( incrTick < min || incrTick > max ) {
        incrTick += primary;
        continue;
      }

      this.drawTickWrapper( incrTick, true, 1 );
      incrTick += primary;
    }

    this.widthHeightTick = this.getMaxSizeTick();
    return this.widthHeightTick;
  }

  nextTick( level, callback ) {

    this.ticks[ level ] = this.ticks[ level ] || [];
    this.lastCurrentTick[ level ] = this.lastCurrentTick[ level ] || 0;
    this.currentTick[ level ] = this.currentTick[ level ] ||  0;

    if ( this.currentTick[ level ] >= this.ticks[ level ].length ) {
      var tick = document.createElementNS( this.graph.ns, 'line' );
      this.groupTicks.appendChild( tick );
      this.ticks[ level ].push( tick );

      callback( tick );
    }

    var tick = this.ticks[ level ][ this.currentTick[ level ] ];

    if ( this.currentTick[ level ] >= this.lastCurrentTick[ level ] ) {
      tick.setAttribute( 'display', 'visible' );
    }

    this.currentTick[ level ]++;

    return tick;
  }

  nextTickLabel( callback ) {

    this.ticksLabels = this.ticksLabels || [];
    this.lastCurrentTickLabel = this.lastCurrentTickLabel || 0;
    this.currentTickLabel = this.currentTickLabel || 0;

    if ( this.currentTickLabel >= this.ticksLabels.length ) {

      var tickLabel = document.createElementNS( this.graph.ns, 'text' );
      this.groupTickLabels.appendChild( tickLabel );
      this.ticksLabels.push( tickLabel );
      callback( tickLabel );
    }

    var tickLabel = this.ticksLabels[ this.currentTickLabel ];

    if ( this.currentTickLabel >= this.lastCurrentTickLabel ) {
      tickLabel.setAttribute( 'display', 'visible' );
    }

    this.currentTickLabel++;

    return tickLabel;
  }

  removeUselessTicks() {

    for ( var j in this.currentTick ) {

      for ( var i = this.currentTick[ j ]; i < this.ticks[ j ].length; i++ ) {
        this.ticks[ j ][ i ].setAttribute( 'display', 'none' );
      }

      this.lastCurrentTick[ j ] = this.currentTick[ j ];
      this.currentTick[ j ] = 0;
    }
  }

  removeUselessTickLabels() {

      for ( var i = this.currentTickLabel; i < this.ticksLabels.length; i++ ) {
        this.ticksLabels[ i ].setAttribute( 'display', 'none' );
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

  nextGridLine( primary, x1, x2, y1, y2 ) {

    if ( !( ( primary && this.options.primaryGrid ) || ( !primary && this.options.secondaryGrid ) ) ) {
      return;
    }

    this.gridLinePath[ primary ? "primary" : "secondary" ] += "M " + x1 + " " + y1 + " L " + x2 + " " + y2;
  }

  setGridLineStyle( gridLine, primary ) {

    gridLine.setAttribute( 'shape-rendering', 'crispEdges' );
    gridLine.setAttribute( 'stroke', primary ? this.getPrimaryGridColor() : this.getSecondaryGridColor() );
    gridLine.setAttribute( 'stroke-width', primary ? this.getPrimaryGridWidth() : this.getSecondaryGridWidth() );
    gridLine.setAttribute( 'stroke-opacity', primary ? this.getPrimaryGridOpacity() : this.getSecondaryGridOpacity() );

    var dasharray;
    if ( ( dasharray = primary ? this.getPrimaryGridDasharray() : this.getSecondaryGridDasharray() ) ) {
      gridLine.setAttribute( 'stroke-dasharray', dasharray );
    }

  }

  setGridLinesStyle() {
    this.setGridLineStyle( this.gridPrimary, true );
    this.setGridLineStyle( this.gridSecondary, false );
    return this;
  }

  resetTicksLength() {}

  secondaryTicks() {
    return this.options.nbTicksSecondary;
  }

  drawLogTicks() {
    var min = this.getCurrentMin(),
      max = this.getCurrentMax();
    var incr = Math.min( min, max );
    var max = Math.max( min, max );

    if ( incr < 1e-50 ) {
      incr = 1e-50;
    }

    if ( Math.log( incr ) - Math.log( max ) > 20 ) {
      max = Math.pow( 10, ( Math.log( incr ) * 20 ) );
    }

    var optsMain = {
      fontSize: '1.0em',
      exponential: true,
      overwrite: false
    };
    if ( incr < 0 )
      incr = 0;
    var pow = incr == 0 ? 0 : Math.floor( Math.log( incr ) / Math.log( 10 ) );
    var incr = 1,
      k = 0,
      val;
    while ( ( val = incr * Math.pow( 10, pow ) ) < max ) {
      if ( incr == 1 ) { // Superior power
        if ( val > min )
          this.drawTickWrapper( val, true, 1, optsMain );
      }
      if ( incr == 10 ) {
        incr = 1;
        pow++;
      } else {

        if ( incr != 1 && val > min ) {

          this.drawTickWrapper( val, false, 2, {
            overwrite: "",
            fontSize: '0.6em'
          } );

        }

        incr++;
      }
    }

    this.widthHeightTick = this.getMaxSizeTick();
    return this.widthHeightTick;
  }

  drawTickWrapper( value, label, level, options ) {

    //var pos = this.getPos( value );

    this.drawTick( value, level, options );
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
  linkToAxis( axis, scalingFunction, decimals ) {

    this.linkedToAxis = {
      axis: axis,
      scalingFunction: scalingFunction,
      decimals: decimals ||  1
    };

  }

  drawLinkedToAxisTicksWrapper( widthPx, valrange ) {

    var opts = this.linkedToAxis,
      px = 0,
      val,
      t,
      i = 0,
      l,
      delta2;

    // Redrawing the main axis ? Why ?
    //opts.axis.draw();

    if ( !opts.deltaPx ) {
      opts.deltaPx = 10;
    }

    do {

      val = opts.scalingFunction( opts.axis.getVal( px + this.getMinPx() ) );

      if ( opts.decimals ) {
        this.decimals = opts.decimals;
      }

      t = this.drawTick( val, 1, {}, px + this.getMinPx() );

      if ( !t ) {
        console.log( val, px, this.getMinPx() );
        console.error( "Problem here" );
        break;
      }

      l = String( t[ 1 ].textContent ).length * 8;
      delta2 = Math.round( l / 5 ) * 5;

      if ( delta2 > opts.deltaPx ) {
        opts.deltaPx = delta2;
        //     this.drawInit();
        this.drawLinkedToAxisTicksWrapper( widthPx, valrange );
        return;
      }

      i++;

      px += opts.deltaPx;

    } while ( px < widthPx );
  }

  /**
   * Transform a value into pixels, according to the axis scaling. The value is referenced to the drawing wrapper, not the the axis minimal value
   * @param {Number} value - The value to translate into pixels
   * @memberof Axis
   * @return {Number} The value transformed into pixels
   */
  getPos( value ) {
    return this.getPx( value );
  }

  /**
   * @alias Axis~getPos
   */
  getPx( value ) {
    //      if(this.getMaxPx() == undefined)
    //        console.log(this);
    //console.log(this.getMaxPx(), this.getMinPx(), this.getCurrentInterval());
    // Ex 50 / (100) * (1000 - 700) + 700

    //console.log( value, this.getCurrentMin(), this.getMaxPx(), this.getMinPx(), this.getCurrentInterval() );
    if ( !this.options.logScale ) {

      return ( value - this.getCurrentMin() ) / ( this.getCurrentInterval() ) * ( this.getMaxPx() - this.getMinPx() ) + this.getMinPx();
    } else {
      // 0 if value = min
      // 1 if value = max

      if ( value < 0 )
        return;

      var value = ( ( Math.log( value ) - Math.log( this.getCurrentMin() ) ) / ( Math.log( this.getCurrentMax() ) - Math.log( this.getCurrentMin() ) ) ) * ( this.getMaxPx() - this.getMinPx() ) + this.getMinPx();

      return value;
    }
  }

  /**
   * @alias Axis~getPos
   */
  getRoundedPx( value ) {
    //      if(this.getMaxPx() == undefined)
    //        console.log(this);
    //console.log(this.getMaxPx(), this.getMinPx(), this.getCurrentInterval());
    // Ex 50 / (100) * (1000 - 700) + 700

    //console.log( value, this.getCurrentMin(), this.getMaxPx(), this.getMinPx(), this.getCurrentInterval() );
    return Math.round( this.getPx( value ) * 10 ) / 10;
  }

  /**
   * Transform a pixel position (referenced to the graph zone, not to the axis minimum) into a value, according to the axis scaling.
   * @param {Number} pixels - The number of pixels to translate into a value
   * @memberof Axis
   * @return {Number} The axis value corresponding to the pixel position
   */
  getVal( px ) {

    if ( !this.options.logScale ) {

      return ( px - this.getMinPx() ) / ( this.getMaxPx() - this.getMinPx() ) * this.getCurrentInterval() + this.getCurrentMin();

    } else {

      return Math.exp( ( px - this.getMinPx() ) / ( this.getMaxPx() - this.getMinPx() ) * ( Math.log( this.getCurrentMax() ) - Math.log( this.getCurrentMin() ) ) + Math.log( this.getCurrentMin() ) )
    }
  }

  /**
   * Transform a delta value into pixels
   * @param {Number} value - The value to translate into pixels
   * @return {Number} The value transformed into pixels
   * @example graph.getBottomAxis().forceMin( 20 ).forceMax( 50 ).getRelPx( 2 ); // Returns how many pixels will be covered by 2 units. Let's assume 600px of width, it's ( 2 / 30 ) * 600 = 40px
   */
  getRelPx( delta ) {

    return ( delta / this.getCurrentInterval() ) * ( this.getMaxPx() - this.getMinPx() );
  }

  /**
   * Transform a delta pixels value into value
   * @param {Number} pixels - The pixel to convert into a value
   * @return {Number} The delta value corresponding to delta pixels
   * @see Axis~getRelPx
   * @example graph.getBottomAxis().forceMin( 20 ).forceMax( 50 ).getRelVal( 40 ); // Returns 2 (for 600px width)
   */
  getRelVal( px ) {
    return px / ( this.getMaxPx() - this.getMinPx() ) * this.getCurrentInterval();
  }

  valueToText( value ) {

    if ( this.scientificExponent ) {

      value /= Math.pow( 10, this.scientificExponent );
      return value.toFixed( 1 );

    } else {

      value = value * Math.pow( 10, this.getExponentialFactor() ) * Math.pow( 10, this.getExponentialLabelFactor() );
      if ( this.options.shiftToZero ) {
        value -= this.dataMin;
      }
      if ( this.options.ticklabelratio ) {
        value *= this.options.ticklabelratio;
      }
      if ( this.options.unitModification ) {
        value = this.modifyUnit( value, this.options.unitModification );
        return value;
      }

      var dec = this.decimals - this.getExponentialFactor() - this.getExponentialLabelFactor();

      if ( isNaN( value ) ) {
        return "";
      }

      if ( dec > 0 ) {
        return value.toFixed( dec );
      }

      return value.toFixed( 0 );
    }
  };

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
  valueToHtml( value, noScaling, noUnits ) {

    var text = this.valueToText( value );
    var letter;

    if ( this.options.unitDecade && this.options.unit && this.scientificExponent !== 0 && ( this.scientificExponent = this.getEngineeringExponent( this.scientificExponent ) ) && ( letter = this.getExponentGreekLetter( this.scientificExponent ) ) ) {

      text += letter;

    } else if ( this.scientificExponent !== 0 && !isNaN( this.scientificExponent ) && !noScaling ) {
      text += "x10";
      text += '<sup>' + this.scientificExponent + '</sup>';
    }

    if ( this.options.unit && !noUnits ) {

      text += this.options.unit.replace( /\^([-+0-9]*)/g, "<sup>$1</sup>" );
    }

    return text;
  }

  getModifiedValue( value ) {
    if ( this.options.ticklabelratio ) {
      value *= this.options.ticklabelratio;
    }

    if ( this.options.shiftToZero ) {
      value -= this.getMinValue() * ( this.options.ticklabelratio || 1 );
    }

    return value;
  }

  modifyUnit( value, mode ) {

    var text = "";
    var incr = this.incrTick;

    switch ( mode ) {

      case 'time': // val must be in seconds => transform in hours / days / months
        var max = this.getModifiedValue( this.getMaxValue() ),
          first,
          units = [
            [ 60, 'min' ],
            [ 3600, 'h' ],
            [ 3600 * 24, 'd' ]
          ];
        var umin;
        if ( max < 3600 ) { // to minutes
          umin = 0;
        } else if ( max < 3600 * 24 ) {
          umin = 1;
        } else if ( max < 3600 * 24 * 30 ) {
          umin = 2;
        }

        if ( !units[ umin ] ) {
          return false;
        }

        value = value / units[ umin ][ 0 ];
        var valueRounded = Math.floor( value );
        text = valueRounded + units[ umin ][ 1 ];

        // Addind lower unit for precision
        umin--;
        while ( incr < 1 * units[ umin + 1 ][ 0 ] && umin > -1 ) {

          first = false;
          value = ( value - valueRounded ) * units[ umin + 1 ][ 0 ] / units[ umin ][ 0 ];
          valueRounded = Math.round( value );
          text += " " + valueRounded + units[ umin ][ 1 ];
          umin--;
        }

        break;

      case 'time:min.sec':
        value = value / 60;
        var valueRounded = Math.floor( value );
        var s = ( Math.round( ( value - valueRounded ) * 60 ) + "" );
        s = s.length == 1 ? '0' + s : s;
        text = valueRounded + "." + s;
        break;
    }

    return text;
  }

  getExponentialFactor() {
    return this.options.exponentialFactor;
  }

  setExponentialFactor( value ) {
    this.options.exponentialFactor = value;
  }

  setExponentialLabelFactor( value ) {
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
  setLabel( label ) {
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

  setSpan( _from, _to ) {

    this.options.span = [ _from, _to ];
    return this;
  }

  getSpan() {
    return this.options.span;
  }

  setLevel( level ) {
    this._level = level;
    return this;
  }

  getLevel() {
    return this._level;
  }

  setShift( shift ) {
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
  setTickPosition( pos ) {
    switch ( pos ) {
      case 3:
      case 'outside':
      case Graph.TICKS_OUTSIDE:
        pos = 3;
        break;

      case 2:
      case 'centered':
      case Graph.TICKS_CENTERED:
        pos = 2;
        break;

      default:
      case 1:
      case 'inside':
      case Graph.TICKS_INSIDE:
        pos = 1;
        break;
    }

    this.options.tickPosition = pos;

    switch ( this.options.tickPosition ) {
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
  setGrids( on ) {
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
  setPrimaryGrid( on ) {
    this.options.primaryGrid = on;
    return this;
  }

  /**
   * Displays or hides the axis secondary grid
   * @param {Boolean} on - true to enable the grids, false to disable it
   * @memberof Axis
   * @return {Axis} The current axis
   */
  setSecondaryGrid( on ) {
    this.options.secondaryGrid = on;
    return this;
  }

  /**
   * Enables primary grid
   * @memberof Axis
   * @return {Axis} The current axis
   */
  primaryGridOn() {
    return this.setPrimaryGrid( true );
  }

  /**
   * Disables primary grid
   * @memberof Axis
   * @return {Axis} The current axis
   */
  primaryGridOff() {
    return this.setPrimaryGrid( false );
  }

  /**
   * Enables secondary grid
   * @memberof Axis
   * @return {Axis} The current axis
   */
  secondaryGridOn() {
    return this.setSecondaryGrid( true );
  }

  /**
   * Disables secondary grid
   * @return {Axis} The current axis
   */
  secondaryGridOff() {
    return this.setSecondaryGrid( false );
  }

  /**
   * Enables all the grids
   * @return {Axis} The current axis
   */
  gridsOn() {
    return this.setGrids( true );
  }

  /**
   * Disables all the grids
   * @return {Axis} The current axis
   */
  gridsOff() {
    return this.setGrids( false );
  }

  /**
   * @alias Axis#gridsOff
   */
  turnGridsOff() {
    return this.gridsOff( ...arguments );
  }

  /**
   * @alias Axis#gridsOn
   */
  turnGridsOn() {
    return this.gridsOn( ...arguments );
  }

  /**
   * Sets the axis color
   * @memberof Axis
   * @param {String} color - The color to set the axis
   * @return {Axis} The current axis
   * @since 1.13.2
   */
  setAxisColor( color ) {
    this.options.axisColor = color;
    return this;
  }

  /**
   * Gets the axis color
   * @memberof Axis
   * @return {String} The color of the axis
   * @since 1.13.2
   */
  getAxisColor( color ) {
    return this.options.axisColor || 'black';
  }

  /**
   * Sets the color of the main ticks
   * @memberof Axis
   * @param {String} color - The new color of the primary ticks
   * @return {Axis} The current axis
   * @since 1.13.2
   */
  setPrimaryTicksColor( color ) {
    this.options.primaryTicksColor = color;
    return this;
  }

  /**
   * Gets the color of the main ticks
   * @memberof Axis
   * @return {String} The color of the primary ticks
   * @since 1.13.2
   */
  getPrimaryTicksColor( color ) {
    return this.options.primaryTicksColor || 'black';
  }

  /**
   * Sets the color of the secondary ticks
   * @memberof Axis
   * @param {String} color - The new color of the secondary ticks
   * @return {Axis} The current axis
   * @since 1.13.2
   */
  setSecondaryTicksColor( color ) {
    this.options.secondaryTicksColor = color;
    return this;
  }

  /**
   * Gets the color of the secondary ticks
   * @memberof Axis
   * @return {String} The color of the secondary ticks
   * @since 1.13.2
   */
  getSecondaryTicksColor( color ) {
    return this.options.secondaryTicksColor || 'black';
  }

  /**
   * Sets the color of the tick labels
   * @memberof Axis
   * @param {String} color - The new color of the tick labels
   * @return {Axis} The current axis
   * @since 1.13.2
   */
  setTicksLabelColor( color ) {
    this.options.ticksLabelColor = color;
    return this;
  }

  /**
   * Gets the color of the tick labels
   * @memberof Axis
   * @return {String} The color of the tick labels
   * @since 1.13.2
   */
  getTicksLabelColor( color ) {
    return this.options.ticksLabelColor || 'black';
  }

  /**
   * Sets the color of the primary grid
   * @memberof Axis
   * @param {String} color - The primary grid color
   * @return {Axis} The current axis
   * @since 1.13.3
   */
  setPrimaryGridColor( color ) {
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
  setSecondaryGridColor( color ) {
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
  setPrimaryGridWidth( width ) {
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
  setSecondaryGridWidth( width ) {
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
  setPrimaryGridOpacity( opacity ) {
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
  setSecondaryGridOpacity( opacity ) {
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
  setPrimaryGridDasharray( dasharray ) {
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
  setSecondaryGridDasharray( dasharray ) {
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
  setLabelColor( color ) {
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

  setTickContent( dom, val, options ) {
    if ( !options ) options = {};

    if ( options.overwrite ||  !options.exponential ) {

      dom.textContent = options.overwrite || this.valueToText( val );

    } else {
      var log = Math.round( Math.log( val ) / Math.log( 10 ) );
      var unit = Math.floor( val * Math.pow( 10, -log ) );

      dom.textContent = ( unit != 1 ) ? unit + "x10" : "10";
      var tspan = document.createElementNS( this.graph.ns, 'tspan' );
      tspan.textContent = log;
      tspan.setAttribute( 'font-size', '0.7em' );
      tspan.setAttribute( 'dy', -5 );
      dom.appendChild( tspan );
    }

    if ( options.fontSize ) {
      dom.setAttribute( 'font-size', options.fontSize );
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
  setUnit( unit ) {
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
  setUnitWrapper( before, after ) {
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
  setUnitDecade( on ) {
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
  setScientific( on ) {
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
  setScientificScaleExponent( scientificScaleExponent ) {
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
  setEngineering( engineeringScaling ) { //bool
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
  getEngineeringExponent( scientificExponent ) {

    if ( scientificExponent > 0 ) {
      scientificExponent -= ( scientificExponent % 3 );
    } else {
      scientificExponent -= ( 3 - ( -scientificExponent ) % 3 ) % 3;
    }

    return scientificExponent
  }

  /**
   * Enables log scaling
   * @param {Boolean} logScale - ```true``` to enable the log scaling, ```false``` to disable it
   * @return {Axis} The current axis
   * @memberof Axis
   * @since 1.13.3
   */
  setLogScale( log ) {
    this.options.logScale = log;
    return this;
  }

  isZoomed() {
    return !( this.currentAxisMin == this.getMinValue() || this.currentAxisMax == this.getMaxValue() );
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

export default Axis;