(function() {
        angular.module("StockApp").controller("searchController", searchController);
        function searchController($location, $routeParams, StockService, UserService) {
            var model = this;
            model.stockRating = "";
            model.userId = $routeParams.userId;
            model.stockData = "asfew";
            model.searchStock = searchStock;
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
                }
                UserService.findUserById(model.userId)
                    .then(function(msg){
                        model.user = msg.data;
                    })


            }
            init();
            function searchStock(){

                $location.url("search" + '?ticker=' + model.ticker);
            }
        }
    }
)();