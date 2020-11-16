import * as util from '../graph.util.js';
import ErrorBarMixin from '../mixins/graph.mixin.errorbars.js';

import SerieScatter from './graph.serie.scatter.js';
import Serie from './graph.serie.js';

const type = 'line';

const defaultOptions = {
  /**
   * @name SerieLineDefaultOptions
   * @object
   * @static
   * @memberof SerieLine
   */

  // Extends scatterSerie
  markers: false,

  lineColor: 'black',
  lineStyle: 1,
  lineWidth: 1,

  trackMouse: false,
  lineToZero: false,
  selectableOnClick: false,
  overflowX: false,
  overflowY: false
};

/**
 * Serie line
 * @example graph.newSerie( name, options, "line" );
 * @see Graph#newSerie
 * @extends Serie
 */
class SerieLine extends SerieScatter {
  constructor(graph, name, options, defaultInherited) {
    super(
      graph,
      name,
      options,
      util.extend(true, {}, defaultOptions, defaultInherited)
    );

    //  this.selectionType = 'unselected';
    this._type = type;
    util.mapEventEmission(this.options, this); // Register events

    // Unselected style
    this.setStyle({
      line: {
        color: this.options.lineColor,
        style: this.options.lineStyle,
        width: this.options.lineWidth
      },

    }, "unselected", null);

    if (this.options.markerStyles) {
      let s = this.getRawStyles();
      for (let i in s) {

        if (this.options.markerStyles[i]) {
          s[i].data.markers = this.options.markerStyles[i];
        }
      }

    }

    this.setStyle({
      line: {
        width: 3
      }
    }, "selected", "unselected");
    this.activateStyle('unselected');
    this.computeActiveStyle();
    this.shown = true;

    this.data = [];
    this._isMinOrMax = {
      x: {
        min: false,
        max: false
      },
      y: {
        min: false,
        max: false
      }
    };

    // Optimize is no markerPoints => save loops
    //      this.markerPoints = {};

    this.groupLines = document.createElementNS(this.graph.ns, 'g');
    this.domMarker = document.createElementNS(this.graph.ns, 'path');

    if (!this.domMarker.style) {
      this.domMarker.style = {
        cursor: 'pointer'
      };
    } else {
      this.domMarker.style.cursor = 'pointer';
    }

    this.additionalData = {};

    this.marker = document.createElementNS(this.graph.ns, 'circle');
    this.marker.setAttribute('fill', 'black');
    this.marker.setAttribute('r', 3);
    this.marker.setAttribute('display', 'none');

    this.markerLabel = document.createElementNS(this.graph.ns, 'text');
    this.markerLabelSquare = document.createElementNS(this.graph.ns, 'rect');
    this.markerLabelSquare.setAttribute('fill', 'white');
    this.domMarkerHover = {};
    this.domMarkerSelect = {};
    this.markerHovered = 0;
    this.groupMarkerSelected = document.createElementNS(this.graph.ns, 'g');

    this.markerPoints = {};

    //this.scale = 1;
    //this.shift = 0;
    this.lines = [];

    this.groupMain.appendChild(this.groupLines);

    this.groupMain.appendChild(this.marker);

    this.groupMain.appendChild(this.groupMarkerSelected);
    this.groupMain.appendChild(this.markerLabelSquare);
    this.groupMain.appendChild(this.markerLabel);

    this.independantMarkers = [];

    if (this.initExtended1) {
      this.initExtended1();
    }

    this.groupLines.addEventListener('click', (e) => {
      if (this.options.selectableOnClick) {
        if (this.isSelected()) {
          this.graph.unselectSerie(this);
        } else {
          this.graph.selectSerie(this);
        }
      }
    });
  }


  applyStyle() {
    this.applyLineStyles();
    this.applyLineStyle(this.getSymbolForLegend());
    super.applyStyle();
  }

  postInit() {
  }

  /**
   * Sets the options of the serie
   * @see SerieLineDefaultOptions
   * @param {Object} options - A object containing the options to set
   * @return {SerieLine} The current serie
   * @memberof SerieLine
   */
  setOptions(options) {
    //this.options = util.extend( true, {}, SerieLine.prototype.defaults, ( options || {} ) );
    // Unselected style
    /*this.styles.unselected = {
      lineColor: this.options.lineColor,
      lineStyle: this.options.lineStyle
    };
*/
    //    this.applyLineStyles();
    return this;
  }

  onMouseWheel() { }

  /**
   * Cleans the DOM from the serie internal object (serie and markers). Mostly used internally when a new {@link Serie#setData} is called
   * @returns {SerieLine} The current serie
   * @memberof SerieLine
   */
  empty() {
    for (var i = 0, l = this.lines.length; i < l; i++) {
      this.groupLines.removeChild(this.lines[i]);
    }
    this.lines = [];

    return this;
  }
  /*
    /**
     * Applies a selection to the serie
     * @param {String} [ selectionType = "selected" ] - The selection name
     * @returns {SerieLine} The current serie
     * @see SerieLine#unselect
     * @memberof SerieLine
    
    select(selectionType = 'selected') {
      this.selected = selectionType !== 'unselected';
      //  this.selectionType = selectionType;
  
      this.setActiveStyle(selectionType);
      this.computeActiveStyle();
  
      this.applyLineStyles();
      this.applyLineStyle(this.getSymbolForLegend());
  
      super.select(selectionType);
  
      return this;
    }*/

  /**
   * Removes the selection to the serie. Effectively, calls {@link SerieLine#select}("unselected").
   * @returns {SerieLine} The current serie
   * @see SerieLine#select
   * @memberof SerieLine
   */
  unselect() {
    this.selected = false;
    super.unselect();
    return this.select('unselected');
  }

  /**
   * Computes and returns a line SVG element with the same line style as the serie, or width 20px
   * @returns {SVGElement}
   * @memberof SerieLine
   */
  getSymbolForLegend() {
    const container = this._getSymbolForLegendContainer();

    if (!this.lineForLegend) {
      var line = document.createElementNS(this.graph.ns, 'line');
      this.applyLineStyle(line);

      line.setAttribute('x1', 5);
      line.setAttribute('x2', 25);
      line.setAttribute('y1', 0);
      line.setAttribute('y2', 0);

      line.setAttribute('cursor', 'pointer');

      this.lineForLegend = line;
      container.appendChild(this.lineForLegend);
    } else {
      this.applyLineStyle(this.lineForLegend);
    }

    super.getSymbolForLegend();

    return this.lineForLegend;
  }

  /**
   * Degrades the data of the serie. This option is used for big data sets that have monotoneously increasing (or decreasing) x values.
   * For example, a serie containing 1'000'000 points, displayed over 1'000px, will have 1'000 points per pixel. Often it does not make sense to display more than 2-3 points per pixel.
   * <code>degrade( pxPerPoint )</code> allows a degradation of the serie, based on a a number of pixel per point. It computes the average of the data that would be displayed over each pixel range
   * Starting from jsGraph 2.0, it does not calculate the minimum and maximum and creates the zone serie anymore
   * @return {SerieLine} The current serie instance
   * @example serie.degrade( 0.5 ); // Will display 2 points per pixels
   * @memberof SerieLine
   */
  degrade(pxPerP) {
    this.degradationPx = pxPerP;
    return this;
  }

  drawInit(force) {
    var data, xData;

    try {
      this.axisCheck();
    } catch (e) {
      console.warn(e);
      return false;
    }

    this.currentLineId = 0;
    this.counter = 0;
    this._drawn = true;
    this.currentLine = '';

    // Degradation

    if (this.waveform) {
      if (this.degradationPx) {
        this.waveform.resampleForDisplay({
          resampleToPx: this.degradationPx,
          xPosition: this.getXAxis().getPx.bind(this.getXAxis()),
          minX: this.getXAxis().getCurrentMin(),
          maxX: this.getXAxis().getCurrentMax()
        });

        this._dataToUse = [this.waveform.getDataToUseFlat()];
      } else if (this.waveform.hasAggregation()) {
        let xaxis = this.getXAxis(),
          numberOfPointsInTotal =
            (this.graph.getDrawingWidth() *
              (xaxis.getDataMax() - xaxis.getDataMin())) /
            (xaxis.getCurrentMax() - xaxis.getCurrentMin()),
          promise = this.waveform.selectAggregatedData(numberOfPointsInTotal);

        if (promise instanceof Promise) {
          promise.then(() => {
            this.draw(force);
          });

          return false;
        } else if (promise === false) {
          return false;
        } else {
          this._dataToUse = this.waveform.getDataToUseFlat();
        }
      }

      //    this._dataToUse = this.waveform.getDataToUseFlat();
    } else {
      this._dataToUse = this.data;
      this._xDataToUse = this.xData;
    }

    return true;
  }

  removeLinesGroup() {
    this._afterLinesGroup = this.groupLines.nextSibling;
    this.groupMain.removeChild(this.groupLines);
  }

  insertLinesGroup() {
    if (!this._afterLinesGroup) {
      throw 'Could not find group after lines to insertion.';
    }

    this.groupMain.insertBefore(this.groupLines, this._afterLinesGroup);
    this._afterLinesGroup = false;
  }

  removeExtraLines() {
    var i = this.currentLineId,
      l = this.lines.length;

    for (; i < l; i++) {
      this.groupLines.removeChild(this.lines[i]);
    }

    this.lines.splice(this.currentLineId, l - this.currentLineId);
    this.currentLineId = 0;
  }

  /**
   * Draws the serie
   * @memberof SerieLine
   */
  draw(force) {
    // Serie redrawing

    if (!this.getXAxis() || !this.getYAxis()) {
      throw 'No axes were defined for this serie';
    }

    if (force || this.hasDataChanged()) {
      super.draw(force);

      if (!this.drawInit(force)) {
        return;
      }

      var data = this._dataToUse,
        xData = this._xDataToUse,
        slotToUse = this._slotToUse;

      this.removeLinesGroup();

      this.lookForMaxima = true;
      this.lookForMinima = false;

      this.pos0 = this.getYAxis().getPos(
        Math.max(0, this.getYAxis().getCurrentMin())
      );

      if (this.hasErrors()) {
        this.errorDrawInit();
      }

      this._draw();

      if (this.hasErrors()) {
        this.errorDraw();
      }

      this.removeExtraLines();
      this.insertLinesGroup();
    }

    // Unhovers everything
    for (var i in this.domMarkerHover) {
      this.toggleMarker(i.split(','), false, true);
    }

    // Deselects everything
    for (var i in this.domMarkerSelect) {
      this.toggleMarker(i.split(','), false, false);
    }
    //this.applyLineStyle(this.getSymbolForLegend());
    if (this.hasStyleChanged(this.getActiveStyle())) {
      this.computeActiveStyle();
      this.updateStyle();
    }

    this.dataHasChanged(false);
    super.afterDraw();
  }

  _draw() {
    let waveform = this.waveform,
      data,
      x,
      y,
      lastX = false,
      lastY = false,
      xpx,
      ypx,
      xpx2,
      ypx2,
      xAxis = this.getXAxis(),
      yAxis = this.getYAxis(),
      xMin = xAxis.getCurrentMin(),
      yMin = yAxis.getCurrentMin(),
      xMax = xAxis.getCurrentMax(),
      yMax = yAxis.getCurrentMax();

    if (!waveform) {
      return;
    }

    data = waveform.getData(true);
    // Y crossing

    /*xshift = waveform.getXShift(),
    xscale = wave.getXScale(),*/
    let yshift = waveform.getShift(),
      yscale = waveform.getScale();

    let pointOutside = false;
    let lastPointOutside = false;
    let pointOnAxis;

    let _monotoneous = this.isMonotoneous();

    this.currentLine = '';


    let { i, l } = this._getIterativeBounds(waveform, xMin, xMax);

    for (; i < l; i += 1) {
      x = waveform.getX(i, true);
      y = data[i] * yscale + yshift;
      if (x != x || y != y) {
        // NaN checks
        this._createLine();
        continue;
      }

      if (
        (!this.options.overflowX && x < xMin && lastX < xMin) ||
        (!this.options.overflowX && x > xMax && lastX > xMax) ||
        (((!this.options.overflowY && y < yMin && lastY < yMin) ||
          (!this.options.overflowY && y > yMax && lastY > yMax)) &&
          !this.options.lineToZero)
      ) {
        lastX = x;
        lastY = y;
        lastPointOutside = true;
        continue;
      }

      this.counter2 = i;

      if (this.options.lineToZero) {
        if (y > yMax) {
          y = yMax;
        }
        if (y < yMin) {
          y = yMin;
        }
      }

      xpx2 = this.getX(x);
      ypx2 = this.getY(y);
      //xpx2 = 0;
      //ypx2 = 0;

      if (xpx2 == xpx && ypx2 == ypx) {
        continue;
      }

      if (xpx2 != xpx2 || ypx2 != ypx2) {
        // NaN checks
        if (this.counter > 0) {
          this._createLine();
        }
        continue;
      }

      let pointOutside = this.isPointOutside(x, y, xMin, xMax, yMin, yMax);
      if (this.options.lineToZero) {
        pointOutside = x < xMin || x > xMax;

        if (pointOutside) {
          continue;
        }
      } else {
        if (pointOutside || lastPointOutside) {
          if ((lastX === false || lastY === false) && !lastPointOutside) {
            xpx = xpx2;
            ypx = ypx2;
            lastX = x;
            lastY = y;
          } else {

            let pointOnAxis = this.calculateAxisCrossing(x, y, lastX, lastY, xMin, xMax, yMin, yMax);

            if (pointOnAxis.length > 0) {
              if (!pointOutside) {
                // We were outside and now go inside
                this._createLine();
                this._addPoint(
                  this.getX(pointOnAxis[0][0]),
                  this.getY(pointOnAxis[0][1]),
                  pointOnAxis[0][0],
                  pointOnAxis[0][1],
                  false,
                  false,
                  false
                );
                this._addPoint(xpx2, ypx2, lastX, lastY, false, false, true);
              } else if (!lastPointOutside) {
                // We were inside and now go outside
                this._addPoint(
                  this.getX(pointOnAxis[0][0]),
                  this.getY(pointOnAxis[0][1]),
                  pointOnAxis[0][0],
                  pointOnAxis[0][1],
                  false,
                  false,
                  false
                );
              } else {
                // No crossing: do nothing
                if (pointOnAxis.length == 2) {
                  this._createLine();

                  this._addPoint(
                    this.getX(pointOnAxis[0][0]),
                    this.getY(pointOnAxis[0][1]),
                    pointOnAxis[0][0],
                    pointOnAxis[0][1],
                    false,
                    false,
                    false
                  );
                  this._addPoint(
                    this.getX(pointOnAxis[1][0]),
                    this.getY(pointOnAxis[1][1]),
                    pointOnAxis[0][0],
                    pointOnAxis[0][1],
                    false,
                    false,
                    false
                  );
                }
              }
            } else if (!pointOutside) {
              this._addPoint(xpx2, ypx2, lastX, lastY, i, false, false);
            }
          }

          xpx = xpx2;
          ypx = ypx2;
          lastX = x;
          lastY = y;

          lastPointOutside = pointOutside;

          continue;
        }
      }

      this._addPoint(xpx2, ypx2, x, y, i, false, true);

      //this.detectPeaks( x, y );

      xpx = xpx2;
      ypx = ypx2;

      lastX = x;
      lastY = y;
    }

    this._createLine();

    if (this._tracker) {
      if (this._trackerDom) {
        this._trackerDom.remove();
      }

      var cloned = this.groupLines.cloneNode(true);
      this.groupMain.appendChild(cloned);

      for (i = 0, l = cloned.children.length; i < l; i++) {
        cloned.children[i].setAttribute('stroke', 'transparent');
        cloned.children[i].setAttribute('stroke-width', '25px');
        cloned.children[i].setAttribute('pointer-events', 'stroke');
      }

      this._trackerDom = cloned;

      this.groupMain.addEventListener('mousemove', (e) => {
        var coords = this.graph._getXY(e),
          ret = this.handleMouseMove(false, false);

        this._trackingCallback(this, ret, coords.x, coords.y);
      });

      this.groupMain.addEventListener('mouseleave', (e) => {
        this._trackingOutCallback(this);
      });
    }

    return this;
  }

  _getIterativeBounds(waveform, xMin, xMax) {

    let i = 0,
      l = waveform.getLength(),
      wL = l;

    if (waveform.isXMonotoneous()) {
      if (waveform.isXMonotoneousAscending()) {
        i = waveform.getIndexFromX(xMin, true);
        l = waveform.getIndexFromX(xMax, true);
      } else {
        i = waveform.getIndexFromX(xMax, true);
        l = waveform.getIndexFromX(xMin, true);
      }

      if (i == false) {
        i = 0;
      } else if (i > 0) {
        i--;
      }

      if (l == false) {
        l = wL;
      } else if (l < wL) {
        l++;
      }
    }
    return { i, l };
  }


  kill() {
    super.kill();
  }

  isPointOutside(x, y, xMin, xMax, yMin, yMax) {
    if (!this.isMonotoneous()) {
      return (!this.options.overflowX && (x < xMin || x > xMax)) || (!this.options.overflowY && (y < yMin || y > yMax));
    } else {
      return !this.options.overflowY && (y < yMin || y > yMax);
    }
  }


  calculateAxisCrossing(x, y, lastX, lastY, xMin, xMax, yMin, yMax) {
    let pointOnAxis = [];


    // Y crossing
    let yLeftCrossingRatio = (x - xMin) / (x - lastX);
    let yLeftCrossing = y - yLeftCrossingRatio * (y - lastY);
    let yRightCrossingRatio = (x - xMax) / (x - lastX);
    let yRightCrossing = y - yRightCrossingRatio * (y - lastY);

    // X crossing
    let xTopCrossingRatio = (y - yMin) / (y - lastY);
    let xTopCrossing = x - xTopCrossingRatio * (x - lastX);
    let xBottomCrossingRatio = (y - yMax) / (y - lastY);
    let xBottomCrossing = x - xBottomCrossingRatio * (x - lastX);

    if (
      yLeftCrossingRatio < 1 &&
      yLeftCrossingRatio > 0 &&
      yLeftCrossing !== false &&
      yLeftCrossing <= yMax &&
      yLeftCrossing >= yMin
    ) {
      pointOnAxis.push([xMin, yLeftCrossing]);
    }

    if (
      yRightCrossingRatio < 1 &&
      yRightCrossingRatio > 0 &&
      yRightCrossing !== false &&
      yRightCrossing <= yMax &&
      yRightCrossing >= yMin
    ) {
      pointOnAxis.push([xMax, yRightCrossing]);
    }

    if (
      xTopCrossingRatio < 1 &&
      xTopCrossingRatio > 0 &&
      xTopCrossing !== false &&
      xTopCrossing <= xMax &&
      xTopCrossing >= xMin
    ) {
      pointOnAxis.push([xTopCrossing, yMin]);
    }

    if (
      xBottomCrossingRatio < 1 &&
      xBottomCrossingRatio > 0 &&
      xBottomCrossing !== false &&
      xBottomCrossing <= xMax &&
      xBottomCrossing >= xMin
    ) {
      pointOnAxis.push([xBottomCrossing, yMax]);
    }
    return pointOnAxis;
  }


  _addPoint(xpx, ypx, x, y, j, move, allowMarker) {
    /*if( ! this.currentLineId ) {
        throw "No current line"
      }* @memberof SerieLine
  */

    if (xpx !== xpx || ypx !== ypx) {
      return;
    }

    if (this.counter == 0) {
      this.currentLine = 'M ';
    } else {
      if (this.options.lineToZero || move) {
        this.currentLine += 'M ';
      } else {
        this.currentLine += 'L ';
      }
    }

    this.currentLine += xpx;
    this.currentLine += ' ';
    this.currentLine += ypx;
    this.currentLine += ' ';

    if (this.options.lineToZero && this.pos0 !== undefined) {
      this.currentLine += 'L ';
      this.currentLine += xpx;
      this.currentLine += ' ';
      this.currentLine += this.pos0;
      this.currentLine += ' ';
    }

    if (this.hasErrors()) {
      this.errorAddPoint(j, x, y, xpx, ypx);
    }

    this.counter++;
  }

  // Returns the DOM
  _createLine() {
    var i = this.currentLineId++,
      line;

    // Creates a line if needed
    if (this.lines[i]) {
      line = this.lines[i];
    } else {
      line = document.createElementNS(this.graph.ns, 'path');
      this.applyLineStyle(line);
      this.groupLines.appendChild(line);
      this.lines[i] = line;
    }

    if (this.counter == 0) {
      line.setAttribute('d', '');
    } else {
      line.setAttribute('d', this.currentLine);
    }

    this.currentLine = 'M ';
    this.counter = 0;

    return line;
  }

  /**
   * Reapply the current style to the serie lines elements. Mostly used internally
   * @memberof SerieLine
   */
  applyLineStyles() {
    for (var i = 0; i < this.lines.length; i++) {
      this.applyLineStyle(this.lines[i]);
    }
  }

  /**
   * Applies the current style to a line element. Mostly used internally
   * @memberof SerieLine
   */
  applyLineStyle(line) {

    line.setAttribute('stroke', this.getLineColor());
    line.setAttribute('stroke-width', this.getLineWidth());
    if (this.getLineDashArray()) {
      line.setAttribute('stroke-dasharray', this.getLineDashArray());
    } else {
      line.removeAttribute('stroke-dasharray');
    }

    if (this.getFillColor()) {
      line.setAttribute('fill', this.getFillColor());
    } else {
      line.setAttribute('fill', 'none');
    }

    //	line.setAttribute('shape-rendering', 'optimizeSpeed');
  }

  /**
   * Updates the current style (lines + legend) of the serie. Use this method if you have explicitely changed the options of the serie
   * @example var opts = { lineColor: 'red' };
   * var s = graph.newSerie( "name", opts ).setData( someData );
   * opts.lineColor = 'green';
   * s.updateStyle(); // Sets the lineColor to green
   * s.draw(); // Would also do the same thing, but recalculates the whole serie display (including (x,y) point pairs)
   * @memberof SerieLine
   */
  updateStyle() {
    this.applyLineStyles();
    this.setLegendSymbolStyle();

    this.styleHasChanged(false);
  }

  // Revised August 2014. Ok
  getMarkerPath(family, add) {
    var z = family.zoom || 1,
      add = add || 0,
      el = [];

    switch (family.type) {
      case 2:
        el = ['m', -2, -2, 'l', 4, 4, 'm', -4, 0, 'l', 4, -4];
        break;

      case 3:
        el = ['m', -2, 0, 'l', 4, 0, 'm', -2, -2, 'l', 0, 4];
        break;

      case 4:
        el = ['m', -1, -1, 'l', 2, 0, 'l', -1, 2, 'z'];
        break;

      default:
      case 1:
        el = ['m', -2, -2, 'l', 4, 0, 'l', 0, 4, 'l', -4, 0, 'z'];
        break;
    }

    if ((z == 1 || !z) && !add) {
      return el.join(' ');
    }

    var num = 'number';

    if (!el) {
      return;
    }

    for (var i = 0, l = el.length; i < l; i++) {
      if (typeof el[i] == num) {
        el[i] *= z + add;
      }
    }

    return el.join(' ');
  }

  /**
   * Searches the closest point pair (x,y) to the a pair of pixel position
   * @param {Number} x - The x position in pixels (from the left)
   * @param {Number} y - The y position in pixels (from the left)
   * @returns {Number} Index in the data array of the closest (x,y) pair to the pixel position passed in parameters
   * @memberof SerieLine
   */
  /*
  
  Let's deprecate this
  
  searchIndexByPxXY( x, y ) {
    var oldDist = false,
      xyindex = false,
      dist;
  
    var xData = this._xDataToUse,
      p_x,
      p_y;
  
    for ( var k = 0, m = this.waveform.getLength(); k < m; k += 1 ) {
      p_x = this.waveform.getX( k );
      p_y = this.waveform.getY( k );
  
      dist = Math.pow( this.getX( p_x ) - x, 2 ) + Math.pow( this.getY( p_y ) - y, 2 );
  
      if ( !oldDist || dist < oldDist ) {
        oldDist = dist;
        xyindex = k;
      }
    }
  
    return xyindex;
  }
  */
  handleMouseMove(xValue, doMarker, yValue) {
    var valX = xValue || this.getXAxis().getMouseVal(),
      valY = yValue || this.getYAxis().getMouseVal();

    var value = this.getClosestPointToXY(valX, valY);

    if (!value) {
      return;
    }

    var ratio, intY;

    if (value.xMax == value.xMin) {
      intY = value.yMin;
    } else {
      //ratio = ( valX - value.xMin ) / ( value.xMax - value.xMin );
      //intY = ( ( 1 - ratio ) * value.yMin + ratio * value.yMax );
    }

    if (doMarker && this.options.trackMouse) {
      if (value.xMin == undefined) {
        return false;
      }
    }

    return {
      xBefore: value.xMin,
      xAfter: value.xMax,
      yBefore: value.yMin,
      yAfter: value.yMax,
      trueX: value.xExact,
      indexClosest: value.indexClosest,
      interpolatedY: intY,

      xClosest: value.xClosest,
      yClosest: value.yClosest
    };
  }
  /**
   * Gets the maximum value of the y values between two x values. The x values must be monotoneously increasing
   * @param {Number} startX - The start of the x values
   * @param {Number} endX - The end of the x values
   * @returns {Number} Maximal y value in between startX and endX
   * @memberof SerieLine
   */
  getMax(start, end) {
    var start2 = Math.min(start, end),
      end2 = Math.max(start, end),
      v1 = this.getClosestPointToXY(start2),
      v2 = this.getClosestPointToXY(end2),
      i,
      j,
      max = -Infinity,
      initJ,
      maxJ;

    if (!v1) {
      start2 = this.minX;
      v1 = this.getClosestPointToXY(start2);
    }

    if (!v2) {
      end2 = this.maxX;
      v2 = this.getClosestPointToXY(end2);
    }

    if (!v1 || !v2) {
      return -Infinity;
    }

    for (i = v1.dataIndex; i <= v2.dataIndex; i++) {
      initJ = i == v1.dataIndex ? v1.xBeforeIndexArr : 0;
      maxJ = i == v2.dataIndex ? v2.xBeforeIndexArr : this.data[i].length;

      for (j = initJ; j <= maxJ; j += 2) {
        max = Math.max(max, this.data[i][j + 1]);
      }
    }

    return max;
  }

  /**
   * Gets the minimum value of the y values between two x values. The x values must be monotoneously increasing
   * @param {Number} startX - The start of the x values
   * @param {Number} endX - The end of the x values
   * @returns {Number} Maximal y value in between startX and endX
   * @memberof SerieLine
   */
  getMin(start, end) {
    var start2 = Math.min(start, end),
      end2 = Math.max(start, end),
      v1 = this.getClosestPointToXY(start2),
      v2 = this.getClosestPointToXY(end2),
      i,
      j,
      min = Infinity,
      initJ,
      maxJ;

    if (!v1) {
      start2 = this.minX;
      v1 = this.getClosestPointToXY(start2);
    }

    if (!v2) {
      end2 = this.maxX;
      v2 = this.getClosestPointToXY(end2);
    }

    if (!v1 || !v2) {
      return Infinity;
    }

    for (i = v1.dataIndex; i <= v2.dataIndex; i++) {
      initJ = i == v1.dataIndex ? v1.xBeforeIndexArr : 0;
      maxJ = i == v2.dataIndex ? v2.xBeforeIndexArr : this.data[i].length;

      for (j = initJ; j <= maxJ; j += 2) {
        min = Math.min(min, this.data[i][j + 1]);
      }
    }

    return min;
  }

  getRawLineStyle(styleName = "unselected") {
    let s = this.getRawStyle(styleName);
    if (!s.line) {
      s.line = {};
    }
    return s.line;
  }
  /* 
    LINE STYLE * @memberof SerieLine
   */
  setLineStyle(number, selectionType = 'unselected', applyToSelected) {

    let s = this.getRawLineStyle(selectionType);
    s.style = number;

    if (applyToSelected) {
      this.setLineStyle(number, 'selected');
    }

    this.styleHasChanged(selectionType);
    return this;
  }

  getLineStyle(selectionType) {
    return this.getComputedStyle(selectionType).line?.style;
  }

  getLineDashArray(styleName = this.getActiveStyleName()) {
    let s = this.getLineStyle(styleName);
    switch (s) {
      case 2:
        return '1, 1';
        break;
      case 3:
        return '2, 2';
        break;
      case 4:
        return '3, 3';
        break;
      case 5:
        return '4, 4';
        break;
      case 6:
        return '5, 5';
        break;

      case 7:
        return '5 2';
        break;
      case 8:
        return '2 5';
        break;

      case 9:
        return '4 2 4 4';
        break;
      case 10:
        return '1,3,1';
        break;
      case 11:
        return '9 2';
        break;
      case 12:
        return '2 9';
        break;

      case 0:
      case 1:
      case false:
        return false;
        break;

      default:
        return s;
        break;
    }
  }

  /** @memberof SerieLine
   */

  setLineWidth(width, selectionType, applyToSelected) {

    let s = this.getRawLineStyle(selectionType);
    s.width = width;
    if (applyToSelected) {
      this.setLineWidth(width, 'selected');
    }

    this.styleHasChanged(selectionType);
    return this;
  }

  getLineWidth() {
    return this.getComputedStyle().line?.width;
  }

  /* LINE COLOR * @memberof SerieLine
   */
  setLineColor(color, selectionType, applyToSelected) {

    let s = this.getRawLineStyle(selectionType);
    s.color = color;
    if (applyToSelected) {
      this.setLineColor(color, 'selected');
    }

    this.styleHasChanged(selectionType);
    return this;
  }

  getLineColor() {
    return this.getComputedStyle().line?.color;
  }

  /* FILL COLOR * @memberof SerieLine
   */
  setFillColor(color, selectionType, applyToSelected) {

    let s = this.getRawLineStyle(selectionType);
    s.fillColor = color;
    if (applyToSelected) {
      this.setFillColor(color, 'selected');
    }

    this.styleHasChanged(selectionType);
    return this;
  }



  getFillColor() {
    return this.getComputedStyle().line?.fillColor;
  }

  /** @memberof SerieLine
   */

  isMonotoneous() {
    if (this.waveform) {
      return this.waveform.isMonotoneous();
    }

    return !!this.xmonotoneous;
  }

  findLocalMinMax(xRef, xWithin, type) {
    if (!this.waveform) {
      return false;
    }

    return this.waveform.findLocalMinMax(xRef, xWithin, type);
  }

  /**
   * Performs a binary search to find the closest point index to an x value. For the binary search to work, it is important that the x values are monotoneous.
   * If the serie is not monotoneously ascending, then a Euclidian search is made
   * @param {Number} valX - The x value to search for
   * @param {number} valY - The y value to search for. Optional. When omitted, only a search in x will be done
   * @param {Number} withinPxX - The maximum distance in X
   * @param {number} withinPxY - The maximum distance in Y
   * @param {string} useAxis - ```x``` or ```y```. Use only the value of x or y to find the closest point
   * @returns {Object} Index in the data array of the closest (x,y) pair to the pixel position passed in parameters
   * @memberof SerieLine
   */
  getClosestPointToXY(valX = this.getXAxis().getMouseVal(), valY = this.getYAxis().getMouseVal(), withinPxX = 0, withinPxY = 0, useAxis = false, usePx = true) {
    // For the scatter serie it's pretty simple. No interpolation. We look at the point directly

    //const xVal = this.getXAxis().getVal( x );
    //const yVal = this.getYAxis().getVal( y );
    const xValAllowed = this.getXAxis().getRelVal(withinPxX);
    const yValAllowed = this.getYAxis().getRelVal(withinPxY);

    // Index of the closest point
    const closestPointIndex = this.waveform.findWithShortestDistance({
      x: valX,
      y: valY,
      xMaxDistance: xValAllowed,
      yMaxDistance: yValAllowed,
      axisRef: useAxis,
      scaleX: !usePx ? 1 : 1 / this.getXAxis().getRelVal(1),
      scaleY: !usePx ? 1 : 1 / this.getYAxis().getRelVal(1)
    });

    if (isNaN(closestPointIndex) || closestPointIndex === false) {
      return false;
    }
    /*
  
        if (
          ( Math.abs( valX - this.waveform.getX( closestPointIndex ) ) >
            Math.abs( this.getXAxis().getRelVal( withinPxX ) ) &&
            withinPxX ) ||
          ( Math.abs( valY - this.waveform.getY( closestPointIndex ) ) >
            Math.abs( this.getYAxis().getRelVal( withinPxY ) ) &&
            withinPxY )
        ) {
          return false;
        }
    */

    if (closestPointIndex < 0) {
      return false;
    }
    const dataOutput = {

      indexBefore: closestPointIndex,
      indexAfter: closestPointIndex,

      xExact: valX,

      indexClosest: closestPointIndex,
      interpolatedY: this.waveform.getY(closestPointIndex),

      xClosest: this.waveform.getX(closestPointIndex),
      yClosest: this.waveform.getY(closestPointIndex)
    };

    if (this.waveform.isMonotoneous()) {

      let xBefore = this.waveform.getX(closestPointIndex);
      let xAfter = this.waveform.getX(closestPointIndex);
      let yBefore = this.waveform.getY(closestPointIndex);
      let yAfter = this.waveform.getX(closestPointIndex);

      if (xBefore < xAfter) {
        dataOutput.xBefore = xBefore;
        dataOutput.xAfter = xAfter;
        dataOutput.yBefore = yBefore;
        dataOutput.yAfter = yAfter;
      } else {
        dataOutput.xBefore = xAfter;
        dataOutput.xAfter = xBefore;
        dataOutput.yBefore = yAfter;
        dataOutput.yAfter = yBefore;
      }
    }
    return dataOutput;
  }
}

util.mix(SerieLine, ErrorBarMixin);

export default SerieLine;