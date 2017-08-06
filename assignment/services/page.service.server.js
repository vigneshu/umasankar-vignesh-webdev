var app = require("../../express");
    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findPageByWebsiteId);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req, res){
        var websiteId = req.params.websiteId;
        var page = req.body;
        page._id = (new Date).getTime();
        page.websiteId = websiteId;
        pages.push(page);
        res.json(page);
    }
    function findPageByWebsiteId(req, res){
        var websiteId = req.params.websiteId;
        console.log(websiteId);
        var websitePages = [];
        for (var p in pages){
            var page = pages[p];
            if(page.websiteId == websiteId){
                websitePages.push(page);
            }
        }
        res.json(websitePages);
    }
    function findPageById(req, res) {
        var pageId = req.params.pageId;
        for (var p in pages){
            var page = pages[p];
            if(page._id == pageId){
                res.json(page);
                return;
            }
        }
        res.sendStatus(404);
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var value = req.body;
        for (var p in pages){
            var page = pages[p];
            if(page._id == pageId){
                pages[p] = value;
                res.json(pages[p]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function deletePage(req, res){
        var pageId = req.params.pageId;
        for (var p in pages){
            var page = pages[p];
            if(page._id == pageId){
                pages.splice(p, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

