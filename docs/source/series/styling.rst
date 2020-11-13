###################
Styling series
###################

Without style, a serie defaults to either a black line (for line series), or round dots for a scatter serie.
In most cases this behaviour is not enough, and we would like to be able to change the color, thickness, dashing/dotting, fill color, etc... of the various series that we want to display.

To this purpose, jsGraph employs the notion of style, which is nothing else than a javascript object. A style is defined by a ``name`` and a collection of attributes

.. note:: 

    There are two default styles that ship with jsGraph and that are involved in the functionning of the library:
    
    * ``unselected``. This is the basic style that renders the serie by default. By default, when performing API calls without setting the style, jsGraph assumes that you mean the ``unselected`` style
    * ``selected``. The style that is displayed when a serie, or, for a scatter plot, some points of the serie, is/are selected. It **inherits** the style ``unselected`` (see below)

Style inheritance
###################

jsGraph allows you to derive some styles from others.
For example, is the style ``unselected`` and ``red`` look like that:

.. code-block:: javascript

    // unselected
    const unselected = {
        line: {
            width: 3,
            color: 'black'
        }
    }

    // red
    const red = {
        line: {
            color: 'red'
        }
    }

and that the following API calls are used:

.. code-block:: javascript

    serie.setStyle( unselected );
    serie.setStyle( red, "red", "unselected"); // <== Red style inherits from Unselected style
    serie.setActiveStyle( "red" );

Then a **thick** red line that is 3px width will be displayed.


.. warning:: 

    All styles must inherit from another one, up and until the style ``unselected``. If no name is provided as the third parameter of the ``setStyle`` API call, ``unselected`` is assumed to be the base style.


Runtime inheritance
______________________

Styles are computed at runtime. In other words, taking the example that is discussed above, if the ``unselected`` style is changed using an API call:

.. code-block:: javascript

    serie.setLineStyle( "4,4", "unselected" ); // <== Second parameter is optional here, because it defaults to "unselected"
    graph.draw();

The serie with the style ``red`` will automatically determine that it should be dashed, because it inherits from the style ``unselected``, which we just said should be dashed.


.. literalinclude:: ../_static/examples/series/style/example1.js
    :language: javascript

This code would display the following graph:

.. raw:: html

    <div>
        <div id="example-1"></div>
        <script type="module" src="../_static/examples/series/style/example1.js"></script>
    </div>

    
Object mutation
______________________

jsGraph allows you to mutate the style objects, but it asks that you warn him that the style has changed.
This is done for optimisations purposes: the style is not recomputed, nor applied, if it hasn't changed. Because we don't want to start observing your objects, we just ask that you notify the serie of the change:


.. code-block:: javascript

    let coloredStyle = { };
    s.setStyle( coloredStyle, "colored" );

    // Later
    coloredStyle.color = 'green';
    s.styleHasChanged( "colored" );

Even if you change a base style that your derived style might be using, that's fine, jsGraph will look at whether any ancestor has been modified and if so, recalculate the whole derived style.


Activating a style
______________________


To activate a style, use the ``activateStyle`` with the name of style you want to apply. jsGraph **does not** redraw by default, for optimisation purposes. You need to call ``graph.draw()`` afterwards.


.. code-block:: javascript

    s.activateStyle("selected");
    // or:
    s.setActivateStyle("selected");
    // Finally, when you're ready to render:
    g.draw();


Line series
###############

For line series, three styles are available:

* The color
* The width
* The dashing

They are available through individual API calls or via the ``setStyle`` method.

API calls
______________

You may use the following method signatures to set the style of the line serie:


.. code-block:: javascript

    // Sets the line width
    s.setLineWidth( widthInPx, styleName = "unselected" );

    // Sets the line color
    s.setLineColor( '#FF0000', styleName = "unselected" );
    s.setLineColor( 'red' /*, styleName... */ ); // Or use a name
    s.setLineColor( 'rgba(1.0, 0.0, 0.0, 1.0)' /*, styleName... */ );

    // Set the line dashing
    s.setLineStyle( 1, styleName="unselected" ); // Sets mode 1. See below
    s.setLineStyle( "4,4" /*, styleName... */) // Directly sets the stroke-dasharray SVG property


There are 12 different modes, for you to use with a counter for example.

* ``1``: Straight line
* ``2``: 1px dots spaced by 1px
* ``3``: 2px lines spaced by 2px
* ``4``: 3px lines spaced by 3px
* ``5``: 4px lines spaced by 4px
* ``6``: 5px lines spaced by 5px
* ``7``: Long dashes, short gaps
* ``8``: Short dashes, large gaps
* ``9``: Long dashes, alternating short and long gaps
* ``10``: Alternating dashed and dots
* ``11``: Very long dashes, short gaps
* ``12``: Short dashes, very long gaps


setStyle method
_________________

Use the setStyle method to set all three parameters at once. Consider the following snippet:


.. code-block:: javascript

    let style = {

        line: {
            color: 'red',
            width: 4,
            style: 2
        }
    };

    s.setStyle( style, "myStyleName", "unselected" ); // <== Inherits from the unselected style, but that parameter is optional
    


Scatter series
###############

Scatter series offer a lot of styling possibilities. You affect the shape, size and appearence of a "marker", which is the element that is displayed at each point of the serie.
What's interesting is that all markers of a serie need not be the same ones. We offer a lot of possibilities to apply modifications.

Basic styling
______________________

You may use a javascript object that will directly be mapped to the SVG properties of the object:


.. code-block:: javascript

    let style = {
        shape: 'circle',
        cx: 0,
        cy: 0,
        r: 3,
        stroke: 'transparent',
        fill: 'black'
    }

Will create the following SVG element

.. code-block:: html

    <circle cx="0" cy="0" r="3" stroke="transparent" fill="black" />

You can therefore use any SVG element available to you.
The only reserved key in the object is ``shape``, which of course is transformed into the SVG node name.

Setting the style
____________________

For scatter series, use the ``setMarkerStyle`` or ``setStyle`` method, with slightly more complex parameters:


.. code-block:: javascript

    let style = {
        shape: 'circle',
        cx: 0,
        cy: 0,
        r: 3,
        stroke: 'transparent',
        fill: 'black'
    }

    // Basic version
    s.setMarkerStyle(style, "styleName", "inheritedStyleName" ); // <== Second and third parameters default to "unselected"

    // With modifiers (see below)
    s.setMarkerStyle(style, arrayOrFuncOfModifiers, "styleName", "inheritedStyleName" ); // <== Third and fourth parameters default to "unselected"

    // Generic setStyle method
    let gStyle = {
        markers: {
            all: style,
            modifiers: arrayOrFuncOfModifiers
        }
    };

    s.setStyle(  gStyle, "styleName", "inheritedStyleName" ); <== Again, second and third parameters default to "unselected"

Modifiers
______________________

Maybe you want to draw attention to a specific marker. In that case, you can use the modifiers to set its properties.
You have two possibilities:

* You may either feed an array of any length, but where the index of the point you want to modify contains a javascript that will extend the style at that position:
        
    .. code-block:: javascript

        let modifiers = Array( n );
        modifiers[ 258 ] = { fill: 'blue' }; // <== Fills the point number 258 with the color blue

* Use a runtime method to determine the modifier on the fly (Be careful when using time sensitive applications)
     
    .. code-block:: javascript

        let modifiers = ( x, y, index ) => { return y > 0 ? { fill: 'green' } : { fill: 'red' } };

The following shows an example of using the style and modifiers:


.. literalinclude:: ../_static/examples/series/style/example2.js
    :language: javascript

This code would display the following graph:

.. raw:: html

    <div>
        <div id="example-2"></div>
        <script type="module" src="../_static/examples/series/style/example2.js"></script>
    </div>


.. note::

    When using a modifier method, return ``false`` to deactivate the marker rendering at that particular index.
    

Individual styles names
________________________

Modifiers work great if you want to highlight some of the markers using a special style. However, you can also assign style names to each point independently.
For example, taking the example above (and adding some animation onto it), we could define two styles:

.. code-block:: javascript
    :emphasize-lines: 7

    let neg = { shape: 'circle', r: 3, fill: 'red' }
    let pos = { shape: 'rect', width: 4, height: 4, x: -2, y: -2, fill: 'green' };

    s.setMarkerStyle(neg, "negative");
    s.setMarkerStyle(pos, "positive");

    s.setIndividualStyleNames((s, i) => s.getWaveform().getY(i) > 0 ? 'positive' : 'negative');


This would output the following graph

.. raw:: html

    <div>
        <div id="example-3"></div>
        <script type="module" src="../_static/examples/series/style/example3.js"></script>
    </div>


Enabling markers with line series
___________________________________

Line series extend from scatter series, but have markers by default disabled. If you want to use markers with a line serie, use 

.. code-block:: javascript

    s.setMarkers( true ); // First parameter defaults to true, so s.setMarkers(); also enable markers


Closing example
################

Obviously, we can start mixing things up and have a little bit of fun:

.. raw:: html

    <div>
        <div id="example-4"></div>
        <script type="module" src="../_static/examples/series/style/example4.js"></script>
    </div>


.. literalinclude:: ../_static/examples/series/style/example4.js
    :language: javascript


That's all we got (for now) !