const graph = new Graph("graph-example-gettingstarted-2");
graph.resize(400, 300);

let x = [1, 2];
let y = [1, 2];
let w = Graph.newWaveform().setData(y, x);
let s = graph.newSerie('s').setWaveform(w).autoAxis();
graph.draw();

let i = 0;
setInterval(function () {

    if (i % 100 < 50) {
        x.push(i % 100 + 3);
        y.push(i % 100 + 3);
    } else {
        x.pop();
        y.pop();
    }
    i++;

    w.mutated();
    s.dataHasChanged();
    graph.updateDataMinMaxAxes();
    graph.autoscaleAxes();
    graph.draw();

}, 200);
