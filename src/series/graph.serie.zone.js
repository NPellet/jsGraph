import Serie from './graph.serie'
import Waveform from '../util/waveform'
import {
  extend,
  guid
} from '../graph.util'

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
    this.id = guid();

    this.options = extend( true, {}, defaults, options );
    this.groupZones = document.createElementNS( this.graph.ns, 'g' );
    this.groupMain = document.createElementNS( this.graph.ns, 'g' );
    this.lineZone = document.createElementNS( this.graph.ns, 'path' );
    this.lineZone.setAttribute( 'stroke', 'black' );
    this.lineZone.setAttribute( 'stroke-width', '1px' );

    this.groupMain.appendChild( this.groupZones );
    this.groupZones.appendChild( this.lineZone );

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
   * Assigns a collection of waveforms that make up the zone
   * The waveforms will appended one after the other, without break
   * @param {...Waveform} waveforms - The collection of waveforms
   * @return {SerieZone} - The current serie zone instance
   * @memberof SerieZone
   */
  setWaveform( ...waveforms ) {
    this.waveforms = waveforms;

    this.waveforms = this.waveforms.map( ( wave ) => {

      if ( !( wave instanceof Waveform ) ) {
        return new Waveform( wave );
      } else {
        return wave;
      }
    } );

    this.minX = this.waveforms[ 0 ].getXMin();
    this.maxX = this.waveforms[ 0 ].getXMax();
    this.minY = this.waveforms[ 0 ].getMin();
    this.maxY = this.waveforms[ 0 ].getMax();

    this.waveforms.map( ( wave ) => {

      this.minX = Math.min( wave.getXMin(), this.minX );
      this.maxX = Math.min( wave.getXMin(), this.maxX );
      this.minY = Math.min( wave.getMin(), this.minY );
      this.maxY = Math.min( wave.getMax(), this.maxY );
    } );

    this.graph.updateDataMinMaxAxes();
    this.dataHasChanged();
    return this;
  }

  setWaveforms() {
    return this.setWaveform( ...arguments );
  }

  setMinMaxWaveforms( min, max ) {
    this.waveforms = [ min, max.reverse() ];
    return this;
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

      let
        dataX = 0,
        dataY = 0,
        xpx = 0,
        ypx = 0,
        j = 0,
        line = "",
        buffer;

      const xmin = this.getXAxis().getMinPx(),
        xmax = this.getXAxis().getMaxPx(),
        ymin = this.getYAxis().getMinPx(),
        ymax = this.getYAxis().getMaxPx();

      this.clipRect.setAttribute( "x", Math.min( xmin, xmax ) );
      this.clipRect.setAttribute( "y", Math.min( ymin, ymax ) );
      this.clipRect.setAttribute( "width", Math.abs( xmax - xmin ) );
      this.clipRect.setAttribute( "height", Math.abs( ymax - ymin ) );

      this.groupMain.removeChild( this.groupZones );

      for ( let waveform of this.waveforms ) {

        dataY = waveform.getData( true );
        for ( j = 0; j < dataY.length; j += 1 ) {
          dataX = waveform.getX( j, true );

          ypx = this.getY( dataY[ j ] );
          xpx = this.getX( dataX );

          if ( xpx < xmin || xpx > xmax ) {
            buffer = [ xpx, ypx ];
            continue;
          }

          // The y axis in screen coordinate is inverted vs cartesians
          if ( ypx < ymax ) {
            ypx = ymax;
          } else if ( ypx > ymin ) {
            ypx = ymin;
          }

          if ( line.length > 0 ) {
            line += " L ";
          }

          if ( buffer ) {
            line += buffer[ 0 ] + "," + buffer[ 1 ] + " ";
            buffer = false;
          } else {
            line += xpx + "," + ypx + " ";
          }
        }
      }

      this.lineZone.setAttribute( 'd', "M " + line + " z" );
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

}

export default SerieZone