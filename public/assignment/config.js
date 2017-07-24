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
                    templateUrl: "user/templates/website/website-list.view.client.html",
                    controller: "websiteController",
                    controllerAs: "model"
                })
            //others
                .when("/user/:userId/website/new", {
                    templateUrl: "user/templates/website/website-new.view.client.html",
                    controller: "newWebsiteController",
                    controllerAs: "model"
                })
                .when("/user/:userId/website/:wid", {
                    templateUrl: "user/templates/website/website-edit.view.client.html",
                    controller: "editWebsiteController",
                    controllerAs: "model"
                })
                .when("/user/:userId/website/:wid/page", {
                    templateUrl: "user/templates/pages/page-list.view.client.html",
                    controller: "pageListController",
                    controllerAs: "model"
                })
                .when("/user/:userId/website/:wid/page/new", {
                    templateUrl: "user/templates/pages/page-new.view.client.html",
                    controller: "newPageController",
                    controllerAs: "model"
                })
                .when("/user/:userId/website/:wid/page/:pid", {
                    templateUrl: "user/templates/pages/page-edit.view.client.html",
                    controller: "editPageController",
                    controllerAs: "model"
                })
                .when("/user/:userId/website/:wid/page/:pid/widget", {
                    templateUrl: "user/templates/widget/widget-list.view.client.html",
                    controller: "widgetListController",
                    controllerAs: "model"
                })
                .when("/user/:userId/website/:wid/page/:pid/widget/new", {
                    templateUrl: "user/templates/widget/widget-chooser.view.client.html",
                    controller: "editWidgetController",
                    controllerAs: "model"
                })
                .when('/user/:userId/website/:wid/page/:pid/widget/new/:type', {
                    templateUrl: 'user/templates/widget/widget-new.view.client.html',
                    controller: 'newWidgetController',
                    controllerAs: 'model'
                })
        }
    }
)()