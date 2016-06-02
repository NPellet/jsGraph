
define( function() {

	return [ function( domGraph ) {

	var graphinstance = new Graph( domGraph, { 
		plugins: {
			"timeSerieManager": {
				url: "http://127.0.0.1:3001/getData?cellName=<measurement>&parameter=<parameter>&from=<from>&to=<to>&grouping=<interval>"
			},
			 'zoom': { zoomMode: 'xy', transition: true },
			 'drag': {
		          persistanceX: true,
		          dragY: false
		        },

		},

		pluginAction: {
			'zoom': { shift: true, ctrl: false },
			'drag': { shift: false, ctrl: false }
		},


		dblclick: {
			type: 'plugin',
			plugin: 'zoom',
			options: {
				mode: 'gradualX'
			}
		}


	}, { });

	
	graphinstance.getPlugin("timeSerieManager").newSerie("test", {}, "line", { parameter: 'value1', measurement: 'test' } ).autoAxis().setLineColor("#2B65EC").setLineWidth( 2 );
	graphinstance.getPlugin("timeSerieManager").newSerie("test2", {}, "line", { parameter: 'value2', measurement: 'test' } ).autoAxis().setLineColor("#E42217").setLineWidth( 2 );

	graphinstance.getBottomAxis().zoom( ( Date.now() - 10000000 ) / 1000, Date.now() / 1000 );
	graphinstance.draw(); // Now the markers appear
	graphinstance.getPlugin("timeSerieManager").update();
	graphinstance.getPlugin("timeSerieManager").registerPlugin( graphinstance.getPlugin('zoom'), 'dblClick' );
	graphinstance.getPlugin("timeSerieManager").registerPlugin( graphinstance.getPlugin('zoom'), 'zooming' );
	graphinstance.getPlugin("timeSerieManager").registerPlugin( graphinstance.getPlugin('zoom'), 'zoomed' );
	graphinstance.getPlugin("timeSerieManager").registerPlugin( graphinstance.getPlugin('drag'), 'dragging' );
	graphinstance.getPlugin("timeSerieManager").registerPlugin( graphinstance.getPlugin('drag'), 'dragged' );

	}, 

		"Basic example", 
		[ 'Setting up a chart takes only a couple lines. Call <code>new Graph( domElement );</code> to start a graph. Render it with <code>graph.redraw();</code>', 'To add a serie, call <code>graph.newSerie( "serieName" )</code>. To set data, call <code>serie.setData()</code> method.'] 
	];


} );
