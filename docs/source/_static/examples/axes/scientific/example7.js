const g = new Graph('example-7');

let w = Graph.newWaveform()
    .setData(new Array(20)) // Use an empty array to define the length
    .rescaleX(-3, 0.5) // x = -3, -2.5, -2, etc...
    .math((y, x) => { return Math.exp(x) });

let s = g
    .resize(500, 300)
    .newSerie('log')
    .setWaveform(w)
    .setLineColor('#3f9169')
    .setMarkers(true)
    .setMarkerStyle({ shape: 'circle', r: 4, fill: '#3f9169', stroke: 'white', strokeWidth: '2px' })
    .autoAxis();

g.getLeftAxis().setLogScale(true);
g.draw();
