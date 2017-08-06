var mongoose = require("mongoose");
var userSchema = require("./user.schema.server.js");
var db = require("../database");
var userModel = mongoose.model("user", userSchema);
userModel.createUser = createUser;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.findUserById = findUserById;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByUsername = findUserByUsername;

function createUser(user){
    return userModel.create(user, function (err){
        if(err){
            console.log("error createUser");
        }
        else{
            console.log("success createUser");
        }
    });


}
function updateUser(userId, user){
    console.log("uodate user");
    console.log(user);
    return userModel.update({_id: userId}, {$set: user});
}
function deleteUser(userId) {
    return userModel.findOne({_id: userId}, function(err, user) {
        user.remove();

    });
}

function findUserById(userId) {
    return userModel.findOne({_id: userId},
        function (err, user) {
            if (!user || err) {
                return null;
            }
            else {
                return user;
            }
        });
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password},
        function (err, user) {
            if (!user || err) {
                return null;
            }
            else {
                return user;
            }
        });
}

function findUserByUsername(username) {
    return userModel.findOne({username: username},
        function (err, user) {
            if (!user || err) {
                return null;
            }
            else {
                return user;
            }
        });
}

module.exports = userModel;


//
