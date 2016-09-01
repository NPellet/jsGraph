define( function () {

  var options = {};
  var hashtag = (document.location.href.split( "#" )[ 1 ] || "").split( ';' ).map( function ( val ) {
    val = val.split( ':' );
    options[ val[ 0 ] ] = val[ 1 ];
  } );

  var examples;
  if ( options.examples ) {

    examples = options.examples.split( ',' ).map( function ( val ) {
      return './examples/src/' + val
    } );

  } else {

    examples = [
      'examples/src/10-basic/2-drawfunction',
      'examples/src/10-basic/3-axisspan',
      'examples/src/30-axis/4-brokenaxis',
      'examples/src/65-shapes/1-basicshapes',
      'examples/src/70-others/3-peakpicking-continuous',
      'examples/src/70-others/4-peakpicking-discrete',
      'examples/src/70-others/5-clipping'
    ];

  }

  window.examples = examples;
  return examples;

} );
