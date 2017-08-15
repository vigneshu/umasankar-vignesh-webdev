(function() {
    angular
        .module("StockApp")
        .service("CommentService", CommentService);
    function CommentService($http) {
        var api = {
            "addComment": addComment,
        };
        return api;
        function addComment(userId, activityId, comment){
            console.log("comment ");
            console.log(comment);
            console.log("userId");
            console.log(userId);
            console.log("activityId");
            console.log(activityId);
            console.log("end");
            var url = "/api/project/user/"+userId+"/activity/"+ activityId +"/addComment";
            return $http.post(url, {comment:comment});

        }
    }
})();