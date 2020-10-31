/* eslint-disable */
var fs = require('fs');
var Prism = require('prismjs');

var statsMin = fs.statSync('node_modules/node-jsgraph/dist/jsgraph.min.js');
var statsMinEs6 = fs.statSync(
  'node_modules/node-jsgraph/dist/jsgraph-es6.min.js'
);
var statsMax = fs.statSync('node_modules/node-jsgraph/dist/jsgraph.js');

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jekyll: {
      // Task
      options: {
        // Universal options
        bundleExec: false,
        src: 'sources'
      },
      dist: {
        // Target
        options: {
          // Target options
          dest: 'site/',
          src: './sources/',
          config: './sources/_config.yml',
          raw:
            'title: <%= pkg.title %>\n' +
            'minifiedsize: ' +
            Math.round(statsMin.size / 1000) +
            '\n' +
            'minifiedsize_es6: ' +
            Math.round(statsMinEs6.size / 1000) +
            '\n' +
            'size: ' +
            Math.round(statsMax.size / 1000)
        }
      },
      serve: {
        // Another target
        options: {
          serve: true,
          dest: '.jekyll',
          drafts: true,
          future: true
        }
      }
    },

    clean: {
      doc: {
        src: ['./doc', './sources/docs/**']
      }
    },

    copy: {
      examples: {
        files: [
          {
            cwd: '../examples',
            src: 'list.json',
            dest: './site/js/examples/',
            expand: true
          },
          {
            cwd: '../examples/v2',
            src: '**/*',
            dest: './site/js/examples/',
            expand: true
          }
        ]
      },

      libs: {
        files: [
          {
            cwd: './node_modules',
            src: 'bootstrap/dist/js/bootstrap.min.js',
            dest: './site/js/',
            expand: true
          },

          {
            cwd: './node_modules',
            src: 'jquery/dist/jquery.min.js',
            dest: './site/js/',
            expand: true
          },

          {
            cwd: './node_modules',
            src: 'ace-builds/**/*',
            dest: './site/js/',
            expand: true
          },

          {
            cwd: './node_modules',
            src: 'node-jsgraph/dist/jsgraph.min.js',
            dest: './site/js/',
            expand: true
          },

          {
            cwd: './node_modules',
            src: 'node-jsgraph/dist/jsgraph.js',
            dest: './site/js/',
            expand: true
          },

          {
            cwd: './node_modules/prismjs/themes',
            src: 'prism-okaidia.css',
            dest: './site/css',
            expand: true
          },

          {
            cwd: './node_modules/prismjs',
            src: 'prism.js',
            dest: './site/js',
            expand: true
          },

          {
            cwd: './node_modules',
            src: 'requirejs/require.js',
            dest: './site/js/',
            expand: true
          }
        ]
      },

      docs: {
        //        files: [ { cwd: './doc/', src: '**', dest: './sources/docs/', filter: 'isFile', expand: true } ]
      }
    },

    less: {
      production: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true
        },
        src: 'less/core.less',
        dest: 'site/css/theme.css'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', [
    'parseDoc',
    'parseTutorials',
    'jekyll:dist',
    'less:production',
    'copy:libs',
    'copy:examples',
    'parseExamples'
  ]);
  grunt.registerTask('css', ['less:production']);

  grunt.registerTask('generateExamples', () => {
    // The code snippet you want to highlight, as a string
    const list = grunt.file.readJSON('../examples/list.json');

    const findFolder = folder => {
      for (let f of list) {
        if (f.name == folder) {
          return f;
        }
      }
      list.push({ name: folder, children: [] });
      return findFolder(folder);
    };

    const findFile = (file, folder) => {
      for (let child of folder.children) {
        if (child.name == file) {
          return child;
        }
      }
      folder.children.push({ name: file, title: file });

      return findFile(file, folder);
    };

    grunt.file.recurse(
      '../examples/v2/',
      (abspath, rootdir, subdir, filename) => {
        const folder = findFolder(subdir);
        const file = findFile(filename, folder);
      }
    );

    grunt.file.write(
      '../examples/list.json',
      JSON.stringify(list, undefined, '\t')
    );
  });

  grunt.registerTask('parseExamples', () => {
    // The code snippet you want to highlight, as a string

    const list = grunt.file.readJSON('../examples/list.json');

    for (var i = 0; i < list.length; i++) {
      for (var j = 0; j < list[i].children.length; j++) {
        let code = grunt.file.read(
          './site/js/examples/' + list[i].name + '/' + list[i].children[j].name
        );
        const ignore = new RegExp(
          /\/\* START IGNORE \*\/([\s\S]*)\/\* END IGNORE \*\//,
          'g'
        );

        code = code.replace(ignore, '');
        const highlighted = Prism.highlight(
          code,
          Prism.languages.javascript,
          'javascript'
        );
        code.replace('\n', '<br />');
        list[i].children[j].highlighted = highlighted;
      }
    }

    grunt.file.write(
      './site/js/examples/list.json',
      JSON.stringify(list, undefined, '\t')
    );
  });

  grunt.registerTask('parseTutorials', function() {
    var bundleFile = JSON.parse(fs.readFileSync('tutorials.json'));

    var dirPath = './doc/tutorials';
    var files = fs.readdirSync(dirPath);
    var tutoConfig = {};

    for (var i in bundleFile) {
      tutoConfig[i] = [];
    }

    files.map(function(file) {
      var inner = fs.readFileSync(dirPath + '/' + file, 'utf-8');
      var title = /title: '([^\n]*)'\n/.exec(inner);

      var found = false;

      if (title == null) {
        console.error('Could not find tutorial title');
        console.log(file);
        return;
      }
      var obj = { title: title[1], url: file };

      for (var i in bundleFile) {
        if (
          bundleFile[i].indexOf(
            file.replace('tutorial-', '').replace('.html', '')
          ) > -1
        ) {
          tutoConfig[i] = tutoConfig[i] || [];
          tutoConfig[i].push(obj);
          found = true;
        }
      }

      if (found == false) {
        tutoConfig['Others'].push(obj);
      }
      console.log(file);
      var text = '---\nlayout: page-sidemenu\n' + inner;
      fs.writeFileSync(
        './sources/tutorials/' + file.replace('.html', '') + '.md',
        text
      );
    });

    fs.writeFileSync(
      './sources/_data/tutorials.json',
      JSON.stringify(tutoConfig, undefined, '\t')
    );
  });

  grunt.registerTask('parseDoc', function() {
    var docbars = {};

    function getDocbar(parentName, childName, childUrl) {
      docbars[parentName] = docbars[parentName] || [];

      if (childName) {
        docbars[parentName].push({ title: childName, url: childUrl });
      }
      return parentName;
    }

    var dirPath = './doc';
    var files = fs.readdirSync(dirPath);

    var docConfig = [
      {
        title: 'Core',
        main: 'Graph',
        content: [
          {
            title: 'Graph'
          }
        ]
      },
      {
        title: 'Serie',
        main: 'Serie',
        contains: /^Serie(.*)$/
      },
      {
        title: 'Axis',
        main: 'Axis',
        contains: /^Axis(.*)$/,
        content: [
          {
            title: 'SplitAxis'
          }
        ]
      },
      {
        title: 'Plugin',
        main: 'Plugin',
        contains: /^Plugin(.*)$/
      },
      {
        title: 'Shape',
        main: 'Shape',
        contains: /^Shape(.*)$/
      }
    ];

    var parent;

    files.map(function(file) {
      if (file == 'tutorials') {
        // NoTut
        return;
      }
      file = file.replace('.html', '');
      var found = false;
      docConfig.map(function(conf) {
        if (conf.main == file) {
          conf.url = file;
          docbar = getDocbar(conf.title);
        }

        var adding = true;
        if (conf.content) {
          conf.content.map(function(el) {
            if (el.title == file) {
              adding = false;
              found = true;
            }
          });
        }

        if (conf.contains && conf.contains.test(file) && adding) {
          var result = conf.contains.exec(file);
          parent = conf.content = conf.content || [];
          conf.content.push({
            title: result[1],
            url: file
          });

          docbar = getDocbar(conf.title, result[1], file);
          found = true;
        }
      });

      if (!found) {
        docbar = getDocbar(file);
        docConfig.push({ title: file, url: file });
      }

      var text = fs.readFileSync(dirPath + '/' + file + '.html');
      text =
        '---\nlayout: page-doc\ntitle: Documentation\ndocbar: ' +
        docbar +
        '\n' +
        text;
      fs.writeFileSync('./sources/docs/' + file + '.html', text);
    });

    fs.writeFileSync('./sources/_data/doc.json', JSON.stringify(docConfig));
    fs.writeFileSync(
      './sources/_data/docbars.json',
      JSON.stringify(docbars, null, '\t')
    );
  });
};
