var mongoose = require ("mongoose");
var userSchema = mongoose.Schema(
    {
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        stocks: [{type: mongoose.Schema.Types.ObjectId, ref: 'stock'}],
        dateCreated: {
            type: Date,
            default: Date.now
        }
    }, {collection: "project.user"}
);
module.exports = userSchema;