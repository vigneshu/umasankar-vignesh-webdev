var mongoose = require("mongoose");
var activitySchema = require("./activity.schema.server.js");
var commentSchema = require("../comment/comment.schema.server.js");
var userSchema = require("../user/user.schema.server.js");
var db = require("../models.server.js");
var activityModel = mongoose.model("project.activity", activitySchema);
var userModel = mongoose.model("project.user", userSchema );
var commentModel = mongoose.model("project.comment", commentSchema);
activityModel.addActivity = addActivity;
activityModel.getActivityForUsers = getActivityForUsers;
activityModel.updateActivity = updateActivity;
activityModel.getActivityById = getActivityById;

function updateActivity(activityId, activity) {
    return activityModel.update({_id: activityId}, {$set: activity},
        function (err, msg) {
            if (err)
            {
                console.log("update error");
                return console.error(err);
            }
            console.log("returning updated activity"+JSON.stringify(activity));
            return activity;
        });
}
function getActivityById (activityId) {
    return activityModel.findOne({_id: activityId},
        function (err, activity) {
            if (!activity|| err) {
                return null;
            }
            else {
                return activity;
            }
        });
}
function addActivity(activity) {
    return activityModel.create(activity);
}
function getActivityForUsers(userIds) {
    // activityModel.find( { "userId" : { id: { $in : userIds } } }, callback );
    console.log("userIds "+userIds);
    // return activityModel.find()
    //     .where('userId')
    //     .in(userIds)
    //     .populate('userId')
    //     .populate('comments')
    //     .populate('comments.userId')
    //     .exec();
    return activityModel.find()
        .where('userId')
        .in(userIds)
        .populate({
        path:  'comments userId',
        populate: {
            path: 'userId',
            model: userModel
        }
    }).exec();


}
module.exports = activityModel;