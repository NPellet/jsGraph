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
    console.trace();
    if ( !waveform ) {
      return;
    }
    let index1 = waveform.getIndexFromX( pos1[ axis ], true );
    let index2 = waveform.getIndexFromX( pos2[ axis ], true );
    let firstX, firstY, firstXVal, firstYVal, lastX, lastXVal, lastY, lastYVal;
    let data = waveform.getDataInUse();

    index1 -= index1 % 4;
    index2 -= index2 % 4;

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
      //console.log( data, data[ j ] );

      if ( j % 4 == 0 && j > index1 && data.sums ) { // Sums are located every 4 element
        sum += data.sums[ j ] * ( data.x[ j ] - data.x[ j - 3 ] ); // y * (out-in)
      }

      points.push( [ x, y, sum ] );
      lastXVal = xVal;
    }

    waveform = this.serie.getWaveform();

    lastXVal = false;
    lastYVal = false;
    lastX = false;
    lastY = false;

    if ( sum == 0 ) {
      sum = 1;
    }
    console.log( this.ratio );
    if ( !this.ratio ) {
      // 150px / unit
      this.ratio = 300 / sum;

    } else {
      // Already existing
      this.ratio = this.ratio;
    }

    for ( var i = 0, l = points.length; i < l; i++ ) {

      points[ i ][ 2 ] = baseLine - ( points[ i ][ 2 ] ) * this.ratio;

      if ( i == 0 ) {
        this.firstPointX = points[ i ][ 0 ];
        this.firstPointY = points[ i ][ 2 ];
      }

      currentLine += " L " + points[ i ][ 0 ] + ", " + points[ i ][ 2 ] + " ";

      this.lastPointX = points[ i ][ 0 ];
      this.lastPointY = points[ i ][ 2 ];
    }

    this.points = points;
    this._sum = sum;

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
      x: ( this.firstPointX + this.lastPointX ) / 2,
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
  set ratio( r ) {
    this._ratio = r;
  }

  get ratio() {
    return this._ratio;
  }

  get sum() {
    return this._sum;
  }

  selectStyle() {
    this.setDom( 'stroke-width', '2px' );
  }

  selectHandles() {} // Cancel areaundercurve

  setHandles() {
    console.log( 'a' );
    if ( this.points == undefined ) {
      return;
    }
    console.log( 'b' );
    if ( !this.isSelected() ) {
      return;
    }
    console.log( 'c' );
    this.addHandles();

    if ( this.firstPointX < this.lastPointX ) {

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