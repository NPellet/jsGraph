define( [ './graph.axis' ], function( GraphAxis ) {

  "use strict";

  var GraphYAxis = function( graph, leftright, options ) {

    this.init( graph, options );

    this.leftright = leftright;
    this.left = leftright == 'left';

  }

  $.extend( GraphYAxis.prototype, GraphAxis.prototype, {

    getAxisPosition: function() {
      var size = 0;

      if ( !this.options.display ) {
        return 0;
      }

      if ( this.options.allowedPxSerie && this.series.length > 0 )
        size = this.options.allowedPxSerie;
      return size;
    },

    getAxisWidthHeight: function() {
      return 15;
    },


    isX: function() { return false; },
    isY: function() { return true; },


    resetTicks: function() {
      this.longestTick = [ false, 0 ];
    },

    getMaxSizeTick: function() {

      return ( this.longestTick[ 0 ] ? this.longestTick[ 0 ].getComputedTextLength() : 0 ) + 10; //(this.left ? 10 : 0);
    },

    drawTick: function( value, label, scaling, options, forcedPos ) {
      var pos;

      var group = this.groupTicks,
        tickLabel,
        labelWidth = 0;

      if ( forcedPos !== undefined ) {
        pos = forcedPos;
      } else {
        pos = this.getPos( value );
      }

      if ( pos == undefined || isNaN( pos ) ) {
        return;
      }

      var tick = document.createElementNS( this.graph.ns, 'line' );
      tick.setAttribute( 'shape-rendering', 'crispEdges' );
      tick.setAttribute( 'y1', pos );
      tick.setAttribute( 'y2', pos );

      tick.setAttribute( 'x1', ( this.left ? 1 : -1 ) * this.tickPx1 * scaling );
      tick.setAttribute( 'x2', ( this.left ? 1 : -1 ) * this.tickPx2 * scaling );

      tick.setAttribute( 'stroke', 'black' );

      if ( label && this.options.primaryGrid )
        this.doGridLine( true, 0, this.graph.getDrawingWidth(), pos, pos );
      else if ( !label && this.options.secondaryGrid )
        this.doGridLine( false, 0, this.graph.getDrawingWidth(), pos, pos );

      this.groupTicks.appendChild( tick );

      if ( label ) {
        var groupLabel = this.groupTickLabels;
        tickLabel = document.createElementNS( this.graph.ns, 'text' );
        tickLabel.setAttribute( 'y', pos );
        tickLabel.setAttribute( 'x', this.left ? -10 : 10 );

        if ( this.left ) {
          tickLabel.setAttribute( 'text-anchor', 'end' );
        } else {
          tickLabel.setAttribute( 'text-anchor', 'start' );
        }
        tickLabel.style.dominantBaseline = 'central';

        this.setTickContent( tickLabel, value, options );

        this.groupTickLabels.appendChild( tickLabel );

        if ( String( tickLabel.textContent ).length >= this.longestTick[ 1 ] ) {
          this.longestTick[ 0 ] = tickLabel;
          this.longestTick[ 1 ] = String( tickLabel.textContent ).length;

        }
      }

      this.ticks.push( tick );
    },

    drawSpecifics: function() {
      // Place label correctly
      //this.label.setAttribute('x', (this.getMaxPx() - this.getMinPx()) / 2);
      this.label.setAttribute( 'transform', 'translate(' + ( ( this.left ? 1 : -1 ) * ( -this.widthHeightTick - 10 - 5 ) ) + ', ' + ( Math.abs( this.getMaxPx() - this.getMinPx() ) / 2 + Math.min( this.getMinPx(), this.getMaxPx() ) ) + ') rotate(-90)' );

      this.labelTspan.textContent = this.getLabel();

      if ( !this.left ) {
        this.labelTspan.style.dominantBaseline = 'hanging';
        this.expTspan.style.dominantBaseline = 'hanging';
        this.expTspanExp.style.dominantBaseline = 'hanging';
      }

      this.line.setAttribute( 'y1', this.getMinPx() );
      this.line.setAttribute( 'y2', this.getMaxPx() );
      this.line.setAttribute( 'x1', 0 );
      this.line.setAttribute( 'x2', 0 );
    },

    drawSeries: function() {
      if ( !this.shift )
        return;

      this.rectEvent.setAttribute( 'x', ( this.left ? -this.shift : 0 ) );
      this.rectEvent.setAttribute( 'width', this.totalDimension );
      this.rectEvent.setAttribute( 'y', Math.min( this.getMinPx(), this.getMaxPx() ) );
      this.rectEvent.setAttribute( 'height', Math.abs( this.getMinPx() - this.getMaxPx() ) );

      this.clipRect.setAttribute( 'x', -this.shift );
      this.clipRect.setAttribute( 'width', this.totalDimension );
      this.clipRect.setAttribute( 'y', Math.min( this.getMinPx(), this.getMaxPx() ) );
      this.clipRect.setAttribute( 'height', Math.abs( this.getMinPx() - this.getMaxPx() ) );

      for ( var i = 0, l = this.series.length; i < l; i++ ) { // These are the series on the axis itself !!
        this.series[ i ].draw();
      }

    },

    _setShift: function() {

      var xshift = this.floating ? this.getShift() : ( this.isLeft() ? this.getShift() : this.graph.getWidth() - this.graph.getPaddingRight() - this.graph.getPaddingLeft() - this.getShift() );
      this.group.setAttribute( 'transform', 'translate(' + xshift + ' 0)' );

    },

    isLeft: function() {
      return this.left;
    },

    isRight: function() {
      return !this.left;
    },

    isFlipped: function() {
      return !this.options.flipped;
    },

    _draw0Line: function( px ) {
      this._0line = document.createElementNS( this.graph.ns, 'line' );
      this._0line.setAttribute( 'y1', px );
      this._0line.setAttribute( 'y2', px );

      this._0line.setAttribute( 'x1', 0 );
      this._0line.setAttribute( 'x2', this.graph.getDrawingWidth() );

      this._0line.setAttribute( 'stroke', 'black' );
      this.groupGrids.appendChild( this._0line );
    },

    handleMouseMoveLocal: function( x, y, e ) {
      y -= this.graph.getPaddingTop();
      this.mouseVal = this.getVal( y );
    },

    // TODO: Get the min value as well
    scaleToFitAxis: function( axis, excludeSerie, start, end, min, max ) {
      //console.log( axis instanceof GraphAxis );
      if ( !axis ) {
        axis = this.graph.getXAxis();
      }

      if ( isNaN( start ) ) {
        start = axis.getActualMin();
      }

      if ( isNaN( end ) ) {
        end = axis.getActualMax();
      }

      if ( min === undefined ) {
        min = true;
      }

      if ( max === undefined ) {
        max = true;
      }

      if ( typeof excludeSerie == "number" ) {
        end = start;
        start = excludeSerie;
        excludeSerie = false;
      }

      var maxV = -Infinity,
        minV = Infinity,
        j = 0;

      for ( var i = 0, l = this.graph.series.length; i < l; i++ ) {

        if ( !this.graph.series[ i ].isShown() ) {
          continue;
        }

        if ( this.graph.series[ i ] == excludeSerie ) {
          continue;
        }

        if ( !( this.graph.series[ i ].getXAxis() == axis ) || ( this.graph.series[ i ].getYAxis() !== this ) ) {
          continue;
        }

        j++;
        maxV = Math.max( maxV, this.graph.series[ i ].getMax( start, end ) );
        minV = Math.min( minV, this.graph.series[ i ].getMin( start, end ) );
      }

      if ( j == 0 ) {

        this.setMinMaxToFitSeries(); // No point was found

      } else {

        // If we wanted originally to resize min and max. Otherwise we use the current value
        minV = min ? minV : this.getActualMin();
        maxV = max ? maxV : this.getActualMax();

        var interval = maxV - minV;

        minV -= ( this.options.axisDataSpacing.min * interval );
        maxV += ( this.options.axisDataSpacing.max * interval );

        this._doZoomVal( minV, maxV );
      }
    },

    isXY: function() {
      return 'y';
    }

  } );

  return GraphYAxis;

} );