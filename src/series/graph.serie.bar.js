define( [ './graph.serie.line', '../graph.util', '../mixins/graph.mixin.errorbars' ], function( Serie, util, ErrorBarMixin ) {

  "use strict";

  /** 
   * Serie class to be extended
   * @class Serie
   * @static
   */
  function SerieBar() {

  }

  SerieBar.prototype = new Serie();

  SerieBar.prototype.init = function( graph, name, options ) {
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
      markers: this.options.markers
    };

  }

  SerieBar.prototype.setData = function( data ) {

    this.data = data;
    this.minY = Number.MAX_SAFE_INTEGER;
    this.maxY = Number.MIN_SAFE_INTEGER;

    for ( var i in this.data ) {
      this._checkY( this.data[ i ] );
    }

    return this;
  };

  /*  
   * @memberof SerieBar
   */
  SerieBar.prototype.setFillColor = function( fillColor, selectionType, applyToSelected ) {

    selectionType = selectionType ||  "unselected";
    this.styles[ selectionType ] = this.styles[ selectionType ] || {};
    this.styles[ selectionType ].fillColor = fillColor;

    if ( applyToSelected ) {
      this.setFillColor( fillColor, "selected" );
    }

    this.styleHasChanged( selectionType );

    return this;
  };

  SerieBar.prototype.getFillColor = function( selectionType ) {
    return this.getStyle( selectionType ).fillColor;
  };

  /*  
   * @memberof SerieBar
   */
  SerieBar.prototype.setFillOpacity = function( opacity, selectionType, applyToSelected ) {

    selectionType = selectionType ||  "unselected";
    this.styles[ selectionType ] = this.styles[ selectionType ] || {};
    this.styles[ selectionType ].fillOpacity = opacity;

    if ( applyToSelected ) {
      this.setLineWidth( opacity, "selected" );
    }

    this.styleHasChanged( selectionType );

    return this;
  };

  SerieBar.prototype.getFillOpacity = function( selectionType ) {

    return this.getStyle( selectionType ).fillOpacity || 1;
  };

  /**
   * Reapply the current style to the serie lines elements. Mostly used internally
   * @memberof SerieBar
   */
  SerieBar.prototype.applyLineStyles = function() {
    this.applyLineStyle( this.pathDom );
  };

  /**
   * Applies the current style to a line element. Mostly used internally
   * @memberof SerieBar
   */
  SerieBar.prototype.applyLineStyle = function( line ) {

    line.setAttribute( 'stroke', this.getLineColor() );
    line.setAttribute( 'stroke-width', this.getLineWidth() );
    if ( this.getLineDashArray() ) {
      line.setAttribute( 'stroke-dasharray', this.getLineDashArray() );
    } else {
      line.removeAttribute( 'stroke-dasharray' );
    }
    line.setAttribute( 'fill', this.getFillColor() );
    line.setAttribute( 'fill-opacity', this.getFillOpacity() || 1 );
  };

  SerieBar.prototype.draw = function() {

    var path = "";
    var categoryNumber,
      position;

    if ( this.error ) {
      this.errorDrawInit();
    }

    for ( var i in this.data ) {

      if ( false === ( categoryNumber = this.getCategory( i ) ) ) {
        continue;
      }

      position = this.calculatePosition( categoryNumber, this.order );

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

  SerieBar.prototype.getCategory = function( name ) {

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

  SerieBar.prototype.setBarConfig = function( order, categories, nbSeries ) {

    this.order = order;
    this.categories = categories;
    this.nbSeries = nbSeries;

  }

  SerieBar.prototype.calculatePosition = function( categoryNumber, serieNumber ) {

    var nbElements = ( this.nbSeries + 1 ) * this.categories.length;
    var nb = categoryNumber * ( this.nbSeries + 1 ) + serieNumber + 0.5;
    return [ ( nb ) / nbElements, 1 / nbElements, ( nb + 0.5 ) / nbElements ];
  }

  ErrorBarMixin.call( SerieBar.prototype ); // Add error bar mixin

  return SerieBar;

} );