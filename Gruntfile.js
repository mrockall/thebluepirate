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

    uglify: {
      js: {
        src: ['public/js/dist/app.js'],
        dest: 'public/js/dist/app.js',
      }
    }

  });

  grunt.registerTask("default", ['watch']);
  grunt.registerTask("build", ['uglify']);

};
