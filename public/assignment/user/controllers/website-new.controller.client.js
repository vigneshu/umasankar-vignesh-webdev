(function(){
    angular
        .module("WamApp")
        .controller("newWebsiteController",newWebsiteController);

    function newWebsiteController($location, $routeParams, WebsiteService) {
        var model = this;
        model.userId = $routeParams.userId;
        model.createWebsite = createWebsite;
        function init() {
            model.websites = WebsiteService.findWebsitesForUser(model.userId);
        }
        init();
        function createWebsite(website) {
            if (!website || !website.name) {
                model.msg = "Website name is required";
            }
            else {
                WebsiteService.createWebsite(model.userId, website.name, website.description);
                $location.url("/user/" + model.userId + "/website");
            }
        }
    }
})();