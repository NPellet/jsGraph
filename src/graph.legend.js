import GraphPosition from './graph.position'
import * as util from "./graph.util"

/** 
 * Default legend configuration
 * @name LegendOptionsDefault
 * @object
 * @static
 * @prop {Boolean} frame - <code>true</code> to display a frame around the legend
 * @prop {Number} frameWidth - The width of the frame stroke
 * @prop {String} frameColor - The stroke color of the frame
 * @prop {String} backgroundColor - The background color of the frame
 * @prop {Number} paddingLeft - The left padding
 * @prop {Number} paddingRight - The right padding
 * @prop {Number} paddingTop - The top padding
 * @prop {Number} paddingBottom - The bottom padding
 * @prop {Boolean} shapesToggleable - <code>true</code> to toggle the shapes linked to serie with its status (shown or hidden)
 * @prop {Boolean} isSerieHideable - <code>true</code> to allow series to be hidden through the legend
 * @prop {Boolean} isSerieSelectable - <code>true</code> to allow series to be selected through the legend
 */
var legendDefaults = {

  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  frame: true,
  frameWidth: 1,
  frameColor: 'black',
  paddingTop: 10,
  paddingLeft: 10,
  paddingBottom: 10,
  paddingRight: 10,
  frameRounding: 0,

  movable: false,

  shapesToggleable: true,
  isSerieHideable: true,
  isSerieSelectable: true

};

/** 
 * Legend constructor. You should not call this method directly, but rather use {@link graph.makeLegend}
 * @example var legend = graph.makeLegend( {  backgroundColor: 'rgba(255, 255, 255, 0.8)',
 * frame: true,
 * frameWidth: 1,
 * frameColor: 'black',
 * paddingTop: 10,
 * paddingLeft: 10,
 * paddingBottom: 10,
 * paddingRight: 10,
 * frameRounding: 3,
 *
 * movable: false,
 *
 * shapesToggleable: true,
 * isSerieHideable: true,
 * isSerieSelectable: true
 * } );
 */
class Legend {

  constructor( graph, options ) {

    this.options = util.extend( {}, legendDefaults, options );

    this.graph = graph;
    this.svg = document.createElementNS( this.graph.ns, 'g' );
    this.subG = document.createElementNS( this.graph.ns, 'g' );

    this.groups = [];
    this.rect = document.createElementNS( this.graph.ns, 'rect' );
    this.rectBottom = document.createElementNS( this.graph.ns, 'rect' );

    this.rect.setAttribute( 'x', 0 );
    this.rect.setAttribute( 'y', 0 );

    this.rectBottom.setAttribute( 'x', 0 );
    this.rectBottom.setAttribute( 'y', 0 );

    this.series = false;

    this.svg.setAttribute( 'display', 'none' );
    this.pos = {
      x: undefined,
      y: undefined,
      transformX: 0,
      transformY: 0
    };

    this.setEvents();

    this.eyeId = util.guid();
    this.eyeCrossedId = util.guid();

    var eyeClosed = util.SVGParser( '<svg xmlns="http://www.w3.org/2000/svg"><symbol id="' + this.eyeCrossedId + '" viewBox="0 -256 1850 1850"><rect pointer-events="fill" fill="transparent" x="-256" y="0" width="2106" height="1850" /><g transform="matrix(1,0,0,-1,30.372881,1214.339)"><path d="m 555,201 78,141 q -87,63 -136,159 -49,96 -49,203 0,121 61,225 Q 280,812 128,576 295,318 555,201 z m 389,759 q 0,20 -14,34 -14,14 -34,14 -125,0 -214.5,-89.5 Q 592,829 592,704 q 0,-20 14,-34 14,-14 34,-14 20,0 34,14 14,14 14,34 0,86 61,147 61,61 147,61 20,0 34,14 14,14 14,34 z m 363,191 q 0,-7 -1,-9 Q 1201,954 991,576 781,198 675,9 l -49,-89 q -10,-16 -28,-16 -12,0 -134,70 -16,10 -16,28 0,12 44,87 Q 349,154 228.5,262 108,370 20,507 0,538 0,576 q 0,38 20,69 153,235 380,371 227,136 496,136 89,0 180,-17 l 54,97 q 10,16 28,16 5,0 18,-6 13,-6 31,-15.5 18,-9.5 33,-18.5 15,-9 31.5,-18.5 16.5,-9.5 19.5,-11.5 16,-10 16,-27 z m 37,-447 Q 1344,565 1265,450.5 1186,336 1056,286 l 280,502 q 8,-45 8,-84 z m 448,-128 q 0,-35 -20,-69 Q 1733,443 1663,362 1513,190 1315.5,95 1118,0 896,0 l 74,132 q 212,18 392.5,137 180.5,119 301.5,307 -115,179 -282,294 l 63,112 q 95,-64 182.5,-153 87.5,-89 144.5,-184 20,-34 20,-69 z" fill="#c0c0c0"></path></g></symbol></svg>' );
    //  var eyeClosed = util.SVGParser('<svg xmlns="http://www.w3.org/2000/svg"><symbol id="' + this.eyeId + '" viewBox="0 0 100 100"><rect fill="black" x="0" y="0" width="100" height="100" /></symbol></svg>');

    /* var eyeClosed = document.createElementNS( this.graph.ns, "symbol");
      eyeClosed.setAttribute('id', this.eyeId );
      eyeClosed.setAttribute("viewBox", '0 0 100 100');

      var rect = document.createElementNS( this.graph.ns, "rect" );
      rect.setAttribute('width', 100 );
      rect.setAttribute('height', 100 );
      rect.setAttribute('x', 0 );
      rect.setAttribute('y', 0 );
      rect.setAttribute('fill', 'black');
      eyeClosed.appendChild( rect );
  */
    var eye = util.SVGParser( '<svg xmlns="http://www.w3.org/2000/svg"><symbol id="' + this.eyeId + '" viewBox="0 -256 1850 1850"><rect pointer-events="fill" x="-256" y="0" fill="transparent" width="2106" height="1850" /><g transform="matrix(1,0,0,-1,30.372881,1259.8983)"><path d="m 1664,576 q -152,236 -381,353 61,-104 61,-225 0,-185 -131.5,-316.5 Q 1081,256 896,256 711,256 579.5,387.5 448,519 448,704 448,825 509,929 280,812 128,576 261,371 461.5,249.5 662,128 896,128 1130,128 1330.5,249.5 1531,371 1664,576 z M 944,960 q 0,20 -14,34 -14,14 -34,14 -125,0 -214.5,-89.5 Q 592,829 592,704 q 0,-20 14,-34 14,-14 34,-14 20,0 34,14 14,14 14,34 0,86 61,147 61,61 147,61 20,0 34,14 14,14 14,34 z m 848,-384 q 0,-34 -20,-69 Q 1632,277 1395.5,138.5 1159,0 896,0 633,0 396.5,139 160,278 20,507 0,542 0,576 q 0,34 20,69 140,229 376.5,368 236.5,139 499.5,139 263,0 499.5,-139 236.5,-139 376.5,-368 20,-35 20,-69 z" fill="#444444" /></g></symbol></svg>' );

    this.svg.appendChild( document.adoptNode( eye.documentElement.firstChild ) );
    this.svg.appendChild( document.adoptNode( eyeClosed.documentElement.firstChild ) );

    this.svg.appendChild( this.subG );

    this.applyStyle();
  }

  /** 
   * Sets the position of the legend
   * @param {Position} position - the position to set the legend to versus the graph main axes ({@link Graph#getXAxis} and {@link Graph#getYAxis})
   * @param {String} alignToX - "right" or "left". References the legend right or left boundary using the position parameter
   * @param {String} alignToY - "top" or "bottom". References the legend top or bottom boundary using the position parameter
   * @example legend.setPosition( { x: 'max', y: '0px' }, 'right', 'top' ); // The rightmost side of the legend will at the maximum value of the axis, and will be positioned at the top
   */
  setPosition( position, alignToX, alignToY ) {

    if ( !position ) {
      return;
    }

    this.position = position;
    this.alignToX = alignToX || 'left';
    this.alignToY = alignToY ||  'top';

  }

  setDraggable( bln ) {
    this.options.movable = bln;

  }

  setAutoPosition( position ) {

    if ( [ 'bottom', 'left', 'top', 'right' ].indexOf( ( position = position.toLowerCase() ) ) > -1 ) {
      this.autoPosition = position;
      return this;
    }

    this.requireDelayedUpdate();
    this.autoPosition = false;
  }

  autoPosition() {
    return this.setAutoPosition( ...arguments );
  }

  buildLegendBox() {

    var series = this.series || this.graph.getSeries(),
      posX = 0,
      posY = this.options.paddingTop;

    if ( !this.autoPosition ) {
      this.graph.graphingZone.appendChild( this.getDom() );
    } else {
      this.graph.getDom().appendChild( this.getDom() );
    }

    for ( var i = 0, l = series.length; i < l; i++ ) {

      if ( series[  i ].excludedFromLegend && !this.series ) {
        continue;
      }

      if ( this.autoPosition == 'bottom' || this.autoPosition == 'top' ) {

        var bbox = getBBox( this.groups[ i ] );

        if ( posX + bbox.width > this.graph.getDrawingWidth() - this.options.paddingRight ) {
          posY += 16;
          posX = 0;
        }
      }

      this.groups[ i ].setAttribute( 'transform', "translate( " + posX + ", " + posY + ")" );

      if ( this.autoPosition == 'bottom' ||  this.autoPosition == 'top' ) {

        posX += bbox.width + 10;
        posY += 0;

      } else {

        posX = 0;
        posY += 16;
      }
    }

    var bbox = getBBox( this.subG );

    /* Independant on box position */
    this.width = bbox.width + this.options.paddingRight + this.options.paddingLeft;
    this.height = bbox.height + this.options.paddingBottom + this.options.paddingTop;

    this.rect.setAttribute( 'width', this.width );
    this.rect.setAttribute( 'height', this.height );
    this.rect.setAttribute( 'fill', 'none' );
    this.rect.setAttribute( 'pointer-events', 'fill' );

    this.rect.setAttribute( 'display', 'none' );

    if ( this.options.movable ) {
      this.rectBottom.style.cursor = "move";
    }

    this.rectBottom.setAttribute( 'width', this.width );
    this.rectBottom.setAttribute( 'height', this.height );

    this.rectBottom.setAttribute( 'x', bbox.x - this.options.paddingLeft );
    this.rectBottom.setAttribute( 'y', bbox.y - this.options.paddingTop );
    /* End independant on box position */

    this.position = this.position || {};

    switch ( this.autoPosition ) {

      case 'bottom':
        this.position.y = this.graph.getHeight() + "px";
        this.position.x = ( ( this.graph.getWidth() - this.width ) / 2 ) + "px";
        this.alignToY = "bottom";
        this.alignToX = false;
        break;

      case 'left':
        this.position.x = "6px";
        this.position.y = ( ( this.graph.getHeight() - this.height ) / 2 ) + "px";
        this.alignToX = "left";
        this.alignToY = false;
        break;

      case 'right':
        this.position.x = this.graph.getWidth() + "px";
        this.position.y = ( ( this.graph.getHeight() - this.height ) / 2 ) + "px";
        this.alignToX = "right";
        this.alignToY = false;
        break;

      case 'top':
        this.position.x = ( ( this.graph.getWidth() - this.width ) / 2 ) + "px";
        this.position.y = "10px";
        this.alignToY = "top";
        this.alignToX = false;
        break;
    }

    if ( this.autoPosition ) {
      switch ( this.autoPosition ) {

        case 'bottom':
          this.graph.options.paddingBottom = this.height + 10;
          break;

        case 'left':
          this.graph.options.paddingLeft = this.width + 5;
          break;

        case 'right':
          this.graph.options.paddingRight = this.width + 10;
          break;

        case 'top':
          this.graph.options.paddingTop = this.height + 14;
          break;
      }

      this.graph.updateGraphingZone();
      this.graph.getDrawingHeight();
      this.graph.getDrawingWidth();
      // this.graph.redraw( false );

    }

    this.bbox = bbox;
  }

  calculatePosition() {

    var pos = GraphPosition.check( this.position );
    let poscoords = pos.compute( this.graph, this.graph.getXAxis(), this.graph.getYAxis() );

    if ( !poscoords ) {
      return;
    }

    if ( this.alignToX == "right" ) {
      poscoords.x -= this.width;
      poscoords.x += this.bbox.x;
    } else {
      //poscoords.x -= this.bbox.x;
    }

    if ( this.alignToY == "bottom" ) {
      poscoords.y -= this.height;
      poscoords.y += this.bbox.y;

    } else {
      poscoords.y += this.bbox.y;
    }

    this.pos.transformX = poscoords.x;
    this.pos.transformY = poscoords.y;

    this._setPosition();

  }

  /** 
   * Updates the legend position and content
   */
  update( onlyIfRequired ) {

    if ( this.graph.isDelayedUpdate() ||  ( !this._requiredUpdate && onlyIfRequired ) ) {
      return;
    }

    this._requiredUpdate = false;

    var self = this;

    this.applyStyle();

    while ( this.subG.hasChildNodes() ) {
      this.subG.removeChild( this.subG.lastChild );
    }

    this.svg.insertBefore( this.rectBottom, this.svg.firstChild );

    var series = this.series || this.graph.getSeries(),
      line,
      text,
      g;

    if ( series.length > 0 )  {
      this.svg.setAttribute( 'display', 'block' );
    } else {
      return;
    }

    if ( this.autoPosition == 'bottom' ||  this.autoPosition == 'top' ) {
      var fullWidth = this.graph.getDrawingWidth();
    }

    var posX, posY;

    for ( var i = 0, l = series.length; i < l; i++ ) {

      if ( series[  i ].excludedFromLegend && !this.series ) {
        continue;
      }

      ( function( j ) {

        var g, line, text, xPadding = 0;

        if ( this.autoPosition == 'bottom' ||  this.autoPosition == 'top' ) {
          var fullWidth = this.graph.getDrawingWidth();
        }

        g = document.createElementNS( self.graph.ns, 'g' );
        var rect = document.createElementNS( self.graph.ns, 'rect' );

        self.subG.appendChild( g );

        g.appendChild( rect );

        var line = series[ j ].getSymbolForLegend();
        var marker = series[ j ].getMarkerForLegend();
        var text = series[ j ].getTextForLegend();

        var dx = 35;

        if ( this.isHideable() ) {
          dx += 20;

          var eyeUse = document.createElementNS( self.graph.ns, "use" );
          eyeUse.setAttributeNS( 'http://www.w3.org/1999/xlink', "xlink:href", "#" + this.eyeId );
          eyeUse.setAttribute( "width", 15 );
          eyeUse.setAttribute( "height", 15 );
          eyeUse.setAttribute( "x", 35 );
          eyeUse.setAttribute( "y", -8 );

          eyeUse.addEventListener( "click", function( e ) {
            e.stopPropagation();

            var id;
            if ( series[ j ].isShown() ) {
              series[ j ].hide();
              id = self.eyeCrossedId;
            } else {
              series[ j ].show();
              id = self.eyeId;
            }

            eyeUse.setAttributeNS( 'http://www.w3.org/1999/xlink', "xlink:href", "#" + id );

          } );

        }

        text.setAttribute( 'transform', 'translate(' + dx + ', 3)' );

        if ( line ) {
          g.appendChild( line );
        }

        if ( series[ j ].getType() == "scatter" ) {
          line.setAttribute( 'transform', 'translate( 20, 0 )' );
        }

        if ( marker ) {
          g.appendChild( marker );
        }

        if ( eyeUse ) {
          g.appendChild( eyeUse );
        }

        g.appendChild( text );

        var bbox = getBBox( g );

        rect.setAttribute( 'x', bbox.x );
        rect.setAttribute( 'y', bbox.y );
        rect.setAttribute( 'width', bbox.width );
        rect.setAttribute( 'height', bbox.height );
        rect.setAttribute( 'fill', 'none' );
        rect.setAttribute( 'pointer-events', 'fill' );

        self.groups[ j ] = g;

        g.addEventListener( 'click', function( e ) {

          var serie = series[ j ];

          if ( self.isSelectable() && !serie.isSelected() ) {

            self.graph.selectSerie( serie );
          } else {

            self.graph.unselectSerie( serie );
          }

          e.preventDefault();
          e.stopPropagation();

        } );

      } ).call( this, i );
    }

    this.svg.appendChild( this.rect );
    this.buildLegendBox();
    this.calculatePosition();

  }

  /** 
   * @return {Boolean} true or false depending if the series can be hidden or not
   */
  isHideable() {
    return this.options.isSerieHideable;
  }

  notHideable() {
    this.options.isSerieHideable = false;
    return this;
  }

  hideable() {
    this.options.isSerieHideable = true;
    return this;
  }

  set seriesHideable( hideable ) {
    this.options.isSerieHideable = !!hideable;
  }

  /**
   *  @type {Boolean}
   */
  get seriesHideable() {
    return this.options.isSerieHideable;
  }

  /** 
   * @return {Boolean} true or false depending if the series can be selected or not
   */
  isSelectable() {
    return this.options.isSerieSelectable;
  }

  /** 
   * @return {Boolean} true or false depending if the series can be t or not
   */
  isToggleShapes() {
    return this.options.shapesToggleable;
  }

  /** 
   * @return {SVGGroupElement} The SVG group element wrapping the legend
   */
  getDom() {
    return this.svg;
  }

  setEvents() {

    var self = this;
    var pos = this.pos;

    var mousedown = function( e ) {

      e.stopPropagation();
      console.log( "down" );
      if ( self.options.movable ) {
        pos.x = e.clientX;
        pos.y = e.clientY;

        e.preventDefault();
        self.mousedown = true;
        self.graph.elementMoving( self );

        self.rect.setAttribute( 'display', 'block' );
      }
    };

    var mousemove = function( e ) {
      self.handleMouseMove( e );
    };

    this.svg.addEventListener( 'mousedown', mousedown );
    this.svg.addEventListener( 'click', function( e ) {
      e.stopPropagation();
    } );
    this.svg.addEventListener( 'dblclick', function( e ) {
      e.stopPropagation();
    } );
    this.svg.addEventListener( 'mousemove', mousemove );
    //this.rect.addEventListener( 'mousemove', mousemove );
  }

  handleMouseUp( e ) {

    e.stopPropagation();
    e.preventDefault();
    this.mousedown = false;
    this.rect.setAttribute( 'display', 'none' );
    this.graph.elementMoving( false );
  }

  handleMouseMove( e ) {

    if ( !this.mousedown ) {
      return;
    }

    var pos = this.pos;

    var deltaX = e.clientX - pos.x;
    var deltaY = e.clientY - pos.y;

    pos.transformX += deltaX;
    pos.transformY += deltaY;

    pos.x = e.clientX;
    pos.y = e.clientY;

    e.stopPropagation();
    e.preventDefault();

    this._setPosition();
  }

  _setPosition() {

    var pos = this.pos;
    if ( !isNaN( pos.transformX ) && !isNaN( pos.transformY ) && pos.transformX !== false && pos.transformY !== false ) {
      this.svg.setAttribute( 'transform', 'translate(' + pos.transformX + ', ' + pos.transformY + ')' );
    }
  }

  /** 
   * Re-applies the legend style
   */
  applyStyle() {

    if ( this.options.frame ) {
      this.rectBottom.setAttribute( 'stroke', this.options.frameColor );
      this.rectBottom.setAttribute( 'stroke-width', this.options.frameWidth + "px" );
      this.rectBottom.setAttribute( 'rx', this.options.frameRounding );
      this.rectBottom.setAttribute( 'ry', this.options.frameRounding );
    }

    this.rectBottom.setAttribute( 'fill', this.options.backgroundColor );

  }

  /** 
   * Re-applies the legend style
   * @param {...(GraphSerie|GraphSerie[])} a serie or an array of series
   */
  fixSeries() {
    var series = [];

    if ( arguments[ 0 ] === false ) {
      this.series = false;
      this.update();
      return;
    }

    for ( var i = 0, l = arguments.length; i < l; i++ ) {
      if ( Array.isArray( arguments[  i ] ) ) {
        series = series.concat( arguments[  i ] );
      } else {
        series.push( arguments[  i ] );
      }
    }

    this.update();
    this.series = series;
  }

  fixSeriesAdd( serie ) {
    this.series = this.series || [];
    this.series.push( serie );
  }

  requireDelayedUpdate() {
    this._requiredUpdate = true;
  }

}

function getBBox( svgElement ) {
  // Firefox throws when trying to call getBBox() on elements
  // that are not yet rendered.
  try {
    return svgElement.getBBox();
  } catch ( e ) {
    return {
      height: 0,
      width: 0,
      x: 0,
      y: 0
    };
  }
}

export default Legend;