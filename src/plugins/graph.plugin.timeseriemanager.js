define( [ 'jquery', '../graph.lru', './graph.plugin', ], function( $, LRU, Plugin ) {

  /**
   * @class PluginTimeSerieManager
   * @implements Plugin
   */
  var PluginTimeSerieManager = function() {

    var self = this;

    this.series = [];
    this.plugins = [];

    this.requestLevels = {};
    this.update = function() {

      self.series.forEach( function( serie ) {

        self.updateSerie( serie );

      } );

      self.recalculateSeries();
    }

  };

  PluginTimeSerieManager.prototype = new Plugin();

  PluginTimeSerieManager.prototype.defaults = {

    LRUName: "PluginTimeSerieManager",
    intervals: [ 1, 60, 900, 3600, 8640 ],
    maxParallelRequests: 6,
    optimalPxPerPoint: 1,
    nbPoints: 5000,
    url: ""
  }

  /**
   * Init method
   * @private
   * @memberof PluginTimeSerieManager
   */
  PluginTimeSerieManager.prototype.init = function( graph, options ) {
    this.graph = graph;
    LRU.create( this.options.LRUName, 200 );

  };

  PluginTimeSerieManager.prototype.setURL = function( url ) {
    this.options.url = url;
    return this;
  }

  PluginTimeSerieManager.prototype.setAvailableIntervals = function() {
    this.options.intervals = arguments;
  }

  PluginTimeSerieManager.prototype.newSerie = function( serieName, serieOptions ) {
    var s = this.graph.newSerie( serieName, serieOptions );
    this.series.push( s );
    return s;
  }

  PluginTimeSerieManager.prototype.registerPlugin = function( plugin, event ) {

    var index;
    if ( ( index = this.plugins.indexOf( plugin ) ) > -1 ) {

      for ( var i = 1; i < arguments.length; i++ ) {
        plugin.removeListener( arguments[  i ], this.update );
      }
    }

    for ( var i = 1; i < arguments.length; i++ ) {
      plugin.on( arguments[  i ], this.update );
    }
  }

  PluginTimeSerieManager.prototype.updateSerie = function( serie ) {

    var self = this;
    var from = serie.getXAxis().getCurrentMin();
    var to = serie.getXAxis().getCurrentMax();
    var priority = 1;

    var optimalInterval = this.getOptimalInterval( to - from );

    this.options.intervals.forEach( function( interval ) {

      var startSlotId = self.computeSlotID( from, interval );
      var endSlotId = self.computeSlotID( to, interval );

      var intervalMultipliers = [
        [ 2, 5, 6 ],
        [ 1, 2, 4 ],
        [ 0, 1, 3 ]
      ];

      intervalMultipliers.forEach( function( multiplier ) {

        var firstSlotId = startSlotId - multiplier[ 0 ] * ( endSlotId - startSlotId );
        var lastSlotId = endSlotId + multiplier[ 0 ] * ( endSlotId - startSlotId );

        var slotId = firstSlotId;

        while ( slotId <= lastSlotId ) {

          self.register( serie, slotId, interval, interval == optimalInterval ? multiplier[ 1 ] : multiplier[ 2 ], true );
          slotId++;
        }

      } );

    } );

    this.processRequests();
  }

  PluginTimeSerieManager.prototype.register = function( serie, slotId, interval, priority, noProcess ) {

    var id = this.computeUniqueID( serie, slotId, interval );

    var data = LRU.get( this.options.LRUName, id );

    if ( !data ) {

      this.request( serie, slotId, interval, priority, id, noProcess );
    }
  }

  PluginTimeSerieManager.prototype.request = function( serie, slotId, interval, priority, slotName, noProcess ) {

    for ( var i in this.requestLevels ) {

      if ( i == priority ) {
        continue;
      }

      if ( this.requestLevels[ i ][ slotId ] ) {

        if ( this.requestLevels[ i ][ slotId ][ 0 ] !== 1 ) { // If the request is not pending

          delete this.requestLevels[ i ][ slotId ];

        } else {
          this.requestLevels[ i ][ slotId ][ 5 ] = priority;
        }

      }
    }

    if ( this.requestLevels[ priority ] && this.requestLevels[ priority ][ slotId ] ) {
      return;
    }

    this.requestLevels[ priority ] = this.requestLevels[ priority ] || {};
    this.requestLevels[ priority ][ slotId ] = [ 0, slotName, serie.getName(), slotId, interval, priority ];

    if ( !noProcess ) {
      this.processRequests();
    }
  }

  PluginTimeSerieManager.prototype.processRequests = function() {

    if ( this.requestsRunning == this.options.maxParallelRequests ) {
      return;
    }

    var self = this,
      currentLevelChecking = 1,
      requestToMake;

    while ( true ) {

      for ( var i in this.requestLevels[ currentLevelChecking ] ) {

        if ( this.requestLevels[ currentLevelChecking ][ i ][ 0 ] == 1 ) { // Running request
          continue;
        }

        requestToMake = this.requestLevels[ currentLevelChecking ][ i ];
        break;
      }

      if ( requestToMake ) {
        break;
      }

      currentLevelChecking++;

      if ( currentLevelChecking > 10 ) {
        return;
      }

    }

    this.requestsRunning++;

    if ( !requestToMake ) {
      return;
    }

    requestToMake[ 0 ] = 1;

    $.ajax( {

      url: this.getURL( requestToMake ),
      method: 'get',
      dataType: 'json'

    } ).done( function( data ) {

      self.requestsRunning--;

      LRU.store( self.options.LRUName, requestToMake[ 1 ], data ); // Element 1 is the unique ID
      self.processRequests();

      if ( requestToMake[ 5 ] == 1 ) {
        self.recalculateSeries();
      }

    } );
  }

  PluginTimeSerieManager.prototype.getURL = function( requestElements ) {

    return this.options.url
      .replace( "<measurementid>", requestElements[  2 ] )
      .replace( '<from>', requestElements[  3 ] * ( requestElements[ 4 ] * this.options.nbPoints ) )
      .replace( '<to>', ( requestElements[  3 ] + 1 ) * ( requestElements[ 4 ] * this.options.nbPoints ) )
      .replace( '<interval>', requestElements[  4 ] );
  }

  PluginTimeSerieManager.prototype.getOptimalInterval = function( totalspan ) {

    var optimalInterval = ( this.options.optimalPxPerPoint ||  1 ) * totalspan / this.graph.getDrawingWidth(),
      diff = Infinity,
      optimalIntervalAmongAvailable;

    this.options.intervals.forEach( function( interval ) {

      var newDiff = Math.min( diff, Math.abs( interval - optimalInterval ) );
      if ( diff !== newDiff ) {

        optimalIntervalAmongAvailable = interval;
        diff = newDiff;
      }
    } );

    return optimalIntervalAmongAvailable ||  1000;
  }

  PluginTimeSerieManager.prototype.computeUniqueID = function( serie, slotId, interval ) {
    return serie.getName() + ";" + slotId + ";" + interval;
  }

  PluginTimeSerieManager.prototype.computeSlotID = function( time, interval ) {
    return Math.floor( time / ( interval * this.options.nbPoints ) );
  }

  PluginTimeSerieManager.prototype.computeSlotTime = function( slotId, interval ) {
    return slotId * ( interval * this.options.nbPoints );
  }

  PluginTimeSerieManager.prototype.recalculateSeries = function() {

    var self = this;
    this.series.map( function( serie ) {
      self.recalculateSerie( serie );
    } );

    self.graph._applyToAxes( "scaleToFitAxis", [ this.graph.getXAxis(), false, true, true, true, true ], false, true );

    //self.graph.autoscaleAxes();

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

    while ( slotId <= endSlotId ) {

      if ( lruData = LRU.get( this.options.LRUName, this.computeUniqueID( serie, slotId, interval ) ) ) {

        data = data.concat( lruData.data );

      } else {

        data = data.concat( this.recalculateSerieUpwards( serie, slotId, interval ) );
      }

      slotId++;
    }

    serie.setData( data );
  }

  PluginTimeSerieManager.prototype.recalculateSerieUpwards = function( serie, downSlotId, downInterval ) {

    var intervals = this.options.intervals.slice( 0 );
    intervals.sort();

    var nextInterval = intervals[ intervals.indexOf( downInterval ) + 1 ] ||  -1;
    var lruData;
    if ( nextInterval < 0 ) {
      return [];
    }

    var newSlotTime = this.computeSlotTime( downSlotId, downInterval );
    var newSlotTimeEnd = this.computeSlotTime( downSlotId + 1, downInterval );
    var newSlotId = this.computeSlotID( newSlotTime, nextInterval ),
      start = false;

    if ( lruData = LRU.get( this.options.LRUName, this.computeUniqueID( serie, newSlotId, nextInterval ) ) ) {

      for ( var i = 0, l = lruData.length; i < l; i += 2 ) {

        if ( lruData[ i ] < newSlotTime ) {
          continue;

        } else if ( start === false ) {
          start = i;
        }

        if ( lruData[  i ] >= newSlotTimeEnd ) {

          return lruData.slice( start, i );
        }
      }
    }

    return this.recalculateSerieUpwards( serie, newSlotId, nextInterval );
  }

  return PluginTimeSerieManager;
} );