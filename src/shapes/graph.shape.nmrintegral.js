import GraphPosition from '../graph.position.js';

import Shape from './graph.shape.js';

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
    this._domShadow = document.createElementNS( this.graph.ns, 'path' );
    this._domShadow.jsGraphIsShape = this;
    this._dom.setAttribute( 'pointer-events', 'stroke' );
    this._domShadow.setAttribute( 'pointer-events', 'stroke' );
    this._domShadow.setAttribute( 'stroke-width', '12' );
    this._domShadow.setAttribute( 'fill', 'transparent' );
    this._domShadow.setAttribute( 'stroke', 'transparent' );
    this.group.appendChild( this._domShadow );
  }

  initImpl() {
    this.setFillColor( 'transparent' );
    this.setStrokeColor( 'black' );
  }

  createHandles() {

    this._createHandles( 2, 'rect', {
      transform: 'translate(-3 -3)',
      width: 6,
      height: 6,
      stroke: 'black',
      fill: 'white'
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

    let currentLine = '',
      baseLine = this.getProp( 'baseLine', 0 ) || 300,
      ratio;

    if ( !this.serie ) {
      throw 'No serie exists for this shape';
    }
    /*
        this.sortPositions( ( a, b ) => {
          return a.x - b.x;
        } );

        */
    let pos1 = this.getPosition( 0 );
    let pos2 = this.getPosition( 1 );

    if ( ( pos1.x < this.serie.getXAxis().getCurrentMin() && pos2.x < this.serie.getXAxis().getCurrentMin() ) || ( pos1.x > this.serie.getXAxis().getCurrentMax() && pos2.x > this.serie.getXAxis().getCurrentMax() ) ) {
      this.setDom( 'd', '' );
      this._domShadow.setAttribute( 'd', '' );

      this.hideLabel( 0 );
      return false;
    }

    this.showLabel( 0 );

    let sum = 0;

    let j;
    let waveform = this.serie.getWaveform();

    if ( !waveform ) {
      return;
    }

    let index1 = waveform.getIndexFromX( pos1[ axis ], true, Math.floor ),
      index2 = waveform.getIndexFromX( pos2[ axis ], true, Math.ceil ),
      index3,
      flipped = false;

    if ( index1 == index2 ) { // At least one px please !
      if ( waveform.getReductionType() == 'aggregate' ) {
        index2 += 4; // Aggregated state
      } else {
        index2++; // Non aggregated state
      }
    }

    if ( index2 < index1 ) {
      index3 = index1;
      index1 = index2;
      index2 = index3;
      flipped = true;
    }

    let firstX, firstY, firstXVal, firstYVal, lastX, lastXVal, lastY, lastYVal;
    let data = waveform.getDataInUse();

    let condition, incrementation;

    let normalSums = true;
    if ( waveform.getReductionType() == 'aggregate' ) {
      normalSums = false;
    }

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
      condition = false;
      incrementation = 1;
    }

    for ( ; condition ? j >= index1 : j <= index2; j += incrementation ) {

      xVal = waveform.getX( j, true );
      yVal = waveform.getY( j, true );

      x = this.serie.getX( xVal );
      y = this.serie.getY( yVal );

      /*
            if ( ! normalSums && j % 4 == 0 && j >= index1 && data.sums ) { // Sums are located every 4 element

              sum += data.sums[ j ];// * ( waveform.getX( j, true ) - waveform.getX( j - 3, true ) ); // y * (out-in)

            } else if( normalSums ) {
      */
      sum += waveform.getY( j, true ); // * ( waveform.getX( j, true ) - waveform.getX( j - 1, true ) ); // y * (out-in)
      //}

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

    this._sumVal = waveform.integrate( pos1.x, pos2.x );

    if ( !this.ratio ) {
      // 150px / unit
      ratio = 200 / sum;

    } else {
      // Already existing
      ratio = this.ratio * ( this.sumVal / sum );
    }
    let py;

    if ( points.length == 0 ) {
      return;
    }

    for ( var i = 0, l = points.length; i < l; i++ ) {

      py = baseLine - ( points[ i ][ 2 ] ) * ratio;

      if ( i > 0 && ( ( points[ i - 1 ][ 2 ] > sum / 2 && points[ i ][ 2 ] <= sum / 2 ) || ( points[ i - 1 ][ 2 ] < sum / 2 && points[ i ][ 2 ] >= sum / 2 ) ) ) {

        let pos = baseLine - ( points[ i - 1 ][ 2 ] + points[ i ][ 2 ] ) / 2 * ratio;

        this.setPosition( {
          x: `${points[ i ][ 0 ] }px`,
          y: `${pos }px`

        }, 3 );

        this.setLabelPosition( this.getPosition( 3 ), 0 );
      }

      currentLine += ` L ${ points[ i ][ 0 ] }, ${ py } `;

      this.lastPointX = points[ i ][ 0 ];
      this.lastPointY = py;
    }

    this.points = points;
    this._sum = sum;

    if ( this.serie.isFlipped() ) {
      currentLine = ` M ${ baseLine }, ${ firstX } ${ currentLine}`;
    } else {
      currentLine = ` M ${ firstX }, ${ baseLine } ${ currentLine}`;
    }

    this.firstPointX = firstX;
    this.firstPointY = baseLine;

    this.setDom( 'd', currentLine );
    this._domShadow.setAttribute( 'd', currentLine );

    this.firstX = firstX;
    this.firstY = firstY;
    /*
          if ( this._selected ) {
            this.select();
          }

          this.setHandles();*/

    ( this.serie.ratioLabel && this.updateIntegralValue( this.serie.ratioLabel ) ) || this.updateLabels();

    this.changed();
    this.handleCondition = !this.xor( incrementation == -1, flipped );
    this.setHandles();

    this.updateIntegralValue();

    return true;
  }

  updateIntegralValue( ratioLabel = this.serie.ratioLabel, forceValue ) {
    console.log( ratioLabel );
    if ( ratioLabel ) {
      this.serie.ratioLabel = ratioLabel;
    }

    if ( !isNaN( forceValue ) && !isNaN( this.sumVal ) && this.sumVal ) {
      this.serie.ratioLabel = forceValue / this.sumVal;
    }

    this.setLabelText( ratioLabel ? ( Math.round( 100 * this.sumVal * ratioLabel ) / 100 ).toPrecision( 3 ) : 'N/A', 0 );
    this.updateLabels();
    return this.serie.ratioLabel;
  }

  getAxis() {
    return this._data.axis || 'x';
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

  get sumVal() {
    return this._sumVal;
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