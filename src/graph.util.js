define( [], function() {

  /**
   * Some general utilitary functions that are useful for jsGraph
   * @object
   */
  var util = {

    /**
     *  Easy set attribute method to apply to a SVG Element the attributes listed. Optional namespacing
     * @param {SVGElement} to - The SVG element to apply the attributes to
     * @param {Object<String,Any>} attr - A key/value hashmap of attributes
     * @param {String} [ ns = undefined ] - The namespace to use (with <code>setAttributeNS</code>). Default if without namespacing
     */
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

    /**
     * Maps old-style events defined within the creation (i.e. <code>{ onMouseOver: function() }</code>) to modern event listening <code>.on("mouseover")</code>
     * The function will read any object and select the ones starting with "on"
     * @params {Object} options - An option object to read the events from
     * @param {Object} source - The source object to which the options belong
     * @example util.mapEventEmission( this.options, this );
     */
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

    /**
     * @link http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
     * @return {String} a random id
     */
    guid: function() {
      // 
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace( /[xy]/g, function( c ) {
        var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : ( r & 0x3 | 0x8 );
        return v.toString( 16 );
      } );

    },

    throwError: function( message ) {
      console.error( message );
    },

    /**
     * Checks if a variable is a numeric or not
     * @return {Boolean} <code>true</code> for a numeric value, false otherwise
     */
    isNumeric: function( obj ) {
      return !Array.isArray( obj ) && ( obj - parseFloat( obj ) + 1 ) >= 0;
    },

    /**
     * @see http://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
     * Converts an HSL color value to RGB. Conversion formula
     * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
     * Assumes h, s, and l are contained in the set [0, 1] and
     * returns r, g, and b in the set [0, 255].
     *
     * @param   Number  h       The hue
     * @param   Number  s       The saturation
     * @param   Number  l       The lightness
     * @return  Array           The RGB representation
     */
    hue2rgb: function( p, q, t ) {
      if ( t < 0 ) t += 1;
      if ( t > 1 ) t -= 1;
      if ( t < 1 / 6 ) return p + ( q - p ) * 6 * t;
      if ( t < 1 / 2 ) return q;
      if ( t < 2 / 3 ) return p + ( q - p ) * ( 2 / 3 - t ) * 6;
      return p;
    },

    hslToRgb: function( h, s, l ) {
      var r, g, b;

      if ( s == 0 ) {
        r = g = b = l; // achromatic
      } else {

        var q = l < 0.5 ? l * ( 1 + s ) : l + s - l * s;
        var p = 2 * l - q;
        r = util.hue2rgb( p, q, h + 1 / 3 );
        g = util.hue2rgb( p, q, h );
        b = util.hue2rgb( p, q, h - 1 / 3 );
      }

      return [ Math.round( r * 255 ), Math.round( g * 255 ), Math.round( b * 255 ) ];
    },

    saveDomAttributes: function( to, attributes ) {

      to._savedAttributes = {};

      for ( var i in attributes ) {
        this._savedAttributes[ i ] = to.getAttribute( i );
        to.setAttribute( i, attributes[ i ] );
      }

    },

    restoreDomAttibutes: function( to ) {

      for ( var i in to._savedAttributes ) {
        to.setAttribute( i, to._savedAttributes[ i ] );
      }
    }

  };

  return util;

} );