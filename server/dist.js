var http = require('http');
var express = require('express');
var app = require('express')();
var server = http.createServer( app ).listen( process.env.PORT, function() {
    console.log('Express server listening on port ' + process.env.PORT);
});

app.use('/', express.static('dist'));