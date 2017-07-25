(function() {
        // without dependency it tries to retreive module, with dependency it tries to declaaare a ew module
        angular.module("WamApp")
            .config(configuration);
        //TODO change from global
        // var users = [
        //     {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        //     {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        //     {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
        // ];

        function configuration($routeProvider) {

            $routeProvider
                .when("/login", {
                    templateUrl: "user/templates/login.view.client.html",
                    controller: "loginController",
                    controllerAs: "model"
                })
                .when("/register", {
                    templateUrl: "user/templates/register.view.client.html",
                    controller: "registerController",
                    controllerAs: "model"
                })
                .when("/user/:userId", {
                    templateUrl: "user/templates/profile.view.client.html",
                    controller: "profileController",
                    controllerAs: "model"
                })
                //website routes
                .when("/user/:userId/website", {
                    templateUrl: "website/templates/website-list.view.client.html",
                    controller: "websiteController",
                    controllerAs: "model"
                })
            //others
                .when("/user/:userId/website/new", {
                    templateUrl: "website/templates/website-new.view.client.html",
                    controller: "newWebsiteController",
                    controllerAs: "model"
                })
                .when("/user/:userId/website/:wid", {
                    templateUrl: "website/templates/website-edit.view.client.html",
                    controller: "editWebsiteController",
                    controllerAs: "model"
                })
                .when("/user/:userId/website/:wid/page", {
                    templateUrl: "page/templates/page-list.view.client.html",
                    controller: "pageListController",
                    controllerAs: "model"
                })
                .when("/user/:userId/website/:wid/page/new", {
                    templateUrl: "page/templates/page-new.view.client.html",
                    controller: "newPageController",
                    controllerAs: "model"
                })
                .when("/user/:userId/website/:wid/page/:pid", {
                    templateUrl: "page/templates/page-edit.view.client.html",
                    controller: "editPageController",
                    controllerAs: "model"
                })
                .when("/user/:userId/website/:wid/page/:pid/widget", {
                    templateUrl: "widget/templates/widget-list.view.client.html",
                    controller: "widgetListController",
                    controllerAs: "model"
                })
                .when("/user/:userId/website/:wid/page/:pid/widget/new", {
                    templateUrl: "widget/templates/widget-chooser.view.client.html",
                    controller: "editWidgetController",
                    controllerAs: "model"
                })
                .when("/user/:userId/website/:wid/page/:pid/widget/:wgid", {
                    templateUrl: "widget/templates/widget-edit.view.client.html",
                    controller: "editWidgetController",
                    controllerAs: "model"
                })
                .when('/user/:userId/website/:wid/page/:pid/widget/new/:type', {
                    templateUrl: 'widget/templates/widget-new.view.client.html',
                    controller: 'newWidgetController',
                    controllerAs: 'model'
                })
                .when('/', {
                    templateUrl: 'user/home.view.client.html',
                    controller: 'homeController',
                    controllerAs: 'model'
                })
        }
    }
)()