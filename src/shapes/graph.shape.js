import GraphPosition from '../graph.position'
import * as util from '../graph.util'
import EventEmitter from '../dependencies/eventEmitter/EventEmitter'

/** 
 * Shape class that should be extended
 * @class Shape
 * @static
 */
class Shape extends EventEmitter {

  constructor() {
    super();
  }

  /**
   * Initializes the shape
   * @param {Graph} graph - The graph containing the shape
   * @param {Object} properties - The properties object (not copied)
   * @return {Shape} The current shape
   */
  init( graph, properties ) {

    var self = this;

    this.graph = graph;
    this.properties = properties || {};
    this.handles = [];
    this.options = this.options || {};

    this.group = document.createElementNS( this.graph.ns, 'g' );

    this._selected = false;
    this.createDom();

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
  }

  /**
   * Implentation of the init method. To be extended if necessary on extended Shape classes
   */
  initImpl() {}

  /**
   * @return {Object} The shape's underlying data object
   */
  getData() {
    return this._data;
  }

  /**
   * @returns {String} The type of the shape
   */
  getType() {
    return this.type;
  }

  /**
   * Removes the shape from the DOM and unlinks it from the graph
   */
  kill( keepDom ) {

    this.graph.removeShapeFromDom( this );

    if ( !keepDom ) {
      this.graph._removeShape( this );
    }

    this.graph.stopElementMoving( this );
    this.graph.emit( "shapeRemoved", this );

    this._inDom = false;
  }

  /**
   * Hides the shape
   * @return {Shape} The current shape
   */
  hide() {

    if ( this.hidden ) {
      return;
    }

    this.hidden = true;
    this.group.style.display = 'none';
    return this;
  }

  /**
   * Shows the shape
   * @return {Shape} The current shape
   */
  show() {

    if ( !this.hidden ) {
      return;
    }

    this.hidden = false;
    this.group.style.display = 'block';
    this.redraw();
    return this;

  }

  /**
   * Adds a class to the shape DOM
   * @param {String} className - The class to add
   * @return {Shape} The current shape
   */
  addClass( className ) {
    this.classes = this.classes || [];
    if ( this.classes.indexOf( className ) == -1 ) {
      this.classes.push( className );
    }
    this.makeClasses();
    return this;
  }

  /**
   * Removes a class from the shape DOM
   * @param {String} className - The class to remove
   * @return {Shape} The current shape
   */
  removeClass( className ) {
    this.classes.splice( this.classes.indexOf( className ), 1 );
    this.makeClasses();
    return this;
  }

  /**
   * Builds the classes
   * @private
   * @return {Shape} The current shape
   */
  makeClasses() {

    if ( this._dom ) {
      this._dom.setAttribute( 'class', this.classes.join( " " ) );
    }

    return this;
  }

  /**
   * Triggers a ```shapeChanged``` event on the graph
   * @return {Shape} The current shape
   */
  changed( event ) {

    if ( event ) {
      this.graph.emit( event, this );
    }

    this.graph.emit( 'shapeChanged', this );
    return this;
  }

  /**
   * Creates an event receptacle with the coordinates of the shape bounding box
   * @return {Shape} The current shape
   */
  setEventReceptacle() {

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

  }

  /**
   * Assigns a serie to the shape
   * @param {Serie} The serie that owns the shape
   * @return {Shape} The current shape
   */
  setSerie( serie ) {
    this.serie = serie;
    this.xAxis = serie.getXAxis();
    this.yAxis = serie.getYAxis();
    return this;
  }

  /**
   * @return {Serie} The serie associated to the shape
   */
  getSerie() {
    return this.serie;
  }

  /**
   * Assigns the shape to the default x and y axes of the graph, only if they don't exist yet
   * @return {Shape} The current shape
   * @see Graph#getXAxis
   * @see Graph#getYAxis
   */
  autoAxes() {

    if ( !this.xAxis ) {
      this.xAxis = this.graph.getXAxis();
    }

    if ( !this.yAxis ) {
      this.yAxis = this.graph.getYAxis();
    }

    return this;
  }

  /**
   * Assigns the shape to an x axis
   * @param {XAxis} The X axis related to the shape
   * @return {Shape} The current shape
   */
  setXAxis( axis ) {
    this.xAxis = axis;
    return this;
  }

  /**
   * Assigns the shape to an y axis
   * @param {YAxis} The Y axis related to the shape
   * @return {Shape} The current shape
   */
  setYAxis( axis ) {
    this.yAxis = axis;
  }

  /**
   * Returns the x axis associated to the shape. If non-existent, assigns it automatically
   * @return {XAxis} The x axis associated to the shape. 
   */
  getXAxis() {

    if ( !this.xAxis ) {
      this.autoAxes();
    }

    return this.xAxis;
  }

  /**
   * Returns the y axis associated to the shape. If non-existent, assigns it automatically
   * @return {YAxis} The y axis associated to the shape. 
   */
  getYAxis() {

    if ( !this.yAxis ) {
      this.autoAxes();
    }

    return this.yAxis;
  }

  /**
   * Sets the layer of the shape
   * @param {Number} layer - The layer number (1 being the lowest)
   * @return {Shape} The current shape
   * @see Shape#getLayer
   */
  setLayer( layer ) {
    this.setProp( 'layer', layer );
    return this;
  }

  /**
   * Returns the layer on which the shape is placed
   * @return {Number} The layer number (1 being the lowest layer)
   */
  getLayer() {
    var layer = this.getProp( 'layer' );

    if ( layer !== undefined ) {
      return layer;
    }

    return 1;
  }

  /**
   * Initial drawing of the shape. Adds it to the DOM and creates the labels. If the shape was already in the DOM, the method simply recreates the labels and reapplies the shape style, unless ```force``` is set to ```true```
   * @param {Boolean} force - Forces adding the shape to the DOM (useful if the shape has changed layer)
   * @return {Shape} The current shape
   */
  draw( force ) {

    if ( !this._inDom || force ) {

      this.appendToDom();
      this._inDom = true;
    }

    this.makeLabels();
    this.redraw();
    this.applyStyle();

    return this;
  }

  /**
   * Redraws the shape. Repositions it, applies the style and updates the labels
   * @return {Shape} The current shape
   */
  redraw() {

    if ( this.hidden ) {
      return this;
    }

    this.position = this.applyPosition();

    this.redrawImpl();
    if ( !this.position ) {
      return this;
    }

    this.updateLabels();
    this._applyTransforms();
    return this;
  }

  /**
   * Implementation of the redraw method. Extended Shape classes should override this method
   */
  redrawImpl() {}

  /**
   * Sets all dumpable properties of the shape
   * @param {Object} properties - The properties object
   * @return {Shape} The current shape
   */
  setProperties( properties ) {
    this.properties = properties;

    if ( !Array.isArray( this.properties.position ) ) {
      this.properties.position = [ this.properties.position ];
    }
    var self = this;
    for ( var i = 0, l = this.properties.position.length; i < l; i++ ) {

      var pos = GraphPosition.check( this.properties.position[ i ], function( relativeTo ) {
        return self.getRelativePosition( relativeTo );
      } );

      this.properties.position[ i ] = pos;
    }

    this.emit( "propertiesChanged" );
    return this;
  }

  getRelativePosition( relativePosition ) {

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
   */
  getProperties( properties ) {
    return this.properties;
  }

  /**
   * Sets a property to the shape that is remembered and can be later reexported (or maybe reimported)
   * @param {String} prop - The property to save
   * @param val - The value to save
   * @param [ index = 0 ] - The index of the property array to save the property
   * @return {Shape} The current shape
   */
  setProp( prop, val, index ) {
    this.properties = this.properties || {};
    this.properties[ prop ] = this.properties[ prop ] || [];
    this.properties[ prop ][ index || 0 ] = val;
    this.emit( "propertyChanged", prop );
    return this;
  }

  /**
   * Returns a property of the shape
   * @param {String} prop - The property to retrieve
   * @param [ index = 0 ] - The index of the property array
   */
  getProp( prop, index ) {
    return ( this.properties[ prop ] || [] )[ index ||  0 ];
  }

  /**
   * Returns all the properties of the shape
   * @param {String} prop - The property to retrieve
   */
  getProps( prop, index ) {
    return ( this.properties[ prop ] || [] );
  }

  /**
   * Adds a property to the property array
   * @param {String} prop - The property to add
   * @param val - The value to save
   */
  addProp( prop, value ) {
    this.properties[ prop ] = this.properties[ prop ] || [];
    this.properties[ prop ].push( value );
  }

  /**
   * Resets the property array
   * @param {String} prop - The property to reset
   */
  resetProp( prop ) {
    this.properties[ prop ] = [];
  }

  /**
   * Sets a DOM property to the shape
   */
  setDom( prop, val, noForce ) {
    if ( this._dom ) {

      if ( !noForce || !util.hasSavedAttribute( this._dom, prop ) ) {
        this._dom.setAttribute( prop, val );
      }
    }
  }

  /**
   * Sets a DOM property to the shape group
   */
  setDomGroup( prop, val ) {
    if ( this.group ) {
      this.group.setAttribute( prop, val );
    }
  }

  /**
   * Saves the stroke color
   * @return {Shape} The current shape
   */
  setStrokeColor( color ) {
    this.setProp( 'strokeColor', color );
    this.overwriteSavedProp( 'stroke', color );
    this.applySelectedStyle();
    return this;
  }

  /**
   * Returns the stroke color
   * @return {String} The stroke color of the shape
   */
  getStrokeColor() {
    return this.getProp( 'strokeColor' );
  }

  /**
   * Saves the fill color
   * @param {String} color - The filling color
   * @return {Shape} The current shape
   */
  setFillColor( color ) {
    this.setProp( 'fillColor', color );
    this.overwriteSavedProp( 'fill', color );
    this.applySelectedStyle();
    return this;
  }

  /**
   * Returns the fill color
   * @return {String} The fill color of the shape
   */
  getFillColor() {
    return this.getProp( 'fillColor' );
  }

  /**
   * Saves the opacity of the filling color of the shape
   * @param {Number} opacity - The filling opacity (0 to 1)
   * @return {Shape} The current shape
   */
  setFillOpacity( opacity ) {
    this.setProp( 'fillOpacity', opacity );
    this.overwriteSavedProp( 'fill-opacity', opacity );
    this.applySelectedStyle();
    return this;
  }

  /**
   * Saves the stroke width
   * @param {String} width - The stroke width
   * @return {Shape} The current shape
   */
  setStrokeWidth( width ) {
    this.setProp( 'strokeWidth', width );
    this.overwriteSavedProp( 'stroke-width', width );
    this.applySelectedStyle();
    return this;
  }

  /**
   * Returns the stroke width
   * @return {String} The stroke width of the shape
   */
  getStrokeWidth() {
    return this.getProp( 'strokeWidth' );
  }

  /**
   * Saves the stroke dash array
   * @param {String} dasharray - The dasharray string
   * @example shape.setStrokeDasharray("5,5,1,4");
   * shape.applyStyle();
   * @return {Shape} The current shape
   */
  setStrokeDasharray( dasharray ) {
    this.setProp( 'strokeDasharray', dasharray );
    this.overwriteSavedProp( 'stroke-dasharray', dasharray );
    this.applySelectedStyle();
    return this;
  }

  /**
   * Sets any extra attributes to the DOM element of the shape
   * @param {Object<String,String>} attributes - An extra attribute array to apply to the shape DOM
   * @example shape.setAttributes( { "data-bindable" : true } );
   * shape.applyStyle();
   * @return {Shape} The current shape
   */
  setAttributes( attributes ) {
    this.setProp( "attributes", attributes );
    return this;
  }

  overwriteSavedProp( prop, newValue ) {
    util.overwriteDomAttribute( this._dom, prop, newValue );
  }

  /**
   * Adds an extra attribute to the shape
   * @param {String} attributeName - The name of the attribute
   * @param {String} attributeValue - The value of the attribute
   * @return {Shape} The current shape
   */
  addAttribute( attributeName, attributeValue ) {
    var added = {};
    added[ attributeName ] = attributeValue;
    this.addProp( "attributes", added );
    return this;
  }

  /**
   * Adds a transform property to the shape.
   * @param {String} type - The transform type ("rotate", "transform" or "scale")
   * @param {String} args - The arguments following the transform
   * @return {Shape} The current shape
   */
  addTransform( type, args ) {
    this.addProp( 'transforms', {
      type: type,
      arguments: Array.isArray( args ) ? args : [ args ]
    } );
    return this;
  }

  /**
   * Resets the transforms
   * @see Shape#addTransform
   * @return {Shape} The current shape
   */
  resetTransforms() {
    this.resetProp( 'transforms' );
    return this;
  }

  /**
   * Sets the text of the label
   * @param {String} text - The text of the label
   * @param {Number} [ index = 0 ] - The index of the label
   * @return {Shape} The current shape
   */
  setLabelText( text, index ) {
    this.setProp( 'labelText', text, index || 0 );
    return this;
  }

  /**
   * Returns the text of the label
   * @param {Number} [ index = 0 ] - The index of the label
   * @return {String} The text of the label
   */
  getLabelText( text, index ) {
    return this.getProp( 'labelText', index || 0 );
  }

  /**
   * Displays a hidden label
   * @param {Number} [ index = 0 ] - The index of the label
   * @return {Shape} The current shape
   */
  displayLabel( index ) {
    this.setProp( 'labelVisible', true, index || 0 );
    return this;
  }

  /**
   * Hides a displayed label
   * @param {Number} [ index = 0 ] - The index of the label
   * @return {Shape} The current shape
   */
  hideLabel( index ) {
    this.setProp( 'labelVisible', false, index || 0 );
    return this;
  }

  /**
   * Sets the color of the label
   * @param {String} color - The color of the label
   * @param {Number} [ index = 0 ] - The index of the label
   * @return {Shape} The current shape
   */
  setLabelColor( color, index ) {
    this.setProp( 'labelColor', color, index || 0 );
    return this;
  }

  /**
   * Sets the font size of the label
   * @param {String} size - The font size (in px) of the label
   * @param {Number} [ index = 0 ] - The index of the label
   * @return {Shape} The current shape
   */
  setLabelFontSize( size, index ) {
    this.setProp( 'labelFontSize', size, index || 0 );
    return this;
  }

  /**
   * Returns the position of the label
   * @param {Number} [ index = 0 ] - The index of the label
   * @return {Position} The current position of the label
   */
  getLabelPosition( index ) {
    return this.getProp( 'labelPosition', index || 0 );
  }

  /**
   * Sets the position of the label
   * @param {Position} position - The position of the label
   * @param {Number} [ index = 0 ] - The index of the label
   * @return {Shape} The current shape
   */
  setLabelPosition( position, index ) {

    var self;
    var pos = GraphPosition.check( position, function( relativeTo ) {
      return self.getRelativePosition( relativeTo );
    } );

    this.setProp( 'labelPosition', pos, index || 0 );
    return this;
  }

  /**
   * Sets the angle of the label
   * @param {Number} angle - The angle of the label in degrees (0 to 360°)
   * @param {Number} [ index = 0 ] - The index of the label
   * @return {Shape} The current shape
   */
  setLabelAngle( angle, index ) {
    this.setProp( 'labelAngle', angle, index || 0 );
    return this;
  }

  /**
   * Sets the baseline of the label, which affects its y position with respect to the text direction. For text along the x direction, different baselines will reference differently the text to the ```y``` coordinate.
   * @param {String} baseline - The baseline of the label. Most common baselines are ```no-change```, ```central```, ```middle``` and ```hanging```. You will find an explanation of those significations on the [corresponding MDN article]{@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/dominant-baseline}
   * @param {Number} [ index = 0 ] - The index of the label
   * @return {Shape} The current shape
   */
  setLabelBaseline( baseline, index ) {
    this.setProp( 'labelBaseline', baseline, index || 0 );
    return this;
  }

  /**
   * Sets the anchoring of the label. 
   * @param {String} anchor - The anchor of the label. Values can be ```start```, ```middle```, ```end``` or ```inherit```.
   * @param {Number} [ index = 0 ] - The index of the label
   * @return {Shape} The current shape
   */
  setLabelAnchor( anchor, index ) {
    this.setProp( 'labelAnchor', anchor, index || 0 );
    return this;
  }

  /**
   * Sets the anchoring of the label. 
   * @param {String} size - The font size in px
   * @param {Number} [ index = 0 ] - The index of the label
   * @return {Shape} The current shape
   */
  setLabelSize( size, index ) {
    this.setProp( 'labelSize', size, index || 0 );
    return this;
  }

  /**
   * Sets the color of the stroke of the label. 
   * @param {String} color - The color of the stroke
   * @param {Number} [ index = 0 ] - The index of the label
   * @return {Shape} The current shape
   */
  setLabelStrokeColor( color, index ) {
    this.setProp( 'labelStrokeColor', color, index || 0 );
    return this;
  }

  /**
   * Sets the width of the stroke of the label. 
   * @param {Number} width - The width of the stroke
   * @param {Number} [ index = 0 ] - The index of the label
   * @return {Shape} The current shape
   */
  setLabelStrokeWidth( width, index ) {
    this.setProp( 'labelStrokeWidth', width, index || 0 );
    return this;
  }

  /**
   * Applies the generic style to the shape. This is a method that applies to most shapes, hence should not be overridden. However if you create a bundle of shapes that extend another one, you may use it to set common style properties to all your shapes.
   * @return {Shape} The current shape
   */
  applyGenericStyle() {

    this.setDom( "fill", this.getProp( "fillColor" ), true );
    this.setDom( "fill-opacity", this.getProp( "fillOpacity" ), true );
    this.setDom( "stroke", this.getProp( "strokeColor" ), true );
    this.setDom( "stroke-width", this.getProp( "strokeWidth" ), true );
    this.setDom( "stroke-dasharray", this.getProp( "strokeDasharray" ), true );

    var attributes = this.getProps( "attributes" );
    for ( var j = 0, l = attributes.length; j < l; j++ ) {

      for ( var i in attributes[ j ] ) {
        this.setDom( i, typeof attributes[ j ][ i ] == "function" ? attributes[ j ][ i ].call( this, i ) : attributes[ j ][ i ], true );
      }

    }

    this._applyTransforms();

    return this;
  }

  /**
   * Applies the style to the shape. This method can be extended to apply specific style to the shapes
   * @return {Shape} The current shape
   */
  applyStyle() {
    return this.applyGenericStyle();
  }

  /**
   * Returns a computed position object
   * @param {(Number|Position)} [ index = 0 ] - The index of the position to compute
   * @param {Position} relToPosition - A base position from which to compute the position (useful for <code>dx</code> values)
   * @return {Object} The computed position object in the format <code>{ x: x_in_px, y: y_in_px }</code>
   */
  calculatePosition( index ) {

    var position;

    position = ( index instanceof GraphPosition ) ? index : this.getPosition( index );

    if ( !position ) {
      return;
    }

    if ( position && position.compute ) {
      return position.compute( this.graph, this.getXAxis(), this.getYAxis(), this.getSerie() );
    }

    this.graph.throw();
  }

  /**
   * Returns a stored position object
   * @param {Number} [ index = 0 ] - The index of the position to compute
   * @return {Position} The current shape
   */
  getPosition( index ) {

    var pos = this.getProp( 'position', ( index || 0 ) );
    this.setProp( 'position', ( pos = GraphPosition.check( pos ) ), index );
    return pos;
  }

  /**
   * Sets a position object
   * @param {Position} position - The position object to store
   * @param {Number} [ index = 0 ] - The index of the position to store
   * @return {Position} The current shape
   */
  setPosition( position, index ) {

    var self = this;
    var pos = GraphPosition.check( position, function( relativeTo ) {
      return self.getRelativePosition( relativeTo );
    } );

    return this.setProp( 'position', pos, ( index || 0 ) );
  }

  /**
   * Applies the style to the shape. This method can be extended to apply specific style to the shapes
   * @private
   * @return {Shape} The current shape
   */
  _applyTransforms() {

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
  }

  /**
   * Creates all the labels
   * @private
   * @returns {Shape} The current shape
   */
  makeLabels() {

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

        self._labels[ i ].addEventListener( 'dblclick', function( e ) {
          e.stopPropagation();
          self.labelDblClickListener( e );
        } );

      }
      i++;
    }

    this.updateLabels();

    return this;
  }

  /**
   * Determines if the label is editable
   * @param {Number} labelIndex - The index of the label
   * @return {Boolean} ```true``` if the label is editable, ```false``` otherwise
   */
  isLabelEditable( labelIndex ) {
    return this.getProp( 'labelEditable', labelIndex || 0 );
  }

  /**
   * Applies the label data to the dom object
   * @private
   * @param {Number} labelIndex - The index of the label
   * @returns {Shape} The current shape
   */
  updateLabels() {

    var self = this;
    this._labels = this._labels || [];

    for ( var i = 0, l = this._labels.length; i < l; i++ ) {
      this._applyLabelData( i );

    }

  }

  /**
   * Applies the label data to the dom object
   * @private
   * @param {Number} labelIndex - The index of the label
   * @returns {Shape} The current shape
   */
  _applyLabelData( labelIndex ) {

    labelIndex = labelIndex || 0;

    /** Sets the position */

    var visible = this.getProp( 'labelVisible', labelIndex );

    if ( visible === false ) {
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

    /** Sets the size */
    this._labels[ labelIndex ].setAttribute( "font-size", this.getProp( 'labelSize', labelIndex ) + "px" ||  "12px" );

    /** Sets the anchor */
    this._labels[ labelIndex ].setAttribute( 'text-anchor', this._getLabelAnchor( labelIndex ) );

    /** Sets the stroke */
    this._labels[ labelIndex ].setAttribute( 'stroke', this.getProp( 'labelStrokeColor', labelIndex ) );

    /** Sets the stroke */
    this._labels[ labelIndex ].setAttribute( 'stroke-width', this.getProp( 'labelStrokeWidth', labelIndex ) + "px" );

    this._labels[ labelIndex ].setAttribute( 'stroke-location', 'outside' );

    return this;
  }

  /**
   * Returns the anchor of the label
   * @private
   * @param {Number} labelIndex - The index of the label
   * @returns {String} The anchor in SVG string
   */
  _getLabelAnchor( labelIndex ) {
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
  }

  /**
   * Returns the shape selection status
   * @returns {Boolean} true is the shape is selected, false otherwise
   */
  isSelected() {
    return this._selectStatus ||  false;
  }

  /**
   * Sets or queries whether the shape can have handles. Even if the property is set to false, the getter can return true if the property ```statichandles``` is true (used when handles never disappear)
   * @param {Boolean} setter - If used, defined if the shape has handles or not
   * @returns {Boolean} true is the shape has handles, false otherwise
   * @example Shape.hasHandles( true ); // Sets that the shape has handles
   * @example Shape.hasHandles( false ); // Sets that the shape has no handles
   * @example Shape.hasHandles( ); // Queries the shape to determine if it has handles or not. Also returns true if handles are static
   */
  hasHandles( setter ) {

    if ( setter !== undefined ) {
      this.setProp( 'handles', setter );
    }

    return !!this.getProp( 'handles' ) || !!this.getProp( 'statichandles' );
  }

  /**
   * Adds shape handles 
   * @private 
   * @return {Shape} The current shape
   */
  addHandles() {

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
  }

  /**
   * Remove shape handles 
   * @private 
   * @return {Shape} The current shape
   */
  removeHandles() {

    this.hideHandles();
    this.handles = [];
  }

  /**
   * Hide shape handles 
   * @private 
   * @return {Shape} The current shape
   */
  hideHandles() {

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
   * @return {Boolean} ```true``` if the handles are in the DOM
   */
  areHandlesInDom() {

    return this.handlesInDom;
  }

  /**
   * Selects the shape. Should only be called from jsGraph main instance
   * @private
   * @param {Boolean} [ mute = false ] - Mutes the method (no event emission)
   * @returns {Shape} the current shape
   */
  _select( mute ) {

    if ( !this.isSelectable() ) {
      return false;
    }

    // Put on the stack
    this.appendToDom();
    //this.graph.appendShapeToDom( this ); // Put the shape on top of the stack !

    this._selectStatus = true;

    this.applySelectedStyle();

    if ( this.hasHandles() && !this.hasStaticHandles() ) {
      this.addHandles();
      this.setHandles();
    }

    if ( !mute ) {
      this.graph.emit( "shapeSelected", this );
    }
  }

  applySelectedStyle() {

    if ( !this._selectStatus ) {
      return;
    }

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
  }

  /**
   * Unselects the shape. Should only be called from jsGraph main instance
   * @private
   * @param {Boolean} [ mute = false ] - Mutes the method (no event emission)
   * @returns {Shape} the current shape
   */
  _unselect( mute ) {

    this._selectStatus = false;

    util.restoreDomAttributes( this._dom, 'select' );

    if ( this.hasHandles() && !this.hasStaticHandles() ) {
      this.hideHandles();
    }

    if ( !mute ) {
      this.graph.emit( "shapeUnselected", this );
    }
  }

  /**
   * Returns the special style of the shape when it is selected.
   * @see Shape#setSelectStyle
   * @param {Object<String,String>} The SVG attributes to apply to the shape
   */
  getSelectStyle() {
    return this.selectStyle;
  }

  /**
   * Defines the style that is applied to the shape when it is selected. The style extends the default style of the shape
   * @param {Object<String,String>} [ attr = {} ] - The SVG attributes to apply to the shape
   * @example rectangle.setSelectStyle( { fill: 'red' } );
   * @returns {Shape} the current shape
   */
  setSelectStyle( attr ) {
    this.selectStyle = attr;
    this.applySelectedStyle(); // Maybe the shape is already selected
    return this;
  }

  /**
   * Assigns static handles to the shape. In this mode, handles will not disappear
   * @param {Boolean} staticHandles - true to enable static handles, false to disable them.
   * @returns {Shape} the current shape
   */
  setStaticHandles( staticHandles ) {
    this.setProp( 'staticHandles', staticHandles );
  }

  /**
   * @returns {Boolean} ```true``` if the shape has static handles, ```false``` otherwise
   */
  hasStaticHandles( staticHandles ) {
    return !!this.getProp( 'staticHandles' );
  }

  /**
   * Creates the handles for the shape
   * @param {Number} nb - The number of handles
   * @param {String} type - The type of SVG shape to use
   * @param {Object<String,String>} [ attr = {} ] - The SVG attributes to apply to the handles
   * @param {Function} [ callbackEach ] - An additional callback the user can provide to further personalize the handles
   * @returns {Shape} the current shape
   * @private
   */
  _createHandles( nb, type, attr, callbackEach ) {

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
  }

  /**
   * Creates the handles for the shape. Should be implemented by the children shapes classes.
   */
  createHandles() {

  }

  /**
   * Handles mouse down event
   * @private
   * @param {Event} e - The native event.prototype
   */
  handleMouseDownImpl() {}

  /**
   * Handles the mouse move event
   * @private
   * @param {Event} e - The native event.prototype
   */
  handleMouseMoveImpl() {}

  /**
   * Handles mouse up event
   * @private
   * @param {Event} e - The native event.prototype
   */
  handleMouseUpImpl() {}

  /**
   * Called when the shape is created
   * @private
   * @param {Event} e - The native event.prototype
   */
  handleCreateImpl() {}

  /**
   * Handles mouse down events
   * @param {Event} e - The native event
   * @return The result of the {@link Shape#handleMouseDownImpl} method.prototype
   */
  handleMouseDown( e ) {

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
  }

  /**
   * Handles mouse click events
   * @param {Event} e - The native event
   * @return The result of the {@link Shape#handleMouseDownClick} method
   * @private
   */
  handleClick( e ) {

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
  }

  /**
   * Handles mouse click events
   * @param {Event} e - The native event
   * @return The result of the {@link Shape#handleMouseUpImpl} method
   * @private
   */
  handleMouseMove( e ) {
    //console.log( this.resizinh, this.moving, this.isSelected(), this._mouseCoords );
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

  }

  /**
   * Handles mouse up events
   * @param {Event} e - The native event
   * @return The result of the {@link Shape#handleMouseUpImpl} method
   * @private
   */
  handleMouseUp( e ) {

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
  }

  /**
   * Handles double click events
   * @param {Event} e - The native event
   * @return The result of the {@link Shape#handleMouseDblClickImpl} method
   * @private
   */
  handleDblClick( e ) {

  }

  /**
   * Handles mouse over events
   * @param {Event} e - The native event
   * @return The result of the {@link Shape#handleMouseOverImpl} method
   * @private
   */
  handleMouseOver() {

    if ( this.getProp( "highlightOnMouseOver" ) ) {

      if ( !this.moving && !this.resizing ) {
        this.highlight();
      }
    }

    this.graph.emit( "shapeMouseOver", this );
  }

  /**
   * Handles mouse out events
   * @param {Event} e - The native event
   * @return The result of the {@link Shape#handleMouseOutImpl} method
   * @private
   */
  handleMouseOut() {

    if ( this.getProp( "highlightOnMouseOver" ) ) {
      this.unHighlight();
    }

    this.graph.emit( "shapeMouseOut", this );
  }

  /*
   *  Updated July 1st, 2015
   */

  /**
   * Locks the shape (prevents selection, resizing and moving)
   * @return {Shape} The current shape
   */
  lock() {
    this.setProp( 'locked', true );
    return this;
  }

  /**
   * Unlocks the shape (prevents selection, resizing and moving)
   * @return {Shape} The current shape
   */
  unlock() {
    this.setProp( 'locked', false );
    return this;
  }

  /**
   * @return {Boolean} True if the shape is locked, false otherwise
   */
  isLocked() {
    return this.getProp( 'locked' ) || this.graph.shapesLocked;
  }

  /**
   * Makes the shape moveable
   * @return {Shape} The current shape
   */
  movable( bln ) {
    this.setProp( 'movable', true );
  }

  /**
   * Makes the shape non-moveable
   * @return {Shape} The current shape
   */
  unmovable() {
    this.setProp( 'movable', false );
    return false;
  }

  /**
   * @return {Boolean} True if the shape is movable, false otherwise
   */
  isMovable() {
    return this.getProp( 'movable' );
  }

  /**
   * Makes the shape resizable
   * @return {Shape} The current shape
   */
  resizable() {
    this.setProp( 'resizable', true );
  }

  /**
   * Makes the shape non-resizable
   * @return {Shape} The current shape
   */
  unresizable() {
    this.setProp( 'resizable', false );
  }

  /**
   * @return {Boolean} True if the shape is resizable, false otherwise
   */
  isResizable() {
    return this.getProp( 'resizable' );
  }

  /**
   * Makes the shape selectable
   * @return {Shape} The current shape
   */
  selectable() {
    this.setProp( 'selectable', true );
  }

  /**
   * Makes the shape non-selectable
   * @return {Shape} The current shape
   */
  unselectable() {
    this.graph.unselectShape( this );
    this.setProp( 'selectable', false );
  }

  /**
   * @return {Boolean} True if the shape is selectable, false otherwise
   */
  isSelectable() {
    return this.getProp( 'selectable' );
  }

  /**
   * Highlights the shape with attributes
   * @returns {Shape} The current shape
   * @param {Object<String,String>} [ attributes ] - A hashmap of attributes to apply. If omitted, {@link Shape#getHighlightAttributes} will be called
   * @param {String} [ saveDomName=highlight ] - The name to which the current shape attributes will be saved to be recovered later with the {@link Shape#unHighlight} method
   * @example shape.highlight( { fill: 'red', 'fill-opacity': 0.5 } );
   * @see Shape#unHighlight
   */
  highlight( attributes, saveDomName ) {

    if ( !attributes ) {
      attributes = this.getHighlightAttributes();
    }

    if ( !saveDomName ) {
      saveDomName = "highlight";
    }

    util.saveDomAttributes( this._dom, attributes, saveDomName );
    this.highlightImpl();
    return this;
  }

  /**
   * Removes the highlight properties from the same
   * @returns {Shape} The current shape 
   * @param {String} [ saveDomName=highlight ] - The name to which the current shape attributes will be saved to be recovered later with the {@link Shape#unHighlight} method
   * @see Shape#highlight
   */
  unHighlight( saveDomName ) {

    if ( !saveDomName ) {
      saveDomName = "highlight";
    }

    util.restoreDomAttributes( this._dom, saveDomName );
    this.unHighlightImpl();
    return this;
  }

  highlightImpl() {}
  unHighlightImpl() {}

  /**
   * @returns {Object} The attributes taken by the shape when highlighted
   * @see Shape#highlight
   */
  getHighlightAttributes() {
    return this._highlightAttributes;
  }

  /**
   * Sets the attributes the shape will take when highlighted
   * @param {Object<String,String>} [ attributes ] - A hashmap of attributes to apply when the shape is highlighted
   * @returns {Shape} The current shape
   * @see Shape#highlight
   */
  setHighlightAttributes( attributes ) {
    this._highlightAttributes = attributes;
    return this;
  }

  /**
   * Returns the masking id of the shape. Returns null if the shape does not behave as a mask
   * @returns {String} The ```id``` attribute of the shape
   */
  getMaskingID() {
    return this.maskingId;
  }

  /**
   * Masks the current shape with another shape passed as the first parameter of the method
   * @param {Shape} maskingShape - The shape used to mask the current shape
   * @return {Shape} The current shape
   */
  maskWith( maskingShape ) {

    var maskingId;

    if ( maskingId = maskingShape.getMaskingID() ) {

      this._dom.setAttribute( 'mask', 'url(#' + maskingId + ')' );

    } else {

      this._dom.removeAttribute( 'mask' );
    }
  }

  /**
   * Manually updates the mask of the shape. This is needed because the shape needs to be surrounded by a white rectangle (because transparent is treated as black and will not render the shape)
   * This method will work well for rectangles but should be overridden for other shapes
   * @return {Shape} The current shape
   * @todo Explore a way to make it compatible for all kinds of shapes. Maybe the masker position should span the whole graph...
   */
  updateMask() {
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
  }

  labelDblClickListener( e ) {

    var i = parseInt( e.target.getAttribute( 'data-label-i' ) );

    var self = this;

    if ( isNaN( i ) ) {
      return;
    }

    if ( !this.isLabelEditable( i ) ) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    var shapeLabel = document.createElement( 'input' );
    shapeLabel.setAttribute( 'type', 'text' );
    shapeLabel.setAttribute( 'value', self.getProp( 'labelText', i ) );
    self.graph._dom.prepend( shapeLabel );
    util.setCSS( shapeLabel, {
      position: 'absolute',
      marginTop: ( parseInt( e.target.getAttribute( 'y' ).replace( 'px', '' ) ) - 10 ) + 'px',
      marginLeft: ( parseInt( e.target.getAttribute( 'x' ).replace( 'px', '' ) ) - 50 ) + 'px',
      textAlign: 'center',
      width: '100px'
    } );
    shapeLabel.addEventListener( 'blur', function() {
      self.setLabelText( shapeLabel.getAttribute( 'value' ), i );
      self._labels[ i ].textContent = shapeLabel.getAttribute( 'value' );
      shapeLabel.remove();
      self.changed( "shapeLabelChanged" );

    } );
    shapeLabel.addEventListener( 'keyup', function( e ) {
      e.stopPropagation();
      e.preventDefault();
      if ( e.keyCode === 13 ) {
        shapeLabel.dispatchEvent( new Event( 'blur' ) );
      }
    } );
    shapeLabel.addEventListener( 'keypress', function( e ) {
      e.stopPropagation();
    } );
    shapeLabel.addEventListener( 'keydown', function( e ) {
      e.stopPropagation();
    } );
    shapeLabel.focus();

  }

  /**
   * Appends the shape DOM to its parent
   * @private
   * @return {Shape} The current shape
   */
  appendToDom() {

    if ( this._forcedParentDom ) {

      this._forcedParentDom.appendChild( this.group );
    } else {
      this.graph.appendShapeToDom( this );
    }
    return this;
  }

  /**
   * Forces the DOM parent (instead of the normal layer)
   * @return {Shape} The current shape
   */
  forceParentDom( dom ) {

    this._forcedParentDom = dom;

    return this;
  }
}

/**
 * @alias Shape#calculatePosition
 */
Shape.prototype.computePosition = Shape.prototype.calculatePosition;

/**
 * @alias Shape#displayLabel
 */
Shape.prototype.showLabel = Shape.prototype.displayLabel;

/**
 * @alias Shape#kill
 */
Shape.prototype.remove = Shape.prototype.kill;

export default Shape;