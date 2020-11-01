
var g = new Graph("graph-example-gettingstarted-1", {});
g.resize(400, 300).newSerie('serieName')
    .setWaveform(Graph.newWaveform().setData([1, 2, 3], [4, 5, 6]))
    .autoAxis();
g.draw();
