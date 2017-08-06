(function() {
    angular
        .module("StockApp")
        .service("StockService", StockService);
    function StockService($http, $sce) {
        var api = {
            "getStockRating": getStockRating,
            "getStockData": getStockData,
        };
        var stockRatingApi = 'http://localhost:8080/https://www.quandl.com/api/v3/datatables/ZACKS/AR.json';
        var stockDataApi = 'http://localhost:8080/https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json';

        var apiKey = '&api_key=itQmxzTptW7AzTot5f8K';
        return api;

        function getStockRating(ticker) {
            var url = stockRatingApi + '?m_ticker='+ticker  + apiKey ;
            return $http.get(url);
        }
        function getStockData(ticker) {
            var date =  new Date().toISOString().slice(0,10).replace(/-/g,"");
            var params = '?date='+date+'&ticker='+ticker;
            var url = stockDataApi + params + apiKey ;
            url = "http://localhost:8080/https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?date=20160912&ticker=FB&api_key=itQmxzTptW7AzTot5f8K";
            return $http.get(url);
        }
    }
})();