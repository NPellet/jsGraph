import serieStyle from './style.js';
import makeAxes from './axes.js';
import makeAnnotation from './annotations.js';

const makeGraph = ( Graph, graph, json ) => {
  let axes = [];

  graph.resize( json.width || 400, json.height || 300 );

  if ( json.axes ) {
    makeAxes( Graph, graph, json.axes );
  }

  if ( json.legend ) {
    const opts = {};

    if ( json.legend.seriesHideable ) {
      opts.isSerieHideable = true;
    }

    if ( json.legend.seriesSelectable ) {
      opts.isSerieSelectable = true;
    }

    const legend = graph.makeLegend( opts );

    if ( json.legend.position ) {
      switch ( json.legend.position ) {
        case 'bottom':
          legend.setAutoPosition( 'bottom' );
          break;

        case 'top':
          legend.setAutoPosition( 'top' );
          break;

        case 'left':
          legend.setAutoPosition( 'left' );
          break;

        case 'right':
          legend.setAutoPosition( 'right' );
          break;

        default:
          legend.setPosition( json.legend.position );
          break;
      }
    }
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

        case 'color':
          type = Graph.SERIE_LINE_COLORED;
          break;

        case 'line':
        default:
          type = Graph.SERIE_LINE;
          break;
      }

      switch ( jsonSerie.type ) {
        case 'bar':
          data = Graph.newWaveformHash();
          if ( jsonSerie.data.errors ) {
            data.setData( jsonSerie.data.values );
          } else {
            data.setData( jsonSerie.data );
          }

          break;

        default:
        case 'line':
        case 'scatter':
          data = Graph.newWaveform();
          data.setData( jsonSerie.data.y, jsonSerie.data.x );
          break;
      }

      if ( jsonSerie.data.errors ) {
        if ( jsonSerie.data.errors.xBar ) {
          data.setErrorBarX( jsonSerie.data.errors.xBar );
        }
        if ( jsonSerie.data.errors.xBarAbove ) {
          data.setErrorBarXAbove( jsonSerie.data.errors.xBarAbove );
        }
        if ( jsonSerie.data.errors.xBarBelow ) {
          data.setErrorBarXBelow( jsonSerie.data.errors.xBarBelow );
        }

        if ( jsonSerie.data.errors.yBar ) {
          data.setErrorBar( jsonSerie.data.errors.yBar );
        }
        if ( jsonSerie.data.errors.yBarAbove ) {
          data.setErrorBarAbove( jsonSerie.data.errors.yBarAbove );
        }
        if ( jsonSerie.data.errors.yBarBelow ) {
          data.setErrorBarBelow( jsonSerie.data.errors.yBarBelow );
        }

        if ( jsonSerie.data.errors.xBox ) {
          data.setErrorBoxX( jsonSerie.data.errors.xBox );
        }
        if ( jsonSerie.data.errors.xBoxAbove ) {
          data.setErrorBoxXAbove( jsonSerie.data.errors.xBoxAbove );
        }
        if ( jsonSerie.data.errors.xBoxBelow ) {
          data.setErrorBoxXBelow( jsonSerie.data.errors.xBoxBelow );
        }

        if ( jsonSerie.data.errors.yBox ) {
          data.setErrorBox( jsonSerie.data.errors.yBox );
        }
        if ( jsonSerie.data.errors.yBoxAbove ) {
          data.setErrorBoxAbove( jsonSerie.data.errors.yBoxAbove );
        }
        if ( jsonSerie.data.errors.yBoxBelow ) {
          data.setErrorBoxBelow( jsonSerie.data.errors.yBoxBelow );
        }
      }

      const serie = graph.newSerie(
        jsonSerie.name || `_serie_${index}`,
        jsonSerie.options || {},
        type,
      );

      switch ( jsonSerie.type ) {
        case 'color':
          if ( jsonSerie.data.color ) {
            serie.setColors( jsonSerie.data.color );
          }
          break;
        default:
      }

      serie.autoAxis();

      if ( jsonSerie.excludeFromLegend ) {
        serie.excludeFromLegend( true );
      }

      if ( data.xAxis && axes[ data.xAxis ] ) {
        serie.setXAxis( axes[ data.xAxis ] );
      }

      if ( data.yAxis && axes[ data.yAxis ] ) {
        serie.setYAxis( axes[ data.yAxis ] );
      }

      if ( data ) {
        serie.setWaveform( data );
      }

      if ( jsonSerie.style ) {
        serieStyle( Graph, serie, jsonSerie, type );
      }

      if ( jsonSerie.annotations ) {
        jsonSerie.annotations.forEach( ( annotation ) => {
          makeAnnotation( graph, annotation, serie, axes );
        } );
      }
    } );
  }

  if ( json.annotations ) {
    json.annotations.forEach( ( annotation ) => {
      makeAnnotation( graph, annotation, undefined, axes );
    } );
  }
};

export default makeGraph;