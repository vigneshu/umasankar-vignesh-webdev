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
            WebsiteService.findWebsitesByUser(model.userId)
                .then(function(msg){
                model.websites = msg.data;
                });
            WebsiteService.findWebsiteById(model.userId, model.websiteId)
                .then(function(msg){
                model.currentWebsite = msg.data;
                });
        }
        init();
        function updateWebsite() {
            WebsiteService.updateWebsite(model.currentWebsite._id, model.currentWebsite)
                .then(function(){
                    $location.url("/user/" + model.userId + "/website");
                });

        }
        function deleteWebsite() {
            WebsiteService.deleteWebsite(model.currentWebsite._id)
                .then(function(){
                    $location.url("/user/" + model.userId + "/website");
            });

        }
    }
})();