import graphFromJson from './main.js';

export default (Graph) => {
  /**
   * Returns a graph created from a schema
   * @param {Object} json
   * @param {HTMLElement} wrapper - The wrapping element
   * @param {Function} callback - A callback function called when something has changed, in the form of ( event, params... ) {}
   * @returns {Graph} Newly created graph
   */
  Graph.fromJSON = (json, wrapper, callback) => {
    const options = json.options || {};
    const graph = new Graph(undefined, options);

    graphFromJson(Graph, graph, json, wrapper);
    graph.setWrapper(wrapper);

    if (callback) {
      graph.onAll(function (eventName, ...args) {
        callback(eventName, ...args);
      });
    }
    return graph;
  }

  Graph.prototype.setJSON = (json, options = {}) => {

    // Destroy the current elements
    this.killSeries();

    const state = {};
    if (options.keepState) {

      this._applyToAxes((axis) => {

        if (axis.options.name) {

          state[axis.options.name] = {
            min: axis.getCurrentMin(),
            max: axis.getCurrentMax()
          };
        }
      }, undefined, true, true);
    }

    this._applyToAxes((axis) => {
      this.killAxis(axis, true, true);
    }, undefined, true, true);

    this.killLegend();
    this.killShapes();

    graphFromJson(Graph, this, json);

    if (options.keepState) {

      this._applyToAxes((axis) => {

        if (axis.options.name && state[axis.options.name]) {

          axis.setCurrentMin(state[axis.options.name].min);
          axis.setCurrentMax(state[axis.options.name].max);
        }
      }, undefined, true, true);
    }

    this.draw();
  }
};