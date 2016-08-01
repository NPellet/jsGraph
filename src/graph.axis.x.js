define( [ './graph.util', './graph.axis' ], function( util, Axis ) {

  "use strict";

  /** 
   * Generic constructor of a y axis
   * @class AxisX
   * @augments Axis
   */
  function AxisX( graph, topbottom, options ) {
    this.top = topbottom == 'top';
  }

  AxisX.prototype = new Axis();

  /**
   *  @memberof AxisX
   *  @private
   *  Returns the position of the axis, used by refreshDrawingZone in core module
   */
  AxisX.prototype.getAxisPosition = function() {

    if ( !this.options.display ) {
      return 0;
    }

    var size = ( this.options.tickPosition == 1 ? 8 : 20 ) + this.graph.options.fontSize * 1;

    if ( this.getLabel() ) {
      size += this.graph.options.fontSize;
    }

    return size;
  };

  /**
   *  @memberof AxisX
   *  @returns {Boolean} always ```true```
   */
  AxisX.prototype.isX = function()  {
    return true;
  };

  /**
   *  @memberof AxisX
   *  @returns {Boolean} always ```false```
   */
  AxisX.prototype.isY = function() {
    return false;
  }

  /**
   *  @memberof AxisX
   *  @private
   *  Used to set the x position of the axis
   */
  AxisX.prototype._setShift = function() {
    if ( this.getShift() === undefined || !this.graph.getDrawingHeight() ) {
      return;
    }

    this.group.setAttribute( 'transform', 'translate(0 ' + ( this.floating ? this.getShift() : ( this.top ? this.shift : ( this.graph.getDrawingHeight() - this.shift ) ) ) + ')' )
  };

  /**
   *  @memberof AxisX
   *  Caclulates the maximum tick height
   *  @return {Number} The maximum tick height
   */
  AxisX.prototype.getMaxSizeTick = function() {
    return ( this.top ? -1 : 1 ) * ( ( this.options.tickPosition == 1 ) ? 10 : 10 )
  };

  /**
   *  @memberof AxisX
   *  Draws a tick. Mostly used internally but it can be useful if you want to make your own axes
   *  @param {Number} value - The value in axis unit to place the tick
   *  @param {Number} level - The importance of the tick
   *  @param {Object} options - Further options to be passed to ```setTickContent```
   *  @param {Number} forcedPos - Forces the position of the tick (for axis dependency)
   */
  AxisX.prototype.drawTick = function( value, level, options, forcedPos ) {

    var self = this,
      val;

    val = forcedPos || this.getPos( value );

    if ( val == undefined || isNaN( val ) ) {
      return;
    }

    var tick = this.nextTick( level, function( tick ) {

      tick.setAttribute( 'y1', ( self.top ? 1 : -1 ) * self.tickPx1 * self.tickScaling[ level ] );
      tick.setAttribute( 'y2', ( self.top ? 1 : -1 ) * self.tickPx2 * self.tickScaling[ level ] );

      if ( level == 1 ) {
        tick.setAttribute( 'stroke', self.getPrimaryTicksColor() );
      } else {
        tick.setAttribute( 'stroke', self.getSecondaryTicksColor() );
      }

    } );

    //      tick.setAttribute( 'shape-rendering', 'crispEdges' );
    tick.setAttribute( 'x1', val );
    tick.setAttribute( 'x2', val );

    this.nextGridLine( level == 1, val, val, 0, this.graph.getDrawingHeight() );

    //  this.groupTicks.appendChild( tick );
    if ( level == 1 ) {
      var tickLabel = this.nextTickLabel( function( tickLabel ) {

        tickLabel.setAttribute( 'y', ( self.top ? -1 : 1 ) * ( ( self.options.tickPosition == 1 ? 8 : 20 ) + ( self.top ? 10 : 0 ) ) );
        tickLabel.setAttribute( 'text-anchor', 'middle' );
        if ( self.getTicksLabelColor() !== 'black' ) {
          tickLabel.setAttribute( 'fill', self.getTicksLabelColor() );
        }
        tickLabel.style.dominantBaseline = 'hanging';
      } );

      tickLabel.setAttribute( 'x', val );
      this.setTickContent( tickLabel, value, options );

    }
    //    this.ticks.push( tick );

    return [ tick, tickLabel ];
  };

  /**
   *  @memberof AxisX
   *  Paints the label, the axis line and anything else specific to x axes
   */
  AxisX.prototype.drawSpecifics = function() {

    // Adjusts group shift
    //this.group.setAttribute('transform', 'translate(0 ' + this.getShift() + ')');

    // Place label correctly

    this.label.setAttribute( 'text-anchor', 'middle' );
    this.label.setAttribute( 'x', Math.abs( this.getMaxPx() + this.getMinPx() ) / 2 );
    this.label.setAttribute( 'y', ( this.top ? -1 : 1 ) * ( ( this.options.tickPosition == 1 ? 10 : 25 ) + this.graph.options.fontSize ) );
    this.labelTspan.textContent = this.getLabel();

    this.line.setAttribute( 'x1', this.getMinPx() );
    this.line.setAttribute( 'x2', this.getMaxPx() );
    this.line.setAttribute( 'y1', 0 );
    this.line.setAttribute( 'y2', 0 );

    this.line.setAttribute( 'stroke', this.getAxisColor() );

    if ( !this.top ) {

      this.labelTspan.style.dominantBaseline = 'hanging';
      this.expTspan.style.dominantBaseline = 'hanging';
      this.expTspanExp.style.dominantBaseline = 'hanging';

      this.unitTspan.style.dominantBaseline = 'hanging';
      this.preunitTspan.style.dominantBaseline = 'hanging';

    }
  };

  /**
   *  @memberof AxisX
   *  @private
   */
  AxisX.prototype._draw0Line = function( px ) {

    if ( !this._0line ) {
      this._0line = document.createElementNS( this.graph.ns, 'line' );
    }
    this._0line.setAttribute( 'x1', px );
    this._0line.setAttribute( 'x2', px );

    this._0line.setAttribute( 'y1', 0 );
    this._0line.setAttribute( 'y2', this.getMaxPx() );

    this._0line.setAttribute( 'stroke', 'black' );
    this.groupGrids.appendChild( this._0line );
  };

  /**
   *  @memberof AxisX
   *  @private
   */
  AxisX.prototype.handleMouseMoveLocal = function( x, y, e ) {
    x -= this.graph.getPaddingLeft();
    this.mouseVal = this.getVal( x );
  };

  /**
   *  @memberof AxisX
   *  Caches the minimum px and maximum px position of the axis. Includes axis spans and flipping. Mostly used internally
   */
  AxisX.prototype.setMinMaxFlipped = function() {

    var interval = this.maxPx - this.minPx;
    var maxPx = interval * this.options.span[ 1 ] + this.minPx;
    var minPx = interval * this.options.span[ 0 ] + this.minPx;

    this.minPxFlipped = this.isFlipped() ? maxPx : minPx;
    this.maxPxFlipped = this.isFlipped() ? minPx : maxPx;

  };

  return AxisX;
} );