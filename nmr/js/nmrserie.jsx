import React from "react";
import Graph from "../../src/graph";
import PropTypes from 'prop-types';
import NMRRange from './nmrrange.jsx'
import Assignment from './assignment.js'


class NMRSerie extends React.Component {
	
	constructor( props, context ) {
		super( props );

		this.state = {
			ratio: undefined
		};

		this._jsGraphGraph = context.graph;	
		this._jsGraphSerie = this._jsGraphGraph.newSerie( this.props.name, {
			redrawShapesAfterDraw: true
		}, "line" ).autoAxes();

		this._jsGraphSerie.setLayer( this.props.name == 'master' ? 2 : 1 );
		this._jsGraphSerie.on( "draw", () => {
			this.loaded();
		});

		this._assignment = context.assignment;


	/*	this._jsGraphGraph.getPlugin('shape').on( "createdShape", ( event, shape ) => {
			console.log('created2', shape.getSerie() );
			if( shape.getSerie() && shape.getSerie().getName == this.props.name ) { // If the shape belongs to me
				shape.
			}
		});*/

		this.sums = {};
		this.loadedState = false;
		this.sumChanged = this.sumChanged.bind( this );
		this.maxSum = 0;

		this._jsGraphWaveform = Graph.newWaveform();
		//this.onChanged = this.onChanged.bind( this );
		this.integralChanged = this.integralChanged.bind( this );
		this.integralRemoved = this.integralRemoved.bind( this );
		this.onSignalChanged = this.onSignalChanged.bind( this );
		this.onSignalCreated = this.onSignalCreated.bind( this );
		this.scaleIntegralText = this.scaleIntegralText.bind( this );
		
	}

	sumChanged( newSum, identifier ) {

		if( Object.keys( this.sums ).length == 0 ) { // None for now
			//this.setState( { labelRatio: 1 / Object.values( this.sums )[ 0 ] } );
		} else {
			//this.setState( { labelRatio: labelValue / newSum } );
		}

		this.sums[ identifier ] = newSum;
		this.rescaleIntegrals();
	}

	loaded( ) {

		if( this.loadedState ) {
			return;
		}

		this.loadedState = true;

		if( ! this.state.labelRatio ) {
			
			this.setState( { labelRatio: 1 / Object.values( this.sums )[ 0 ] } );
		}
	}

	
	getChildContext() {
	 	return {
	   		serie: this._jsGraphSerie,
	   		assignment: this._assignment
	    };
	}


	componentDidMount( parent ) {

		this.setData();
		this.assignWaveform();
		this.rescaleIntegrals();
		
		this._jsGraphSerie.setWaveform( this._jsGraphWaveform );
		this._jsGraphGraph.addSerieToTrackingLine( this._jsGraphSerie, {} );

		this._jsGraphGraph.options.mouseActions.push( 
			{	
				type: "mousewheel",
				enabled: ( graph ) => { 
					return graph.getSelectedShapes().reduce( 
								( acc, shape ) => { 
									if( ! acc ) { 
										return shape.getType() == 'nmrintegral'
									} 
								}, false ) 
				},
				callback: ( dy ) => {
					
					this.setState( state => { return { ratio: state.ratio * ( dy < 0 ? 1.05 : 0.95 ) } } );
				}
			} );


	}

	rescaleIntegrals() {
		
		// maxSum must ALWAYS be negative

		var maxSum = Math.min.apply( null, Object.values( this.sums ) );

		if( maxSum > this.maxSum ) {
			return;
		}

		this.maxSum = maxSum * 1.5;
		var minRatio = 200 / this.maxSum;
		this.setState( {
			ratio: minRatio
		} );

		this._jsGraphSerie._nmrIntegralRatio = minRatio;
	}

	assignWaveform() {
		this._jsGraphSerie.setWaveform( this._jsGraphWaveform );
	}

	componentWillReceiveProps( nextProps, props ) {

		let redraw = false;

		if( this.props.data !== nextProps.data ) {
			this.setData();
			redraw = true;
		}

		if( nextProps.shift !== props.shift ) {
			this.setShift( nextProps.shift );
			redraw = true;
		}

		if( redraw ) {
			this.assignWaveform();
		}

		if( nextProps.assignment ) {
			
			//	this._assignment.setPairing( this.getSerieState() );
		}


		this.setState( { labelRatio: nextProps.integralLabelRatio } );
	}

	componentDidUpdate() {
		
	//	this.rescaleIntegrals();
		//console.log('rescaling');
	}

	setShift( shift = 0 ) {
		this._jsGraphWaveform.setXShift( shift );
	}

	setData() {

		if( this.props.direction == 'x' ) {
			this._jsGraphWaveform.setData( this.props.data[ 1 ], this.props.data[ 0 ] );	
		} else {
			this._jsGraphWaveform.setData( this.props.data[ 0 ], this.props.data[ 1 ] );
		}
		
		this._jsGraphWaveform.aggregate( this.props.direction );
		this.setShift( this.props.shift );		
	}

	integralChanged( integralId, from, to, newValue ) {
		this.props.onIntegralChanged( this.props.name, integralId, from, to, newValue );
	}

	integralRemoved( integralId ) {
		this.props.onIntegralRemoved( this.props.name, integralId );
	}

	// Occurs after the rescaling of the integral
	scaleIntegralText( newRatio ) {
		this.props.onIntegralLabelRatioChanged( this.props.name, newRatio );
	}

	onSignalChanged( integralId, signalId, signalValue ) {
		this.props.onSignalChanged( this.props.name, integralId, signalId, signalValue );
	}

	onSignalCreated( integralId, signalValue, signalDelta ) {
		this.props.onSignalCreated( this.props.name, integralId, signalValue, signalDelta );
	}

	render() {
//console.log( this._jsGraphGraph );
		//this._jsGraphGraph.redraw();

		this.loadedState = false;
		this._jsGraphSerie.setLineColor( this.props.color, "unselected", true );
		let integralValue;

		return (
			<span>
				{ 
					( this.props.integrals || [] ).map( 
						( el, index ) => {

							if( ! el.key ) {
								el.key = Math.random();
							}

//							if( index == 0 && this.state.labelRatio == undefined ) { // First value is dictating the ratios. Do NOT pass that value to the indices > 0
								integralValue = parseFloat( el.integral );
//							} else {
//								integralValue = undefined;
//							}


							return 	<NMRRange 
										id 		= { el.id } 
										key 	= { el.key } 
										ratio 	= { this.state.ratio } 
										from 	= { el.from } 
										signal 	= { el.signal }
										to 		= { el.to } 
										integralValue = { integralValue }
										labelRatio 	= { this.state.labelRatio } 
										onSumChanged 	= { this.sumChanged } 
										onChanged 		= { this.integralChanged } 
										onValueChanged 	= { this.scaleIntegralText } 
										onRemoved 		= { this.integralRemoved } 
										onSignalChanged = { this.onSignalChanged }
										onSignalCreated = { this.onSignalCreated }
									/> 
						}
					) 
				}
			</span> 
		);
	}
}

NMRSerie.contextTypes = {
  assignment: PropTypes.instanceOf( Assignment ),
  graph: PropTypes.instanceOf( Graph )
};

NMRSerie.childContextTypes = {
  assignment: PropTypes.instanceOf( Assignment ),
  serie: PropTypes.instanceOf( Graph.getConstructor( Graph.SERIE_LINE ) )
};


export default NMRSerie