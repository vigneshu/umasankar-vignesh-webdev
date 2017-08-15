var mongoose = require ("mongoose");
var commentSchema = mongoose.Schema(
    {
        activityId:  {type: mongoose.Schema.Types.ObjectId, ref: 'project.activity', required : true},
        date: {
            type: Date,
            default: Date.now
        },
        comment: String,
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'project.user', required : true},
    }, {collection: "project.comment"}
);
module.exports = commentSchema;