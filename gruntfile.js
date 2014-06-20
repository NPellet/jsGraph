

module.exports = function(grunt) {

    grunt.initConfig({
        sass: {                                    

            dist: {                                
                files: {
                    'style.css': 'style.scss'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.registerTask('default', ['sass']);

};