module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        typescript: {
            base: {
                src: ['source/**/*.ts'],
                dest: 'source',
                options: {
                    module: 'commonjs',
                    target: 'es5',
                    sourceMap: true,
                }
            }
        },
        browserify: {
            main: {
                options: {
                    browserifyOptions: {
                        debug: true
                    },
                },
                src: 'source/app.js',
                dest: 'scripts/app.js'
            }
        },
        watch: {
            code: {
                files: ['source/**/*.ts'],
                tasks: ['typescript', 'browserify'],
            },
        },
        connect: {
            target: {
                options: {
                    port: 9001
                }
            }
        },
        bower: {
            flat: {
                dest: 'scripts',
                options: {
                    debugging: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('main-bower-files');
    grunt.loadNpmTasks('grunt-typescript');

    grunt.registerTask('default', ['bower', 'connect', 'typescript', 'browserify', 'watch']);
};
