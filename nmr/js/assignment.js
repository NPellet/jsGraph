/**
 *
 *	Assignment code
 *	Norman Pellet, 2017
 *	Configuration example:
 *

graph: {
	bindableFilter: "", // a querySelector element that defined which element is a target
	equivalentAttribute: 'id',	// A unique filter
	highlightStyle: {

		'binding': {				// The style the object takes when it's a highlighted target
			'stroke': 'red',		
			'stroke-width': '2px'
		},
		equivalent: {				// The style the object takes when it's equivalent
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

 */


var processQuerySelector = ( string ) => {
	return string.replace('\\', '\\\\');
}

var ns = 'http://www.w3.org/2000/svg';

	class Assignment {

		constructor( graph, molecule, options ) {

			if( ! molecule || ! graph ) {
				this.disabled = true;
				return;
			}

			this.options = options;
			this.pairs = [];
			this.target = {};

			this.stashedLines = [];
			this.currentLines = [];

			this.graph = graph;
			this.molecule = molecule;
			

			this.callbacksChanged = [];

			this.graph.getWrapper().addEventListener( 'mousedown', ( e ) => {

				if( ! this.isEnabled() ) {
					return;
				}

				if( e.target.matches( options.graph.bindableFilter ) ) {
					this.mousedown( e, true );
				}
			}, true ); // It is critical to capture the event, and not bubble it. graphWrapper is at an inferior level from groupEvent, where the graph events are usually attached. If we don't do this, the graph will start creating shapes

			this.graph.getWrapper().addEventListener('mouseover', ( e ) => {


				/*if( ! this.isEnabled() ) {
					return;
				}
*/
				if( e.target.matches( options.graph.bindableFilter ) ) {
					this.mouseenter( e, true );
				}
			});


			this.graph.getWrapper().addEventListener('mouseout', ( e ) => {
/*
				if( ! this.isEnabled() ) {
					return;
				}
*/

// Why is this ?
/*
				if( this.options.removeEnabled ) {
					return;
				}
*/
				if( e.target.matches( options.graph.bindableFilter ) ) {

					this.mouseout( e, true, this.options.removeEnabled );
				}

			});


			this.graph.getWrapper().addEventListener('mouseup', ( e ) => {

				if( ! this.isEnabled() ) {
					return;
				}

				this.mouseup( e, true );
			});


			this.molecule.addEventListener('mousedown', ( e ) => {


				if( ! this.isEnabled() ) {
					return;
				}

				if( e.target.matches( options.molecule.bindableFilter ) ) {					
					this.mousedown( e, false );
				}
			});

			this.molecule.addEventListener('mouseover', ( e ) => {


			/*	if( ! this.isEnabled() ) {
					return;
				}
*/


				if( e.target.matches( options.molecule.bindableFilter ) ) {
					this.mouseenter( e, false );
				}
			});

			this.molecule.addEventListener('mouseout', ( e ) => {

/*
				if( ! this.isEnabled() ) {
					return;
				}
*/


				if( e.target.matches( options.molecule.bindableFilter ) ) {
	
					this.mouseout( e, false, this.options.removeEnabled );
				}

			});

			this.molecule.addEventListener('mouseup', ( e ) => {

				if( ! this.isEnabled() ) {
					return;
				}

				this.mouseup( e, false );
			});

			/*this.topSVG.addEventListener('mousemove', ( e ) => {
				

				if( ! this.isEnabled() ) {
					return;
				}

				this.mousemove( e );
			});
*/
			this.molecule.addEventListener('mousemove', ( e ) => {

				if( ! this.isEnabled() ) {
					return;
				}

				this.mousemove( e );
			});

			this.graph.getWrapper().addEventListener('mousemove', ( e ) => {

				if( ! this.isEnabled() ) {
					return;
				}

				this.mousemove( e );
			});


			let bindingLine = document.createElementNS( ns, 'line');
			bindingLine.setAttribute('stroke', 'black');
			this.graph.getDom().appendChild( bindingLine );

			this.bindingLine = bindingLine;
			
			this.options = options;
		}
	//	domMolecule, domGraphs, domGlobal, moleculeFilter, graphs


		onChange( method ) { 

			this.callbacksChanged.push( method );
			return this;
		}
		/*
		 *	ENABLE AND DISABLE ASSIGNMENT
		 *
		 */
		 
		isEnabled() {
			return this.options.enabled;
		}

		enable() {
			this.options.enabled = true;
		}

		disable() {
			this.options.enabled = false;
		}

		toggleEnable() {
			this.options.enabled = ! this.options.enabled;
		}



		/*
		 *	ENABLE AND DISABLE ASSIGNMENT REMOVAL
		 *
		 */
		enableRemove() {

			this.removeLines();

			this.allPairs( false, ( pair ) => {

				this.highlightPair( pair );
			} );

			this.options.removeEnabled = true;
		}

		disableRemove() {


			this.allPairs( false, ( pair ) => {

				this.unhighlightPair( pair );
			} );

			this.removeLines();

			this.options.removeEnabled = false;
		}

		enableRemoveMouseover() {
			this.options.removeEnableOver = true;
		}

		disableRemoveMouseover() {
			this.options.removeEnableOver = false;
		}


		highlight( type, targetEls, highlightType ) {

			for( let element of targetEls ) {

				let style = this.getOptions( type ).highlightStyle[ highlightType ];

				if( type && element.jsGraphIsShape ) { // It is a shape

					element.jsGraphIsShape.highlight( style, highlightType );

				} else { // It is an atom

					this.storeAttributes( style, element, highlightType );

					for( var i in style ) {
						element.setAttribute( i, style[ i ] );
					}
				}
			}
		
		}

		unHighlight( type, targetEls, highlightType ) {

			for( let element of targetEls ) {

				let style = this.getOptions( type ).highlightStyle[ highlightType ];

				if( type && element.jsGraphIsShape ) {

					element.jsGraphIsShape.unHighlight( style, highlightType );

				} else {

					this.restoreAttributes( style, element, highlightType );
				}
			}
		}


		getOptions( type ) {
			return this.options[ type ? 'graph' : 'molecule' ]
		}

		getDom( type ) {
			return type ? this.graph.getWrapper() : this.molecule;
		}

		findTargettableElements( type ) {
			return this.getDom( type ).querySelectorAll( this.getOptions( type ).bindableFilter );
		}


		mousedown( event, type ) {

			if( event.shiftKey ) {
			
				this.graph.lockShapes();					
				
				this.binding = true;

				if( type ) { // Graph element

					this.currentTargetGraph = event.target;
				
				} else {
				
					this.currentTargetMolecule = event.target;
				}

				event.preventDefault();
				event.stopPropagation();

				let bb = event.target.getBBox();
				let pos = event.target.getBoundingClientRect();
				
				let pos2 = this.graph.getWrapper().getBoundingClientRect();

				let x = pos.left - pos2.left,
					y = pos.top - pos2.top;


				if( ! type ) {
					 y += bb.height / 2;
					 x += bb.width / 2;
				}


				this.bindingLine.setAttribute('display', 'block');
				this.bindingLine.setAttribute('x1', x + window.scrollX );
				this.bindingLine.setAttribute('x2', x + window.scrollX );
				this.bindingLine.setAttribute('y1', y + window.scrollY );
				this.bindingLine.setAttribute('y2', y + window.scrollY );
				this.bindingLine.setAttribute('pointer-events', 'none');


				// Look for targettable (bindable) elements of the other type and highlight them
				this.highlight( ! type, this.findTargettableElements( ! type ), 'binding' );
			}
		}

		mouseup( event, type ) {

			if( ! this.binding ) { return; }
			// Cancels the highlight of the for targettable (bindable) elements of the other type
			this.unHighlight( ! type, this.findTargettableElements( ! type ), "binding" );
			this.unHighlight( type, this.findTargettableElements( type ), "binding" );

			this.bindingLine.setAttribute('display', 'none');
			this.binding = false;

			let target = event.target;
			
			if( ! target.matches( this.getOptions( type ).bindableFilter ) && ( ( this.getOptions( type ).bindableFilterClass && ! target.classList.includes( this.getOptions( type ).bindableFilterClass ) ) || ! this.getOptions( type ).bindableFilterClass ) ) {

				this.binding = false;

			} else {

				if( type ) {
					this.currentTargetGraph = event.target;
				} else {
					this.currentTargetMolecule = event.target;
				}

				this.binding = false;
				this.bindSave();
			}

			
			this.graph.unlockShapes();	
			
		}

		mousemove( e ) {

			if( ! this.binding ) {
				return;
			}

			let rect = this.graph.getWrapper().getBoundingClientRect();

			this.bindingLine.setAttribute('x2', e.clientX - rect.left );
			this.bindingLine.setAttribute('y2', e.clientY - rect.top );
		}
/*
		highlightPairs( element, type ) {
			
			var elements = [ element ];
			if( this.getOptions( type ).highlighted ) {
				elements = getEquivalents( target, element );
				highlightEquivalents( target, elements );
			}
			
			//getEquivalents( target, selector );


			var eqs = [];
			
//				unhighlight( element, target );
			for( var i = 0, l = elements.length; i < l; i ++ ) {
		
				allPairs( highlightPair, elements[ i ], function( pair ) {
					eqs = eqs.concat( $.makeArray( getEquivalents( otherTarget( target ), pair[ otherTarget( target ) ] ) ) );
				} );
			}

			
			eqs = $( eqs );
			
			if( options[ otherTarget( target ) ].highlighted ) {
				highlightEquivalents( otherTarget( target ), eqs );
			}
			
		},*/

		mouseout( event, type, noPairs ) {

			var elements = this.getEquivalents( event.target, type );
		
			// We must unhighlight the equivalent elements, even if they are not paired yet		
			this.unHighlight( type, elements, "equivalent" );


			if( this.binding ) {
				return;
			}

			if( noPairs ) {
				return;
			}

			this.allPairs( this.getUnique( event.target, type ), ( pair ) => {

				this.unhighlightPair( pair );
			} );
		}

		mouseenter( event, type ) {

			var elements = this.getEquivalents( event.target, type );
			
			// We must highlight the equivalent elements, even if they are not paired yet
			this.highlight( type, elements, "equivalent" );

			if( this.binding ) {
				return;
			}
			this.allPairs( this.getUnique( event.target, type ), ( pair ) => {

				this.highlightPair( pair );
			} );

		}
/*
		highlightEquivalents = function( target, elementsToHighlight ) {

			var highlightedAttributes = options[ target ].highlighted;

			if( elementsToHighlight[ 0 ] && elementsToHighlight[ 0 ].jsGraphIsShape ) {

				elementsToHighlight.map( function( el ) {

					this.jsGraphIsShape.highlight( highlightedAttributes, "assignmentHighlighted");
				} );

			} else {

				storeAttributes( highlightedAttributes, elementsToHighlight );
				elementsToHighlight.attr( highlightedAttributes );

			}

			highlighted[ target ] = elementsToHighlight;

		},
*/
		getEquivalents( element, type ) {

			let attribute = this.getOptions( type ).equivalentAttribute,
			 	attributeValue = element.getAttribute( attribute );

			 return this.getEquivalentsFromUnique( attributeValue, type );
			
		}

		getEquivalentsFromUnique( attributeValue, type ) {

			attributeValue = processQuerySelector( attributeValue );
			return this
					.getDom( type )
					.querySelectorAll( 
						"[" + this.getOptions( type ).equivalentAttribute + "=\"" + attributeValue + "\"]"
					);
		}

		storeAttributes( attr, element, type ) {

			let highlightState = element.getAttribute('data-highlight');

			if( ! highlightState ) {
				highlightState = [];
			} else {
				highlightState = highlightState.split(',');
			}

			if( highlightState.indexOf( type ) == -1 ) {
				highlightState.push( type );
			} else {
				return;
			}

			for( var i in attr ) {
				element.setAttribute( 'data-backup-' + type + '-' + i, element.getAttribute( i ) );
			}
			element.setAttribute('data-highlight', highlightState.join(',') );
		}

		restoreAttributes( attr, element, type ) {

			let highlightState = element.getAttribute('data-highlight');

			if( highlightState == null ) {
				highlightState = [];
			} else {
				highlightState = highlightState.split(',');
			}

			let position = highlightState.indexOf( type );

			if( position == -1 ) {
				return;
			}

			if( position < highlightState.length - 1 ) {

				this.restoreAttributes( attr, element, highlightState[ position + 1 ] );
			}

			for( var i in attr ) {

				element.setAttribute( i, element.getAttribute('data-backup-' + type + '-' + i ) );
			}

			highlightState = highlightState.splice( 0, position );
			
			element.setAttribute( 'data-highlight', highlightState.join( ',' ) );
			return;
		}

		allPairs( elementUnique, callback ) {

			for( var i = 0, l = this.pairs.length ; i < l ; i ++ ) {

				if( !elementUnique || this.pairs[ i ].graphUnique == elementUnique || this.pairs[ i ].moleculeUnique == elementUnique ) {

				//	fct.call( self, self.bindingPairs[ i ] );

					if( callback ) {
						callback.call( this, this.pairs[ i ] );
					}
				}
			}
		}

		highlightPair( pair, noHighlightTargets ) {

			if( pair.line ) {
				return;
			}

			
			var elA = this.getDom( true ).querySelector( "[" + this.getOptions( true ).equivalentAttribute + "=\"" + processQuerySelector( pair.graphUnique ) + "\"]" );
			var elB = this.getDom( false ).querySelector( "[" + this.getOptions( false ).equivalentAttribute + "=\"" + processQuerySelector( pair.moleculeUnique ) + "\"]" );

			var posA = elA._shape.computePosition( 0 );
			var posB = elB.getBoundingClientRect();

			//var bbA = elA.jsGraphIsShape.getPosition( 3 );
			var bbB = elB.getBBox();

			var posMain = this.graph.getWrapper().getBoundingClientRect();

			var line;

			if( this.stashedLines.length > 0 ) {
				line = this.stashedLines.pop();
				line.setAttribute('display', 'block');
			} else {
				line = document.createElementNS( ns, 'line');		
				line.classList.add("link");

				line.addEventListener( 'click', () => {

					if( this.options.removeEnabled ) {

						this.removePair( line.pair, line );
					}
				});

				line.addEventListener( 'mouseover', () => {

					if( this.options.removeEnableOver ) {
						this.removePair( line.pair, line );
					}
				});
			}

			
			line.setAttribute('stroke', 'black');
			line.setAttribute('x1', parseFloat( posA.x ) + this.graph.getPaddingLeft() /*- posMain.left*/ );
			line.setAttribute('y1', parseFloat( posA.y ) + this.graph.getPaddingTop() /*- posMain.top*/  );
			line.setAttribute('x2', posB.left - posMain.left + bbB.width / 2 );
			line.setAttribute('y2', posB.top - posMain.top + bbB.height / 2 );


			pair.line = line;
			line.pair = pair;

			this.currentLines.push( line );
			this.graph.getDom().appendChild( line );


			// Highlight all equivalent elements from both pairs !
			if( ! noHighlightTargets ) {
				this.highlight( true, this.getEquivalentsFromUnique( pair.graphUnique, true ), "equivalent" );
				this.highlight( false, this.getEquivalentsFromUnique( pair.moleculeUnique, true ), "equivalent" );
			}
		}


		unhighlightPair( pair, noHighlightTargets ) {

			if( pair.line ) {
				this.removeLine( pair.line );
			}

			pair.line = false;

			// Highlight all equivalent elements from both pairs !
			if( ! noHighlightTargets ) {
				this.unHighlight( true, this.getEquivalentsFromUnique( pair.graphUnique, true ), "equivalent" );
				this.unHighlight( false, this.getEquivalentsFromUnique( pair.moleculeUnique, true ), "equivalent" );
			}
		}

		getUnique( dom, type ) {
			return dom.getAttribute( this.getOptions( type ).equivalentAttribute );
		}

		bindSave() {

			if( ! this.currentTargetMolecule || ! this.currentTargetGraph ) {
				return;
			}

			let graphUnique = this.currentTargetGraph.getAttribute( this.getOptions( true ).equivalentAttribute ),
				moleculeUnique = this.currentTargetMolecule.getAttribute( this.getOptions( false ).equivalentAttribute ),
				pair;


			if( pair = this.lookForPair( graphUnique, moleculeUnique ) ) {

				// This pair has already been made. Let's just leave it at that

				//this.removePair( pair );
				return false;
			}

			//unhighlight( self.jsGraphShape, "jsGraphShape", true );

			this.pairs.push( { 
				graphUnique: graphUnique,
				moleculeUnique: moleculeUnique
			} );

			this.outputChanged();
			
			//self.jsGraphShape.jsGraphIsShape.setStrokeDasharray("5,5");
			//self.jsGraphShape.jsGraphIsShape.applyStyle();
		
			this.currentTargetGraph = null;
			this.currentTargetMolecule = null;
		}

		outputChanged() {
			let pairing = this.pairs.map( ( pair ) => { return { moleculeUnique: pair.moleculeUnique, graphUnique: pair.graphUnique }; } ); // Remove line and potential other stuff
			this.callbacksChanged.forEach( ( method ) => method( pairing ) );
		}

		setPairing( pairing ) {
			this.removeLines();
			this.pairs = pairing;
		}

		/**
		 *	Looks for a pair based on BOTH the uniques of the graph and the molecule
		 *	@param {String} graphUnique - The unique (equivalent) string belonging to the graph element
		 *	@param {String} moleculeUnique - The unique (equivalent) string belonging to the molecule element
		 *	@returns {Object} - The found pair (if one) or false
		 */
		lookForPair( graphUnique, moleculeUnique ) {

			for( var i = 0; i < this.pairs.length; i++ ) {

				if( this.pairs[ i ].graphUnique == graphUnique && this.pairs[ i ].moleculeUnique == moleculeUnique ) {
					return this.pairs[ i ];
				}
			}

			return false;
		}

		/**
		 *	Removes one pair, including its line
		 */
		removePair( pair, line ) {
			this.pairs.splice( this.pairs.indexOf( pair ), 1 );
			this.unhighlightPair( pair );
			this.outputChanged();
		}

		removeLines() {

			this.pairs.forEach( ( pair ) => { pair.line = null } );

			this.currentLines.forEach( ( line ) => { line.pair = null; line.setAttribute( 'display', 'none' ) } );
			this.stashedLines = this.stashedLines.concat( this.currentLines );
			this.currentLines = [];
		}

		removeLine( line ) {

			if( ! line ) {
				return;
			}

			line.setAttribute('display', 'none');
			this.stashedLines.push( line );
			this.currentLines.splice( this.currentLines.indexOf( line ), 1 );
		}


		getAssignment() {

			return this.pairs.map( ( pair ) => {

				if( ! pair ) {
					return undefined;
				}

				return [ pair.graphUnique, pair.moleculeUnique ];
			} );
		}

		renameAssignementElement( fromName, toName ) {

			this.pairs.map( ( pair ) => {

				if( pair.graphUnique == fromName ) {
					pair.graphUnique = toName;
				}

				if( pair.moleculeUnique == fromName ) {
					pair.moleculeUnique = toName;
				}
			})
		}

		removeGraphShape( uniqueID ) {

			var pairs = this.allPairs( uniqueID, ( pair ) => {
				this.removePair( pair );
			});
		}

		findElement( type, selector ) {

			return this.getDom( type ).querySelectorAll( "[" + this.getOptions( type ).equivalentAttribute + "=\"" + processQuerySelector( selector ) + "\"]");	
		}

		// External setter
		setAssignment( pairs ) {

			this.pairs = [];
			pairs.forEach( function( pair ) {

				this.pairs.push( { 
					graph: this.findElement( true, pair[ 0 ] ), 
					molecule: this.findElement( false, pair[ 1 ] ) } );
			} );
		}
};


export default Assignment;
