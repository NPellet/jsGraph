import Graph from '../graph.core'
import Serie from './graph.serie'

import * as util from '../graph.util'
import ErrorBarMixin from '../mixins/graph.mixin.errorbars'
import Waveform from '../util/waveform'

/**
 * Serie line
 * @example graph.newSerie( name, options, "line" );
 * @see Graph#newSerie
 * @extends Serie
 */
class SerieLine extends Serie {

  static
  default () {
    /**
     * @name SerieLineDefaultOptions
     * @object
     * @static
     * @memberof SerieLine
     */
    return {

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
      selectableOnClick: true,
      markersIndependant: false
    };
  }

  constructor( graph, name, options ) {

    super( ...arguments );

    this.selectionType = "unselected";
    this.markerFamilies = {};

    util.mapEventEmission( this.options, this ); // Register events

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

    this.groupLines = document.createElementNS( this.graph.ns, 'g' );
    this.domMarker = document.createElementNS( this.graph.ns, 'path' );
    this.domMarker.style.cursor = 'pointer';

    this.groupMain = document.createElementNS( this.graph.ns, 'g' );
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

    this.groupMarkers = document.createElementNS( this.graph.ns, 'g' );
    this.groupMain.appendChild( this.groupMarkers );

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

    if ( this.options.markers ) {
      this.setMarkers( this.options.markers, "unselected" );
    }

  }

  setWaveform( waveform ) {

    if ( !( waveform instanceof Waveform ) ) {
      throw "Cannot assign waveform to serie. Waveform is not of the proper Waveform instance";
    }

    this._waveform = waveform;

    this.minX = this._waveform.getXMin();
    this.maxX = this._waveform.getXMax();
    this.minY = this._waveform.getMin();
    this.maxY = this._waveform.getMax();

    this.graph.updateDataMinMaxAxes();
    this.dataHasChanged();

    return this;
  }

  /**
   * Sets the options of the serie
   * @see SerieLineDefaultOptions
   * @param {Object} options - A object containing the options to set
   * @return {SerieLine} The current serie
   * @memberof SerieLine
   */
  setOptions( options ) {
    this.options = util.extend( true, {}, SerieLine.prototype.defaults, ( options || {} ) );
    // Unselected style
    this.styles.unselected = {
      lineColor: this.options.lineColor,
      lineStyle: this.options.lineStyle,
      markers: this.options.markers
    };

    this.applyLineStyles();
    return this;
  }

  onMouseOverMarker( e, index ) {

    var toggledOn = this.toggleMarker( index, true, true );
    if ( this.options.onMouseOverMarker ) {

      this.options.onMouseOverMarker( index, this.infos ? ( this.infos[ index[ 0 ] ] ||  false ) : false, [ this.data[ index[ 1 ] ][ index[ 0 ] * 2 ], this.data[ index[ 1 ] ][ index[ 0 ] * 2 + 1 ] ] );
    }
  }

  onMouseOutMarker( e, index ) {
    this.markersOffHover();
    if ( this.options.onMouseOutMarker ) {
      this.options.onMouseOutMarker( index, this.infos ? ( this.infos[ index[ 0 ] ] ||  false ) : false, [ this.data[ index[ 1 ] ][ index[ 0 ] * 2 ], this.data[ index[ 1 ] ][ index[ 0 ] * 2 + 1 ] ] );
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
  toggleMarker( index, force, hover ) {

    let i = index[ 0 ];

    index = index.join();

    var _on;
    if ( typeof force === 'undefined' ) {
      _on = !hover ? !this.domMarkerSelect[ index ] : !this.domMarkerHover[ index ];
    }
    var el = this[ 'domMarker' + ( hover ? 'Hover' : 'Select' ) ];

    if ( _on || force === true ) {

      if ( !el[ index ] ) {

        var dom = document.createElementNS( this.graph.ns, 'path' );

        this.setMarkerStyleTo( dom, this.markerFamilies[ this.selectionType ][ this.getMarkerCurrentFamily( i ) ] );
        this[ 'domMarker' + ( hover ? 'Hover' : 'Select' ) ][ index ] = dom;
        this.groupMarkerSelected.appendChild( dom );

      } else {
        dom = el[ index ];
      }

      var x, y;

      if ( this.mode == 'x_equally_separated' ) {
        x = this._xDataToUse.x + i * this._xDataToUse.dx;
        y = this.data[ i ];
      } else {
        x = this.data[ i * 2 ];
        y = this.data[ i * 2 + 1 ];
      }

      x = this.getX( x );
      y = this.getY( y );

      dom.setAttribute( 'd', "M " + x + " " + y + " " + this.getMarkerPath( this.markerFamilies[ this.selectionType ][ this.getMarkerCurrentFamily( i ) ], 1 ) );

      if ( hover ) {
        this.markerHovered++;
      }

    } else if ( !_on || force === false ) {

      if ( ( hover && this.domMarkerHover[ index ] && !this.domMarkerSelect[ index ] ) || this.domMarkerSelect[ index ] ) {

        if ( !el[ index ] ) {
          return;
        }

        this.groupMarkerSelected.removeChild( el[ index ] );

        delete el[ index ];

        if ( hover )
          this.markerHovered--;
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

    for ( var i in this.domMarkerHover ) {
      this.toggleMarker( i.split( ',' ), false, true );
    }
    return this;
  }

  /**
   * Toggles off markers that have the select mode "on"
   * @returns {SerieLine} The current serie
   * @memberof SerieLine
   */
  markersOffSelect() {

    for ( var i in this.domMarkerSelect ) {
      this.toggleMarker( i.split( ',' ), false, false );
    }
    return this;
  }

  onClickOnMarker( e, index ) {

    var toggledOn = this.toggleMarker( index );

    if ( toggledOn && this.options.onSelectMarker ) {
      this.options.onSelectMarker( index, this.infos ? ( this.infos[ index[ 0 ] ] ||  false ) : false );
    }

    if ( !toggledOn && this.options.onUnselectMarker ) {
      this.options.onUnselectMarker( index, this.infos ? ( this.infos[ index[ 0 ] ] ||  false ) : false );
    }

    if ( this.options.onToggleMarker ) {
      this.options.onToggleMarker( index, this.infos ? ( this.infos[ index[ 0 ] ] ||  false ) : false, toggledOn );
    }
  }

  _getMarkerIndexFromEvent( e ) {
    var px = this.graph._getXY( e );

    //  return this.searchIndexByPxXY( ( px.x ), ( px.y ) );
    return this.searchIndexByPxXY( ( px.x - this.graph.getPaddingLeft() ), ( px.y - this.graph.getPaddingTop() ) );
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
  select( selectionType ) {

    selectionType = selectionType ||  "selected";

    this.selected = selectionType !== "unselected";

    if ( this.areMarkersShown() || this.areMarkersShown( selectionType ) ) {
      this.selectionType = selectionType;

      this.draw( true ); // Drawing is absolutely required here
      this.applyLineStyles();
    } else {
      this.selectionType = selectionType;
      this.applyLineStyles();
    }

    this.applyLineStyle( this.getSymbolForLegend() );
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
    return this.select( "unselected" );
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

    this.currentLineId = 0;
    this.counter = 0;
    this._drawn = true;
    this.currentLine = "";

    // Degradation

    if ( this._waveform ) {

      if ( this.degradationPx ) {

        this._waveform.resampleForDisplay( {

          resampleToPx: this.degradationPx,
          xPosition: this.getXAxis().getPx.bind( this.getXAxis() ),
          minX: this.getXAxis().getCurrentMin(),
          maxX: this.getXAxis().getCurrentMax()

        } );

        this._dataToUse = [ this._waveform.getDataToUseFlat() ];

      } else if ( this._waveform.hasAggregation() ) {

        let xaxis = this.getXAxis(),
          numberOfPointsInTotal = this.graph.getDrawingWidth() * ( xaxis.getDataMax() - xaxis.getDataMin() ) / ( xaxis.getCurrentMax() - xaxis.getCurrentMin() ),
          promise = this._waveform.selectAggregatedData( numberOfPointsInTotal, this.getXAxis().getCurrentMin(), this.getXAxis().getCurrentMax() );

        if ( promise instanceof Promise ) {

          promise.then( () => {

            this.draw( force );

          } );

          return false;

        } else if ( promise === false ) {

          return false;

        } else {

          this._dataToUse = this._waveform.getDataToUseFlat();
        }

      }

      //    this._dataToUse = this._waveform.getDataToUseFlat();

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
      throw "Could not find group after lines to insertion."
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

    this.lines.splice( this.currentLineId, l - ( this.currentLineId ) );
    this.currentLineId = 0;
  }

  /**
   * Draws the serie
   * @memberof SerieLine
   */
  draw( force ) { // Serie redrawing

    super.draw( ...arguments );

    if ( !this.getXAxis() ||  !this.getYAxis() ) {
      throw "No axes were defined for this serie";
    }

    if ( force || this.hasDataChanged() ) {

      if ( !this.drawInit( force ) ) {
        return;
      }

      var data = this._dataToUse,
        xData = this._xDataToUse,
        slotToUse = this._slotToUse;

      this.removeLinesGroup();
      this.eraseMarkers();

      this.lookForMaxima = true;
      this.lookForMinima = false;

      this.markerFamily = this.markerFamilies[ this.selectionType || "unselected" ];

      this.pos0 = this.getYAxis().getPos( 0 );

      if ( this.error ) {
        this.errorDrawInit();
      }

      this._draw();

      if ( this.error ) {
        this.errorDraw();
      }

      this.removeExtraLines();
      this.insertMarkers();
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

    let self = this,
      waveform = this._waveform,
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

      xshift = waveform.getXShift(),
      yshift = waveform.getShift()
      ;

    let pointOutside = false;
    let lastPointOutside = false;
    let pointOnAxis;

    let _monotoneous = this.isMonotoneous(),
      _markersShown = this.markersShown();

    let i = 0,
      l = waveform.getLength();

    this.counter1 = 0;
    this.currentLine = "";

    if ( waveform.isXMonotoneous() ) {

      if ( waveform.isXMonotoneousAscending() ) {

        i = waveform.getIndexFromX( xMin, true ) || 0;
        l = waveform.getIndexFromX( xMax, true );

        if ( l === false ) {
          l = waveform.getLength();
        }

      } else {

        i = waveform.getIndexFromX( xMax, true ) || 0;
        l = waveform.getIndexFromX( xMin, true );

        if ( l === false ) {
          l = data.length;
        }
      }

      l += 2;
      if ( l > data.length ) {
        l = data.length;
      }
    }


    for ( ; i < l; i += 1 ) {

      x = waveform.getX( i, true ) + xshift;
      y = data[ i ] + yshift;

      if ( x != x || y != y ) { // NaN checks
        this._createLine();
        continue;
      }

      if ( ( x < xMin && lastX < xMin ) || ( x > xMax && lastX > xMax ) || ( ( ( y < yMin && lastY < yMin ) || ( y > yMax && lastY > yMax ) ) && !this.options.lineToZero ) ) {
        lastX = x;
        lastY = y;
        lastPointOutside = true;
        continue;
      }

      this.counter2 = i;

      if ( _markersShown ) {
        this.getMarkerCurrentFamily( this.counter2 );
      }

      xpx2 = this.getX( x );
      ypx2 = this.getY( y );
      //xpx2 = 0;
      //ypx2 = 0;

      if ( xpx2 == xpx && ypx2 == ypx ) {
        continue;
      }

      if ( !_monotoneous ) {
        pointOutside = ( x < xMin || y < yMin || x > xMax ||  y > yMax );
      } else {
        pointOutside = ( y < yMin ||  y > yMax );
      }

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

      if ( xpx2 != xpx2 || ypx2 != ypx2 ) { // NaN checks
        if ( this.counter > 0 ) {

          this._createLine();
        }
        continue;
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

      this.groupMain.addEventListener( "mousemove", ( e ) => {
        var coords = this.graph._getXY( e ),
          ret = this.handleMouseMove( false, false );
          
        this._trackingCallback( this, ret, coords.x, coords.y );
      } );

      this.groupMain.addEventListener( "mouseleave", ( e ) => {
        this._trackingOutCallback( this );
      } );
    }

    return this;

  }

  kill() {
    super.kill();
  }

  /**
   * @param {Number} k - Index of the point for which we should get the family
   * @memberof SerieLine
   */
  getMarkerCurrentFamily( k ) {

    if ( !this.markerPoints || !this.markerPoints[ this.selectionType ] ) {
      return;
    }

    var family;

    for ( var z = 0; z < this.markerPoints[ this.selectionType ].length; z++ ) {
      if ( this.markerPoints[ this.selectionType ][ z ][ 0 ] <= k )  { // This one is a possibility !
        if ( this.markerPoints[ this.selectionType ][ z ][ 1 ] >= k ) { // Verify that it's in the boundary
          this.markerCurrentFamily = this.markerPoints[ this.selectionType ][ z ][ 2 ];
          family = this.markerFamilies[ this.selectionType ][ this.markerCurrentFamily ];
        }
      } else {
        break;
      }
    }

    if ( !family ) {
      return false;
    }
    this.getMarkerDom( family );
    return this.markerCurrentFamily;
  }

  drawSlot( slotToUse, y ) {

    var k = 0;
    var i = 0,
      xpx, ypx, max;
    var j;

    if ( this.isFlipped() ) {

      var dataPerSlot = this.slots[ y ] / ( this.maxY - this.minY );

      var slotInit = Math.floor( ( this.getYAxis().getCurrentMin() - this.minY ) * dataPerSlot );
      var slotFinal = Math.ceil( ( this.getYAxis().getCurrentMax() - this.minY ) * dataPerSlot );

    } else {

      var dataPerSlot = this.slots[ y ] / ( this.maxX - this.minX );

      var slotInit = Math.floor( ( this.getXAxis().getCurrentMin() - this.minX ) * dataPerSlot );
      var slotFinal = Math.ceil( ( this.getXAxis().getCurrentMax() - this.minX ) * dataPerSlot );
    }

    for ( j = slotInit; j <= slotFinal; j++ ) {

      if ( !slotToUse[ j ] ) {
        continue;
      }

      if ( this.isFlipped() ) {

        ypx = Math.floor( this.getY( slotToUse[ j ].x ) );
        max = this.getX( slotToUse[ j ].max );

        /*if ( this.options.autoPeakPicking ) {
            allY.push( [ slotToUse[ j ].max, slotToUse[ j ].x ] );
          }
* @memberof SerieLine
*/
        this._addPoint( this.getX( slotToUse[ j ].start ), ypx, false, false, false, false, false );
        this._addPoint( max, ypx, false, false, false, true, false );
        this._addPoint( this.getX( slotToUse[ j ].min ), ypx, false, false, false, false, false );
        this._addPoint( this.getX( slotToUse[ j ].stop ), ypx, false, false, false, true, false );

        //    k++;
      } else {

        xpx = Math.floor( this.getX( slotToUse[ j ].x ) );
        max = this.getY( slotToUse[ j ].max );

        this._addPoint( xpx, this.getY( slotToUse[ j ].start ), false, false, false, false, false );
        this._addPoint( xpx, max, false, false, false, true, false );
        this._addPoint( xpx, this.getY( slotToUse[ j ].min ), false, false, false, false, false );
        this._addPoint( xpx, this.getY( slotToUse[ j ].stop ), false, false, false, true, false );

        //this.counter ++;
      }

    }

    this._createLine();
    i++;
  }

  setMarkerStyleTo( dom, family ) {

    if ( !dom ||  !family ) {
      console.trace();
      throw "Cannot set marker style. DOM does not exist.";
    }

    dom.setAttribute( 'fill', family.fillColor ||  'transparent' );
    dom.setAttribute( 'stroke', family.strokeColor || this.getLineColor() );
    dom.setAttribute( 'stroke-width', family.strokeWidth ||  1 );
  }

  /**
   * Hides the tracking marker (see the trackMouse option)
   * @memberof SerieLine
   */
  hideTrackingMarker() {
    this.marker.setAttribute( 'display', 'none' );
    this.markerLabel.setAttribute( 'display', 'none' );
    this.markerLabelSquare.setAttribute( 'display', 'none' );
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
        this.currentLine += "L ";
      }
    }

    this.currentLine += xpx;
    this.currentLine += " ";
    this.currentLine += ypx;
    this.currentLine += " ";

    if ( this.options.lineToZero && this.pos0 !== undefined ) {

      this.currentLine += "L ";
      this.currentLine += xpx;
      this.currentLine += " ";
      this.currentLine += pos;
      this.currentLine += " ";

    }

    if ( this.error ) {
      this.errorAddPoint( j, x, y, xpx, ypx );
    }

    if ( !this.markerPoints ) {
      this.counter++;

      return;
    }

    if ( this.markersShown() && allowMarker !== false && this.markerFamily ) {
      drawMarkerXY(
        this,
        this.markerFamily[ this.markerCurrentFamily ],
        xpx,
        ypx,
        this.markersDom.get( this.markerFamily[  this.markerCurrentFamily ] )
      );
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

    this.currentLine = "M ";
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
    line.setAttribute( 'fill', 'none' );
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

    var z = family.zoom  ||  1,
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

    if ( ( z == 1 ||  !z ) && !add ) {
      return el.join( " " );
    }

    var num = "number";

    if ( !el ) {
      return;
    }

    for ( var i = 0, l = el.length; i < l; i++ ) {

      if ( typeof el[ i ] == num ) {

        el[ i ] *= ( z + add );
      }
    }

    return el.join( " " );

  }

  // Revised August 2014. Ok
  getMarkerDom( family )  {

    var self = this;

    if ( !this.markersDom.has( family ) ) {

      var dom = document.createElementNS( this.graph.ns, 'path' );
      this.setMarkerStyleTo( dom, family );
      this.markersDom.set( family, {
        dom: dom,
        path: ""
      } );

      dom.addEventListener( 'mouseover', function( e ) {
        var closest = self._getMarkerIndexFromEvent( e );
        self.onMouseOverMarker( e, closest );
      } );

      dom.addEventListener( 'mouseout', function( e ) {
        var closest = self._getMarkerIndexFromEvent( e );
        self.onMouseOutMarker( e, closest );
      } );

      dom.addEventListener( 'click', function( e ) {
        var closest = self._getMarkerIndexFromEvent( e );
        self.onClickOnMarker( e, closest );
      } );

    }

    return family.dom;
  }

  // In case markers are not grouped in families but independant
  getMarkerDomIndependant( index1, index2, family ) {

    var self = this;
    var index = index1 + "," + index2;

    if ( !this.independantMarkers[ index ] ) {

      var dom = document.createElementNS( this.graph.ns, 'path' );
      this.setMarkerStyleTo( dom, family );

      dom.addEventListener( 'mouseover', function( e ) {

        self.onMouseOverMarker( e, [ index2, index1 ] );
      } );

      dom.addEventListener( 'mouseout', function( e ) {

        self.onMouseOutMarker( e, [ index2, index1 ] );
      } );

      dom.addEventListener( 'click', function( e ) {
        self.onClickOnMarker( e, [ index2, index1 ] );
      } );

      this.independantMarkers[ index ] = dom;
    }

    this.groupMarkers.appendChild( this.independantMarkers[ index ] );

    return this.independantMarkers[ index ];
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

    if ( this.mode == "x_equally_separated" ) {

      for ( var i = 0, l = this.data.length; i < l; i++ ) {
        for ( var k = 0, m = this.data[ i ].length; k < m; k += 1 ) {

          p_x = xData[ i ].x + k * xData[ i ].dx;
          p_y = this.data[ i ][ k ];
          dist = Math.pow( ( this.getX( p_x ) - x ), 2 ) + Math.pow( ( this.getY( p_y ) - y ), 2 );
          //console.log(x, y, dist, this.data[i][k], this.data[i][k + 1]);

          if ( !oldDist || dist < oldDist ) {
            oldDist = dist;
            xyindex = [ k, i ];
          }
        }
      }
    } else {

      for ( var i = 0, l = this.data.length; i < l; i++ ) {
        for ( var k = 0, m = this.data[ i ].length; k < m; k += 2 ) {

          p_x = this.data[ i ][ k ];
          p_y = this.data[ i ][ k + 1 ];
          dist = Math.pow( ( this.getX( p_x ) - x ), 2 ) + Math.pow( ( this.getY( p_y ) - y ), 2 );
          if ( !oldDist || dist < oldDist ) {
            oldDist = dist;
            xyindex = [ k / 2, i ];
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
  searchClosestValue( valX, data ) {

    if ( this._waveform ) {
      const indexX = this._waveform.getIndexFromX( valX );
      let returnObj = {
        xMin: this._waveform.getX( indexX ),
        xMax: this._waveform.getX( indexX + 1 ),
        yMin: this._waveform.getY( indexX ),
        yMax: this._waveform.getY( indexX + 1 ),
      };

      if( Math.abs( returnObj.xMin - valX ) < Math.abs( returnObj.xMax - valX ) ) {
        returnObj.xClosest = returnObj.xMin;
        returnObj.yClosest = returnObj.yMin;
      } else {
        returnObj.xClosest = returnObj.xMax;
        returnObj.yClosest = returnObj.yMax;
      }

      return returnObj;
    }

    return;

  }

  handleMouseMove( xValue, doMarker ) {

      var valX = xValue || this.getXAxis().getMouseVal(),
        xMinIndex,
        xMin,
        yMin,
        xMax,
        yMax;

      var value = this.searchClosestValue( valX );

      if ( !value )
        return;

      var ratio = ( valX - value.xMin ) / ( value.xMax - value.xMin );
      var intY = ( ( 1 - ratio ) * value.yMin + ratio * value.yMax );

      if ( doMarker && this.options.trackMouse ) {

        if ( value.xMin == undefined ) {

          return false;

        } else {

          var x = this.getX( this.getFlip() ? intY : valX );
          var y = this.getY( this.getFlip() ? valX : intY );

          this.marker.setAttribute( 'display', 'block' );
          this.marker.setAttribute( 'cx', x );
          this.marker.setAttribute( 'cy', y );

          this.markerLabel.setAttribute( 'display', 'block' );
          this.markerLabelSquare.setAttribute( 'display', 'block' );
          switch ( this.options.trackMouseLabel ) {
            case false:
              break;

            default:
              this.markerLabel.textContent = this.options.trackMouseLabel
                .replace( '<x>', valX.toFixed( this.options.trackMouseLabelRouding ) )
                .replace( '<y>', intY.toFixed( this.options.trackMouseLabelRouding ) );
              break;
          }

          this.markerLabel.setAttribute( 'x', x + 5 );
          this.markerLabel.setAttribute( 'y', y - 5 );

          this.markerLabelSquare.setAttribute( 'x', x + 5 );
          this.markerLabelSquare.setAttribute( 'y', y - 5 - this.graph.options.fontSize );
          this.markerLabelSquare.setAttribute( 'width', this.markerLabel.getComputedTextLength() + 2 );
          this.markerLabelSquare.setAttribute( 'height', this.graph.options.fontSize + 2 );
        }
      }

      return {
        xBefore: value.xMin,
        xAfter: value.xMax,
        yBefore: value.yMin,
        yAfter: value.yMax,
        trueX: valX,
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
      i, j, max = -Infinity,
      initJ, maxJ;

    //      console.log( start2, end2, v1, v2 );

    if ( !v1 ) {
      start2 = this.minX;
      v1 = this.searchClosestValue( start2 );
    }

    if ( !v2 ) {
      end2 = this.maxX;
      v2 = this.searchClosestValue( end2 );
    }

    if ( !v1 ||  !v2 ) {
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
      i, j, min = Infinity,
      initJ, maxJ;

    if ( !v1 ) {
      start2 = this.minX;
      v1 = this.searchClosestValue( start2 );
    }

    if ( !v2 ) {
      end2 = this.maxX;
      v2 = this.searchClosestValue( end2 );
    }

    if ( !v1 ||  !v2 ) {
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

  setStyle( style, selectionType = "unselected" ) {

    this.styles[ selectionType ] = style;
    this.styleHasChanged( selectionType );

  }

  setLineStyle( number, selectionType = "unselected", applyToSelected ) {

    this.styles[ selectionType ] = this.styles[ selectionType ] || {};
    this.styles[ selectionType ].lineStyle = number;

    if ( applyToSelected ) {
      this.setLineStyle( number, "selected" );
    }

    this.styleHasChanged( selectionType );

    return this;
  }

  getLineStyle( selectionType ) {
    return this.getStyle( selectionType ).lineStyle;
  }

  getLineDashArray( selectionType =  this.selectionType || "unselected" ) {

    switch ( this.getStyle( selectionType ).lineStyle ) {

      case 2:
        return "1, 1";
        break;
      case 3:
        return "2, 2";
        break;
      case 4:
        return "3, 3";
        break;
      case 5:
        return "4, 4";
        break;
      case 6:
        return "5, 5";
        break;

      case 7:
        return "5 2";
        break;
      case 8:
        return "2 5";
        break;

      case 9:
        return "4 2 4 4";
        break;
      case 10:
        return "1,3,1";
        break;
      case 11:
        return "9 2";
        break;
      case 12:
        return "2 9";
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

  getStyle( selectionType = this.selectionType ||  "unselected" ) {
    return this.styles[ selectionType ];
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

    this.styles[ styleTarget ] = util.extend( true, {}, this.styles[ styleOrigin || "unselected" ], s || {} );

    this.styles[ styleTarget ].markers.map( function( marker ) {
      if ( marker.dom ) {
        marker.dom = "";
      }
    } );

    this._recalculateMarkerPoints( styleTarget, this.styles[ styleTarget ].markers );
    this.styleHasChanged( styleTarget );
  }

  /*  * @memberof SerieLine
   */

  setLineWidth( width, selectionType, applyToSelected ) {

    selectionType = selectionType ||  "unselected";
    this.styles[ selectionType ] = this.styles[ selectionType ] || {};
    this.styles[ selectionType ].lineWidth = width;

    if ( applyToSelected ) {
      this.setLineWidth( width, "selected" );
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

    selectionType = selectionType ||  "unselected";
    this.styles[ selectionType ] = this.styles[ selectionType ] || {};
    this.styles[ selectionType ].lineColor = color;

    if ( applyToSelected ) {
      this.setLineColor( color, "selected" );
    }

    this.styleHasChanged( selectionType );

    return this;
  }

  getLineColor( selectionType ) {

    return this.getStyle( selectionType ).lineColor || "black";
  }

  /* * @memberof SerieLine
   */

  /* MARKERS * @memberof SerieLine
   */
  showMarkers( selectionType, redraw ) {
    selectionType = selectionType ||  "unselected";
    this.styles[ selectionType ] = this.styles[ selectionType ] || {};
    this.styles[ selectionType ].showMarkers = true;

    if ( redraw && this._drawn ) {
      this.draw( true );
    } else {
      this.styleHasChanged( selectionType );
    }

    return this;
  }

  hideMarkers( selectionType, redraw ) {

    selectionType = selectionType ||  "unselected";
    this.styles[ selectionType ].showMarkers = false;

    if ( redraw && this._drawn ) {
      this.draw( true );
    } else {
      this.styleHasChanged( selectionType );
    }
    return this;
  }

  markersShown( selectionType ) {
    return this.getStyle( selectionType ).showMarkers !== false;
  }

  areMarkersShown() {
    return this.markersShown.apply( this, arguments );
  }

  isMarkersShown() {
    return this.markersShown.apply( this, arguments );
  }

  // Multiple markers
  setMarkers( families, selectionType, applyToSelected ) {
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

    this.styles[ selectionType || "unselected" ] = this.styles[ selectionType || "unselected" ] || {};

    this.showMarkers( selectionType, false );

    if ( !Array.isArray( families ) && typeof families == 'object' ) {
      families = [  families ];
    } else if ( !families ) {

      families = [ {
        type: 1,
        zoom: 1,
        points: 'all'
      } ];
    }

    this.styles[ selectionType || "unselected" ].markers = families;

    if ( applyToSelected ) {
      this.styles[ "selected" ].markers = util.extend( true, {}, families );
    }

    this._recalculateMarkerPoints( selectionType, families );
    this.styleHasChanged( selectionType );
    this.dataHasChanged( true ); // Data has not really changed, but marker placing is performed during the draw method
    return this;
  }

  setMarkersPoints( points, family, selectionType ) {
    this._extendMarkers( "points", points, family, selectionType, true );
  }

  setMarkersColor( color, family, selectionType ) {
    this._extendMarkers( "color", color, family, selectionType );
  }

  setMarkersType( type, family, selectionType ) {
    this._extendMarkers( "type", type, family, selectionType );
  }

  setMarkersZoom( zoom, family, selectionType ) {
    this._extendMarkers( "zoom", zoom, family, selectionType );
  }

  setMarkersStrokeColor( strokeColor, family, selectionType ) {
    this._extendMarkers( "strokeColor", strokeColor, family, selectionType );
  }

  setMarkersStrokeWidth( strokeWidth, family, selectionType ) {
    this._extendMarkers( "strokeWidth", strokeWidth, family, selectionType );
  }

  setMarkersFillColor( fillColor, family, selectionType ) {
    this._extendMarkers( "fillColor", fillColor, family, selectionType );
  }

  _extendMarkers( type, value, family, selectionType, recalculatePoints ) {

    family = family ||  0;
    selectionType = selectionType ||  "unselected";

    if ( !this.styles[ selectionType ] ||  !this.styles[ selectionType ].markers ) {
      return;
    }

    this.styles[ selectionType ].markers[ family ][ type ] = value

    if ( recalculatePoints ) {
      this._recalculateMarkerPoints( selectionType, this.styles[ selectionType ].markers );
    }

    if ( !this.markersDom[ this.styles[ selectionType ].markers[ family ] ] ) { // DOM doesn't exist yet.
      return;
    }

    this.setMarkerStyleTo( this.markersDom[ this.styles[ selectionType ].markers[ family ] ].dom, this.styles[ selectionType ].markers[ family ] );

  }

  _recalculateMarkerPoints( selectionType, families ) {

    var markerPoints = [];
    // Overwriting any other undefined families
    markerPoints.push( [ 0, Infinity, null ] );

    for ( var i = 0, k = families.length; i < k; i++ ) {

      families[ i ].markerPath = this.getMarkerPath( families[ i ] );

      if ( !families[ i ].points ) {
        families[ i ].points = 'all';
      }

      if ( !Array.isArray( families[ i ].points ) ) {
        families[ i ].points = [ families[ i ].points ];
      }

      for ( var j = 0, l = families[ i ].points.length; j < l; j++ ) {

        if ( families[ i ].points[ j ] == 'all' ) {

          markerPoints.push( [ 0, Infinity, i ] );

        } else if ( !Array.isArray( families[ i ].points[ j ] ) ) {

          markerPoints.push( [ families[ i ].points[ j ], families[ i ].points[ j ], i ] );
          //markerPoints.push( [ family[ i ].points[ j ] + 1, null ] );
        } else {

          markerPoints.push( [ families[ i ].points[ j ][ 0 ], families[ i ].points[ j ][ 1 ], i ] );

        }
      }
    }

    this.markerFamilies[ selectionType || "unselected" ] = families;

    // Let's sort if by the first index.
    markerPoints.sort( function( a, b ) {
      return ( a[ 0 ] - b[ 0 ] ) ||  ( a[ 2 ] == null ? -1 : 1 );
    } );

    this.markerPoints[ selectionType || "unselected" ] = markerPoints;
  }

  insertMarkers( selectionType ) {

    if ( !this.markerFamilies || !this.markerFamilies[ selectionType || this.selectionType ] || this.options.markersIndependant ) {
      return;
    }

    for ( var i = 0, l = this.markerFamilies[ selectionType || this.selectionType ].length; i < l; i++ ) {

      if ( !this.markersDom.has( this.markerFamilies[ selectionType || this.selectionType ][ i ] ) ) {
        continue;
      }

      let dom =
        this
        .markersDom
        .get(  this.markerFamilies[ selectionType || this.selectionType ][ i ] );

      dom.dom
        .setAttribute(
          'd',
          dom.path );

      this.groupMarkers.appendChild( dom.dom );
      this.currentMarkersSelectionType = this.selectionType;
    }
  }

  getMarkerForLegend() {

    if ( !this.markerPoints || !this.markerPoints[ this.selectionType ] ) {
      return;
    }

    if ( !this.markerForLegend ) {

      var marker = document.createElementNS( this.graph.ns, 'path' );
      this.setMarkerStyleTo( marker, this.markerFamilies[ this.selectionType ][ 0 ] );

      marker.setAttribute( 'd', "M 14 0 " + this.getMarkerPath( this.markerFamilies[ this.selectionType ][ 0 ] ) );

      this.markerForLegend = marker;
    }

    return this.markerForLegend;
  }

  eraseMarkers() {

    var self = this;

    if ( this.options.markersIndependant ) {

      for ( var i in this.independantMarkers ) {
        self.groupMarkers.removeChild( this.independantMarkers[ i ] );
      }

      this.independantMarkers = {};

    } else if ( this.currentMarkersSelectionType ) {

      this.markersDom.forEach( function( el ) {

        if ( !el.dom ) {
          return;
        }

        if ( el.dom.parentNode !== self.groupMarkers ) {
          return;
        }

        self.groupMarkers.removeChild( el.dom );
        el.path = "";
      } );

      this.currentMarkersSelectionType = false;
    }

  }

  isMonotoneous() {
    if ( this._waveform ) {
      return this._waveform.isMonotoneous();
    }

    return !!this.xmonotoneous;
  }

}

util.mix( SerieLine, ErrorBarMixin );

export default SerieLine