'use strict';

import React from "react";
import Graph from "../../src/graph";
import PropTypes from 'prop-types';
import NMRSerie from './nmrserie.jsx'
import NMRSerie2D from './nmrserie2d.jsx'
import Assignment from './assignment.js'
import NMR1D from "./nmr1d.jsx"

const trianglePath = 'm -6 -12 h 12 l -6 9 z';
const integralBaseline = 250;

class NMR2D extends React.Component {
	

	constructor( props ) {
		super( props );
		this.state = {};

		this.unique = "NMR2DUnique";
		
		this.graph = new Graph( {
			close: false,

		} );

		this.legend = this.graph.makeLegend();
		this.legend.setAutoPosition('bottom');

		this.graph.getBottomAxis().gridsOff();
		this.graph.getLeftAxis().gridsOff();

		this.graph
				.getBottomAxis()
				.flip( true )
				.setLabel( '\u03B4' )
				.setUnit( 'ppm' );

		this.graph
				.getLeftAxis()
				.flip( true )
				.setLabel( '\u03B4' )
				.setUnit( 'ppm' );


		this.onIntegralChanged = this.onIntegralChanged.bind( this );
		this.onIntegralRemoved = this.onIntegralRemoved.bind( this );
		this.onIntegralLabelRatioChanged = this.onIntegralLabelRatioChanged.bind( this );
		this.pickPeak = this.pickPeak.bind( this );
		this.triangleMoved = this.triangleMoved.bind( this );
		this.triangleCreated = this.triangleCreated.bind( this );
		this.togglePeakPicking = this.togglePeakPicking.bind( this );
		//this.toggleAssignment = this.toggleAssignment.bind( this );
		//this.toggleRemoveAssignment = this.toggleRemoveAssignment.bind( this );
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
		//this.graph.trackingLine( this.checkboxPeakPicking.checked );
	}

	

	updateMainData() {

		this.graph.autoscaleAxes();
		this.graph.draw();
		this.legend.update();
	}

	componentDidMount() {
		
			console.log('Mounting 2D spectrum');

			this.setState( { molecule: this.props.molecule } );
return;
		// Reassigns some properties to the state (because it can potentially change)	
		this.setState( { series: this.props.series, molecule: this.props.molecule } );

		// Binds the graph to the DOM element
		this.graph.resize( this.props.width, this.props.height );

		this.graph.setWrapper( this.dom );
		this.updateMainData();


/*

		// Listen for the CMD key to be pressed (allows to remove shapes and integrals)
		this.wrapper.addEventListener("keydown", ( e ) => {
			

			if( e.keyCode == 16 ) {
				this.wrapper.classList.add( "linkable" );
			}

			if( ( window.navigator.platform == "MacIntel" && ( e.keyCode == 91 || e.keyCode == 93 ) ) || ( window.navigator.platform !== "MacIntel" && e.keyCode == 17 ) ) {
				
				this.wrapper.classList.add( "removable" );
				
		//		this.assignment.enableRemove();
				this.removeEnabled = true;
			}

			var mdown = ( e ) => {
							
				this.wrapper.classList.add( "removing" );
		//		this.assignment.enableRemoveMouseover();

				this.wrapper.addEventListener("mouseup", ( e ) => {

					this.wrapper.classList.remove( "removing" );
		//			this.assignment.disableRemoveMouseover();

					this.wrapper.removeEventListener("mousedown", mdown );


				}, { once: true } );
			}


			this.wrapper.addEventListener("mousedown", mdown );
		
			document.addEventListener("keyup", ( e ) => {
				

				if( e.keyCode == 16 ) {
					this.wrapper.classList.remove( "linkable" );
					return;
				}

				this.wrapper.removeEventListener("mousedown", mdown );

				this.wrapper.classList.remove( "removable" );
				this.assignment.disableRemove();
				this.removeEnabled = false;
			
			}, { once: true } );

		});
*/
			// Listen for the CMD key to be pressed (allows to remove shapes and integrals)
/*		this.wrapper.addEventListener("mousemove", ( e ) => {
			this.wrapper.focus();
		});
*/

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

			enabled: true

		};


	//	this.assignment = new Assignment( this.graph, this.domMolecule, assignmentOptions );
/*
		this.assignment.onChange( ( pairs ) => {

			this.getSerieState( 'master' ).assignment = pairs;
			this.serieChanged();
		});
		*/
	}

	updateOutput() {
		this.props.onChanged( this.state.series );
	}

	componentWillReceiveProps( nextProps ) {

		this.setState( { series: nextProps.series, molecule: nextProps.molecule } );


		this.graph.resize( nextProps.width, nextProps.height );
		
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

	// TODO: Make a general listener at the graph level
	onIntegralRemoved( serieName, integralId ) {

		let update = false;


		for( let serie of this.state.series ) {

			if( serie.name == serieName ) {

				for( let i = 0; i < serie.integrals.length; i ++ ) {

					if( serie.integrals[ i ].id == integralId ) {

//						this.assignment.removeGraphShape( integralId );
						serie.integrals.splice( i, 1 );
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
			this.serieChanged();
		}
	}


	serieChanged() {
		this.updateOutput();
	}

	render() {
console.log('Rendering');
		return ( 
		<div 
			id={ this.unique }
			ref={ el => this.wrapper = el } 
			style={ { position: 'relative' } } 
			onDragOver={ ( event ) => { event.preventDefault(); console.log('droppable') } } 
			onDrop={ ( event ) => { 

			 var offset = event.dataTransfer.getData("text/plain").split(',');
		    var dm = this.domMolecule;
		    dm.style.left = (event.clientX + parseInt(offset[0],10)) + 'px';
		    dm.style.top = (event.clientY + parseInt(offset[1],10)) + 'px';
		    event.preventDefault();
		    return false;
		     } } 
		>
			<style dangerouslySetInnerHTML={{__html: `
		      #${this.unique}.linkable circle[data-atomid] {
					cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="30" style="font-size: 16px;"><text y="15" fill="black">&#9741;</text></svg>'), auto;
				}

				#${this.unique}.removable line.link, #${this.unique}.removable path.integral, #${this.unique}.removing {
					cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="22" height="30" style="font-size: 16px;"><text y="15" fill="black">&#9986;</text></svg>'), auto;
				}
		    `}}></style>

		    <table>	
		    	<tbody>
		    	<tr>
		    		<td></td>
		    		<td>
						<NMR1D key="nmr_top" width="600" height="400" options={ { slave: 'top' } } series={ this.props.nmr_top } onChanged={ () => {} } />
					</td>
				</tr>
				<tr>
		    		<td>		
		    		<NMR1D width="200" height="600" options={ { slave: 'left' } } series={ this.props.nmr_left } onChanged={ () => {} } />
		    		</td>
		    		<td>
						<div style={ { position: "absolute", userSelect: "none" } } ref={ el => this.dom = el } />
					</td>
				</tr>
				</tbody>
			</table>

{/*
			<span>
				{ ( this.state.series || [] ).map( ( serie ) => 
					<NMRSerie2D
						color 		= {serie.color} 
						onChanged 	= { this.serieChanged } 
						onIntegralChanged 	= { this.onIntegralChanged } 
						onIntegralRemoved	= { this.onIntegralRemoved }
						onIntegralLabelRatioChanged = { this.onIntegralLabelRatioChanged }
						name 		= { serie.name } 
						data 		= { serie.data } 
						shift 		= { serie.shift } 
						integrals 	= { serie.integrals } 
						integralLabelRatio = { serie.integralLabelRatio }
						assignement	= { serie.assignment }
					/> 
				) }
			</span>*/ }
		</div>
		);
	}
}

NMR2D.childContextTypes = {
  assignement: PropTypes.instanceOf( Assignment ),
  graph: PropTypes.instanceOf( Graph ),
  integralBaseline: PropTypes.number
};

export default NMR2D;