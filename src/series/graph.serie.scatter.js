import * as util from '../graph.util.js';
import ErrorBarMixin from '../mixins/graph.mixin.errorbars.js';

import Serie from './graph.serie.js';

const defaults = {};

var type = 'scatter';

const defaultOptions = {
  markers: true,

  markerStyles: {
    unselected: {
      default: {
        shape: 'circle',
        cx: 0,
        cy: 0,
        r: 3,
        stroke: 'transparent',
        fill: 'black'
      }
    },

    selected: {
      default: {
        r: 4
      }
    }
  }
};

/**
 * @static
 * @augments Serie
 * @example graph.newSerie( name, options, "scatter" );
 * @see Graph#newSerie
 */
class SerieScatter extends Serie {
  constructor(graph, name, options, defaultInherited) {
    super(
      graph,
      name,
      options,
      util.extend(true, {}, defaultOptions, defaultInherited)
    );

    this._type = type;
    util.mapEventEmission(this.options, this);

    this.shapes = []; // Stores all shapes
    this.shapesDetails = [];
    this.keys = [];
    this.styleAttributes = [];
    this.stylesNames = undefined;

    this.groupMarkers = document.createElementNS(this.graph.ns, 'g');
    this.groupMain.appendChild(this.groupMarkers);

    //    this.selectedStyleGeneral = {};
    //    this.selectedStyleModifiers = {};
    if (this.options.markerStyles) {

      for (let i in this.options.markerStyles) {
        this.setStyle({ markers: this.options.markerStyles[i] }, i, "unselected");
      }
    }

    this.groupMarkers.addEventListener(
      'mouseenter',
      (e) => {
        var id = parseInt(e.target.parentElement.getAttribute('data-shapeid'));
        if (isNaN(id)) {
          return;
        }

        if (this.options.selectMarkerOnHover) {
          this.selectMarker(id, 'selected');
        }

        this.emit(
          'mouseOverMarker',
          id,
          this.waveform.getX(id),
          this.waveform.getY(id)
        );
      },
      true
    );

    this.groupMarkers.addEventListener('mouseout', (e) => {
      var id = parseInt(e.target.parentElement.getAttribute('data-shapeid'));
      if (isNaN(id)) {
        return;
      }

      if (this.options.selectMarkerOnHover) {
        this.selectMarker(id, 'unselected');
      }

      this.emit(
        'mouseOutMarker',
        id,
        this.waveform.getX(id),
        this.waveform.getY(id)
      );
    });
  }

  /**
   * Applies for x as the category axis
   * @example serie.setDataCategory( { x: "someName", y: Waveform } );
   */
  setDataCategory(data) {
    let minY = +Infinity;
    let maxY = -Infinity;

    for (let dataCategory of data) {
      this._checkY(dataCategory.y.getMaxY());
      this._checkY(dataCategory.y.getMinY());
    }

    this.data = data;
    this.dataHasChanged();
    this.graph.updateDataMinMaxAxes();
    return this;
  }

  /**
   * Removes all DOM points
   * @private
   */
  empty() {
    while (this.groupMarkers.firstChild) {
      this.groupMarkers.removeChild(this.groupMarkers.firstChild);
    }
  }

  getSymbolForLegend() {
    if (!this.options.markers) {
      return;
    }

    const container = super._getSymbolForLegendContainer();

    var style = this.getMarkerStyle(-1, true)["-1"];


    if (!style || !style.shape) {
      return;
    }

    if (!this.shapeLegend) {
      this.shapeLegend = this._makeMarker(
        container,
        style
      );
      container.appendChild(this.shapeLegend);
    }

    for (var i in style) {
      if (i == 'shape') {
        continue;
      }
      this.shapeLegend.setAttribute(i, style[i]);
    }

    return container;
  }

  // setStyle( style, styleName = 'unselected' ) {
  //   return this.setMarkerStyle( style, undefined, styleName );
  //}

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
  setMarkerStyle(all, modifiers, mode = 'unselected', modeInherit = 'unselected') {
    if (typeof modifiers == 'string') {
      mode = modifiers;
      modifiers = false;
    }

    let o = { markers: { all, modifiers } };

    this.setStyle(o, mode, modeInherit);
    this.styleHasChanged(mode);

    return this;
  }


  setIndividualStyleNames(p) {
    this.stylesNames = p;
  }


  /**
   * Redraws the serie
   * @private
   * @param {force} Boolean - Forces redraw even if the data hasn't changed
   */
  draw(force) {
    // Serie redrawing

    if (
      (!force &&
        !this.hasDataChanged() &&
        !this.hasStyleChanged('unselected')) ||
      !this.options.markers
    ) {
      return;
    }

    let xpx, ypx, j, k, m;

    if (!this.isCategory && !this.waveform) {
      return;
    }

    const isCategory = this.getXAxis().getType() == 'category';
    const keys = [];

    this.dataHasChanged(false);
    this.styleHasChanged(false);

    // Removes the marker group from the main DOM for operation (avoids browser repaint)
    this.groupMain.removeChild(this.groupMarkers);

    j = 0;
    k = 0;

    if (this.hasErrors()) {
      this.errorDrawInit();
    }
    if (isCategory) {
      let k = 0;

      for (; j < this.data.length; j++) {
        if (!this.categoryIndices.hasOwnProperty(this.data[j].x)) {
          continue;
        }

        if (this.error) {
          //   this.errorAddPoint( j, position[ 0 ] + position[ 1 ] / 2, 0, this.getX( position[ 0 ] + position[ 1 ] / 2 ), ypx );
        }

        for (var n = 0, l = this.data[j].y.getLength(); n < l; n++) {
          //let xpos = i / ( l - 1 ) * ( position[ 1 ] ) + position[ 0 ];

          ypx = this.getY(this.data[j].y.getY(n));
          xpx = this.getX(
            (n / (l - 1)) * (0.8 / this.nbCategories) +
            this.categoryIndices[this.data[j].x] +
            0.1 / this.nbCategories
          );
          n++;

          this.shapesDetails[k] = this.shapesDetails[k] || [];
          this.shapesDetails[k][0] = xpx;
          this.shapesDetails[k][1] = ypx;
          keys.push(k);
          k++;
        }
      }
    } else {

      for (; j < this.waveform.getLength(); j++) {
        if (
          this.waveform.getX(j) < this.getXAxis().getCurrentMin() ||
          this.waveform.getX(j) > this.getXAxis().getCurrentMax() ||
          this.waveform.getY(j) < this.getYAxis().getCurrentMin() ||
          this.waveform.getY(j) > this.getYAxis().getCurrentMax()
        ) {
          if (this.shapes[j]) {
            this.shapes[j].setAttribute('display', 'none');
            this.shapes[j]._hidden = true;
          }
          continue;
        } else if (this.shapes[j] && this.shapes[j]._hidden) {
          this.shapes[j].setAttribute('display', 'initial');
          this.shapes[j]._hidden = false;
        }

        xpx = this.getX(this.waveform.getX(j));
        ypx = this.getY(this.waveform.getY(j));

        if (isNaN(xpx) || isNaN(ypx)) {
          if (this.shapes[j]) {
            this.shapes[j].setAttribute('display', 'none');
            this.shapes[j]._hidden = true;
          }
          continue;
        } else if (this.shapes[j] && this.shapes[j]._hidden) {
          this.shapes[j].setAttribute('display', 'initial');
          this.shapes[j]._hidden = false;
        }

        if (this.hasErrors()) {
          this.errorAddPoint(
            j,
            this.waveform.getX(j),
            this.waveform.getY(j),
            xpx,
            ypx
          );
        }

        this.shapesDetails[j] = this.shapesDetails[j] || [];
        this.shapesDetails[j][0] = xpx;
        this.shapesDetails[j][1] = ypx;
        keys.push(j);
        //this.shapes[ j / 2 ] = this.shapes[ j / 2 ] || undefined;
      }
    }

    if (this.hasErrors()) {
      this.errorDraw();
    }

    // This will automatically create the shapes
    this.applyMarkerStyle(keys);
    this.keys = keys;
    this.groupMain.appendChild(this.groupMarkers);
  }

  _makeMarker(group, shape) {
    var el = document.createElementNS(this.graph.ns, shape.shape);
    group.appendChild(el);
    return el;
  }

  getMarkerStyle(indices, noSetPosition) {

    this.computeStyles();

    const stylesNames = this.stylesNames;
    const isStylesNamesF = typeof stylesNames == "function";

    const computedStyles = this.getComputedStyles();
    var indices;

    var styles = {};
    let _indices;
    if (!Array.isArray(indices)) {
      _indices = [indices];
    } else {
      _indices = indices;
    }

    let styleAll = [], shape, index, modifier, style, j; // loop variables
    for (let i in computedStyles) {

      if (!computedStyles[i].markers) {
        continue;
      }

      if (typeof computedStyles[i].markers.all == 'function') {
        styleAll[i] = computedStyles[i].markers.all();
      } else {
        styleAll[i] = { ...computedStyles[i].markers.all };
      }

      if (computedStyles[i].markers.default) {
        styleAll[i] = { ...computedStyles[i].markers.default, ...styleAll[i] };
      }
    }
    // console.log(_indices);
    for (let i = 0, l = _indices.length; i < l; i++) {

      let sName;
      if (stylesNames) {

        if (isStylesNamesF) {
          sName = stylesNames(this, i);
        } else if (Array.isArray(stylesNames)) {
          sName = stylesNames[i];
        } else {
          sName = this.getActiveStyleName();
        }

      } else {
        sName = this.getActiveStyleName();
      }

      if (!styleAll[sName]) {
        continue;
      }


      let modifier = this.getRawStyle(sName).markers?.modifiers;
      let modifierIsFunc = typeof modifier == 'function';
      index = _indices[i];
      shape = this.shapes[index];
      if (modifier && (modifierIsFunc || modifier[index])) {
        let modifiedStyle;
        if (modifierIsFunc) {
          modifiedStyle = modifier.call(
            this,
            this.waveform.getX(index),
            this.waveform.getY(index),
            index,
            shape,
            styleAll
          );

          if (modifiedStyle === false) {
            modifiedStyle = {};

            if (shape) {
              shape.setAttribute('display', 'none');
              //    console.log('n');
              continue;
            } else {
            }
          } else {
            //     console.log(index, indices);
          }
        } else if (modifier[index]) {
          modifiedStyle = modifier[index];
        }


        styles[index] = { ...styleAll[sName], ...modifiedStyle };

      } else {
        styles[index] = styleAll[sName];
      }

      if (!shape) {
        // Shape doesn't exist, let's create it

        if (!styles[index].shape) {
          continue;
          throw `No shape was defined with the style "${style}".`;
        }

        var g = document.createElementNS(this.graph.ns, 'g');
        g.setAttribute('data-shapeid', index);
        console.log("make");
        this.shapes[index] = this._makeMarker(g, styles[index]);
        this.groupMarkers.appendChild(g);
        shape = this.shapes[index];
      }

      if (
        !noSetPosition &&
        this.shapesDetails[index][0] === this.shapesDetails[index][0] &&
        this.shapesDetails[index][1] === this.shapesDetails[index][1]
      ) {
        shape.parentNode.setAttribute(
          'transform',
          `translate(${this.shapesDetails[index][0]}, ${this.shapesDetails[index][1]
          })`
        );
      }
    }

    return styles;
  }

  applyMarkerStyle(indices, noSetPosition) {
    var i, j;
    var styles = this.getMarkerStyle(indices, noSetPosition);
    this.styleAttributes[i] = this.styleAttributes[i] || [];

    for (i in styles) {

      if (this.styleAttributes[i]) {
        for (j in this.styleAttributes[i]) {

          if (!styles[i] || styles[i][j] != this.styleAttributes[i][j]) {
            this.shapes[i].removeAttribute(j);
            delete (this.styleAttributes[i]);
          }
        }
      }

      for (j in styles[i]) {
        if (j !== 'shape' && this.shapes[i]) {
          if (styles[i][j] && (!this.styleAttributes[i] || styles[i][j] != this.styleAttributes[i][j])) {
            // console.log(i, styles[i][j]);
            this.shapes[i].setAttribute(j, styles[i][j]);
          }
        }
      }

      this.styleAttributes[i] = styles[i];
    }
  }

  unselectMarker(index) {
    this.selectMarker(index, false);
  }

  selectMarker(index, setOn, selectionType) {
    if (
      this.shapesDetails[index][2] &&
      this.shapesDetails[index][2] == selectionType
    ) {
      return;
    }

    if (typeof setOn == 'string') {
      selectionType = setOn;
      setOn = undefined;
    }

    if (Array.isArray(index)) {
      return this.selectMarkers(index);
    }

    if (this.shapes[index] && this.shapesDetails[index]) {
      if ((this.shapesDetails[index][2] || setOn === false) && setOn !== true) {
        var selectionStyle = this.shapesDetails[index][2];


        var allStyles = this.getMarkerStyle(index, true);
        for (var i in allStyles[index]) {
          this.shapes[index].removeAttribute(i);
        }
        this.shapesDetails[index][2] = false;
        this.applyMarkerStyle(index, true);

      } else {

        selectionType = selectionType || 'selected';
        this.shapesDetails[index][2] = selectionType;
        this.applyMarkerStyle(index, true);

      }
    }
  }
  /*
    select(selectionType) {
   
      this.setActiveStyle('selected');
   
      this.applyMarkerStyle(this.keys);
      super.select(selectionType);
    }
   
    unselect() {
      this.setActiveStyle('unselected');
      this.applyMarkerStyle(this.keys);
   
      super.unselect();
    }
  */

  applyStyle() {
    this.applyMarkerStyle(this.keys);
    super.applyStyle();
  }

  setMarkers(bln = true) {
    this.options.markers = bln;

    return this;
  }

  showMarkers() {
    if (this.options.markers) {
      return;
    }

    this.options.markers = true;
    this.groupMarkers.setAttribute('display', 'initial');

    if (this.shapeLegend) {
      this.shapeLegend.setAttribute('display', 'initial');
    }

    return this;
  }

  hideMarkers() {
    if (!this.options.markers) {
      return;
    }

    this.options.markers = false;
    this.groupMarkers.setAttribute('display', 'none');

    if (this.shapeLegend) {
      this.shapeLegend.setAttribute('display', 'none');
    }
    return this;
  }

  getUsedCategories() {
    if (typeof this.data[0] == 'object') {
      return this.data.map((d) => d.x);
    }

    return [];
  }

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
      xMax: xValAllowed,
      yMax: yValAllowed,
      interpolation: false,
      scaleX: !usePx ? 1 : 1 / this.getXAxis().getRelVal(1),
      scaleY: !usePx ? 1 : 1 / this.getYAxis().getRelVal(1)
    });

    return {

      indexBefore: closestPointIndex,
      indexAfter: closestPointIndex,

      xBefore: this.waveform.getX(closestPointIndex),
      xAfter: this.waveform.getX(closestPointIndex),
      yBefore: this.waveform.getY(closestPointIndex),
      yAfter: this.waveform.getX(closestPointIndex),

      xExact: valX,

      indexClosest: closestPointIndex,
      interpolatedY: this.waveform.getY(closestPointIndex),

      xClosest: this.waveform.getX(closestPointIndex),
      yClosest: this.waveform.getY(closestPointIndex)
    };
  }
}

util.mix(SerieScatter, ErrorBarMixin);

export default SerieScatter;