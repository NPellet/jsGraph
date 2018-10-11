import * as util from '../graph.util.js';

import Plugin from './graph.plugin.js';

/**
 * The intent of this plugin is to provide methods for the user to make the traces on the graph automatically different
 * Options to provide colorization, markers and line styles should be provided
 * @extends Plugin
 */
class PluginMakeTracesDifferent extends Plugin {

  constructor() {
    super( ...arguments );
  }

  init( graph, options ) {
    super.init( graph, options );
  }
  // Load this with defaults
  static
  default () {

    return {

    };
  }

  checkHSL( color ) {

    let result = {},
      hue, saturation, lightness;

    if ( ( hue = ( color.h || color.hue ) ) ) {

      if ( hue < 1 ) {
        hue = Math.round( hue * 360 );
      }

      result.hue = hue;
    } else {
      result.h = 0;
    }

    if ( ( saturation = ( color.s || color.saturation ) ) ) {

      if ( saturation > 1 ) {
        saturation /= 100;
      }

      result.saturation = saturation;
    } else {
      result.saturation = 0.75;
    }

    if ( ( lightness = ( color.lightness || color.l ) ) ) {

      if ( lightness > 1 ) {
        lightness /= 100;
      }

      result.lightness = lightness;
    } else {
      result.lightness = 0.5;
    }

    return result;
  }

  buildHSLString( hsl ) {
    return `hsl( ${ Math.round( hsl.h ) }, ${ Math.round( hsl.s * 100 ) }%, ${ Math.round( hsl.l * 100 ) }%)`;
  }

  colorizeAll( options, callback = false ) {

    let series,
      seriesLength;

    if ( options.serieTypes ) {

      if ( !Array.isArray( options.serieTypes ) ) {
        options.serieTypes = [ options.serieTypes ];
      }

      series = this.graph.allSeries( ...options.serieTypes );
    } else {
      series = this.graph.getSeries();
    }

    seriesLength = series.length;

    if ( !options.startingColorHSL ) {

      if ( options.colorHSL ) {
        options.startingColorHSL = this.checkHSL( options.colorHSL );
      } else {
        throw 'No starting color was provided. There must exist either options.colorHSL or options.startingColorHSL';
      }
    }

    if ( !options.endingColorHSL ) {

      if ( !options.affect || ![ 'h', 's', 'l', 'hue', 'saturation', 'lightness' ].include( options.affect ) ) {
        options.affect = 'h';
      }

      switch ( options.affect ) {

        case 'h':
        case 'hue':
          options.endingColorHSL = {
            h: options.startingColorHSL.h + 300,
            s: options.startingColorHSL.s,
            l: options.startingColorHSL.l
          };
          break;

        case 'saturation':
        case 's':
          let endS;

          if ( options.startingColorHSL.s > 0.5 ) {
            endS = 0;
          } else {
            endS = 1;
          }

          options.endingColorHSL = {
            h: options.startingColorHSL.h,
            s: endS,
            l: options.startingColorHSL.l
          };
          break;

        case 'lightness':
        case 'l':
          let endL;

          if ( options.startingColorHSL.l > 0.5 ) {
            endL = 0;
          } else {
            endL = 0.75;
          }

          options.endingColorHSL = {
            h: options.startingColorHSL.h,
            s: options.startingColorHSL.s,
            l: endL
          };
          break;
      }
    } else {
      options.endingColorHSL = Object.assign( {}, options.startingColorHSL, options.endingColorHSL );
    }

    return series.map( ( serie, index ) => {

      if ( !serie.setLineColor ) {
        throw `The serie ${ serie.getName() } does not implement the method \`startingColor\``;
      }

      let colorString;

      if ( seriesLength == 1 ) {

        colorString = this.buildHSLString( {
          h: options.startingColorHSL.h,
          s: options.startingColorHSL.s,
          l: options.startingColorHSL.l
        } );

      } else {

        colorString = this.buildHSLString( {
          h: options.startingColorHSL.h + index / ( seriesLength - 1 ) * ( options.endingColorHSL.h - options.startingColorHSL.h ),
          s: options.startingColorHSL.s + index / ( seriesLength - 1 ) * ( options.endingColorHSL.s - options.startingColorHSL.s ),
          l: options.startingColorHSL.l + index / ( seriesLength - 1 ) * ( options.endingColorHSL.l - options.startingColorHSL.l )
        } );
      }

      serie.setLineColor( colorString );

      if ( typeof callback == 'function' ) {
        callback( index, colorString );
      }

      return colorString;
    } );
  }
}

export default PluginMakeTracesDifferent;