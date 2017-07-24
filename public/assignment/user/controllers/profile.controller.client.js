(function() {
        // without dependency it tries to retreive module, with dependency it tries to declaaare a ew module
        angular.module("WamApp").controller("profileController", profileController);
        //TODO change from global
        function profileController($scope, $routeParams, UserService) {
            var model = this;
            var userId = $routeParams.userId;

            model.updataeUser = updateUser;
            model.unregister = unregister;

            function init(){
                var user = UserService.findUserById(userId);
                model.user = user;
            }
            init();
            function updateUser() {
                var user = UserService.findUserById(user.userId);
            }
            function unregister() {
                var user = UserService.findUserById(user.userId);
            }
        }

    }
)()