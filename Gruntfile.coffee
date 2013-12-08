module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    coffee:
      compile:
        options:
          bare: true
        expand: true
        cwd: 'src/coffee'
        src: '*.coffee'
        dest: 'app/js'
        ext: '.js'

    jade:
      compile:
        options:
          data:
            debug: false
        files:
          'app/views/home.html': 'src/views/home.jade'

    watch:
      files: ['src/coffee/*.coffee', 'src/views/*.jade']
      tasks: ['default']

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-jade'

  grunt.registerTask 'default', ['coffee']
