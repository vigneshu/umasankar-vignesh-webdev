var mongoose = require ("mongoose");
var stockSchema = mongoose.Schema(
    {
        ticker: String,
        followDate: {
            type: Date,
            default: Date.now
        },
        isFollowing: {
            type: Boolean,
            default: true,
        },
        activity: [{type: mongoose.Schema.Types.ObjectId, ref: 'project.activity'}],
    }, {collection: "project.stock"}
);
module.exports = stockSchema;