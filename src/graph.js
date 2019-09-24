import Graph from './graph.core.js';
import GraphPosition from './graph.position.js';
import GraphLegend from './graph.legend.js';
import AxisX from './graph.axis.x.js';
import AxisY from './graph.axis.y.js';
import AxisXBar from './graph.axis.x.bar.js';
import AxisXTime from './graph.axis.x.time.js';
import SerieLine from './series/graph.serie.line.js';
import SerieLine3D from './series/graph.serie.line.3d.js';
import SerieBar from './series/graph.serie.bar.js';
import SerieBox from './series/graph.serie.box.js';
import SerieLineColor from './series/graph.serie.line.colored.js';
import SerieScatter from './series/graph.serie.scatter.js';
import SerieZone from './series/graph.serie.zone.js';
import SerieZone3D from './series/graph.serie.zone.3d.js';
import SerieDensityMap from './series/graph.serie.densitymap.js';
import SerieContour from './series/graph.serie.contour.js';
import Shape from './shapes/graph.shape.js';
import ShapeAreaUnderCurve from './shapes/graph.shape.areaundercurve.js';
import ShapeArrow from './shapes/graph.shape.arrow.js';
import ShapeEllipse from './shapes/graph.shape.ellipse.js';
import ShapeLabel from './shapes/graph.shape.label.js';
import ShapePolyline from './shapes/graph.shape.polyline.js';
import ShapePolygon from './shapes/graph.shape.polygon.js';
import ShapeLine from './shapes/graph.shape.line.js';
import ShapeNMRIntegral from './shapes/graph.shape.nmrintegral.js';
import ShapePeakIntegration2D from './shapes/graph.shape.peakintegration2d.js';
import ShapeRect from './shapes/graph.shape.rect.js';
import ShapeCross from './shapes/graph.shape.cross.js';
import ShapePeakBoundariesCenter from './shapes/graph.shape.peakboundariescenter.js';
import ShapeHTML from './shapes/graph.shape.html.js';
import GraphPlugin from './plugins/graph.plugin.js';
import GraphPluginDrag from './plugins/graph.plugin.drag.js';
import GraphPluginShape from './plugins/graph.plugin.shape.js';
import GraphPluginSelectScatter from './plugins/graph.plugin.selectScatter.js';
import GraphPluginZoom from './plugins/graph.plugin.zoom.js';
import GraphPluginTimeSerieManager from './plugins/graph.plugin.timeseriemanager.js';
import GraphPluginSerieLineDifference from './plugins/graph.plugin.serielinedifference.js';
import GraphPluginAxisSplitting from './plugins/graph.plugin.axissplitting.js';
import GraphPluginMakeTracesDifferent from './plugins/graph.plugin.makeTracesDifferent.js';
import GraphPluginPeakPicking from './plugins/graph.plugin.peakpicking.js';
import {
  Waveform
} from './util/waveform.js';
import FitLM from './util/fit_lm.js';

// Corrent naming is important here !

Graph.registerConstructor( 'graph.position', GraphPosition );

Graph.registerConstructor( 'graph.axis.x', AxisX );
Graph.registerConstructor( 'graph.axis.y', AxisY );
Graph.registerConstructor( 'graph.axis.x.bar', AxisXBar );
Graph.registerConstructor( 'graph.axis.x.time', AxisXTime );

Graph.registerConstructor( 'graph.serie.line', SerieLine );
Graph.registerConstructor( 'graph.serie.line.3d', SerieLine3D );
Graph.registerConstructor( 'graph.serie.line.color', SerieLineColor );
Graph.registerConstructor( 'graph.serie.contour', SerieContour );
Graph.registerConstructor( 'graph.serie.bar', SerieBar );
Graph.registerConstructor( 'graph.serie.box', SerieBox );
Graph.registerConstructor( 'graph.serie.scatter', SerieScatter );
Graph.registerConstructor( 'graph.serie.zone', SerieZone );
Graph.registerConstructor( 'graph.serie.zone.3d', SerieZone3D );
Graph.registerConstructor( 'graph.serie.densitymap', SerieDensityMap );

Graph.registerConstructor( Graph.SERIE_LINE, SerieLine );
Graph.registerConstructor( Graph.SERIE_LINE_3D, SerieLine3D );
Graph.registerConstructor( Graph.SERIE_LINE_COLORED, SerieLineColor );
Graph.registerConstructor( Graph.SERIE_CONTOUR, SerieContour );
Graph.registerConstructor( Graph.SERIE_BAR, SerieBar );
Graph.registerConstructor( Graph.SERIE_BOX, SerieBox );
Graph.registerConstructor( Graph.SERIE_SCATTER, SerieScatter );
Graph.registerConstructor( Graph.SERIE_ZONE, SerieZone );
Graph.registerConstructor( Graph.SERIE_ZONE_3D, SerieZone3D );
Graph.registerConstructor( Graph.SERIE_DENSITYMAP, SerieDensityMap );

//Graph.registerConstructor( "graph.serie.line.broken", GraphSerieLineBroken );

Graph.registerConstructor( 'graph.plugin.shape', GraphPluginShape );
Graph.registerConstructor( 'graph.plugin.drag', GraphPluginDrag );
Graph.registerConstructor( 'graph.plugin.zoom', GraphPluginZoom );
Graph.registerConstructor( 'graph.plugin.selectScatter', GraphPluginSelectScatter );
Graph.registerConstructor( 'graph.plugin.timeSerieManager', GraphPluginTimeSerieManager );
Graph.registerConstructor( 'graph.plugin.serielinedifference', GraphPluginSerieLineDifference );
Graph.registerConstructor( 'graph.plugin.serieLineDifference', GraphPluginSerieLineDifference );
Graph.registerConstructor( 'graph.plugin.axissplitting', GraphPluginAxisSplitting );
Graph.registerConstructor( 'graph.plugin.makeTracesDifferent', GraphPluginMakeTracesDifferent );
Graph.registerConstructor( 'graph.plugin.peakPicking', GraphPluginPeakPicking );

Graph.registerConstructor( 'graph.shape', Shape );
Graph.registerConstructor( 'graph.shape.areaundercurve', ShapeAreaUnderCurve );
Graph.registerConstructor( 'graph.shape.arrow', ShapeArrow );
Graph.registerConstructor( 'graph.shape.ellipse', ShapeEllipse );
Graph.registerConstructor( 'graph.shape.polygon', ShapePolygon );
Graph.registerConstructor( 'graph.shape.label', ShapeLabel );
Graph.registerConstructor( 'graph.shape.polyline', ShapePolyline );
Graph.registerConstructor( 'graph.shape.line', ShapeLine );
Graph.registerConstructor( 'graph.shape.nmrintegral', ShapeNMRIntegral );
Graph.registerConstructor( 'graph.shape.html', ShapeHTML );
Graph.registerConstructor( 'graph.shape.peakintegration2d', ShapePeakIntegration2D );
//  Graph.registerConstructor( "graph.shape.peakinterval", GraphShapePeakInterval );
//  Graph.registerConstructor( "graph.shape.peakinterval2", GraphShapePeakInterval2 );
//  Graph.registerConstructor( "graph.shape.rangex", GraphShapeRangeX );
Graph.registerConstructor( 'graph.shape.rect', ShapeRect );
Graph.registerConstructor( 'graph.shape.rectangle', ShapeRect );
Graph.registerConstructor( 'graph.shape.cross', ShapeCross );
//Graph.registerConstructor( "graph.shape.zoom2d", GraphShapeZoom2D );
Graph.registerConstructor( 'graph.shape.peakboundariescenter', ShapePeakBoundariesCenter );

//   Graph.registerConstructor( "graph.toolbar", GraphToolbar );
Graph.registerConstructor( 'graph.legend', GraphLegend );
Graph.registerConstructor( 'graph.waveform', Waveform );

export default Graph;