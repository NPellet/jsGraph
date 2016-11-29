---
layout: page
title: Getting Started
subtitle: Download, install and run jsGraph in a nutshell
permalink: /getting-started
---

Download
-----------
{{ site.version }}

<p class="larger">
	jsGraph can be downloaded and installed manually or via a package manager, such as npm or bower. The project is hosted on Github and the distribution files can be found there. jsGraph has no dependencies and can be utilized without jQuery.
</p>

<div class="row" id="jsgraph-download">
	<div class="col-sm-3">

		<h3>
			Minified version
		</h3>

		<p class="">
			The full-featured, compact version of jsGraph, shipped with all plugins, shapes and series available
		</p>

		<button class="btn btn-default">
			<a href="https://raw.githubusercontent.com/NPellet/jsGraph/master/dist/jsgraph.min.js">Download minified ({{ site.minifiedsize }}kb)</a>
		</button>

	</div>


	<div class="col-sm-3">
		<h3>
			ES6 version
		</h3>

		<p class="">
			The source code without ES6 transpilation. Targets ES6-compatible browsers for specific applications
		</p>
		<button class="btn btn-default">
			<a href="https://raw.githubusercontent.com/NPellet/jsGraph/master/dist/jsgraph-es6.min.js">Download minified ({{ site.minifiedsize_es6 }}kb)</a>
		</button>


	</div>
	<div class="col-sm-3">

		<h3>
			Source code
		</h3>

		<p class="">
			The compiled but not uglified source code can be used for testing purposes and bug reporting
		</p>

		<button class="btn btn-default">
			<a href="https://raw.githubusercontent.com/NPellet/jsGraph/master/dist/jsgraph.js">Expanded version ({{ site.size }}kb)</a>
		</button>

	</div>

	<div class="col-sm-3">


		<h3>
			Github repo
		</h3>

		<p class="">
			The project is hosted on Github, for those who want to contribute to the project. Come check it out !
		</p>

		<button class="btn btn-default">
			<a href="https://raw.githubusercontent.com/NPellet/jsGraph/master/dist/jsgraph.js">View on Github</a>
		</button>

	</div>


</div>


Install with npm
-------
<p class="larger">


Installing jsGraph from <a href="http://npmjs.org">npm</a> is an easy way to install jsGraph and keep it up to date

</p>

```
npm install node-jsgraph --save-dev
```

Install with bower
-------
<p class="larger">
	Alternatively, jsGraph is also available from the bower package manager
</p>
```
bower install jsgraph
```


Loading jsGraph into your browser
--------
<p class="larger">
	jsGraph is available both for direct inclusion or as an anonymous AMD module loadable with [requirejs](http://requirejs.org). It does not rely on external libraries, therefore does not necessarily have to be loaded after jQuery, for example.
</p>

### Loading manually

Simply paste the script inclusion tag anywhere in your webpage. jsGraph loads synchronously, so if you place it the header part of your page, it will be readily available in the other scripts. When loaded manually, jsGraph creates a unique global object named ```Graph``` - the graph constructor - available from the ```window``` object.

{% highlight html %}
<!-- Includes jsGraph library -->
<script src="path/to/jsgraph/jsgraph.min.js"></script>
{% endhighlight %}

### Loading with requirejs

If you are using a AMD structure using requirejs or other, jsGraph will register itself as an anonymous module. To load it, just use:

{% highlight javascript %}
require( [ 'path/to/jsgraph' ], function( Graph ) {
  // new Graph(); is available
});
{% endhighlight %}

In this case, the Graph object is not exposed to the ```window``` element anymore.

### Your first graph

Creating a graph requires only a few lines of code, which involve:

* Creation of a new graph instance, for which you need to specify the DOM element container.
* Set the size of the container
* Creation of a least one serie (although not necessary)
* Assign some axes to the serie
* Set some data of the serie
* *Draw everything*

Which translates into the following code:

{% highlight javascript %}
var graph = new Graph("containerId"); // Also accepts a DOM element (but not a jQuery element);
graph.resize( width, height );	// Resizes the container

graph.newSerie( "serieName" ) // Creates a new serie
	.autoAxis()	// Assigns axes
	.setData( [ [ x1, y1 ], [ x2, y2 ], [ x3, y3 ], [ xn, yn ] ] ); // Set data

graph.draw(); // Draw
{% endhighlight %}