import Axis from './graph.axis'
import * as util from './graph.util'

var axisFormat = [

  {

    threshold: 20,
    increments: {

      1: {
        increment: 1, // 1 minute
        unit: 'i',
        format: 'HH"h"MM (dd/mm/yy)'
      },

      2: { // 10 seconds
        increment: 1,
        unit: 's',
        format: 'MM:ss"s"'
      }
    }
  },

  {

    threshold: 50,
    increments: {

      1: {
        increment: 1, // 1 minute
        unit: 'i',
        format: 'HH"h"MM (dd/mm/yy)'
      },

      2: { // 2 seconds
        increment: 2,
        unit: 's',
        format: 'MM:ss"s"'
      }
    }
  },

  {

    threshold: 100,
    increments: {

      1: {
        increment: 1, // 1 minute
        unit: 'i',
        format: 'HH"h"MM (dd/mm/yy)'
      },

      2: { // 5 seconds
        increment: 5,
        unit: 's',
        format: 'MM:ss"s"'
      }
    }
  },

  {

    threshold: 600,
    increments: {

      1: {
        increment: 10, // 1 minute
        unit: 'i',
        format: 'HH"h"MM (dd/mm/yy)'
      },

      2: { // 10 seconds
        increment: 30,
        unit: 's',
        format: 'MM:ss"s"'
      }
    }
  },

  { // One day

    threshold: 1000,
    increments: {

      1: { // 1h
        increment: 1,
        unit: 'h',
        format: 'HH"h"MM (dd/mm/yy)'
      },

      2: { // 10 minutes
        increment: 10,
        unit: 'i',
        format: 'MM"min"'
      }
    }
  },

  { // One day

    threshold: 1500,
    increments: {

      1: {
        increment: 1, // One day on the first axis
        unit: 'd',
        format: 'dd/mm/yyyy'
      },

      2: {
        increment: 1,
        unit: 'i',
        format: 'H"h"MM'
      }
    }
  },

  { // One day

    threshold: 3000,
    increments: {

      1: {
        increment: 1, // One day on the first axis
        unit: 'd',
        format: 'dd/mm/yyyy'
      },

      2: {
        increment: 2,
        unit: 'i',
        format: 'H"h"MM'
      }
    }
  },

  { // One day

    threshold: 8000,
    increments: {

      1: {
        increment: 1, // One day on the first axis
        unit: 'd',
        format: 'dd/mm/yyyy'
      },

      2: {
        increment: 10,
        unit: 'i',
        format: 'H"h"MM'
      }
    }
  },

  { // One day

    threshold: 26400,
    increments: {

      1: {
        increment: 1, // One day on the first axis
        unit: 'd',
        format: 'dd/mm/yyyy'
      },

      2: {
        increment: 20,
        unit: 'i',
        format: 'H"h"MM'
      }
    }
  },

  { // One day

    threshold: 86400,
    increments: {

      1: {
        increment: 1, // One day on the first axis
        unit: 'd',
        format: 'dd/mm/yyyy'
      },

      2: {
        increment: 1,
        unit: 'h',
        format: 'H"h"MM'
      }
    }
  },

  { // One day

    threshold: 200000,
    increments: {

      1: {

        increment: 1,
        unit: 'd',
        format: 'dd/mm/yyyy'
      },

      2: {

        increment: 2, // One day on the first axis
        unit: 'h',
        format: 'H"h"MM'
      }
    }
  },

  { // One day

    threshold: 400000,
    increments: {

      1: {

        increment: 1,
        unit: 'd',
        format: 'dd/mm/yyyy'
      },

      2: {

        increment: 6, // One day on the first axis
        unit: 'h',
        format: 'H"h"MM'
      }
    }
  },

  { // One day

    threshold: 1400000,
    increments: {

      1: {

        increment: 1,
        unit: 'd',
        format: 'dd/mm/yyyy'
      },

      2: {

        increment: 12, // One day on the first axis
        unit: 'h',
        format: 'HH"h"MM'
      }
    }
  },

  { // One day

    threshold: 6400000,
    increments: {

      1: {

        increment: 1,
        unit: 'm',
        format: 'mmmm yyyy'
      },

      2: {

        increment: 1, // One day on the first axis
        unit: 'd',
        format: 'dd'
      }
    }
  },

  { // One day

    threshold: 12400000,
    increments: {

      1: {

        increment: 1,
        unit: 'm',
        format: 'mmmm yyyy'
      },

      2: {

        increment: 2, // One day on the first axis
        unit: 'd',
        format: 'dd'
      }
    }
  },

  { // One day

    threshold: 86400000 * 0.5,
    increments: {

      1: {

        increment: 1,
        unit: 'm',
        format: 'mmmm yyyy'
      },

      2: {

        increment: 7, // One day on the first axis
        unit: 'd',
        format: 'dd'
      }
    }
  },

  { // One day

    threshold: 86400000 * 0.8,
    increments: {

      1: {

        increment: 1,
        unit: 'm',
        format: 'mmmm yyyy'
      },

      2: {

        increment: 15, // One day on the first axis
        unit: 'd',
        format: 'dd'
      }
    }
  },

  { // One month

    threshold: 86400000 * 1,
    increments: {

      1: {
        increment: 1,
        unit: 'y',
        format: 'yyyy'
      },

      2: {

        increment: 3, // One day on the first axis
        unit: 'm',
        format: 'mm/yyyy'
      }
    }
  },

  { // One month

    threshold: 86400000 * 2,
    increments: {

      1: {

        increment: 1,
        unit: 'y',
        format: 'yyyy'
      },

      2: {

        increment: 4, // One day on the first axis
        unit: 'm',
        format: 'mm/yyyy'
      }
    }
  },

  { // One month

    threshold: 86400000 * 10,
    increments: {

      1: {

        increment: 1,
        unit: 'y',
        format: 'yyyy'
      },

      2: {

        increment: 6, // One day on the first axis
        unit: 'm',
        format: 'mm/yyyy'
      }
    }
  },

  { // One month

    threshold: 86400000 * 12,
    increments: {

      1: {

        increment: 1,
        unit: 'y',
        format: 'yyyy'
      },

      2: {

        increment: 1, // One day on the first axis
        unit: 'y',
        format: 'yyyy'
      }
    }
  },

];

/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

var dateFormat = function() {
  var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[WLloSZ]|"[^"]*"|'[^']*'/g,
    timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
    timezoneClip = /[^-+\dA-Z]/g,
    pad = function( val, len ) {
      val = String( val );
      len = len || 2;
      while ( val.length < len ) val = "0" + val;
      return val;
    },
    getWeek = function( d, f ) {
      var onejan = new Date( d[ f + 'FullYear' ](), 0, 1 );
      return Math.ceil( ( ( ( d - onejan ) / 86400000 ) + onejan[ f + 'Day' ]() + 1 ) / 7 );
    };

  // Regexes and supporting functions are cached through closure
  return function( date, mask, utc ) {
    var dF = dateFormat;

    // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
    if ( arguments.length == 1 && Object.prototype.toString.call( date ) == "[object String]" && !/\d/.test( date ) ) {
      mask = date;
      date = undefined;
    }

    // Passing date through Date applies Date.parse, if necessary
    date = date ? new Date( date ) : new Date;
    if ( isNaN( date ) ) throw SyntaxError( "invalid date:" + date );

    mask = String( dF.masks[ mask ] || mask || dF.masks[ "default" ] );

    // Allow setting the utc argument via the mask
    if ( mask.slice( 0, 4 ) == "UTC:" ) {
      mask = mask.slice( 4 );
      utc = true;
    }

    var _ = utc ? "getUTC" : "get",
      d = date[ _ + "Date" ](),
      D = date[ _ + "Day" ](),
      m = date[ _ + "Month" ](),
      y = date[ _ + "FullYear" ](),
      H = date[ _ + "Hours" ](),
      M = date[ _ + "Minutes" ](),
      s = date[ _ + "Seconds" ](),
      L = date[ _ + "Milliseconds" ](),
      o = utc ? 0 : date.getTimezoneOffset(),
      flags = {
        d: d,
        dd: pad( d ),
        ddd: dF.i18n.dayNames[ D ],
        dddd: dF.i18n.dayNames[ D + 7 ],
        m: m + 1,
        mm: pad( m + 1 ),
        mmm: dF.i18n.monthNames[ m ],
        mmmm: dF.i18n.monthNames[ m + 12 ],
        yy: String( y ).slice( 2 ),
        yyyy: y,
        h: H % 12 || 12,
        hh: pad( H % 12 || 12 ),
        H: H,
        HH: pad( H ),
        M: M,
        MM: pad( M ),
        s: s,
        ss: pad( s ),
        l: pad( L, 3 ),
        L: pad( L > 99 ? Math.round( L / 10 ) : L ),
        t: H < 12 ? "a" : "p",
        tt: H < 12 ? "am" : "pm",
        T: H < 12 ? "A" : "P",
        TT: H < 12 ? "AM" : "PM",
        Z: utc ? "UTC" : ( String( date ).match( timezone ) || [ "" ] ).pop().replace( timezoneClip, "" ),
        o: ( o > 0 ? "-" : "+" ) + pad( Math.floor( Math.abs( o ) / 60 ) * 100 + Math.abs( o ) % 60, 4 ),
        S: [ "th", "st", "nd", "rd" ][ d % 10 > 3 ? 0 : ( d % 100 - d % 10 != 10 ) * d % 10 ],
        W: getWeek( date, _ ),
      };

    return mask.replace( token, function( $0 ) {
      return $0 in flags ? flags[ $0 ] : $0.slice( 1, $0.length - 1 );
    } );
  };
}();

// Some common format strings
dateFormat.masks = {
  "default": "ddd mmm dd yyyy HH:MM:ss",
  shortDate: "m/d/yy",
  mediumDate: "mmm d, yyyy",
  longDate: "mmmm d, yyyy",
  fullDate: "dddd, mmmm d, yyyy",
  shortTime: "h:MM TT",
  mediumTime: "h:MM:ss TT",
  longTime: "h:MM:ss TT Z",
  isoDate: "yyyy-mm-dd",
  isoTime: "HH:MM:ss",
  isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
  isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
  dayNames: [
    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ],
  monthNames: [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ]
};

/* END DATE FORMAT */

function getClosestIncrement( value, basis ) {
  return Math.round( value / basis ) * basis;
}

function roundDate( date, format ) {

  switch ( format.unit ) {

    case 's': // Round at n hour

      date.setSeconds( getClosestIncrement( date.getSeconds(), format.increment ) );
      date.setMilliseconds( 0 );

      break;

    case 'i': // Round at n hour

      date.setMinutes( getClosestIncrement( date.getMinutes(), format.increment ) );
      date.setSeconds( 0 );
      date.setMilliseconds( 0 );

      break;

    case 'h': // Round at n hour

      date.setHours( getClosestIncrement( date.getHours(), format.increment ) );

      date.setMinutes( 0 );
      date.setSeconds( 0 );
      date.setMilliseconds( 0 );

      break;

    case 'd':

      date.setMinutes( 0 );
      date.setSeconds( 0 );
      date.setMilliseconds( 0 );
      date.setHours( 0 );

      date.setDate( getClosestIncrement( date.getDate(), format.increment ) );

      break;

    case 'm':

      date.setMinutes( 0 );
      date.setSeconds( 0 );
      date.setMilliseconds( 0 );
      date.setHours( 0 );
      date.setDate( 1 );

      date.setMonth( getClosestIncrement( date.getMonth(), format.increment ) );

      break;

    case 'y':

      date.setMinutes( 0 );
      date.setSeconds( 0 );
      date.setMilliseconds( 0 );
      date.setHours( 0 );
      date.setDate( 1 );
      date.setMonth( 0 );

      //date.setYear( getClosest( date.getDate(), format.increment ) );

      break;

    default:
      throw "Date format not recognized";
      break;
  }

  return date;
}

function incrementDate( date, format ) {

  switch ( format.unit ) {

    case 's':

      date.setSeconds( date.getSeconds() + format.increment );
      date.setMilliseconds( 0 );

      break;

    case 'i':

      date.setMinutes( date.getMinutes() + format.increment );
      date.setSeconds( 0 );
      date.setMilliseconds( 0 );

      break;

    case 'h': // Round at n hour

      date.setHours( date.getHours() + format.increment );
      date.setMinutes( 0 );
      date.setSeconds( 0 );
      date.setMilliseconds( 0 );

      break;

    case 'd':

      date.setDate( date.getDate() + format.increment );
      date.setMinutes( 0 );
      date.setSeconds( 0 );
      date.setMilliseconds( 0 );
      date.setHours( 0 );

      break;

    case 'm':

      date.setMonth( date.getMonth() + format.increment );
      date.setMinutes( 0 );
      date.setSeconds( 0 );
      date.setMilliseconds( 0 );
      date.setHours( 0 );
      date.setDate( 1 );

      break;

    case 'y':

      date.setFullYear( date.getFullYear() + format.increment );

      date.setMinutes( 0 );
      date.setSeconds( 0 );
      date.setMilliseconds( 0 );
      date.setHours( 0 );
      date.setDate( 1 );
      date.setMonth( 0 );

      break;

    default:
      throw "Date format not recognized";
      break;
  }

  return date;
}

function getGroup( axis, level, number ) {

  if ( axis.groups[ level ][ number ] ) {
    axis.groups[  level ][  number ].group.setAttribute( 'display', 'block' );
    return axis.groups[  level ][  number ];
  }

  var g = {

    group: document.createElementNS( axis.graph.ns, 'g' ),
    text: document.createElementNS( axis.graph.ns, 'text' )
  };

  var line = document.createElementNS( axis.graph.ns, 'line' );

  line.setAttribute( 'stroke', 'black' );
  line.setAttribute( 'y1', 0 );
  switch ( level ) {

    case 2:

      line.setAttribute( 'y2', 6 );
      g.text.setAttribute( 'y', 15 );

      g.line = line;

      g.group.appendChild( g.line );
      break;

    case 1:

      line.setAttribute( 'y2', 20 );
      g.text.setAttribute( 'y', 10 );

      g.line1 = line;
      g.line2 = line.cloneNode();

      g.group.appendChild( g.line1 );
      g.group.appendChild( g.line2 );

      break;
  }

  g.text.setAttribute( 'text-anchor', 'middle' );
  g.text.setAttribute( 'dominant-baseline', 'middle' );

  g.group.appendChild( g.text );

  axis.getWrapper( level ).appendChild( g.group );

  return axis.groups[ level ][ number ] = g;
}

function hideGroups( axis, level, from ) {

  for ( ; from < axis.groups[ level ].length; from++ ) {

    hideGroup( axis.groups[  level ][ from ] )
  }
}

function hideGroup( group ) {
  group.group.setAttribute( 'display', 'none' );
}

function getDateText( date, format ) {

  return dateFormat( date, format );
}

function renderGroup( level, group, text, minPx, maxPx, x1, x2 ) {

  switch ( level ) {

    case 1:

      var x1B = Math.max( minPx, Math.min( maxPx, x1 ) ),
        x2B = Math.max( minPx, Math.min( maxPx, x2 ) );

      if ( isNaN( x2B ) ||  isNaN( x1B ) ) {
        return;
      }

      group.line1.setAttribute( 'x1', x1B );
      group.line2.setAttribute( 'x1', x2B );

      group.line1.setAttribute( 'x2', x1B );
      group.line2.setAttribute( 'x2', x2B );

      group.text.setAttribute( 'x', ( x1B + x2B ) / 2 );

      while ( text.length * 8 > x2B - x1B ) {

        text = text.substr( 0, text.length - 2 ) + ".";

        if ( text.length == 1 ) {
          text = "";
          break;
        }
      }

      group.text.textContent = text;
      break;

    case 2:

      if ( x1 < minPx ||  x1 > maxPx ) {

        hideGroup( group );
        return;
      }

      group.line.setAttribute( 'x1', x1 );
      group.line.setAttribute( 'x2', x1 );
      group.text.setAttribute( 'x', x1 );
      group.text.textContent = text;

      break;
  }

}

class GraphXAxis extends Axis {

  constructor( graph, topbottom, options ) {

    super( ...arguments );
  }

  init( graph, options ) {

    super.init( graph, options );

    this.wrapper = {
      1: document.createElementNS( graph.ns, 'g' ),
      2: document.createElementNS( graph.ns, 'g' )
    };
    this.groups = {
      1: [],
      2: []
    };

    var rect = document.createElementNS( graph.ns, 'rect' );
    rect.setAttribute( 'fill', '#c0c0c0' );
    rect.setAttribute( 'stroke', '#808080' );
    rect.setAttribute( 'height', '20' );
    rect.setAttribute( 'x', '0' );
    rect.setAttribute( 'y', '0' );

    this.rect = rect;

    this.wrapper[ 1 ].appendChild( this.rect );

    //    this.init( graph, options );

    this.group.appendChild( this.wrapper[  1 ] );
    this.group.appendChild( this.wrapper[  2 ] );

    this.wrapper[ 1 ].setAttribute( 'transform', 'translate( 0, 25 )' );
    this.wrapper[ 2 ].setAttribute( 'transform', 'translate( 0, 00 )' );
  }

  draw() { // Redrawing of the axis
    var visible;

    //this.drawInit();

    this.cacheCurrentMax();
    this.cacheCurrentMin();

    if ( this.currentAxisMin == undefined || this.currentAxisMax == undefined ) {
      this.setMinMaxToFitSeries( true ); // We reset the min max as a function of the series

    }

    this.line.setAttribute( 'x1', this.getMinPx() );
    this.line.setAttribute( 'x2', this.getMaxPx() );
    this.line.setAttribute( 'y1', 0 );
    this.line.setAttribute( 'y2', 0 );

    var widthPx = this.maxPx - this.minPx;
    var widthTime = this.getCurrentInterval();

    var timePerPx = widthTime / widthPx;

    var maxVal = this.getCurrentMax();
    var minVal = this.getCurrentMin();

    this.rect.setAttribute( 'width', widthPx );
    this.rect.setAttribute( 'x', this.minPx );

    if ( !maxVal ||  !minVal ) {
      return 0;
    }

    var currentFormat;

    for ( i = 0; i < axisFormat.length; i++ ) {

      if ( axisFormat[ i ].threshold > timePerPx ) {
        currentFormat = axisFormat[ i ];

        break;
      }

    }

    if ( !currentFormat ) {
      currentFormat = axisFormat[ axisFormat.length - 1 ];
    }

    var xVal1,
      xVal2,
      level = 0,
      dateFirst,
      currentDate,
      text,
      group,
      i;

    for ( level = 1; level <= 2; level++ ) {

      if ( !util.isNumeric( minVal ) ) {
        hideGroups( this, level, 0 );
        break;
      }

      dateFirst = new Date( minVal );

      currentDate = roundDate( dateFirst, currentFormat.increments[ level ] );

      i = 0;

      do {
        /** @ignore */
        text = getDateText( currentDate, currentFormat.increments[ level ].format );
        group = getGroup( this, level, i );

        xVal1 = this.getPx( currentDate.getTime() );
        currentDate = incrementDate( currentDate, currentFormat.increments[ level ] );
        xVal2 = this.getPx( currentDate.getTime() );

        renderGroup( level, group, text, this.getMinPx(), this.getMaxPx(), xVal1, xVal2 );

        i++;
        if ( i > 100 ) {
          break;
        }
      } while ( currentDate.getTime() < maxVal );

      hideGroups( this, level, i );
    }

  }

  isX() {
    return true
  }

  getWrapper( level ) {
    return this.wrapper[ level ]
  }

  setShift( shift, totalDimension ) {
    this.shift = shift;
    this.group.setAttribute( 'transform', 'translate(0 ' + ( this.top ? this.shift : ( this.graph.getDrawingHeight() - this.shift ) ) + ')' )
  }

  getAxisPosition() {
    return 60;
  }

  setMinMaxFlipped() {

    var interval = this.maxPx - this.minPx;
    var maxPx = interval * this.options.span[ 1 ] + this.minPx;
    var minPx = interval * this.options.span[ 0 ] + this.minPx;

    this.minPxFlipped = this.isFlipped() ? maxPx : minPx;
    this.maxPxFlipped = this.isFlipped() ? minPx : maxPx;
  }

}

export default GraphXAxis;