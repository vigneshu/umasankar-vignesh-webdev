(function() {
        angular.module("StockApp").controller("searchController", searchController);
        function searchController($location, $routeParams, StockService, UserService) {
            var model = this;
            model.stockRating = "";
            model.userId = $routeParams.userId;
            model.stockData = "";
            model.stockUserData = {};
            model.searchStock = searchStock;
            model.followStock = followStock;
            model.ticker = $location.search().ticker;
            function init() {
                if(model.ticker){
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
                    StockService.getStockUserInfo(model.userId)
                        .then(function(msg){
                            model.stockUserData = msg.data;
                        });


                }
                UserService.findUserById(model.userId)
                    .then(function(msg){
                        model.user = msg.data;
                    })


            }
            init();
            function followStock(){
                StockService.followStock(model.ticker)
            }
            function searchStock(){
                if(model.userId){
                    $location.url("user/"+model.userId+"/search/" + '?ticker=' + model.ticker);
                } else{
                    $location.url("search" + '?ticker=' + model.ticker);
                }
            }
        }
    }
)();