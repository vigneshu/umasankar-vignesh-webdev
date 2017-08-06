var app = require("../../express");
app.get("/api/user/:userId/website", findWebsitesByUser);
app.post("/api/user/:userId/website", createWebsite);
app.put("/api/website/:websiteId", updateWebsite);
app.get("/api/website/:websiteId", findWebsiteById);
app.delete("/api/website/:websiteId", deleteWebsite);
var websiteModel = require("../model/website/website.model.server");
var userModel = require("../model/user/user.model.server");
function findWebsitesByUser(req, res){
    websiteModel.findWebsitesByUser(req.params.userId)
        .then(function(msg){
            res.json(msg);
        });
}
function findWebsiteById(req, res){
    websiteModel.findWebsiteById(req.params.websiteId)
        .then(function(msg){
            res.send(msg);
        });
}
function updateWebsite(req, res) {
    websiteModel.updateWebsite(websiteId,value)
        .then(function(msg){
            res.json(msg);
        });
}

function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;
    websiteModel.deleteWebsite(websiteId)
        .then(function(){
            // userModel
            //     .findUserById(userId)
            //     .then(function (user) {
            //         var deleteIndex = user.websites.indexOf(websiteId);
            //         user.websites.splice(deleteIndex, 1);
            //         userModel
            //             .updateUser(userId, {websites: user.websites})
            //             .then(function(msg){
            //                 res.sendStatus(200);
            //             });
            //     });
            res.sendStatus(200);
        }, function (error) {
            res.sendStatus(404);
        });
}

function createWebsite(req, res) {
    var userId = req.params.userId;
    var website = req.body;
    var description = req.params.description;
    var name = req.params.name;
    websiteModel.createWebsite(userId, website)
        .then(function(createdWebsite){
            userModel
                .findUserById(userId)
                .then(function (user) {
                    user.websites.push(createdWebsite._id);
                    userModel
                        .updateUser(userId, {websites: user.websites})
                        .then(function(msg){
                            res.json(msg);
                        });
                });

        });
}