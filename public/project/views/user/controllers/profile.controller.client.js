(function() {
        // without dependency it tries to retreive module, with dependency it tries to declare a new module
        angular.module("StockApp").controller("profileController", profileController);
        function profileController($scope, $routeParams, UserService, $rootScope, $location, user) {
            var model = this;
            var userId = null;
            userId = user._id;
            console.log("profile controller userId");
            console.log(userId);
            model.updateUser = updateUser;
            model.logout = logout;
            model.deleteUser = deleteUser;

            function init(){
                UserService.findUserById(userId)
                    .then(function(user){
                model.user = user.data;
                });
            }
            init();
            function logout() {
                UserService.logout()
                    .then(function(msg){
                        $rootScope.currentUser = null;
                        $location.url("login");
                    });

            }

            function updateUser() {
                // console.log( model.user);
                // model.user.stocks = [];
                // console.log( model.user);
                UserService.updateUser(userId, model.user)
                    .then(function(user){
                    var user  = user.data;
                    model.msg = "User info updated succesfully";
                });
            }
            function deleteUser() {
                var user = UserService.deleteUser(userId).
                then(function(){
                    $location.url("/login");
                });

            }
        }

    }
)();