import SerieLine from './graph.serie.line'
import * as util from '../graph.util'

/** 
 * Constructor for the contour serie. Do not use this constructor directly, but use the {@link Graph#newSerie} method
 * @private
 * @extends Serie
 * @example graph.newSerie( name, options, "contour" );
 * @see Graph#newSerie
 */
class SerieContour extends SerieLine {

  constructor() {
    super( ...arguments );

    this.negativeDelta = 0;
    this.positiveDelta = 0;

    this.negativeThreshold = 0;
    this.positiveThreshold = 0;
  }

  /**
   * Sets the contour lines
   * @memberof SerieContour.prototype
   * @param {Object} data - The object data
   * @param {Number} data.minX - The minimum x value
   * @param {Number} data.maxX - The maximum x value
   * @param {Number} data.minY - The minimum y value
   * @param {Number} data.maxY - The maximum y value
   * @param {Object[]} data.segments - The segments making up the contour lines
   * @param {Number[]} data.segments.lines - An array of alternating (x1,y1,x2,y2) quadruplet
   * @param {Number} data.segments.zValue - The corresponding z-value of this array
   * @return {Serie} The current serie
   */
  setData( data, arg, type ) {

    var z = 0;
    var x, dx, arg = arg || "2D",
      type = type || 'float',
      i, l = data.length,
      j, k,
      arr, datas = [];

    if ( !( data instanceof Array ) ) {

      if ( typeof data == 'object' ) {
        // Def v2
        this.minX = data.minX;
        this.minY = data.minY;
        this.maxX = data.maxX;
        this.maxY = data.maxY;

        data = data.segments;
        l = data.length;
      }
    }

    for ( i = 0; i < l; i++ ) {
      k = data[ i ].lines.length;
      arr = this._addData( type, k );

      for ( j = 0; j < k; j += 2 ) {

        arr[ j ] = data[ i ].lines[ j ];
        this._checkX( arr[ j ] );
        arr[ j + 1 ] = data[ i ].lines[ j + 1 ];
        this._checkY( arr[ j + 1 ] );
      }

      datas.push( {
        lines: arr,
        zValue: data[ i ].zValue
      } );
    }
    this.data = datas;
    this.graph.updateDataMinMaxAxes();

    this.dataHasChanged( true );

    return this;
  }

  /**
   * Draws the serie if the data has changed
   * @memberof SerieContour.prototype
   * @param {Boolean} force - Forces redraw even if the data hasn't changed
   * @return {Serie} The current serie
   */
  draw( force ) {

    if ( force || this.hasDataChanged() ) {

      this.currentLine = 0;
      var x, y, xpx, ypx, xpx2, ypx2, i = 0,
        l = this.data.length,
        j = 0,
        k, m, currentLine, domLine, arr;
      this.minZ = Infinity;
      this.maxZ = -Infinity;

      var next = this.groupLines.nextSibling;
      this.groupMain.removeChild( this.groupLines );
      this.zValues = {};

      var incrXFlip = 0;
      var incrYFlip = 1;
      if ( this.getFlip() ) {
        incrXFlip = 0;
        incrYFlip = 1;
      }

      var minY = this.getYAxis().getCurrentMin();
      var minX = this.getXAxis().getCurrentMin();

      var maxX = this.getXAxis().getCurrentMax();
      var maxY = this.getYAxis().getCurrentMax();

      this.counter = 0;
      this.currentLineId = 0;

      for ( ; i < l; i++ ) {
        this.currentLine = "";
        j = 0;
        k = 0;

        for ( arr = this.data[ i ].lines, m = arr.length; j < m; j += 4 ) {

          var lastxpx, lastypx;

          if ( ( arr[ j + incrXFlip ] < minX && arr[ j + 2 + incrXFlip ] < minX ) ||  ( arr[ j + incrYFlip ] < minY && arr[ j + 2 + incrYFlip ] < minY ) ||  ( arr[ j + incrYFlip ] > maxY && arr[ j + 2 + incrYFlip ] > maxY || ( arr[ j + incrXFlip ] > maxX && arr[ j + 2 + incrXFlip ] > maxX ) ) ) {
            continue;
          }

          xpx2 = this.getX( arr[ j + incrXFlip ] );
          ypx2 = this.getY( arr[ j + incrYFlip ] );

          xpx = this.getX( arr[ j + 2 + incrXFlip ] );
          ypx = this.getY( arr[ j + 2 + incrYFlip ] );

          if ( xpx == xpx2 && ypx == ypx2 ) {
            continue;
          }

          /*	if( j > 0 && ( lastxpx !== undefined && lastypx !== undefined && Math.abs( xpx2 - lastxpx ) <= 30 && Math.abs( ypx2 - lastypx ) <= 30 ) ) {
  						currentLine += "L";
  					} else {
  						currentLine += "M";	
  					}
  */

          this.currentLine += "M ";
          this.currentLine += xpx2;
          this.currentLine += " ";
          this.currentLine += ypx2;

          this.currentLine += "L ";
          this.currentLine += xpx;
          this.currentLine += " ";
          this.currentLine += ypx;

          this.counter++;

          lastxpx = xpx;
          lastypx = ypx;

          k++;
        }

        this.currentLine += " z";

        domLine = this._createLine();
        domLine.setAttribute( 'data-zvalue', this.data[ i ].zValue );

        this.zValues[ this.data[ i ].zValue ] = {
          dom: domLine
        };

        this.minZ = Math.min( this.minZ, this.data[ i ].zValue );
        this.maxZ = Math.max( this.maxZ, this.data[ i ].zValue );
      }

      i++;

      for ( i = this.currentLine + 1; i < this.lines.length; i++ ) {
        this.groupLines.removeChild( this.lines[ i ] );
        this.lines.splice( i, 1 );
      }

      i = 0;

      for ( ; i < l; i++ ) {
        this.setColorTo( this.lines[ i ], this.data[ i ].zValue, this.minZ, this.maxZ );
      }

      this.onMouseWheel( 0, {
        shiftKey: false
      } );
      this.groupMain.insertBefore( this.groupLines, next );

    } else if ( this.hasStyleChanged( this.selectionType ) ) {

      for ( ; i < l; i++ ) {
        this.setColorTo( this.lines[ i ], this.data[ i ].zValue, this.minZ, this.maxZ );
      }

    }

  }

  onMouseWheel( delta, e, fixed, positive ) {

    delta /= 250;

    if ( fixed !== undefined ) {

      if ( !positive ) {
        this.negativeThreshold = -fixed * this.minZ;
        this.negativeDelta = -Math.pow( Math.abs( ( this.negativeThreshold / ( -this.minZ ) ) ), 1 / 3 );
      }

      if ( positive ) {
        this.positiveThreshold = fixed * this.maxZ;
        this.positiveDelta = Math.pow( this.positiveThreshold / ( this.maxZ ), 1 / 3 );
      }

    } else {

      if ( ( !e.shiftKey ) ||  !this.options.hasNegative ) {

        this.positiveDelta = Math.min( 1, Math.max( 0, this.positiveDelta + Math.min( 0.1, Math.max( -0.1, delta ) ) ) );
        this.positiveThreshold = this.maxZ * ( Math.pow( this.positiveDelta, 3 ) );

      } else {

        this.negativeDelta = Math.min( 0, Math.max( -1, this.negativeDelta + Math.min( 0.1, Math.max( -0.1, delta ) ) ) );
        this.negativeThreshold = -this.minZ * ( Math.pow( this.negativeDelta, 3 ) );

      }

    }

    if ( isNaN( this.positiveDelta ) ) {
      this.positiveDelta = 0;
    }

    if ( isNaN( this.negativeDelta ) ) {
      this.negativeDelta = 0;
    }

    for ( var i in this.zValues ) {

      this.zValues[ i ].dom.setAttribute( 'display', ( ( i >= 0 && i >= this.positiveThreshold ) ||  ( i <= 0 && i <= this.negativeThreshold ) ) ? 'block' : 'none' );

    }

    if ( this._shapeZoom ) {

      if ( !this.options.hasNegative ) {
        this._shapeZoom.hideHandleNeg();
      } else {

        this._shapeZoom.setHandleNeg( -( Math.pow( this.negativeDelta, 3 ) ), this.minZ );
        this._shapeZoom.showHandleNeg();
      }

      this._shapeZoom.setHandlePos( ( Math.pow( this.positiveDelta, 3 ) ), this.maxZ );
    }
  }

  /**
   * Sets rainbow colors based on hsl format
   * @memberof SerieContour.prototype
   * @param {Object} colors
   * @param {Object} colors.fromPositive
   * @param {Number} colors.fromPositive.h
   * @param {Number} colors.fromPositive.s
   * @param {Number} colors.fromPositive.l
   
   * @param {Object} colors.toPositive
   * @param {Number} colors.toPositive.h
   * @param {Number} colors.toPositive.s
   * @param {Number} colors.toPositive.l
   

   * @param {Object} colors.fromNegative
   * @param {Number} colors.fromNegative.h
   * @param {Number} colors.fromNegative.s
   * @param {Number} colors.fromNegative.l
   

   * @param {Object} colors.toNegative
   * @param {Number} colors.toNegative.h
   * @param {Number} colors.toNegative.s
   * @param {Number} colors.toNegative.l
   * @return {Serie} The current serie
   */
  setDynamicColor( colors ) {
    this.lineColors = colors;

    this.styleHasChanged();
  }

  setNegative( bln ) {
    this.options.hasNegative = bln;

    if ( bln ) {
      this.negativeThreshold = 0;
    }
  }

  setColorTo( line, zValue, min, max ) {

    if ( !this.lineColors ) {
      return;
    }

    var hsl = {
      h: 0,
      s: 0,
      l: 0
    };

    for ( var i in hsl ) {

      if ( zValue > 0 ) {
        hsl[ i ] = this.lineColors.fromPositive[ i ] + ( ( this.lineColors.toPositive[ i ] - this.lineColors.fromPositive[ i ] ) * ( zValue / max ) );
      } else {
        hsl[ i ] = this.lineColors.fromNegative[ i ] + ( ( this.lineColors.toNegative[ i ] - this.lineColors.fromNegative[ i ] ) * ( zValue / min ) );
      }
    }

    hsl.h /= 360;

    var rgb = util.hslToRgb( hsl.h, hsl.s, hsl.l );

    line.setAttribute( 'stroke', 'rgb(' + rgb.join() + ')' );
  }

  getSymbolForLegend() {

    if ( !this.lineForLegend ) {

      var line = document.createElementNS( this.graph.ns, 'ellipse' );

      line.setAttribute( 'cx', 7 );
      line.setAttribute( 'cy', 0 );
      line.setAttribute( 'rx', 8 );
      line.setAttribute( 'ry', 3 );

      line.setAttribute( 'cursor', 'pointer' );
      this.lineForLegend = line;

    }

    this.applyLineStyle( this.lineForLegend, this.maxZ );

    return this.lineForLegend;
  }

  applyLineStyle( line, overwriteValue ) {
    line.setAttribute( 'stroke', this.getLineColor() );
    line.setAttribute( 'stroke-width', this.getLineWidth() + ( this.isSelected() ? 2 : 0 ) );
    if ( this.getLineDashArray() ) {
      line.setAttribute( 'stroke-dasharray', this.getLineDashArray() );
    }
    line.setAttribute( 'fill', 'none' );

    this.setColorTo( line, ( ( overwriteValue !== undefined ) ? overwriteValue : line.getAttribute( 'data-zvalue' ) ), this.minZ, this.maxZ );
    //  line.setAttribute('shape-rendering', 'optimizeSpeed');

    this.hasStyleChanged( false );
  }

  setShapeZoom( shape ) {
    this._shapeZoom = shape;
  }

}

export default SerieContour;