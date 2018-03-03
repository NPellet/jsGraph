import React from "react";
import Graph from "../../src/graph";
import PropTypes from 'prop-types';
import Assignment from './assignment.js'
import FormCoupling from './forms/form_coupling/formcoupling.jsx'
import FormArea from './formarea.jsx'
import extend from 'extend';

var levelHeight = 12;
var colors=[ '#ca072c','#9507ca','#0727ca','#07cac8', '#08a538' ];

// Example for 400MHz
var hzToPoint = 10**6 / 400e6;

var width = 100;
var yShift = 1;

var currentColor;
var highlight = 1;


function getMultiplicity(string) {
    switch (string) {
        case 's':
            return 1;
        case 'd':
            return 2;
        case 't':
            return 3;
        case 'q':
            return 4;
        case 'quint':
            return 5;
        case 'hex':
        case 'sex':
            return 6;
        case 'hept':
        case 'hepta':
            return 7;
        case 'oct':
        case 'octa':
            return 8;
        case 'non':
        case 'nona':
            return 9;
    }
}

function getPascal(n) {
    var line=[1];
    for (var i=0; i<(n-1); i++) {
      line.push(line[i]*(n-i-1)/(i+1))  
    }
    return line;
}



function makePeakLine(x, y, height, color) {
    if (! height) height=levelHeight;
    return makeLine (x, y, x, y+height, color, 2);
}

function makeDiagonalLine(x1, y1, x2, y2, color) {
    return makeLine (x1, y1, x2, y2, color, 0.4);
}

function makeLine(xFrom, yFrom, xTo, yTo, color, width) {
    return {
    	"properties": {
	         "position": [
	             {
	              "y": (yFrom + yShift)+"px",
	              "x": xFrom
	            },
	            {
	              "y": (yTo + yShift)+"px",
	              "x": xTo
	            }
        	],
        	"strokeColor": [ color ],
        	"strokeWidth": [ width ]
        },
        "type": "line",
     }
}





class NMRSignal extends React.Component {
	
	constructor( props, context ) {
		
		super( props );


		this.graph = context.graph;

		this.currentLevel;


		this.assignment = context.assignment;

		this.reactFormArea = context.formArea;
		this.editCoupling = this.editCoupling.bind( this );
		
	
	}

	componentWillUnmount() {

		this.removeAll();
		this.assignment.removeGraphShape( this.props.id );
	}

	removeAll() {

		if( this._jsGraphShapes ) {
			this._jsGraphShapes.map( shape => shape.kill() );
		}
		this._jsGraphShapes = [];
	}

	componentDidMount() {
		
		this.updateSignalDrawing();

	}

	appendLevel( multiplicity, coupling ) {

	    this.currentLevel={
	    	multiplicity: multiplicity, coupling: coupling, peaks: []
	    };
	   
	    this.allLevels.push( this.currentLevel );
	    this.currentColor = colors[ ( this.allLevels.length - 1 ) % colors.length ];
	  
	    var previousPeaks 	= this.previousLevel.peaks; 
	    var vertical 		= levelHeight * ( ( this.allLevels.length - 1 ) * 2 );
	    var pascal 			= getPascal( getMultiplicity( multiplicity ) );

	    for (var i = 0; i < previousPeaks.length; i++) {

	        var parent = previousPeaks[ i ];
	        var peaks = [];
	        
	        for (var j = 0; j < pascal.length; j++) {

	            let xShift = coupling * j * hzToPoint- ( ( coupling * hzToPoint * ( pascal.length-1 ) ) / 2 );
	            peaks.push( { 
	            	x: parent.x - xShift, 
	            	y: vertical, 
	            	height: parent.height * pascal[ j ]
	            } )
	        }

	        this.paintTree(parent, peaks, this.currentColor);
	        this.currentLevel.peaks = this.currentLevel.peaks.concat( peaks );
	    };
	    
	    this.previousLevel = this.currentLevel;
	}

	paintTree( parentPeak, currentPeaks, color, horizontal ) {
	    // we paint diagonals to parent

	    this._jsGraphShapes.map( ( shape ) => shape.kill() );

	    this.highlight++;


	    if( parentPeak ) {
	        for (var i=0; i < currentPeaks.length; i++) {
	            var peak = currentPeaks[i];
	            this.annotations.push( makeDiagonalLine( parentPeak.x, parentPeak.y+levelHeight, peak.x, peak.y ,color));
	        }        
	    };

	    if( horizontal ) {

	    	let peak = currentPeaks[ 0 ];
	    	this.annotations.push( makeDiagonalLine( horizontal[ 1 ], peak.y + levelHeight / 2, horizontal[ 0 ], peak.y + levelHeight / 2, color) );
	    	this.annotations.push( makePeakLine( horizontal[ 0 ], peak.y, null, color ) );
			this.annotations.push( makePeakLine( horizontal[ 1 ], peak.y, null, color ) );

	    } else {
		    	    // we paint vertical of current level
		    for (var i = 0; i < currentPeaks.length; i++) {
		        let peak = currentPeaks[i];
		        this.annotations.push( makePeakLine( peak.x, peak.y, null, color ) );
		    }
		}


	    let refShape;
	    this._jsGraphShapes = this.annotations.map( ( annotation, index ) => {


	    	let annotation_jsGraph = this.graph.newShape( annotation.type, { noY: true }, false, annotation.properties );
	    	annotation_jsGraph.setDom( 'data-signal-id', this.props.id );
	    	annotation_jsGraph.draw().redraw();

	    	if( index == 0 ) {
	    		refShape = annotation_jsGraph;
	    	}

	    	annotation_jsGraph._dom._shape = refShape;
	    	annotation_jsGraph.on('shapeClicked', this.editCoupling );
	    	return annotation_jsGraph;
	    } );
	}

	editCoupling() {

		let validated = ( newValue ) => {
			this.props.onSignalChanged( this.props.id, newValue );
		}

		let split = ( newValue ) => {
			newValue = extend( true, {}, newValue );
			this.props.onSignalCreated( newValue );
		}

		this.reactFormArea.setForm(
			<FormCoupling 
				onValidate={ validated }
				onCancel={ () => this.reactFormArea.empty() }
				onSplit={ split } 
				formData={ this.props } />
		);
	}

	updateSignalDrawing( props = this.props ) {


		this.removeAll();

		this.annotations=[];
		this.currentColor = colors[ 0 ];

		this.previousLevel = {
			multiplicity: 's', 
			coupling: 0, 
			peaks: [ {
				x: props.delta, 
				y: 0, 
				height: 1
			} ]
		};
		
		this.allLevels = [ this.previousLevel ];
		this.paintTree( null, this.previousLevel.peaks, this.currentColor, ! this.props.j || this.props.j.length == 0 ? [ this.props.from, this.props.to ] : undefined );

		 this._jsGraphShapes[ 0 ].selectable( true );
		 this._jsGraphShapes[ 0 ].movable( true );
		 this._jsGraphShapes[ 0 ].setProp( 'selectOnMouseDown', true );
		 //this._jsGraphShapes[ 0 ]._data = { noY: true };

		if( ! Array.isArray( this.props.j ) ) {
			return;
		}		

		for (var i = 0; i < this.props.j.length; i++) {
		    var multiplicity = this.props.j[ i ].multiplicity;
		    var coupling = this.props.j[ i ].coupling;
		    if (multiplicity && coupling) {
		        this.appendLevel( multiplicity, coupling );
		    }
		}


	}

	componentWillReceiveProps( nextProps ) {
		
		this.updateSignalDrawing( nextProps );

		if( nextProps.id !== this.props.id ) {
			if( ! this.assignment ) {
				throw "No assignment object. Cannot rename integral";
			}
			this.assignment.renameAssignementElement( this.props.id, nextProps.id );
		}
	}

	render() {

		
		return (<span key={ this.props.id } />)
	}
}


NMRSignal.contextTypes = {
  assignment: PropTypes.instanceOf( Assignment ),
  graph: PropTypes.instanceOf( Graph ),
  formArea: PropTypes.instanceOf( FormArea ),
  serie: PropTypes.instanceOf( Graph.getConstructor( Graph.SERIE_LINE ) )
};


export default NMRSignal