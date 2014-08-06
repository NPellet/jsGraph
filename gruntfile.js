

module.exports = function(grunt) {

    grunt.initConfig({
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
                    out: "dist/graph.js",



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
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.registerTask('default', ['sass', 'requirejs']);

};