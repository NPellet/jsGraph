const path = require( 'path' );
const babel = require( 'rollup-plugin-babel' );

const distPath = path.resolve( __dirname, './dist/' );

module.exports = function ( grunt ) {

    grunt.initConfig( {

        pkg: grunt.file.readJSON( 'package.json' ),

        bump: {
            options: {
                files: [ 'package.json', 'bower.json' ],
                updateConfigs: [ 'pkg' ],
                createTag: true,
                push: true,
                pushTo: 'origin',
                commitFiles: [ '-a' ],
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
                    'dist/jsgraph.min.js': 'dist/jsgraph.js',
                },
                options: {
                    banner: '/*! jsGraph (c) 2014 Norman Pellet, MIT license, v@<%= pkg.version %>, Date: @DATE */\n'.replace( /@DATE/g, ( new Date() ).toISOString().replace( /:\d+\.\d+Z$/, 'Z' ) )

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
                    './examples/node_modules/node-jsgraph/dist/jsgraph.js': 'dist/jsgraph.js',
                    './examples/node_modules/node-jsgraph/dist/jsgraph-es6.js': 'dist/jsgraph-es6.js',
                }
            },

            web: {

                files: {
                    './web/site/js/node-jsgraph/dist/jsgraph.js': 'dist/jsgraph-es6.js',
                    './web/site/js/node-jsgraph/dist/jsgraph.min.js': 'dist/jsgraph.min.js',
                    
                }
            },

            visualizer: {

                files: {
                    '../visualizer/src/components/jsgraph/dist/jsgraph-es6.js': 'dist/jsgraph-es6.js'
                }
            },


            raytracer: {

                files: {
                      '/Users/normanpellet/Documents/Candlelight/code/board_generator/raytracer/node_modules/node-jsgraph/dist/jsgraph-module.js': 'dist/jsgraph-module.js'
                }
            },


            candlelight: {

                files: {
                    '/Users/normanpellet/Documents/Candlelight/code/website/node_modules/node-jsgraph/dist/jsgraph-es6.js': 'dist/jsgraph-es6.js'
                }
            }

        },


        watch: {
            scripts: {
                files: [ 'src/**/*.js' ],
                tasks: [ 'default' ]
            },
        },


        exec: {
            npm_publish: 'npm publish'
        },

        rollup: {
            distModule: {
                options: {
                    format: 'es',
                    sourceMap: true,
                    plugins: [
                        babel( {
                            babelrc: false,
                            plugins: [
                                'transform-exponentiation-operator',
                                [ 'inline-replace-variables', {
                                    '__VERSION__': 'v<%= pkg.version %>'
                                } ]
                            ]
                        } )
                    ]
                },
                files: {
                    'dist/jsgraph-module.js': 'src/graph.js'
                }
            }
        },

        webpack: {
            dist: {

                entry: [ 'babel-polyfill', './src/graph.js' ],
                output: {
                    path: distPath,
                    filename: 'jsgraph.js',
                    library: 'Graph',
                    libraryTarget: 'umd'
                },

                module: {
                    loaders: [ {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader',
                        query: {
                            presets: [
                                'babel-preset-env',
                                'babel-preset-stage-1',
                                'babel-polyfill'
                            ].map( require.resolve ),

                            plugins: [
                                'add-module-exports',
                                'transform-es2015-modules-umd',
                                'transform-exponentiation-operator',
                                [
                                    'inline-replace-variables', {
                                        '__VERSION__': 'v<%= pkg.version %>'
                                    } ]
                            ],
                            babelrc: false
                        }
                    } ]
                }

            },

            dist_es6: {

                entry: './src/graph.js',
                output: {
                    path: distPath,
                    filename: 'jsgraph-es6.js',
                    library: 'Graph',
                    libraryTarget: 'umd'
                },

                plugins: [
                    new WebpackBeautifier( {jsdoc: true} )
                ],

                module: {
                    loaders: [ {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader',
                        query: {
                            plugins: [
                                'add-module-exports',
                                'transform-es2015-modules-umd',
                                'transform-exponentiation-operator',
                                [ 'inline-replace-variables', {
                                    '__VERSION__': 'v<%= pkg.version %>'
                                } ]
                            ],
                            babelrc: false
                        }
                    } ]
                }
            }
        },

        babel: {
            minify: {
                options: {
                    sourceMap: true,
                    comments: false,
                    presets: [ 'minify' ],
                    babelrc: false
                },
                files: {
                    'dist/jsgraph-es6.min.js': 'dist/jsgraph-es6.js',
                    'dist/jsgraph-module.min.js': 'dist/jsgraph-module.js',
                }
            }
        }

    } );


    var fs = require( 'fs' );
    var beautify = require( 'js-beautify' ).js_beautify;
    var exec = require( 'child_process' ).exec;

    grunt.loadNpmTasks( 'grunt-sloc' );
    grunt.loadNpmTasks( 'grunt-bump' );
    grunt.loadNpmTasks( 'grunt-contrib-copy' );
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.loadNpmTasks( 'grunt-jsdoc' );
    grunt.loadNpmTasks( 'grunt-exec' );
    grunt.loadNpmTasks( 'grunt-webpack' );
    grunt.loadNpmTasks( 'grunt-babel' );
    grunt.loadNpmTasks( 'grunt-rollup' );


    grunt.registerTask( 'default', [ 'build', 'minify', 'copy:examples' ] );

    grunt.registerTask( 'minify', 'Minifying distribution file', [ 'uglify', 'babel:minify' ] );

    grunt.registerTask( 'release', 'Make a new release', function () {

        grunt.task.run( 'bump:prerelease:bump-only' );
        grunt.task.run( 'default' );
        grunt.task.run( 'bump:prerelease:commit-only' );
        grunt.task.run( 'exec:npm_publish' );
    } );

    grunt.registerTask( 'patch', 'Make a new patch', function () {

        grunt.task.run( 'bump:patch:bump-only' );
        grunt.task.run( 'default' );
        grunt.task.run( 'bump:patch:commit-only' );
        grunt.task.run( 'exec:npm_publish' );
    } );


    grunt.registerTask( 'minor', 'Make a minor release', function () {

        grunt.task.run( 'bump:minor:bump-only' );
        grunt.task.run( 'default' );
        grunt.task.run( 'bump:minor:commit-only' );
        grunt.task.run( 'exec:npm_publish' );
    } );

    grunt.registerTask( 'major', 'Make a new release', function () {

        grunt.task.run( 'bump:major:bump-only' );
        grunt.task.run( 'default' );
        grunt.task.run( 'bump:major:commit-only' );
        grunt.task.run( 'exec:npm_publish' );
    } );


    grunt.registerTask( 'buildExamples', 'Builds new examples', function () {


        var examples = [];
console.log( fs.readFileSync( 'examples/list.json', 'utf8' ) );
        var list = JSON.parse( fs.readFileSync( 'examples/list.json', 'utf8' ) );

        for ( var i = 0, l = list.length; i < l; i++ ) {
            var code = fs.readFileSync( 'examples/v2/' + list[i].file + '.js', 'utf8' );
            var example = {};
            example.id = list[i].file;
            example.title = list[i].title;
            example.code = code;

            example.description = list[i].description;

            example.codeShown = code.replace( /\/\* START IGNORE \*\/([\s\S]*)\/\* END IGNORE \*\//, function () { return ''; } );
            example.codeShown = beautify( example.codeShown, {indent_size: 2, preserve_newlines: true, space_in_paren: true, max_preserve_newlines: 2} );

            examples.push( example );
        }


        fs.writeFileSync( 'web/sources/_data/examples.json', JSON.stringify( examples, undefined, '\t' ) );
    } );


    grunt.registerTask( 'tutorials', 'Builds tutorials', function () {

        exec( './node_modules/.bin/jsdoc -c jsdoc.json', ( err ) => {
            if ( err ) {
                console.error( err );
                return;
            }
            console.log( 'DONE' );
        } );
    } );


    grunt.registerTask( 'build', [ 'webpack:dist', 'webpack:dist_es6', 'rollup:distModule' ] );
    grunt.registerTask( 'visualizer', [ 'webpack:dist_es6', 'copy:visualizer' ] );
    grunt.registerTask( 'candlelight', [ 'webpack:dist_es6', 'copy:candlelight' ] );


    function WebpackBeautifier( options ) {
        this._options = options;
    }

    WebpackBeautifier.prototype.apply = function ( compiler ) {

        var self = this;
        compiler.plugin( 'done', function ( stats ) {
            var json = stats.toJson( {assets: false, chunks: false, modules: true} ).modules;
            json.map( function ( el ) {
                //console.log( el );

                if ( el.name == 'multi main' || el.name.indexOf( '~' ) > -1 ) {
                    return;
                }

                grunt.file.write( el.name, beautify( grunt.file.read( el.name ), {indent_size: 2, preserve_newlines: true, space_in_paren: true, max_preserve_newlines: 2} ) );
            } );

            if ( !self._options.jsdoc ) {
                return;
            }
            console.log( 'Parsing documentation...' );
            grunt.file.write( 'jsdoc.json', JSON.stringify( {
                opts: {
                    'destination': './web/doc/',
                    'tutorials': 'tutorials',
                    'template': 'util/doctemplate'
                },

                'source': {
                    'include': json.map( ( el ) => {

                        if ( el.name == 'multi main' || el.name.indexOf( '~' ) > -1 ) {
                            return;
                        }

                        return el.name;
                    } ),
                }

            }, false, '\t' ) );

            exec( './node_modules/.bin/jsdoc -c jsdoc.json', ( err ) => {
                if ( err ) {
                    console.error( err );
                    return;
                }

                console.log( 'DONE' );
            } );
        } );
    };
};

