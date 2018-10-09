export default {
  axes: {
    left: [
      {
        label: 'Produced mass',
        unit: 'g',
        unitWrapper: ['(', ')'],
        unitDecade: true
      }
    ],
    bottom: {
      type: 'category',
      name: 'cat_btm',
      categories: [
        { name: 'peach', label: 'Peaches' },
        { name: 'apple', label: 'Apples' },
        { name: 'orange', label: 'Oranges' }
      ]
    }
    // x:, y:
  },
  series: [
    {
      type: 'bar',
      label: 'July',
      data: {
        orange: 5,
        apple: 7,
        peach: 2
      },
      style: {
        color: 'red',
        width: 4,
        fill: 'none',
        fillOpacity: 0.9
      }
    },
    {
      type: 'bar',
      label: 'July',
      data: {
        orange: 15,
        apple: 15,
        peach: 9
      },
      style: {
        color: 'green',
        width: 4,
        fill: 'none',
        fillOpacity: 0.9
      }
    }
  ]
};
