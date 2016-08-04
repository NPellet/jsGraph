import ShapeRect from './graph.shape.rect'

class ShapePeakIntegration2D extends ShapeRect {

  constructor( graph, options ) {

    super( graph, options );
    this.nbHandles = 4;
  }

  createDom() {

    this._dom = document.createElementNS( this.graph.ns, 'rect' );
    this._dom.element = this;

    this.createHandles( this.nbHandles, 'rect', {
      transform: "translate(-3 -3)",
      width: 6,
      height: 6,
      stroke: "black",
      fill: "white",
      cursor: 'nwse-resize'
    } );
  }

  redrawImpl() {

    this.setPosition();
    this.setHandles();
    this.setBindableToDom( this._dom );
  }

}

export default ShapePeakIntegration2D;