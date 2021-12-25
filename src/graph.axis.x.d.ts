import Axis, { GraphAxisOptions } from './graph.axis';
import Graph from './graph.core';
/**
 * Generic constructor of a y axis
 * @augments Axis
 */
declare class AxisX extends Axis {
    constructor(graph: Graph, topbottom: "top" | "bottom", options: GraphAxisOptions);
    /**
     *  @private
     *  Returns the position of the axis, used by refreshDrawingZone in core module
     */
    getAxisPosition(): any;
    /**
     *  @returns {Boolean} always ```true```
     */
    isX(): boolean;
    /**
     *  @returns {Boolean} always ```false```
     */
    isY(): boolean;
    forceHeight(height: any): this;
    /**
     *  @private
     *  Used to set the x position of the axis
     */
    setShift(shift: any): void;
    /**
     *  Caclulates the maximum tick height
     *  @return {Number} The maximum tick height
     */
    getMaxSizeTick(): number;
    /**
     *  Draws a tick. Mostly used internally but it can be useful if you want to make your own axes
     *  @param {Number} value - The value in axis unit to place the tick
     *  @param {Number} level - The importance of the tick
     *  @param {Object} options - Further options to be passed to ```setTickContent```
     *  @param {Number} forcedPos - Forces the position of the tick (for axis dependency)
     */
    drawTick(value: any, level: 1 | 2 | 3, options: any, forcedPos: any): (Element | SVGTextElement)[];
    drawLabel(): void;
    draw(): number;
    /**
     *  Paints the label, the axis line and anything else specific to x axes
     */
    drawSpecifics(): void;
    /**
     *  @private
     */
    _drawLine(pos: any, line: any): any;
    _hideLine(line: any): void;
    /**
     *  @private
     */
    handleMouseMoveLocal(x: any): void;
    /**
     *  Caches the minimum px and maximum px position of the axis. Includes axis spans and flipping. Mostly used internally
     */
    setMinMaxFlipped(): void;
    getZProj(zValue: any): number;
}
export default AxisX;
