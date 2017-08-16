var mongoose = require("mongoose");
var commentSchema = require("./comment.schema.server.js");
var db = require("../models.server.js");
var commentModel = mongoose.model("project.comment", commentSchema);
commentModel.addComment = addComment;
commentModel.deleteComment = deleteComment;

function addComment(comment) {
    console.log("reached model");
    return commentModel.create(comment);
}
function deleteComment(commentId) {
    return commentModel.findOne({_id: commentId}, function(err, comment) {
        comment.remove();

    });
}
module.exports = commentModel;