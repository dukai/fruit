module.exports = {
	webroot: 'src',
    dist: 'dist',
    testroot: 'test',
    tstamp: '<%= grunt.template.today("ddmmyyyyhhMMss") %>',
    requirejsExclude: [
        'rs-config', 'jquery', 'moment'
    ],
    staticHost: 'http://localhost:9020/static/',
    javaFile: 'D:\\work\\PCDN\\src\\youcoin-om\\branches\\factor\\youcoinom\\src\\main\\resources',
    copyto: 'D:\\work\\PCDN\\src\\youcoin-om\\branches\\factor\\youcoinom\\src\\main\\webapp\\static',
    expressPort: 9090,
}
