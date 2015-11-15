define( [], function() {

  "use strict";

  /** 
   * Positionning class
   * @class Position
   */
  var Position = function( x, y, dx, dy ) {

    if ( !( x instanceof Number ) && x instanceof Object ) {
      this.x = x.x;
      this.y = x.y;
      this.dx = x.dx;
      this.dy = x.dy;
    } else {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
    }
  };

  Position.prototype.compute = function( graph, xAxis, yAxis, serie ) {

    if ( !graph || !xAxis || !yAxis || !graph.hasXAxis || !graph.hasYAxis ) {
      this.graph.throw();
    }

    if ( !graph.hasXAxis( xAxis ) ) {
      graph.throw( "Graph does not contain the x axis that was used as a parameter" )
    }

    if ( !graph.hasYAxis( yAxis ) ) {
      graph.throw( "Graph does not contain the x axis that was used as a parameter" )
    }

    return this._compute( graph, xAxis, yAxis, serie );
  }

  Position.prototype._compute = function( graph, xAxis, yAxis, serie ) {

    var relativeTo = this._relativeTo;
    if ( relativeTo ) {
      var relativeToComputed = relativeTo._compute( graph, xAxis, yAxis, serie );
    }

    var parsed,
      pos = {
        x: false,
        y: false
      };

    if ( !xAxis ) {
      xAxis = graph.getXAxis();
    }

    if ( !yAxis ) {
      yAxis = graph.getYAxis();
    }

    for ( var i in pos ) {

      var axis = i == 'x' ? xAxis : yAxis;
      var val = this[ i ];
      var dval = this[ "d" + i ];

      if ( val === undefined && ( ( dval !== undefined && relativeTo === undefined ) || relativeTo === undefined ) ) {

        if ( i == 'x' ) {

          if ( dval === undefined ) {
            continue;
          }

          pos[ i ] = relativeTo ? relativeTo[ i ] : axis.getPos( 0 );

        } else if ( this.x && serie ) {

          if ( _parsePx( this.x ) !== false ) {
            console.warn( "You have defined x in px and not y. Makes no sense. Returning 0 for y" );
            pos[ i ] = 0;
          } else {

            var closest = serie.searchClosestValue( this.x );

            if ( !closest ) {
              console.warn( "Could not find y position for x = " + ( this.x ) + " on serie \"" + serie.getName() + "\". Returning 0 for y." );
              pos[ i ] = 0;
            } else {
              pos[ i ] = serie.getY( closest.yMin );
            }
          }
        }

      } else if ( val !== undefined ) {

        pos[ i ] = this.getPx( val, axis );

      }

      if ( dval !== undefined ) {

        var def = ( val !== undefined || relativeToComputed == undefined || relativeToComputed[ i ] == undefined ) ? pos[ i ] : ( relativeToComputed[ i ] );

        if ( i == 'y' && relativeToComputed && relativeToComputed.x !== undefined && relativeToComputed.y == undefined ) {

          if ( !serie ) {
            throw "Error. No serie exists. Cannot find y value";
            return;
          }

          var closest = serie.searchClosestValue( relativeTo.x );
          if ( closest ) {
            def = serie.getY( closest.yMin );
          }

          //console.log( relativeTo.x, closest, serie.getY( closest.yMin ), def );
        }

        if ( ( parsed = _parsePx( dval ) ) !== false ) { // dx in px => val + 10px

          pos[ i ] = def + parsed; // return integer (will be interpreted as px)

        } else if ( parsed = this._parsePercent( dval ) ) {

          pos[ i ] = def + this._getPositionPx( parsed, true, axis, graph ); // returns xx%

        } else if ( axis ) {

          pos[ i ] = def + axis.getRelPx( dval ); // px + unittopx

        }
      }
    }

    return pos;
  };

  Position.prototype._getPositionPx = function( value, x, axis, graph ) {

    var parsed;

    if ( ( parsed = _parsePx( value ) ) !== false ) {
      return parsed; // return integer (will be interpreted as px)
    }

    if ( ( parsed = this._parsePercent( value ) ) !== false ) {

      return parsed / 100 * ( x ? graph.getDrawingWidth() : graph.getDrawingHeight() );

    } else if ( axis ) {

      return axis.getPos( value );
    }
  };

  Position.prototype._parsePercent = function( percent ) {
    if ( percent && percent.indexOf && percent.indexOf( '%' ) > -1 ) {
      return percent;
    }
    return false;
  };

  Position.getDeltaPx = function( value, axis ) {
    var v;
    if ( ( v = _parsePx( value ) ) !== false ) {
      return ( v ) + "px";
    } else {

      return ( axis.getRelPx( value ) ) + "px";
    }
  };

  Position.prototype.deltaPosition = function( mode, delta, axis ) {

    mode = mode == 'y' ? 'y' : 'x';
    var ref = this[ mode ],
      refd = this[  'd' + mode ],
      refPx,
      deltaPx;

    if ( ref !== undefined ) {
      if ( ( refPx = _parsePx( ref ) ) !== false ) {

        if ( ( deltaPx = _parsePx( delta ) ) !== false ) {
          this[ mode ] = ( refPx + deltaPx ) + "px";
        } else {
          this[ mode ] = ( refPx + axis.getRelPx( delta ) ) + "px";
        }
      } else {

        ref = this.getValPosition( ref, axis );

        if ( ( deltaPx = _parsePx( delta ) ) !== false ) {
          this[ mode ] = ( ref + axis.getRelVal( deltaPx ) );
        } else {
          this[ mode ] = ( ref + delta );
        }
      }
    } else if ( refd !== undefined ) {

      if ( mode == 'y' && ref === undefined && !this._relativeTo ) { // This means that the shape is placed by the x value. Therefore, the dy is only a stand-off.
        // Therefore, we do nothing
        return;
      }

      if ( ( refPx = _parsePx( refd ) ) !== false ) {

        if ( ( deltaPx = _parsePx( delta ) ) !== false ) {
          this[ 'd' + mode ] = ( refPx + deltaPx ) + "px";
        } else {
          this[ 'd' + mode ] = ( refPx + axis.getRelPx( delta ) ) + "px";
        }
      } else {

        refd = this.getValPosition( refd, axis );

        if ( ( deltaPx = _parsePx( delta ) ) !== false ) {
          this[ 'd' + mode ] = ( refd + axis.getRelVal( deltaPx ) );
        } else {
          this[ 'd' + mode ] = ( refd + delta );
        }
      }

    }
  };

  Position.prototype.getValPosition = function( rel, axis ) {

    if ( rel == 'max' ) {
      return axis.getMaxValue();
    }

    if ( rel == 'min' ) {
      return axis.getMinValue();
    }

    return rel;
  };

  Position.prototype.getPx = function( value, axis, rel ) {

    var parsed;

    if ( ( parsed = _parsePx( value ) ) !== false ) {

      return parsed; // return integer (will be interpreted as px)

    } else if ( parsed = this._parsePercent( value ) ) {

      return parsed; // returns xx%

    } else if ( axis ) {

      if ( value == "min" ) {

        return axis.getMinPx();

      } else if ( value == "max" ) {

        return axis.getMaxPx();

      } else if ( rel ) {

        return axis.getRelPx( value );
      } else {

        return axis.getPos( value );
      }
    }
  };

  Position.prototype.getPxRel = function( value, axis ) {
    return this.getPx( value, axis, true );
  };

  Position.prototype.relativeTo = function( pos ) {
    this._relativeTo = Position.check( pos );
    return this;
  };

  Position.check = function( pos ) {
    if ( pos instanceof Position ) {
      return pos;
    }
    return new Position( pos );
  }

  function _parsePx( px ) {
    if ( px && px.indexOf && px.indexOf( 'px' ) > -1 ) {
      return parseInt( px.replace( 'px', '' ) );
    }
    return false;
  };

  return Position;
} );