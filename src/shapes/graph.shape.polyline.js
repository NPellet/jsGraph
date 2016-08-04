import Shape from './graph.shape'

/** 
 * Represents a line that extends the Shape class. Used by the plugin {@link PluginSerieLineDifference}
 * @extends Shape
 * @see Graph#newShape
 */
class ShapePolyline extends Shape {

  constructor( graph, options ) {
    super( graph, options );
  }

  /**
   * Creates the DOM
   * @private
   * @return {Shape} The current shape
   */
  createDom() {

    this._dom = document.createElementNS( this.graph.ns, 'path' );
    this.setStrokeColor( 'black' );
    this.setStrokeWidth( 1 );
  }

  /**
   * No handles for the polyline
   * @private
   * @return {Shape} The current shape
   */
  createHandles() {}

  /**
   *  Force the points of the polyline already computed in pixels
   *  @param {String} a SVG string to be used in the ```d``` attribute of the path.
   *  @return {ShapePolyline} The current polyline instance
   */
  setPointsPx( points ) {
    this.pxPoints = points;
    return this;
  }

  /**
   * Recalculates the positions and applies them
   * @private
   * @return {Boolean} Whether the shape should be redrawn
   */
  applyPosition() {

    if ( this.pxPoints ) {
      this.setDom( 'd', this.pxPoints );

    } else if ( this.points ) {

      var xAxis, yAxis;

      if ( this.serie ) {

        xAxis = this.serie.getXAxis();
        yAxis = this.serie.getYAxis();

      } else if ( this.xAxis && this.yAxis ) {

        xAxis = this.xAxis;
        yAxis = this.yAxis;
      }

      this.setDom( 'd', 'M ' + this.points.map( function( p ) {
        return xAxis.getPx( p[ 0 ] ) + ", " + yAxis.getPx( p[ 1 ] );
      } ).join( " L " ) );
    }

    return true;
  }
}

export default ShapePolyline;