var mongoose = require("mongoose");
var stockSchema = require("./stock.schema.server.js");
var userSchema = require("./user.schema.server.js");
var db = require("../models.server.js");
var stockModel = mongoose.model("project.stock", stockSchema);
var userModel = mongoose.model("project.user", userSchema);
stockModel.followStock = followStock;
stockModel.createStock = createStock;
stockModel.updateStock = updateStock;
stockModel.addActivity = addActivity;
stockModel.findStockByTicker = findStockByTicker;


function updateStock(stock) {
    return stockModel.update({_id: stockId}, {$set: stock});

}
function createStock(ticker){
    return stockModel.create({ticker: ticker});
}
function findStockByTicker(ticker){
    return stockModel.findOne({ticker: tickers},
        function (err, stock) {
            return stock;
        });
}
function followStock(userId, ticker){
    return userModel.findStockByTicker(userId, ticker, function (stock){
        if(!stock){
            return createStock(ticker);
            // return Promise.resolve();
        }
        return stock;
    }).then(function(stock){
        console.log("stockstock "+stock);
        stock.isFollowing = true;
        return updateStock(stock._id, stock);
    });


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

module.exports = userModel;


//
