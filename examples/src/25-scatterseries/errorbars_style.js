define( function() {

	return [ function( domGraph ) {

		var seriedata = [],
			error = [];

		for( var i = 0; i < 5; i += 0.5  ) {
			seriedata.push([ i , Math.sin( i ) ]);
			error.push( [ [ false, [  ( 1 + Math.round( Math.random() * 100 ) / 100 ) / 5, ( 1 + Math.round( Math.random() * 100 ) / 100 )  / 5 ] ], [ [ Math.round( Math.random() * 100 ) / 100 / 2, Math.round( Math.random() * 100 ) / 100 / 2 ] ] ] );
		}

		var graphinstance = new Graph( domGraph );



			var serie = graphinstance.newSerie("serieTest", {}, Graph.SERIE_SCATTER );

			serie
				.setLabel( "My serie" )
				.autoAxis()
				.setData( seriedata )
				.setDataError( error )
				.setErrorStyle( [ { type: 'bar', x: {} }, { type: 'box', top: { strokeColor: 'green', fillColor: 'olive' }, bottom: { strokeColor: 'red', fillColor: "#800000" }  } ] );
			
			graphinstance.draw();
	}, "Error bars (style)", [ 


		'We show here a more complex example of error bars. Find out how the x/y direction is chosen, as well as the type or error (box or bar). Find a description of the error definition in the previous example',
		'Along with setting the error type, you may also chose to make it in style ! Use <code>.setErrorStyle( errorTypes, errorOptions )</code> to add styling to the top/bottom/left/right box or bar !'


	] ];

});