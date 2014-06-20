

define( [ 'require', './graph.shape' ], function( require, GraphShape ) {

	var GraphSurfaceUnderCurve = function(graph) {
		this.init(graph);
	}
	
	$.extend(GraphSurfaceUnderCurve.prototype, GraphShape.prototype, {
		createDom: function() {

			this._dom = document.createElementNS(this.graph.ns, 'path');

			this.handle1 = document.createElementNS(this.graph.ns, 'line');
			this.handle1.setAttribute('stroke-width', '3');
			this.handle1.setAttribute('stroke', 'transparent');
			this.handle1.setAttribute('pointer-events', 'stroke');
			this.handle1.setAttribute('cursor', 'ew-resize');

			this.handle2 = document.createElementNS(this.graph.ns, 'line');
			this.handle2.setAttribute('stroke-width', '3');
			this.handle2.setAttribute('stroke', 'transparent');
			this.handle2.setAttribute('pointer-events', 'stroke');
			this.handle2.setAttribute('cursor', 'ew-resize');

			this.setDom('cursor', 'move');
			this.doDraw = undefined;

			if(require) {
				var self = this;
				require(['src/util/context'], function(Context) {
					Context.listen(self._dom, [
						['<li><a><span class="ui-icon ui-icon-cross"></span> Remove integral</a></li>', 
						function(e) {
							self.kill();
							self.graph.triggerEvent('onAnnotationRemove', self.data);
						}]
					]);
				});
			}
			
		},

		setEvents: function() {
			var self = this;
			this._dom.addEventListener('mousedown', function(e) {
			
				e.preventDefault();
				e.stopPropagation();
				self.handleMouseDown(e);
			});

			this.handle1.addEventListener('mousedown', function(e) {
				e.preventDefault();
				e.stopPropagation();
				self.handleMouseDown(e, 1);
			});

			this.handle2.addEventListener('mousedown', function(e) {
				e.preventDefault();
				e.stopPropagation();
				self.handleMouseDown(e, 2);
			});

			this._dom.addEventListener('mousemove', function(e) {
				e.preventDefault();
				e.stopPropagation();
				self.handleMouseMove(e);
			});

			this._dom.addEventListener('mouseup', function(e) {
				e.preventDefault();
				e.stopPropagation();
				self.handleMouseUp(e);
			});
			
		//	this.setSelectableOnClick();
		},

		handleMouseDown: function(e, resize) {

			this.graph.shapeZone.appendChild(this.group);
			if(!resize) {
				this.coordsI = this.graph.getXY(e);
				this.moving = true;
			} else {
				this.resize = resize;
				this.resizingPosition = ((this.reversed && resize == 2) || (!this.reversed && resize == 1)) ? this.getFromData('pos') : this.getFromData('pos2');
			}

			var self = this;
			this.graph.annotationMoving(this);

			if( ! this._selected ) {

				self.preventUnselect = true;
				self.timeoutSelect = window.setTimeout(function() {
					self.select();
					self.timeoutSelect = false;
				}, 100);
			}
		},

		handleMouseUp: function() {
			this.moving = false;
			this.resize = false;
			this.graph.annotationMoving(false);

			if( this.preventUnselect ) {

				this.preventUnselect = false;

			} else if( this._selected ) {

				this.unselect();
			}

			this.triggerChange();
		},

		handleMouseMove: function(e) {

			if(this.moving) {
				var coords = this.graph.getXY(e);
				var delta = this.serie.getXAxis().getRelPx(coords.x - this.coordsI.x);
				var pos1 = this.getFromData('pos');
				var pos2 = this.getFromData('pos2');
				pos1.x += delta;
				pos2.x += delta;
				
				if(delta != 0)
					this.preventUnselect = true;

				this.coordsI = coords;
				this.position = this.setPosition();
				
				this.redrawImpl();

			} else if(this.resize) {

				var value = this.serie.searchClosestValue(this.serie.getXAxis().getVal(this.graph.getXY(e).x - this.graph.getPaddingLeft()));
				if(!value)
					return;

				this.position = this.setPosition();

				if(this.resizingPosition.x != value.xMin)
					this.preventUnselect = true;

				this.resizingPosition.x = value.xMin;
				this.redrawImpl();
			}
		},

		redrawImpl: function() {
			//var doDraw = this.setPosition();
		//	this.setDom('fill', 'url(#' + 'patternFill' + this.graph._creation + ')')

			if(this.position != this.doDraw) {
				this.group.setAttribute("visibility", this.position ? "visible" : 'hidden');
				this.doDraw = this.position;
			}
		},

		setPosition: function() {
			

			var posXY = this._getPosition( this.getFromData( 'pos' ) ),
				posXY2 = this._getPosition( this.getFromData( 'pos2' ), this.getFromData( 'pos' ) ),
				w = Math.abs(posXY.x - posXY2.x),
				x = Math.min(posXY.x, posXY2.x);

			this.reversed = x == posXY2.x;
			
			if( w < 2 || x + w < 0 || x > this.graph.getDrawingWidth( ) ) {
				return false;
			}


			var v1 = this.serie.searchClosestValue( this.getFromData( 'pos' ).x ),
				v2 = this.serie.searchClosestValue( this.getFromData( 'pos2' ).x ),
				v3,
				i, 
				j, 
				init, 
				max, 
				k, 
				x, 
				y, 
				firstX, 
				firstY, 
				currentLine,
				maxY = 0,
				minY = Number.MAX_VALUE;

			if(! v1 || ! v2) {
				return false;
			}

			if( v1.xBeforeIndex > v2.xBeforeIndex ) {
				v3 = v1;
				v1 = v2;
				v2 = v3;
			}


			for(i = v1.dataIndex; i <= v2.dataIndex ; i++) {
				currentLine = "M ";
				init = i == v1.dataIndex ? v1.xBeforeIndexArr : 0;
				max = i == v2.dataIndex ? v2.xBeforeIndexArr : this.serie.data[i].length;
				k = 0;
				
				for(j = init; j <= max; j+=2) {

					x = this.serie.getX( this.serie.data[ i ][ j + 0 ]),
					y = this.serie.getY( this.serie.data[ i ][ j + 1 ]);


					maxY = Math.max(this.serie.data[i][j + 1], maxY);
					minY = Math.min(this.serie.data[i][j + 1], minY);

					if(j == init) {
						this.firstX = x;
						this.firstY = y;
					}
					currentLine = this.serie._addPoint(currentLine, x, y, k);
					k++;
				}

				this.lastX = x;
				this.lastY = y;

				if(! this.firstX || ! this.firstY || ! this.lastX || ! this.lastY) {
					return;
				}

				currentLine += " V " + this.serie.getYAxis().getPx(0) + " H " + this.firstX + " z";
				this.setDom('d', currentLine);
			}

			this.maxY = this.serie.getY(maxY);
			if( this._selected ) {
				this.select();
			}
			
			return true;
		},

		select: function() {

			if( ! this.firstX || ! this.lastX ) {
				return;
			}

			this._selected = true;

			this.selectHandles();
			
			this.group.appendChild(this.handle1);
			this.group.appendChild(this.handle2);

			this.selectStyle();
			
			this.graph.selectAnnotation(this);
		},


		selectHandles: function() {
			this.handle1.setAttribute('x1', this.firstX);
			this.handle1.setAttribute('x2', this.firstX);

			this.handle2.setAttribute('x1', this.lastX);
			this.handle2.setAttribute('x2', this.lastX);

			this.handle1.setAttribute('y1', this.serie.getYAxis().getMaxPx());
			this.handle1.setAttribute('y2', this.serie.getY(0));

			this.handle2.setAttribute('y1', this.serie.getYAxis().getMaxPx());
			this.handle2.setAttribute('y2', this.serie.getY(0));
		},

		selectStyle: function() {
			this.setDom('stroke', 'red');
			this.setDom('stroke-width', '2');
			this.setDom('stroke-dasharray', '10 10');
		},

		unselect: function() {

			this._selected = false;

			this.group.removeChild(this.handle1);
			this.group.removeChild(this.handle2);

			this.setStrokeWidth();
			this.setStrokeColor();
			this.setDashArray();

			this.graph.unselectAnnotation(this);
		},

		setLabelPosition: function(labelIndex) {
			var pos1 = this._getPosition(this.getFromData('pos')),
				pos2 = this._getPosition(this.getFromData('pos2'), this.getFromData('pos'));


			this._setLabelPosition(labelIndex, this._getPosition(this.get('labelPosition', labelIndex), {x: (pos1.x + pos2.x) / 2 + "px", y: (pos1.y + pos2.y) / 2 + "px" }));			
		}

	});


	return GraphSurfaceUnderCurve;
});