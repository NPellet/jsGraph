import Axis from './graph.axis'

/** 
 * Generic constructor of a y axis
 * @extends Axis
 */
class AxisY extends Axis {

  constructor( graph, leftright, options ) {

    super( graph, leftright, options );
    this.leftright = leftright;
    this.left = leftright == 'left';

  }

  /**
   *  @private
   */
  setAxisPosition( shift ) {
    this.shiftPosition = shift;
  }

  getAxisPosition( shift ) {
    return this.shiftPosition ||  0;
  }

  getAdditionalWidth() {
    let pos = 0;
    if ( this.getLabel() ) {
      pos += this.graph.options.fontSize;
    }

    if ( this.isShown() ) {
      pos += Math.abs( this.tickMargin );
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
    this.longestTick = [ false, 0 ];
  }

  /**
   *  @private
   */
  getMaxSizeTick() { // Gives an extra margin of 5px
    return ( this.longestTick && this.longestTick[ 0 ] ? this.longestTick[ 0 ].getComputedTextLength() + 5 : 0 ); //(this.left ? 10 : 0);
  }

  draw() {

    this.tickMargin = ( this.left ? -5 - this.tickPx1 * this.tickScaling[ 1 ] : 5 + this.tickPx1 * this.tickScaling[ 1 ] );
    var tickWidth = super.draw( ...arguments );
    tickWidth += this.getAdditionalWidth();
    this.drawSpecifics( tickWidth );

    this.fullwidthlabel = tickWidth;

    return tickWidth;
  }

  equalizePosition( width ) {

    this.placeLabel( this.left ? -width : width );

    if ( this.getLabel() ) {
      return width + this.graph.options.fontSize;
    }

    return 0;
  }

  /**
   *  @private
   */
  drawTick( value, level, options, forcedPos ) {
    var pos;

    var self = this,
      group = this.groupTicks,
      tickLabel;

    pos = forcedPos || this.getPos( value );

    if ( pos == undefined || isNaN( pos ) ) {
      return;
    }

    var tick = this.nextTick( level, ( tick ) => {

      tick.setAttribute( 'x1', ( this.left ? 1 : -1 ) * this.tickPx1 * this.tickScaling[ level ] );
      tick.setAttribute( 'x2', ( this.left ? 1 : -1 ) * this.tickPx2 * this.tickScaling[ level ] );

      if ( level == 1 ) {
        tick.setAttribute( 'stroke', this.getPrimaryTicksColor() );
      } else {
        tick.setAttribute( 'stroke', this.getSecondaryTicksColor() );
      }

    } );

    tick.setAttribute( 'y1', pos );
    tick.setAttribute( 'y2', pos );

    this.nextGridLine( level == 1, 0, this.graph.getDrawingWidth(), pos, pos );

    //  this.groupTicks.appendChild( tick );
    if ( level == 1 ) {
      var tickLabel = this.nextTickLabel( ( tickLabel ) => {

        tickLabel.setAttribute( 'x', this.tickMargin );
        if ( this.getTicksLabelColor() !== 'black' ) {
          tickLabel.setAttribute( 'fill', this.getTicksLabelColor() );
        }

        if ( this.left ) {
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
  }

  drawLabel() {

    if ( this.getLabelColor() !== 'black' ) {
      this.label.setAttribute( 'fill', this.getLabelColor() );
    }

    this.label.setAttribute( 'dominant-baseline', !this.left ? 'hanging' : 'auto' );
    this.labelTspan.textContent = this.getLabel();
  }

  placeLabel( y ) {
    this.label.setAttribute( 'transform', 'translate(' + y + ', ' + ( Math.abs( this.getMaxPx() + this.getMinPx() ) / 2 ) + ') rotate(-90)' );
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
    this.line.setAttribute( 'y1', this.getMinPx() );
    this.line.setAttribute( 'y2', this.getMaxPx() );
    this.line.setAttribute( 'x1', 0 );
    this.line.setAttribute( 'x2', 0 );

    this.line.setAttribute( 'stroke', this.getAxisColor() );

    var span = this.getSpan();
    this.line.setAttribute( 'marker-start', ( !this.options.splitMarks ||  span[ 0 ] == 0 ? "" : "url(#verticalsplit_" + this.graph.getId() + ")" ) );
    this.line.setAttribute( 'marker-end', ( !this.options.splitMarks ||  span[ 1 ] == 1 ? "" : "url(#verticalsplit_" + this.graph.getId() + ")" ) );
  }

  /**
   *  @private
   */
  setShift( shift ) {

    this.shift = shift;

    if ( !this.shift ||  !this.graph.getWidth() ) {
      return;
    }

    let xshift = this.shift;
    xshift = this.floating ? xshift : ( this.isLeft() ? xshift : this.graph.getWidth() - this.graph.getPaddingRight() - this.graph.getPaddingLeft() - xshift );
    this.group.setAttribute( 'transform', 'translate( ' + xshift + ' 0 )' );
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
  _draw0Line( px ) {

    if ( !this._0line ) {
      this._0line = document.createElementNS( this.graph.ns, 'line' );
    }

    this._0line.setAttribute( 'y1', px );
    this._0line.setAttribute( 'y2', px );

    this._0line.setAttribute( 'x1', 0 );
    this._0line.setAttribute( 'x2', this.graph.getDrawingWidth() );

    this._0line.setAttribute( 'stroke', 'black' );
    this.groupGrids.appendChild( this._0line );
  }

  /**
   *  @private
   */
  handleMouseMoveLocal( x, y, e ) {
    y -= this.graph.getPaddingTop();
    this.mouseVal = this.getVal( y );
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
  scaleToFitAxis( axis, excludeSerie, start, end, min, max ) {
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
  }

  /**
   *  Caches the minimum px and maximum px position of the axis. Includes axis spans and flipping. Mostly used internally
   *  @return {Axis} The current axis instance
   */
  setMinMaxFlipped() {

    var interval = this.maxPx - this.minPx;

    if ( isNaN( interval ) ) {
      return;
    }

    var maxPx = this.maxPx - interval * this.options.span[ 0 ] - this.options.marginMin;
    var minPx = this.maxPx - interval * this.options.span[ 1 ] + this.options.marginMax;

    this.minPxFlipped = this.isFlipped() ? maxPx : minPx;
    this.maxPxFlipped = this.isFlipped() ? minPx : maxPx;

  }

}

export default AxisY;