define( [ './graph.plugin' ], function( Plugin ) {

  /** 
   * Constructor for the drag plugin. Do not use this constructor directly.
   * @class PluginDrag
   * @implements Plugin
   */
  var PluginDrag = function() {};

  PluginDrag.prototype = new Plugin();

  PluginDrag.prototype.defaults = {

    dragX: true,
    dragY: true,
    persistanceX: false,
    persistanceY: false
  };

  /**
   * @memberof PluginDrag
   * @private
   */
  PluginDrag.prototype.init = function( graph ) {

    this.time = null;
    this.totaltime = 2000;

    // x = ( 1 / 2 a t^2 + v0 * t * x0 );

  };

  /**
   * @memberof PluginDrag
   * @private
   */
  PluginDrag.prototype.onMouseDown = function( graph, x, y, e, target ) {
      this._draggingX = x;
      this._draggingY = y;

      this.stopAnimation = true;

      return true;
    },

    /**
     * @memberof PluginDrag
     * @private
     */
    PluginDrag.prototype.onMouseMove = function( graph, x, y, e, target ) {

      var deltaX = x - this._draggingX;
      var deltaY = y - this._draggingY;

      if ( this.options.dragX ) {
        graph._applyToAxes( function( axis ) {
          axis.setCurrentMin( axis.getVal( axis.getMinPx() - deltaX ) );
          axis.setCurrentMax( axis.getVal( axis.getMaxPx() - deltaX ) );
        }, false, true, false );
      }

      if ( this.options.dragY ) {

        graph._applyToAxes( function( axis ) {
          axis.setCurrentMin( axis.getVal( axis.getMinPx() - deltaY ) );
          axis.setCurrentMax( axis.getVal( axis.getMaxPx() - deltaY ) );
        }, false, false, true );
      }

      this._lastDraggingX = this._draggingX;
      this._lastDraggingY = this._draggingY;

      this._draggingX = x;
      this._draggingY = y;

      this.time = Date.now();

      graph.draw( true );

    }

  PluginDrag.prototype.onMouseUp = function( graph, x, y, e, target ) {

    var dt = ( Date.now() - this.time );

    this.speedX = ( x - this._lastDraggingX ) / dt;
    this.speedY = ( y - this._lastDraggingY ) / dt;

    graph._applyToAxes( function( axis ) {
      axis._pluginDragMin = axis.getCurrentMin();
      axis._pluginDragMax = axis.getCurrentMax();
    }, false, true, true );

    this.stopAnimation = false;
    this.accelerationX = -this.speedX / this.totaltime;
    this.accelerationY = -this.speedY / this.totaltime;

    if ( this.options.persistanceX ||  this.options.persistanceY ) {
      this._persistanceMove( graph );
    }

  }

  PluginDrag.prototype._persistanceMove = function( graph ) {

    var self = this;

    if ( self.stopAnimation ) {
      return;
    }

    window.requestAnimationFrame( function() {

      var dt = Date.now() - self.time;
      var dx = ( 0.5 * self.accelerationX * dt + self.speedX ) * dt;
      var dy = ( 0.5 * self.accelerationY * dt + self.speedY ) * dt;

      if ( self.options.persistanceX ) {

        graph._applyToAxes( function( axis ) {

          axis.setCurrentMin( -axis.getRelVal( dx ) + axis._pluginDragMin );
          axis.setCurrentMax( -axis.getRelVal( dx ) + axis._pluginDragMax );

        }, false, true, false );
      }

      if ( self.options.persistanceY ) {

        graph._applyToAxes( function( axis ) {

          axis.setCurrentMin( -axis.getRelVal( dy ) + axis._pluginDragMin );
          axis.setCurrentMax( -axis.getRelVal( dy ) + axis._pluginDragMax );

        }, false, false, true );
      }

      graph.draw( true );

      if ( dt < self.totaltime ) {
        self._persistanceMove( graph );
      }

    } );

  }

  return PluginDrag;

} );