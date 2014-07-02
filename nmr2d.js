

requirejs.config({
	paths: {
		'jquery': './lib/components/jquery/dist/jquery.min',
		'jqueryui': './lib/components/jquery-ui/ui/minified/jquery-ui.min',
		'highlightjs': './lib/lib/highlight/highlight.pack',
		'forms': './lib/lib/forms/form',
		'components': './lib/components'
	}
});

require( [ 'src/graph' ] , function( Graph ) {

	$.getJSON('./spectra.json', function ( data ) {

console.log( data );
		var nmr = $( "#nmr" );
		nmr.append('<table cellpadding="0" cellspacing="0" class="nmr-wrapper"><tr><td></td><td class="nmr-1d nmr-1d-x nmr-main"></td></tr><tr class="nmr-main"><td class="nmr-1d nmr-1d-y"></td><td class="nmr-2d"></td></tr></table>');


		var graph_2d = new Graph( nmr.find('.nmr-2d').get(0), {

			close: { left: false, top: false, right: false },

			paddingBottom: 0,
			paddingTop: 0,
			paddingLeft: 0,
			paddingRight: 0

		} );

		
		var graph_x = new Graph( nmr.find('.nmr-1d-x').get(0), {

			close: { left: false, top: false, right: false },
			paddingBottom: 0,
			paddingTop: 0,
			paddingLeft: 0,
			paddingRight: 0

		} );

		var graph_y = new Graph( nmr.find('.nmr-1d-y').get(0), { 

			close: { left: false, top: false, right: false },

			plugins: {
				'./graph.plugin.zoom': { zoomMode: 'y' },
				'./graph.plugin.drag': {}
			},

			pluginAction: {
				'./graph.plugin.drag': { shift: true, ctrl: false },
				'./graph.plugin.zoom': { shift: false, ctrl: false }
			},

			wheel: {
				type: 'plugin',
				plugin: './graph.plugin.zoom',
				options: {
					direction: 'x'
				}
			},

			dblclick: {
				type: 'plugin',
				plugin: './graph.plugin.zoom',
				options: {
					mode: 'total'
				}
			},

			paddingBottom: 0,
			paddingTop: 0,
			paddingLeft: 0,
			paddingRight: 0

		} );
		

	/*
		graph_x.getYAxis().setDisplay( false );
		graph_2d.getYAxis().setDisplay( false );
	*/


		var serie_x = graph_x.newSerie("serieTest")
			.setLabel( "My serie" )
			.autoAxis()
			.setData( data[ '1H' ].spectra[ 0 ].data[ 0 ] );

		serie_x.getYAxis().setDisplay( false ).togglePrimaryGrid( false ).toggleSecondaryGrid( false );
		serie_x.getXAxis().setLabel('ppm').togglePrimaryGrid( false ).toggleSecondaryGrid( false ).setTickPosition( 'outside' )




		var serie_y = graph_y.newSerie("serieTestasd", { flip: true } )
			.setLabel( "My serie" )
			.setXAxis( graph_y.getBottomAxis( ) )
			.setYAxis( graph_y.getRightAxis( ) )
			.setData( data[ '1H' ].spectra[ 0 ].data[ 0 ] );

		serie_y.getYAxis().setLabel('ppm').togglePrimaryGrid( false ).toggleSecondaryGrid( false ).flip( true ).setTickPosition( 'outside' );
		serie_y.getXAxis().togglePrimaryGrid( false ).toggleSecondaryGrid( false ).setDisplay( false ).flip( true );


		var serie_2d = graph_2d.newSerie("serieTestasd", {}, 'contour' )
			.setLabel( "My serie" )
			.autoAxis()
			.setData( data.cosy.contourLines )

		serie_2d.getXAxis().forceMin( serie_x.getXAxis().getMinValue( ) );
		serie_2d.getXAxis().forceMax( serie_x.getXAxis().getMaxValue( ) );


		serie_2d.getYAxis().forceMin( serie_y.getYAxis().getMinValue( ) );
		serie_2d.getYAxis().forceMax( serie_y.getYAxis().getMaxValue( ) );


		serie_2d.getXAxis().setLabel('ppm').togglePrimaryGrid( false ).toggleSecondaryGrid( false ).setDisplay( false );
		serie_2d.getYAxis().togglePrimaryGrid( false ).toggleSecondaryGrid( false ).setDisplay( false );



		graph_y.redraw( );
		graph_y.drawSeries();	

		graph_2d.redraw( );
		graph_2d.drawSeries();		


		graph_x.redraw( );	
		
		graph_x.drawSeries();	

	});



});


/*
	graph_2d.newSerie("serieTest")
		.setLabel( "My serie" )
		.autoAxis()
		.setData( data );
*/

	/*
	graph.getPlugin( './graph.plugin.nmrpeakpicking' ).then( function( plugin ) {

		var series = graph.getSeries();
		plugin.process.apply( plugin, series );

	} );
*/