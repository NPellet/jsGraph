
define( [], function() {

	var GraphShape = function() { };

	GraphShape.prototype = {

		init: function(graph) {

			var self = this;

			this.graph = graph;
			this.properties = {};
			this.group = document.createElementNS(this.graph.ns, 'g');

			this._selected = false;
			this.createDom();
			this.setEvents();
			
			this.rectEvent = document.createElementNS(this.graph.ns, 'rect');
			this.rectEvent.setAttribute('pointer-events', 'fill');
			this.rectEvent.setAttribute('fill', 'transparent');

			if(this._dom) {
				this.group.appendChild(this._dom);

				this._dom.addEventListener('mouseover', function (e) {

					self.doHover(true);
					e.stopPropagation();

				});


				this._dom.addEventListener('mouseout', function (e) {

					self.doHover(false);
					e.stopPropagation();

				});
			}

//			this.group.appendChild(this.rectEvent);
			
			this.graph.shapeZone.appendChild(this.group);
			this.initImpl();
		},

		initImpl: function() {},

		setOriginalData: function(data, events) {
			this.data = data;
			this.events = events;
		},

		triggerChange: function() {
			this.graph.triggerEvent('onAnnotationChange', this.data, this);
		},

		setEvents: function() {},

		setSelectableOnClick: function() {
			return;
			var self = this;
			this._dom.addEventListener('click', function() {
				if(!self._selectable)
					return;
				self._selected = !self._selected;
				self[self._selected ? 'select' : 'unselect']();
			});
		},

		setBBox: function() {

			this.group.removeChild(this.rectEvent);
			var box = this.group.getBBox();
			this.rectEvent.setAttribute('x', box.x);
			this.rectEvent.setAttribute('y', box.y - 10);
			this.rectEvent.setAttribute('width', box.width);
			this.rectEvent.setAttribute('height', box.height + 20);

			this.group.appendChild(this.rectEvent);
		},

		setMouseOver: function(callback) {
			this.rectEvent.addEventListener('mouseover', callback);
		},

		kill: function() {
			this.graph.shapeZone.removeChild(this.group);
		},

	/*	applyAll: function() {
			for(var i in this.properties)
				this._dom.setAttribute(i, this.properties[i]);
		},
*/
		draw: function() {

			if( this.labelNumber == undefined ) {
				this.setLabelNumber( 1 );
			}

			this.setFillColor( );
			this.setStrokeColor( );
			this.setStrokeWidth( );
			this.setDashArray( );

			this.everyLabel(function(i) {

				if(this.get('labelPosition', i)) {

					this.setLabelText(i);
					this.setLabelSize(i);
					//this.setLabelAngle(i);
					this.setLabelColor(i);

				}

				if(this.get('labelAnchor', i)) {

					this._forceLabelAnchor(i);

				}
			});
		},

		redraw: function() {
		//	this.kill();
			var variable;
			this.position = this.setPosition();
			
			this.redrawImpl();
			if(!this.position)
				return;

			this.everyLabel(function(i) {

				if(this.get('labelPosition', i)) {

					this.setLabelPosition(i);
					this.setLabelAngle(i);

				}

			});
		
		
			if(this.afterDone)
				this.afterDone();
		//	this.done();
		},

		redrawImpl: function() {},

		done: function() {
			//this.applyAll();
			//;
			
			
		},

		setSerie: function(serie) {			this.serie = serie;								},
		set: function(prop, val, index) {

			this.properties[prop] = this.properties[prop] || [];
			this.properties[prop][index || 0] = val;
		},

		get: function(prop, index) {
			return ( this.properties[ prop ] || [] ) [ index || 0 ];
		},


		getFromData: function(prop)			{ return this.data[prop]; 						},
		setDom: function(prop, val) {		if(this._dom) this._dom.setAttribute(prop, val);				},

		setPosition: function() {
			var position = this._getPosition(this.getFromData('pos'));
			this.setDom('x', position.x);
			this.setDom('y', position.y);
			return true;
		},

		setFillColor: function() {			this.setDom('fill', this.get('fillColor'));					},
		setStrokeColor: function() {		this.setDom('stroke', this.get('strokeColor'));				},
		setStrokeWidth: function() {		this.setDom('stroke-width', this.get('strokeWidth'));		},
		setDashArray: function() {			if(this.get('strokeDashArray')) this.setDom('stroke-dasharray', this.get('strokeDashArray'));				},

		setLabelText: function(index) {		if(this.label) this.label[index].textContent = this.data.label[index].text;					},
		setLabelColor: function(index) {	if(this.label) this.label[index].setAttribute('fill', this.get('labelColor'));				},
		setLabelSize: function(index) {		if(this.label) this.label[index].setAttribute('font-size', this.get('labelSize'));		},
		setLabelPosition: function(index) {	if(this.label) this._setLabelPosition(index);											},
		setLabelAngle: function(index) {	if(this.label) this._setLabelAngle(index);												},
		
		highlight: function() {
			this.tempStrokeWidth = parseInt(this._dom.getAttribute('stroke-width').replace('px', ''));
			this.setDom('stroke-width', this.tempStrokeWidth + 2);
			this.highlightImpl();
		},

		unHighlight: function() {
			this.setDom('stroke-width', this.tempStrokeWidth);
			this.unHighlightImpl();
		},

		highlightImpl: function() {},
		unHighlightImpl: function() {},

		_getPosition: function(value, relTo) {
			var parsed, pos = {x: false, y: false};
			if(!value)
				return;

			for(var i in pos) {
				if(value[i] === undefined && ((value['d' + i] !== undefined && relTo === undefined) || relTo === undefined)) {
					if(i == 'x') {
						pos[i] = relTo ? relTo[i] : this.serie[i == 'x' ? 'getXAxis' : 'getYAxis']().getPos(0);
					} else if(value.x && this.serie) {
						var closest = this.serie.searchClosestValue(value.x);
						if(!closest)
							return;
						pos[i] = this.serie.getY(closest.yMin);
					}
				} else if(value[i] !== undefined) {

					if((parsed = this._parsePx(value[i])) !== false) {
						pos[i] = parsed; // return integer (will be interpreted as px)
					} else if(parsed = this._parsePercent(value[i])) {
						pos[i] = parsed; // returns xx%
					} else if(this.serie) {
						pos[i] = this.serie[i == 'x' ? 'getXAxis' : 'getYAxis']().getPos(value[i]);
					}
				}

				if(value['d' + i] !== undefined) {
					var def = (value[i] !== undefined || relTo == undefined || relTo[i] == undefined) ? pos[i] : (this._getPositionPx(relTo[i], true) || 0);
					if((parsed = this._parsePx(value['d' + i])) !== false) { // dx in px => val + 10px
						pos[i] = def + parsed;  // return integer (will be interpreted as px)
					} else if(parsed = this._parsePercent(value['d' + i])) {
						pos[i] = def + this._getPositionPx(parsed, true); // returns xx%
					} else if(this.serie) {
						pos[i] = def + this.serie[i == 'x' ? 'getXAxis' : 'getYAxis']().getRelPx(value['d' + i]); // px + unittopx
					}
				}
			}
			return pos;
		},

		_getPositionPx: function(value, x) {
			if(parsed = this._parsePx(value))
				return parsed; // return integer (will be interpreted as px)
			if(parsed = this._parsePercent(value))
				return parsed / 100 * (x ? this.graph.getDrawingWidth() : this.graph.getDrawingHeight());
			else if(this.serie)
				return this.serie[x ? 'getXAxis' : 'getYAxis']().getPos(value);
		},


		_parsePx: function(px) {
			if(px && px.indexOf && px.indexOf('px') > -1)
				return parseInt(px.replace('px', ''));
			return false;
		},

		_parsePercent: function(percent) {
			if(percent && percent.indexOf && percent.indexOf('px') > -1) {
				return percent;
			}
			return false;	
		},

		setLabelNumber: function(nb) {
			this.labelNumber = nb;
			this._makeLabel();
		},

		everyLabel: function(callback) {
			for(var i = 0; i < this.labelNumber; i++) {
				callback.call(this, i);
			}
		},

		toggleLabel: function(labelId, visible) {
			if(this.labelNumber && this.label[i]) {
				this.label[i].setAttribute('display', visible ? 'block' : 'none');
			}
		},

		_makeLabel: function() {
			var self = this;
			this.label = this.label || [];

			this.everyLabel(function(i) {

				this.label[i] = document.createElementNS(this.graph.ns, 'text');


				this.label[i].addEventListener( 'mouseover', function ( e ) {

					self.doHover( true );
					e.stopPropagation();
					
				});


				this.label[i].addEventListener( 'mouseout', function ( e ) {

					self.doHover( false );
					e.stopPropagation();

				});


				this.label[i].addEventListener( 'dblclick', function( e ) {

					e.preventDefault();
					e.stopPropagation();

					$('<input type="text" />').attr('value', e.target.textContent).prependTo(self.graph._dom).css({
						position: 'absolute',
						'margin-top': (parseInt(e.target.getAttribute('y').replace('px', '')) - 10) + "px",
						'margin-left': (parseInt(e.target.getAttribute('x').replace('px', '')) - 50) + "px",
						textAlign: 'center',
						width: '100px'
					}).on('blur', function() {

						$( this ).remove();
						self.data.label.text = $ ( this ).attr( 'value' );
						self.triggerChange();

					}).on('keyup', function(e) {

						if ( e.keyCode == 13 )
							$( this ).trigger( 'blur' );
						
					}).focus();

				});

				self.group.appendChild(this.label[i]);
			});
		},

		_setLabelPosition: function(labelIndex, pos) {
			var currPos = this.getFromData('pos');
			var parsedCurrPos = this._getPosition(currPos);
			if( !pos ) {
				var pos = this._getPosition( this.get( 'labelPosition', labelIndex ), currPos );
			}
			this.label[labelIndex].setAttribute('x', pos.x);
			this.label[labelIndex].setAttribute('y', pos.y);
			//this.label.setAttribute('text-anchor', pos.x < parsedCurrPos.x ? 'end' : (pos.x == parsedCurrPos.x ? 'middle' : 'start'));
			this.label[labelIndex].setAttribute('dominant-baseline', pos.y < parsedCurrPos.y ? 'no-change' : (pos.y == parsedCurrPos.y ? 'middle' : 'hanging'));
		},

		_setLabelAngle: function(labelIndex, angle) {
			var currAngle = this.get('labelAngle', labelIndex) || 0;

			if(currAngle == 0)
				return;

			var x = this.label[labelIndex].getAttribute('x');
			var y = this.label[labelIndex].getAttribute('y');
			this.label[labelIndex].setAttribute('transform', 'rotate(' + currAngle + ' ' + x + ' ' + y + ')');
		},

		_forceLabelAnchor: function(i) {
			this.label[i].setAttribute('text-anchor', this._getLabelAnchor());
		},

		_getLabelAnchor: function() {
			var anchor = this.get('labelAnchor');
			switch(anchor) {
				case 'middle':
				case 'start':
				case 'end':
					return anchor;
				break;

				case 'right':
					return 'end';
				break;

				case 'left':
					return 'start';
				break;

				default:
					return 'start';
				break;
			}
		},

		setSelectable: function(bln) {
			this._selectable = bln;
		},

		select: function() {},
		unselect: function() {},

		onMouseOver: function (clbk) {
			var callbacks = (this._mouseOverCallbacks = this._mouseOverCallbacks || $.Callbacks());
			callbacks.add(clbk);
		},

		onMouseOut: function (clbk) {
			var callbacks = (this._mouseOutCallbacks = this._mouseOutCallbacks || $.Callbacks());
			callbacks.add(clbk);
		},

		doHover: function(bln) {
			var clbks;
			if( !(clbks = this[ bln ? '_mouseOverCallbacks' : '_mouseOutCallbacks' ] ) )
				return;
			clbks.fireWith( this, [ this.data, this.parameters ] );
		}
	}

	return GraphShape;

});