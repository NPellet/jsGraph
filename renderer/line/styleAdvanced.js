module.exports = {
  series: [
    {
      type: 'line',
      data: {
        x: [1, 2, 3, 4, 5],
        y: [1, 2, 3, 2, 1]
      },
      style: [
        {
          name: 'unselected',
          style: {
            line: {
              color: 'black',
              width: 3,
              dash: 3,
              fill: 'none'
            },
            marker: {
              default: {
                shape: 'rect', // circle, path,
                x: -2,
                y: -2,
                width: 4,
                height: 4,
                fillColor: 'white',
                fillOpacity: 0.9,
                strokeColor: 'blue',
                strokeOpacity: 0.7
              },
              modifiers: {
                fillColor: 'red',
                indices: [
                  /*index1, index2, ..., indexN*/
                ]
              }

              /*
            modifiers: [
              {
                fillColor: 'red',
                indices: [  ]
              },
              {
                fillColor: 'blue',
                indices: [  ]
              } 
            ]
            */
              /*
            modifiers: ( x, y, index, domShape, defaultStyle ) => index % 5 == 0 ? { fillColor: 'orange' } : false
          */
              /*
            modifiers: [ { fillColor: 'red' }, null, { fillColor: 'green' } ]
            */
            }
          }
        },
        {
          name: 'preset1',
          extends: 'unselected',
          style: {
            line: {
              color: 'red'
            }
          }
        }
      ]
    }
  ]
};
