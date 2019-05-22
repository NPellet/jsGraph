const makeAnnotation = ( graph, json, serie, axes ) => {
  if ( json.type ) {
    const shape = graph.newShape( json.type, {}, false, json.properties );

    if ( json.serie ) {
      shape.setSerie( json.serie );
    }

    if ( serie ) {
      shape.setSerie( serie );
    }

    if ( json.layer ) {
      shape.setLayer( json.layer );
    }

    if ( json.xAxis ) {
      shape.setXAxis( axes[ json.xAxis ] );
    }

    if ( json.yAxis ) {
      shape.setYAxis( axes[ json.yAxis ] );
    }

    shape.draw();
    shape.redraw();
  }
};

export default makeAnnotation;