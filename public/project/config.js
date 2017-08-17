(function() {
        angular.module("StockApp")
            .config(configuration);
        function configuration($routeProvider) {
            $routeProvider
                .when("/login", {
                    templateUrl: 'views/user/templates/login.view.client.html',
                    controller: "loginController",
                    controllerAs: "model"
                })
                .when('/', {
                    // controller: 'loginController',
                    // templateUrl: 'views/user/templates/login.view.client.html',
                    templateUrl: 'home.view.client.html',
                    controller: 'homeController',
                    controllerAs: 'model'
                })
                .when("/register", {
                    templateUrl: "views/user/templates/register.view.client.html",
                    controller: "registerController",
                    controllerAs: "model"
                })
                .when('/search', {
                    templateUrl: 'home.view.client.html',
                    controller: 'homeController',
                    controllerAs: 'model'
                })
                .when('/user/search', {
                    templateUrl: 'views/search/templates/search.view.client.html',
                    controller: 'searchController',
                    controllerAs: 'model',
                    resolve:{
                        user: checkLogin
                    }
                })
                .when('/user/stock/:ticker', {
                templateUrl: 'views/stock/templates/stock.view.client.html',
                controller: 'stockViewController',
                controllerAs: 'model',
                resolve:{
                    user: checkLogin
                }
            })
            .when('/user/otherUser/:userId', {
                templateUrl: 'views/friends/templates/friend-profile.view.client.html',
                controller: 'friendProfileController',
                controllerAs: 'model',
                resolve:{
                    user: checkLogin
                }
            })

                .when('/user/friends', {
                    templateUrl: 'views/friends/templates/friends-list.view.client.html',
                    controller: 'friendController',
                    controllerAs: 'model',
                    resolve:{
                        user: checkLogin
                    }
                })
                .when('/user/followers', {
                    templateUrl: 'views/friends/templates/followers-list.view.client.html',
                    controller: 'followersController',
                    controllerAs: 'model',
                    resolve:{
                        user: checkLogin
                    }
                })
                .when('/user', {
                    templateUrl: 'views/user/templates/profile.view.client.html',
                    controller: 'profileController',
                    controllerAs: 'model',
                    resolve:{
                            user: checkLogin
                    }
                })
                .when('/user/activity', {
                    templateUrl: 'views/activity/templates/activity-list.view.client.html',
                    controller: 'activityListController',
                    controllerAs: 'model',
                    resolve:{
                        user: checkLogin
                    }
                })
                .when('/user/admin/addUser', {
                    templateUrl: 'views/admin/templates/add-user.view.client.html',
                    controller: 'adminController',
                    controllerAs: 'model',
                    resolve:{
                        user: checkAdmin
                    }
                })
                .when('/user/admin', {
                    templateUrl: 'views/admin/templates/admin.view.client.html',
                    controller: 'adminController',
                    controllerAs: 'model',
                    resolve:{
                        user: checkAdmin
                    }
                })
                .when('/user/:userId/edit', {
                    templateUrl: 'views/admin/templates/profile-edit.view.client.html',
                    controller: 'adminController',
                    controllerAs: 'model',
                    resolve:{
                        user: checkAdmin
                    }
                })
                .when('/user/:userId/editActivities', {
                    templateUrl: 'views/admin/templates/activity-edit.view.client.html',
                    controller: 'activityEditorController',
                    controllerAs: 'model',
                    resolve:{
                        user: checkAdmin
                    }
                })

                function checkLogin($location,UserService, $q){
                    var deferred = $q.defer();
                    UserService
                        .checkLogin()
                        .then(function (user){
                            if(user.data === '0'){
                                deferred.reject()
                                $location.url('/login');
                            } else {
                                deferred.resolve(user.data);
                            }
                        });
                    return deferred.promise;
                }
                function checkAdmin($location,UserService, $q){
                    var deferred = $q.defer();
                    UserService
                        .checkLogin()
                        .then(function (user){
                            console.log("isadmin");
                            console.log(user.data.admin);
                            if(user.data === '0'){
                                deferred.reject()
                                $location.url('/login');
                            } else if (user.data.admin) {
                                deferred.resolve(user.data);
                            }
                            else{
                                deferred.reject()
                                $location.url('/login');
                            }
                        });
                    return deferred.promise;
                }
        }
    }
)();