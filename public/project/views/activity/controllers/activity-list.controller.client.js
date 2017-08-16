(function() {
        angular.module("StockApp").controller("activityListController", activityListController);
        function activityListController($route, $routeParams, ActivityService, CommentService, UserService, user) {
            var model = this;
            model.userId = user._id;
            model.addComment = addComment;
            function init() {
                //get list of activities
                ActivityService.getActivitiesForUser(model.userId)
                    .then(function(msg){
                        model.activities = msg.data;
                    });
                UserService.findUserById(model.userId)
                    .then(function(msg){
                        model.user = msg.data;
                    })
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