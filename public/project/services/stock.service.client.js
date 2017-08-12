(function() {
    angular
        .module("StockApp")
        .service("StockService", StockService);
    function StockService($http, $sce, $location) {
        var api = {
            "getStockRating": getStockRating,
            "getStockData": getStockData,
            "getStockNews": getStockNews,
            "getStockUserInfo": getStockUserInfo,
            "followStock": followStock,
        };
        return api;

        function followStock(ticker) {
            var url = "/api/project/getStockUserInfo?userId="+userId ;
            return $http.get(url);
        }
        function getStockUserInfo(userId) {
            var url = "/api/project/getStockUserInfo?userId="+userId ;
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