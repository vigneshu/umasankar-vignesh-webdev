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
            "getStockInfo": getStockInfo,
            "deleteUser": deleteUser,
            "followFriend": followFriend,
            "unFollowFriend": unFollowFriend,
        };
        return api;
        function getStockInfo(userId) {
            var url = "/api/project/"+userId+"/getStockInfo";
            return $http.get(url);
        }
        function updateUser(userId, user){
            var url = "/api/project/user/"+userId;
            return $http.put(url, user);
        }
        function findUserByCredentials(username, password) {
            var url = "/api/project/user?username="+username+"&password="+password;
            var user_ = $http.get(url);
            return user_;
        }
        function findUserById(userId) {
           return $http.get("/api/project/user/"+ userId);
        }
        function createUser(user) {
            var url = "/api/project/user?username="+user.username+"&password="+user.password;
            return $http.post(url);

        }
        function findUserByUsername(username) {
            var url = "/api/project/user?username="+username;
            return $http.get(url);
        }
        function unFollowFriend(userId, friendId) {
            var url = "/api/project/"+userId+"/unFollowFriend?friendId="+friendId;
            return $http.put(url);
        }
        function followFriend(userId, friendId) {
            var url = "/api/project/"+userId+"/followFriend?friendId="+friendId;
            return $http.put(url);
        }
        function deleteUser(userId) {
            var url = "/api/user/project/" + userId;
            return $http.delete(url);
        }
    }



})();