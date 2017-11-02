
module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        copy: {                              // Task
          main: {
            files: [
              // includes files within path
              {
                expand: true, 
                cwd: '../dist/',
                src: ['jsgraph-es6.*'], 
                dest: 'lib/', 
                filter: 'isFile'
              }
            ]
          }
        },

        webpack: {
            nmr1d: {

                 entry: [ './js/nmr1d.jsx' ],

                 output: {
                    filename: '../../visualizer/src/modules/types/science/spectra/nmr/1dnmr_2/app_1d.js',
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
                              ],

                              plugins: [
                                [ 'inline-replace-variables', { "__VERSION__": "v<%= pkg.version %>" } ]
                              ]
                          }
                     },
                     {
                         test: /\.jsx$/,
                         exclude: /node_modules/,
                         loader: 'babel-loader',
                          query: {
                            presets: [
                              'react'
                              ]
                          }
                     }]
                 }
             },

             nmr2d: {

                 entry: [ './js/main_2d.jsx' ],

                 output: {
                     filename: '../docs/nmr/js/app2d.js'
                 },
                
                 module: {
                     loaders: [{
                         test: /\.js$/,
                         exclude: /node_modules/,
                         loader: 'babel-loader',
                          query: {
                            presets: [
                              'babel-preset-es2015',
                              'babel-preset-stage-1'
                              ]
                          }
                     },
                     {
                         test: /\.jsx$/,
                         exclude: /node_modules/,
                         loader: 'babel-loader',
                          query: {
                            presets: [
                              'react'
                              ]
                          }
                     }]
                 }
             }
        }
    });

    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['copy', 'webpack:nmr1d']);

};