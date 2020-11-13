const makeAnnotation = (graph, json, serie, axes) => {
  if (json.type) {

    if (json.properties.label) {

      if (!Array.isArray(json.properties.label)) {
        json.properties.label = [json.properties.label];
      }

      json.properties.label.forEach((label, index) => {

        for (let propertyName in label) {
          let newPropertyName = `label${propertyName.charAt(0).toUpperCase()}${propertyName.slice(1)}`;

          if (!json.properties[newPropertyName]) {
            json.properties[newPropertyName] = [];
          }
          json.properties[newPropertyName][index] = label[propertyName];

        }
      });
    }

    const shape = graph.newShape(json.type, {}, false, json.properties);

    if (json.serie) {
      shape.setSerie(json.serie);
    }

    if (serie) {
      shape.setSerie(serie);
    }

    if (json.layer) {
      shape.setLayer(json.layer);
    }

    if (json.xAxis) {
      shape.setXAxis(axes[json.xAxis]);
    }

    if (json.yAxis) {
      shape.setYAxis(axes[json.yAxis]);
    }

    shape.draw();
    shape.redraw();
  }
};

export default makeAnnotation;