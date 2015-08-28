define( [ './graph.shape' ], function( GraphShape ) {

  var GraphLabel = function( graph, options ) {

  }
  $.extend( GraphLabel.prototype, GraphShape.prototype, {
    createDom: function() {
      this._dom = false;
    },

    setPosition: function() {

      this.everyLabel( function( i ) {

        var pos = this._getPosition( this.getprop( 'labelPosition', i ) );

        if ( this.options.minPosY !== undefined ) {
          if ( pos.y < this.options.minPosY ) {
            pos.y = this.options.minPosY;
          }
        }

        if ( pos.x !== false && pos.y !== false ) {
          this.label[ i ].setAttribute( 'x', pos.x );
          this.label[ i ].setAttribute( 'y', pos.y );
        }

        this._setLabelBaseline( i );
        this._setLabelAngle( i );
      } );
      return false;

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