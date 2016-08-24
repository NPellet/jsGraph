function brokenAxis( BaseAxis ) {
  return class AxisBroken extends BaseAxis {
    getNbTicksPrimary() {
      return this.options.nbTicksPrimary;
    }

    getNbTicksSecondary() {
      return this.options.nbTicksSecondary;
    }

    getBreakingSpacing() {
      return this.options.breakingSpacing || 5;
    }

    // [ [ 0, 10 ], [ 50, 100 ] ]
    setBrokenRanges( ranges ) {
      this.ranges = [];
      this._broken = true;
      var
        self = this,
        i = 0,
        l = ranges.length,
        total = 0;

      ranges.map( function( range ) {
        total += range[ 1 ] - range[ 0 ];
      } );

      ranges.map( function( range ) {

        self.ranges.push( {

          ratio: ( range[ 1 ] - range[ 0 ] ) / total,
          diff: range[ 1 ] - range[ 0 ],
          min: range[ 0 ],
          max: range[ 1 ],
          minPx: undefined,
          maxPx: undefined

        } );
      } );

      self.totalValRanges = total;
    }

    drawLinearTicksWrapper() {

      var nbIntervals = this.ranges.length - 1,
        availableDrawingPxs = ( this.maxPx - this.minPx ) - nbIntervals * this.getBreakingSpacing(),
        nbTicksPrimary = this.getNbTicksPrimary();

      var ticksPrimary = this.getUnitPerTick( availableDrawingPxs, nbTicksPrimary, this.totalValRanges );
      var nbSecondaryTicks = this.secondaryTicks();

      // We need to get here the width of the ticks to display the axis properly, with the correct shift
      return this.drawTicks( ticksPrimary, nbSecondaryTicks );
    }

    setTickLabelRatio( tickRatio ) {
      this.options.ticklabelratio = tickRatio;
    }

    drawTicks( primary, secondary ) {

      var self = this;
      var unitPerTick = primary[ 0 ];
      var minPx = this.getMinPx();
      var maxPx = this.getMaxPx();
      var last = minPx;
      var nbIntervals = this.ranges.length - 1;
      var availableDrawingPxs = ( this.getMaxPx() - this.getMinPx() ) - nbIntervals * this.getBreakingSpacing() * ( self.isFlipped() ? -1 : 1 );

      this.resetTicks();

      this.ranges.map( function( range, index ) {

        range.minPx = index == 0 ? minPx : last + self.getBreakingSpacing() * ( self.isFlipped() ? -1 : 1 );
        range.maxPx = range.minPx + availableDrawingPxs * range.ratio;

        last = range.maxPx;

        if ( index > 0 ) {
          if ( !range.brokenMin ) {
            range.brokenMin = self.createBrokenLine( range );
            self.group.appendChild( range.brokenMin );
          }
          self.placeBrokenLine( range, range.brokenMin, range.minPx );
        }

        if ( index < self.ranges.length - 1 ) {
          if ( !range.brokenMax ) {
            range.brokenMax = self.createBrokenLine( range );
            self.group.appendChild( range.brokenMax );
          }
          self.placeBrokenLine( range, range.brokenMax, range.maxPx );
        }

        var min = range.min,
          max = range.max,
          secondaryIncr,
          incrTick,
          subIncrTick,
          loop = 0,
          loop2 = 0;

        if ( secondary ) {
          secondaryIncr = unitPerTick / secondary;
        }

        incrTick = Math.floor( min / unitPerTick ) * unitPerTick;

        while ( incrTick < max ) {

          if ( secondary ) {
            subIncrTick = incrTick + secondaryIncr;
            while ( subIncrTick < incrTick + unitPerTick ) {

              if ( subIncrTick < min || subIncrTick > max ) {
                subIncrTick += secondaryIncr;
                continue;
              }

              self.drawTick( subIncrTick, false, Math.abs( subIncrTick - incrTick - unitPerTick / 2 ) < 1e-4 ? 3 : 2 );
              subIncrTick += secondaryIncr;
            }
          }

          if ( incrTick < min || incrTick > max ) {
            incrTick += primary[ 0 ];
            continue;
          }

          self.drawTick( incrTick, true, 4 );
          incrTick += primary[ 0 ];
        }
      } );

      this.widthHeightTick = this.getMaxSizeTick();
      return this.widthHeightTick;
    }

    secondaryTicks() {
      return this.options.nbTicksSecondary;
    }

    drawLogTicks() {
      return 0;
    }

    getPx( value ) {
      return this.getPos( value );
    }

    getPos( value ) {

      for ( var i = 0, l = this.ranges.length; i < l; i++ ) {
        if ( value <= this.ranges[ i ].max && value >= this.ranges[ i ].min ) {
          return ( value - this.ranges[ i ].min ) / ( this.ranges[ i ].diff ) * ( this.ranges[ i ].maxPx - this.ranges[ i ].minPx ) + this.ranges[ i ].minPx
        }
      }
    }

    getRelPx( value ) {
      return ( value / this.getCurrentInterval() ) * ( this.getMaxPx() - this.getMinPx() );
    }

    getRelVal( px ) {
      return px / ( ( this.maxPx - this.minPx ) - nbIntervals * this.getBreakingSpacing() ) * this.totalValRanges;
    }

    getVal( px ) {

      for ( var i = 0, l = this.ranges.length; i < l; i++ ) {
        if ( px <= this.ranges[ i ].maxPx && px >= this.ranges[ i ].minPx ) {
          return ( px - this.ranges[ i ].minPx ) / ( this.ranges[ i ].maxPx - this.ranges[ i ].minPx ) * ( this.ranges[ i ].max - this.ranges[ i ].min ) + this.ranges[ i ].min
        }
      }
    }

    sign( v ) {
      return v > 0 ? 1 : -1;
    }

    getBoundary( inRangeOf, value ) {

      for ( var i = 0, l = this.ranges.length; i < l; i++ ) {
        if ( inRangeOf <= this.ranges[ i ].max && inRangeOf >= this.ranges[ i ].min ) {
          // This range
          if ( value > this.ranges[ i ].max ) {
            return this.ranges[ i ].max;
          }

          return this.ranges[ i ].min;

          //return Math.abs( value - this.ranges[ i ].min ) / ( this.ranges[ i ].max - this.ranges[ i ].min );
        }
      }
    }

    getInRange( inRangeOf, value ) {
      for ( var i = 0, l = this.ranges.length; i < l; i++ ) {
        if ( inRangeOf <= this.ranges[ i ].max && inRangeOf >= this.ranges[ i ].min ) {
          // This range
          return ( value - this.ranges[ i ].min ) / ( this.ranges[ i ].diff ) * ( this.ranges[ i ].maxPx - this.ranges[ i ].minPx ) + this.ranges[ i ].minPx;

          return;
        }
      }

    }

    getRange( value ) {
      for ( var i = 0, l = this.ranges.length; i < l; i++ ) {
        if ( value <= this.ranges[ i ].max && value >= this.ranges[ i ].min ) {
          return [ i, ( value - this.ranges[ i ].min ) / ( this.ranges[ i ].diff ) * ( this.ranges[ i ].maxPx - this.ranges[ i ].minPx ) + this.ranges[ i ].minPx ]
        }
      }

      return [ undefined, undefined ];
    }
  }
}

export default brokenAxis;