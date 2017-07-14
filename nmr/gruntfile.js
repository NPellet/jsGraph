
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

                 entry: [ './js/main.jsx' ],

                 output: {
                     filename: '../docs/nmr/js/app.js'
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

    grunt.registerTask('default', ['copy', 'webpack']);
};