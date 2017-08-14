import * as util from '../graph.util'
import Shape from './graph.shape'

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

    this.setDom( 'cx', pos.x ||  0 );
    this.setDom( 'cy', pos.y ||  0 );

    this.setDom( 'rx', this.getProp( 'rx' ) || 0 );
    this.setDom( 'ry', this.getProp( 'ry' ) || 0 );

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
    return;
  }
}

export default ShapeEllipse;