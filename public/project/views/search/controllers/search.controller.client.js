(function() {
        angular.module("StockApp").controller("searchController", searchController);
        function searchController($location, $route, $routeParams, StockService, UserService, user) {
            //,
            var model = this;
            model.stockRating = "";
            model.userId = user._id;
            model.stockData = "";
            model.stockUserData = {};
            model.stockUserDataDetailed = {};
            model.isFollowingCurrentSearch = false;
            model.ticker = $location.search().ticker;
            model.userStocks = "";

            model.unFollowStock = unFollowStock;
            model.searchStock = searchStock;
            model.followStock = followStock;


            function init() {

                if(model.ticker){
                    model.ticker = model.ticker.toUpperCase();
                    StockService.getStockRating(model.ticker)
                        .then(function(msg){
                            model.stockRating = msg.data;
                        });
                    StockService.getStockData(model.ticker)
                        .then(function(msg){

                        model.stockData = msg.data.datatable.data[0];
                        // var i = model.stockData.length;
                        // var prevTicker  = "";
                        // while (i--) {
                        //     var ticker_t = model.stockData[i][0];
                        //     if(ticker_t === prevTicker)
                        //     {
                        //         model.stockData.splice(i,1);
                        //     }
                        //     prevTicker = ticker_t;
                        //
                        // }
                    });
                    StockService.getStockNews(model.ticker)
                        .then(function(msg){
                            model.stockNews = msg.data;
                        });




                }
                UserService.getStockInfo(model.userId)
                    .then(function(msg){
                        model.stockUserData = msg.data;
                        console.log(model.stockUserData);
                        var stocks = msg.data.stocks;
                        for (var s in stocks){
                            model.userStocks = model.userStocks + stocks[s].ticker + ",";
                            if (stocks[s].ticker == model.ticker){
                                model.isFollowingCurrentSearch = true;
                            }

                        }

                        if(model.userStocks){
                            if (model.userStocks.split(",").length == 2){
                                model.userStocks =  model.userStocks.split(",")[0];
                            }
                            console.log("model.userStocks");
                            console.log(model.userStocks);
                            StockService.getStockData(model.userStocks)
                                .then(function(response){
                                    console.log("response.data.datatable");
                                    console.log(response.data);
                                    model.stockUserDataDetailed = response.data.datatable.data;
                                    // model.stockUserDataDetailed = [response.data.datatable.data[0]];
                                    var i = model.stockUserDataDetailed.length;
                                    var prevTicker  = "";
                                    while (i--) {
                                        var ticker_t = model.stockUserDataDetailed[i][0];
                                        if(ticker_t === prevTicker)
                                        {
                                            model.stockUserDataDetailed.splice(i,1);
                                        }
                                        prevTicker = ticker_t;

                                    }
                                });
                        }


                    });
                UserService.findUserById(model.userId)
                    .then(function(msg){
                        model.user = msg.data;
                    })


            }
            init();
            function followStock(ticker){
                StockService.followStock(model.userId, ticker)
                    .then(function(msg){
                        model.isFollowingCurrentSearch = true;
                        $route.reload();
                    });

            }
            function unFollowStock(ticker){
                StockService.unFollowStock(model.userId, ticker)
                    .then(function(msg){
                        model.isFollowingCurrentSearch = false;
                        $route.reload();
                    })

            }
            function searchStock(){
                if(model.userId){
                    $location.url("user/search/" + '?ticker=' + model.ticker);
                } else{
                    $location.url("search" + '?ticker=' + model.ticker);
                }
            }
            // function render(data) {
            //     return ' <a ng-click="showCase.showName(\'' + data + '\');"> ' + data + '</a>';
            // }
        }
    }
)();