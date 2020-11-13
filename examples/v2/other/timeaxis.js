import Graph from '../../../src/graph.js';

const domGraph = 'graph';

var graph = new Graph(domGraph, {
  axes: {
    bottom: [{
      type: "time"
    }]
  },
  "plugins": {
    "zoom": {
      "zoomMode": "xy"
    }
  },
  "mouseActions": [{ "plugin": "zoom", "shift": false, "ctrl": false }]
});

graph.resize(400, 300);

const w = Graph.newWaveform();

console.time('Serie');
for (let i = 0; i < 100; i++) {
  w.append(i, i);
}
const s = graph
  .newSerie('mySerie', { markers: true }, 'scatter')
  .autoAxis()
  .setWaveform(w);
s.setMarkerStyle({
  shape: 'circle',
  r: 2,
  fill: 'rgba(255, 0, 0, 0.3)',
  stroke: 'rgb(255, 100, 0)'
});
/*graph.makeLegend().notHideable().setAutoPosition('bottom');
graph.getLegend().update();*/

graph.autoScaleAxes();
graph.draw();
console.timeEnd('Serie');
