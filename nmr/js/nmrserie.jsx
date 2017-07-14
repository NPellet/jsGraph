import React from "react";
import Graph from "../../src/graph";
import PropTypes from 'prop-types';
import NMRIntegral from './nmrintegral.jsx'

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

		this._jsGraphSerie.on( "draw", () => {
			this.loaded();
		});


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
	}

	sumChanged( newSum, identifier ) {

		if( Object.keys( this.sums ).length == 0 ) { // None for now
			
			this.setState( { labelRatio: 1 / Object.values( this.sums )[ 0 ] } );
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
	   		serie: this._jsGraphSerie
	    };
	}

	componentDidMount( parent ) {

		this.setData();
		this.assignWaveform();
		this.rescaleIntegrals();
		this._jsGraphSerie.setWaveform( this._jsGraphWaveform );
		this._jsGraphGraph.addSerieToTrackingLine( this._jsGraphSerie, {} );
		
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

	// Occurs after the rescaling of the integral
	scaleIntegralText( whichIntegral, whichValue ) {

		const sum = this.sums[ whichIntegral ];
		if( ! sum ) {
			return;
		}
		this.setState( {
			labelRatio: whichValue / sum
		});

		this._jsGraphSerie._nmrIntegralLabelRatio = whichValue / sum;
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

//		this.setState( { labelRatio: this.props.labelRatio } );
	}

	componentDidUpdate() {
		
	//	this.rescaleIntegrals();
		//console.log('rescaling');
	}

	setShift( shift = 0 ) {
		this._jsGraphWaveform.setXShift( shift );
	}

	setData() {
		
		this._jsGraphWaveform.setData( this.props.data[ 1 ], this.props.data[ 0 ] );
		this._jsGraphWaveform.aggregate();
		this.setShift( this.props.shift );
		
	}

	integralChanged( integralId, from, to ) {

		this.props.onIntegralChanged( this.props.name, integralId, from, to );
	}


	render() {
//console.log( this._jsGraphGraph );
		//this._jsGraphGraph.redraw();

		this.loadedState = false;

		this._jsGraphSerie.setLineColor( this.props.color, "unselected", true );

		return (
			<span>
				{ 
					( this.props.integrals || [] ).map( 
						( el ) => <NMRIntegral id={ el.id } key={ el.id } labelRatio={ this.state.labelRatio } ratio={ this.state.ratio } from={ el.from } to={ el.to } onSumChanged={ this.sumChanged } onChanged={ this.integralChanged } onValueChanged={ ( value ) => { this.scaleIntegralText( el.id, value ); } } /> 
					) 
				}
			</span> 
		);
	}
}

NMRSerie.contextTypes = {
  graph: PropTypes.instanceOf( Graph )
};

NMRSerie.childContextTypes = {
  serie: PropTypes.instanceOf( Graph.getConstructor( Graph.SERIE_LINE ) )
};


export default NMRSerie