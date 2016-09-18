import Plugin from './graph.plugin'

/**
 * @class PluginSerieLineDifference
 * @implements Plugin
 */
class PluginSerieLineDifference extends Plugin {

  constructor() {
    super( ...arguments );
  }

  static defaults() {
    return {

      positiveStyle: {

        fillColor: 'green',
        fillOpacity: 0.2,
        strokeWidth: 0
      },

      negativeStyle: {
        fillColor: 'red',
        fillOpacity: 0.2,
        strokeWidth: 0
      },

      from: 0,
      to: 0
    }
  }

  /**
   * Init method
   * @private
   */
  init( graph, options ) {
    this.graph = graph;

    this.pathsPositive = [];
    this.pathsNegative = [];

    this.positivePolyline = this.graph.newShape( 'polyline' ).draw();

    this.positivePolyline.
    setFillColor( this.options.positiveStyle.fillColor ).
    setFillOpacity( this.options.positiveStyle.fillOpacity ).
    setStrokeWidth( this.options.positiveStyle.strokeWidth ).
    applyStyle();

    this.negativePolyline = this.graph.newShape( 'polyline' ).draw();

    this.negativePolyline.
    setFillColor( this.options.negativeStyle.fillColor ).
    setFillOpacity( this.options.negativeStyle.fillOpacity ).
    setStrokeWidth( this.options.negativeStyle.strokeWidth ).
    applyStyle();
  }

  /**
   * Assigns the two series for the shape. Postive values are defined when ```serieTop``` is higher than ```serieBottom```.
   * @param {SerieLine} serieTop - The top serie
   * @param {SerieLine} serieBottom - The bottom serie
   */
  setSeries( serieTop, serieBottom ) {
    this.serie1 = serieTop;
    this.serie2 = serieBottom;
  }

  /**
   * Assigns the boundaries
   */
  setBoundaries( from, to ) {
    this.options.from = from;
    this.options.to = to;
  }

  /**
   * @returns the starting value used to draw the zone
   */
  getFrom() {
    return this.options.from;
  }

  /**
   * @returns the ending value used to draw the zone
   */
  getTo() {
    return this.options.to;
  }

  /**
   * Calculates and draws the zone series
   * @returns {Plugin} The current plugin instance
   */
  draw() {

    var self = this;
    var s1 = this.serie1.searchClosestValue( this.getFrom() );
    var i1, j1, i2, j2, y, y2, crossing;

    var top = [];
    var bottom = [];

    var bottomBroken;

    if ( !s1 ) {
      i1 = 0;
      j1 = 0;
    } else {

      i1 = s1.dataIndex;
      j1 = s1.xAfterIndex * 2;
    }

    y = this.interpolate( this.serie1, this.getFrom() );
    top.push( this.getFrom() ); // x 
    top.push( y ); // y

    y = this.interpolate( this.serie2, this.getFrom() );
    bottom.push( this.getFrom() ); // x 
    bottom.push( y ); // y

    var s2;

    var order;

    function nextSet() {

      if ( order === true ) {
        self.pathsPositive.push( [ top, bottom ] );
      } else if ( order === false ) {
        self.pathsNegative.push( [ top, bottom ] );
      }

      top = [];
      bottom = [];
      order = undefined;
    }
    var ended;
    for ( ; i1 < this.serie1.data.length; i1++ ) {

      for ( ; j1 < this.serie1.data[ i1 ].length; j1 += 2 ) {

        if ( this.serie1.data[ i1 ][ j1 ] > this.getTo() ) { // FINISHED !

          y = this.interpolate( this.serie1, this.getTo() );
          y2 = this.interpolate( this.serie2, this.getTo() );

          crossing = this.computeCrossing(
            top[ top.length - 2 ], top[ top.length - 1 ],
            this.getTo(), y,
            bottom[ bottom.length - 2 ], bottom[ bottom.length - 1 ],
            this.getTo(), y2
          );

          if ( crossing ) {

            top.push( crossing.x );
            top.push( crossing.y );
            bottom.push( crossing.x );
            bottom.push( crossing.y );
            nextSet();
            top.push( crossing.x );
            top.push( crossing.y );
            bottom.push( crossing.x );
            bottom.push( crossing.y );

            order = this.serie1.data[ i1 ][ j1 + 1 ] > this.serie2.data[ i2 ][ j2 + 1 ];
          }

          top.push( this.getTo() ); // x 
          top.push( y ); // y

          bottom.push( this.getTo() ); // x 
          bottom.push( y2 ); // y

          ended = true;
          break;
        }

        if ( !s2 ) {
          s2 = this.serie2.searchClosestValue( this.serie1.data[ i1 ][ j1 ] ); // Finds the first point

          if ( s2 ) {
            i2 = s2.dataIndex;
            j2 = s2.xBeforeIndex * 2;

            // TODO: Add here first points

            y = this.interpolate( this.serie2, this.serie1.data[ i1 ][ j1 ] );

            top.push( this.serie1.data[ i1 ][ j1 ] ); // x 
            top.push( this.serie1.data[ i1 ][ j1 + 1 ] ); // y

            bottom.push( this.serie1.data[ i1 ][ j1 ] ); // x 
            bottom.push( y ); // y

            order = this.serie1.data[ i1 ][ j1 + 1 ] > y;

          } else {
            continue;
          }
        }

        bottomBroken = false;

        crossing = this.computeCrossing(
          top[ top.length - 2 ], top[ top.length - 1 ],
          this.serie1.data[ i1 ][ j1 ], this.serie1.data[ i1 ][ j1 + 1 ],
          bottom[ bottom.length - 2 ], bottom[ bottom.length - 1 ],
          this.serie2.data[ i2 ][ j2 ], this.serie2.data[ i2 ][ j2 + 1 ]
        );

        if ( crossing ) {

          top.push( crossing.x );
          top.push( crossing.y );
          bottom.push( crossing.x );
          bottom.push( crossing.y );
          nextSet();
          top.push( crossing.x );
          top.push( crossing.y );
          bottom.push( crossing.x );
          bottom.push( crossing.y );

          order = this.serie1.data[ i1 ][ j1 + 1 ] > this.serie2.data[ i2 ][ j2 + 1 ];
        }

        while ( this.serie2.data[ i2 ][ j2 ] < this.serie1.data[ i1 ][ j1 ] ) {

          bottom.push( this.serie2.data[ i2 ][ j2 ] );
          bottom.push( this.serie2.data[ i2 ][ j2 + 1 ] );

          j2 += 2;
          if ( j2 == this.serie2.data[ i2 ].length ) {
            bottomBroken = this.serie2.data[ i2 ][ j2 - 2 ];
            i2++;
            j2 = 0;
            break;
          }

          crossing = this.computeCrossing(
            top[ top.length - 2 ], top[ top.length - 1 ],
            this.serie1.data[ i1 ][ j1 ], this.serie1.data[ i1 ][ j1 + 1 ],
            bottom[ bottom.length - 2 ], bottom[ bottom.length - 1 ],
            this.serie2.data[ i2 ][ j2 ], this.serie2.data[ i2 ][ j2 + 1 ]
          );

          if ( crossing ) {

            top.push( crossing.x );
            top.push( crossing.y );
            bottom.push( crossing.x );
            bottom.push( crossing.y );
            nextSet();
            top.push( crossing.x );
            top.push( crossing.y );
            bottom.push( crossing.x );
            bottom.push( crossing.y );

            order = this.serie1.data[ i1 ][ j1 + 1 ] > this.serie2.data[ i2 ][ j2 + 1 ];
          }

        }

        if ( bottomBroken === false ) {
          top.push( this.serie1.data[ i1 ][ j1 ] );
          top.push( this.serie1.data[ i1 ][ j1 + 1 ] );
        } else {

          top.push( bottomBroken );
          top.push( this.interpolate( this.serie1, bottomBroken ) );

          s2 = false;
          j1 -= 2;
          nextSet();
        }

      }

      if ( ended ) {
        nextSet();
        break;
      }
      // End of X

      if ( y = this.interpolate( this.serie2, top[ top.length - 2 ] ) ) {
        bottom.push( top[ top.length - 2 ] );
        bottom.push( y );
      }

      nextSet();

      j1 = 0;
      s2 = false;
    }

    var d = this.pathsPositive.reduce( makePaths, "" );
    this.positivePolyline.setPointsPx( d ).redraw();

    var d = this.pathsNegative.reduce( makePaths, "" );
    this.negativePolyline.setPointsPx( d ).redraw();

    //pathsBottom.map( function( map ) { makePaths( map, self.options.negativeStyle ); } );

    function makePaths( d, path ) {

      for ( var i = 0; i < path[ 0 ].length; i += 2 ) {
        if ( i == 0 ) {
          d += "M ";
        }
        d += " " + Math.round( self.serie1.getXAxis().getPx( path[ 0 ][ i ] ) ) + ", " + Math.round( self.serie1.getYAxis().getPx( path[ 0 ][ i + 1 ] ) );
        if ( i < path[ 0 ].length - 2 ) {
          d += " L ";
        }
      }

      for ( var i = path[ 1 ].length - 2; i >= 0; i -= 2 ) {
        d += " L " + Math.round( self.serie2.getXAxis().getPx( path[ 1 ][ i ] ) ) + ", " + Math.round( self.serie2.getYAxis().getPx( path[ 1 ][ i + 1 ] ) );
        if ( i == 0 ) {
          d += " z ";
        }
      }
      return d;
    }

  }

  /**
   * Finds the interpolated y value at point ```valX``` of the serie ```serie```
   * @returns {(Number|Boolean)} The interpolated y value is possible, ```false``` otherwise
   * @param {Serie} serie - The serie for which the y value should be computed
   * @param {Number} valX - The x value
   */
  interpolate( serie, valX ) {

    var value = serie.searchClosestValue( valX );

    if ( !value ) {
      return false;
    }

    if ( value.xMax == undefined ) {
      return value.yMin;
    }

    if ( value.xMin == undefined ) {
      return value.yMax;
    }

    var ratio = ( valX - value.xMin ) / ( value.xMax - value.xMin );
    return ( ( 1 - ratio ) * value.yMin + ratio * value.yMax );
  }

  /**
   * Finds the crossing point between two vector and returns it, or ```false``` if it is not within the x boundaries
   * @returns {(Object|Boolean)} An object containing the crossing point in the following format: ```{ x: xCrossing, y: yCrossing }``` or ```false``` if no crossing point can be found
   * @param {Number} x11 - First x point of the first vector
   * @param {Number} y11 - First y point of the first vector
   * @param {Number} x12 - Second x point of the first vector
   * @param {Number} y12 - Second y point of the first vector
   * @param {Number} x21 - First x point of the second vector
   * @param {Number} y21 - First y point of the second vector
   * @param {Number} y22 - Second x point of the second vector
   * @param {Number} y22 - Second y point of the second vector
   */
  computeCrossing( x11, y11, x12, y12, x21, y21, x22, y22 ) {
    var a1 = ( y12 - y11 ) / ( x12 - x11 );
    var a2 = ( y22 - y21 ) / ( x22 - x21 );

    var b1 = y12 - a1 * x12;
    var b2 = y22 - a2 * x22;

    if ( x11 == x12 ||  x21 == x22 ) {

      return false;
    }

    if ( a1 == a2 ) {
      return {
        x: x11,
        y1: y11,
        y2: y11
      };
    }

    var x = ( b1 - b2 ) / ( a2 - a1 )

    if ( x > x12 ||  x < x11 || x < x21 ||  x > x22 ) {
      return false;
    }

    return {
      x: x,
      y: a1 * x + b1
    };
  }

  /**
   * @returns The positive polyline
   */
  getPositivePolyline() {
    return this.positivePolyline;
  }

  /**
   * @returns The negative polyline
   */
  getNegativePolyline() {
    return this.negativePolyline;
  }

}

export default PluginSerieLineDifference;