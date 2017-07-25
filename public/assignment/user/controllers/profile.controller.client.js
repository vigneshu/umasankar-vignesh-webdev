(function() {
        // without dependency it tries to retreive module, with dependency it tries to declare a new module
        angular.module("WamApp").controller("profileController", profileController);
        function profileController($scope, $routeParams, UserService, $rootScope, $location) {
            var model = this;
            var userId = $routeParams.userId;

            model.updateUser = updateUser;
            model.logout = logout;

            function init(){
                var user = UserService.findUserById(userId);
                model.user = user;
                // model.user = user.data;
                // var promise = UserService.findUserByIdHTTP(userId);
                // promise.then(function(user){
                // model.user = user.data;
                // });
            }
            init();
            function logout() {
                $rootScope.currentUser = null;
                $location.url("login");
            }

            function updateUser() {
                var user = UserService.updateUser(model.user._id, model.user);
            }
        }

    }
)();