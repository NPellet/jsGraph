const graph = new Graph("example-2");
graph.resize(400, 300);

let x = new Array(200).fill(0).map((x, index) => index / 20);
let y = [...x].map(x => Math.sin(x));
let w = Graph.newWaveform().setData(y, x);
let s = graph.newSerie('s', {}, 'scatter').setWaveform(w).autoAxis();

const posModifier = { fill: 'green' };
const negModifier = { fill: 'red' };

const posNegStyle = {
    markers: {
        all: {
            shape: 'rect',
            width: 4,
            height: 2,
            x: -2,
            y: -1
        },

        modifiers: (x, y, index) => {
            return index % 5 != 0 ? false : (y < 0 ? negModifier : posModifier) // Display every 5 marker
        }
    }
};

s.setStyle(posNegStyle, "posNeg");
s.activateStyle("posNeg");
graph.draw();