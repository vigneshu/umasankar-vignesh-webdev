var app = require("../express");
app.get("/api/user/:userId/website", findWebsitesByUser);
app.post("/api/user/:userId/website", createWebsite);
app.put("/api/website/:websiteId", updateWebsite);
app.get("/api/website/:websiteId", findWebsiteById);
app.delete("/api/website/:websiteId", deleteWebsite);
var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];
function findWebsitesByUser(req, res){
    var userId = req.params.userId;
    var sites = [];
    for (var w in websites){
        var website = websites[w];
        if(website.developerId == userId){
            sites.push(website);
        }
    }
    res.json(sites);
}
function findWebsiteById(req, res){
    var websiteId = req.params.websiteId;
    for (var w in websites){
        var website = websites[w];
        if(website._id == websiteId){
            res.send( website);
            return;
        }
    }
    res.sendStatus( 404);
}
function updateWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var value = req.body;
    for (var w in websites){
        var website = websites[w];
        if(website._id == websiteId){
            websites[w].name = value.name;
            websites[w].description = value.description;
            res.json(website);
            return;
        }
    }
    res.sendStatus(404);
}

function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;
    for (var w in websites){
        var website = websites[w];
        if(website._id == websiteId){
            websites.splice(w, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function createWebsite(req, res){
    var userId = req.params.userId;
    var website = req.body;
    var description = req.params.description;
    var name = req.params.name;
    //TODO check if developer exists and then create
    website._id = (new Date).getTime();
    website.developerId = userId;
    websites.push(website);
    res.json(website);
}