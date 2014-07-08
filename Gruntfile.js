module.exports = function(grunt) {
    grunt.initConfig({
        react: {
            single_file_output: {
                files: {
                    'scripts/main.js': 'scripts/main.jsx'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-react');
    grunt.registerTask('default', ['react']);
};