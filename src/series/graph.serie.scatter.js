import Serie from './graph.serie.js'
import * as util from '../graph.util.js'
import ErrorBarMixin from '../mixins/graph.mixin.errorbars.js'

const defaults = {};

var type = "scatter";

/**
 * @static
 * @augments Serie
 * @example graph.newSerie( name, options, "scatter" );
 * @see Graph#newSerie
 */
class SerieScatter extends Serie {

  constructor( graph, name, options ) {

    super( ...arguments );
    this.id = Math.random() + Date.now();
    this.shapes = []; // Stores all shapes
    this.shown = true;
    this.data = [];

    this.shapesDetails = [];
    this.shapes = [];

    this._type = type;

    util.mapEventEmission( this.options, this );

    this._isMinOrMax = {
      x: {
        min: false,
        max: false
      },
      y: {
        min: false,
        max: false
      }
    };

    this.groupPoints = document.createElementNS( this.graph.ns, 'g' );
    this.groupMain = document.createElementNS( this.graph.ns, 'g' );

    this.additionalData = {};

    this.selectedStyleGeneral = {};
    this.selectedStyleModifiers = {};

    this.groupPoints.addEventListener( 'mouseover', ( e ) => {
      var id = parseInt( e.target.parentElement.getAttribute( 'data-shapeid' ) );
      this.emit( "mouseover", id, this.waveform.getX( id ), this.waveform.getY( id ) );
    } );

    this.groupPoints.addEventListener( 'mouseout', ( e ) => {
      var id = parseInt( e.target.parentElement.getAttribute( 'data-shapeid' ) );
      this.emit( "mouseout", id, this.waveform.getX( id ), this.waveform.getY( id ) );
    } );

    this.minX = Number.MAX_VALUE;
    this.minY = Number.MAX_VALUE;
    this.maxX = Number.MIN_VALUE;
    this.maxY = Number.MIN_VALUE;

    this.groupMain.appendChild( this.groupPoints );
    this.currentAction = false;

    if ( this.initExtended1 ) {
      this.initExtended1();
    }

    this.styles = {};
    this.styles.unselected = {};
    this.styles.selected = {};

    this.styles.unselected.default = {
      shape: 'circle',
      cx: 0,
      cy: 0,
      r: 3,
      stroke: 'transparent',
      fill: "black"
    };

    this.styles.selected.default = {
      shape: 'circle',
      cx: 0,
      cy: 0,
      r: 4,
      stroke: 'transparent',
      fill: "black"
    };

  }

  /**
   * Applies for x as the category axis
   * @example serie.setDataCategory( { x: "someName", y: Waveform } );
   */
  setDataCategory( data ) {

    let minY = +Infinity;
    let maxY = -Infinity;

    for ( let dataCategory of data ) {

      if ( data.y.getMaxY() > maxY ) {
        maxY = data.y.getMaxY();
      } else if ( data.y.getMinY() < minY ) {
        minY = data.y.getMinY();
      }
    }

    this.data = data;
    this.dataHasChanged();
    this.graph.updateDataMinMaxAxes();
    return this;
  }

  /**
   * Removes all DOM points
   * @private
   */
  empty() {

    while ( this.groupPoints.firstChild ) {
      this.groupPoints.removeChild( this.groupPoints.firstChild );
    }
  }

  getSymbolForLegend() {

    if ( this.symbol ) {
      return this.symbol;
    }

    var g = document.createElementNS( this.graph.ns, 'g' );
    g.setAttribute( 'data-shapeid', -1 );
    var shape = this.doShape( g, this.styles[ "unselected" ].default );

    var style = this.getStyle( "unselected", -1, true );

    for ( var i in style[ -1 ] ) {
      if ( i == "shape" ) {
        continue;
      }
      shape.setAttribute( i, style[ -1 ][ i ] );
    }

    return g;

  }

  /**
   * Sets style to the scatter points
   * First argument is the style applied by default to all points
   * Second argument is an array of modifiers that allows customization of any point of the scatter plot. Data for each elements of the array will augment <code>allStyles</code>, so be sure to reset the style if needed.
   * All parameters - except <code>shape</code> - will be set as parameters to the DOM element of the shape
   *
   * @example
   * var modifiers = [];
   * modifiers[ 20 ] = { shape: 'circle', r: 12, fill: 'rgba(0, 100, 255, 0.3)', stroke: 'rgb(0, 150, 255)' };
   * serie.setStyle( { shape: 'circle', r: 2, fill: 'rgba(255, 0, 0, 0.3)', stroke: 'rgb(255, 100, 0)' }, modifiers ); // Will modify scatter point n°20
   *
   * @param {Object} allStyles - The general style for all markers
   * @param {Object} [ modifiers ] - The general style for all markers
   * @param {String} [ selectionMode="unselected" ] - The selection mode to which this style corresponds. Default is unselected
   *
   */
  setStyle( all, modifiers, mode = "unselected" ) {

    if ( typeof modifiers == "string" ) {
      mode = modifiers;
      modifiers = false;
    }

    /*
    if( ! this.styles[ mode ] ) {

    }

    if ( mode !== "selected" && mode !== "unselected" ) {
      throw "Style mode is not correct. Should be selected or unselected";
    }
*/

    this.styles[ mode ] = this.styles[ mode ] ||  {};
    this.styles[ mode ].all = all;
    this.styles[ mode ].modifiers = modifiers;

    this.styleHasChanged( mode );

    return this;
  }

  /**
   * Redraws the serie
   * @private
   * @param {force} Boolean - Forces redraw even if the data hasn't changed
   */
  draw( force ) { // Serie redrawing

    if ( !force && !this.hasDataChanged() && !this.hasStyleChanged( 'unselected' ) ) {
      return;
    }

    var x,
      y,
      xpx,
      ypx,
      j = 0,
      k,
      m,
      currentLine,
      max;

    var isCategory = this.getXAxis().getType() == 'category';

    this._drawn = true;

    this.dataHasChanged( false );
    this.styleHasChanged( false );
    this.groupMain.removeChild( this.groupPoints );

    var keys = [];

    j = 0;
    k = 0;

    if ( this.hasErrors() ) {
      this.errorDrawInit();
    }

    if ( isCategory ) {

      let k = 0;

      for ( ; j < this.data.length; j++ ) {

        if ( !this.categoryIndices.hasOwnProperty( this.data[ j ].x ) ) {
          continue;
        }

        if ( this.error ) {
          //   this.errorAddPoint( j, position[ 0 ] + position[ 1 ] / 2, 0, this.getX( position[ 0 ] + position[ 1 ] / 2 ), ypx );
        }

        for ( var n = 0, l = this.data[ i ].y.getLength(); n < l; n++ ) {

          //let xpos = i / ( l - 1 ) * ( position[ 1 ] ) + position[ 0 ];

          ypx = this.getY( this.data[ i ].y.getY( n ) );
          xpx = this.getX( n / ( l - 1 ) * ( 0.8 / this.nbCategories ) + this.categoryIndices[ this.data[ j ].x ] + 0.1 / this.nbCategories );
          n++;

          this.shapesDetails[ k ] = this.shapesDetails[ k ] || [];
          this.shapesDetails[ k ][ 0 ] = xpx;
          this.shapesDetails[ k ][ 1 ] = ypx;
          keys.push( k );
          k++;
        }
      }
    } else {

      for ( ; j < this.waveform.getLength(); j++ ) {

        if (
          this.waveform.getX( j ) < this.getXAxis().getCurrentMin() ||
          this.waveform.getX( j ) > this.getXAxis().getCurrentMax() ||
          this.waveform.getY( j ) < this.getYAxis().getCurrentMin() ||
          this.waveform.getY( j ) > this.getYAxis().getCurrentMax()
        ) {

          if ( this.shapes[ j ] ) {
            this.shapes[ j ].setAttribute( 'display', 'none' );
          }
          continue;
        }

        if ( this.shapes[ j ] ) {
          this.shapes[ j ].setAttribute( 'display', 'initial' );
        }

        xpx = this.getX( this.waveform.getX( j ) );
        ypx = this.getY( this.waveform.getY( j ) );

        if ( this.hasErrors() ) {
          this.errorAddPoint( j, this.waveform.getX( j ), this.waveform.getY( j ), xpx, ypx );
        }

        this.shapesDetails[ j ] = this.shapesDetails[ j ] || [];
        this.shapesDetails[ j ][ 0 ] = xpx;
        this.shapesDetails[ j ][ 1 ] = ypx;
        keys.push( j );

        //this.shapes[ j / 2 ] = this.shapes[ j / 2 ] ||  undefined;
      }
    }

    if ( this.hasErrors() ) {
      this.errorDraw();
    }

    // This will automatically create the shapes
    this.applyStyle( "unselected", keys );

    this.groupMain.appendChild( this.groupPoints );
  }

  _addPoint( xpx, ypx, k ) {

    var g = document.createElementNS( this.graph.ns, 'g' );
    g.setAttribute( 'transform', 'translate(' + xpx + ', ' + ypx + ')' );
    g.setAttribute( 'data-shapeid', k );

    if ( this.extraStyle && this.extraStyle[ k ] ) {

      shape = this.doShape( g, this.extraStyle[ k ] );

    } else if ( this.stdStylePerso ) {

      shape = this.doShape( g, this.stdStylePerso );

    } else {

      shape = this.doShape( g, this.stdStyle );
    }

    this.shapes[ k ] = shape;
    this.groupPoints.appendChild( g );
  }

  doShape( group, shape ) {
    var el = document.createElementNS( this.graph.ns, shape.shape );
    group.appendChild( el );
    return el;
  }

  getStyle( selection, index, noSetPosition ) {

    var selection = selection || 'unselected';
    var indices;

    var styles = {};

    if ( typeof index == "number" ) {
      indices = [ index ];
    } else if ( Array.isArray( index ) ) {
      indices = index;
    }

    var shape, index, modifier, style, j; // loop variables
    var styleAll;

    if ( this.styles[ selection ].all !== undefined ) {

      styleAll = this.styles[ selection ].all;

      if ( typeof styleAll == "function" ) {

        styleAll = styleAll();

      } else if ( styleAll === false ) {

        styleAll = {};

      }
    }

    var i = 0,
      l = indices.length;

    for ( ; i < l; i++ ) {

      index = indices[ i ];
      shape = this.shapes[ index ];

      if ( ( modifier = this.styles[ selection ].modifiers ) && ( typeof modifier == "function" || modifier[  index ] ) ) {

        if ( typeof modifier == "function" ) {

          style = modifier( index, shape );

        } else if ( modifier[  index ] ) {

          style = modifier[ index ];

        }

        Object.assign( style, styleAll, style );

      } else if ( styleAll !== undefined ) {

        style = styleAll;

      } else {

        style = this.styles[ selection ].default;

      }

      if ( !shape ) { // Shape doesn't exist, let's create it

        var g = document.createElementNS( this.graph.ns, 'g' );
        g.setAttribute( 'data-shapeid', index );
        this.shapes[ index ] = this.doShape( g, style );
        this.groupPoints.appendChild( g );
        shape = this.shapes[ index ];
      }

      if ( !noSetPosition ) {
        shape.parentNode.setAttribute( 'transform', 'translate(' + this.shapesDetails[ index ][ 0 ] + ', ' + this.shapesDetails[ index ][ 1 ] + ')' );
      }

      styles[ index ] = style;
    }

    return styles;
  }

  applyStyle( selection, index, noSetPosition ) {

    var i, j;
    var styles = this.getStyle( selection, index, noSetPosition );

    for ( i in styles ) {

      for ( j in styles[ i ] ) {

        if ( j !== "shape" ) {

          if ( styles[ i ][ j ] ) {

            this.shapes[ i ].setAttribute( j, styles[ i ][ j ] );

          } else {

            this.shapes[ i ].removeAttribute( j );

          }

        }

      }

    }

  }

  unselectPoint( index ) {
    this.selectPoint( index, false );
  }

  selectPoint( index, setOn, selectionType ) {

    if ( this.shapesDetails[ index ][ 2 ] && this.shapesDetails[ index ][ 2 ] == selectionType ) {
      return;
    }

    if ( typeof setOn == "string" ) {
      selectionType = setOn;
      setOn = undefined;
    }

    if ( Array.isArray( index ) ) {
      return this.selectPoints( index );
    }

    if ( this.shapes[ index ] && this.shapesDetails[ index ] ) {

      if ( ( this.shapesDetails[ index ][ 2 ] || setOn === false ) && setOn !== true ) {

        var selectionStyle = this.shapesDetails[ index ][ 2 ];
        this.shapesDetails[ index ][ 2 ] = false;

        var allStyles = this.getStyle( selectionStyle, index, true );
        for ( var i in allStyles[ index ] ) {
          this.shapes[ index ].removeAttribute( i );
        }

        this.applyStyle( "unselected", index, true );

      } else {

        selectionType = selectionType ||  "selected";
        this.shapesDetails[ index ][ 2 ] = selectionType;

        this.applyStyle( selectionType, index, true );

      }

    }

  }

  getUsedCategories() {

    if ( typeof this.data[ 0 ] == 'object' ) {
      return this.data.map( ( d ) => d.x );
    }

    return [];
  }

}

util.mix( SerieScatter, ErrorBarMixin );

export default SerieScatter;