import Axis from './graph.axis'



  /** 
   * Generic constructor of a y axis
   * @class AxisY
   * @augments Axis
   */
  function AxisY( graph, leftright, options ) {

    // this.init( graph, options );

    this.leftright = leftright;
    this.left = leftright == 'left';

  }

  AxisY.prototype = new Axis();

  /**
   *  @memberof AxisY
   *  @private
   */
  AxisY.prototype.getAxisPosition = function() {

    if ( !this.options.display ) {
      return 0;
    }
    return ( this.options.tickPosition == 1 ? 15 : 0 );
  };

  /**
   *  @memberof AxisY
   *  @private
   */
  AxisY.prototype.getAxisWidthHeight = function() {
    return 15;
  };

  /**
   *  @memberof AxisY
   *  @returns {Boolean} always ```false```
   */
  AxisY.prototype.isX = function()  {
    return false;
  };

  /**
   *  @memberof AxisY
   *  @returns {Boolean} always ```true```
   */
  AxisY.prototype.isY = function() {
    return true;
  }

  /**
   *  @memberof AxisY
   *  @private
   */
  AxisY.prototype.resetTicksLength = function() {
    this.longestTick = [ false, 0 ];
  };

  /**
   *  @memberof AxisY
   *  @private
   */
  AxisY.prototype.getMaxSizeTick = function() {

    return ( this.longestTick && this.longestTick[ 0 ] ? this.longestTick[ 0 ].getComputedTextLength() : 0 ) + 10; //(this.left ? 10 : 0);
  };

  /**
   *  @memberof AxisY
   *  @private
   */
  AxisY.prototype.drawTick = function( value, level, options, forcedPos ) {
    var pos;

    var self = this,
      group = this.groupTicks,
      tickLabel;

    pos = forcedPos || this.getPos( value );

    if ( pos == undefined || isNaN( pos ) ) {
      return;
    }

    var tick = this.nextTick( level, function( tick ) {

      tick.setAttribute( 'x1', ( self.left ? 1 : -1 ) * self.tickPx1 * self.tickScaling[ level ] );
      tick.setAttribute( 'x2', ( self.left ? 1 : -1 ) * self.tickPx2 * self.tickScaling[ level ] );

      if ( level == 1 ) {
        tick.setAttribute( 'stroke', self.getPrimaryTicksColor() );
      } else {
        tick.setAttribute( 'stroke', self.getSecondaryTicksColor() );
      }

    } );

    tick.setAttribute( 'y1', pos );
    tick.setAttribute( 'y2', pos );

    this.nextGridLine( level == 1, 0, this.graph.getDrawingWidth(), pos, pos );

    //  this.groupTicks.appendChild( tick );
    if ( level == 1 ) {
      var tickLabel = this.nextTickLabel( function( tickLabel ) {

        tickLabel.setAttribute( 'x', self.left ? -10 : 10 );
        if ( self.getTicksLabelColor() !== 'black' ) {
          tickLabel.setAttribute( 'fill', self.getTicksLabelColor() );
        }

        if ( self.left ) {
          tickLabel.setAttribute( 'text-anchor', 'end' );
        } else {
          tickLabel.setAttribute( 'text-anchor', 'start' );
        }
        tickLabel.style.dominantBaseline = 'central';

      } );

      tickLabel.setAttribute( 'y', pos );
      this.setTickContent( tickLabel, value, options );

      if ( String( tickLabel.textContent ).length >= this.longestTick[ 1 ] ) {
        this.longestTick[ 0 ] = tickLabel;
        this.longestTick[ 1 ] = String( tickLabel.textContent ).length;

      }
    }

  };

  /**
   *  @memberof AxisY
   *  @private
   */
  AxisY.prototype.drawSpecifics = function() {
    // Place label correctly
    //this.label.setAttribute('x', (this.getMaxPx() - this.getMinPx()) / 2);

    this.label.setAttribute( 'transform', 'translate(' + ( ( this.left ? 1 : -1 ) * ( -this.widthHeightTick - 10 - 5 ) ) + ', ' + ( Math.abs( this.getMaxPx() + this.getMinPx() ) / 2 ) + ') rotate(-90)' );

    if ( this.getLabelColor() !== 'black' ) {
      this.label.setAttribute( 'fill', this.getLabelColor() );
    }

    this.labelTspan.textContent = this.getLabel();

    if ( !this.left ) {
      this.labelTspan.style.dominantBaseline = 'hanging';
      this.expTspan.style.dominantBaseline = 'hanging';
      this.expTspanExp.style.dominantBaseline = 'hanging';

      this.unitTspan.style.dominantBaseline = 'hanging';
      this.preunitTspan.style.dominantBaseline = 'hanging';

    }

    this.line.setAttribute( 'y1', this.getMinPx() );
    this.line.setAttribute( 'y2', this.getMaxPx() );
    this.line.setAttribute( 'x1', 0 );
    this.line.setAttribute( 'x2', 0 );

    this.line.setAttribute( 'stroke', this.getAxisColor() );

  };

  /**
   *  @memberof AxisY
   *  @private
   */
  AxisY.prototype._setShift = function() {

    if ( !this.getShift() ||  !this.graph.getWidth() ) {
      return;
    }

    var xshift = this.floating ? this.getShift() : ( this.isLeft() ? this.getShift() : this.graph.getWidth() - this.graph.getPaddingRight() - this.graph.getPaddingLeft() - this.getShift() );
    this.group.setAttribute( 'transform', 'translate( ' + xshift + ' 0 )' );
  };

  /**
   *  @memberof AxisY
   *  @private
   */
  AxisY.prototype.isLeft = function() {
    return this.left;
  };

  /**
   *  @memberof AxisY
   *  @private
   */
  AxisY.prototype.isRight = function() {
    return !this.left;
  };

  /**
   *  @memberof AxisY
   *  @private
   */
  AxisY.prototype.isFlipped = function() {
    return !this.options.flipped;
  };

  /**
   *  @memberof AxisY
   *  @private
   */
  AxisY.prototype._draw0Line = function( px ) {

    if ( !this._0line ) {
      this._0line = document.createElementNS( this.graph.ns, 'line' );
    }

    this._0line.setAttribute( 'y1', px );
    this._0line.setAttribute( 'y2', px );

    this._0line.setAttribute( 'x1', 0 );
    this._0line.setAttribute( 'x2', this.graph.getDrawingWidth() );

    this._0line.setAttribute( 'stroke', 'black' );
    this.groupGrids.appendChild( this._0line );
  };

  /**
   *  @memberof AxisY
   *  @private
   */
  AxisY.prototype.handleMouseMoveLocal = function( x, y, e ) {
    y -= this.graph.getPaddingTop();
    this.mouseVal = this.getVal( y );
  };

  /**
   * Scales the axis with respect to the series contained in an x axis
   * @memberof AxisY
   * @param {Axis} [ axis = graph.getXAxis() ] - The X axis to use as a reference
   * @param {GraphSerie} [ excludeSerie ] - A serie to exclude
   * @param {Number} [ start = xaxis.getCurrentMin() ] - The start of the boundary
   * @param {Number} [ end = xaxis.getCurrentMax() ] - The end of the boundary
   * @param {Boolean} [ min = true ] - Adapt the min
   * @param {Boolean} [ max = true ] - Adapt the max
   * @returns {Axis} The current axis
   */
  AxisY.prototype.scaleToFitAxis = function( axis, excludeSerie, start, end, min, max ) {
    //console.log( axis instanceof GraphAxis );
    if ( !axis ||  !axis.isX() ) {
      axis = this.graph.getXAxis();
    }

    if ( isNaN( start ) ) {
      start = axis.getCurrentMin();
    }

    if ( isNaN( end ) ) {
      end = axis.getCurrentMax();
    }

    if ( min === undefined ) {
      min = true;
    }

    if ( max === undefined ) {
      max = true;
    }

    if ( typeof excludeSerie == "number" ) {
      end = start;
      start = excludeSerie;
      excludeSerie = false;
    }

    var maxV = -Infinity,
      minV = Infinity,
      j = 0;

    for ( var i = 0, l = this.graph.series.length; i < l; i++ ) {

      if ( !this.graph.series[ i ].isShown() ) {
        continue;
      }

      if ( this.graph.series[ i ] == excludeSerie ) {
        continue;
      }

      if ( !( this.graph.series[ i ].getXAxis() == axis ) || ( this.graph.series[ i ].getYAxis() !== this ) ) {
        continue;
      }

      j++;

      maxV = max ? Math.max( maxV, this.graph.series[ i ].getMax( start, end ) ) : 0;
      minV = min ? Math.min( minV, this.graph.series[ i ].getMin( start, end ) ) : 0;
    }

    if ( j == 0 ) {

      this.setMinMaxToFitSeries(); // No point was found

    } else {

      // If we wanted originally to resize min and max. Otherwise we use the current value
      minV = min ? minV : this.getCurrentMin();
      maxV = max ? maxV : this.getCurrentMax();

      var interval = maxV - minV;

      minV -= ( this.options.axisDataSpacing.min * interval );
      maxV += ( this.options.axisDataSpacing.max * interval );

      this._doZoomVal( minV, maxV );
    }

    return this;
  };

  /**
   *  @memberof AxisY
   *  Caches the minimum px and maximum px position of the axis. Includes axis spans and flipping. Mostly used internally
   *  @return {Axis} The current axis instance
   */
  AxisY.prototype.setMinMaxFlipped = function() {

    var interval = this.maxPx - this.minPx;
    var maxPx = this.maxPx - interval * this.options.span[ 0 ];
    var minPx = this.maxPx - interval * this.options.span[ 1 ];

    this.minPxFlipped = this.isFlipped() ? maxPx : minPx;
    this.maxPxFlipped = this.isFlipped() ? minPx : maxPx;

  }

  export default AxisY;

