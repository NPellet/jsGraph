import {
  isNumeric
} from '../graph.util.js';

import GraphShape from './graph.shape.js';

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

    this._dom = document.createElement( 'div' );
    //  this._dom.setAttribute( "requiredExtensions", "http://www.w3.org/1999/xhtml" );

    this._dom.setAttribute( 'style', 'position: absolute' );
    let div = document.createElement( 'div' );
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

    var position = this.calculatePosition( 0 );

    if ( !position || !isNumeric( position.x ) || !isNumeric( position.y ) ) {
      return;
    }
    this._dom.style.left = `${position.x }px`;
    this._dom.style.top = `${position.y }px`;

    this.currentPosX = position.x;
    this.currentPosY = position.y;

    return true;
  }

  /**
   * Handles mouse move events
   * @private
   */
  handleMouseMoveImpl( e, deltaX, deltaY, deltaXPx, deltaYPx ) {

    return true;
  }

  /**
   * Sets the handle position
   * @private
   */
  setHandles() {

  }

  isHTML() {
    return true;
  }
}

export default ShapeHTML;