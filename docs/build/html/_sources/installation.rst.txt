*******************
Installation
*******************
.. role:: javascript(code)
   :language: javascript

Install with npm (recommended)
###############################

Installing jsGraph from `npm <http://npmjs.org>`_ is an easy way to install jsGraph and keep it up to date

.. code-block:: shell

    npm i node-jsgraph


Default file
*****************************
If you use a module resolver, then you should be aware that :javascript:`const Graph = require("jsGraph");` will load the minified UMD file **with** ES6 polyfills.

Download from the Github repository
###################################

The project is hosted on Github and the source code is available open source and released under the MIT licence.

`View on github <https://github.com/NPellet/jsGraph>`_ 

Releases
*****************************
We use github releases to ship the distribution package. Check out the `Release page <https://github.com/NPellet/jsGraph/releases>`_ to download the latest release.


Manual Download
##################

jsGraph can be downloaded and installed manually or via the npm package manager. The project is hosted on Github and the distribution files can be found there. jsGraph has **zero** dependencies and does not rely on any CSS files.

We use Universal Module Definitions to ship jsGraph. That means the library is compatible with AMD definition, CommonJS definition and defaults to Browser global when none exist. 
Select the version to include as a function of your needs:

Minfied version
*****************************
The full-featured, compact version of jsGraph, shipped with all plugins, shapes and series available.  This version ships with Universal Module Definition (see below).

`Download minified <https://raw.githubusercontent.com/NPellet/jsGraph/master/dist/jsgraph.min.js>`_
	
Development code
*****************************
The compiled but not uglified source code can be used for testing purposes and bug reporting. Similarly to the minified version, this file ships with Universal Module Definition.

`Expanded version <https://raw.githubusercontent.com/NPellet/jsGraph/master/dist/jsgraph.js>`_


ES 6 version
*****************************
The source code without ES6 transpilation. Does not include any ES6 polyfills and therefore targets ES6-compatible browsers. This version ships with Universal Module Definition

`Download ES6 minified <https://raw.githubusercontent.com/NPellet/jsGraph/master/dist/jsgraph-es6.min.js>`_

Module bundle
*****************************
For browser that support ES6 modules (or if you want to use as such with your own packager), you can directly include the module file:

`jsgraph-module.min.js <https://raw.githubusercontent.com/NPellet/jsGraph/master/dist/jsgraph-module.js>`_
	



Include jsGraph in your projects
##################################

Universal module definitions
*****************************

Browser global 
===============

Here is how to include jsGraph in your browser using the global object create. The following creates the ```Graph``` object on the ```window``` level of your browser:

.. code-block:: html

    <head>
        <script src="path/to/jsgraph/jsgraph.min.js"></script>
        <!-- Creates the public Graph object -->
    </head>

Which allows you to use it as such:

.. code-block:: html

    <body>
        <script>
            const graph = new Graph( /* ..options.. */ );
        </script>
    </body>


AMD definition
================

If you are using an AMD loader such as RequireJS, you can still use jsGraph:


The following versions are browser-ready and creates the ```Graph``` object on the ```window``` level of your browser:

.. code-block:: html

    <head>
        <script src="path/to/require/js"></script>
    </head>
    <body>
        <script>
            require(['path/to/jsgraph.min'], function( Graph ) {
                <!-- Creates the local Graph object -->
                const graph = new Graph( /* ..options.. */ );
            });
        </script>
    </head>

Obviously, in a real-life example, you would use ```define``` in your module and load jsGraph as a dependency.


CommonJS definition
====================

If you create your own bundle using Webpack, Rollup, Gulp or other, then you can simply the CommonJS definition:

.. code-block:: javascript

    const Graph = require('path/to/jsGraph');
    // Use Graph
    const graph = new Graph( /* ..options.. */ );



ES 6 module definition
*****************************

.. Warning: This version is shipped in a different file because of incompatibilities. You can either use ```jsgraph-module.min.js``` or ```jsgraph-module.js``` for the non-minified version

If you're working with ES6 modules you can use the module files as such:

In a browser
==============

.. code-block:: html

    <body>
    <!--Your page-->
    </body>
    <script type="module" src="./path/to/jsGraph/jsgraph-module.min.js"></script>

  
From another module
=====================

In this case, Graph is default export of the module:

.. code-block:: javascript

    import Graph from 'path/to/jsGraph/jsgraph-module.min.js';

