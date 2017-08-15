var app = require("../../express");
var activityModel = require("../model/activity/activity.model.server");
var userModel = require("../model/user/user.model.server");
app.get("/api/project/user/:userId/getActivitiesForUser", getActivitiesForUser);

function getActivitiesForUser(req, res) {
    var userId = req.params.userId;

    return userModel.findUserById(userId)
        .then(function(user){
            console.log("activities ");
            var following = user.following;
            following.push(userId);
            console.log("activity server following "+following);
            return activityModel.getActivityForUsers(following);
        })
        .then(function(msg){
            console.log("ssdfjh");
            console.log(msg);
            res.json(msg);
        });
}