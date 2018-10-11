/* eslint-disable */
$('.doc-method, .doc-member').each(function() {
  //console.log( $( this ).children('.doc-method-details').get( 0 ).innerHTML.length );
  if (
    $(this)
      .children('.doc-details')
      .children().length == 0
  ) {
    // At least a text node
    $(this).addClass('not-expandable');
  }
});

$('.doc-method h4, .doc-member h4').bind('click', function() {
  $(this)
    .parent()
    .toggleClass('expanded');
});

var menu = $('#jsgraph-sidebar');

if (menu.length > 0) {
  var string = '';
  var level = 0;
  $('#main')
    .find('h3,h4')
    .each(function() {
      if ($(this).is('h3')) {
        if (string.length > 0) {
          string += '</li>';
        }

        if (level == 1) {
          string += '</li></ul></li>';
          level = 0;
        }
      } else {
        if (level == 0) {
          level = 1;
          string += '<ul class="nav scrollspy">';
        }
      }

      var name = $(this)
        .find('a')
        .attr('id');
      string += `<li><a href="#${name}">${this.textContent}</a>`;
    });

  if (level == 1) {
    string += '</li></ul>';
  }

  string += '</li></ul>';

  menu.children().html(string);
}

$('body').scrollspy({ target: '#jsgraph-sidebar' });
$('#jsgraph-sidebar').affix({ offset: { top: 50 } });

$('.showExampleCode').on('click', function() {
  var code = $(this)
    .parent()
    .parent()
    .parent()
    .find('.code');
  code.toggleClass('hidden');
  $(this).text(code.hasClass('hidden') ? 'Show code' : 'Hide code');
});

const loadExamples = () => {
  if ($('#jsgraph-examplesmenu').length == 0) {
    return;
  }

  let graph;

  fetch('./js/examples/list.json')
    .then(file => file.json())
    .then(json => {
      let html = '<ul class="nav">';
      for (var i = 0; i < json.length; i++) {
        html += `<li><a href="#">${json[i].title}</a><ul class="nav">`;
        for (var j = 0; j < json[i].children.length; j++) {
          html += `<li><a href="#" data-folder="${
            json[i].name
          }" data-example="${json[i].children[j].name}">${
            json[i].children[j].title
          }</a></li>`;
        }
        html += '</ul></li>';
      }
      html += '</ul>';

      $('#jsgraph-examplesmenu').html(html);

      $('#jsgraph-examplesmenu').on('click', 'a', function() {
        const folder = $(this).data('folder');
        const file = $(this).data('example');

        if (graph) {
          graph.kill();
        }
        $('#example-title').html($(this).html());

        if (file.match(/\.json$/)) {
          fetch(`./js/examples/${folder}/${file}`)
            .then(file => file.json())
            .then(json => {
              graph = Graph.fromJSON(json, 'graph-example');
              graph.draw();
            });
        } else {
          requirejs([`./js/examples/${folder}/${file}`], constructor => {
            html += '</ul></li>';

            graph = constructor('graph-example');
          });
        }

        let selectedExample;

        for (var i = 0; i < json.length; i++) {
          if (json[i].name !== folder) continue;

          for (var j = 0; j < json[i].children.length; j++) {
            if (json[i].children[j].name !== file) {
              continue;
            } else {
              selectedExample = json[i].children[j];
            }
          }
        }

        $('#example-code-fixed').html(selectedExample.highlighted);
      });
    });
};

loadExamples();
