import Serie from './graph.serie'
import {
  extend,
  guid
}
from '../graph.util'

/**
 * @name SerieZoneDefaultOptions
 * @object
 * @static
 * @param {String} fillColor - The color to fill the zone with
 * @param {String} lineColor - The line color
 * @param {String} lineWidth - The line width (in px)
 */
const defaults = {
  fillColor: 'rgba( 0, 0, 0, 0.1 )',
  lineColor: 'rgba( 0, 0, 0, 1 )',
  lineWidth: '1px',
};
/** 
 * @static
 * @extends Serie
 * @example graph.newSerie( name, options, "scatter" );
 * @see Graph#newSerie
 */
class SerieZone extends Serie {

  constructor() {
    super( ...arguments );
  }

  init( graph, name, options ) {

    var self = this;

    this.graph = graph;
    this.name = name;

    this.selectionType = "unselected";

    this.id = Math.random() + Date.now();

    this.shown = true;
    this.options = extend( true, {}, defaults, options );
    this.data = [];

    this.groupZones = document.createElementNS( this.graph.ns, 'g' );
    this.groupMain = document.createElementNS( this.graph.ns, 'g' );

    this.lineZone = document.createElementNS( this.graph.ns, 'path' );
    this.lineZone.setAttribute( 'stroke', 'black' );
    this.lineZone.setAttribute( 'stroke-width', '1px' );

    this.additionalData = {};

    this.minX = Number.MAX_VALUE;
    this.minY = Number.MAX_VALUE;
    this.maxX = Number.MIN_VALUE;
    this.maxY = Number.MIN_VALUE;

    this.groupMain.appendChild( this.groupZones );

    this.groupZones.appendChild( this.lineZone );

    this.currentAction = false;

    this.applyLineStyle( this.lineZone );
    this.styleHasChanged();

    this.clip = document.createElementNS( this.graph.ns, 'clipPath' );
    this.clipId = guid();
    this.clip.setAttribute( 'id', this.clipId );

    this.graph.defs.appendChild( this.clip );

    this.clipRect = document.createElementNS( this.graph.ns, 'rect' );
    this.clip.appendChild( this.clipRect );
    this.clip.setAttribute( 'clipPathUnits', 'userSpaceOnUse' );

    this.groupMain.setAttribute( 'clip-path', 'url(#' + this.clipId + ')' );
  }

  /**
   * Sets the data
   */
  setData( data, arg, type ) {

    var z = 0,
      x,
      dx,
      arg = arg || "2D",
      type = type || 'float',
      arr,
      total = 0,
      continuous;

    this.data = [];
    this.dataHasChanged();

    if ( !data instanceof Array ) {
      return;
    }

    var length;

    if ( data instanceof Array && !( data[ 0 ] instanceof Array ) ) { // [100, 103, 102, 2143, ...]
      arg = "1D";
      length = data.length * 1.5;

      if ( !( data[ 1 ] instanceof Array ) ) {
        arg = "1D_flat";
        length = data.length * 1;
      }

    } else {

      if ( data instanceof Array && !( data[ 0 ][ 1 ] instanceof Array ) ) { // [100, 103, 102, 2143, ...]
        arg = "2D_flat";
        length = data.length * 3;
      } else {
        arg = "2D";
        length = data.length * 3;
      }
    }

    arr = this._addData( type, length );

    z = 0;

    for ( var j = 0, l = data.length; j < l; j++ ) {

      if ( arg == "2D" || arg == "2D_flat" ) {

        arr[ z ] = ( data[ j ][ 0 ] );
        this._checkX( arr[ z ] );
        z++;

        if ( arg == "2D" ) {

          arr[ z ] = ( data[ j ][ 1 ][ 0 ] );
          this._checkY( arr[ z ] );
          z++;
          total++;

          arr[ z ] = ( data[ j ][ 1 ][ 1 ] );
          this._checkY( arr[ z ] );
          z++;
          total++;

        } else {

          arr[ z ] = ( data[ j ][ 1 ] );
          this._checkY( arr[ z ] );
          z++;
          total++;

          arr[ z ] = ( data[ j ][ 2 ] );
          this._checkY( arr[ z ] );
          z++;
          total++;
        }

      } else if ( arg == "1D_flat" ) { // 1D Array

        if ( j % 3 == 0 ) {
          arr[ z ] = data[ j ];
          this._checkX( arr[ z ] );
          z++;
          total++;

          continue;
        }

        arr[ z ] = data[ j ];
        this._checkY( arr[ z ] );
        z++;
        total++;

      } else {

        if ( j % 2 == 0 ) {
          arr[ z ] = data[ j ];
          this._checkX( arr[ z ] );
          z++;
          total++;
          continue;
        }

        arr[ z ] = data[ j ][ 0 ];
        this_checkY( arr[ z ] );
        z++;
        total++;

        arr[ z ] = data[ j ][ 1 ];
        this_checkY( arr[ z ] );
        z++;
        total++;
      }
    }

    this.graph.updateDataMinMaxAxes();
    this.data = arr;
    this.dataHasChanged();

    return this;
  }

  _addData( type, howmany ) {

    switch ( type ) {
      case 'int':
        var size = howmany * 4; // 4 byte per number (32 bits)
        break;
      case 'float':
        var size = howmany * 8; // 4 byte per number (64 bits)
        break;
    }

    var arr = new ArrayBuffer( size );

    switch ( type ) {
      case 'int':
        return new Int32Array( arr );
        break;

      default:
      case 'float':
        return new Float64Array( arr );
        break;
    }
  }

  /**
   * Removes all the dom concerning this serie from the drawing zone
   */
  empty() {

    while ( this.group.firstChild ) {
      this.group.removeChild( this.group.firstChild );
    }
  }

  /**
   * Redraws the serie
   * @private
   *
   * @param {force} Boolean - Forces redraw even if the data hasn't changed
   */
  draw( force ) { // Serie redrawing

    if ( force || this.hasDataChanged() ) {

      var x,
        y,
        xpx,
        ypx1,
        ypx2,
        j = 0,
        k,
        m,
        currentLine,
        max,
        self = this;

      var xmin = this.getXAxis().getMinPx(),
        xmax = this.getXAxis().getMaxPx(),
        ymin = this.getYAxis().getMinPx(),
        ymax = this.getYAxis().getMaxPx();

      this.clipRect.setAttribute( "x", Math.min( xmin, xmax ) );
      this.clipRect.setAttribute( "y", Math.min( ymin, ymax ) );
      this.clipRect.setAttribute( "width", Math.abs( xmax - xmin ) );
      this.clipRect.setAttribute( "height", Math.abs( ymax - ymin ) );

      this._drawn = true;

      this.groupMain.removeChild( this.groupZones );

      var totalLength = this.data.length / 2;

      j = 0;
      k = 0;
      m = this.data.length;

      var error;

      var lineTop = "";
      var lineBottom = "";

      var buffer;

      for ( ; j < m; j += 3 ) {

        xpx = this.getX( this.data[ j ] );
        ypx1 = this.getY( this.data[ j + 1 ] );
        ypx2 = this.getY( this.data[ j + 2 ] );

        if ( xpx < 0 ) {
          buffer = [ xpx, ypx1, ypx2 ];
          continue;
        }

        if ( buffer ) {

          if ( lineBottom !== "" ) {
            lineBottom = " L " + lineBottom;
          }

          lineTop += buffer[ 0 ] + "," + Math.max( buffer[ 1 ], buffer[ 2 ] ) + " L ";
          lineBottom = xpx + "," + Math.min( buffer[ 1 ], buffer[ 2 ] ) + lineBottom;

          buffer = false;
          k++;
        }

        if ( lineBottom !== "" ) {
          lineBottom = " L " + lineBottom;
        }

        if ( ypx2 > ypx1 ) {
          lineTop += xpx + "," + ypx1 + " L ";
          lineBottom = xpx + "," + ypx2 + lineBottom;
        } else {
          lineTop += xpx + "," + ypx2 + " L ";
          lineBottom = xpx + "," + ypx1 + lineBottom;
        }

        if ( xpx > this.getXAxis().getMaxPx() ) {
          break;
        }
      }

      if ( lineTop.length > 0 && lineBottom.length > 0 ) {
        this.lineZone.setAttribute( 'd', "M " + lineTop + lineBottom + " z" );
      } else {
        this.lineZone.setAttribute( 'd', "" );
      }

      this.groupMain.appendChild( this.groupZones );
    }

    if ( this.hasStyleChanged( this.selectionType ) ) {
      this.applyLineStyle( this.lineZone );
      this.styleHasChanged( false );
    }

  }

  /**
   * Applies the computed style to the DOM element fed as a parameter
   * @private
   *
   * @param {SVGLineElement} line - The line to which the style has to be applied to
   */
  applyLineStyle( line ) {

    line.setAttribute( 'stroke', this.getLineColor() );
    line.setAttribute( 'stroke-width', this.getLineWidth() );
    line.setAttribute( 'fill', this.getFillColor() );
    line.setAttribute( 'fill-opacity', this.getFillOpacity() );
    line.setAttribute( 'stroke-opacity', this.getLineOpacity() );
  }

  /**
   * Sets the line width
   *
   * @param {Number} width - The line width
   * @returns {SerieZone} - The current serie
   */
  setLineWidth( width ) {
    this.options.lineWidth = width;
    this.styleHasChanged();
    return this;
  }

  /**
   * Gets the line width
   *
   * @returns {Number} - The line width
   */
  getLineWidth() {
    return this.options.lineWidth;
  }

  /**
   * Sets the line opacity
   *
   * @param {Number} opacity - The line opacity
   * @returns {SerieZone} - The current serie
   */
  setLineOpacity( opacity ) {
    this.options.lineOpacity = opacity;
    this.styleHasChanged();
    return this;
  }

  /**
   * Gets the line opacity
   *
   * @returns {Number} - The line opacity
   */
  getLineOpacity() {
    return this.options.lineOpacity;
  }

  /**
   * Sets the line color
   *
   * @param {String} color - The line color
   * @returns {SerieZone} - The current serie
   */
  setLineColor( color ) {
    this.options.lineColor = color;
    this.styleHasChanged();
    return this;
  }

  /**
   * Gets the line width
   *
   * @returns {Number} - The line width
   */
  getLineColor() {
    return this.options.lineColor;
  }

  /**
   * Sets the fill opacity
   *
   * @param {Number} opacity - The fill opacity
   * @returns {SerieZone} - The current serie
   */
  setFillOpacity( opacity ) {
    this.options.fillOpacity = opacity;
    this.styleHasChanged();
    return this;
  }

  /**
   * Gets the fill opacity
   *
   * @returns {Number} - The fill opacity
   */
  getFillOpacity() {
    return this.options.fillOpacity;
  }

  /**
   * Sets the fill color
   *
   * @param {Number} width - The line width
   * @returns {Number} - The line width
   */
  setFillColor( color ) {
    this.options.fillColor = color;
    this.styleHasChanged();
    return this;
  }

  /**
   * Gets the fill color
   *
   * @returns {Number} - The fill color
   */
  getFillColor() {
    return this.options.fillColor;
  }

  /**
   * Gets the maximum value of the y values between two x values. The x values must be monotoneously increasing
   * @param {Number} startX - The start of the x values
   * @param {Number} endX - The end of the x values
   * @returns {Number} Maximal y value in between startX and endX
   */
  getMax( start, end ) {

    var start2 = Math.min( start, end ),
      end2 = Math.max( start, end ),
      v1 = this.searchClosestValue( start2 ),
      v2 = this.searchClosestValue( end2 ),
      i, j, max = -Infinity,
      initJ, maxJ;

    //      console.log( start2, end2, v1, v2 );

    if ( !v1 ) {
      start2 = this.minX;
      v1 = this.searchClosestValue( start2 );
    }

    if ( !v2 ) {
      end2 = this.maxX;
      v2 = this.searchClosestValue( end2 );
    }

    if ( !v1 || !v2 ) {
      return -Infinity;
    }

    for ( i = v1.dataIndex; i <= v2.dataIndex; i++ ) {
      initJ = i == v1.dataIndex ? v1.xBeforeIndexArr : 0;
      maxJ = i == v2.dataIndex ? v2.xBeforeIndexArr : this.data[ i ].length;

      for ( j = initJ; j <= maxJ; j += 3 ) {
        max = Math.max( max, this.data[ i ][ j + 1 ], this.data[ i ][ j + 2 ] );
      }
    }

    return max;
  }

  /**
   * Gets the minimum value of the y values between two x values. The x values must be monotoneously increasing
   * @param {Number} startX - The start of the x values
   * @param {Number} endX - The end of the x values
   * @returns {Number} Maximal y value in between startX and endX
   */
  getMin( start, end ) {

    var start2 = Math.min( start, end ),
      end2 = Math.max( start, end ),
      v1 = this.searchClosestValue( start2 ),
      v2 = this.searchClosestValue( end2 ),
      i, j, min = Infinity,
      initJ, maxJ;

    if ( !v1 ) {
      start2 = this.minX;
      v1 = this.searchClosestValue( start2 );
    }

    if ( !v2 ) {
      end2 = this.maxX;
      v2 = this.searchClosestValue( end2 );
    }

    if ( !v1 || !v2 ) {
      return Infinity;
    }

    for ( i = v1.dataIndex; i <= v2.dataIndex; i++ ) {
      initJ = i == v1.dataIndex ? v1.xBeforeIndexArr : 0;
      maxJ = i == v2.dataIndex ? v2.xBeforeIndexArr : this.data[ i ].length;

      for ( j = initJ; j <= maxJ; j += 3 ) {
        min = Math.min( min, this.data[ i ][ j + 1 ], this.data[ i ][ j + 2 ] );
      }
    }

    return min;
  }

  /**
   * Performs a binary search to find the closest point index to an x value. For the binary search to work, it is important that the x values are monotoneous.
   * @param {Number} valX - The x value to search for
   * @returns {Object} Index in the data array of the closest (x,y) pair to the pixel position passed in parameters
   */
  searchClosestValue( valX ) {

    var xMinIndex;

    for ( var i = 0; i < this.data.length; i++ ) {

      if ( ( valX <= this.data[ i ][ this.data[ i ].length - 3 ] && valX >= this.data[ i ][ 0 ] ) ) {
        xMinIndex = this._searchBinary( valX, this.data[ i ], false );
      } else if ( ( valX >= this.data[ i ][ this.data[ i ].length - 3 ] && valX <= this.data[ i ][ 0 ] ) ) {
        xMinIndex = this._searchBinary( valX, this.data[ i ], true );
      } else {
        continue;
      }

      return {
        dataIndex: i,
        xMin: this.data[ i ][ xMinIndex ],
        xMax: this.data[ i ][ xMinIndex + 3 ],
        yMin: this.data[ i ][ xMinIndex + 1 ],
        yMax: this.data[ i ][ xMinIndex + 4 ],
        xBeforeIndex: xMinIndex / 3,
        xAfterIndex: xMinIndex / 3 + 1,
        xBeforeIndexArr: xMinIndex,
        xClosest: ( Math.abs( this.data[ i ][ xMinIndex + 3 ] - valX ) < Math.abs( this.data[ i ][ xMinIndex ] - valX ) ? xMinIndex + 3 : xMinIndex ) / 2
      }
    }
  }

  _searchBinary( target, haystack, reverse ) {
    var seedA = 0,
      length = haystack.length,
      seedB = ( length - 3 );

    if ( haystack[ seedA ] == target )
      return seedA;

    if ( haystack[ seedB ] == target )
      return seedB;

    var seedInt;
    var i = 0;

    while ( true ) {
      i++;
      if ( i > 100 ) {
        throw "Error loop";
      }

      seedInt = ( seedA + seedB ) / 3;
      seedInt -= seedInt % 3; // Always looks for an x.

      if ( seedInt == seedA || haystack[ seedInt ] == target )
        return seedInt;

      //    console.log(seedA, seedB, seedInt, haystack[seedInt]);
      if ( haystack[ seedInt ] <= target ) {
        if ( reverse )
          seedB = seedInt;
        else
          seedA = seedInt;
      } else if ( haystack[ seedInt ] > target ) {
        if ( reverse )
          seedA = seedInt;
        else
          seedB = seedInt;
      }
    }
  }

}

export default SerieZone