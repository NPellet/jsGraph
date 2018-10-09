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
      label: 'Fruit type',
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
      xAxis: 'cat_btm',
      type: 'bar',
      label: 'July',
      data: {
        orange: 5,
        apple: 7,
        peach: 2
      }
    },
    {
      xAxis: 'cat_btm',
      type: 'bar',
      label: 'August',
      data: {
        orange: 15,
        apple: 20,
        peach: 22
      }
    }
  ]
};
