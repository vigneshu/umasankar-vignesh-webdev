var mongoose = require("mongoose");
var stockSchema = require("../stock/stock.schema.server.js");
var userSchema = require("../user/user.schema.server.js");
var db = require("../models.server.js");
var stockModel = mongoose.model("project.stock", stockSchema);
var userModel = mongoose.model("project.user", userSchema);
stockModel.createStock = createStock;
stockModel.updateStock = updateStock;
stockModel.removeStock = removeStock;
stockModel.findStock = findStock ;

function findStock (userId, ticker) {
    return userModel.findOne({userId: userId, ticker:ticker}, function(err, user) {
       return user;
    });
}
function removeStock(stockId) {
    return stockModel.remove({_id: stockId});
}
function updateStock(stockId, stock) {
    return stockModel.update({_id: stockId}, {$set: stock},
        function (err, msg) {
            if (err)
            {
                console.log("update error stock");
                return console.error(err);
            }
            console.log("returning updated stock"+JSON.stringify(stock));
            return stock;
        });

}
function createStock(stock){
    return stockModel.create(stock);
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
