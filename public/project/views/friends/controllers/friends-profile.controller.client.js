(function() {
        angular.module("StockApp").controller("friendProfileController", friendProfileController);
        function friendProfileController($location, $routeParams, UserService, ActivityService, user) {
            var model = this;
            model.userId = user._id;
            model.user = user;
            model.friendId = $routeParams.userId;
            model.friendData = {};
            model.feedContent = {};
            function init() {
                //get list of friends
                UserService.findUserById(model.friendId)
                    .then(function(msg){
                        model.friendData = msg.data;
                    });
                ActivityService.getActivitiesOfUser(model.friendId)
                    .then(function(msg){
                        model.friendActivity = msg.data;
                        console.log(model.friendActivity);
                    });
                model.feedContent['unfollow_stock'] = "unfollowed stock";
                model.feedContent['follow_stock'] = "started following stock";
                model.feedContent['unfollow_friend'] = "unfollowed";
                model.feedContent['follow_friend'] = "started following";



            }
            init();
        }
    }
)();