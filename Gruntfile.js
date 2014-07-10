module.exports = function(grunt) {
    grunt.initConfig({
        react: {
            single_file_output: {
                files: {
                    'scripts/app/form/component.js': 'scripts/app/form/component.jsx',
                    'scripts/app/form/view.js': 'scripts/app/form/view.jsx',
                    'scripts/app/sticker/component.js': 'scripts/app/sticker/component.jsx',
                    'scripts/app/sticker/list_component.js': 'scripts/app/sticker/list_component.jsx',
                    'scripts/app/sticker/view.js': 'scripts/app/sticker/view.jsx'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-react');
    grunt.registerTask('default', ['react']);
};