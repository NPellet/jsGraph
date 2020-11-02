***************
Axes spanning
***************
jsGraph allows you to have in a single graph more than one axis at the same position (top, left, right, bottom). Axes don't actually have to take up the 100% of the space, horizontally or vertically.

For example, let us imagine that you want to display different kind of data in the y direction (for example, speed, angle and height), versus one single x axis (let's say time), it might make sense to display all three series in different regions of the graph, because the axes would have nothing to do with each other...

You can do that using the method `axis.setSpan( spanFrom, spanTo )`, where `spanFrom` and `spanTo` must range between `0` and `1` and represents the position in percentage where the axis will start and end.

.. note::

    With the **x** axis, 0 is always at the **left**, and 1 is at the **right**. 
    With the **y** axis, 0 is the **bottom**, and 1 is the **top** (inverse of the traditional SVG coordinates).

Basic example
******************

To illustrate the `setSpan` method, let us make a nice graph with two y axes spanning from 0 to 45% and from 55% to 100%:

.. literalinclude:: ../_static/examples/axes/spanning/example1.js
    :language: javascript

This code would display the following graph:

.. raw:: html

    <div>
        <div id="example-1"></div>
        <script type="module" src="../_static/examples/axes/spanning/example1.js"></script>
    </div>


Overlapping axes
******************

One might wonder how jsgraph handles cases where axis spans overlap. For example ``axisA.setSpan( 0, 55 )`` would clash with ``axisB.setSpan( 50, 100 )``. 
In such cases, jsGraph determines automatically such clashes and offsets one of the axis (the one with the largest index in the stack) by a sufficient amount so that visual perception is not deteriorated. 
In general, jsGraph will try to place as many axis in the first level, and perform iteratively for the following levels. 
For example, if you have `axisA.setSpan( 0, 55 )`, `axisB.setSpan( 50, 100 )` and `axisC.setSpan( 60, 80 )`, then axisC will be placed together with axisA because they don't overlap. 
It will not appear on a third level.

In this particular example, it wouldn't make much sense, but for the sake of it, here is how this example would turn out:

.. literalinclude:: ../_static/examples/axes/spanning/example3.js
    :language: javascript


.. raw:: html

    <div>
        <div id="example-3"></div>
        <script type="module" src="../_static/examples/axes/spanning/example3.js"></script>
    </div>