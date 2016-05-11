define( [ '../graph.position', '../graph.util', '../dependencies/eventEmitter/EventEmitter' ], function( GraphPosition, util, EventEmitter ) {

  "use strict";

  /** 
   * Shape class that should be extended
   * @class Shape
   * @static
   */
  var Shape = function() {};

  Shape.prototype = new EventEmitter();

  /**
   * Initializes the shape
   * @memberof Shape
   * @param {Graph} graph - The graph containing the shape
   * @param {Object} properties - The properties object (not copied)
   * @return {Shape} The current shape
   */
  Shape.prototype.init = function( graph, properties ) {

    var self = this;

    this.graph = graph;
    this.properties = properties || {};
    this.handles = [];
    this.options = this.options || {};

    this.group = document.createElementNS( this.graph.ns, 'g' );

    this._selected = false;
    this.createDom();
    this.setEvents();

    if ( this._dom ) {
      this._dom.jsGraphIsShape = this;
    }

    this.group.jsGraphIsShape = this;

    this.classes = [];
    this.transforms = [];

    if ( this._data.masker ) {

      var maskPath = document.createElementNS( this.graph.ns, 'mask' );
      this.maskingId = Math.random();
      maskPath.setAttribute( 'id', this.maskingId );

      this.maskDomWrapper = document.createElementNS( this.graph.ns, 'rect' );
      this.maskDomWrapper.setAttribute( 'fill', 'white' );
      maskPath.appendChild( this.maskDomWrapper );

      var maskDom = this._dom.cloneNode();
      maskPath.appendChild( maskDom );

      this.maskDom = maskDom;

      this.graph.defs.appendChild( maskPath );
    }

    if ( this.group ) {

      if ( this._dom ) {
        this.group.appendChild( this._dom );
      }

      this.group.addEventListener( 'mouseover', function( e ) {

        self.handleMouseOver( e );

      } );

      this.group.addEventListener( 'mouseout', function( e ) {

        self.handleMouseOut( e );

      } );

      this.group.addEventListener( 'mousedown', function( e ) {

        self.graph.focus();

        self.handleMouseDown( e );
      } );

      this.group.addEventListener( 'click', function( e ) {
        self.handleClick( e );
      } );

      this.group.addEventListener( 'dblclick', function( e ) {

        //e.preventDefault();
        // e.stopPropagation();

        self.handleDblClick( e );
      } );
    }

    //			this.group.appendChild(this.rectEvent);

    this.initImpl();

    this.graph.emit( "shapeNew", this );
    return this;
  };

  /**
   * Implentation of the init method. To be extended if necessary on extended Shape classes
   * @memberof Shape
   */
  Shape.prototype.initImpl = function() {};

  /**
   * @memberof Shape
   * @return {Object} The shape's underlying data object
   */
  Shape.prototype.getData = function() {
    return this._data;
  };

  /**
   * @memberof Shape
   * @returns {String} The type of the shape
   */
  Shape.prototype.getType = function() {
    return this.type;
  };

  /**
   * Removes the shape from the DOM and unlinks it from the graph
   * @memberof Shape
   */
  Shape.prototype.kill = function( keepDom ) {

    this.graph.removeShapeFromDom( this );

    if ( !keepDom ) {
      this.graph._removeShape( this );
    }

    this.graph.stopElementMoving( this );
    this.graph.emit( "shapeRemoved", this );

    this._inDom = false;
  };

  /**
   * @memberof Shape
   * @alias Shape#kill
   */
  Shape.prototype.remove = Shape.prototype.kill;

  /**
   * Hides the shape
   * @memberof Shape
   * @return {Shape} The current shape
   */
  Shape.prototype.hide = function() {

    if ( this.hidden ) {
      return;
    }

    this.hidden = true;
    this.group.style.display = 'none';
    return this;
  };

  /**
   * Shows the shape
   * @memberof Shape
   * @return {Shape} The current shape
   */
  Shape.prototype.show = function() {

    if ( !this.hidden ) {
      return;
    }

    this.hidden = false;
    this.group.style.display = 'block';
    this.redraw();
    return this;

  };

  /**
   * Adds a class to the shape DOM
   * @memberof Shape
   * @param {String} className - The class to add
   * @return {Shape} The current shape
   */
  Shape.prototype.addClass = function( className ) {
    this.classes = this.classes || [];
    if ( this.classes.indexOf( className ) == -1 ) {
      this.classes.push( className );
    }
    this.makeClasses();
    return this;
  };

  /**
   * Removes a class from the shape DOM
   * @memberof Shape
   * @param {String} className - The class to remove
   * @return {Shape} The current shape
   */
  Shape.prototype.removeClass = function( className ) {
    this.classes.splice( this.classes.indexOf( className ), 1 );
    this.makeClasses();
    return this;
  };

  /**
   * Builds the classes
   * @memberof Shape
   * @private
   * @return {Shape} The current shape
   */
  Shape.prototype.makeClasses = function() {

    if ( this._dom ) {
      this._dom.setAttribute( 'class', this.classes.join( " " ) );
    }

    return this;
  };

  /**
   * Triggers a ```shapeChanged``` event on the graph
   * @memberof Shape
   * @return {Shape} The current shape
   */
  Shape.prototype.changed = function() {

    this.graph.emit( 'shapeChanged', this );
    return this;
  };

  Shape.prototype.setEvents = function() {};

  /**
   * Creates an event receptacle with the coordinates of the shape bounding box
   * @memberof Shape
   * @return {Shape} The current shape
   */
  Shape.prototype.setEventReceptacle = function() {

    if ( !this.rectEvent ) {
      this.rectEvent = document.createElementNS( this.graph.ns, 'rect' );
      this.rectEvent.setAttribute( 'pointer-events', 'fill' );
      this.rectEvent.setAttribute( 'fill', 'transparent' );
      this.group.appendChild( this.rectEvent );
      this.rectEvent.jsGraphIsShape = this;
    }

    var box = this.group.getBBox();
    this.rectEvent.setAttribute( 'x', box.x );
    this.rectEvent.setAttribute( 'y', box.y - 10 );
    this.rectEvent.setAttribute( 'width', box.width );
    this.rectEvent.setAttribute( 'height', box.height + 20 );

  };

  /**
   * Assigns a serie to the shape
   * @memberof Shape
   * @param {Serie} The serie that owns the shape
   * @return {Shape} The current shape
   */
  Shape.prototype.setSerie = function( serie ) {
      this.serie = serie;
      this.xAxis = serie.getXAxis();
      this.yAxis = serie.getYAxis();
      return this;
    },

    /**
     * @memberof Shape
     * @return {Serie} The serie associated to the shape
     */
    Shape.prototype.getSerie = function() {
      return this.serie;
    },

    /**
     * Assigns the shape to the default x and y axes of the graph, only if they don't exist yet
     * @memberof Shape
     * @return {Shape} The current shape
     * @see Graph#getXAxis
     * @see Graph#getYAxis
     */
    Shape.prototype.autoAxes = function() {

      if ( !this.xAxis ) {
        this.xAxis = this.graph.getXAxis();
      }

      if ( !this.yAxis ) {
        this.yAxis = this.graph.getYAxis();
      }

      return this;
    };

  /**
   * Assigns the shape to an x axis
   * @memberof Shape
   * @param {XAxis} The X axis related to the shape
   * @return {Shape} The current shape
   */
  Shape.prototype.setXAxis = function( axis ) {
    this.xAxis = axis;
    return this;
  };

  /**
   * Assigns the shape to an y axis
   * @memberof Shape
   * @param {YAxis} The Y axis related to the shape
   * @return {Shape} The current shape
   */
  Shape.prototype.setYAxis = function( axis ) {
    this.yAxis = axis;
  };

  /**
   * Returns the x axis associated to the shape. If non-existent, assigns it automatically
   * @memberof Shape
   * @return {XAxis} The x axis associated to the shape. 
   */
  Shape.prototype.getXAxis = function() {

    if ( !this.xAxis ) {
      this.autoAxes();
    }

    return this.xAxis;
  };

  /**
   * Returns the y axis associated to the shape. If non-existent, assigns it automatically
   * @memberof Shape
   * @return {YAxis} The y axis associated to the shape. 
   */
  Shape.prototype.getYAxis = function() {

    if ( !this.yAxis ) {
      this.autoAxes();
    }

    return this.yAxis;
  };

  /**
   * Sets the layer of the shape
   * @memberof Shape
   * @param {Number} layer - The layer number (1 being the lowest)
   * @return {Shape} The current shape
   * @see Shape#getLayer
   */
  Shape.prototype.setLayer = function( layer ) {
    this.setProp( 'layer', layer );
    return this;
  };

  /**
   * Returns the layer on which the shape is placed
   * @memberof Shape
   * @return {Number} The layer number (1 being the lowest layer)
   */
  Shape.prototype.getLayer = function() {
    var layer = this.getProp( 'layer' );

    if ( layer !== undefined ) {
      return layer;
    }

    return 1;
  };

  /**
   * Initial drawing of the shape. Adds it to the DOM and creates the labels. If the shape was already in the DOM, the method simply recreates the labels and reapplies the shape style, unless ```force``` is set to ```true```
   * @param {Boolean} force - Forces adding the shape to the DOM (useful if the shape has changed layer)
   * @memberof Shape
   * @return {Shape} The current shape
   */
  Shape.prototype.draw = function( force ) {

    if ( !this._inDom || force ) {

      this.appendToDom();
      this._inDom = true;
    }

    this.makeLabels();
    this.redraw();
    this.applyStyle();

    return this;
  };

  /**
   * Redraws the shape. Repositions it, applies the style and updates the labels
   * @memberof Shape
   * @return {Shape} The current shape
   */
  Shape.prototype.redraw = function() {

    if ( this.hidden ) {
      return;
    }

    this.position = this.applyPosition();

    this.redrawImpl();
    if ( !this.position ) {
      return;
    }

    this.updateLabels();
    this._applyTransforms();
    return this;
  };

  /**
   * Implementation of the redraw method. Extended Shape classes should override this method
   * @memberof Shape
   */
  Shape.prototype.redrawImpl = function() {};

  /**
   * Sets all dumpable properties of the shape
   * @param {Object} properties - The properties object
   * @return {Shape} The current shape
   * @memberof Shape
   */
  Shape.prototype.setProperties = function( properties ) {
    this.properties = properties;

    if ( !Array.isArray( this.properties.position ) ) {
      this.properties.position = [ this.properties.position ];
    }

    for ( var i = 0, l = this.properties.position.length; i < l; i++ ) {
      var self = this;
      var pos = GraphPosition.check( this.properties.position[ i ], function( relativeTo ) {
        return self.getRelativePosition( relativeTo );
      } );

      this.properties.position[ i ] = pos;
    }

    this.emit( "propertiesChanged" );
    return this;
  }

  Shape.prototype.getRelativePosition = function( relativePosition ) {

    var result;
    if ( ( result = /position([0-9]*)/.exec( relativePosition ) ) !== null ) {
      return this.getPosition( result[ 1 ] );
    } else if ( ( result = /labelPosition([0-9]*)/.exec( relativePosition ) ) !== null ) {
      return this.getLabelPosition( result[ 1 ] );
    }

  }

  /**
   * Gets all dumpable properties of the shape
   * @return {Object} properties - The properties object
   * @memberof Shape
   */
  Shape.prototype.getProperties = function( properties ) {
    return this.properties;
  }

  /**
   * Sets a property to the shape that is remembered and can be later reexported (or maybe reimported)
   * @param {String} prop - The property to save
   * @param val - The value to save
   * @param [ index = 0 ] - The index of the property array to save the property
   * @return {Shape} The current shape
   * @memberof Shape
   */
  Shape.prototype.setProp = function( prop, val, index ) {
    this.properties = this.properties || {};
    this.properties[ prop ] = this.properties[ prop ] || [];
    this.properties[ prop ][ index || 0 ] = val;
    this.emit( "propertyChanged", prop );
    return this;
  };

  /**
   * Returns a property of the shape
   * @param {String} prop - The property to retrieve
   * @param [ index = 0 ] - The index of the property array
   * @memberof Shape
   */
  Shape.prototype.getProp = function( prop, index ) {
    return ( this.properties[ prop ] || [] )[ index ||  0 ];
  };

  /**
   * Adds a property to the property array
   * @param {String} prop - The property to add
   * @param val - The value to save
   * @memberof Shape
   */
  Shape.prototype.addProp = function( prop, value ) {
    this.properties[ prop ] = this.properties[ prop ] || [];
    this.properties[ prop ].push( value );
  };

  /**
   * Resets the property array
   * @param {String} prop - The property to reset
   * @memberof Shape
   */
  Shape.prototype.resetProp = function( prop ) {
    this.properties[ prop ] = [];
  }

  /**
   * Sets a DOM property to the shape
   * @memberof Shape
   */
  Object.defineProperty( Shape.prototype, 'setDom', {
    enumerable: true,
    writable: false,
    configurable: false,
    value: function( prop, val ) {
      if ( this._dom ) {
        this._dom.setAttribute( prop, val );
      }
    }
  } );

  /**
   * Sets a DOM property to the shape group
   * @memberof Shape
   */
  Object.defineProperty( Shape.prototype, 'setDomGroup', {
    enumerable: true,
    writable: false,
    configurable: false,
    value: function( prop, val ) {
      if ( this.group ) {
        this.group.setAttribute( prop, val );
      }
    }
  } )

  /**
   * Saves the stroke color
   * @memberof Shape
   * @return {Shape} The current shape
   */
  Shape.prototype.setStrokeColor = function( color ) {
    this.setProp( 'strokeColor', color );
    return this;
  };

  /**
   * Returns the stroke color
   * @memberof Shape
   * @return {String} The stroke color of the shape
   */
  Shape.prototype.getStrokeColor = function() {
    return this.getProp( 'strokeColor' );
  };

  /**
   * Saves the fill color
   * @memberof Shape
   * @param {String} color - The filling color
   * @return {Shape} The current shape
   */
  Shape.prototype.setFillColor = function( color ) {
    this.setProp( 'fillColor', color );
    return this;
  };

  /**
   * Returns the fill color
   * @memberof Shape
   * @return {String} The fill color of the shape
   */
  Shape.prototype.getFillColor = function() {
    return this.getProp( 'fillColor' );
  };

  /**
   * Saves the opacity of the filling color of the shape
   * @memberof Shape
   * @param {Number} opacity - The filling opacity (0 to 1)
   * @return {Shape} The current shape
   */
  Shape.prototype.setFillOpacity = function( color ) {
    this.setProp( 'fillOpacity', color );
    return this;
  };

  /**
   * Saves the stroke width
   * @memberof Shape
   * @param {String} width - The stroke width
   * @return {Shape} The current shape
   */
  Shape.prototype.setStrokeWidth = function( width ) {
    this.setProp( 'strokeWidth', width );
    return this;
  };

  /**
   * Returns the stroke width
   * @memberof Shape
   * @return {String} The stroke width of the shape
   */
  Shape.prototype.getStrokeWidth = function() {
    return this.getProp( 'strokeWidth' );
  };

  /**
   * Saves the stroke dash array
   * @memberof Shape
   * @param {String} dasharray - The dasharray string
   * @example shape.setStrokeDasharray("5,5,1,4");
   * shape.applyStyle();
   * @return {Shape} The current shape
   */
  Shape.prototype.setStrokeDasharray = function( dasharray ) {
    this.setProp( 'strokeDasharray', dasharray );
    return this;
  };

  /**
   * Sets any extra attributes to the DOM element of the shape
   * @memberof Shape
   * @param {Object<String,String>} attributes - An extra attribute array to apply to the shape DOM
   * @example shape.setAttributes( { "data-bindable" : true } );
   * shape.applyStyle();
   * @return {Shape} The current shape
   */
  Shape.prototype.setAttributes = function( attributes ) {
    this.setProp( "attributes", attributes );
    return this;
  }

  /**
   * Adds a transform property to the shape.
   * @param {String} type - The transform type ("rotate", "transform" or "scale")
   * @param {String} args - The arguments following the transform
   * @memberof Shape
   * @return {Shape} The current shape
   */
  Shape.prototype.addTransform = function( type, args ) {
    this.addProp( 'transforms', {
      type: type,
      arguments: Array.isArray( args ) ? args : [ args ]
    } );
    return this;
  }

  /**
   * Resets the transforms
   * @memberof Shape
   * @see Shape#addTransform
   * @return {Shape} The current shape
   */
  Shape.prototype.resetTransforms = function() {
    this.resetProp( 'transforms' );
    return this;
  }

  /**
   * Sets the text of the label
   * @memberof Shape
   * @param {String} text - The text of the label
   * @param {Number} [ index = 0 ] - The index of the label
   * @return {Shape} The current shape
   */
  Shape.prototype.setLabelText = function( text, index ) {
    this.setProp( 'labelText', text, index || 0 );
    return this;
  };

  /**
   * Displays a hidden label
   * @memberof Shape
   * @param {Number} [ index = 0 ] - The index of the label
   * @return {Shape} The current shape
   */
  Shape.prototype.displayLabel = function( index ) {
    this.setProp( 'labelVisible', true, index || 0 );
    return this;
  }

  /**
   * @alias Shape#displayLabel
   */
  Shape.prototype.showLabel = Shape.prototype.displayLabel;

  /**
   * Hides a displayed label
   * @memberof Shape
   * @param {Number} [ index = 0 ] - The index of the label
   * @return {Shape} The current shape
   */
  Shape.prototype.hideLabel = function( index ) {
    this.setProp( 'labelVisible', false, index || 0 );
    return this;
  }

  /**
   * Sets the color of the label
   * @memberof Shape
   * @param {String} color - The color of the label
   * @param {Number} [ index = 0 ] - The index of the label
   * @return {Shape} The current shape
   */
  Shape.prototype.setLabelColor = function( color, index ) {
    this.setProp( 'labelColor', color, index || 0 );
    return this;
  };

  /**
   * Sets the font size of the label
   * @memberof Shape
   * @param {String} size - The font size (in px) of the label
   * @param {Number} [ index = 0 ] - The index of the label
   * @return {Shape} The current shape
   */
  Shape.prototype.setLabelFontSize = function( size, index ) {
    this.setProp( 'labelFontSize', size, index || 0 );
    return this;
  };

  /**
   * Returns the position of the label
   * @memberof Shape
   * @param {Number} [ index = 0 ] - The index of the label
   * @return {Position} The current position of the label
   */
  Shape.prototype.getLabelPosition = function( index ) {
    return this.getProp( 'labelPosition', index || 0 );
  };

  /**
   * Sets the position of the label
   * @memberof Shape
   * @param {Position} position - The position of the label
   * @param {Number} [ index = 0 ] - The index of the label
   * @return {Shape} The current shape
   */
  Shape.prototype.setLabelPosition = function( position, index ) {

    var self;
    var pos = GraphPosition.check( position, function( relativeTo ) {
      return self.getRelativePosition( relativeTo );
    } );

    this.setProp( 'labelPosition', pos, index || 0 );
    return this;
  };

  /**
   * Sets the angle of the label
   * @memberof Shape
   * @param {Number} angle - The angle of the label in degrees (0 to 360°)
   * @param {Number} [ index = 0 ] - The index of the label
   * @return {Shape} The current shape
   */
  Shape.prototype.setLabelAngle = function( angle, index ) {
    this.setProp( 'labelAngle', angle, index || 0 );
    return this;
  };

  /**
   * Sets the baseline of the label, which affects its y position with respect to the text direction. For text along the x direction, different baselines will reference differently the text to the ```y``` coordinate.
   * @memberof Shape
   * @param {String} baseline - The baseline of the label. Most common baselines are ```no-change```, ```central```, ```middle``` and ```hanging```. You will find an explanation of those significations on the [corresponding MDN article]{@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/dominant-baseline}
   * @param {Number} [ index = 0 ] - The index of the label
   * @return {Shape} The current shape
   */
  Shape.prototype.setLabelBaseline = function( baseline, index ) {
    this.setProp( 'labelBaseline', baseline, index || 0 );
    return this;
  };

  /**
   * Sets the anchoring of the label. 
   * @memberof Shape
   * @param {String} anchor - The anchor of the label. Values can be ```start```, ```middle```, ```end``` or ```inherit```.
   * @param {Number} [ index = 0 ] - The index of the label
   * @return {Shape} The current shape
   */
  Shape.prototype.setLabelAnchor = function( anchor, index ) {
    this.setProp( 'labelAnchor', anchor, index || 0 );
    return this;
  };

  /**
   * Sets the anchoring of the label. 
   * @memberof Shape
   * @param {String} size - The font size in px
   * @param {Number} [ index = 0 ] - The index of the label
   * @return {Shape} The current shape
   */
  Shape.prototype.setLabelSize = function( size, index ) {
    this.setProp( 'labelSize', size, index || 0 );
    return this;
  };

  /**
   * Applies the generic style to the shape. This is a method that applies to most shapes, hence should not be overridden. However if you create a bundle of shapes that extend another one, you may use it to set common style properties to all your shapes.
   * @memberof Shape
   * @return {Shape} The current shape
   */
  Shape.prototype.applyGenericStyle = function() {

    this.setDom( "fill", this.getProp( "fillColor" ) );
    this.setDom( "fill-opacity", this.getProp( "fillOpacity" ) );
    this.setDom( "stroke", this.getProp( "strokeColor" ) );
    this.setDom( "stroke-width", this.getProp( "strokeWidth" ) );
    this.setDom( "stroke-dasharray", this.getProp( "strokeDasharray" ) );

    var attributes = this.getProp( "attributes" ) || {};

    for ( var i in attributes ) {
      this.setDom( i, typeof attributes[ i ] == "function" ? attributes[ i ].call( this, i ) : attributes[ i ] );
    }

    this._applyTransforms();

    return this;
  };

  /**
   * Applies the style to the shape. This method can be extended to apply specific style to the shapes
   * @memberof Shape
   * @return {Shape} The current shape
   */
  Shape.prototype.applyStyle = function() {
    return this.applyGenericStyle();
  }

  /**
   * Returns a computed position object
   * @memberof Shape
   * @param {(Number|Position)} [ index = 0 ] - The index of the position to compute
   * @param {Position} relToPosition - A base position from which to compute the position (useful for <code>dx</code> values)
   * @return {Object} The computed position object in the format <code>{ x: x_in_px, y: y_in_px }</code>
   */
  Shape.prototype.calculatePosition = function( index ) {

    var position;

    position = ( index instanceof GraphPosition ) ? index : this.getPosition( index );

    if ( !position ) {
      return;
    }

    if ( position && position.compute ) {
      return position.compute( this.graph, this.getXAxis(), this.getYAxis(), this.getSerie() );
    }

    this.graph.throw();
  };

  /**
   * @alias Shape#calculatePosition
   */
  Shape.prototype.computePosition = Shape.prototype.calculatePosition;

  /**
   * Returns a stored position object
   * @memberof Shape
   * @param {Number} [ index = 0 ] - The index of the position to compute
   * @return {Position} The current shape
   */
  Shape.prototype.getPosition = function( index ) {

    var pos = this.getProp( 'position', ( index || 0 ) );
    this.setProp( 'position', ( pos = GraphPosition.check( pos ) ), index );
    return pos;
  };

  /**
   * Sets a position object
   * @memberof Shape
   * @param {Position} position - The position object to store
   * @param {Number} [ index = 0 ] - The index of the position to store
   * @return {Position} The current shape
   */
  Shape.prototype.setPosition = function( position, index ) {

    var self = this;
    var pos = GraphPosition.check( position, function( relativeTo ) {
      return self.getRelativePosition( relativeTo );
    } );

    return this.setProp( 'position', pos, ( index || 0 ) );
  };

  /**
   * Applies the style to the shape. This method can be extended to apply specific style to the shapes
   * @memberof Shape
   * @private
   * @return {Shape} The current shape
   */
  Shape.prototype._applyTransforms = function() {

    var transforms = this.getProp( 'transforms' ),
      transformString = "";

    if ( !transforms ) {
      return;
    }
    transforms = Array.isArray( transforms ) ? transforms : [ transforms ];

    if ( transforms.length == 0 ) {
      return;
    }

    for ( var i = 0; i < transforms.length; i++ ) {

      transformString += transforms[ i ].type + "(";

      switch ( transforms[ i ].type ) {

        case 'translate':

          transformString += GraphPosition.getDeltaPx( transforms[ i ].arguments[ 0 ], this.getXAxis() ).replace( 'px', '' );
          transformString += ", ";
          transformString += GraphPosition.getDeltaPx( transforms[ i ].arguments[ 1 ], this.getYAxis() ).replace( 'px', '' );
          break;

        case 'rotate':

          transformString += transforms[ i ].arguments[ 0 ];
          transformString += ", ";

          if ( this.transforms[ i ].arguments.length == 1 ) {
            var p = this.getPosition( 0 );
            transformString += p.x + ", " + p.y;

          } else {

            transformString += GraphPosition.getDeltaPx( transforms[ i ].arguments[ 1 ], this.getXAxis() ).replace( 'px', '' );
            transformString += ", ";
            transformString += GraphPosition.getDeltaPx( transforms[ i ].arguments[ 2 ], this.getYAxis() ).replace( 'px', '' );
          }

          break;
      }

      transformString += ") ";
    }

    this.setDomGroup( 'transform', transformString );
    return this;
  };

  /**
   * Creates all the labels
   * @memberof Shape
   * @private
   * @returns {Shape} The current shape
   */
  Shape.prototype.makeLabels = function() {

    var self = this;
    this._labels = this._labels || [];

    this._labels.map( function( label ) {
      self.group.removeChild( label );
    } );

    this._labels = [];

    var i = 0;

    while ( this.getProp( "labelText", i ) ) {

      if ( !self._labels[ i ] ) {
        self._labels[ i ] = document.createElementNS( self.graph.ns, 'text' );
        self._labels[ i ].setAttribute( 'data-label-i', i );
        self._labels[ i ].jsGraphIsShape = self;
        self.group.appendChild( this._labels[ i ] );
      }
      i++;
    }

    this.updateLabels();

    return this;
  };

  /**
   * Determines if the label is editable
   * @param {Number} labelIndex - The index of the label
   * @return {Boolean} ```true``` if the label is editable, ```false``` otherwise
   * @memberof Shape
   */
  Shape.prototype.isLabelEditable = function( labelIndex ) {
    return this.getProp( 'labelEditable', labelIndex );
  };

  /**
   * Applies the label data to the dom object
   * @memberof Shape
   * @private
   * @param {Number} labelIndex - The index of the label
   * @returns {Shape} The current shape
   */
  Shape.prototype.updateLabels = function() {

    var self = this;
    this._labels = this._labels || [];

    for ( var i = 0, l = this._labels.length; i < l; i++ ) {
      this._applyLabelData( i );

      this._labels[  i ].removeEventListener( "dblclick", labelDblClickListener );
      this._labels[ i ].addEventListener( 'dblclick', labelDblClickListener );
    }

  };

  /**
   * Applies the label data to the dom object
   * @memberof Shape
   * @private
   * @param {Number} labelIndex - The index of the label
   * @returns {Shape} The current shape
   */
  Shape.prototype._applyLabelData = function( labelIndex ) {

    labelIndex = labelIndex || 0;

    /** Sets the position */

    var visible = this.getProp( 'labelVisible', labelIndex );

    if ( !visible ) {
      this._labels[  labelIndex ].setAttribute( 'display', 'none' );
      return;
    } else {
      this._labels[  labelIndex ].setAttribute( 'display', 'initial' );
    }

    var position = this.calculatePosition( GraphPosition.check( this.getProp( "labelPosition", labelIndex ) ) );

    if ( isNaN( position.x ) || isNaN( position.y ) ) {
      /*console.warn( "Cannot compute positioning for labelIndex " + labelIndex + " with text " + this.getProp( "labelText", labelIndex ) );
      console.log( this, this._labels );
      console.trace();*/
      return;

    }

    if ( position.x != "NaNpx" && !isNaN( position.x ) && position.x !== "NaN" && position.x !== false ) {

      this._labels[ labelIndex ].setAttribute( 'x', position.x );
      this._labels[ labelIndex ].setAttribute( 'y', position.y );
    }

    /** Sets the angle */
    var currAngle = this.getProp( 'labelAngle', labelIndex ) || 0;
    if ( currAngle != 0 ) {

      var x = this._labels[ labelIndex ].getAttribute( 'x' ),
        y = this._labels[ labelIndex ].getAttribute( 'y' );

      this._labels[ labelIndex ].setAttribute( 'transform', 'rotate(' + currAngle + ' ' + x + ' ' + y + ')' );
    }

    /** Sets the baseline */
    this._labels[ labelIndex ].setAttribute( 'dominant-baseline', this.getProp( 'labelBaseline', labelIndex ) ||  'no-change' );

    /** Sets the baseline */
    this._labels[ labelIndex ].textContent = this.getProp( 'labelText', labelIndex );

    /** Sets the color */
    this._labels[ labelIndex ].setAttribute( "fill", this.getProp( 'labelColor', labelIndex ) ||  'black' );

    /** Sets the color */
    this._labels[ labelIndex ].setAttribute( "font-size", this.getProp( 'labelSize', labelIndex ) + "px" ||  "12px" );

    /** Sets the anchor */
    this._labels[ labelIndex ].setAttribute( 'text-anchor', this._getLabelAnchor( labelIndex ) );

    return this;
  };

  /**
   * Returns the anchor of the label
   * @memberof Shape
   * @private
   * @param {Number} labelIndex - The index of the label
   * @returns {String} The anchor in SVG string
   */
  Shape.prototype._getLabelAnchor = function( labelIndex ) {
    var anchor = this.getProp( 'labelAnchor', labelIndex );
    switch ( anchor ) {
      case 'middle':
      case 'start':
      case 'end':
        return anchor;
        break;

      case 'right':
        return 'end';
        break;

      case 'left':
        return 'start';
        break;

      default:
        return 'start';
        break;
    }
  };

  /**
   * Returns the shape selection status
   * @memberof Shape
   * @returns {Boolean} true is the shape is selected, false otherwise
   */
  Shape.prototype.isSelected = function() {
    return this._selectStatus ||  false;
  }

  /**
   * Sets or queries whether the shape can have handles. Even if the property is set to false, the getter can return true if the property ```statichandles``` is true (used when handles never disappear)
   * @memberof Shape
   * @param {Boolean} setter - If used, defined if the shape has handles or not
   * @returns {Boolean} true is the shape has handles, false otherwise
   * @example Shape.hasHandles( true ); // Sets that the shape has handles
   * @example Shape.hasHandles( false ); // Sets that the shape has no handles
   * @example Shape.hasHandles( ); // Queries the shape to determine if it has handles or not. Also returns true if handles are static
   */
  Shape.prototype.hasHandles = function( setter ) {

    if ( setter !== undefined ) {
      this.setProp( 'handles', setter );
    }

    return !!this.getProp( 'handles' ) || !!this.getProp( 'statichandles' );
  }

  /**
   * Adds shape handles 
   * @private 
   * @memberof Shape
   * @return {Shape} The current shape
   */
  Shape.prototype.addHandles = function() {

    if ( this.isLocked() ) {
      return;
    }

    if ( !this.handlesInDom ) {

      this.handlesInDom = true;

      for ( var i = 1; i < this.handles.length; i++ ) {

        if ( this.handles[ i ] ) {
          this.group.appendChild( this.handles[ i ] );
        }
      }
    }

    return this;
  };

  /**
   * Remove shape handles 
   * @private 
   * @memberof Shape
   * @return {Shape} The current shape
   */
  Shape.prototype.removeHandles = function() {

    this.hideHandles();
    this.handles = [];
  }

  /**
   * Hide shape handles 
   * @private 
   * @memberof Shape
   * @return {Shape} The current shape
   */
  Shape.prototype.hideHandles = function() {

    if ( !this.handlesInDom ) {
      return this;
    }

    for ( var i = 1; i < this.handles.length; i++ ) {
      this.group.removeChild( this.handles[ i ] );
    }

    this.handlesInDom = false;
    return this;
  }

  /**
   * @protected
   * @memberof Shape
   * @return {Boolean} ```true``` if the handles are in the DOM
   */
  Shape.prototype.areHandlesInDom = function() {

    return this.handlesInDom;
  }

  /**
   * Selects the shape. Should only be called from jsGraph main instance
   * @private
   * @memberof Shape
   * @param {Boolean} [ mute = false ] - Mutes the method (no event emission)
   * @returns {Shape} the current shape
   */
  Shape.prototype._select = function( mute ) {

    if ( !this.isSelectable() ) {
      return false;
    }

    // Put on the stack
    this.appendToDom();
    //this.graph.appendShapeToDom( this ); // Put the shape on top of the stack !

    this._selectStatus = true;
    var style = this.getSelectStyle();
    var style2 = {};
    for ( var i in style ) {
      if ( typeof style[ i ] == "function" ) {
        style2[ i ] = style[ i ].call( this );
      } else {
        style2[ i ] = style[  i ];
      }
    }

    util.saveDomAttributes( this._dom, style2, 'select' );

    if ( this.hasHandles() && !this.hasStaticHandles() ) {
      this.addHandles();
      this.setHandles();
    }

    if ( !mute ) {
      this.graph.emit( "shapeSelected", this );
    }
  };

  /**
   * Unselects the shape. Should only be called from jsGraph main instance
   * @private
   * @memberof Shape
   * @param {Boolean} [ mute = false ] - Mutes the method (no event emission)
   * @returns {Shape} the current shape
   */
  Shape.prototype._unselect = function( mute ) {

    this._selectStatus = false;

    util.restoreDomAttributes( this._dom, 'select' );

    if ( this.hasHandles() && !this.hasStaticHandles() ) {
      this.hideHandles();
    }

    if ( !mute ) {
      this.graph.emit( "shapeUnselected", this );
    }
  };

  /**
   * Returns the special style of the shape when it is selected.
   * @memberof Shape
   * @see Shape#setSelectStyle
   * @param {Object<String,String>} The SVG attributes to apply to the shape
   */
  Shape.prototype.getSelectStyle = function() {
    return this.selectStyle;
  };

  /**
   * Defines the style that is applied to the shape when it is selected. The style extends the default style of the shape
   * @memberof Shape
   * @param {Object<String,String>} [ attr = {} ] - The SVG attributes to apply to the shape
   * @example rectangle.setSelectStyle( { fill: 'red' } );
   * @returns {Shape} the current shape
   */
  Shape.prototype.setSelectStyle = function( attr ) {
    this.selectStyle = attr;
    return this;
  };

  /**
   * Assigns static handles to the shape. In this mode, handles will not disappear
   * @memberof Shape
   * @param {Boolean} staticHandles - true to enable static handles, false to disable them.
   * @returns {Shape} the current shape
   */
  Shape.prototype.setStaticHandles = function( staticHandles ) {
    this.setProp( 'staticHandles', staticHandles );
  };

  /**
   * @memberof Shape
   * @returns {Boolean} ```true``` if the shape has static handles, ```false``` otherwise
   */
  Shape.prototype.hasStaticHandles = function( staticHandles ) {
    return !!this.getProp( 'staticHandles' );
  };

  /**
   * Creates the handles for the shape
   * @memberof Shape
   * @param {Number} nb - The number of handles
   * @param {String} type - The type of SVG shape to use
   * @param {Object<String,String>} [ attr = {} ] - The SVG attributes to apply to the handles
   * @param {Function} [ callbackEach ] - An additional callback the user can provide to further personalize the handles
   * @returns {Shape} the current shape
   * @private
   */
  Shape.prototype._createHandles = function( nb, type, attr, callbackEach ) {

    if ( this.handles && this.handles.length > 0 ) {
      return;
    }

    var self = this;

    for ( var i = 1, l = nb; i <= l; i++ ) {

      ( function( j ) {

        var self = this;

        var handle = document.createElementNS( self.graph.ns, type );
        handle.jsGraphIsShape = true;

        if ( attr ) {
          for ( var k in attr ) {
            handle.setAttribute( k, attr[ k ] );
          }
        }

        handle
          .addEventListener( 'mousedown', function( e ) {

            if ( self.isResizable() ) {

              e.preventDefault();
              e.stopPropagation();

              self.graph.emit( "beforeShapeResize", self );

              if ( !self.graph.prevent( false ) ) {

                self.resizing = true;
                self.handleSelected = j;
                self.handleMouseDown( e );
              }
            }

          } );

        if ( callbackEach ) {
          callbackEach( self.handles[ j ] );
        }

        self.handles[  j ] = handle;

      } ).call( this, i );

    }

    return this.handles;
  };

  /**
   * Creates the handles for the shape. Should be implemented by the children shapes classes.
   * @memberof Shape
   */
  Shape.prototype.createHandles = function() {

  }

  /**
   * Handles mouse down event
   * @private
   * @param {Event} e - The native event
   * @memberof Shape.prototype
   */
  Shape.prototype.handleMouseDownImpl = function() {};

  /**
   * Handles the mouse move event
   * @private
   * @param {Event} e - The native event
   * @memberof Shape.prototype
   */
  Shape.prototype.handleMouseMoveImpl = function() {};

  /**
   * Handles mouse up event
   * @private
   * @param {Event} e - The native event
   * @memberof Shape.prototype
   */
  Shape.prototype.handleMouseUpImpl = function() {};

  /**
   * Called when the shape is created
   * @private
   * @param {Event} e - The native event
   * @memberof Shape.prototype
   */
  Shape.prototype.handleCreateImpl = function() {};

  /**
   * Handles mouse down events
   * @param {Event} e - The native event
   * @return The result of the {@link Shape#handleMouseDownImpl} method
   * @memberof Shape.prototype
   */
  Shape.prototype.handleMouseDown = function( e ) {

    //this.handleSelected = false;

    if ( this.isLocked() ) {
      return;
    }

    if ( this.isMovable() || this.isResizable() ) {

      this.graph.elementMoving( this );
    }

    if ( this.getProp( 'selectOnMouseDown' ) ) {
      this.graph.selectShape( this );
    }

    if ( this.isMovable() ) {
      if ( !this.resizing ) {

        this.graph.emit( "beforeShapeMove", self );

        if ( !this.graph.prevent( false ) ) {

          this.moving = true;
        }
      } else {

      }
    }

    this._mouseCoords = this.graph._getXY( e );
    return this.handleMouseDownImpl( e, this._mouseCoords );
  };

  /**
   * Handles mouse click events
   * @param {Event} e - The native event
   * @return The result of the {@link Shape#handleMouseDownClick} method
   * @private
   */
  Shape.prototype.handleClick = function( e ) {

    if ( this.getProp( 'selectOnClick' ) ) {
      this.graph.selectShape( this );
    }

    if ( !this.isSelectable() ) {
      return false;
    }

    if ( !e.shiftKey ) {
      this.graph.unselectShapes();
    }

    this.graph.selectShape( this );
  };

  /**
   * Handles mouse click events
   * @param {Event} e - The native event
   * @return The result of the {@link Shape#handleMouseUpImpl} method
   * @private
   */
  Shape.prototype.handleMouseMove = function( e ) {

    if ( ( this.resizing ||  this.moving ) && !this.isSelected() ) {
      this.graph.selectShape( this );
    }

    this.graph.emit( "beforeShapeMouseMove", this );

    if ( this.graph.prevent( false ) || !this._mouseCoords ) {
      return false;
    }

    var coords = this.graph._getXY( e );
    var
      deltaX = this.getXAxis().getRelVal( coords.x - this._mouseCoords.x ),
      deltaY = this.getYAxis().getRelVal( coords.y - this._mouseCoords.y );

    if ( deltaX != 0 ||  deltaY !== 0 ) {
      this.preventUnselect = true;
    }

    this._mouseCoords = coords;

    var ret = this.handleMouseMoveImpl( e, deltaX, deltaY, coords.x - this._mouseCoords.x, coords.y - this._mouseCoords.y );

    return ret;

  };

  /**
   * Handles mouse up events
   * @param {Event} e - The native event
   * @return The result of the {@link Shape#handleMouseUpImpl} method
   * @private
   */
  Shape.prototype.handleMouseUp = function( e ) {

    if ( this.moving ) {

      this.graph.emit( "shapeMoved", this );

    }

    if ( this.handleSelected || this.resize ) {

      this.graph.emit( "shapeResized", this );

    }

    this.moving = false;
    this.resizing = false;
    this.handleSelected = false;
    this.graph.elementMoving( false );

    return this.handleMouseUpImpl( e );
  };

  /**
   * Handles double click events
   * @param {Event} e - The native event
   * @return The result of the {@link Shape#handleMouseDblClickImpl} method
   * @private
   */
  Shape.prototype.handleDblClick = function( e ) {

  };

  /**
   * Handles mouse over events
   * @param {Event} e - The native event
   * @return The result of the {@link Shape#handleMouseOverImpl} method
   * @private
   */
  Shape.prototype.handleMouseOver = function() {

    if ( this.getProp( "highlightOnMouseOver" ) ) {

      if ( !this.moving && !this.resizing ) {
        this.highlight();
      }
    }

    this.graph.emit( "shapeMouseOver", this );
  };

  /**
   * Handles mouse out events
   * @param {Event} e - The native event
   * @return The result of the {@link Shape#handleMouseOutImpl} method
   * @private
   */
  Shape.prototype.handleMouseOut = function() {

    if ( this.getProp( "highlightOnMouseOver" ) ) {
      this.unHighlight();
    }

    this.graph.emit( "shapeMouseOut", this );
  };

  /*
   *  Updated July 1st, 2015
   */

  /**
   * Locks the shape (prevents selection, resizing and moving)
   * @return {Shape} The current shape
   * @memberof Shape
   */
  Shape.prototype.lock = function() {
    this.setProp( 'locked', true );
    return this;
  };

  /**
   * Unlocks the shape (prevents selection, resizing and moving)
   * @return {Shape} The current shape
   * @memberof Shape
   */
  Shape.prototype.unlock = function() {
    this.setProp( 'locked', false );
    return this;
  };

  /**
   * @return {Boolean} True if the shape is locked, false otherwise
   * @memberof Shape
   */
  Shape.prototype.isLocked = function() {
    return this.getProp( 'locked' ) || this.graph.shapesLocked;
  };

  /**
   * Makes the shape moveable
   * @return {Shape} The current shape
   * @memberof Shape
   */
  Shape.prototype.movable = function( bln ) {
    this.setProp( 'movable', true );
  };

  /**
   * Makes the shape non-moveable
   * @return {Shape} The current shape
   * @memberof Shape
   */
  Shape.prototype.unmovable = function() {
    this.setProp( 'movable', false );
    return false;
  };

  /**
   * @return {Boolean} True if the shape is movable, false otherwise
   * @memberof Shape
   */
  Shape.prototype.isMovable = function() {
    return this.getProp( 'movable' );
  };

  /**
   * Makes the shape resizable
   * @return {Shape} The current shape
   * @memberof Shape
   */
  Shape.prototype.resizable = function() {
    this.setProp( 'resizable', true );
  };

  /**
   * Makes the shape non-resizable
   * @return {Shape} The current shape
   * @memberof Shape
   */
  Shape.prototype.unresizable = function() {
    this.setProp( 'resizable', false );
  };

  /**
   * @return {Boolean} True if the shape is resizable, false otherwise
   * @memberof Shape
   */
  Shape.prototype.isResizable = function() {
    return this.getProp( 'resizable' );
  };

  /**
   * Makes the shape selectable
   * @return {Shape} The current shape
   * @memberof Shape
   */
  Shape.prototype.selectable = function() {
    this.setProp( 'selectable', true );
  };

  /**
   * Makes the shape non-selectable
   * @return {Shape} The current shape
   * @memberof Shape
   */
  Shape.prototype.unselectable = function() {
    this.graph.unselectShape( this );
    this.setProp( 'selectable', false );
  };

  /**
   * @return {Boolean} True if the shape is selectable, false otherwise
   * @memberof Shape
   */
  Shape.prototype.isSelectable = function() {
    return this.getProp( 'selectable' );
  };

  /**
   * Highlights the shape with attributes
   * @memberof Shape
   * @returns {Shape} The current shape
   * @param {Object<String,String>} [ attributes ] - A hashmap of attributes to apply. If omitted, {@link Shape#getHighlightAttributes} will be called
   * @param {String} [ saveDomName=highlight ] - The name to which the current shape attributes will be saved to be recovered later with the {@link Shape#unHighlight} method
   * @example shape.highlight( { fill: 'red', 'fill-opacity': 0.5 } );
   * @see Shape#unHighlight
   */
  Shape.prototype.highlight = function( attributes, saveDomName ) {

    if ( !attributes ) {
      attributes = this.getHighlightAttributes();
    }

    if ( !saveDomName ) {
      saveDomName = "highlight";
    }

    util.saveDomAttributes( this._dom, attributes, saveDomName );
    this.highlightImpl();
    return this;
  };

  /**
   * Removes the highlight properties from the same
   * @memberof Shape
   * @returns {Shape} The current shape 
   * @param {String} [ saveDomName=highlight ] - The name to which the current shape attributes will be saved to be recovered later with the {@link Shape#unHighlight} method
   * @see Shape#highlight
   */
  Shape.prototype.unHighlight = function( saveDomName ) {

    if ( !saveDomName ) {
      saveDomName = "highlight";
    }

    util.restoreDomAttributes( this._dom, saveDomName );
    this.unHighlightImpl();
    return this;
  };

  Shape.prototype.highlightImpl = function() {};
  Shape.prototype.unHighlightImpl = function() {};

  /**
   * @memberof Shape
   * @returns {Object} The attributes taken by the shape when highlighted
   * @see Shape#highlight
   */
  Shape.prototype.getHighlightAttributes = function() {
    return this._highlightAttributes;
  };

  /**
   * Sets the attributes the shape will take when highlighted
   * @memberof Shape
   * @param {Object<String,String>} [ attributes ] - A hashmap of attributes to apply when the shape is highlighted
   * @returns {Shape} The current shape
   * @see Shape#highlight
   */
  Shape.prototype.setHighlightAttributes = function( attributes ) {
    this._highlightAttributes = attributes;
    return this;
  };

  /**
   * Returns the masking id of the shape. Returns null if the shape does not behave as a mask
   * @memberof Shape
   * @returns {String} The ```id``` attribute of the shape
   */
  Shape.prototype.getMaskingID = function() {
    return this.maskingId;
  };

  /**
   * Masks the current shape with another shape passed as the first parameter of the method
   * @memberof Shape
   * @param {Shape} maskingShape - The shape used to mask the current shape
   * @return {Shape} The current shape
   */
  Shape.prototype.maskWith = function( maskingShape ) {

    var maskingId;

    if ( maskingId = maskingShape.getMaskingID() ) {

      this._dom.setAttribute( 'mask', 'url(#' + maskingId + ')' );

    } else {

      this._dom.removeAttribute( 'mask' );
    }
  };

  /**
   * Manually updates the mask of the shape. This is needed because the shape needs to be surrounded by a white rectangle (because transparent is treated as black and will not render the shape)
   * This method will work well for rectangles but should be overridden for other shapes
   * @memberof Shape
   * @return {Shape} The current shape
   * @todo Explore a way to make it compatible for all kinds of shapes. Maybe the masker position should span the whole graph...
   */
  Shape.prototype.updateMask = function() {
    return;
    if ( !this.maskDom ) {
      return;
    }

    var position = {
      x: 'min',
      y: 'min'
    };
    var position2 = {
      x: 'max',
      y: 'max'
    };

    position = this._getPosition( position );
    position2 = this._getPosition( position2 );

    this.maskDomWrapper.setAttribute( 'x', Math.min( position.x, position2.x ) );
    this.maskDomWrapper.setAttribute( 'y', Math.min( position.y, position2.y ) );

    this.maskDomWrapper.setAttribute( 'width', Math.abs( position2.x - position.x ) );
    this.maskDomWrapper.setAttribute( 'height', Math.abs( position2.y - position.y ) );

    for ( var i = 0; i < this._dom.attributes.length; i++ ) {
      this.maskDom.setAttribute( this._dom.attributes[ i ].name, this._dom.attributes[ i ].value );
    }

    this.maskDom.setAttribute( 'fill', 'black' );

    return this;
  };

  function labelDblClickListener( e ) {

    var i = parseInt( e.target.getAttribute( 'data-label-i' ) );

    if ( !i ) {
      return;
    }

    if ( !self.isLabelEditable( i ) ) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    $( '<input type="text" />' ).attr( 'value', self.getProp( 'labelText', i ) ).prependTo( self.graph._dom ).css( {

      position: 'absolute',
      'margin-top': ( parseInt( e.target.getAttribute( 'y' ).replace( 'px', '' ) ) - 10 ) + "px",
      'margin-left': ( parseInt( e.target.getAttribute( 'x' ).replace( 'px', '' ) ) - 50 ) + "px",
      textAlign: 'center',
      width: '100px'

    } ).bind( 'blur', function() {

      $( this ).remove();

      self.setLabelText( $( this ).setProp( 'value' ), i );
      self._labels[ i ].textContent = $( this ).setProp( 'value' );

      self.triggerChange();

    } ).bind( 'keyup', function( e ) {

      e.stopPropagation();
      e.preventDefault();

      if ( e.keyCode == 13 ) {
        $( this ).trigger( 'blur' );
      }

    } ).bind( 'keypress', function( e ) {

      e.stopPropagation();

    } ).bind( 'keydown', function( e ) {

      e.stopPropagation();

    } ).focus().get( 0 ).select();

  }

  /**
   * Appends the shape DOM to its parent
   * @memberof Shape
   * @private
   * @return {Shape} The current shape
   */
  Shape.prototype.appendToDom = function() {

    if ( this._forcedParentDom ) {

      this._forcedParentDom.appendChild( this.group );
    } else {
      this.graph.appendShapeToDom( this );
    }
    return this;
  };

  /**
   * Forces the DOM parent (instead of the normal layer)
   * @memberof Shape
   * @return {Shape} The current shape
   */
  Shape.prototype.forceParentDom = function( dom ) {

    this._forcedParentDom = dom;

    return this;
  };

  return Shape;

} );