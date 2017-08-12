var q = require('q');
var app = require("../../express");
// app.get("/api/test", findAllMessages);
// app.post("/api/test", createMessage);
// app.delete("/api/test/:id", deleteMessage);

// var connectionString = 'mongodb://127.0.0.1:27017/test'; // for local
var connectionString = 'mongodb://127.0.0.1:27017/webdev-assignment'; // for local
// if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
//     var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
//     var password = process.env.MLAB_PASSWORD_WEBDEV;
//     connectionString = 'mongodb://' + username + ':' + password;
//     connectionString += '@ds153412.mlab.com:53412/heroku_7qj3b67v';
// }
// Replace "@ds157268.mlab.com:57268/heroku_nh37fqq4"
// above with your own URL given to you by mLab

var mongoose = require("mongoose");
mongoose.connect(connectionString);
console.log(connectionString);
mongoose.Promise = q.Promise;