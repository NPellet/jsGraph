import * as util from '../graph.util.js';

import Shape from './graph.shape.js';

/**
 * Displays an ellipse
 * @extends Shape
 */
class ShapeEllipse extends Shape {

  constructor( graph, options ) {
    super( graph, options );
  }

  createDom() {
    this._dom = document.createElementNS( this.graph.ns, 'ellipse' );
  }

  applyPosition() {

    var pos = this.computePosition( 0 );
    if ( !pos ) {
      return;
    }
    this.setDom( 'cx', pos.x || 0 );
    this.setDom( 'cy', pos.y || 0 );

    let posR = this.graph.newPosition( {

      dx: this.getProp( 'rx' ),
      dy: this.getProp( 'ry' ) || this.getProp( 'rx' )

    } );

    let posComputed = this.calculatePosition( posR );

    this.setDom( 'rx', Math.abs( posComputed.x ) || 0 );
    this.setDom( 'ry', Math.abs( posComputed.y ) || 0 );
    return true;
  }

  setR( rx, ry ) {
    this.setProp( 'rx', rx );
    this.setProp( 'ry', ry );
    return this;
  }

  handleMouseUpImpl() {
    this.triggerChange();
  }

  handleMouseMoveImpl( e, deltaX, deltaY, deltaXPx, deltaYPx ) {

  }
}

export default ShapeEllipse;