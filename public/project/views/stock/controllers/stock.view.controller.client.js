(function() {
        angular.module("StockApp").controller("stockViewController", stockViewController);
        function stockViewController( $routeParams, StockService, UserService, user) {
            var model = this;
            var userId = user._id;
            model.ticker = $routeParams.ticker;
            model.stockRating = "";
            model.stockData = [];
            model.stockDataColumns = [];
            function init() {
                if(model.ticker){
                    StockService.getStockRating(model.ticker)
                        .then(function(msg){
                            model.stockRating = 0;
                            if(msg.data.datatable.data[0].length > 26)
                                model.stockRating =  Math.ceil(msg.data.datatable.data[0][26]);

                        });
                    StockService.getStockData(model.ticker)
                        .then(function(msg){
                        model.stockData = msg.data.datatable.data;
                        var indexToSplit = 7;
                        var array_len = msg.data.datatable.data[0].length;
                        model.stockData = msg.data.datatable.data[0].slice(0, indexToSplit);
                        model.stockData_2 = msg.data.datatable.data[0].slice(indexToSplit, array_len);
                        model.stockDataColumns = msg.data.datatable.columns.slice(0, indexToSplit);
                        model.stockDataColumns_2 = msg.data.datatable.columns.slice(indexToSplit, array_len);
                    });
                    StockService.getStockNews(model.ticker)
                        .then(function(msg){
                            model.stockNews = msg.data.items;
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