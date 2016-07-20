var http = require('http');
var express = require('express');
var app = require('express')();
var server = http.createServer( app ).listen( process.env.PORT, function() {
    console.log('Express server listening on port ' + process.env.PORT);
});

var engines = require('express-velocity-engine');

app.engine('html', engines.vm);
app.set('views', 'src/vm');
app.set('view engine', 'html');

app.use(express.static('src'));
app.use('/', require('./routers/router'));
