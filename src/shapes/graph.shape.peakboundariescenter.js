import ShapeLine from './graph.shape.line'

/**
 *  Shows a horizontal line with three little vertical bars. Very useful to demonstrate a peak start, end and middle value
 *  @extends ShapeLine
 */
class ShapePeakBoundaries extends ShapeLine {

  constructor( graph ) {
    super( graph );
    this.lineHeight = 6;
  }

  createDom() {

    this._dom = document.createElementNS( this.graph.ns, 'line' );
    this.line1 = document.createElementNS( this.graph.ns, 'line' );
    this.line2 = document.createElementNS( this.graph.ns, 'line' );
    this.line3 = document.createElementNS( this.graph.ns, 'line' );

    this.rectBoundary = document.createElementNS( this.graph.ns, 'path' );

    this.rectBoundary.setAttribute( 'fill', 'transparent' );
    this.rectBoundary.setAttribute( 'stroke', 'none' );
    this.rectBoundary.setAttribute( 'pointer-events', 'fill' );

    this.rectBoundary.jsGraphIsShape = true;

    this.group.appendChild( this.rectBoundary );
    this.group.appendChild( this.line1 );
    this.group.appendChild( this.line2 );
    this.group.appendChild( this.line3 );
    this._dom.element = this;
  }

  createHandles() {
    this._createHandles( 3, 'rect', {
      transform: "translate(-3 -3)",
      width: 6,
      height: 6,
      stroke: "black",
      fill: "white",
      cursor: 'nwse-resize'
    } );
  }

  redrawImpl() {

    this.line1.setAttribute( 'stroke', this.getStrokeColor() );
    this.line2.setAttribute( 'stroke', this.getStrokeColor() );
    this.line3.setAttribute( 'stroke', this.getStrokeColor() );

    this.line1.setAttribute( 'stroke-width', this.getStrokeWidth() );
    this.line2.setAttribute( 'stroke-width', this.getStrokeWidth() );
    this.line3.setAttribute( 'stroke-width', this.getStrokeWidth() );

    this.setHandles();
    this.redrawLines();
  }

  /**
   * @memberof ShapePeakBoundaries
   * Redraws the vertical lines according to the positions.
   * Position 0 is the left line, position 1 is the right line and position 2 is the center line
   * @returns {ShapePeakBoundaries} The shape instance
   */
  redrawLines() {

    var posLeft = this.computePosition( 0 );
    var posRight = this.computePosition( 1 );
    var posCenter = this.computePosition( 2 );

    if ( posLeft.x && posRight.x && posCenter.x && this.posYPx ) {

      var height = this.lineHeight;
      this.rectBoundary.setAttribute( 'd', 'M ' + posLeft.x + ' ' + ( this.posYPx - height ) + ' v ' + ( 2 * height ) + ' H ' + posRight.x + " v " + ( -2 * height ) + "z" );
      this.line1.setAttribute( 'x1', posLeft.x );
      this.line1.setAttribute( 'x2', posLeft.x );

      this.line2.setAttribute( 'x1', posRight.x );
      this.line2.setAttribute( 'x2', posRight.x );

      this.line3.setAttribute( 'x1', posCenter.x );
      this.line3.setAttribute( 'x2', posCenter.x );

      this._dom.setAttribute( 'x1', posLeft.x );
      this._dom.setAttribute( 'x2', posRight.x );

      this.redrawY( height );
    }

    return this;
  }

  /**
   * @memberof ShapePeakBoundaries
   * Redraws the vertical positions of the shape
   * @returns {ShapePeakBoundaries} The shape instance
   */
  redrawY() {

    if ( !this.posYPx ) {
      return this;
    }

    var height = this.lineHeight;

    this.line1.setAttribute( 'y1', this.posYPx - height );
    this.line1.setAttribute( 'y2', this.posYPx + height );

    this.line2.setAttribute( 'y1', this.posYPx - height );
    this.line2.setAttribute( 'y2', this.posYPx + height );

    this.line3.setAttribute( 'y1', this.posYPx - height );
    this.line3.setAttribute( 'y2', this.posYPx + height );

    this._dom.setAttribute( 'y1', this.posYPx );
    this._dom.setAttribute( 'y2', this.posYPx );

    return this;
  }

  setHandles() {

    if ( !this.posYPx ) {
      return;
    }

    var posLeft = this.computePosition( 0 );
    var posRight = this.computePosition( 1 );
    var posCenter = this.computePosition( 2 );

    if ( posLeft.x && posRight.x && posCenter.x ) {

      this.handles[ 1 ].setAttribute( 'x', posLeft.x );
      this.handles[ 1 ].setAttribute( 'y', this.posYPx );

      this.handles[ 2 ].setAttribute( 'x', posRight.x );
      this.handles[ 2 ].setAttribute( 'y', this.posYPx );

      this.handles[ 3 ].setAttribute( 'x', posCenter.x );
      this.handles[ 3 ].setAttribute( 'y', this.posYPx );
    }
  }

  /**
   * @memberof ShapePeakBoundaries
   * Sets the y position of the shape
   * @param {Number} y - The y position in px
   * @returns {ShapePeakBoundaries} The shape instance
   */
  setY( y ) {
    this.posYPx = y;
    return this;
  }

  /**
   * @memberof ShapePeakBoundaries
   * Sets the height of the peak lines
   * @param {Number} height - The height of the lines in px
   * @returns {ShapePeakBoundaries} The shape instance
   */
  setLineHeight( height ) {
    this.lineHeihgt = height;
  }

  handleMouseMoveImpl( e, deltaX, deltaY ) {

    if ( this.isLocked() ) {
      return;
    }

    var posLeft = this.getPosition( 0 );
    var posRight = this.getPosition( 1 );
    var posCenter = this.getPosition( 2 );

    switch ( this.handleSelected ) {

      case 1: // left
        posLeft.deltaPosition( 'x', deltaX, this.getXAxis() );

        if ( Math.abs( posCenter.x - posRight.x ) > Math.abs( posRight.x - posLeft.x ) || Math.abs( posCenter.x - posLeft.x ) > Math.abs( posRight.x - posLeft.x ) ) {
          posCenter.x = posLeft.x + ( posRight.x - posLeft.x ) * 0.1;
        }
        break;

      case 2: // left

        posRight.deltaPosition( 'x', deltaX, this.getXAxis() );

        if ( Math.abs( posCenter.x - posRight.x ) > Math.abs( posRight.x - posLeft.x ) || Math.abs( posCenter.x - posLeft.x ) > Math.abs( posRight.x - posLeft.x ) ) {
          posCenter.x = posRight.x + ( posLeft.x - posRight.x ) * 0.1;
        }

        break;

      case 3: // left

        posCenter.deltaPosition( 'x', deltaX, this.getXAxis() );

        if ( Math.abs( posCenter.x - posRight.x ) > Math.abs( posRight.x - posLeft.x ) || Math.abs( posCenter.x - posLeft.x ) > Math.abs( posRight.x - posLeft.x ) ) {
          return;
        } else {

        }

        break;

    }

    this.setLabelPosition( {
      y: this.getLabelPosition( 0 ).y,
      x: posCenter.x
    } );

    this.updateLabels();
    this.redrawLines();
    this.setHandles();
  }

  applyPosition() {

    this.redrawLines();
    return true;
  }

}

export default ShapePeakBoundaries;