

module.exports = function(grunt) {


    grunt.initConfig({


        pkg: grunt.file.readJSON('package.json'),

        build: {

            maximal: {
                
                output: 'dist/jsgraph.js'
            },

            minimal: {
                
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
                commitFiles: ['-a']
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
              }
            }
        },

        copy: {

            dist: {

                files: {
                    'dist/jquery.min.js': 'lib/components/jquery/dist/jquery.min.js'
                }
            },

            exportToNMR: {

                files: {
                    '../nmr/lib/components/graph/dist/jsgraph.js': 'dist/jsgraph.js'
                }
            },

            exportToPages: {

                files: {
                    '../jsgraphwww/js/jsgraph/jsgraph.js': 'dist/jsgraph.min.js',
                    '../jsgraphwww/js/jquery/jquery.min.js': 'dist/jquery.min.js'
                }
            },


            exportDevToPages: {

                files: {
                    '../jsgraphwww/js/jsgraph/jsgraph.js': 'dist/jsgraph.js',
                    '../jsgraphwww/js/jquery/jquery.min.js': 'dist/jquery.min.js'
                }
            }
        },

        sass: {
            './examples/style.css': './examples/style.scss'
        }

    });


    var fs = require('fs');
    var requirejs = require('requirejs');
    var npmpath = require('path');
    var beautify = require('js-beautify').js_beautify;

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-sloc');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    function convert() {

        grunt.log.writeln( arguments );
    }

    grunt.registerTask( 'default', [ 'build', 'uglify', 'copy:dist', 'copy:exportToNMR', 'buildExampleList'] );


    grunt.registerTask( 'buildExampleList', 'Lists all examples', function() {

        var files = fs.readdirSync( './examples/src/' );
        var str = "define( [ 'require', " + files.map( function( el ) { return "'./src/" + el + "'" }).join() + " ], function() { return arguments; });";

        grunt.task.run('copy:exportToPages');
        grunt.file.write( '../jsgraphwww/examples/list.js', str );
    });


    grunt.registerMultiTask( 'build', 'Build jsGraphs distributions', function() {

        var done = this.async();
        var targetOutput = this.data.output;
        var rdefineEnd = /\}\s*\)\s*;[^}\w]*$/;

        var version = grunt.config('pkg').version;
        grunt.log.writeln( version );

        var buildConvert = function( name, path, contents ) {
//            return contents;

            //grunt.log.writeln( path, fs.fstatSync( path ) );

            // Convert var modules
       /*     if ( /.\/var\//.test( path ) ) {
                contents = contents
                    .replace( /define\([\w\W]*?return/, "var " + (/var\/([\w-]+)/.exec(name)[1]) + " =" )
                    .replace( rdefineEnd, "" );

            } else {
*/


                if( name !== 'graph' ) {
                    matches = contents
                        .match( /define\s*\(\s*'([^']*)'\s*,\s*\[\s*(.*)\s*\]\s*,\s*function\s*\(\s*([^)]*)\s*\)/i );

                    if( ! matches ) {
                        grunt.log.writeln("Possible error for file " + name + "(" + path + "). No define found");
                        grunt.log.writeln("Trying anonymous module");

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

                    contents = contents
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
                        val = npmpath.resolve( npmpath.dirname( path ), val );
    

                        val = "./" + val.replace( basePath, "" ).replace( /^src\//, "" );

                        return 'build["' + val + '"]';

                    } );



                    contents = "build['" + defineName + "'] = ( function( " + objects + ") { " + contents + " } ) ( " + dependencies.join() + " );\n"; 
                } else {

                    contents = "return build[ './graph.core' ];\n";
                   
                }



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

                
            contents = 

            "/* \n" +
            " * Build: new source file \n" +
            " * File name : " + name + "\n" + 
            " * File path : " + path + "\n" + 
            " */\n\n" +

            contents + 
            "\n\n" + 
            "// Build: End source file (" + name + ") \n\n\n\n";

            return contents;
        }



    
           var requirejsConfig = {

                // It's all in the src folder
                baseUrl: "src",

                // Look out for the module graph
                name: "graph",
                
                // No optimization
                optimize: "none",

              
                wrap: {
                    startFile: "./src/build_utils/startfile.js",
                    endFile: "./src/build_utils/endfile.js"
                },


                paths: {
                    'jquery': '../lib/components/jquery/dist/jquery.min'
                },

                // Taken from the jquery build task
                onBuildWrite: buildConvert,

                exclude: [ 'jquery' ],
                //useStrict: true,

                out: function( compiled ) {

                    compiled = compiled
                        .replace( /@VERSION/g, version )
                        .replace( /@DATE/g, ( new Date() ).toISOString().replace( /:\d+\.\d+Z$/, "Z" ) );

                    // Write concatenated source to file
                    grunt.file.write( targetOutput, compiled );
                 }



        //targetOutput || './dist/graphs.js'
            };




        requirejs.optimize( requirejsConfig, function() {
            
            done();

        }, function( error ) {

            done( error );
        } );
    } );


    grunt.registerTask( 'topages', 'Sends examples to pages', function() {

        grunt.task.run('default');
        grunt.task.run('buildExampleList');
        
        if( grunt.option( 'dev') ) {
            grunt.task.run('copy:exportDevToPages');    
        } else {
            grunt.task.run('copy:exportToPages');    
        }
        


        var yml = "examplesTree:\n";
        var basePath = './examples/src/';
        var i = 0;
        fs.readdirSync( basePath ).map( function( folder ) {

            if( fs.statSync( basePath + folder ).isDirectory() ) {

                var folderName = fs.readFileSync( basePath + folder + '/folderName.txt' );

                yml += "- title: \"" + folderName + "\"\n";
                yml += "  children:\n"; 

                fs.readdirSync( basePath + folder ).map( function( file ) {

                   if( file.indexOf( '.js' ) == -1 ) {
                     return;
                   }

                   var folder2 = folder.replace(/^([0-9]+-)/, "");
                   var file2 = file.replace(/^([0-9]+-)/, "");

                   var func = requirejs( basePath + folder + "/" + file );
                   var funcString = func[ 0 ].toString();

                   var markdown =   "---\n" +
                                    "layout: page_menu\n" + 
                                    "treeName: examplesTree\n" + ( i == 0 ? "permalink: /examples.html\ntitle: Examples\n" : "") + 
                                    "---\n";





                    markdown += "<h1>" + func[ 1 ] + "</h1>";

                    markdown += '<div class="graph-example"><div class="graph" id="example-graph"></div><div id="example-details">' + func[ 2 ].map( function( val ) {

                        if( Array.isArray( val ) ) {
                            return '<div><h2>' + val[ 0 ] + '</h2><p class="font small">' + val[ 1 ] + '</p></div>';
                        }

                        return '<p class="font small">' + val + '</p>';
                    } ).join("") + '</div><h2>Source code</h2><div id="example-function">{% highlight javascript %}' + 

                        beautify( 
                            funcString
                            .replace(/(\s*)\/\/ BEGIN IGNORE ON BUILD((.|[\r\n])*)\/\/ END IGNORE ON BUILD(\s*([\r\n])+)/g, "\n")
                            .replace(/^((.|[\r\n])*)function\s*\(\s*domGraph\s*\)\s*{/, "")
                            .replace(/\}([\s\r\n]*)$/, ""), 

                            { indent_size: 2, preserve_newlines: true, space_in_paren: true, max_preserve_newlines: 2 } )

                         + '{% endhighlight %}</div></div>';


                    markdown += '<script type="text/javascript"> (' + funcString + ')( "example-graph" );</script>';

                    grunt.file.write( '../jsgraphwww/_examples/' + folder2 + '/' + file2 + '.markdown', markdown );

                    yml += "   - title: \"" + func[ 1 ] + "\"\n";
                    yml += "     url: \"" + ( i == 0 ? "/examples.html" : ( "/examples/" + folder2 + "/" + file2 + "/") ) + "\"\n";

                    i++;
                } );
            }
        } );

        var ymlMaster = grunt.file.read( '../jsgraphwww/_config.yml' )
                            .replace(/#exampleTree start((.|[\r\n])*)#exampleTree end/, "#exampleTree start\n" +  yml + "\n#exampleTree end");
        grunt.file.write( '../jsgraphwww/_config.yml', ymlMaster );

    } );
};
