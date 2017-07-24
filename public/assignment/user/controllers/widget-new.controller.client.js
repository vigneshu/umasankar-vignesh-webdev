(function(){
    angular
        .module("WamApp")
        .controller("newWidgetController",newWidgetController);

    function newWidgetController($location, $routeParams, WidgetService) {
        var model = this;
        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.wid;
        model.pid = $routeParams.pid;
        model.type = $routeParams.type;
        model.createWebsite = createWebsite;
        function init() {

        }
        init();
        function createWebsite(website) {
            if (!website || !website.name) {
                model.msg = "Website name is required";
            }
            else {
                WidgetService.createWebsite(model.userId, website.name, website.description);
                $location.url("/user/" + model.userId + "/website");
            }
        }
    }
})();