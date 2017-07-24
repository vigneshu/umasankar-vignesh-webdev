(function(){
    angular
        .module("WamApp")
        .controller("editWidgetController",editWidgetController);

    function editWidgetController($location, $routeParams, WidgetService) {
        var model = this;
        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.wid;
        model.pid = $routeParams.pid;
        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;
        function init() {
        }
        function updateWidget() {
            WidgetService.updateWebsiteById(model.currentWebsite._id, model.currentWebsite);
            $location.url("/user/" + model.userId + "/website");
        }
        function deleteWidget() {
            WidgetService.deleteWebsiteById(model.currentWebsite._id);
            $location.url("/user/" + model.userId + "/website");
        }
    }
})();