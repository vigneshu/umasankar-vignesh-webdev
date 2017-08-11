(function() {
    angular
        .module("WamApp")
        .factory("UserService", UserService);
    function UserService($http){
        var api = {
            // "findUserByCredentials": findUserByCredentials,
            "findUserByCredentials": login,
            "findUserById": findUserById,
            "checkLogin": checkLogin,
            "findUserByUsername": findUserByUsername,
            "updateUser": updateUser,
            "createUser": createUser,
            "deleteUser": deleteUser,
        };
        return api;
        function checkLogin(){
            console.log("s");
            return $http.get('/api/checkLogin');

        }
        function updateUser(userId, user){
            var url = "/api/user/"+userId;
            return $http.put(url, user);
        }
        function login(username, password) {
            var url = "/api/login";
            var user_ = $http.post(url, {username:username,password: password});
            return user_;
        }
        function findUserByCredentials(username, password) {
            var url = "/api/user?username="+username+"&password="+password;
            var user_ = $http.get(url);
            return user_;
        }
        function findUserById(userId) {
           return $http.get("/api/user/"+ userId);
        }
        function createUser(user) {
            var url = "/api/user?username="+user.username+"&password="+user.password;
            return $http.post(url);

        }
        function findUserByUsername(username) {
            var url = "/api/user?username="+username;
            return $http.get(url);
        }
        function deleteUser(userId) {
            var url = "/api/user/" + userId;
            return $http.delete(url);
        }
    }



})();