import Serie from './graph.serie'
import {
  extend,
  guid,
  throwError
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
    boxAboveFillColor: 'rgb( 255, 255, 255 )',
    boxAboveFillOpacity: 1,
    boxBelowLineWidth: 1,
    boxBelowLineColor: 'rgb( 0, 0, 0 )',
    boxBelowFillColor: 'rgb( 255, 255, 255 )',
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
   *  @example serie.setData( [ { x: 'cat', mean: valMean, boxMin: valBoxMin, boxMax: valBoxMax, barMin: valBarMin, barMax: valBarMax, outliers: [ ...yList ] } ] );
   *  @return {SerieBar} The current serie instance
   */
  setData( data ) {

    this.data = data;

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
      methodref = this._checkX.bind( this );
      methodval = this._checkY.bind( this );
      blnX = false;

      this.minX = data[ 0 ].Q2;
      this.maxX = data[ 0 ].Q2;
      this.maxY = data[ 0 ].y;
      this.minY = data[ 0 ].y;

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

  /** 
   *  Sets the mean line width
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
     *  Sets the fill color
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
     */
  setBarBelowLineColor() {
    return this._style( 'boxBelowLineColor', ...arguments );
  }

  /** 
   *  Returns the fill color
   */
  getBarBelowLineColor() {
      return this._gstyle( 'barBelowLineColor', ...arguments );
    }
    /** 
     *  Sets the fill color
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
   */
  setOutlierLineWidth() {
    return this._style( 'outlierLineWidth', ...arguments );
  }

  /** 
   *  Returns the box line color
   */
  getOutlierLineColor() {
    return this._gstyle( 'outlierLineColor', ...arguments );
  }

  /** 
   *  Sets the fill color
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
   *  Sets the fill color
   */
  setOutlierFillOpacity() {
    return this._style( 'outlierFillOpacity', ...arguments );
  }

  /** 
   *  Returns the fill color
   */
  getOutlierFillOpacity() {
    return this._gstyle( 'outlierFillOpacity', ...arguments );
  }

  /**
   * Reapply the current style to the serie lines elements. Mostly used internally
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

    var categoryNumber,
      position;

    let axis = this.options.orientation == 'y' ? this.getYAxis() : this.getXAxis();
    let axis2 = this.options.orientation == 'y' ? this.getXAxis() : this.getYAxis();
    let boxOtherDimension; // width or height of the box
    let useCategories = false;

    let mean, boxAbove, boxBelow, barAbove, barBelow, outliers, posAbove, posBelow;

    if ( axis.getType() == 'category' ) {

      boxOtherDimension = axis.getRelPx( 1 / ( ( this.nbSeries + 1 ) * this.categories.length ) );
      useCategories = true;

    } else {
      // Get all the spacing and determine the smallest one
      boxOtherDimension = this.options.maxBoxWidth;

      for ( var i = 0, l = this.data.length; i < l - 2; i++ ) {
        boxOtherDimension = Math.min( boxOtherDimension, Math.abs( axis.getPos( this.data[ i + 1 ].pos ) - axis.getPos( this.data[ i ].pos ) ) );
      }
    }

    for ( var i = 0, l = this.data.length; i < l; i++ ) {

      if ( axis.getType() == 'category' ) {

        position = calculatePosition( categoryNumber, this.order, this.nbSeries, this.categories.length );
        position[ 0 ] = axis2.getPos( position[  0 ] );

      } else {

        position = [ axis2.getPos( this.data[ i ].x ), boxOtherDimension ];

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

  /**
   *  Informations needed for the redrawing of the bars, coming from AxisXBar
   *  @private
   *  @param {Number} order - The index of the serie in the bar stack
   *  @param {Object[]} categories - The list of categories
   *  @param {Number} nbSeries - The number of series
   *  @see AxisXBar#setSeries
   */
  setBarConfig( order, categories, nbSeries ) {

    this.order = order;
    this.categories = categories;
    this.nbSeries = nbSeries;
  }

  boxPos( box, mean, extremity, blnX ) {

    if ( mean > extremity ) {

      box.setAttribute( blnX ? 'x' : 'y', extremity );
      box.setAttribute( blnX ? 'width' : 'height', mean - extremity );

    } else {

      box.setAttribute( blnX ? 'x' : 'y', mean );
      box.setAttribute( blnX ? 'width' : 'height', extremity - mean );
    }
  }
}

/**
 *  @private
 *  @param {Number} categoryIndex - The index of the serie in the bar stack
 *  @param {Number} serieIndex - The index of the serie
 *  @param {Number} nbSeries - The number of series
 */
function calculatePosition( categoryIndex, serieIndex, nbSeries, nbCategories ) {

  var nbElements = ( nbSeries + 1 ) * nbCategories;
  var nb = categoryIndex * ( nbSeries + 1 ) + serieIndex + 0.5;
  return [ ( nb ) / nbElements, 1 / nbElements, ( nb + 0.5 ) / nbElements ];
}

export default SerieBox;