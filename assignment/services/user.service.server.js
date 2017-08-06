var app = require("../../express");
var users = [
    {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
    {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
    {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
];
var userModel = require("../model/user/user.model.server");

app.get("/api/user/:userId", findUserById);
app.get("/api/user", findUser);
app.post("/api/user", createUser);
app.put("/api/user/:userId", updateUser);
app.delete("/api/user/:userId", deleteUser);

function findUserById(req, response) {
    userModel.findUserById(req.params.userId)
        .then(function(msg){
            console.log("user findUserById");
            console.log(msg);
            response.send(msg);
        });
}

function findUser(req, response) {
    var username = req.query.username;
    var password = req.query.password;
    if(username && password){
        userModel.findUserByCredentials(username, password)
            .then(function(msg){
                console.log("user findUserByCredentials");
                console.log(msg);
                response.send(msg);
            });
    }
    else if(username){
        userModel.findUserByUsername(username)
            .then(function(msg){
                console.log("user findUserByUsername");
                console.log(msg);
                response.send(msg);
            });
    }
}

function createUser(req, response) {
    var username = req.query.username;
    console.log("server service create user");
    var password = req.query.password;
    var user = {};
    user.username = username;
    user.password = password;
    userModel.createUser(user)
        .then(function(msg){
            console.log("user created");
            console.log(msg);
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
        .then(function(msg){
            console.log("user userId");
            console.log(msg);
            response.send(msg);
        });
}
