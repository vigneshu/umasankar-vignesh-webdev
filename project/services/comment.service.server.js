var app = require("../../express");
var activityModel = require("../model/activity/activity.model.server");
var commentModel = require("../model/comment/comment.model.server");
var userModel = require("../model/user/user.model.server");
app.post("/api/project/user/:userId/activity/:activityId/addComment", addComment);
app.delete("/api/project/user/:userId/activity/:activityId/comment/:commentId", deleteComment);
function deleteComment(req, res) {
    var activityId = req.params.activityId;
    var commentId = req.params.commentId;
    return commentModel.deleteComment(commentId)
        .then(function(comment){
            console.log("comment deleted going to find activity");
            return activityModel.getActivityById(activityId);
        })
        .then(function(activity){
            console.log("activity found going to update activity");
            console.log(activity);
            var index = activity.comments.indexOf(commentId);
            if(index > -1){
                activity.comments.splice(index, 1);
            }
            return activityModel.updateActivity(activityId, activity);
        })
        .then(function(msg){
            console.log("activity updated");
            res.json(msg);
        })
}

function addComment(req, res) {
    console.log("hey serber");
    var activityId = req.params.activityId;
    var userId = req.params.userId;
    var commentContent = req.body.comment;
    var comment = null;
    console.log("activityId "+activityId);
    console.log("commentContent "+commentContent);
    console.log("userId "+userId);
    return commentModel.addComment({activityId: activityId, comment: commentContent, userId: userId})
        .then(function(msg){
            comment = msg;
            console.log("added comment ");
            console.log(comment);
            return activityModel.getActivityById(activityId);

        })
        .then(function(activity){
            console.log("going to update activity ");
            console.log(activity);
            activity.comments.push(comment._id);
            console.log("after pushing ");
            console.log(activity);
            return activityModel.updateActivity(activityId, activity);

        })
        .then(function(msg){
            console.log("updated activity ");
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
            console.log("activity server following "+following);
            return activityModel.getActivityForUsers(following);
        })
        .then(function(msg){
            console.log("ssdfjh");
            console.log(msg);
            res.json(msg);
        });
}