module.exports = {
  series: {
    type: 'line',
    data: {
      x: [1, 2, 3, 4, 5],
      y: [1, 2, 3, 2, 1]
    },
    style: {
      marker: {
        shape: 'rect', // circle, path,
        x: -2,
        y: -2,
        width: 4,
        height: 4,
        fillColor: 'white',
        fillOpacity: 0.9,
        strokeColor: 'blue',
        strokeOpacity: 0.7
      }
    }
  }
};
