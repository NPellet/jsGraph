import React from "react";
import Graph from "../../src/graph";
import PropTypes from 'prop-types';
import NMRSignal from './nmrsignal.jsx'

class NMRRange extends React.Component {
	
	constructor( props ) {
		
		super( props );


		this.state = {};
		

		this.onSignalChanged = this.onSignalChanged.bind( this );
		this.onSignalCreated = this.onSignalCreated.bind( this );
			 // Determine the shift
		
	}

	componentDidMount() {
		
		this.annotation = this.context.graph.newShape("nmrintegral", {
				editable: true,
				selectable: true,
				selectOnClick: true,
				resizable: true,
				movable: true,
				handles: true,
				labels: [ 
				{ 
					text: "", 
					anchor: "middle", 
					backgroundColor: 'white', 
					backgroundOpacity: 0.8, 
					baseline: 'middle' 
				} ],
			}, 
			false,
			{ 
				labelEditable: [ true ], 
				layer: [ 3 ], 
				strokeWidth: [ 2 ]  
			}
		);
		
		this.annotation.addClass('integral');
		this.annotation.setProp('baseLine', this.context.integralBaseline );

		this.ratio = undefined;
		this.annotation.draw( false, true );
		this.annotation.on("changed", () => {

			if( this.annotation.sumVal !== this.sum ) {
				this.sum = this.annotation.sumVal;
				this.props.onSumChanged && this.props.onSumChanged( this.sum, this.props.id );

			}
		} );

		this.annotation.on("shapeResized", () => {
			this.props.onChanged( this.props.id, this.annotation.getPosition( 0 ).x, this.annotation.getPosition( 1 ).x, parseFloat( this.annotation.getLabelText() ) );
		});

		this.annotation.on("shapeMoved", () => {
			this.props.onChanged( this.props.id, this.annotation.getPosition( 0 ).x, this.annotation.getPosition( 1 ).x, parseFloat( this.annotation.getLabelText() ) );
		});

		this.annotation.on("shapeLabelChanged", ( shape, parameters ) => {
			this.props.onValueChanged( parseFloat( parameters.nextValue ) / parseFloat( parameters.previousValue ) );
		});

		this.annotation.on("removed", () => {
			this.props.onRemoved( this.props.id );
		});

		this.updateAnnotation();
	}


	componentWillUnmount() {
		this.annotation.kill();
	}


	updateAnnotation( props = this.props ) {

		this.annotation.ratio = props.ratio;

		this.annotation.setPosition( { x: props.from }, 0 );
		this.annotation.setPosition( { x: props.to }, 1 );
		this.annotation.setSerie( this.context.serie );
		this.annotation.setDom( 'data-integral-id', props.id );
		this.annotation.setProp( 'labelHTMLData', { 'data-integral-id': props.id } );

		this.annotation.redraw( );

		if( props.integralValue !== undefined ) {
			let ratio = this.annotation.updateIntegralValue( undefined, props.integralValue );
		} else {
			let ratio = this.annotation.updateIntegralValue( props.labelRatio );
		}
	}

	componentWillUpdate( nextProps ) {

		this.updateAnnotation( nextProps );
	}

	onSignalChanged( signalId, signalValue ) {
		this.props.onSignalChanged( this.props.id, signalId, signalValue );
	}

	onSignalCreated( signalValue ) {
		this.props.onSignalCreated( this.props.id, signalValue, ( this.props.to + this.props.from ) / 2 );
	}

	render() {

		return (
			<span>
				{ 
					( this.props.signal || [] ).map( 
						
						( el ) => {

							if( ! el.key ) {
								el.key = Math.random();
							}

							return <NMRSignal 
								key 		= { el.key } 
								j 			= { el.j }
								id 			= { el.delta }
								delta 		= { el.delta }
								onSignalChanged = { this.onSignalChanged }
								onSignalCreated = { this.onSignalCreated }
								from = { this.props.from } 
								to = { this.props.to }
							/> 
						}
					) 
				}
			</span> 
		);
	}
}


NMRRange.contextTypes = {
  graph: PropTypes.instanceOf( Graph ),
  serie: PropTypes.instanceOf( Graph.getConstructor( Graph.SERIE_LINE ) ),
  integralBaseline: PropTypes.number
};


export default NMRRange