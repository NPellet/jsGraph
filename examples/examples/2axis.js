define( function() {

	return [ function( domGraph ) {

		var graphinstance = new Graph( domGraph, { 

		 }, function( graphinstance ) {

		 		var series = [ [], [], [] ];

		 		var j = 0,
		 			min = 0,
		 			jmax = 0;

		 		for( var i = -1; i < 1.5 ; i += 0.01 ) {

		 			series[ 0 ].push( i );
		 			series[ 0 ].push( -20.5 + Math.pow( 2.71, ( i * 6 ) ) / 10 );
		 			

		 			series[ 1 ].push( i );
		 			series[ 1 ].push( i * series[ 0 ][ j * 2 + 1 ] );

		 			if( series[ 1 ][ j * 2 + 1 ] < min ) {
		 				min = series[ 1 ][ j * 2 + 1 ];
		 				jmax = i;
		 			}

					j++


		 		}

				var axisProperties = { primaryGrid: false, secondaryGrid: false },

					xAxis = graphinstance.getXAxis( 0, axisProperties ),
					leftAxis = graphinstance.getLeftAxis( 0, axisProperties ),
					rightAxis = graphinstance.getRightAxis( 0, axisProperties );

					
				graphinstance.newSerie( "cos" )
					.setLabel( "f(x) = sin(x)" )
					.autoAxis()
					.setData( series[ 0 ] )
					.setLineColor('black');


				graphinstance.newSerie( "cos" )
					.setLabel( "f(x) = sin(x)" )
					.autoAxis()
					.setYAxis( graphinstance.getRightAxis() )
					.setData( series[ 1 ] )
					.setLineColor('red');



				graphinstance.getYAxis().forceMin( - 21 );
				graphinstance.getYAxis().forceMax( 5 );

				graphinstance.getXAxis().forceMin( 0 );
				graphinstance.getXAxis().forceMax( 1 );

				graphinstance.makeShape(
					{ 

						type: 'arrow', 
						pos: { x: jmax },
						pos2: { dx: "-20px", dy: "-20px" },
						label: {
							text: 'Max power point',
							position: { x: jmax, dx: "-25px", dy: "-25px" },
							anchor: 'middle' 

						},

						strokeColor: 'black',
						strokeWidth: 1

					}).then( function( shape ) {

					shape.draw();
					shape.redraw();
				} );

				graphinstance.getRightAxis().adapt0To( graphinstance.getYAxis(), 'min', -10 );
				
				graphinstance.getXAxis().setLabel( 'Voltage (V)' );
				graphinstance.getYAxis().setLabel( 'Current (mA cm-2)' );
				graphinstance.getRightAxis().setLabel( 'Power output (mW)' );

				graphinstance.getYAxis().setLineAt0( true );
				graphinstance.redraw( );
				graphinstance.drawSeries();	
				
			
		 } );
		
	}, "Scaling different axis", [ 'Displaying a legend', "Legend in movable", "Wheel scales the selected serie"] ];

});