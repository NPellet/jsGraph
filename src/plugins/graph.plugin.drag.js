define( [ './graph.plugin' ], function( Plugin ) {

  /** 
   * Constructor for the drag plugin. Do not use this constructor directly.
   * @class PluginDrag
   * @implements Plugin
   */
  var PluginDrag = function() {};

  PluginDrag.prototype = new Plugin();

  /**
   * @memberof PluginDrag
   * @private
   */
  PluginDrag.prototype.init = function() {};

  /**
   * @memberof PluginDrag
   * @private
   */
  PluginDrag.prototype.onMouseDown = function( graph, x, y, e, target ) {
    this._draggingX = x;
    this._draggingY = y;

    return true;
  },

  /**
   * @memberof PluginDrag
   * @private
   */
  PluginDrag.prototype.onMouseMove = function( graph, x, y, e, target ) {
    var deltaX = x - this._draggingX;
    var deltaY = y - this._draggingY;

    graph._applyToAxes( function( axis ) {
      axis.setCurrentMin( axis.getVal( axis.getMinPx() - deltaX ) );
      axis.setCurrentMax( axis.getVal( axis.getMaxPx() - deltaX ) );
    }, false, true, false );

    graph._applyToAxes( function( axis ) {
      axis.setCurrentMin( axis.getVal( axis.getMinPx() - deltaY ) );
      axis.setCurrentMax( axis.getVal( axis.getMaxPx() - deltaY ) );
    }, false, false, true );

    this._draggingX = x;
    this._draggingY = y;

    graph.redraw( true );
    graph.drawSeries();
  }

  return PluginDrag;
} );