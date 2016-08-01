define( [ './graph.shape.line' ], function( GraphLine ) {

  /** 
   * Arrow shape
   * @class ShapeArrow
   * @static
   */
  function ShapeArrow( graph ) {

  }

  ShapeArrow.prototype = new GraphLine();

  ShapeArrow.prototype.createDom = function() {

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

    this.setStrokeColor( 'black' );
    this.setStrokeWidth( 1 );

  };

  return ShapeArrow;

} );