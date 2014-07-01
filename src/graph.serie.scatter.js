
define( [ require, './graph._serie'], function( require, SerieStatic ) {

	"use strict";

	var GraphSerieScatter = function() { }
	$.extend( GraphSerieScatter.prototype, SerieStatic.prototype, {

		defaults: {
			label: ""
		},


		init: function( graph, name, options ) {

			var self = this;

			this.graph = graph;
			this.name = name;

			this.id = Math.random() + Date.now();

			this.shown = true;
			this.options = $.extend(true, {}, GraphSerieScatter.prototype.defaults, options);
			this.data = [];

			this._isMinOrMax = { x: { min: false, max: false}, y: { min: false, max: false} };

			this.groupPoints = document.createElementNS(this.graph.ns, 'g');
			this.groupMain = document.createElementNS(this.graph.ns, 'g');

			this.additionalData = {};

			this.groupPoints.addEventListener('mouseover', function(e) {
			
			});


			this.groupPoints.addEventListener('mouseout', function(e) {
			
			});

			this.minX = Number.MAX_VALUE;
			this.minY = Number.MAX_VALUE;
			this.maxX = Number.MIN_VALUE;
			this.maxY = Number.MIN_VALUE;
			
			this.groupMain.appendChild(this.groupPoints);
			this.currentAction = false;

			if(this.initExtended1) {
				this.initExtended1();
			}

			this.stdStyle = {
				shape: 'circle',
				cx: 0,
				cy: 0,
				r: 3,
				stroke: 'transparent',
				fill: "black"
			}
		},


		/**
		 *	Possible data types
		 *	[100, 0.145, 101, 0.152, 102, 0.153]
		 *	[[100, 0.145, 101, 0.152], [104, 0.175, 106, 0.188]]
		 *	[[100, 0.145], [101, 0.152], [102, 0.153], [...]]
		 *	[{ x: 100, dx: 1, y: [0.145, 0.152, 0.153]}]
		 *
		 *	Converts every data type to a 1D array
		 */
		setData: function(data, arg, type) {

			var z = 0,
				x,
				dx, 
				arg = arg || "2D", 
				type = type || 'float', 
				arr, 
				total = 0,
				continuous;

			if( ! data instanceof Array ) {
				return;
			}

			
			if( data instanceof Array && ! ( data[ 0 ] instanceof Array ) ) {// [100, 103, 102, 2143, ...]
				arg = "1D";
			}

			var _2d = ( arg == "2D" );



			arr = this._addData( type, _2d ? data.length * 2 : data.length );
			
			z = 0;

			for(var j = 0, l = data.length; j < l; j++) {

				if(_2d) {
					arr[z] = (data[j][0]);
					this._checkX(arr[z]);
					z++;
					arr[z] = (data[j][1]);
					this._checkY(arr[z]);
					z++;
					total++;
				} else { // 1D Array
					arr[z] = data[j];
					this[j % 2 == 0 ? '_checkX' : '_checkY'](arr[z]);
					z++;
					total += j % 2 ? 1 : 0;

				}
			}

			this.graph.updateAxes();

			this.data = arr;

			return this;
		},

		_addData: function(type, howmany) {

			switch(type) {
				case 'int':
					var size = howmany * 4; // 4 byte per number (32 bits)
				break;
				case 'float':
					var size = howmany * 8; // 4 byte per number (64 bits)
				break;
			}

			var arr = new ArrayBuffer(size);

			switch(type) {
				case 'int':
					return new Int32Array(arr);
				break;

				default:
				case 'float':
					return new Float64Array(arr);
				break;
			}
		},

		empty: function() {

			while( this.group.firstChild ) {
				this.group.removeChild( this.group.firstChild );
			}
		},

		select: function() {
			this.selected = true;

		},

		unselect: function() {
			this.selected = false;
		},

		setDataStyle: function( std, extra ) {
			this.stdStylePerso = std;
			this.extraStyle = extra;

			return this;
		},

		draw: function() { // Serie redrawing


			var x, 
				y, 
				xpx, 
				ypx, 
				j = 0, 
				k, 
				m,
				currentLine, 
				max,
				self = this;

			this._drawn = true;			

			
			this.groupMain.removeChild( this.groupPoints );

			var incrXFlip = 0;
			var incrYFlip = 1;

			if( this.getFlip( ) ) {
				incrXFlip = 1;
				incrYFlip = 0;
			}

			var totalLength = this.data.length / 2;
			
			var allY = [ ],
				slotToUse,
				y = 0;
		
			j = 0, k = 0, m = this.data.length;

			for( ; j < m ; j += 2 ) {

				xpx = this.getX( this.data[ j + incrXFlip ] );
				ypx = this.getY( this.data[ j + incrYFlip ] );

				if(this.options.autoPeakPicking) {
					allY.push( [ ( this.data[ j + incrYFlip ] ), this.data[ j + incrXFlip ] ] );
				}

				this._addPoint( xpx, ypx, j / 2 );
			}

			this.groupMain.appendChild( this.groupPoints );
		},

		_addPoint: function( xpx, ypx, k ) {

			var g = document.createElementNS( this.graph.ns, 'g' );
			g.setAttribute('transform', 'translate(' + xpx + ', ' + ypx + ')');

			if( this.extraStyle && this.extraStyle[ k ] ) {

				this.doShape( g, this.extraStyle[ k ] );

			} else if( this.stdStylePerso ) {

				this.doShape( g, this.stdStylePerso );

			} else {

				this.doShape( g, this.stdStyle );
			}

			this.groupPoints.appendChild( g );
		},

		doShape: function( group, shape ) {

			var el = document.createElementNS( this.graph.ns, shape.shape );
			for( var i in shape ) {
				if( i !== "shape" ) {
					el.setAttribute( i , shape[ i ] );
				}
			}

			group.appendChild( el );
		}
	} );

	return GraphSerieScatter;
});