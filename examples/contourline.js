function draw(){
// Generate contour data
	var contourFunction = function( x, y, obj ) {
	  var val =  (x*y) ;
	  obj.minZ = Math.min( val, obj.minZ );
	  obj.maxZ = Math.max( val, obj.maxZ );
	  return val;
	} 

	var obj = {
	  noise: 0,
	  minZ: Number.POSITIVE_INFINITY,
	  maxZ: Number.NEGATIVE_INFINITY,
	  z: [],
	  minX: 0.09,
	  maxX: 0.16,
	  minY: 50,
	  maxY: 180
	};
	console.log('antes ciclo');
	var i = 0, j;
	for( var x = obj.minX; x < obj.maxX; x += 0.0005 ) {
	  j = 0;
	  obj.z[ i ] = [];
	  for( var y = obj.minY; y < obj.maxY ; y += 0.05 ) {
	    obj.z[ i ][ j ] = contourFunction( x, y, obj );
	    j++;
	  }
	  i++;
	};
	
	console.log('despues ciclo');

	var g = new Graph("curva");

	var dataContour = generateContourLines( obj );

	console.log(dataContour);

	var s2 = g.newSerie("s2", {}, "contour")
	  .autoAxis()
	  .setData( {

	    minX: obj.minX,
	    maxX: obj.maxX,
	    minY: obj.minY,
	    maxY: obj.maxY,
	    segments: dataContour

	  } );
  	console.log('antes dibujar');
	g.redraw();
	g.drawSeries();
	console.log('despues dibujar');
	
};

//draw();