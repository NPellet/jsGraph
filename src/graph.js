define([

	'jquery', 
	'require',
	'./graph.axis.x',
	'./graph.axis.y',
	'./graph.serie',
	'./graph.serie.contour',
	'./graph.legend'


	], function(
		$,
		require,

		GraphXAxis,
		GraphYAxis,
		GraphSerie,
		GraphSerieContour,
		GraphLegend

	) {


	"use strict";

	var _scope = this;
	var graphDefaults = {

		paddingTop: 30,
		paddingBottom: 0,
		paddingLeft: 20,
		paddingRight: 20,

		close: {
			left: true,
			right: true, 
			top: true,
			bottom: true
		},

		title: '',
		zoomMode: false,
		defaultMouseAction: 'drag', // rangeX, rangeY
		shiftMouseAction: 'zoomXY', // rangeX, rangeY
		defaultWheelAction: 'none',
		lineToZero: false,
		fontSize: 12,
		fontFamily: 'Myriad Pro, Helvetica, Arial',
		addLabelOnClick: false,
		onVerticalTracking: false,
		onHorizontalTracking: false,
		rangeLimitX: 10,
		rangeLimitY: 0,		
		unZoomMode: 'total',

		plugins: ['./graph.plugin.zoom', './graph.plugin.drag'],

		keyCombinations: {
			'./graph.plugin.drag': { shift: true, ctrl: false },
			'./graph.plugin.zoom': { shift: false, ctrl: false }
		}
	};


	var Graph = function(dom, options, axis) {

		this._creation = Date.now() + Math.random();

		if( typeof dom == "string" ) {
			dom = document.getElementById( dom );
		}

		this.options = $.extend({}, graphDefaults, options);
		this.axis = {left: [], top: [], bottom: [], right: []};
		this.title = false;

		this.setSize( $(dom).width(), $(dom).height() );

		this.ns = 'http://www.w3.org/2000/svg';
		this.nsxlink = "http://www.w3.org/1999/xlink";
		this.series = [];
		this._dom = dom;
		// DOM
		this.doDom();
		this.registerEvents();
		this.shapes = [];

		this.trackingLines = {
			id: 0,
			current: false,
			dasharray: [false, "5, 5", "5, 1", "1, 5"],
			currentDasharray: [],
			vertical: [],
			horizontal: []
		};

		this.ranges = {
			current: undefined,
			x: [],
			y: [],
			countX: 0,
			countY: 0
		};
		
		this.pluginsReady = $.Deferred();

		this.currentAction = false;

		var funcName;
		if(axis) {
			for(var i in axis) {
				for(var j = 0, l = axis[i].length; j < l; j++) {
					switch(i) {
						case 'top': funcName = 'setTopAxis'; var axisInstance = new GraphXAxis(this, 'top', axis[i][j]); break;
						case 'bottom': funcName = 'setBottomAxis';  var axisInstance = new GraphXAxis(this, 'bottom', axis[i][j]); break;
						case 'left': funcName = 'setLeftAxis';  var axisInstance = new GraphYAxis(this, 'left', axis[i][j]);break;
						case 'right': funcName = 'setRightAxis';  var axisInstance = new GraphYAxis(this, 'right', axis[i][j]); break;
					}
					this[funcName](axisInstance, j);
				}
			}
		}

		this._resize();
		this._pluginsInit();
	}

	Graph.prototype = {

		setAttributeTo: function(to, params, ns) {
			var i;

			if(ns) {
				for(i in params) {
					to.setAttributeNS(ns, i, params[i]);
				}
			} else {
				for(i in params) {
					to.setAttribute(i, params[i]);
				}
			}
		},

		doDom: function() {

			// Create SVG element, set the NS
			this.dom = document.createElementNS(this.ns, 'svg');
			this.dom.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
			//this.dom.setAttributeNS(this.ns, 'xmlns:xlink', this.nsxml);	
			this.setAttributeTo(this.dom, {
				'xmlns': this.ns,
				'font-family': this.options.fontFamily,
				'font-size': this.options.fontSize 
			});
			
			this._dom.appendChild(this.dom);
			
			this.defs = document.createElementNS(this.ns, 'defs');
			this.dom.appendChild(this.defs);

			this.rectEvent = document.createElementNS(this.ns, 'rect');
			this.setAttributeTo(this.rectEvent, {
				'pointer-events': 'fill',
				'fill': 'transparent'
			});
			this.dom.appendChild(this.rectEvent);


			// Handling graph title
			this.domTitle = document.createElementNS(this.ns, 'text');
			this.setTitle(this.options.title);
			this.setAttributeTo(this.domTitle, {
				'text-anchor': 'middle',
				'y': 20
			});
			this.dom.appendChild(this.domTitle);
			//


			this.graphingZone = document.createElementNS(this.ns, 'g');
			this.setAttributeTo(this.graphingZone, {
				'transform': 'translate(' + this.options.paddingLeft + ', ' + this.options.paddingTop + ')'
			});
			this.dom.appendChild(this.graphingZone);

			this.shapeZone = document.createElementNS(this.ns, 'g');
			this.graphingZone.appendChild(this.shapeZone);

		/*	this.shapeZoneRect = document.createElementNS(this.ns, 'rect');
			//this.shapeZoneRect.setAttribute('pointer-events', 'fill');
			this.shapeZoneRect.setAttribute('fill', 'transparent');
			this.shapeZone.appendChild(this.shapeZoneRect);
		*/
			this.axisGroup = document.createElementNS(this.ns, 'g');
			this.graphingZone.appendChild(this.axisGroup);


			this.plotGroup = document.createElementNS(this.ns, 'g');
			this.graphingZone.appendChild(this.plotGroup);
			
			this._makeClosingLines();

			this.clip = document.createElementNS(this.ns, 'clipPath');
			this.clip.setAttribute('id', '_clipplot' + this._creation)
			this.defs.appendChild(this.clip);

			this.clipRect = document.createElementNS(this.ns, 'rect');
			this.clip.appendChild(this.clipRect);
			this.clip.setAttribute('clipPathUnits', 'userSpaceOnUse');


			this.markerArrow = document.createElementNS(this.ns, 'marker');
			this.markerArrow.setAttribute('viewBox', '0 0 10 10');
			this.markerArrow.setAttribute('id', 'arrow' + this._creation);
			this.markerArrow.setAttribute('refX', '0');
			this.markerArrow.setAttribute('refY', '5');
			this.markerArrow.setAttribute('markerUnits', 'strokeWidth');
			this.markerArrow.setAttribute('markerWidth', '4');
			this.markerArrow.setAttribute('markerHeight', '3');
			this.markerArrow.setAttribute('orient', 'auto');
			//this.markerArrow.setAttribute('fill', 'context-stroke');
			//this.markerArrow.setAttribute('stroke', 'context-stroke');

			var pathArrow = document.createElementNS(this.ns, 'path');
			pathArrow.setAttribute('d', 'M 0 0 L 10 5 L 0 10 z');
			pathArrow.setAttribute('fill', 'context-stroke');
			this.markerArrow.appendChild(pathArrow);

			this.defs.appendChild(this.markerArrow);

			this.vertLineArrow = document.createElementNS(this.ns, 'marker');
			this.vertLineArrow.setAttribute('viewBox', '0 0 10 10');
			this.vertLineArrow.setAttribute('id', 'verticalline' + this._creation);
			this.vertLineArrow.setAttribute('refX', '0');
			this.vertLineArrow.setAttribute('refY', '5');
			this.vertLineArrow.setAttribute('markerUnits', 'strokeWidth');
			this.vertLineArrow.setAttribute('markerWidth', '20');
			this.vertLineArrow.setAttribute('markerHeight', '10');
			this.vertLineArrow.setAttribute('orient', 'auto');
			//this.vertLineArrow.setAttribute('fill', 'context-stroke');
			//this.vertLineArrow.setAttribute('stroke', 'context-stroke');
			this.vertLineArrow.setAttribute('stroke-width', '1px');

			var pathVertLine = document.createElementNS(this.ns, 'path');
			pathVertLine.setAttribute('d', 'M 0 -10 L 0 10');
			pathVertLine.setAttribute('stroke', 'black');
			
			this.vertLineArrow.appendChild(pathVertLine);

			this.defs.appendChild(this.vertLineArrow);


			this.plotGroup.setAttribute('clip-path', 'url(#_clipplot' + this._creation + ')');

			this.bypassHandleMouse = false;
		},

		setOption: function(name, val) {
			this.options[name] = val;
		},

		kill: function() {
			this._dom.removeChild(this.dom);

		},

		getXY: function(e) {
			
			var x = e.clientX;
			var y = e.clientY;
			var pos = $(this._dom).offset();

			x -= pos.left - window.scrollX;
			y -= pos.top - window.scrollY;

			return {x: x, y: y};
		},

		registerEvents: function() {
			var self = this;
			this.dom.addEventListener('mousemove', function(e) {
				e.preventDefault();
				var coords = self.getXY(e);
				self.handleMouseMove(coords.x,coords.y,e);
			});

			this.dom.addEventListener('mousedown', function(e) {

				e.preventDefault( );
				if( e.which == 3 || e.ctrlKey ) {
					return;
				}

				var coords = self.getXY( e );
				self.handleMouseDown( coords.x, coords.y, e );

			});

			this.dom.addEventListener('mouseup', function(e) {

				e.preventDefault( );
				var coords = self.getXY( e );
				self.handleMouseUp( coords.x, coords.y, e );

			});

			this.dom.addEventListener('dblclick', function(e) {
				e.preventDefault();
				
				if( self.clickTimeout ) {
					window.clearTimeout( self.clickTimeout );
				}

				var coords = self.getXY(e);
				self.cancelClick = true;
				self.handleDblClick(coords.x,coords.y,e);
			});

			this.dom.addEventListener('click', function(e) {

				// Cancel right click or Command+Click
				if(e.which == 3 || e.ctrlKey)
					return;
				e.preventDefault();
				var coords = self.getXY(e);
				if(self.clickTimeout)
					window.clearTimeout(self.clickTimeout);

				// Only execute the action after 200ms
				self.clickTimeout = window.setTimeout(function() {
					self.handleClick(coords.x,coords.y,e);
				}, 200);
			});

/*
			this._dom.setAttribute('tabindex', 2);
			console.log(this._dom);
			this._dom.addEventListener('click', function() {
				$(this._dom).focus();
			});
*/

/*
			this._dom.addEventListener('keydown', function(e) {
				
				var code = e.keyCode;
				if(code < 37 || code > 40)
					return;

				self.applyToAxes(function(axis, position) {
					var min = axis.getActualMin(),
						max = axis.getActualMax(),
						shift = (max - min) * 0.05 * (axis.isFlipped() ? -1 : 1) * ((code == 39 || code == 40) ? -1 : 1);
					axis.setCurrentMin(min + shift);
					axis.setCurrentMax(max + shift);
				}, code, (code == 39 || code == 37), (code == 40 || code == 38));
				self.refreshDrawingZone(true);
				self.drawSeries(true);
				// Left : 39
				// Down: 40
				// Right: 37
				// Top: 38

			});
*/
			this.rectEvent.addEventListener('mousewheel', function(e) {
				e.preventDefault();
				e.stopPropagation();
				var deltaY = e.wheelDeltaY || e.wheelDelta || - e.deltaY;
				self.handleMouseWheel(deltaY,e);	

				return false;
			});

			this.rectEvent.addEventListener('wheel', function(e) {
				var deltaY = e.wheelDeltaY || e.wheelDelta || - e.deltaY;
				self.handleMouseWheel(deltaY,e);	
				e.preventDefault();
				return false;
			});
		},



		handleMouseDown: function(x,y,e) {
			var self = this,
				$target = $(e.target), 
				shift = e.shiftKey, 
				ctrl = e.ctrlKey, 
				keyComb = this.options.keyCombinations,
				i;

			for(i in keyComb) {
				if(!keyComb[i]._forced) {
					if(shift !== keyComb[i].shift)
						continue;
					if(ctrl !== keyComb[i].ctrl)
						continue;
				}
				this.mouseLease = i; // Lease the mouse action to the current action
				this._pluginExecute(i, 'onMouseDown', [x, y, e]);
				break;
			}
		},


		handleMouseMove: function(x, y, e) {

			var $target;
			
			if(this.bypassHandleMouse) {
				this.bypassHandleMouse.handleMouseMove(e);
				return;
			}
			
			this.applyToAxes('handleMouseMove', [x - this.options.paddingLeft, e], true, false);
			this.applyToAxes('handleMouseMove', [y - this.options.paddingTop, e], false, true);

			if(!this.mouseLease) {
				var results = {};
				for(var i = 0; i < this.series.length; i++)
					results[this.series[i].getName()] = this.series[i].handleMouseMove(false, true);
				if(this.options.onMouseMoveData)
					this.options.onMouseMoveData(e, results);
				return;
			}

			this._pluginExecute(this.mouseLease, 'onMouseMove', [x, y, e, $target = $(e.target)]);
		},


		handleMouseUp: function(x, y, e) {

			if(this.bypassHandleMouse) {
				this.bypassHandleMouse.handleMouseUp(e);
				return;
			}

			this._pluginExecute(this.mouseLease, 'onMouseUp', [x, y, e, $(e.target)]);
			this.mouseLease = false;

		},



		isZooming: function() {
			return this.currentAction == 'zooming';
		},

		handleMouseWheel: function(delta, e) {

			if(this.options.defaultWheelAction == 'zoomY' || this.options.defaultWheelAction == 'zoomX') {

				this.applyToAxes('handleMouseWheel', [delta, e], false, true);

			} else if(this.options.defaultWheelAction == 'toSeries') {

				for(var i = 0, l = this.series.length; i < l; i++) {
					this.series[i].handleMouseWheel(delta, e);
				}

			}

			this.redraw( true );
			this.drawSeries( true );
		},

		handleClick: function(x, y, e) {
			
			if(!this.options.addLabelOnClick){
				return;
			}

			if(this.currentAction !== false) {
				return;
			}

			for(var i = 0, l = this.series.length; i < l; i++) {
				this.series[i].addLabelX(this.series[i].getXAxis().getVal(x - this.getPaddingLeft()));
			}
		},

		annotationMoving: function( movingElement ) {
			this.bypassHandleMouse = movingElement;
		},

		annotationStopMoving: function() {
			this.bypassHandleMouse = false;
		},

		handleDblClick: function(x,y,e) {
		//	var _x = x - this.options.paddingLeft;
		//	var _y = y - this.options.paddingTop;
			var pref = this.options.unZoomMode;

			var	
				xAxis = this.getXAxis(),
				yAxis = this.getYAxis();


			if(pref == 'total') {
				this.redraw();
				this.drawSeries();

				if( yAxis.options.onZoom ) {
					yAxis.options.onZoom( yAxis.getMinValue(), yAxis.getMaxValue() );
				}


				if( xAxis.options.onZoom ) {
					xAxis.options.onZoom( xAxis.getMinValue(), xAxis.getMaxValue() );
				}

				return;
			}

 			x -= this.options.paddingLeft;
 			y -= this.options.paddingTop;

			var
				xMin = xAxis.getActualMin(),
				xMax = xAxis.getActualMax(),
				xActual = xAxis.getVal(x),
				diffX = xMax - xMin,

				yMin = yAxis.getActualMin(),
				yMax = yAxis.getActualMax(),
				yActual = yAxis.getVal(y),
				diffY = yMax - yMin;

			if(pref == 'gradualXY' || pref == 'gradualX') {
				var ratio = (xActual - xMin) / (xMax - xMin);
				xMin = Math.max(xAxis.getMinValue(), xMin - diffX * ratio);
				xMax = Math.min(xAxis.getMaxValue(), xMax + diffX * (1 - ratio));
				xAxis.setCurrentMin(xMin);
				xAxis.setCurrentMax(xMax);

				if( xAxis.options.onZoom ) {
					xAxis.options.onZoom( xMin, xMax );
				}
			}

			if(pref == 'gradualXY' || pref == 'gradualY') {
				var ratio = (yActual - yMin) / (yMax - yMin);
				yMin = Math.max(yAxis.getMinValue(), yMin - diffY * ratio);
				yMax = Math.min(yAxis.getMaxValue(), yMax + diffY * (1 - ratio));
				yAxis.setCurrentMin(yMin);
				yAxis.setCurrentMax(yMax);


				if( yAxis.options.onZoom ) {
					yAxis.options.onZoom( yMin, yMax );
				}
			}

			this.redraw( true );
			this.drawSeries( true );
		},

		resetAxis: function() {

			while(this.axisGroup.firstChild) {
				this.axisGroup.removeChild(this.axisGroup.firstChild);
			}
			this.axis.left = [];
			this.axis.right = [];
			this.axis.bottom = [];
			this.axis.top = [];
		},

		resetSeries: function() {
			for(var i = 0; i < this.series.length; i++) {
				this.series[i].kill(true);	
			}
			this.series = [];
		},

		applyToAxis: {
			'string': function(type, func, params) {
		//		params.splice(1, 0, type);

				for(var i = 0; i < this.axis[type].length; i++)
					this.axis[type][i][func].apply(this.axis[type][i], params);	
			},

			'function': function(type, func, params) {
				for(var i = 0; i < this.axis[type].length; i++)
					func.call(this, this.axis[type][i], type);
			}
		},
		
		applyToAxes: function(func, params, tb, lr) {
			var ax = [], i = 0, l;

			if(tb || tb == undefined) {
				ax.push('top');
				ax.push('bottom');
			}
			if(lr || lr == undefined) {
				ax.push('left');
				ax.push('right');
			}

			for(l = ax.length; i < l; i++)
				this.applyToAxis[typeof func].call(this, ax[i], func, params);
		},


		setWidth: function(width, skipResize) {
			this.width = width;

			if(!skipResize)
				this._resize();
		},

		getWidth: function() {
			return this.width;
		},

		setHeight: function(height, skipResize) {
			this.height = height;

			if(!skipResize)
				this._resize();
		},

		getHeight: function() {
			return this.height;
		},

		resize: function(w, h) {

			this.setSize( w, h );
			this._resize();
		},

		setSize: function( w, h ) {

			this.setWidth( w, true );
			this.setHeight( h, true );

			this.getDrawingHeight();
			this.getDrawingWidth();
		},

		getDom: function() { 
			return this.dom;
		},

		applyStyleText: function(dom) {
//			dom.setAttribute('font-family', '"Myriad Pro", Arial, Serif');
//			dom.setAttribute('font-size', '12px');
		},

		getXAxis: function(num, options) {
			if(this.axis.top.length > 0 && this.axis.bottom.length == 0)
				return this.getTopAxis(num, options);

			return this.getBottomAxis(num, options);
		},

		getYAxis: function(num, options) {
			return this.getLeftAxis(num, options);
		},

		_getAxis: function(num, options, inst, pos) {
			num = num || 0;
			if(typeof num == "object") {
				options = num;
				num = 0;
			}

			
			return this.axis[pos][num] = this.axis[pos][num] || new inst(this, pos, options);
		},

		getTopAxis: function(num, options) {
			return this._getAxis(num, options, GraphXAxis, 'top');
		},

		getBottomAxis: function(num, options) {
			return this._getAxis(num, options, GraphXAxis, 'bottom');
		},

		getLeftAxis: function(num, options) {
			return this._getAxis(num, options, GraphYAxis, 'left');
		},

		getRightAxis: function(num, options) {
			return this._getAxis(num, options, GraphYAxis, 'right');
		},

		setXAxis: function(axis, num) {
			this.setBottomAxis(axis, num);
		},
		setYAxis: function(axis, num) {
			this.setLeftAxis(axis, num);
		},

		setLeftAxis: function(axis, num) {
			num = num || 0;
			this.axis.left[num] = axis;
		},
		setRightAxis: function(axis, num) {
			num = num || 0;
			this.axis.right[num] = axis;
		},
		setTopAxis: function(axis, num) {
			num = num || 0;
			this.axis.top[num] = axis;
		},
		setBottomAxis: function(axis, num) {
			num = num || 0;
			this.axis.bottom[num] = axis;
		},

		getPaddingTop: function() {
			return this.options.paddingTop;
		},

		getPaddingLeft: function() {
			return this.options.paddingLeft;
		},

		getPaddingBottom: function() {
			return this.options.paddingTop;
		},

		getPaddingRight: function() {
			return this.options.paddingRight;
		},

		// Title
		setTitle: function(title) {
			this.title = title;
			this.domTitle.textContent = title;
		},

		displayTitle: function() {
			this.domTitle.setAttribute('display', 'inline');
		},

		hideTitle: function() {
			this.domTitle.setAttribute('display', 'none');
		},

		drawSerie: function(serie) {
			serie.draw(this.getDrawingGroup());
		},


		getDrawingHeight: function(useCache) {
			if(useCache && this.innerHeight)
				return this.innerHeight;
			var height = this.height - this.options.paddingTop - this.options.paddingBottom;
			return (this.innerHeight = height);
		},

		getDrawingWidth: function(useCache) {
			if(useCache && this.innerWidth)
				return this.innerWidth;
			var width = this.width - this.options.paddingLeft - this.options.paddingRight;
			return (this.innerWidth = width);
		},

		getBoundaryAxisFromSeries: function(axis, xy, minmax) {
			var x = xy == 'x',
				min = minmax == 'min',
				val,
				func = x ? ['getMinX', 'getMaxX'] : ['getMinY', 'getMaxY'],
				func2use = func[min ? 0 : 1],
				currentSerie,
				serie,
				series,
				serieValue,
				i,
				l;

			val = min ? Number.MAX_VALUE : Number.MIN_VALUE;
			series = this.getSeriesFromAxis(axis, true);
			for(i = 0, l = series.length; i < l; i++) {

				serie = series[i];
				serieValue = serie[func2use]();
				val = Math[minmax](val, serieValue);

				if(val == serieValue && currentSerie) {
					currentSerie.isMinOrMax(false, xy, minmax);
					currentSerie = serie;
					serie.isMinOrMax(true, xy, minmax);
				}
			}
		
			return val;
		},

		getSeriesFromAxis: function(axis, selfSeries) {
			var series = [],
				i = this.series.length - 1;
			for(; i >= 0; i--)
				if(this.series[i].getXAxis() == axis || this.series[i].getYAxis() == axis)
					series.push(this.series[i]);

			if(selfSeries) {
				for(i = 0; i < axis.series.length; i++)
					series.push(axis.series[i])
			}

			return series;
		},

		_resize: function() {

			if(!this.width || !this.height) {
				return;
			}

			this.dom.setAttribute('width', this.width);
			this.dom.setAttribute('height', this.height);
			this.domTitle.setAttribute('x', this.width / 2);
			this.refreshDrawingZone();
		},

		canRedraw: function() {
			return (this.width && this.height);
		},

		redraw: function( doNotResetMinMax, noX, noY) {

			if( ! this.canRedraw() ) {
				return;
			}

			this.refreshDrawingZone( doNotResetMinMax, noX, noY);

			return true;
		},

		// Repaints the axis and series
		refreshDrawingZone: function(doNotRecalculateMinMax, noX, noY) {

			var i, j, l, xy, min, max;
			var axisvars = ['bottom', 'top', 'left', 'right'], shift = [0, 0, 0, 0], axis;
			this._painted = true;
			this.refreshMinOrMax();

			for(j = 0, l = axisvars.length; j < l; j++) {
				xy = j < 2 ? 'x' : 'y';
				if(noX && j < 2) {
					continue;
				} else if(noY && j > 1) {
					continue;
				}

				for(i = this.axis[axisvars[j]].length - 1; i >= 0; i--) {
					axis = this.axis[axisvars[j]][i];
					if(axis.disabled)
						continue;

					// Sets the values from the raw data
					// Does not go through here if noX or noY is true and xy == 'x' || 'y', respectively
					axis.setMinValue( this.getBoundaryAxisFromSeries(this.axis[ axisvars[ j ] ][ i ], xy, 'min') );
					axis.setMaxValue( this.getBoundaryAxisFromSeries(this.axis[ axisvars[j]][i], xy, 'max') );
				}
			}
		
			// Apply to top and bottom
			this.applyToAxes(function(axis) {
				if(axis.disabled) {
					return;
				}
				var axisIndex = axisvars.indexOf(arguments[1]);
				axis.setShift(shift[axisIndex] + axis.getAxisPosition(), axis.getAxisPosition()); 
				shift[axisIndex] += axis.getAxisPosition(); // Allow for the extra width/height of position shift
			}, false, true, false);
	
	
			// Applied to left and right
			this.applyToAxes(function(axis) {
				if(axis.disabled)
					return;

				axis.setMinPx(shift[1]);
				axis.setMaxPx(this.getDrawingHeight(true) - shift[0]);

				// First we need to draw it in order to determine the width to allocate
				// This is done to accomodate 0 and 100000 without overlapping any element in the DOM (label, ...)

				var drawn = axis.draw(doNotRecalculateMinMax) || 0,
					axisIndex = axisvars.indexOf(arguments[1]),
					axisDim = axis.getAxisPosition();

				// Get axis position gives the extra shift that is common
				axis.setShift(shift[axisIndex] + axisDim + drawn, drawn + axisDim);
				shift[axisIndex] += drawn + axisDim;
				axis.drawSeries();
			}, false, false, true);

		
			// Apply to top and bottom
			this.applyToAxes(function(axis) {
				if(axis.disabled)
					return;
				axis.setMinPx(shift[2]);
				axis.setMaxPx(this.getDrawingWidth(true) - shift[3]);
				axis.draw(doNotRecalculateMinMax);
				axis.drawSeries();
			}, false, true, false);

			// Apply to all axis
	/*		this.applyToAxes(function(axis) {
				axis.drawSeries();
			}, false, true, true);
	*/		
			this.closeLine('right', this.getDrawingWidth(true), this.getDrawingWidth(true), 0, this.getDrawingHeight(true) - shift[0]);
			this.closeLine('left', shift[1], shift[1], 0, this.getHeight(true) - shift[0]);
			this.closeLine('top', shift[1], this.getDrawingWidth(true) - shift[2], 0, 0);
			this.closeLine('bottom', shift[1], this.getDrawingWidth(true) - shift[2], this.getDrawingHeight(true) - shift[0], this.getDrawingHeight(true) - shift[0]);

			this.clipRect.setAttribute('y', shift[1]);
			this.clipRect.setAttribute('x', shift[2]);
			this.clipRect.setAttribute('width', this.getDrawingWidth() - shift[2] - shift[3]);
			this.clipRect.setAttribute('height', this.getDrawingHeight() - shift[1] - shift[0]);


			this.rectEvent.setAttribute('x', shift[1]);
			this.rectEvent.setAttribute('y', shift[2]);
			this.rectEvent.setAttribute('width', this.getDrawingWidth() - shift[2] - shift[3]);
			this.rectEvent.setAttribute('height', this.getDrawingHeight() - shift[1] - shift[0]);

/*
			this.shapeZoneRect.setAttribute('x', shift[1]);
			this.shapeZoneRect.setAttribute('y', shift[2]);
			this.shapeZoneRect.setAttribute('width', this.getDrawingWidth() - shift[2] - shift[3]);
			this.shapeZoneRect.setAttribute('height', this.getDrawingHeight() - shift[1] - shift[0]);
*/
			this.shift = shift;
			this.redrawShapes();
		},

		closeLine: function(mode, x1, x2, y1, y2) {	
			if(this.options.close[close] && this.options.axis[mode].length == 0) {
				this.closingLines[mode].setAttribute('display', 'block');
				this.closingLines[mode].setAttribute('x1', x1);
				this.closingLines[mode].setAttribute('x2', x2);
				this.closingLines[mode].setAttribute('y1', y1);
				this.closingLines[mode].setAttribute('y2', y2);
			} else {
				this.closingLines[mode].setAttribute('display', 'none');
			}
		},

		refreshMinOrMax: function() {
			var i = this.series.length - 1;
			for(;i >= 0; i--) { // Let's remove the serie from the stack
				this.series[i].isMinOrMax(false);
			}
		},

		_makeSerie: function(name, options, type) {
			switch(type) {
				case 'contour':
					var serie = new GraphSerieContour();
				break;

				case 'line':
				default:
					var serie = new GraphSerie();
				break;	
			}
			serie.init(this, name, options);
			this.plotGroup.appendChild(serie.groupMain);

			
			return serie;
		},

		newSerie: function( name, options, type ) {
			var serie = this._makeSerie(name, options, type);
			this.series.push(serie);

			if( this.legend ) {
				this.legend.update();
			}


			return serie;
		},

		getSerie: function(name) {
			if(typeof name == 'number') {
				return this.series[name];
			}
			var i = 0, l = this.series.length;
			for(; i < l; i++) {
				if( this.series[i].getName() == name ) {
					return this.series[i];
				}
			}
		},

		getSeries: function() {
			return this.series;
		},

		drawSeries: function( ) {

			if( ! this.width || ! this.height ) {
				return;
			}

			var i = this.series.length - 1;
			for( ; i >= 0; i-- ) {
				this.series[i].draw( );
			}
		},

		checkMinOrMax: function(serie) {
			var xAxis = serie.getXAxis();
			var yAxis = serie.getYAxis();

			var minX = serie.getMinX(),
				maxX = serie.getMaxX(),
				minY = serie.getMinY(),
				maxY = serie.getMaxY(),
				isMinMax = false;

			if(minX <= xAxis.getMinValue()) {
				isMinMax = true;
				serie.isMinOrMax(true, 'x', 'min');
			}

			if(maxX >= xAxis.getMaxValue()) {
				isMinMax = true;
				serie.isMinOrMax(true, 'x', 'max');
			}

			if(minY <= yAxis.getMinValue()) {
				isMinMax = true;
				serie.isMinOrMax(true, 'y', 'min');
			}

			if(maxX >= xAxis.getMaxValue()) {
				isMinMax = true;
				serie.isMinOrMax(true, 'y', 'max');
			}

			return isMinMax;
		},

		removeSerie: function(serie) {

			var i = this.series.length - 1;
			for(;i >= 0; i--) { // Let's remove the serie from the stack. // Not using indexOf because of Safari
				if(this.series[i] == serie)
					this.series.slice(i, 1);
			}
			serie.removeDom();
			if( serie.isMinOrMax( ) ) {
				this.refreshDrawingZone( );
			}

			if( this.legend ) {
				this.legend.update( );
			}
			
		},

		setZoomMode: function(zoomMode) {
			if(zoomMode == 'x' || zoomMode == 'y' || zoomMode == 'xy' || !zoomMode)
				this.options.zoomMode = zoomMode;
		},

		setDefaultWheelAction: function(wheelAction) {
			if(wheelAction != 'zoomY' && wheelAction != 'zoomX' && wheelAction != 'none')
				return;
			this.options.defaultWheelAction = wheelAction;
		},

		getZoomMode: function() {
			return this.options.zoomMode;
		},

		makeShape: function(annotation, events, notify) {
			var response;
			annotation.id = Math.random();

			if(notify) {
				if(false === (response = this.triggerEvent('onAnnotationBeforeMake', annotation))) {
					return;
				}
			}

			if(response) {
				annotation = response;
			}


			var shapeConstructor = require( './graph.shape.' + annotation.type );
			var shape = new shapeConstructor( this );


			shape.setSerie( this.getSerie( 0 ) );

			if(!shape) {
				return;
			}

			shape.setOriginalData( annotation, events );
			if( annotation.data ) {
				annotation.data.id = this.id;
			}

			
			if(annotation.fillColor)	shape.set('fillColor', annotation.fillColor);
			if(annotation.strokeColor)	shape.set('strokeColor', annotation.strokeColor);
			if(annotation.strokeWidth)	shape.set('strokeWidth', annotation.strokeWidth || (annotation.strokeColor ? 1 : 0));

			if(annotation.label) {

				if ( ! ( annotation.label instanceof Array ) ) {
					annotation.label = [ annotation.label ];
				}

				for ( var i = 0, l = annotation.label.length ; i < l ; i++) {

					shape.set('labelPosition', annotation.label[i].position, i);
					shape.set('labelColor', annotation.label[i].color || 'black', i);
					shape.set('labelSize', annotation.label[i].size, i);
					shape.set('labelAngle', annotation.label[i].angle || 0, i);


					if(annotation.label[i].anchor)
						shape.set('labelAnchor', annotation.label[i].anchor, i);
				}

				shape.setLabelNumber(l);
			}

			/*switch(annotation.type) {
				case 'rect':
				case 'rectangle':
					shape.set('width', annotation.width);
					shape.set('height', annotation.height);
				break;
			}*/
			this.shapes.push(shape);

			this.triggerEvent('onAnnotationMake', annotation, shape);


			return shape;
		},

		redrawShapes: function() {

			//this.graphingZone.removeChild(this.shapeZone);
			for(var i = 0, l = this.shapes.length; i < l; i++) {
				this.shapes[i].redraw();
			}
			//this.graphingZone.insertBefore(this.shapeZone, this.axisGroup);
		},

		removeAnnotations: function() {
			for(var i = 0, l = this.shapes.length; i < l; i++) {
				this.shapes[i].kill();
			}
			this.shapes = [];
		},


		_makeClosingLines: function() {

			this.closingLines = {};
			var els = ['top', 'bottom', 'left', 'right'], i = 0, l = 4, line;
			for(; i < l; i++) {	
				var line = document.createElementNS(this.ns, 'line');
				line.setAttribute('stroke', 'black');
				line.setAttribute('shape-rendering', 'crispEdges');
				line.setAttribute('stroke-linecap', 'square');
				line.setAttribute('display', 'none');
				this.closingLines[els[i]] = line;
				this.graphingZone.appendChild(line);
			}
		},

		_pluginsExecute: function(funcName, args) {
			Array.prototype.splice.apply(args, [0, 0, this]);
			for(var i in this._plugins) {
				if(this._plugins[i] && this._plugins[i][funcName])
					this._plugins[i][funcName].apply(this._plugins[i], args);
			}
		},

		_pluginExecute: function(which, func, args) {
			Array.prototype.splice.apply(args, [0, 0, this]);
			if(this._plugins[which] && this._plugins[which][func])
				this._plugins[which][func].apply(this._plugins[which], args);
			else
				return;
		},

		_pluginsInit: function() {

			var self = this;

			this._plugins = this._plugins || {};

			require( this.options.plugins, function() {

				for(var i = 0, l = self.options.plugins.length; i < l; i++) {

					self._plugins[ self.options.plugins[ i ] ] = arguments[ i ];
					self._plugins[ self.options.plugins[ i ] ].init( self );
				}

				self._pluginsReady();
			} );
			//this._pluginsExecute('init', arguments);
		},

		_pluginsReady: function() {
			this.pluginsReady.resolve();
		},

		triggerEvent: function() {
			var func = arguments[0], 
				args = Array.prototype.splice.apply(arguments, [0, 1]);
				
			if(typeof this.options[func] == "function") {
				return this.options[func].apply(this, arguments);
			}

			return;
		},

		selectAnnotation: function(annot) {
			if(this.selectedAnnotation == annot)
				return;

			if( this.selectedAnnotation ) { // Only one selected annotation at the time
				this.selectedAnnotation.unselect( );
			}

			this.selectedAnnotation = annot;
			this.triggerEvent('onAnnotationSelect', annot.data);
		},

		unselectAnnotation: function(annot) {
			this.selectedAnnotation = false;
			this.triggerEvent('onAnnotationUnselect', annot.data);
		},

		makeLegend: function() {
			this.legend = new GraphLegend( this );

			this.dom.appendChild( this.legend.getDom() );
			return this.legend;
		}
	}



	Graph.prototype.plugins = {};


	return Graph;
});
