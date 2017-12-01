import assert from 'assert';

import Graph from '../graph';

describe( 'Simple graph creation tests', function() {

    it( 'Basic creation', function() {
        var div = document.createElement( 'div' );
        var graph = new Graph( div );
        var serie = graph.newSerie( 'serie1' );
        var waveForm = Graph.newWaveform();
        waveForm.setData( [ 1, 100, 2, 80, 3, 55, 4, 65 ] );
        serie.setWaveform( waveForm );
        graph.draw();
    } );

    it( 'Creation with declared ID', function() {
        var div = document.createElement( 'div' );
        div.id = 'graphId';
        document.getElementsByTagName( 'body' )[0].appendChild( div );
        var graph = new Graph( 'graphId' );
        assert.equal( graph.getWrapper(), div );
    } );

    it( 'Uniqueness of series', function() {
        var div = document.createElement( 'div' );
        var graph = new Graph( div );
        var serie = graph.newSerie( 'serie1' );
        var serie2 = graph.getSerie( 'serie1' );
        assert.equal( serie, serie2 );
    } );

} );
