/**
 * Created by yaroslav on 5/1/16.
 */
module.exports = function (grunt) {
    grunt.initConfig({
        express: {
            dev: {
                options: {
                    script: "./bin/www"
                }
            }
        },
        watch: {
            express: {
                files: ['./bin/www', './routes/*.js', './app.js'],
                tasks: ['express:dev'],
                options: {
                    spawn: false,
                    livereload: 8082
                }
            },
            grunt: {
                files: ['./Gruntfile.js'],
                tasks: [],
                options: {
                    reload: true
                }
            },
            html: {
                files: ['./public/*.*', './public/images/*.*', "./views/*.jade", "./views/**/*.*", './public/stylesheets/*.css',
                    './public/javascripts/app.min.js', './public/javascripts/app.admin.min.js'],
                tasks: [],
                options: {
                    livereload: 8082
                }
            },
            compass:{
                files: ['./public/stylesheets/*.scss'],
                tasks: ['compass']
            },
            html2jsMain: {
                files: ['./public/templates/**/*.tpl.html', './public/templates/**/*.jade',
                    './public/templates/*.tpl.html', './public/templates/*.jade'],
                tasks: ['html2js:main']
            },
            angularMain: {
                files: ['./public/javascripts/app.js', './public/javascripts/ng-modules/**/*.js',
                    './public/javascripts/ng-modules/*.js', './tmp/templates.js'],
                tasks: ['concat:main', 'uglify:main'],
                options: {
                    livereload: 8082
                }
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'public/javascripts/app.js', 'routes/*.js', './public/javascripts/ng-modules/**/*.js',
                './public/javascripts/ng-modules/*.js']
        },
        concat: {
            options: {
                separator: ';'
            },
            main: {
                src: ['./public/javascripts/app.js', './public/javascripts/ng-modules/**/*.js',
                    './tmp/templates.js', './public/javascripts/ng-modules/*.js'],
                dest: './public/javascripts/app.concat.js'
            }
        },
        uglify: {
            main: {
                options: {
                    mangle: false
                },
                files: {
                    './public/javascripts/app.min.js': ['./public/javascripts/app.concat.js']
                }
            }
        },
        compass: {
            dev: {
                options: {
                    sassDir: ['public/stylesheets'],
                    cssDir: ['public/stylesheets']
                }
            }
        },
        html2js: {
            main: {
                options: {
                    base: 'public',
                    module: 'templates',
                    jade: {
                        //this prevents auto expansion of empty arguments
                        //e.g. "div(ui-view)" becomes "<div ui-view></div>"
                        //     instead of "<div ui-view="ui-view"></div>"
                        doctype: "html"
                    }
                },
                src: ['./public/templates/**/*.tpl.html', './public/templates/**/*.jade',
                    './public/templates/*.tpl.html', './public/templates/*.jade'],
                dest: './tmp/templates.js'
            }
        }
    });
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');

    grunt.loadNpmTasks('grunt-html2js');

    //grunt.registerTask('default', ['concurrent']);
    grunt.registerTask('default', ['express:dev', 'watch']);
    grunt.registerTask('build', ['html2js:main', 'concat:main', 'uglify:main']);

};