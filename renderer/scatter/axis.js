module.exports = {
  axes: {
    x: {
      forcedMin: 0,
      forcedMax: 10,
      flipped: true,
      primaryGrid: true,
      secondaryGrid: true,
      primaryGridColor: '#AAAAAA',
      secondaryGridColor: '#DDDDDD'
    },
    y: {
      label: 'Produced mass',
      unit: 'g',
      unitWrapper: ['(', ')'],
      unitDecade: true,
      logScale: true
    }
  },
  series: {
    type: 'scatter',
    data: {
      x: [1, 2, 3, 4, 5],
      y: [1, 22, 333, 2123, 12344]
    }
  }
};
