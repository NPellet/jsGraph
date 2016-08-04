import GraphShape from './graph.shape'

/**
 * Blank shape used to display label
 * Use myShapelabel.setLabelText(); and associated methods
 * @extend GraphShape
 */
class ShapeLabel extends GraphShape {

  constructor( graph, options ) {

    super( graph, options );
  }

  createDom() {
    return false
  }

  applyPosition() {
    return true;
  }
}

export default ShapeLabel;