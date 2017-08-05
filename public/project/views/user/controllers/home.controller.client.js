(function() {
        // without dependency it tries to retreive module, with dependency it tries to declaaare a ew module
        angular.module("StockApp").controller("homeController", homeController);
        function homeController( $location) {
            var model = this;
            model.searchStock = searchStock;
            function init(){

            }
            init();
            function searchStock(){
                alert(model.ticker);
                var ticker = model.ticker;
                $location.url("search" + '?' + ticker);
            }
        }
    }
)();