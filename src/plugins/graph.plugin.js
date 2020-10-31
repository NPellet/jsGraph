import EventMixin from '../mixins/graph.mixin.event_graph.js'
/**
 * Represents a plugin
 * @interface
 */
class Plugin {

  static
  default () {
    return {};
  }

  constructor( options ) {
    this.options = Object.assign( {}, Plugin.default(), this.constructor.default(), options );
  }

  /**
   * Init function called by jsGraph on load
   */
  init( graph ) {
    this.graph = graph;
  }

  /**
   * Handles the mousedown event from jsGraph
   * @param {Graph} graph - The graph instance
   * @param {Number} x - The x position in px
   * @param {Number} y - The y position in px
   * @param {Event} e - The original event
   * @param {SVGElement} target - The target element
   */
  onMouseDown() {}

  /**
   * Handles the mouseup event from jsGraph
   * @param {Graph} graph - The graph instance
   * @param {Number} x - The x position in px
   * @param {Number} y - The y position in px
   * @param {Event} e - The original event
   * @param {SVGElement} target - The target element
   */
  onMouseUp() {}

  /**
   * Handles the mousemove event from jsGraph
   * @param {Graph} graph - The graph instance
   * @param {Number} x - The x position in px
   * @param {Number} y - The y position in px
   * @param {Event} e - The original event
   * @param {SVGElement} target - The target element
   */
  onMouseMove() {}
}

EventMixin( Plugin, "plugin" );
export default Plugin;