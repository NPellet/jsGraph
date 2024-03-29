---
layout: page-sidemenu
subtitle: 'Bar charts'
---
## Bar charts
Since v1.15, jsGraph allows you to use the bar chart series together with the bar x axis. The two have to work together, i.e. you cannot assign a line serie to a bar axis neither a bar serie to a normal or a time axis. In addition, for now, bar graphs are only accepted in the x direction (vertical bars).

### <a id="definition"></a> Defining the bar axis

To define the bar axis, you need to pass its reference to the `Graph` constructor:

```javascript
new Graph('domId', options, { bottom: [{ type: 'bar' }] });
```

Alternatively, you can also overwrite the default x axis using:

```javascript
var graph = new Graph('domId', options);
var axis = new (Graph.getConstructor('graph.axis.x.bar'))();
var options = {};
axis.init(graph, options);
graph.setBottomAxis(axis, 0);
```

### <a id="categories"></a>Defining the categories

The next step is to assign the categories that jsGraph should recognize. A category is like an axis value, except that it can take text. When multiple series are used, the values that have the same category will be displayed next to each other.

To define categories, simply use the following setter

```javascript
axis.categories = [
  { title: 'Category 1', name: 'cat1' },
  { title: 'Category 2', name: 'cat2' }
];
```

### <a id="series"></a>Creating series

Alright, then we have to create a few series. The serie creation is the same as for any other serie, and take the type `Graph.SERIE_BAR` or, if you prefer, the string `"bar"`:

```javascript
var s1 = graph.newSerie('serie1', {}, Graph.SERIE_BAR);
// Equivalent to var s1 = graph.newSerie( "serie1", {}, "bar" );

// Let's define a second one
var s2 = graph.newSerie('serie2', {}, Graph.SERIE_BAR);

s1.autoAxis();
s2.autoAxis();
```

There is however one extra step you need to make: you need to tell the axis that the series belong to it. That extra step is, we realize, a real pain, because you need to reassign the series to the axis when creating new ones and when removing them. But it also allows you to specify the order of the series. Maybe we will be able to remove this extra instruction in future releases. In the meantime, here's the syntax:

```javascript
axis.setSeries( s1, s2 [, ...] );
```

### <a id="data"></a>Setting data

Every since jsGraph 2.1, the bar chart also takes a `Waveform` object to represent it's data. However, since there's no math possible on the x data, we have to use a "reduced" `Waveform` object called `WaveformHash`. Such object is created using

```javascript
const wave = Graph.newWaveformHash(); // Create the waveform
wave.setData({ xname1: yVal, xname2: yVal2 }); // Setting the data
serie.setWaveform(wave); // Assigned the waveform to the serie

// In this example
wave1.setData({ cat1: 5, cat2: 12 });
wave2.setData({ cat1: 8, cat2: 10 });
```

### <a id="styling"></a>Styling the series

Some additional styling options are available to differentiate series from one another. In additions to the methods provided by the line serie (`setLineWidth`, `setLineColor`, the bar series take the additional `setFillColor` and `setFillOpacity` method which set the inner color and inner opacity of the bars, respectively. Bar charts take no markers.

```javascript
s1.setLineColor('crimson')
  .setFillColor('crimson')
  .setFillOpacity(0.5);
s2.setLineColor('DarkGreen')
  .setFillColor('DarkGreen')
  .setFillOpacity(0.5);
```

### <a id="example"></a>Results

Ok, let's take all of this code, put it together and display the result:

```javascript
var graph = new Graph('example-1');
graph.resize(400, 300);

var axis = new (Graph.getConstructor('graph.axis.x.bar'))();
var options = {};
axis.init(graph, options);
graph.setBottomAxis(axis, 0);
axis.categories = [
  { title: 'Category 1', name: 'cat1' },
  { title: 'Category 2', name: 'cat2' }
];

var s1 = graph.newSerie('serie1', {}, Graph.SERIE_BAR);
s1.autoAxis();
s1.setWaveform(wave1);
s1.setLineColor('crimson')
  .setFillColor('crimson')
  .setFillOpacity(0.5);

var s2 = graph.newSerie('serie2', {}, Graph.SERIE_BAR);
s2.autoAxis();
s2.setWaveform(wave2);
s2.setLineColor('DarkGreen')
  .setFillColor('DarkGreen')
  .setFillOpacity(0.5);

axis.setSeries(s1, s2);
graph.draw();
```

<div id="example-1" class="jsgraph-example"></div>
<script>

    var wave1 = Graph.newWaveformHash( { "cat1": 5, "cat2": 12 } );
    var wave2 = Graph.newWaveformHash( { "cat1": 8, "cat2": 10 } );

    var graph = new Graph( "example-1" );
    graph.resize( 400, 300 );

    var axis = new ( Graph.getConstructor( 'graph.axis.x.bar' ) )
    var options = {};
    axis.init( graph, options );
    graph.setBottomAxis( axis, 0 );
    axis.categories = [ { title: "Category 1", name: "cat1" }, { title: "Category 2", name: "cat2" } ];

    var s1 = graph.newSerie( "serie1", {}, Graph.SERIE_BAR );
    s1.autoAxis();
    s1.setWaveform( wave1 );
    s1.setLineColor('crimson').setFillColor('crimson').setFillOpacity( 0.5 );

    var s2 = graph.newSerie( "serie2", {}, Graph.SERIE_BAR );
    s2.autoAxis();
    s2.setWaveform( wave2 );
    s2.setLineColor('DarkGreen').setFillColor('DarkGreen').setFillOpacity( 0.5 );

    axis.setSeries( s1, s2 );
    graph.draw();

</script>
 
It might be worth it to add the following code to make the Y axis start at 0:
```javascript
graph.getLeftAxis().forceMin( 0 );
```

###<a id="errorbars"></a>Adding errors to the bars

Adding error bars in bar charts is similar to the line series. The style has to be defined first using the `setErrorBoxStyle` and the `setErrorBarStyle` method **to the waveform**. Here's an example:

```javascript
wave1.setErrorBarStyle({
  top: { strokeColor: 'black', strokeOpacity: 0.7 },
  bottom: { strokeColor: 'orange', strokeOpacity: 0.7 }
});
```

The keys can be `top` or/and `bottom` or `all` to allow you to style only the top one, the bottom one or both of them. With bar charts, no x error is possible.

To add error values, first create a new wave:

```javascript
// Our original wave
var wave1 = Graph.newWaveformHash({ cat1: 5, cat2: 12 });

// The error wave
var errorWave1 = Graph.newWaveformHash({ cat1: 0.5, cat2: 3 });

// Assign the error wave to the original wave
wave1.setErrorBar(errorWave1, true); // The second argument recalculates the min/max of wave1
```

Here is the complete code of the error bar example:

```javascript
var graph = new Graph('example-2');
graph.resize(400, 300);

var axis = new (Graph.getConstructor('graph.axis.x.bar'))();
var options = {};
axis.init(graph, options);
graph.setBottomAxis(axis, 0);

axis.categories = [
  { title: 'Category 1', name: 'cat1' },
  { title: 'Category 2', name: 'cat2' }
];

var wave1 = Graph.newWaveformHash({ cat1: 5, cat2: 12 });
var wave2 = Graph.newWaveformHash({ cat1: 8, cat2: 10 });

var errorWave2_top = Graph.newWaveformHash({ cat1: 0.5, cat2: 3 });
var errorWave2_bottom = Graph.newWaveformHash({ cat1: 0.9, cat2: 0.6 });
var errorWave1 = Graph.newWaveformHash({ cat1: 2, cat2: 4 });
wave1.setErrorBar(errorWave1, true);
wave2.setErrorBarAbove(errorWave2_top, true);
wave2.setErrorBarBelow(errorWave2_bottom, true);

var s1 = graph.newSerie('serie1', {}, Graph.SERIE_BAR);
s1.autoAxis();

s1.setWaveform(wave1);
s1.setLineColor('crimson')
  .setFillColor('crimson')
  .setFillOpacity(0.5);
s1.setErrorBarStyle({ all: { strokeColor: 'crimson' } });

var s2 = graph.newSerie('serie2', {}, Graph.SERIE_BAR);
s2.autoAxis();

s2.setWaveform(wave2);
s2.setLineColor('DarkGreen')
  .setFillColor('DarkGreen')
  .setFillOpacity(0.5);
s2.setErrorBarStyle({
  top: { strokeColor: 'DarkGreen' },
  bottom: { strokeWidth: 3, strokeColor: 'DarkGreen' }
});

axis.setSeries(s1, s2);
graph.draw();
```

<div id="example-2" class="jsgraph-example"></div>
<script>
	var graph = new Graph( "example-2" );
	graph.resize( 400, 300 );

    var axis = new ( Graph.getConstructor( 'graph.axis.x.bar' ) )
    var options = {};
    axis.init( graph, options );
    graph.setBottomAxis( axis, 0 );

    axis.categories = [
    	{ title: "Category 1", name: "cat1" },
    	{ title: "Category 2", name: "cat2" }
    ];

    var wave1 = Graph.newWaveformHash( { "cat1": 5, "cat2": 12 } );
    var wave2 = Graph.newWaveformHash( { "cat1": 8, "cat2": 10 } );
    var errorWave2_top = Graph.newWaveformHash( { "cat1": 0.5, "cat2": 3 } );
    var errorWave2_bottom = Graph.newWaveformHash( { "cat1": 0.9, "cat2": 0.6 } );
    var errorWave1 = Graph.newWaveformHash( { "cat1": 2, "cat2": 4 } );
    wave1.setErrorBar( errorWave1, true );
    wave2.setErrorBarAbove( errorWave2_top, true );
    wave2.setErrorBarBelow( errorWave2_bottom, true );

    var s1 = graph.newSerie( "serie1", {}, Graph.SERIE_BAR );
    s1.autoAxis();

    s1.setWaveform( wave1 );
    s1.setLineColor('crimson').setFillColor('crimson').setFillOpacity( 0.5 );
    s1.setErrorBarStyle({ all: { strokeColor: 'crimson' } });

    var s2 = graph.newSerie( "serie2", {}, Graph.SERIE_BAR );
    s2.autoAxis();

    s2.setWaveform( wave2 );
    s2.setLineColor('DarkGreen').setFillColor('DarkGreen').setFillOpacity( 0.5 );
    s2.setErrorBarStyle({ top: { strokeColor: 'DarkGreen' }, bottom: { strokeWidth: 3, strokeColor: 'DarkGreen' } });

axis.setSeries( s1, s2 );
graph.draw();
/\*
s1.setErrorStyle( [ { type: 'bar', y: { width: 10, strokeColor: 'crimson', strokeOpacity: 0.7 } } ] );

s1.setDataError( { "cat1": [ [ 2, 1 ] ], "cat2": [ 0.4 ] } );

s2.setErrorStyle( [ { type: 'bar', y: { width: 10, strokeColor: 'DarkGreen', strokeOpacity: 0.7 } } ] );
s2.setDataError( { "cat1": [ 0.9 ] } );
\*/

</script>