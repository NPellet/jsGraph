const graph = new Graph("example-1");
graph.resize(400, 300);

let x = [1, 2, 3, 4];
let y = [1, 2, 1, 2];

let w = Graph.newWaveform().setData(y, x);
let s = graph.newSerie('s').setWaveform(w).autoAxis();

const unselected = {
    line: {
        width: 3,
    }
}
const red = {
    line: {
        color: 'red'
    }
};

s.setStyle(unselected);
s.setStyle(red, "red", "unselected");
s.activateStyle("red");

graph.draw(); // You won't see this, but at this stage, the serie is not dashed

s.setLineStyle("4,4", "unselected");
graph.draw(); // Now it will be dashed
