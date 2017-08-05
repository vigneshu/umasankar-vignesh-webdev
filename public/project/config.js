(function() {
        angular.module("StockApp")
            .config(configuration);
        function configuration($routeProvider, $sceDelegateProvider) {
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
                .when('/search', {
                    templateUrl: 'views/search/templates/search.view.client.html',
                    controller: 'searchController',
                    controllerAs: 'model'
                })
        }
    }
)();