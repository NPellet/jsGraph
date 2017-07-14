import Shape from './graph.shape'
import GraphPosition from '../graph.position'

/**
 * Displays an integral with NMR style
 * @extends ShapeSurfaceUnderCurve
 */
class ShapeNMRIntegral extends Shape {

  constructor( graph, options ) {

    super( graph, options );

    this.nbHandles = 2;
  }

  createDom() {
    this._dom = document.createElementNS( this.graph.ns, 'path' );
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

    this.handles[ 1 ].setAttribute( 'fill', 'red' );
  }

  xor( a, b ) {
    return ( a && !b ) || ( !a && b );
  }

  applyPosition() {

    let
      x,
      y,
      xVal,
      yVal,
      axis = this.getAxis(),
      points = [];

    let currentLine = "",
      baseLine = this.getProp( 'baseLine', 0 ) || 300,
      ratio;

    if ( !this.serie ) {
      throw "No serie exists for this shape";
    };
    /*
        this.sortPositions( ( a, b ) => {
          return a.x - b.x;
        } );

        */
    let pos1 = this.getPosition( 0 );
    let pos2 = this.getPosition( 1 );

    this.showLabel( 0 );

    let sum = 0;

    let j;
    let waveform = this.serie.getWaveform();

    if ( !waveform ) {
      return;
    }

    let index1 = waveform.getIndexFromX( pos1[ axis ], true ),
      index2 = waveform.getIndexFromX( pos2[ axis ], true ),
      index3,
      flipped = false;

    if ( index2 < index1 ) {
      index3 = index1;
      index1 = index2;
      index2 = index3;
      flipped = true;
    }

    let firstX, firstY, firstXVal, firstYVal, lastX, lastXVal, lastY, lastYVal;
    let data = waveform.getDataInUse();

    index1 -= index1 % 4;
    index2 -= index2 % 4;

    let condition, incrementation;

    if (
      ( waveform.getXMonotoneousAscending() && // Ascending
        1 == 1 ) ||
      ( !waveform.getXMonotoneousAscending() && // Ascending
        1 == 2 )
    ) {

      j = index2;
      condition = true;
      incrementation = -1;

    } else {

      j = index1;
      condition = false
      incrementation = 1;
    }

    for ( ; condition ? j > index1 : j < index2; j += incrementation ) {

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
        //continue;
      }

      lastX = x;
      lastY = y;
      //console.log( data, data[ j ] );

      if ( j % 4 == 0 && j >= index1 && data.sums ) { // Sums are located every 4 element

        sum += data.sums[ j ] * ( data.x[ j ] - data.x[ j - 3 ] ); // y * (out-in)
      }

      points.push( [ x, y, sum ] );
      lastXVal = xVal;
    }

    lastXVal = false;
    lastYVal = false;
    lastX = false;
    lastY = false;

    if ( sum == 0 ) {
      sum = 1;
    }

    if ( !this.ratio ) {
      // 150px / unit
      ratio = 200 / sum;

    } else {
      // Already existing
      ratio = this.ratio;
    }

    for ( var i = 0, l = points.length; i < l; i++ ) {

      points[ i ][ 2 ] = baseLine - ( points[ i ][ 2 ] ) * ratio;

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
      x: ( this.firstPointX + this.lastPointX ) / 2 + "px",
      y: ( this.firstPointY + this.lastPointY ) / 2 + "px"
    } ) );

    this.setLabelPosition( {
      x: 0.5 * ( this.firstPointX + this.lastPointX ) + "px",
      y: 0.5 * ( this.firstPointY + this.lastPointY ) + "px"
    }, 0 );
    ( this.ratioLabel && this.updateIntegralValue( this.ratioLabel ) ) || this.updateLabels();

    this.changed();
    this.handleCondition = !this.xor( incrementation == -1, flipped )
    this.setHandles();

    this.updateIntegralValue();

    return true;
  }

  updateIntegralValue( ratioLabel = this.ratioLabel ) {

    if ( ratioLabel ) {
      this.ratioLabel = ratioLabel;
    }
    this.setLabelText( ratioLabel ? Math.round( 100 * this.sum * ratioLabel ) / 100 : "N/A", 0 );
    this.updateLabels();
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

    if ( this.points == undefined ) {
      return;
    }

    if ( !this.isSelected() ) {
      return;
    }

    this.addHandles();

    if ( this.handleCondition ) {

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

  /**
   * Handles mouse move events
   * @private
   */
  handleMouseMoveImpl( e, deltaX, deltaY, deltaXPx, deltaYPx ) {

    if ( this.isLocked() ) {
      return;
    }

    var pos = this.getPosition( 0 );
    var pos2 = this.getPosition( 1 );

    var posToChange;

    if ( this.handleSelected == 1 ) {

      posToChange = pos;

    } else if ( this.handleSelected == 2 ) {

      posToChange = pos2;
    }

    if ( posToChange ) {

      if ( !this._data.vertical ) {
        posToChange.deltaPosition( 'x', deltaX, this.getXAxis() );
      }
    }

    if ( this.moving ) {

      // If the pos2 is defined by a delta, no need to move them
      if ( pos.x ) {
        pos.deltaPosition( 'x', deltaX, this.getXAxis() );
      }

      // If the pos2 is defined by a delta, no need to move them
      if ( pos2.x ) {
        pos2.deltaPosition( 'x', deltaX, this.getXAxis() );
      }
    }

    if ( this.rectEvent ) {
      this.setEventReceptacle();
    }

    this.redraw();
    this.changed();

    return true;
  }
}

export default ShapeNMRIntegral;