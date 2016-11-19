
Shapes feature events. However those events are fired at the {@link Graph} level, to avoid registering too many event handlers which would slow down jsGraph and use up too much memory.

*NB: In the future, shape-specific event emitting will likely be introduced as well. Stay tuned for updates*

The events that shape fire are the following

* ```shapeNew``` - Fired when a shape is created
* ```shapeRemoved``` - Fired when a shape is removed
* ```shapeChanged``` - Fired whenever a shape has changed (color, style, position, size, ...). This event depends partly on the inherited shape implementation code and may therefore not be fired properly.
* ```shapeBeforeMove``` - Fired before a shape is set for moving. Use ```graph.prevent()``` to prevent the subsequent shape moving.
* ```shapeMoved``` - Fired after a shape has moved
* ```shapeBeforeResize``` - Fired before a shape is set for resizing. Use ```graph.prevent()``` to prevent the subsequent shape moving.
* ```shapeResized``` - Fired after a shape has been resized
* ```shapeSelected``` - Fired when a shape is selected
* ```shapeUnselected``` - Fired when a shape is unselected
* ```beforeShapeMouseMove``` - Fired when the shape has focus and before any mouse move event is implemented (resize, move or anything else, really). Use ```graph.prevent()``` to prevent the shape from performing any further action at this stage
* ```shapeMouseOver``` - Fired when the mouse enters the shape perimeter. The perimeter depends on the shape type and whether you are using a bounding box.
* ```shapeMouseOut``` - Fired when the mouse leaves the shape perimeter.

## Attaching event listeners

Like mentionned above, attaching event listeners is done at the {@see Graph} level. The first argument in the event callback is the shape instance that you can use to compare with a known reference:



{% highlight javascript %}
var rectangle = graph.newShape("rect", { selectable: true, position: [ { x: "100px", y: "100px" }, { dx: "100px", dy: "100px" } ] } ).draw();
rectangle.getPosition( 1 ).relativeTo( rectangle.getPosition( 0 ) ); // Just fix the positioning of pos2 vs pos1
graph.on("shapeSelected", function( shape ) {
	
  if( shape == rectangle ) {
    // Do something for this specific rectangle
  }

  if( shape.getType() == "rect" ) {
    // Do something for all rectangles
  }
});
{% endhighlight %}

<p>
	<em><span id="action-1">Select the rectangle to trigger the ```shapeSelected``` event</span></em>
</p>

<div id="example-1" class="jsgraph-example"></div>
<script>

function makeGraph( dom ) {

	var g = new Graph( dom ) // Creates a new graph
	g.resize( 400, 300 ); // Resizes the graph
	var s = g.newSerie("employment_nb").setData( [ 1900, 1555, 1910, 1783, 1920, 1872, 1930, 1943, 1941, 1992, 1948, 2378, 1949, 2339, 1950, 2309, 1951, 2437, 1953, 2455, 1954, 2482, 1955, 2533, 1956, 2606, 1957, 2666, 1958, 2644, 1959, 2644, 1960, 2717, 1961, 2644, 1962, 2954, 1963, 2999, 1964, 3046, 1965, 3025, 1966, 3014, 1967, 3030, 1968, 3048, 1969, 3098, 1970, 3143, 1971, 3199, 1972, 3243, 1973, 3277, 1974, 3273, 1975, 3108, 1976, 3019, 1977, 3032, 1978, 3062, 1979, 3095, 1980, 3166, 1981, 3240, 1982, 3256, 1983, 3257, 1984, 3288, 1985, 3354, 1986, 3430, 1987, 3515, 1988, 3607, 1989, 3704, 1990, 3821, 1991, 4136, 1992, 4069, 1993, 4025, 1994, 3999, 1995, 3996, 1996, 3994, 1997, 3991, 1998, 4044, 1999, 4075, 2000, 4116, 2001, 4183, 2002, 4213, 2003, 4198, 2004, 4210, 2005, 4241, 2006, 4328, 2007, 4440, 2008, 4548, 2009, 4588, 2010, 4593, 2011, 4705, 2012, 4776, 2013, 4837, 2014, 4918 ] )
		.autoAxis()
		.setLineColor('purple')
		.setLineWidth( 2 );

	g.setTitle("Number of employed people in Switzerland (yearly average)");
	g.getXAxis().setLabel('Year').gridsOff();
	g.getYAxis().setLabel("Number of people (in thousands)").secondaryGridOff();
	g.draw();

	return g;
}

var g = makeGraph( "example-1" );

var rectangle = g.newShape("rect", { selectable: true, position: [ { x: "150px", y: "100px" }, { dx: "100px", dy: "100px" } ] } );
rectangle.getPosition( 1 ).relativeTo( rectangle.getPosition( 0 ) );
rectangle.draw();

g.on("shapeSelected", function( shape ) {
	
	if( shape == rectangle ) {		
		$("#action-1").html("Rectangle selected !");
	}

	if( shape.getType() == "rect" ) {
		// Do something for all rectangles
	}
});



</script>
