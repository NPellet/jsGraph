import Graph from './graph.core'
import GraphPosition from './graph.position'

import AxisX from './graph.axis.x'
import AxisY from './graph.axis.y'
import AxisXBar from './graph.axis.x.bar'
import AxisXTime from './graph.axis.x.time'

define( [
    './graph.axis.x.broken',
    './graph.axis.y.broken',

    './graph.legend',

    './plugins/graph.plugin',
    './plugins/graph.plugin.drag',
    './plugins/graph.plugin.shape',
    './plugins/graph.plugin.selectScatter',
    './plugins/graph.plugin.zoom',
    './plugins/graph.plugin.timeseriemanager',
    './plugins/graph.plugin.serielinedifference',

    './series/graph.serie',
    './series/graph.serie.contour',
    './series/graph.serie.bar',
    './series/graph.serie.line',
    './series/graph.serie.line.broken',
    './series/graph.serie.line.colored',
    './series/graph.serie.scatter',
    './series/graph.serie.zone',
    './series/graph.serie.densitymap',

    './shapes/graph.shape',
    './shapes/graph.shape.areaundercurve',
    './shapes/graph.shape.arrow',
    './shapes/graph.shape.ellipse',
    './shapes/graph.shape.label',
    './shapes/graph.shape.polyline',
    './shapes/graph.shape.line',
    './shapes/graph.shape.nmrintegral',
    './shapes/graph.shape.peakintegration2d',
    './shapes/graph.shape.peakinterval',
    './shapes/graph.shape.peakinterval2',
    './shapes/graph.shape.rangex',
    './shapes/graph.shape.rect',
    './shapes/graph.shape.cross',
    './shapes/graph.shape.zoom2d',
    './shapes/graph.shape.peakboundariescenter',

    './graph.toolbar'

  ],

  function(

    GraphXAxisBroken,
    GraphYAxisBroken,

    GraphLegend,

    GraphPlugin,
    GraphPluginDrag,
    GraphPluginShape,
    GraphPluginSelectScatter,
    GraphPluginZoom,
    GraphPluginTimeSerieManager,
    GraphPluginSerieLineDifference,

    GraphSerie,
    GraphSerieContour,
    GraphSerieBar,
    GraphSerieLine,
    GraphSerieLineBroken,
    GraphSerieLineColor,
    GraphSerieScatter,
    GraphSerieZone,
    GraphSerieDensityMap,

    GraphShape,
    GraphShapeAreaUnderCurve,
    GraphShapeArrow,
    GraphShapeEllipse,
    GraphShapeLabel,
    GraphShapePolyLine,
    GraphShapeLine,
    GraphShapeNMRIntegral,
    GraphShapePeakIntegration2D,
    GraphShapePeakInterval,
    GraphShapePeakInterval2,
    GraphShapeRangeX,
    GraphShapeRect,
    GraphShapeCross,
    GraphShapeZoom2D,
    GraphShapePeakBoundariesCenter,

    GraphToolbar

  ) {

    console.log( Graph, GraphPosition, AxisX );

    // Corrent naming is important here !

    Graph.registerConstructor( "graph.position", GraphPosition );

    Graph.registerConstructor( "graph.axis.x", AxisX );
    Graph.registerConstructor( "graph.axis.y", AxisY );
    Graph.registerConstructor( "graph.axis.x.bar", AxisXBar );
    Graph.registerConstructor( "graph.axis.x.broken", GraphXAxisBroken );
    Graph.registerConstructor( "graph.axis.y.broken", GraphYAxisBroken );
    Graph.registerConstructor( "graph.axis.x.time", AxisXTime );

    Graph.registerConstructor( "graph.serie.line", GraphSerieLine );
    Graph.registerConstructor( "graph.serie.line.color", GraphSerieLineColor );
    Graph.registerConstructor( "graph.serie.contour", GraphSerieContour );
    Graph.registerConstructor( "graph.serie.bar", GraphSerieBar );
    Graph.registerConstructor( "graph.serie.line.broken", GraphSerieLineBroken );
    Graph.registerConstructor( "graph.serie.scatter", GraphSerieScatter );
    Graph.registerConstructor( "graph.serie.zone", GraphSerieZone );
    Graph.registerConstructor( "graph.serie.densitymap", GraphSerieDensityMap );

    Graph.registerConstructor( "graph.plugin.shape", GraphPluginShape );
    Graph.registerConstructor( "graph.plugin.drag", GraphPluginDrag );
    Graph.registerConstructor( "graph.plugin.zoom", GraphPluginZoom );
    Graph.registerConstructor( "graph.plugin.selectScatter", GraphPluginSelectScatter );
    Graph.registerConstructor( "graph.plugin.timeSerieManager", GraphPluginTimeSerieManager );
    Graph.registerConstructor( "graph.plugin.serielinedifference", GraphPluginSerieLineDifference );
    Graph.registerConstructor( "graph.plugin.serieLineDifference", GraphPluginSerieLineDifference );

    Graph.registerConstructor( "graph.shape", GraphShape );
    Graph.registerConstructor( "graph.shape.areaundercurve", GraphShapeAreaUnderCurve );
    Graph.registerConstructor( "graph.shape.arrow", GraphShapeArrow );
    Graph.registerConstructor( "graph.shape.ellipse", GraphShapeEllipse );
    Graph.registerConstructor( "graph.shape.label", GraphShapeLabel );
    Graph.registerConstructor( "graph.shape.polyline", GraphShapePolyLine );
    Graph.registerConstructor( "graph.shape.line", GraphShapeLine );
    Graph.registerConstructor( "graph.shape.nmrintegral", GraphShapeNMRIntegral );
    Graph.registerConstructor( "graph.shape.peakintegration2d", GraphShapePeakIntegration2D );
    Graph.registerConstructor( "graph.shape.peakinterval", GraphShapePeakInterval );
    Graph.registerConstructor( "graph.shape.peakinterval2", GraphShapePeakInterval2 );
    Graph.registerConstructor( "graph.shape.rangex", GraphShapeRangeX );
    Graph.registerConstructor( "graph.shape.rect", GraphShapeRect );
    Graph.registerConstructor( "graph.shape.rectangle", GraphShapeRect );
    Graph.registerConstructor( "graph.shape.cross", GraphShapeCross );
    Graph.registerConstructor( "graph.shape.zoom2d", GraphShapeZoom2D );
    Graph.registerConstructor( "graph.shape.peakboundariescenter", GraphShapePeakBoundariesCenter );

    Graph.registerConstructor( "graph.toolbar", GraphToolbar );
    Graph.registerConstructor( "graph.legend", GraphLegend );

    return Graph;
  } );