---
layout: page-sidemenu
subtitle: 'Axes spanning'
---
## Axes spanning

jsGraph allows you to have in a single graph more than one axis at the same position (top, left, right, bottom). Axes don't actually have to take up the 100% of the space, horizontally or vertically.

For example, let us imagine that you want to display different kind of data in the y direction (for example, speed, angle and height), versus one single x axis (let's say time), it might make sense to display all three series in different regions of the graph, because the axes would have nothing to do with each other...

You can do that using the method ```axis.setSpan( spanFrom, spanTo )```, where ```spanFrom``` and ```spanTo``` must range between ```0``` and ```1``` and represents the position in percentage where the axis will start and end.

For the x axis, 0 is always at the left, and 1 is at the right. For the y axis, 0 is the *bottom*, and 1 is the *top* (inverse of the traditional SVG coordinates).

### <a id="example"></a>  Basic example

To illustrate the ```setSpan``` method, let us make a nice graph with two y axes spanning from 0 to 45% and from 55% to 100%:

{% highlight javascript %}

  var graph = new Graph( "example-1" );
  graph.resize( 700, 300 );
  graph.getLeftAxis(0).setSpan( 0.0, 0.45 ).turnGridsOff().setLabel("Colorado");
  graph.getLeftAxis(1).setSpan( 0.55, 1 ).turnGridsOff().setLabel("California");
  
  graph.getBottomAxis().setPrimaryGridColor("rgba( 100, 100, 0, 0.5 )").setLabel("Year");

  graph
    .newSerie( "colorado" )
    .setData( dataColorado )
    .autoAxis()
    .setYAxis( graph.getLeftAxis( 0 ) )
    .setLineColor("#CF4E4E")
    .setLineWidth( 2 );

  graph
    .newSerie( "california" )
    .setData( dataCalifornia )
    .autoAxis()
    .setYAxis( graph.getLeftAxis( 1 ) )
    .setLineColor("#3EA63E")
    .setLineWidth( 2 );

  graph.draw();

{% endhighlight %}


<div id="example-1" class="jsgraph-example"></div>

<script>
	
  var graph = new Graph( "example-1" );
  graph.resize( 700, 300 );
  graph.getLeftAxis(0).setSpan( 0.0, 0.45 ).turnGridsOff().setLabel("Colorado");
  graph.getLeftAxis(1).setSpan( 0.55, 1 ).turnGridsOff().setLabel("California");
  
  graph.getBottomAxis().setPrimaryGridColor("rgba( 100, 100, 0, 0.5 )").setLabel("Year");

  var dataColorado = [[2015,17559.393],[2014,17944.255],[2013,18881.823],[2012,19263.158],[2011,18744.067],[2010,18978.981],[2009,17351.28],[2008,18961.826],[2007,19532.855],[2006,19707.00899],[2005,19013.11703],[2004,19251.20903],[2003,19595.836],[2002,19446.04],[2001,19764.973]];
  var dataCalifornia = [[2015,34522.242],[2014,39213.757],[2013,39474.651],[2012,38978.114],[2011,42542.656],[2010,41890.627],[2009,39271.173],[2008,42190.776],[2007,41064.161],[2006,41937.83301],[2005,40352.02201],[2004,39342.39199],[2003,38521.048],[2002,38604.897],[2001,41305.269]];

  graph
    .newSerie( "colorado" )
    .setData( dataColorado )
    .autoAxis()
    .setYAxis( graph.getLeftAxis( 0 ) )
    .setLineColor("#CF4E4E")
    .setLineWidth( 2 );

  graph
    .newSerie( "california" )
    .setData( dataCalifornia )
    .autoAxis()
    .setYAxis( graph.getLeftAxis( 1 ) )
    .setLineColor("#3EA63E")
    .setLineWidth( 2 );

  graph.draw();

</script>

Of course, this also works with the X axis:



{% highlight javascript %}

  var graph = new Graph( "example-2" );
  
  graph.getBottomAxis(0).setSpan( 0.0, 0.45 ).turnGridsOff().setLabel("Years");
  graph.getBottomAxis(1).setSpan( 0.55, 1 ).turnGridsOff().setLabel("Years");
  
  graph.getLeftAxis().setPrimaryGridColor("rgba( 100, 100, 0, 0.5 )").setLabel("Coal consumption");

  graph
    .newSerie( "colorado" )
    .setData( dataColorado )
    .autoAxis()
    .setXAxis( graph.getBottomAxis( 0 ) )
    .setLineColor("#CF4E4E")
    .setLineWidth( 2 );

  graph
    .newSerie( "california" )
    .setData( dataCalifornia )
    .autoAxis()
    .setXAxis( graph.getBottomAxis( 1 ) )
    .setLineColor("#3EA63E")
    .setLineWidth( 2 );

  graph.draw();

{% endhighlight %}


  <div id="example-2" class="jsgraph-example"></div>

<script>
  
 
  var graph = new Graph( "example-2" );
  graph.resize( 700, 300 );
  graph.getBottomAxis(0).setSpan( 0.0, 0.45 ).turnGridsOff().setLabel("Years");
  graph.getBottomAxis(1).setSpan( 0.55, 1 ).turnGridsOff().setLabel("Years");
  
  graph.getLeftAxis().setPrimaryGridColor("rgba( 100, 100, 0, 0.5 )").setLabel("Coal consumption");

  graph
    .newSerie( "colorado" )
    .setData( dataColorado )
    .autoAxis()
    .setXAxis( graph.getBottomAxis( 0 ) )
    .setLineColor("#CF4E4E")
    .setLineWidth( 2 );

  graph
    .newSerie( "california" )
    .setData( dataCalifornia )
    .autoAxis()
    .setXAxis( graph.getBottomAxis( 1 ) )
    .setLineColor("#3EA63E")
    .setLineWidth( 2 );

  graph.draw();

</script>


###  <a id="overlap"></a>  Overlapping axes

One might wonder how jsgraph handles cases where axis spans overlap. For example ```axisA.setSpan( 0, 55 )``` would clash with ```axisB.setSpan( 50, 100 )```. In such cases, jsGraph determines automatically such clashes and offsets one of the axis (the one with the largest index in the stack) by a sufficient amount so that visual perception is not deteriorated. In general, jsGraph will try to place as many axis in the first level, and perform iteratively for the following levels. For example, if you have ```axisA.setSpan( 0, 55 )```, ```axisB.setSpan( 50, 100 )``` and ```axisC.setSpan( 60, 80 )```, then axisC will be placed together with axisA because they don't overlap. It will not take a third level.

To make it clear, here is how this example would turn out:




{% highlight javascript %}

  var graph = new Graph( "example-3" );

  graph.getLeftAxis(0).setSpan( 0.0, 0.55 ).turnGridsOff().setLabel("Colorado");
  graph.getLeftAxis(1).setSpan( 0.5, 1 ).turnGridsOff().setLabel("California");
  graph.getLeftAxis(2).setSpan( 0.6, 8 ).turnGridsOff().setLabel("Kentucky");
  
  graph.getBottomAxis().setPrimaryGridColor("rgba( 100, 100, 0, 0.5 )").setLabel("Year");

  graph
    .newSerie( "colorado" )
    .setData( dataColorado )
    .autoAxis()
    .setYAxis( graph.getLeftAxis( 0 ) )
    .setLineColor("#CF4E4E")
    .setLineWidth( 2 );

  graph
    .newSerie( "california" )
    .setData( dataCalifornia )
    .autoAxis()
    .setYAxis( graph.getLeftAxis( 1 ) )
    .setLineColor("#3EA63E")
    .setLineWidth( 2 );


  graph
    .newSerie( "kentucky" )
    .setData( dataKentucky )
    .autoAxis()
    .setYAxis( graph.getLeftAxis( 2 ) )
    .setLineColor("#2F7C7C")
    .setLineWidth( 2 );

  graph.draw();

{% endhighlight %}


<div id="example-3" class="jsgraph-example"></div>

<script>
  
  var graph = new Graph( "example-3" );
  graph.resize( 700, 300 );
  
var dataKentucky = [[2015,664.166],[2014,878.434],[2013,915.246],[2012,1183.112],[2011,1539.699],[2010,1542.78],[2009,1521.939],[2008,1723.062],[2007,1752.384],[2006,1710.887],[2005,1676.522],[2004,1731.218],[2003,1727.233],[2002,1821.618],[2001,1739.07]];

 graph.getLeftAxis(0).setSpan( 0.0, 0.55 ).turnGridsOff().setLabel("Colorado");
  graph.getLeftAxis(1).setSpan( 0.5, 1 ).turnGridsOff().setLabel("California");
  graph.getLeftAxis(2).setSpan( 0.6, 0.8 ).turnGridsOff().setLabel("Kentucky");
  
  graph.getBottomAxis().setPrimaryGridColor("rgba( 100, 100, 0, 0.5 )").setLabel("Year");

  graph
    .newSerie( "colorado" )
    .setData( dataColorado )
    .autoAxis()
    .setYAxis( graph.getLeftAxis( 0 ) )
    .setLineColor("#CF4E4E")
    .setLineWidth( 2 );

  graph
    .newSerie( "california" )
    .setData( dataCalifornia )
    .autoAxis()
    .setYAxis( graph.getLeftAxis( 1 ) )
    .setLineColor("#3EA63E")
    .setLineWidth( 2 );


  graph
    .newSerie( "kentucky" )
    .setData( dataKentucky )
    .autoAxis()
    .setYAxis( graph.getLeftAxis( 2 ) )
    .setLineColor("#2F7C7C")
    .setLineWidth( 2 );


  graph.draw();

</script>