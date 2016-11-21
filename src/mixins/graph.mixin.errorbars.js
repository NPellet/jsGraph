import * as util from '../graph.util'

var ErrorBarMixin = {

  doErrorDraw: function( orientation, error, originVal, originPx, xpx, ypx ) {

    if ( !( error instanceof Array ) )  {
      error = [ error ];
    }

    var functionName = orientation == 'y' ? 'getY' : 'getX';
    var bars = orientation == 'y' ? [ 'top', 'bottom' ] : [ 'left', 'right' ];
    var j;

    if ( isNaN( xpx ) ||  isNaN( ypx ) ) {
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

  makeError: function( orientation, level, coord, origin, quadOrientation ) {

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

  },

  makeBarY: function( coordY, origin, style ) {
    if ( !coordY ||  !style ) {
      return;
    }
    var width = !util.isNumeric( style.width ) ? 10 : style.width;
    return " V " + coordY + " m -" + ( width / 2 ) + " 0 h " + ( width ) + " m -" + ( width / 2 ) + " 0 V " + origin + " ";
  },

  makeBoxY: function( coordY, origin, style ) {
    if ( !coordY ||  !style ) {
      return;
    }
    return " m 5 0 V " + coordY + " h -10 V " + origin + " m 5 0 ";
  },

  makeBarX: function( coordX, origin, style ) {
    if ( !coordX ||  !style ) {
      return;
    }
    var height = !util.isNumeric( style.width ) ? 10 : style.width;
    return " H " + coordX + " m 0 -" + ( height / 2 ) + " v " + ( height ) + " m 0 -" + ( height / 2 ) + " H " + origin + " ";
  },

  makeBoxX: function( coordX, origin, style ) {
    if ( !coordX ||  !style ) {
      return;
    }
    return " v 5 H " + coordX + " v -10 H " + origin + " v 5 ";
  },

  check: function( index, valY, valX ) {

    var dx, dy;

    if ( ( this.getType() == Graph.SERIE_LINE ||  this.getType() == Graph.SERIE_SCATTER ) ) {

      if ( !( dx = this.data[ index * 2 ] ) ||  !( dy = this.data[ index * 2 + 1 ] ) ) { //
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
  /**
   *  Sets the data error values
   */
  setDataError: function( error, noCheck ) {
    this.error = error;

    if ( !noCheck ) {
      for ( let i = 0, l = this.error.length; i < l; i++ ) {

        if ( this.error[ i ] ) {

          this.check( i, this.error[ i ][ 0 ], this.error[ i ][ 1 ] );

        }
      }
    }

    this.dataHasChanged();
    this.graph.updateDataMinMaxAxes();
    return this;
  },

  /**
   *
   *  @example serie.setErrorStyle( [ { type: 'bar', x: {} }, { type: 'box', top: { strokeColor: 'green', fillColor: 'olive' }, bottom: { strokeColor: 'red', fillColor: "#800000" }  } ] );
   */
  setErrorStyle: function( errorstyles ) {

    var self = this;

    errorstyles = errorstyles ||  [ 'box', 'bar' ];

    // Ensure array
    if ( !Array.isArray( errorstyles ) ) {
      errorstyles = [ errorstyles ];
    }

    var styles = [];
    var pairs = [
      [ 'y', 'top', 'bottom' ],
      [ 'x', 'left', 'right' ]
    ];

    function makePath( style ) {

      style.dom = document.createElementNS( self.graph.ns, 'path' );
      style.dom.setAttribute( 'fill', style.fillColor || 'none' );
      style.dom.setAttribute( 'stroke', style.strokeColor || 'black' );
      style.dom.setAttribute( 'stroke-opacity', style.strokeOpacity || 1 );
      style.dom.setAttribute( 'fill-opacity', style.fillOpacity || 1 );
      style.dom.setAttribute( 'stroke-width', style.strokeWidth || 1 );

      self.groupMain.appendChild( style.dom );
    }

    for ( var i = 0; i < errorstyles.length; i++ ) {
      // i is bar or box

      styles[ i ] = {};

      if ( typeof errorstyles[ i ] == "string" ) {

        errorstyles[ i ] = {
          type: errorstyles[ i ],
          y: {}
        };

      }

      styles[ i ].type = errorstyles[ i ].type;

      for ( var j = 0, l = pairs.length; j < l; j++ ) {

        if ( errorstyles[ i ].all ) {

          errorstyles[ i ][ pairs[ j ][ 1 ] ] = util.extend( true, {}, errorstyles[ i ].all );
          errorstyles[ i ][ pairs[ j ][ 2 ] ] = util.extend( true, {}, errorstyles[ i ].all );

        }

        if ( errorstyles[ i ][ pairs[ j ][ 0 ] ] ) { //.x, .y

          errorstyles[ i ][ pairs[ j ][ 1 ] ] = util.extend( true, {}, errorstyles[ i ][ pairs[ j ][ 0 ] ] );
          errorstyles[ i ][ pairs[ j ][ 2 ] ] = util.extend( true, {}, errorstyles[ i ][ pairs[ j ][ 0 ] ] );

        }

        for ( var k = 1; k <= 2; k++ ) {

          if ( errorstyles[ i ][ pairs[ j ][ k ] ] ) {

            styles[ i ][ pairs[ j ][ k ] ] = errorstyles[ i ][ pairs[ j ][ k ] ];
            makePath( styles[ i ][ pairs[ j ][ k ] ] );
          }
        }
      }
    }
    /*
          // None is defined
          if( ! errorstyles[ i ].top && ! errorstyles[ i ].bottom ) {

            styles[ i ].top = errorstyles[ i ];
            styles[ i ].top.dom = document.createElementNS( this.graph.ns, 'path' );
            styles[ i ].bottom = errorstyles[ i ];
            styles[ i ].bottom.dom = document.createElementNS( this.graph.ns, 'path' );

          } else if( errrostyles[ i ].top ) {

            styles[ i ].bottom = null; // No bottom displayed
            styles[ i ].top = errrostyles[ i ].top;
            styles[ i ].top.dom = document.createElementNS( this.graph.ns, 'path' );

          } else {

            styles[ i ].bottom = errorstyles[ i ].bottom;
            styles[ i ].bottom.dom = document.createElementNS( this.graph.ns, 'path' );
            styles[ i ].top = null;
          }
  */

    this.errorstyles = styles;

    return this;
  },

  errorDrawInit: function() {
    var error;
    //  var pathError = "M 0 0 ";

    if ( this.errorstyles ) {

      for ( var i = 0, l = this.errorstyles.length; i < l; i++ ) {

        this.errorstyles[ i ].paths = {
          top: "",
          bottom: "",
          left: "",
          right: ""
        };

      }

    }
  },

  errorAddPoint: function( j, dataX, dataY, xpx, ypx ) {

    var error;
    if ( this.error && ( error = this.error[ j / 2 ] ) ) {

      //    pathError += "M " + xpx + " " + ypx;

      if ( error[ 0 ] ) {
        this.doErrorDraw( 'y', error[ 0 ], dataY, ypx, xpx, ypx );
      }

      if ( error[ 1 ] ) {
        this.doErrorDraw( 'x', error[ 1 ], dataX, xpx, xpx, ypx );
      }

    }

  },

  errorAddPointBarChart: function( j, posY, xpx, ypx ) {
    var error;
    if ( this.error && ( error = this.error[ j ] ) ) {
      this.doErrorDraw( 'y', error, posY, ypx, xpx, ypx );
    }
  },

  errorDraw: function()  {

    if ( this.error && this.errorstyles ) {

      for ( var i = 0, l = this.errorstyles.length; i < l; i++ ) {

        for ( var j in this.errorstyles[ i ].paths ) {

          if ( this.errorstyles[ i ][ j ] && this.errorstyles[ i ][ j ].dom ) {
            this.errorstyles[ i ][ j ].dom.setAttribute( 'd', this.errorstyles[ i ].paths[ j ] );
          }
        }
      }
    }
  }

};

export default ErrorBarMixin;