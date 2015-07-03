define( [], function() {

  return {

    setAttributeTo: function( to, params, ns ) {
      var i;

      if ( ns ) {
        for ( i in params ) {
          to.setAttributeNS( ns, i, params[ i ] );
        }
      } else {
        for ( i in params ) {
          to.setAttribute( i, params[ i ] );
        }
      }
    },

    mapEventEmission: function( options, source ) {

      if ( !source ) {
        source = this;
      }

      var eventName;

      for ( var i in options ) {

        // Starts with onXXX
        if ( i.indexOf( "on" ) == 0 && typeof options[ i ] == "function" ) {
          eventName = i.substring( 2 );
          eventName = eventName.substring( 0, 1 ).toLowerCase() + eventName.substring( 1 );

          if ( source.on ) {
            source.on( eventName, options[ i ] );
          }
        }
      }
    },

    guid: function() {
      // http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace( /[xy]/g, function( c ) {
        var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : ( r & 0x3 | 0x8 );
        return v.toString( 16 );
      } );

    },

    throwError: function( message ) {
      console.error( message );
    },

    // Borrowed from jQuery
    isNumeric: function( obj ) {
      return !Array.isArray( obj ) && ( obj - parseFloat( obj ) + 1 ) >= 0;
    }

  }

} );