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
                    controller: 'loginController',
                    templateUrl: 'views/user/templates/login.view.client.html',
                    // templateUrl: 'home.view.client.html',
                    // controller: 'homeController',
                    controllerAs: 'model'
                })
                .when("/register", {
                    templateUrl: "views/user/templates/register.view.client.html",
                    controller: "registerController",
                    controllerAs: "model"
                })
                .when('/search', {
                    templateUrl: 'views/search/templates/search.view.client.html',
                    controller: 'searchController',
                    controllerAs: 'model'
                })
                .when('/user/:userId/search', {
                    templateUrl: 'views/search/templates/search.view.client.html',
                    controller: 'searchController',
                    controllerAs: 'model'
                })
                .when('/user/:userId/stock/:ticker', {
                    templateUrl: 'views/stock/templates/stock.view.client.html',
                    controller: 'stockViewController',
                    controllerAs: 'model'
                })
                .when('/user/:userId/friends', {
                    templateUrl: 'views/friends/templates/friends-list.view.client.html',
                    controller: 'friendController',
                    controllerAs: 'model'
                })
                .when('/user/:userId/followers', {
                    templateUrl: 'views/friends/templates/followers-list.view.client.html',
                    controller: 'followersController',
                    controllerAs: 'model'
                })
                .when('/user/:userId', {
                    templateUrl: 'views/user/templates/profile.view.client.html',
                    controller: 'profileController',
                    controllerAs: 'model'
                })
                .when('/user/:userId/activity', {
                    templateUrl: 'views/activity/templates/activity-list.view.client.html',
                    controller: 'activityListController',
                    controllerAs: 'model'
                })

        }
    }
)();