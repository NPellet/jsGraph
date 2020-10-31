<script>

var data = [[ -1,-0.95,-0.8999999999999999,-0.8499999999999999,-0.7999999999999998,-0.7499999999999998,-0.6999999999999997,-0.6499999999999997,-0.5999999999999996,-0.5499999999999996,-0.4999999999999996,-0.4499999999999996,-0.39999999999999963,-0.34999999999999964,-0.29999999999999966,-0.24999999999999967,-0.19999999999999968,-0.1499999999999997,-0.09999999999999969,-0.049999999999999684,3.191891195797325e-16,0.05000000000000032,0.10000000000000032,0.15000000000000033,0.20000000000000034,0.25000000000000033,0.3000000000000003,0.3500000000000003,0.4000000000000003,0.4500000000000003,0.5000000000000003,0.5500000000000004,0.6000000000000004,0.6500000000000005,0.7000000000000005,0.7500000000000006,0.8000000000000006,0.8500000000000006,0.9000000000000007,0.9500000000000007,1.0000000000000007,1.0500000000000007,1.1000000000000008,1.1500000000000008,1.2000000000000008,1.2500000000000009,1.300000000000001,1.350000000000001,1.40000000000000,1.450000000000001],[-20.499747544838275,-20.499659532985874,-20.499540838115898,-20.49938076340126,-20.499164882847428,-20.4988737412163,-20.498481100712695,-20.497951576424207,-20.497237447419362,-20.49627435611903,-20.494975508366757,-20.493223851506187,-20.490861525550883,-20.48767563678195,-20.483379071684652,-20.477584622168607,-20.469770090226536,-20.45923122725008,-20.44501826687575,-20.425850331676905,-20.4,-20.365137630064282,-20.318121411753218,-20.25471422548477,-20.16920179137358,-20.053877696141516,-19.89834888820463,-19.68859905188818,-19.405725451695528,-19.024235410553235,-18.509748899999998,-17.81590019886833,-16.88015939675398,-15.618197174567083,-13.916285014032407,-11.621045940111184,-8.52563212933044,-4.351083704794043,1.2788112346498295,8.87142097487483,19.11099441051224,32.920325817120975,51.543917424350724,76.66013443300987,110.53245992908506,156.21348084543214,217.8199882640481,300.90398420341603,412.9530301645426,564.065029038078] ];;

const wave1 = Graph.newWaveform( ).setData( data[ 1 ], data[ 0 ] );
const wave2 = wave1.duplicate().math( ( x, y ) => x * y ); // Duplicate and use the math function

</script>

### <a id="doc-introduction"></a> Introduction

In this tutorial, we will review the basics of jsGraph, through examples and explanations. This tutorial isn't meant to be thorough in every aspect of jsGraph, but rather show you what can be done in a couple of lines of code. Links to more comprehensive tutorials will be given along the text.

### <a id="doc-setup"></a> Setting up jsGraph

jsGraph depends only on jQuery to work. Include both files inside your `head` tag to make it work.

```html
<script type="text/javascript" src="path/to/jquery/jquery.min.js"></script>
<script type="text/javascript" src="path/to/jsgraph/jsgraph.min.js"></script>
```

In this situation, jsGraph exposes the constructor `Graph` to the window element. Everything else is done from there.
Alternatively, is you use an AMD loader, jsGraph may be loaded accordingly

```javascript
require( [ 'path/to/jsgraph' ], function( jsGraph ) {
	...
} );
```

### <a id="doc-dataformat"></a>The data format

For line and scatter series, jsGraph represents data using the `waveform` object, which is created using a static function of the `Graph` super-object (or any name you have assigned to it if you're using modules to load jsGraph).

A new waveform is created using:

```javascript
const waveform = Graph.newWaveform(); // Creates an empty waveform

const waveform_y = Graph.newWaveform( [ y1, y2, ..., yn ] ); // Creates a waveform with y data only

const waveform_xy = Graph.newWaveform().setData( [ y1, y2, ..., yn ], [ x1, x2, ..., xn ] ); // Creates a waveform with x and y data
```

The Waveform object is convenient because it allows operation on the wave, such as maths, smoothing, appending, prepending, scaling, etc... More information on waves is available in the wave tutorial.

### <a id="doc-creating"></a>Creating a graph

Before we start, we will use the following data throughout the tutorial. You can copy it to run on your side too.

```javascript
var data = [
  [
    -1,
    -0.95,
    -0.8999999999999999,
    -0.8499999999999999,
    -0.7999999999999998,
    -0.7499999999999998,
    -0.6999999999999997,
    -0.6499999999999997,
    -0.5999999999999996,
    -0.5499999999999996,
    -0.4999999999999996,
    -0.4499999999999996,
    -0.39999999999999963,
    -0.34999999999999964,
    -0.29999999999999966,
    -0.24999999999999967,
    -0.19999999999999968,
    -0.1499999999999997,
    -0.09999999999999969,
    -0.049999999999999684,
    3.191891195797325e-16,
    0.05000000000000032,
    0.10000000000000032,
    0.15000000000000033,
    0.20000000000000034,
    0.25000000000000033,
    0.3000000000000003,
    0.3500000000000003,
    0.4000000000000003,
    0.4500000000000003,
    0.5000000000000003,
    0.5500000000000004,
    0.6000000000000004,
    0.6500000000000005,
    0.7000000000000005,
    0.7500000000000006,
    0.8000000000000006,
    0.8500000000000006,
    0.9000000000000007,
    0.9500000000000007,
    1.0000000000000007,
    1.0500000000000007,
    1.1000000000000008,
    1.1500000000000008,
    1.2000000000000008,
    1.2500000000000009,
    1.300000000000001,
    1.350000000000001,
    1.4,
    1.450000000000001
  ],
  [
    -20.499747544838275,
    -20.499659532985874,
    -20.499540838115898,
    -20.49938076340126,
    -20.499164882847428,
    -20.4988737412163,
    -20.498481100712695,
    -20.497951576424207,
    -20.497237447419362,
    -20.49627435611903,
    -20.494975508366757,
    -20.493223851506187,
    -20.490861525550883,
    -20.48767563678195,
    -20.483379071684652,
    -20.477584622168607,
    -20.469770090226536,
    -20.45923122725008,
    -20.44501826687575,
    -20.425850331676905,
    -20.4,
    -20.365137630064282,
    -20.318121411753218,
    -20.25471422548477,
    -20.16920179137358,
    -20.053877696141516,
    -19.89834888820463,
    -19.68859905188818,
    -19.405725451695528,
    -19.024235410553235,
    -18.509748899999998,
    -17.81590019886833,
    -16.88015939675398,
    -15.618197174567083,
    -13.916285014032407,
    -11.621045940111184,
    -8.52563212933044,
    -4.351083704794043,
    1.2788112346498295,
    8.87142097487483,
    19.11099441051224,
    32.920325817120975,
    51.543917424350724,
    76.66013443300987,
    110.53245992908506,
    156.21348084543214,
    217.8199882640481,
    300.90398420341603,
    412.9530301645426,
    564.065029038078
  ]
];

const wave1 = Graph.newWaveform().setData(data[1], data[0]);
```

For information, `wave1` represents a solar cell j-V curve.
Because we are lazy, let us create `wave2` which represents the power of the solar cell (P = U \* I).

```javascript
const wave2 = wave1.duplicate().math((x, y) => {
  x * y;
}); // Duplicate and use the math function
```

Cool, no ?
Ok, let us first display `serie1` on a new graph.

```javascript
var g = new Graph('example-1'); // Creates a new graph
g.resize(400, 300); // Resizes the graph

var s = g
  .newSerie() // Creates a new seire
  .autoAxis() // Assigns automatic axes to the serie
  .setWaveform(wave1); // Assigns the data to the serie

g.draw(); // Draws the whole thing
```

<div id="example-1" class="jsgraph-example"></div>
<script>
var g = new Graph("example-1") // Creates a new graph

g.newSerie() // Creates a new serie
.autoAxis() // Assigns automatic axes to the serie
.setWaveform( wave1 ); // Assigns the data to the serie

g.resize( 400, 300 ); // Resizes the graph

g.draw();
</script>

And here is the description of the example taken line by line:

- `new Graph( "example-1" )`. This line effectively creates a new graph. The first parameter here is the id of the DOM element where the graph should be located. Note that `new Graph( document.getElementByID( "example-1" ) )` would have been ok too. See {@link Graph} for more details. The graph is stored in the variable `g`
- `g.resize( 400, 300 );` You need to notify to jsGraph the size of your container through the `resize` method (see {@link Graph#resize}). First parameter is the width in pixels, second is the height in pixels
- `g.newSerie()` This method creates a new serie **and returns it**. jsGraph is chainable, so you can directly append {@link Serie} methods to it.
- `.autoAxis()` jsGraph works with multiple horizontal and vertical axes. Use {@link Serie#autoAxis} to assign the default `x`and `y`axis.
- `.setWaveform( wave1 )` will simply assign the wave `wave1` as the data for this serie. Note that you can reuse waves across multiple graph objects.
- `g.draw();` will trigger a redraw of the graph. For efficiency purposes, you will be required to call this method whenever you want a repaint to occur. Some methods have automatic repaint, but this is not the rule. Repainting is typically the most time consuming operation for the browser if you have large amounts of data (when it matters), so jsGraph keeps it to a minimum and lets you decide when the graph should be repainted.

Let us do some styling of the serie now. For instance, we shall display the serie in red, with a thicker line. While we are at it, let's also display a marker for each data point.

```javascript
s.setLineColor('red')
  .setLineWidth(2)
  .setMarkers(true);

g.draw();
```

<div id="example-2" class="jsgraph-example"></div>
<script>

var g = new Graph("example-2") // Creates a new graph

g.resize( 400, 300 ); // Resizes the graph

s = g.newSerie() // Creates a new seire
.autoAxis() // Assigns automatic axes to the serie
.setWaveform( wave1 ); // Assigns the data to the serie

s
.setLineColor( 'red' )
.setLineWidth( 2 )
.setMarkers( true );

g.draw();

</script>

### <a id="doc-multipleseries"></a>Customizing markers

#### <a id="doc-multipleseries"></a>Marker default style

However, we'd like to change the style of the default markers:

```javascript
s.setMarkerStyle({
  shape: 'rect',
  strokeWidth: 1,
  stroke: 'rgb( 200, 0, 0 )',
  x: -2,
  y: -2,
  width: 4,
  height: 4,
  fill: 'white'
});
```

<div id="example-3" class="jsgraph-example"></div>
<script>

var g = new Graph("example-3") // Creates a new graph

g.resize( 400, 300 ); // Resizes the graph

s = g.newSerie()
.autoAxis()
.setWaveform( wave1 )
.setLineColor( 'red' )
.setLineWidth( 2 )
.setMarkers( true )
.setMarkerStyle({
shape: 'rect',
strokeWidth: 1,
x: -2,
y: -2,
width: 4,
height: 4,
stroke: 'rgb( 200, 0, 0 )',
fill: 'white'
});

g.draw();

</script>

#### <a id="doc-markermodifiers"></a>Marker modifiers

But that's a lot of markers, we can barely see the line. Let's rather display a marker every 5 points. For this, we can use the second argument of `setMarkerStyle` which specifies modifiers, i.e. styles that differ from the general marker style and that apply to specific points. More specifically, we can feed in a function that would look like that:

```javascript
serie.setMarkerStyle(defaultStyle, (x, y, index, domShape, generalStyle) => {
  return {
    /* some new style */
  };
});
```

The function should return an object, which will extend the default style, or `false` which cancels the marker appearance.
In this particular application, let's write:

```javascript
.setMarkerStyle({
	shape: 'rect',
	strokeWidth: 1,
	x: -2,
	y: -2,
	width: 4,
	height: 4,
	stroke: 'rgb( 200, 0, 0 )',
	fill: 'white'
 }, ( x, y, index, domShape, style ) => index % 5 == 0 ? style : false );
```

<div id="example-3.1" class="jsgraph-example"></div>
<script>

var g = new Graph("example-3.1") // Creates a new graph

g.resize( 400, 300 ); // Resizes the graph

s = g.newSerie()
.autoAxis()
.setWaveform( wave1 )
.setLineColor( 'red' )
.setLineWidth( 2 )
.setMarkers( true )
.setMarkerStyle({
shape: 'rect',
strokeWidth: 1,
x: -2,
y: -2,
width: 4,
height: 4,
stroke: 'rgb( 200, 0, 0 )',
fill: 'white'
}, ( x, y, index, domShape, style ) => index % 5 == 0 ? style : false );

g.draw();

</script>

More advanced marker description will be covered in an advanced tutorial.

### <a id="doc-labelingaxes"></a>Labeling axes

We will cover the axes in more details in the following text, but for now, you might be interesting in simply labeling your axis and setting units:

```javascript
g.getXAxis().setLabel('Voltage (V)');
g.getYAxis()
  .setLabel('Current density')
  .setUnit('mA cm^-2');
```

We can also use the method `setUnitWrapper( before, after )` to display parentheses or square braces around the unit:

```javascript
g.getXAxis().setUnitWrapper('(', ')');
g.getYAxis().setUnitWrapper('(', ')');
```

<div id="example-4" class="jsgraph-example"></div>
<script>

var g = new Graph("example-4") // Creates a new graph

g.resize( 400, 300 ); // Resizes the graph

s = g.newSerie()
.autoAxis()
.setWaveform( wave1 )
.setLineColor( 'red' )
.setLineWidth( 2 )
.setMarkers( true )
.setMarkerStyle( {
shape: 'rect',
strokeWidth: 1,
x: -2,
y: -2,
width: 4,
height: 4,
stroke: 'rgb( 200, 0, 0 )',
fill: 'white'
}, ( x, y, index, domShape, style ) => index % 5 == 0 ? style : false);

g.getXAxis().setLabel( "Voltage" ).setUnit( "V" ).setUnitWrapper("(", ")");
g.getYAxis().setLabel( "Current density" ).setUnit( "mA cm^-2" ).setUnitWrapper("(", ")");

g.draw();

</script>

### <a id="doc-multipleseries"></a>Plotting multiple series

Before plotting the second serie, you need to understand the following:

**Each serie must have a unique name**

The name of the serie is actually the first parameter in the {@link Graph#newSerie} method. In our previous examples, the name was empty, which is ok if you have only one serie. But starting at the second one, you'll need to start naming them.

For example, let's us assume that you have

```javascript
g.newSerie('myName')
  .autoAxis()
  .setData(data1);
g.newSerie('myName')
  .autoAxis()
  .setData(data2);
```

This example would not throw any warning, but the second `g.newSerie("myName")` would actually return the existing serie. The only thing you will end up doing is overwriting the data of the first serie (`data1`) with `data2`. jsGraph doesn't throw any error because in the end, you will end up being too lazy to check if a serie exists before creating it. So instead of that, you may just call `g.newSerie()` to either create it or return it, whether it already exists or not.

Let us get back to the example and add the second serie

```javascript
var g = new Graph('example-4'); // Creates a new graph
g.resize(400, 300);

var jV = g
  .newSerie('jV') // Note the same of the serie
  .autoAxis()
  .setData(serie1)
  .setLineColor('red')
  .setLineWidth(2)
  .setMarkers(true)
  .setMarkerStyles(
    {
      shape: 'rect',
      strokeWidth: 1,
      x: -2,
      y: -2,
      width: 4,
      height: 4,
      stroke: 'rgb( 200, 0, 0 )',
      fill: 'white'
    },
    (x, y, index, domShape, style) => (index % 5 == 0 ? style : false)
  );

var pV = g
  .newSerie('pV') // Note the same of the serie
  .autoAxis()
  .setData(serie2);

g.draw();
```

<div id="example-5" class="jsgraph-example"></div>
<script>
(() => {
var g = new Graph("example-5") // Creates a new graph

g.resize( 400, 300 ); // Resizes the graph

var jV = g.newSerie( "jV" ) // Note the same of the serie
.autoAxis()
.setWaveform( wave1 )
.setLineColor( 'red' )
.setLineWidth( 2 )
.setMarkers( true )
.setMarkerStyle({
shape: 'rect',
strokeWidth: 1,
x: -2,
y: -2,
width: 4,
height: 4,
stroke: 'rgb( 200, 0, 0 )',
fill: 'white'
}, ( x, y, index, domShape, style ) => index % 5 == 0 ? style : false);

console.log( jV.options );

var pV = g.newSerie( "pV" ) // Note the same of the serie
.autoAxis()
.setWaveform( wave2 )

g.getXAxis().setLabel( "Voltage" ).setUnit( "V" ).setUnitWrapper("(", ")");
g.getYAxis().setLabel( "Current density" ).setUnit( "mA cm^-2" ).setUnitWrapper("(", ")");

g.draw();
})();

</script>

However this makes no scientific sense. Power density has not the same units as current density, and hence it should be displayed on the same scale at all ! So instead of calling {@link Serie#autoAxis}, let's rather use another y axis for the power density.

### <a id="doc-multipleaxes"></a> Plotting on multiple axes

jsGraph can use as many axis as you want. X axes can be at the top or bottom position, and Y axes can be at the left or at the right position. You can specify to jsGraph which axes you want with which options during graph creation ({@link Graph}), but axes can also be created on the fly, which is probably easiers to understand.
For instance, if you call

```javascript
g.getBottomAxis( n[, options ] )
```

where `n` is a number, jsGraph will try to fetch the nth bottom axis. If it doesn't find it, a new bottom axis at index `n` will be created. You can use the optional parameter `options` to specify axis options. However be careful, as **these options will only be effective if no axis existed at this index**.
By default `g.getXAxis()` will behave like this:

1.  Look for a bottom axis at index 0
2.  if failed, look for a top axis at index 0
3.  if failed, create a bottom axis at index 0

The index can be changed by using

```javascript
g.getAxis(n); // n being the index of the axis, starting at 0
```

See {@link Graph#getXAxis}, {@link Graph#getYAxis}, {@link Graph#getBottomAxis}, {@link Graph#getTopAxis}, {@link Graph#getRightAxis}, {@link Graph#getLeftAxis} for the reference API.

So let us apply this to the example:

```javascript
var pV = g
  .newSerie('pV') // Note the name of the serie
  .setXAxis(g.getXAxis())
  .setYAxis(g.getLeftAxis(1)) // Use the left axis at index 1
  .setWaveform(wave2);
```

Here it is the `1` that makes all the difference. The first axis was indexed at `0`, so `g.getLeftAxis( 1 )` will actually create a new axis on the left side of the graph (See {@link Graph#getLeftAxis} and related for more details).

<div id="example-6" class="jsgraph-example"></div>
<script>
( () => {
	var g = new Graph("example-6") // Creates a new graph

    g.resize( 400, 300 ); // Resizes the graph

    var jV = g.newSerie( "jV" ) // Note the same of the serie
     .autoAxis()
     .setWaveform( wave1 )
     .setLineColor( 'red' )
     .setLineWidth( 2 )
     .setMarkers( true )
     .setMarkerStyle({
    	shape: 'rect',
    	strokeWidth: 1,
    	x: -2,
    	y: -2,
    	width: 4,
    	height: 4,
    	stroke: 'rgb( 200, 0, 0 )',
    	fill: 'white'
     }, ( x, y, index, domShape, style ) => index % 5 == 0 ? style : false);

    var pV = g.newSerie( "pV" ) // Note the same of the serie
     .setXAxis( g.getXAxis() )
     .setYAxis( g.getLeftAxis( 1 ) )
     .setWaveform( wave2 )

    g.getXAxis().setLabel( "Voltage" ).setUnit( "V" ).setUnitWrapper("(", ")");
    g.getYAxis().setLabel( "Current density" ).setUnit( "mA cm^-2" ).setUnitWrapper("(", ")");

    g.draw();

})();
</script>

Now things are getting really ugly. This is because primary grids and secondary grids exist for all the axes. For the y axis this leads to the superimposition of too many lines. Let's just turn off some of those grids. While we are at it, let's use a right axis for the power density instead of a left axis to clear up some space.

```javascript
pV.setXAxis(g.getXAxis())
  .setYAxis(g.getRightAxis())
  .setData(serie2);

g.getXAxis().secondaryGridOff();
g.getYAxis().secondaryGridOff();
g.getRightAxis().gridsOff();
g.draw();
```

The whole example (with some cleanup) becomes:

```javascript
var g = new Graph('example-7');

g.resize(400, 300);

var jV = g
  .newSerie('jV', {
    lineColor: 'red',
    lineWidth: 2,
    markers: true,
    markerStyles: {
      unselected: {
        default: {
          shape: 'rect',
          strokeWidth: 1,
          x: -2,
          y: -2,
          width: 4,
          height: 4,
          stroke: 'rgb( 200, 0, 0 )',
          fill: 'white'
        },
        modifiers: (x, y, index, domShape, style) =>
          index % 5 == 0 ? style : false
      }
    }
  })
  .autoAxis()
  .setWaveform(wave1);

var pV = g
  .newSerie('pV')
  .setXAxis(g.getXAxis())
  .setYAxis(g.getRightAxis())
  .setWaveform(wave2);

g.getXAxis()
  .setUnit('V')
  .setLabel('Voltage')
  .secondaryGridOff();

g.getLeftAxis()
  .setUnit('mA cm^-2')
  .setLabel('Current density')
  .secondaryGridOff();

g.getRightAxis()
  .setUnit('mW cm^-2')
  .setLabel('Power density')
  .gridsOff();

g.draw();
```

<div id="example-7" class="jsgraph-example"></div>
<script>
( () => {
	var g = new Graph("example-7");

    g.resize( 400, 300 );

    var jV = g
     .newSerie( "jV", {
     	lineColor: 'red',
     	lineWidth: 2,
     	markers: true,
     	markerStyles: {
     		unselected: {
     			default: {
     				shape: 'rect',
    				strokeWidth: 1,
    				x: -2,
    				y: -2,
    				width: 4,
    				height: 4,
    				stroke: 'rgb( 200, 0, 0 )',
    				fill: 'white'
     			},
     			modifiers: ( x, y, index, domShape, style ) => index % 5 == 0 ? style : false
     		}
     	}
     } )
     .autoAxis()
     .setWaveform( wave1 )


    var pV = g
     .newSerie( "pV" )
     .setXAxis( g.getXAxis() )
     .setYAxis( g.getRightAxis( ) )
     .setWaveform( wave2 );

    g
     .getXAxis()
     .setUnit( "V" )

.setUnitWrapper("(", ")")
.setLabel( "Voltage" )
.secondaryGridOff();

    g
     .getLeftAxis()
     .setUnit("mA cm^-2")

.setUnitWrapper("(", ")")
.setLabel( "Current density" )
.secondaryGridOff();

    g
     .getRightAxis()
     .setUnit("mW cm^-2")

.setUnitWrapper("(", ")")
.setLabel( "Power density" )
.gridsOff();

    g.draw();

})();
</script>

Good ! Let's now see what we can do with the axes.

### <a id="doc-styling"></a>Styling the axis

#### <a id="doc-boundaries"></a>Setting axis boundaries

The first thing you will probably want to do is not to rely on the series data to set the axis minimum / maximum.
By default, there is a 10% margin on each side of the serie, so that the serie doesn't directly touch the axis. This can be changed or removed using {@see Axis#setAxisDataSpacing}

```javascript
g.getBottomAxis().setAxisDataSpacing(0, 0.3); // 0 margin at the lower part of the axis, 30% at the higher part

g.draw();
```

You can also chose to force the axis boundaries independantly of the data of the series:

```javascript
g.getLeftAxis()
  .forceMin(-5)
  .forceMax(20);

g.getRightAxis().forceMax(0);

g.draw();
```

<div id="example-8" class="jsgraph-example"></div>
<script>
( () => {
	var g = new Graph("example-8");

    g.resize( 400, 300 );

    var jV = g
     .newSerie( "jV", {
     	lineColor: 'red',
     	lineWidth: 2,
     	markers: true,
     	markerStyles: {
     		unselected: {
     			default: {
     				shape: 'rect',
    				strokeWidth: 1,
    				x: -2,
    				y: -2,
    				width: 4,
    				height: 4,
    				stroke: 'rgb( 200, 0, 0 )',
    				fill: 'white'
     			},
     			modifiers: ( x, y, index, domShape, style ) => index % 5 == 0 ? style : false
     		}
     	}
     } )
     .autoAxis()
     .setWaveform( wave1 );

    var pV = g
     .newSerie( "pV" )
     .setXAxis( g.getXAxis() )
     .setYAxis( g.getRightAxis( ) )
     .setWaveform( wave2 );

    g
     .getXAxis()
     .setUnit( "V" )

.setUnitWrapper("(", ")");
.setLabel( "Voltage" )
.secondaryGridOff();

    g
     .getLeftAxis()
     .setUnit("mA cm^-2")

.setUnitWrapper("(", ")")
.setLabel( "Current density" )
.secondaryGridOff()
.forceMin( -25 )
.forceMax( 60 );

    g
     .getRightAxis()
     .setUnit("mW cm^-2")

.setUnitWrapper("(", ")");
.setLabel( "Power density" )
.gridsOff()
.forceMax( 5 );

    g.getBottomAxis().setAxisDataSpacing( 0, 0.3 );

    g.draw();

})();
</script>

#### <a id="doc-alignment"></a>Aligning the axes

Sometimes, if you have two axes that should be aligned on a common value, it would be nice to force the axes to behave accordingly. For example, in our example, it makes sense to align the 0 of the current density with the 0 of the power output. So one of the axis will have to behave differently. Let's pick the power output. A more detailed tutorial {@tutorial adaptto} has been written to detail the behavior of the `adaptTo` method.

```javascript
g.getRightAxis().adaptTo(g.getLeftAxis(), 0, 0, 'min'); // The 0 of the right axis should be aligned with the 0 of the left axis
```

<div id="example-9" class="jsgraph-example"></div>
<script>

    ( () => {
    var g = new Graph("example-9");

    g.resize( 400, 300 );

    var jV = g
     .newSerie( "jV", {
     	lineColor: 'red',
     	lineWidth: 2,
     	markers: true,
     	markerStyles: {
     		unselected: {
     			default: {
     				shape: 'rect',
    				strokeWidth: 1,
    				x: -2,
    				y: -2,
    				width: 4,
    				height: 4,
    				stroke: 'rgb( 200, 0, 0 )',
    				fill: 'white'
     			},
     			modifiers: ( x, y, index, domShape, style ) => index % 5 == 0 ? style : false
     		}
     	}
     } )
     .autoAxis()
     .setWaveform( wave1 );

    var pV = g
     .newSerie( "pV" )
     .setXAxis( g.getXAxis() )
     .setYAxis( g.getRightAxis( ) )
     .setWaveform( wave2 );

    g
     .getXAxis()
     .setUnit( "V" )

.setUnitWrapper("(", ")")
.setLabel( "Voltage" )
.secondaryGridOff();

    g
     .getLeftAxis()
     .setUnit("mA cm^-2")

.setUnitWrapper("(", ")")
.setLabel( "Current density" )
.secondaryGridOff()
.forceMin( -25 )
.forceMax( 60 );

    g
     .getRightAxis()
     .setUnit("mW cm^-2")

.setUnitWrapper("(", ")")
.setLabel( "Power density" )
.gridsOff()
.forceMax( 5 );

    g.getBottomAxis().setAxisDataSpacing( 0, 0.3 );
    g.getRightAxis().adaptTo( g.getLeftAxis(), 0, 0, "min" ); // The 0 of the right axis should be aligned with the 0 of the left axis

    g.draw();

} ) ();
</script>

#### <a id="doc-coloring"></a>Coloring the axes

Since v1.13.2, you have the possibility to change the color of the axes. Use the {@link Axis#setAxisColor} method. The color of the ticks can be changed using {@link Axis#setPrimaryTicksColor} and {@link Axis#setSecondaryTicksColor}. The color of the tick labels can be changed using {@link Axis#setTicksLabelColor}. The color of the label can be selected using {@link Axis#setLabelColor}.

```javascript
g
 .getLeftAxis()
 .setAxisColor('red');
 .setPrimaryTicksColor('red')
 .setSecondaryTicksColor('rgba( 150, 10, 10, 0.9 )')
 .setTicksLabelColor('#880000')
 .setLabelColor('red');
```

<div id="example-10" class="jsgraph-example"></div>
<script>
	( () => {
		var g = new Graph("example-10");

    	g.resize( 400, 300 );

    	var jV = g
    	 .newSerie( "jV", {
    	 	lineColor: 'red',
    	 	lineWidth: 2,
    	 	markers: true,
    	 	markerStyles: {
    	 		unselected: {
    	 			default: {
    	 				shape: 'rect',
    					strokeWidth: 1,
    					x: -2,
    					y: -2,
    					width: 4,
    					height: 4,
    					stroke: 'rgb( 200, 0, 0 )',
    					fill: 'white'
    	 			}
    	 		},
        modifiers: ( x, y, index, domShape, style ) => index % 5 == 0 ? style : false
    	 	}
    	 } )
    	 .autoAxis()
    	 .setWaveform( wave1 )

    	var pV = g
    	 .newSerie( "pV" )
    	 .setXAxis( g.getXAxis() )
    	 .setYAxis( g.getRightAxis( ) )
    	 .setWaveform( wave2 );

    	g
    	 .getXAxis()
    	 .setUnit( "V" )
     .setUnitWrapper("(", ")")
    	 .setLabel( "Voltage" )
    	 .secondaryGridOff();

    	g
    	 .getLeftAxis()
    	 .setUnit("mA cm^-2")
     .setUnitWrapper("(", ")")
    	 .setLabel( "Current density" )
    	 .secondaryGridOff()
    	 .forceMin( -25 )
     	 .forceMax( 60 );

    	g
    	 .getRightAxis()
    	 .setUnit("mW cm^-2")
     .setUnitWrapper("(", ")")
    	 .setLabel( "Power density" )
    	 .gridsOff()
    	 .forceMax( 5 );

    	g.getBottomAxis().setAxisDataSpacing( 0, 0.3 );
    	g.getRightAxis().adaptTo( g.getLeftAxis(), 0, 0, "min" ); // The 0 of the right axis should be aligned with the 0 of the left axis

    	g
    	 .getLeftAxis()
    	 .setAxisColor('red')
    	 .setPrimaryTicksColor('red')
    	 .setSecondaryTicksColor('rgba( 150, 10, 10, 0.9 )')
    	 .setTicksLabelColor('#880000')
    	 .setLabelColor('red');

    	g.draw();
    }) ();

</script>
