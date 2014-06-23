define( [], function() {

	var toolbarDefaults = {
		
		buttons: [ 'none', 'rect', 'line' ]
	

	}


	var ns = 'http://www.w3.org/2000/svg';
	var nsxlink = "http://www.w3.org/1999/xlink";
	
	function makeSvg() {
		var dom = document.createElementNS(ns, 'svg');
		dom.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
		dom.setAttribute('xmlns', ns);

		
		return dom;
	}
	

	function makeSvgLine() {

		var dom = makeSvg();

		var line = document.createElementNS( ns, 'line');
		line.setAttribute('x1', 16);
		line.setAttribute('y1', 3);
		line.setAttribute('x2', 4);
		line.setAttribute('y2', 15);

		line.setAttribute('stroke', '#aa0000');
		

		

		dom.appendChild( line );
		return dom;
	}



	function makeSvgRect() {

		var dom = makeSvg();
		var line = document.createElementNS( ns, 'rect');
		line.setAttribute('x', 4);
		line.setAttribute('y', 4);
		line.setAttribute('width', 12);
		line.setAttribute('height', 12);
		line.setAttribute('stroke', 'black');
		line.setAttribute('fill', '#dd0000');

		dom.appendChild( line );
		return dom;
	}


	var Toolbar = function( graph, options ) {

		var self = this;

		this.options = $.extend( true, {}, toolbarDefaults, options );
		this.graph = graph;
		this.div = $("<ul />").addClass('graph-toolbar');

		this.graph.getPlugin( './graph.plugin.shape').then( function( plugin ) {

			self.plugin = plugin;

			if( ! self.plugin ) {
				return;
			}

			self.div.on('click', 'li', function( ) {

				var shape = $(this).attr('data-shape');
				self.plugin.setShape( shape );

				$(this).parent().children().removeClass('selected');
				$(this).addClass('selected');
			});


			self.makeButtons();
		});
	};

	Toolbar.prototype = {

		makeButtons: function() {

			var self = this;
			for( var i = 0, l = this.options.buttons.length ; i < l ; i ++ ) {

				this.div.append( this.makeButton( this.options.buttons[ i ] ) );
			}
		},

		makeButton: function( button ) {

			var div = $("<li />");
			switch( button ) {

				case 'line':
					div
						.html( makeSvgLine( ) )
						.attr('data-shape', 'line');
				break;

				case 'rect':
					div
						.html( makeSvgRect( ) )
						.attr('data-shape', 'rect');
				break;
			}

			return div;
		},

		getDom: function() {
			return this.div;
		}

	};

	return Toolbar;

} );