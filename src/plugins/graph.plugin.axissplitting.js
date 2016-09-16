import AxisX from "../graph.axis.x"
import AxisY from "../graph.axis.y"
import * as util from "../graph.util"
import SerieLine from '../series/graph.serie.line'
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
  	});

    return this;
  }


  draw() {
    this.eraseMarkers();
    return this;
  }
/*
  setSeries( ...series ) {
    this.series = series;
  }
  */
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
  '_recalculateMarkerPoints' ];
var addMethods = [  ];

Object.getOwnPropertyNames( SerieLine.prototype ).concat( addMethods ).map( function( i ) {

	if( excludingMethods.indexOf( i ) > -1 ) {
		return;
	}

	SerieLineExtended.prototype[ i ] = ( function( j ) { 
    console.log( j );
	  return function() {
  		
      var args = arguments;
	    this.subSeries.map( ( subSerie ) => {
	      subSerie[ j ]( ...args );
	    } );
	  }

	} ) ( i );
} );
  


class PluginAxisSplitting extends Plugin {

  constructor( graph ) {
    super( ...arguments );
    this.series = new Map();
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
  	options = this.getOptions( options );
    return new SplitXAxis( this.graph, "top", options )
  }

  newBottomAxis( options ) {
  	options = this.getOptions( options );
    return new SplitXAxis( this.graph, "bottom", options )
  }

  newLeftAxis( options ) {
  	options = this.getOptions( options );
    return new SplitYAxis( this.graph, "left", options )
  }

  newRight( options ) {
  	options = this.getOptions( options );
    return new SplitYAxis( this.graph, "right", options )
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
	this.series.forEach( ( { serie } ) => { 

    xAxis = serie.getXAxis(),
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
        const s = this.graph.newSerie( name, {}, serie.type || "line" );
        
        s.styles = serie.styles;
        s.markerPoints = serie.markerPoints;
        s.markerFamilies = serie.markerFamilies;
		    s.data = serie.data; // Copy data
        serie.subSeries.push( s );
      }

      while ( serie.subSeries.length > splits ) {
      	
        this.graph.getSerie( serie.getName() + "_" + serie.subSeries.length - 1 ).kill();
        serie.subSeries.pop();
      }

      var firstSubSerie = serie.subSeries[ 0 ];


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

          let subAxisIndex = Math.floor( index / ( ( yAxis.splitNumber || 1 ) ) );
          ySubAxis = serie.getYAxis().getSubAxis( subAxisIndex );
        } else {
          ySubAxis = serie.getYAxis();
        }

        sserie.setYAxis( ySubAxis );

        sserie.draw(true);
      } );
    //}

	});

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
    this.series.set( name, serieObj );
    serieObj.serie.init( this.graph, options );
    this.graph.series.push( serieObj.serie );
    return serieObj.serie;
  }
}

var SplitAxis = function( mixin ) {

  return class SplitAxis extends( mixin ) {

    constructor( graph, position, options = {} ) {

      super( graph, position, options );
      this.axes = [];
      this.position = position;
      this.constructorOptions = util.extend( true, {}, options );

      this._splitVal = [ [ 0, 1 ] ];
    }

    splitAxis( ...splits ) {

      splits.push( 1 );
      let splitNumber = splits.length;

      if ( this.axes.length > splitNumber ) {
        // TODO: Remove all needed axes
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

      	if( i == 0 ) {
      		axis.options.marginMin = 0;
      	} else if( i == this.axes.length - 1 ) {
      		axis.options.marginMax = 0;
      	}

        axis.setSpan( from, ( from = splits[ i ] ) )
        axis.setMinMaxFlipped();
        i++;
      }

      this._splits = splits;
    }

    fixGridIntervalBasedOnAxis( axisIndex ) {
      this.fixGridFor = axisIndex;
    }

    splitSpread( bln ) {
      this.autoSpread = !! bln; 
    }
    
    _splitSpread() {

      let splits = [],
          total = 0,
          currentSplit = 0;
//console.log( this._splitVal );
      for( let split of this._splitVal ) {
        total += split[ 1 ] - split[ 0 ];
      }
      
      for( let split of this._splitVal ) {
        
        splits.push( currentSplit += ( split[ 1 ] - split[ 0 ] ) / total );
      }
      
      splits.pop();
      this.splitAxis( ...splits );
    }

    splitValues( values ) {

  	  let index = 0,
          baseWidth,
          baseWidthIndex;
    
      for( let axis of this.axes ) {

        if( values[ index ].length > 1 && ! baseWidth ) {
          baseWidth = values[ index ][ 1 ] - values[ index ][ 0 ];
          baseWidthIndex = index;
        }

        if( values[ index ].length == 1 || ! Array.isArray( values[ index ] ) ) {
          axis._mean = values[ index ];

          if( Array.isArray( axis._mean ) ) {
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
    }


    setMinMaxToFitSeries() {

      if( this._splitVal.length <= 1 ) {
        super.setMinMaxToFitSeries( ...arguments );
        this._splitVal[ 0 ][ 0 ] = this.getCurrentMin();
        this._splitVal[ this._splitVal.length - 1 ][ 1 ] = this.getCurrentMax();
        this.splitBoundaries( this._splitVal );
      }
    }	

    draw() {

      if( this.autoSpread ) {
        this._splitSpread();
      }

      let max = 0;
      let unit;
      let subAxis;
      let spanReference;


      if( this._baseWidthIndex >= 0 && ( subAxis = this.getSubAxis( this._baseWidthIndex ) ) ) {
        spanReference = subAxis.getSpan();
        console.log( spanReference)
      }

      if( this.fixGridFor >= 0 && ( subAxis = this.getSubAxis( this.fixGridFor ) ) ) {
        max = subAxis.draw();
        unit = subAxis.getPrimaryTickUnit();
      }

      this.axes.map( ( axis ) => {      	
        console.log( axis._mean, axis.getSpan() );
        if( axis._mean !== undefined ) {
          let width = ( axis.getSpan()[ 1 ] - axis.getSpan()[ 0 ] ) / ( spanReference[ 1 ] - spanReference[ 0 ] ) * this._baseWidthVal;
          axis.forceMin( axis._mean - width / 2 );
          axis.forceMax( axis._mean + width / 2 );
        }

        if( subAxis === axis ) {
          return;
        }

        if( unit ) {
          axis.forcePrimaryTickUnit( unit );
        }

        max = Math.max( max, axis.draw() );

      } );

      return max;
    }

    setMinPx( min ) {

      for( let axis of this.axes ) {
        axis.setMinPx( min );
      }
    }

    setMaxPx( max ) {
      for( let axis of this.axes ) {
        axis.setMaxPx( max );
      }
    }

    setShift() {

      for( let axis of this.axes ) {
      	axis.setShift( ...arguments );
      }
    }

    init() {
      super.init( ...arguments );
      this.splitAxis( );
    }

    getAxisPosition() {
      var max = 0;
      this.axes.map( ( axis ) => { 
        max = Math.max( max, axis.getAxisPosition() )
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
}

PluginAxisSplitting.prototype.defaults = {
	axes: {
		margins: {
			high: 5,
			low: 5
		}
	}
};


class SplitXAxis extends SplitAxis( AxisX ) {

  constructor( graph, topbottom, options ) {
    super( ...arguments );
    this.topbottom = topbottom;
  }

  getConstructor() {
    return AxisX;
  }
}

class SplitYAxis extends SplitAxis( AxisY ) {

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