import Graph from '../../../src/graph.js';

const domGraph = 'graph';

var graph = new Graph( domGraph, {

    "plugins": {
        "selectScatter": {
          
        },
        "zoom": { "zoomMode": "xy" }

      },
      "mouseActions": [{ "type": "mousedown", "plugin": "selectScatter", "shift": false, "ctrl": false },
      {  "plugin": "zoom", "shift": true, "ctrl": false }]
}, {} );

graph.resize( 400, 400 );

const waveform = Graph.newWaveform().setData( [ 1, 5, 2, 9, 2 ], [ 1, 2, 3, 4, 5, 6 ] );
graph.newSerie( 'mySerieName', {}, 'scatter' )
.autoAxis()
.setWaveform( waveform );

graph.getPlugin('selectScatter').setSerie( graph.getSerie('mySerieName') );
graph.draw();
