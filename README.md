# jsGraph - Scientific data displayed in your browser

  [![build status][travis-image]][travis-url] [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/NPellet/jsGraph/master/LICENSE) [![GitHub version](https://badge.fury.io/gh/NPellet%2FjsGraph.svg)](https://badge.fury.io/gh/NPellet%2FjsGraph)


jsGraph is a javascript library that can be used to renders scientific data in your browser in the form of graphs and charts. Its primary purpose is to display line plots, scatter plots, contour plots or zone plots, but a powerful shape drawing tool and API is available to annotate the data on the graph.

jsGraph works in most modern browsers (Chrome, Firefox, Safari, IE >= v10). It uses the SVG technology to render the graphs, so that the file can then be exported and readily used for scientific publications.


## Documentation

The documentation is available in /docs/build or directly hosted on ReadTheDocs.

<font size="+3">[>> Documentation <<](https://jsgraph.readthedocs.io/en/latest/index.html)</font>


## Demonstration
![](./example_output.svg)

Code used to create this example:

```javascript
// Let's take the j-V curve of a solar cell as an example:

// Let's assume we have it in a javascript array, in the format [ [ x1, x2, ... xn ], [ y1, y2, ... yn ] ]
const data = [[-1, -0.95, -0.8999999999999999, -0.8499999999999999, -0.7999999999999998, -0.7499999999999998, -0.6999999999999997, -0.6499999999999997, -0.5999999999999996, -0.5499999999999996, -0.4999999999999996, -0.4499999999999996, -0.39999999999999963, -0.34999999999999964, -0.29999999999999966, -0.24999999999999967, -0.19999999999999968, -0.1499999999999997, -0.09999999999999969, -0.049999999999999684, 3.191891195797325e-16, 0.05000000000000032, 0.10000000000000032, 0.15000000000000033, 0.20000000000000034, 0.25000000000000033, 0.3000000000000003, 0.3500000000000003, 0.4000000000000003, 0.4500000000000003, 0.5000000000000003, 0.5500000000000004, 0.6000000000000004, 0.6500000000000005, 0.7000000000000005, 0.7500000000000006, 0.8000000000000006, 0.8500000000000006, 0.9000000000000007, 0.9500000000000007, 1.0000000000000007, 1.0500000000000007, 1.1000000000000008, 1.1500000000000008, 1.2000000000000008, 1.2500000000000009, 1.300000000000001, 1.350000000000001, 1.40000000000000, 1.450000000000001], [-20.499747544838275, -20.499659532985874, -20.499540838115898, -20.49938076340126, -20.499164882847428, -20.4988737412163, -20.498481100712695, -20.497951576424207, -20.497237447419362, -20.49627435611903, -20.494975508366757, -20.493223851506187, -20.490861525550883, -20.48767563678195, -20.483379071684652, -20.477584622168607, -20.469770090226536, -20.45923122725008, -20.44501826687575, -20.425850331676905, -20.4, -20.365137630064282, -20.318121411753218, -20.25471422548477, -20.16920179137358, -20.053877696141516, -19.89834888820463, -19.68859905188818, -19.405725451695528, -19.024235410553235, -18.509748899999998, -17.81590019886833, -16.88015939675398, -15.618197174567083, -13.916285014032407, -11.621045940111184, -8.52563212933044, -4.351083704794043, 1.2788112346498295, 8.87142097487483, 19.11099441051224, 32.920325817120975, 51.543917424350724, 76.66013443300987, 110.53245992908506, 156.21348084543214, 217.8199882640481, 300.90398420341603, 412.9530301645426, 564.065029038078]];;

// Create a waveform, which is used to represent data in a general sense. It has also a few cool tricks
const wave1 = Graph.newWaveform().setData(data[1], data[0]);

// For example, you can duplicate it into a second wave and do some point-to-point mathematics, in this case calculate the power density
const wave2 = wave1.duplicate().math((x, y) => x * y);

// Let's create a new example and place it in the placeholder <div id="graph-example-1" />
var g = new Graph("graph-example-1", {});

// You need to set the size if the container doesn't have one already
g.resize(400, 300);

// Let us create a new serie, called "jV", with red thick line and markers
var jV = g
    .newSerie("jV", {
        lineColor: 'red',
        lineWidth: 2,
        markers: true,
        // Setting the style of the markers
        markerStyles: {
            // For the default "unselected" style
            unselected: {
                // Default look
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
            // Maybe we want to display only one marker every five points. Nothing easier !
            modifiers: (x, y, index, domShape, style) => index % 5 == 0 ? style : false
        }
    })
    .autoAxis() // Assign it automatically to the left and the bottom axis (which are created by default if they don't exist)
    .setWaveform(wave1) // Assign a waveform to this serie

// How about a second serie ?
var pV = g
    .newSerie("pV") // Give it a unique name, otherwise you'll overwrite the first one
    .setXAxis(g.getXAxis()) // The x axis is the same...
    .setYAxis(g.getRightAxis()) //  But the y axis is different, let's get the first right axis (created by default)
    .setWaveform(wave2); // And assign the second waveform

// How about some styling of the axes ?
g
    .getXAxis() // Retrieve the bottom axis
    .setUnit("V") // Set the unit voltage
    .setUnitWrapper("(", ")") // Wrap in parentheses ==> (V)
    .setLabel("Voltage") // Show the axis label
    .secondaryGridOff(); // Turn off the secondary grid

g
    .getLeftAxis()  // Retrieve the left axis
    .setUnit("mA cm^-2")
    .setUnitWrapper("(", ")")
    .setLabel("Current density")
    .secondaryGridOff()
    .forceMin(-25) // Force the minimum of the axis
    .forceMax(60);  // And its maximum

g
    .getRightAxis()
    .setUnit("mW cm^-2")
    .setUnitWrapper("(", ")")
    .setLabel("Power density")
    .gridsOff(); // Do not display any grid for the right axis

// Adds some spacing to the right of the axis. This is 30% of the "data width" of the axis (which is the max value - the min value for all series sharing this axis)
g.getBottomAxis().setAxisDataSpacing(0, 0.3);

// We want the 0 of the right axis to match the 0 of the left axis. It's much more natural like that
// Use .adaptTo() to enforce this behaviour adaptTo( otherAxis, myRef, otherRef, clamp )
// The clamp "min" basically says that the normal scaling behaviour applies to the 0 and to the min value of the axis. The max value is therefore the one calculated as a function of the master axis (the left one)
g.getRightAxis().adaptTo(g.getLeftAxis(), 0, 0, "min");

// Some more styling, note how you can change the color of the axis, the ticks, the tick labels and the axis label
g
    .getLeftAxis()
    .setAxisColor('red')
    .setPrimaryTicksColor('red')
    .setSecondaryTicksColor('rgba( 150, 10, 10, 0.9 )')
    .setTicksLabelColor('#880000')
    .setLabelColor('red');

// autoscale has to be called before the first rendering when more than one serie was added
g.autoScaleAxes();

// And finally, let's draw it !
g.draw();
```



## Installing

```npm install node-jsgraph``` 

## Usage

You can use AMD, CommonJS or Browser Global definition thanks to the UMD loader. Just use

```javascript 
define(["path/to/jsgraph.min.js"], function(Graph) {

});
```
or 

```javascript 
const Graph = require('jsGraph');
```

or, if you include the distribution directly, use the ```Graph``` variable exported at the ```window``` level.


## How to contribute
- Contributions to jsGraph are greatly encouraged. You are welcome to develop your own features and we'll do our best to integrate them through your pull requests.
- jsGraph is in a continuously developing state. Although it's quite stable, some bugs do still appear here and there. If you encounter some of them, please report them in the issue section of the github so that we can fix them ASAP.
- If you have great ideas, if you know features that other softwares do better than jsGraph, just let us know ! We're always trying to expand our range of functionnalities.


## License

  [MIT](./LICENSE)
  

[travis-image]: https://img.shields.io/travis/NPellet/jsGraph/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/NPellet/jsGraph
