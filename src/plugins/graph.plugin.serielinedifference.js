import {
  Waveform
} from '../util/waveform.js';

import Plugin from './graph.plugin.js';

/**
 * @class PluginSerieLineDifference
 * @implements Plugin
 */
class PluginSerieLineDifference extends Plugin {

  constructor() {
    super( ...arguments );
  }

  static
  default () {
    return {

      positiveStyle: {

        fillColor: 'green',
        fillOpacity: 0.2,
        strokeWidth: 0
      },

      negativeStyle: {
        fillColor: 'red',
        fillOpacity: 0.2,
        strokeWidth: 0
      },

      from: 0,
      to: 0
    };
  }

  /**
   * Init method
   * @private
   */
  init( graph, options ) {
    this.graph = graph;

    this.series = [];
    this.pathsPositive = [];
    this.pathsNegative = [];

    this.positivePolyline = this.graph.newShape( 'polyline' ).draw();

    this.positivePolyline.
    setFillColor( this.options.positiveStyle.fillColor ).
    setFillOpacity( this.options.positiveStyle.fillOpacity ).
    setStrokeWidth( this.options.positiveStyle.strokeWidth ).
    applyStyle();

    this.negativePolyline = this.graph.newShape( 'polyline' ).draw();

    this.negativePolyline.
    setFillColor( this.options.negativeStyle.fillColor ).
    setFillOpacity( this.options.negativeStyle.fillOpacity ).
    setStrokeWidth( this.options.negativeStyle.strokeWidth ).
    applyStyle();
  }

  /**
   * Assigns the two series for the shape. Postive values are defined when ```serieTop``` is higher than ```serieBottom```.
   * @param {SerieLine} serieTop - The top serie
   * @param {SerieLine} serieBottom - The bottom serie
   */
  setSeries( serieTop, serieBottom ) {
    this.serie1 = serieTop;
    this.serie2 = serieBottom;
  }

  /**
   * Assigns the boundaries
   */
  setBoundaries( from, to ) {
    this.options.from = from;
    this.options.to = to;
  }

  /**
   * @returns the starting value used to draw the zone
   */
  getFrom() {
    return this.options.from;
  }

  /**
   * @returns the ending value used to draw the zone
   */
  getTo() {
    return this.options.to;
  }

  /**
   * Calculates and draws the zone series
   * @returns {Plugin} The current plugin instance
   */
  draw() {

    var self = this;

    const w1 = this.serie1.getWaveform();
    const w2 = this.serie2.getWaveform();

    const wFinal = w1.duplicate( true ).subtract( w2 ).add( w2 );
    const wFinal2 = w1.duplicate( true ).subtract( w1.duplicate( true ).subtract( w2 ) );

    const chunks = [];
    let currentChunk;

    var newChunk = ( force = false ) => {

      if ( !force ) {
        if ( currentChunk.wave1.length == 0 && currentChunk.wave2.length == 0 ) {
          return;
        }
      }
      currentChunk = {
        above: undefined,
        wave1: [],
        wave2: []
      };
      chunks.push( currentChunk );
    };

    newChunk( true );

    let currentlyAbove = true;

    for ( var i = 0; i < wFinal.getLength(); i++ ) {

      if ( isNaN( wFinal.getY( i ) ) || isNaN( wFinal2.getY( i ) ) ) {
        newChunk();
        continue;
      }

      if ( i > 0 && currentChunk.wave1.length > 0 ) {

        if ( ( wFinal.getY( i ) > wFinal2.getY( i ) && !currentChunk.above ) ) {

          const crossing = this.computeCrossing( wFinal.getX( i - 1 ), wFinal.getY( i - 1 ), wFinal.getX( i ), wFinal.getY( i ), wFinal2.getX( i - 1 ), wFinal2.getY( i - 1 ), wFinal2.getX( i ), wFinal2.getY( i ) );
          currentChunk.wave1.push( [ crossing.x, crossing.y ] );
          newChunk();
          currentChunk.wave1.push( [ crossing.x, crossing.y ] );
          currentChunk.above = true;
        }

        if ( ( wFinal.getY( i ) < wFinal2.getY( i ) && currentChunk.above ) ) {

          const crossing = this.computeCrossing( wFinal.getX( i - 1 ), wFinal.getY( i - 1 ), wFinal.getX( i ), wFinal.getY( i ), wFinal2.getX( i - 1 ), wFinal2.getY( i - 1 ), wFinal2.getX( i ), wFinal2.getY( i ) );
          currentChunk.wave1.push( [ crossing.x, crossing.y ] );
          newChunk();
          currentChunk.wave1.push( [ crossing.x, crossing.y ] );
          currentChunk.above = false;

        }
      }

      if ( currentChunk.wave1.length == 0 ) {
        currentChunk.above = wFinal.getY( i ) > wFinal2.getY( 1 );
      }

      currentChunk.wave1.push( [ wFinal.getX( i ), wFinal.getY( i ) ] );
      currentChunk.wave2.push( [ wFinal2.getX( i ), wFinal2.getY( i ) ] );
    }

    this.series.forEach( ( serie ) => serie.kill() );

    this.series = chunks.forEach( ( chunk, index ) => {

      const serie = this.graph.newSerie( `__graph_serielinedifference_${this.serie1.getName()}_${this.serie2.getName()}_${index}` );
      const wave = new Waveform();

      wave.setData(
        chunk.wave1.map( ( el ) => el[ 1 ] ).concat( chunk.wave2.reverse().map( ( el ) => el[ 1 ] ) ),
        chunk.wave1.map( ( el ) => el[ 0 ] ).concat( chunk.wave2.map( ( el ) => el[ 0 ] ) )
      );

      if ( chunk.wave1[ 0 ] ) {
        wave.append( chunk.wave1[ 0 ][ 0 ], chunk.wave1[ 0 ][ 1 ] );
      }

      serie.setWaveform( wave );
      serie.setXAxis( this.serie1.getXAxis() );
      serie.setYAxis( this.serie1.getYAxis() );

      if ( chunk.above ) {
        serie.setFillColor( this.options.positiveStyle.fillColor );
      } else {
        serie.setFillColor( this.options.negativeStyle.fillColor );
      }
    } );

  }

  /**
   * Finds the crossing point between two vector and returns it, or ```false``` if it is not within the x boundaries
   * @returns {(Object|Boolean)} An object containing the crossing point in the following format: ```{ x: xCrossing, y: yCrossing }``` or ```false``` if no crossing point can be found
   * @param {Number} x11 - First x point of the first vector
   * @param {Number} y11 - First y point of the first vector
   * @param {Number} x12 - Second x point of the first vector
   * @param {Number} y12 - Second y point of the first vector
   * @param {Number} x21 - First x point of the second vector
   * @param {Number} y21 - First y point of the second vector
   * @param {Number} y22 - Second x point of the second vector
   * @param {Number} y22 - Second y point of the second vector
   */
  computeCrossing( x11, y11, x12, y12, x21, y21, x22, y22 ) {

    var a1 = ( y12 - y11 ) / ( x12 - x11 );
    var a2 = ( y22 - y21 ) / ( x22 - x21 );

    var b1 = y12 - a1 * x12;
    var b2 = y22 - a2 * x22;

    if ( x11 == x12 || x21 == x22 ) {

      return false;
    }

    if ( a1 == a2 ) {
      return {
        x: x11,
        y1: y11,
        y2: y11,
        y: y11
      };
    }

    var x = ( b1 - b2 ) / ( a2 - a1 );

    if ( x > x12 || x < x11 || x < x21 || x > x22 ) {
      return false;
    }

    return {
      x: x,
      y: a1 * x + b1
    };
  }

  /**
   * @returns The positive polyline
   */
  getPositivePolyline() {
    return this.positivePolyline;
  }

  /**
   * @returns The negative polyline
   */
  getNegativePolyline() {
    return this.negativePolyline;
  }

}

export default PluginSerieLineDifference;