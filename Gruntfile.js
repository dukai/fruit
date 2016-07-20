"use strict"
module.exports = function(grunt) {

	var config = require('./grunt-config/global');

	grunt.initConfig({
		config: config,
		less: {
			dev: {
				options: {
					paths: ["less"]
				},
				files: [{
					expand: true,
					cwd: '<%= config.webroot %>/less/',
					src: ['*.less'],
					dest: 'src/css/',
					ext: '.css',
					extDot: 'first' //Extensions in filenames begin after the first dot
				},
				],
			},
            dist: {
                options: {
                    paths: ["less"],
                    compress: true
                },
                files: [
                {
                    expand: true,  
                    cwd: '<%= config.webroot %>/less-sprite/', 
                    src: ['*.less'], 
                    dest: 'src/css/', 
                    ext: '.css',  
                    extDot: 'first'  
                },
                ],
            }
		},

		clean: {
            tests: ['dist'],
            tmpl: ['src/js/app/**/*.tmpl.js', 'src/js/comp/**/*.tmpl.js'],
            sprite: ['src/less-sprite']
        },

        inline_text: {
            def: {
                files: [{
                    expand: true,
                    cwd: '<%= config.webroot %>',
                    src: ['js/app/**/*.tmpl', 'js/comp/**/*.tmpl'],
                    dest: '<%= config.webroot %>'
                }]
            }
        },

		requirejs: {
			compile: {
				options: {
					appDir: '<%= config.webroot %>',
					baseUrl: "js",
					dir: '<%= config.dist %>',
					mainConfigFile: '<%= config.webroot %>/js/rs-config.js',
					optimize: 'uglify',
					skipDirOptimize: true,
                    fileExclusionRegExp: /^\.|\.less$/,
					modules: [].concat(require('./grunt-config/requirejs-modules'))
				}
			},

            test: {
                options: {
                    appDir: '<%= config.webroot %>',
                    baseUrl: "js",
                    dir: '<%= config.dist %>',
                    mainConfigFile: '<%= config.webroot %>/js/rs-config.js',
                    optimize: 'none',
                    skipDirOptimize: true,
                    optimizeAllPluginResources: true,
                    fileExclusionRegExp: /^\.|\.less$/,
                    modules: []
                }
            }
		},

		watch: {
            options: {
                livereload: 35729
            },
            less: {
                files: ['<%= config.webroot %>/less/**/*.less'],
                tasks: [
                	'less:dev'
                ],
                options: {
                    nospawn: true
                }
            },
            html: {
                files: ['<%= config.webroot %>/**/*'],
                tasks: [],
                options: {
                    nospawn: true
                }
            },
            express: {
                files: ['server/**/*.js'],
                tasks: ['express:dev'],
                options: {
                    spawn: false
                }
            },
        },
        cacheBust: {
        	options: {
        		encoding: 'utf8',
        		algorithm: 'md5',
        		length: 16,
        		deleteOriginals: true,
        		jsonOutput: true,
        		ignorePatterns: ['test', 'require.js', 'bootstrap', 'jquery', 'moment'],
        		baseDir: '<%= config.dist %>',
                filters: {
                    'script': [
                        function() {
                            return this.attribs['data-main'];
                        },
                        function() {
                            return this.attribs.src;
                        }
                    ]
                }
            },
        	assets: {
        		files: [
	        		{   
	        			expand: true,
	        			cwd: '<%= config.dist %>',
	        			src: ['css/**/*.css', 'page/**/*.html']
	        		}
                  ]
        	}
        },

		bust_requirejs_cache: {
			default:{
				options:{
					dist: '<%= config.dist%>',
                    appDir: '<%= config.dist%>',
                    ignorePatterns: ['jquery', 'rs-config', 'moment'],
                    shortHash: true
				},
				files: [{
					expand: true,
					cwd: '<%= config.dist %>',
					src: ['page/**/*.html', 'js/app/widget/*.js'],
					dest: '<%= config.dist%>'
				}]
			}
		},

		replace: {
			dist: {
				options: {
					patterns: [{
                        match: /([\("'])((\.+\/)+)(.*?[\("'])/ig,
                        replacement: function(){
                            return arguments[1] + config.staticHost + arguments[4];
                        }
                    }]
				},
				files: [{
					expand: true,
					cwd: '<%= config.dist %>',
                    src: ['page/**/*.html', 'css/**/*.css', 'js/rs-config.*js', 'js/app/static-config.js'], 
					dest: '<%= config.dist %>'
				}]
			},

            requireconfig: {
                options: {
                    patterns: [{
                        match: /\'\/js\'/ig,
                        replacement: function(){
                            return "'../js'";
                        }
                    }]
                },
                files: [{
                    expand: true, 
                    cwd: '<%= config.dist %>',
                    src: ['js/rs-config.*js'], 
                    dest: '<%= config.dist %>'
                }]
            }
		},

        source_map: {
            bust:{
                options:{
                    dist: '<%= config.dist%>',
                    java: '<%= config.javaFile%>',
                    filename: 'source-map.json'
                },
                files: [{
                    expand: true, 
                    cwd: '<%= config.dist %>',
                    src: ['grunt-cache-bust.json', 'resource-map.json'], 
                    dest: '<%= config.dist %>'
                }]
            },
            debug: {
                options: {
                    nomap: true,
                    java: '<%= config.javaFile%>',
                    filename: 'source-map.json'
                }
            }
        },

        copy: {
            main: {
                options:{},
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>',
                    src: ['js/**/*', 'css/**/*', 'images/**/*'],
                    dest: '<%= config.copyto%>',
                    filter: 'isFile'
                }]
            }
        },

        express: {
            options:{
                port: config.expressPort
            },
            dev: {
                options: {
                    script: 'server/index.js'
                }
            },
            dist: {
                options: {
                    script: 'server/dist.js'
                }
            }
        },
        sprite: {
            defaultOptions: {
                files: [{
                    expand: true,     
                    cwd: '<%= config.webroot %>/less/',  //less or css file to be processed dir 
                    src: ['**/*.less'], 
                    dest: '<%= config.webroot %>/less-sprite/', //dest dir 
                    ext: '.less',  
                    extDot: 'first' 
                }]
            }
        }

	});

	grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-cache-bust-alt');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-bust-requirejs-cache');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-inline-text');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-source-map');
    grunt.loadNpmTasks('grunt-light-sprite');

    grunt.registerTask('dev', ['express:dev', 'watch']);
	grunt.registerTask('debug', [
		'clean',
        'less:dev',
        'inline_text',
        'requirejs:debug',
        'clean:tmpl',
        'replace',
        'source_map:debug'
		]);
	grunt.registerTask('release', [
		'clean',
        'sprite',
        'less:dist',
        'clean:sprite',
        'requirejs:compile',
        'cacheBust',
        'bust_requirejs_cache',
        'replace:requireconfig',
        'replace:dist',
        'source_map:bust'
        ]);

};
