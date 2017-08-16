(function() {
        angular.module("StockApp").controller("activityEditorController", activityEditorController);
        function activityEditorController($route, $routeParams, ActivityService, CommentService, user) {
            //,
            var model = this;
            model.userId = user._id;
            model.editUserId = $routeParams.userId;
            model.deleteActivity = deleteActivity;
            model.deleteComment = deleteComment;
            function init() {
                console.log(model.editUserId);
                ActivityService.getActivitiesForUser(model.editUserId)
                    .then(function(msg){
                        model.activities = msg.data;
                        console.log("activities");
                        console.log( model.activities);
                    });
            }
            init();
            function deleteActivity(activityId){
                console.log("controller activityId");
                console.log(activityId);
                ActivityService.deleteActivity(model.editUserId, activityId)
                    .then(function(msg){
                        console.log("delete complete");
                        console.log(msg.data);
                        $route.reload();
                    })
            }
            function deleteComment(activityId, commentId){
                console.log("controller commentId deleteComment");
                console.log(commentId);
                console.log("controller activityId deleteComment");
                console.log(activityId);
                CommentService.deleteComment(model.editUserId, activityId, commentId)
                    .then(function(msg){
                        console.log("delete complete for comment ");
                        console.log(msg.data);
                        $route.reload();
                    })
            }
        }
    }
)();