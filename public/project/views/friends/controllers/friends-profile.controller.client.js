(function() {
        angular.module("StockApp").controller("friendProfileController", friendProfileController);
        function friendProfileController($location, $routeParams, UserService, ActivityService, user) {
            var model = this;
            model.userId = user._id;
            model.user = user;
            model.friendId = $routeParams.userId;
            model.friendData = {};
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



            }
            init();
        }
    }
)();