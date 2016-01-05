define( [ "./graph.position" ], function( GraphPosition ) {

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
    frameRounding: 3,

    movable: false,

    shapesToggleable: true,
    isSerieHideable: true,
    isSerieSelectable: true

  }

  /** 
   * Legend constructor
   * @class Legend
   * @private
   * @example var legend = graph.makeLegend( {} );
   */
  var Legend = function( graph, options ) {

    this.options = $.extend( {}, legendDefaults, options );

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

    this.svg.appendChild( this.subG );

    this.svg.setAttribute( 'display', 'none' );
    this.pos = {
      x: undefined,
      y: undefined,
      transformX: 0,
      transformY: 0
    }

    this.setEvents();

    this.applyStyle();
  };

  Legend.prototype = {

    /** 
     * Sets the position of the legend
     * @param {Position} position - the position to set the legend to versus the graph main axes ({@link Graph#getXAxis} and {@link Graph#getYAxis})
     * @param {String} alignToX - "right" or "left". References the legend right or left boundary using the position parameter
     * @param {String} alignToY - "top" or "bottom". References the legend top or bottom boundary using the position parameter
     * @example legend.setPosition( { x: 'max', y: '0px' }, 'right', 'top' ); // The rightmost side of the legend will at the maximum value of the axis, and will be positioned at the top
     * @memberof Legend.prototype
     */
    setPosition: function( position, alignToX, alignToY ) {

      if ( !position ) {
        return;
      }

      this.position = position;
      this.alignToX = alignToX;
      this.alignToY = alignToY;

    },

    setDraggable: function( bln ) {
      this.options.movable = bln;

    },

    setAutoPosition: function( position ) {

      if ( [ 'bottom', 'left', 'top', 'right' ].indexOf( ( position = position.toLowerCase() ) ) > -1 ) {
        this.autoPosition = position;
        return this;
      }

      this.autoPosition = false;
    },

    calculatePosition: function() {

      if ( !this.autoPosition ) {
        this.graph.graphingZone.appendChild( this.getDom() );
      } else {
        this.graph.getDom().appendChild( this.getDom() );
      }

      var series = this.series || this.graph.getSeries(),
        posX = 0,
        posY = this.options.paddingTop;

      for ( var i = 0, l = series.length; i < l; i++ ) {

        if ( !series[  i ].isInLegend() && !this.series ) {
          continue;
        }

        if ( this.autoPosition == 'bottom' ||  this.autoPosition == 'top' ) {

          var bbox = this.groups[ i ].getBBox();

          if ( posX + bbox.width > this.graph.getDrawingWidth() - this.options.paddingRight ) {
            posY += 16;
            posX = 0;
          }
        }

        this.groups[  i ].setAttribute( 'transform', "translate( " + posX + ", " + posY + ")" );

        if ( this.autoPosition == 'bottom' ||  this.autoPosition == 'top' ) {

          posX += bbox.width + 10;
          posY += 0;

        } else {

          posX = 0;
          posY += 16;
        }
      }

      var bbox = this.subG.getBBox();

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

      this.rectBottom.setAttribute( 'x', bbox.x - this.options.paddingTop );
      this.rectBottom.setAttribute( 'y', bbox.y - this.options.paddingLeft );
      /* End independant on box position */

      this.position = this.position || {};

      switch ( this.autoPosition ) {

        case 'bottom':
          this.position.y = this.graph.getHeight() + "px";
          this.position.x = ( ( this.graph.getWidth() - this.width ) / 2 ) + "px"
          this.alignToY = "bottom";
          this.alignToX = false;
          break;

        case 'left':
          this.position.x = "6px";
          this.position.y = ( ( this.graph.getHeight() - this.height ) / 2 ) + "px"
          this.alignToX = "left";
          this.alignToY = false;
          break;

        case 'right':
          this.position.x = this.graph.getWidth() + "px";
          this.position.y = ( ( this.graph.getHeight() - this.height ) / 2 ) + "px"
          this.alignToX = "right";
          this.alignToY = false;
          break;

        case 'top':
          this.position.x = ( ( this.graph.getWidth() - this.width ) / 2 ) + "px"
          this.position.y = "10px";
          this.alignToY = "top";
          this.alignToX = false;
          break;
      }

      var pos = new GraphPosition( this.position ),
        alignToY = this.alignToY,
        alignToX = this.alignToX;

      pos = pos.compute( this.graph, this.graph.getXAxis(), this.graph.getYAxis() );

      if ( !pos ) {
        return;
      }

      if ( alignToX == "right" ) {
        pos.x -= this.width;
      }

      if ( alignToY == "bottom" ) {
        pos.y -= this.height;
      }

      this.pos.transformX = pos.x;
      this.pos.transformY = pos.y;

      this._setPosition();

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

      }
    },

    /** 
     * Updates the legend position and content
     * @memberof Legend.prototype
     */
    update: function() {

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

        if ( !series[  i ].isInLegend() && !this.series ) {
          continue;
        }

        ( function( j ) {

          var g, line, text, xPadding = 0;

          if ( this.autoPosition == 'bottom' ||  this.autoPosition == 'top' ) {
            var fullWidth = this.graph.getDrawingWidth();
          }

          g = document.createElementNS( self.graph.ns, 'g' );
          self.subG.appendChild( g );
          var line = series[ j ].getSymbolForLegend();
          var marker = series[ j ].getMarkerForLegend();
          var text = series[ j ].getTextForLegend();
          g.appendChild( line );

          if ( series[ i ].getType() == "scatter" ) {
            line.setAttribute( 'transform', 'translate( 20, 0 )' );
          }

          if ( marker ) {
            g.appendChild( marker );
          }

          g.appendChild( text );

          self.groups[ j ] = g;

          g.addEventListener( 'click', function( e ) {

            var serie = series[ j ];

            if ( serie.isShown() && self.isHideable() ) {

              if ( self.isSelectable() && !serie.isSelected() ) {

                self.graph.selectSerie( serie );
              } else {

                serie.hide( self.isToggleShapes() );
                serie.unselect();
              }
            } else if ( !serie.isShown() && self.isHideable() ) {

              serie.show();
            } else {

              if ( self.isSelectable() ) {

                if ( serie.isSelected() ) {
                  self.graph.unselectSerie( serie );
                } else {
                  self.graph.selectSerie( serie );
                }
              }
            }

          } );

        } ).call( this, i );
      }

      this.svg.appendChild( this.rect );
      this.calculatePosition();
    },

    /** 
     * @memberof Legend.prototype
     * @return {Boolean} true or false depending if the series can be hidden or not
     */
    isHideable: function() {
      return this.options.isSerieHideable;
    },

    /** 
     * @memberof Legend.prototype
     * @return {Boolean} true or false depending if the series can be selected or not
     */
    isSelectable: function() {
      return this.options.isSerieSelectable;
    },

    /** 
     * @memberof Legend.prototype
     * @return {Boolean} true or false depending if the series can be t or not
     */
    isToggleShapes: function() {
      return this.options.shapesToggleable;
    },

    /** 
     * @memberof Legend.prototype
     * @return {SVGGroupElement} The SVG group element wrapping the legend
     */
    getDom: function() {
      return this.svg;
    },

    setEvents: function() {

      var self = this;
      var pos = this.pos;

      var mousedown = function( e ) {

        if ( self.options.movable ) {
          pos.x = e.clientX;
          pos.y = e.clientY;
          e.stopPropagation();
          e.preventDefault();
          self.mousedown = true;
          self.graph.elementMoving( self );

          self.rect.setAttribute( 'display', 'block' );
        }
      };

      var mousemove = function( e ) {
        self.handleMouseMove( e );
      }

      this.rectBottom.addEventListener( 'mousedown', mousedown );
      this.rectBottom.addEventListener( 'mousemove', mousemove );
      this.rect.addEventListener( 'mousemove', mousemove );
    },

    handleMouseUp: function( e ) {

      e.stopPropagation();
      e.preventDefault();
      this.mousedown = false;
      this.rect.setAttribute( 'display', 'none' );
      this.graph.elementMoving( false );
    },

    handleMouseMove: function( e ) {

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
    },

    _setPosition: function() {

      var pos = this.pos;
      if ( !isNaN( pos.transformX ) && !isNaN( pos.transformY ) && pos.transformX !== false && pos.transformY !== false ) {
        this.svg.setAttribute( 'transform', 'translate(' + pos.transformX + ', ' + pos.transformY + ')' );
      }
    },

    /** 
     * Re-applies the legend style
     * @memberof Legend.prototype
     */
    applyStyle: function() {

      if ( this.options.frame ) {
        this.rectBottom.setAttribute( 'stroke', this.options.frameColor );
        this.rectBottom.setAttribute( 'stroke-width', this.options.frameWidth + "px" );
        this.rectBottom.setAttribute( 'rx', this.options.frameRounding );
        this.rectBottom.setAttribute( 'ry', this.options.frameRounding );
      }

      this.rectBottom.setAttribute( 'fill', this.options.backgroundColor );

    },

    /** 
     * Re-applies the legend style
     * @memberof Legend.prototype
     * @param {...(GraphSerie|GraphSerie[])} a serie or an array of series
     */
    fixSeries: function() {
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

  };

  return Legend;

} );