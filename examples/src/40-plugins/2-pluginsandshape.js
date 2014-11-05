
define( function() {


	return [ function( domGraph ) {

		var graphinstance = new Graph( domGraph, {

			dblclick: {
				type: 'plugin',
				plugin: 'graph.plugin.zoom',
				options: {
					mode: 'total'
				}
			},

			plugins: {
				'graph.plugin.zoom': { zoomMode: 'x' },
			},

			pluginAction: {
				'graph.plugin.zoom': { shift: false, ctrl: false }
			}
			
		}, function( graphinstance) {
	
			graphinstance.newSerie("temp_nh")
				.autoAxis()
				.setData( series[ 3 ] );
			



            graphinstance.newShape({ 
                type: 'rect', 
                pos: { x: "60px", y: "80px" },
                pos2: { x: "20px", y: "20px" },
               strokeColor: 'red',
               strokeWidth: 1,

               
                 shapeOptions: {
                  locked: true
                 }

            }).then( function( shape ) {

              shape.draw();
              shape.redraw();
            } );

			graphinstance.redraw( );
			graphinstance.drawSeries();	

		} );
		

	}, "Plugins and shapes", [ 

		
	 ] ];

} );