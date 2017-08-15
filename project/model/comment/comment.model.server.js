var mongoose = require("mongoose");
var commentSchema = require("./comment.schema.server.js");
var db = require("../models.server.js");
var commentModel = mongoose.model("project.comment", commentSchema);
commentModel.addComment = addComment;

function addComment(comment) {
    console.log("reached model");
    return commentModel.create(comment);
}
module.exports = commentModel;