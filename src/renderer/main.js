import serieStyle from './style.js';
import makeAxes from './axes.js';
import makeAnnotation from './annotations.js';

const makeGraph = ( Graph, json, wrapper ) => {
  const graph = new Graph( wrapper );
  let axes = [];

  graph.resize( json.width || 400, json.height || 300 );

  if ( json.axes ) {
    makeAxes( Graph, graph, json.axes );
  }

  if ( json.series ) {
    if ( !Array.isArray( json.series ) ) {
      json.series = [ json.series ];
    }

    json.series.forEach( ( jsonSerie, index ) => {
      let type, data;

      switch ( jsonSerie.type ) {
        case 'scatter':
          type = Graph.SERIE_SCATTER;
          break;

        case 'bar':
          type = Graph.SERIE_BAR;
          break;

        case 'box':
          type = Graph.SERIE_BOX;
          break;

        case 'line':
        default:
          type = Graph.SERIE_LINE;
          break;
      }

      switch ( jsonSerie.type ) {
        case 'bar':
          data = Graph.newWaveformHash();
          data.setData( jsonSerie.data );
          break;

        default:
        case 'line':
        case 'scatter':
          data = Graph.newWaveform();
          data.setData( jsonSerie.data.y, jsonSerie.data.x );
          break;
      }

      const serie = graph.newSerie(
        jsonSerie.name || `_serie_${index}`,
        {},
        type
      );
      serie.autoAxis();

      if ( data.xAxis && axes[data.xAxis] ) {
        serie.setXAxis( axes[data.xAxis] );
      }

      if ( data.yAxis && axes[data.yAxis] ) {
        serie.setYAxis( axes[data.yAxis] );
      }

      if ( data ) {
        serie.setWaveform( data );
      }

      if ( jsonSerie.style ) {
        serieStyle( Graph, serie, jsonSerie, type );
      }

      if ( jsonSerie.annotations ) {
        jsonSerie.annotations.forEach( ( annotation ) => {
          makeAnnotation( graph, annotation, undefined, axes );
        } );
      }
    } );
  }

  if ( json.annotations ) {
    json.annotations.forEach( ( annotation ) => {
      makeAnnotation( graph, annotation, undefined, axes );
    } );
  }

  return graph;
};

export default makeGraph;
