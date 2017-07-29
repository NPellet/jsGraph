import Plugin from './graph.plugin'
import * as util from '../graph.util'

/**
 * @class PluginShape
 * @implements Plugin
 */
class PluginShape extends Plugin {

  constructor() {
    super( ...arguments );
  }

  /**
   * Init method
   * @private
   */
  init( graph, options ) {

    super.init( graph, options );
    this.shapeType = options.type;
  }

  /**
   * Sets the shape that is created by the plugin
   * @param {String} shapeType - The type of the shape
   */
  setShape( shapeType ) {
    this.shapeInfo.shapeType = shapeType;
  }

  /**
   * @private
   */
  onMouseDown( graph, x, y, e, target ) {

    if ( !this.shapeType && !this.options.url ) {
      return;
    }
    console.log( 'down' );

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

    let shapeProperties = this.options.properties;

    util.extend( true, shapeInfo, this.options );

    this.emit( "beforeNewShape", e, shapeInfo );

    if ( this.graph.prevent( false ) ) {
      return;
    }

    var shape = graph.newShape( shapeInfo.type, shapeInfo, false, shapeProperties );

    this.emit( "createdShape", e, shape );

    if ( shape ) {
      self.currentShape = shape;
      self.currentShapeEvent = e;
    }

    graph.once( "mouseUp", function() {
      self.emit( "newShape", e, shape );
    } )
  }

  /**
   * @private
   */
  onMouseMove( graph, x, y, e ) {

    var self = this;
    if ( self.currentShape ) {
      console.log( 'mv' );
      self.count++;

      var shape = self.currentShape;

      self.currentShape = false;

      if ( graph.selectedSerie && !shape.serie ) {
        shape.setSerie( graph.selectedSerie );
      }

      shape.resizing = true;

      if ( shape.options && shape.options.onCreate ) {
        shape.options.onCreate.call( shape );
      }

      shape.draw();
      graph.selectShape( shape );
      shape.handleMouseDown( self.currentShapeEvent, true );
      shape.handleSelected = this.options.handleSelected || 1;
      shape.handleMouseMove( e, true );
    }
  }

  /**
   * @private
   */
  onMouseUp() {

    var self = this;
    if ( self.currentShape ) {
      // No need to kill it as it hasn't been actually put in the dom right now
      //self.currentShape.kill();
      self.currentShape = false;
    }
  }

}

export default PluginShape