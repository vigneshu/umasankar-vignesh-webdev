(function() {
        // without dependency it tries to retreive module, with dependency it tries to declaaare a ew module
        angular.module("WamApp")
            .config(configuration);
        function configuration($routeProvider) {

            $routeProvider
                .when("/login", {
                    templateUrl: "views/user/templates/login.view.client.html",
                    controller: "loginController",
                    controllerAs: "model"
                })
                .when("/register", {
                    templateUrl: "views/user/templates/register.view.client.html",
                    controller: "registerController",
                    controllerAs: "model"
                })
                .when("/user/:userId", {
                    templateUrl: "views/user/templates/profile.view.client.html",
                    controller: "profileController",
                    controllerAs: "model"
                })
                //website routes
                .when("/user/:userId/website", {
                    templateUrl: "views/website/templates/website-list.view.client.html",
                    controller: "websiteController",
                    controllerAs: "model"
                })
            //others
                .when("/user/:userId/website/new", {
                    templateUrl: "views/website/templates/website-new.view.client.html",
                    controller: "newWebsiteController",
                    controllerAs: "model"
                })
                .when("/user/:userId/website/:wid", {
                    templateUrl: "views/website/templates/website-edit.view.client.html",
                    controller: "editWebsiteController",
                    controllerAs: "model"
                })
                .when("/user/:userId/website/:wid/page", {
                    templateUrl: "views/page/templates/page-list.view.client.html",
                    controller: "pageListController",
                    controllerAs: "model"
                })
                .when("/user/:userId/website/:wid/page/new", {
                    templateUrl: "views/page/templates/page-new.view.client.html",
                    controller: "newPageController",
                    controllerAs: "model"
                })
                .when("/user/:userId/website/:wid/page/:pid", {
                    templateUrl: "views/page/templates/page-edit.view.client.html",
                    controller: "editPageController",
                    controllerAs: "model"
                })
                .when("/user/:userId/website/:wid/page/:pid/widget", {
                    templateUrl: "views/widget/templates/widget-list.view.client.html",
                    controller: "widgetListController",
                    controllerAs: "model"
                })
                .when("/user/:userId/website/:wid/page/:pid/widget/new", {
                    templateUrl: "views/widget/templates/widget-chooser.view.client.html",
                    controller: "editWidgetController",
                    controllerAs: "model"
                })
                .when("/user/:userId/website/:wid/page/:pid/widget/:wgid", {
                    templateUrl: "views/widget/templates/widget-edit.view.client.html",
                    controller: "editWidgetController",
                    controllerAs: "model"
                })
                .when('/user/:userId/website/:wid/page/:pid/widget/new/:type', {
                    templateUrl: 'views/widget/templates/widget-new.view.client.html',
                    controller: 'newWidgetController',
                    controllerAs: 'model'
                })
                .when('/', {
                    templateUrl: 'home.view.client.html',
                    controller: 'homeController',
                    controllerAs: 'model'
                })
                .when('/user/:userId/website/:websiteId/page/:pid/widget/:wgid/flickr', {
                    templateUrl: 'views/widget/templates/widget-flickr-search.view.client.html',
                    controller: 'flickrSearchController',
                    controllerAs: 'model'
                })
        }
    }
)()