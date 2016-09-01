import Shape from './graph.shape'

/**
 *  Displays a surface under a line serie
 *  @extends GraphShape
 */
class ShapeSurfaceUnderCurve extends Shape {

  createDom() {
    this._dom = document.createElementNS( this.graph.ns, 'path' );
  }

  createHandles() {

    this._createHandles( 2, 'line', {
      'stroke-width': '3',
      'stroke': 'transparent',
      'pointer-events': 'stroke',
      'cursor': 'ew-resize'
    } );

  }

  handleMouseMoveImpl( e, deltaX, deltaY ) {

      if ( this.isLocked() ) {
        return;
      }

      if ( this.moving ) {

        this.getPosition( 0 ).deltaPosition( 'x', deltaX, this.getXAxis() );
        this.getPosition( 1 ).deltaPosition( 'x', deltaX, this.getXAxis() );

      } else if ( this.serie && this.handleSelected ) {

        this.resizingPosition = this.handleSelected == 1 ? this.getPosition( 0 ) : this.getPosition( 1 );

        var value = this.serie.searchClosestValue( this.getXAxis().getVal( this.graph._getXY( e ).x - this.graph.getPaddingLeft() ) );

        if ( !value ) {
          return;
        }

        if ( this.resizingPosition.x != value.xMin ) {
          this.preventUnselect = true;
        }

        this.resizingPosition.x = value.xMin;

      } else if ( this.handleSelected ) {

        this.resizingPosition = this.handleSelected == 1 ? this.getPosition( 0 ) : this.getPosition( 1 );
        this.resizingPosition.deltaPosition( 'x', deltaX, this.getXAxis() );
      }

      this.applyPosition();
    }
    /*
        redrawImpl: function() {
          //var doDraw = this.setPosition();
          //	this.setDom('fill', 'url(#' + 'patternFill' + this.graph._creation + ')')

          if ( this.position != this.doDraw ) {
            this.group.setAttribute( "visibility", this.position ? "visible" : 'hidden' );
            this.doDraw = this.position;
          }
        },
    */
  applyPosition() {

    if ( !this.serie ) {
      return;
    }

    var posXY = this.computePosition( 0 ),
      posXY2 = this.computePosition( 1 ),
      w = Math.abs( posXY.x - posXY2.x ),
      x = Math.min( posXY.x, posXY2.x );

    //  this.reversed = x == posXY2.x;

    if ( w < 2 || x + w < 0 || x > this.graph.getDrawingWidth() ) {
      this.setDom( 'd', "" );
      return false;
    }

    var v1 = this.serie.searchClosestValue( this.getPosition( 0 ).x ),
      v2 = this.serie.searchClosestValue( this.getPosition( 1 ).x ),
      v3,
      i,
      j,
      init,
      max,
      k,
      x,
      y,
      firstX,
      firstY,
      currentLine,
      maxY = 0,
      minY = Number.MAX_VALUE;

    if ( !v1 || !v2 ) {
      return false;
    }

    if ( v1.xBeforeIndex > v2.xBeforeIndex ) {
      v3 = v1;
      v1 = v2;
      v2 = v3;

      //this.handleSelected = ( this.handleSelected == 1 ) ? 2 : 1;
    }

    this.counter = 0;

    for ( i = v1.dataIndex; i <= v2.dataIndex; i++ ) {
      this.currentLine = "";
      init = i == v1.dataIndex ? v1.xBeforeIndexArr : 0;
      max = i == v2.dataIndex ? v2.xBeforeIndexArr : this.serie.data[ i ].length;
      k = 0;

      if ( init == max ) {
        max++;
      }

      for ( j = init; j <= max; j += 2 ) {

        x = this.serie.getX( this.serie.data[ i ][ j + 0 ] );
        y = this.serie.getY( this.serie.data[ i ][ j + 1 ] );

        maxY = Math.max( this.serie.data[ i ][ j + 1 ], maxY );
        minY = Math.min( this.serie.data[ i ][ j + 1 ], minY );

        if ( j == init ) {
          this.firstX = x;
          this.firstY = y;
        }

        if ( k > 0 ) {
          this.currentLine += " L " + x + " " + y + " "
        } else {
          this.currentLine += " M " + x + " " + y + " ";
        }

        //this.serie._addPoint( x, y, false, this.currentLine );
        k++;

      }

      this.lastX = x;
      this.lastY = y;

      if ( !this.firstX || !this.firstY || !this.lastX || !this.lastY ) {
        return;
      }

      this.currentLine += " V " + this.getYAxis().getPx( 0 ) + " H " + this.firstX + " z";
      this.setDom( 'd', this.currentLine );
    }

    this.maxY = this.serie.getY( maxY );
    this.setHandles();

    this.changed();

    return true;
  }

  setHandles() {

    if ( !this.firstX ) {
      return;
    }

    var posXY = this.computePosition( 0 ),
      posXY2 = this.computePosition( 1 );

    if ( posXY.x < posXY2.x ) {

      this.handles[ 1 ].setAttribute( 'x1', this.firstX );
      this.handles[ 1 ].setAttribute( 'x2', this.firstX );

      this.handles[ 2 ].setAttribute( 'x1', this.lastX );
      this.handles[ 2 ].setAttribute( 'x2', this.lastX );

    } else {

      this.handles[ 1 ].setAttribute( 'x1', this.lastX );
      this.handles[ 1 ].setAttribute( 'x2', this.lastX );

      this.handles[ 2 ].setAttribute( 'x1', this.firstX );
      this.handles[ 2 ].setAttribute( 'x2', this.firstX );

    }
    this.handles[ 1 ].setAttribute( 'y1', this.getYAxis().getMaxPx() );
    this.handles[ 1 ].setAttribute( 'y2', this.serie.getY( 0 ) );

    this.handles[ 2 ].setAttribute( 'y1', this.getYAxis().getMaxPx() );
    this.handles[ 2 ].setAttribute( 'y2', this.serie.getY( 0 ) );
  }
}

export default ShapeSurfaceUnderCurve;