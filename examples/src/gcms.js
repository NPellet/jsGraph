define( function() {

	return [ function( domGraph ) {

		var div1 = document.createElement('div');
		var div2 = document.createElement('div');

		var domGraph = document.getElementById( domGraph );

		require( [ './lib/lib/gcms/gcms' ], function( GCMSConstructor ) {



			domGraph.appendChild( div1 );
			domGraph.appendChild( div2 );

			div2.style.width = '100%';
			div2.style.height = '100px';

			div1.style.width = '100%';
			div1.style.height = '250px';
			
			var gcms = new GCMSConstructor( div1, div2, {} );

		} );


	}, "GC-MS", [ 

	"",
	] 



	];

});