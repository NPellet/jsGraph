import ShapeSurfaceUnderCurve from './graph.shape.areaundercurve'
import GraphPosition from '../graph.position'

/**
 * Displays an integral with NMR style
 * @extends ShapeSurfaceUnderCurve
 */
class ShapeNMRIntegral extends ShapeSurfaceUnderCurve {

  constructor( graph, options ) {

    super( graph, options );

    this.nbHandles = 2;
  }

  initImpl() {
    this.setFillColor( 'transparent' );
    this.setStrokeColor( 'black' );
  }

  createHandles() {

    this._createHandles( 2, 'rect', {
      transform: "translate(-3 -3)",
      width: 6,
      height: 6,
      stroke: "black",
      fill: "white"
    } );
  }

  applyPosition() {

    let
      x,
      y,
      xVal,
      yVal,
      axis = this.getAxis(),
      points = [];

    let currentLine = "";

    let baseLine = 300;
    let ratio;

    if ( !this.serie ) {
      throw "No serie exists for this shape";
    };
    //    this.reversed = x == posXY2.x;

    var pos1 = this.getPosition( 0 );
    var pos2 = this.getPosition( 1 );
    /*
        if (
          ( axis == 'x' && ( w < 2 || x + w < 0 || x > this.graph.getDrawingWidth() ) ) ||
          ( axis == 'y' && ( w < 2 || x + w < 0 || x > this.graph.getDrawingHeight() ) )
        ) {

          points = [
            [ 0, 0 ]
          ];
          this.hideLabel( 0 );
          this.setDom( "d", "" );
          this.hideHandles();

        } else {
    */
    this.showLabel( 0 );

    let sum = 0;

    let j;
    let waveform = this.serie.getWaveform();
    let index1 = waveform.getIndexFromX( pos1[ axis ], true );
    let index2 = waveform.getIndexFromX( pos2[ axis ], true );
    let firstX, firstY, firstXVal, firstYVal, lastX, lastXVal, lastY, lastYVal;
    let sum2 = 0;

    for ( j = index1; j <= index2; j++ ) {

      xVal = waveform.getX( j, true );
      yVal = waveform.getY( j, true );

      x = this.serie.getX( xVal );
      y = this.serie.getY( yVal );

      if ( !firstX ) {

        firstX = x;
        firstY = y;
        firstXVal = waveform.getX( j );
        firstYVal = waveform.getY( j );
      }

      if ( lastX == undefined ) {

        lastX = x;
        lastY = y;
        lastXVal = waveform.getX( j );
        lastYVal = waveform.getY( j );
        continue;
      }

      if ( x == lastX && y == lastY ) {
        continue;
      }

      lastX = x;
      lastY = y;

      sum2 += ( xVal - lastXVal ) * ( yVal ) * 0.5;

      points.push( [ x, y, sum2 ] );
      lastXVal = xVal;
    }

    waveform = this.serie.getWaveform();
    index1 = waveform.getIndexFromX( pos1[ axis ] );
    index2 = waveform.getIndexFromX( pos2[ axis ] );

    lastXVal = false;
    lastYVal = false;
    lastX = false;
    lastY = false;

    for ( j = index1; j <= index2; j++ ) {

      xVal = waveform.getX( j );
      yVal = waveform.getY( j );
      x = this.serie.getX( xVal );
      y = this.serie.getY( yVal );

      if ( !firstX ) {

        firstX = x;
        firstY = y;
        firstXVal = xVal;
        firstYVal = yVal;
      }

      if ( !lastX ) {
        lastX = x;
        lastY = y;
        lastXVal = xVal;
        lastYVal = yVal;
        continue;
      }

      if ( x == lastX && y == lastY ) {
        continue;
      }

      lastX = x;
      lastY = y;

      sum += ( xVal - lastXVal ) * ( yVal ) * 0.5;

      lastXVal = xVal;

    }

    if ( !this.ratio ) {
      // 150px / unit
      ratio = 300 / sum;

    } else {
      // Already existing
      ratio = this.ratio;
    }

    for ( var i = 0, l = points.length; i < l; i++ ) {

      points[ i ][ 2 ] = baseLine - ( points[ i ][ 2 ] ) * sum / sum2 * ratio;

      if ( i == 0 ) {
        this.firstPointX = points[ i ][ 0 ];
        this.firstPointY = points[ i ][ 1 ];
      }

      currentLine += " L " + points[ i ][ 0 ] + ", " + points[ i ][ 2 ] + " ";

      this.lastPointX = points[ i ][ 0 ];
      this.lastPointY = points[ i ][ 1 ];
    }

    this.points = points;
    this.sum = sum;

    if ( this.serie.isFlipped() ) {
      currentLine = " M " + baseLine + ", " + firstX + " " + currentLine;
    } else {
      currentLine = " M " + firstX + ", " + baseLine + " " + currentLine;
    }

    this.setDom( 'd', currentLine );

    this.firstX = firstX;
    this.firstY = firstY;
    /*
          if ( this._selected ) {
            this.select();
          }

          this.setHandles();*/

    this.setLabelPosition( new GraphPosition( {
      x: ( pos1.x + pos2.x ) / 2,
      y: ( this.firstPointY + this.lastPointY ) / 2 + "px"
    } ) );

    this.updateLabels();
    this.changed();

    return true;
  }

  getAxis() {
    return this._data.axis ||  'x';
  }

  /**
   * User to screen coordinate transform. In (unit)/(px), (unit) being the unit of the integral (x * y)
   * @type {Number}
   */
  set ratio( r = 1 ) {
    this._ratio = r;
  }

  get ratio() {
    return this._ratio;
  }

  selectStyle() {
    this.setDom( 'stroke-width', '2px' );
  }

  selectHandles() {} // Cancel areaundercurve

  setHandles() {

    if ( this.points == undefined ) {
      return;
    }

    if ( !this.isSelected() ) {
      return;
    }

    this.addHandles();

    var posXY = this.computePosition( 0 ),
      posXY2 = this.computePosition( 1 );

    if ( posXY.x < posXY2.x ) {

      this.handles[ 1 ].setAttribute( 'x', this.firstPointX );
      this.handles[ 1 ].setAttribute( 'y', this.firstPointY );
      this.handles[ 2 ].setAttribute( 'x', this.lastPointX );
      this.handles[ 2 ].setAttribute( 'y', this.lastPointY );

    } else {

      this.handles[ 2 ].setAttribute( 'x', this.firstPointX );
      this.handles[ 2 ].setAttribute( 'y', this.firstPointY );
      this.handles[ 1 ].setAttribute( 'x', this.lastPointX );
      this.handles[ 1 ].setAttribute( 'y', this.lastPointY );

    }
  }
}

export default ShapeNMRIntegral;