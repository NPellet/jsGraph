import { 
  isNumeric 
} from '../graph.util'
import GraphShape from './graph.shape'

/**
 * Represents a line
 * @extends Shape
 * @see Graph#newShape
 */
class ShapeHTML extends GraphShape {

  constructor( graph, options ) {
    super( graph, options );
  }

  /**
   * Creates the DOM
   * @private
   * @return {Shape} The current shape
   */
  createDom() {

    this._dom = document.createElementNS( this.graph.ns, 'foreignObject' );
    //  this._dom.setAttribute( "requiredExtensions", "http://www.w3.org/1999/xhtml" );

    let div = document.createElement( "div" );
    this._dom.appendChild( div );
    this.div = div;
  }

  /**
   * Creates the handles
   * @private
   * @return {Shape} The current shape
   */
  createHandles() {

  }

  setHeight( height ) {
    this.setProp( 'height', height );
  }

  setWidth( width ) {
    this.setProp( 'width', width );
  }

  setContent( content ) {
    this.setProp( 'content', content );
  }

  setRenderer( method ) {
    this._renderer = method;
  }

  redraw() {

    if ( this._renderer ) {
      this._renderer( this.div );
    } else {
      this.div.innerHTML = this.getProp( 'content' );
    }

    super.redraw( ...arguments );
  }

  /**
   * Recalculates the positions and applies them
   * @private
   * @return {Boolean} Whether the shape should be redrawn
   */
  applyPosition() {

    this.setDom( "width", this.getProp( "width" ) );
    this.setDom( "height", this.getProp( "height" ) );
    var position = this.calculatePosition( 0 );

    if ( !position || !isNumeric( position.x ) || !isNumeric( position.y ) ) {
      return;
    }

    this.setDom( 'x', position.x );
    this.setDom( 'y', position.y );

    this.currentPosX = position.x;
    this.currentPosY = position.y;

    return true;
  }

  /**
   * Handles mouse move events
   * @private
   */
  handleMouseMoveImpl( e, deltaX, deltaY, deltaXPx, deltaYPx ) {

    if ( this.isLocked() ) {
      return;
    }

    var posToChange = this.getPosition( 0 );

    if ( posToChange ) {

      if ( !this._data.vertical ) {
        posToChange.deltaPosition( 'x', deltaX, this.getXAxis() );
      }

      if ( !this._data.horizontal ) {
        posToChange.deltaPosition( 'y', deltaY, this.getYAxis() );
      }
    }

    if ( this.moving ) {

      // If the pos2 is defined by a delta, no need to move them
      if ( pos.x ) {
        pos.deltaPosition( 'x', deltaX, this.getXAxis() );
      }
      if ( pos.y ) {
        pos.deltaPosition( 'y', deltaY, this.getYAxis() );
      }

      // If the pos2 is defined by a delta, no need to move them
      if ( pos2.x ) {
        pos2.deltaPosition( 'x', deltaX, this.getXAxis() );
      }
      if ( pos2.y ) {
        pos2.deltaPosition( 'y', deltaY, this.getYAxis() );
      }

    }

    this.redraw();
    this.changed();
    this.setHandles();

    return true;
  }

  /**
   * Sets the handle position
   * @private
   */
  setHandles() {

    if ( !this.areHandlesInDom() ) {
      return;
    }

    if ( isNaN( this.currentPos1x ) ) {
      return;
    }
  }
}

export default ShapeHTML