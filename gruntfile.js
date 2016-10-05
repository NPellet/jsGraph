
module.exports = function(grunt) {



    function WebpackBeautifier(options) { }

    WebpackBeautifier.prototype.apply = function(compiler) {
    
      compiler.plugin('done', function( stats ) {
        var json = stats.toJson({assets: false, chunks: false, modules: true }).modules;
        json.map( function( el ) {
            grunt.file.write( el.name, beautify( grunt.file.read( el.name ), { indent_size: 2, preserve_newlines: true, space_in_paren: true, max_preserve_newlines: 2 } ) );
        });


        grunt.file.write( "jsdoc.json", JSON.stringify( {
            opts: {
                "destination": "./web/doc/",
                "tutorials": "tutorials",
                "template": "util/doctemplate"
            },

            "source": {
                "include": json.map( ( el ) => el.name ),
            }
            
        }, false, "\t" ) );

        exec("./node_modules/.bin/jsdoc -c jsdoc.json", ( err, out ) => {
            if( err ) {
                console.error( err );
                return;
            }
            console.log( out );
        });
      });
    };

    function WebpackUglifier(options) { }
    WebpackUglifier.prototype.apply = function(compiler) {
      compiler.plugin('done', function( stats ) {
          grunt.task.run("uglify:dist"); 
      });
    };

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        build: {

            maximal: {
                
                output: 'dist/jsgraph.js'
            }
        },


        bump: {

            options: {
                files: ['package.json', 'bower.json'],
                updateConfigs: [ 'pkg' ],
                createTag: true,
                push: true,
                pushTo: 'origin',
                commitFiles: ['-a'],
                runTasks: [ 'default' ]
            }
    
        },

        sloc: {
           'graphs': {
                files: {
                    './src/': [ '**.js' ],
                   
                }
            }
        },

        uglify: {
            dist: {
              files: {
                'dist/jsgraph.min.js': ['dist/jsgraph.js']
              },
              options: {
                banner: "/*! jsGraph (c) 2014 Norman Pellet, MIT license, v@<%= pkg.version %>, Date: @DATE */\n".replace( /@DATE/g, ( new Date() ).toISOString().replace( /:\d+\.\d+Z$/, "Z" ) )

              }
            }
        },

        copy: {

            dist: {

                files: {
                    //'dist/jquery.min.js': 'lib/components/jquery/dist/jquery.min.js'
                }
            },

            examples: {
                files: {
                    './examples/node_modules/node-jsgraph/dist/jsgraph.js': 'dist/jsgraph.js'
                }
            },

            web: {

                files: {
                    './web/site/js/node-jsgraph/dist/jsgraph.js': 'dist/jsgraph.js',
                    './web/site/js/node-jsgraph/dist/jsgraph.min.js': 'dist/jsgraph.min.js'
                }
            },

        },


        watch: {
          scripts: {
            files: ['src/**/*.js'],
            tasks: ['default']
          },
        },

        jsdoc : {
            dist : {
                src: [
                    'dist/jsgraph.js', 
                    ],
                options: {
                    destination: 'doc',
                    template : "node_modules/ink-docstrap/template",
                    configure : "node_modules/ink-docstrap/template/jsdoc.conf.json",
                    private: false,
                    tutorials:"./tutorials/"

                }
            }
        },

        exec: {
            npm_publish: 'npm publish'
        },

        webpack: {

            build: {
                 entry: './src/graph.js',
                 output: {
                     path: './dist/',
                     filename: 'jsgraph.js',
                     library: "Graph",
                     libraryTarget: 'umd'
                 },
                 
                 module: {
                     loaders: [{
                         test: /\.js$/,
                         exclude: /node_modules/,
                         loader: 'babel-loader',
                          query: {
                            presets: [
                                'babel-preset-es2015',
                                'babel-preset-stage-1',
                              ].map(require.resolve)
                          }
                     }]
                 }
            },

            dist: {

                 entry: './src/graph.js',
                 output: {
                     path: './dist/',
                     filename: 'jsgraph.js',

                     library: "Graph",
                     libraryTarget: 'umd'
                 },

                 plugins: [
                    new WebpackBeautifier( { options: true } ),
                    new WebpackUglifier()
                 ],

                 module: {
                     loaders: [{
                         test: /\.js$/,
                         exclude: /node_modules/,
                         loader: 'babel-loader',
                          query: {
                            presets: [
                                'babel-preset-es2015',
                                'babel-preset-stage-1',
                              ].map(require.resolve)
                          }
                     }]
                 }

             }
        }

    });


    var fs = require('fs');
    var requirejs = require('requirejs');
    var npmpath = require('path');
    var beautify = require('js-beautify').js_beautify;
    var babel = require('babel-core');
    var exec = require('child_process').exec;


    grunt.loadNpmTasks('grunt-sloc');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-webpack');


    grunt.registerTask( 'default', [ 'build', 'minify', 'copy:dist', 'copy:examples' ] );

    grunt.registerTask( 'gcms', [ 'default', 'copy:exportToGCMS'] );
    grunt.registerTask( "minify", "Minifying distribution file", function() {
        grunt.task.run( "uglify" ); // Uglifies the dist file        
    });

    grunt.registerTask( "release", "Make a new release", function() {

        grunt.task.run("bump:prerelease:bump-only");
        grunt.task.run("default");
        grunt.task.run("bump:prerelease:commit-only");
        grunt.task.run("exec:npm_publish");
    });

    grunt.registerTask( "patch", "Make a new patch", function() {

        grunt.task.run("bump:patch:bump-only");
        grunt.task.run("default");
        grunt.task.run("bump:patch:commit-only");
        grunt.task.run("exec:npm_publish");
    });


    grunt.registerTask( "minor", "Make a minor release", function() {

        grunt.task.run("bump:minor:bump-only");
        grunt.task.run("default");
        grunt.task.run("bump:minor:commit-only");
        grunt.task.run("exec:npm_publish");
    });

    grunt.registerTask( "major", "Make a new release", function() {

        grunt.task.run("bump:major:bump-only");
        grunt.task.run("default");
        grunt.task.run("bump:major:commit-only");
        grunt.task.run("exec:npm_publish");
    });



    grunt.registerTask( "buildExamples", "Builds new examples", function() {

        var examples = [];
        var list = JSON.parse( fs.readFileSync("examples/list.json", 'utf8') );
        
        for( var i = 0, l = list.length; i < l; i ++ ) {
            var code = fs.readFileSync("examples/v2/" + list[ i ].file + ".js", 'utf8' );
            var example = {};
            example.id = list[ i ].file;
            example.title = list[ i ].title;
            example.code = code;

            example.description = list[ i ].description;

            example.codeShown = code.replace(/\/\* START IGNORE \*\/([\s\S]*)\/\* END IGNORE \*\//, function( ) { return ""; } );
            example.codeShown = beautify( example.codeShown, { indent_size: 2, preserve_newlines: true, space_in_paren: true, max_preserve_newlines: 2 } )


            examples.push( example );
        }
        

        fs.writeFileSync( "web/sources/_data/examples.json", JSON.stringify( examples, undefined, "\t" ) );
    });

    grunt.registerMultiTask( 'build', 'Build jsGraph distributions', function() {

        var done = this.async();

        var buildName = 'graph';
        var targetOutput = this.data.output;
        var rdefineEnd = /\}\s*\)\s*;[^}\w]*$/;
        var version = grunt.config('pkg').version;
        
        var buildConvert = function( name, path, contents ) {
            var code;
            if( name == 'graph.axis.x.bar' ) {
                contents = babel.transform( contents, { presets: [ "es2015" ] } ).code;
                //contents = code;
            }

            

            grunt.file.write( path, beautify( grunt.file.read( path ), { indent_size: 2, preserve_newlines: true, space_in_paren: true, max_preserve_newlines: 2 } ) );

            matches = contents
                .match( /define\s*\(\s*['"]([^'"]*)['"]\s*,\s*\[\s*([^\)]*)\s*\]\s*,\s*function\s*\(\s*([^)]*)\s*\)/i );

            if( ! matches ) {
                
                grunt.log.writeln("Possible error for file " + name + "(" + path + "). No define found");
                grunt.log.writeln("Trying anonymous module. But that might lead to errors.");

                 matches = contents
                    .match( /define\s*\(\s*\[\s*(.*)\s*\]\s*,\s*function\s*\(\s*([^)]*)\s*\)/i );
                
                if( ! matches ) {
                    grunt.log.writeln("Still nothing...");
                    grunt.log.writeln("Skipping inclusion");
                    return "";
                } else {
                    // Insert the current name in the matches
                    matches.splice( 1, 0, name );
                    grunt.log.writeln("Ok we're good");
                }

            }

            var body = contents
                .replace( /define\([^{]*?{/, "" )
                .replace( rdefineEnd, "" );


            var defineName = matches[ 1 ];
            // For some reason defineName does not contain the original "./" ...

            var dependencies = matches[ 2 ].split(",");
            var objects = matches[ 3 ].split(',').map( function( val ) {

                if( val.length == 0 || val.indexOf('require') > -1 ) return null;

                return val;
            }).join();
            
            var basePath = npmpath.resolve('.') + "/";
            var defineName = npmpath.resolve( defineName );

            defineName = "./" + defineName.replace( basePath, "" );

            dependencies = dependencies.map( function( val ) { 

                if( val.length == 0 || val.indexOf('require') > -1 ) {
                    return null;
                }

                var val = val.replace(/^\s*?['"]([^'"]*)['"]\s*?$/, "$1");
                
                if( externalLibraries.indexOf( val ) == -1 ) {
                    val = npmpath.resolve( npmpath.dirname( path ), val );
                
                }
                val = "./" + val.replace( basePath, "" ).replace( /^src\//, "" );
                
                return 'build["' + val + '"]';

            } );


            if( name == buildName ) {
                contents = "return ";
            } else {
                contents = "build['" + defineName + "'] = ";
                
            }

            body =  "\n/** @global */ /** @ignore */\n" + body;

            contents += "( function( " + objects + ") { " + body + " } ) ( " + dependencies.join() + " )";

        //    contents += ; 
        

            // Remove anything wrapped with
            // /* ExcludeStart */ /* ExcludeEnd */
            // or a single line directly after a // BuildExclude comment
            contents = contents
                .replace( /\/\*\s*ExcludeStart\s*\*\/[\w\W]*?\/\*\s*ExcludeEnd\s*\*\//ig, "" )
                .replace( /\/\/\s*BuildExclude\n\r?[\w\W]*?\n\r?/ig, "" );

            // Remove empty definitions
            contents = contents
                .replace( /define\(\[[^\]]+\]\)[\W\n]+$/, "" );
        
            // Remove empty lines
            contents = contents
                .replace(/^\s*\"use strict\";\s*(\s)/ig, "$1" );
        //    }

            contents = contents
                .replace(/ /ig, " " );

                
            contents = "\n\n/* \n" +
            " * Build: new source file \n" +
            " * File name : " + name + "\n" + 
            " * File path : " + path + "\n" + 
            " */\n\n" + contents;
        
            return contents;
        }


        var externalLibraries = [  ];

       var requirejsConfig = {

            // It's all in the src folder
            baseUrl: "src",

            // Look out for the module graph
            name: buildName,
            
            // No optimization
            optimize: "none",

          
            wrap: {
                startFile: "./src/build_utils/startfile.js",
                endFile: "./src/build_utils/endfile.js"
            },


            paths: {
                'jquery': 'dependencies/jquery/dist/jquery.min'
            },

            // Taken from the jquery build task
            onBuildWrite: buildConvert,

            exclude: externalLibraries,
            //useStrict: true,

            out: function( compiled ) {

                compiled = compiled
                    .replace( /@VERSION/g, version )
                    .replace( /@DATE/g, ( new Date() ).toISOString().replace( /:\d+\.\d+Z$/, "Z" ) );

                // Write concatenated source to file


                compiled = beautify( compiled, { indent_size: 2, preserve_newlines: true, space_in_paren: true, max_preserve_newlines: 2 } )


                grunt.file.write( targetOutput, compiled );
             }
        };

        requirejs.optimize( requirejsConfig, function() {
            
            done();

        }, function( error ) {

            done( error );
        } );
    } );
};

