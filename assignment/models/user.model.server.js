var mongoose = require("mongoose");
var userSchema = require("./user.schema.server.js");
var db = require("./database");
var userModel = mongoose.model("UserModel", userSchema);
userModel.createUser = createUser;
module.exports = userModel;

function createUser(user){
    console.log(user);
    return userModel.create(user);

}

function updateUser(userId, user){
    return userModel.update({_id: userId}, user);

}