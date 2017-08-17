var app = require("../../express");
var q = require("q");
var https = require("https");
var stockModel = require("../model/stock/stock.model.server");
var userModel = require("../model/user/user.model.server");
var activityModel = require("../model/activity/activity.model.server");
var api = 'https://www.quandl.com/api/v3/datatables/ZACKS/AR.json?';
// var apiKey = '&api_key=itQmxzTptW7AzTot5f8K';
var apiKey = "&api_key="+process.env.QUANDL_API_KEY;
app.get("/api/project/search", getStockRating);
app.get("/api/project/searchData", getStockData);
app.get("/api/project/searchNews", getStockNews);

app.get("/api/project/:userId/unFollowStock", unFollowStock);
app.get("/api/project/:userId/followStock", followStock);

function followStock(req, res) {
    var userId = req.params.userId;
    var ticker = req.query.ticker;
    var stock = null;
    var user = null;
    userModel.findStockByTickerForUser(userId, ticker)
        .then(function(msg) {
            user = msg;
            return msg;
        })
        .then(function(msg){
            console.log("going to add activity");
            return activityModel.addActivity({userId: userId, ticker: ticker, type:'follow_stock'});

        })
        .then(function(activity) {
            console.log("adding activity im stock collectio array");
            console.log(activity);
            user.activity.push(activity);
            if(user.stocks.length === 0){
                console.log("user stock length 0 going to create ");
                console.log(ticker);
                return stockModel.createStock({ticker:ticker, activity:[activity]});


            }
            else{
                console.log("stock service server returning already following "+user.stocks[0]);
                console.log("SHould not come here");
                console.log("Changing back to following");
                stock = user.stocks[0];
                stock.activity.push(activity);
                stock.isFollowing = true;
                return stockModel.updateStock(stock._id, stock);
            }
        })
        .then(function(msg){
            if(msg){
                console.log("msg "+msg);
                stock = msg;
            }
            return userModel.findUserById(userId);
        })
        .then(function(msg){


                    console.log("userrrr "+msg);
                user = msg;

            var index = user.stocks.indexOf(stock._id);
            console.log("stock "+stock);
            console.log("stock._id "+stock._id);
            console.log("index "+index);
            if(index === -1){
                console.log("stock not there. Therefore pushing");
                user.stocks.push(stock._id);
            }
            console.log("created stock going to find user for updating collection");
            console.log(user);
            return userModel.updateUser(userId, user);

        })
        .then(function(msg2){
            console.log("sendiong msg back to client");
            res.json(stock);

        });


    // stockModel.followStock(req.params.userId, req.query.ticker)
    //     .then(function(msg){
    //         console.log("follow message from server "+msg);
    //         res.send(msg);
    //     });
}

function unFollowStock(req, res) {
    var stock = null;
    var userId = req.params.userId;
    var ticker = req.query.ticker;
    var user = null;
    var activity = null;
    return userModel.findStockByTickerForUser(userId, ticker)
        .then(function(msg) {
            user = msg;
            stock = msg.stocks[0];
            stock.isFollowing = false;
            return stockModel.updateStock(stock._id, stock);
        })
        .then(function(msg){
            return activityModel.addActivity({userId: userId, ticker: ticker, type:'unfollow_stock'});

        })
        .then(function(msg){
            activity = msg;
            return userModel.findUserById(userId);
        })
        .then(function(msg){
            user = msg;
            user.activity.push(activity);
            return userModel.updateUser(userId, user);
        })
        .then(function(msg){
            res.json(stock);
        })
}
function getStockRating(req, res){
    var ticker="ticker="+req.query.ticker;
    var url = api + ticker + apiKey;
    var path = '/api/v3/datatables/ZACKS/AR.json?'+ticker+apiKey;
    var host = 'www.quandl.com';
    stockSearchQuery(host, path)
        .then(function(msg){
            res.json(msg);

        }, function (error){
            res.sendStatus(404).send(error);
        });
}
function getStockNews(req, res) {
    var ticker=req.query.ticker;
    var path = "/v1/api.json?rss_url=http://finance.yahoo.com/rss/headline?s="+ticker;
    var host = 'api.rss2json.com';
    stockSearchQuery(host, path)
        .then(function(msg){
            res.json(msg);

        }, function (error){
            res.sendStatus(404).send(error);
        });
}

function getStockData(req, res){
    var ticker="&ticker="+req.query.ticker;
    var rightNow = new Date();
    var rightNowstr = rightNow.toISOString().slice(0,10).replace(/-/g,"");
    var lDate = new Date();
    lDate.setDate(lDate.getDate() - 3);
    var reslDate = lDate.toISOString().slice(0,10).replace(/-/g,"");
    console.log("lDate"+lDate);
    console.log("reslDate"+reslDate);
    console.log("rightNowstr"+rightNowstr);
    var path = "/api/v3/datatables/WIKI/PRICES.json?date.gte="+reslDate+"&date.lte="+rightNowstr +  ticker + apiKey;

    // var path = "/api/v3/datasets/EOD/AAPL"+ticker+".json??rows=5&order=desc"+ apiKey;
    var host = 'www.quandl.com';
    stockSearchQuery(host, path)
        .then(function(msg){
            res.json(msg);

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