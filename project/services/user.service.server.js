var app = require("../../express");
var userModel = require("../model/user/user.model.server");
app.get("/api/project/user/:userId", findUserById);
app.get("/api/project/user", findUser);
app.post("/api/project/user", createUser);
app.put("/api/project/user/:userId", updateUser);
app.delete("/api/project/user/:userId", deleteUser);
app.get("/api/project/:userId/getStockInfo", getStockInfo);
app.put("/api/project/:userId/followFriend", followFriend);
app.put("/api/project/:userId/unFollowFriend", unFollowFriend);
function unFollowFriend(req, res){
    var userId = req.params.userId;
    var friendId = req.query.friendId;
    var user = null;
    var friend = null;
    userModel.findUserById(userId)
        .then(function(msg){
            user = msg;
            return userModel.findUserById(friendId);
        })
        .then(function(msg){
            friend = msg;
            var index = user.following.indexOf(friend._id);
            if (index > -1) {
                user.following.splice(index, 1 );
            }
            index = friend.followers.indexOf(userId);
            if (index > -1) {
                friend.followers.splice(index, 1);
            }
            return userModel.updateUser(userId, user);
        })
        .then(function(msg){
            return userModel.updateUser(friend._id, friend);
        } )
        .then(function(msg){
            res.send(user);
        });
}
function followFriend(req, res){
    var userId = req.params.userId;
    var friendId = req.query.friendId;
    var user = null;
    var friend = null;
    userModel.findUserById(userId)
        .then(function(msg){
            user = msg;
            return userModel.findUserById(friendId);
        })
        .then(function(msg){
            friend = msg;
            var index = user.following.indexOf(friend._id);
            if (index == -1) {
                user.following.push(friend._id);
            }
            index = friend.followers.indexOf(userId);
            if (index == -1) {
                friend.followers.push(userId);
            }
            return userModel.updateUser(userId, user);
        })
        .then(function(msg){
            return userModel.updateUser(friend._id, friend);
        } )
        .then(function(msg){
            res.send(user);
        });
}

function getStockInfo(req, res){
    var userId = req.params.userId;

    userModel.getStockInfo(req.params.userId)
        .then(function(msg){
            res.send(msg);
        });
}

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