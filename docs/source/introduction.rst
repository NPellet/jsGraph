**************************
Introduction to jsGraph
**************************

jsGraph is a browser-based data plotter. It allows you to display scientific-looking charts and export them in the SVG vector format for high-quality scientific publishing.
However, it is also a lot more than that. It implements fast algorithms that redraw your datasets as fast as possible, allowing redrawings to occur in a fraction of a second. 
Because it is implemented in SVG, jsGraph is an ideal candidate for highly interactive browser-based graphs. You can select series, data points, subscribe to events, zoom in and out, drag the viewing window around, ...

Here are some highlights of the library:

* **Scientific-style** : Display graphs that are sober looking, but that show exactly what you need.
* **Fast rendering** : Millions of points can be drawn in a fraction of a second. We implemented multilevel down-sampling algorithms that allow the fastest rendering time possible. It is expecially effective with the zoom plugin. When zoomed out, only the downsampled version of your data set gets displayed. As you zoom in, the resolution gets finer up to the one defined by your data set.
* **Rich API** : Control exactly how you want your axes, series and annotations to be displayed. We hand you the keys to the finest possible level of control. Of course, you can also use a higher level API for simpler manipulation.
* **Multiple axes** : Series are referenced to axes, which can be placed at the top, bottom, left or right of the graph. You can even have multiple axes on the same side, master-slave axes (for unit conversion, for example) or floating axes, displayed in the middle of the graph.
* **Various series** : jsGraph allows you to display line plots, scatter plots, category plots or box plots, or to combine them together.


TL;DR Show me an example !
================================

.. raw:: html

    <div>
        <div id="graph-example-1"></div>
        <script type="module" src="_static/example_introduction.js"></script>
    </div>

Here is the exact source code that generated this example, with comments

.. literalinclude:: _static/example_introduction.js
    :language: javascript