
import Graph from '../src/graph.js'


requirejs.config({

	baseUrl: '../',
	paths: {
		'jquery': 'src/dependencies/jquery/dist/jquery'
	}	
});


console.log('loading');
define( [], () => {
var opts = {};
var hashtag = (document.location.href.split( "#" )[ 1 ] || "").split( ';' ).map( function ( val ) {
	val = val.split( ':' );
	opts[ val[ 0 ] ] = val[ 1 ];
} );

var example = opts.examples;

var domGraph = document.getElementById("graph");
console.log( opts.examples );
require( [ "examples/src/" + opts.examples ] );
});