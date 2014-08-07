

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

	var graph_x, graph_y, graph_2d;
	var nmr;

	setTools();

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
						graph_x._pluginExecute( './graph.plugin.zoom', 'onMouseDown', [ graph_x, x, y, e, true ] );
						graph_y._pluginExecute( './graph.plugin.zoom', 'onMouseDown', [ graph_y, x, y, e, true ] );
					},

					onZoomMove: function( graph, x, y, e, target ) {
						graph_x._pluginExecute( './graph.plugin.zoom', 'onMouseMove', [ graph_x, x, y, e, true ] );
						graph_y._pluginExecute( './graph.plugin.zoom', 'onMouseMove', [ graph_y, x, y, e, true ] );
					},

					onZoomEnd: function( graph, x, y, e, target ) {
						graph_x._pluginExecute( './graph.plugin.zoom', 'onMouseUp', [ graph_x, x, y, e, true ] );
						graph_y._pluginExecute( './graph.plugin.zoom', 'onMouseUp', [ graph_y, x, y, e, true ] );
					},

					onDblClick: function( x, y, prefs, e ) {
						
						graph_y._pluginExecute( './graph.plugin.zoom', 'onDblClick', [ graph_y, x, y, { mode: 'total' }, e, true ] );
						graph_x._pluginExecute( './graph.plugin.zoom', 'onDblClick', [ graph_x, x, y, { mode: 'total' }, e, true ] );
					}
				}
			},


			dblclick: {
				type: 'plugin',
				plugin: './graph.plugin.zoom',
				options: {
					mode: 'total'
				}
			},

			pluginAction: {
				'./graph.plugin.zoom': { shift: false, ctrl: false }
			},


		} );


		var integrals_x = [];
		var integralXBasis = undefined;

		function integral_x_resizemove( ) {

			var sumMax = 0;
			for( var i = 0, l = integrals_x.length; i < l ; i ++ ) {
				sumMax = Math.max( sumMax, integrals_x[ i ].lastSum );
			}

			for( var i = 0, l = integrals_x.length; i < l ; i ++ ) {
				integrals_x[ i ].ratio = integrals_x[ i ].lastSum / sumMax;
				integrals_x[ i ].setPosition();

				if( integralXBasis ) {
					integrals_x[ i ].data.label[ 0 ].text = Math.round( integrals_x[ i ].lastSum / integralXBasis * 100 ) / 100;	
				} else {
					integrals_x[ i ].data.label[ 0 ].text = 1;	
				}
				
				integrals_x[ i ].setLabelPosition( 0 );
				integrals_x[ i ].setLabelText( 0 );
			}
		}



		var integrals_y = [];
		function integral_y_resizemove( ) {

			var sumMax = 0;
			for( var i = 0, l = integrals_y.length; i < l ; i ++ ) {
				sumMax = Math.max( sumMax, integrals_y[ i ].lastSum );
			}

			for( var i = 0, l = integrals_y.length; i < l ; i ++ ) {
				integrals_y[ i ].ratio = integrals_y[ i ].lastSum / sumMax;
				integrals_y[ i ].setPosition();
			}
		}


		graph_x = new Graph( nmr.find('.nmr-1d-x').get(0), {

			close: { left: false, top: false, right: false },
			paddingBottom: 0,
			paddingTop: 0,
			paddingLeft: 0,
			paddingRight: 0,

			onAnnotationChange: function( data, shape ) {
				if( data.type == "peakinterval2" ) {

					if( ! integralXBasis ) {
						integralXBasis = shape.integral.lastSum;
					}

				} else if( data.type == "nmrintegral" ) {

					if( integralXBasis ) {

						var fl = parseFloat( shape.data.label[ 0 ].text );
						
						if( fl != 0 ) {
							integralXBasis = shape.lastSum / fl;
						}

					}
					
				}

				integral_x_resizemove();
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


				'./graph.plugin.shape': { 

					shapeType: 'peakinterval2',
					
					shapeOptions: { 

						horizontal: true, 
						forcedCoords: { y: "20px" },
						bindable: true,

						onCreate: function() {

							var self = this;

							this.set('strokeWidth', 2);
							this.setStrokeWidth();

							graph_x.makeShape( { 

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

							 }, {} ).then( function( nmrint ) {

							 	
								self.integral = nmrint;
								integrals_x.push( self.integral );
								nmrint.draw();
								self.integral.data.pos = self.getFromData( 'pos' );
								self.integral.data.pos2 = self.getFromData( 'pos2' );

							} );

						},

						onResize: function() {

							if( ! this.integral ) {
								return;
							}
							
							this.integral.setPosition();
							integral_x_resizemove( );
						},

						onMove: function() {


							if( ! this.integral ) {
								return;
							}

							this.integral.setPosition();
							integral_x_resizemove( );
						},

						onRemove: function() {

							if( this.integral ) {
								this.integral.kill();
								integrals_x.splice( integrals_x.indexOf( this.integral ), 1 );
							}

							integral_x_resizemove( );
						}

					}
				},

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
			}

		} );

		graph_y = new Graph( nmr.find('.nmr-1d-y').get(0), { 

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

				'./graph.plugin.shape': { shapeType: 'peakinterval2', shapeOptions: { 

					vertical: true, 
					forcedCoords: { x: "20px" },

					onCreate: function() {

						var self = this;
						graph_y.makeShape( { type: 'nmrintegral', fillColor: 'transparent', strokeColor: 'rgba(100, 0, 0, 0.5)', strokeWidth: '1px', shapeOptions: { axis: 'y' } }, {} ).then( function( nmrint ) {

							self.integral = nmrint;
							integrals_y.push( self.integral );
							nmrint.draw();
							self.integral.data.pos = self.getFromData( 'pos' );
							self.integral.data.pos2 = self.getFromData( 'pos2' );

						} );

					},

					onResize: function() {

						if( ! this.integral ) {
							return;
						}
						
						this.integral.setPosition();
						integral_y_resizemove( );
					},

					onMove: function() {


						if( ! this.integral ) {
							return;
						}

						this.integral.setPosition();
						integral_y_resizemove( );
					},

					onRemove: function() {

						if( this.integral ) {
							this.integral.kill();
							integrals_y.splice( integrals_x.indexOf( this.integral ), 1 );
						}

						integral_y_resizemove( );
					}

				} },

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


		var serie_x = graph_x.newSerie("serieTest" )
			.setLabel( "My serie" )
			.autoAxis()
			.setData( data[ '1H' ].spectra[ 0 ].data[ 0 ] );

		serie_x.getYAxis().setDisplay( false ).togglePrimaryGrid( false ).toggleSecondaryGrid( false );
		serie_x.getXAxis().flip(true).setLabel('ppm').togglePrimaryGrid( false ).toggleSecondaryGrid( false ).setTickPosition( 'outside' )




		var serie_y = graph_y.newSerie("serieTestasd", { flip: true } )
			.setLabel( "My serie" )
			.setXAxis( graph_y.getBottomAxis( ) )
			.setYAxis( graph_y.getRightAxis( ) )
			.setData( data[ '1H' ].spectra[ 0 ].data[ 0 ] );

		serie_y.getYAxis().setLabel('ppm').togglePrimaryGrid( false ).toggleSecondaryGrid( false ).flip( true ).setTickPosition( 'outside' );
		serie_y.getXAxis().togglePrimaryGrid( false ).toggleSecondaryGrid( false ).setDisplay( false ).flip( true );


		var serie_2d = graph_2d.newSerie("serieTestasd", { }, 'contour' )
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

		startAttribution();

	});


		
	function setTools() {

		var ul = $("<ul />");
		var toolbox = [
			{
				id: 'peakpicking',
				label: 'Peak picking',
				icon: ''
			},

			{
				id: 'assign',
				label: 'Manual assignment',
				icon: ''
			}
		];

		for( var i = 0, l = toolbox.length; i < l ; i ++ ) {
			ul.append('<li data-tool="' + toolbox[ i ].id + '">' + toolbox[ i ].label + '</li>');
		}

		$( "#tools" ).html( ul ).on('click', 'li', function( ) {

			var data = $( this ).data('tool');
	
			switch( data ) {

				case 'peakpicking':
					graph_y.forcePlugin("./graph.plugin.shape");
					graph_x.forcePlugin("./graph.plugin.shape");
				break;


				case 'assign':
					startAssign();
				break;


			}

		} );

		startMolecule();


	}


	function startAssign() {

	
		
	}


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
		var bindingLine;

		var mousedown = function( el, event ) {


			if( event.shiftKey ) {

				graph_x.lockShapes();
			
				binding = true;
				bindingA = el;
				event.preventDefault();
				event.stopPropagation();
			}


			var pos = $( el ).position();

			bindingLine.setAttribute('x1', pos.left );
			bindingLine.setAttribute('y1', pos.top );

		}

		var mouseup = function( el, event ) {

			if( ! binding ) {
				return;
			}

			self.handleSelected = false;
			self.moving = true;

			var target = event.target;

			if( ! target.classList.contains( 'bindable' ) ) {
				binding = false;
			} else {
				bindingB = event.target;
				binding = false;

				bindSave();
			}


			graph_x.unlockShapes();
			
		}

		var mousemove = function( e ) {

			if( ! binding ) {
				return;
			}

			bindingLine.setAttribute('x2', e.clientX );
			bindingLine.setAttribute('y2', e.clientY );
		}

		function bindSave() {

			console.log( bindingA, bindingB );
		}

		function setEvents() {

			nmr.on('mousedown', '.bindable', function( e ) {
				mousedown( this, e );
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
