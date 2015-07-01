define( [

    './graph.core',
    './graph._serie',
    './graph.axis',
    './graph.axis.x',
    './graph.axis.y',

    './graph.axis.x.broken',
    './graph.axis.y.broken',
    './graph.axis.x.time',

    './graph.legend',

    './plugins/graph.plugin.drag',
    './plugins/graph.plugin.shape',
    './plugins/graph.plugin.selectScatter',
    './plugins/graph.plugin.zoom',

    './series/graph.serie.contour',
    './series/graph.serie.line',
    './series/graph.serie.line.broken',
    './series/graph.serie.scatter',
    './series/graph.serie.zone',

    './shapes/graph.shape',
    './shapes/graph.shape.areaundercurve',
    './shapes/graph.shape.arrow',
    './shapes/graph.shape.ellipse',
    './shapes/graph.shape.label',
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

    './graph.toolbar',
    './graph.legend'

  ],

  function(
    Graph,
    _serie,
    _axis,
    GraphXAxis,
    GraphYAxis,
    GraphXAxisBroken,
    GraphYAxisBroken,
    GraphXAxisTime,
    GraphLegend,
    GraphPluginDrag,
    GraphPluginShape,
    GraphPluginSelectScatter,
    GraphPluginZoom,

    GraphSerieContour,
    GraphSerieLine,
    GraphSerieLineBroken,
    GraphSerieScatter,
    GraphSerieZone,

    _shape,
    GraphShapeAreaUnderCurve,
    GraphShapeArrow,
    GraphShapeEllipse,
    GraphShapeLabel,
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

    GraphToolbar,
    GraphLegend

  ) {

    // Corrent naming is important here !

    Graph.registerConstructor( "graph.axis.x", GraphXAxis );
    Graph.registerConstructor( "graph.axis.y", GraphYAxis );
    Graph.registerConstructor( "graph.axis.x.broken", GraphXAxisBroken );
    Graph.registerConstructor( "graph.axis.y.broken", GraphYAxisBroken );
    Graph.registerConstructor( "graph.axis.x.time", GraphXAxisTime );

    Graph.registerConstructor( "graph.serie.line", GraphSerieLine );
    Graph.registerConstructor( "graph.serie.contour", GraphSerieContour );
    Graph.registerConstructor( "graph.serie.line.broken", GraphSerieLineBroken );
    Graph.registerConstructor( "graph.serie.scatter", GraphSerieScatter );
    Graph.registerConstructor( "graph.serie.zone", GraphSerieZone );

    Graph.registerConstructor( "graph.plugin.shape", GraphPluginShape );
    Graph.registerConstructor( "graph.plugin.drag", GraphPluginDrag );
    Graph.registerConstructor( "graph.plugin.zoom", GraphPluginZoom );
    Graph.registerConstructor( "graph.plugin.selectScatter", GraphPluginSelectScatter );

    Graph.registerConstructor( "graph.shape.areaundercurve", GraphShapeAreaUnderCurve );
    Graph.registerConstructor( "graph.shape.arrow", GraphShapeArrow );
    Graph.registerConstructor( "graph.shape.ellipse", GraphShapeEllipse );
    Graph.registerConstructor( "graph.shape.label", GraphShapeLabel );
    Graph.registerConstructor( "graph.shape.line", GraphShapeLine );
    Graph.registerConstructor( "graph.shape.nmrintergral", GraphShapeNMRIntegral );
    Graph.registerConstructor( "graph.shape.peakintegration2d", GraphShapePeakIntegration2D );
    Graph.registerConstructor( "graph.shape.peakinterval", GraphShapePeakInterval );
    Graph.registerConstructor( "graph.shape.peakinterval2", GraphShapePeakInterval2 );
    Graph.registerConstructor( "graph.shape.rangex", GraphShapeRangeX );
    Graph.registerConstructor( "graph.shape.rect", GraphShapeRect );
    Graph.registerConstructor( "graph.shape.cross", GraphShapeCross );
    Graph.registerConstructor( "graph.shape.zoom2d", GraphShapeZoom2D );
    Graph.registerConstructor( "graph.shape.peakboundariescenter", GraphShapePeakBoundariesCenter );

    Graph.registerConstructor( "graph.toolbar", GraphToolbar );
    Graph.registerConstructor( "graph.legend", GraphLegend );

    return Graph;

  } );