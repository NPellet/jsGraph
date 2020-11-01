**************************
Getting started
**************************

After you managed to install jsGraph and load into your browser, it's time to display your first graph.

Cosntructor method
###################

The graph constructor takes the following possible forms

.. code-block:: javascript

    const graph = new Graph( wrapper?, options?, axes? );

where all three options are actually optional

Wrapper
==========

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

Y waveforms
++++++++++++++++

Y waveforms occur when the interval between each data point is constant. The offset and scaling between the points can be set either in the constructor or using the ``.rescaleX`` method

.. code-block:: javascript

    let wave1 = Graph.newWaveform( yDataAsArray, offset, scale );

    // or
    wave1.rescaleX( offset, scale );

    