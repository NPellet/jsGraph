**************************
Getting started
**************************

.. note:: TL,DR

    .. code-block:: javascript
        
        let graph = new Graph( htmlDivID, someOptions );
        let wave1 = graph.newWaveform().setData( yDataAsArray, xDataAsArray );
        let serie = graph.newSerie('someSerieName').setWaveform( wave1 ).autoAxis();
        graph.draw();
        

After you managed to install jsGraph and load into your browser, it's time to display your first graph.

Graph Constructor method
##########################

The graph constructor takes the following possible forms

.. code-block:: javascript

    const graph = new Graph( wrapper?, options?, axes? );

where all three options are actually optional

DOM Wrapper
=============

The Wrapper is the DOM element into which jsGraph will inject some SVG and HTML code. It can be the id of the container, or the html element itself:


.. code-block:: html

    <div id="graph-container" />

.. code-block:: javascript

    const graph = new Graph( "graph-container" );
    // ...or
    const container = document.getElementById( 'graph-container' );
    const graph = new Graph( container );

    // ...or, from jQuery
    const container = $("#graph-container");
    const graph = new Graph( container.get() );

You can delay the use of the wrapper and call the ``setWrapper`` method later on:

.. code-block:: javascript

    graph.setWrapper( domWrapper );

If no width / height options are passed in the constructor, jsGraph will attempt to find out the dimension of the container, using `getComputedStyle <https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle>`_.

If it doesn't work out, you will need to call ``graph.resize( widthInPx, heightInPx )`` before you call the ``draw()`` method.


Options
==========

jsGraph receives a variety of options that can be set in the constructor. Most options occur with the axes or the series, but the graph itself takes a few of them.
Here's a full example of them with their default value:

.. code-block:: javascript

    const GraphOptionsDefault = {
        title: '', // The title of the graph

        paddingTop: 30, // Top padding, important if there's a title
        paddingBottom: 5, 
        paddingLeft: 20,
        paddingRight: 20,

        // If you want to add dummy lines to make the graph appear as a rectangle
        close: {
            left: true,
            right: true,
            top: true,
            bottom: true
        },

        // Color of the closing lines
        closeColor: 'black',

        // Default font size and font used for the whole graph. Can be overridden for each component
        fontSize: 12,
        fontFamily: 'Myriad Pro, Helvetica, Arial',

        // Refer to the interaction documentation to understand those
        plugins: {},
        mouseActions: [],
        keyActions: [],
    
        // Where clicking somewhere on the graph unselects the shape
        shapesUnselectOnClick: true,

        // Whether there can be only one shape selected at the same time
        shapesUniqueSelection: true,

        // Axes. Continue reading to understand this syntax
        axes: {}

    };

Axes
==========

The axes settings can also be part of the constructor. Either use them as part of the options, under the key ``axes`` , or, for legacy reasons, as part of the third argument in the constructor.

Here's the syntax to use:

.. code-block:: javascript

    // Do not use const, read why
    let axes = {
        top: [
            { /* axis definition */ },
            { /* a second top axis definition */ }
        ],
        bottom: [],
        left: [ 
            { /* a right axis definition */ }
        ],
        right: []
    };

jsGraph does **not** make a copy of this object. Also, options are pretty dynamic, so it may be that jsGraph fills those objects with internal values.
This is useful when you want to dump the axis object, save it, and reload it some other time.

Axis definition
+++++++++++++++++++

Here are the default options that you may override for each axis:

.. code-block:: javascript

    let axisDefault = {
        // Give it a unique name to retrieve it later 
        name: undefined,

        // Value of the axis label
        labelValue: '',

        // You can put false here if you decide to use the axis but not to display it
        display: true,

        // Flip the axis, where the high-end value is to the right or the bottom, and the low-end value to the left / top
        flipped: false,

        // Use this to draw a vertical or horizontal line at that value. For example, for a straight line at 0, use lineAt: 0
        lineAt: false,

        // Adds a certain percentage of padding to the axis, with respect to the min/max values provided by the series.
        axisDataSpacing: { min: 0.1, max: 0.1 },

        // This can be used to display the value differently. More on that later
        unitModification: false,

        // Display the primary grid, corresponding to the primary ticks (the ones with labels)
        primaryGrid: true,

        // Display the secondary grid, corresponding to the secondary ticks
        secondaryGrid: true,

        // Self-exlanatory grid styling
        primaryGridWidth: 1,
        primaryGridColor: '#f0f0f0',
        primaryGridDasharray: undefined,
        primaryGridOpacity: undefined,
        primaryTicksColor: 'black',

        secondaryGridWidth: 1,
        secondaryGridColor: '#f0f0f0',
        secondaryGridDasharray: undefined,
        secondaryGridOpacity: undefined,
        secondaryTicksColor: 'black',

        // Use true to hide the axis when all the series associated to it are hidden
        hideWhenNoSeriesShown: false,

        // Offset the low-end value of the graph to 0
        shiftToZero: false,

        // Tick positions with respect to the axis line: TICKS_INSIDE, TICKS_CENTERED, TICKS_OUTSIDE are possibilities
        tickPosition: Graph.TICKS_INSIDE,

        // Approximate number of primary ticks to display on the whole axis. It is an indication that jsGraph works with, but when working with decimal values, variations can occur
        nbTicksPrimary: 3,

        // Approximate number of secondary ticks to display between each primary tick
        nbTicksSecondary: 10,

        // Use scientific scaling, where values of the ticks are displayed in the scientific notation
        scientificScale: false,

        // Use a value to force the scientific exponent, rather than letting jsGraph determine the best one
        scientificScaleExponent: false,

        // Engineering scale is similar to scientific scale, but only with exponents in multiples of 3. (ug, mg, g, kg, ...)
        engineeringScale: false,

        // The following three options scale the value of the ticks, when scientific scaling is off

        // Scale the value of the tick by that factor. Useful for unit conversion
        ticklabelratio: 1,
        // Multiplies the tick values by 10^x, where x is the exponential factor
        exponentialFactor: 0,
        // Same as the exponentialFactor, but also applied to the label itself, when using scientific scaling
        exponentialLabelFactor: 0,

        // Display the axis as a log scale
        logScale: false,

        // Force the min and the max value. Zooming is still possible, but the min/max values provided by the series become irrelevant
        forcedMin: false,
        forcedMax: false,

        // You can use this setting to not display the axis over the full width / height of the graph. Value in normalized percentage (0 = 0%, 1 = 100%)
        span: [0, 1],

        // Set the unit of the axis
        unit: false,

        // Wrap it in the following string
        unitWrapperBefore: '',
        unitWrapperAfter: '',

        // Add the unit in each tick
        unitInTicks: false,

        // Adjust the offset between the tick and its label
        tickLabelOffset: 0,

        // You can display a katex formula as the label, more on this later
        useKatexForLabel: false,

        // Sets the upper bond that the axis can reach and disregards the value given by the series if their are higher/lower
        highestMax: undefined,
        lowestMin: undefined

    };

Adding a serie
#################

Obviously the first thing we'll want to do is to create a new serie. But before that, we need to understand the concept of waveforms

Understanding waveforms
==========================

Waveforms are not much more than a suger coating over standard javascript arrays. In their more general sense they represent actual data to be plotted.
However they provide a bunch of useful features which target handling the data, and therefore are independent of the serie itself, which aims to display that data.


Create a waveforms
+++++++++++++++++++++++

Nothing simpler than creating a waveform. The Graph object exposes a shortcut to the constructor using

.. code-block:: javascript

    let waveform = Graph.newWaveform();


XY waveforms
++++++++++++++++++++++

XY waveforms are perhaps the most obvious one. It's a bunch of Y data corresponding to a bunch of X data.
Whether they represent scattered data or should be linked with a line is irrelevant.

.. note:: 

    When used to display a line data and when it can be determined that the x values are monotoneously increasing, jsGraph decreased the rendering time by ignoring the data before the minimum bound of the x axis and the data above the maximum bound of that same axes.
    Obviously there are a lot more optimisation at play, but that's just one of them...

To set the XY data to a waveform, use the ``setData`` method:


.. code-block:: javascript

    waveform.setData( yArray, xArray );

.. warning:

    Note how the first parameter is the y array, and the second parameter is the x array. This is for historical reasons and because the second parameter is optional (more on that in the next paragraph)

X as a waveform 
_________________

In this format, jsGraph actually maintains two waveforms, the main one for the y data set, and one for the x dataset.
It therefore also allows you to do the following


.. code-block:: javascript

    // given xWaveform, yWaveform
    xWaveform.setData( xArray );
    yWaveform.setData( yArray );
    yWaveform.setXWaveform( xWaveform );
    xWaveform.math( /*...*/ ) // to apply math of the x data set

Y waveforms
++++++++++++++++

Y waveforms occur when the interval between each data point is constant. The offset and scaling between the points can be set either in the constructor or using the ``.rescaleX`` method

.. code-block:: javascript

    let wave1 = Graph.newWaveform( yDataAsArray, offset, scale );

    // or
    wave1.rescaleX( offset, scale );

The first ``y`` value will be at ``offset``, the second at ``offset + scale``, the third at ``offset + scale * 2``, etc.

.. note::

    A third waveform type exists: Hash waveforms. They are used to represent series that go in a bar chart (or category plot). As its name indicates, it doesn't take ``(x,y)`` values, but a hashmap, or more generally a javascript object:
    
    .. code-block:: javascript

        const wave = Graph.newWaveformHash(); // Create the waveform
        wave.setData({ categoryA: yVal, categoryB: yVal2 }); // Setting the data


Creating a new serie
==========================

To create a new serie, simply use the ``graph.newSerie`` method:

.. code-block:: javascript

    let serie = graph.newSerie( serieName, serieOptions, serieType );

The first argument is required, while the other two are optional and default to ``serieOptions: {}`` and ``serieType: Graph.SERIE_LINE``.

* The serie name **must be unique**. If you try to use the name of an existing serie, ``newSerie`` will simply return the existing serie, and you may override it
* The ``serieType`` describes which type of serie you're trying to add. Valid values are:
    ** ``Graph.SERIE_LINE`` or ``"line"``
    ** ``Graph.SERIE_SCATTER`` or ``"scatter"``
    ** ``Graph.SERIE_CONTOUR`` or ``"contour"``: To create contour lines
    ** ``Graph.SERIE_BAR`` or ``"bar"``: To use with bar charts
    ** ``Graph.SERIE_BOX`` or ``"box"``: Box plots
    ** ``Graph.SERIE_LINE_COLORED`` or ``"color"``: Colored line where each segment can have a different color (lower performance than ``Graph.SERIE_LINE``)
    ** ``Graph.SERIE_ZONE`` or ``"zone"``: Typically used to display min/max values as a greyed area
    ** ``Graph.SERIE_DENSITYMAP``: A density map (see the tutorial about how to use density maps)

.. hint::

    Most methods that apply to the series return the serie itself, allowing API calls to be chained:

    .. code-block:: javascript

        let serie = graph.newSerie('name', {}, 'line').methodA().methodB().methodC();

        

Assigning axes to the serie
++++++++++++++++++++++++++++++

A serie needs to have an x and a y axis. They might not be displayed, but they must exist. Most jsGraph axis getters create axes if they don't exist, so don't worry too much about that.
If you would like to use the default axes, use


.. code-block:: javascript

    serie.autoAxis();
    // or:
    serie.autoAxes();

.. important::

    The default axes are the ``left`` axis at index ``0`` and the ``bottom`` at index ``0``. They will be created automatically if they don't exist.

You may of course use other axes. For that, the ``setXAxis( axis )`` and ``setYAxis( axis )`` exist:


.. code-block:: javascript

    serie.setXAxis( graph.getBottomAxis( 1 ) ); // Get the second bottom axis
    serie.setYAxis( graph.getRightAxis() ); // Get the first right axisDataSpacing

    // Don't do that:
    serie.setXAxis( graph.getLeftAxis() ); // Error ! Assigning an y axis while the serie expects and x axis


Drawing the graph
=====================

So far you haven't asked the graph to draw anything. You merely created object and told jsGraph how you wanted to render them.
For the final rendering use:

.. code-block:: javascript

   graph.draw();

Boilerplate example
=====================

Summing up everything we've done, it all boils down to a few lines code. Consider the following complete example:

.. literalinclude:: _static/example_boilerplate.js
    :language: javascript

This code would display the following basic graph:


.. raw:: html

    <div>
        <div id="graph-example-gettingstarted-1"></div>
        <script type="module" src="_static/example_boilerplate.js"></script>
    </div>



Redrawing methods
=====================

To redraw the method, you can rebind the data to the waveform, and the waveform to the serie:

.. code-block:: javascript

   waveform.setData( dataY, dataY ); // Rebinding arrays
   serie.setWaveform( waveform );  // Rebinding waveform
   graph.autoscaleAxes(); // Optional, but rescales the axes to fit the new (?) min/max values
   graph.draw();

Rebinding the data is not an computationnally expensive data. However, sometimes you may loose track of ``dataY`` and ``dataX``.

In this case, you can also directly **mutate** the arrays and not rebind them to the serie. It may be useful if you lose track of where the arrays are.
That's not a problem for jsGraph, but it becomes your responsability to tell the waveform, the serie and the graph that the data has changed.

If you're not sure whether the min / max values have changed:

.. code-block:: javascript

    waveform.mutated(); // Tell the waveform to recompute the min/max
    serie.dataHasChanged(); // Tell the serie that the data has changed
    graph.updateDataMinMaxAxes(); // Tell the graph that there may be new min max values
    graph.autoscaleAxes();
    graph.draw();

If you are sure that the min/max values haven't changed:

.. code-block:: javascript

    s.dataHasChanged(); // Flag the serie for a redraw
    graph.draw();

.. warning::
    
    Even if you do not wish to do call ``autoscaleAxes``, and in the case where the min/max of the data may have changed, you **need** to call the ``mutated`` method on the waveform and the ``updateDataMinMaxAxes`` on the graph object.

Demonstration
+++++++++++++++

.. literalinclude:: _static/example_mutation.js
    :language: javascript

This code would display the following basic graph:


.. raw:: html

    <div>
        <div id="graph-example-gettingstarted-2"></div>
        <script type="module" src="_static/example_mutation.js"></script>
    </div>

