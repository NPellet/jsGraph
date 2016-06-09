define( [ 'jquery', './graph.shape' ], function( $, GraphShape ) {

  function GraphEllipse( graph, options ) {}

  $.extend( GraphEllipse.prototype, GraphShape.prototype, {

    createDom: function() {
      this._dom = document.createElementNS( this.graph.ns, 'ellipse' );
    },

    applyPosition: function() {

      var pos = this.computePosition( 0 );

      this.setDom( 'cx', pos.x ||  0 );
      this.setDom( 'cy', pos.y ||  0 );

      this.setDom( 'rx', this.getProp( 'rx' ) || 0 );
      this.setDom( 'ry', this.getProp( 'ry' ) || 0 );

      return true;
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

    }

  } );

  return GraphEllipse;

} );