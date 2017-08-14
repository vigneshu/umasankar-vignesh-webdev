var mongoose = require ("mongoose");
var activitySchema = mongoose.Schema(
    {
        ticker: String,
        date: {
            type: Date,
            default: Date.now
        },
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'project.user'},
        friendId: {type: mongoose.Schema.Types.ObjectId, ref: 'project.user'},
        comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'project.comments'}],
    }, {collection: "project.activity"}
);
module.exports = activitySchema;