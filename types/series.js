export const SERIE_DEFAULT_STYLE = {
    line: {
        color: 'black'
    }
};
export var SERIE_TYPE;
(function (SERIE_TYPE) {
    SERIE_TYPE["LINE"] = "line";
    SERIE_TYPE["LINE_3D"] = "line3d";
    SERIE_TYPE["LINE_COLORED"] = "line_colored";
    SERIE_TYPE["CONTOUR"] = "contour";
    SERIE_TYPE["BAR"] = "bar";
    SERIE_TYPE["BOX"] = "box";
    SERIE_TYPE["SCATTER"] = "scatter";
    SERIE_TYPE["ZONE"] = "zone";
    SERIE_TYPE["ZONE_3D"] = "zone3d";
    SERIE_TYPE["DENSITY_MAP"] = "densitymap";
    SERIE_TYPE["HISTOGRAM"] = "HISTOGRAM";
})(SERIE_TYPE || (SERIE_TYPE = {}));
