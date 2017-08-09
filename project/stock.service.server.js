var app = require("../express");
var request = require("request");
var https = require("https");
var q = require("q");

var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
];
var api = 'https://www.quandl.com/api/v3/datatables/ZACKS/AR.json?';
var apiKey = '&api_key=itQmxzTptW7AzTot5f8K';
app.get("/api/project/search", getStockRating);
app.get("/api/project/searchData", getStockData);

function getStockRating(req, res){
    var ticker="ticker="+req.query.ticker;
    var url = api + ticker + apiKey;
    var path = '/api/v3/datatables/ZACKS/AR.json?'+ticker+apiKey;
    stockSearchQuery(path)
        .then(function(response){
            res.json(response);

        }, function (error){
            res.sendStatus(404).send(error);
        });
}

function getStockData(req, res){
    var ticker="&ticker="+req.query.ticker;
    var path = "/api/v3/datatables/WIKI/PRICES.json?date=20160912"+ ticker + apiKey;
    stockSearchQuery(path)
        .then(function(response){
            res.json(response);

        }, function (error){
            res.sendStatus(404).send(error);
        });
}
function stockSearchQuery(path){
    var deferred = q.defer();
    https.get({
        host: 'www.quandl.com',
        path:path,
        headers:{
            "Accept": "application/json",
        }
    }, function (response){
        var body = '';
        response.on('data', function (d){

            body+=d;
        });
        response.on('end',function(){
            try{
                body = JSON.parse(body);
                deferred.resolve(body);

            }catch(e){
                deferred.reject({error:e});
            }
        });
    });
    return deferred.promise;

}