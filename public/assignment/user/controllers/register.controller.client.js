(function(){
    angular
        .module("WamApp")
        .controller("registerController",registerController);

    function registerController(UserService, $location){
        var model = this;
        model.registerUser = registerUser;
        function init(){

        }
        init();

        function registerUser(user){
            var _user = UserService.findUserByUsername(user);
            if(!_user) {
                var user = UserService.registerUser(user);
                // alert("test");
                console.log(user);
                $location.url("/profile/" + user._id);
            }
            else{
                console.log("User exists");
            }

        }
    }
})();