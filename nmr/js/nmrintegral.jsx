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
			labels: [ { text: "" } ],
		});

		this.annotation.addClass('integral');
		this.annotation.setProp('baseLine', context.integralBaseline );

		this.ratio = undefined;
		this.annotation.draw( false, true );
		this.annotation.on("changed", () => {

			if( this.annotation.sum !== this.sum ) {

				this.sum = this.annotation.sum;
				this.props.onSumChanged && this.props.onSumChanged( this.sum, this.props.id );
			}

		});

		this.annotation.on("shapeResized", () => {

			this.props.onChanged( this.props.id, this.annotation.getPosition( 0 ).x, this.annotation.getPosition( 1 ).x );
		});

		this.annotation.on("shapeMoved", () => {

			this.props.onChanged( this.props.id, this.annotation.getPosition( 0 ).x, this.annotation.getPosition( 1 ).x );
		});
	}

	componentDidMount() {
		
		this.updateAnnotation();
	}

	updateAnnotation() {

		this.annotation.ratio = this.props.ratio;

		this.annotation.setPosition( { x: this.props.from }, 0 );
		this.annotation.setPosition( { x: this.props.to }, 1 );
		this.annotation.setSerie( this.context.serie );
		this.annotation.setDom( 'id', this.props.id );
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