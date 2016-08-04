import GraphShape from './graph.shape'
import * as util from '../graph.util'

/** 
 * Represents a rectangle that extends the Shape class
 * @class ShapeRectangle
 * @augments Shape
 * @see Graph#newShape
 */
class ShapeRectangle extends GraphShape {

  constructor( graph, options ) {
    super( graph, options );
  }

  /**
   * Creates the DOM
   * @private
   * @return {Shape} The current shape
   */
  createDom() {
    var self = this;
    this._dom = document.createElementNS( this.graph.ns, 'rect' );

    this.setStrokeColor( 'black' );
    this.setStrokeWidth( 1 );
    this.setFillColor( 'transparent' );

    return this;
  }

  /**
   * Creates the Handles
   * @private
   * @return {Shape} The current shape
   */
  createHandles() {
    if ( !this.hasHandles() ) {
      return;
    }

    /*
          this._data.handles = this._data.handles ||  {
            type: 'corners'
          };
    */
    var handles = this.getProp( 'handles' );

    if ( typeof handles != "object" ) {
      handles = {};
    }

    if ( !handles.type ) {
      handles.type = "corners";
    }

    switch ( handles.type ) {

      case 'sides':

        util.extend( handles, {
          sides: {
            top: true,
            bottom: true,
            left: true,
            right: true
          }
        } );

        var j = 0;
        for ( var i in handles.sides ) {
          if ( handles.sides[ i ] ) {
            j++;
          }
        }

        this._createHandles( j, 'g' ).map( function( g ) {

          var r = document.createElementNS( self.graph.ns, 'rect' );
          r.setAttribute( 'x', '-3' );
          r.setAttribute( 'width', '6' );
          r.setAttribute( 'y', '-6' );
          r.setAttribute( 'height', '12' );
          r.setAttribute( 'stroke', 'black' );
          r.setAttribute( 'fill', 'white' );
          r.setAttribute( 'cursor', 'pointer' );

          g.appendChild( r );

        } );

        var j = 1;

        for ( var i in handles.sides ) {
          if ( handles.sides[ i ] ) {
            this.handles[ i ] = this[ 'handle' + j ];
            this.sides[ j ] = i;
            j++;
          }
        }

        break;

      case 'corners':
        this._createHandles( 4, 'rect', {
          transform: "translate(-3 -3)",
          width: 6,
          height: 6,
          stroke: "black",
          fill: "white"
        } );

        if ( this.handles ) {
          this.handles[ 2 ].setAttribute( 'cursor', 'nesw-resize' );
          this.handles[ 4 ].setAttribute( 'cursor', 'nesw-resize' );

          this.handles[ 1 ].setAttribute( 'cursor', 'nwse-resize' );
          this.handles[ 3 ].setAttribute( 'cursor', 'nwse-resize' );
        }

        break;

    }
    return this;
  }

  /**
   * Updates the position
   * @memberof ShapeRectangle
   * @private
   * @return {Shape} The current shape
   */
  applyPosition() {

    var pos = this.computePosition( 0 ),
      pos2 = this.computePosition( 1 ),
      x,
      y,
      width,
      height;

    if ( pos.x < pos2.x ) {
      x = pos.x;
      width = pos2.x - pos.x;
    } else {
      x = pos2.x;
      width = pos.x - pos2.x;
    }

    if ( pos.y < pos2.y ) {
      y = pos.y;
      height = pos2.y - pos.y;
    } else {
      y = pos2.y;
      height = pos.y - pos2.y;
    }

    this.currentX = x;
    this.currentY = y;
    this.currentW = width;
    this.currentH = height;

    if ( !isNaN( x ) && !isNaN( y ) && x !== false && y !== false ) {

      this.setDom( 'width', width );
      this.setDom( 'height', height );
      this.setDom( 'x', x );
      this.setDom( 'y', y );

      this.setHandles();
      this.updateMask();

      return true;
    }

    return false;
  }

  /**
   * Implements mouse move event
   * @private
   * @return {Shape} The current shape
   */
  handleMouseMoveImpl( e, deltaX, deltaY, deltaXPx, deltaYPx ) {

    var handles = this.getProp( 'handles' );

    if ( !this.moving && !this.handleSelected ) {
      return;
    }

    var pos = this.getPosition( 0 );
    var pos2 = this.getPosition( 1 );

    var invX = this.getXAxis().isFlipped(),
      invY = this.getYAxis().isFlipped(),
      posX = pos.x,
      posY = pos.y,
      pos2X = pos2.x,
      pos2Y = pos2.y;

    if ( this.moving ) {

      pos.deltaPosition( 'x', deltaX, this.getXAxis() );
      pos.deltaPosition( 'y', deltaY, this.getYAxis() );

      pos2.deltaPosition( 'x', deltaX, this.getXAxis() );
      pos2.deltaPosition( 'y', deltaY, this.getYAxis() );

    } else {

      switch ( handles.type ) {

        case 'sides':
          // Do nothing for now

          switch ( this.sides[ this.handleSelected ] ) {

            case 'left':
              pos.deltaPosition( 'x', deltaX, this.getXAxis() );
              break;

            case 'right':
              pos2.deltaPosition( 'x', deltaX, this.getXAxis() );
              break;

            case 'top':
              pos.deltaPosition( 'y', deltaY, this.getYAxis() );
              break;

            case 'bottom':
              pos2.deltaPosition( 'y', deltaY, this.getYAxis() );
              break;

          }

          break;

        case 'corners':
        default:

          if ( this.handleSelected == 1 ) {

            pos.deltaPosition( 'x', deltaX, this.getXAxis() );
            pos.deltaPosition( 'y', deltaY, this.getYAxis() );

          } else if ( this.handleSelected == 2 ) {

            pos2.deltaPosition( 'x', deltaX, this.getXAxis() );
            pos.deltaPosition( 'y', deltaY, this.getYAxis() );

          } else if ( this.handleSelected == 3 ) {

            pos2.deltaPosition( 'y', deltaY, this.getYAxis() );
            pos2.deltaPosition( 'x', deltaX, this.getXAxis() );

          } else if ( this.handleSelected == 4 ) {

            pos.deltaPosition( 'x', deltaX, this.getXAxis() );
            pos2.deltaPosition( 'y', deltaY, this.getYAxis() );

          }

          break;

      }
    }

    this.redraw();
    this.changed();
    this.setHandles();

    return true;

  }

  /**
   * Places handles properly
   * @private
   * @return {Shape} The current shape
   */
  setHandles() {

    if ( this.isLocked() ||  ( !this.isSelectable() && !this._staticHandles ) ) {
      return;
    }

    if ( !this.handlesInDom ) {
      return;
    }

    var pos = this.computePosition( 0 );
    var pos2 = this.computePosition( 1 );

    var handles = this.getProp( 'handles' );

    switch ( handles.type ) {

      case 'sides':

        if ( this.handles.left ) {
          this.handles.left.setAttribute( 'transform', 'translate(' + this.currentX + ' ' + ( this.currentY + this.currentH / 2 ) + ')' );
        }

        if ( this.handles.right ) {
          this.handles.right.setAttribute( 'transform', 'translate( ' + ( this.currentX + this.currentW ) + ' ' + ( this.currentY + this.currentH / 2 ) + ')' );
        }

        if ( this.handles.top ) {
          this.handles.top.setAttribute( 'transform', 'translate( ' + ( this.currentX + this.currentW / 2 ) + ' ' + this.currentY + ')' );
        }

        if ( this.handles.bottom ) {
          this.handles.bottom.setAttribute( 'transform', 'translate( ' + ( this.currentX + this.currentW / 2 ) + ' ' + ( this.currentY + this.currentH ) + ')' );
        }

        break;

      case 'corners':
      default:

        this.handles[ 1 ].setAttribute( 'x', pos.x );
        this.handles[ 1 ].setAttribute( 'y', pos.y );

        this.handles[ 2 ].setAttribute( 'x', pos2.x );
        this.handles[ 2 ].setAttribute( 'y', pos.y );

        this.handles[ 3 ].setAttribute( 'x', pos2.x );
        this.handles[ 3 ].setAttribute( 'y', pos2.y );

        this.handles[ 4 ].setAttribute( 'x', pos.x );
        this.handles[ 4 ].setAttribute( 'y', pos2.y );

        break;

    }

  }

}

export default ShapeRectangle