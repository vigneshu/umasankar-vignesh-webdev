(function() {
        // without dependency it tries to retreive module, with dependency it tries to declaaare a ew module
        angular.module("StockApp").controller("loginController", loginController);
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
                 UserService.findUserByCredentials(user.username,user.password )
                    .then(function(user){
                    var user = user.data;
                    if (user != 0){
                        model.welocomeUser = user;
                        userFound = true;
                        $rootScope.currentUser = user;
                        $location.url("user" + '/');

                    }
                    if (!userFound)
                        model.errorMessage = "User Not found";
                });

            }
        }
    }
)();