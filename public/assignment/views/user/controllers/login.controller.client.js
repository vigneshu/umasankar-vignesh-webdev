(function() {
        // without dependency it tries to retreive module, with dependency it tries to declaaare a ew module
        angular.module("WamApp").controller("loginController", loginController);
        function loginController($location, UserService, $rootScope) {
            var model = this;
            //eventhandlers
            model.login = login;

            function init() {

            }
            init();

            function login(user) {
                var userFound = false;
                if(!user || !user.username || !user.password){
                    model.errorMessage = "Both fields are required";
                    return;
                }
                var user = UserService.findUserByCredentials(user.username,user.password );
                if (user != null){
                    model.welocomeUser = user;
                    userFound = true;
                    $rootScope.currentUser = user;
                    $location.url("user" + '/' + user._id);

                }
                if (!userFound)
                    model.errorMessage = "User Not found";
            }
        }
    }
)();