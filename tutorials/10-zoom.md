<script>

function makeGraph( domID, zoomOptions, mouseActions, secondSerie ) {

var graph = new Graph( domID, {

plugins: {
  'zoom': zoomOptions || {}
},

mouseActions: mouseActions || []

} );

graph.resize( 400, 300 );

var data = [];
for( var i = 0; i < 2 * Math.PI; i += 0.1 ) {
data.push( i );
data.push( Math.sin( i ) );
}

var serie = graph.newSerie( "firstSerie" ).autoAxis().setData( data );

if( secondSerie ) {

  serie.setLineColor('ForestGreen').setOption('selectableOnClick', true);

  var data = [];
  for( var i = 0; i < 2 * Math.PI; i += 0.1 ) {
  data.push( i );
  data.push( Math.cos( i ) );
  }

  var serie = graph.newSerie( "secondSerie" ).autoAxis().setYAxis( graph.getRightAxis( 0 ) ).setData( data ).setLineColor('crimson').setOption('selectableOnClick', true);

  graph.getRightAxis( 0 ).turnGridsOff();



}
graph.draw();

return { Graph: graph }
}

</script>

The Zoom plugin allows the use to zoom on the graph using the mouse. When the use clicks on the graph, holds the mouse down and moves it around, a red rectangle is formed, which defined the new zooming boundaries that the graph will take when the mouse is released.


### <a id="enabling"></a>Enabling the zoom plugin
The zoom plugin, like any other plugin, needs to be enabled upon graph creation:

{% highlight javascript %}
new Graph( "domID", {  
  plugins: {
     'zoom': {
        // ... zoom options
      }
  }
});
{% endhighlight %}

### <a id="features"></a>Features

Here are a few features that the zoom plugin can provide you:

* Zooming in x and y direction or forced in the x or y-direction
* Zooming on one axis only
* Double click to unzoom
* Mouse wheel to zoom gradually
* Smooth transition (animated zooming)
* Event calls and cancellation possible


### <a id="basics"></a>Basics

We will now cover the basics of the zoom plugin. The zoom plugin is intimate with the option ```mouseActions``` of the graph, which can be accessed in the constructor options or via direct settings. The mouse actions define what jsGraph should do upon various mouse events. We will cover the mouse actions in details somewhere else, but for now, let's take the following code as it is:

{% highlight javascript %}
new Graph( "domID", {  
  plugins: {
     'zoom': {
        // ... zoom options
        zoomMode: 'xy'
      }
  },

  mouseActions: [
    { plugin: 'zoom', shift: false, ctrl: false }
  ]
});
{% endhighlight %}

The following code enables the zoom plugin only when the ```Shift``` and ```Ctrl``` key are not pressed. If one of these were ```true```, the use would need to have the key pressed to enable zooming.

#### <a id="example"></a>Example

Using the previous code, we create the zoom plugin and enable it using the mouse action. The buttons below the graph trigger the following code.

{% highlight javascript %}
// Enabling button
graph.options.mouseActions[ 0 ].shift = true;

// Disabling button
graph.options.mouseActions[ 0 ].shift = false;
{% endhighlight %}

<div id="example-1" class="jsgraph-example"></div>

<script>

var graphResponse = makeGraph( "example-1", { zoomMode: 'xy' }, [ { plugin: 'zoom' } ] ); 

$( document ).ready( function() {

  $( '#example-1-shift' ).on( 'click', function() {
    
    graphResponse.Graph.options.mouseActions[ 0 ].shift = true;

    $( this ).siblings( ).removeClass( 'active' );
    $( this ).addClass( 'active' );
  });

  $( '#example-1-shift2' ).on('click', function() {
    
    graphResponse.Graph.options.mouseActions[ 0 ].shift = false;

    $( this ).siblings( ).removeClass( 'active' );
    $( this ).addClass( 'active' );
  });
});
</script>

<div class="btn-group">
  <button class="btn btn-default" id="example-1-shift">Enable shift</button>
  <button class="btn btn-default active" id="example-1-shift2">Disable shift</button>
</div>


### <a id="forcing"></a>Forcing the x or y direction
 
The ```zoomMode``` options passed in the plugin creation or after its initialization defined the behaviour of the zoom and takes the following possible values:

* ```xy``` lets the use zoom in both directions
* ```x``` forces zooming in the x direction only
* ```y``` forces zooming in the y direction only


### <a id="unzooming"></a>Unzoom on double click

So far, the only way to unzoom on a graph is to active the double click. The double click behavior is also defined through mouse actions, in the following way:

{% highlight javascript %}
// Enabling button
{ type: 'dblclick', plugin: 'zoom', shift: false, options: { mode: 'total' } }
{% endhighlight %}

Where the ```type``` defines the mouse action (dblclick in this case), upon which the plugin ```zoom``` is called with the options ```{ mode: 'total' }```.

<div id="example-2" class="jsgraph-example"></div>

<script>

var graphResponse = makeGraph( "example-2", { zoomMode: 'xy' }, [ { plugin: 'zoom' }, { type: 'dblclick', plugin: 'zoom', shift: false, options: { mode: 'total' } }
 ] ); 

</script>

The only available option in the double click mouse events is the ```mode``` options, which takes the following values:

* ```total``` (default): Unzooms the axes to fit the natural boundaries of the axes (defined by the data or by the ```forcedMin```/```forcedMax``` options)
* ```xtotal```. Only unzooms the x axis
* ```ytotal```. Only unzooms the y axis
* ```gradualXY```. Unzooms the axes by a factor 2 only. The unzooming is centered on the position where the mouse is clicked
* ```gradualX```. Same as ```gradualXY``` but in the x direction only
* ```gradualY```. Same as ```gradualY``` but in the y direction only


<div id="example-3" class="jsgraph-example"></div>

<script>

( function() {

var graphResponse = makeGraph( "example-3", { zoomMode: 'xy' }, [ { plugin: 'zoom' }, { type: 'dblclick', plugin: 'zoom', shift: false, options: { mode: 'total' } }
 ] ); 

$( document ).ready( function() {

  $( 'button.example-3' ).on( 'click', function() {
    
    switch( $( this ).attr( 'id' ).replace('example-3-', '' ) ) {

      case 'total':
        graphResponse.Graph.options.mouseActions[ 1 ].options.mode = 'total';
      break;
      case 'xtotal':
        graphResponse.Graph.options.mouseActions[ 1 ].options.mode = 'xtotal';
      break;
      case 'ytotal':
        graphResponse.Graph.options.mouseActions[ 1 ].options.mode = 'ytotal';
      break;
      case 'gradualXY':
        graphResponse.Graph.options.mouseActions[ 1 ].options.mode = 'gradualXY';
      break;
      case 'gradualX':
        graphResponse.Graph.options.mouseActions[ 1 ].options.mode = 'gradualX';
      break;
      case 'gradualY':
        graphResponse.Graph.options.mouseActions[ 1 ].options.mode = 'gradualY';
      break;

    }  
    
    $( this ).siblings( ).removeClass( 'active' );
    $( this ).addClass( 'active' );
  });

});


}) ();
</script>

<div class="btn-group">
<button class="btn btn-default example-3 active" id="example-3-total">total</button>
<button class="btn btn-default example-3" id="example-3-xtotal">xtotal</button>
<button class="btn btn-default example-3" id="example-3-ytotal">ytotal</button>
<button class="btn btn-default example-3" id="example-3-gradualXY">gradualXY</button>
<button class="btn btn-default example-3" id="example-3-gradualX">gradualX</button>
<button class="btn btn-default example-3" id="example-3-gradualY">gradualY</button>
</div>



### <a id="oneaxis"></a> Zooming on one axis only
The default behaviour of jsGraph is to unzoom all present axes on the graph. The mouse coordinates are transformed into respective axes coordinates and used accordingly. However jsGraph also allows you to select which axis should be zoomed.

Changing the zooming axis(es) can be done through the ```axes``` options of the zoom plugin and can take the following values:

* ```all``` (default): Zooms and unzooms on all axes.
* ```serieSelected```: Zooms and unzooms on the axes belonging to the selected series
* ```[ axis0, axis1, ..., axisN ]```. Provide a user-defined list of axes

Reminder: line series can be made selectable on click using the ```selectableOnClick: (bool)``` option and all series can be programmatically selected or unselected using the ```.select()``` or ```.unselect()``` API.

<div id="example-4" class="jsgraph-example"></div>

<script>

( function() {

var graphResponse = makeGraph( "example-4", { zoomMode: 'xy' }, [ { plugin: 'zoom' }, { type: 'dblclick', plugin: 'zoom', shift: false, options: { mode: 'total' } }
 ], true ); 

$( document ).ready( function() {

  $( 'button.example-4' ).on( 'click', function() {
    
    graphResponse.Graph.options.mouseActions[ 0 ].options = graphResponse.Graph.options.mouseActions[ 0 ].options || {};

    switch( $( this ).attr( 'id' ).replace('example-4-', '' ) ) {

      case 'all':

        graphResponse.Graph.getPlugin('zoom').options.axes = 'all';
      break;
      case 'serieSelected':
        graphResponse.Graph.getPlugin('zoom').options.axes = 'serieSelected';
      break;

      case 'bottom':
        graphResponse.Graph.getPlugin('zoom').options.axes = [ graphResponse.Graph.getBottomAxis() ];
      break;
    }  
    
    $( this ).siblings( ).removeClass( 'active' );
    $( this ).addClass( 'active' );
  });

});


}) ();
</script>

Note: In this example, the x axis is shared between the two series. Hence the serie that is not selected will also be scaled in the x direction when the option ```serieSelected``` is set
<div class="btn-group">
  <button class="btn btn-default example-4 active" id="example-4-all">all</button>
  <button class="btn btn-default example-4" id="example-4-serieSelected">serieSelected</button>
  <button class="btn btn-default example-4" id="example-4-bottom">[ graph.getBottomAxis() ]</button>
</div>



### <a id="smooth"></a>Smooth zooming

Smooth zooming and unzooming using animations is possible with jsGraph, by setting the ```smooth``` flag to true in the plugin constructor or after its creation

{% highlight javascript %}
graph.getPlugin('zoom').options.smooth = true; // Enables smoothing
{% endhighlight %}

This option will apply to zooming and unzooming indepedently


<div id="example-5" class="jsgraph-example"></div>

<script>

( function() {

var graphResponse = makeGraph( "example-5", { zoomMode: 'xy', smooth: true }, [ { plugin: 'zoom' }, { type: 'dblclick', plugin: 'zoom', shift: false, options: { mode: 'total' } }
 ], false ); 

}) ();
</script>


### <a id="mousewheel"></a>Mouse wheel

The mousewheel behavior is set in the ```mouseActions``` array of the graph instance. Options include:

* ```baseline``` sets the zero of the scaling
* ```direction``` (```y``` or ```x```) sets the direction of the zooming

{% highlight javascript %}
{ plugin: 'zoom', shift: true, type: 'mousewheel', options: { baseline: 0, direction: 'y' } },
{% endhighlight %}
