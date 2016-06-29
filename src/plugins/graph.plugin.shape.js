define( [ 'jquery', './graph.plugin', '../graph.util' ], function( $, Plugin, util ) {

  "use strict";

  /**
   * @class PluginShape
   * @implements Plugin
   */
  var PluginShape = function() {};

  PluginShape.prototype = new Plugin();

  /**
   * Init method
   * @private
   * @memberof PluginShape
   */
  PluginShape.prototype.init = function( graph, options ) {

    this.graph = graph;
    this.shapeType = options.type;

  };

  /**
   * Sets the shape that is created by the plugin
   * @param {String} shapeType - The type of the shape
   * @memberof PluginShape
   */
  PluginShape.prototype.setShape = function( shapeType ) {
    this.shapeInfo.shapeType = shapeType;
  };

  /**
   * @private
   * @memberof PluginShape
   */
  PluginShape.prototype.onMouseDown = function( graph, x, y, e, target ) {

    if ( !this.shapeType && !this.options.url ) {
      return;
    }

    var self = this,
      selfPlugin = this;

    var xVal, yVal;

    this.count = this.count || 0;

    x -= graph.getPaddingLeft();
    y -= graph.getPaddingTop();

    xVal = graph.getXAxis().getVal( x );
    yVal = graph.getYAxis().getVal( y );

    var shapeInfo = {

      position: [ {
        x: xVal,
        y: yVal
      }, {
        x: xVal,
        y: yVal
      } ],

      onChange: function( newData ) {
        graph.triggerEvent( 'onAnnotationChange', newData );
      },

      locked: false,
      selectable: true,
      resizable: true,
      movable: true
    };

    $.extend( true, shapeInfo, this.options );

    this.emit( "beforeNewShape", shapeInfo, e );

    if ( this.graph.prevent( false ) ) {
      return;
    }

    var shape = graph.newShape( shapeInfo.type, shapeInfo );

    this.emit( "createdShape", shape, e );

    if ( shape ) {
      self.currentShape = shape;
      self.currentShapeEvent = e;
    }

    graph.once( "mouseUp", function() {
      self.emit( "newShape", shape );
    } )
  };

  /**
   * @private
   * @memberof PluginShape
   */
  PluginShape.prototype.onMouseMove = function( graph, x, y, e ) {

    var self = this;
    if ( self.currentShape ) {

      self.count++;

      var shape = self.currentShape;

      self.currentShape = false;

      if ( graph.selectedSerie ) {
        shape.setSerie( graph.selectedSerie );
      }

      shape.resizing = true;

      if ( shape.options && shape.options.onCreate ) {
        shape.options.onCreate.call( shape );
      }

      shape.draw();

      graph.selectShape( shape );

      shape.handleMouseDown( self.currentShapeEvent, true );
      shape.handleSelected = 1;
      shape.handleMouseMove( e, true );
    }
  };

  /**
   * @private
   * @memberof PluginShape
   */
  PluginShape.prototype.onMouseUp = function() {

    var self = this;
    if ( self.currentShape ) {
      // No need to kill it as it hasn't been actually put in the dom right now
      //self.currentShape.kill();
      self.currentShape = false;
    }
  };

  return PluginShape;

} );