(function() {
        angular.module("StockApp").controller("searchController", searchController);
        function searchController($location, $routeParams, StockService) {
            var model = this;
            model.searchResults = "ssss";
            model.searchStock = searchStock;
            model.ticker = $location.search().ticker;
            function init() {
                if(model.ticker){
                    StockService.getStockMeta(model.ticker).then(function(msg){
                        console.log("here");
                        console.log(msg.data);
                        model.searchResults = msg.data;
                    });
                }


            }
            init();
            function searchStock(){

                $location.url("search" + '?ticker=' + model.ticker);
            }
        }
    }
)();