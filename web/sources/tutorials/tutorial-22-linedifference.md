---
layout: page-sidemenu
subtitle: 'Difference between two series'
---
## Difference between two series

The plugin ```serielinedifference``` (or ```serieLineDifference```, using camel-casing) allows you to color the area between two series, ```serieTop``` and ```serieBottom```. Different styles can be applied whether ```serieTop``` is above (positive) or below (negative) ```serieBottom```. The only requirement for this plugin is that the x values of each serie is monotoneously increasing (decreasing will *not* work).

### <a id="doc-example"></a> Example

Let us take the following example:

{% highlight javascript %}
var graph = new Graph( domGraph );

graph.setTitle("Gas purchases in Baud (Switzerland)")

graph.getYAxis().setUnit("TJ").setLabel("Energy").setUnitWrapper("[", "]");
graph.getXAxis().setLabel("Years");

graph
.newSerie("data")
.setLabel("Yearly")
.setLineWidth( 2 )
.setMarkers( { type: 0, zoom: 1.5, strokeColor: 'white', fillColor: '#2b1fcc' } )
.setLineColor('#2b1fcc')
.autoAxis()
.setData( [ 1986,6.934,1987,7.920,1988,7.623,1989,8.817,1990,8.978,1991,10.308,1992,10.285,1993,10.561,1994,10.013,1995,11.501,1996,12.308,1997,11.405,1998,11.651,1999,12.430,2000,12.147,2001,12.669,2002,12.312,2003,13.297,2004,13.951,2005,14.578,2006,13.927,2007,13.220,2008,13.938,2009,13.647,2010,15.565,2011,13.459,2012,14.767,2013,16.074,2014,13.921] );

graph
.newSerie("median")
.setLabel("10 years average")
.setLineStyle( 3 )
.setLineColor('blue')
.autoAxis().setData( [ 1986,9.48093,1987,9.50349,1988,9.57039,1989,9.67934,1990,9.82672,1991,10.0078,1992,10.2173,1993,10.4492,1994,10.6978,1995,10.9574,1996,11.223,1997,11.4901,1998,11.7548,1999,12.0142,2000,12.2657,2001,12.5076,2002,12.7383,2003,12.9565,2004,13.1612,2005,13.3514,2006,13.5259,2007,13.6838,2008,13.8238,2009,13.9449,2010,14.0458,2011,14.1255,2012,14.1832,2013,14.2181,2014,14.2298] )

graph.makeLegend().notHideable().setAutoPosition('bottom');
graph.getLegend().update();
graph.draw();
{% endhighlight %}

This code should display the following graph:

<div id="doc-example-1"></div>

<script>
var graph = new Graph("doc-example-1");

function makeGraph( graph ) {
	graph.resize( 400, 300 );
	graph.setTitle("Gas purchases in Baud (Switzerland)")

	graph.getYAxis().setUnit("TJ").setLabel("Energy").setUnitWrapper("[", "]");
	graph.getXAxis().setLabel("Years");

	graph
	.newSerie("data")
	.setLabel("Yearly")
	.setLineWidth( 2 )
	.setMarkers( { type: 0, zoom: 1.5, strokeColor: 'white', fillColor: '#2b1fcc' } )
	.setLineColor('#2b1fcc')
	.autoAxis()
	.setData( [ 1986,6.934,1987,7.920,1988,7.623,1989,8.817,1990,8.978,1991,10.308,1992,10.285,1993,10.561,1994,10.013,1995,11.501,1996,12.308,1997,11.405,1998,11.651,1999,12.430,2000,12.147,2001,12.669,2002,12.312,2003,13.297,2004,13.951,2005,14.578,2006,13.927,2007,13.220,2008,13.938,2009,13.647,2010,15.565,2011,13.459,2012,14.767,2013,16.074,2014,13.921] );

	graph
	.newSerie("median")
	.setLabel("10 years average")
	.setLineStyle( 3 )
	.setLineColor('blue')
	.autoAxis().setData( [ 1986,9.48093,1987,9.50349,1988,9.57039,1989,9.67934,1990,9.82672,1991,10.0078,1992,10.2173,1993,10.4492,1994,10.6978,1995,10.9574,1996,11.223,1997,11.4901,1998,11.7548,1999,12.0142,2000,12.2657,2001,12.5076,2002,12.7383,2003,12.9565,2004,13.1612,2005,13.3514,2006,13.5259,2007,13.6838,2008,13.8238,2009,13.9449,2010,14.0458,2011,14.1255,2012,14.1832,2013,14.2181,2014,14.2298] )

	graph.makeLegend().notHideable().setAutoPosition('bottom');
	graph.getLegend().update();
	graph.draw();
}

makeGraph( graph );
</script>

Now, we have the data and the smoothed data, and we want to highlight when gas imports are higher than the 10 years average, and when they are lower. A nice way to do that is to color the area between the two series in green when it's higher, and in red when it's lower. The plugin ```serielinedifference``` allows you to do that in a few lines of code.

Note that you could do it yourself by adding a polyline shape and calculate the path yourself, but jsGraph does all of that for you.

#### <a id="doc-example-enable"></a> Enabling the plugin

You need to enable the plugin by feeding the following options to the graph constructor:

{% highlight javascript %}
"plugins": {
	"serielinedifference": {}
} 
{% endhighlight %}

and to call the following lines after the *graph has been drawn*:

{% highlight javascript %}

// Drawing instruction that you needed to have anyway
graph.draw();

var serieTopName = 'data'; // Use here your serie name
var serieBottomName = 'median'; // Use here your serie name

var from = 1986; // From value. Must be specified.
var to = 2014; // To value. Must be specified.
// Note that you could use from = graph.getXAxis().getMinValue(); and to = graph.getXAxis().getMaxValue();

graph.getPlugin('serielinedifference').setSeries( graph.getSerie( serieTopName ), graph.getSerie( serieBottomName ) );
graph.getPlugin('serielinedifference').setBoundaries( from, to );
graph.getPlugin('serielinedifference').draw(); // Draws the shapes
{% endhighlight %}

And... tadaam:

<div id="doc-example-2"></div>

<script>
var graph = new Graph("doc-example-2", {
	plugins: {
		'serielinedifference': {}
	} 
});

makeGraph( graph );


var serieTopName = 'data'; // Use here your serie name
var serieBottomName = 'median'; // Use here your serie name

var from = 1986; // From value. Must be specified.
var to = 2014; // To value. Must be specified.
// Note that you could use from = graph.getXAxis().getMinValue(); and to = graph.getXAxis().getMaxValue();

graph.getPlugin('serielinedifference').setSeries( graph.getSerie( serieTopName ), graph.getSerie( serieBottomName ) );
graph.getPlugin('serielinedifference').setBoundaries( from, to );
graph.getPlugin('serielinedifference').draw(); // Draws the shapes

</script>

### <a id="doc-styling"></a> Styling the zones

You can observe in the previous example that by default, negative zones are colored in red with an opacity of 20% and the positive zones in green, with the same opacity. Those rendering options can be changed either:

* in the plugin constructor
* by fetching the ```Shape``` objects of the zones and modifying them

####  <a id="doc-styling-constructor"></a> In the constructor

Applying the style of the zones in the constructor options is the easiest way to proceed and takes the following format:


{% highlight javascript %}
"plugins": {
  "serielinedifference": {
    "positiveStyle": {
	  "fillColor": "green",
	  "fillOpacity": 0.2,
	  "strokeWidth": 0,
	  "strokeColor": "green"
	},

	"negativeStyle": {
	  "fillColor": "red",
	  "fillOpacity": 0.2,
	  "strokeWidth": 0,
	  "strokeColor": "negative"
	},
  }
} 
{% endhighlight %}

These options are the only one available for styling the polylines from the constructor. Moreover, they will be applied once to the shapes upon creation, not every time they are redrawn. If you change their style after the initialization of the graph, the original style will not be recovered.

####  <a id="doc-styling-objects"></a> By fetching the objects

jsGraph uses the ```polyline``` shape to draw the zones between the two line series. They both can be retrieved using the  methods

{% highlight javascript %}
graph.getPlugin('serielinedifference').getPositivePolyline();
graph.getPlugin('serielinedifference').getNegativePolyline();
{% endhighlight %}

For further styling of those shapes, read the documentation of the ```Shape``` object or the ```ShapePolyLine``` object.

###  <a id="doc-piecewise"></a> Piecewise data set

The real force of the ```serieLineDifference``` plugin is its handling of datasets that contain gaps. In this case, the zone will stop as close as possible to the gap and resume after the first point of the next piece of the dataset can be found:

<div id="doc-example-3"></div>

<script>
var graph = new Graph("doc-example-3", {
	plugins: {
		'serielinedifference': {}
	} 
});

graph.resize( 400, 300 );

graph
.newSerie("s1")
.autoAxis()
.setData( [ [ 0, 0, 1, 1, 2, 3 ], [ 4, 6, 5, 10, 6, 10 ], [ 7, 6, 8, 5, 9, 4, 10, 3 ] ] );

graph
.newSerie("s2")
.autoAxis().setData( [ [ 0, 4, 1, 3, 2, 1, 3, -1], [  4, -1, 5, 7, 6, 15, 7, 7, 8, 1, 9, 1, 10, 1 ] ] )

graph.draw();

graph.getPlugin('serielinedifference').setSeries( graph.getSerie('s1'), graph.getSerie('s2') );
graph.getPlugin('serielinedifference').setBoundaries(0, 10 );
graph.getPlugin('serielinedifference').draw();

</script>

A final word of warning, though. This feature is quite new and though it seems to work fine, you might find it buggy in some specific edge cases. In that case, I'd appreciate if you could report it on the github where the project is hosted. Thanks in advance !