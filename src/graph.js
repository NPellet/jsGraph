import Graph from './graph.core'
import GraphPosition from './graph.position'
import GraphLegend from './graph.legend'

import AxisX from './graph.axis.x'
import AxisY from './graph.axis.y'
import AxisXBar from './graph.axis.x.bar'
import AxisXTime from './graph.axis.x.time'
import AxisXBroken from './graph.axis.x.broken';
import AxisYBroken from './graph.axis.y.broken';

import SerieLine from './series/graph.serie.line'
import SerieBar from './series/graph.serie.bar'
import SerieLineColor from './series/graph.serie.line.colored'
import SerieScatter from './series/graph.serie.scatter'
import SerieZone from './series/graph.serie.zone'
import SerieDensityMap from './series/graph.serie.densitymap'
import SerieContour from './series/graph.serie.contour'

import Shape from './shapes/graph.shape'
import ShapeAreaUnderCurve from './shapes/graph.shape.areaundercurve'
import ShapeArrow from './shapes/graph.shape.arrow'
import ShapeEllipse from './shapes/graph.shape.ellipse'
import ShapeLabel from './shapes/graph.shape.label'
import ShapePolyline from './shapes/graph.shape.polyline'
import ShapeLine from './shapes/graph.shape.line'
import ShapeNMRIntegral from './shapes/graph.shape.nmrintegral'
import ShapePeakIntegration2D from './shapes/graph.shape.peakintegration2d'
import ShapeRect from './shapes/graph.shape.rect'
import ShapeCross from './shapes/graph.shape.cross'
import ShapePeakBoundariesCenter from './shapes/graph.shape.peakboundariescenter'

define( [
    './plugins/graph.plugin',
    './plugins/graph.plugin.drag',
    './plugins/graph.plugin.shape',
    './plugins/graph.plugin.selectScatter',
    './plugins/graph.plugin.zoom',
    './plugins/graph.plugin.timeseriemanager',
    './plugins/graph.plugin.serielinedifference'
    // './graph.toolbar'
  ],

  function(
    GraphPlugin,
    GraphPluginDrag,
    GraphPluginShape,
    GraphPluginSelectScatter,
    GraphPluginZoom,
    GraphPluginTimeSerieManager,
    GraphPluginSerieLineDifference,
    //  GraphToolbar
  ) {

    // Corrent naming is important here !

    Graph.registerConstructor( "graph.position", GraphPosition );

    Graph.registerConstructor( "graph.axis.x", AxisX );
    Graph.registerConstructor( "graph.axis.y", AxisY );
    Graph.registerConstructor( "graph.axis.x.bar", AxisXBar );
    Graph.registerConstructor( "graph.axis.x.broken", AxisXBroken );
    Graph.registerConstructor( "graph.axis.y.broken", AxisYBroken );
    Graph.registerConstructor( "graph.axis.x.time", AxisXTime );

    Graph.registerConstructor( "graph.serie.line", SerieLine );
    Graph.registerConstructor( "graph.serie.line.color", SerieLineColor );
    Graph.registerConstructor( "graph.serie.contour", SerieContour );
    Graph.registerConstructor( "graph.serie.bar", SerieBar );
    Graph.registerConstructor( "graph.serie.scatter", SerieScatter );
    Graph.registerConstructor( "graph.serie.zone", SerieZone );
    Graph.registerConstructor( "graph.serie.densitymap", SerieDensityMap );

    //Graph.registerConstructor( "graph.serie.line.broken", GraphSerieLineBroken );

    Graph.registerConstructor( "graph.plugin.shape", GraphPluginShape );
    Graph.registerConstructor( "graph.plugin.drag", GraphPluginDrag );
    Graph.registerConstructor( "graph.plugin.zoom", GraphPluginZoom );
    Graph.registerConstructor( "graph.plugin.selectScatter", GraphPluginSelectScatter );
    Graph.registerConstructor( "graph.plugin.timeSerieManager", GraphPluginTimeSerieManager );
    Graph.registerConstructor( "graph.plugin.serielinedifference", GraphPluginSerieLineDifference );
    Graph.registerConstructor( "graph.plugin.serieLineDifference", GraphPluginSerieLineDifference );

    Graph.registerConstructor( "graph.shape", Shape );
    Graph.registerConstructor( "graph.shape.areaundercurve", ShapeAreaUnderCurve );
    Graph.registerConstructor( "graph.shape.arrow", ShapeArrow );
    Graph.registerConstructor( "graph.shape.ellipse", ShapeEllipse );
    Graph.registerConstructor( "graph.shape.label", ShapeLabel );
    Graph.registerConstructor( "graph.shape.polyline", ShapePolyline );
    Graph.registerConstructor( "graph.shape.line", ShapeLine );
    Graph.registerConstructor( "graph.shape.nmrintegral", ShapeNMRIntegral );
    Graph.registerConstructor( "graph.shape.peakintegration2d", ShapePeakIntegration2D );
    //  Graph.registerConstructor( "graph.shape.peakinterval", GraphShapePeakInterval );
    //  Graph.registerConstructor( "graph.shape.peakinterval2", GraphShapePeakInterval2 );
    //  Graph.registerConstructor( "graph.shape.rangex", GraphShapeRangeX );
    Graph.registerConstructor( "graph.shape.rect", ShapeRect );
    Graph.registerConstructor( "graph.shape.rectangle", ShapeRect );
    Graph.registerConstructor( "graph.shape.cross", ShapeCross );
    //Graph.registerConstructor( "graph.shape.zoom2d", GraphShapeZoom2D );
    Graph.registerConstructor( "graph.shape.peakboundariescenter", ShapePeakBoundariesCenter );

    //   Graph.registerConstructor( "graph.toolbar", GraphToolbar );
    Graph.registerConstructor( "graph.legend", GraphLegend );

    return Graph;
  } );