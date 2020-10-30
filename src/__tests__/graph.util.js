import {
    guid
} from '../graph.util';

describe( 'util', () => {
    it( 'guid', () => {
        const result = guid();
        expect( result )
            .toMatch( /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/ );
    } );
} );
