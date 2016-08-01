define( [ '../graph.util', './graph.shape' ], function( util, GraphShape ) {

  /** 
   * Represents a label that extends the Shape class
   * @class ShapeLabel
   * @augments Shape
   * @see Graph#newShape
   */
  function ShapeLabel( graph, options ) {
    this.selectStyle = {
      stroke: 'red'
    };

  }

  ShapeLabel.prototype = new GraphShape();

  util.extend( ShapeLabel.prototype, GraphShape.prototype, {

    createDom: function() {
      return false;
    },

    applyPosition: function() {
      return true;
    }

  } );

  return ShapeLabel;

} );