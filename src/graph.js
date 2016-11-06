import Graph from './graph.core'
import GraphPosition from './graph.position'
import GraphLegend from './graph.legend'

import AxisX from './graph.axis.x'
import AxisY from './graph.axis.y'
import AxisXBar from './graph.axis.x.bar'
import AxisXTime from './graph.axis.x.time'

import SerieLine from './series/graph.serie.line'
import SerieBar from './series/graph.serie.bar'
import SerieBox from './series/graph.serie.box'
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

import GraphPlugin from './plugins/graph.plugin'
import GraphPluginDrag from './plugins/graph.plugin.drag'
import GraphPluginShape from './plugins/graph.plugin.shape'
import GraphPluginSelectScatter from './plugins/graph.plugin.selectScatter'
import GraphPluginZoom from './plugins/graph.plugin.zoom'
import GraphPluginTimeSerieManager from './plugins/graph.plugin.timeseriemanager'
import GraphPluginSerieLineDifference from './plugins/graph.plugin.serielinedifference'
import GraphPluginAxisSplitting from './plugins/graph.plugin.axissplitting'

// Corrent naming is important here !

Graph.registerConstructor( "graph.position", GraphPosition );

Graph.registerConstructor( "graph.axis.x", AxisX );
Graph.registerConstructor( "graph.axis.y", AxisY );
Graph.registerConstructor( "graph.axis.x.bar", AxisXBar );
Graph.registerConstructor( "graph.axis.x.time", AxisXTime );

Graph.registerConstructor( "graph.serie.line", SerieLine );
Graph.registerConstructor( "graph.serie.line.color", SerieLineColor );
Graph.registerConstructor( "graph.serie.contour", SerieContour );
Graph.registerConstructor( "graph.serie.bar", SerieBar );
Graph.registerConstructor( "graph.serie.box", SerieBox );
Graph.registerConstructor( "graph.serie.scatter", SerieScatter );
Graph.registerConstructor( "graph.serie.zone", SerieZone );
Graph.registerConstructor( "graph.serie.densitymap", SerieDensityMap );

Graph.registerConstructor( Graph.SERIE_LINE, SerieLine );
Graph.registerConstructor( Graph.SERIE_LINE_COLORED, SerieLineColor );
Graph.registerConstructor( Graph.SERIE_CONTOUR, SerieContour );
Graph.registerConstructor( Graph.SERIE_BAR, SerieBar );
Graph.registerConstructor( Graph.SERIE_BOX, SerieBox );
Graph.registerConstructor( Graph.SERIE_SCATTER, SerieScatter );
Graph.registerConstructor( Graph.SERIE_ZONE, SerieZone );
Graph.registerConstructor( Graph.SERIE_DENSITYMAP, SerieDensityMap );

//Graph.registerConstructor( "graph.serie.line.broken", GraphSerieLineBroken );

Graph.registerConstructor( "graph.plugin.shape", GraphPluginShape );
Graph.registerConstructor( "graph.plugin.drag", GraphPluginDrag );
Graph.registerConstructor( "graph.plugin.zoom", GraphPluginZoom );
Graph.registerConstructor( "graph.plugin.selectScatter", GraphPluginSelectScatter );
Graph.registerConstructor( "graph.plugin.timeSerieManager", GraphPluginTimeSerieManager );
Graph.registerConstructor( "graph.plugin.serielinedifference", GraphPluginSerieLineDifference );
Graph.registerConstructor( "graph.plugin.serieLineDifference", GraphPluginSerieLineDifference );
Graph.registerConstructor( "graph.plugin.axissplitting", GraphPluginAxisSplitting );

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

module.exports = Graph;