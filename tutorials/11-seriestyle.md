************************
Styling series
************************

The default line serie appears pretty dull: a black line without much feature. This might be ok for a simple plot or a quick test, but try having multiple series, and you won't understand anything.

Luckily, the style of each serie can be programmed using the API. Here we will cover the styling of line and scatter series.

Style classes
************************

A serie can support several styles that you may pre-program. There is no limit to how many styles you may give to a serie. There are however two default style names that are reserved:

* ``unselected``. The style by default. Until you call ``.switchStyle`` or ``.select``, the style ``unselected`` will be displayed.
* ``selected``. The style that is select when a serie is selected. There are various ways to select a serie, including by clicking on it, but also through the ``serie.select()`` API call.

.. note:: Any style-setting API you make without specifying the style name affects the ``unselected`` style

Switching between styles
===========================

There is a simple API call that you need to remember:

.. code-block:: javascript

	serie.switchStyle( newStyleName );


Using the style API
*****************************

The methods that can set styles are the following:

* Line styling
	* `setLineColor( String serieColor [, String selectionName = "undefined" ] [, bool applyToSelected ] )`
	* `setLineWidth( Number strokeWidth [, String selectionName = "undefined" ] [, bool applyToSelected ] )`
	* `setLineStyle( Number serieStyle [, String selectionName = "undefined" ] [, bool applyToSelected ] )`

* Marker styling
	* `setMarkers( Object markerFamilies [, String selectionName = "undefined" ] [, bool applyToSelected ] )`
	* `showMarkers( [, String selectionName = "undefined" ] )`
	* `hideMarkers( [, String selectionName = "undefined" ] )`
	* `markersShown( [, String selectionName = "undefined" ] )`
	* `setMarkersPoints( String familyName, mixed Points [, String selectionName = "undefined" ] )`

The line styling refers only to line series, while the markers apply to both ``scatter`` and ``line`` series.


Each of these methods take the parameter ``selectionName``, which defaults with "undefined", the standard style.

In addition to that, some parameters take the boolean `applyToSelected` which applies the command not only to the style you are selected with ``selectionName``, but also to the ``selected`` style. This is quite useful because it shrinks the number of API calls:


.. code-block:: javascript

	serie.setLineColor('red');
	serie.setLineColor('red', 'selected');

	// Has similar effect as
	serie.setLineColor('red', undefined, true);

** warning:: When styles are used in the options passed to the constructor, they will apply to the ``unselected`` **and** to the ``selected`` styles.


Line serie
************************

#### <a id="extend-style"></a> Extending style

You can also extend one style by another one, like this:

```javascript
serie.extendStyle( String styleTarget, String styleOrigin );
```

which will extend styleTarget with styleOrigin, provided that the parameter in styleTarget is not defined. In other words, styleTarget parameters have the priority. For the jQuery people, this would correspond to: `styleTarget = $.extend( {}, true, styleTarget, styleOrigin );`

#### <a id="select-method"></a> The select method

Although you could call directly

```javascript
serie.select( [ String selectName = "selected" ] );
```

where the parameter `selectName` is optional and takes "selected" by default, jsGraph also manages serie selection from its core. Therefore, we advise to call

```javascript
graph.selectSerie( {Number|String} serieName [, String selectName = "selected" ] );
```

#### <a id="extend-markers"></a> Extending some marker properties

Sometimes you want to copy some marker styles from one style to another, and you can do it using `serie.extendStyle` method. But all the marker properties will be copied, and perhaps you want to apply some post-modification. jsGraph exposes a few methods for that:

- `setMarkerPoints( newPoints, familyIndex, selectionType )` changes the points
- `setMarkersType( newType, familyIndex, selectionType )` changes the markers type
- `setMarkersZoom( newZoom, familyIndex, selectionType )` changes the markers zoom
- `setMarkersStrokeColor( newStrokeColor, familyIndex, selectionType )` changes the markers stroke color
- `setMarkersStrokeWidth( newStrokeWidth, familyIndex, selectionType )` changes the markers stroke width
- `setMarkersFillColor( newFillColor, familyIndex, selectionType )` changes the markers fill color

The `familyIndex` parameter relates to the marker family, i.e. the index of the markers to change as was used in the `setMarkers`method. `familyIndex` defaults to 0. The `selectionType` parameter is the name of the selection style for which the style should be overwritten.

#### <a id="example"></a>Example

Consider the following example:

```javascript
s.setLineColor('#0710ad');
s.setLineStyle(2);
s.setLineWidth(3);
s.setMarkers([
  {
    type: 1,
    zoom: 1,
    strokeWidth: 2,
    strokeColor: 'white',
    fillColor: '#0710ad'
  }
]);
```

<div id="doc-example-1"></div>
<script>

const data = [ 1900, 1555, 1910, 1783, 1920, 1872, 1930, 1943, 1941, 1992, 1949, 2339, 1954, 2482, 1959, 2644, 1964, 3046, 1969, 3098, 1974, 3273, 1979, 3095, 1984, 3288, 1989, 3704, 1994, 3999, 1999, 4075, 2004, 4429, 2009, 4588, 2014, 4918 ];
const wave = Graph.newWaveform().setData( data.filter( ( el, index ) => index % 2 == 1 ), data.filter( ( el, index ) => index % 2 == 0 ) );

var graph = new Graph("doc-example-1").resize(400, 250);
var s = graph.newSerie().autoAxis().setWaveform( wave );

s.setLineColor( "#0710ad" );
s.setLineStyle( 2 );
s.setLineWidth( 2 );
s.setMarkers( {
shape: 'circle',
strokeWidth: 2,
stroke: '#0710ad',
fill: '#676cc6'
} ); // Will apply to "selected"

graph.draw();

</script>

Like we said before, by default, all those methods apply to the "unselected" style. We could decide to create a few more styles, and to extend others from the "unselected" one in several ways.

```javascript
// Sets the "unselected" line color
s.setLineColor('#0710ad');

// Sets the line style to "unselected" and "selected"
s.setLineStyle(2, false, true);

// Sets the line width to "unselected" and "selected"
s.setLineWidth(2, false, true);

// Sets the markers to "unselected" and "selected"
s.setMarkers(
  [
    {
      type: 1,
      zoom: 2,
      strokeWidth: 2,
      strokeColor: 'white',
      fillColor: '#0710ad'
    }
  ],
  false,
  true
);

// Sets the color for "selected"
s.setLineColor('#2e7c14', 'selected');

// Overwrites the previously set line style of "selected" (see the 2nd command line)
s.setLineStyle(1, 'selected');

// Creates a new style "extended" and extends it from "unselected"
s.extendStyle('extended', 'unselected');

// Overwrites the line width
s.setLineWidth(4, 'extended');

// Copy "custom1" into the new style "custom2"
s.extendStyle('custom2', 'custom1');

// Overwrite some of the marker properties in "custom2"
s.setMarkersStrokeColor('#247c4e', 1, 'custom2');
s.setMarkersFillColor('#6fb590', 1, 'custom2');

// You have to draw the series at the end
graph.draw();
```

<div id="doc-example-2"></div>

<div class="btn-group" id="doc-example-1-btns">
	<button class="btn btn-default" data-style="unselected">"unselected" style</button>
	<button class="btn btn-default" data-style="selected">"selected" style</button>
	<button class="btn btn-default" data-style="extended">"extended" style</button>
	<button class="btn btn-default" data-style="custom1">"custom1" style</button>
	<button class="btn btn-default" data-style="custom2">"custom2" style</button>
</div>

<script>

( function() {
	var graph = new Graph("doc-example-2").resize(400, 250);
	var s = graph.newSerie( "serie" ).setWaveform( wave ).autoAxis();

	s.setLineColor( "#0710ad" );
	s.setLineStyle( 2, false, true );  // Will apply to "selected"
	s.setLineWidth( 2, false, true );  // Will apply to "selected"
	s.setMarkers( {
		shape: 'circle',
		strokeWidth: 2,
		stroke: '#0710ad',
		fill: '#676cc6'
	}, undefined, "selected" ); // Will apply to "selected"

	s.setLineColor( "#2e7c14", "selected" );
	s.setLineStyle( 1, "selected" );

	s.extendStyle( "extended", "unselected" );	
	s.setLineWidth( 4, "extended" );

	s.extendStyle( "custom1", "unselected" );
	s.setMarkerStyle( {
		shape: 'circle',
		strokeWidth: 2,
		stroke: '#0710ad',
		fill: '#676cc6',
	}, ( x, y, index ) => {
		if( index == 1 || index == 4 || ( index <= 6 && index <= 9 ) ) {
			return {
				strokeWidth: 2,
				strokeColor: '#962614',
				fillColor: '#b76e62'
			}
		}	
	}, "custom1" );


	s.extendStyle( "custom2", "custom1" );
	s.setMarkerStyle( {
		shape: 'circle',
		strokeWidth: 2,
		stroke: '#247c4e',
		fill: '#6fb590',
	}, undefined, "custom2" );


	graph.draw();

	$("#doc-example-1-btns").on('click', 'button', function() {
		
		graph.selectSerie( "serie", $( this ).data('style') );
	});
}) ();

</script>
