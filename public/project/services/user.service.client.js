(function() {
    angular
        .module("StockApp")
        .factory("UserService", UserService);
    function UserService($http){
        var api = {
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "updateUser": updateUser,
            "createUser": createUser,
            "deleteUser": deleteUser,
        };
        return api;
        function updateUser(userId, user){
            var url = "/api/user/"+userId;
            return $http.put(url, user);
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