---
layout: page-sidemenu
subtitle: 'Box plots'
---
## Box plots
Since v1.16, jsGraph support box charts. Box charts are a nice way to render statistical data, and is similar but more flexible than bar charts. While bar charts start at zero and display a cityscape till a certain value, plus potentially an error bar, box charts displays the median (second quartile, Q2), two box boundaries (first and third quartile, Q1 and Q3), and two whiskers that can take any data.

**Note:** jsGraph does not calculate those values itself. You can use [mljs](http://github.com/cheminfo/mljs) to do so. You must feed those values to jsGraph directly.

### <a id="definition"></a> Defining the axis

The x axis can be a normal, decimal axis, or it can be a ```category``` axis created using the following code:

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

For a more complete description on how to use the categories, you can check the [bar charts](./barchars.html) tutorial. The example at the end of this tutorial provides a code sample featuring category axes.

### <a id="definition-serie"></a> Defining the box serie

To define a box serie, use the ```Graph.SERIE_BOX``` type, where ```Graph``` should be your constructor.

{% highlight javascript %}
graph
  .newSerie( 'boxserie', {}, Graph.SERIE_BOX )
  .autoAxis()
  .setData( [ 
	{ x: 0, Q1: -1, Q2: 2, Q3: 5, whiskers: [-5,10], outliers: [  -7 ] },
	{ x: 1, Q1: 5, Q2: 7, Q3: 15, whiskers: [0,16], outliers: [ -5, 15 ] },
	{ x: 2, Q1: 3, Q2: 8, Q3: 9, whiskers: [1,11], outliers: [ 0, -2, 12 ] },
	{ x: 3, Q1: -2, Q2: 1, Q3: 3, whiskers: [-4,6], outliers: [ -6, 8 ] }
 ] );
{% endhighlight %}


<div id="example-1" class="jsgraph-example"></div>
<script>
	var graph = new Graph( "example-1" );
	graph.resize( 400, 300 );

graph
  .newSerie( 'cat2', {}, Graph.SERIE_BOX )
  .autoAxis()
  .setData( [ 
	{ x: 0, Q1: -1, Q2: 2, Q3: 5, whiskers: [-5,10], outliers: [  -7 ] },
	{ x: 1, Q1: 5, Q2: 7, Q3: 15, whiskers: [-3,16], outliers: [ -5, 15 ] },
	{ x: 2, Q1: 3, Q2: 8, Q3: 9, whiskers: [1,11], outliers: [ 0, -2, 12 ] },
	{ x: 3, Q1: -2, Q2: 1, Q3: 3, whiskers: [-4,6], outliers: [ -6, 8 ] }
 ] );

	graph.draw();
</script>

### <a id="max-box-width"></a> Maximum box width

Boxes width will be automatically determined so that they can fit the graph. However, there's a default maximum width of 20px. You can use the ```maxBoxWidth``` option to change it:


{% highlight javascript %}
graph
  .newSerie( 'boxserie', { maxBoxWidth: 40 }, Graph.SERIE_BOX );
{% endhighlight %}


<div id="example-2" class="jsgraph-example"></div>
<script>
	var graph = new Graph( "example-2" );
	graph.resize( 400, 300 );

graph
  .newSerie( 'cat2', { maxBoxWidth: 40 }, Graph.SERIE_BOX )
  .autoAxis()
  .setData( [ 
	{ x: 0, Q1: -1, Q2: 2, Q3: 5, whiskers: [-5,10], outliers: [  -7 ] },
	{ x: 1, Q1: 5, Q2: 7, Q3: 15, whiskers: [-3,16], outliers: [ -5, 15 ] },
	{ x: 2, Q1: 3, Q2: 8, Q3: 9, whiskers: [1,11], outliers: [ 0, -2, 12 ] },
	{ x: 3, Q1: -2, Q2: 1, Q3: 3, whiskers: [-4,6], outliers: [ -6, 8 ] }
 ] );

	graph.draw();
</script>


### <a id="default-options"></a> Default options

Here are the default options of the box serie that can be overwritten during the serie creation.

{% highlight javascript %}
{
	orientation: 'y',
	maxBoxWidth: 20,

	defaultStyle: {
	  meanLineColor: 'rgb( 100, 0, 0 )',
	  meanLineWidth: 2,

	  boxAboveLineWidth: 1,
	  boxAboveLineColor: 'rgb( 0, 0, 0 )',
	  boxAboveFillColor: 'transparent',
	  boxAboveFillOpacity: 1,
	  boxBelowLineWidth: 1,
	  boxBelowLineColor: 'rgb( 0, 0, 0 )',
	  boxBelowFillColor: 'transparent',
	  boxBelowFillOpacity: 1,

	  barAboveLineColor: 'rgba( 0, 0, 0, 1 )',
	  barAboveLineWidth: 1,
	  barBelowLineColor: 'rgba( 0, 0, 0, 1 )',
	  barBelowLineWidth: 1,

	  outlierLineWidth: 1,
	  outlierLineColor: 'rgb( 255, 255, 255 )',
	  outlierFillColor: 'rgb( 0, 0, 0 )',
	  outlierFillOpacity: 1
	}
}
{% endhighlight %}


### <a id="styling"></a> Styling

All styling options are available through the API and can be checked in the documentation.
Here's just a simple example of box styling for future references:


{% highlight javascript %}
var s = graph.newSerie( 'cat', {}, Graph.SERIE_BOX );
var s2 = graph.newSerie( 'cat2', {}, Graph.SERIE_BOX );

var axis = new ( Graph.getConstructor( 'graph.axis.x.bar' ) )
graph.setBottomAxis( axis, 0 );
axis.init( graph );

axis.categories = [ { title: 'Sample 1', name: 's1' }, { title: 'Sample 2', name: 's2' } ];

s
  .autoAxis()
  .setData( [ 
    { x: 's1', Q1: 1, Q2: 2, Q3: 5, whiskers: [-5,10], outliers: [ 11, 17, 22, -9, -12 ] },
	{ x: 's2', Q1: 2, Q2: 5, Q3: 6, whiskers: [-2,8] }
  ] );


s2
  .autoAxis()
  .setData( [ 
    { x: 's1', Q1: -1, Q2: 2, Q3: 5, whiskers: [-5,10], outliers: [  -2 ] },
    { x: 's2', Q1: 5, Q2: 7, Q3: 11, whiskers: [-2,13], outliers: [ -5, 15 ] }
  ] );

axis.setSeries( s, s2 );

s.setBoxAboveFillColor('ForestGreen');
s.setBoxBelowFillColor('ForestGreen');
s.setBoxAboveFillOpacity(0.2);
s.setBoxBelowFillOpacity(0.2);

s2.setBoxAboveFillColor('Crimson');
s2.setBoxBelowFillColor('Crimson');
s2.setBoxAboveFillOpacity(0.2);
s2.setBoxBelowFillOpacity(0.2);
{% endhighlight %}


<div id="example-3" class="jsgraph-example"></div>
<script>
	var graph = new Graph( "example-3" );
	graph.resize( 400, 300 );

var s = graph.newSerie( 'cat', {}, Graph.SERIE_BOX );
var s2 = graph.newSerie( 'cat2', {}, Graph.SERIE_BOX );

var axis = new ( Graph.getConstructor( 'graph.axis.x.bar' ) )
graph.setBottomAxis( axis, 0 );
axis.init( graph );

axis.categories = [ { title: 'Sample 1', name: 's1' }, { title: 'Sample 2', name: 's2' } ];

s
  .autoAxis()
  .setData( [ 
    { x: 's1', Q1: 1, Q2: 2, Q3: 5, whiskers: [-5,10], outliers: [ 11, 17, 22, -9, -12 ] },
	{ x: 's2', Q1: 2, Q2: 5, Q3: 6, whiskers: [-2,8] }
  ] );


s2
  .autoAxis()
  .setData( [ 
    { x: 's1', Q1: -1, Q2: 2, Q3: 5, whiskers: [-5,10], outliers: [  -2 ] },
    { x: 's2', Q1: 5, Q2: 7, Q3: 11, whiskers: [-2,13], outliers: [ -5, 15 ] }
  ] );

axis.setSeries( s, s2 );

s.setBoxAboveFillColor('ForestGreen');
s.setBoxBelowFillColor('ForestGreen');
s.setBoxAboveFillOpacity(0.2);
s.setBoxBelowFillOpacity(0.2);

s2.setBoxAboveFillColor('Crimson');
s2.setBoxBelowFillColor('Crimson');
s2.setBoxAboveFillOpacity(0.2);
s2.setBoxBelowFillOpacity(0.2);

graph.draw();
</script>