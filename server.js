var app = require('./express');
var express = app.express;
var bodyParser = require('body-parser');

// Listen on a specific host via the HOST environment variable
var host = process.env.HOST || '0.0.0.0';
// Listen on a specific port via the PORT environment variable
var port = process.env.PORT || 8080;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

require("./test/app");
require("./assignment/app");
var port = process.env.PORT || 3000;
app.listen(port);