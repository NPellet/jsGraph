import * as util from '../graph.util.js';
import ErrorBarMixin from '../mixins/graph.mixin.errorbars.js';

import SerieLine from './graph.serie.line.js';

/**
 * Colored serie line
 * @example graph.newSerie( name, options, "color" );
 * @see Graph#newSerie
 * @augments SerieLine
 */
class SerieLineColor extends SerieLine {

  constructor(graph, name, options) {

    super(...arguments);
    this.lines = this.lines || {};
  }

  setColors(colors) {
    this.colors = colors;
  }

  _draw() {

    var self = this,
      data = this._dataToUse,
      toBreak,
      i = 0,
      j,
      k,
      m,
      x,
      y,
      k,
      o,
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

    // Y crossing
    var yLeftCrossingRatio,
      yLeftCrossing,
      yRightCrossingRatio,
      yRightCrossing,
      xTopCrossingRatio,
      xTopCrossing,
      xBottomCrossingRatio,
      xBottomCrossing;

    var incrXFlip = 0;
    var incrYFlip = 1;

    var pointOutside = false;
    var lastPointOutside = false;
    var pointOnAxis;

    this.eraseLines();

    if (this.isFlipped()) {
      incrXFlip = 1;
      incrYFlip = 0;
    }

    this.currentLine = '';
    m = this.waveform.getLength();

    for (j = 0; j < m; j += 1) {

      x = this.waveform.getX(j);
      y = this.waveform.getY(j);

      if ((x < xMin && lastX < xMin) || (x > xMax && lastX > xMax) || (((y < yMin && lastY < yMin) || (y > yMax && lastY > yMax)) && !this.options.lineToZero)) {
        lastX = x;
        lastY = y;
        lastPointOutside = true;
        continue;
      }

      this.counter2 = j;

      //if ( this.markersShown() ) {
      //this.getMarkerCurrentFamily( this.counter2 );
      //}

      xpx2 = this.getX(x);
      ypx2 = this.getY(y);

      if (xpx2 == xpx && ypx2 == ypx) {
        continue;
      }

      pointOutside = (x < xMin || y < yMin || x > xMax || y > yMax);

      if (isNaN(xpx2) || isNaN(ypx2)) {
        if (this.counter > 0) {

          //      this._createLine();
        }
        continue;
      }

      var color = this.colors[j];

      this._addPoint(xpx2, ypx2, x, y, xpx, ypx, lastX, lastY, j, color, false, true);

      xpx = xpx2;
      ypx = ypx2;

      lastX = x;
      lastY = y;
    }

    this.latchLines();

    if (this._tracker) {

      if (this._trackerDom) {
        this._trackerDom.remove();
      }

      var cloned = this.groupLines.cloneNode(true);
      this.groupMain.appendChild(cloned);

      for (var i = 0, l = cloned.children.length; i < l; i++) {

        cloned.children[i].setAttribute('stroke', 'transparent');
        cloned.children[i].setAttribute('stroke-width', '25px');
        cloned.children[i].setAttribute('pointer-events', 'stroke');
      }

      self._trackerDom = cloned;

      self.groupMain.addEventListener('mousemove', function (e) {
        var coords = self.graph._getXY(e),
          ret = self.handleMouseMove(false, false);
        self._trackingCallback(self, ret, coords.x, coords.y);
      });

      self.groupMain.addEventListener('mouseleave', function (e) {
        self._trackingOutCallback(self);
      });
    }
    return this;

  }

  _addPoint(xpx, ypx, x, y, xpxbefore, ypxbefore, xbefore, ybefore, j, color, move, allowMarker) {

    if (xpxbefore === undefined || ypxbefore === undefined) {
      return;
    }

    if (isNaN(xpx) || isNaN(ypx)) {
      return;
    }

    if (color._rgb) {
      color = `rgba(${color._rgb[0]},${color._rgb[1]},${color._rgb[2]},${color._rgb[3] || 1})`;
    }

    var line = this.lines[color];
    if (!line) {
      line = this.lines[color] = {
        object: document.createElementNS(this.graph.ns, 'path'),
        path: '',
        color: color
      };
      line.object.setAttribute('stroke', color);
      line.color = color;
      //      this.applyLineStyle( line );
      this.groupLines.appendChild(line.object);
    }

    line.path += `M ${xpxbefore} ${ypxbefore} L ${xpx} ${ypx}`;

    if (this.hasErrors()) {
      this.errorAddPoint(j, x, y, xpx, ypx);
    }

    /*if ( this.markersShown() && allowMarker !== false ) {
      drawMarkerXY( this, this.markerFamilies[ this.selectionType ][ this.markerCurrentFamily ], xpx, ypx );
    }*/
  }

  removeExtraLines() {

  }

  // Returns the DOM
  latchLines() {

    for (var i in this.lines) {
      this.lines[i].object.setAttribute('d', this.lines[i].path);
    }
  }

  // Returns the DOM
  eraseLines() {

    for (var i in this.lines) {
      this.lines[i].path = '';
      this.lines[i].object.setAttribute('d', '');
    }
  }

  /**
   * Applies the current style to a line element. Mostly used internally
   * @memberof SerieLine
   */
  applyLineStyle(line) {

    //line.setAttribute( 'stroke', this.getLineColor() );
    line.setAttribute('stroke-width', this.getLineWidth());
    if (this.getLineDashArray()) {
      line.setAttribute('stroke-dasharray', this.getLineDashArray());
    } else {
      line.removeAttribute('stroke-dasharray');
    }
    line.setAttribute('fill', 'none');
    //	line.setAttribute('shape-rendering', 'optimizeSpeed');
  }
}

export default SerieLineColor;