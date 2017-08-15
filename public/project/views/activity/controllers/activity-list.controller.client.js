(function() {
        angular.module("StockApp").controller("activityListController", activityListController);
        function activityListController($route, $routeParams, ActivityService, CommentService) {
            var model = this;
            model.userId = $routeParams.userId;
            model.addComment = addComment;
            function init() {
                //get list of activities
                ActivityService.getActivitiesForUser(model.userId)
                    .then(function(msg){
                        console.log("msg.data");
                        model.activities = msg.data;
                        console.log(msg.data);
                    });

            }
            function addComment(activityId){
                console.log('start');
                var comment = "";
                for (var i in model.activities){
                    if(model.activities[i]._id === activityId){
                        comment = model.activities[i].commentText;
                    }
                }

                console.log(comment);
                console.log("activityId "+activityId);

                console.log(activityId);

                CommentService.addComment(model.userId, activityId, comment)
                    .then(function(){
                        $route.reload();
                    });

            }
            init();

        }
    }
)();