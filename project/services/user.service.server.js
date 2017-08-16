var app = require("../../express");
var userModel = require("../model/user/user.model.server");
var activityModel = require("../model/activity/activity.model.server");
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username, password)
        .then(
            function(user) {
                if (!user) { return done(null, false); }
                return done(null, user);
            },
            function(err) {
                if (err) { return done(err); }
            }
        );
}

app.post  ('/api/project/login', passport.authenticate('local'), login);
app.post  ('/api/project/logout', logout);
app.get("/api/project/user/:userId", findUserById);
app.get("/api/project/user", findUser);
app.post("/api/project/user", createUser);
app.put("/api/project/user/:userId", updateUser);
app.delete("/api/project/user/:userId", deleteUser);
app.get("/api/project/:userId/getStockInfo", getStockInfo);
app.put("/api/project/:userId/followFriend", followFriend);
app.put("/api/project/:userId/unFollowFriend", unFollowFriend);
app.get("/api/project/user/:userId/getFriendDetails", getFriendDetails);
app.get("/api/project/user/:userId/getFollowerDetails", getFollowerDetails);
app.get("/api/project/user/:userId/getUserList", getUserList);
app.get("/api/project/checkLogin", checkLogin);
function checkLogin(req, res) {
    console.log("checkLogin server");
    res.send(req.isAuthenticated() ? req.user : '0');
}
function login(req, response) {
    var body = req.body;
    var username = body.username;
    var password = body.password;
    userModel.findUserByCredentials(username, password)
        .then(function(msg){
            response.send(msg);
        });
}
function getUserList(req, res){
    console.log("service server");
    var userId = req.params.userId;
    console.log(userId);
    var user = null;
    userModel.findUserById(userId)
        .then(function(msg){
            user = msg;
            if(!user.admin){
                res.sendStatus(404);
            }
            else{
                userModel.getUserList()
                    .then(function(msg){
                        console.log(msg);
                        res.json(msg);

                    })
            }
        });
}
function getFollowerDetails(req, res){
    var userId = req.params.userId;
    userModel.getFollowerDetails(userId)
        .then(function(msg){
            res.send(msg);
        });
}
function getFriendDetails(req, res){
    var userId = req.params.userId;
    userModel.getFriendDetails(userId)
        .then(function(msg){
            res.send(msg);
        });
}
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
            console.log("going to add activity");
            return activityModel.addActivity({userId: userId, friendId:friendId, type:'unfollow_friend'});

        })
        .then(function(activity){
            console.log("follow friend activity");
            console.log(activity);
            console.log(activity);
            user.activity.push(activity);
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
    // var body = req.body;
    // var username = body.username;
    // var password = body.password;
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
    console.log("userId");
    console.log(userId);
    console.log("user");
    console.log(user);
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

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}
function logout(req, res) {
    req.logOut();
    res.send(200);
}