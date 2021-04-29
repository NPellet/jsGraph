import Graph from './graph.core';
// @ts-ignore
import GraphPosition from './graph.position.js';
// @ts-ignore
import GraphLegend from './graph.legend.js';
// @ts-ignore
import AxisX from './graph.axis.x.js';
// @ts-ignore
import AxisY from './graph.axis.y.js';
// @ts-ignore
import AxisXBar from './graph.axis.x.bar.js';
// @ts-ignore
import AxisXTime from './graph.axis.x.time.js';

// @ts-ignore
import SerieHistogram from './series/graph.serie.histogram';
// @ts-ignore
import SerieLine from './series/graph.serie.line';
// @ts-ignore
import SerieLine3D from './series/graph.serie.line.3d.js';
// @ts-ignore
import SerieBar from './series/graph.serie.bar.js';
// @ts-ignore
import SerieBox from './series/graph.serie.box.js';
// @ts-ignore
import SerieLineColor from './series/graph.serie.line.colored.js';
// @ts-ignore
import SerieScatter from './series/graph.serie.scatter';
// @ts-ignore
import SerieZone from './series/graph.serie.zone.js';
// @ts-ignore
import SerieZone3D from './series/graph.serie.zone.3d.js';
// @ts-ignore
import SerieDensityMap from './series/graph.serie.densitymap.js';
// @ts-ignore
import SerieContour from './series/graph.serie.contour.js';
// @ts-ignore
import Shape from './shapes/graph.shape.js';
// @ts-ignore
import ShapeAreaUnderCurve from './shapes/graph.shape.areaundercurve.js';
// @ts-ignore
import ShapeArrow from './shapes/graph.shape.arrow.js';
// @ts-ignore
import ShapeEllipse from './shapes/graph.shape.ellipse.js';
// @ts-ignore
import ShapeLabel from './shapes/graph.shape.label.js';
// @ts-ignore
import ShapePolyline from './shapes/graph.shape.polyline.js';
import ShapePolygon from './shapes/graph.shape.polygon.js';
// @ts-ignore
import ShapeLine from './shapes/graph.shape.line.js';
// @ts-ignore
import ShapeNMRIntegral from './shapes/graph.shape.nmrintegral.js';
// @ts-ignore
import ShapePeakIntegration2D from './shapes/graph.shape.peakintegration2d.js';
// @ts-ignore
import ShapeRect from './shapes/graph.shape.rect.js';
// @ts-ignore
import ShapeCross from './shapes/graph.shape.cross.js';
// @ts-ignore
import ShapePeakBoundariesCenter from './shapes/graph.shape.peakboundariescenter.js';
// @ts-ignore
import ShapeHTML from './shapes/graph.shape.html.js';
// @ts-ignore
import GraphPlugin from './plugins/graph.plugin.js';
// @ts-ignore
import GraphPluginDrag from './plugins/graph.plugin.drag.js';
// @ts-ignore
import GraphPluginShape from './plugins/graph.plugin.shape.js';
// @ts-ignore
import GraphPluginSelectScatter from './plugins/graph.plugin.selectScatter.js';
// @ts-ignore
import GraphPluginZoom from './plugins/graph.plugin.zoom.js';
// @ts-ignore
import GraphPluginTimeSerieManager from './plugins/graph.plugin.timeseriemanager.js';
// @ts-ignore
import GraphPluginSerieLineDifference from './plugins/graph.plugin.serielinedifference.js';
// @ts-ignore
import GraphPluginAxisSplitting from './plugins/graph.plugin.axissplitting.js';
// @ts-ignore
import GraphPluginMakeTracesDifferent from './plugins/graph.plugin.makeTracesDifferent.js';
// @ts-ignore
import GraphPluginPeakPicking from './plugins/graph.plugin.peakpicking.js';
// @ts-ignore
import { Waveform } from './util/waveform';
// @ts-ignore
import FitLM from './util/fit_lm.js';
import { SERIE_TYPE } from '../types/series';

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
Graph.registerConstructor( 'graph.serie.histogram', SerieHistogram );
Graph.registerConstructor( 'graph.serie.bar', SerieBar );
Graph.registerConstructor( 'graph.serie.box', SerieBox );
Graph.registerConstructor( 'graph.serie.scatter', SerieScatter );
Graph.registerConstructor( 'graph.serie.zone', SerieZone );
Graph.registerConstructor( 'graph.serie.zone.3d', SerieZone3D );
Graph.registerConstructor( 'graph.serie.densitymap', SerieDensityMap );


Graph.registerConstructor( SERIE_TYPE.LINE, SerieLine );
Graph.registerConstructor( SERIE_TYPE.HISTOGRAM, SerieHistogram );
Graph.registerConstructor( SERIE_TYPE.LINE_3D, SerieLine3D );
Graph.registerConstructor( SERIE_TYPE.LINE_COLORED, SerieLineColor );
Graph.registerConstructor( SERIE_TYPE.CONTOUR, SerieContour );
Graph.registerConstructor( SERIE_TYPE.BAR, SerieBar );
Graph.registerConstructor( SERIE_TYPE.BOX, SerieBox );
Graph.registerConstructor( SERIE_TYPE.SCATTER, SerieScatter );
Graph.registerConstructor( SERIE_TYPE.ZONE, SerieZone );
Graph.registerConstructor( SERIE_TYPE.ZONE_3D, SerieZone3D );
Graph.registerConstructor( SERIE_TYPE.DENSITY_MAP, SerieDensityMap );

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


export { SERIE_TYPE } from '../types/series'
export default Graph;