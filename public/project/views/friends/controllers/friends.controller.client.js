(function() {
        angular.module("StockApp").controller("friendController", friendController);
        function friendController($location, $routeParams, UserService) {
            var model = this;
            model.userId = $routeParams.userId;
            model.friend =  $location.search().username;
            model.isFollowingCurrentSearch = false;
             model.userData = {};
            model.unFollowFriend = unFollowFriend;
            model.searchFriend = searchFriend;
            model.followFriend = followFriend;
            function init() {
                if(model.friend){
                    //get searched user data
                    UserService.findUserByUsername(model.friend)
                        .then(function(msg){
                            console.log("friendData controlelr ");
                            console.log(msg.data);
                            model.friendData = msg.data;
                            console.log( model.friendData.followers);
                            var index = model.friendData.followers.indexOf(model.userId);
                            if(index > -1){
                                model.isFollowingCurrentSearch = true;
                            }
                        });
                }
                //get list of friends
                UserService.findUserById(model.userId)
                    .then(function(msg){
                        model.friends = msg.data.following;
                        model.userData = msg.data;
                    });
            }
            init();
            function followFriend(){
                UserService.followFriend(model.userId, model.friendData._id)
                    .then(function(msg){
                        model.isFollowingCurrentSearch = true;
                        console.log(model.isFollowingCurrentSearch);
                    });

            }
            function unFollowFriend(){
                console.log("here");
                UserService.unFollowFriend(model.userId, model.friendData._id)
                    .then(function(msg){
                        model.isFollowingCurrentSearch = false;
                        console.log(model.isFollowingCurrentSearch);
                    })
            }

            function searchFriend(){
                if(model.friend === model.userData.username){
                    alert("Following yourself isn't a good idea");
                    return;
                }
                if(model.friend){
                    $location.url("user/"+model.userId+"/friends/" + '?username=' + model.friend);
                } else{
                    alert("enter username");
                }
            }
        }
    }
)();