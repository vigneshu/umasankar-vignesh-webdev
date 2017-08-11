(function() {
        // without dependency it tries to retreive module, with dependency it tries to declare a new module
        angular.module("WamApp").controller("profileController", profileController);
        function profileController($scope, $routeParams, UserService, $rootScope, $location, user) {
            var model = this;
            // var userId = $routeParams.userId;
            var userId = user._id;

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