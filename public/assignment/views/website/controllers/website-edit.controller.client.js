(function(){
    angular
        .module("WamApp")
        .controller("editWebsiteController",editWebsiteController);

    function editWebsiteController($location, $routeParams, WebsiteService) {
        var model = this;
        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.wid;
        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;
        function init() {
            model.websites = WebsiteService.findWebsitesByUser(model.userId);
            model.currentWebsite = WebsiteService.findWebsiteById(model.websiteId);
        }
        init();
        function updateWebsite() {
            WebsiteService.updateWebsite(model.currentWebsite._id, model.currentWebsite);
            $location.url("/user/" + model.userId + "/website");
        }
        function deleteWebsite() {
            WebsiteService.deleteWebsite(model.currentWebsite._id);
            $location.url("/user/" + model.userId + "/website");
        }
    }
})();