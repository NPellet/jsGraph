
requirejs.config({
	paths: {
		'jquery': './lib/components/jquery/dist/jquery.min',
		'jquery-ui': './lib/components/jquery-ui/ui/minified/jquery-ui.min',
		'highlightjs': './lib/lib/highlight/highlight.pack'
	}
});

require( [ 'src/graph', 'highlightjs' ] , function( Graph ) {


	var data1 = [];
	for( var i = 0; i < Math.PI * 10; i += 0.05 ) {
		data1.push( [ i , Math.sin( i ) * i ] );
	}


	var data2 = [];
	for( var i = 0.01; i < Math.PI * 10; i += 0.05 ) {
		data2.push( [ i , Math.sin( i ) * Math.log( i ) ] );
	}



	var functions = [

[ function( domGraph ) {

	var graph = new Graph( domGraph, { 


		plugins: {
			'./graph.plugin.integral': {},
		},

		pluginAction: {
			'./graph.plugin.integral': { shift: false, ctrl: false }
		}

	} );
	
	graph.newSerie("serieTest")
		.setLabel( "My serie" )
		.autoAxis()
		.setData( data1 );

	graph.redraw( );
	graph.drawSeries();	

}, "DEV", "" ],


/*
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


	var legend = graph.makeLegend({
		movable: true,
		frame: true,
		frameWidth: 1,
		frameColor: "#c0c0c0",
		backgroundColor: "rgba(255, 255, 255, 0.8)"
	});

	graph.redraw( );
	graph.drawSeries();	

	legend.setPosition( { dx: "-10px", dy: "10px", x: "max", y: "max" }, "right", "top" );


}, "Default functionnality", "" ],


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

*/

 ]



	for( var i = 0, l = functions.length ; i < l ; i ++ ) {

		$('#graph-examples').append('<tr class="title"><td>' + functions[ i ][ 1 ] + '</td><td></td></tr>').append('<tr><td class="Graph"><div id="example-' + i + '-graph"></div></td><td class="Source">Source code: <pre id="example-' + i + '-source"></pre></td><td>' + functions[ i ][ 2 ] + '</tr>');
		functions[ i ][ 0 ]("example-" + ( i ) + "-graph");

		hljs.highlightBlock( $("#example-" + ( i  ) + "-source").html( functions[ i ][ 0 ].toString() ).get(0) );
	}

} );