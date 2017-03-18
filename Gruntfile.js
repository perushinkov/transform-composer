// Generated on 2016-01-20 using generator-angular 0.15.1
'use strict';

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  require('jit-grunt')(grunt, {
    tags: 'grunt-script-link-tags'
  });

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({
    // Project settings
    yeoman: appConfig,

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            //'.tmp',
            '<%= yeoman.dist %>/{,*/}*'//,
            //'!<%= yeoman.dist %>/.git{,*/}*'
          ]
        }]
      }
    },
    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: '127.0.0.1',
        livereload: 35730
      },
      livereload: {
        options: {
          open: true,
          base: '<%= yeoman.app %>'//,
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>'
        }
      }
    },
    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= yeoman.app %>',
            dest: '<%= yeoman.dist %>',
            src: [
              'index.html',
              'app.js',
              'root/**/*',
              'assets/**/*',
              'components/**/*'
            ]
          }
        ]
      }
    },
    fileExists: {
      scripts: [
      ]
    },
    tags: {
      defaultJS: {
        options: {
          openTag: '<!-- start scripts here -->',
          closeTag: '<!-- end scripts here -->'
        },
        src: [
          'app/app.js',
          'app/components/**/*.js',
          'app/root/**/*.js'
        ],
        dest: 'app/index.html'
      },
      defaultCSS: {
        options: {
          openTag: '<!-- start css here -->',
          closeTag: '<!-- end css here -->'
        },
        src: [
          'app/assets/styles/*.css'
        ],
        dest: 'app/index.html'
      }
    },
    // Watches files for changes and runs tasks based on the changed files
    watch: {
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.dist %>/**/*'
        ]
      }
    },
    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= yeoman.app %>/index.html'],
        ignorePath: /\.\.\//
      }
    },
    wiredepCopy: {
      target: {
        options: {
          src: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          wiredep: {}
        }
      }
    }
  });
  //
  //
  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    console.log(target);
    grunt.task.run([
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('build', 'Builds either dev or prod version. Prod is default.', function (type) {
    var tagsType = type === 'dev' ? 'dev' : 'prod';
    grunt.task.run([
      'fileExists',
      'clean:dist',
      'tags:defaultCSS',
      'tags:defaultJS',
      'tags:' + tagsType,
      'wiredep',
      'copy:dist',
      'wiredepCopy'
    ]);
  });
};
