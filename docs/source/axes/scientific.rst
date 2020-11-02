**************************
Scientific axes
**************************

While displaying scientific plots, you might find yourselves fighting with units and unit scaling. jsGraph helps you with that:

* Displaying scientific notation
* Displaying engineering notation
* Adding the SI prefix when scaling (mg, g, kg, ...)

Let us consider the following example:

.. literalinclude:: ../_static/examples/axes/scientific/example1.js
    :language: javascript


.. raw:: html

    <div>
        <div id="example-1"></div>
        <script type="module" src="../_static/examples/axes/scientific/example1.js"></script>
    </div>

Although years are fairly easy to understand, there's no unit in the y axis. What are we talking about ? Oranges ? Burgers over Bald Eagles ? Or kWh ? Or btu ?
Of course you could include it directly in the label, but we can do better than that.

Setting axes units
**********************

Let's start setting the unit of the axis:

.. code-block:: javascript

    // Setting the SI unit
    g.getLeftAxis().setUnit('Wh').setUnitWrapper('[', ']');

.. raw:: html

    <div>
        <div id="example-2"></div>
        <script type="module" src="../_static/examples/axes/scientific/example2.js"></script>
    </div>

Obviously, the data we're dealing with is not in Wh, but it is given to us in some retarded unit, the **btu**, or british thermal unit. More specifically, in quadrillions of btus. (algthough we may wish for a coal-free world, we're actually going into the opposite direction).
So we must scale the data accordingly. First of all, let's transform all of this into some normal SI unit, the Wh.

We could change the original data, but we could also make use of the ``waveform.setScale`` method:

.. code-block:: javascript

    // Setting the SI unit
    w.setScale( 
        ( 0.000293071 * 1000 )  // Conversion to Wh
        * 1e15                  // there are quadrilions of them
    )

.. raw:: html

    <div>
        <div id="example-3"></div>
        <script type="module" src="../_static/examples/axes/scientific/example3.js"></script>
    </div>

Ok, it's not looking pretty, but at least everything is in SI units, which is good. Let us see how we can play around with the units.

.. warning::

    If you change the scaling of a waveform after binding it to a serie, you should rebind it with ``serie.setWaveform( w )``.


Enabling the scientific scaling
*************************************

First up, enable the scientific scaling:

.. code-block:: javascript

    // Setting the SI unit
    g.getLeftAxis().setScientific( true );


.. raw:: html

    <div>
        <div id="example-4"></div>
        <script type="module" src="../_static/examples/axes/scientific/example4.js"></script>
    </div>

Alright, now we're talking ! The axis now uses scientific units, and adds the exponent in the label.

.. note::

    Scientific scaling allows jsGraph to try to optimize the unit display. If you want to keep complete control of the graph, you have access to the method ``setExponentialFactor``, which scales the axis by ``10^x`` but does not affect the label.
    You may use it in the following condition for example:
        
    .. code-block:: javascript

        // Force GWh display
        g.getLeftAxis()
            .setScientific( false )
            .setUnit('GWh')
            .setExponentialFactor( -9 ); // Need to remove 1 billion to the Wh unit

    .. raw:: html

        <div>
            <div id="example-5"></div>
            <script type="module" src="../_static/examples/axes/scientific/example5.js"></script>
        </div>

    However, note that there is also a possibility to force the exponent factor with scientific scaling (read on to find out how).


Enabling the engineering scaling
===================================

Engineering scaling is a type of scientific scaling, but where the exponent is always a power of 3.
This eliminates the weird 10 :sup:`13` and replaces it by 10 :sup:`12` and multiplies all labels by 10. That's normally a lot more natural if you're dealing when quantities, like time, mass, etc.


Forcing the exponent
===================================

When in scientific scale, force the exponent of the axis using ``axis.setScientificExponent( 3 )``, for example, to display the axis in ``x1000 Wh``. 


Using unit decades
************************

Instead of displaying ``10^x`` in the scale, you may be interested in displaying a letter (e.g. n for nano, T for tera, etc...). Use the ``setUnitDecade`` together with ``setScientificScaling`` for that purpose:

.. code-block:: javascript

    g.getLeftAxis()
        .setScientific( true )
        .setUnitDecode( true );

.. raw:: html

    <div>
        <div id="example-6"></div>
        <script type="module" src="../_static/examples/axes/scientific/example6.js"></script>
    </div>

See how now the data displayed is in ``TWh``, instead of ``Wh`` x10 :sup:`13` .

jsGraph will replace the unit scaling by the following letters when appropriate:

* 10 :sup:`-15` : ``f`` 
* 10 :sup:`-12` : ``p`` 
* 10 :sup:`-9` : ``n`` 
* 10 :sup:`-6` : ``µ`` 
* 10 :sup:`-3` : ``k`` 
* 10 :sup:`3` : ``k`` 
* 10 :sup:`6` : ``M`` 
* 10 :sup:`9` : ``G`` 
* 10 :sup:`12` : ``T`` 
* 10 :sup:`15` : ``E`` 


Log scale
**************************

We finish our discussion of the scientific axes by mentionning that you can ask the axis to display a logarithmic scale (only in base 10 for now). Use: 



.. literalinclude:: ../_static/examples/axes/scientific/example7.js
    :language: javascript
    :emphasize-lines: 17


.. raw:: html

    <div>
        <div id="example-7"></div>
        <script type="module" src="../_static/examples/axes/scientific/example7.js"></script>
    </div>
