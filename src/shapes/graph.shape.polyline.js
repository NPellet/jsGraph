import Shape from './graph.shape.js';

/**
 * Represents a line that extends the Shape class. Used by the plugin {@link PluginSerieLineDifference}
 * @extends Shape
 * @see Graph#newShape
 */
class ShapePolyline extends Shape {

  constructor( graph, options ) {
    super( graph, options );

    this.setProp( 'fillColor', 'none' );
  }

  /**
   * Creates the DOM
   * @private
   * @return {Shape} The current shape
   */
  createDom() {

    this._dom = document.createElementNS( this.graph.ns, 'path' );

    if ( !this.getStrokeColor() ) {
      this.setStrokeColor( 'black' );
    }

    if ( this.getStrokeWidth() === undefined ) {
      this.setStrokeWidth( 1 );
    }
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
    //  this.setProp( 'pxPoints', points );
    return this;
  }

  /**
   * Recalculates the positions and applies them
   * @private
   * @return {Boolean} Whether the shape should be redrawn
   */
  /**
   * Recalculates the positions and applies them
   * @private
   * @return {Boolean} Whether the shape should be redrawn
   */
  applyPosition() {

    let str = '';
    let index = 0;
    while ( true ) {

      let pos = this.getPosition( index );
      if ( pos === undefined ) {
        break;
      }

      let posXY;
      if ( this.serie ) {
        posXY = pos.compute( this.graph, this.serie.getXAxis(), this.serie.getYAxis(), this.serie );
      } else {
        posXY = pos.compute( this.graph, this.getXAxis(), this.getYAxis() );
      }

      if ( isNaN( posXY.x ) || isNaN( posXY.y ) ) {
        return;
      }

      if ( index == 0 ) {
        str += ' M ';
      } else {
        str += ' L ';
      }

      str += `${posXY.x} ${posXY.y}`;
      index++;
    }

    this.setDom( 'd', str );

    this.changed();
    return true;
  }
}
/*
  applyPosition() {

    let pxPoints;
    let pos = this.computePosition( 0 );
    if ( !pos ) {
      return;
    }
    if ( ( pxPoints = this.getProp( 'pxPoints' ) ) ) {

      pxPoints = ` M ${ pos.x } ${ pos.y } ${ pxPoints}`;
      this.setDom( 'd', pxPoints );

    } else if ( this.points ) {

      var xAxis, yAxis;

      if ( this.serie ) {

        xAxis = this.serie.getXAxis();
        yAxis = this.serie.getYAxis();

      } else if ( this.xAxis && this.yAxis ) {

        xAxis = this.xAxis;
        yAxis = this.yAxis;
      }

      this.setDom( 'd', `M ${ this.points.map( function( p ) {
        return `${xAxis.getPx( p[ 0 ] ) }, ${ yAxis.getPx( p[ 1 ] )}`;
      } ).join( ' L ' )}` );
    }

    this.changed();
    return true;
  }*/
//}

export default ShapePolyline;