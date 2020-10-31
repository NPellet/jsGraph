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

      var editor = ace.edit('example-code-editable');
      editor.setTheme('ace/theme/monokai');
      editor.session.setMode('ace/mode/json');

      $('#jsgraph-examplesmenu').on('click', 'a', function() {
        $('#example-explain').hide();

        const folder = $(this).data('folder');
        const file = $(this).data('example');

        if (graph) {
          graph.kill();
          graph = false;
        }

        $('#run-example').bind('click', () => {
          const value = editor.getValue();

          if (graph) {
            graph.kill();
            graph = false;
          }

          $('#graph-example').empty();

          try {
            if (file.match(/\.json$/)) {
              const json = JSON.parse(value);

              graph = Graph.fromJSON(json, 'graph-example');
              graph.draw();

              if( graph.legend ) {
                graph.updateLegend();
              }

              graph.draw();
            } else {
              let constructor = eval(value);
              constructor('graph-example');
            }
          } catch (e) {}
        });

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

        let stringified;

        if (file.match(/\.json$/)) {
          fetch(`./js/examples/${folder}/${file}`)
            .then(file => file.json())
            .then(json => {
              graph = Graph.fromJSON(json, 'graph-example');
              graph.draw();

              stringified = JSON.stringify(json, undefined, '\t');
              editor.resize();

              showCode(stringified);
            });
        } else {
          requirejs([`./js/examples/${folder}/${file}`], constructor => {
            html += '</ul></li>';

            graph = constructor('graph-example');

            showCode(constructor.toString());
          });
        }

        function showCode(code) {
          if (selectedExample.editable) {
            editor.session.setValue(code); // set value and reset undo history
            editor.resize();

            $('#example-code-fixed')
              .parent()
              .addClass('hidden');
            //$('#example-code-fixed').html(code);
          } else {
            $('#example-code-fixed')
              .parent()
              .removeClass('hidden');
            $('#example-code-fixed').html(selectedExample.highlighted);
          }
        }

        $('#example-title').html(selectedExample.title);
        $('#example-description').html(selectedExample.description);
      });
    });
};

loadExamples();
