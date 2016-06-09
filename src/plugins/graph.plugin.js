define( [ '../dependencies/eventEmitter/EventEmitter' ], function( EventEmitter ) {

  /**
   * @class Plugin
   * @interface
   */
  var Plugin = function() {};

  Plugin.prototype = new EventEmitter();

  /**
   * Init function called by jsGraph on load
   * @memberof Plugin
   */
  Plugin.prototype.init = function() {};

  /**
   * Handles the mousedown event from jsGraph
   * @param {Graph} graph - The graph instance
   * @param {Number} x - The x position in px
   * @param {Number} y - The y position in px
   * @param {Event} e - The original event
   * @param {SVGElement} target - The target element
   * @memberof Plugin
   */
  Plugin.prototype.onMouseDown = function() {};

  /**
   * Handles the mouseup event from jsGraph
   * @param {Graph} graph - The graph instance
   * @param {Number} x - The x position in px
   * @param {Number} y - The y position in px
   * @param {Event} e - The original event
   * @param {SVGElement} target - The target element
   * @memberof Plugin
   */
  Plugin.prototype.onMouseUp = function() {};

  /**
   * Handles the mousemove event from jsGraph
   * @param {Graph} graph - The graph instance
   * @param {Number} x - The x position in px
   * @param {Number} y - The y position in px
   * @param {Event} e - The original event
   * @param {SVGElement} target - The target element
   * @memberof Plugin
   */
  Plugin.prototype.onMouseMove = function() {};

  return Plugin;
} );