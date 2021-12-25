import { SERIE_TYPE } from '../../types/series';
import { ns } from '../graph.core';
import * as util from '../graph.util.js';
import SerieLine from './graph.serie.line';
const defaultOptions = {
    markers: false,
    histogramStyle: {
        fillColor: 'black',
        fillOpacity: 0.2
    }
};
/**
 * Serie line
 * @example graph.newSerie( name, options, "line" );
 * @see Graph#newSerie
 * @extends Serie
 */
class SerieHistogram extends SerieLine {
    constructor(graph, name, options) {
        super(graph, name, options);
        this.init();
        // Unselected style
        this.extendStyle({
            histogram: this.options.histogramStyle
        }, "unselected", null);
    }
    init() {
        this.options = this.extendLineOptions(this.options);
        util.mapEventEmission(this.options, this); // Register events
    }
    getType() {
        return SERIE_TYPE.HISTOGRAM;
    }
    applyStyle() {
        this.applyHistogramStyles();
        super.applyStyle();
    }
    applyHistogramStyles() {
        this.applyLineStyles();
        for (var i = 0; i < this.lines.length; i++) {
            this.applyHistogramStyle(this.lines[i]);
        }
    }
    /**
     * Applies the current style to a line element. Mostly used internally
     * @memberof SerieLine
     */
    applyHistogramStyle(line) {
        if (this.getFillColor()) {
            line.setAttribute('fill', this.getFillColor());
        }
        else {
            line.setAttribute('fill', 'none');
        }
        line.setAttribute('fill-opacity', this.getFillOpacity());
    }
    /**
     * Computes and returns a line SVG element with the same line style as the serie, or width 20px
     * @returns {SVGElement}
     * @memberof SerieLine
     */
    getSymbolForLegend() {
        const container = this.symbolLegendContainer;
        if (!this._histForLegend) {
            var line = document.createElementNS(ns, 'polyline');
            this.applyLineStyle(line);
            line.setAttribute('d', "M 5 -5 v 10 h 5 v -10");
            line.setAttribute('cursor', 'pointer');
            this._histForLegend = line;
            container.appendChild(this._histForLegend);
        }
        else {
            this.applyLineStyle(this._histForLegend);
        }
        super.getSymbolForLegend();
        return this._histForLegend;
    }
    drawInit(force) {
        try {
            this.axisCheck();
        }
        catch (e) {
            console.warn(e);
            return false;
        }
        if (!this.waveform) {
            throw "No waveform for this serie";
        }
    }
    /**
     * Draws the serie
     * @memberof SerieLine
     */
    draw(force) {
        // Serie redrawing
        if (force || this.hasDataChanged()) {
            //console.log('drawing');
            //   this.removeLinesGroup();
            //if( ! this._histForLegend ) {
            this._calculateHistogram(this.getXAxis().firstTick, this.getXAxis().lastTick, this.getXAxis()._secondaryTickIncrement);
            try {
                this._createLine();
                for (let i = 0; i < this._histogramWaveform.getLength(); i++) {
                    this._addHistogramPoint(this._histogramWaveform.getX(i), this._histogramWaveform.getY(i), this.getXAxis()._secondaryTickIncrement);
                }
            }
            catch (e) {
            }
            this.removeExtraLines();
            //    this.insertLinesGroup();
        }
        if (this.hasStyleChanged(this.getActiveStyle())) {
            this.computeActiveStyle();
            this.updateStyle();
        }
        this.dataHasChanged(false);
        super.afterDraw();
    }
    /**
   * Notifies jsGraph that the data of the serie has changed
   * @returns {Serie} The current serie
   * @memberof Serie
   */
    dataHasChanged(arg) {
        super.dataHasChanged(arg);
        if (this.waveform) {
            if (this.getXAxis()) {
                let maxY = this.waveform.getMaxY(), minY = this.waveform.getMinY();
                console.log(maxY, minY);
                if (maxY == minY) {
                    return;
                }
                this._calculateHistogram(minY, maxY, (maxY - minY));
            }
        }
        return this;
    }
    _calculateHistogram(xMin, xMax, dX) {
        try {
            console.log(xMin, xMax, dX);
            this._histogramWaveform = this.waveform.calculateHistogram(xMin, xMax, dX);
            this.minX = this.waveform.getMinY();
            this.maxX = this.waveform.getMaxY();
            this.minY = 0;
            this.maxY = this._histogramWaveform.getMax();
            //console.log( this.minX, this.maxX, this.minY, this.maxY );
        }
        catch (e) {
            //console.warn("Could not calculate histogram");
            // TODO: Signal that the serie is invalid and but soft fails the drawing
        }
    }
    _addHistogramPoint(x, y, dx) {
        let xpx = this.getX(x);
        let xpx2 = this.getX(x + dx);
        let ypx = this.getY(y);
        let ypx0 = this.getY(0);
        if (isNaN(ypx0)) {
            return;
        }
        if (xpx !== xpx || ypx !== ypx || xpx2 !== xpx2 || ypx0 !== ypx0) {
            return;
        }
        if (this.counter == 0) {
            this.currentLine = "";
        }
        this.counter++;
        this.currentLine += `M ${xpx} ${ypx0} V ${ypx} H ${xpx2} V ${ypx0} z`;
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
        this.applyHistogramStyles();
        this.setLegendSymbolStyle();
        this.styleHasChanged(false);
    }
    getRawHistogramStyle(styleName = "unselected") {
        let s = this.getRawStyle(styleName);
        if (!s.histogram) {
            s.histogram = {};
        }
        return s.histogram;
    }
    setFillColor(color, selectionType, applyToSelected = false) {
        let s = this.getRawHistogramStyle(selectionType);
        s.fillColor = color;
        if (applyToSelected) {
            this.setFillColor(color, 'selected');
        }
        this.styleHasChanged(selectionType);
        return this;
    }
    getFillColor() {
        var _a;
        return (_a = this.getComputedStyle().histogram) === null || _a === void 0 ? void 0 : _a.fillColor;
    }
    setFillOpacity(opacity, selectionType, applyToSelected = false) {
        let s = this.getRawHistogramStyle(selectionType);
        s.fillOpacity = opacity;
        if (applyToSelected) {
            this.setFillOpacity(opacity, 'selected');
        }
        this.styleHasChanged(selectionType);
        return this;
    }
    getFillOpacity() {
        var _a;
        return (_a = this.getComputedStyle().histogram) === null || _a === void 0 ? void 0 : _a.fillOpacity;
    }
}
export default SerieHistogram;
