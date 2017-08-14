(function() {
        angular.module("StockApp").controller("followersController", followersController);
        function followersController($location, $routeParams, UserService) {
            var model = this;
            model.userId = $routeParams.userId;
            model.friend =  $location.search().username;
            model.follwerData = {};
            function init() {
                //get list of friends
                UserService.getFollowerDetails(model.userId)
                    .then(function(msg){
                        model.followers = msg.data.followers;
                        console.log("msg.data");
                        console.log(msg.data);
                        console.log("followers");
                        console.log(model.followers);
                        model.userData = msg.data;
                    });


            }
            init();
        }
    }
)();