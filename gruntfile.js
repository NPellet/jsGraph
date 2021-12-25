/* eslint-disable */
const path = require('path');
const babel = require('rollup-plugin-babel');

const dirTree = require('directory-tree');

const distPath = path.resolve(__dirname, './dist/');

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    bump: {
      options: {
        files: ['package.json'],
        updateConfigs: ['pkg'],
        createTag: true,
        push: true,
        pushTo: 'origin',
        commitFiles: ['-a'],
        runTasks: ['default'],
      },
    },

    copy: {
      web: {
        files: {
          './web/site/js/node-jsgraph/dist/jsgraph.js': 'dist/jsgraph-es6.js',
          './web/site/js/node-jsgraph/dist/jsgraph.min.js':
            'dist/jsgraph.min.js',
        },
      },

      doc: {
        files: {
          'docs/source/_static/jsgraph.min.js': 'dist/jsgraph.min.js',
        },
      },
    },
  });

  var fs = require('fs');
  var exec = require('child_process').exec;

  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('release', 'Make a new release', function () {
    grunt.task.run('bump:prerelease:bump-only');
    grunt.task.run('default');
    grunt.task.run('bump:prerelease:commit-only');
    grunt.task.run('exec:npm_publish');
  });

  grunt.registerTask('patch', 'Make a new patch', function () {
    grunt.task.run('bump:patch:bump-only');
    grunt.task.run('default');
    grunt.task.run('bump:patch:commit-only');
    grunt.task.run('exec:npm_publish');
  });

  grunt.registerTask('minor', 'Make a minor release', function () {
    grunt.task.run('bump:minor:bump-only');
    grunt.task.run('default');
    grunt.task.run('bump:minor:commit-only');
    grunt.task.run('exec:npm_publish');
  });

  grunt.registerTask('major', 'Make a new release', function () {
    grunt.task.run('bump:major:bump-only');
    grunt.task.run('default');
    grunt.task.run('bump:major:commit-only');
    grunt.task.run('exec:npm_publish');
  });

  grunt.registerTask('examples', 'Builds new examples', function () {
    const ensureDirectoryExistence = (filePath) => {
      /*
        if (fs.existsSync(dirname)) {
          return true;
        }
        ensureDirectoryExistence(dirname);*/
      const dirname = path.dirname(filePath);
      fs.mkdirSync(dirname, { recursive: true });
    };

    const makeExample = (el) => {
      return `
<!doctype html>
<html>
    <body>
        <div id="graph"></div>
    </body>
    <script type="module">
   
        import Graph from '/dist/jsGraph.js'
        const graph = Graph.fromJSON( ${fs.readFileSync(
          el.path,
        )}, "graph", ( eventName, ...params ) => { console.log( eventName, params ); } );
        graph.draw();
        graph.updateLegend();
        
        </script>
</html>`;
    };

    const makeExampleJS = (el) => {
      // console.log(el.path.replace(/\\/g, "/",));
      return `
<!doctype html>
<html>
    <body>
        <div id="graph"></div>
    </body>
    <script type="module">
        import "${`../../../${el.path.replace(/\\/g, '/')}`}";
        </script>
</html>`;
    };

    const processTree = (tree) => {
      tree.children.forEach((child) => {
        if (child.type == 'directory') {
          processTree(child);
        } else {
          const path = child.path
            .replace('v2', 'output')
            .replace('.json', '.html')
            .replace('.js', '.html');

          ensureDirectoryExistence(path);
          let htmlFile;

          if (child.extension == '.js') {
            htmlFile = makeExampleJS(child);
          } else {
            htmlFile = makeExample(child);
          }
          fs.writeFileSync(path, htmlFile);
        }
      });
    };

    const tree = dirTree('./examples/v2/', { extensions: /\.js(on)?/ });
    processTree(tree);
    console.log(tree);
  });

  grunt.registerTask('buildExamples', 'Builds new examples', function () {
    var examples = [];

    var list = JSON.parse(fs.readFileSync('examples/list.json', 'utf8'));

    for (var i = 0, l = list.length; i < l; i++) {
      var code = fs.readFileSync(`examples/v2/${list[i].file}.js`, 'utf8');
      var example = {};
      example.id = list[i].file;
      example.title = list[i].title;
      example.code = code;

      example.description = list[i].description;

      example.codeShown = code.replace(
        /\/\* START IGNORE \*\/([\s\S]*)\/\* END IGNORE \*\//,
        function () {
          return '';
        },
      );
      example.codeShown = beautify(example.codeShown, {
        indent_size: 2,
        preserve_newlines: true,
        space_in_paren: true,
        max_preserve_newlines: 2,
      });

      examples.push(example);
    }

    fs.writeFileSync(
      'web/sources/_data/examples.json',
      JSON.stringify(examples, undefined, '\t'),
    );
  });

  grunt.registerTask('tutorials', 'Builds tutorials', function () {
    exec('./node_modules/.bin/jsdoc -c jsdoc.json', (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('DONE');
    });
  });
};
