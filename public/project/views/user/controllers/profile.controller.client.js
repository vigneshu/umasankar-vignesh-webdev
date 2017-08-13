(function() {
        // without dependency it tries to retreive module, with dependency it tries to declare a new module
        angular.module("StockApp").controller("profileController", profileController);
        function profileController($scope, $routeParams, UserService, $rootScope, $location) {
            var model = this;
            var userId = $routeParams.userId;

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
                $rootScope.currentUser = null;
                $location.url("login");
            }

            function updateUser() {
                // console.log( model.user);
                // model.user.stocks = [];
                // console.log( model.user);
                UserService.updateUser(model.user._id, model.user)
                    .then(function(user){
                    var user  = user.data;
                    model.msg = "User info updated succesfully";
                });
            }
            function deleteUser() {
                var user = UserService.deleteUser(model.user._id).
                then(function(){
                    $location.url("/login");
                });

            }
        }

    }
)();