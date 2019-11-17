const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const fs = require('fs');
const logger = require('tracer').console({
    inspectOpt: {
        depth: null
    }
});

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //
// Functions
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //
const atob = (data) => Buffer.from(data, 'base64').toString('ascii');
const btoa = (data) => Buffer.from(data, 'ascii').toString('base64');

// END [Functions] =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //
// Create APP
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //
const app = express();

global.appRoot = path.resolve(__dirname);

app.use('/', express.static('src'));
app.use('/node_modules', express.static('node_modules'));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //
// Routes
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //
app.get('/', function (req, res, next) {
    res.sendFile(__dirname + '/src/index.html');
});

// END [Routes] =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //
// CatchAll Routes
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //
app.get('*', function (req, res, next) {
    var err = new Error();
    err.status = 404;
    err.url = req.url;
    next(err);
});

// Handle 404
app.use(function (err, req, res, next) {
    console.error(err);
    if (err.status == 404) {
        res.status(404);
        res.sendFile(appRoot + '/src/404.html');
    }
});

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //
// Create an HTTP/HTTPS service.
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //
var httpserver = http.createServer(app).listen(3800, function () {
    var host = httpserver.address().address;
    var port = httpserver.address().port;
    logger.log('Node Server listening at http://%s:%s', host, port);
});
// END [Create an HTTP/HTTPS service] =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

