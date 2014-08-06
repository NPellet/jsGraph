
requirejs.config({
	paths: {
		'jquery': './lib/components/jquery/dist/jquery.min',
		'jqueryui': './lib/components/jquery-ui/ui/minified/jquery-ui.min',
		'highlightjs': './lib/lib/highlight/highlight.pack',
		'forms': './lib/lib/forms/form',
		'components': './lib/components'
	}
});

require( [ 'src/graph', 'highlightjs' ] , function( Graph ) {


	var t = 0;


	var funcX = function( t ) {

		return 6 * Math.sin( t * 1 ) - 1* Math.sin( t * 6);
	}


	var funcY = function( t ) {
		return 6 * Math.cos( t * 1 ) - 1*Math.cos( t * 6 ) ;
	}


	var funcX2 = function( t ) {

		return  Math.sin( t ) * 5;
	}


	var funcY2 = function( t ) {
		return Math.cos( t ) * 5;
	}


	var data1 = [];
	for( var t = 0; t < 4 * Math.PI; t += 0.01 ) {
		data1.push( funcX( t ) );
		data1.push( funcY( t ) );
	}


	var data2 = [];
	for( var t = 0; t < 4 * Math.PI; t += 0.01 ) {
		data2.push( funcX2( t ) );
		data2.push( funcY2( t ) );
	}



	var functions = [

[ function( domGraph ) {

	var graph = new Graph( domGraph, { title: "Graph title" } );
	
	graph.newSerie("serieTest")
		.setLabel( "My serie" )
		.autoAxis()
		.setData( data1 );

	graph.newSerie("serieTest_2")
		.setLabel( "My serie 2" )
		.autoAxis()
		.setData( data2 )
		.setLineColor('red');

/*
	var legend = graph.makeLegend({
		movable: true,
		frame: true,
		frameWidth: 1,
		frameColor: "#c0c0c0",
		backgroundColor: "rgba(255, 255, 255, 0.8)"
	});
*/
	graph.redraw( );
	graph.drawSeries();	

//	legend.setPosition( { dx: "-10px", dy: "10px", x: "max", y: "max" }, "right", "top" );


}, "Default functionnality", "" ],

/*
[ function( domGraph ) {

	var graph = new Graph( domGraph, {

		wheel: {
			type: 'plugin',
			plugin: './graph.plugin.zoom',
			options: {
				direction: 'y'
			}
		},

		dblclick: {
			type: 'plugin',
			plugin: './graph.plugin.zoom',
			options: {
				mode: 'total'
			}
		},

		plugins: {
			'./graph.plugin.zoom': { zoomMode: 'x' },
			'./graph.plugin.drag': {}
		},

		pluginAction: {
			'./graph.plugin.drag': { shift: true, ctrl: false },
			'./graph.plugin.zoom': { shift: false, ctrl: false }
		}
	} );
	

	graph.newSerie("serieTest_2")
		.setLabel( "My serie" )
		.autoAxis()
		.setData( data1 )
		.setLineColor('red');

	graph.redraw( );
	graph.drawSeries();	
}, "Plugin loading", "" ],



[ function( domGraph ) {

	var graph = new Graph( domGraph, { }, {

		top: [ {
			flipped: true,
			axisDataSpacing: { min: 0, max: 0.5 },
			primaryGrid: true,
			secondaryGrid: false,			
			labelValue: "Top axis"
		} ],

		right: [ {
			forcedMin: -100,
			tickPosition: 2
		} ]

	} );

	graph.newSerie("serieTest_4")
		.setLabel( "My serie" )
		.autoAxis()
		.setData( data1 )
		.setLineColor('red');

	graph.autoscaleAxes();
	graph.redraw( );
	graph.drawSeries( );


}, "Pimp the axis", "" ],


[ function( domGraph ) {

	var graph = new Graph( domGraph, { 
		wheel: {
			type: 'plugin',
			plugin: './graph.plugin.zoom',
			options: {
				direction: 'y'
			}
		},

		plugins: {
			'./graph.plugin.zoom': { }
		}

	 } );
	
	var xAxis = graph.getXAxis( 0 , { primaryGrid: false, secondaryGrid: false } );
	var leftAxis = graph.getLeftAxis( 0 , { primaryGrid: false, secondaryGrid: false } );
	var rightAxis = graph.getRightAxis( 0 , { primaryGrid: false, secondaryGrid: false } );

	graph.newSerie( "serieTest" )
		.setLabel( "My serie" )
		.setAxes( xAxis, leftAxis )
		.setData( data1 );
		
	graph.newSerie( "serieTest_2" )
		.setLabel( "My serie 2" )
		.setAxes( xAxis, rightAxis )
		.setData( data2 )
		.setLineColor('red');

	var legend = graph.makeLegend();

	graph.redraw( );
	graph.drawSeries();	
	legend.setPosition( { dx: "-10px", dy: "10px", x: "max", y: "max" }, "right", "top" );

}, "Scaling different axis", "" ],



[ function( domGraph ) {

	var graph = new Graph( domGraph, { } );
		
	var data = [];
	var data2 = [];

	for( var i = 0; i < 40 ; i += 0.2 ) {

		data.push( [ i, Math.pow( i, 2 ) ] );
		
		data2.push( i );
		data2.push( Math.pow( i, 2 ) - ( ( 1 + Math.random() ) * 100 ) );
		data2.push( Math.pow( i, 2 ) + ( ( 1 + Math.random() ) * 100 ) );
	}

	var serie = graph.newSerie("serieTest", { }, 'zone')
		.setLabel( "My serie" )
		.autoAxis()
		.setData( data2 )
		.setFillColor('rgba(200, 100, 100, 0.2)')
		.setLineColor('rgba(200, 100, 100, 0.9)');


	var serie = graph.newSerie("serieTest", { }, 'line')
		.setLabel( "My serie" )
		.autoAxis()
		.setData( data )
		.setLineColor('rgba(150, 70, 50, 1)')
		
	graph.redraw( );
	graph.drawSeries();	

}, "Scatter serie", "" ],


/*

[ function( domGraph ) {

	var graph = new Graph( domGraph, { } );
	
	var serie = graph.newSerie("serieTest", { }, 'scatter')
		.setLabel( "My serie" )
		.autoAxis()
		.setData( [ [ 1, 20 ], [ 2, 30 ], [ 5, 4 ], [ 8, 4.2 ], [ 12, -1.2 ] ] )
		.setDataStyle( 

			{ shape: 'circle', r: 2, fill: 'rgba(255, 0, 0, 0.3)', stroke: 'rgb(255, 100, 0)' },

			[ 
				,
				{ shape: 'rect', width: 20, height: 10, x: -10, y: -5, fill: 'rgba(100, 255, 145, 0.3)', stroke: 'rgb(120, 255, 150)' },
				{ shape: 'circle', r: 12, fill: 'rgba(0, 100, 255, 0.3)', stroke: 'rgb(0, 150, 255)' }

			]
		);



	graph.redraw( );
	graph.drawSeries();	

}, "Scatter serie", "" ],



[ function( domGraph ) {

	var graph = new Graph( domGraph, { 

		plugins: {
			'./graph.plugin.shape': { },
			'./graph.plugin.linking': { },
		},

		pluginAction: {
			'./graph.plugin.shape': { shift: false, ctrl: false }
		}

	} );
	
	graph.newSerie("serieTest")
		.setLabel( "My serie" )
		.autoAxis()
		.setData( data1 );

	graph.redraw( );
	graph.drawSeries();	


	graph.pluginsReady.then( function() {

		graph.makeToolbar( {} ).then( function( toolbar ) {

			$("#" + domGraph).prepend( toolbar.getDom( ).css( 'position', 'absolute') );
		} );

	});

	graph.makeShape({ 
		type: 'rect',
		pos: {
			x: 1, 
			y: 0
		}, 
		pos2: {
			x: 2,
			y: 0.5
		},
		fillColor: [ 100, 100, 100, 0.3 ],
		strokeColor: [ 100, 100, 100, 0.9 ],
		strokeWidth: 1
	}).then( function( shape ) { shape.draw( ); shape.redraw(); });				

	graph.makeShape({ 
		type: 'rect',
		pos: {
			x: 3, 
			y: 0.5
		}, 
		pos2: {
			x: 4,
			y: 1
		},
		fillColor: [ 100, 100, 100, 0.3 ],
		strokeColor: [ 100, 100, 100, 0.9 ],
		strokeWidth: 1
	}).then( function( shape ) { shape.draw( ); shape.redraw(); });				


	graph.makeShape({ 
		type: 'rect',
		pos: {
			x: 4.2, 
			y: 0.2
		}, 
		pos2: {
			x: 6,
			y: 0.7
		},
		fillColor: [ 100, 100, 100, 0.3 ],
		strokeColor: [ 100, 100, 100, 0.9 ],
		strokeWidth: 1
	}).then( function( shape ) { shape.draw( ); shape.redraw(); });				


}, "Allow shape linking", "" ],




[ function( domGraph ) {

	var graph = new Graph( domGraph, { 

		plugins: {
			'./graph.plugin.shape': { },
		},

		pluginAction: {
			'./graph.plugin.shape': { shift: false, ctrl: false }
		}

	} );
	
	var data = { x: 0.5, dx: 0.01, y: [] };
	for( var i = 1, l = 1000; i < l ; i ++ ) {
		data.y.push( Math.log( i ) * ( Math.random() + 3 ) );
	}

	graph.newSerie("serieTest")
		.setLabel( "My serie" )
		.autoAxis()
		.setData( data );

	graph.redraw( );
	graph.drawSeries();	


}, "Other way to set data", "" ],
*/


 ]



	for( var i = 0, l = functions.length ; i < l ; i ++ ) {

		$('#graph-examples').append('<tr class="title"><td>' + functions[ i ][ 1 ] + '</td><td></td></tr>').append('<tr><td class="Graph"><div id="example-' + i + '-graph"></div></td><td class="Source">Source code: <pre id="example-' + i + '-source"></pre></td><td>' + functions[ i ][ 2 ] + '</tr>');
		functions[ i ][ 0 ]("example-" + ( i ) + "-graph");

		hljs.highlightBlock( $("#example-" + ( i  ) + "-source").html( functions[ i ][ 0 ].toString() ).get(0) );
	}

} );