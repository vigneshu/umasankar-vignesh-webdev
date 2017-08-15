var mongoose = require("mongoose");
var userSchema = require("./user.schema.server.js");
var db = require("../models.server.js");
var userModel = mongoose.model("project.user", userSchema);
userModel.createUser = createUser;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.findUserById = findUserById;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByUsername = findUserByUsername;
userModel.getFriendDetails = getFriendDetails;
userModel.getFollowerDetails = getFollowerDetails;
userModel.getStockInfo = getStockInfo;
userModel.findStockByTickerForUser = findStockByTickerForUser;
userModel.getActivityForUser = getActivityForUser;
function findStockByTickerForUser(userId, ticker) {
    return userModel.findOne({_id: userId})
        // .populate( 'stocks' )
        .populate( 'stocks', null, { ticker: ticker } )
        .exec();
}
function getStockInfo(userId) {
    return userModel.findOne({_id: userId})
        .populate('stocks' , null, { isFollowing: true})
        .exec();
}
function getActivityForUser(userId) {
    return userModel.findOne({_id: userId})
        .populate('activity')
        .exec();
}
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
    return userModel.update({_id: userId}, {$set: user},
        function (err, msg) {
            if (err)
            {
                console.log("update error");
                return console.error(err);
            }
            console.log("returning updated user"+JSON.stringify(user));
            return user;
    });
}
function deleteUser(userId) {
    return userModel.findOne({_id: userId}, function(err, user) {
        user.remove();

    });
}

function getFollowerDetails(userId) {
    return userModel.findOne({_id: userId})
        .populate('followers')
        .exec();
}
function getFriendDetails(userId) {
    return userModel.findOne({_id: userId})
        .populate( 'following')
        .exec();
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
    /*
     return userModel.find({_user: userId}).populate('websites', 'name').exec();
     return userModel.find({_user: userId}).populate('reference collection name', 'colname').exec();
     * */
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
