(function() {
    angular
        .module("StockApp")
        .factory("UserService", UserService);
    function UserService($http){
        var api = {
            // "findUserByCredentials": findUserByCredentials,
            "findUserByCredentials": login,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "updateUser": updateUser,
            "createUser": createUser,
            "checkLogin": checkLogin,
            "getStockInfo": getStockInfo,
            "deleteUser": deleteUser,
            "followFriend": followFriend,
            "unFollowFriend": unFollowFriend,
            "getFriendDetails": getFriendDetails,
            "getFollowerDetails": getFollowerDetails,
            "logout": logout,
            "getUserList": getUserList,
        };
        return api;
        function getUserList(userId) {
            console.log("service client");
            console.log(userId);
            var url = "/api/project/user/"+ userId+"/getUserList";
            console.log(url);

            return $http.get(url);
        }
        function getFollowerDetails(userId) {
            return $http.get("/api/project/user/"+ userId+"/getFollowerDetails");
        }
        function getFriendDetails(userId) {
            return $http.get("/api/project/user/"+ userId+"/getFriendDetails");
        }
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
            var url = "/api/project/user/" + userId;
            return $http.delete(url);
        }
        function checkLogin(){
            console.log("s");
            return $http.get('/api/project/checkLogin');

        }
        function logout() {
            var url = "/api/project/logout";
            return $http.post(url);
        }
        function login(username, password) {
            var url = "/api/project/login";
            var user_ = $http.post(url, {username:username,password: password});
            return user_;
        }
    }



})();