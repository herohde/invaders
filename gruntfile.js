module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ts: {
            dev: {
                src: ['source/**/*.ts'],
                dest: 'source',
                options: {
                    module: 'commonjs',
                    target: 'es6',
                    sourceMap: true,
                    moduleResolution: "node"
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
                tasks: ['ts:dev', 'browserify'],
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
    grunt.loadNpmTasks('grunt-ts');

    grunt.registerTask('default', ['bower', 'connect', 'ts:dev', 'browserify', 'watch']);
    grunt.registerTask('compile', ['bower', 'ts:dev', 'browserify']);
};
