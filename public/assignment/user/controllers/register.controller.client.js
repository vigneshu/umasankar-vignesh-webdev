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
            if(!user || !user.username || !user.password2){
                model.errorMessage = "All fields are required";
                return;
            }
            if(user.password != user.password2){
                model.errorMessage = "Passwords do not match";
                return;
            }
            var _user = UserService.findUserByUsername(user);
            if(!_user) {
                var user = UserService.registerUser(user);
                // alert("test");
                console.log(user);
                $location.url("/user/" + user._id);
            }
            else{
                alert("User exists");
            }

        }
    }
})();