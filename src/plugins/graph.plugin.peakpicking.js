import * as util from '../graph.util.js';

import Plugin from './graph.plugin.js';

/*
  What is it ?
    It is a plugin for automatic peak detection on a line serie

  How to use ?
    Basic usage:

    let graph = new Graph("dom", {
      plugins: {
        'peakPicking': {}
      }
      }
    );

    let wv = Graph.newWaveform();
    wv.setData( [ 1, 2, 1, 2, 1, 2, 1, 2, 1, 2 ] );
    let s = graph.newSerie("serie").setWaveform( wv ).autoAxis();

    graph.getPlugin('peakPicking').setSerie( s );
    graph.draw();
*/

/**
 * @extends Plugin
 */
class PluginPeakPicking extends Plugin {
  constructor() {
    super( ...arguments );
  }

  static
  default () {
    return {
      autoPeakPicking: false,
      autoPeakPickingNb: 4,
      autoPeakPickingMinDistance: 10,
      autoPeakPickingFormat: false,
      autoPeakPickingAllowAllY: false
    };
  }

  init( graph, options ) {
    super.init( graph, options );
    this.picks = [];

    for ( var n = 0, m = this.options.autoPeakPickingNb; n < m; n++ ) {
      var shape = this.graph.newShape( {
        type: 'label',
        label: {
          text: '',
          position: {
            x: 0
          },
          anchor: 'middle'
        },

        selectable: true,

        shapeOptions: {
          minPosY: 15
        }
      } );

      shape.draw();

      this.picks.push( shape );
    }
  }

  setSerie( serie ) {
    this.serie = serie;

    this.picks.map( ( pick ) => {
      pick.show();
    } );
  }

  serieRemoved( serie ) {
    if ( this.serie == serie ) {
      this.picks.map( ( pick ) => {
        pick.hide();
      } );
    }
  }

  preDraw() {
    if ( !this.serie ) {
      return;
    }

    this.detectedPeaks = [];
    this.lastYPeakPicking = false;
  }

  postDraw() {
    if ( !this.serie ) {
      return;
    }
    let lookForMaxima = true;
    let lookForMinima = false;
    let lastYPeakPicking;
    let peaks = [];

    let waveform = this.serie.getWaveform();

    if ( !waveform ) {
      throw 'The serie must have a waveform for the peak picking to work';
    }

    let length = waveform.getLength(),
      i = 0,
      y;

    for ( ; i < length; i++ ) {
      y = waveform.getY( i );

      if ( this.serie.options.lineToZero ) {
        peaks.push( [ waveform.getX( i ), y ] );
        continue;
      }

      if ( !lastYPeakPicking ) {
        lastYPeakPicking = [ waveform.getX( i ), y ];
        continue;
      }

      if (
        ( y >= lastYPeakPicking[ 1 ] && lookForMaxima ) ||
        ( y <= lastYPeakPicking[ 1 ] && lookForMinima )
      ) {
        lastYPeakPicking = [ waveform.getX( i ), y ];
      } else if (
        ( y < lastYPeakPicking[ 1 ] && lookForMaxima ) ||
        ( y > lastYPeakPicking[ 1 ] && lookForMinima )
      ) {
        if ( lookForMinima ) {
          lookForMinima = false;
          lookForMaxima = true;
        } else {
          lookForMinima = true;
          lookForMaxima = false;

          peaks.push( lastYPeakPicking );
          lastYPeakPicking = false;
        }

        lastYPeakPicking = [ waveform.getX( i ), y ];
      }
    }

    var ys = peaks;
    var x,
      px,
      passed = [],
      px,
      l = ys.length,
      k,
      m,
      index;

    i = 0;

    var selected = this.graph.selectedShapes.map( function( shape ) {
      return shape.getProp( 'xval' );
    } );

    ys.sort( function( a, b ) {
      return b[ 1 ] - a[ 1 ];
    } );

    m = 0;

    for ( ; i < l; i++ ) {
      x = ys[ i ][ 0 ];
      px = this.serie.getX( x );
      k = 0;
      y = this.serie.getY( ys[ i ][ 1 ] );

      if (
        px < this.serie.getXAxis().getMinPx() ||
        px > this.serie.getXAxis().getMaxPx()
      ) {
        continue;
      }

      if ( !this.options.autoPeakPickingAllowAllY &&
        ( y > this.serie.getYAxis().getMinPx() ||
          y < this.serie.getYAxis().getMaxPx() )
      ) {
        continue;
      }

      // Distance check
      for ( ; k < passed.length; k++ ) {
        if (
          Math.abs( passed[ k ] - px ) < this.options.autoPeakPickingMinDistance
        ) {
          break;
        }
      }
      if ( k < passed.length ) {
        continue;
      }

      // Distance check end

      // If the retained one has already been selected somewhere, continue;
      if ( ( index = selected.indexOf( x ) ) > -1 ) {
        passed.push( px );
        continue;
      }

      if ( !this.picks[ m ] ) {
        return;
      }

      //    this.picks[ m ].show();

      if ( this.serie.getYAxis().getPx( ys[ i ][ 1 ] ) - 20 < 0 ) {
        this.picks[ m ].setLabelPosition( {
          x: x,
          y: '5px'
        } );

        this.picks[ m ].setLabelBaseline( 'hanging' );
      } else {
        this.picks[ m ].setLabelBaseline( 'no-change' );

        this.picks[ m ].setLabelPosition( {
          x: x,
          y: ys[ i ][ 1 ],
          dy: '-15px'
        } );
      }

      this.picks[ m ].setProp( 'xval', x );

      if ( this.options.autoPeakPickingFormat ) {
        this.picks[ m ].setLabelText(
          this.options.autoPeakPickingFormat.call( this.picks[ m ], x, m )
        );
      } else {
        this.picks[ m ].setLabelText( String( Math.round( x * 1000 ) / 1000 ) );
      }

      this.picks[ m ].makeLabels();

      m++;
      while ( this.picks[ m ] && this.picks[ m ].isSelected() ) {
        m++;
      }

      if ( passed.length == this.options.autoPeakPickingNb ) {
        break;
      }
    }
  }

  /**
   * Hides the automatic peak picking (see the autoPeakPicking option)
   * @memberof SerieLine
   */
  hidePeakPicking( lock ) {
    if ( !this._hidePeakPickingLocked ) {
      this._hidePeakPickingLocked = lock;
    }

    if ( !this.picks ) {
      return;
    }
    for ( var i = 0; i < this.picks.length; i++ ) {
      this.picks[ i ].hide();
    }
  }

  /**
   * Shows the automatic peak picking (see the autoPeakPicking option)
   * @memberof SerieLine
   */
  showPeakPicking( unlock ) {
    if ( this._hidePeakPickingLocked && !unlock ) {
      return;
    }

    if ( !this.picks ) {
      return;
    }

    for ( var i = 0; i < this.picks.length; i++ ) {
      this.picks[ i ].show();
    }
  }

  killPeakPicking() {
    if ( this.picks ) {
      for ( var i = 0, l = this.picks.length; i < l; i++ ) {
        this.picks[ i ].kill();
      }
    }
  }

  getSerie() {
    return this.serie;
  }
}

export default PluginPeakPicking;