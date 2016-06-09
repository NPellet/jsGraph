define( [], function() {

  /**
   * Some general utilitary functions that are useful for jsGraph
   * @object
   */
  var util = {};

  /**
   *  Easy set attribute method to apply to a SVG Element the attributes listed. Optional namespacing
   * @param {SVGElement} to - The SVG element to apply the attributes to
   * @param {Object<String,Any>} attr - A key/value hashmap of attributes
   * @param {String} [ ns = undefined ] - The namespace to use (with <code>setAttributeNS</code>). Default if without namespacing
   */
  util.setAttributeTo = function( to, params, ns ) {
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
  };

  /**
   * Maps old-style events defined within the creation (i.e. <code>{ onMouseOver: function() }</code>) to modern event listening <code>.on("mouseover")</code>
   * The function will read any object and select the ones starting with "on"
   * @params {Object} options - An option object to read the events from
   * @param {Object} source - The source object to which the options belong
   * @example util.mapEventEmission( this.options, this );
   */
  util.mapEventEmission = function( options, source ) {

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

          ( function( j ) {

            source.on( eventName, function() {
              options[ j ].apply( source, arguments );
            } );

          } )( i )

        }
      }
    }
  };

  /**
   * @link http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
   * @return {String} a random id
   */
  util.guid = function() {
    // 
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace( /[xy]/g, function( c ) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : ( r & 0x3 | 0x8 );
      return v.toString( 16 );
    } );

  };

  util.throwError = function( message ) {
    console.error( message );
  };

  /**
   * Checks if a variable is a numeric or not
   * @return {Boolean} <code>true</code> for a numeric value, false otherwise
   */
  util.isNumeric = function( obj ) {
    return !Array.isArray( obj ) && ( obj - parseFloat( obj ) + 1 ) >= 0;
  };

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
  util.hue2rgb = function( p, q, t ) {
    if ( t < 0 ) t += 1;
    if ( t > 1 ) t -= 1;
    if ( t < 1 / 6 ) return p + ( q - p ) * 6 * t;
    if ( t < 1 / 2 ) return q;
    if ( t < 2 / 3 ) return p + ( q - p ) * ( 2 / 3 - t ) * 6;
    return p;
  };

  util.hslToRgb = function( h, s, l ) {
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
  };

  util.saveDomAttributes = function( to, attributes, identification ) {

    if ( !to ) return;

    to._savedAttributesIds = to._savedAttributesIds || [];

    if ( to._savedAttributesIds.indexOf( identification ) > -1 ) {
      util.restoreDomAttributes( to, identification );
    }

    to._savedAttributes = to._savedAttributes || {};
    to._attributes = to._attributes || {};
    to._attributes[ identification ] = attributes;

    to._savedAttributesIds.push( identification );

    for ( var i in attributes ) {

      if ( !to._savedAttributes[ i ] ) {
        to._savedAttributes[ i ] = to.getAttribute( i );
      }

      to.setAttribute( i, attributes[ i ] );
    }

  };

  util.restoreDomAttributes = function( to, identification ) {

    if ( !to || !to._savedAttributesIds ) {
      return;
    }

    to._savedAttributesIds.splice( to._savedAttributesIds.indexOf( identification ), 1 );
    delete to._attributes[  identification ];

    var attrs = {};

    for ( var i in to._savedAttributes ) {
      attrs[ i ] = to._savedAttributes[ i ];
    };

    for ( var i = 0, l = to._savedAttributesIds.length; i < l; i++ ) {

      for ( var j in to._attributes[ to._savedAttributesIds[ i ] ] ) {
        attrs[ j ] = to._attributes[ to._savedAttributesIds[ i ] ][ j ];
      }
    }

    for ( var j in attrs ) {
      to.setAttribute( j, attrs[ j ] );
    }

  };

  // http://stackoverflow.com/questions/11197247/javascript-equivalent-of-jquerys-extend-method
  util.extend = function() {
    var src, copyIsArray, copy, name, options, clone,
      target = arguments[ 0 ] || {},
      i = 1,
      length = arguments.length,
      deep = false;

    // Handle a deep copy situation
    if ( typeof target === "boolean" ) {
      deep = target;
      target = arguments[ 1 ] || {};

      // skip the boolean and the target
      i = 2;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if ( typeof target !== "object" && !( typeof target == "function" ) ) {
      target = {};
    }

    // extend jQuery itself if only one argument is passed
    if ( length === i ) {
      target = this;
      --i;
    }

    for ( ; i < length; i++ ) {

      // Only deal with non-null/undefined values
      if ( ( options = arguments[ i ] ) != null ) {

        // Extend the base object
        for ( name in options ) {
          src = target[ name ];
          copy = options[ name ];

          // Prevent never-ending loop
          if ( target === copy ) {
            continue;
          }

          // Recurse if we're merging plain objects or arrays
          if ( deep && copy && ( util.isPlainObject( copy ) || ( copyIsArray = Array.isArray( copy ) ) ) ) {
            if ( copyIsArray ) {
              copyIsArray = false;
              clone = src && Array.isArray( src ) ? src : [];

            } else {
              clone = src && util.isPlainObject( src ) ? src : {};
            }

            // Never move original objects, clone them
            target[ name ] = util.extend( deep, clone, copy );

            // Don't bring in undefined values
          } else if ( copy !== undefined ) {
            target[ name ] = copy;
          }
        }
      }
    }

    // Return the modified object
    return target;
  };

  // http://code.jquery.com/jquery-2.1.4.js
  util.isPlainObject = function( obj ) {
    // Not plain objects:
    // - Any object or value whose internal [[Class]] property is not "[object Object]"
    // - DOM nodes
    // - window
    if ( typeof obj !== "object" || obj.nodeType || obj === obj.window ) {
      return false;
    }

    if ( obj.constructor && obj.constructor.prototype.hasOwnProperty( "isPrototypeOf" ) ) {
      return false;
    }

    // If the function hasn't returned already, we're confident that
    // |obj| is a plain object, created by {} or constructed with new Object
    return true;
  };

  // https://davidwalsh.name/function-debounce
  util.debounce = function( func, wait, immediate ) {
    var timeout;
    return function() {
      var context = this,
        args = arguments;
      var later = function() {
        timeout = null;
        if ( !immediate ) func.apply( context, args );
      };
      var callNow = immediate && !timeout;
      clearTimeout( timeout );
      timeout = setTimeout( later, wait );
      if ( callNow ) func.apply( context, args );
    };
  };

  util.SVGParser = function( svgString ) {

    var parser = new DOMParser();
    var doc = parser.parseFromString( svgString, "image/svg+xml" );
    // returns a SVGDocument, which also is a Document.

    return doc;

  };

  // http://stackoverflow.com/questions/5276953/what-is-the-most-efficient-way-to-reverse-an-array-in-javascript
  util.reverseArray = function( array ) {
    var left = null;
    var right = null;
    var length = array.length;
    for ( left = 0, right = length - 1; left < right; left += 1, right -= 1 ) {
      var temporary = array[ left ];
      array[ left ] = array[ right ];
      array[ right ] = temporary;
    }
    return array;
  };

  return util;

} );