var app = require("../../express");

app.get("/api/project/user/:userId", findUserById);
app.get("/api/project/user", findUser);
app.post("/api/project/user", createUser);
app.put("/api/project/user/:userId", updateUser);
app.delete("/api/project/user/:userId", deleteUser);
var userModel = require("../model/user/user.model.server");
function findUserById(req, response) {
    userModel.findUserById(req.params.userId)
        .then(function(msg){
            response.send(msg);
        });
}

function findUser(req, response) {
    var username = req.query.username;
    var password = req.query.password;
    if(username && password){
        userModel.findUserByCredentials(username, password)
            .then(function(msg){
                response.send(msg);
            });
    }
    else if(username){
        userModel.findUserByUsername(username)
            .then(function(msg){
                response.send(msg);
            });
    }
}

function createUser(req, response) {
    var username = req.query.username;
    var password = req.query.password;
    var user = {};
    user.username = username;
    user.password = password;
    userModel.createUser(user)
        .then(function(msg){
            response.send(msg);
        });
}



function updateUser(req, response) {
    var userId = req.params.userId;
    var user = req.body;
    userModel.updateUser(userId, user)
        .then(function(status){
            response.json(status);

        }, function (err) {
            response.sendStatus(err);
        });
}

function deleteUser(req, response) {
    var userId = req.params.userId;
    userModel.deleteUser(userId)
        .then(function(){
            response.sendStatus(200);
        }, function (error) {
            response.sendStatus(404);
        });
}