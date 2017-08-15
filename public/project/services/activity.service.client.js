(function() {
    angular
        .module("StockApp")
        .service("ActivityService", ActivityService);
    function ActivityService($http) {
        var api = {
            "getActivitiesForUser": getActivitiesForUser,
        };
        return api;
        function getActivitiesForUser(userId) {
            var url = "/api/project/user/"+userId+"/getActivitiesForUser";
            return $http.get(url);
        }
    }
})();