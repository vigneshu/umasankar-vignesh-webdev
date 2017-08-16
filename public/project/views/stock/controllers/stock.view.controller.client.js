(function() {
        angular.module("StockApp").controller("stockViewController", stockViewController);
        function stockViewController( $routeParams, StockService, UserService, user) {
            var model = this;
            var userId = user._id;
            model.ticker = $routeParams.ticker;
            model.stockRating = "";
            model.stockData = "";
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


                }
                UserService.findUserById(model.userId)
                    .then(function(msg){
                        model.user = msg.data;
                    })


            }
            init();
        }
    }
)();