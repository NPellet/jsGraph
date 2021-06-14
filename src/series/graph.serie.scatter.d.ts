import { SerieOptions } from '../../types/series.js';
import Serie from './graph.serie';
export declare type MarkerShapeStyle = {
    shape?: string;
    [x: string]: number | string;
};
export declare type MarkerStyle = {
    default: MarkerShapeStyle;
};
export interface SerieScatterOptions extends SerieOptions {
    markers?: boolean;
    markerStyles?: {
        [x: string]: MarkerStyle;
    };
}
/**
 * @static
 * @augments Serie
 * @example graph.newSerie( name, options, "scatter" );
 * @see Graph#newSerie
 */
declare class SerieScatter extends Serie {
    options: SerieScatterOptions;
    constructor(graph: any, name: any, options: any);
    protected extendScatterOptions<T extends SerieScatterOptions>(options: T): T;
    init(): void;
    /**
     * Applies for x as the category axis
     * @example serie.setDataCategory( { x: "someName", y: Waveform } );
     */
    setDataCategory(data: any): this;
    /**
     * Removes all DOM points
     * @private
     */
    empty(): void;
    getSymbolForLegend(): SVGElement;
    /**
     * Sets style to the scatter points
     * First argument is the style applied by default to all points
     * Second argument is an array of modifiers that allows customization of any point of the scatter plot. Data for each elements of the array will augment <code>allStyles</code>, so be sure to reset the style if needed.
     * All parameters - except <code>shape</code> - will be set as parameters to the DOM element of the shape
     *
     * @example
     * var modifiers = [];
     * modifiers[ 20 ] = { shape: 'circle', r: 12, fill: 'rgba(0, 100, 255, 0.3)', stroke: 'rgb(0, 150, 255)' };
     * serie.setMarkerStyle( { shape: 'circle', r: 2, fill: 'rgba(255, 0, 0, 0.3)', stroke: 'rgb(255, 100, 0)' }, modifiers ); // Will modify scatter point n°20
     *
     * @param {Object} allStyles - The general style for all markers
     * @param {Object} [ modifiers ] - The general style for all markers
     * @param {String} [ selectionMode="unselected" ] - The selection mode to which this style corresponds. Default is unselected
     *
     */
    setMarkerStyle(all: any, modifiers: any, mode?: string, modeInherit?: string): this;
    setIndividualStyleNames(p: any): void;
    /**
     * Redraws the serie
     * @private
     * @param {force} Boolean - Forces redraw even if the data hasn't changed
     */
    draw(force: any): void;
    _makeMarker(group: any, shape: any): Element;
    getMarkerStyle(indices: any, noSetPosition: any): {};
    applyMarkerStyle(indices: any, noSetPosition: any): void;
    unselectMarker(index: any): void;
    selectMarker(index: any, setOn: any, selectionType: any): any;
    applyStyle(): void;
    setMarkers(bln?: boolean): this;
    showMarkers(): this;
    hideMarkers(): this;
    getUsedCategories(): any;
    getClosestPointToXY(valX?: any, valY?: any, withinPxX?: number, withinPxY?: number, useAxis?: boolean, usePx?: boolean): {
        indexBefore: any;
        indexAfter: any;
        xBefore: number;
        xAfter: number;
        yBefore: number;
        yAfter: number;
        xExact: any;
        indexClosest: any;
        interpolatedY: number;
        xClosest: number;
        yClosest: number;
    };
}
export default SerieScatter;
