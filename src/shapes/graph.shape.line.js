import GraphShape from './graph.shape'

/** 
 * Represents a line
 * @extends Shape
 * @see Graph#newShape
 */
class ShapeLine extends GraphShape {

  constructor( graph, options ) {
    super( graph, options );
  }

  /**
   * Creates the DOM
   * @private
   * @return {Shape} The current shape
   */
  createDom() {

    this._dom = document.createElementNS( this.graph.ns, 'line' );

    this.setStrokeColor( 'black' );
    this.setStrokeWidth( 1 );
  }

  /**
   * Creates the handles
   * @private
   * @return {Shape} The current shape
   */
  createHandles() {

    this._createHandles( 2, 'rect', {
      transform: "translate(-3 -3)",
      width: 6,
      height: 6,
      stroke: "black",
      fill: "white",
      cursor: 'nwse-resize'
    } );
  }

  /**
   * Recalculates the positions and applies them
   * @private
   * @return {Boolean} Whether the shape should be redrawn
   */
  applyPosition() {

    var position = this.calculatePosition( 0 );
    var position2 = this.calculatePosition( 1 );

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
  }

  /**
   * Handles mouse move events
   * @private
   */
  handleMouseMoveImpl( e, deltaX, deltaY, deltaXPx, deltaYPx ) {

    if ( this.isLocked() ) {
      return;
    }

    var pos = this.getPosition( 0 );
    var pos2 = this.getPosition( 1 );

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

      // If the pos2 is defined by a delta, no need to move them
      if ( pos.x ) {
        pos.deltaPosition( 'x', deltaX, this.getXAxis() );
      }
      if ( pos.y ) {
        pos.deltaPosition( 'y', deltaY, this.getYAxis() );
      }

      // If the pos2 is defined by a delta, no need to move them
      if ( pos2.x ) {
        pos2.deltaPosition( 'x', deltaX, this.getXAxis() );
      }
      if ( pos2.y ) {
        pos2.deltaPosition( 'y', deltaY, this.getYAxis() );
      }

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

    if ( this.rectEvent ) {
      this.setEventReceptacle();
    }

    this.redraw();
    this.changed();
    this.setHandles();

    return true;
  }

  /**
   * Sets the handle position
   * @private
   */
  setHandles() {

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
  }

  /**
   * Creates an line receptacle with the coordinates of the line, but continuous and thicker
   * @return {Shape} The current shape
   */
  setEventReceptacle() {

    if ( !this.currentPos1x ) {
      return;
    }

    if ( !this.rectEvent ) {
      this.rectEvent = document.createElementNS( this.graph.ns, 'line' );
      this.rectEvent.setAttribute( 'pointer-events', 'stroke' );
      this.rectEvent.setAttribute( 'stroke', 'transparent' );
      this.rectEvent.jsGraphIsShape = this;
      this.group.appendChild( this.rectEvent );
    }

    this.rectEvent.setAttribute( 'x1', this.currentPos1x );
    this.rectEvent.setAttribute( 'y1', this.currentPos1y );
    this.rectEvent.setAttribute( 'x2', this.currentPos2x );
    this.rectEvent.setAttribute( 'y2', this.currentPos2y );
    this.rectEvent.setAttribute( "stroke-width", this.getProp( "strokeWidth" ) + 2 );
  }
}

export default ShapeLine