(function() {
    angular
        .module("StockApp")
        .service("StockService", StockService);
    function StockService($http, $sce, $location) {
        var api = {
            "getStockRating": getStockRating,
            "getStockData": getStockData,
        };
        var proxyUrl = $location.protocol()+ "://"+$location.host()  + "/";// + ":8080/";//$location.host() +
        // var proxyUrl =window.location.hostname;// + ":8080/";//$location.host() +
        alert(proxyUrl);
        var stockRatingApi = proxyUrl + 'https://www.quandl.com/api/v3/datatables/ZACKS/AR.json';
        var stockDataApi =  proxyUrl + 'https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json';
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
            url = proxyUrl + "https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?date=20160912&ticker="+ ticker + apiKey;
            return $http.get(url);
        }
    }
})();