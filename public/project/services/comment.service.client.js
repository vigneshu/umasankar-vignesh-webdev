(function() {
    angular
        .module("StockApp")
        .service("CommentService", CommentService);
    function CommentService($http) {
        var api = {
            "addComment": addComment,
            "deleteComment": deleteComment,
        };
        return api;
        function deleteComment(userId, activityId, commentId){
            console.log("comment service client commentId");
            console.log(commentId);
            console.log("comment service client activityId");
            console.log(activityId);
            console.log("commentservice client userId");
            console.log(userId);
            var url = "/api/project/user/"+userId+"/activity/"+activityId+"/comment/"+commentId;
            return $http.delete(url);
        }
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