import * as util from '../graph.util'
import Serie from './graph.serie.line'
import ErrorBarMixin from '../mixins/graph.mixin.errorbars'

/** 
 * Represents a bar serie.  
   Needs to be used exclusively with a bar axis ({@link AxisXBar}).  
   Supports error bars, line color, line width, fill color, fill opacity.
 * @example graph.newSerie("serieName", { fillColor: 'red', fillOpacity: 0.2 }, "bar" );
 * @extends Serie
 */
class SerieBar extends Serie {

  constructor() {
    super();
  }

  init( graph, name, options ) {
    this.graph = graph;
    this.name = name;
    this.options = options ||  {};

    this.groupMain = document.createElementNS( this.graph.ns, 'g' );

    this.pathDom = document.createElementNS( this.graph.ns, 'path' );
    this.groupMain.appendChild( this.pathDom );

    // Creates an empty style variable
    this.styles = {};

    // Unselected style
    this.styles.unselected = {
      lineColor: this.options.lineColor,
      lineStyle: this.options.lineStyle,
      lineWidth: this.options.lineWidth,
      fillColor: this.options.fillColor,
      fillOpacity: this.options.fillOpacity,
      markers: this.options.markers
    };

  }

  /** 
   *  Sets the data of the bar serie
   *  @param {Object} data
   *  @example serie.setData( { "cat1": val1, "cat2": val2, "cat4": val4 } );
   *  @return {SerieBar} The current serie instance
   */
  setData( data ) {

    this.data = data;
    this.minY = Number.MAX_SAFE_INTEGER;
    this.maxY = Number.MIN_SAFE_INTEGER;

    for ( var i in this.data ) {
      this._checkY( this.data[ i ] );
    }

    return this;
  }

  /** 
   *  Sets the fill color
   */
  setFillColor( fillColor, selectionType, applyToSelected ) {

    selectionType = selectionType ||  "unselected";
    this.styles[ selectionType ] = this.styles[ selectionType ] || {};
    this.styles[ selectionType ].fillColor = fillColor;

    if ( applyToSelected ) {
      this.setFillColor( fillColor, "selected" );
    }

    this.styleHasChanged( selectionType );

    return this;
  }

  /** 
   *  Returns the fill color
   */
  getFillColor( selectionType ) {
    return this.getStyle( selectionType ).fillColor;
  }

  /*  
   * @memberof SerieBar
   */
  setFillOpacity( opacity, selectionType, applyToSelected ) {

    selectionType = selectionType ||  "unselected";
    this.styles[ selectionType ] = this.styles[ selectionType ] || {};
    this.styles[ selectionType ].fillOpacity = opacity;

    if ( applyToSelected ) {
      this.setLineWidth( opacity, "selected" );
    }

    this.styleHasChanged( selectionType );

    return this;
  }

  getFillOpacity( selectionType ) {

    return this.getStyle( selectionType ).fillOpacity || 1;
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
    if ( this.getLineDashArray() ) {
      line.setAttribute( 'stroke-dasharray', this.getLineDashArray() );
    } else {
      line.removeAttribute( 'stroke-dasharray' );
    }
    line.setAttribute( 'fill', this.getFillColor() );
    line.setAttribute( 'fill-opacity', this.getFillOpacity() || 1 );
  }

  draw() {

    var path = "";
    var categoryNumber,
      position;

    if ( this.error ) {
      this.errorDrawInit();
    }

    for ( var i in this.data ) {

      if ( false === ( categoryNumber = this.getCategoryIndex( i ) ) ) {
        continue;
      }

      position = calculatePosition( categoryNumber, this.order, this.nbSeries, this.categories.length );

      path += "M " +
        this.getXAxis().getPos( position[ 0 ] ) +
        " " +
        this.getYAxis().getPos( 0 ) +
        " V " +
        this.getYAxis().getPos( this.data[ i ] ) +
        " h " +
        this.getXAxis().getDeltaPx( position[ 1 ] ) +
        " V " +
        this.getYAxis().getPos( 0 );

      if ( this.error ) {
        this.errorAddPointBarChart( i, this.data[ i ], this.getXAxis().getPos( position[ 2 ] ), this.getYAxis().getPos( this.data[ i ] ) );
      }
    }

    if ( this.error ) {
      this.errorDraw();
    }

    this.pathDom.setAttribute( 'd', path );
    this.applyLineStyles();
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
  setCategoryConfig( order, categories, nbSeries ) {

    this.order = order;
    this.categories = categories;
    this.nbSeries = nbSeries;
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

export default SerieBar;