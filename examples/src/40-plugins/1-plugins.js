
define( function() {


	return [ function( domGraph ) {

		var graphinstance = new Graph( domGraph, {

			plugins: {
				'zoom': { zoomMode: 'xy', transition: true },
				'drag': {}
			},

			mouseActions: [
				{ plugin: 'zoom', shift: true, ctrl: false },
				{ plugin: 'drag', shift: false, ctrl: false },
				{
					type: 'dblclick',
					plugin: 'zoom',
					options: {
						mode: 'total'
					}
				}
			],

			keyActions: [
				{
					type: 'keydown',
					key: 'backspace', removeSelectedShape: true
				}
			]

			
		} );
		

  var d1 = [ 0,1,8,3,5 ];

  

  var d2 = [ 0,0.1,0.2,0.3,0.5 ];
  
  
  let x = Graph.newWaveform().setData( d2 );
  var v1 = Graph.newWaveform().setData( d1 ).setXWaveform( x );


		graphinstance.newSerie("temp_nh")
			.autoAxis()
			.setWaveform( v1 )
			.setMarkers({ 
				type: 1,
				points: [ 'all' ],
				fill: true,
				fillColor: 'red'
			});

  		var shape = graphinstance.newShape({ 
            type: 'ellipse', 
            position:[ { x: "10px", y: "10px" } ],
            fillColor: 'rgba(200, 100, 100, 0.5)',

            locked: true,
            selectable: true,
            selectOnClick: true

        }).draw();

  		shape.setProp( 'selectOnClick', true );
        shape.setR( '50px', '20px') ;
        shape.redraw();
        //shape.addTransform('translate', [ 20, 0 ])
     //   shape.addTransform('rotate', [ 20 ])

		graphinstance.draw( );
		
		
	}, "Plugin loading", [ 


		"You can load official plugins using the <code>plugins</code> key in the graph options. Use an object indexed by the plugin name and plugin options as values to load the plugins.",
		"You can easily develop your own plugins. Copy the development code and develop your plugin in the <code>./plugins/</code> folder",
		"Call plugins on double click or on mousewheel using the <code>dblclick</code> and <code>wheel</code> parameters"

	 ] ];

} );