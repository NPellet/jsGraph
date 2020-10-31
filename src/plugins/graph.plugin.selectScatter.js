import * as util from '../graph.util.js';

import Plugin from './graph.plugin.js';

/**
 * @extends Plugin
 */
class PluginSelectScatter extends Plugin {

  constructor() {
    super( ...arguments );
  }

  static
  default () {
    return {};
  }
  /**
   * Init method
   * @private
   */
  init( graph, options ) {

    this._path = document.createElementNS( graph.ns, 'path' );

    util.setAttributeTo( this._path, {
      'display': 'none',
      'fill': 'rgba(0,0,0,0.1)',
      'stroke': 'rgba(0,0,0,1)',
      'shape-rendering': 'crispEdges',
      'x': 0,
      'y': 0,
      'height': 0,
      'width': 0,
      'd': ''
    } );

    this.graph = graph;

    graph.dom.appendChild( this._path );
  }

  /**
   * Assigns the scatter serie that should be selected to the plugin
   * @param {ScatterSerie} serie - The serie
   * @return {PluginSelectScatter} The current plugin instance
   */
  setSerie( serie ) {
    this.options.serie = serie;
  }

  /**
   * @private
   */
  onMouseDown( graph, x, y, e, mute ) {

    if ( !this.options.serie ) {
      return;
    }

    const serie = graph.getSerie( this.options.serie );

    this.path = `M ${x} ${y} `;
    this.currentX = x;
    this.currentY = y;

    this.xs = [ serie.getXAxis().getVal( x - graph.getPaddingLeft() ) ];
    this.ys = [ serie.getYAxis().getVal( y - graph.getPaddingTop() ) ];
    this._path.setAttribute( 'd', '' );
    this._path.setAttribute( 'display', 'block' );

  }

  /**
   * @private
   */
  onMouseMove( graph, x, y, e, mute ) {

    if ( !this.options.serie ) {
      return;
    }

    const serie = graph.getSerie( this.options.serie );

    if ( Math.pow( ( x - this.currentX ), 2 ) + Math.pow( ( y - this.currentY ), 2 ) > 25 ) {

      this.path += ` L ${x} ${y} `;
      this.currentX = x;
      this.currentY = y;

      this.xs.push( serie.getXAxis().getVal( x - graph.getPaddingLeft() ) );
      this.ys.push( serie.getYAxis().getVal( y - graph.getPaddingTop() ) );

      this._path.setAttribute( 'd', `${this.path} z` );

      this.findPoints();
    }
  }

  /**
   * @private
   */
  findPoints() {

    if ( !this.options.serie ) {
      return;
    }

    const serie = this.graph.getSerie( this.options.serie );

    var data = serie.waveform;
    var selected = [];
    var counter = 0,
      j2;
    for ( var i = 0, l = data.getLength(); i < l; i += 1 ) {

      counter = 0;
      for ( var j = 0, k = this.xs.length; j < k; j += 1 ) {

        if ( j == k - 1 ) {
          j2 = 0;
        } else {
          j2 = j + 1;
        }

        if ( ( ( this.ys[ j ] < data.getY( i ) && this.ys[ j2 ] > data.getY( i ) ) || ( this.ys[ j ] > data.getY( i ) && this.ys[ j2 ] < data.getY( i ) ) ) ) {

          if ( data.getX( i ) > ( ( data.getY( i ) - this.ys[ j ] ) / ( this.ys[ j2 ] - this.ys[ j ] ) ) * ( this.xs[ j2 ] - this.xs[ j ] ) + this.xs[ j ] ) {
            counter++;
          }
        }
      }

      if ( counter % 2 == 1 ) {

        selected.push( i );
        serie.selectMarker( i, true, 'selected' );
      } else {
        serie.unselectMarker( i );
      }

    }

    this.selected = selected;
    this.emit( 'selectionProcess', selected );
  }

  /**
   * @private
   */
  onMouseUp( graph, x, y, e ) {
    this._path.setAttribute( 'display', 'none' );
    this.emit( 'selectionEnd', this.selected );
  }

}

export default PluginSelectScatter;