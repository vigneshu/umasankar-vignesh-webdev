(function() {
    angular
        .module("StockApp")
        .service("ActivityService", StockService);
    function StockService($http) {
        var api = {
            "addActivity": addActivity,
        };
        return api;

        function addActivity(userId, ticker, friendId) {
            var url = "/api/project/"+userId+"/addActivity?ticker="+ticker+ "&friendId="+friendId+"&userId="+userId;
            return $http.post(url);
        }
    }
})();