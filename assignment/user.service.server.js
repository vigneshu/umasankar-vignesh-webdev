var app = require("../express");
var users = [
    {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
    {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
    {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
];


app.get("/api/user/:userId", findUserById);
app.get("/api/user", findUser);
app.post("/api/user", createUser);
app.put("/api/user/:userId", updateUser);
app.delete("/api/user/:userId", deleteUser);

function findUserById(req, response) {
    console.log("servers");
    for (var u in users) {
        console.log("req.params.userId ");
        console.log(req.params.userId);
        if(users[u]._id == req.params.userId){
            response.send(users[u]);
            return;
        }
    }
    response.send(null);
}

function findUser(req, response) {
    var username = req.query.username;
    var password = req.query.password;
    if(username && password){
        for (var u in users) {
            var _user = users[u];
            if (_user.username == username && _user.password == password) {
                response.send(_user);
                return;
            }
        }
        response.send(null);
    }
    else if(username){
        for (var u in users) {
            var _user = users[u];
            if (_user.username == username) {
                response.send(_user);
                return;
            }
        }
        response.send(null);
    }
}

function createUser(req, response) {
    var username = req.query.username;
    var password = req.query.password;
    var user = {};
    user.username = username;
    user.password = password;
    user._id = (new Date).getTime();
    users.push(user);;
    response.send(user);
}



function updateUser(req, response) {
    var userId = req.params.userId;
    var user = req.body;
    for (var u in users) {
        var _user = users[u];
        if (_user._id == userId) {
            users[u] = user;
            response.send(user);
            return;
        }
    }
    response.sendStatus(404);
}

function deleteUser(req, response) {
    var userId = req.params.userId;
    for (var u in users) {
        var user = users[u];
        if (user._id == userId) {
            response.send(user);
            users.splice(u, 1);
            return
        }
    }
    response.sendStatus(404);
}