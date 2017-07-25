
define( function() {

	return [ function( domGraph ) {

		var graphinstance = new Graph( domGraph, {

			dblclick: {
				type: 'plugin',
				plugin: 'zoom',
				options: {
					mode: 'total'
				}
			},

			plugins: {
				'zoom': { zoomMode: 'x' },
			},

			pluginAction: {
				'zoom': { shift: false, ctrl: false }
			}
			
		} );

		graphinstance.newSerie("temp_nh")
			.autoAxis()
			.setData( series[ 3 ] );
		
        graphinstance.newShape({ 
           type: 'rect', 
           pos: { x: "60px", y: "80px" },
           pos2: { x: "40px", y: "20px" },
           strokeColor: 'red',
           strokeWidth: 1,
           fillColor: 'transparent',
           locked: true,
           selectable: true
        }).draw();

        graphinstance.newShape({ 
           type: 'rect', 
           pos: { x: "160px", y: "80px" },
           pos2: { x: "140px", y: "20px" },
           strokeColor: 'red',
           strokeWidth: 1,
           fillColor: 'white',
           locked: false,
           movable: true,
           selectable: true
        }).draw();
        

		graphinstance.draw( );
		

		
	}, "Plugins and shapes", [ 

		
	 ] ];

} );