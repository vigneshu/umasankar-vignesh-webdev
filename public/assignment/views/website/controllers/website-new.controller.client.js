(function(){
    angular
        .module("WamApp")
        .controller("newWebsiteController",newWebsiteController);

    function newWebsiteController($location, $routeParams, WebsiteService) {
        var model = this;
        model.userId = $routeParams.userId;
        model.user = {};
        model.user._id = $routeParams.userId;
        model.createWebsite = createWebsite;
        function init() {
            WebsiteService.findWebsitesByUser(model.user._id).
            then(function(msg){
                model.websites = msg.data;
            });
        }
        init();
        function createWebsite(website) {
            if (!website || !website.name) {
                model.msg = "Website name is required";
            }
            else {
                WebsiteService.createWebsite(model.userId, website).
                    then(function(){
                    $location.url("/user/" + model.userId + "/website");
                });
            }
        }
    }
})();