---
layout: page-sidemenu
subtitle: 'Bar charts'
---
## Bar charts
Since v1.15, jsGraph allows you to use the bar chart series together with the bar x axis. The two have to work together, i.e. you cannot assign a line serie to a bar axis neither a bar serie to a normal or a time axis. In addition, for now, bar graphs are only accepted in the x direction (vertical bars).

### <a id="definition"></a> Defining the bar axis

To define the bar axis, you need to pass its reference to the ```Graph``` constructor:

{% highlight javascript %}
new Graph( "domId", options, { bottom: [ { type: 'bar' } ] } );
{% endhighlight %}

Alternatively, you can also overwrite the default x axis using:

{% highlight javascript %}
var graph = new Graph( "domId", options );
var axis = new ( Graph.getConstructor( 'graph.axis.x.bar' ) );
var options = {};
axis.init( graph, options );
graph.setBottomAxis( axis, 0 );
{% endhighlight %}

### <a id="categories"></a>Defining the categories

The next step is to assign the categories that jsGraph should recognize. A category is like an axis value, except that it can take text. When multiple series are used, the values that have the same category will be displayed next to each other.

To define categories, simply use the following setter

{% highlight javascript %}
axis.categories = [ { title: "Category 1", name: "cat1" }, { title: "Category 2", name: "cat2" } ];
{% endhighlight %}

### <a id="series"></a>Creating series

Alright, then we have to create a few series. The serie creation is the same as for any other serie, and take the type ```Graph.SERIE_BAR``` or, if you prefer, the string ```"bar"```:

{% highlight javascript %}
var s1 = graph.newSerie( "serie1", {}, Graph.SERIE_BAR );
// Equivalent to var s1 = graph.newSerie( "serie1", {}, "bar" );

// Let's define a second one
var s2 = graph.newSerie( "serie2", {}, Graph.SERIE_BAR );

s1.autoAxis();
s2.autoAxis();
{% endhighlight %}

There is however one extra step you need to make: you need to tell the axis that the series belong to it. That extra step is, we realize, a real pain, because you need to reassign the series to the axis when creating new ones and when removing them. But it also allows you to specify the order of the series. Maybe we will be able to remove this extra instruction in future releases. In the meantime, here's the syntax:

{% highlight javascript %}
axis.setSeries( s1, s2 [, ...] );
{% endhighlight %}

### <a id="data"></a>Setting data

Setting data to the serie takes an object which keys are the names of the categories:

{% highlight javascript %}
s1.setData( { "cat1": 5, "cat2": 12 } );
s2.setData( { "cat1": 8, "cat2": 10 } );
{% endhighlight %}

### <a id="styling"></a>Styling the series

Some additional styling options are available to differentiate series from one another. In additions to the methods provided by the line serie (```setLineWidth```, ```setLineColor```, the bar series take the additional ```setFillColor``` and ```setFillOpacity``` method which set the inner color and inner opacity of the bars, respectively. Bar charts take no markers.

{% highlight javascript %}
s1.setLineColor('crimson').setFillColor('crimson').setFillOpacity( 0.5 );
s2.setLineColor('DarkGreen').setFillColor('DarkGreen').setFillOpacity( 0.5 );
{% endhighlight %}


### <a id="example"></a>Results

Ok, let's take all of this code, put it together and display the result:

{% highlight javascript %}
var graph = new Graph( "example-1" );
graph.resize( 400, 300 );

var axis = new ( Graph.getConstructor( 'graph.axis.x.bar' ) )
var options = {};
axis.init( graph, options );
graph.setBottomAxis( axis, 0 );
axis.categories = [ { title: "Category 1", name: "cat1" }, { title: "Category 2", name: "cat2" } ];

var s1 = graph.newSerie( "serie1", {}, Graph.SERIE_BAR );
s1.autoAxis();
s1.setData( { "cat1": 5, "cat2": 12 } );
s1.setLineColor('crimson').setFillColor('crimson').setFillOpacity( 0.5 );

var s2 = graph.newSerie( "serie2", {}, Graph.SERIE_BAR );
s2.autoAxis();
s2.setData( { "cat1": 8, "cat2": 10 } );
s2.setLineColor('DarkGreen').setFillColor('DarkGreen').setFillOpacity( 0.5 );

axis.setSeries( s1, s2 );
graph.draw();
{% endhighlight %}

<div id="example-1" class="jsgraph-example"></div>
<script>
	var graph = new Graph( "example-1" );
	graph.resize( 400, 300 );

	var axis = new ( Graph.getConstructor( 'graph.axis.x.bar' ) )
	var options = {};
	axis.init( graph, options );
	graph.setBottomAxis( axis, 0 );
	axis.categories = [ { title: "Category 1", name: "cat1" }, { title: "Category 2", name: "cat2" } ];

	var s1 = graph.newSerie( "serie1", {}, Graph.SERIE_BAR );
	s1.autoAxis();
	s1.setData( { "cat1": 5, "cat2": 12 } );
	s1.setLineColor('crimson').setFillColor('crimson').setFillOpacity( 0.5 );

	var s2 = graph.newSerie( "serie2", {}, Graph.SERIE_BAR );
	s2.autoAxis();
	s2.setData( { "cat1": 8, "cat2": 10 } );
	s2.setLineColor('DarkGreen').setFillColor('DarkGreen').setFillOpacity( 0.5 );

	axis.setSeries( s1, s2 );
	graph.draw();
</script>

### <a id="errorbars"></a>Adding error bars

Adding error bars in bar charts is similar to the line series. The style has to be defined first using the ```setErrorStyle``` method. Here's an example:

{% highlight javascript %}
s1.setErrorStyle( [ { type: 'bar', y: { width: 10, strokeColor: 'black', strokeOpacity: 0.7 } } ] );
{% endhighlight %}

The ```y``` key can also be ```top``` or/and ```bottom``` for different styles of the error bar.
Note that x error bars are technically also possible, but don't make much sense in this example.

Setting the error data goes with the following:


{% highlight javascript %}
s1.setDataError( { "cat1": [ [ 2, 1 ] ] } );
{% endhighlight %}

Where the first value is the positive error bar value and the second is the negative error bar.

Here is the result of the error bar example:


{% highlight javascript %}
var graph = new Graph( "example-1" );
graph.resize( 400, 300 );

var axis = new ( Graph.getConstructor( 'graph.axis.x.bar' ) )
var options = {};
axis.init( graph, options );
graph.setBottomAxis( axis, 0 );
axis.categories = [ { title: "Category 1", name: "cat1" }, { title: "Category 2", name: "cat2" } ];

var s1 = graph.newSerie( "serie1", {}, Graph.SERIE_BAR );
s1.autoAxis();
s1.setData( { "cat1": 5, "cat2": 12 } );
s1.setLineColor('crimson').setFillColor('crimson').setFillOpacity( 0.5 );

var s2 = graph.newSerie( "serie2", {}, Graph.SERIE_BAR );
s2.autoAxis();
s2.setData( { "cat1": 8, "cat2": 10 } );
s2.setLineColor('DarkGreen').setFillColor('DarkGreen').setFillOpacity( 0.5 );

s1.setErrorStyle( [ { type: 'bar', y: { width: 10, strokeColor: 'crimson', strokeOpacity: 0.7 } } ] );
s1.setDataError( { "cat1": [ [ 2, 1 ] ], "cat2": [ 0.4 ] } );

s2.setErrorStyle( [ { type: 'bar', y: { width: 10, strokeColor: 'DarkGreen', strokeOpacity: 0.7 } } ] );
s2.setDataError( { "cat1": [ [ 0.9 ] ] } );

graph.getYAxis().forceMin( 0 );

axis.setSeries( s1, s2 );
graph.draw();
{% endhighlight %}

<div id="example-2" class="jsgraph-example"></div>
<script>
	var graph = new Graph( "example-2" );
	graph.resize( 400, 300 );

	var axis = new ( Graph.getConstructor( 'graph.axis.x.bar' ) )
	var options = {};
	axis.init( graph, options );
	graph.setBottomAxis( axis, 0 );
	axis.categories = [ { title: "Category 1", name: "cat1" }, { title: "Category 2", name: "cat2" } ];

	var s1 = graph.newSerie( "serie1", {}, Graph.SERIE_BAR );
	s1.autoAxis();
	s1.setData( { "cat1": 5, "cat2": 12 } );
	s1.setLineColor('crimson').setFillColor('crimson').setFillOpacity( 0.5 );

	var s2 = graph.newSerie( "serie2", {}, Graph.SERIE_BAR );
	s2.autoAxis();
	s2.setData( { "cat1": 8, "cat2": 10 } );
	s2.setLineColor('DarkGreen').setFillColor('DarkGreen').setFillOpacity( 0.5 );

	s1.setErrorStyle( [ { type: 'bar', y: { width: 10, strokeColor: 'crimson', strokeOpacity: 0.7 } } ] );
	s1.setDataError( { "cat1": [ [ 2, 1 ] ], "cat2": [ 0.4 ] } );

	s2.setErrorStyle( [ { type: 'bar', y: { width: 10, strokeColor: 'DarkGreen', strokeOpacity: 0.7 } } ] );
	s2.setDataError( { "cat1": [ 0.9 ] } );

	graph.getYAxis().forceMin( 0 );

	axis.setSeries( s1, s2 );
	graph.draw();
</script>