define( [ '../dependencies/eventEmitter/EventEmitter', '../graph.util' ], function( EventEmitter, util ) {


  var plugin = function() {};

  plugin.prototype = $.extend( plugin.prototype, EventEmitter.prototype, {

    init: function( graph, options ) {

      this._path = document.createElementNS( graph.ns, 'path' );

      util.setAttributeTo( this._path, {
        'display': 'none',
        'fill': 'rgba(0,0,0,0.1)',
        'stroke': 'rgba(0,0,0,1)',
        'shape-rendering': 'crispEdges',
        'x': 0,
        'y': 0,
        'height': 0,
        'width': 0,
        'd': ''
      } );

      this.options = options;
      this.graph = graph;

      graph.dom.appendChild( this._path );

    },

    setSerie: function( serie ) {
      this.serie = serie;
    },

    onMouseDown: function( graph, x, y, e, mute ) {

      if ( !this.serie ) {
        return;
      }

      this.path = 'M ' + x + ' ' + y + ' ';
      this.currentX = x;
      this.currentY = y;

      this.xs = [ this.serie.getXAxis().getVal( x - graph.getPaddingLeft() ) ];
      this.ys = [ this.serie.getYAxis().getVal( y - graph.getPaddingTop() ) ];
      this._path.setAttribute( 'd', '' );
      this._path.setAttribute( 'display', 'block' );

    },

    onMouseMove: function( graph, x, y, e, mute ) {

      if ( Math.pow( ( x - this.currentX ), 2 ) + Math.pow( ( y - this.currentY ), 2 ) > 25 ) {

        this.path += " L " + x + " " + y + " ";
        this.currentX = x;
        this.currentY = y;

        this.xs.push( this.serie.getXAxis().getVal( x - graph.getPaddingLeft() ) );
        this.ys.push( this.serie.getYAxis().getVal( y - graph.getPaddingTop() ) );

        this._path.setAttribute( 'd', this.path + " z" );

        this.findPoints();
      }
    },

    findPoints: function() {

      var data = this.serie.data;
      var selected = [];
      var counter = 0,
        j2;
      for ( var i = 0, l = data.length; i < l; i += 2 ) {

        counter = 0;
        for ( var j = 0, k = this.xs.length; j < k; j += 1 ) {

          if ( j == k - 1 ) {
            j2 = 0;
          } else {
            j2 = j + 1;
          }

          if ( ( ( this.ys[ j ] < data[ i + 1 ] && this.ys[ j2 ] > data[ i + 1 ] ) || ( this.ys[ j ] > data[ i + 1 ] && this.ys[ j2 ] < data[ i + 1 ] ) ) ) {

            if ( data[ i ] > ( ( data[ i + 1 ] - this.ys[ j ] ) / ( this.ys[ j2 ] - this.ys[ j ] ) ) * ( this.xs[ j2 ] - this.xs[ j ] ) + this.xs[ j ] ) {
              counter++;
            }
          }
        }

        if ( counter % 2 == 1 ) {
          selected.push( i / 2 );
          this.serie.selectPoint( i / 2, true, "selected" );
        } else {
          this.serie.unselectPoint( i / 2 );
        }

      }

      this.selected = selected;
      this.emit( "selectionProcess", selected );
    },

    onMouseUp: function( graph, x, y, e, mute ) {
      this._path.setAttribute( 'display', 'none' );
      this.emit( "selectionEnd", this.selected );
    },

    removeZone: function() {

    }
  } );

  return plugin;
} );