(function() {
    angular
        .module("WamApp")
        .factory("UserService", UserService);
    function UserService($http){

        var users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
        ];

        var api = {
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "findUserByIdHTTP": findUserByIdHTTP,
            "findUserByUsername": findUserByUsername,
            "updateUser": updateUser,
            "createUser": createUser,
            "deleteUser": deleteUser,
        };
        return api;
        function updateUser(userId, user){
            for (var u in users) {
                var _user = users[u];
                if (_user._id == userId) {
                    users[u] = user;
                }
            }
        }
        function findUserByCredentials(username, password) {
            for (var u in users) {
                var _user = users[u];
                if (_user.username == username && _user.password == password) {
                    return _user;
                }
            }
            return null;
        }
        function findUserById(userId) {
            for (var u in users) {
                var _user = users[u];
                if (_user._id == userId) {
                    return _user;
                }
            }
            return null;
        }
        function findUserByIdHTTP(userId) {
           return $http.get("http://localhost:3000/users/"+ userId);
        }
        function createUser(user) {
            user._id = (new Date).getTime();
            users.push(user);
            return user;
        }
        function findUserByUsername(username) {
            for (var u in users) {
                var _user = users[u];
                if (_user.username == username) {
                    return _user;
                }
            }
            return null;
        }
        function deleteUser(userId) {
            for (var u in users) {
                var user = users[u];
                if (user._id == userId) {
                    users.splice(u, 1);
                }
            }
        }
    }



})();