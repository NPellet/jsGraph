define( [ './graph.shape.line' ], function( GraphLine ) {

  var GraphArrow = function( graph ) {

    this.nbHandles = 2;

  }

  $.extend( GraphArrow.prototype, GraphLine.prototype, {
    createDom: function() {
      this._dom = document.createElementNS( this.graph.ns, 'line' );
      this._dom.setAttribute( 'marker-end', 'url(#arrow' + this.graph._creation + ')' );

      this._createHandles( this.nbHandles, 'rect', {
        transform: "translate(-3 -3)",
        width: 6,
        height: 6,
        stroke: "black",
        fill: "white",
        cursor: 'nwse-resize'
      } );

    }
  } );

  return GraphArrow;

} );