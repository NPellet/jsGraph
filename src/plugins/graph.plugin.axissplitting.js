import AxisX from "../graph.axis.x"
import AxisY from "../graph.axis.y"
import * as util from "../graph.util"
import SerieLine from '../series/graph.serie.line'
import Plugin from './graph.plugin'
import Axis from "../graph.axis"

class SerieLineExtended extends SerieLine {

  constructor() {
    super( ...arguments );
  }

  setSeries = function( ...series ) {
    this.series = series;
  }
}

for ( let i in SerieLine.prototype ) {
  SerieLineExtended.prototype[ i ] = () => {
    this.series.map( function() {
      this[ i ]( ...arguments )
    } )
  }
}

class PluginAxisSplitting extends Plugin {

  constructor( graph ) {
    super( ...arguments );
    this.series = [];
  }

  init( graph ) {
    this.graph = graph;
  }

  update() {

  }

  newXAxis( options ) {
    return newTopAxis( options );
  }

  newYAxis( options ) {
    return newLeftAxis( options );
  }

  newTopAxis( options ) {
    return new SplitXAxis( this.graph, "top", options )
  }

  newBottomAxis( options ) {
    return new SplitXAxis( this.graph, "bottom", options )
  }

  newLeftAxis( options ) {
    return new SplitYAxis( this.graph, "left", options )
  }

  newRight( options ) {
    return new SplitYAxis( this.graph, "right", options )
  }

  preDraw() {

    for ( let i in this.series,
        serie = this.series[ i ],
        xAxis = serie.getXAxis(),
        yAxis = serie.getYAxis() ) {

      let splits = 1;

      if ( xAxis.splitNumber ) {
        splits *= xAxis.splitNumber;
      }

      if ( yAxis.splitNumber ) {
        splits *= yAxis.splitNumber;
      }

      while ( serie.subSeries.length < splits ) {
        const name = serie.getName() + "_" + serie.subSeries.length;
        const s = this.graph.newSerie( name, {}, serie.type );
      }

      while ( serie.subSeries.length > splits ) {
        this.graph.getSerie( serie.getName() + "_" + serie.subSeries.length - 1 ).kill();
      }

      // Re-assign axes to the sub series
      serie.subSeries.map( ( sserie, index ) => {

        if ( serie.getXAxis().getSubAxis ) {
          sserie.setXAxis( serie.getXAxis().getSubAxis( sserie % yAxis.splitNumber || 1 ) );
        }

        if ( serie.getYAxis().getSubAxis ) {
          sserie.setYAxis( serie.getYAxis().getSubAxis( Math.floor( sserie / ( xAxis.splitNumber || 1 ) ) ) );
        }
      } );
    }

    this.update();
  }

  newSerie( name, options = {}, type ) {

    if ( type == "line" ) {
      return newLineSerie( name, options );
    }

    throw "Cannot create a split serie of type " + type;
  }

  newLineSerie( name, options ) {
    var serieObj = {
      type: "lineSerie",
      serie: new SerieLineExtended( name, options, "line" )
    }
    this.series.push( serieObj );

    serieObj.serie.init( this.graph, options );
    return serieObj.serie;
  }
}

var SplitAxis = function( mixin ) {

  return class SplitAxis extends( mixin ) {

    constructor( graph, position, options = {} ) {

      super( graph, position, options );

      this.axes = new Set();
      this.position = position;
      this.constructorOptions = options;

      this._splitVal = [ [ 0, 1 ] ]
    }

    splitAt( ...splits ) {

      let splitNumber = splits.length + 1;

      if ( this.axes.size > splitNumber ) {
        // TODO: Remove all needed axes
      }
      
      while ( this.axes.size < splitNumber ) {
        let axis = new( this.getConstructor() )( this.graph, this.position, this.constructorOptions );
        this.axes.add( axis );
        axis.zoomLock = true;
        axis.init( this.graph, this.constructorOptions );
      }

      let from = 0
      let i = 0;
      for ( let axis of this.axes.values() ) {
        axis.setSpan( from, ( from = splits[ i ] ) )
        i++;
      }

      this._splits = splits;
    }

    splitValues( ...values ) {

      for( let [ index, axis ] of this.axes.entries() ) {
        axis
        	.forceMin( values[ index ][ 0 ] )
        	.forceMax( values[ index ][ 1 ] );
      }

      this._splitVal = values;
    }

    setMinMaxToFitSeries() {
    	super.setMinMaxToFitSeries( ...arguments );
    	this._splitVal[ 0 ][ 0 ] = this.getCurrentMin();
    	this.splitValues[ this._splitVal.length - 1 ][ 1 ] = this.getCurrentMax();

    	this.splitValues( this._splitVal );
    }	

    draw() {
      var max = 0;
      this.axes.forEach( ( axis ) => {
      	console.log('Drawing');
        max = Math.max( max, axis.draw() );
      } );

      return max;
    }

    setMinPx( min ) {

      for( let axis of this.axes.values() ) {
        axis.setMinPx( min );
      }
    }

    setMaxPx( max ) {
      for( let axis of this.axes.values() ) {
        axis.setMaxPx( max );
      }
    }

    setShift() {

      for( let axis of this.axes.values() ) {
      	console.log( arguments );
      	axis.setShift( ...arguments );
      }
    }

    init() {
      super.init( ...arguments );
      this.splitAt( 1 );
    }

    getAxisPosition() {
      var max = 0;
      this.axes.forEach( ( axis ) => { 
        max = Math.max( max, axis.getAxisPosition() )
      } );

      return max;
    }

    getSubAxis( index ) {
      if ( this.axes.size >= index ) {
        throw "Impossible to reach axis. Index " + index + " is out of range";
      }

      return this.axes[ index ];
    }

    get splitNumber() {
      return this._splits.length;
    }
  }
}

class SplitXAxis extends SplitAxis( AxisY ) {

  constructor( graph, topbottom, options ) {
    super( ...arguments );
    this.topbottom = topbottom;
  }

  getConstructor() {
    return AxisX;
  }
}

class SplitYAxis extends SplitAxis( AxisX ) {

  constructor( graph, leftright, options ) {
    super( ...arguments );
    this.topbottom = leftright;
  }

  getConstructor() {
    return AxisY;
  }
}

util.mix( SplitXAxis, new AxisX() );
util.mix( SplitYAxis, new AxisY() );

export default PluginAxisSplitting;