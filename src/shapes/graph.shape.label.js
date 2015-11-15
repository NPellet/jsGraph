define( [ './graph.shape' ], function( GraphShape ) {

  /** 
   * Represents a label that extends the Shape class
   * @class LabelShape
   * @augments Shape
   * @see Graph#newShape
   */
  var LabelShape = function( graph, options ) {
    this.selectStyle = {
      stroke: 'red'
    };

  }

  LabelShape.prototype = new GraphShape();

  $.extend( LabelShape.prototype, GraphShape.prototype, {

    createDom: function() {
      return false;
    },

    applyPosition: function() {

    }

  } );

  return LabelShape;

} );