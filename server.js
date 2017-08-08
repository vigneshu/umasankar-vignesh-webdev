var app = require('./express');
var express = app.express;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));
require("./assignment/app");
require("./project/app");
var port = process.env.PORT || 3000;

var host = process.env.PORT ? '0.0.0.0' : '127.0.0.1';
// Listen on a specific port via the PORT environment variable
var port_cors =  8080;
var proxyUrl = "http://localhost:8080/";
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    proxyUrl = process.env.HOST + "/";
}
var cors_proxy = require('cors-anywhere');
cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(port_cors, host, function() {
    console.log('Running CORS Anywhere on ' + host + ':' + port_cors);
});
app.listen(port);