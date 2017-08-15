(function() {
        angular.module("StockApp").controller("searchController", searchController);
        function searchController($location, $routeParams, $q   , StockService, UserService, $compile, DTOptionsBuilder, DTColumnDefBuilder) {
            //,
            var model = this;
            model.stockRating = "";
            model.userId = $routeParams.userId;
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

                        model.stockData = msg.data;
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
                            StockService.getStockData(model.userStocks)
                                .then(function(response){
                                    model.stockUserDataDetailed = response.data.datatable.data;
                                    // var columns = response.data.datatable.columns;
                                    // var rows = response.data.datatable.data;
                                    // model.dtColumnDefs = [];
                                    //
                                    // for (var col in columns){
                                    //     model.dtColumnDefs.push(DTColumnDefBuilder.newColumnDef(col).withTitle(columns[col].name));
                                    //
                                    // }
                                    // model.dtOptions = DTOptionsBuilder
                                    //     .fromSource(model.stockUserDataDetailed)
                                    //     .withDataProp('0.values');
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
                console.log("follow");
                StockService.followStock(model.userId, ticker)

                    .then(function(msg){
                        console.log("follow then");
                        model.isFollowingCurrentSearch = true;
                        console.log(model.isFollowingCurrentSearch);
                    });

            }
            function unFollowStock(ticker){
                console.log("unfollow");
                StockService.unFollowStock(model.userId, ticker)
                    .then(function(msg){
                        console.log("unfollow then");
                        model.isFollowingCurrentSearch = false;
                        console.log(model.isFollowingCurrentSearch);
                    })

            }
            function searchStock(){
                if(model.userId){
                    $location.url("user/"+model.userId+"/search/" + '?ticker=' + model.ticker);
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