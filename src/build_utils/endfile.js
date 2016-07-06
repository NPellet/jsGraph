

	};

	if( typeof define === "function" && define.amd ) {
		define( function( ) {
			return Graph( );
		});
	} else if( window ) {
		window.Graph = Graph( );
	}

} ) );