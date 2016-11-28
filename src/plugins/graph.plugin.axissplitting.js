import Graph from "../graph.core"
import AxisX from "../graph.axis.x"
import AxisY from "../graph.axis.y"
import * as util from "../graph.util"
import SerieLine from '../series/graph.serie.line'
import SerieScatter from '../series/graph.serie.scatter'
import Plugin from './graph.plugin'
import Axis from "../graph.axis"

class SerieLineExtended extends SerieLine {

  constructor() {
    super( ...arguments );
    this.subSeries = [];
  }

  setData() {
    super.setData( ...arguments );
    this.subSeries.map( ( sub ) => {
      sub.data = this.data;
    } );
    return this;
  }

  draw() {
    this.eraseMarkers();
    return this;
  }

  getSymbolForLegend() {
    if ( !this.subSeries[ 0 ] ) {
      return false;
    }

    return this.subSeries[  0 ].getSymbolForLegend();
  }

  getMarkerForLegend() {
    if ( !this.subSeries[ 0 ] ) {
      return false;
    }

    return this.subSeries[  0 ].getMarkerForLegend();
  }
}

class SerieScatterExtended extends SerieScatter {

  constructor() {
    super( ...arguments );
    this.subSeries = [];
  }

  setData() {
    super.setData( ...arguments );
    this.subSeries.map( ( sub ) => {
      sub.data = this.data;
    } );
    return this;
  }

  draw() {
    return this;
  }

  getSymbolForLegend() {
    if ( !this.subSeries[ 0 ] ) {
      return false;
    }

    return this.subSeries[  0 ].getSymbolForLegend();
  }

  getMarkerForLegend() {
    if ( !this.subSeries[ 0 ] ) {
      return false;
    }

    return this.subSeries[  0 ].getMarkerForLegend();
  }
}

var excludingMethods = [
  'constructor',
  'init',
  'draw',
  'setLineColor',
  'setLineWidth',
  'setLineStyle',
  'getLineColor',
  'getLineWidth',
  'getLineStyle',
  'setMarkers',
  'showMarkers',
  'hideMarkers',
  'getMarkerDom',
  'getMarkerDomIndependant',
  'getMarkerPath',
  'eraseMarkers',
  '_recalculateMarkerPoints'
];
var addMethods = [  ];

Object.getOwnPropertyNames( SerieLine.prototype ).concat( addMethods ).map( function( i ) {

  if ( excludingMethods.indexOf( i ) > -1 ) {
    return;
  }

  SerieLineExtended.prototype[ i ] = ( function( j ) {

    return function() {

      var args = arguments;
      this.subSeries.map( ( subSerie ) => {
        subSerie[ j ]( ...args );
      } );
    }

  } )( i );
} );

/** 
 * Axis splitting plugin
 * @augments Plugin
 */
class PluginAxisSplitting extends Plugin {

  constructor( options ) {
    super( ...arguments );
    this.series = new Map();
  }

  static defaults() {

    return {
      axes: {
        margins: {
          high: 5,
          low: 5
        }
      }
    };
  }

  init( graph ) {
    this.graph = graph;
  }

  /**
   *  Creates a new bottom split axis
   *  @param {Object} [ options = {} ] The axis options
   *  @return {Axis} The newly created split axis
   */
  newXAxis( options ) {
    return newBottomAxis( options );
  }

  /**
   *  Creates a new left split axis
   *  @param {Object} [ options = {} ] The axis options
   *  @return {Axis} The newly created split axis
   */
  newYAxis( options ) {
    return newLeftAxis( options );
  }

  /**
   *  Creates a new top split axis
   *  @param {Object} [ options = {} ] The axis options
   *  @return {Axis} The newly created split axis
   */
  newTopAxis( options ) {
    options = this.getOptions( options );
    return new SplitXAxis( this.graph, "top", options );
  }

  /**
   *  Creates a new bottom split axis
   *  @param {Object} [ options = {} ] The axis options
   *  @return {Axis} The newly created split axis
   */
  newBottomAxis( options ) {
    options = this.getOptions( options );
    return new SplitXAxis( this.graph, "bottom", options );
  }

  /**
   *  Creates a new left split axis
   *  @param {Object} [ options = {} ] The axis options
   *  @return {Axis} The newly created split axis
   */
  newLeftAxis( options ) {
    options = this.getOptions( options );
    return new SplitYAxis( this.graph, "left", options );
  }

  /**
   *  Creates a new right split axis
   *  @param {Object} [ options = {} ] The axis options
   *  @return {Axis} The newly created split axis
   */
  newRightAxis( options ) {
    options = this.getOptions( options );
    return new SplitYAxis( this.graph, "right", options );
  }

  getOptions( options ) {
    var defaults = {
      marginMin: this.options.axes.margins.low,
      marginMax: this.options.axes.margins.high,
    };
    return util.extend( true, defaults, options );
  }

  preDraw() {

    var xAxis, yAxis;

    //    for ( let { serie } of this.series.values() ) {
    this.series.forEach( ( { 
      serie
    } ) => {

      xAxis = serie.getXAxis();
      yAxis = serie.getYAxis();

      let splits = 1;

      if ( xAxis.splitNumber ) {
        splits *= xAxis.splitNumber;
      }

      if ( yAxis.splitNumber ) {
        splits *= yAxis.splitNumber;
      }

      while ( serie.subSeries.length < splits ) {

        const name = serie.getName() + "_" + serie.subSeries.length;

        const s = this.graph.newSerie( name, {}, serie.getType() || Graph.SERIE_LINE );

        s.excludedFromLegend = true;
        s.styles = serie.styles;
        s.data = serie.data; // Copy data

        if ( serie.getType() == Graph.SERIE_LINE ) {
          s.markerPoints = serie.markerPoints;
          s.markerFamilies = serie.markerFamilies;
        }

        serie.subSeries.push( s );
      }

      while ( serie.subSeries.length > splits ) {

        let subserie = this.graph.getSerie( serie.getName() + "_" + ( serie.subSeries.length - 1 ) );

        if ( subserie && subserie.kill ) {
          subserie.kill();
        }
        serie.subSeries.pop();

      }

      if ( !serie.getXAxis().splitNumber && serie.getXAxis().splitAxis ) {
        serie.getXAxis().splitAxis();
      }

      if ( !serie.getYAxis().splitNumber && serie.getYAxis().splitAxis ) {
        serie.getYAxis().splitAxis();
      }

      // Re-assign axes to the sub series
      serie.subSeries.map( ( sserie, index ) => {

        var xSubAxis, ySubAxis;

        //sserie.groupMarkers = firstSubSerie.groupMarkers;

        if ( serie.getXAxis().getSubAxis ) {
          let subAxisIndex = index % ( ( xAxis.splitNumber || 1 ) );
          xSubAxis = serie.getXAxis().getSubAxis( subAxisIndex );
        } else {
          xSubAxis = serie.getXAxis();
        }

        sserie.setXAxis( xSubAxis );

        if ( serie.getYAxis().getSubAxis ) {

          let subAxisIndex = Math.floor( index / ( ( xAxis.splitNumber || 1 ) ) );
          ySubAxis = serie.getYAxis().getSubAxis( subAxisIndex );
        } else {
          ySubAxis = serie.getYAxis();
        }

        sserie.setYAxis( ySubAxis );

        sserie.draw( true );
      } );
      //}

    } );

  }

  /**
   *  Creates a new serie
   *  @param {(String|Number)} name - The name of the serie
   *  @param {Object} [ options = {} ] The options of the serie
   *  @param {String} type - The type of the serie
   *  @return {Serie} The created serie
   */
  newSerie( name, options = {}, type ) {

    switch ( type ) {

      case 'line':
        return newLineSerie( name, options );
        break;

      case 'scatter':
        return newScatterSerie( name, options );
        break;
    }

    throw "Cannot create a split serie of type " + type;
  }

  /**
   *  Creates a new line serie
   *  @param {(String|Number)} name - The name of the serie
   *  @param {Object} [ options = {} ] The options of the serie
   *  @return {Serie} The created serie
   */
  newLineSerie( name, options ) {
    var serieObj = {
      type: "lineSerie",
      serie: new SerieLineExtended( name, options, "line" )
    }
    this.series.set( name, serieObj );
    serieObj.serie.init( this.graph, name, options );
    this.graph.series.push( serieObj.serie );
    return serieObj.serie;
  }

  /**
   *  Creates a new scatter serie
   *  @param {(String|Number)} name - The name of the serie
   *  @param {Object} [ options = {} ] The options of the serie
   *  @return {Serie} The created serie
   */
  newScatterSerie( name, options ) {
    var serieObj = {
      type: "scatterSerie",
      serie: new SerieScatterExtended( name, options, "scatter" )
    };
    this.series.set( name, serieObj );
    serieObj.serie.init( this.graph, options );
    this.graph.series.push( serieObj.serie );
    return serieObj.serie;
  }

}

var defaultAxisConstructorOptions = {
  splitMarks: true
};

var SplitAxis = function( mixin ) {

  var delegateMethods = [

    'turnGridsOff',
    'turnGridsOn',
    'gridsOff',
    'gridsOn',
    'setEngineering',
    'setScientificScaleExponent',
    'setScientific',
    'setLabelColor',
    'setSecondaryGridDasharray',
    'setPrimaryGridDasharray',
    'setSecondaryGridsOpacity',
    'setPrimaryGridOpacity',
    'setSecondaryGridWidth',
    'setPrimaryGridWidth',
    'setSecondaryGridColor',
    'setPrimaryGridColor',
    'setTicksLabelColor',
    'setSecondaryTicksColor',
    'setPrimaryTicksColor',
    'setAxisColor',
    'secondaryGridOn',
    'secondaryGridOff',
    'primaryGridOff',
    'primaryGridOn',
    'setSecondaryGrid',
    'setPrimaryGrid',
    'setGrids',
    'setTickPosition',
    'setExponentialFactor',
    'setExponentialLabelFactor',
    'setGridLinesStyle',
    'forcePrimaryTickUnitMin',
    'forcePrimaryTickUnitMax',
    'forcePrimaryTickUnit',
    'flip',
    'show',
    'hide',
    'setDisplay'
  ];

  /** 
   * Split axis
   * @mixes AxisX
   * @mixes AxisY
   * @name SplitAxis
   * @static
   */
  var cl = class SplitAxis extends( mixin ) {

    constructor( graph, position, options = {} ) {

      super( graph, position, options );
      this.axes = [];
      this.position = position;
      this.constructorOptions = util.extend( true, {}, defaultAxisConstructorOptions, options );

      this._splitVal = [];
    }

    /**
     *  Calls a callback onto each chunk axes. The callback receives two parameters: 1) the ```axis``` itself and 2) the ```index``` of the axis in the stack
     *  @param {Function} callback - The callback to be applied to each axes
     *  @return {SplitAxis} The current axis instance
     */
    all( callback ) {

      if ( !( typeof callback == "function" ) ) {
        return;
      }

      this.axes.map( callback );
      return this;
    }

    /**
     *  Splits the axis into chunks at the positions defined as a list of parameters.
     *  @param {Function} ...splits - The positions of axis splitting
     *  @return {SplitAxis} The current axis instance
     *  @example axis.splitAxis( 0.2, 0.5, 0.8 ); // Creates 4 chunks (0-20%, 20%-50%, 50%-80%, 80%-100%)
     */
    splitAxis( ...splits ) {

      splits.push( 1 );
      let splitNumber = splits.length;

      while ( this.axes.length > splitNumber ) {
        this.axes.pop().kill( true, true );
      }

      while ( this.axes.length < splitNumber ) {
        let axis = new( this.getConstructor() )( this.graph, this.position, this.constructorOptions );
        this.axes.push( axis );
        axis.zoomLock = true;
        axis.init( this.graph, this.constructorOptions );
      }

      let from = 0
      let i = 0;
      for ( let axis of this.axes ) {

        axis.options.marginMin = 10;
        axis.options.marginMax = 10;

        if ( i == 0 ) {
          axis.options.marginMin = 0;
        }

        if ( i == this.axes.length - 1 ) {
          axis.options.marginMax = 0;
        }

        axis.setSpan( from, ( from = splits[ i ] ) )
        axis.setMinMaxFlipped();
        i++;
      }

      this._splits = splits;
      return this;
    }

    /**
     *  Fixes the major tick interval of all axes based on the one provided as a parameter
     *  @param {Number} axisIndex - The index of the reference axis (starting at 0)
     *  @return {SplitAxis} The current axis instance
     */
    fixGridIntervalBasedOnAxis( axisIndex ) {

      this.fixGridFor = axisIndex;
      this.graph._axisHasChanged();
      return this;
    }

    /**
     *  Spreads the chunks of the axis based on the relative interval of each one of them, so that the unit / px is constant for each chunk
     *  @param {Boolean} bln - ```true``` to enable the spread, ```false``` otherwise
     *  @return {SplitAxis} The current axis instance
     */
    splitSpread( bln ) {
      this.autoSpread = !!bln;
      return this;
    }

    hasAxis( axis ) {
      return this.axes.indexOf( axis ) > -1;
    }

    _splitSpread() {

      let splits = [],
        total = 0,
        currentSplit = 0;
      //console.log( this._splitVal );
      for ( let split of this._splitVal ) {
        total += split[ 1 ] - split[ 0 ];
      }

      for ( let split of this._splitVal ) {

        splits.push( currentSplit += ( split[ 1 ] - split[ 0 ] ) / total );
      }

      splits.pop();
      this.splitAxis( ...splits );
    }

    /**
     *  Defines the boundaries of each chunk in axis unit.
     *  @param {Array<(Array|Number)>} values - An array of either 2-component arrays (from-to) or number (mean)
     *  @example axis.setChunkBoundaries( [ [ 12, 20 ], [ 100, 200 ] ] ); // First chunk from 12 to 20, second one from 100 to 200
     *  @example axis.setChunkBoundaries( [ 12, [ 100, 200 ] ] ); // Second chunk from 100 to 200, first chunk with a mean at 12 and min / max determined by the relative widths of the chunks
     *  @return {SplitAxis} The current axis instance
     */
    setChunkBoundaries( values ) {

      let index = 0,
        baseWidth,
        baseWidthIndex;

      for ( let axis of this.axes ) { // List all axes

        // Two elements in the array => becomes the new reference
        if ( Array.isArray( values[ index ] ) && values[ index ].length > 1 && !baseWidth ) {
          baseWidth = values[ index ][ 1 ] - values[ index ][ 0 ];
          baseWidthIndex = index;
        }

        if ( values[ index ].length == 1 ||  !Array.isArray( values[ index ] ) ) {
          axis._mean = values[ index ];

          if ( Array.isArray( axis._mean ) ) {
            axis._mean = axis._mean[ 0 ];
          }

        } else {

          axis
            .forceMin( values[ index ][ 0 ] )
            .forceMax( values[ index ][ 1 ] );
        }

        index++;
      }

      this._baseWidthVal = baseWidth;
      this._baseWidthIndex = baseWidthIndex;

      this._splitVal = values;

      this.graph._axisHasChanged();

      return this;
    }

    setMinMaxToFitSeries() {

      if ( !this._splitVal || this._splitVal.length < 1 ) {
        super.setMinMaxToFitSeries( ...arguments );
        this._splitVal[ 0 ] = this._splitVal[ 0 ] || [];
        this._splitVal[ this._splitVal.length - 1 ] = this._splitVal[ this._splitVal.length - 1 ] || [];

        this._splitVal[ 0 ][ 0 ] = this.getCurrentMin();
        this._splitVal[ this._splitVal.length - 1 ][ 1 ] = this.getCurrentMax();
        this.setChunkBoundaries( this._splitVal );
      }
    }

    draw() {

      if ( this.autoSpread ) {
        this._splitSpread();
      }

      let max = 0;
      let unit;
      let subAxis;
      let spanReference;

      if ( this._baseWidthIndex >= 0 && ( subAxis = this.getSubAxis( this._baseWidthIndex ) ) ) {
        spanReference = subAxis.getSpan();
      }

      subAxis = undefined;

      if ( this.fixGridFor >= 0 && ( subAxis = this.getSubAxis( this.fixGridFor ) ) ) {

        if ( subAxis._mean !== undefined ) {
          let width = ( subAxis.getSpan()[ 1 ] - subAxis.getSpan()[ 0 ] ) / ( spanReference[ 1 ] - spanReference[  0 ] ) * this._baseWidthVal;
          subAxis.forceMin( subAxis._mean - width / 2 );
          subAxis.forceMax( subAxis._mean + width / 2 );
        }

        max = subAxis.draw();
        unit = subAxis.getPrimaryTickUnit();
      }

      this.axes.map( ( axis ) => {

        if ( subAxis === axis ) {
          return;
        }

        if ( axis._mean !== undefined ) {
          let width = ( axis.getSpan()[ 1 ] - axis.getSpan()[ 0 ] ) / ( spanReference[ 1 ] - spanReference[  0 ] ) * this._baseWidthVal;
          axis.forceMin( axis._mean - width / 2 );
          axis.forceMax( axis._mean + width / 2 );
        }

        if ( unit ) {
          axis.forcePrimaryTickUnit( unit );
        }

        max = Math.max( max, axis.draw() );

      } );

      //    this.drawLabel();
      this.writeUnit();

      return max;
    }

    setMinPx( min ) {

      super.setMinPx( min );
      for ( let axis of this.axes ) {
        axis.setMinPx( min );
      }
    }

    setMaxPx( max ) {

      super.setMaxPx( max );

      for ( let axis of this.axes ) {
        axis.setMaxPx( max );
      }
    }

    setShift() {

      super.setShift( ...arguments );

      for ( let axis of this.axes ) {
        axis.setShift( ...arguments );
      }
    }

    init() {
      super.init( ...arguments );
      this.splitAxis();
    }

    getAxisPosition() {
      var max = 0;

      this.axes.map( ( axis ) => { 
        max = Math.max( max, axis.getAxisPosition() );
      } );

      return max;
    }

    getSubAxis( index ) {

      if ( this.axes.length <= index ) {
        throw "Impossible to reach axis. Index " + index + " is out of range";
      }

      return this.axes[ index ];
    }

    get splitNumber() {
      return this._splits.length;
    }
  }

  delegateMethods.map( ( methodName ) => {

    cl.prototype[ methodName ] = ( function( method ) {

      return function() {
        //super[ method ]( ...arguments )

        this.axes.map( ( axis ) => {
          axis[ method ]( ...arguments )
        } );
        return this;
      }

    } )( methodName );
  } );

  return cl;
}

class SplitXAxis extends SplitAxis( AxisX ) {

  constructor( graph, topbottom, options ) {
    super( ...arguments );
    this.topbottom = topbottom;
  }

  getConstructor() {
    return AxisX;
  }

  getAxisPosition() {
    var max = super.getAxisPosition( ...arguments );

    this.labelPosY = max;

    if ( this.getLabel() ) {
      max += this.graph.options.fontSize;
    }

    return max;
  }

  drawLabel() {
    super.drawLabel();
    this.label.setAttribute( 'y', ( this.top ? -1 : 1 ) * ( this.graph.options.fontSize + this.labelPosY ) );
  }

  draw() {
    var height = super.draw( ...arguments );
    this.drawLabel();
    return height;
  }

}

class SplitYAxis extends SplitAxis( AxisY ) {

  constructor( graph, leftright, options ) {
    super( ...arguments );
    ///this.leftright = leftright;
  }

  getConstructor() {
      return AxisY;
    }
    /*
      draw() {

        if ( this.getLabel() ) {
          this.axes.map( ( axis ) => {
            axis.setAxisPosition( this.graph.options.fontSize );
          } ); // Extra shift allowed for the label
          //this.setShift( this.graph.options.fontSize );
        }
        return super.draw( ...arguments );
      }
    */
  drawLabel() {
    super.drawLabel();
  }

  equalizePosition( width ) {

    var widthAfter = width;

    if ( this.getLabel() ) {
      this.axes.map( ( axis ) => {
        widthAfter = Math.max( axis.equalizePosition( width ), widthAfter );
      } ); // Extra shift allowed for the label
      //this.setShift( this.graph.options.fontSize );
    }

    if ( this.getLabel() ) {
      this.placeLabel( this.left ? -widthAfter : widthAfter );
      return widthAfter + this.graph.options.fontSize;
    }
  }

}

util.mix( SplitXAxis, new AxisX() );
util.mix( SplitYAxis, new AxisY() );

export default PluginAxisSplitting;