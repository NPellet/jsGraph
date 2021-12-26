import { SerieOptions } from '../../types/series.js';
import Graph, { ns } from '../graph.core.js';
import * as util from '../graph.util.js';
import ErrorBarMixin from '../mixins/graph.mixin.errorbars.js';

import Serie from './graph.serie.line';

/**
 * Represents a bar serie.
   Needs to be used exclusively with a bar axis ({@link AxisXBar}).
   Supports error bars, line color, line width, fill color, fill opacity.
 * @example graph.newSerie("serieName", { fillColor: 'red', fillOpacity: 0.2 }, "bar" );
 * @extends Serie
 */
class SerieBar extends Serie {
  constructor(graph: Graph, name: string, options: SerieOptions) {
    super(graph, name, options);

    this.pathDom = document.createElementNS(ns, 'path');
    this.groupMain.appendChild(this.pathDom);

    // Creates an empty style variable

    // Unselected style

    this.extendStyle({
      line: {
        color: this.options.lineStyle.color,
        style: this.options.lineStyle.style,
        width: this.options.lineStyle.width,
      },

    }, "unselected", null);

  }


  getRawBarStyle(styleName = "unselected") {
    let s = this.getRawStyle(styleName);
    if (!s.bar) {
      s.bar = {};
    }
    return s.bar;
  }

  /* LINE COLOR * @memberof SerieLine
   */
  setFillColor(color: string, selectionType: string, applyToSelected: boolean = false) {

    let s = this.getRawBarStyle(selectionType);
    s.color = color;
    if (applyToSelected) {
      this.setFillColor(color, 'selected');
    }

    this.styleHasChanged(selectionType);
    return this;
  }
  /**
   *  Returns the fill color
   */
  getFillColor() {
    return this.getComputedStyle().bar?.fill;
  }


  /* FILL COLOR * @memberof SerieLine
   */
  setFillOpacity(opacity: number, selectionType: string, applyToSelected: boolean = false) {

    let s = this.getRawBarStyle(selectionType);
    s.fill_opacity = opacity;
    if (applyToSelected) {
      this.setFillOpacity(opacity, 'selected');
    }

    this.styleHasChanged(selectionType);
    return this;
  }

  getFillOpacity() {
    return this.getComputedStyle().bar?.fill_opacity;
  }

  protected applyLineStyles() {
    this.applyLineStyle(this.pathDom);
  }

  /**
   * Applies the current style to a line element. Mostly used internally
   * @memberof SerieBar
   */
  protected applyLineStyle(line) {
    super.applyLineStyle(line);

    line.setAttribute('fill', this.getFillColor());
    line.setAttribute('fill-opacity', this.getFillOpacity() || 1);
  }

  draw() {
    var path = '';
    var categoryNumber, position;

    if (this.hasErrors()) {
      this.errorDrawInit();
    }

    var j = 0;

    for (; j < this.waveform.getLength(); j++) {
      if (!this.categoryIndices[this.waveform.getX(j)]) {
        continue;
      }

      path += `M ${this.getXAxis().getPos(
        this.categoryIndices[this.waveform.getX(j)],
      )} ${this.getYAxis().getPos(
        this.getYAxis().getCurrentMin(),
      )} V ${this.getYAxis().getPos(
        this.waveform.getY(j),
      )} h ${this.getXAxis().getDeltaPx(
        1 / this.nbCategories,
      )} V ${this.getYAxis().getPos(this.getYAxis().getCurrentMin())}`;

      if (this.hasErrors()) {
        var xpx =
          this.getXAxis().getPos(this.categoryIndices[this.waveform.getX(j)]) +
          this.getXAxis().getDeltaPx(1 / this.nbCategories) / 2;
        var ypx = this.getYAxis().getPos(this.waveform.getY(j));

        this.errorAddPoint(
          j,
          this.waveform.getX(j),
          this.waveform.getY(j),
          xpx,
          ypx,
        );
      }
    }

    if (this.hasErrors()) {
      this.errorDraw();
    }

    this.recomputeActiveStyleIfNeeded();
    this.pathDom.setAttribute('d', path);
    this.applyLineStyles();
  }

  // Markers now allowed
  setMarkers() {
    return this;
  }

  getUsedCategories() {
    return this.waveform.getXWaveform();
  }
}

export default SerieBar;
