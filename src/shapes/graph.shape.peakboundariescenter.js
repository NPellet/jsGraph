define( [ './graph.shape.line' ], function( GraphLine ) {

  /** 
   * Arrow shape
   * @class ArrowShape
   * @static
   */
  function PeakBoundariesMiddleShape( graph ) {
    this.lineHeight = 6;
  }

  PeakBoundariesMiddleShape.prototype = new GraphLine();

  PeakBoundariesMiddleShape.prototype.createDom = function() {

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
  };

  PeakBoundariesMiddleShape.prototype.createHandles = function() {
    this._createHandles( 3, 'rect', {
      transform: "translate(-3 -3)",
      width: 6,
      height: 6,
      stroke: "black",
      fill: "white",
      cursor: 'nwse-resize'
    } );
  };

  PeakBoundariesMiddleShape.prototype.redrawImpl = function() {

    this.line1.setAttribute( 'stroke', this.getStrokeColor() );
    this.line2.setAttribute( 'stroke', this.getStrokeColor() );
    this.line3.setAttribute( 'stroke', this.getStrokeColor() );

    this.line1.setAttribute( 'stroke-width', this.getStrokeWidth() );
    this.line2.setAttribute( 'stroke-width', this.getStrokeWidth() );
    this.line3.setAttribute( 'stroke-width', this.getStrokeWidth() );

    this.setHandles();
    this.redrawLines();
  };

  PeakBoundariesMiddleShape.prototype.redrawLines = function() {

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

      this.setLinesY( height );
    }

  };

  PeakBoundariesMiddleShape.prototype.setLinesY = function() {

    if ( !this.posYPx ) {
      return;
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

  };

  PeakBoundariesMiddleShape.prototype.setHandles = function() {

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
  };

  PeakBoundariesMiddleShape.prototype.setY = function( y ) {
    this.posYPx = y;
  };

  PeakBoundariesMiddleShape.prototype.setLineHeight = function( height ) {
    this.lineHeihgt = height;
  };

  PeakBoundariesMiddleShape.prototype.handleMouseMoveImpl = function( e, deltaX, deltaY ) {

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
  };

  PeakBoundariesMiddleShape.prototype.applyPosition = function() {
    return true;
  };

  return PeakBoundariesMiddleShape;
} );