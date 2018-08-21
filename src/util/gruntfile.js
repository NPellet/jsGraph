const path = require( 'path' );
const babel = require( 'rollup-plugin-babel' );

const distPath = path.resolve( __dirname, './dist/' );
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');


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

        exec: {
            npm_publish: 'npm publish'
        },

        rollup: {

            distModule: {
                options: {
                    format: 'cjs',
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
                    'dist/waveform.js': './waveform.js'
                }
            }
        }

    } );


    var fs = require( 'fs' );

    grunt.loadNpmTasks( 'grunt-bump' );
    grunt.loadNpmTasks( 'grunt-rollup' );
    grunt.loadNpmTasks( 'grunt-exec' );

    grunt.registerTask( 'default', [ 'rollup' ] );

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
};

