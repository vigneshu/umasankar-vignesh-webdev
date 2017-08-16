(function() {
    angular
        .module("StockApp")
        .service("ActivityService", ActivityService);
    function ActivityService($http) {
        var api = {
            "getActivitiesForUser": getActivitiesForUser,
            "deleteActivity": deleteActivity,
        };
        return api;
        function deleteActivity(userId, activityId) {
            console.log("service client activityId");
            console.log(activityId);
            console.log("service client userId");
            console.log(userId);
            var url = "/api/project/user/"+userId+"/activity/"+activityId;
            return $http.delete(url);
        }
        function getActivitiesForUser(userId) {
            var url = "/api/project/user/"+userId+"/getActivitiesForUser";
            return $http.get(url);
        }
    }
})();