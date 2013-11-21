module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
                src: ['app/js/*.js'],
                dest: 'build/js/build.js'
            }
        },

        uglify: {
            options: {
                stripBanners: true,
                banner: '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },

            build: {
                src: 'build/js/build.js',
                dest: 'build/js/build.min.js'
            }
        },

        cssmin: {
            with_banner: {
                options: {
                    banner: '/* Choose a cat min styles */'
                },

                files: {
                    'build/css/style.min.css' : ['app/css/*.css']
                }
            }
        },

        removelogging: {
            dist: {
                src: "build/js/build.min.js",
                dest: "build/js/build.min.js"
            }
        },

        'gh-pages': {
            options: {
            base: 'build'
            },
            src: ['**']
        },

        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'app/', src: ['cars/*'], dest: 'build/', filter: 'isFile'},
                    {expand: true, cwd: 'app/', src: ['img/**/*'], dest: 'build'},
                    {expand: true, cwd: 'app/', src: ['font/*'], dest: 'build'},
                    {expand: true, cwd: 'app/', src: ['partials/*'], dest: 'build/', filter: 'isFile'},
                    {expand: true, cwd: 'app/', src: ['*.html'], dest: 'build'}
                ]
            }
        },

        usemin: {
            html: ['build/index.html'],
            options: {
                dist: 'build'
            }
        }

    });

    //use grants plugin for tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-remove-logging');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-gh-pages');

    grunt.registerTask('default', ['concat', 'uglify', 'cssmin', 'removelogging']);

    //preparing for publish on gh-pages
    grunt.registerTask('build', [ 'concat', 'removelogging','uglify', 'cssmin', 'copy', 'usemin']);
    grunt.registerTask('pages', ['gh-pages']);
};