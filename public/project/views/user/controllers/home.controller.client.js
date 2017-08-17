(function() {
        // without dependency it tries to retreive module, with dependency it tries to declaaare a ew module
        angular.module("StockApp").controller("homeController", homeController);
        function homeController( $location, StockService) {
            var model = this;
            model.searchStock = searchStock;
            model.ticker = $location.search().ticker;
            function init(){
                if(model.ticker){
                    model.ticker = model.ticker.toUpperCase();
                    StockService.getStockRating(model.ticker)
                        .then(function(msg){
                            model.stockRating = msg.data;
                        });
                    StockService.getStockData(model.ticker)
                        .then(function(msg){
                            model.stockData = msg.data.datatable.data[0];
                        });
                    StockService.getStockNews(model.ticker)
                        .then(function(msg){
                            model.stockNews = msg.data;
                        });




                }
            }
            init();
            function searchStock(){
                var ticker = model.ticker;
                $location.url("search" + '?ticker=' + ticker);
            }
        }
    }
)();