import Serie from './graph.serie'
import * as util from '../graph.util'

/**
 * @name SerieDensityMapDefaultOptions
 * @object
 * @static
 * @memberof SerieDensityMap
 */
const defaults = {

}

/** 
 * Density map serie
 * @example graph.newSerie( name, options, "densitymap" );
 * @see Graph#newSerie
 * @augments Serie
 */
class SerieDensityMap extends Serie {

  /**
   * Initializes the serie
   * @private
   * @memberof SerieDensityMap
   */
  init( graph, name, options ) {

    this.options = util.extend( true, {}, defaults, ( options || {} ) ); // Creates options
    util.mapEventEmission( this.options, this ); // Register events

    this.graph = graph;
    this.groupMain = document.createElementNS( this.graph.ns, 'g' );

    this.rects = [];
    this.paths = [];

    this.recalculateBinsOnDraw = false;
  }

  /**
   * Sets the data of the serie. Careful, only one format allowed for now.
   * @memberof SerieDensityMap
   * @param {Array} data - A vector containing 2-elements arrays
   * @return {SerieDensityMap} The current instance
   * @example serie.setData( [ [ x1, y1 ], [ x2, y2 ], ..., [ xn, yn ] ] );
   */
  setData( data ) {

    this.minX = this.maxX = this.minY = this.maxY = 0;
    var i = 0,
      l = data.length;
    this.data = data;

    this.minX = Number.POSITIVE_INFINITY;
    this.minY = Number.POSITIVE_INFINITY;
    this.maxX = Number.NEGATIVE_INFINITY;
    this.maxY = Number.NEGATIVE_INFINITY;

    for ( i = 0; i < l; i++ ) {
      this._checkX( data[ i ][ 0 ] );
      this._checkY( data[ i ][ 1 ] );
    }

    this.dataHasChanged();
    this.graph.updateDataMinMaxAxes();

    return this;

  }

  /**
   * Calculates the bins from the (x,y) dataset
   * @memberof SerieDensityMap
   * @param {Number} fromX - The first x element to consider
   * @param {Number} deltaX - The x spacing between two bins
   * @param {Number} numX - The number of x bins
   * @param {Number} fromY - The first y element to consider
   * @param {Number} deltaY - The y spacing between two bins
   * @param {Number} numY - The number of y bins
   * @return {Array} The generated density map
   * @see SerieDensityMap#autoBins
   * @see SerieDensityMap#autoColorMapBinBoundaries
   * @see SerieDensityMap#setPxPerBin
   */
  calculateDensity( fromX, deltaX, numX, fromY, deltaY, numY ) {

    var densitymap = [],
      i,
      l = this.data.length,
      indexX, indexY;

    var binMin = Number.POSITIVE_INFINITY;
    var binMax = Number.NEGATIVE_INFINITY;

    for ( i = 0; i < l; i++ ) {
      indexX = ~~( ( this.data[ i ][ 0 ] - fromX ) / deltaX );
      indexY = ~~( ( this.data[ i ][ 1 ] - fromY ) / deltaY );

      if ( indexX > numX || indexY > numY ||  indexX < 0 ||  indexY < 0 ) {
        continue;
      }

      densitymap[ indexX ] = densitymap[ indexX ] || [];
      densitymap[ indexX ][ indexY ] = densitymap[ indexX ][ indexY ] + 1 ||  1;

      binMin = densitymap[ indexX ][ indexY ] < binMin ? densitymap[ indexX ][ indexY ] : binMin;
      binMax = densitymap[ indexX ][ indexY ] > binMax ? densitymap[ indexX ][ indexY ] : binMax;
      //binMax = Math.max( binMax, densitymap[ indexX ][ indexY ] );
    }

    this.maxIndexX = numX;
    this.maxIndexY = numY;

    this.binMin = binMin;
    this.binMax = binMax;

    this.deltaX = deltaX;
    this.deltaY = deltaY;

    this.fromX = fromX;
    this.fromY = fromY;

    this.numX = numX;
    this.numY = numY;

    this.densitymap = densitymap;
    return densitymap;
  }

  /**
   * Calculates the bins from the (x,y) dataset using bin weighing
   * Will assign a set of (x,y) to the 4 neighbouring bins according to its exact position
   * @memberof SerieDensityMap
   * @param {Number} fromX - The first x element to consider
   * @param {Number} deltaX - The x spacing between two bins
   * @param {Number} numX - The number of x bins
   * @param {Number} fromY - The first y element to consider
   * @param {Number} deltaY - The y spacing between two bins
   * @param {Number} numY - The number of y bins
   * @return {Array} The generated density map
   * @see SerieDensityMap#autoBins
   * @see SerieDensityMap#autoColorMapBinBoundaries
   * @see SerieDensityMap#setPxPerBin
   */
  calculateDensityWeighted( fromX, deltaX, numX, fromY, deltaY, numY ) {

    var densitymap = [],
      i,
      l = this.data.length,
      indexX, indexY;

    var binMin = Number.POSITIVE_INFINITY;
    var binMax = Number.NEGATIVE_INFINITY;

    var compX, compY;
    var exactX, exactY;
    var indexXLow, indexXHigh, indexYLow, indexYHigh;

    for ( i = 0; i < l; i++ ) {
      exactX = ( ( this.data[ i ][ 0 ] - fromX ) / deltaX ) - 0.5;
      exactY = ( ( this.data[ i ][ 1 ] - fromY ) / deltaY ) - 0.5;

      indexX = Math.floor( exactX );
      indexY = Math.floor( exactY );

      indexXLow = indexX; //Math.floor( exactX );
      indexYLow = indexY; //Math.floor( exactY );

      indexXHigh = indexX + 1; //Math.ceil( exactX );
      indexYHigh = indexY + 1; //Math.ceil( exactY );

      compX = ( 1 - ( exactX - indexX ) );
      compY = ( 1 - ( exactY - indexY ) );

      //console.log( exactY, indexY );
      //console.log( compY, indexYLow, indexYHigh );
      if ( indexX > numX || indexY > numY ||  indexX < 0 ||  indexY < 0 ) {
        continue;
      }

      densitymap[ indexXLow ] = densitymap[ indexXLow ] || [];
      densitymap[ indexXHigh ] = densitymap[ indexXHigh ] || [];

      densitymap[ indexXLow ][ indexYLow ] = densitymap[ indexXLow ][ indexYLow ] ||  0;
      densitymap[ indexXHigh ][ indexYLow ] = densitymap[ indexXHigh ][ indexYLow ] ||  0;
      densitymap[ indexXLow ][ indexYHigh ] = densitymap[ indexXLow ][ indexYHigh ] ||  0;
      densitymap[ indexXHigh ][ indexYHigh ] = densitymap[ indexXHigh ][ indexYHigh ] ||  0;

      densitymap[ indexXLow ][ indexYLow ] += compX * compY;
      densitymap[ indexXHigh ][ indexYLow ] += ( 1 - compX ) * compY;
      densitymap[ indexXLow ][ indexYHigh ] += compX * ( 1 - compY );
      densitymap[ indexXHigh ][ indexYHigh ] += ( 1 - compX ) * ( 1 - compY );

      // A loop would be nicer, but would it be faster ?
      binMin = densitymap[ indexXLow ][ indexYLow ] < binMin ? densitymap[ indexXLow ][ indexYLow ] : binMin;
      binMax = densitymap[ indexXLow ][ indexYLow ] > binMax ? densitymap[ indexXLow ][ indexYLow ] : binMax;
      binMin = densitymap[ indexXHigh ][ indexYLow ] < binMin ? densitymap[ indexXHigh ][ indexYLow ] : binMin;
      binMax = densitymap[ indexXHigh ][ indexYLow ] > binMax ? densitymap[ indexXHigh ][ indexYLow ] : binMax;
      binMin = densitymap[ indexXLow ][ indexYHigh ] < binMin ? densitymap[ indexXLow ][ indexYHigh ] : binMin;
      binMax = densitymap[ indexXLow ][ indexYHigh ] > binMax ? densitymap[ indexXLow ][ indexYHigh ] : binMax;
      binMin = densitymap[ indexXHigh ][ indexYHigh ] < binMin ? densitymap[ indexXHigh ][ indexYHigh ] : binMin;
      binMax = densitymap[ indexXHigh ][ indexYHigh ] > binMax ? densitymap[ indexXHigh ][ indexYHigh ] : binMax;

      //binMax = Math.max( binMax, densitymap[ indexX ][ indexY ] );
    }

    this.maxIndexX = numX;
    this.maxIndexY = numY;

    this.binMin = binMin;
    this.binMax = binMax;

    this.deltaX = deltaX;
    this.deltaY = deltaY;

    this.fromX = fromX;
    this.fromY = fromY;

    this.numX = numX;
    this.numY = numY;

    this.densitymap = densitymap;
    return densitymap;
  }

  /**
   * Calculates the density map based on the minimum and maximum values found in the data array
   * @memberof SerieDensityMap
   * @param {Number} [ numX = 400 ] - The number of x bins
   * @param {Number} [ numY = numX ] - The number of y bins
   * @return {SerieDensityMap} The current instance
   * @see SerieDensityMap#calculateDensity
   */
  autoBins( numX, numY ) {

    this.numX = numX || 400;
    this.numY = numY ||  this.numX;

    this.calculateDensity(
      this.minX, ( this.maxX - this.minX ) / numX, numX,
      this.minY, ( this.maxY - this.minY ) / numY, numY
    );

    this.recalculateBinsOnDraw = false;

    return this;
  }

  /**
   * Only calculates the density map upon redraw based on the current state of the graph. In this mode, a fixed number of pixels per bin is used to calculate the number of bins and fed into 
   * the calculation of the density map. In this method, the color map spans on the full scale of the density map values (i.e. a subrange cannot be defined, like you would do using {@link SerieDensityMap#setColorMapBinBoundaries}).
   * @memberof SerieDensityMap
   * @param {Number} pxPerBinX - The number of x bins per pixels. Should be an integer, but technically it doesn't have to
   * @param {Number} pxPerBinY - The number of y bins per pixels. Should be an integer, but technically it doesn't have to
   * @param {Boolean} weightedDensityMap - Whether jsGraph should use weighted density mapping or not
   * @return {SerieDensityMap} The current instance
   * @see SerieDensityMap#calculateDensity
   */
  setPxPerBin( pxPerBinX, pxPerBinY, weightedDensityMap ) {

    if ( pxPerBinX ) {
      this.calculationDensityMap( {
        from: 'min',
        to: 'max',
        pxPerBin: pxPerBinX,
        weighted: weightedDensityMap
      } );
    }

    if ( pxPerBinY ) {
      this.calculationDensityMap( false, {
        from: 'min',
        to: 'max',
        pxPerBin: pxPerBinY,
        weighted: weightedDensityMap
      } );
    }

    return this;
  }

  /**
   * Sets bins in the ```x``` or ```y``` direction based on a from value, a to value and a number of bins.
   * @memberof SerieDensityMap
   * @param {String} mode - ```x``` or ```y```
   * @param {Number} from - The from value of the bin for the calculation with ```calculateDensityMap```
   * @param {Number} to - The to value
   * @param {Number} num - The number of bins
   * @return {SerieDensityMap} The current instance
   * @see SerieDensityMap#calculateDensity
   */
  setBinsFromTo( mode, from, to, num ) {

    this.densityMapCalculation = this.densityMapCalculation || {};

    this.densityMapCalculation[ mode ] = {
      from: from,
      to: to,
      numBins: num
    };
    this.calculationDensityMap();
    return this;
  }

  calculationDensityMap( x, y ) {

    this.method = this.calculateDensityAdvanced;
    this.densityMapCalculation = this.densityMapCalculation ||  {};

    if ( x ) {
      this.densityMapCalculation.x = x;
    }

    if ( y ) {
      this.densityMapCalculation.y = y;
    }
  }

  calculateDensityAdvanced() {

    var results = {
      x: {
        from: 0,
        num: 0,
        delta: 0,
        weighing: false
      },

      y: {
        from: 0,
        num: 0,
        delta: 0,
        weighing: false
      }
    };

    var widthValues = {
      x: this.graph.drawingSpaceWidth,
      y: this.graph.drawingSpaceHeight
    };
    var axisGetter = {
      x: this.getXAxis,
      y: this.getYAxis
    };

    var weighing = false;

    for ( var i in this.densityMapCalculation ) {

      if ( this.densityMapCalculation[ i ].weighted ) {
        weighing = true;
        results[ i ].weighing = true;
      }

      if ( this.densityMapCalculation[ i ].pxPerBin ) {

        // In value

        var from = ( this.densityMapCalculation[ i ].from == 'min' ) ? axisGetter[ i ].call( this ).getCurrentMin() : this.densityMapCalculation[ i ].from;
        var to = this.densityMapCalculation[ i ].to == 'max' ? axisGetter[ i ].call( this ).getCurrentMax() : this.densityMapCalculation[ i ].to;

        // In px
        var dimension = Math.abs( axisGetter[ i ].call( this ).getRelPx( to - from ) );
        results[  i ].num = Math.ceil( widthValues[ i ] / this.densityMapCalculation[ i ].pxPerBin );

        //console.log( from, from - axisGetter[ i ].call( this ).getRelVal( ( results[ i ].num * this.densityMapCalculation[ i ].pxPerBin - dimension ) / 2 ), ( results[ i ].num * this.densityMapCalculation[ i ].pxPerBin - dimension ) / 2 );
        results[  i ].from = from - Math.abs( axisGetter[ i ].call( this ).getRelVal( ( ( results[  i ].num ) * this.densityMapCalculation[ i ].pxPerBin - dimension ) / 2 ) );
        results[ i ].delta = Math.abs( axisGetter[ i ].call( this ).getRelVal( this.densityMapCalculation[ i ].pxPerBin ) );

      } else {

        results[ i ].num = this.densityMapCalculation[ i ].numBins || 400;
        results[  i ].from = ( this.densityMapCalculation[ i ].from == 'min' ) ? axisGetter[ i ].call( this ).getCurrentMin() : this.densityMapCalculation[ i ].from;
        results[  i ].delta = ( this.densityMapCalculation[ i ].to ) ? ( ( this.densityMapCalculation[ i ].to == 'max' ? axisGetter[ i ].call( this ).getCurrentMax() : this.densityMapCalculation[ i ].to ) - results[  i ].from ) / ( results[  i ].num ) : this.densityMapCalculate[ i ].delta;

      }

      //      console.log( axisGetter[ i ].call( this ).getCurrentMin(), axisGetter[ i ].call( this ).getCurrentMax(), )
    }
    //console.log( this.getYAxis().getCurrentMin(), this.getYAxis().getCurrentMax(), this.graph.drawingSpaceHeight );

    //console.log( this.densityMapCalculation );

    ( weighing ? this.calculateDensityWeighted : this.calculateDensity ).call( this,
      results.x.from, results.x.delta, results.x.num,
      results.y.from, results.y.delta, results.y.num
    );
  };

  /**
   * Selects a subrange of bins for the color mapping. There is no need to recalculate the color map after calling this method
   * @memberof SerieDensityMap
   * @param {Number} binMin - The minimum bin value
   * @param {Number} binMax - The maximum bin value
   * @return {SerieDensityMap} The current instance
   * @example // In this case, all bins with values below binMin * 2 (the middle scale) will be rendered with the first color of the color map
   * serie.setColorMapBinBoundaries( serie.binMin * 2, serie.binMax ); 
   */
  setColorMapBinBoundaries( min, max ) {
    this.colorMapMin = min;
    this.colorMapMax = max;
    return this;
  }

  /**
   * Calls {@link SerieDensityMap#setColorMapBinBoundaries} using the minimum and maximum bin values calculated by {@link SerieDensityMap#calculateDensity}. This function must be called, since colorMinMap and colorMaxMap are not set automatically when the density map is calculated.
   * @memberof SerieDensityMap
   * @param {Number} binMin - The minimum bin value
   * @param {Number} binMax - The maximum bin value
   * @return {SerieDensityMap} The current instance
   */
  autoColorMapBinBoundaries() {
    this.colorMapMin = this.binMin;
    this.colorMapMax = this.binMax;
    return this;
  }

  /**
   * Allows the use of a callback to determine the color map min and max value just before the density map is redrawn. This is very useful when the density map is recalculate before redraw, such as in the case where bins per pixels are used
   * @memberof SerieDensityMap
   * @param {(String|Function)} callback - The callback function to call. Should return an array with two elements ```[ colorMapMin, colorMapMax ]```. This parameter can also take the value ```auto```, in which case ```autoColorMapBinBoundaries``` will be called before redraw
   * @return {SerieDensityMap} The current instance
   */
  onRedrawColorMapBinBoundaries( callback ) {
    this.callbackColorMapMinMax = callback;
    return this;
  };

  /**
   * Generates a color map based on a serie of HSL(A) values. 
   * @summary Colors can scale linearly, logarithmically (enhances short range differences) or exponentially (enhances long range differences).
   * One word of advice though. SVG being not canvas, jsGraph has to create a path for each color value of the color map. In other words, if you're asking for 16-bit coloring (65536 values), 65536 SVG paths will be created and your browser will start to suffer from it.
   * As of now, all the colors in colorStops will be places at equal distances from each other between <code>colorMapMin</code> and <code>colorMapMax</code> set by {@link autoColorMapBinBoundaries} or {@link setColorMapBinBoundaries}
   * @memberof SerieDensityMap
   * @param {Array<Object>} colorStops - An array of objects, each having the following format: <code>{ h: [ 0-360], s: 0-1, l: 0-1, a: 0-1}</code>
   * @param {Number} numColors - The number of colors to compute.
   * @param {String} [ method = "linear" ] - The method to use to calculate the density map: <code>linear</code>, <code>exp</code>, or <code>log</code>
   * @return {SerieDensityMap} The current instance
   */
  colorMapHSL( colorStops, numColors, method ) {

    method = method || "linear";

    var methods = {
      "exp": function( value ) {
        return ( Math.exp( value / numColors * 1 ) - Math.exp( 0 ) ) / ( Math.exp( 1 ) - Math.exp( 0 ) );
      },
      "log": function( value ) {
        return ( Math.log( value + 1 ) - Math.log( 1 ) ) / ( Math.log( numColors + 1 ) - Math.log( 1 ) );
      },
      "linear": function( value ) {
        return ( value - 0 ) / ( numColors - 0 );
      }
    }

    var k = 0,
      colorMap = [],
      opacities = [];

    var color = {
      h: null,
      s: null,
      l: null,
      a: null
    };

    var ratio, first;

    var slices = colorStops.length - 1;

    for ( var i = 0; i <= numColors; i++ ) {

      ratio = methods[ method ]( i );

      first = Math.floor( ratio * slices );

      if ( first == colorStops.length - 1 ) { // Handle 1
        first = slices - 1;
      }

      ratio = ( ratio - first / ( slices ) ) / ( 1 / ( slices ) );

      for ( var j in color ) {
        color[ j ] = ( colorStops[ first + 1 ][ j ] - colorStops[ first ][ j ] ) * ratio + colorStops[ first ][ j ];
      }

      colorMap[ k ] = "hsl(" + color.h + ", " + Math.round( color.s * 100 ) + "%, " + Math.round( color.l * 100 ) + "%)"; //this.HSVtoRGB( color.h, color.s, color.v );
      opacities[ k ] = color.a;
      k++;
    }

    this.opacities = opacities;
    this.colorMap = colorMap;
    this.colorMapNum = numColors;
    return this;
  }

  /**
   * Calls {@link SerieDensityMap#colorMapHSV} using 100 colors.
   * @memberof SerieDensityMap
   * @param {Array<Object>} colorStops - An array of objects, each having the following format: <code>{ h: [ 0-360], s: 0-1, l: 0-1, a: 0-1}</code>
   * @param {String} [ method = "linear" ] - The method to use to calculate the density map: <code>linear</code>, <code>exp</code> or <code>log</code>
   * @return {SerieDensityMap} The current instance
   */
  autoColorMapHSL( colorStops, method ) {
    this.colorMapHSV( colorStops, 100, method || "linear" );
    return this;
  }

  /*  byteToHex( b ) {
        return hexChar[ ( b >> 4 ) & 0x0f ] + hexChar[ b & 0x0f ];
      }
      */
  /*
    HSVtoRGB( h, s, v ) {
      var r, g, b, i, f, p, q, t;
      if ( arguments.length === 1 ) {
        s = h.s, v = h.v, h = h.h;
      }
      i = Math.floor( h * 6 );
      f = h * 6 - i;
      p = v * ( 1 - s );
      q = v * ( 1 - f * s );
      t = v * ( 1 - ( 1 - f ) * s );
      switch ( i % 6 ) {
        case 0:
          r = v, g = t, b = p;
          break;
        case 1:
          r = q, g = v, b = p;
          break;
        case 2:
          r = p, g = v, b = t;
          break;
        case 3:
          r = p, g = q, b = v;
          break;
        case 4:
          r = t, g = p, b = v;
          break;
        case 5:
          r = v, g = p, b = q;
          break;
      }
      return "#" + this.byteToHex( Math.floor( r * 255 ) ) + this.byteToHex( Math.floor( g * 255 ) ) + this.byteToHex( Math.floor( b * 255 ) );
    }
  */

  /**
   * Returns the color index (```[ 0 - 1 ]```) for a certain value, based on colorMapMin and colorMapMax.
   * @memberof SerieDensityMap
   * @param {Number} binValue - The value of the bin
   * @return {Number} The color index
   */
  getColorIndex( binValue ) {

    return Math.max( 0, Math.min( this.colorMapNum, Math.floor( ( binValue - this.colorMapMin ) / ( this.colorMapMax - this.colorMapMin ) * this.colorMapNum ) ) );
  }

  /**
   * Draws the serie
   * @memberof SerieDensityMap
   * @private
   */
  draw() {

    var colorIndex;

    if ( this.method ) {
      this.method();
    }

    if ( !this.callbackColorMapMinMax || this.colorMapMin == undefined || this.colorMapMax == undefined || this.callbackColorMapMinMax == 'auto' ) {
      this.autoColorMapBinBoundaries();
    } else {
      var val = this.callbackColorMapMinMax( this.binMin, this.binMax );

      this.setColorMapBinBoundaries( val[ 0 ], val[ 1 ] );
    }

    var deltaXPx = this.getXAxis().getRelPx( this.deltaX ),
      deltaYPx = this.getYAxis().getRelPx( this.deltaY );

    for ( var i = 0; i < this.paths.length; i++ ) {
      this.paths[ i ] = "";
    }

    for ( var i = 0; i < this.maxIndexX; i++ ) {

      for ( var j = 0; j < this.maxIndexY; j++ ) {

        if ( this.densitymap[ i ] == undefined || this.densitymap[ i ][ j ] == undefined ) {
          continue;
        }

        colorIndex = this.getColorIndex( this.densitymap[ i ][ j ] );
        if ( !this.paths[ colorIndex ] ) {
          this.paths[ colorIndex ] = "";
        }

        this.paths[ colorIndex ] += " M " + this.getXAxis().getPx( i * this.deltaX + this.fromX ) + " " + this.getYAxis().getPx( j * this.deltaY + this.fromY ) + " h " + deltaXPx + " v " + deltaYPx + " h -" + deltaXPx + " z";

        ;
      }
    }
    /*
        this.maxIndexX = indexX;
        this.maxIndexY = indexY;*/

    this.drawRects();
  }

  /**
   * Draws the rectangles
   * @memberof SerieDensityMap
   * @private
   */
  drawRects() {

    for ( var i = 0; i < this.paths.length; i++ ) {

      if ( !this.rects[ i ] ) {
        this.rects[ i ] = document.createElementNS( this.graph.ns, "path" );
        this.rects[ i ].setAttribute( 'shape-rendering', 'crispEdges' );

      }

      if ( this.paths[ i ] !== undefined ) {
        this.rects[ i ].setAttribute( 'd', this.paths[  i ] );
        this.rects[ i ].setAttribute( 'fill', this.colorMap[ i ] );
        this.rects[ i ].setAttribute( 'fill-opacity', this.opacities[ i ] );
      }
      this.groupMain.appendChild( this.rects[ i ] );
    }

  }

  /**
   * Sets the options of the serie
   * @see SerieDensityMapDefaultOptions
   * @param {Object} options - A object containing the options to set
   * @return {SerieDensityMap} The current serie
   * @memberof SerieDensityMap
   */
  setOptions( options ) {
    this.options = util.extend( true, {}, defaults, ( options || {} ) );
    // Unselected style

    return this;
  }
}

export default SerieDensityMap;