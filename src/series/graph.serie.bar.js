import * as util from '../graph.util.js';
import ErrorBarMixin from '../mixins/graph.mixin.errorbars.js';

import Serie from './graph.serie.line.js';

/**
 * Represents a bar serie.
   Needs to be used exclusively with a bar axis ({@link AxisXBar}).
   Supports error bars, line color, line width, fill color, fill opacity.
 * @example graph.newSerie("serieName", { fillColor: 'red', fillOpacity: 0.2 }, "bar" );
 * @extends Serie
 */
class SerieBar extends Serie {

  constructor( graph, name, options ) {

    super( ...arguments );

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
   *  Sets the fill color
   */
  setFillColor( fillColor, selectionType, applyToSelected ) {

    selectionType = selectionType || 'unselected';
    this.styles[ selectionType ] = this.styles[ selectionType ] || {};
    this.styles[ selectionType ].fillColor = fillColor;

    if ( applyToSelected ) {
      this.setFillColor( fillColor, 'selected' );
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

    selectionType = selectionType || 'unselected';
    this.styles[ selectionType ] = this.styles[ selectionType ] || {};
    this.styles[ selectionType ].fillOpacity = opacity;

    if ( applyToSelected ) {
      this.setLineWidth( opacity, 'selected' );
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

    var path = '';
    var categoryNumber,
      position;

    if ( this.hasErrors() ) {
      this.errorDrawInit();
    }

    var j = 0;

    for ( ; j < this.waveform.getLength(); j++ ) {

      if ( !this.categoryIndices[ this.waveform.getX( j ) ] ) {
        continue;
      }

      path += `M ${this.getXAxis().getPos( this.categoryIndices[this.waveform.getX( j )] )
        } ${this.getYAxis().getPos( this.getYAxis().getCurrentMin() )
        } V ${this.getYAxis().getPos( this.waveform.getY( j ) )
        } h ${this.getXAxis().getDeltaPx( 1 / this.nbCategories )
        } V ${this.getYAxis().getPos( this.getYAxis().getCurrentMin() )}`;

      if ( this.hasErrors() ) {

        var xpx = this.getXAxis().getPos( this.categoryIndices[ this.waveform.getX( j ) ] ) + this.getXAxis().getDeltaPx( 1 / this.nbCategories ) / 2;
        var ypx = this.getYAxis().getPos( this.waveform.getY( j ) );

        this.errorAddPoint( j, this.waveform.getX( j ), this.waveform.getY( j ), xpx, ypx );
      }

    }

    if ( this.hasErrors() ) {
      this.errorDraw();
    }

    this.pathDom.setAttribute( 'd', path );
    this.applyLineStyles();
  }

  // Markers now allowed
  setMarkers() {}

  getUsedCategories() {
    return this.waveform.xdata;
  }

}

export default SerieBar;