(function() {
        angular.module("StockApp").controller("adminController", adminController);
        function adminController($location,$route, $routeParams, UserService, user) {
            //,
            var model = this;
            model.stockRating = "";
            model.userId = user._id;
            model.current = 'User';
            model.editUserId = null;
            model.deleteUser = deleteUser;
            model.updateUser = updateUser;
            model.createUser = createUser;
            if($routeParams.userId){
                model. editUserId = $routeParams.userId;
            }
            if(!model.editUserId){
                model.editUserId = model.userId;
            }
            function init() {
                UserService.getUserList(model.userId)
                    .then(function(msg){
                        console.log(msg.data);
                        model.userList = msg.data;
                    });
                UserService.findUserById(model.editUserId)
                    .then(function(msg){
                        model.user = msg.data;
                    });
            }
            init();
            function deleteUser(){
                console.log("delete");
                if(model.editUserId === model.userId){
                    alert("Cannot delete admin");
                    return;
                }
                UserService.deleteUser(model.editUserId)
                    .then(function(msg){
                        console.log("delete user then then");
                        $location.url("/user/admin");
                    });

            }
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
                    $location.url("/user/admin");
                })
                    .catch(function () {
                        console.log("User already exists");
                    })
            }
            function updateUser() {
                UserService.updateUser(model.editUserId, model.user)
                    .then(function(user){
                        var user  = user.data;
                        model.msg = "User info updated succesfully";
                    });
            }
        }
    }
)();