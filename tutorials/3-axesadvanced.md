
<script>
	var serie1 = [0, 10000000, 1, 11000000 ];
</script>

## Using units

Showing big numbers on the axis is usually an issue. Imagine label ticks showing "100000000000". Not only is not very nice to have the axis take that much space, it's also not very convenient to read. jsGraph does not automatically handle such cases and it is your job to tell it how you want it to behave.

Let's take this simple serie to demonstrate the possibilities of jsGraph:


```
var serie1 = [0, 10000000, 1, 11000000 ];
```


Axis units are a convenient way to circumvent display data. By knowing the unit that the axis represents (let's take a example: "m" for meters), jsGraph can automatically convert it to its engineering multiples: "Gm", Mm", km", "mm", "&mu;m", "nm", "pm", "fm". It will select the most appropriate scaling so that value remain more than 1 but less than 1'000.

For this to happens, you need to use the {@link Axis#setUnit} and the {@link Axis#setUnitDecade} method (which are accessible via options):


```
g.getLeftAxis().setLabel("Distance");
g.getLeftAxis().setUnit("m");

g.getLeftAxis().setScientific( true ); // Turn into scientific mode
g.getLeftAxis().setUnitDecade( true ); // Ask for unit scaling
g.draw();
```

<div id="example-1" class="jsgraph-example"></div>
<script>

var g = new Graph("example-1") // Creates a new graph

g.resize( 400, 300 ); // Resizes the graph

g.newSerie() // Creates a new seire
 .autoAxis() // Assigns automatic axes to the serie
 .setData( serie1 ); // Assigns the data to the serie

g.getLeftAxis().setLabel("Distance");
g.getLeftAxis().setUnit("m");
g.getLeftAxis().setUnitDecade( true );
g.getLeftAxis().setScientific( true );

g.draw();
</script>


## Exponential offsetting

You can also not use unit prefixes, but simply decide to display a "x10^z" value after the label. To do so, simply use 

```
g.getLeftAxis().setLabel("Distance");
g.getLeftAxis().setUnit("m");

g.getLeftAxis().setScientific( true ); // Just turn the scientific mode on, but do 
g.draw();
```

<div id="example-2" class="jsgraph-example"></div>
<script>

var serie1 = [0, 10000000, 1, 11000000 ];
var g = new Graph("example-2") // Creates a new graph

g.resize( 400, 300 ); // Resizes the graph

g.newSerie() // Creates a new seire
 .autoAxis() // Assigns automatic axes to the serie
 .setData( serie1 ); // Assigns the data to the serie

g.getLeftAxis().setLabel("Distance");
g.getLeftAxis().setUnit("m");
g.getLeftAxis().setScientific( true );

g.draw();
</script>

## Defined exponential offsetting

If you know exactly of how much your data must be offseted by (for instance, 10^3), because let's say you want to display values in mW and not in W, and this, whatever the value is, then you should use {@link Axis#setScientificScale}.


```
g.getLeftAxis().setLabel("Distance");
g.getLeftAxis().setUnit("m");

g.getLeftAxis().setScientific( true ); // Turn scientific mode on
g.getLeftAxis().setScientificScale( 4 ); // Force scientific scaling

g.draw();
```

<div id="example-3" class="jsgraph-example"></div>
<script>

var serie1 = [0, 10000000, 1, 11000000 ];
var g = new Graph("example-3") // Creates a new graph

g.resize( 400, 300 ); // Resizes the graph

g.newSerie() // Creates a new seire
 .autoAxis() // Assigns automatic axes to the serie
 .setData( serie1 ); // Assigns the data to the serie

g.getLeftAxis().setLabel("Distance");
g.getLeftAxis().setUnit("m");

g.getLeftAxis().setScientific( true ); // Turn scientific mode on
g.getLeftAxis().setScientificScale( 4 ); // Force scientific scaling

g.draw();
</script>



## Engineering scale

The engineering scaling is similar to the scientific scaling, however 10 to the power of only multiple of 3 are used to scale the axis values. For example, this would be used to scale grams to kilograms or to tons, while avoiding the impractical decagrams or hexagrams. This makes usually more sense than scientific scaling for quantities that represent something that can be measured (time, weight, distances, strength, power, ...)


```
g.getLeftAxis().setLabel("Distance");
g.getLeftAxis().setUnit("m");

g.getLeftAxis().setEngineering( true ); // Turn engineering mode on

g.draw();
```

<div id="example-3-2" class="jsgraph-example"></div>
<script>


var g = new Graph("example-3-2") // Creates a new graph

g.resize( 400, 300 ); // Resizes the graph

g.newSerie() // Creates a new seire
 .autoAxis() // Assigns automatic axes to the serie
 .setData( serie1 ); // Assigns the data to the serie

g.getLeftAxis().setLabel("Distance");
g.getLeftAxis().setUnit("m");
g.getLeftAxis().setEngineering( true ); // Turns scientific mode on
g.draw();

</script>









<script>
	var serie1 = [0, 0.00000001, 1, 0.00000002 ];
</script>

## Values smaller than 1

Of course it also works for very small values (here the "n" stands for "nano")

Let us use another serie:

```
var serie2 = [0, 0.00000001, 1, 0.00000002 ];
```

And use the first example again

```
g.getLeftAxis().setLabel("Distance");
g.getLeftAxis().setUnit("m");

g.getLeftAxis().setScientific( true ); // Turn scientific mode on
g.getLeftAxis().setUnitDecade( true ); // Ask for unit scaling

g.draw();
```

<div id="example-4" class="jsgraph-example"></div>
<script>


var g = new Graph("example-4") // Creates a new graph

g.resize( 400, 300 ); // Resizes the graph

g.newSerie() // Creates a new seire
 .autoAxis() // Assigns automatic axes to the serie
 .setData( serie1 ); // Assigns the data to the serie

g.getLeftAxis().setLabel("Distance");
g.getLeftAxis().setUnit("m");

g.getLeftAxis().setScientific( true ); // Turns scientific mode on
g.getLeftAxis().setUnitDecade( true ); // Ask for unit scaling

g.draw();
</script>




```
g.getLeftAxis().setLabel("Distance");
g.getLeftAxis().setUnit("m");

g.getLeftAxis().setScientific( true ); // Turns scientific mode on

g.draw();
```

The second example now becomes:

<div id="example-5" class="jsgraph-example"></div>
<script>


var g = new Graph("example-5") // Creates a new graph

g.resize( 400, 300 ); // Resizes the graph

g.newSerie() // Creates a new seire
 .autoAxis() // Assigns automatic axes to the serie
 .setData( serie1 ); // Assigns the data to the serie

g.getLeftAxis().setLabel("Distance");
g.getLeftAxis().setUnit("m");
g.getLeftAxis().setScientific( true );

g.draw();
</script>

