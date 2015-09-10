define( [ './graph.serie', './slotoptimizer', '../graph.util' ], function( SerieLineNonInstanciable, SlotOptimizer, util ) {

  "use strict";

  /** 
   * Serie line
   * @class SerieLine
   * @example graph.newSerie( name, options, "line" );
   * @see Graph#newSerie
   * @augments Serie
   */
  var SerieLine = function() {}

  SerieLine.prototype = new SerieLineNonInstanciable();

  /**
   * Initializes the serie
   * @memberof SerieLine
   */
  SerieLine.prototype.init = function( graph, name, options ) {

    var self = this;

    this.selectionType = "unselected";
    this.markerFamilies = {};

    this.graph = graph;
    this.name = name;

    this.options = $.extend( true, {}, SerieLine.prototype.defaults, ( options || {} ) ); // Creates options
    util.mapEventEmission( this.options, this ); // Register events

    // Creates an empty style variable
    this.styles = {};

    // Unselected style
    this.styles.unselected = {
      lineColor: this.options.lineColor,
      lineStyle: this.options.lineStyle,
      markers: this.options.markers
    };

    this.styles.selected = {
      lineWidth: 3
    };

    this.extendStyles();

    if ( this.options.markers ) {
      this.setMarkers( this.options.markers, "unselected" );
    }

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

    this.groupLabels = document.createElementNS( this.graph.ns, 'g' );
    //this.scale = 1;
    //this.shift = 0;
    this.lines = [];

    this.groupMain.appendChild( this.groupLines );
    this.groupMain.appendChild( this.groupLabels );
    this.groupMain.appendChild( this.marker );

    this.groupMain.appendChild( this.groupMarkerSelected );
    this.groupMain.appendChild( this.markerLabelSquare );
    this.groupMain.appendChild( this.markerLabel );

    this.independantMarkers = [];

    if ( this.initExtended1 ) {
      this.initExtended1();
    }

    if ( this.options.autoPeakPicking ) {

      this.picks = this.picks || [];

      for ( var n = 0, m = this.options.autoPeakPickingNb; n < m; n++ ) {

        var shape = this.graph.newShape( {

          type: 'label',
          label: {
            text: "",
            position: {
              x: 0
            },
            anchor: 'middle',

          },

          selectable: true,

          shapeOptions: {
            minPosY: 15
          }

        } );

        shape.setSerie( self );
        self.picks.push( shape );

      }

    }

    this.groupLines.addEventListener( 'click', function( e ) {

      if ( self.options.selectableOnClick ) {

        if ( self.isSelected() ) {

          self.graph.unselectSerie( self );

        } else {
          self.graph.selectSerie( self );
        }
      }
    } );

  };

  /**
   * @name SerieLineDefaultOptions
   * @object
   * @static
   * @memberof SerieLine
   */
  SerieLine.prototype.defaults = {

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
   * Sets the options of the serie
   * @see SerieLineDefaultOptions
   * @param {Object} options - A object containing the options to set
   * @return {SerieLine} The current serie
   * @memberof SerieLine
   
*/
  SerieLine.prototype.setOptions = function( options ) {
    this.options = $.extend( true, {}, SerieLine.prototype.defaults, ( options || {} ) );
    // Unselected style
    this.styles.unselected = {
      lineColor: this.options.lineColor,
      lineStyle: this.options.lineStyle,
      markers: this.options.markers
    };

    this.applyLineStyles();
    return this;
  };

  SerieLine.prototype.calculateSlots = function() {

    var self = this;
    this.slotsData = {};
    for ( var i = 0, l = this.slots.length; i < l; i++ ) {
      this.calculateSlot( this.slots[ i ], i );
    }
  };

  SerieLine.prototype.slotCalculator = function( slot, slotNumber ) {

    return SlotOptimizer( {

      min: this.minX,
      max: this.maxX,
      data: this.data,
      slot: slot,
      slotNumber: slotNumber,
      flip: this.getFlip()

    } );

  };

  SerieLine.prototype.calculateSlot = function( slot, slotNumber ) {
    var self = this;
    this.slotsData[ slot ] = this.slotCalculator( slot, slotNumber );
    this.slotsData[ slot ].pipe( function( data ) {

      self.slotsData[ slot ] = data;
      return data;
    } );
  };

  SerieLine.prototype.onMouseOverMarker = function( e, index ) {

    var toggledOn = this.toggleMarker( index, true, true );
    if ( this.options.onMouseOverMarker ) {

      this.options.onMouseOverMarker( index, this.infos ? ( this.infos[ index[ 0 ] ] ||  false ) : false, [ this.data[ index[ 1 ] ][ index[ 0 ] * 2 ], this.data[ index[ 1 ] ][ index[ 0 ] * 2 + 1 ] ] );
    }
  };

  SerieLine.prototype.onMouseOutMarker = function( e, index ) {
    this.markersOffHover();
    if ( this.options.onMouseOutMarker ) {
      this.options.onMouseOutMarker( index, this.infos ? ( this.infos[ index[ 0 ] ] ||  false ) : false, [ this.data[ index[ 1 ] ][ index[ 0 ] * 2 ], this.data[ index[ 1 ] ][ index[ 0 ] * 2 + 1 ] ] );
    }
  };

  /**
   * Selects one of the markers of the serie
   * @param {Number} index - The point index to select (starting at 0)
   * @param {Boolean} [force = undefined] - Forces state of the marker. <code>true</code> forces selection, <code>false</code> forces deselection. <code>undefined</code> toggles the state of the marker
   * @param {Boolean} [hover = false] - <code>true</code> to set the selection in mode "hover" (will disappear on mouse out of the marker). <code>false</code> to set the selection in mode "select" (will disappear when another marker is selected)
   * @returns {Boolean} The new state of the marker
   * @memberof SerieLine
   */
  SerieLine.prototype.toggleMarker = function( index, force, hover ) {

    var i = index[ 0 ],
      k = index[ 1 ] || 0;

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
        x = this._xDataToUse[ k ].x + i * this._xDataToUse[ k ].dx;
        y = this.data[ k ][ i ];
      } else {
        x = this.data[ k ][ i * 2 ];
        y = this.data[ k ][ i * 2 + 1 ];
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
  };

  /**
   * Toggles off markers that have the hover mode "on"
   * @returns {SerieLine} The current serie
   * @memberof SerieLine
   */
  SerieLine.prototype.markersOffHover = function() {

    for ( var i in this.domMarkerHover ) {
      this.toggleMarker( i.split( ',' ), false, true );
    }
    return this;
  };

  /**
   * Toggles off markers that have the select mode "on"
   * @returns {SerieLine} The current serie
   * @memberof SerieLine
   */
  SerieLine.prototype.markersOffSelect = function() {

    for ( var i in this.domMarkerSelect ) {
      this.toggleMarker( i.split( ',' ), false, false );
    }
    return this;
  };

  SerieLine.prototype.onClickOnMarker = function( e, index ) {

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
  };

  SerieLine.prototype._getMarkerIndexFromEvent = function( e ) {
    var px = this.graph._getXY( e );

    //  return this.searchIndexByPxXY( ( px.x ), ( px.y ) );
    return this.searchIndexByPxXY( ( px.x - this.graph.getPaddingLeft() ), ( px.y - this.graph.getPaddingTop() ) );
  };

  SerieLine.prototype.onMouseWheel = function() {};

  /**
   * Cleans the DOM from the serie internal object (serie and markers). Mostly used internally when a new {@link Serie#setData} is called
   * @returns {SerieLine} The current serie
   * @memberof SerieLine
   */
  SerieLine.prototype.empty = function() {

    for ( var i = 0, l = this.lines.length; i < l; i++ ) {
      this.groupLines.removeChild( this.lines[ i ] );
    }
    this.lines = [];

    return this;
  };

  /**
   * Applies a selection to the serie
   * @param {String} [ selectionType = "selected" ] - The selection name
   * @returns {SerieLine} The current serie
   * @see SerieLine#unselect
   * @memberof SerieLine
   */
  SerieLine.prototype.select = function( selectionType ) {

    selectionType = selectionType ||  "selected";

    this.selected = selectionType !== "unselected";

    if ( !( !this.areMarkersShown() && !this.areMarkersShown( selectionType ) ) ) {
      this.selectionType = selectionType;

      this.draw(); // Drawing is absolutely required here
      this.applyLineStyles();
    } else {
      this.selectionType = selectionType;
      this.applyLineStyles();
    }

    this.applyLineStyle( this.getSymbolForLegend() );
    return this;
  };

  /**
   * Removes the selection to the serie. Effectively, calls {@link SerieLine#select}("unselected").
   * @returns {SerieLine} The current serie
   * @see SerieLine#select
   * @memberof SerieLine
   */
  SerieLine.prototype.unselect = function() {

    this.selected = false;
    return this.select( "unselected" );
  };

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
  SerieLine.prototype.degrade = function( pxPerP, options ) {

    var serie = this.graph.newSerie( this.name + "_degraded", options, 'zone' );

    this.degradationPx = pxPerP;

    if ( !serie ) {
      return;
    }

    serie.setData( [] );

    serie.setXAxis( this.getXAxis() );
    serie.setYAxis( this.getYAxis() );

    this.degradationSerie = serie;

    return serie;
  };

  SerieLine.prototype.drawInit = function() {

    var data, xData;

    this.currentLineId = 0;
    this.counter = 0;
    this._drawn = true;
    this.currentLine = "";

    // Degradation
    if ( this.degradationPx ) {

      data = getDegradedData( this );
      xData = data[ 1 ];
      data = data[ 0 ];
      this._dataToUse = data;
      this._xDataToUse = xData;

    } else {

      this._dataToUse = this.data;
      this._xDataToUse = this.xData;
    }

    this._optimizeMonotoneous = this.isXMonotoneous();

    this.optimizeMonotoneousDirection = ( this.XMonotoneousDirection() && !this.getXAxis().isFlipped() ) ||  ( !this.XMonotoneousDirection() && this.getXAxis().isFlipped() );

    this._optimizeBreak;
    this._optimizeBuffer;

    // Slots
    this._slotToUse = false;
    if ( this.options.useSlots && this.slots && this.slots.length > 0 ) {
      if ( this.isFlipped() ) {
        var slot = this.graph.getDrawingHeight() * ( this.maxY - this.minY ) / ( this.getYAxis().getCurrentMax() - this.getYAxis().getCurrentMin() );
      } else {
        var slot = this.graph.getDrawingWidth() * ( this.maxX - this.minX ) / ( this.getXAxis().getCurrentMax() - this.getXAxis().getCurrentMin() );
      }

      for ( var y = 0, z = this.slots.length; y < z; y++ ) {
        if ( slot < this.slots[ y ] ) {
          this._slotToUse = this.slotsData[ this.slots[ y ] ];
          this._slotId = y;
          break;
        }
      }
    }

    this.detectedPeaks = [];
    this.lastYPeakPicking = false;

  };

  SerieLine.prototype.removeLinesGroup = function() {
    this._afterLinesGroup = this.groupLines.nextSibling;
    this.groupMain.removeChild( this.groupLines );
  };

  SerieLine.prototype.insertLinesGroup = function() {

    if ( !this._afterLinesGroup ) {
      throw "Could not find group after lines to insertion."
    }

    this.groupMain.insertBefore( this.groupLines, this._afterLinesGroup );
    this._afterLinesGroup = false;
  };

  SerieLine.prototype.removeExtraLines = function() {

    var i = this.currentLineId,
      l = this.lines.length;

    for ( ; i < l; i++ ) {
      this.groupLines.removeChild( this.lines[ i ] );
    }

    this.lines.splice( this.currentLineId, l - ( this.currentLineId ) );
    this.currentLineId = 0;
  };

  SerieLine.prototype.detectPeaks = function( x, y ) {

    if ( !this.options.autoPeakPicking ) {
      return;
    }

    if ( !this.options.lineToZero ) {

      if ( !this.lastYPeakPicking ) {

        this.lastYPeakPicking = [ y, x ];

      } else {

        if ( ( y >= this.lastYPeakPicking[ 0 ] && this.lookForMaxima ) ||  ( y <= this.lastYPeakPicking[ 0 ] && this.lookForMinima ) ) {

          this.lastYPeakPicking = [ y, x ]

        } else if ( ( y < this.lastYPeakPicking[ 0 ] && this.lookForMaxima ) ||  ( y > this.lastYPeakPicking[ 0 ] && this.lookForMinima ) ) {

          if ( this.lookForMinima ) {
            this.lookForMinima = false;
            this.lookForMaxima = true;

          } else {

            this.lookForMinima = true;
            this.lookForMaxima = false;

            this.detectedPeaks.push( this.lastYPeakPicking );
            this.lastYPeakPicking = false;
          }

          this.lastYPeakPicking = [ y, x ];

        }
      }

    } else {
      this.detectedPeaks.push( [ y, x ] );
    }
  };

  /**
   * Draws the serie
   * @memberof SerieLine
   */
  SerieLine.prototype.draw = function( force ) { // Serie redrawing

    if ( force || this.hasDataChanged() ) {
      this.drawInit();

      var data = this._dataToUse,
        xData = this._xDataToUse,
        slotToUse = this._slotToUse;

      this.removeLinesGroup();
      this.eraseMarkers();

      this.lookForMaxima = true;
      this.lookForMinima = false;

      if ( !this._draw_slot() ) {

        if ( this.mode == 'x_equally_separated' ) {

          this._draw_equally_separated();

        } else {

          this._draw_standard();

        }
      }

      this.makePeakPicking();
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
  };

  SerieLine.prototype._draw_standard = function() {

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
      yAxis = this.getYAxis();

    var xMin = xAxis.getCurrentMin(),
      yMin = yAxis.getCurrentMin(),
      xMax = xAxis.getCurrentMax(),
      yMax = yAxis.getCurrentMax();

    var incrXFlip = 0;
    var incrYFlip = 1;

    var pointOutside = false;
    var lastPointOutside = false;
    var pointOnAxis;
    if ( this.isFlipped() ) {
      incrXFlip = 1;
      incrYFlip = 0;
    }

    for ( ; i < l; i++ ) {

      toBreak = false;
      this.counter1 = i;

      this.currentLine = "";
      j = 0, k = 0, m = data[ i ].length;

      for ( ; j < m; j += 2 ) {

        this.counter2 = j / 2;

        if ( this.markersShown() ) {

          this.getMarkerCurrentFamily( this.counter2 );
        }

        x = data[ i ][ j + incrXFlip ];
        y = data[ i ][ j + incrYFlip ];

        xpx2 = this.getX( x );
        ypx2 = this.getY( y );

        pointOutside = ( x < xMin || y < yMin || x > xMax ||  y > yMax );

        if ( xpx2 == xpx && ypx2 == ypx ) {
          continue;
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
              var yLeftCrossingRatio = ( x - xMin ) / ( x - lastX );
              var yLeftCrossing = ( yLeftCrossingRatio < 1 && yLeftCrossingRatio > 0 ) ? y - yLeftCrossingRatio * ( y - lastY ) : false;
              var yRightCrossingRatio = ( x - xMax ) / ( x - lastX );
              var yRightCrossing = ( yRightCrossingRatio < 1 && yRightCrossingRatio > 0 ) ? y - yRightCrossingRatio * ( y - lastY ) : false;

              // X crossing
              var xTopCrossingRatio = ( y - yMin ) / ( y - lastY );
              var xTopCrossing = ( xTopCrossingRatio < 1 && xTopCrossingRatio > 0 ) ? x - xTopCrossingRatio * ( x - lastX ) : false;
              var xBottomCrossingRatio = ( y - yMax ) / ( y - lastY );
              var xBottomCrossing = ( xBottomCrossingRatio < 1 && xBottomCrossingRatio > 0 ) ? x - xBottomCrossingRatio * ( x - lastX ) : false;

              if ( yLeftCrossing !== false && yLeftCrossing < yMax && yLeftCrossing > yMin ) {
                pointOnAxis.push( [ xMin, yLeftCrossing ] );
              }

              if ( yRightCrossing !== false && yRightCrossing < yMax && yRightCrossing > yMin ) {
                pointOnAxis.push( [ xMax, yRightCrossing ] );
              }

              if ( xTopCrossing !== false && xTopCrossing < xMax && xTopCrossing > xMin ) {
                pointOnAxis.push( [ xTopCrossing, yMin ] );
              }

              if ( xBottomCrossing !== false && xBottomCrossing < xMax && xBottomCrossing > xMin ) {
                pointOnAxis.push( [ xBottomCrossing, yMax ] );
              }

              if ( pointOnAxis.length > 0 ) {

                if ( !pointOutside ) { // We were outside and now go inside

                  if ( pointOnAxis.length > 1 ) {
                    console.error( "Programmation error. Please e-mail me." );
                    console.log( pointOnAxis, xBottomCrossing, xTopCrossing, yRightCrossing, yLeftCrossing, y, yMin, yMax, lastY );
                  }

                  this._createLine();
                  this._addPoint( this.getX( pointOnAxis[ 0 ][ 0 ] ), this.getY( pointOnAxis[ 0 ][ 1 ] ), false, false );
                  this._addPoint( xpx2, ypx2 );

                } else if ( !lastPointOutside ) { // We were inside and now go outside

                  if ( pointOnAxis.length > 1 ) {
                    console.error( "Programmation error. Please e-mail me." );
                    console.log( pointOnAxis, xBottomCrossing, xTopCrossing, yRightCrossing, yLeftCrossing, y, yMin, yMax, lastY );
                  }

                  this._addPoint( this.getX( pointOnAxis[ 0 ][ 0 ] ), this.getY( pointOnAxis[ 0 ][ 1 ] ), false, false );

                } else {

                  // No crossing: do nothing
                  if ( pointOnAxis.length == 2 ) {
                    this._createLine();
                    this._addPoint( this.getX( pointOnAxis[ 0 ][ 0 ] ), this.getY( pointOnAxis[ 0 ][ 1 ] ), false, false );
                    this._addPoint( this.getX( pointOnAxis[ 1 ][ 0 ] ), this.getY( pointOnAxis[ 1 ][ 1 ] ), false, false );
                  }

                }
              } else if ( !pointOutside ) {
                this._addPoint( xpx2, ypx2 );
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

        if ( isNaN( xpx2 ) ||  isNaN( ypx2 ) ) {
          if ( this.counter > 0 ) {

            this._createLine();
          }
          continue;
        }

        // OPTIMIZATION START
        if ( !this._optimize_before( xpx2, ypx2 ) ) {
          continue;

        }
        // OPTIMIZATION END

        this._addPoint( xpx2, ypx2 );

        this.detectPeaks( x, y );

        // OPTIMIZATION START
        if ( !this._optimize_after( xpx2, ypx2 ) ) {
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

      if ( toBreak ) {
        break;
      }

    }

  };

  SerieLine.prototype._draw_slot = function() {

    var self = this;
    if ( this._slotToUse ) {

      if ( this._slotToUse.done ) {

        this._slotToUse.done( function( data ) {
          self.drawSlot( data, self._slotId );
        } );

      } else {

        this.drawSlot( this._slotToUse, self._slotId );

      }
      return true;

    }

    return false;
  };

  SerieLine.prototype._draw_equally_separated = function() {

    var i = 0,
      data = this._dataToUse,
      xData = this._xDataToUse,
      l = data.length,
      j,
      k,
      m,
      xpx,
      ypx,
      toBreak,
      currentLine;

    for ( ; i < l; i++ ) {

      currentLine = "M ";
      j = 0, k = 0, m = data[ i ].length;

      this.counter1 = i;

      for ( ; j < m; j += 1 ) {

        this.counter2 = j;

        if ( this.markersShown() ) {

          this.getMarkerCurrentFamily( k );
        }

        if ( !this.isFlipped() ) {

          xpx = this.getX( xData[ i ].x + j * xData[ i ].dx );
          ypx = this.getY( data[ i ][ j ] );

        } else {

          ypx = this.getX( xData[ i ].x + j * xData[ i ].dx );
          xpx = this.getY( data[ i ][ j ] );

        }

        // OPTIMIZATION START
        if ( !this._optimize_before( xpx, ypx ) ) {
          continue;
        }
        // OPTIMIZATION END

        this._addPoint( xpx, ypx );

        // OPTIMIZATION START
        if ( !this._optimize_after( xpx, ypx ) ) {
          toBreak = true;
          break;
        }
        // OPTIMIZATION END

      }

      this._createLine();

      if ( toBreak ) {
        break;
      }
    }

  };

  SerieLine.prototype._optimize_before = function( xpx, ypx ) {

    if ( !this._optimizeMonotoneous ) {
      return true;
    }

    if ( ( this.optimizeMonotoneousDirection && xpx < this.getXAxis().getMathMinPx() ) || ( !this.optimizeMonotoneousDirection && xpx > this.getXAxis().getMathMaxPx() ) ) {

      //      if ( xpx < this._optimizeMinPxX ) {

      this._optimizeBuffer = [ xpx, ypx ];
      return false;
    }

    if ( this._optimizeBuffer ) {

      this._addPoint( this._optimizeBuffer[ 0 ], this._optimizeBuffer[ 1 ] );
      this._optimizeBuffer = false;

    }

    return true;
  };

  SerieLine.prototype._optimize_after = function( xpx, ypx ) {

    if ( !this._optimizeMonotoneous ) {
      return true;
    }

    if ( ( this.optimizeMonotoneousDirection && xpx > this.getXAxis().getMathMaxPx() ) || ( !this.optimizeMonotoneousDirection && xpx < this.getXAxis().getMathMinPx() ) ) {

      return false;
    }

    return true;
  };

  /**
   * Hides the automatic peak picking (see the autoPeakPicking option)
   * @memberof SerieLine
   */
  SerieLine.prototype.hidePeakPicking = function( lock ) {

    if ( !this._hidePeakPickingLocked ) {
      this._hidePeakPickingLocked = lock;
    }

    hidePeakPicking( this );
  };

  /**
   * Shows the automatic peak picking (see the autoPeakPicking option)
   * @memberof SerieLine
   */
  SerieLine.prototype.showPeakPicking = function( unlock ) {

    if ( this._hidePeakPickingLocked && !unlock ) {
      return;
    }

    showPeakPicking( this );
  };

  /**
   * @param {Number} k - Index of the point for which we should get the family
   * @memberof SerieLine
   */
  SerieLine.prototype.getMarkerCurrentFamily = function( k ) {

    if ( !this.markerPoints[ this.selectionType ] ) {
      return;
    }

    for ( var z = 0; z < this.markerPoints[ this.selectionType ].length; z++ ) {
      if ( this.markerPoints[ this.selectionType ][ z ][ 0 ] <= k )  { // This one is a possibility !
        if ( this.markerPoints[ this.selectionType ][ z ][ 1 ] >= k ) { // Verify that it's in the boundary
          this.markerCurrentFamily = this.markerPoints[ this.selectionType ][ z ][ 2 ];

        }
      } else {
        break;
      }

    }

    return this.markerCurrentFamily;

  };

  SerieLine.prototype.drawSlot = function( slotToUse, y ) {

    var k = 0;
    var i = 0,
      xpx, max;
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

        ypx = Math.floor( this.getY( slotToUse[ j ].x ) ),
          max = this.getX( slotToUse[ j ].max );

        /*if ( this.options.autoPeakPicking ) {
            allY.push( [ slotToUse[ j ].max, slotToUse[ j ].x ] );
          }
* @memberof SerieLine
*/
        this._addPoint( this.getX( slotToUse[ j ].start ), ypx );
        this._addPoint( max, ypx, true );
        this._addPoint( this.getX( slotToUse[ j ].min ), ypx );
        this._addPoint( this.getX( slotToUse[ j ].stop ), ypx, true );

        //    k++;
      } else {

        xpx = Math.floor( this.getX( slotToUse[ j ].x ) ),

          max = this.getY( slotToUse[ j ].max );

        if ( this.options.autoPeakPicking ) {
          allY.push( [ slotToUse[ j ].max, slotToUse[ j ].x ] );
        }

        this._addPoint( xpx, this.getY( slotToUse[ j ].start ) );
        this._addPoint( xpx, max, true );
        this._addPoint( xpx, this.getY( slotToUse[ j ].min ) );
        this._addPoint( xpx, this.getY( slotToUse[ j ].stop ), true );

        //this.counter ++;
      }

    }

    this._createLine();
    i++;

  };

  SerieLine.prototype.setMarkerStyleTo = function( dom, family ) {

    if ( !dom ||  !family ) {
      console.trace();
      throw "Cannot set marker style. DOM does not exist.";
    }

    dom.setAttribute( 'fill', family.fillColor ||  'transparent' );
    dom.setAttribute( 'stroke', family.strokeColor || this.getLineColor() );
    dom.setAttribute( 'stroke-width', family.strokeWidth ||  1 );
  };

  /**
   * Hides the tracking marker (see the trackMouse option)
   * @memberof SerieLine
   */
  SerieLine.prototype.hideTrackingMarker = function() {
    this.marker.setAttribute( 'display', 'none' );
    this.markerLabel.setAttribute( 'display', 'none' );
    this.markerLabelSquare.setAttribute( 'display', 'none' );
  };

  SerieLine.prototype._addPoint = function( xpx, ypx, move, allowMarker ) {
    var pos;

    /*if( ! this.currentLineId ) {
        throw "No current line"
      }* @memberof SerieLine
*/

    if ( this.counter == 0 ) {
      this.currentLine = 'M ';
    } else {

      if ( this.options.lineToZero || move )
        this.currentLine += 'M ';
      else
        this.currentLine += "L ";
    }

    this.currentLine += xpx;
    this.currentLine += " ";
    this.currentLine += ypx;
    this.currentLine += " ";

    if ( this.options.lineToZero && ( pos = this.getYAxis().getPos( 0 ) ) !== undefined ) {

      this.currentLine += "L ";
      this.currentLine += xpx;
      this.currentLine += " ";
      this.currentLine += pos;
      this.currentLine += " ";

    }

    if ( !this.markerPoints ) {
      this.counter++;

      return;
    }

    if ( this.markersShown() && allowMarker !== false ) {
      drawMarkerXY( this, this.markerFamilies[ this.selectionType ][ this.markerCurrentFamily ], xpx, ypx );
    }

    this.counter++;

  };

  // Returns the DOM
  SerieLine.prototype._createLine = function() {

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
  };

  /**
   * Reapply the current style to the serie lines elements. Mostly used internally
   * @memberof SerieLine
   */
  SerieLine.prototype.applyLineStyles = function() {

    for ( var i = 0; i < this.lines.length; i++ ) {
      this.applyLineStyle( this.lines[ i ] );
    }
  };

  /**
   * Applies the current style to a line element. Mostly used internally
   * @memberof SerieLine
   */
  SerieLine.prototype.applyLineStyle = function( line ) {

    line.setAttribute( 'stroke', this.getLineColor() );
    line.setAttribute( 'stroke-width', this.getLineWidth() );
    if ( this.getLineDashArray() ) {
      line.setAttribute( 'stroke-dasharray', this.getLineDashArray() );
    } else {
      line.removeAttribute( 'stroke-dasharray' );
    }
    line.setAttribute( 'fill', 'none' );
    //	line.setAttribute('shape-rendering', 'optimizeSpeed');
  };

  /**
   * Updates the current style (lines + legend) of the serie. Use this method if you have explicitely changed the options of the serie
   * @example var opts = { lineColor: 'red' };
   * var s = graph.newSerie( "name", opts ).setData( someData );
   * opts.lineColor = 'green';
   * s.updateStyle(); // Sets the lineColor to green
   * s.draw(); // Would also do the same thing, but recalculates the whole serie display (including (x,y) point pairs)
   * @memberof SerieLine
   */
  SerieLine.prototype.updateStyle = function() {
    this.applyLineStyles();
    this.setLegendSymbolStyle();

    this.styleHasChanged( false );
  };

  // Revised August 2014. Ok
  SerieLine.prototype.getMarkerPath = function( family, add ) {

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

  };

  // Revised August 2014. Ok
  SerieLine.prototype.getMarkerDom = function( family )  {

    var self = this;
    if ( !family.dom ) {
      var dom = document.createElementNS( this.graph.ns, 'path' );
      this.setMarkerStyleTo( dom, family );
      family.dom = dom;
      family.path = "";

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
  };

  // In case markers are not grouped in families but independant
  SerieLine.prototype.getMarkerDomIndependant = function( index1, index2, family ) {

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

    this.groupMain.appendChild( this.independantMarkers[ index ] );

    return this.independantMarkers[ index ];
  };

  /**
   * Searches the closest point pair (x,y) to the a pair of pixel position
   * @param {Number} x - The x position in pixels (from the left)
   * @param {Number} y - The y position in pixels (from the left)
   * @returns {Number} Index in the data array of the closest (x,y) pair to the pixel position passed in parameters
   * @memberof SerieLine
   */
  SerieLine.prototype.searchIndexByPxXY = function( x, y ) {

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
    } 
    else {

      for ( var i = 0, l = this.data.length; i < l; i++ ) {
        for ( var k = 0, m = this.data[ i ].length; k < m; k += 2 ) {

          p_x = this.data[ i ][ k ],
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
  };

  /**
   * Performs a binary search to find the closest point index to an x value. For the binary search to work, it is important that the x values are monotoneous.
   * @param {Number} valX - The x value to search for
   * @returns {Object} Index in the data array of the closest (x,y) pair to the pixel position passed in parameters
   * @memberof SerieLine
   */
  SerieLine.prototype.searchClosestValue = function( valX ) {

    var xMinIndex;

    for ( var i = 0; i < this.data.length; i++ ) {

      if ( ( valX <= this.data[ i ][ this.data[ i ].length - 2 ] && valX >= this.data[ i ][ 0 ] ) ) {
        xMinIndex = this._searchBinary( valX, this.data[ i ], false );
      } else if ( ( valX >= this.data[ i ][ this.data[ i ].length - 2 ] && valX <= this.data[ i ][ 0 ] ) ) {
        xMinIndex = this._searchBinary( valX, this.data[ i ], true );
      } else {
        continue;
      }

      return {
        dataIndex: i,
        xMin: this.data[ i ][ xMinIndex ],
        xMax: this.data[ i ][ xMinIndex + 2 ],
        yMin: this.data[ i ][ xMinIndex + 1 ],
        yMax: this.data[ i ][ xMinIndex + 3 ],

        xBeforeIndex: xMinIndex / 2,
        xAfterIndex: xMinIndex / 2 + 2,
        xBeforeIndexArr: xMinIndex
      }
    }
  };

  SerieLine.prototype.handleMouseMove = function( x, doMarker ) {

    var valX = x || this.getXAxis().getMouseVal(),
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
      xBeforeIndex: value.xBeforeIndex
    };
  };

  SerieLine.prototype._searchBinary = function( target, haystack, reverse ) {
    var seedA = 0,
      length = haystack.length,
      seedB = ( length - 2 );

    if ( haystack[ seedA ] == target )
      return seedA;

    if ( haystack[ seedB ] == target )
      return seedB;

    var seedInt;
    var i = 0;

    while ( true ) {
      i++;
      if ( i > 100 ) {
        throw "Error loop";
      }

      seedInt = ( seedA + seedB ) / 2;
      seedInt -= seedInt % 2; // Always looks for an x.

      if ( seedInt == seedA || haystack[ seedInt ] == target )
        return seedInt;

      //		console.log(seedA, seedB, seedInt, haystack[seedInt]);
      if ( haystack[ seedInt ] <= target ) {
        if ( reverse )
          seedB = seedInt;
        else
          seedA = seedInt;
      } else if ( haystack[ seedInt ] > target ) {
        if ( reverse )
          seedA = seedInt;
        else
          seedB = seedInt;
      }
    }
  };

  /**
   * Gets the maximum value of the y values between two x values. The x values must be monotoneously increasing
   * @param {Number} startX - The start of the x values
   * @param {Number} endX - The end of the x values
   * @returns {Number} Maximal y value in between startX and endX
   * @memberof SerieLine
   */
  SerieLine.prototype.getMax = function( start, end ) {

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
  };

  /**
   * Gets the minimum value of the y values between two x values. The x values must be monotoneously increasing
   * @param {Number} startX - The start of the x values
   * @param {Number} endX - The end of the x values
   * @returns {Number} Maximal y value in between startX and endX
   * @memberof SerieLine
   */
  SerieLine.prototype.getMin = function( start, end ) {

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
  };

  /* LINE STYLE * @memberof SerieLine
   */

  SerieLine.prototype.setStyle = function( style, selectionType ) {

    this.styles[ selectionType ] = style;
    this.styleHasChanged( selectionType );

  };

  SerieLine.prototype.setLineStyle = function( number, selectionType ) {

    selectionType = selectionType ||  "unselected";
    this.styles[ selectionType ] = this.styles[ selectionType ] || {};
    this.styles[ selectionType ].lineStyle = number;

    this.styleHasChanged( selectionType );

    return this;
  };

  SerieLine.prototype.getLineStyle = function( selectionType ) {
    return this.getStyle( selectionType ).lineStyle;
  };

  SerieLine.prototype.getLineDashArray = function( selectionType ) {

    switch ( this.getStyle( selectionType ).lineStyle ) {

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
        break
      case 7:
        return "2 5";
        break

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
        return this.styles[ selectionType ||  this.selectionType || "unselected" ].lineStyle;
        break;
    }

    this.styleHasChanged( selectionType );

  };

  SerieLine.prototype.getStyle = function( selectionType ) {
    return this.styles[ selectionType || this.selectionType || "unselected" ];
  };

  SerieLine.prototype.extendStyles = function() {
    for ( var i in this.styles ) {

      var s = this.styles[ i ];
      if ( s ) {
        this.styles[ i ] = $.extend( {}, this.styles.unselected, s );
      }
    }
  };
  /*  * @memberof SerieLine
   */

  SerieLine.prototype.setLineWidth = function( width, selectionType ) {

    selectionType = selectionType ||  "unselected";
    this.styles[ selectionType ] = this.styles[ selectionType ] || {};
    this.styles[ selectionType ].lineWidth = width;

    this.styleHasChanged( selectionType );

    return this;
  };

  SerieLine.prototype.getLineWidth = function( selectionType ) {

    return this.getStyle( selectionType ).lineWidth;
  };

  /* LINE COLOR * @memberof SerieLine
   */
  SerieLine.prototype.setLineColor = function( color, selectionType ) {

    selectionType = selectionType ||  "unselected";
    this.styles[ selectionType ] = this.styles[ selectionType ] || {};
    this.styles[ selectionType ].lineColor = color;

    this.styleHasChanged( selectionType );

    return this;
  };

  SerieLine.prototype.getLineColor = function( selectionType ) {

    return this.getStyle( selectionType ).lineColor;
  };

  /* * @memberof SerieLine
   */

  /* MARKERS * @memberof SerieLine
   */
  SerieLine.prototype.showMarkers = function( selectionType, redraw ) {
    selectionType = selectionType ||  "unselected";
    this.styles[ selectionType ] = this.styles[ selectionType ] || {};
    this.styles[ selectionType ].markers = true;

    if ( redraw && this._drawn ) {
      this.draw();
    } else {
      this.styleHasChanged( selectionType );
    }

    return this;
  };

  SerieLine.prototype.hideMarkers = function( selectionType, redraw ) {

    selectionType = selectionType ||  "unselected";
    this.styles[ selectionType ].markers = false;

    if ( redraw && this._drawn ) {
      this.draw();
    } else {
      this.styleHasChanged( selectionType );
    }
    return this;
  };

  SerieLine.prototype.markersShown = function( selectionType ) {
    return this.getStyle( selectionType ).markers;
  };

  SerieLine.prototype.areMarkersShown = function() {
    return this.markersShown.apply( this, arguments );
  };

  SerieLine.prototype.isMarkersShown = function() {
    return this.markersShown.apply( this, arguments );
  };

  // Multiple markers
  SerieLine.prototype.setMarkers = function( families, selectionType ) {
    // Family has to be an object
    // Family looks like
    /*
				{
					type: 1,
					zoom: 1,
					strokeWidth: 1,
					strokeColor: ''
					fillColor: '',
				}
			* @memberof SerieLine
*/

    //    this.styles[ selectionType || "unselected" ] = this.styles[ selectionType || "unselected" ] || {};

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

    var markerPoints = [];
    // Overwriting any other undefined families
    markerPoints.push( [ 0, Infinity, null ] );

    for ( var i = 0, k = families.length; i < k; i++ ) {

      this.getMarkerDom( families[ i ] );
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

    this.markerFamilies = this.markerFamilies || {};
    this.markerFamilies[ selectionType || "unselected" ] = families;

    // Let's sort if by the first index.
    markerPoints.sort( function( a, b ) { 
      return ( a[ 0 ] - b[ 0 ] ) ||  ( a[ 2 ] == null ? -1 : 1 );
    } );

    this.markerPoints = this.markerPoints || {}; // By default, markerPoints doesn't exist, to optimize the cases without markers
    this.markerPoints[ selectionType || "unselected" ] = markerPoints;

    this.styles[ selectionType || "unselected" ].markers = families;

    this.styleHasChanged( selectionType );
    this.dataHasChanged( true ); // Data has not really changed, but marker placing is performed during the draw method

    return this;
  };

  SerieLine.prototype.insertMarkers = function() {

    if ( !this.markerFamilies || !this.markerFamilies[ this.selectionType ] || this.options.markersIndependant ) {
      return;
    }

    for ( var i = 0, l = this.markerFamilies[ this.selectionType ].length; i < l; i++ ) {
      this.markerFamilies[ this.selectionType ][ i ].dom.setAttribute( 'd', this.markerFamilies[ this.selectionType ][ i ].path );
      this.groupMain.appendChild( this.markerFamilies[ this.selectionType ][ i ].dom );
      this.currentMarkersSelectionType = this.selectionType;
    }
  };

  SerieLine.prototype.getMarkerForLegend = function() {

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
  };

  SerieLine.prototype.eraseMarkers = function() {

    var self = this;

    if ( this.options.markersIndependant ) {

      for ( var i in this.independantMarkers ) {
        self.groupMain.removeChild( this.independantMarkers[ i ] );
      }

      this.independantMarkers = {};

    } else if ( this.currentMarkersSelectionType ) {

      this.markerFamilies[ this.currentMarkersSelectionType ].map( function( el ) {
        self.groupMain.removeChild( el.dom );
        el.path = "";
      } );

      this.currentMarkersSelectionType = false;
    }

  };

  SerieLine.prototype.showImpl = function() {
    this.showPeakPicking();
  };

  SerieLine.prototype.hideImpl = function() {
    this.hidePeakPicking();
  };

  SerieLine.prototype.XIsMonotoneous = function() {
    this.xmonotoneous = true;
    return this;
  };

  SerieLine.prototype.isXMonotoneous = function() {
    return this.xmonotoneous ||  false;
  };

  SerieLine.prototype.XMonotoneousDirection = function() {

    return this.data && this.data[ 0 ] && ( this.data[ 0 ][ 2 ] - this.data[ 0 ][ 0 ] ) > 0;
  };

  SerieLine.prototype.makePeakPicking = function() {

    var self = this;
    var ys = this.detectedPeaks;

    var x,
      px,
      passed = [],
      px,
      i = 0,
      l = ys.length,
      k, m, y,
      index;

    var selected = self.graph.selectedShapes.map( function( shape ) {
      return shape._data.val;
    } );

    ys.sort( function( a, b ) {
      return b[ 0 ] - a[ 0 ];
    } );

    m = 0;

    for ( ; i < l; i++ ) {

      x = ys[ i ][ 1 ],
        px = self.getX( x ),
        k = 0,
        y = self.getY( ys[ i ][ 0 ] );

      if ( px < self.getXAxis().getMinPx() || px > self.getXAxis().getMaxPx() ) {
        continue;
      }

      if ( !self.options.autoPeakPickingAllowAllY && ( y > self.getYAxis().getMinPx() || y < self.getYAxis().getMaxPx() ) ) {

        continue;
      }

      // Distance check
      for ( ; k < passed.length; k++ ) {
        if ( Math.abs( passed[ k ] - px ) < self.options.autoPeakPickingMinDistance )  {
          break;
        }
      }
      if ( k < passed.length ) {
        continue;
      }

      // Distance check end

      // If the retained one has already been selected somewhere, continue;
      if ( ( index = selected.indexOf( x ) ) > -1 ) {
        passed.push( px );
        continue;
      }

      if ( !self.picks[ m ] ) {
        return;
      }

      //console.log( this.getYAxis().getDataMax(), this.getYAxis().getCurrentMin(), y );
      //    self.picks[ m ].show();

      if ( this.getYAxis().getPx( ys[ i ][ 0 ] ) - 20 < 0 ) {

        self.picks[ m ].prop( 'labelPosition', {
          x: x,
          y: "5px",
        } );

        self.picks[ m ].prop( 'labelBaseline', 'hanging' );

      } else {

        self.picks[ m ].prop( 'labelBaseline', 'no-change' );

        self.picks[ m ].prop( 'labelPosition', {
          x: x,
          y: ys[ i ][ 0 ],
          dy: "-15px"
        } );

      }

      self.picks[ m ]._data.val = x;

      if ( self.options.autoPeakPickingFormat ) {

        self.picks[ m ]._data.label[ 0 ].text = self.options.autoPeakPickingFormat.call( self.picks[ m ], x, m );
      } else {
        self.picks[ m ]._data.label[ 0 ].text = String( Math.round( x * 1000 ) / 1000 );
      }

      self.picks[ m ].redraw();

      m++;
      while ( self.picks[ m ] && self.picks[ m ].isSelected() ) {
        m++;
      }

      if ( passed.length == self.options.autoPeakPickingNb ) {
        break;
      }
    }

  };

  function drawMarkerXY( graph, family, x, y ) {

    if ( !family ) {
      return;
    }

    if ( graph.options.markersIndependant ) {
      var dom = graph.getMarkerDomIndependant( graph.counter1, graph.counter2, family );
      var p = 'M ' + x + ' ' + y + ' ';
      p += family.markerPath + ' ';

      dom.setAttribute( 'd', p );
    }

    family.path = family.path ||  "";
    family.path += 'M ' + x + ' ' + y + ' ';
    family.path += family.markerPath + ' ';
  }

  function getDegradedData( graph ) { // Serie redrawing

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
      degradationMin, degradationMax, degradationNb, degradationValue, degradation, degradationMinMax = [],
      incrXFlip = 0,
      incrYFlip = 1,
      degradeFirstX, degradeFirstXPx,
      optimizeMonotoneous = graph.isXMonotoneous(),
      optimizeMaxPxX = graph.getXAxis().getMathMaxPx(),
      optimizeBreak, buffer;

    if ( graph.isFlipped() ) {
      incrXFlip = 1;
      incrYFlip = 0;
    }

    var datas = [];
    var xData = [],
      dataY = [],
      sum = 0;

    if ( graph.mode == 'x_equally_separated' ) {

      if ( graph.isFlipped() ) {
        return [ graph.data, graph.xData ];
      }

      dataY = [];

      for ( ; i < l; i++ ) {

        j = 0, k = 0, m = graph.data[ i ].length;

        var delta = Math.round( graph.degradationPx / graph.getXAxis().getRelPx( graph.xData[ i ].dx ) );

        if ( delta == 1 ) {
          xData.push( graph.xData[ i ] );
          datas.push( graph.data[ i ] );
        }

        degradationMin = Infinity;
        degradationMax = -Infinity;

        for ( ; j < m; j += 1 ) {

          xpx = graph.xData[ i ].x + j * graph.xData[ i ].dx;

          if ( optimizeMonotoneous && xpx < 0 ) {
            buffer = [ xpx, ypx, graph.data[ i ][ j ] ];
            continue;
          }

          if ( optimizeMonotoneous && buffer ) {

            sum += buffer[ 2 ];
            degradationMin = Math.min( degradationMin, buffer[ 2 ] );
            degradationMax = Math.max( degradationMax, buffer[ 2 ] );

            buffer = false;
            k++;
          }

          sum += graph.data[ i ][ j ];
          degradationMin = Math.min( degradationMin, graph.data[ i ][ j ] );
          degradationMax = Math.max( degradationMax, graph.data[ i ][ j ] );

          if ( ( j % delta == 0 && j > 0 ) || optimizeBreak ) {

            dataY.push( sum / delta );

            degradationMinMax.push( ( graph.xData[ i ].x + j * graph.xData[ i ].dx - ( delta / 2 ) * graph.xData[ i ].dx ), degradationMin, degradationMax );

            degradationMin = Infinity;
            degradationMax = -Infinity;

            sum = 0;
          }

          if ( optimizeMonotoneous && xpx > optimizeMaxPxX ) {

            optimizeBreak = true;

            break;
          }

          k++;
        }

        datas.push( dataY );
        xData.push( {
          dx: delta * graph.xData[ i ].dx,
          x: graph.xData[ i ].x + ( delta * graph.xData[ i ].dx / 2 )
        } );
      }

      if ( graph.degradationSerie ) {
        graph.degradationSerie.setData( degradationMinMax );
        graph.degradationSerie.draw();
      }

      return [ datas, xData ]

    }

    for ( ; i < l; i++ ) {

      j = 0,
        k = 0,
        m = graph.data[ i ].length;

      degradationNb = 0;
      degradationValue = 0;

      degradationMin = Infinity;
      degradationMax = -Infinity;

      var data = [];
      for ( ; j < m; j += 2 ) {

        xpx2 = graph.getX( graph.data[ i ][ j + incrXFlip ] );

        if ( optimizeMonotoneous && xpx2 < 0 ) {

          buffer = [
            xpx2,
            graph.getY( graph.data[ i ][ j + incrYFlip ] ),
            graph.data[ i ][ j + incrXFlip ],
            graph.data[ i ][ j + incrYFlip ]
          ];

          continue;
        }

        if ( optimizeMonotoneous && buffer ) {

          degradationValue += buffer[  3 ];
          degradationNb++;

          degradationMin = Math.min( degradationMin, buffer[ 3 ] );
          degradationMax = Math.max( degradationMax, buffer[ 3 ] );

          degradeFirstX = buffer[  2 ];
          degradeFirstXPx = buffer[  0 ];

          buffer = false;
          k++;

        } else if ( degradeFirstX === undefined ) {

          degradeFirstX = graph.data[ i ][ j + incrXFlip ];
          degradeFirstXPx = xpx2;
        }

        if ( Math.abs( xpx2 - degradeFirstXPx ) > graph.degradationPx && j < m ) {

          data.push(
            ( degradeFirstX + graph.data[ i ][ j + incrXFlip ] ) / 2,
            degradationValue / degradationNb
          );

          degradationMinMax.push( ( graph.data[ i ][ j + incrXFlip ] + degradeFirstX ) / 2, degradationMin, degradationMax );

          if ( degradeFirstXPx > optimizeMaxPxX ) {

            break;
          }

          degradeFirstX = undefined;
          degradationNb = 0;
          degradationValue = 0;
          degradationMin = Infinity;
          degradationMax = -Infinity;

          k++;
        }

        degradationValue += graph.data[ i ][ j + incrYFlip ];
        degradationNb++;

        degradationMin = Math.min( degradationMin, graph.data[ i ][ j + incrYFlip ] );
        degradationMax = Math.max( degradationMax, graph.data[ i ][ j + incrYFlip ] );

        if ( optimizeMonotoneous && xpx2 > optimizeMaxPxX ) {

          optimizeBreak = true;
        }

        xpx = xpx2;
        ypx = ypx2;

      }

      datas.push( data );

      if ( optimizeBreak ) {

        break;
      }
    }

    if ( graph.degradationSerie ) {
      graph.degradationSerie.setData( degradationMinMax );
      graph.degradationSerie.draw();
    }

    return [ datas ];
  };

  function hidePeakPicking( graph ) {

    if ( !graph.picks ) {
      return;
    }
    for ( var i = 0; i < graph.picks.length; i++ ) {
      graph.picks[ i ].hide();
    }

  }

  function showPeakPicking( graph ) {

    if ( !graph.picks ) {
      return;
    }

    for ( var i = 0; i < graph.picks.length; i++ ) {
      graph.picks[ i ].show();
    }
  }

  return SerieLine;
} );