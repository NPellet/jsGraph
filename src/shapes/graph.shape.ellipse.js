define( [ './graph.shape' ], function( GraphShape ) {

  var GraphRect = function( graph, options ) {

    this.options = options;
    this.init( graph );

    this.graph = graph;

  }

  $.extend( GraphRect.prototype, GraphShape.prototype, {

    createDom: function() {
      this._dom = document.createElementNS( this.graph.ns, 'ellipse' );
    },

    setPosition: function() {

      var pos = this._getPosition( this.getFromData( 'pos' ) ),
        x = pos.x,
        y = pos.y;

      if ( !isNaN( x ) && !isNaN( y ) && x !== false && y !== false ) {

        this.setDom( 'cx', x );
        this.setDom( 'cy', y );

        this.setDom( 'rx', this.rx || 0 );
        this.setDom( 'ry', this.ry || 0 );

        return true;
      }

      return false;
    },

    setRX: function( rx ) {
      this.rx = rx;
    },

    setRY: function( ry ) {
      this.ry = ry;
    },

    setR: function( rx, ry ) {
      this.rx = rx;
      this.ry = ry;
    },

    getLinkingCoords: function() {

      return {
        x: this.currentX + this.currentW / 2,
        y: this.currentY + this.currentH / 2
      };
    },

    redrawImpl: function() {

    },

    handleCreateImpl: function() {
      this.resize = true;
    },

    handleMouseDownImpl: function( e ) {

    },

    handleMouseUpImpl: function() {

      /*	if( pos2.y < pos.y ) {
				var y = pos.y;
				pos.y = pos2.y;
				pos2.y = y;
			}
		*/
      this.triggerChange();
    },

    handleMouseMoveImpl: function( e, deltaX, deltaY, deltaXPx, deltaYPx ) {
      return;

    },

    setHandles: function() {

    },

    selectStyle: function() {
      this.setDom( 'stroke', 'red' );
      this.setDom( 'stroke-width', '2' );
      this.setDom( 'fill', 'rgba(255, 0, 0, 0.1)' );
    }

  } );

  return GraphRect;

} );