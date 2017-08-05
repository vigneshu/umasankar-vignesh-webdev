var app = require("../express");
var request = require("request");
var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
];
var api = 'https://www.quandl.com/api/v3/datatables/ZACKS/AR.json?';
var apiKey = '&api_key=j8KszwxbZP88CfGNqrkJ';
// app.get("/api/search", getStockMeta);

function getStockMeta(req, res){
    console.log("search in server");
    var ticker="ticker="+req.params.ticker;
    var url = api + ticker + apiKey;
    request(url, function(error, response, body) {
        return body;
    });
    return null;
}