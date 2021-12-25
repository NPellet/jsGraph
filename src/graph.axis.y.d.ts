import Graph from './graph';
import Axis, { GraphAxisOptions } from './graph.axis';
declare type GraphAxisYSpecificOptions = {
    forcedWidth?: number;
};
export declare type GraphAxisYOptions = Partial<GraphAxisOptions> & GraphAxisYSpecificOptions;
/**
 * Generic constructor of a y axis
 * @extends Axis
 */
declare class AxisY extends Axis {
    constructor(graph: Graph, leftright: "left" | "right", options: GraphAxisYOptions);
    forceWidth(width: any): this;
    /**
     *  @private
     */
    setAxisPosition(shift: any): void;
    getAxisPosition(): any;
    getAdditionalWidth(): number;
    /**
     *  @returns {Boolean} always ```false```
     */
    isX(): boolean;
    /**
     *  @returns {Boolean} always ```true```
     */
    isY(): boolean;
    /**
     *  @private
     */
    resetTicksLength(): void;
    /**
     *  @private
     */
    getMaxSizeTick(): any;
    draw(): number;
    equalizePosition(width: any): any;
    /**
     *  @private
     */
    drawTick(value: any, level: any, options: any, forcedPos: any): void;
    drawLabel(): void;
    placeLabel(y: any): void;
    /**
     *  @private
     */
    drawSpecifics(): void;
    /**
     *  @private
     */
    setShift(shift: any): void;
    /**
     *  @private
     */
    isLeft(): any;
    /**
     *  @private
     */
    isRight(): boolean;
    /**
     *  @private
     */
    isFlipped(): boolean;
    /**
     *  @private
     */
    _drawLine(pos: any, line: any): any;
    _hideLine(line: any): void;
    /**
     *  @private
     */
    handleMouseMoveLocal(x: any, y: any): void;
    /**
     * Scales the axis with respect to the series contained in an x axis
     * @param {Axis} [ axis = graph.getXAxis() ] - The X axis to use as a reference
     * @param {Serie} [ excludeSerie ] - A serie to exclude
     * @param {Number} [ start = xaxis.getCurrentMin() ] - The start of the boundary
     * @param {Number} [ end = xaxis.getCurrentMax() ] - The end of the boundary
     * @param {Boolean} [ min = true ] - Adapt the min
     * @param {Boolean} [ max = true ] - Adapt the max
     * @returns {Axis} The current axis
     */
    scaleToFitAxis(axis: any, excludeSerie: any, start: any, end: any, min: any, max: any): this;
    /**
     *  Caches the minimum px and maximum px position of the axis. Includes axis spans and flipping. Mostly used internally
     *  @return {Axis} The current axis instance
     */
    setMinMaxFlipped(): void;
    getZProj(zValue: any): number;
}
export default AxisY;
