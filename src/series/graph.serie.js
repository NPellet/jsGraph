import EventEmitter from '../dependencies/eventEmitter/EventEmitter'
import * as util from '../graph.util'

/**
 * Serie class to be extended
 * @static
 */
class Serie extends EventEmitter {

  constructor() {
    super( ...arguments );
  }

  /** 
   * Sets data to the serie
   * @memberof Serie
   * @param {(Object|Array|Array[])} data - The data of the serie
   * @param {Boolean} [ oneDimensional=false ] - In some cases you may need to force the 1D type. This is required when one uses an array or array to define the data (see examples)
   * @param {String} [ type=float ] - Specify the type of the data. Use <code>int</code> to save memory (half the amount of bytes allocated to the data).
   * @example serie.setData( [ [ x1, y1 ], [ x2, y2 ], ... ] );
   * @example serie.setData( [ x1, y1, x2, y2, ... ] ); // Faster
   * @example serie.setData( [ [ x1, y1, x2, y2, ..., xn, yn ] , [ xm, ym, x(m + 1), y(m + 1), ...] ], true ) // 1D array with a gap in the middle
   * @example serie.setData( { x: x0, dx: spacing, y: [ y1, y2, y3, y4 ] } ); // Data with equal x separation. Fastest way
   */
  setData( data, oneDimensional, type ) {

    function isArray( arr ) {
      var stringed = Object.prototype.toString.call( arr );
      return stringed === '[object Array]' || stringed === '[object Int16Array]' || stringed === '[object Int32Array]' || stringed === '[object Float32Array]' ||  stringed === '[object Float64Array]' ||  stringed === '[object Uint8Array]' || stringed === '[object Uint16Array]' || stringed === '[object Uint32Array]' || stringed === '[object Int8Array]';
    }

    var z = 0,
      x,
      dx,
      oneDimensional = oneDimensional || false,
      type = type || 'float',
      arr,
      total = 0,
      continuous;

    // In its current form, empty is a performance hindering method because it forces all the DOM to be cleared.
    // We shouldn't need that for the lines
    //this.empty();

    this.minX = Number.MAX_SAFE_INTEGER;
    this.maxX = Number.MIN_SAFE_INTEGER;
    this.minY = Number.MAX_SAFE_INTEGER;
    this.maxY = Number.MIN_SAFE_INTEGER;

    var isDataArray = isArray( data );

    // Single object
    var datas = [];

    if ( !isDataArray && typeof data == 'object' ) {
      data = [ data ];
    } else if ( isDataArray && !isArray( data[ 0 ] ) && typeof data[ 0 ] !== 'object' ) { // [100, 103, 102, 2143, ...]
      data = [ data ];
      oneDimensional = true;
    } else if ( isDataArray && isArray( data[ 0 ] ) && data[ 0 ].length > 2 ) {
      oneDimensional = true;
    } else if ( !isDataArray ) {
      util.throwError( "Data is not an array" );
      return;
    }

    // [[100, 0.145], [101, 0.152], [102, 0.153], [...]] ==> [[[100, 0.145], [101, 0.152], [102, 0.153], [...]]]
    var isData0Array = isArray( data[ 0 ] );

    var isData00Array = isArray( data[ 0 ][ 0 ] );

    if ( isData0Array && !oneDimensional && !isData00Array ) {
      data = [ data ];
    }
    if ( isData0Array ) {

      for ( var i = 0, k = data.length; i < k; i++ ) {

        arr = this._addData( type, !oneDimensional ? data[ i ].length * 2 : data[ i ].length );
        datas.push( arr );
        z = 0;

        for ( var j = 0, l = data[ i ].length; j < l; j++ ) {

          if ( !oneDimensional ) {
            arr[ z ] = ( data[ i ][ j ][ 0 ] );

            this._checkX( arr[ z ] );
            z++;
            arr[ z ] = ( data[ i ][ j ][ 1 ] );
            this._checkY( arr[ z ] );
            z++;
            total++;

          } else { // 1D Array
            arr[ z ] = data[ i ][ j ];
            this[ j % 2 == 0 ? '_checkX' : '_checkY' ]( arr[ z ] );

            z++;
            total += j % 2 ? 1 : 0;

          }
        }
      }

    } else if ( typeof data[ 0 ] == 'object' ) {

      if ( data[ 0 ].x ) {

        for ( var i = 0, l = data.length; i < l; i++ ) {

          var arr = this._addData( type, data[ i ].x.length * 2 );
          datas.push( arr );

          z = 0;
          for ( var j = 0, m = data[ 0 ].x.length; j < m; j++ ) { // Several piece of data together
            arr[ z ] = ( data[ i ].x[ j ] );
            z++;
            arr[ z ] = ( data[ i ].y[ j ] );
            z++;
            this._checkX( data[ i ].x[ j ] );
            this._checkY( data[ i ].y[ j ] );
            total++;
          }
        }

      } else {

        this.mode = 'x_equally_separated';

        var number = 0,
          numbers = [],
          datas = [],
          k = 0,
          o;

        if ( !data[ 0 ].y ) {
          console.log( data );
          util.throwError( "No y data" );
          return;
        }

        for ( var i = 0, l = data.length; i < l; i++ ) { // Several piece of data together
          number += data[ i ].y.length;
          continuous = ( i != 0 ) && ( !data[ i + 1 ] || data[ i ].x + data[ i ].dx * ( data[ i ].y.length ) == data[ i + 1 ].x );
          if ( !continuous ) {
            datas.push( this._addData( type, number ) );
            numbers.push( number );
            number = 0;
          }
        }

        this.xData = [];

        number = 0;
        k = 0;
        z = 0;

        for ( var i = 0, l = data.length; i < l; i++ ) {
          x = data[ i ].x;
          dx = data[ i ].dx;

          this.xData.push( {
            x: x,
            dx: dx
          } );

          o = data[ i ].y.length;
          this._checkX( x );
          this._checkX( x + dx * o );

          for ( var j = 0; j < o; j++ ) {
            /*datas[k][z] = (x + j * dx);
  						this._checkX(datas[k][z]);
  						z++;*/
            // 30 june 2014. To save memory I suggest that we do not add this stupid data.

            datas[ k ][ z ] = ( data[ i ].y[ j ] );
            this._checkY( datas[ k ][ z ] );
            z++;
            total++;

          }
          number += data[ i ].y.length;

          if ( numbers[ k ] == number ) {
            k++;
            number = 0;
            z = 0;
          }
        }
      }
    }

    // Determination of slots for low res spectrum
    var w = ( this.maxX - this.minX ) / this.graph.getDrawingWidth(),
      ws = [];

    var min = this.graph.getDrawingWidth() * 4;
    var max = total / 4;

    var min = this.graph.getDrawingWidth();
    var max = total;

    this.data = datas;

    if ( min > 0 ) {

      while ( min < max ) {
        ws.push( min );
        min *= 4;
      }

      this.slots = ws;

      if ( this.options.useSlots ) {

        this.calculateSlots();
      }
    }

    if ( this.isFlipped() ) {

      var maxX = this.maxX;
      var maxY = this.maxY;
      var minX = this.minX;
      var minY = this.minY;

      this.maxX = maxY;
      this.maxY = maxX;

      this.minX = minY;
      this.minY = minX;
    }

    this.dataHasChanged();
    this.graph.updateDataMinMaxAxes();
    return this;
  }

  _addData( type, howmany ) {

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
  }

  /**
   * Removes all the data from the serie, without redrawing
   * @returns {Serie} The current serie
   */
  clearData() {
    this.setData( [] );
    return this;
  }

  /**
   * Returns the data in its current form
   * @returns {Array.<(Float64Array|Int32Array)>} An array containing the data chunks. Has only one member if the data has no gaps
   * @memberof Serie
   */
  getData() {
    return this.data;
  }

  /**
   * Sets the options of the serie (no extension of default options)
   * @param {Object} options - The options of the serie
   * @memberof Serie
   */
  setOptions( options ) {
    this.options = options ||  {};
  }

  /**
   * Sets the options of the serie (no extension of default options)
   * @param {String} name - The option name
   * @param value - The option value
   * @memberof Serie
   * @example serie.setOption('selectableOnClick', true );
   */
  setOption( name, value ) {
    this.options[ name ] = value;
  }

  /**
   * Removes the serie from the graph. The method doesn't perform any axis autoscaling or repaint of the graph. This should be done manually.
   * @return {Serie} The current serie instance
   * @memberof Serie
   */
  kill( noLegendUpdate ) {

    this.graph.removeSerieFromDom( this );
    this.graph._removeSerie( this );

    if ( this.graph.legend && !noLegendUpdate ) {

      this.graph.legend.update();
    }

    this.graph = undefined;
    return this;
  }

  /**
   * Hides the serie
   * @memberof Serie
   * @param {Boolean} [ hideShapes = false ] - <code>true</code> to hide the shapes associated to the serie
   * @returns {Serie} The current serie
   */
  hide( hideShapes ) {
    this.hidden = true;
    this.groupMain.setAttribute( 'display', 'none' );

    this.getSymbolForLegend().setAttribute( 'opacity', 0.5 );
    this.getTextForLegend().setAttribute( 'opacity', 0.5 );

    this.hideImpl();

    if ( hideShapes ) {
      var shapes = this.graph.getShapesOfSerie( this );
      for ( var i = 0, l = shapes.length; i < l; i++ ) {
        shapes[ i ].hide();
      }
    }

    this.emit( "hide" );

    return this;
  }

  /**
   * Shows the serie
   * @memberof Serie
   * @param {Boolean} [showShapes=false] - <code>true</code> to show the shapes associated to the serie
   * @returns {Serie} The current serie
   */
  show( showShapes ) {
    this.hidden = false;
    this.groupMain.setAttribute( 'display', 'block' );

    this.getSymbolForLegend().setAttribute( 'opacity', 1 );
    this.getTextForLegend().setAttribute( 'opacity', 1 );

    this.showImpl();

    this.draw( true );

    if ( showShapes ) {
      var shapes = this.graph.getShapesOfSerie( this );
      for ( var i = 0, l = shapes.length; i < l; i++ ) {
        shapes[ i ].show();
      }
    }

    this.emit( "show" );

    return this;
  }

  hideImpl() {}
  showImpl() {}

  /**
   * Toggles the display of the serie (effectively, calls <code>.show()</code> and <code>.hide()</code> alternatively on each call)
   * @memberof Serie
   * @param {Boolean} [hideShapes=false] - <code>true</code> to hide the shapes associated to the serie
   * @returns {Serie} The current serie
   */
  toggleDisplay() {

    if ( !this.isShown() ) {
      this.show();
    } else {
      this.hide();
    }

    return this;
  }

  /**
   * Determines if the serie is currently visible
   * @memberof Serie
   * @returns {Boolean} The current visibility status of the serie
   */
  isShown() {
    return !this.hidden;
  }

  /**
   * Returns the x position of a certain value in pixels position, based on the serie's axis
   * @memberof Serie
   * @param {Number} val - Value to convert to pixels position
   * @returns {Number} The x position in px corresponding to the x value
   */
  getX( val ) {
    return ( val = this.getXAxis().getPx( val ) ) - val % 0.2;
  }

  /**
   * Returns the y position of a certain value in pixels position, based on the serie's axis
   * @memberof Serie
   * @param {Number} val - Value to convert to pixels position
   * @returns {Number} The y position in px corresponding to the y value
   */
  getY( val ) {
    return ( val = this.getYAxis().getPx( val ) ) - val % 0.2;
  }

  /**
   * Returns the selection state of the serie. Generic for most serie types
   * @memberof Serie
   * @returns {Boolean} <code>true</code> if the serie is selected, <code>false</code> otherwise
   */
  isSelected() {
    return this.selected || ( this.selectionType !== "unselected" );
  }

  _checkX( val ) {
    this.minX = Math.min( this.minX, val );
    this.maxX = Math.max( this.maxX, val );
  }

  _checkY( val ) {
    this.minY = Math.min( this.minY, val );
    this.maxY = Math.max( this.maxY, val );
  }

  /**
   * Getter for the serie name
   * @memberof Serie
   * @returns {String} The serie name
   */
  getName() {
    return this.name;
  }

  /* AXIS */

  /**
   * Assigns axes automatically, based on {@link Graph#getXAxis} and {@link Graph#getYAxis}.
   * @memberof Serie
   * @returns {Serie} The current serie
   */
  autoAxis() {

    if ( this.isFlipped() ) {
      this.setXAxis( this.graph.getYAxis() );
      this.setYAxis( this.graph.getXAxis() );
    } else {
      this.setXAxis( this.graph.getXAxis() );
      this.setYAxis( this.graph.getYAxis() );
    }

    // After axes have been assigned, the graph axes should update their min/max
    this.graph.updateDataMinMaxAxes();
    return this;
  }

  /**
   * Assigns an x axis to the serie
   * @memberof Serie
   * @param {Axis|Number} axis - The axis to use as an x axis. If an integer, {@link Graph#getXAxis} or {@link Graph#getYAxis} will be used
   * @returns {Serie} The current serie
   * @example serie.setXAxis( graph.getTopAxis( 1 ) ); // Assigns the second top axis to the serie
   */
  setXAxis( axis ) {

    if ( typeof axis == "number" ) {
      this.xaxis = this.isFlipped() ? this.graph.getYAxis( axis ) : this.graph.getXAxis( axis );
    } else {
      this.xaxis = axis;
    }

    this.graph.updateDataMinMaxAxes();

    return this;
  }

  /**
   * Assigns an y axis to the serie
   * @memberof Serie
   * @param {Axis|Number} axis - The axis to use as an y axis. If an integer, {@link Graph#getXAxis} or {@link Graph#getYAxis} will be used
   * @returns {Serie} The current serie
   * @example serie.setYAxis( graph.getLeftAxis( 4 ) ); // Assigns the 5th left axis to the serie
   */
  setYAxis( axis ) {
    if ( typeof axis == "number" ) {
      this.xaxis = this.isFlipped() ? this.graph.getXAxis( axis ) : this.graph.getYAxis( axis );
    } else {
      this.yaxis = axis;
    }

    this.graph.updateDataMinMaxAxes();

    return this;
  }

  /**
   * Assigns two axes to the serie
   * @param {GraphAxis} axis1 - First axis to assign to the serie (x or y)
   * @param {GraphAxis} axis2 - Second axis to assign to the serie (y or x)
   * @returns {Serie} The current serie
   * @memberof Serie
   */
  setAxes() {

    for ( var i = 0; i < 2; i++ ) {

      if ( arguments[ i ] ) {
        this[ ( arguments[ i ].isX() ? 'setXAxis' : 'setYAxis' ) ]( arguments[ i ] );
      }
    }

    return this;
  }

  /**
   * @returns {GraphAxis} The x axis assigned to the serie
   * @memberof Serie
   */
  getXAxis() {
    return this.xaxis;
  }

  /**
   * @returns {GraphAxis} The y axis assigned to the serie
   * @memberof Serie
   */
  getYAxis() {
    return this.yaxis;
  }

  /* */

  /* DATA MIN MAX */

  /**
   * @returns {Number} Lowest x value of the serie's data
   * @memberof Serie
   */
  getMinX() {
    return this.minX;
  }

  /**
   * @returns {Number} Highest x value of the serie's data
   * @memberof Serie
   */
  getMaxX() {
    return this.maxX;
  }

  /**
   * @returns {Number} Lowest y value of the serie's data
   * @memberof Serie
   */
  getMinY() {
    return this.minY;
  }

  /**
   * @returns {Number} Highest y value of the serie's data
   * @memberof Serie
   */
  getMaxY() {
    return this.maxY;
  }

  /**
   * Computes and returns a line SVG element with the same line style as the serie, or width 20px
   * @returns {SVGElement}
   * @memberof Serie
   */
  getSymbolForLegend() {

    if ( !this.lineForLegend ) {

      var line = document.createElementNS( this.graph.ns, 'line' );
      this.applyLineStyle( line );

      line.setAttribute( 'x1', 5 );
      line.setAttribute( 'x2', 25 );
      line.setAttribute( 'y1', 0 );
      line.setAttribute( 'y2', 0 );

      line.setAttribute( 'cursor', 'pointer' );

      this.lineForLegend = line;
    }

    return this.lineForLegend;

  }

  /**
   * Explicitely applies the line style to the SVG element returned by {@link Serie#getSymbolForLegend}
   * @see Serie#getSymbolForLegend
   * @returns {SVGElement}
   * @memberof Serie
   */
  setLegendSymbolStyle() {
    this.applyLineStyle( this.getSymbolForLegend() );
  }

  /**
   * @alias Serie#setLegendSymbolStyle
   * @memberof Serie
   */
  updateStyle() {
    this.setLegendSymbolStyle();
    this.graph.updateLegend();
  }

  /**
   * Computes and returns a text SVG element with the label of the serie as a text, translated by 35px
   * @returns {SVGElement}
   * @memberof Serie
   * @see Serie#getLabel
   */
  getTextForLegend() {

    if ( !this.textForLegend ) {

      var text = document.createElementNS( this.graph.ns, 'text' );
      text.setAttribute( 'cursor', 'pointer' );
      text.textContent = this.getLabel();

      this.textForLegend = text;
    }

    return this.textForLegend;
  }

  /**
   * @returns {Number} The current index of the serie
   * @memberof Serie
   */
  getIndex() {
    return this.graph.series.indexOf( this );
  }

  /**
   * @returns {String} The label or, alternatively - the name of the serie
   * @memberof Serie
   */
  getLabel() {
    return this.options.label || this.name;
  }

  /**
   * Sets the label of the serie. Note that this does not automatically updates the legend
   * @param {String} label - The new label of the serie
   * @returns {Serie} The current serie
   * @memberof Serie
   */
  setLabel( label ) {
    this.options.label = label;

    if ( this.textForLegend ) {
      this.textForLegend.textContent = label;
    }

    this.graph.requireLegendUpdate();
    return this;
  }

  /* FLIP */

  /**
   * Assigns the flipping value of the serie. A flipped serie will have inverted axes. However this method does not automatically re-assigns the axes of the serie. Call {@link Serie#autoAxis} to re-assign the axes automatically, or any other axis setting method.
   * @param {Boolean} [flipped=false] - <code>true</code> to flip the serie
   * @returns {Serie} The current serie
   * @memberof Serie
   */
  setFlip( flipped ) {
    this.options.flip = flipped;
    return this;
  }

  /**
   * @returns {Boolean} <code>true</code> if the serie is flipped, <code>false</code> otherwise
   * @memberof Serie
   */
  getFlip() {
    return this.options.flip;
  }

  /**
   * @alias Serie#getFlip
   * @memberof Serie
   */
  isFlipped() {
    return this.options.flip;
  }

  /**
   * Sets the layer onto which the serie should be displayed. This method does not trigger a graph redraw.
   * @memberof Serie
   * @param {Number} layerIndex=1 - The index of the layer into which the serie will be drawn
   * @returns {Serie} The current serie
   */
  setLayer( layerIndex ) {
    this.options.layer = parseInt( layerIndex ) ||  1;
    return this;
  }

  /**
   * Sets the layer onto which the serie should be displayed. This method does not trigger a graph redraw.
   * @memberof Serie
   * @returns {Nunber} The index of the layer into which the serie will be drawn
   */
  getLayer() {
    return this.options.layer ||  1;
  }

  setStyle( style, selectionType = "unselected" ) {
    //console.log( style, selectionType );
    this.styles[ selectionType ] = style;
    this.styleHasChanged( selectionType );

  }

  /**
   * Notifies jsGraph that the style of the serie has changed and needs to be redrawn on the next repaint
   * @param {String} selectionType - The selection for which the style may have changed
   * @returns {Serie} The current serie
   * @memberof Serie
   */
  styleHasChanged( selectionType = "unselected" ) {
    this._changedStyles = this._changedStyles || {};

    if ( selectionType === false ) {
      for ( var i in this._changedStyles ) {
        this._changedStyles[ i ] = false;
      }

    } else {
      this._changedStyles[ selectionType ||  "unselected" ] = true;
    }

    this.graph.requireLegendUpdate();
    return this;
  }

  /**
   * Checks if the style has changed for a selection type
   * @param {String} selectionType - The selection for which the style may have changed
   * @returns {Boolean} <code>true</code> if the style has changed
   * @private
   * @memberof Serie
   */
  hasStyleChanged( selectionType ) {
    this._changedStyles = this._changedStyles || {};
    return this._changedStyles[ selectionType ||  "unselected" ];
  }

  /**
   * Notifies jsGraph that the data of the serie has changed
   * @returns {Serie} The current serie
   * @memberof Serie
   */
  dataHasChanged( arg ) {
    this._dataHasChanged = arg === undefined || arg;
    return this;
  }

  /**
   * Checks if the data has changed
   * @returns {Boolean} <code>true</code> if the data has changed
   * @private
   * @memberof Serie
   */
  hasDataChanged() {
    return this._dataHasChanged;
  }

  /**
   * Set a key/value arbitrary information to the serie. It is particularly useful if you have this serie has a reference through an event for instance, and you want to retrieve data associated to it
   * @param {String} prop - The property
   * @param value - The value
   * @returns {Serie} The current serie
   * @see Serie#getInfo
   * @memberof Serie
   */
  setInfo( prop, value ) {
    this.infos = this.infos || {};
    this.infos[ prop ] = value;
    return this;
  }

  /**
   * Retrives an information value from its key
   * @param {String} prop - The property
   * @returns The value associated to the prop parameter
   * @see Serie#setInfo
   * @memberof Serie
   */
  getInfo( prop, value ) {
    return ( this.infos || {} )[ prop ];
  }

  /**
   * @deprecated
   * @memberof Serie
   */
  setAdditionalData( data ) {
    this.additionalData = data;
    return this;
  }

  /**
   * @deprecated
   * @memberof Serie
   */
  getAdditionalData() {
    return this.additionalData;
  }

  /**
   * Flags the serie as selected
   * @returns {Serie} The current serie
   * @memberof Serie
   */
  select() {
    this.selected = true;
    return this;
  }

  /**
   * Flags the serie as unselected
   * @returns {Serie} The current serie
   * @memberof Serie
   */
  unselect() {
    this.selected = false;
    return this;
  }

  /**
   * Allows mouse tracking of the serie
   * @memberof Serie
   * @returns {Serie} The current serie
   * @param {Function} hoverCallback - Function to be called when the mouse enters the serie area
   * @param {Function} outCallback - Function to be called when the mouse exits the serie area
   * @private
   */
  enableTracking( hoverCallback, outCallback ) {
    this._tracker = true;
    this._trackingCallback = hoverCallback;
    this._trackingOutCallback = outCallback;

    return this;
  }

  /**
   * Disables mouse tracking of the serie
   * @memberof Serie
   * @returns {Serie} The current serie
   * @private
   */
  disableTracking() {

    if ( this._trackerDom ) {
      this._trackerDom.remove();
      this._trackerDom = null;
    }

    this._tracker = false;
    this._trackingCallback = null;
    return this;
  }

  /**
   *  Allows mouse tracking of the serie
   *  @memberof Serie
   *  @param {Object} options - The tracking line options
   *  @returns {Serie} The current serie
   */
  allowTrackingLine( options ) {

    options = options || {};
    this.graph.addSerieToTrackingLine( this, options );
  }

  getMarkerForLegend() {
    return false;
  }

  get type() {
    return this._type
  }

  getType() {
    return this._type;
  }

  set excludedFromLegend( bln = true ) {
    this._excludedFromLegend = bln;
  }

  get excludedFromLegend() {
    return !!this._excludedFromLegend;
  }

  setDataIndices( categories, nb ) {
    this.categoryIndices = categories;
    this.nbCategories = nb;
  }
}

export default Serie;