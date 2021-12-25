export type SerieStyle = {
    [x: string]: any
}

export const SERIE_DEFAULT_STYLE = {
    line: {
        color: 'black'
    }
};


export enum SERIE_TYPE {
    LINE = "line",
    LINE_3D = "line3d",
    LINE_COLORED = 'line_colored',
    CONTOUR = 'contour',
    BAR = 'bar',
    BOX = 'box',
    SCATTER = 'scatter',
    ZONE = 'zone',
    ZONE_3D = 'zone3d',
    DENSITY_MAP = 'densitymap',
    HISTOGRAM = "HISTOGRAM"
}


export interface SerieInterface {
    getType(): SERIE_TYPE
}

export type SerieOptions = {
    redrawShapesAfterDraw: boolean,
    bindShapesToDisplayState: boolean,
    label: string,
    flip: boolean,
    layer: number,

    tracking: any
}
