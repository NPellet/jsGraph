import {
  Waveform
} from '../util/waveform.js';
import {
  extend,
  guid
} from '../graph.util.js';

import Serie from './graph.serie.js';

/**
 * @static
 * @extends Serie
 * @example graph.newSerie( name, options, "scatter" );
 * @see Graph#newSerie
 */
class SerieZone extends Serie {
  static
  default () {
    return {
      fillColor: 'rgba( 0, 0, 0, 0.1 )',
      lineColor: 'rgba( 0, 0, 0, 1 )',
      lineWidth: '1px'
    };
  }
  constructor( graph, name, options ) {
    super( ...arguments );

    this.selectionType = 'unselected';
    this.id = guid();

    this.groupZones = document.createElementNS( this.graph.ns, 'g' );
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
      this.maxX = Math.max( wave.getXMin(), this.maxX );
      this.minY = Math.min( wave.getMin(), this.minY );
      this.maxY = Math.max( wave.getMax(), this.maxY );
    } );

    this.graph.updateDataMinMaxAxes();
    this.dataHasChanged();
    return this;
  }

  setWaveforms() {
    return this.setWaveform( ...arguments );
  }

  getWaveforms() {
    return this.waveforms;
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
  draw( force ) {
    // Serie redrawing

    if ( force || this.hasDataChanged() ) {
      if ( !this.waveforms ) {
        return;
      }

      let dataX = 0,
        dataY = 0,
        xpx = 0,
        ypx = 0,
        j = 0,
        line = '',
        buffer,
        move = false;

      const xminpx = this.getXAxis().getMinPx(),
        xmaxpx = this.getXAxis().getMaxPx(),
        yminpx = this.getYAxis().getMinPx(),
        ymaxpx = this.getYAxis().getMaxPx();

      const xmin = this.getXAxis().getCurrentMin(),
        xmax = this.getXAxis().getCurrentMax(),
        ymin = this.getYAxis().getCurrentMin(),
        ymax = this.getYAxis().getCurrentMax();

      //this.clipRect.setAttribute( "x", Math.min( xmin, xmax ) );
      //this.clipRect.setAttribute( "y", Math.min( ymin, ymax ) );
      //this.clipRect.setAttribute( "width", Math.abs( xmax - xmin ) );
      //this.clipRect.setAttribute( "height", Math.abs( ymax - ymin ) );

      this.groupMain.removeChild( this.groupZones );

      for ( let waveform of this.waveforms ) {
        for ( j = 0; j < waveform.getLength(); j += 1 ) {
          dataX = waveform.getX( j, true );
          dataY = waveform.getY( j, true );

          // The y axis in screen coordinate is inverted vs cartesians
          if ( dataY[ j ] < ymin ) {
            ypx = this.getY( ymin );
          } else if ( dataY[ j ] > ymax ) {
            ypx = this.getY( ymax );
          }

          if ( dataX !== dataX ) {
            continue;
          }

          if ( dataY !== dataY ) {
            // Let's make a new line

            if ( line.length == 0 ) {
              continue;
            }

            line += `L ${xpx}, ${this.getY( waveform.getMinY() )}`;
            move = true;
            continue;
          }

          ypx = this.getY( dataY );
          xpx = this.getX( dataX );

          if ( dataX < xmin || dataX > xmax ) {
            buffer = [ dataX, dataY[ j ], xpx, ypx ];
            continue;
          }

          if ( move ) {
            line += ` M ${xpx}, ${this.getY( waveform.getMinY() )} `;
            move = false;
          }

          if ( line.length > 0 ) {
            line += ' L ';
          }

          if ( buffer ) {
            line += `${buffer[2]},${buffer[3]} `;
            buffer = false;
          } else {
            line += `${xpx},${ypx} `;
          }
        }
      }

      if ( line !== '' ) {
        this.lineZone.setAttribute( 'd', `M ${line} z` );
      } else {
        this.lineZone.setAttribute( 'd', '' );
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
}

export default SerieZone;