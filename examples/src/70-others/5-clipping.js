
define( function() {

	return [ function( domGraph ) {

    var div1 = document.createElement('div');
    var div2 = document.createElement('div');
    var domGraph = document.getElementById( domGraph );

    domGraph.appendChild( div1 );
    domGraph.appendChild( div2 );

    div2.style.width = '100%';
    div2.style.height = '100px';

    div1.style.width = '100%';
    div1.style.height = '250px';



    var graphmain = new Graph( div1, { paddingBottom: 0 }, { } );

    graphmain.newSerie()
        .autoAxis()
        .setData( series[ 0 ] );

    graphmain.draw();
    

    // Zoom graph
    var graphzoom = new Graph( div2, { paddingTop: 5 } );

    graphzoom.newSerie()
        .autoAxis()
        .setData( series[ 0 ] );

    var clipper, whole;

    graphzoom.draw();
    

    whole = graphzoom.newShape('rect', { pos: { x: 'min', y: 'min' }, pos2: { x: 'max', y: 'max' }, type: 'rect', fillColor: 'rgba( 100, 100, 100, 0.4 )' }).draw().redraw();
    

    clipper = graphzoom.newShape('rect', { pos: { x: 1850, y: 0 }, pos2: { x: 1950, y: 2 }, selectable: true, resizable: true, locked: false, fillColor: 'transparent', masker: true }).draw().redraw();
    clipper.staticHandles( true );

    whole.maskWith( clipper );
    


    graphzoom.shapeHandlers.onChange.push( function( shape ) {

        if( shape == clipper ) {

            var p = clipper._data.pos;
            var p2 = clipper._data.pos2;

            graphmain.getXAxis().zoom( p.x, p2.x );
            graphmain.getYAxis().zoom( p.y, p2.y );

            graphmain.draw();
            
        }

    } );


		} ,

		"Clipping shapes", []
	];


} );
