import Graph from '../../../src/graph.js';

var graph = new Graph( {} );

graph.setJSON(
    {
        "axes": {
          "x": {
              "name": "x",
            "currentAxisMin": -10,
            "currentAxisMax": 100
          },
          "y": {
            "label": "Transmission",
            "unit": "%",
            "unitWrapperBefore": "[",
            "unitWrapperAfter": "]",
            "flipped": true,
            "primaryGrid": false,
            "secondaryGrid": false
          }
        },
        "series": [
          {
            "type": "line",
            "data": {
              "x": [1, 2, 3, 4, 5],
              "y": [1, 2, 3, 2, 1]
            }
          }
        ]
      }
);

setTimeout( () => {

    graph.setJSON( {
        "axes": {
          "x": {

            "name": "x",
            "label": "Wavelength",
            "unit": "nm",
            "unitWrapperBefore": "[",
            "unitWrapperAfter": "]",
            
                    
            "primaryGridWidth": 3,
            "primaryGridColor": "purple",
            "primaryGridDasharray": "2 1",
            "primaryGridOpacity": 0.7,
            "primaryTicksColor": "blue",
    
            "secondaryGridWidth": 2,
            "secondaryGridColor": "green",
            "secondaryGridDasharray": "3 2 4 1",
            "secondaryGridOpacity": 0.5,
            "secondaryTicksColor": "orange"
          },
          "y": {
            "label": "Transmission",
            "unit": "%",
            "unitWrapperBefore": "[",
            "unitWrapperAfter": "]",
    
            "primaryGrid": false,
            "secondaryGrid": false
          }
        },
        "series": [
          {
            "type": "line",
            "data": {
              "x": [1, 2, 3, 4, 5],
              "y": [1, 2, 3, 2, 1]
            }
          }
        ]
      }, { keepState: true }
      );
}, 2000 )


graph.setWrapper( 'graph' );
/*graph.makeLegend().notHideable().setAutoPosition('bottom');
graph.getLegend().update();*/
//graph.draw();
