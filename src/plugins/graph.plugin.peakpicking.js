import * as util from '../graph.util.js'
import Plugin from './graph.plugin.js'

/**
 * @extends Plugin
 */
class PluginSelectScatter extends Plugin {

  constructor() {
    super( ...arguments );
  }

  static defaults() {

    return {
      peakNumber: 4,
      peakMinDistance: 10,
      formatFunction: false
    };
  }

  init() {

    this.peaks = this.peaks || [];

    for ( var n = 0, m = this.options.peakNumber; n < m; n++ ) {

      var shape = this.graph.newShape( {

        type: 'label',
        label: {
          text: "",
          position: {
            x: 0
          },
          anchor: 'middle',

        },

        selectable: true,

        shapeOptions: {
          minPosY: 15
        }

      } );

      shape.draw();
      
      this.peaks.push( shape );
    }

  }

  setSerie( serie ) {

    super.setSerie( serie );

    this.peaks.map( ( peak ) => {
      
      peak.setSerie( this.serie );
    } );
  }





  }


this.detectedPeaks = [];
    this.lastYPeakPicking = false;

    if ( this.options.autoPeakPicking ) {
  detectPeaks( x, y ) {

    if ( !this.options.autoPeakPicking ) {
      return;
    }

    if ( !this.options.lineToZero ) {

      if ( !this.lastYPeakPicking ) {

        this.lastYPeakPicking = [ y, x ];

      } else {

        if ( ( y >= this.lastYPeakPicking[ 0 ] && this.lookForMaxima ) ||  ( y <= this.lastYPeakPicking[ 0 ] && this.lookForMinima ) ) {

          this.lastYPeakPicking = [ y, x ]

        } else if ( ( y < this.lastYPeakPicking[ 0 ] && this.lookForMaxima ) ||  ( y > this.lastYPeakPicking[ 0 ] && this.lookForMinima ) ) {

          if ( this.lookForMinima ) {
            this.lookForMinima = false;
            this.lookForMaxima = true;

          } else {

            this.lookForMinima = true;
            this.lookForMaxima = false;

            this.detectedPeaks.push( this.lastYPeakPicking );
            this.lastYPeakPicking = false;
          }

          this.lastYPeakPicking = [ y, x ];

        }
      }

    } else {
      this.detectedPeaks.push( [ y, x ] );
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

    hidePeakPicking( this );
  }

  /**
   * Shows the automatic peak picking (see the autoPeakPicking option)
   * @memberof SerieLine
   */
  showPeakPicking( unlock ) {

    if ( this._hidePeakPickingLocked && !unlock ) {
      return;
    }

    showPeakPicking( this );
  }

  killPeakPicking() {

    if ( this.picks ) {
      for ( var i = 0, l = this.picks.length; i < l; i++ ) {
        this.picks[ i ].kill();
      }
    }
  }



function drawMarkerXY( graph, family, x, y, markerDom ) {

  if ( !family ) {
    return;
  }

  if ( graph.options.markersIndependant ) {
    var dom = graph.getMarkerDomIndependant( graph.counter1, graph.counter2, family );
    var p = 'M ' + x + ' ' + y + ' ';
    p += family.markerPath + ' ';

    dom.setAttribute( 'd', p );
  }

  markerDom.path = markerDom.path ||  "";
  markerDom.path += 'M ' + x + ' ' + y + ' ';
  markerDom.path += family.markerPath + ' ';
}


  makePeakPicking() {

    var self = this;
    var ys = this.detectedPeaks;

    var x,
      px,
      passed = [],
      px,
      i = 0,
      l = ys.length,
      k, m, y,
      index;

    var selected = self.graph.selectedShapes.map( function( shape ) {
      return shape.getProp( 'xval' );
    } );

    ys.sort( function( a, b ) {
      return b[ 0 ] - a[ 0 ];
    } );

    m = 0;

    for ( ; i < l; i++ ) {

      x = ys[ i ][ 1 ];
      px = self.getX( x );
      k = 0;
      y = self.getY( ys[ i ][ 0 ] );

      if ( px < self.getXAxis().getMinPx() || px > self.getXAxis().getMaxPx() ) {
        continue;
      }

      if ( !self.options.autoPeakPickingAllowAllY && ( y > self.getYAxis().getMinPx() || y < self.getYAxis().getMaxPx() ) ) {

        continue;
      }

      // Distance check
      for ( ; k < passed.length; k++ ) {
        if ( Math.abs( passed[ k ] - px ) < self.options.autoPeakPickingMinDistance )  {
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

      if ( !self.picks[ m ] ) {
        return;
      }

      //console.log( this.getYAxis().getDataMax(), this.getYAxis().getCurrentMin(), y );
      //    self.picks[ m ].show();

      if ( this.getYAxis().getPx( ys[ i ][ 0 ] ) - 20 < 0 ) {

        self.picks[ m ].setLabelPosition( {
          x: x,
          y: "5px",
        } );

        self.picks[ m ].setLabelBaseline( 'hanging' );

      } else {

        self.picks[ m ].setLabelBaseline( 'no-change' );

        self.picks[ m ].setLabelPosition( {
          x: x,
          y: ys[ i ][ 0 ],
          dy: "-15px"
        } );

      }

      self.picks[ m ].setProp( 'xval', x );

      if ( self.options.autoPeakPickingFormat ) {

        self.picks[ m ].setLabelText( self.options.autoPeakPickingFormat.call( self.picks[ m ], x, m ) );
      } else {
        self.picks[ m ].setLabelText( String( Math.round( x * 1000 ) / 1000 ) );
      }

      self.picks[ m ].makeLabels();

      m++;
      while ( self.picks[ m ] && self.picks[ m ].isSelected() ) {
        m++;
      }

      if ( passed.length == self.options.autoPeakPickingNb ) {
        break;
      }
    }

  }
}


function hidePeakPicking( graph ) {

  if ( !graph.picks ) {
    return;
  }
  for ( var i = 0; i < graph.picks.length; i++ ) {
    graph.picks[ i ].hide();
  }

}

function showPeakPicking( graph ) {

  if ( !graph.picks ) {
    return;
  }

  for ( var i = 0; i < graph.picks.length; i++ ) {
    graph.picks[ i ].show();
  }
}
