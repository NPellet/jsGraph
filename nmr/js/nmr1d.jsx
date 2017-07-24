import React from "react";
import Graph from "../../src/graph";
import PropTypes from 'prop-types';
import NMRSerie from './nmrserie.jsx'
import Assignment from './assignment.js'

const trianglePath = 'm -6 -12 h 12 l -6 9 z';
const integralBaseline = 250;



class NMR1D extends React.Component {
	

	constructor( props ) {
		super( props );
		this.state = {};
		
		this.graph = new Graph( {
			close: false,
			plugins: {
				'zoom': { zoomMode: 'x', transition: false },
				'drag': {},
				'shape': { 
					type: "nmrintegral", 
					serie: () => this.graph.getSerie("master"), 
					handleSelected: 2,
					properties: { baseLine: [ integralBaseline ] }
				}
			},

			mouseActions: [
				{ plugin: 'zoom', shift: false, ctrl: false },
				{ type: 'click', callback: () => {
					
						if( this.checkboxPeakPicking.checked ) {
							this.pickPeak( ...arguments )	
						}
					}, shift: false, ctrl: false },

				{ plugin: 'drag', alt: true, shift: false, ctrl: false },
				{ plugin: 'shape', shift: true, ctrl: false },
				{
					type: 'dblclick',
					plugin: 'zoom',
					options: {
						mode: 'total'
					}
				},
				{	// Mousewheel action is only enabled when there is no selected serie
					type: "mousewheel",
					enabled: ( graph ) => { return ! graph.getSelectedSerie() },
					plugin: 'zoom',
					options: {
						mode: 'y',
						direction: 'y'
					}
				},
				{	// Alternative wheel action
					type: "mousewheel",
					enabled: ( graph ) => { return !! graph.getSelectedSerie() },
					callback: ( dy ) => {
						
						let serie = this.graph.getSelectedSerie();
						if( ! serie ) {
							return;
						}

						let waveform = serie.getWaveform();
						if( ! waveform ) {
							return;
						}

						waveform.setScale( waveform.getScale() * ( dy > 0 ? 1.05 : 0.95 ) );
						serie.setWaveform( waveform );
						this.graph.draw();
					}
				}
			],

			keyActions: [
				{ type: 'keydown', key: 'backspace', removeSelectedShape: true }
			]

		} );

		this.graph.trackingLine( {

			noLine: true,
			mode: "individual",
			enable: false,
			series: "all",
			serieShape: {

				shape: 'polyline',
				properties: { 
					'strokeWidth': [ 0 ],
					'pxPoints': [ [ trianglePath ] ],
					'labelText': [ '' ]
				},

				onCreated: this.triangleCreated.bind( this ),
				onChanged: this.triangleMoved.bind( this ),

				magnet: {
					mode: 'max',
					withinPx: 15
				}
			}

		} );

		this.legend = this.graph.makeLegend();
		this.legend.setAutoPosition('bottom');


		this.graph.getLeftAxis().hide();
		this.graph.getBottomAxis().gridsOff();

		this.graph
				.getBottomAxis()
				.flip( true )
				.setLabel( '\u03B4' )
				.setUnit( 'ppm' );

		this.graph.getPlugin('shape').on("beforeNewShape", (event, shapeDescriptor ) => {

			if( this.checkboxAssignment.checked ) {
				
				return this.graph.prevent( true );
			}

		} ).on( "createdShape", ( event, shape ) => {
		
			let masterSerie = this.graph.getSerie( "master" );
			shape.setSerie( masterSerie );
			shape.ratio = ( masterSerie._nmrIntegralRatio );
		//	shape.updateIntegralValue( masterSerie._nmrIntegralLabelRatio );
			shape.setLabelAnchor( 'center' );

		} ).on( "newShape", ( event, shape ) => {

			var _from = shape.getPosition( 0 ),
				_to = shape.getPosition( 1 );

			shape.kill();

			this.state.series.forEach( ( serie ) => {

				if( serie.name == "master" ) {
					serie.integrals.push( { id: Math.random(), from: _from.x, to: _to.x } );
				}
			} );

			// Update state
			this.setState( { series: this.state.series } );
			this.props.onChanged( this.state.series );
		});


		this.onIntegralChanged = this.onIntegralChanged.bind( this );
		this.onIntegralLabelRatioChanged = this.onIntegralLabelRatioChanged.bind( this );
		this.pickPeak = this.pickPeak.bind( this );
		this.triangleMoved = this.triangleMoved.bind( this );
		this.triangleCreated = this.triangleCreated.bind( this );
		this.togglePeakPicking = this.togglePeakPicking.bind( this );
		this.toggleAssignment = this.toggleAssignment.bind( this );
		this.toggleRemoveAssignment = this.toggleRemoveAssignment.bind( this );
		this.serieChanged = this.serieChanged.bind( this );
		this.fullOut = this.fullOut.bind( this );
	}

	 getChildContext() {
	 	
	 	return {
	   		graph: this.graph,
	   		integralBaseline: integralBaseline
	    };
	 }

	 fullOut() {
	 	this.graph.autoscaleAxes();
	 	this.graph.draw();
	 }

	 triangleCreated( shape ) {
		shape.makeLabels();
		shape.setLabelPosition( this.graph.newPosition( { dx: 0, dy: "-25px" } ).relativeTo( shape.getPosition( 0 ) ) );
		shape.setLabelAnchor("middle");
	 }

	triangleMoved( shape ) {
		shape.setLabelText( Math.round( shape.getPosition( 0 ).x * 1000 ) / 1000 );
		shape.updateLabels();
	 }
	
	pickPeak() {

		this.graph.series.map( ( serie ) => {

			if( ! serie.trackingShape || serie.trackingShape.isHidden() ) {
				return;
			}

			let cancel = false;

			serie._peaks && serie._peaks.forEach( ( existingPeak ) => {

				if( Math.abs( existingPeak.getPosition( 0 ).x - serie.trackingShape.getPosition( 0 ).x ) < ( this.props.options.minThresholdPeakToPeak || 0.01 ) ) {
					cancel = true;
				}
			} );

			if( cancel ) {
				return;
			}

			let newPeak = this.graph.newShape( "polyline", {

				selectable: true,
				selectOnClick: true

			}, false, {
				'strokeWidth': [ 1 ],
				'strokeColor': [ 'white' ],
				'pxPoints': [ [ trianglePath ] ],
				'labelText': [ '' ],
				'position': [ { x: serie.trackingShape.getPosition( 0 ).x } ],
				'labelEditable': [ true ],
				'fillColor': [ serie.getLineColor() ]
			});
			
			newPeak.setSerie( serie );
			newPeak.draw();
			newPeak.setSelectStyle( {
				fill: 'red'
			});

			this.triangleCreated( newPeak );
			this.triangleMoved( newPeak );


			newPeak.on("removed", () => {

				serie._peaks.splice( serie._peaks.indexOf( newPeak ), 1 );
				console.log('removed');
			});

			newPeak.on("shapeLabelChanged", ( shape, parameters ) => {

				 // Determine the shift
				 const shift = parseFloat( parameters.nextValue ) - parameters.previousValue;
				 let serieState;

				 if( serieState = this.getSerieState( serie.getName() ) ) {
				 		
				 	// Let us shift the serie
				 	serieState.shift += shift;
				 	
				 	serie._peaks.map( ( peak ) => { // Let us shift all peaks
				 		peak.getPosition( 0 ).x += shift;

				 		if( peak !== newPeak ) {
				 			peak.setLabelText( Math.round( 1000 * ( parseFloat( peak.getLabelText( 0 ) ) + shift ) ) / 1000 );
				 		}

					 	peak.redraw();
				 	});

				 	for( let serie of this.state.series ) { // Let us shift the integrals of all the series
				 		
				 		for( let integral of serie.integrals ) {
				 			integral.from += shift;
				 			integral.to += shift;
				 		}
				 	}
				 	
				 	this.updateOutput(); // Shift and integrals have changed, we must notify the output
				 	this.setState( { series: this.state.series } ); // Integrals have shifted, we must inform React
				 }


			});

			serie._peaks = serie._peaks || [];
			serie._peaks.push( newPeak );
		})

	}

	getSerieState( serieName ) {

		for( let serie of this.state.series ) {
			if( serie.name == serieName ) {
				return serie;
			}
		}
		return false;
	}

	togglePeakPicking() {
		this.graph.trackingLine( this.checkboxPeakPicking.checked );
	}

	toggleAssignment() {

		if( this.checkboxAssignment.checked ) {
			
			this.assignment.enable();	
		} else {

			this.assignment.disable();	
		}
	}


	toggleRemoveAssignment() {


		if( this.checkboxRemoveAssignment.checked ) {
			this.topSVG.style.zIndex = 1000;
			this.assignment.enableRemove();	
		} else {
			this.topSVG.style.zIndex = 0;
			this.assignment.disableRemove();	
		}
	}

	updateMainData() {

		this.graph.autoscaleAxes();
		this.graph.draw();
		this.legend.update();
	}

	componentDidMount() {
			
		this.setState( { series: this.props.series, molecule: this.props.molecule } );

		this.graph.resize( this.props.width, this.props.height );
		this.graph.setWrapper( this.dom );
		this.updateMainData();


		let assignmentOptions = {

			graph: {
				bindableFilter: '.integral',
				equivalentAttribute: 'id',
				highlightStyle: {

					'binding': {
						'stroke': 'red',
						'stroke-width': '2px'
					},
					equivalent: {
						'stroke': 'blue',
						'stroke-width': '2px'
					}
				}
			},

			molecule: {
				bindableFilter: '[data-atomid]',
				bindableFilterClass: 'event',
				equivalentAttribute: 'data-atomid',
				highlightStyle: {

					'binding': {
						'fill': 'red',
						'fill-opacity': '0.3'
					},
					'equivalent': {
						'fill': 'yellow',
						'fill-opacity': '0.3'
					}
				}
			},

			enabled: false

		};


		this.assignment = new Assignment( this.graph, this.domMolecule, this.topSVG, assignmentOptions );
	}

	updateOutput() {
		this.props.onChanged( this.state.series );
	}

	componentWillReceiveProps( nextProps ) {
		this.setState( { series: nextProps.series, molecule: nextProps.molecule } );
		this.graph.resize( nextProps.width, nextProps.height );
		this.graph.draw();
		this.updateMainData();
	}

	componentDidUpdate() {
		this.graph.draw();


	}

	onIntegralLabelRatioChanged( seriename, integralId, newRatio ) {

		let update = false;
		for( let serie of this.state.series ) {

			if( serie.name == seriename ) {

				serie.integralLabelRatio = newRatio;
				update = true;
			}

			if( update ) {
				break;
			}
		}

		if( update ) {
			this.setState( { series: this.state.series } );	
			this.updateOutput();
		}		
	}

	onIntegralChanged( seriename, integralId, integralFrom, integralTo ) {

		let update = false;
		for( let serie of this.state.series ) {

			if( serie.name == seriename ) {

				for( let integral of serie.integrals ) {

					if( integral.id == integralId ) {

						integral.from = integralFrom;
						integral.to = integralTo;
						update = true;

						break;
					}
				}
			}

			if( update ) {
				break;
			}
		}

		if( update ) {
			this.setState( { series: this.state.series } );	
			this.updateOutput();
		}		
	}

	serieChanged() {
		this.updateOutput();
	}

	render() {

		return ( 
		<div style={ { position: 'relative' } }>
			

			<svg style={ { position: "absolute" } } ref={ el => this.topSVG = el } width={ this.props.width } height={ this.props.height }></svg>
			<div style={ { position: "absolute" } } ref={ el => this.dom = el } />
			<div style={ { pointerEvents: 'none', position: "absolute", top: '0px' }} ref={ el => this.domMolecule = el } dangerouslySetInnerHTML={{ __html: this.state.molecule }}></div>
			
			<div className="toolbar">
				<p><input ref={ el => { this.checkboxPeakPicking = el } } onClick={ this.togglePeakPicking } type="checkbox" name="peakpicking" /> Peak picking</p>
				<p><input ref={ el => { this.checkboxAssignment = el } } onClick={ this.toggleAssignment } type="checkbox" name="assignment" /> Create assignment</p>
				<p><input ref={ el => { this.checkboxRemoveAssignment = el } } onClick={ this.toggleRemoveAssignment } type="checkbox" name="assignment" /> Remove assignments</p>
				<p><button ref={ el => { this.zoomOutButton = el } } onClick={ this.fullOut }>Zoom out</button></p>
			</div>
			<span>
				{ ( this.state.series || [] ).map( ( serie ) => 
					<NMRSerie 
						color 		= {serie.color} 
						onChanged 	= { this.serieChanged } 
						onIntegralChanged 	= { this.onIntegralChanged } 
						onIntegralLabelRatioChanged = { this.onIntegralLabelRatioChanged }
						name 		= { serie.name } 
						data 		= { serie.data } 
						shift 		= { serie.shift } 
						integrals 	= { serie.integrals } 
						integralLabelRatio = { serie.integralLabelRatio }
					/> 
				) }
			</span>
		</div>
		);
	}
}

NMR1D.childContextTypes = {
  graph: PropTypes.instanceOf( Graph ),
  integralBaseline: PropTypes.number
};

export default NMR1D;