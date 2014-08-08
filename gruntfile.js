

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

        grunt.config('pkg.version');
        copyright = [ 
                '!', 
                'Graphing JavaScript Library v' + grunt.config('pkg.version'), 
                'https://github.com/NPellet/graph',
                '',
                'Copyright (c) 2014 Norman Pellet',
                'Permission is hereby granted, free of charge, to any person obtaining a copy',
                'of this software and associated documentation files (the "Software"), to deal',
                'in the Software without restriction, including without limitation the rights',
                'to use, copy, modify, merge, publish, distribute, sublicense, and/or sell',
                'copies of the Software, and to permit persons to whom the Software is',
                'furnished to do so, subject to the following conditions:',
                '', 
                'The above copyright notice and this permission notice shall be included in',
                'all copies or substantial portions of the Software.',
                '',
                'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR',
                'IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,',
                'FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE',
                'AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER',
                'LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,',
                'OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN',
                'THE SOFTWARE.',
                '',
                'Date: ' + grunt.template.date( Date.now(), 'dd-mm-yyyy')
            ];


        grunt.file.expand( { filter: 'isFile', cwd: 'dist/src/' }, ["**/*.js" ] ).forEach( function( dir ) {

            fileRead = grunt.file.read( 'dist/src/' + dir ).split( '\n' );

            fileRead.unshift('*/');
            for( var l = copyright.length, i = l - 1 ; i >= 0 ; i -- ) {
                fileRead.unshift( ( i == 0 ? '/* ' : '* ' ) + copyright[ i ] );
            }

            
            fileRead = fileRead.join('\n');
            grunt.file.write( 'dist/src/' + dir, fileRead );
        
        });
    })
};