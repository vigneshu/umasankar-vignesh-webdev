var mongoose = require ("mongoose");
var userSchema = mongoose.Schema(
    {
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        stocks: [{type: mongoose.Schema.Types.ObjectId, ref: 'project.stock'}],
        followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'project.user'}],
        following: [{type: mongoose.Schema.Types.ObjectId, ref: 'project.user'}],
        activity: [{type: mongoose.Schema.Types.ObjectId, ref: 'project.activity'}],
        admin: {type: Boolean, default: false},
        google:{
            id: String,
            token:String,
        },
        dateCreated: {
            type: Date,
            default: Date.now
        }
    }, {collection: "project.user"}
);
module.exports = userSchema;