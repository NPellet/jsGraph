var dataColorado = [[2015, 17559.393], [2014, 17944.255], [2013, 18881.823], [2012, 19263.158], [2011, 18744.067], [2010, 18978.981], [2009, 17351.28], [2008, 18961.826], [2007, 19532.855], [2006, 19707.00899], [2005, 19013.11703], [2004, 19251.20903], [2003, 19595.836], [2002, 19446.04], [2001, 19764.973]];
var dataCalifornia = [[2015, 34522.242], [2014, 39213.757], [2013, 39474.651], [2012, 38978.114], [2011, 42542.656], [2010, 41890.627], [2009, 39271.173], [2008, 42190.776], [2007, 41064.161], [2006, 41937.83301], [2005, 40352.02201], [2004, 39342.39199], [2003, 38521.048], [2002, 38604.897], [2001, 41305.269]];
dataColorado = Graph.newWaveform().setData(dataColorado.map(e => e[1]), dataColorado.map(e => e[0]));
dataCalifornia = Graph.newWaveform().setData(dataCalifornia.map(e => e[1]), dataCalifornia.map(e => e[0]));

var graph = new Graph('example-2');

graph
    .getBottomAxis(0)
    .setSpan(0.0, 0.45)
    .turnGridsOff()
    .setLabel('Years');
graph
    .getBottomAxis(1)
    .setSpan(0.55, 1)
    .turnGridsOff()
    .setLabel('Years');

graph
    .getLeftAxis()
    .setPrimaryGridColor('rgba( 100, 100, 0, 0.5 )')
    .setLabel('Coal consumption');

graph
    .newSerie('colorado')
    .setWaveform(dataColorado)
    .autoAxis()
    .setXAxis(graph.getBottomAxis(0))
    .setLineColor('#CF4E4E')
    .setLineWidth(2);

graph
    .newSerie('california')
    .setWaveform(dataCalifornia)
    .autoAxis()
    .setXAxis(graph.getBottomAxis(1))
    .setLineColor('#3EA63E')
    .setLineWidth(2);

graph.draw();