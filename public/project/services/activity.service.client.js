(function() {
    angular
        .module("StockApp")
        .service("ActivityService", ActivityService);
    function ActivityService($http) {
        var api = {
            "getActivitiesOfUserAndFriends": getActivitiesOfUserAndFriends,
            "getActivitiesOfUser": getActivitiesOfUser,
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
        function getActivitiesOfUser(userId) {
            var url = "/api/project/user/"+userId+"/getActivitiesOfUser";
            return $http.get(url);
        }
        function getActivitiesOfUserAndFriends(userId) {
            var url = "/api/project/user/"+userId+"/getActivitiesOfUserAndFriends";
            return $http.get(url);
        }
    }
})();