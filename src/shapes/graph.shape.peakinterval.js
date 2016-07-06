define( [ '../graph.util', './graph.shape.line' ], function( util, GraphLine ) {

  "use strict";

  function GraphPeakInterval( graph ) {

  }

  util.extend( GraphPeakInterval.prototype, GraphLine.prototype, {
    createDom: function() {
      this._dom = document.createElementNS( this.graph.ns, 'line' );
      this._dom.setAttribute( 'marker-end', 'url(#verticalline' + this.graph._creation + ')' );
      this._dom.setAttribute( 'marker-start', 'url(#verticalline' + this.graph._creation + ')' );
    },

    setLabelPosition: function( labelIndex )  {
      var pos1 = this._getPosition( this.getFromData( 'pos' ) );
      var pos2 = this._getPosition( this.getFromData( 'pos2' ), this.getFromData( 'pos' ) );

      this._setLabelPosition( labelIndex, this._getPosition( this.get( 'labelPosition', labelIndex ), {
        x: ( pos1.x + pos2.x ) / 2 + "px",
        y: ( pos1.y + pos2.y ) / 2 + "px"
      } ) );

    },

    afterDone: function() {

    }
  } );

  return GraphPeakInterval;

} );