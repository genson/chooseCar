module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'), 
 
        jshint: {     // описываем как будет проверять наш код - jsHint
          options: {
            curly: true,
            eqeqeq: true,
            immed: true,
            latedef: true,
            newcap: true,
            noarg: true,
            sub: true,
            undef: true,
            eqnull: true,
            browser: true,
            globals: {
              jQuery: true,
              $: true,
              console: true
            }
          },
          '<%= pkg.name %>': {  
            src: [ 'app/js/**/*.js' ]  
          }
        },
 
        concat: { 
            dist: {
                src: ['app/js/*.js'],  
                dest: 'build/build.js'
            }
        },
 
        uglify: { 
            options: {
                stripBanners: true,
                banner: '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n' 
            },
 
            build: {
                src: 'build/build.js', 
                dest: 'build/build.min.js'
            }
        },
 
        cssmin: { 
            with_banner: {
                options: {
                    banner: '/* Choose a cat min styles */'
                },
 
                files: {
                    'build/style.min.css' : ['app/css/*.css']
                }
            }
        },
 
        watch: { 
            scripts: {
                files: ['app/js/*.js'], 
                tasks: ['jshint', 'concat', 'uglify', 'removelogging'] 
            },
            css: {
                files: ['app/css/*.css'], 
                tasks: ['cssmin'] 
            }
        },
 
 
        removelogging: { 
            dist: {
                src: "build/build.min.js", 
                dest: "build/build.min.js" 
            }
        },

        imgo: {
            icons: {
                src: "app/img/*.*",
                desc: "build/img/"
            }
        },
        
        'gh-pages': {
            options: {
            base: 'app'
            },
            src: ['**']
        }
 
 
    });
 
    //подгружаем необходимые плагины
    // grunt.loadNpmTasks('grunt-contrib-jshint');
    // grunt.loadNpmTasks('grunt-contrib-concat');
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-contrib-cssmin');
    // grunt.loadNpmTasks('grunt-contrib-watch');
    // grunt.loadNpmTasks('grunt-remove-logging');
    // grunt.loadNpmTasks('grunt-imgo');
    grunt.loadNpmTasks('grunt-gh-pages');
 
    grunt.registerTask('default', ['concat', 'uglify', 'cssmin', 'removelogging']); 
    grunt.registerTask('build', ['jshint', 'imgo', 'concat', 'uglify', 'cssmin', 'removelogging', 'watch']); 
    grunt.registerTask('pages', ['gh-pages']);  
};