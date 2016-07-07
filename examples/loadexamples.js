
define( [ './listexamples' ], function() {

	require( arguments[ 0 ], function( ) {

		var functions = arguments;

		var examples = document.getElementById('graph-examples');

		for( var i = 0, l = functions.length ; i < l ; i ++ ) {

			var child = document.createElement('div');
			child.setAttribute('class', 'graph-example');
			child.innerHTML = '<ul id="example-' + i + '-details"></ul><h1>' + functions[ i ][ 1 ] + '</h1><div class="graph" id="example-' + i + '-graph"></div>';
			examples.appendChild(child);

			functions[ i ][ 0 ]("example-" + ( i ) + "-graph");

		}

	})

});
