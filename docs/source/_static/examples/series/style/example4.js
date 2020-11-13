const graph = new Graph("example-4");
graph.resize(400, 300);

let date = Date.now();
let s = graph.newSerie('s', {}, 'line').autoAxis();


function d() {
    let phase = (Date.now() - date) / 1000;
    let x = new Array(200);
    x = x.fill(0).map((x, index) => index / 10);
    let y = [...x].map(x => Math.sin(x + phase));

    let w = Graph.newWaveform();
    w.setData(y, x);
    s.setWaveform(w);
    s.setIndividualStyleNames((s, i) => s.getWaveform().getY(i) > Math.cos(phase) ? 'positive' : 'negative');

    graph.draw();
}

let def = { line: { color: 'orange', width: 2 } };
let neg = { markers: { all: { shape: 'circle', r: 3, fill: 'red' } } }
let pos = { markers: { all: { fill: 'green' }, modifiers: (x, y, index) => index % 2 == 0 ? { fill: 'blue' } : null } };

s.setMarkers();
s.setStyle(def, "unselected"); // In the scatter serie, this is overridden by setIndividualStyleNames, but the line serie will take the "unselected" style
s.setStyle(neg, "negative");
s.setStyle(pos, "positive", "negative");


graph.draw();

setInterval(d, 100);