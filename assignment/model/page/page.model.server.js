var mongoose = require("mongoose");
var userSchema = require("./page.schema.server.js");
var db = require("../database");
var userModel = mongoose.model("PageModel", userSchema);
userModel.createUser = createUser;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.findUserById = findUserById;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByUsername = findUserByUsername;

function createUser(user){
    console.log("user model create user");
    console.log(user);
    return userModel.create(user, function (err){
        if(err){
            console.log("error");
        }
        else{
            console.log("success");
        }
    });


}
function updateUser(userId, user){
    return userModel.update({_id: userId}, {
        $set: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }
    });
}
function deleteUser(userId) {
    return userModel.remove({_id: userId});
}

function findUserById(userId) {
    return userModel.findOne({_id: userId},
        function (err, user) {
            if (!user || err) {
                console.log("findUserById error");
                return null;
            }
            else {
                console.log("findUserById success");
                console.log(user);
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
