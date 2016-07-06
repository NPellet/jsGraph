define( [ '../graph.util', './graph.shape.rect' ], function( util, GraphRect ) {

  var lineHeight = 5;

  function GraphPeakIntegration2D( graph, options ) {
    this.nbHandles = 4;
  }

  util.extend( GraphPeakIntegration2D.prototype, GraphRect.prototype, {

    createDom: function() {

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
    },

    redrawImpl: function() {

      this.setPosition();
      this.setHandles();
      this.setBindableToDom( this._dom );
    }

  } );

  return GraphPeakIntegration2D;

} );