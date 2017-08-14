import React from "react";
import Graph from "../../src/graph";
import PropTypes from 'prop-types';

class NMRIntegral extends React.Component {
	
	constructor( props, context ) {
		
		super( props );

		this.state = {};
		this.annotation = context.graph.newShape("nmrintegral", {
				editable: true,
				selectable: true,
				selectOnClick: true,
				resizable: true,
				movable: true,
				handles: true,
				labels: [ { text: "", anchor: "middle", backgroundColor: 'white', backgroundOpacity: 0.8, baseline: 'middle' } ],

			}, 
			false,
			{ 'labelEditable': [ true ], layer: [ 3 ], strokeWidth: [ 2 ]  }
		);

		this.annotation.addClass('integral');
		this.annotation.setProp('baseLine', context.integralBaseline );

		this.ratio = undefined;
		this.annotation.draw( false, true );
		this.annotation.on("changed", () => {

			if( this.annotation.sumVal !== this.sum ) {

				this.sum = this.annotation.sumVal;
				this.props.onSumChanged && this.props.onSumChanged( this.sum, this.props.id );
			}

		});

		this.annotation.on("shapeResized", () => {

			this.props.onChanged( this.props.id, this.annotation.getPosition( 0 ).x, this.annotation.getPosition( 1 ).x );
		});

		this.annotation.on("shapeMoved", () => {

			this.props.onChanged( this.props.id, this.annotation.getPosition( 0 ).x, this.annotation.getPosition( 1 ).x );
		});

		this.annotation.on("shapeLabelChanged", ( shape, parameters ) => {

			//const rescale = parseFloat( parameters.nextValue ) / parameters.previousValue;
			this.props.onValueChanged( parseFloat( parameters.nextValue ) );
			 
		});


		this.annotation.on("removed", () => {
			this.props.onRemoved( this.props.id );
		});


			 // Determine the shift
		
	}

	componentDidMount() {
		
		this.updateAnnotation();
	}

	updateAnnotation() {

		this.annotation.ratio = this.props.ratio;

		this.annotation.setPosition( { x: this.props.from }, 0 );
		this.annotation.setPosition( { x: this.props.to }, 1 );
		this.annotation.setSerie( this.context.serie );
		this.annotation.setDom( 'data-integral-id', this.props.id );
		this.annotation.setProp( 'labelHTMLData', { 'data-integral-id': this.props.id } );
		this.annotation.updateIntegralValue( this.props.labelRatio );
		this.annotation.redraw( );
	}

	componentWillUpdate() {


		this.updateAnnotation();
	}

	render() {

		this.updateAnnotation();
		return (<span key={ this.props.id } />)
	}
}


NMRIntegral.contextTypes = {
  graph: PropTypes.instanceOf( Graph ),
  serie: PropTypes.instanceOf( Graph.getConstructor( Graph.SERIE_LINE ) ),
  integralBaseline: PropTypes.number
};


export default NMRIntegral