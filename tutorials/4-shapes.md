<script src="../dist/jquery.min.js"></script>
<script src="../dist/jsgraph.js"></script>

<script>
	
</script>

jsGraph can be used not only to display data in series, but it can also be used to create shapes associated to this data. In this tutorial, we demonstrate how to create various shapes, position them on your graph, change their style and allow manipulation.

Let us start by creating an empty graph, and since no serie will be used for now, force the X and Y axes boundaries:

```

var g = new Graph("example-1") // Creates a new graph
g.resize( 400, 300 ); // Resizes the graph
var s = g.newSerie("employment_nb").setData( [ 1900, 1555, 1910, 1783, 1920, 1872, 1930, 1943, 1941, 1992, 1948, 2378, 1949, 2339, 1950, 2309, 1951, 2437, 1953, 2455, 1954, 2482, 1955, 2533, 1956, 2606, 1957, 2666, 1958, 2644, 1959, 2644, 1960, 2717, 1961, 2644, 1962, 2954, 1963, 2999, 1964, 3046, 1965, 3025, 1966, 3014, 1967, 3030, 1968, 3048, 1969, 3098, 1970, 3143, 1971, 3199, 1972, 3243, 1973, 3277, 1974, 3273, 1975, 3108, 1976, 3019, 1977, 3032, 1978, 3062, 1979, 3095, 1980, 3166, 1981, 3240, 1982, 3256, 1983, 3257, 1984, 3288, 1985, 3354, 1986, 3430, 1987, 3515, 1988, 3607, 1989, 3704, 1990, 3821, 1991, 4136, 1992, 4069, 1993, 4025, 1994, 3999, 1995, 3996, 1996, 3994, 1997, 3991, 1998, 4044, 1999, 4075, 2000, 4116, 2001, 4183, 2002, 4213, 2003, 4198, 2004, 4210, 2005, 4241, 2006, 4328, 2007, 4440, 2008, 4548, 2009, 4588, 2010, 4593, 2011, 4705, 2012, 4776, 2013, 4837, 2014, 4918 ] )
	.autoAxis()
	.setLineColor('purple')
	.setLineWidth( 2 );
	
g.setTitle("Number of employed people in Switzerland (yearly average)");
g.getXAxis().setLabel('Year').gridsOff();
g.getYAxis().setLabel("Number of people (in thousands)").secondaryGridOff();
g.draw();

```

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


makeGraph( "example-1" );
</script>


## Graph.newShape

To create a new shape, there is only a single method to remember: ```graph.newShape```. {@link Graph#newShape} belongs to the {@link Graph} class and it is as of today the only way to create a new shape and assign it to the graph. The syntax of the ```newShape``` method is the following

```Graph.newShape( String shapeType, Object<String,String> shapeOptions, Boolean mute );```

Where :
* ```shapeType``` is the type of the shape (e.g. ```line```, ```rectangle```, ```arrow```, ... ). The types are defined by the constructor registering (see later)
* ```shapeOptions``` is a map (key/value) of options associated to the shape. Except for shape-specific options, the default available ones are:
	* ```Array<Position> position``` - An array of position elements (see explanations later in this tutorial)
	* ```String fillColor``` - The ```fill``` attribute of the shape
	* ```String strokeColor``` - The ```stroke``` attribute of the shape
	* ```Number strokeWidth``` - The ```stroke-width``` attribute of the shape
	* ```Number layer``` - The layer on which the shape should be places
	* ```Boolean locked``` - ```true``` to locks the shape (prevents selecting, moving, resizing).
	* ```Boolean movable``` - ```true``` to allow the shape to be moved (can be nullified by ```locked```)
	* ```Boolean resizable``` - ```true``` to allow the shape to be resized (can be nullified by ```locked```)
	* ```Boolean selectable``` - ```true``` to allow the shape to be selected (can be nullified by ```locked```)
	* ```Object<String,String> attributes``` - Additional attributes added to the main DOM of the shape
	* ```Boolean handles``` - Notifies that the shape should have handles (used for resizing)
	* ```Boolean selectOnMouseDown``` - ```true``` if the shape should be selected when the user clicks on it
	* ```Boolean highlightOnMouseOver``` - ```true``` if the shape should be highlighted when the mouse hovers the shape (see later in the tutorial for more explanation)
	* ```Array<Object>``` label - The labels of the shape
		* ```Position position``` - The position of the label
		* ```String color``` - The color of the label
		* ```String angle``` - The angle of the label
		* ```String basline``` - The dominant baseline of the shape (see {@link Shape#setLabelBaseline})
		* ```String anchor``` - The anchor of the label (see {@link Shape#setLabelAnchor})
* ```Boolean mute``` cancels event emission from the graph

Many of these options can be changed after shape creation. They have been documented in the {@link Shape|shape reference API}.

### Shape types

The ```shapeType``` option defined which kind of shape will be drawn. A number of default shapes are shipped with the standard distribution of jsGraph, but it is not excluded to create your own shape. As of the writing of this tutorial, jsGraph supports :

* Lines (```shapeType = "line"```)
* Arrows (```shapeType = "arrow"```)
* Rectangles (```shapeType = "rect"``` or ```shapeType = "rectangle"```)
* Ellipses (```shapeType = "ellipse"```)
* Label (```shapeType = "label"```)
* Area under the curve (```shapeType = "areaundercurve"```)
* X range (```shapeType = "rangex"```)

From now on in this tutorial, we will use the default shape arrow to explain the features of the shapes.

### Creating a new arrow

Creating a new arrow is as simple as this:

```var arrow = graph.newShape("arrow");```

However, at this stage, the arrow is not drawn. Its instance is simply created. To add it on the graph, you must use ```arrow.draw();```


<div id="example-2" class="jsgraph-example"></div>
<script>

var g = makeGraph("example-2");
var arrow = g.newShape("arrow");
arrow.draw();
g.draw();

</script>

Annnnnd... nothing happened ! The reason is simple: your arrow has no set position. Ok, let's create two positions (one for the start or the arrow, the other for the end) and assign them to the arrow. We then use the ```redraw``` method to update the shape.

```
var position1 = g.newPosition( "150px", "30px" );
var position2 = g.newPosition( "190px", "80px" );
arrow.setPosition( position1, 0 );
arrow.setPosition( position2, 1 );
arrow.redraw();
```



<div id="example-3" class="jsgraph-example"></div>
<script>

var g = makeGraph("example-3");
var arrow = g.newShape("arrow");
arrow.draw();
g.draw();

var position1 = g.newPosition( "150px", "30px" );
var position2 = g.newPosition( "190px", "80px" );
arrow.setPosition( position1, 0 );
arrow.setPosition( position2, 1 );
arrow.redraw();
g.draw();

</script>


### Assign positions relative to the axes

However most of the time you do not want to reference the shape position with respect to the graph screen coordinates. Imagine you want to zoom inside the graph: the shapes will not move. Although it might be ok for some applications, you might want to place some shapes with respect to the axes coordinates. In our example, we want to point the arrow towards the data at a particular year to, say, note an event that happened then. To do so, you need to attach the shape to the axes. One way to do that is to assign the serie
```arrow.setSerie( g.getSerie("employment_nb") );```
and the axes of the serie will be used as the axes for the shape. Alternatively, you can use the ```setXAxis``` and ```setYAxis``` methods.


```
arrow.setSerie( g.getSerie( "employment_nb" ) );
var position1 = g.newPosition( 1990, 3821 );
var position2 = g.newPosition( "190px", "80px" );
arrow.setPosition( position1, 0 );
arrow.setPosition( position2, 1 );
arrow.redraw();
```


<div id="example-4" class="jsgraph-example"></div>
<script>

var g = makeGraph("example-4");
var arrow = g.newShape("arrow");
arrow.draw();
g.draw();

arrow.setSerie( g.getSerie( "employment_nb" ) );
var position1 = g.newPosition( 1990, 3821 );
var position2 = g.newPosition( "190px", "80px" );
arrow.setPosition( position1, 0 );
arrow.setPosition( position2, 1 );
arrow.redraw();
g.draw();

</script>

You see here in the example, we specified the y value corresponding to the year (the x value). You actually don't have to that:

```var position1 = g.newPosition( 1990 );``` will do, and the y value will be automatically selected from the serie you have specified with ```setSerie```. In addition, we want the arrow to stand back a bit from the data. We can use the 3rd and 4th parameter of the ```GraphPosition``` constructor, which specify delta values that are applied to the main value:

```var position1 = g.newPosition( 1990, false, -3, "-5px" );```

Here, ```-3``` refers to the position relative to the axis (no string and no "px" in the end) and therefore, -3 years will be subtracted from 1990, so the arrow will point at 1987. Honestly it makes little sense here, and perhaps "-5px" would be more logical, like I did with the y-coordinate.



```
arrow.setSerie( g.getSerie( "employment_nb" ) );
var position1 = g.newPosition( 1990, undefined, -3, "-5px" );
var position2 = g.newPosition( "190px", "80px" );
arrow.setPosition( position1, 0 );
arrow.setPosition( position2, 1 );
arrow.redraw();
```


<div id="example-5" class="jsgraph-example"></div>
<script>

var g = makeGraph("example-5");
var arrow = g.newShape("arrow");
arrow.draw();
g.draw();

arrow.setSerie( g.getSerie( "employment_nb" ) );
var position1 = g.newPosition( 1990, undefined, -3, "-5px" );
var position2 = g.newPosition( "190px", "80px" );
arrow.setPosition( position1, 0 );
arrow.setPosition( position2, 1 );
arrow.redraw();
g.draw();

</script>




