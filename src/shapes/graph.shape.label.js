define( [ './graph.shape' ], function( GraphShape ) {

  var GraphLabel = function( graph, options ) {

  }
  $.extend( GraphLabel.prototype, GraphShape.prototype, {
    createDom: function() {
      this._dom = false;
    },

    setPosition: function() {
      var pos = this._getPosition( this.getprop( 'labelPosition' ) );

      if ( !pos )
        return;

      if ( this.options.minPosY !== undefined ) {
        if ( pos.y < this.options.minPosY ) {
          pos.y = this.options.minPosY;
        }
      }

      this.everyLabel( function( i ) {

        if ( pos.x && pos.y ) {
          this.label[ i ].setAttribute( 'x', pos.x );
          this.label[ i ].setAttribute( 'y', pos.y );
        }
      } );

      return true;

    },

    _setLabelPosition: function() {},

    redrawImpl: function() {
      this.draw();
    },

    selectStyle: function() {

      this.everyLabel( function( i ) {

        this.label[ i ].setAttribute( 'font-weight', 'bold' );

      } );
    },

    unselectStyle: function() {

      this.everyLabel( function( i ) {

        this.label[ i ].setAttribute( 'font-weight', 'normal' );

      } );
    }

  } );

  return GraphLabel;

} );