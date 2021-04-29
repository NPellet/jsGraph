import Graph from '../graph.core';
import { SerieInterface } from './graph.serie';
import SerieLine, { LineStyle, SerieLineOptions } from './graph.serie.line';
export declare type HistogramStyle = {
    fillColor?: string;
    fillOpacity?: number;
};
export interface SerieHistogramOptions extends SerieLineOptions {
    lineStyle?: LineStyle;
    histogramStyle?: HistogramStyle;
}
/**
 * Serie line
 * @example graph.newSerie( name, options, "line" );
 * @see Graph#newSerie
 * @extends Serie
 */
declare class SerieHistogram extends SerieLine implements SerieInterface {
    private options;
    private _histForLegend;
    constructor(graph: Graph, name: string, options: SerieHistogramOptions);
    getType(): any;
    applyStyle(): void;
    applyHistogramStyles(): void;
    /**
     * Applies the current style to a line element. Mostly used internally
     * @memberof SerieLine
     */
    applyHistogramStyle(line: SVGPolylineElement): void;
    /**
     * Computes and returns a line SVG element with the same line style as the serie, or width 20px
     * @returns {SVGElement}
     * @memberof SerieLine
     */
    getSymbolForLegend(): SVGElement;
    protected drawInit(force: any): boolean;
    /**
     * Draws the serie
     * @memberof SerieLine
     */
    draw(force: any): void;
    _addHistogramPoint(x: number, y: number, dx: number): void;
    /**
     * Updates the current style (lines + legend) of the serie. Use this method if you have explicitely changed the options of the serie
     * @example var opts = { lineColor: 'red' };
     * var s = graph.newSerie( "name", opts ).setData( someData );
     * opts.lineColor = 'green';
     * s.updateStyle(); // Sets the lineColor to green
     * s.draw(); // Would also do the same thing, but recalculates the whole serie display (including (x,y) point pairs)
     * @memberof SerieLine
     */
    updateStyle(): void;
    getRawHistogramStyle(styleName?: string): HistogramStyle;
    setFillColor(color: any, selectionType: any, applyToSelected?: boolean): this;
    getFillColor(): any;
    setFillOpacity(opacity: number, selectionType: string, applyToSelected?: boolean): this;
    getFillOpacity(): any;
}
export default SerieHistogram;
