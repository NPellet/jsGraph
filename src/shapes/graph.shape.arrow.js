import ShapeLine from './graph.shape.line'

/**
 *  Displays an arrow
 *  @extends GraphShapeLine
 */
class ShapeArrow extends ShapeLine {

  constructor( graph ) {

    super( graph );

  }

  createDom() {

    this._dom = document.createElementNS( this.graph.ns, 'line' );
    this._dom.setAttribute( 'marker-end', 'url(#arrow' + this.graph._creation + ')' );

    this.createHandles( this.nbHandles, 'rect', {
      transform: "translate(-3 -3)",
      width: 6,
      height: 6,
      stroke: "black",
      fill: "white",
      cursor: 'nwse-resize'
    } );

    this.setStrokeColor( 'black' );
    this.setStrokeWidth( 1 );
  }
}

export default ShapeArrow;