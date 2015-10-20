define( [], function() {

  "use strict";

  /** 
   * Positionning class
   * @class Position
   */
  var Position = function( x, y, dx, dy ) {

    if ( !x instanceof Number && x instanceof Object ) {
      this.x = x.x;
      this.y = x.y;
      this.dx = x.dx;
      this.dy = x.dy;
    } else {
      this.x = x;
      this.y = y;
    }
  };

  Position.prototype.compute = function( graph, xAxis, yAxis, serie, relativeTo ) {

    if ( !graph || !xAxis || !yAxis || !graph.hasXAxis || !graph.hasYAxis ) {
      this.graph.throw();
    }

    if ( !graph.hasXAxis( xAxis ) ) {
      graph.throw( "Graph does not contain the x axis that was used as a parameter" )
    }

    if ( !graph.hasYAxis( yAxis ) ) {
      graph.throw( "Graph does not contain the x axis that was used as a parameter" )
    }

    return this._compute();
  }

  Position.prototype._compute = function( graph, xAxis, yAxis, serie, relativeTo ) {

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

        var def = ( val !== undefined || relativeTo == undefined || relativeTo[ i ] == undefined ) ? pos[ i ] : ( relativeTo[ i ]._getPositionPx( relativeTo[ i ], true, axis, graph ) || 0 );

        if ( i == 'y' && relativeTo && relativeTo.x !== undefined && relativeTo.y == undefined ) {

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

  Position.prototype.getDeltaPx = function( value, axis ) {
    var v;
    if ( ( v = _parsePx( value ) ) !== false ) {
      return ( v ) + "px";
    } else {

      return ( axis.getRelPx( value ) ) + "px";
    }
  };

  Position.prototype.deltaPosition = function( ref, delta, axis ) {

    var refPx, deltaPx;

    if ( ( refPx = _parsePx( ref ) ) !== false ) {

      if ( ( deltaPx = _parsePx( delta ) ) !== false ) {
        return ( refPx + deltaPx ) + "px";
      } else {
        return ( refPx + axis.getRelPx( delta ) ) + "px";
      }
    } else {

      ref = this.getValPosition( ref, axis );

      if ( ( deltaPx = _parsePx( delta ) ) !== false ) {
        return ( ref + axis.getRelVal( deltaPx ) );
      } else {
        return ( ref + delta );
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

  Position.check = function( pos, graph ) {

    if ( pos instanceof Position ) {
      return pos;
    }

    return new Position( pos );

  }

  return Position;
} );