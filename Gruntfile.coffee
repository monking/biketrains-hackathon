module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    coffee:
      app:
        options:
          bare: true
        expand: true
        cwd: 'src/app'
        src: '*.coffee'
        dest: 'app'
        ext: '.js'
      public:
        options:
          bare: true
        expand: true
        cwd: 'src/public'
        src: '*.coffee'
        dest: 'public/js'
        ext: '.js'

    watch:
      files: ['src/app/*.coffee','src/public/*.coffee']
      tasks: ['default']

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-jade'

  grunt.registerTask 'default', ['coffee']
