
define( function() {

	var options = {};
	var hashtag = (document.location.href.split("#")[ 1 ] || "").split(';').map( function( val ) {
		val = val.split(':');
		options[ val[ 0 ] ] = val[ 1 ];
	});

	var examples;
	if( options.examples ) {

		examples = options.examples.split(',').map( function( val ) { return './examples/src/' + val } );

	} else {

		examples = [
			'examples/src/10-basic/1-basic',
			'examples/src/10-basic/2-drawfunction',
			'examples/src/10-basic/3-axisspan',
			'examples/src/65-shapes/1-basicshapes'
		];

	}

	window.examples = examples;
	return examples;

});
