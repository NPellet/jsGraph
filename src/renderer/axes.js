const processAxes = (Graph, graph, type, axisOptions, allAxes) => {

  if (!Array.isArray(axisOptions)) {
    axisOptions = [axisOptions];
  }

  axisOptions.forEach((options) => {
    let constructorName;

    if (type == 'x') {
      type = 'bottom';
    } else if (type == 'y') {
      type = 'left';
    }

    if (type == 'bottom' || type == 'top') {
      constructorName = 'graph.axis.x';

      if (options.type == 'category') {
        constructorName += '.bar';
      } else if (options.type == 'time') {
        constructorName += '.time';
      }
    } else {
      constructorName = 'graph.axis.y';
    }

    var axis = new (Graph.getConstructor(constructorName))(graph, type);
    axis.init(graph, options);

    if (type == 'bottom') {
      graph.setBottomAxis(axis, graph.getNumAxes('bottom'));
    } else if (type == 'top') {
      graph.setTopAxis(axis, graph.getNumAxes('top'));
    } else if (type == 'left') {
      graph.setLeftAxis(axis, graph.getNumAxes('left'));
    } else if (type == 'right') {
      graph.setRightAxis(axis, graph.getNumAxes('right'));
    }

    if (options.type == 'category') {
      axis.categories = options.categories;
    }

    if (options.name) {
      allAxes[name] = axis;
    }
  });
};

const makeAxes = (Graph, graph, jsonAxes) => {
  const allAxes = [];
  if (jsonAxes.x) {
    processAxes(Graph, graph, 'x', jsonAxes.x, allAxes);
  }

  if (jsonAxes.y) {
    processAxes(Graph, graph, 'y', jsonAxes.y, allAxes);
  }

  if (jsonAxes.top) {
    processAxes(Graph, graph, 'top', jsonAxes.top, allAxes);
  }

  if (jsonAxes.left) {
    processAxes(Graph, graph, 'left', jsonAxes.left, allAxes);
  }

  if (jsonAxes.bottom) {
    processAxes(Graph, graph, 'bottom', jsonAxes.bottom, allAxes);
  }

  if (jsonAxes.right) {
    processAxes(Graph, graph, 'right', jsonAxes.right, allAxes);
  }
};

export default makeAxes;