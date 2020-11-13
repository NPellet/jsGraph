const graph = new Graph("example-3");
graph.resize(400, 300);

let x = new Array(200).fill(0).map((x, index) => index / 20);
let y = [...x].map(x => Math.sin(x));
let w = Graph.newWaveform().setData(y, x);
let s = graph.newSerie('s', {}, 'scatter').setWaveform(w).autoAxis();

let neg = { shape: 'circle', r: 3, fill: 'red' }
let pos = { shape: 'rect', width: 4, height: 4, x: -2, y: -2, fill: 'green' };

s.setMarkerStyle(neg, "negative");
s.setMarkerStyle(pos, "positive");

s.setIndividualStyleNames((s, i) => s.getWaveform().getY(i) > 0 ? 'positive' : 'negative');
graph.draw();