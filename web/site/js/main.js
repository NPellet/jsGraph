
requirejs.config( {
	
	baseUrl: '/',

	paths: {
		jquery: 'js/jquery/dist/jquery.min',
		bootstrap: 'js/bootstrap/dist/js/bootstrap.min'
	},
	shim: {
		'bootstrap': { deps: [ 'jquery' ] }
	}

})

require( [ 'bootstrap' ], function( ) {
	
	$(".doc-method, .doc-member").each( function() {
//console.log( $( this ).children('.doc-method-details').get( 0 ).innerHTML.length );
		if( $( this ).children('.doc-details').children().length == 0 ) {  // At least a text node
			$( this ).addClass('not-expandable');
		}
	});

	$(".doc-method h4, .doc-member h4").bind('click', function() {
		$( this ).parent().toggleClass('expanded');
	});

	var menu = $("#jsgraph-sidebar");

	if( menu.length > 0 ) {

		var string = "";
		var level = 0;
		$("#main").find('h3,h4').each( function() {


			if( $( this ).is('h3') ) {

				if( string.length > 0 ) {
					string += '</li>';
				}

				if( level == 1 ) {
					string += "</li></ul></li>";
					level = 0;
				}
				
			} else {

				if( level == 0 ) {
					level = 1;
					string += '<ul class="nav">';
				}

			}

			var name = $( this ).find('a').attr('id');
			string += '<li><a href="#' + name + '">' + this.textContent + '</a>';
		});

		if( level == 1 ) {
			string += '</li></ul>';
		}

		string += '</li></ul>';

		menu.children().html( string );
	}

	$('body').scrollspy({ target: '#jsgraph-sidebar' })
	$('#jsgraph-sidebar').affix({offset: {top: 50} });

	$(".showExampleCode").on('click', function() {

		var code = $( this ).parent().parent().parent().find('.code');
		code.toggleClass('hidden');
		$( this ).text( code.hasClass('hidden') ? 'Show code' : 'Hide code' );
	});

});