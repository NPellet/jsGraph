
define( [ 'require', './graph.shape.areaundercurve' ], function( require, GraphSurfaceUnderCurve ) {


	var GraphNMRIntegral = function(graph) {
		this.init(graph);
	}
	
	$.extend(GraphNMRIntegral.prototype, GraphSurfaceUnderCurve.prototype, {

		setPosition: function() {

			var baseLine = this.yBaseline || 30;
				baseLine = this.serie.getYAxis().getPx(0) - baseLine;

			this.computedBaseline = baseLine;

			var posXY = this._getPosition( this.getFromData( 'pos' ) ),
				posXY2 = this._getPosition( this.getFromData( 'pos2' ), this.getFromData( 'pos' ) ),
				w = Math.abs(posXY.x - posXY2.x),
				x = Math.min(posXY.x, posXY2.x);

			this.reversed = x == posXY2.x;
			
			if( w < 2 || x + w < 0 || x > this.graph.getDrawingWidth( ) ) {
				return false;
			}


			var v1 = this.serie.searchClosestValue( this.getFromData( 'pos' ).x ),
				v2 = this.serie.searchClosestValue( this.getFromData( 'pos2' ).x ),
				v3,
				i, 
				j, 
				init, 
				max, 
				k, 
				x, 
				y, 
				firstX, 
				firstY, 
				currentLine = "",
				maxY = 0,
				minY = Number.MAX_VALUE;

			if(! v1 || ! v2) {
				return false;
			}

			if( v1.xBeforeIndex > v2.xBeforeIndex ) {
				v3 = v1;
				v1 = v2;
				v2 = v3;
			}

			var firstX, firstY, lastX, lastY, sum = 0;
			var ratio = this.scaling;
			var points = [];

			for(i = v1.dataIndex; i <= v2.dataIndex ; i++) {

				init = i == v1.dataIndex ? v1.xBeforeIndexArr : 0;
				max = i == v2.dataIndex ? v2.xBeforeIndexArr : this.serie.data[i].length;
				k = 0;
				
				for(j = init; j <= max; j+=2) {

					x = this.serie.getX( this.serie.data[ i ][ j + 0 ]),
					y = this.serie.getY( this.serie.data[ i ][ j + 1 ]);

					if( ! firstX ) {
						firstX = x;
						firstY = y;
					}
					

					if( lastX == undefined ) {
						lastX = x;
						lastY = y;
						continue;
					}

					sum += Math.abs( ( x - lastX ) * ( y - lastY ) * 0.5 );
					lastX = x;
					lastY = y;
	
					points.push([ x, sum ]);
					k++;
				}

				this.lastX = x;
				this.lastY = y;
				
				if(! firstX || ! firstY || ! this.lastX || ! this.lastY) {
					return;
				}								
			}

			if( ! this.maxPx ) {
				this.maxPx = 50;
			}

			var integration = this.maxIntegration || sum;

			for( var i = 0, l = points.length ; i < l ; i ++ ) {

				points[ i ][ 1 ] = baseLine - ( points[ i ][ 1 ] / sum ) * ( this.maxPx ) * ( sum / integration );
				currentLine += " L " + points[ i ][ 0 ] + ", " + points[ i ][ 1 ] + " ";
			}

			this.points = points;
			this.lastSum = sum;

			var lastY = firstY,
				lastX = this.lastX;	

			var interX = firstX;
			diff = Math.min( 20, lastX - firstX );

			currentLine = " M " + firstX + ", " + baseLine + " " + currentLine;

			this.setDom('d', currentLine);

			this.firstX = firstX;
			this.firstY = firstY;

			this.maxY = this.serie.getY(maxY);
			if( this._selected ) {
				this.select();
			}
			
			return true;
		},

		setScale: function( maxPx, integration ) {
			this.maxPx = maxPx;
			this.maxIntegration = integration;
		},

		setYBaseline: function( y ) {
			this.yBasline = y;
		},

		selectStyle: function() {
			this.setDom('stroke-width', '2px');
		},

		selectHandles: function() {
			this.handle1.setAttribute('x1', this.points[ 0 ][ 0 ]);
			this.handle1.setAttribute('x2', this.points[ 0 ][ 0 ]);

			this.handle2.setAttribute('x1', this.points[ this.points.length - 1 ][ 0 ] - 1);
			this.handle2.setAttribute('x2', this.points[ this.points.length - 1 ][ 0 ]);

			this.handle1.setAttribute('y1', this.points[ 0 ][ 1 ]);
			this.handle1.setAttribute('y2', this.points[ 0 ][ 1 ]);

			this.handle2.setAttribute('y1', this.points[ this.points.length - 1 ][ 1 ] );
			this.handle2.setAttribute('y2', this.points[ this.points.length - 1 ][ 1 ] );

			this.handle1.setAttribute('stroke-width', '6px');
			this.handle2.setAttribute('stroke-width', '6px');
			this.handle1.setAttribute('stroke', 'black');
			this.handle1.setAttribute('stroke-linecap', 'square');
			this.handle2.setAttribute('stroke', 'black');
			this.handle2.setAttribute('stroke-linecap', 'square');
		},

	});


	return GraphNMRIntegral;
});