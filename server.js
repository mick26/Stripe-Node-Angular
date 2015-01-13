'use strict';

/* ========================================================== 
External Modules/Packages Required
============================================================ */
var fs = require('fs');
var http = require('http');
var https = require('https');   //SSL encryption
var express = require('express');
var path = require('path');
var colours = require('colors');
var logger = require('morgan');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');


/* ========================================================== 
Internal App Modules/Packages Required
============================================================ */
var routes = require('./server/routes.js');				//Exchange routes & mongoose interaction with DB

/* ========================================================== 
OpenSSL credentials - read private key and cert files
Reading them Synchronous - Node will be blocking until files are read
ok in this instance. 
============================================================ */
var privateKey = fs.readFileSync('./server/config/ssl/localhost/server.key'); 
var certificate = fs.readFileSync('./server/config/ssl/localhost/server.crt'); 
var credentials = { key : privateKey, cert: certificate };


/* ========================================================== 
Create a new application with Express
============================================================ */
var app = express();


/* ========================================================== 
Port the server will listen on
============================================================ */
app.set('port', process.env.PORT || 3300);


/* ========================================================== 
serve the static index.html from the public folder
============================================================ */
app.use(express.static(__dirname + '/public')); 


//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//parse application/json
app.use(bodyParser.json()); //needed for req.body


/* ========================================================== 
ROUTES - using Express
============================================================ */
routes(app);


//development only
if (app.get('env') === 'development') {
    app.use(errorHandler({ dumpExceptions: true, showStack: true }));
    app.use(logger('dev')); //log every request to the console in dev
};

//production only
if (app.get('env') === 'production') {
    app.use(errorHandler());
};


/* ========================================================== 
Start server listening on a port
============================================================ */
var secureServer = https.createServer( credentials, app);

secureServer.listen(app.get('port'), function(req, res) {
    console.log('Express Secure (HTTPS) server listening on port ' .green + app.get('port'));
});

