define( [ './graph.shape' ], function( GraphShape ) {

  "use strict";

  /** 
   * Line shape
   * @class LineShape
   * @static
   */
  var LineShape = function( graph, options ) {

    this.selectStyle = {
      stroke: 'red'
    };

    this.setStrokeColor( 'black' );
    this.setStrokeWidth( 1 );

  }

  LineShape.prototype = new GraphShape();

  /**
   * Creates the DOM
   * @memberof Shape
   * @private
   * @return {Shape} The current shape
   */
  LineShape.prototype.createDom = function() {

    this._dom = document.createElementNS( this.graph.ns, 'line' );

    this._createHandles( 2, 'rect', {
      transform: "translate(-3 -3)",
      width: 6,
      height: 6,
      stroke: "black",
      fill: "white",
      cursor: 'nwse-resize'
    } );

  };

  /**
   * Recalculates the positions and applies them
   * @memberof Shape
   * @private
   * @return {Boolean} Whether the shape should be redrawn
   */
  LineShape.prototype.applyPosition = function() {

    var position = this.calculatePosition( 0 );
    var position2 = this.calculatePosition( 1, 0 );

    if ( !position || !position.x || !position.y ) {
      return;
    }

    this.setDom( 'x2', position.x );
    this.setDom( 'y2', position.y );

    this.setDom( 'y1', position2.y );
    this.setDom( 'x1', position2.x );

    this.currentPos2x = position2.x;
    this.currentPos2y = position2.y;

    this.currentPos1x = position.x;
    this.currentPos1y = position.y;

    return true;
  };

  /**
   * Handles mouse move events
   * @memberof Shape
   * @private
   */
  LineShape.prototype.handleMouseMoveImpl = function( e, deltaX, deltaY, deltaXPx, deltaYPx ) {

    if ( this.isLocked() ) {
      return;
    }

    var pos = this.getPosition( 0 );
    var pos2 = this.getPosition( 1 );

    if ( pos2.dx ) {

      pos2.deltaPosition( 'x', pos2.dx, this.getXAxis() );
      pos2.dx = false;
    }

    if ( pos2.dy ) {
      pos2.deltaPosition( 'y', pos2.dy, this.getYAxis() );
      pos2.dy = false;
    }

    var posToChange;
    if ( this.handleSelected == 1 ) {

      posToChange = pos;

    } else if ( this.handleSelected == 2 ) {

      posToChange = pos2;
    }

    if ( posToChange ) {

      if ( !this._data.vertical ) {
        posToChange.deltaPosition( 'x', deltaX, this.getXAxis() );
      }

      if ( !this._data.horizontal ) {
        posToChange.deltaPosition( 'y', deltaY, this.getYAxis() );
      }
    }

    if ( this.moving ) {

      pos.deltaPosition( 'x', deltaX, this.getXAxis() );
      pos.deltaPosition( 'y', deltaY, this.getYAxis() );
      pos2.deltaPosition( 'x', deltaX, this.getXAxis() );
      pos2.deltaPosition( 'y', deltaY, this.getYAxis() );
    }

    if ( this._data.forcedCoords ) {

      var forced = this._data.forcedCoords;

      if ( forced.y !== undefined ) {

        if ( typeof forced.y == "function" ) {
          pos2.y = pos.y = forced.y( this );
        } else {
          pos2.y = forced.y;
          pos.y = forced.y;
        }
      }

      if ( forced.x !== undefined ) {

        if ( typeof forced.x == "function" ) {
          pos2.x = pos.x = forced.x( this );
        } else {
          pos2.x = forced.x;
          pos.x = forced.x;
        }
      }
    }

    this.redraw();
    this.changed();
    this.setHandles();

    return true;

  };

  /**
   * Sets the handle position
   * @memberof Shape
   * @private
   */
  LineShape.prototype.setHandles = function() {

    if ( !this.areHandlesInDom() ) {
      return;
    }

    if ( isNaN( this.currentPos1x ) ) {
      return;
    }

    this.handles[ 1 ].setAttribute( 'x', this.currentPos1x );
    this.handles[ 1 ].setAttribute( 'y', this.currentPos1y );

    this.handles[ 2 ].setAttribute( 'x', this.currentPos2x );
    this.handles[ 2 ].setAttribute( 'y', this.currentPos2y );
  };

  return LineShape;

} );