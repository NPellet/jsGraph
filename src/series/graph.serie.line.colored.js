import SerieLine from './graph.serie.line'
import * as util from '../graph.util'
import ErrorBarMixin from '../mixins/graph.mixin.errorbars'

/** 
 * Colored serie line
 * @example graph.newSerie( name, options, "color" );
 * @see Graph#newSerie
 * @augments SerieLine
 */
class SerieLineColor extends SerieLine {

  constructor() {
    super( ...arguments );
  }

  initExtended1() {

    this.lines = this.lines ||  {};
    if ( this.initExtended2 ) {
      this.initExtended2();
    }
  }

  setColors( colors ) {
    this.colors = colors;
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
    var yLeftCrossingRatio,
      yLeftCrossing,
      yRightCrossingRatio,
      yRightCrossing,
      xTopCrossingRatio,
      xTopCrossing,
      xBottomCrossingRatio,
      xBottomCrossing;

    var incrXFlip = 0;
    var incrYFlip = 1;

    var pointOutside = false;
    var lastPointOutside = false;
    var pointOnAxis;

    this.eraseLines();

    if ( this.isFlipped() ) {
      incrXFlip = 1;
      incrYFlip = 0;
    }

    for ( i = 0; i < l; i++ ) {

      toBreak = false;
      this.counter1 = i;

      this.currentLine = "";
      j = 0;
      k = 0;
      m = data[ i ].length;

      for ( j = 0; j < m; j += 2 ) {

        x = data[ i ][ j + incrXFlip ];
        y = data[ i ][ j + incrYFlip ];

        if ( ( x < xMin && lastX < xMin ) || ( x > xMax && lastX > xMax ) || ( ( ( y < yMin && lastY < yMin ) || ( y > yMax && lastY > yMax ) ) && !this.options.lineToZero ) ) {
          lastX = x;
          lastY = y;
          lastPointOutside = true;
          continue;
        }

        this.counter2 = j / 2;

        if ( this.markersShown() ) {
          this.getMarkerCurrentFamily( this.counter2 );
        }

        xpx2 = this.getX( x );
        ypx2 = this.getY( y );

        if ( xpx2 == xpx && ypx2 == ypx ) {
          continue;
        }

        pointOutside = ( x < xMin || y < yMin || x > xMax ||  y > yMax );
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

        if ( isNaN( xpx2 ) ||  isNaN( ypx2 ) ) {
          if ( this.counter > 0 ) {

            //      this._createLine();
          }
          continue;
        }

        // OPTIMIZATION START
        if ( !this._optimize_before( xpx2, ypx2 ) ) {
          continue;
        }
        // OPTIMIZATION END

        var color = this.colors[ i ][ j / 2 ];

        this._addPoint( xpx2, ypx2, x, y, xpx, ypx, lastX, lastY, j, color, false, true );

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

      // this._createLine();

      if ( toBreak ) {
        break;
      }

    }

    this.latchLines();

    if ( this._tracker ) {

      if ( this._trackerDom ) {
        this._trackerDom.remove();
      }

      var cloned = this.groupLines.cloneNode( true );
      this.groupMain.appendChild( cloned );

      for ( var i = 0, l = cloned.children.length; i < l; i++ ) {

        cloned.children[ i ].setAttribute( 'stroke', 'transparent' );
        cloned.children[ i ].setAttribute( 'stroke-width', '25px' );
        cloned.children[ i ].setAttribute( 'pointer-events', 'stroke' );
      }

      self._trackerDom = cloned;

      self.groupMain.addEventListener( "mousemove", function( e ) {
        var coords = self.graph._getXY( e ),
          ret = self.handleMouseMove( false, false );
        self._trackingCallback( self, ret, coords.x, coords.y );
      } );

      self.groupMain.addEventListener( "mouseleave", function( e ) {
        self._trackingOutCallback( self );
      } );
    }
    return this;

  }

  _addPoint( xpx, ypx, x, y, xpxbefore, ypxbefore, xbefore, ybefore, j, color, move, allowMarker ) {

    if ( xpxbefore === undefined || ypxbefore === undefined ) {
      return;
    }

    if ( isNaN( xpx ) ||  isNaN( ypx ) ) {
      return;
    }

    var line = this.lines[ color ];
    if ( !line ) {
      line = this.lines[ color ] = { 
        object: document.createElementNS( this.graph.ns, 'path' ),
        path: "",
        color: color
      };
      line.object.setAttribute( 'stroke', color );
      line.color = color;
      //      this.applyLineStyle( line );
      this.groupLines.appendChild( line.object );
    }

    line.path += "M " + xpxbefore + " " + ypxbefore + " L " + xpx + " " + ypx;

    if ( this.error ) {
      this.errorAddPoint( j, x, y, xpx, ypx );
    }

    /*if ( this.markersShown() && allowMarker !== false ) {
      drawMarkerXY( this, this.markerFamilies[ this.selectionType ][ this.markerCurrentFamily ], xpx, ypx );
    }*/
  }

  removeExtraLines() {

  }

  // Returns the DOM
  latchLines() {

    for ( var i in this.lines ) {
      this.lines[ i ].object.setAttribute( 'd', this.lines[ i ].path );
    }
  };

  // Returns the DOM
  eraseLines() {

    for ( var i in this.lines ) {
      this.lines[ i ].path = "";
      this.lines[ i ].object.setAttribute( 'd', "" );
    }
  }

  /**
   * Applies the current style to a line element. Mostly used internally
   * @memberof SerieLine
   */
  applyLineStyle( line ) {

    //line.setAttribute( 'stroke', this.getLineColor() );
    line.setAttribute( 'stroke-width', this.getLineWidth() );
    if ( this.getLineDashArray() ) {
      line.setAttribute( 'stroke-dasharray', this.getLineDashArray() );
    } else {
      line.removeAttribute( 'stroke-dasharray' );
    }
    line.setAttribute( 'fill', 'none' );
    //	line.setAttribute('shape-rendering', 'optimizeSpeed');
  }
}

export default SerieLineColor