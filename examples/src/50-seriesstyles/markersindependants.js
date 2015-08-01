define( function() {

	return [ function( domGraph ) {

		var graphinstance = new Graph( domGraph );

        var serie = graphinstance.newSerie('test', {
            markersIndependant: true
        });

        serie.setData([0, 0, 1, 1, 2, 2, 3, 2, 4, 1, 5, 0]);
        serie.autoAxis();

        serie.showMarkers();
        serie.setMarkers([{
            type: 1,
            zoom: 2,
            points: 'all'
        }]);

        graphinstance.draw();
        

	}, "Independant markers", [ 


		'If markers are too close to each other, some mouse events will not fire. This is because the markers are essentially within one DOM object. (see <a href="https://github.com/NPellet/jsGraph/issues/32">Issue 32</a>)',
		'If marker events are important to you, you may use <code>markerIndependants: true</option> in the serie options. However this might slow down the rendering if you have many markers.'


	] ];

});