const years = [1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012];
const coalConsumption = [0.020494449, 0.020919039, 0.021248864, 0.021850876, 0.02315959, 0.024146973, 0.024530887, 0.025317155, 0.026103415, 0.026055829, 0.026108312, 0.025206791, 0.024850082, 0.025047841, 0.025224058, 0.025698446, 0.026416749, 0.026247128, 0.02613963, 0.026560849, 0.027977463, 0.028029715, 0.02855675, 0.030803576, 0.033055718, 0.034708407, 0.036478632, 0.038019204, 0.038728538, 0.038927756, 0.041658958, 0.043534821, 0.043029446];

const g = new Graph('example-2');
g
    .resize(500, 300)
    .newSerie('coal_consumption')
    .setWaveform(Graph.newWaveform().setData(coalConsumption, years))
    .setLineColor('#A52B11')
    .setMarkers(true)
    .setMarkerStyle({ shape: 'circle', r: 4, fill: '#A52B11', stroke: 'white', strokeWidth: '2px' })
    .autoAxis();

g.getBottomAxis().setLabel('year');
g.getLeftAxis().setUnit('Wh').setUnitWrapper('[', ']');
g.getLeftAxis().setLabel('World coal consumption');
g.draw();
