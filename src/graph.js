
define([ 

	'./graph.core',
	'./graph._serie',
	'./graph.axis',
	'./graph.axis.x',
	'./graph.axis.y',
	'./graph.legend',
	
	'./plugins/graph.plugin.drag',
	'./plugins/graph.plugin.linking',
	'./plugins/graph.plugin.nmrpeakpicking',
	'./plugins/graph.plugin.range',
	'./plugins/graph.plugin.shape',
	'./plugins/graph.plugin.zoom',

	'./graph.serie.contour',
	'./graph.serie',
	'./graph.serie.scatter',
	'./graph.serie.zone',
	'./graph.serieaxis',
	'./graph.serieaxisx',
	'./graph.serieaxisy',
	'./graph.shape.areaundercurve',
	'./graph.shape.arrow',
	'./graph.shape',
	'./graph.shape.label',
	'./graph.shape.line',
	'./graph.shape.nmrintegral',
	'./graph.shape.peakintegration2d',
	'./graph.shape.peakinterval',
	'./graph.shape.peakinterval2',
	'./graph.shape.rangex',
	'./graph.shape.rect',
	'./graph.toolbar',
	'./graph.xaxis.time',
	'./dynamicdepencies'

	],

 function( Graph ) {

 	// Corrent naming is important here !
	return Graph;
	
});


