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
                    templateUrl: 'views/search/templates/search.view.client.html',
                    controller: 'searchController',
                    controllerAs: 'model'
                })
                .when('/user/:userId/search', {
                    templateUrl: 'views/search/templates/search.view.client.html',
                    controller: 'searchController',
                    controllerAs: 'model'
                })
                .when('/user/:userId/:ticker', {
                    templateUrl: 'views/stock/templates/stock.view.client.html',
                    controller: 'stockViewController',
                    controllerAs: 'model'
                })
        }
    }
)();