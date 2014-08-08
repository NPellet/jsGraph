

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

	"use strict";

	var graphs = { x: null, y: null };
	var graph_2d;
	var nmr;

	var symmetric = true;

	$.getJSON('./spectra.json', function ( data ) {

		nmr = $( "#nmr" );
		nmr.append('<table cellpadding="0" cellspacing="0" class="nmr-wrapper"><tr><td></td><td class="nmr-1d nmr-1d-x nmr-main"></td></tr><tr class="nmr-main"><td class="nmr-1d nmr-1d-y"></td><td class="nmr-2d"></td></tr></table>');

		graph_2d = new Graph( nmr.find('.nmr-2d').get(0), {

			close: { left: false, top: false, right: false },

			paddingBottom: 0,
			paddingTop: 0,
			paddingLeft: 0,
			paddingRight: 0,

			plugins: {
				'./graph.plugin.zoom': { 
					zoomMode: 'xy',
					onZoomStart: function( graph, x, y, e, target ) {
						graphs['x']._pluginExecute( './graph.plugin.zoom', 'onMouseDown', [ graphs['x'], x, y, e, true ] );
						graphs['y']._pluginExecute( './graph.plugin.zoom', 'onMouseDown', [ graphs['y'], x, y, e, true ] );
					},

					onZoomMove: function( graph, x, y, e, target ) {
						graphs['x']._pluginExecute( './graph.plugin.zoom', 'onMouseMove', [ graphs['x'], x, y, e, true ] );
						graphs['y']._pluginExecute( './graph.plugin.zoom', 'onMouseMove', [ graphs['y'], x, y, e, true ] );
					},

					onZoomEnd: function( graph, x, y, e, target ) {
						graphs['x']._pluginExecute( './graph.plugin.zoom', 'onMouseUp', [ graphs['x'], x, y, e, true ] );
						graphs['y']._pluginExecute( './graph.plugin.zoom', 'onMouseUp', [ graphs['y'], x, y, e, true ] );
					},

					onDblClick: function( x, y, prefs, e ) {
						
						graphs['y']._pluginExecute( './graph.plugin.zoom', 'onDblClick', [ graphs['y'], x, y, { mode: 'total' }, e, true ] );
						graphs['x']._pluginExecute( './graph.plugin.zoom', 'onDblClick', [ graphs['x'], x, y, { mode: 'total' }, e, true ] );
					}
				},

				'./graph.plugin.shape': {
					type: 'peakintegration2d',
					shapeOptions: { 
						bindable: false
					}
					
				},
			},

			dblclick: {
				type: 'plugin',
				plugin: './graph.plugin.zoom',
				options: {
					mode: 'total'
				}
			},

			pluginAction: {
				'./graph.plugin.zoom': { shift: false, ctrl: false },
				'./graph.plugin.shape': { shift: true, ctrl: false }
			}

		} );

/*
		graph_2d.shapeHandlers.mouseUp.push( function() {

			var pos1 = this.getFromData('pos');
			var pos2 = this.getFromData('pos2');
			
		} );
*/


		var integrals_x = [];
		var integralBasis = undefined;


		var integrals = { x: [], y: [] };
		function integral_resizemove( mode, noLoop ) {

			var sumMax = 0;

			for( var i = 0, l = integrals[ mode ].length; i < l ; i ++ ) {
				sumMax = Math.max( sumMax, integrals[ mode ][ i ].lastSum );
			}

			for( var i = 0, l = integrals[ mode ].length; i < l ; i ++ ) {

				integrals[ mode ][ i ].ratio = integrals[ mode ][ i ].lastSum / sumMax;
				integrals[ mode ][ i ].setPosition();

				if( integralBasis ) {
					integrals[ mode ][ i ].data.label[ 0 ].text = Math.round( integrals[ mode ][ i ].lastSum / integralBasis * 100 ) / 100;	
				} else {
					integrals[ mode ][ i ].data.label[ 0 ].text = 1;	
				}
				
				integrals[ mode ][ i ].setLabelPosition( 0 );
				integrals[ mode ][ i ].setLabelText( 0 );
			}


			if( symmetric && ! noLoop ) {
				integral_resizemove( getOtherMode( mode ), true );
			}
		}

		function setSyncPos( from, to ) {

			var pos1 = from.getFromData( 'pos' ),
				pos2 = from.getFromData( 'pos2' );

			var pos1t = to.getFromData( 'pos' ),
				pos2t = to.getFromData( 'pos2' );

			pos1t.x = pos1.y;
			pos1t.y = pos1.x;

			pos2t.x = pos2.y;
			pos2t.y = pos2.x;

			console.log( pos1, pos2, pos1t, pos2t );
		} 

		function integralCreated( mode, integral ) {

			makeNMRIntegral( mode, integral ).then( function( nmrint ) {

				integral.integral = nmrint;
				nmrint.data.pos = integral.getFromData( 'pos' );
				nmrint.data.pos2 = integral.getFromData( 'pos2' );//integral.getFromData( 'pos2' );
			
			} );

		//	 poses.push( integral.getFromData('pos') );

			if( symmetric ) {

				var otherMode = getOtherMode( mode );

				makePeakPosition( otherMode ).then( function( shape ) {

					integral.syncTo = shape;
					shape.syncTo = integral;

					shape.data.pos = {};
					shape.data.pos2 = {};
					shape.draw();

					setSyncPos( integral, integral.syncTo );

					shape.redrawImpl();

					makeNMRIntegral( otherMode ).then( function( nmrint ) {

						shape.integral = nmrint;

						nmrint.data.pos = shape.getFromData( 'pos' );
						nmrint.data.pos2 = shape.getFromData( 'pos2' );
					});	
				});
			}
		}

		function integralResized( mode, peak ) {

			if( ! peak.integral ) {
				return;
			}

			peak.integral.setPosition();
			if( peak.syncTo ) {
				setSyncPos( peak, peak.syncTo );
				peak.syncTo.redrawImpl();
				peak.syncTo.integral.setPosition();
			}
		

			integral_resizemove( mode );
		}


		function integralMoved( mode, peak ) {

			if( ! peak.integral ) {
				return;
			}

			peak.integral.setPosition();

			if( peak.syncTo ) {
				setSyncPos( peak, peak.syncTo );
				peak.syncTo.redrawImpl();
				peak.syncTo.integral.setPosition();
			}

			integral_resizemove( mode );
		}

		function integralRemoved( mode, peak ) {

			if( peak.integral ) {
				peak.integral.kill();
				integrals[ mode ].splice( integrals[ mode ].indexOf( peak.integral ), 1 );
			}

			if( peak.syncTo ) {

				peak.syncTo.kill();
				integrals[ getOtherMode( mode ) ].splice( integrals[ getOtherMode( mode ) ].indexOf( peak.syncTo.integral ), 1 );
			}

			integral_resizemove( mode );

		}

		function getOtherMode( mode ) {
			return mode == 'x' ? 'y' : ( mode == 'y' ? 'x' : ( console.error( "Mode not recognized") ) );
		}

		var nmrIntegralOptions = {
			 x: { 
				type: 'nmrintegral', 
				fillColor: 'transparent', 
				strokeColor: 'rgba(100, 0, 0, 0.5)', 
				strokeWidth: '1px',
				label: {
					position: { x: "100px", y: "20px"},
					text: 1,
					color: 'red',
					anchor: 'middle'
				},

				shapeOptions: {
					locked: true
				}
			 }
		}

		nmrIntegralOptions.y = $.extend(true, {}, nmrIntegralOptions.x );
		nmrIntegralOptions.y.shapeOptions.axis = 'y';

		var peakIntervalOptions = {

			x: { 
				type: 'peakinterval2',
				strokeColor: 'black',
				strokeWidth: 2,
				shapeOptions: {

					horizontal: true, 
					forcedCoords: { y: "20px" },
					bindable: true,
					axis: 'x'
				}
			},

			y: { 

				type: 'peakinterval2',
				strokeColor: 'black',
				strokeWidth: 2,
				shapeOptions: {
					vertical: true, 
					forcedCoords: { x: "30px" },
					bindable: true
				}
			}
		}


		function getPeakIntervalHandlers( mode ) {

			return { 

				shapeOptions: {
					onCreate: function() {
						integralCreated( mode, this );
					},

					onResize: function() {
						integralResized( mode, this );
					},

					onMove: function() {
						integralMoved( mode, this );
					},

					onRemove: function() {
						integralRemoved( mode, this );
					}
				}
			}
		}

		peakIntervalOptions.x = $.extend( true, {}, peakIntervalOptions.x, getPeakIntervalHandlers( 'x' ) );
		$.extend( true, {}, peakIntervalOptions.y, getPeakIntervalHandlers( 'y' ) );


		function makePeakPosition( mode ) {

			return graphs[ mode ].makeShape( $.extend( true, {}, peakIntervalOptions[ mode ] ), {} );
		}

		function makeNMRIntegral( mode, integral ) {

			return graphs[ mode ].makeShape( $.extend( true, {}, nmrIntegralOptions[ mode ] ), {} ).then( function( nmrint ) {

				integrals[ mode ].push( nmrint );
				nmrint.draw();
				return nmrint;
			} );
		}
		


		graphs['x'] = new Graph( nmr.find('.nmr-1d-x').get(0), {

			close: { left: false, top: false, right: false },
			paddingBottom: 0,
			paddingTop: 0,
			paddingLeft: 0,
			paddingRight: 0,

			onAnnotationChange: function( data, shape ) {
				if( data.type == "peakinterval2" ) {

					if( ! integralBasis ) {
						integralBasis = shape.integral.lastSum;
					}

				} else if( data.type == "nmrintegral" ) {

					if( integralBasis ) {

						var fl = parseFloat( shape.data.label[ 0 ].text );
						
						if( fl != 0 ) {
							integralBasis = shape.lastSum / fl;
						}

					}
					
				}

				integral_resizemove('x');
				integral_resizemove('y');
			},

			plugins: {
				'./graph.plugin.zoom': { 
					zoomMode: 'x',

					onZoomStart: function( graph, x, y, e, target ) {

						graph_2d._pluginExecute( './graph.plugin.zoom', 'onMouseDown', [ graph_2d, x, undefined, e, true ] );

					},

					onZoomMove: function( graph, x, y, e, target ) {

						graph_2d._pluginExecute( './graph.plugin.zoom', 'onMouseMove', [ graph_2d, x, undefined, e, true ] );

					},

					onZoomEnd: function( graph, x, y, e, target ) {

						graph_2d._pluginExecute( './graph.plugin.zoom', 'onMouseUp', [ graph_2d, x, undefined, e, true ] );

					},

					onDblClick: function( x, y, prefs, e ) {
						
						graph_2d._pluginExecute( './graph.plugin.zoom', 'onDblClick', [ graph_2d, x, y, { mode: 'xtotal' }, e, true ] );
						
					}

				},

				'./graph.plugin.shape': peakIntervalOptions[ 'x' ],
			},


			dblclick: {
				type: 'plugin',
				plugin: './graph.plugin.zoom',
				options: {
					mode: 'total'
				}
			},

			pluginAction: {
				'./graph.plugin.zoom': { shift: false, ctrl: false },
				'./graph.plugin.shape': { shift: true, ctrl: false }
			}

		} );

		graphs['y'] = new Graph( nmr.find('.nmr-1d-y').get(0), { 

			close: { left: false, top: false, right: false },

			plugins: {
				'./graph.plugin.zoom': { 
					zoomMode: 'y',
					onZoomStart: function( graph, x, y, e, target ) {

						graph_2d._pluginExecute( './graph.plugin.zoom', 'onMouseDown', [  graph_2d, undefined , y, e, true ] );

					},

					onZoomMove: function( graph, x, y, e, target ) {

						graph_2d._pluginExecute( './graph.plugin.zoom', 'onMouseMove', [ graph_2d, undefined , y, e, true ] );

					},

					onZoomEnd: function( graph, x, y, e, target ) {

						graph_2d._pluginExecute( './graph.plugin.zoom', 'onMouseUp', [ graph_2d, undefined, y, e, true ] );

					},

					onDblClick: function( x, y, prefs, e ) {
						
						graph_2d._pluginExecute( './graph.plugin.zoom', 'onDblClick', [ graph_2d, x, y, { mode: 'ytotal' }, e, true ] );
						
					}
				},

				'./graph.plugin.shape': {  },

				'./graph.plugin.linking': { },
			},


			dblclick: {
				type: 'plugin',
				plugin: './graph.plugin.zoom',
				options: {
					mode: 'total'
				}
			},

			pluginAction: {
				'./graph.plugin.zoom': { shift: false, ctrl: false },
				'./graph.plugin.shape': { shift: true, ctrl: false }
			},



			wheel: {
				type: 'plugin',
				plugin: './graph.plugin.zoom',
				options: {
					direction: 'x'
				}
			},

			paddingBottom: 0,
			paddingTop: 0,
			paddingLeft: 0,
			paddingRight: 0

		} );
		

	/*
		graphs['x'].getYAxis().setDisplay( false );
		graph_2d.getYAxis().setDisplay( false );
	*/


		var serie_x = graphs['x'].newSerie("seriex" )
			.setLabel( "My serie" )
			.autoAxis()
			.setData( data[ '1H' ].spectra[ 0 ].data[ 0 ] );

		serie_x.getYAxis().setDisplay( false ).togglePrimaryGrid( false ).toggleSecondaryGrid( false );
		serie_x.getXAxis().flip(true).setLabel('ppm').togglePrimaryGrid( false ).toggleSecondaryGrid( false ).setTickPosition( 'outside' )




		var serie_y = graphs['y'].newSerie("seriey", { flip: true } )
			.setLabel( "My serie" )
			.setXAxis( graphs['y'].getBottomAxis( ) )
			.setYAxis( graphs['y'].getRightAxis( ) )
			.setData( data[ '1H' ].spectra[ 0 ].data[ 0 ] );

		serie_y.getYAxis().setLabel('ppm').togglePrimaryGrid( false ).toggleSecondaryGrid( false ).flip( true ).setTickPosition( 'outside' );
		serie_y.getXAxis().togglePrimaryGrid( false ).toggleSecondaryGrid( false ).setDisplay( false ).flip( true );


		var serie_2d = graph_2d.newSerie("serie2d", { }, 'contour' )
			.setLabel( "My serie" )
			.autoAxis()
			.setData( data.cosy.contourLines )


			console.log( data.cosy );

		serie_2d.getXAxis().forceMin( serie_x.getXAxis().getMinValue( ) );
		serie_2d.getXAxis().forceMax( serie_x.getXAxis().getMaxValue( ) );


		serie_2d.getYAxis().forceMin( serie_y.getYAxis().getMinValue( ) );
		serie_2d.getYAxis().forceMax( serie_y.getYAxis().getMaxValue( ) );


		serie_2d.getXAxis().setLabel('ppm').togglePrimaryGrid( false ).toggleSecondaryGrid( false ).setDisplay( false ).flip( true );
		serie_2d.getYAxis().togglePrimaryGrid( false ).toggleSecondaryGrid( false ).setDisplay( false ).flip( true );



		graphs['y'].redraw( );
		graphs['y'].drawSeries();	

		graph_2d.redraw( );
		graph_2d.drawSeries();		


		graphs['x'].redraw( );	
		
		graphs['x'].drawSeries();	

		startAttribution();
		startMolecule();

	});


	function startMolecule() {


		require( [ './lib/lib/molecule/src/molecule' ], function( Molecule ) {


			var dom = document.createElement("div");
			dom.setAttribute('style', 'position: absolute;');
			// Create a new molecule
			var molecule = new Molecule( { maxBondLengthAverage: 40 } );

			// Adds the molecule somewhere in the DOM
			dom.appendChild( molecule.getDom() );

			// Set the size of the canvas
			molecule.resize( 300, 200 );

			// Fetches the JSON and uses it as the source data
			molecule.setDataFromJSONFile( './lib/lib/molecule/moleculeA.json' ).then( function() {

				molecule.render();

			});

			$("#nmr").prepend( dom );
		} );


	}

	function startAttribution() {

		var binding = false;
		var bindingA = false;
		var bindingB;
		var bindingLine;
		var bindingPairs = [];

		var mousedown = function( el, event ) {


			if( event.shiftKey ) {

				graphs['x'].lockShapes();
			
				binding = true;
				bindingA = el;
				event.preventDefault();
				event.stopPropagation();
			}

			var pos = $( el ).position();
	
			var w = parseFloat( el.getAttribute('width') || 0 );
			var h = parseFloat( el.getAttribute('height') || 0 );

			var x2 = parseFloat( el.getAttribute('x2') || 0 );
			var y2 = parseFloat( el.getAttribute('y2') || 0 );

			var x1 = parseFloat( el.getAttribute('x1') || 0 );
			var y1 = parseFloat( el.getAttribute('y1') || 0 );

			bindingLine.setAttribute('display', 'block');

			var x = pos.left + ( w / 2 ) + ( Math.abs( x2 - x1 ) / 2 );
			var y = pos.top  + ( h / 2 ) + ( Math.abs( y2 - y1 ) / 2 );

			bindingLine.setAttribute('x1', x );
			bindingLine.setAttribute('y1', y );

			bindingLine.setAttribute('x2', x );
			bindingLine.setAttribute('y2', y );
		}

		var mouseup = function( el, event ) {

			if( ! binding ) {
				return;
			}

			self.handleSelected = false;
			self.moving = true;

			bindingLine.setAttribute('display', 'none');

			var target = event.target;

			if( ! target.classList.contains( 'bindable' ) ) {

				binding = false;

			} else {

				bindingB = event.target;
				binding = false;
				bindSave();
			}


			graphs['x'].unlockShapes();
			
		}

		var mousemove = function( e ) {

			if( ! binding ) {
				return;
			}

			bindingLine.setAttribute('x2', e.clientX );
			bindingLine.setAttribute('y2', e.clientY );
		}

		var highlight = function( element ) {
			all( 'highlight', element );
		}

		var unhighlight = function( element ) {
			all( 'unhighlight', element );
		}

		function all( fct, element ) {

			for( var i = 0, l = bindingPairs.length ; i < l ; i ++ ) {

				if( bindingPairs[ i ][ 0 ] == element || bindingPairs[ i ][ 1 ] == element ) {

					if( bindingPairs[ i ][ 0 ].element ) {
						bindingPairs[ i ][ 0 ].element[ fct ]();
					} else {
						console.log( "Manual" );
					}

					if( bindingPairs[ i ][ 1 ].element ) {
						bindingPairs[ i ][ 1 ].element[ fct ]();
					} else {
						console.log( "Manual" );
					}
				}
			}

		}


		function bindSave() {

			bindingPairs.push( [ bindingA, bindingB ] );
			bindingA = null;
			bindingB = null;

		}

		function setEvents() {

			nmr.on('mousedown', '.bindable', function( e ) {
				mousedown( this, e );
			});


			nmr.on('mouseover', '.bindable', function( e ) {
				highlight( this );
			});


			nmr.on('mouseout', '.bindable', function( e ) {
				unhighlight( this );
			});


			nmr.on('mouseup', function( e ) {
				mouseup( this, e );
			});

			nmr.on('mousemove', function( e ) {
				mousemove( e );
			})
		}	

		var ns = 'http://www.w3.org/2000/svg';

		var dom = document.createElementNS( ns, 'svg' );
		dom.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
	
		dom.setAttribute('xmlns', ns );
	
		dom.setAttribute('style', 'position: absolute');
		dom.setAttribute('width', nmr.width( ) )
		dom.setAttribute('height', nmr.height( ) )
		dom.setAttribute('pointer-events', 'none');

		bindingLine = document.createElementNS( ns, 'line');
		bindingLine.setAttribute('stroke', 'black');

		dom.appendChild( bindingLine );
		nmr.prepend( dom );

		setEvents();	
	}
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
