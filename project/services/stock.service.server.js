var app = require("../../express");
var q = require("q");
var https = require("https");
var stockModel = require("../model/stock/stock.model.server");
var api = 'https://www.quandl.com/api/v3/datatables/ZACKS/AR.json?';
var apiKey = '&api_key=itQmxzTptW7AzTot5f8K';
app.get("/api/project/search", getStockRating);
app.get("/api/project/searchData", getStockData);
app.get("/api/project/searchNews", getStockNews);
app.get("/api/project/:userId/getStockInfo", getStockUserInfo);
app.get("/api/project/:userId/followStock", followStock);

function followStock(req, res) {
    stockModel.followStock(req.params.userId, req.query.ticker)
        .then(function(msg){
            res.send(msg);
        });
}
function getStockUserInfo(req, res){
    var userId = req.params.userId;
    stockModel.getStockUserInfo(req.params.userId)
        .then(function(msg){
            response.send(msg);
        });
}
function getStockRating(req, res){
    var ticker="ticker="+req.query.ticker;
    var url = api + ticker + apiKey;
    var path = '/api/v3/datatables/ZACKS/AR.json?'+ticker+apiKey;
    var host = 'www.quandl.com';
    stockSearchQuery(host, path)
        .then(function(response){
            res.json(response);

        }, function (error){
            res.sendStatus(404).send(error);
        });
}
function getStockNews(req, res) {
    var ticker=req.query.ticker;
    var path = "/v1/api.json?rss_url=http://finance.yahoo.com/rss/headline?s="+ticker;
    var host = 'api.rss2json.com';
    stockSearchQuery(host, path)
        .then(function(response){
            res.json(response);

        }, function (error){
            res.sendStatus(404).send(error);
        });
}

function getStockData(req, res){
    var ticker="&ticker="+req.query.ticker;
    var rightNow = new Date();
    var rightNowstr = rightNow.toISOString().slice(0,10).replace(/-/g,"");
    var lDate = new Date();
    lDate.setDate(lDate.getDate() - 2);
    var reslDate = lDate.toISOString().slice(0,10).replace(/-/g,"");
    var path = "/api/v3/datatables/WIKI/PRICES.json?date.gte="+reslDate+"&date.lte="+rightNowstr +  ticker + apiKey;
    var host = 'www.quandl.com';
    stockSearchQuery(host, path)
        .then(function(response){
            res.json(response);

        }, function (error){
            res.sendStatus(404).send(error);
        });
}
// https://api.rss2json.com/v1/api.json?rss_url=http://finance.yahoo.com/rss/headline?s=yhoo
function stockSearchQuery(host, path){
    var deferred = q.defer();
    https.get({
        // https://
        // host: 'https://feeds.finance.yahoo.com',
        // path:"/rss/2.0/headline?s=yhoo&region=US&lang=en-US",
        //api.rss2json.comhttp://finance.yahoo.com/rss/headline?s=yhoo
        // host: 'api.rss2json.com',
        // path:"/v1/api.json?rss_url=http://finance.yahoo.com/rss/headline?s=yhoo",
        host: host,
        path:path,



        // host: 'www.quandl.com',
        // path:path,
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
                console.log("error");
                deferred.reject({error:e});
            }
        });
    });
    return deferred.promise;

}