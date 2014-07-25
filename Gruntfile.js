module.exports = function(grunt) {

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    watch: {
      templates: {
        files: ['public/templates/**/*'],
        tasks: ['exec:compress_templates']
      },
    },

    exec: {
      compress_templates: {
        cmd: 'templatizer -d public/templates/ -o public/js/dist/templates.js'
      }
    },

  });

  grunt.registerTask("default", ['watch']);

};
