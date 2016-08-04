import Shape from './graph.shape'

/**
 *  Displays a cross
 *  @extends Shape
 */
class ShapeCross extends Shape {

  constructor( graph, options ) {
    super( graph, options );
    this.nbHandles = 1;
  }

  /**
   * Width of the cross, also available from the constructor
   * @type {Number} width
   */
  get width() {
    return this.options.width || 10;
  }

  set width( l = 10 ) {
    this.options.width = l;
  }

  createDom() {

    this._dom = document.createElementNS( this.graph.ns, 'path' );
    this._dom.setAttribute( 'd', 'M -' + ( this.width / 2 ) + ' 0 h ' + ( this.width ) + ' m -' + ( this.width / 2 ) + ' -' + ( this.width / 2 ) + ' v ' + ( this.width ) + '' );

  }

  createHandles() {

    this._createHandles( this.nbHandles, 'rect', {
      transform: "translate(-3 -3)",
      width: 6,
      height: 6,
      stroke: "black",
      fill: "white",
      cursor: 'nwse-resize'
    } );

  }
  applyPosition() {

    var position = this.calculatePosition( 0 );
    if ( !position || !position.x || !position.y ) {
      return;
    }

    this.setDom( 'transform', 'translate( ' + position.x + ', ' + position.y + ')' );

    this.currentPos1x = position.x;
    this.currentPos1y = position.y;

    return true;
  }

  redrawImpl() {

    this.setHandles();
  }

  handleCreateImpl() {

    return;
  }

  handleMouseDownImpl( e ) {

    this.moving = true;

    return true;
  }

  handleMouseUpImpl() {

    this.triggerChange();
    return true;
  }

  handleMouseMoveImpl( e, deltaX, deltaY, deltaXPx, deltaYPx ) {

    if ( this.isLocked() ) {
      return;
    }

    var pos = this.getFromData( 'pos' );

    if ( this.moving ) {

      pos.x = this.graph.deltaPosition( pos.x, deltaX, this.getXAxis() );
      pos.y = this.graph.deltaPosition( pos.y, deltaY, this.getYAxis() );
    }

    this.redrawImpl();

    return true;

  }

  createHandles() {

    this._createHandles( 1, 'rect', {
      transform: "translate(-3 -3)",
      width: 6,
      height: 6,
      stroke: "black",
      fill: "white",
      cursor: 'nwse-resize'
    } );
  }

  setHandles() {

    if ( !this.areHandlesInDom() ) {
      return;
    }

    if ( isNaN( this.currentPos1x ) ) {
      return;
    }

    this.handles[ 1 ].setAttribute( 'x', this.currentPos1x );
    this.handles[ 1 ].setAttribute( 'y', this.currentPos1y );
  }

  selectStyle() {
    this.setDom( 'stroke', 'red' );
    this.setDom( 'stroke-width', '2' );
  }
}

export default ShapeCross;