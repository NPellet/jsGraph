

module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        sass: {                                    

            dist: {                                
                files: {
                    'style.css': 'style.scss'
                }
            },

            lib: {                                
                files: {
                    './src/style/style.css': './src/style/style.scss'
                }
            }
        },


        requirejs: {
            compile: {
                options: {

                    name: "graph", // assumes a production build using almond
                    exclude: [ 'jquery' ],
                    out: "dist/dist/graph-minimal.min.js",

                    paths: {
                        'jquery': 'empty:',
                        'jqueryui': 'empty:',
                        'highlightjs': 'empty:',
                        'forms': 'empty:',
                        'components': 'empty:'
                    },

                    baseUrl: "./src/",
                    //mainConfigFile: "path/to/config.js",



                }
            }
        },

        copy: {

            sourcefiles: {

                files: [ 
                    {
                        expand: true,
                        cwd: './src/',
                        src: './**',
                        dest: './dist/src/'
                    }
                ]
            }

        },

        clean: {

            build: {
                src: './dist/**'
            }
        },

        bump: {

            options: {
                files: ['package.json'],
                updateConfigs: [ 'pkg' ],
                push: false
            }
    
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-bump');

    grunt.registerTask('default', ['clean:build', 'sass', 'requirejs', 'copy:sourcefiles', 'addcopyright']);


    grunt.registerTask('addcopyright', function () {

        var fileRead, firstLine, counter = 0, fileExtension, commentWrapper;
        copyright = '/*Copyright by Norman Pellet @2013*/';


        grunt.log.writeln( grunt.config('pkg.version') );
//copyright = [ '!', 'Graphing JavaScript Library v' + 
/*!
 * jQuery JavaScript Library v1.11.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:42Z
 */



        grunt.file.expand( { filter: 'isFile', cwd: 'dist/src/' }, ["**/*.js" ] ).forEach( function( dir ) {

            fileRead = grunt.file.read( 'dist/src/' + dir ).split( '\n' );
            fileRead.unshift( copyright );
            fileRead = fileRead.join('\n');
            grunt.file.write( 'dist/src/' + dir, fileRead );
        
        });
    })
};