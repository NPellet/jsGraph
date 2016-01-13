define( [ 'jquery', '../graph.lru', './graph.plugin', ], function( $, LRU, Plugin ) {

  /**
   * @class PluginTimeSerieManager
   * @implements Plugin
   */
  var PluginTimeSerieManager = function() {

    var self = this;

    this.requestLevels = {};
    this.update = function() {

      self.series.forEach( function( serie ) {

        self.updateSerie( serie );

      } );


      self.recalculateSeries();
    }

  };

  PluginTimeSerieManager.prototype.defaults = {

    LRUName: "PluginTimeSerieManager",
    intervals: [ 1, 1000, 60000, 900000, 3600000, 8640000 ],
    maxParallelRequests: 6,
    optimalPxPerPoint: 1,
    nbPoints: 1000
  } 


  PluginTimeSerieManager.prototype = new Plugin();

  /**
   * Init method
   * @private
   * @memberof PluginTimeSerieManager
   */
  PluginTimeSerieManager.prototype.init = function( graph, options ) {

    
  };

  PluginTimeSerieManager.prototype.setAvailableIntervals = function() {
    this.options.intervals = arguments;
  }


  PluginTimeSerieManager.prototype.newSerie = function( serieName, serieOptions ) {
    var s = this.graph.newSerie( serieName, serieOptions );
    this.series.push( s );
    return s;
  }

  PluginTimeSerieManager.prototype.registerZoomPlugin = function( plugin, event ) {

    var index;
    if( ( index = this.plugins.indexOf( plugin ) ) > -1 ) {

      for( var i = 1; i < arguments.length; i ++ ) {
        plugin.removeListener( arguments[ i ], this.update );
      }
    }

    for( var i = 1; i < arguments.length; i ++ ) {
      plugin.on( arguments[ i ], this.update );
    }
  }

  PluginTimeSerieManager.prototype.updateSerie = function( serie ) {

    var self = this;
    var from = serie.getXAxis().getCurrentMin();
    var to = serie.getXAxis().getCurrentMax();
    var priority = 1;

    var optimalInterval = this.getOptimalInterval( to - from );

    this.options.intervals.forEach( function( interval ) {

      var startSlotId = this.computeSlotID( from, interval );
      var endSlotId = this.computeSlotID( to, interval );


      var intervalMultipliers = [ [ 0, 1, 3 ], [ 1, 2, 4 ], [ 2, 5, 6 ] ];

      intervalMultipliers.forEach( function( multiplier ) {

        var firstSlotId = startSlotId - multiplier[ 0 ] * ( endSlotId - startSlotId );
        var lastSlotId = endSlotId + multiplier[ 0 ] * ( endSlotId - startSlotId );

        var slotId = firstSlotId;

        while( slotId <= lastSlotId ) {

          this.register( serie, slotId, interval, interval == optimalInterval ? multiplier[ 1 ] : multiplier[ 2 ] );
          slotId++;
        }

      });

    } );
  }

  PluginTimeSerieManager.prototype.register = function( serie, slotId, interval, priority ) {

    var id = this.computeUniqueID( serie, slotId, interval );

    var data = LRU.get( this.options.LRUName, id );

    if( ! data ) {
      PluginTimeSerieManager.request( serie, slotId, interval, priority, id );
    }
  }

  PluginTimeSerieManager.prototype.request = function( serie, slotId, interval, priority, slotName ) {

    for( var i in this.requestLevels ) {

      if( i == priority ) {
        continue;
      }

      if( this.requestLevels[ i ][ slotId ] ) {

        if( this.requestLevels[ i ][ slotId ][ 0 ] !== 1 ) { // If the request is not pending
          delete this.requestLevels[ i ][ slotId ];  
        }
        
      }
    }

    this.requestLevels[ priority ] = this.requestLevels[ priority ] || {};
    this.requestLevels[ priority ][ slotId ] = [ 0, slotName, serie.getName(), slotId, interval ];
    this.processRequests();
  }

  PluginTimeSerieManager.prototype.processRequests = function( ) {


    if( this.requestsRunning = this.options.maxParallelRequests ) {
      continue;
    }

    
    var self = this,
        currentLevelChecking = 1,
        requestToMake;

    while( true ) {

      if( for( var i in this.requestLevels[currentLevelChecking ] ) ) {

        requestToMake = this.requestLevels[ currentLevelChecking ][ i ];
        break;
      }
      currentLevelChecking++;

      if( currentLevelChecking > 10 ) {
        return;
      }

    }

    this.requestsRunning++;

    $.ajax( {


    } ).done( function( data ) {

      self.requestsRunning--;
      LRU.store( this.options.LRUName, requestToMake[ 1 ], data ); // Element 1 is the unique ID

      self.processRequests();
    } );
  }

  PluginTimeSerieManager.prototype.getOptimalInterval = function( totalspan ) {

    var optimalInterval = ( this.options.optimalPxPerPoint || 1 ) * totalspan / this.graph.getDrawingWidth(),
        diff = Number.Infinity,
        optimalIntervalAmongAvailable;
    
    this.options.intervals.forEach( function( interval ) {

        if( diff !== ( diff = Math.min( diff, Math.abs( interval - optimalInterval ) ) ) {
          optimalIntervalAmongAvailable = interval;
        }
    });

    return optimalIntervalAmongAvailable;
  }

  PluginTimeSerieManager.prototype.computeUniqueID = function( serie, slotId, interval ) {
    return serie.getName() + ";" + slotId +  ";" + interval;
  }

  PluginTimeSerieManager.prototype.computeSlotID = function( time, interval ) {
    return ( time - ( time % interval * this.options.nbPoints ) );
  }

  PluginTimeSerieManager.prototype.computeSlotTime = function( slotId, interval ) {
    return slotId * ( interval * this.options.nbPoints );
  }
  
  PluginTimeSerieManager.prototype.recalculateSeries = function( ) {

    var self = this;
    this.series.map( function( serie ) {
      self.recalculateSerie( serie );
    });

    self.graph.draw();
  }

  PluginTimeSerieManager.prototype.recalculateSerie = function( serie ) {

    var from = serie.getXAxis().getCurrentMin(),
        to = serie.getXAxis().getCurrentMax(),
        interval = this.getOptimalInterval( to - from );

    var startSlotId = this.computeSlotID( from, interval );
    var endSlotId = this.computeSlotID( to, interval );
    var slotId = startSlotId;
    var data = [];
    var lruData;

    while( slotId <= endSlotId ) {

      if( lruData = LRU.get( this.options.LRUName, this.computeUniqueId( serie, slotId, interval ) ) ) {

        data = data.concat( lruData );

      } else {

        data = data.concat( this.recalculateSerieUpwards( serie, slotId, interval ) );
      }

      slotId ++;
    }

    serie.setData( data );
  }

  PluginTimeSerieManager.prototype.recalculateSerieUpwards = function( serie, downSlotId, downInterval ) {

    var intervals = this.options.intervals.slice( 0 ).sort();
    var nextInterval = intervals[ intervals.indexOf( downInterval ) + 1 ] || -1;
    var lruData;
    if( nextInterval < 0 ) {
      return [];
    }

    var newSlotTime = this.computeSlotTime( downSlotId, downInterval );
    var newSlotTimeEnd = this.computeSlotTime( downSlotId + 1, downInterval );
    var newSlotId = this.computeSlotId( newSlowTime, nextInterval ),
        start = false;

    if( lruData = LRU.get( this.options.LRUName, this.computeUniqueId( serie, newSlotId, nextInterval ) ) ) {

      for( var i = 0, l = lruData.length; i < l; i += 2 ) {

        if( lruData[ i ] < newSlotTime ) (
          continue;
        ) else if( start === false ) {
          start = i; 
        }

        if( lruData[ i ] >= newSlotTimeEnd ) {

          return lruData.slice( start, i );
        }
      }
    }

    return this.recalculateSerieUpwards( serie, newSlotId, newSlotTime );
  }

  return PluginTimeSerieManager;
} );