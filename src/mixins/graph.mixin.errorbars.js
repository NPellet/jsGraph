import * as util from '../graph.util.js';

var ErrorBarMixin = {
  /*
    doErrorDraw: function( orientation, error, originVal, originPx, xpx, ypx ) {

      if ( !( error instanceof Array ) ) {
        error = [ error ];
      }

      var functionName = orientation == 'y' ? 'getY' : 'getX';
      var bars = orientation == 'y' ? [ 'top', 'bottom' ] : [ 'left', 'right' ];
      var j;

      if ( isNaN( xpx ) || isNaN( ypx ) ) {
        return;
      }

      for ( var i = 0, l = error.length; i < l; i++ ) {

        if ( error[ i ] instanceof Array ) { // TOP

          j = bars[ 0 ];
          this.errorstyles[ i ].paths[ j ] += " M " + xpx + " " + ypx;
          this.errorstyles[ i ].paths[ j ] += this.makeError( orientation, i, this[ functionName ]( originVal + error[ i ][ 0 ] ), originPx, j );

          j = bars[ 1 ];
          this.errorstyles[ i ].paths[ j ] += " M " + xpx + " " + ypx;
          this.errorstyles[ i ].paths[ j ] += this.makeError( orientation, i, this[ functionName ]( originVal - error[ i ][ 1 ] ), originPx, j );

        } else {

          j = bars[ 0 ];

          this.errorstyles[ i ].paths[ j ] += " M " + xpx + " " + ypx;
          this.errorstyles[ i ].paths[ j ] += this.makeError( orientation, i, this[ functionName ]( originVal + error[ i ] ), originPx, j );
          j = bars[ 1 ];
          this.errorstyles[ i ].paths[ j ] += " M " + xpx + " " + ypx;
          this.errorstyles[ i ].paths[ j ] += this.makeError( orientation, i, this[ functionName ]( originVal - error[ i ] ), originPx, j );
        }
      }
    },
  */

  /*
    makeError: function( orientation, type, coord, origin, quadOrientation ) {

      var method;
      switch ( this.errorstyles[ level ].type ) {
        case 'bar':
          method = "makeBar";
          break;

        case 'box':
          method = "makeBox";
          break;
      }

      return this[ method + orientation.toUpperCase() ]( coord, origin, this.errorstyles[ level ][ quadOrientation ] );

    },*/

  makeBarY: function( coordY, origin, style ) {
    if ( !coordY || style === undefined ) {
      return;
    }
    var width = !util.isNumeric( style.width ) ? 10 : style.width;
    return ` V ${coordY} m -${width / 2} 0 h ${width} m -${width /
      2} 0 V ${origin} `;
  },

  makeBoxY: function( coordY, origin, style ) {
    if ( !coordY || style === undefined ) {
      return;
    }
    return ` m 5 0 V ${coordY} h -10 V ${origin} m 5 0 `;
  },

  makeBarX: function( coordX, origin, style ) {
    if ( !coordX || style === undefined ) {
      return;
    }
    var height = !util.isNumeric( style.width ) ? 10 : style.width;
    return ` H ${coordX} m 0 -${height / 2} v ${height} m 0 -${height /
      2} H ${origin} `;
  },

  makeBoxX: function( coordX, origin, style ) {
    if ( !coordX || style === undefined ) {
      return;
    }
    return ` v 5 H ${coordX} v -10 H ${origin} v 5 `;
  },
  /*
    check: function( index, valY, valX ) {

      var dx, dy;

      if ( ( this.getType() == Graph.SERIE_LINE || this.getType() == Graph.SERIE_SCATTER ) ) {

        if ( !( dx = this.data[ index * 2 ] ) || !( dy = this.data[ index * 2 + 1 ] ) ) { //
          return;
        }
      }

      if ( dx === undefined ) {
        return;
      }

      for ( var i = 0, l = valY.length; i < l; i++ ) {

        if ( Array.isArray( valY[ i ] ) ) {

          if ( !isNaN( valY[ i ][ 0 ] ) ) {
            this._checkY( dy + valY[ i ][ 0 ] );
          }

          if ( !isNaN( valY[ i ][ 1 ] ) ) {
            this._checkY( dy - valY[ i ][ 1 ] );
          }

        } else {

          if ( !isNaN( valY[ i ] ) ) {
            this._checkY( dy + valY[ i ] );
            this._checkY( dy - valY[ i ] );
          }
        }
      }

      for ( var i = 0, l = valX.length; i < l; i++ ) {

        if ( Array.isArray( valX[ i ] ) ) {

          if ( !isNaN( valX[ i ][ 0 ] ) ) {
            this._checkX( dx - valX[ i ][ 0 ] );
          }

          if ( !isNaN( valX[ i ][ 1 ] ) ) {
            this._checkX( dx + valX[ i ][ 1 ] );
          }

        } else {

          if ( !isNaN( valY[ i ] ) ) {
            this._checkX( dx - valX[ i ] );
            this._checkX( dx + valX[ i ] );
          }
        }
      }

    },
  */

  /**
   *
   *  @example serie.setErrorBarStyle( [ { type: 'bar', x: {} }, { type: 'box', top: { strokeColor: 'green', fillColor: 'olive' }, bottom: { strokeColor: 'red', fillColor: "#800000" }  } ] );
   */
  setErrorBarStyle: function( errorstyle ) {
    this.errorbarStyle = this._setErrorStyle( errorstyle );

    return this;
  },

  setErrorBoxStyle: function( errorstyle ) {
    this.errorboxStyle = this._setErrorStyle( errorstyle );
    return this;
  },

  _setErrorStyle( errorstyles = {} ) {
    var styles = [];
    var pairs = [
      [ 'y', 'top', 'bottom' ],
      [ 'x', 'left', 'right' ]
    ];

    var makePath = ( style ) => {
      style.dom = document.createElementNS( this.graph.ns, 'path' );
      style.dom.setAttribute( 'fill', style.fillColor || 'none' );
      style.dom.setAttribute( 'stroke', style.strokeColor || 'black' );
      style.dom.setAttribute( 'stroke-opacity', style.strokeOpacity || 1 );
      style.dom.setAttribute( 'fill-opacity', style.fillOpacity || 1 );
      style.dom.setAttribute( 'stroke-width', style.strokeWidth || 1 );

      this.groupMain.appendChild( style.dom );
    };
    // i is bar or box

    var styles = {};

    if ( typeof errorstyles == 'string' ) {
      errorstyles = {};
    }

    for ( var j = 0, l = pairs.length; j < l; j++ ) {
      if ( errorstyles.all ) {
        errorstyles[ pairs[ j ][ 1 ] ] = util.extend( true, {}, errorstyles.all );
        errorstyles[ pairs[ j ][ 2 ] ] = util.extend( true, {}, errorstyles.all );
      }

      if ( errorstyles[ pairs[ j ][ 0 ] ] ) {
        //.x, .y

        errorstyles[ pairs[ j ][ 1 ] ] = util.extend(
          true, {},
          errorstyles[ pairs[ j ][ 0 ] ]
        );
        errorstyles[ pairs[ j ][ 2 ] ] = util.extend(
          true, {},
          errorstyles[ pairs[ j ][ 0 ] ]
        );
      }

      for ( var k = 1; k <= 2; k++ ) {
        if ( errorstyles[ pairs[ j ][ k ] ] ) {
          styles[ pairs[ j ][ k ] ] = errorstyles[ pairs[ j ][ k ] ];
          makePath( styles[ pairs[ j ][ k ] ] );
        }
      }
    }
    return styles;
  },

  errorDrawInit: function() {
    var error;
    //  var pathError = "M 0 0 ";

    if ( this.errorboxStyle ) {
      this.errorboxStyle.paths = {
        top: '',
        bottom: '',
        left: '',
        right: ''
      };
    }

    if ( this.errorbarStyle ) {
      this.errorbarStyle.paths = {
        top: '',
        bottom: '',
        left: '',
        right: ''
      };
    }
  },

  errorAddPoint: function( index, dataX, dataY, xpx, ypx ) {
    /* eslint-disable no-cond-assign */
    let error;

    if ( this.errorbarStyle ) {
      if ( ( error = this.waveform.getErrorBarXBelow( index ) ) ) {
        this.errorbarStyle.paths.left += ` M ${xpx} ${ypx}`;
        this.errorbarStyle.paths.left += this.makeBarX(
          this.getX( dataX - error ),
          xpx,
          this.errorbarStyle.left
        );
      }

      if ( ( error = this.waveform.getErrorBarXAbove( index ) ) ) {
        this.errorbarStyle.paths.right += ` M ${xpx} ${ypx}`;
        this.errorbarStyle.paths.right += this.makeBarX(
          this.getX( dataX + error ),
          xpx,
          this.errorbarStyle.right
        );
      }

      if ( ( error = this.waveform.getErrorBarYBelow( index ) ) ) {
        this.errorbarStyle.paths.bottom += ` M ${xpx} ${ypx}`;
        this.errorbarStyle.paths.bottom += this.makeBarY(
          this.getY( dataY - error ),
          ypx,
          this.errorbarStyle.bottom
        );
      }

      if ( ( error = this.waveform.getErrorBarYAbove( index ) ) ) {
        this.errorbarStyle.paths.top += ` M ${xpx} ${ypx}`;
        this.errorbarStyle.paths.top += this.makeBarY(
          this.getY( dataY + error ),
          ypx,
          this.errorbarStyle.top
        );
      }
    }

    if ( this.errorboxStyle ) {
      if ( ( error = this.waveform.getErrorBoxXBelow( index ) ) ) {
        this.errorboxStyle.paths.left += ` M ${xpx} ${ypx}`;
        this.errorboxStyle.paths.left += this.makeBoxX(
          this.getX( dataX - error ),
          xpx,
          this.errorboxStyle.left
        );
      }

      if ( ( error = this.waveform.getErrorBoxXAbove( index ) ) ) {
        this.errorboxStyle.paths.right += ` M ${xpx} ${ypx}`;
        this.errorboxStyle.paths.right += this.makeBoxX(
          this.getX( dataX + error ),
          xpx,
          this.errorboxStyle.right
        );
      }

      if ( ( error = this.waveform.getErrorBoxYBelow( index ) ) ) {
        this.errorboxStyle.paths.bottom += ` M ${xpx} ${ypx}`;
        this.errorboxStyle.paths.bottom += this.makeBoxY(
          this.getY( dataY - error ),
          ypx,
          this.errorboxStyle.bottom
        );
      }

      if ( ( error = this.waveform.getErrorBoxYAbove( index ) ) ) {
        this.errorboxStyle.paths.top += ` M ${xpx} ${ypx}`;
        this.errorboxStyle.paths.top += this.makeBoxY(
          this.getY( dataY + error ),
          ypx,
          this.errorboxStyle.top
        );
      }
    }
    /* eslint-enable */
  },

  errorAddPointBarChart: function( j, posY, xpx, ypx ) {
    var error;
    if ( this.error && ( error = this.error[ j ] ) ) {
      this.doErrorDraw( 'y', error, posY, ypx, xpx, ypx );
    }
  },

  errorDraw: function() {
    if ( this.errorbarStyle ) {
      for ( var j in this.errorbarStyle.paths ) {
        if ( this.errorbarStyle[ j ] && this.errorbarStyle[ j ].dom ) {
          this.errorbarStyle[ j ].dom.setAttribute(
            'd',
            this.errorbarStyle.paths[ j ]
          );
        }
      }
    }

    if ( this.errorboxStyle ) {
      for ( var j in this.errorboxStyle.paths ) {
        if ( this.errorboxStyle[ j ] && this.errorboxStyle[ j ].dom ) {
          this.errorboxStyle[ j ].dom.setAttribute(
            'd',
            this.errorboxStyle.paths[ j ]
          );
        }
      }
    }
  }
};

export default ErrorBarMixin;