var app = require("../../express");
var activityModel = require("../model/activity/activity.model.server");
var userModel = require("../model/user/user.model.server");
app.get("/api/project/user/:userId/getActivitiesOfUserAndFriends", getActivitiesOfUserAndFriends);
app.get("/api/project/user/:userId/getActivitiesOfUser", getActivitiesOfUser);
app.delete("/api/project/user/:userId/activity/:activityId", deleteActivity);

function deleteActivity(req, res) {
    var userId = req.params.userId;
    var activityId = req.params.activityId;
    return activityModel.deleteActivity(activityId)
        .then(function(msg){
            return userModel.findUserById(userId);
        })
        .then(function(user){
            console.log("found user for delete activity");
            console.log(user);
            console.log("activityId");
            console.log(activityId);
            var index = user.activity.indexOf(activityId);

            if(index>-1){
                user.activity.splice(index, 1);
            }
            console.log("index");
            console.log(index);
            console.log("user after ");
            console.log(user);
            console.log(userId);
            return userModel.updateUser(userId, user);
        })
        .then(function(msg){
            res.json(msg);
        })
}
function getActivitiesOfUser(req, res) {
    var userId = req.params.userId;
    console.log("getActivitiesOfUser ");
    return userModel.findUserById(userId)
        .then(function(user){
            console.log("activities ");
            return activityModel.getActivityForUsers([userId]);
        })
        .then(function(msg){
            console.log("ssdfjh");
            console.log(msg);
            res.json(msg);
        });
}
function getActivitiesOfUserAndFriends(req, res) {
    var userId = req.params.userId;

    return userModel.findUserById(userId)
        .then(function(user){
            console.log("activities ");
            var following = user.following;
            following.push(userId);
            return activityModel.getActivityForUsers(following);
        })
        .then(function(msg){
            res.json(msg);
        });
}