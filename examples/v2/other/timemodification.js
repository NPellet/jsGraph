import Graph from '../../../src/graph.js';

const domGraph = 'graph';

var graph = new Graph(domGraph, {
    axes: {
        bottom: [{
            unitModification: 'time:min_dec'
        }]
    },
    plugins: {
        zoom: {
            zoomMode: "xy"
        }
    },
    mouseActions: [{ plugin: "zoom", shift: false, ctrl: false }]
});

graph.resize(400, 300);

const w = Graph.newWaveform();

for (let i = 0; i < 10000; i++) {
    w.append(i, i);
}
const s = graph
    .newSerie('mySerie', { markers: false })
    .autoAxis()
    .setWaveform(w);

/*graph.makeLegend().notHideable().setAutoPosition('bottom');
graph.getLegend().update();*/

graph.autoScaleAxes();
graph.draw();
