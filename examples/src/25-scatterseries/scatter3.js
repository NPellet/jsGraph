define( function() {

	return [ function( domGraph ) {

var g = new Graph( domGraph );

var s = g
	.newSerie("s1", {}, "scatter")
	.autoAxis()
	.setData( [ 1,1, 2,2, 3,3 ] )
	.setStyle( 
		{ shape: 'circle', cx: 0, cy: 0, r: 2, stroke: 'black', fill: 'rgba( 100, 100, 100, 0.3 )' },
		[ undefined, { r: 5 } ]
	);


var s = g
	.newSerie("s2", {}, "scatter")
	.autoAxis()
	.setData( [ 4,3,5,2,6,1 ] )
	.setStyle( 
		function( ) {
			return { shape: 'circle', cx: 0, cy: 0, r: 5, stroke: 'none', fill: 'rgba( 200, 0, 0, 0.8 )' };
		}
	);


var s = g
	.newSerie("s3", {}, "scatter")
	.autoAxis()
	.setData( [ 7,1,8,2,9,3 ] )
	.setStyle( 
		function( ) {
			return { shape: 'circle', cx: 0, cy: 0, r: 10, stroke: 'none', fill: 'rgba( 200, 0, 0, 0.8 )' };
		},
		function( index ) {
			return { fill: 'rgba(' + index * 100 + ', ' + index * 100 + ', ' + index * 100 + ', 1 )', stroke: 'black' }
		}
	);


var s = g
	.newSerie("s4", {}, "scatter")
	.autoAxis()
	.setData( [ 10,3,11,2,12,1 ] )
	.setStyle( 
		function( ) {
			return { shape: 'circle', cx: 0, cy: 0, r: 10, stroke: 'none', fill: 'rgba( 0, 0, 100, 0.8 )' };
		},
		[ undefined, undefined, { fill: 'green' } ]
	);

var s = g
	.newSerie("s5", {}, "scatter")
	.autoAxis()
	.setData( [ 13,1,14,2,15,3 ] )
	.setStyle( 
		{ shape: 'circle', cx: 0, cy: 0, r: 10, stroke: 'none', fill: 'rgba( 0, 100, 0, 0.8 )' },
		[ { stroke: 'blue' }, undefined, { stroke: 'red' } ]
	);

g.draw();
		
	}, "Setstyle advanced", [ 


	

	]

	];

} );