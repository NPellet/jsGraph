/**
 * Easy set attribute method to apply to a SVG Element the attributes listed. Optional namespacing
 * @param {SVGElement} to - The SVG element to apply the attributes to
 * @param {Object<String,Any>} attr - A key/value hashmap of attributes
 * @param {String} [ ns = undefined ] - The namespace to use (with <code>setAttributeNS</code>). Default if without namespacing
 */
export function setAttributeTo( to, params, ns ) {
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
export function mapEventEmission( options, source ) {

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
export function guid() {
  // 
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace( /[xy]/g, function( c ) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : ( r & 0x3 | 0x8 );
    return v.toString( 16 );
  } );

};

export function throwError( message ) {
  console.error( message );
};

export function warn( message ) {
  console.warn( message );
};

/**
 * Checks if a variable is a numeric or not
 * @return {Boolean} <code>true</code> for a numeric value, false otherwise
 */
export function isNumeric( obj ) {
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
export function hue2rgb( p, q, t ) {
  if ( t < 0 ) t += 1;
  if ( t > 1 ) t -= 1;
  if ( t < 1 / 6 ) return p + ( q - p ) * 6 * t;
  if ( t < 1 / 2 ) return q;
  if ( t < 2 / 3 ) return p + ( q - p ) * ( 2 / 3 - t ) * 6;
  return p;
};

export function hslToRgb( h, s, l ) {
  var r, g, b;

  if ( s == 0 ) {
    r = g = b = l; // achromatic
  } else {

    var q = l < 0.5 ? l * ( 1 + s ) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb( p, q, h + 1 / 3 );
    g = hue2rgb( p, q, h );
    b = hue2rgb( p, q, h - 1 / 3 );
  }

  return [ Math.round( r * 255 ), Math.round( g * 255 ), Math.round( b * 255 ) ];
};

export function saveDomAttributes( to, attributes, identification ) {

  if ( !to ) return;

  to._savedAttributesIds = to._savedAttributesIds || [];

  if ( to._savedAttributesIds.indexOf( identification ) > -1 ) {
    restoreDomAttributes( to, identification );
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

export function hasSavedAttribute( dom, attr ) {
  return dom._savedAttributes && dom._savedAttributes[ attr ] !== undefined;
}

export function overwriteDomAttribute( dom, attribute, newValue ) {
  if ( hasSavedAttribute( dom, attribute ) ) {
    dom._savedAttributes[ attribute ] = newValue;
  }
}

export function restoreDomAttributes( to, identification ) {

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

// https://davidwalsh.name/function-debounce
export function debounce( func, wait, immediate ) {
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

export function SVGParser( svgString ) {

  var parser = new DOMParser();
  var doc = parser.parseFromString( svgString, "image/svg+xml" );
  // returns a SVGDocument, which also is a Document.

  return doc;

};

// http://stackoverflow.com/questions/5276953/what-is-the-most-efficient-way-to-reverse-an-array-in-javascript
export function reverseArray( array ) {
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

// jQuery.fn.offset
export function getOffset( el ) {
  var rect = el.getBoundingClientRect();
  return {
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft
  };
};

// jQuery.fn.css
export function setCSS( element, values ) {
  var style = element.style;
  for ( var i in values ) {
    style[ i ] = values[ i ];
  }
};

export function ajaxGet( options ) {
  return new Promise( function( resolve, reject ) {
    var request = new XMLHttpRequest();
    request.open( options.type || 'GET', options.url, true );
    if ( options.json ) request.setRequestHeader( 'Accept', 'application/json' );
    request.onload = function() {
      if ( request.status === 200 ) {
        var response = request.responseText;
        if ( options.json ) response = JSON.parse( response );
        resolve( response );
      } else {
        reject( new Error( 'Request error: ' + request.status ) );
      }
    };
    request.onerror = function() {
      reject( new Error( 'Network error: ' + request.status ) );
    };
    request.send();
  } );
};

// https://raw.githubusercontent.com/justmoon/node-extend/888f153645115d1c6aa9a7e346e8e9cd9a83de9b/index.js
// Copyright (c) 2014 Stefan Thomas
var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;

var isArray = function isArray( arr ) {
  if ( typeof Array.isArray === 'function' ) {
    return Array.isArray( arr );
  }

  return toStr.call( arr ) === '[object Array]';
};

var isPlainObject = function isPlainObject( obj ) {
  if ( !obj || toStr.call( obj ) !== '[object Object]' ) {
    return false;
  }

  var hasOwnConstructor = hasOwn.call( obj, 'constructor' );
  var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call( obj.constructor.prototype, 'isPrototypeOf' );
  // Not own constructor property must be Object
  if ( obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf ) {
    return false;
  }

  // Own properties are enumerated firstly, so to speed up,
  // if last one is own, then all properties are own.
  var key;
  for ( key in obj ) { /**/ }

  return typeof key === 'undefined' || hasOwn.call( obj, key );
};

export function extend() {
  var options, name, src, copy, copyIsArray, clone;
  var target = arguments[ 0 ];
  var i = 1;
  var length = arguments.length;
  var deep = false;

  // Handle a deep copy situation
  if ( typeof target === 'boolean' ) {
    deep = target;
    target = arguments[ 1 ] || {};
    // skip the boolean and the target
    i = 2;
  } else if ( ( typeof target !== 'object' && typeof target !== 'function' ) || target == null ) {
    target = {};
  }

  for ( ; i < length; ++i ) {
    options = arguments[ i ];
    // Only deal with non-null/undefined values
    if ( options != null ) {
      // Extend the base object
      for ( name in options ) {
        src = target[ name ];
        copy = options[ name ];

        // Prevent never-ending loop
        if ( target !== copy ) {
          // Recurse if we're merging plain objects or arrays
          if ( deep && copy && ( isPlainObject( copy ) || ( copyIsArray = isArray( copy ) ) ) ) {
            if ( copyIsArray ) {
              copyIsArray = false;
              clone = src && isArray( src ) ? src : [];
            } else {
              clone = src && isPlainObject( src ) ? src : {};
            }

            // Never move original objects, clone them
            target[ name ] = extend( deep, clone, copy );

            // Don't bring in undefined values
          } else if ( typeof copy !== 'undefined' ) {
            target[ name ] = copy;
          }
        }
      }
    }
  }

  // Return the modified object
  return target;
};

export {
  isArray
};
export {
  isPlainObject
};

export function mix( baseClass, mixin ) {

  for ( let prop in mixin ) {

    if ( mixin.hasOwnProperty( prop ) ) {
      baseClass.prototype[ prop ] = mixin[ prop ];
    }
  }
}

export function emptyDom( dom ) {
  while ( dom.firstChild ) {
    dom.removeChild( dom.firstChild );
  }
}