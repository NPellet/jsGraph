import * as util from '../graph.util.js';
import ErrorBarMixin from '../mixins/graph.mixin.errorbars.js';

import SerieScatter from './graph.serie.scatter.js';

const type = 'line';

const defaultOptions = {
  /**
   * @name SerieLineDefaultOptions
   * @object
   * @static
   * @memberof SerieLine
   */

  // Extends scatterSerie
  markers: false,

  lineColor: 'black',
  lineStyle: 1,
  lineWidth: 1,

  trackMouse: false,
  lineToZero: false,
  selectableOnClick: false,
  overflowX: false,
  overflowY: false
};

/**
 * Serie line
 * @example graph.newSerie( name, options, "line" );
 * @see Graph#newSerie
 * @extends Serie
 */
class SerieLine extends SerieScatter {
  constructor( graph, name, options, defaultInherited ) {
    super(
      graph,
      name,
      options,
      util.extend( true, {}, defaultOptions, defaultInherited )
    );

    this.selectionType = 'unselected';
    this._type = type;
    util.mapEventEmission( this.options, this ); // Register events

    // Creates an empty style variable
    this.styles = {};

    // Unselected style
    this.styles.unselected = {
      lineColor: this.options.lineColor,
      lineStyle: this.options.lineStyle,
      lineWidth: this.options.lineWidth
    };

    this.styles.selected = {
      lineWidth: 3
    };

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

    this.groupLines = document.createElementNS( this.graph.ns, 'g' );
    this.domMarker = document.createElementNS( this.graph.ns, 'path' );

    if ( !this.domMarker.style ) {
      this.domMarker.style = {
        cursor: 'pointer'
      };
    } else {
      this.domMarker.style.cursor = 'pointer';
    }

    this.additionalData = {};

    this.marker = document.createElementNS( this.graph.ns, 'circle' );
    this.marker.setAttribute( 'fill', 'black' );
    this.marker.setAttribute( 'r', 3 );
    this.marker.setAttribute( 'display', 'none' );

    this.markerLabel = document.createElementNS( this.graph.ns, 'text' );
    this.markerLabelSquare = document.createElementNS( this.graph.ns, 'rect' );
    this.markerLabelSquare.setAttribute( 'fill', 'white' );
    this.domMarkerHover = {};
    this.domMarkerSelect = {};
    this.markerHovered = 0;
    this.groupMarkerSelected = document.createElementNS( this.graph.ns, 'g' );

    this.markerPoints = {};

    //this.scale = 1;
    //this.shift = 0;
    this.lines = [];

    this.groupMain.appendChild( this.groupLines );

    this.groupMain.appendChild( this.marker );

    this.groupMain.appendChild( this.groupMarkerSelected );
    this.groupMain.appendChild( this.markerLabelSquare );
    this.groupMain.appendChild( this.markerLabel );

    this.independantMarkers = [];

    if ( this.initExtended1 ) {
      this.initExtended1();
    }

    this.groupLines.addEventListener( 'click', ( e ) => {
      if ( this.options.selectableOnClick ) {
        if ( this.isSelected() ) {
          this.graph.unselectSerie( this );
        } else {
          this.graph.selectSerie( this );
        }
      }
    } );
  }

  postInit() {
    this.extendStyles();
  }

  /**
   * Sets the options of the serie
   * @see SerieLineDefaultOptions
   * @param {Object} options - A object containing the options to set
   * @return {SerieLine} The current serie
   * @memberof SerieLine
   */
  setOptions( options ) {
    //this.options = util.extend( true, {}, SerieLine.prototype.defaults, ( options || {} ) );
    // Unselected style
    /*this.styles.unselected = {
      lineColor: this.options.lineColor,
      lineStyle: this.options.lineStyle
    };
*/
    this.applyLineStyles();
    return this;
  }

  onMouseWheel() {}

  /**
   * Cleans the DOM from the serie internal object (serie and markers). Mostly used internally when a new {@link Serie#setData} is called
   * @returns {SerieLine} The current serie
   * @memberof SerieLine
   */
  empty() {
    for ( var i = 0, l = this.lines.length; i < l; i++ ) {
      this.groupLines.removeChild( this.lines[ i ] );
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
  select( selectionType = 'selected' ) {
    this.selected = selectionType !== 'unselected';
    this.selectionType = selectionType;

    this.applyLineStyles();
    this.applyLineStyle( this.getSymbolForLegend() );

    super.select( selectionType );

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
    super.unselect();
    return this.select( 'unselected' );
  }

  /**
   * Computes and returns a line SVG element with the same line style as the serie, or width 20px
   * @returns {SVGElement}
   * @memberof SerieLine
   */
  getSymbolForLegend() {
    const container = this._getSymbolForLegendContainer();

    if ( !this.lineForLegend ) {
      var line = document.createElementNS( this.graph.ns, 'line' );
      this.applyLineStyle( line );

      line.setAttribute( 'x1', 5 );
      line.setAttribute( 'x2', 25 );
      line.setAttribute( 'y1', 0 );
      line.setAttribute( 'y2', 0 );

      line.setAttribute( 'cursor', 'pointer' );

      this.lineForLegend = line;
      container.appendChild( this.lineForLegend );
    } else {
      this.applyLineStyle( this.lineForLegend );
    }

    super.getSymbolForLegend();

    return this.lineForLegend;
  }

  /**
   * Degrades the data of the serie. This option is used for big data sets that have monotoneously increasing (or decreasing) x values.
   * For example, a serie containing 1'000'000 points, displayed over 1'000px, will have 1'000 points per pixel. Often it does not make sense to display more than 2-3 points per pixel.
   * <code>degrade( pxPerPoint )</code> allows a degradation of the serie, based on a a number of pixel per point. It computes the average of the data that would be displayed over each pixel range
   * Starting from jsGraph 2.0, it does not calculate the minimum and maximum and creates the zone serie anymore
   * @return {SerieLine} The current serie instance
   * @example serie.degrade( 0.5 ); // Will display 2 points per pixels
   * @memberof SerieLine
   */
  degrade( pxPerP ) {
    this.degradationPx = pxPerP;
    return this;
  }

  drawInit( force ) {
    var data, xData;

    try {
      this.axisCheck();
    } catch ( e ) {
      console.warn( e );
      return false;
    }

    this.currentLineId = 0;
    this.counter = 0;
    this._drawn = true;
    this.currentLine = '';

    // Degradation

    if ( this.waveform ) {
      if ( this.degradationPx ) {
        this.waveform.resampleForDisplay( {
          resampleToPx: this.degradationPx,
          xPosition: this.getXAxis().getPx.bind( this.getXAxis() ),
          minX: this.getXAxis().getCurrentMin(),
          maxX: this.getXAxis().getCurrentMax()
        } );

        this._dataToUse = [ this.waveform.getDataToUseFlat() ];
      } else if ( this.waveform.hasAggregation() ) {
        let xaxis = this.getXAxis(),
          numberOfPointsInTotal =
          ( this.graph.getDrawingWidth() *
            ( xaxis.getDataMax() - xaxis.getDataMin() ) ) /
          ( xaxis.getCurrentMax() - xaxis.getCurrentMin() ),
          promise = this.waveform.selectAggregatedData( numberOfPointsInTotal );

        if ( promise instanceof Promise ) {
          promise.then( () => {
            this.draw( force );
          } );

          return false;
        } else if ( promise === false ) {
          return false;
        } else {
          this._dataToUse = this.waveform.getDataToUseFlat();
        }
      }

      //    this._dataToUse = this.waveform.getDataToUseFlat();
    } else {
      this._dataToUse = this.data;
      this._xDataToUse = this.xData;
    }

    return true;
  }

  removeLinesGroup() {
    this._afterLinesGroup = this.groupLines.nextSibling;
    this.groupMain.removeChild( this.groupLines );
  }

  insertLinesGroup() {
    if ( !this._afterLinesGroup ) {
      throw 'Could not find group after lines to insertion.';
    }

    this.groupMain.insertBefore( this.groupLines, this._afterLinesGroup );
    this._afterLinesGroup = false;
  }

  removeExtraLines() {
    var i = this.currentLineId,
      l = this.lines.length;

    for ( ; i < l; i++ ) {
      this.groupLines.removeChild( this.lines[ i ] );
    }

    this.lines.splice( this.currentLineId, l - this.currentLineId );
    this.currentLineId = 0;
  }

  /**
   * Draws the serie
   * @memberof SerieLine
   */
  draw( force ) {
    // Serie redrawing

    if ( !this.getXAxis() || !this.getYAxis() ) {
      throw 'No axes were defined for this serie';
    }
    if ( force || this.hasDataChanged() ) {
      super.draw( force );

      if ( !this.drawInit( force ) ) {
        return;
      }

      var data = this._dataToUse,
        xData = this._xDataToUse,
        slotToUse = this._slotToUse;

      this.removeLinesGroup();

      this.lookForMaxima = true;
      this.lookForMinima = false;

      this.pos0 = this.getYAxis().getPos(
        Math.max( 0, this.getYAxis().getCurrentMin() )
      );

      if ( this.hasErrors() ) {
        this.errorDrawInit();
      }

      this._draw();

      if ( this.hasErrors() ) {
        this.errorDraw();
      }

      this.removeExtraLines();

      this.insertLinesGroup();
    }

    // Unhovers everything
    for ( var i in this.domMarkerHover ) {
      this.toggleMarker( i.split( ',' ), false, true );
    }

    // Deselects everything
    for ( var i in this.domMarkerSelect ) {
      this.toggleMarker( i.split( ',' ), false, false );
    }

    this.applyLineStyle( this.getSymbolForLegend() );

    if ( this.hasStyleChanged( this.selectionType ) ) {
      this.updateStyle();
    }

    this.dataHasChanged( false );
    super.afterDraw();
  }

  _draw() {
    let waveform = this.waveform,
      data,
      x,
      y,
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

    if ( !waveform ) {
      return;
    }

    data = waveform.getData( true );

    // Y crossing
    let yLeftCrossingRatio,
      yLeftCrossing,
      yRightCrossingRatio,
      yRightCrossing,
      xTopCrossingRatio,
      xTopCrossing,
      xBottomCrossingRatio,
      xBottomCrossing,
      /*xshift = waveform.getXShift(),
      xscale = wave.getXScale(),*/
      yshift = waveform.getShift(),
      yscale = waveform.getScale();

    let pointOutside = false;
    let lastPointOutside = false;
    let pointOnAxis;

    let _monotoneous = this.isMonotoneous();

    let i = 0,
      l = waveform.getLength();

    this.currentLine = '';

    if ( waveform.isXMonotoneous() ) {
      if ( waveform.isXMonotoneousAscending() ) {
        try {
          i = waveform.getIndexFromX( xMin, true ) || 0;
          l = waveform.getIndexFromX( xMax, true );
        } catch ( e ) {
          l = waveform.getLength();
        }
      } else {
        try {
          i = waveform.getIndexFromX( xMax, true ) || 0;
          l = waveform.getIndexFromX( xMin, true );
        } catch ( e ) {
          l = waveform.getLength();
        }
      }

      l += 2;
      if ( l > data.length ) {
        l = data.length;
      }
    }

    for ( ; i < l; i += 1 ) {
      x = waveform.getX( i, true );
      y = data[ i ] * yscale + yshift;

      if ( x != x || y != y ) {
        // NaN checks
        this._createLine();
        continue;
      }

      if (
        ( !this.options.overflowX && x < xMin && lastX < xMin ) ||
        ( !this.options.overflowX && x > xMax && lastX > xMax ) ||
        ( ( ( !this.options.overflowY && y < yMin && lastY < yMin ) ||
            ( !this.options.overflowY && y > yMax && lastY > yMax ) ) &&
          !this.options.lineToZero )
      ) {
        lastX = x;
        lastY = y;
        lastPointOutside = true;
        continue;
      }

      this.counter2 = i;

      if ( this.options.lineToZero ) {
        if ( y > yMax ) {
          y = yMax;
        }
        if ( y < yMin ) {
          y = yMin;
        }
      }

      xpx2 = this.getX( x );
      ypx2 = this.getY( y );
      //xpx2 = 0;
      //ypx2 = 0;

      if ( xpx2 == xpx && ypx2 == ypx ) {
        continue;
      }

      if ( xpx2 != xpx2 || ypx2 != ypx2 ) {
        // NaN checks
        if ( this.counter > 0 ) {
          this._createLine();
        }
        continue;
      }

      if ( !_monotoneous ) {
        pointOutside =
          ( !this.options.overflowX && ( x < xMin || x > xMax ) ) ||
          ( !this.options.overflowY && ( y < yMin || y > yMax ) );
      } else {
        pointOutside = !this.options.overflowY && ( y < yMin || y > yMax );
      }

      if ( this.options.lineToZero ) {
        pointOutside = x < xMin || x > xMax;

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

            if (
              yLeftCrossingRatio < 1 &&
              yLeftCrossingRatio > 0 &&
              yLeftCrossing !== false &&
              yLeftCrossing < yMax &&
              yLeftCrossing > yMin
            ) {
              pointOnAxis.push( [ xMin, yLeftCrossing ] );
            }

            if (
              yRightCrossingRatio < 1 &&
              yRightCrossingRatio > 0 &&
              yRightCrossing !== false &&
              yRightCrossing < yMax &&
              yRightCrossing > yMin
            ) {
              pointOnAxis.push( [ xMax, yRightCrossing ] );
            }

            if (
              xTopCrossingRatio < 1 &&
              xTopCrossingRatio > 0 &&
              xTopCrossing !== false &&
              xTopCrossing < xMax &&
              xTopCrossing > xMin
            ) {
              pointOnAxis.push( [ xTopCrossing, yMin ] );
            }

            if (
              xBottomCrossingRatio < 1 &&
              xBottomCrossingRatio > 0 &&
              xBottomCrossing !== false &&
              xBottomCrossing < xMax &&
              xBottomCrossing > xMin
            ) {
              pointOnAxis.push( [ xBottomCrossing, yMax ] );
            }

            if ( pointOnAxis.length > 0 ) {
              if ( !pointOutside ) {
                // We were outside and now go inside

                if ( pointOnAxis.length > 1 ) {
                  console.error( 'Programmation error. Please e-mail me.' );
                  console.log(
                    pointOnAxis,
                    xBottomCrossing,
                    xTopCrossing,
                    yRightCrossing,
                    yLeftCrossing,
                    y,
                    yMin,
                    yMax,
                    lastY
                  );
                }

                this._createLine();
                this._addPoint(
                  this.getX( pointOnAxis[ 0 ][ 0 ] ),
                  this.getY( pointOnAxis[ 0 ][ 1 ] ),
                  pointOnAxis[ 0 ][ 0 ],
                  pointOnAxis[ 0 ][ 1 ],
                  false,
                  false,
                  false
                );
                this._addPoint( xpx2, ypx2, lastX, lastY, false, false, true );
              } else if ( !lastPointOutside ) {
                // We were inside and now go outside

                if ( pointOnAxis.length > 1 ) {
                  console.error( 'Programmation error. Please e-mail me.' );
                  console.log(
                    pointOnAxis,
                    xBottomCrossing,
                    xTopCrossing,
                    yRightCrossing,
                    yLeftCrossing,
                    y,
                    yMin,
                    yMax,
                    lastY
                  );
                }

                this._addPoint(
                  this.getX( pointOnAxis[ 0 ][ 0 ] ),
                  this.getY( pointOnAxis[ 0 ][ 1 ] ),
                  pointOnAxis[ 0 ][ 0 ],
                  pointOnAxis[ 0 ][ 1 ],
                  false,
                  false,
                  false
                );
              } else {
                // No crossing: do nothing
                if ( pointOnAxis.length == 2 ) {
                  this._createLine();

                  this._addPoint(
                    this.getX( pointOnAxis[ 0 ][ 0 ] ),
                    this.getY( pointOnAxis[ 0 ][ 1 ] ),
                    pointOnAxis[ 0 ][ 0 ],
                    pointOnAxis[ 0 ][ 1 ],
                    false,
                    false,
                    false
                  );
                  this._addPoint(
                    this.getX( pointOnAxis[ 1 ][ 0 ] ),
                    this.getY( pointOnAxis[ 1 ][ 1 ] ),
                    pointOnAxis[ 0 ][ 0 ],
                    pointOnAxis[ 0 ][ 1 ],
                    false,
                    false,
                    false
                  );
                }
              }
            } else if ( !pointOutside ) {
              this._addPoint( xpx2, ypx2, lastX, lastY, i, false, false );
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

      this._addPoint( xpx2, ypx2, x, y, i, false, true );

      //this.detectPeaks( x, y );

      xpx = xpx2;
      ypx = ypx2;

      lastX = x;
      lastY = y;
    }

    this._createLine();

    if ( this._tracker ) {
      if ( this._trackerDom ) {
        this._trackerDom.remove();
      }

      var cloned = this.groupLines.cloneNode( true );
      this.groupMain.appendChild( cloned );

      for ( i = 0, l = cloned.children.length; i < l; i++ ) {
        cloned.children[ i ].setAttribute( 'stroke', 'transparent' );
        cloned.children[ i ].setAttribute( 'stroke-width', '25px' );
        cloned.children[ i ].setAttribute( 'pointer-events', 'stroke' );
      }

      this._trackerDom = cloned;

      this.groupMain.addEventListener( 'mousemove', ( e ) => {
        var coords = this.graph._getXY( e ),
          ret = this.handleMouseMove( false, false );

        this._trackingCallback( this, ret, coords.x, coords.y );
      } );

      this.groupMain.addEventListener( 'mouseleave', ( e ) => {
        this._trackingOutCallback( this );
      } );
    }

    return this;
  }

  kill() {
    super.kill();
  }

  _addPoint( xpx, ypx, x, y, j, move, allowMarker ) {
    /*if( ! this.currentLineId ) {
        throw "No current line"
      }* @memberof SerieLine
*/

    if ( xpx !== xpx || ypx !== ypx ) {
      return;
    }

    if ( this.counter == 0 ) {
      this.currentLine = 'M ';
    } else {
      if ( this.options.lineToZero || move ) {
        this.currentLine += 'M ';
      } else {
        this.currentLine += 'L ';
      }
    }

    this.currentLine += xpx;
    this.currentLine += ' ';
    this.currentLine += ypx;
    this.currentLine += ' ';

    if ( this.options.lineToZero && this.pos0 !== undefined ) {
      this.currentLine += 'L ';
      this.currentLine += xpx;
      this.currentLine += ' ';
      this.currentLine += this.pos0;
      this.currentLine += ' ';
    }

    if ( this.hasErrors() ) {
      this.errorAddPoint( j, x, y, xpx, ypx );
    }

    this.counter++;
  }

  // Returns the DOM
  _createLine() {
    var i = this.currentLineId++,
      line;

    // Creates a line if needed
    if ( this.lines[ i ] ) {
      line = this.lines[ i ];
    } else {
      line = document.createElementNS( this.graph.ns, 'path' );
      this.applyLineStyle( line );
      this.groupLines.appendChild( line );
      this.lines[ i ] = line;
    }

    if ( this.counter == 0 ) {
      line.setAttribute( 'd', '' );
    } else {
      line.setAttribute( 'd', this.currentLine );
    }

    this.currentLine = 'M ';
    this.counter = 0;

    return line;
  }

  /**
   * Reapply the current style to the serie lines elements. Mostly used internally
   * @memberof SerieLine
   */
  applyLineStyles() {
    for ( var i = 0; i < this.lines.length; i++ ) {
      this.applyLineStyle( this.lines[ i ] );
    }
  }

  /**
   * Applies the current style to a line element. Mostly used internally
   * @memberof SerieLine
   */
  applyLineStyle( line ) {
    line.setAttribute( 'stroke', this.getLineColor() );
    line.setAttribute( 'stroke-width', this.getLineWidth() );
    if ( this.getLineDashArray() ) {
      line.setAttribute( 'stroke-dasharray', this.getLineDashArray() );
    } else {
      line.removeAttribute( 'stroke-dasharray' );
    }

    if ( this.getFillColor() ) {
      line.setAttribute( 'fill', this.getFillColor() );
    } else {
      line.setAttribute( 'fill', 'none' );
    }

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

    this.styleHasChanged( false );
  }

  // Revised August 2014. Ok
  getMarkerPath( family, add ) {
    var z = family.zoom || 1,
      add = add || 0,
      el = [];

    switch ( family.type ) {
      case 2:
        el = [ 'm', -2, -2, 'l', 4, 4, 'm', -4, 0, 'l', 4, -4 ];
        break;

      case 3:
        el = [ 'm', -2, 0, 'l', 4, 0, 'm', -2, -2, 'l', 0, 4 ];
        break;

      case 4:
        el = [ 'm', -1, -1, 'l', 2, 0, 'l', -1, 2, 'z' ];
        break;

      default:
      case 1:
        el = [ 'm', -2, -2, 'l', 4, 0, 'l', 0, 4, 'l', -4, 0, 'z' ];
        break;
    }

    if ( ( z == 1 || !z ) && !add ) {
      return el.join( ' ' );
    }

    var num = 'number';

    if ( !el ) {
      return;
    }

    for ( var i = 0, l = el.length; i < l; i++ ) {
      if ( typeof el[ i ] == num ) {
        el[ i ] *= z + add;
      }
    }

    return el.join( ' ' );
  }

  /**
   * Searches the closest point pair (x,y) to the a pair of pixel position
   * @param {Number} x - The x position in pixels (from the left)
   * @param {Number} y - The y position in pixels (from the left)
   * @returns {Number} Index in the data array of the closest (x,y) pair to the pixel position passed in parameters
   * @memberof SerieLine
   */
  searchIndexByPxXY( x, y ) {
    var oldDist = false,
      xyindex = false,
      dist;

    var xData = this._xDataToUse,
      p_x,
      p_y;

    for ( var k = 0, m = this.waveform.getLength(); k < m; k += 1 ) {
      p_x = this.waveform.getX( k );
      p_y = this.waveform.getY( k );

      dist = Math.pow( this.getX( p_x ) - x, 2 ) + Math.pow( this.getY( p_y ) - y, 2 );

      if ( !oldDist || dist < oldDist ) {
        oldDist = dist;
        xyindex = k;
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
  searchClosestValue( valX, valY ) {
    if ( this.waveform ) {
      let indexX;

      try {
        indexX = this.waveform.getIndexFromXY(
          valX,
          valY,
          undefined,
          undefined,
          this.getXAxis().getRelPx( 1 ),
          this.getYAxis().getRelPx( 1 )
        );
      } catch ( e ) {
        console.log( e );
        throw new Error( 'Error while finding the closest index' );
        return {};
      }

      if ( isNaN( indexX ) || indexX === false ) {
        return false;
      }

      let returnObj = {};

      let direction;
      // Changed on 8 March. Before is was 0 and +1, why ? In case of decreasing data ? Not sure
      if ( valX > this.waveform.getX( indexX ) ) {
        direction = -1;
      } else {
        direction = 0;
      }

      Object.assign( returnObj, {
        indexMin: indexX + direction,
        indexMax: indexX + direction + 1,
        indexClosest: indexX,
        xMin: this.waveform.getX( indexX + direction ),
        xMax: this.waveform.getX( indexX + direction + 1 ),
        yMin: this.waveform.getY( indexX + direction ),
        yMax: this.waveform.getY( indexX + direction + 1 ),
        xClosest: this.waveform.getX( indexX ),
        yClosest: this.waveform.getY( indexX ),
        xExact: valX
      } );
      return returnObj;
    }
  }


  getShortestDistanceToPoint( withiPxX, withinPxY ) {
    
    const valX = this.getXAxis().getMouseVal(),
      valY = this.getYAxis().getMouseVal(),
      distX = this.getXAxis().getRelVal( withinPxX ),
      distY = this.getYAxis().getRelVal( withinPxY );

    return this.waveform.getShortestDistanceToPoint( valX, valY, distX, distY );

  }

  handleMouseMove( xValue, doMarker, yValue ) {
    var valX = xValue || this.getXAxis().getMouseVal(),
      valY = yValue || this.getYAxis().getMouseVal();

    var value = this.searchClosestValue( valX, valY );

    if ( !value ) {
      return;
    }

    var ratio, intY;

    if ( value.xMax == value.xMin ) {
      intY = value.yMin;
    } else {
      //ratio = ( valX - value.xMin ) / ( value.xMax - value.xMin );
      //intY = ( ( 1 - ratio ) * value.yMin + ratio * value.yMax );
    }

    if ( doMarker && this.options.trackMouse ) {
      if ( value.xMin == undefined ) {
        return false;
      }
    }

    return {
      xBefore: value.xMin,
      xAfter: value.xMax,
      yBefore: value.yMin,
      yAfter: value.yMax,
      trueX: value.xExact,
      indexClosest: value.indexClosest,
      interpolatedY: intY,

      xClosest: value.xClosest,
      yClosest: value.yClosest
    };
  }
  /**
   * Gets the maximum value of the y values between two x values. The x values must be monotoneously increasing
   * @param {Number} startX - The start of the x values
   * @param {Number} endX - The end of the x values
   * @returns {Number} Maximal y value in between startX and endX
   * @memberof SerieLine
   */
  getMax( start, end ) {
    var start2 = Math.min( start, end ),
      end2 = Math.max( start, end ),
      v1 = this.searchClosestValue( start2 ),
      v2 = this.searchClosestValue( end2 ),
      i,
      j,
      max = -Infinity,
      initJ,
      maxJ;

    if ( !v1 ) {
      start2 = this.minX;
      v1 = this.searchClosestValue( start2 );
    }

    if ( !v2 ) {
      end2 = this.maxX;
      v2 = this.searchClosestValue( end2 );
    }

    if ( !v1 || !v2 ) {
      return -Infinity;
    }

    for ( i = v1.dataIndex; i <= v2.dataIndex; i++ ) {
      initJ = i == v1.dataIndex ? v1.xBeforeIndexArr : 0;
      maxJ = i == v2.dataIndex ? v2.xBeforeIndexArr : this.data[ i ].length;

      for ( j = initJ; j <= maxJ; j += 2 ) {
        max = Math.max( max, this.data[ i ][ j + 1 ] );
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
  getMin( start, end ) {
    var start2 = Math.min( start, end ),
      end2 = Math.max( start, end ),
      v1 = this.searchClosestValue( start2 ),
      v2 = this.searchClosestValue( end2 ),
      i,
      j,
      min = Infinity,
      initJ,
      maxJ;

    if ( !v1 ) {
      start2 = this.minX;
      v1 = this.searchClosestValue( start2 );
    }

    if ( !v2 ) {
      end2 = this.maxX;
      v2 = this.searchClosestValue( end2 );
    }

    if ( !v1 || !v2 ) {
      return Infinity;
    }

    for ( i = v1.dataIndex; i <= v2.dataIndex; i++ ) {
      initJ = i == v1.dataIndex ? v1.xBeforeIndexArr : 0;
      maxJ = i == v2.dataIndex ? v2.xBeforeIndexArr : this.data[ i ].length;

      for ( j = initJ; j <= maxJ; j += 2 ) {
        min = Math.min( min, this.data[ i ][ j + 1 ] );
      }
    }

    return min;
  }

  /* LINE STYLE * @memberof SerieLine
   */

  setStyle( style, selectionType = 'unselected' ) {
    this.styles[ selectionType ] = style;
    this.styleHasChanged( selectionType );
  }

  setLineStyle( number, selectionType = 'unselected', applyToSelected ) {
    this.styles[ selectionType ] = this.styles[ selectionType ] || {};
    this.styles[ selectionType ].lineStyle = number;

    if ( applyToSelected ) {
      this.setLineStyle( number, 'selected' );
    }

    this.styleHasChanged( selectionType );

    return this;
  }

  getLineStyle( selectionType ) {
    return this.getStyle( selectionType ).lineStyle;
  }

  getLineDashArray( selectionType = this.selectionType || 'unselected' ) {
    switch ( this.getStyle( selectionType ).lineStyle ) {
      case 2:
        return '1, 1';
        break;
      case 3:
        return '2, 2';
        break;
      case 4:
        return '3, 3';
        break;
      case 5:
        return '4, 4';
        break;
      case 6:
        return '5, 5';
        break;

      case 7:
        return '5 2';
        break;
      case 8:
        return '2 5';
        break;

      case 9:
        return '4 2 4 4';
        break;
      case 10:
        return '1,3,1';
        break;
      case 11:
        return '9 2';
        break;
      case 12:
        return '2 9';
        break;

      case 1:
      case false:
        return false;
        break;

      default:
        return this.styles[ selectionType ].lineStyle;
        break;
    }

    this.styleHasChanged( selectionType );
  }

  getStyle( selectionType = this.selectionType || 'unselected' ) {
    return this.styles[ selectionType ] || this.styles.unselected;
  }

  extendStyles() {
    for ( var i in this.styles ) {
      var s = this.styles[ i ];
      if ( s ) {
        this.styles[ i ] = util.extend( true, {}, this.styles.unselected, s );
      }
    }
  }

  extendStyle( styleTarget, styleOrigin ) {
    var s = this.styles[ styleTarget ];
    this.styles[ styleTarget ] = util.extend(
      true, {},
      this.styles[ styleOrigin || 'unselected' ],
      s || {}
    );
    this.styleHasChanged( styleTarget );
  }

  /** @memberof SerieLine
   */

  setLineWidth( width, selectionType, applyToSelected ) {
    selectionType = selectionType || 'unselected';
    this.styles[ selectionType ] = this.styles[ selectionType ] || {};
    this.styles[ selectionType ].lineWidth = width;

    if ( applyToSelected ) {
      this.setLineWidth( width, 'selected' );
    }

    this.styleHasChanged( selectionType );

    return this;
  }

  getLineWidth( selectionType ) {
    return this.getStyle( selectionType ).lineWidth || 1;
  }

  /* LINE COLOR * @memberof SerieLine
   */
  setLineColor( color, selectionType, applyToSelected ) {
    selectionType = selectionType || 'unselected';
    this.styles[ selectionType ] = this.styles[ selectionType ] || {};
    this.styles[ selectionType ].lineColor = color;

    if ( applyToSelected ) {
      this.setLineColor( color, 'selected' );
    }

    this.styleHasChanged( selectionType );

    return this;
  }

  /* FILL COLOR * @memberof SerieLine
   */
  setFillColor( color, selectionType, applyToSelected ) {
    selectionType = selectionType || 'unselected';
    this.styles[ selectionType ] = this.styles[ selectionType ] || {};
    this.styles[ selectionType ].fillColor = color;

    if ( applyToSelected ) {
      this.setFillColor( color, 'selected' );
    }

    this.styleHasChanged( selectionType );

    return this;
  }

  getLineColor( selectionType ) {
    return this.getStyle( selectionType ).lineColor || 'black';
  }

  getFillColor( selectionType ) {
    return this.getStyle( selectionType ).fillColor || undefined;
  }

  /** @memberof SerieLine
   */

  isMonotoneous() {
    if ( this.waveform ) {
      return this.waveform.isMonotoneous();
    }

    return !!this.xmonotoneous;
  }

  findLocalMinMax( xRef, xWithin, type ) {
    if ( !this.waveform ) {
      return false;
    }

    return this.waveform.findLocalMinMax( xRef, xWithin, type );
  }
}

util.mix( SerieLine, ErrorBarMixin );

export default SerieLine;