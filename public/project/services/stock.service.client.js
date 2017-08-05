(function() {
    angular
        .module("StockApp")
        .service("StockService", StockService);
    function StockService($http, $sce) {
        var api = {
            "getStockMeta": getStockRating,
            "stockDataApi": stockDataApi,
        };
        var stockRatingApi = 'http://localhost:8080/https://www.quandl.com/api/v3/datatables/ZACKS/AR.json';
        var stockDataApi = 'http://localhost:8080/https://www.quandl.com/api/v3/datatables/ZACKS/AR.json';
        var apiKey = '&api_key=itQmxzTptW7AzTot5f8K';
        return api;

        function getStockRating(ticker) {
            var url = stockRatingApi + '?callback=angular.callbacks._0&m_ticker=' + ticker + apiKey ;
            return $http.get(url);
        }
        function getStockData(ticker) {
            var url = stockDataApi + '?callback=angular.callbacks._0&m_ticker=' + ticker + apiKey ;
            return $http.get(url);
        }
    }
})();