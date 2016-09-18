import Plugin from './graph.plugin'

/** 
 * Constructor for the drag plugin. Do not use this constructor directly.
 * @class PluginDrag
 * @implements Plugin
 */
class PluginDrag extends Plugin {

  static defaults() {
    return {

      dragX: true,
      dragY: true,
      persistanceX: false,
      persistanceY: false

    };
  }

  /**
   * @private
   */
  init( graph ) {

    this.graph = graph;
    this.time = null;
    this.totaltime = 2000;
  }

  /**
   * @private
   */
  onMouseDown( graph, x, y, e, target ) {
    this._draggingX = x;
    this._draggingY = y;

    this._lastDraggingX = this._draggingX;
    this._lastDraggingY = this._draggingY;

    this.stopAnimation = true;

    this.moved = false;

    return true;
  }

  /**
   * @memberof PluginDrag
   * @private
   */
  onMouseMove( graph, x, y, e, target ) {

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

    this.moved = true;

    this.time = Date.now();

    this.emit( "dragging" );

    graph.draw( true );

  }

  onMouseUp( graph, x, y, e, target ) {

    var dt = ( Date.now() - this.time );

    if ( x == this._lastDraggingX ||  y == this._lastDraggingY ) {

      if ( this.moved ) {
        this.emit( "dragged" );
      }

      return;
    }

    this.speedX = ( x - this._lastDraggingX ) / dt;
    this.speedY = ( y - this._lastDraggingY ) / dt;

    if ( isNaN( this.speedX ) ||  isNaN( this.speedY ) ) {
      this.emit( "dragged" );
      return;
    }

    graph._applyToAxes( function( axis ) {
      axis._pluginDragMin = axis.getCurrentMin();
      axis._pluginDragMax = axis.getCurrentMax();
    }, false, true, true );

    this.stopAnimation = false;
    this.accelerationX = -this.speedX / this.totaltime;
    this.accelerationY = -this.speedY / this.totaltime;

    if ( this.options.persistanceX ||  this.options.persistanceY ) {

      this._persistanceMove( graph );

    } else {

      this.emit( "dragged" );
    }

  }

  _persistanceMove( graph ) {

    var self = this;

    if ( self.stopAnimation ) {
      self.emit( "dragged" );
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

          axis.cacheCurrentMin();
          axis.cacheCurrentMax();
          axis.cacheInterval();

        }, false, true, false );
      }

      if ( self.options.persistanceY ) {

        graph._applyToAxes( function( axis ) {

          axis.setCurrentMin( -axis.getRelVal( dy ) + axis._pluginDragMin );
          axis.setCurrentMax( -axis.getRelVal( dy ) + axis._pluginDragMax );

          axis.cacheCurrentMin();
          axis.cacheCurrentMax();
          axis.cacheInterval();

        }, false, false, true );
      }

      graph.draw();

      if ( dt < self.totaltime ) {
        self.emit( "dragging" );
        self._persistanceMove( graph );
      } else {
        self.emit( "dragged" );
      }

    } );

  }
}

export default PluginDrag;