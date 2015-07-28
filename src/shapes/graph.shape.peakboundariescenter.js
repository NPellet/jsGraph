define( [ './graph.shape.line' ], function( GraphLine ) {

  "use strict";

  var GraphPeakBoundariesCenter = function( graph, options ) {
    this.nbHandles = 3;
    this.lineHeight = 3;
  }

  $.extend( GraphPeakBoundariesCenter.prototype, GraphLine.prototype, {

    createDom: function() {

      this._dom = document.createElementNS( this.graph.ns, 'line' );
      this.line1 = document.createElementNS( this.graph.ns, 'line' );
      this.line2 = document.createElementNS( this.graph.ns, 'line' );
      this.line3 = document.createElementNS( this.graph.ns, 'line' );

      this.rectBoundary = document.createElementNS( this.graph.ns, 'path' );

      this.rectBoundary.setAttribute( 'fill', 'none' );
      this.rectBoundary.setAttribute( 'stroke', 'none' );
      this.rectBoundary.setAttribute( 'pointer-events', 'fill' );

      this.group.appendChild( this.rectBoundary );
      this.group.appendChild( this.line1 );
      this.group.appendChild( this.line2 );
      this.group.appendChild( this.line3 );

      this.createHandles( this.nbHandles, 'rect', {
        transform: "translate(-3 -3)",
        width: 6,
        height: 6,
        stroke: "black",
        fill: "white",
        cursor: 'nwse-resize'
      } );

      this._dom.element = this;
    },

    redrawImpl: function() {

      this.line1.setAttribute( 'stroke', this.getprop( 'strokeColor' ) );
      this.line2.setAttribute( 'stroke', this.getprop( 'strokeColor' ) );
      this.line3.setAttribute( 'stroke', this.getprop( 'strokeColor' ) );

      this.line1.setAttribute( 'stroke-width', this.getprop( 'strokeWidth' ) );
      this.line2.setAttribute( 'stroke-width', this.getprop( 'strokeWidth' ) );
      this.line3.setAttribute( 'stroke-width', this.getprop( 'strokeWidth' ) );

      this.setHandles();
      this.redrawLines();
    },

    redrawLines: function() {

      var posLeft = this._getPosition( this.getFromData( 'pos' ), this.getFromData( 'posCenter' ) );
      var posRight = this._getPosition( this.getFromData( 'pos2' ), this.getFromData( 'posCenter' ) );
      var posCenter = this._getPosition( this.getFromData( 'posCenter' ) );

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

    },

    setLinesY: function( height ) {

      if ( !this.posYPx ) {
        return;
      }

      this.line1.setAttribute( 'y1', this.posYPx - height );
      this.line1.setAttribute( 'y2', this.posYPx + height );

      this.line2.setAttribute( 'y1', this.posYPx - height );
      this.line2.setAttribute( 'y2', this.posYPx + height );

      this.line3.setAttribute( 'y1', this.posYPx - height );
      this.line3.setAttribute( 'y2', this.posYPx + height );

      this._dom.setAttribute( 'y1', this.posYPx );
      this._dom.setAttribute( 'y2', this.posYPx );

    },

    setHandles: function() {

      if ( !this.posYPx ) {
        return;
      }

      var posLeft = this._getPosition( this.getFromData( 'pos' ), this.getFromData( 'posCenter' ) );
      var posRight = this._getPosition( this.getFromData( 'pos2' ), this.getFromData( 'posCenter' ) );
      var posCenter = this._getPosition( this.getFromData( 'posCenter' ) );

      if ( posLeft.x && posRight.x && posCenter.x ) {

        this.handle1.setAttribute( 'x', posLeft.x );
        this.handle1.setAttribute( 'y', this.posYPx );

        this.handle2.setAttribute( 'x', posRight.x );
        this.handle2.setAttribute( 'y', this.posYPx );

        this.handle3.setAttribute( 'x', posCenter.x );
        this.handle3.setAttribute( 'y', this.posYPx );
      }
    },

    setY: function( y ) {
      this.posYPx = y;
    },

    setLineHeight: function( height ) {
      this.lineHeihgt = height;
    },

    handleMouseMoveImpl: function( e, deltaX, deltaY ) {

      if ( this.isLocked() ) {
        return;
      }

      var posLeft = this.getFromData( 'pos' );
      var posRight = this.getFromData( 'pos2' );
      var posCenter = this.getFromData( 'posCenter' );

      switch ( this.handleSelected ) {

        case 1: // left
          posLeft.x = this.graph.deltaPosition( posLeft.x, deltaX, this.getXAxis() );

          if ( Math.abs( posCenter.x - posRight.x ) > Math.abs( posRight.x - posLeft.x ) || Math.abs( posCenter.x - posLeft.x ) > Math.abs( posRight.x - posLeft.x ) ) {
            posCenter.x = posLeft.x + ( posRight.x - posLeft.x ) * 0.1;
          }
          break;

        case 2: // left
          posRight.x = this.graph.deltaPosition( posRight.x, deltaX, this.getXAxis() );
          if ( Math.abs( posCenter.x - posRight.x ) > Math.abs( posRight.x - posLeft.x ) || Math.abs( posCenter.x - posLeft.x ) > Math.abs( posRight.x - posLeft.x ) ) {
            posCenter.x = posRight.x + ( posLeft.x - posRight.x ) * 0.1;
          }

          break;

        case 3: // left
          var newPos = this.graph.deltaPosition( posCenter.x, deltaX, this.getXAxis() );

          if ( Math.abs( newPos - posRight.x ) > Math.abs( posRight.x - posLeft.x ) || Math.abs( newPos - posLeft.x ) > Math.abs( posRight.x - posLeft.x ) ) {
            return;
          } else {
            posCenter.x = newPos;
          }

          break;

      }

      this.prop( 'labelPosition', {
        y: this.getprop( 'labelPosition', 0 ).y,
        x: posCenter.x
      }, 0 );

      this.setLabelPosition( 0 );

      this.redrawLines();
      this.setHandles();
    },

    setPosition: function() {
      var position = this._getPosition( this.getFromData( 'pos' ) );

      if ( !position || !position.x || !position.y ) {
        return true;
      }

      this.setDom( 'x2', position.x );
      this.setDom( 'y2', position.y );

      this.currentPos1x = position.x;
      this.currentPos1y = position.y;

      return true;
    },

  } );

  return GraphPeakBoundariesCenter;
} );