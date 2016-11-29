import Serie from './graph.serie'
import {
  extend,
  guid,
  throwError,
  emptyDom
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

  orientation: 'y',
  maxBoxWidth: 20,

  defaultStyle: {

    meanLineColor: 'rgb( 100, 0, 0 )',
    meanLineWidth: 2,

    boxAboveLineWidth: 1,
    boxAboveLineColor: 'rgb( 0, 0, 0 )',
    boxAboveFillColor: 'transparent',
    boxAboveFillOpacity: 1,
    boxBelowLineWidth: 1,
    boxBelowLineColor: 'rgb( 0, 0, 0 )',
    boxBelowFillColor: 'transparent',
    boxBelowFillOpacity: 1,

    barAboveLineColor: 'rgba( 0, 0, 0, 1 )',
    barAboveLineWidth: 1,
    barBelowLineColor: 'rgba( 0, 0, 0, 1 )',
    barBelowLineWidth: 1,

    outlierLineWidth: 1,
    outlierLineColor: 'rgb( 255, 255, 255 )',
    outlierFillColor: 'rgb( 0, 0, 0 )',
    outlierFillOpacity: 1
  }

};
/** 
 * @static
 * @extends Serie
 * @example graph.newSerie( name, options, "scatter" );
 * @see Graph#newSerie
 */
class SerieBox extends Serie {

  constructor() {
    super();
  }

  init( graph, name, options ) {
    this.graph = graph;
    this.name = name;
    this.options = extend( true, {}, defaults, ( options || {} ) ); // Creates options

    this.groupMain = document.createElementNS( this.graph.ns, 'g' );

    this.pathDom = document.createElementNS( this.graph.ns, 'path' );
    this.groupMain.appendChild( this.pathDom );

    // Creates an empty style variable
    this.styles = {};

    // Unselected style
    this.styles.unselected = this.options.defaultStyle;
  }

  /** 
   *  Sets the data of the bar serie
   *  @param {Object} data
   *  @example serie.setData( [ { x: 'cat', Q2: valMean, Q1: valBoxMin, Q3: valBoxMax, whiskers: [ val1, val2 ], outliers: [ ...yList ] } ] );
   *  @return {SerieBar} The current serie instance
   */
  setData( data, noRescale ) {

    this.data = data;

    if ( !Array.isArray( data ) ) {
      return;
    }

    let axisref, axisval, methodref, methodval, blnX;

    if ( this.options.orientation == 'y' ) {
      axisref = this.getXAxis();
      axisval = this.getYAxis();
      methodref = this._checkX.bind( this );
      methodval = this._checkY.bind( this );
      blnX = true;

      this.minY = data[ 0 ].Q2;
      this.maxY = data[ 0 ].Q2;
      this.maxX = data[ 0 ].x;
      this.minX = data[ 0 ].x;

    } else {
      axisref = this.getYAxis();
      axisval = this.getXAxis();
      methodref = this._checkY.bind( this );
      methodval = this._checkX.bind( this );
      blnX = false;

      this.minX = data[ 0 ].Q2;
      this.maxX = data[ 0 ].Q2;
      this.maxY = data[ 0 ].y;
      this.minY = data[ 0 ].y;

    }

    if ( noRescale ) {
      methodref = function() {};
      methodval = function() {};
    }

    if ( !axisref ||  !axisval ) {
      throwError( "Error in setting data of the box serie. The X and Y axes must be set beforehand" );
    }

    for ( var i in this.data ) {

      if ( blnX ) {
        methodref( this.data[ i ].x );
        this.data[ i ].pos = this.data[ i ].x;
      } else {
        methodref( this.data[ i ].y );
        this.data[ i ].pos = this.data[ i ].y;
      }

      if ( this.data[ i ].Q3 ) {
        methodval( this.data[ i ].Q3 );
      }

      if ( this.data[ i ].Q1 ) {
        methodval( this.data[ i ].Q1 );
      }

      if ( this.data[ i ].whiskers ) {

        if ( Array.isArray( this.data[ i ].whiskers ) ) {

          if ( this.data[ i ].whiskers.length > 0 ) {
            methodval( this.data[ i ].whiskers[ 0 ] );
          }

          if ( this.data[ i ].whiskers.length > 1 ) {
            methodval( this.data[ i ].whiskers[ 1 ] );
          }

        } else {
          methodval( this.data[ i ].whiskers );
          this.data[ i ].whiskers = [ this.data[ i ].whiskers ];
        }

      } else {
        this.data[ i ].whiskers = [];
      }

      if ( Array.isArray( this.data[ i ].outliers ) ) {
        this.data[ i ].outliers.map( ( val ) => methodval( val ) );
      } else {
        this.data[ i ].outliers = [];
      }
    }

    this.dataHasChanged();
    this.graph.updateDataMinMaxAxes();

    return this;
  }

  _style( type, styleValue, selectionType = "unselected", applyToSelected = false ) {
    this.styles[ selectionType ] = this.styles[ selectionType ] || {};
    this.styles[ selectionType ][ type ] = styleValue;

    if ( applyToSelected ) {
      this._set( type, styleValue, "selected" );
    }

    this.styleHasChanged( selectionType );
    return this;
  }

  _gstyle( type, selectionType ) {
    return this.getStyle( selectionType )[ type ];
  }

  getStyle( selectionType = "unselected" ) {

    return this.styles[ selectionType ] || {};
  }

  /** 
   *  Sets the mean line color
   *  @param {String} color - The mean line color
   *  @returns {SerieBox} The current serie instance
   */
  setMeanLineColor() {
    return this._style( 'meanLineColor', ...arguments );
  }

  /** 
   *  Returns the mean line color
   */
  getMeanLineColor() {
    return this._gstyle( 'meanLineColor', ...arguments );
  }

  setStyle( style, selectionType = "unselected" ) {
    //console.log( style, selectionType );
    this.styles[ selectionType ] = extend( {}, defaults.defaultStyle, this.styles.unselected, style );
    this.styleHasChanged( selectionType );
  }

  /** 
   *  Sets the mean line width
   *  @param {Number} width - The line width
   *  @returns {SerieBox} The current serie instance
   */
  setMeanLineWidth() {
    return this._style( 'meanLineWidth', ...arguments );
  }

  /** 
   *  Returns the mean line width
   */
  getMeanLineWidth() {
    return this._gstyle( 'meanLineWidth', ...arguments );
  }

  /** 
   *  Sets the box line color
   *  @param {Number} color - The color of the box above the median
   *  @returns {SerieBox} The current serie instance
   */
  setBoxAboveLineColor() {
    return this._style( 'boxAboveLineColor', ...arguments );
  }

  /** 
   *  Returns the box line color
   */
  getBoxAboveLineColor() {
    return this._gstyle( 'boxAboveLineColor', ...arguments );
  }

  /** 
   *  Sets the fill color
   *  @param {Number} color - The color of the box below the median
   *  @returns {SerieBox} The current serie instance
   */
  setBoxBelowLineColor() {
    return this._style( 'boxBelowLineColor', ...arguments );
  }

  /** 
   *  Returns the fill color
   */
  getBoxBelowLineColor() {
    return this._gstyle( 'boxBelowLineColor', ...arguments );
  }

  /** 
   *  Sets the fill color
   *  @param {Number} width - The contour width of the box above the median
   *  @returns {SerieBox} The current serie instance
   */
  setBoxAboveLineWidth() {
    return this._style( 'boxAboveLineWidth', ...arguments );
  }

  /** 
   *  Returns the fill color
   */
  getBoxAboveLineWidth() {
    return this._gstyle( 'boxAboveLineWidth', ...arguments );
  }

  /** 
   *  Sets the fill color
   *  @param {Number} width - The contour width of the box below the median
   *  @returns {SerieBox} The current serie instance
   */
  setBoxBelowLineWidth() {
    return this._style( 'boxBelowLineWidth', ...arguments );
  }

  /** 
   *  Returns the fill color
   */
  getBoxBelowLineWidth() {
    return this._gstyle( 'boxBelowLineWidth', ...arguments );
  }

  /** 
   *  Sets the fill color
   *  @param {String} color - The fill color of the box above the median
   *  @returns {SerieBox} The current serie instance
   */
  setBoxAboveFillColor() {
    return this._style( 'boxAboveFillColor', ...arguments );
  }

  /** 
   *  Returns the fill color
   */
  getBoxAboveFillColor() {
    return this._gstyle( 'boxAboveFillColor', ...arguments );
  }

  /** 
   *  Sets the fill color
   *  @param {String} color - The fill color of the box below the median
   *  @returns {SerieBox} The current serie instance
   */
  setBoxBelowFillColor() {
    return this._style( 'boxBelowFillColor', ...arguments );
  }

  /** 
   *  Returns the fill color
   */
  getBoxBelowFillColor() {
    return this._gstyle( 'boxBelowFillColor', ...arguments );
  }

  /** 
   *  Sets the fill color
   *  @param {Number} opacity - The fill opacity of the box above the median
   *  @returns {SerieBox} The current serie instance
   */
  setBoxAboveFillOpacity() {
    return this._style( 'boxAboveFillOpacity', ...arguments );
  }

  /** 
   *  Returns the fill color
   */
  getBoxAboveFillOpacity() {
    return this._gstyle( 'boxAboveFillOpacity', ...arguments );
  }

  /** 
   *  Sets the fill color
   *  @param {Number} opacity - The fill opacity of the box below the median
   *  @returns {SerieBox} The current serie instance
   */
  setBoxBelowFillOpacity() {
    return this._style( 'boxBelowFillOpacity', ...arguments );
  }

  /** 
   *  Returns the fill color
   */
  getBoxBelowFillOpacity() {
    return this._gstyle( 'boxBelowFillOpacity', ...arguments );
  }

  /** 
   *  Sets the whisker color
   *  @param {String} color - The line color of the whisker above the median
   *  @returns {SerieBox} The current serie instance
   */
  setBarAboveLineColor() {
    return this._style( 'barAboveLineColor', ...arguments );
  }

  /** 
   *  Returns the fill color
   */
  getBarAboveLineColor() {
    return this._gstyle( 'barAboveLineColor', ...arguments );
  }

  /** 
   *  Sets the fill color
   *  @param {String} color - The line color of the whisker below the median
   *  @returns {SerieBox} The current serie instance
   */
  setBarBelowLineColor() {
    return this._style( 'barBelowLineColor', ...arguments );
  }

  /** 
   *  Returns the fill color
   */
  getBarBelowLineColor() {
    return this._gstyle( 'barBelowLineColor', ...arguments );
  }

  /** 
   *  Sets the fill color
   *  @param {Number} width - The line width of the whisker above the median
   *  @returns {SerieBox} The current serie instance
   */
  setBarAboveLineWidth() {
    return this._style( 'barAboveLineWidth', ...arguments );
  }

  /** 
   *  Returns the fill color
   */
  getBarAboveLineWidth() {
    return this._gstyle( 'barAboveLineWidth', ...arguments );
  }

  /** 
   *  Sets the fill color
   *  @param {Number} width - The line width of the whisker below the median
   *  @returns {SerieBox} The current serie instance
   */
  setBarBelowLineWidth() {
    return this._style( 'barBelowLineWidth', ...arguments );
  }

  /** 
   *  Returns the fill color
   */
  getBarBelowLineWidth() {
    return this._gstyle( 'barBelowLineWidth', ...arguments );
  }

  /** 
   *  Sets the fill color
   *  @param {String} color - The outlier stroke color
   *  @returns {SerieBox} The current serie instance
   */
  setOutlierLineColor() {
    return this._style( 'outlierLineColor', ...arguments );
  }

  /** 
   *  Returns the box line color
   */
  getOutlierLineColor() {
    return this._gstyle( 'outlierLineColor', ...arguments );
  }

  /** 
   *  Sets the stroke width
   *  @param {Number} width - The outlier stroke width
   *  @returns {SerieBox} The current serie instance
   */
  setOutlierLineWidth() {
    return this._style( 'outlierLineWidth', ...arguments );
  }

  /** 
   *  Returns the fill color
   */
  getOutlierLineWidth() {
    return this._gstyle( 'outlierLineWidth', ...arguments );
  }

  /** 
   *  Sets the fill color
   *  @param {String} color - The outlier fill color
   *  @returns {SerieBox} The current serie instance
   */
  setOutlierFillColor() {
    return this._style( 'outlierFillColor', ...arguments );
  }

  /** 
   *  Returns the fill color
   */
  getOutlierFillColor() {
    return this._gstyle( 'outlierFillColor', ...arguments );
  }

  /** 
   *  Sets the outlier fill opacity
   *  @param {Number} opacity - The outlier fill opacity
   *  @returns {SerieBox} The current serie instance
   */
  setOutlierFillOpacity() {
    return this._style( 'outlierFillOpacity', ...arguments );
  }

  /** 
   *  Returns the outlier fill opacity
   */
  getOutlierFillOpacity() {
    return this._gstyle( 'outlierFillOpacity', ...arguments );
  }

  /**
   * Reapply the current style to the serie lines elements. Mostly used internally
   *  @returns {SerieBox} The current serie instance
   */
  applyLineStyles() {
    this.applyLineStyle( this.pathDom );
  }

  /**
   * Applies the current style to a line element. Mostly used internally
   * @memberof SerieBar
   */
  applyLineStyle( line ) {

    line.setAttribute( 'stroke', this.getLineColor() );
    line.setAttribute( 'stroke-width', this.getLineWidth() );
    line.removeAttribute( 'stroke-dasharray' );
    line.setAttribute( 'fill', this.getFillColor() );
    line.setAttribute( 'fill-opacity', this.getFillOpacity() || 1 );
  }

  draw() {

    if ( !this.data ) {
      return;
    }

    let position;
    let axis = this.options.orientation == 'y' ? this.getYAxis() : this.getXAxis();
    let axis2 = this.options.orientation == 'y' ? this.getXAxis() : this.getYAxis();
    let boxOtherDimension; // width or height of the box
    let useCategories = false;
    let mean, boxAbove, boxBelow, barAbove, barBelow, outliers, posAbove, posBelow;
    let categoryNumber;

    emptyDom( this.groupMain );

    if ( axis2.getType() == 'category' ) {

      boxOtherDimension = axis2.getRelPx( 0.8 / ( this.nbCategories ) );
      useCategories = true;

    } else {
      // Get all the spacing and determine the smallest one
      boxOtherDimension = this.options.maxBoxWidth;
      //      console.log( boxOtherDimension );
      for ( var i = 0, l = this.data.length; i < l - 1; i++ ) {

        //     console.log( Math.abs( axis.getPx( this.data[ i + 1 ].pos ) - axis.getPx( this.data[ i ].pos ) ), axis.getPx( this.data[ i + 1 ].pos ), axis.getPx( this.data[ i ].pos ) );
        boxOtherDimension = Math.min( boxOtherDimension, Math.abs( axis2.getPx( this.data[ i + 1 ].pos ) - axis2.getPx( this.data[ i ].pos ) ) );
      }
      // console.log( boxOtherDimension );
    }

    for ( var i = 0, l = this.data.length; i < l; i++ ) {

      if ( axis2.getType() == 'category' ) {

        let cat = this.options.orientation == 'y' ? this.data[ i ].x : this.data[  i ].y;

        if ( !this.categoryIndices.hasOwnProperty( cat ) ) {

          if ( Array.isArray( this._linkedToScatterSeries ) ) {
            for ( let scatter_serie of this._linkedToScatterSeries ) {

              if ( scatter_serie.categoryIndices.hasOwnProperty( cat ) ) {

                position = [ axis2.getPos( scatter_serie.categoryIndices[ cat ] ) + 1.2 * boxOtherDimension / 2 ];

                if ( this.options.orientation == 'y' ) {
                  axis = scatter_serie.getYAxis();
                } else {
                  axis = scatter_serie.getXAxis();
                }

                break;
              }
            }
          }
        } else {

          position = [ axis2.getPos( this.categoryIndices[ cat ] ) + 1.2 * boxOtherDimension / 2 ];

        }

      } else {

        position = [ axis2.getPos( this.options.orientation == 'y' ? this.data[ i ].x : this.data[ i ].y ), boxOtherDimension ];

      }

      mean = axis.getPos( this.data[ i ].Q2 );
      boxAbove = axis.getPos( this.data[ i ].Q3 );
      boxBelow = axis.getPos( this.data[ i ].Q1 );

      this.data[ i ].whiskers.map( ( val ) => {

        if ( val < this.data[ i ].Q1 ) {
          barBelow = axis.getPos( val );
        } else {
          barAbove = axis.getPos( val );
        }
      } );

      outliers = this.data[ i ].outliers.map( ( val ) => axis.getPos( val ) );

      var lineMean = document.createElementNS( this.graph.ns, 'line' );

      this.applyMeanStyle( lineMean );

      var rectAbove = document.createElementNS( this.graph.ns, 'rect' );
      var rectBelow = document.createElementNS( this.graph.ns, 'rect' );

      if ( this.options.orientation == 'y' ) {

        rectAbove.setAttribute( 'width', boxOtherDimension );
        rectAbove.setAttribute( 'x', position[ 0 ] - boxOtherDimension / 2 );

        rectBelow.setAttribute( 'width', boxOtherDimension );
        rectBelow.setAttribute( 'x', position[ 0 ] - boxOtherDimension / 2 );

        lineMean.setAttribute( 'x1', position[ 0 ] - boxOtherDimension / 2 );
        lineMean.setAttribute( 'x2', position[ 0 ] + boxOtherDimension / 2 );
        lineMean.setAttribute( 'y1', mean );
        lineMean.setAttribute( 'y2', mean );

      } else {

        rectAbove.setAttribute( 'height', boxOtherDimension );
        rectAbove.setAttribute( 'y', position[ 0 ] - boxOtherDimension / 2 );

        rectBelow.setAttribute( 'height', boxOtherDimension );
        rectBelow.setAttribute( 'y', position[ 0 ] - boxOtherDimension / 2 );

        lineMean.setAttribute( 'y1', position[ 0 ] - boxOtherDimension / 2 );
        lineMean.setAttribute( 'y2', position[ 0 ] + boxOtherDimension / 2 );
        lineMean.setAttribute( 'x1', mean );
        lineMean.setAttribute( 'x2', mean );
      }

      this.boxPos( rectAbove, mean, boxAbove, this.options.orientation == 'x' );
      this.boxPos( rectBelow, mean, boxBelow, this.options.orientation == 'x' );

      this.applyBoxStyle( rectAbove, rectBelow );

      var whiskerAbove = document.createElementNS( this.graph.ns, 'line' );
      var whiskerBelow = document.createElementNS( this.graph.ns, 'line' );

      if ( this.options.orientation == 'y' ) {

        if ( barAbove !== undefined ) {
          whiskerAbove.setAttribute( 'y1', boxAbove );
          whiskerAbove.setAttribute( 'y2', barAbove );
          whiskerAbove.setAttribute( 'x1', position[ 0 ] );
          whiskerAbove.setAttribute( 'x2', position[ 0 ] );
        }

        if ( barBelow !== undefined ) {
          whiskerBelow.setAttribute( 'y1', boxBelow );
          whiskerBelow.setAttribute( 'y2', barBelow );
          whiskerBelow.setAttribute( 'x1', position[ 0 ] );
          whiskerBelow.setAttribute( 'x2', position[ 0 ] );
        }

      } else {

        if ( barAbove !== undefined ) {
          whiskerAbove.setAttribute( 'x1', boxAbove );
          whiskerAbove.setAttribute( 'x2', barAbove );
          whiskerAbove.setAttribute( 'y1', position[ 0 ] );
          whiskerAbove.setAttribute( 'y2', position[ 0 ] );
        }

        if ( barBelow !== undefined ) {
          whiskerBelow.setAttribute( 'x1', boxBelow );
          whiskerBelow.setAttribute( 'x2', barBelow );
          whiskerBelow.setAttribute( 'y1', position[ 0 ] );
          whiskerBelow.setAttribute( 'y2', position[ 0 ] );
        }
      }

      outliers.map( ( outliervalue ) => {

        let outlier = document.createElementNS( this.graph.ns, 'circle' );

        outlier.setAttribute( 'r', 2 );

        if ( this.options.orientation == 'y' ) {

          outlier.setAttribute( 'cx', position[ 0 ] );
          outlier.setAttribute( 'cy', outliervalue );

        } else {

          outlier.setAttribute( 'cy', position[ 0 ] );
          outlier.setAttribute( 'cx', outliervalue );
        }

        this.setOutlierStyle( outlier );

        this.groupMain.appendChild( outlier );
      } );

      if ( barAbove !== undefined ) {
        this.groupMain.appendChild( whiskerAbove );
      }

      if ( barBelow !== undefined ) {
        this.groupMain.appendChild( whiskerBelow );
      }

      if ( boxAbove !== undefined ) {
        this.groupMain.appendChild( rectAbove );
      }

      if ( boxBelow !== undefined ) {
        this.groupMain.appendChild( rectBelow );
      }

      this.groupMain.appendChild( lineMean );

      this.applyWhiskerStyle( whiskerAbove, whiskerBelow );
    }
  }

  applyBoxStyle( above, below ) {

    above.setAttribute( 'stroke', this.getBoxAboveLineColor() );
    above.setAttribute( 'stroke-width', this.getBoxAboveLineWidth() );

    if ( this.getBoxAboveFillColor() !== undefined ) {
      above.setAttribute( 'fill', this.getBoxAboveFillColor() );
    }
    if ( this.getBoxAboveFillOpacity() !== undefined ) {
      above.setAttribute( 'fill-opacity', this.getBoxAboveFillOpacity() );
    }

    below.setAttribute( 'stroke', this.getBoxBelowLineColor() );
    below.setAttribute( 'stroke-width', this.getBoxBelowLineWidth() );

    if ( this.getBoxBelowFillColor() !== undefined ) {
      below.setAttribute( 'fill', this.getBoxBelowFillColor() );
    }
    if ( this.getBoxAboveFillOpacity() !== undefined ) {
      below.setAttribute( 'fill-opacity', this.getBoxBelowFillOpacity() );
    }
  }

  applyWhiskerStyle( above, below ) {

    above.setAttribute( 'stroke', this.getBarAboveLineColor() );
    above.setAttribute( 'stroke-width', this.getBarAboveLineWidth() );

    below.setAttribute( 'stroke', this.getBarBelowLineColor() );
    below.setAttribute( 'stroke-width', this.getBarBelowLineWidth() );
  }

  applyMeanStyle( line ) {

    line.setAttribute( 'stroke', this.getMeanLineColor() );
    line.setAttribute( 'stroke-width', this.getMeanLineWidth() );
  }

  setOutlierStyle( outlier ) {

      outlier.setAttribute( 'stroke', this.getOutlierLineColor() );
      outlier.setAttribute( 'stroke-width', this.getOutlierLineWidth() );

      if ( this.getBoxBelowFillColor() !== undefined ) {
        outlier.setAttribute( 'fill', this.getOutlierFillColor() );
      }
      if ( this.getBoxAboveFillOpacity() !== undefined ) {
        outlier.setAttribute( 'fill-opacity', this.getOutlierFillOpacity() );
      }
    }
    /**
     * Returns the index of a category based on its name
     * @param {String} name - The name of the category
     */
  getCategoryIndex( name ) {

    if ( !this.categories ) {
      throw new Error( "No categories were defined. Probably axis.setSeries was not called" );
    }

    for ( var i = 0; i < this.categories.length; i++ ) {

      if ( this.categories[ i ].name == name ) {
        return i;
      }
    }

    return false;
  }

  // Markers now allowed
  setMarkers() {}

  boxPos( box, mean, extremity, blnX ) {

    if ( mean > extremity ) {

      box.setAttribute( blnX ? 'x' : 'y', extremity );
      box.setAttribute( blnX ? 'width' : 'height', mean - extremity );

    } else {

      box.setAttribute( blnX ? 'x' : 'y', mean );
      box.setAttribute( blnX ? 'width' : 'height', extremity - mean );
    }
  }

  getUsedCategories() {
    let xymode = this.options.orientation == 'y' ? 'x' : 'y';

    let categories = this.data.map( ( d ) => d[ xymode ] );

    if ( Array.isArray( this._linkedToScatterSeries ) ) {
      this._linkedToScatterSeries.map( ( scatter_serie ) => {

        scatter_serie.getUsedCategories().map( ( scatter_serie_cat ) => {
          let index;
          if ( ( index = categories.indexOf( scatter_serie_cat ) ) > -1 ) {
            categories.splice( index, 1 );
          }

        } );
      } );

    }

    return categories;
  }

  linkToScatterSerie( ...series ) {
    this._linkedToScatterSeries = series;
  }
}

export default SerieBox;