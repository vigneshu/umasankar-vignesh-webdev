var mongoose = require ("mongoose");
var activitySchema = mongoose.Schema(
    {
        ticker: String,
        date: {
            type: Date,
            default: Date.now
        },
        type: {
            type: String,
            enum : ['follow_stock','unfollow_stock','follow_friend','unfollow_friend'],
            default: 'error'
        },
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'project.user', required : true},
        friendId: {type: mongoose.Schema.Types.ObjectId, ref: 'project.user'},
        comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'project.comment'}],
    }, {collection: "project.activity"}
);
module.exports = activitySchema;