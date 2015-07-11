'use strict';

var jsdom = require('mocha-jsdom');
var path = require('path');

var jquery = path.resolve(__dirname + '/../../dist/jquery.min.js');
var jsgraph = path.resolve(__dirname + '/../../dist/jsgraph.js');

describe('mocha tests', function () {

    jsdom({
        scripts: [jquery, jsgraph]
    });

    it('basic test', function () {

        var div = document.createElement('div');
        var graph = new window.Graph(div);
        var serie = graph.newSerie('serie1');
        serie.setData([1, 100, 2, 80, 3, 55, 4, 65]);
        graph.redraw();
        graph.drawSeries();

    });

});
