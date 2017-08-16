(function(){
    angular
        .module("StockApp")
        .controller("registerController",registerController);

    function registerController(UserService, $location){
        var model = this;
        model.createUser = createUser;
        function init(){

        }
        init();

        function createUser(user){
            if(!user || !user.username || !user.password2){
                model.errorMessage = "All fields are required";
                return;
            }
            if(user.password != user.password2){
                model.errorMessage = "Passwords do not match";
                return;
            }
           UserService.findUserByUsername(user.username,user.password )
                .then(function(userResponse){
                var _user = userResponse.data;
                if(_user == 0) {
                    return UserService.createUser(user);
                }
                else{
                    alert("User exists");
                    return null;
                }
            }).
           then(function(data){
               return UserService.findUserByCredentials(user.username,user.password );

           }).
           then(function(data){
               var data = data.data;
               $location.url("/user");

           })
           .catch(function () {
                  console.log("User already exists");
               })


        }
    }
})();