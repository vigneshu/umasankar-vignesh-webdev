var mongoose = require ("mongoose");
var stockSchema = mongoose.Schema(
    {
        ticker: String,
        followDate: {
            type: Date,
            default: Date.now
        },
        isFollowing: Boolean,
        activity: [{type: mongoose.Schema.Types.ObjectId, ref: 'stock.activity'}],
    }, {collection: "project.stock"}
);
module.exports = stockSchema;