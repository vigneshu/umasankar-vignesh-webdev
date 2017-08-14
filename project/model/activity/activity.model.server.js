var mongoose = require("mongoose");
var activitySchema = require("./activity.schema.server.js");
var db = require("../models.server.js");
var activityModel = mongoose.model("project.activity", activitySchema);
activityModel.addActivity = addActivity;

function addActivity(activity) {
    return activityModel.create(activity);
}
module.exports = activityModel;