(function() {
    angular
        .module("StockApp")
        .service("StockService", StockService);
    function StockService($http) {
        var api = {
            "getStockRating": getStockRating,
            "getStockData": getStockData,
            "getStockNews": getStockNews,
            "followStock": followStock,
            "unFollowStock": unFollowStock,
        };
        return api;

        function unFollowStock(userId, ticker) {
            var url = "/api/project/"+userId+"/unFollowStock?ticker="+ticker;
            return $http.get(url);
        }
        function followStock(userId, ticker) {
            var url = "/api/project/"+userId+"/followStock?ticker="+ticker;
            return $http.get(url);
        }

        function getStockNews(ticker) {
            var url = "/api/project/searchNews?ticker="+ticker ;
            return $http.get(url);
        }

        function getStockRating(ticker) {
            var url = "/api/project/search?ticker="+ticker ;
            return $http.get(url);
        }
        function getStockData(ticker) {
            var date =  new Date().toISOString().slice(0,10).replace(/-/g,"");
            var params = '?date='+date+'&ticker='+ticker;
            var url = "/api/project/searchData?ticker="+ticker;
            return $http.get(url);
        }
    }
})();