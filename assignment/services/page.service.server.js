var app = require("../../express");
    var pageModel = require("../model/page/page.model.server");
    var websiteModel = require("../model/website/website.model.server");
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findPageByWebsiteId);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req, res){
        var websiteId = req.params.websiteId;
        var page = req.body;

        pageModel.createPage(websiteId, page)
            .then(function(createdPage){
                websiteModel
                    .findWebsiteById(websiteId)
                    .then(function (website) {
                        website.pages.push(createdPage._id);
                        websiteModel
                            .updateWebsite(websiteId, {pages: website.pages})
                            .then(function(msg){
                                res.json(msg);
                            });
                    });

            });
    }

    function findPageByWebsiteId(req, res){
        pageModel.findPageByWebsiteId(req.params.websiteId)
            .then(function(msg){
                res.json(msg);
            });
    }
    function findPageById(req, res) {
        var pageId = req.params.pageId;
        pageModel.findPageById(pageId)
            .then(function(msg){
                res.json(msg);
            }, function (error) {
                res.sendStatus(404);
            });
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var value = req.body;
        pageModel.updatePage(pageId,value)
            .then(function(msg){
                res.json(msg);
            }, function (error) {
                res.sendStatus(404);
            });
    }

    function deletePage(req, res){
        var pageId = req.params.pageId;
        pageModel.deletePage(pageId)
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

