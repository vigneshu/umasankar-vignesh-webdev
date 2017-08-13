var mongoose = require("mongoose");
var stockSchema = require("../stock/stock.schema.server.js");
var userSchema = require("../user/user.schema.server.js");
var db = require("../models.server.js");
var stockModel = mongoose.model("project.stock", stockSchema);
var userModel = mongoose.model("project.user", userSchema);
stockModel.unFollowStock = unFollowStock;
stockModel.createStock = createStock;
stockModel.updateStock = updateStock;
stockModel.addActivity = addActivity;
stockModel.removeStock = removeStock;

function removeStock(stockId) {
    return stockModel.remove({_id: stockId});
}
function updateStock(stock) {
    return stockModel.update({_id: stockId}, {$set: stock});

}
function createStock(ticker){
    return stockModel.create({ticker: ticker});
}
function unFollowStock(userId, ticker){
    var stockId;
    return userModel.findStockByTickerForUser(userId, ticker)
        .then(function(user) {
            return user;
        }).then(function(user) {
            stockId = user.stocks[0]._id;
            return userModel.unFollowStock(user._id, stockId)
        }).then(function(user){
            return removeStock(stockId);
        })
}
function addActivity(activity){
    return stockModel.addActivity(activity);
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

module.exports = stockModel;


//
