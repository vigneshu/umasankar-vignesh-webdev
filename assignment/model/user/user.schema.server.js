var mongoose = require ("mongoose");
var userSchema = mongoose.Schema(
    {
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'website'}],
        dateCreated: {
            type: Date,
            default: Date.now
        }
    }, {collection: "user"}
);
// userSchema.pre('remove', function(next) {
//     website.remove({_user: this._id}).exec();
//     next();
// });
module.exports = userSchema;