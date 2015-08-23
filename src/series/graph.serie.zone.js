"use strict";

define( [ './graph.serie' ], function( GraphSerieNonInstanciable ) {

  /** 
   * @class SerieZone
   * @static
   * @augments Serie
   * @example graph.newSerie( name, options, "scatter" );
   * @see Graph#newSerie
   */
  var GraphSerieZone = function() {}

  $.extend( GraphSerieZone.prototype, GraphSerieNonInstanciable.prototype, {

    /**
     * @name SerieZoneDefaultOptions
     * @object
     * @static
     * @param {String} fillColor - The color to fill the zone with
     * @param {String} lineColor - The line color
     * @param {String} lineWidth - The line width (in px)
     */
    defaults: {
      fillColor: 'rgba( 0, 0, 0, 0.1 )',
      lineColor: 'rgba( 0, 0, 0, 1 )',
      lineWidth: '1px',
    },

    init: function( graph, name, options ) {

      var self = this;

      this.graph = graph;
      this.name = name;

      this.id = Math.random() + Date.now();

      this.shown = true;
      this.options = $.extend( true, {}, GraphSerieZone.prototype.defaults, options );
      this.data = [];

      this.groupZones = document.createElementNS( this.graph.ns, 'g' );
      this.groupMain = document.createElementNS( this.graph.ns, 'g' );

      this.lineZone = document.createElementNS( this.graph.ns, 'path' );
      this.lineZone.setAttribute( 'stroke', 'black' );
      this.lineZone.setAttribute( 'stroke-width', '1px' );

      this.additionalData = {};

      this.minX = Number.MAX_VALUE;
      this.minY = Number.MAX_VALUE;
      this.maxX = Number.MIN_VALUE;
      this.maxY = Number.MIN_VALUE;

      this.groupMain.appendChild( this.groupZones );

      this.groupZones.appendChild( this.lineZone );

      this.currentAction = false;

      if ( this.initExtended1 ) {
        this.initExtended1();
      }

    },

    /**
     *	Possible data types
     *	[100, 0.145, 101, 0.152, 102, 0.153]
     *	[[100, 0.145, 101, 0.152], [104, 0.175, 106, 0.188]]
     *	[[100, 0.145], [101, 0.152], [102, 0.153], [...]]
     *	[{ x: 100, dx: 1, y: [0.145, 0.152, 0.153]}]
     *
     *	Converts every data type to a 1D array
     */
    // Should be handled properly by the default setData method
    setData: function( data, arg, type ) {

      var z = 0,
        x,
        dx,
        arg = arg || "2D",
        type = type || 'float',
        arr,
        total = 0,
        continuous;

      if ( !data instanceof Array ) {
        return;
      }

      var length;

      if ( data instanceof Array && !( data[ 0 ] instanceof Array ) ) { // [100, 103, 102, 2143, ...]
        arg = "1D";
        length = data.length * 1.5;

        if ( !( data[ 1 ] instanceof Array ) ) {
          arg = "1D_flat";
          length = data.length * 1;
        }

      } else {

        if ( data instanceof Array && !( data[ 0 ][ 1 ] instanceof Array ) ) { // [100, 103, 102, 2143, ...]
          arg = "2D_flat";
          length = data.length * 3;
        } else {
          arg = "2D";
          length = data.length * 3;
        }
      }

      arr = this._addData( type, length );

      z = 0;

      for ( var j = 0, l = data.length; j < l; j++ ) {

        if ( arg == "2D" ||  arg == "2D_flat" ) {

          arr[ z ] = ( data[ j ][ 0 ] );
          this._checkX( arr[ z ] );
          z++;

          if ( arg == "2D" ) {

            arr[ z ] = ( data[ j ][ 1 ][ 0 ] );
            this._checkY( arr[ z ] );
            z++;
            total++;

            arr[ z ] = ( data[ j ][ 1 ][ 1 ] );
            this._checkY( arr[ z ] );
            z++;
            total++;

          } else {

            arr[ z ] = ( data[ j ][ 1 ] );
            this._checkY( arr[ z ] );
            z++;
            total++;

            arr[ z ] = ( data[ j ][ 2 ] );
            this._checkY( arr[ z ] );
            z++;
            total++;
          }

        } else if ( arg == "1D_flat" ) { // 1D Array

          if ( j % 3 == 0 ) {
            arr[ z ] = data[ j ];
            this._checkX( arr[ z ] );
            z++;
            total++;

            continue;
          }

          arr[ z ] = data[ j ];
          this._checkY( arr[ z ] );
          z++;
          total++;

        } else {

          if ( j % 2 == 0 ) {
            arr[ z ] = data[ j ];
            this._checkX( arr[ z ] );
            z++;
            total++;
            continue;
          }

          arr[ z ] = data[ j ][ 0 ];
          this_checkY( arr[ z ] );
          z++;
          total++;

          arr[ z ] = data[ j ][ 1 ];
          this_checkY( arr[ z ] );
          z++;
          total++;
        }
      }

      this.graph.updateDataMinMaxAxes();
      this.data = arr;

      this.dataHasChanged();

      return this;
    },

    _addData: function( type, howmany ) {

      switch ( type ) {
        case 'int':
          var size = howmany * 4; // 4 byte per number (32 bits)
          break;
        case 'float':
          var size = howmany * 8; // 4 byte per number (64 bits)
          break;
      }

      var arr = new ArrayBuffer( size );

      switch ( type ) {
        case 'int':
          return new Int32Array( arr );
          break;

        default:
        case 'float':
          return new Float64Array( arr );
          break;
      }
    },

    /**
     * Removes all the dom concerning this serie from the drawing zone
     * @memberof SerieZone.prototype
     */
    empty: function() {

      while ( this.group.firstChild ) {
        this.group.removeChild( this.group.firstChild );
      }
    },

    /**
     * Redraws the serie
     * @private
     * @memberof SerieZone.prototype
     *
     * @param {force} Boolean - Forces redraw even if the data hasn't changed
     */
    draw: function( force ) { // Serie redrawing

      if ( force || this.hasDataChanged() ) {

        var x,
          y,
          xpx,
          ypx1,
          ypx2,
          j = 0,
          k,
          m,
          currentLine,
          max,
          self = this;

        this._drawn = true;

        this.groupMain.removeChild( this.groupZones );

        var totalLength = this.data.length / 2;

        j = 0, k = 0, m = this.data.length;

        var error;
        var pathError = "";

        var pathTop = "";
        var pathBottom = "";

        var lineTop = [];
        var lineBottom = [];

        var buffer;

        for ( ; j < m; j += 3 ) {

          xpx = this.getX( this.data[ j ] );
          ypx1 = this.getY( this.data[ j + 1 ] );
          ypx2 = this.getY( this.data[ j + 2 ] );

          if ( xpx < 0 ) {
            buffer = [ xpx, ypx1, ypx2 ]
            continue;
          }

          if ( buffer ) {

            lineTop.push( [ xpx, Math.max( ypx1, ypx2 ) ] );
            lineBottom.push( [ xpx, Math.min( ypx1, ypx2 ) ] );

            buffer = false;
            k++;
          }

          if ( ypx2 > ypx1 ) {
            lineTop.push( [ xpx, ypx1 ] );
            lineBottom.push( [ xpx, ypx2 ] );
          } else {
            lineTop.push( [ xpx, ypx2 ] );
            lineBottom.push( [ xpx, ypx1 ] );
          }

          if ( xpx > this.getXAxis().getMaxPx() ) {
            break;
          }
        }

        lineBottom.reverse();

        if ( lineTop.length > 0 && lineBottom.length > 0 ) {
          this.lineZone.setAttribute( 'd', "M " + lineTop[ 0 ] + " L " + lineTop.join( " L " ) + " L " + lineBottom.join( " L " ) + " z" );
        }

        this.groupMain.appendChild( this.groupZones );

      }

      if ( this.hasStyleChanged( this.selectionType ) ) {
        this.applyLineStyle( this.lineZone );
      }

    },

    /**
     * Applies the computed style to the DOM element fed as a parameter
     * @private
     * @memberof SerieZone.prototype
     *
     * @param {SVGLineElement} line - The line to which the style has to be applied to
     */
    applyLineStyle: function( line ) {

      line.setAttribute( 'stroke', this.getLineColor() );
      line.setAttribute( 'stroke-width', this.getLineWidth() );
      line.setAttribute( 'fill', this.getFillColor() );

      this.styleHasChanged( false );
    },

    /**
     * Sets the line width
     * @memberof SerieZone.prototype
     *
     * @param {Number} width - The line width
     * @returns {SerieZone} - The current serie
     */
    setLineWidth: function( width ) {
      this.options.lineWidth = width;
      this.styleHasChanged();
      return this;
    },

    /**
     * Gets the line width
     * @memberof SerieZone.prototype
     *
     * @returns {Number} - The line width
     */
    getLineWidth: function() {
      return this.options.lineWidth;
    },

    /**
     * Sets the line color
     * @memberof SerieZone.prototype
     *
     * @param {String} color - The line color
     * @returns {SerieZone} - The current serie
     */
    setLineColor: function( color ) {
      this.options.lineColor = color;
      this.styleHasChanged();
      return this;
    },

    /**
     * Gets the line width
     * @memberof SerieZone.prototype
     *
     * @returns {Number} - The line width
     */
    getLineColor: function() {
      return this.options.lineColor;
    },

    /**
     * Sets the fill color
     * @memberof SerieZone.prototype
     *
     * @param {Number} width - The line width
     * @returns {Number} - The line width
     */
    setFillColor: function( color ) {
      this.options.fillColor = color;
      this.styleHasChanged();
      return this;
    },

    /**
     * Gets the fill color
     * @memberof SerieZone.prototype
     *
     * @returns {Number} - The fill color
     */
    getFillColor: function() {
      return this.options.fillColor;
    },

  } );

  return GraphSerieZone;
} );