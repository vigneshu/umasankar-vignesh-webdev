(function() {
        angular.module("StockApp").controller("activityListController", activityListController);
        function activityListController($route, $routeParams, ActivityService, CommentService, UserService, user) {
            var model = this;
            model.userId = user._id;
            model.addComment = addComment;
            model.feedContent = {};
            function init() {
                //get list of activities
                ActivityService.getActivitiesOfUserAndFriends(model.userId)
                    .then(function(msg){
                        model.activities = msg.data;
                        for(var a in model.activities ){
                            console.log(model.activities[a]);
                            console.log(model.activities[a].date);
                            // console.log(model.activities[a].date.format("dd mmm yyyy hh:MMtt"));
                        }
                    });
                UserService.findUserById(model.userId)
                    .then(function(msg){
                        model.user = msg.data;
                    })
                model.feedContent['unfollow_stock'] = "unfollowed stock";
                model.feedContent['follow_stock'] = "started following stock";
                model.feedContent['unfollow_friend'] = "unfollowed";
                model.feedContent['follow_friend'] = "started following";
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