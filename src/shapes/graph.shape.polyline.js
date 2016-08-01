define( [ './graph.shape' ], function( GraphShape ) {

  "use strict";

  /** 
   * Represents a line that extends the Shape class
   * @class ShapePolyLine
   * @augments Shape
   * @see Graph#newShape
   */
  function ShapePolyLine( graph, options ) {

  }

  ShapePolyLine.prototype = new GraphShape();

  /**
   * Creates the DOM
   * @memberof ShapePolyLine
   * @private
   * @return {Shape} The current shape
   */
  ShapePolyLine.prototype.createDom = function() {

    this._dom = document.createElementNS( this.graph.ns, 'path' );
    this.setStrokeColor( 'black' );
    this.setStrokeWidth( 1 );
  };

  /**
   * No handles for the polyline
   * @memberof ShapePolyLine
   * @private
   * @return {Shape} The current shape
   */
  ShapePolyLine.prototype.createHandles = function() {

  };

  ShapePolyLine.prototype.setPointsPx = function( points ) {
    this.pxPoints = points;
    return this;
  }

  /**
   * Recalculates the positions and applies them
   * @memberof ShapePolyLine
   * @private
   * @return {Boolean} Whether the shape should be redrawn
   */
  ShapePolyLine.prototype.applyPosition = function() {

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
  };

  return ShapePolyLine;
} );