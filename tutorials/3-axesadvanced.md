<script src="../dist/jquery.min.js"></script>
<script src="../dist/jsgraph.js"></script>

## Using units

Showing big numbers on the axis is usually an issue. Imagine label ticks showing "100000000000". Not only is not very nice to have the axis take that much space, it's also not very convenient to read. jsGraph does not automatically handle such cases and it is your job to tell it how you want it to behave.

Axis units are a convenient way to circumvent display data. By knowing the unit that the axis represents (let's take a example: "m" for meters), jsGraph can automatically convert it to its engineering multiples: "Gm", Mm", km", "mm", "&mu;m", "nm", "pm", "fm". It will select the most appropriate scaling so that value remain more than 1 but less than 1'000.

For this to happens, you need to use the {@link Axis#setUnit} and the {@link Axis#setUnitDecade} method (which are accessible via options):


```
g.getLeftAxis().setLabel("Distance");
g.getLeftAxis().setUnit("m");
g.getLeftAxis().setUnitDecade( true );
g.draw();
```

<div id="example-1" class="jsgraph-example"></div>
<script>

var serie1 = [0, 10000000, 1, 11000000 ];
var g = new Graph("example-1") // Creates a new graph

g.resize( 400, 300 ); // Resizes the graph

g.newSerie() // Creates a new seire
 .autoAxis() // Assigns automatic axes to the serie
 .setData( serie1 ); // Assigns the data to the serie

g.getLeftAxis().setLabel("Distance");
g.getLeftAxis().setUnit("m");
g.getLeftAxis().setUnitDecade( true );

g.draw();
</script>