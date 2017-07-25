(function(){
    angular
        .module("WamApp")
        .controller("editWidgetController",editWidgetController);

    function editWidgetController($location, $routeParams, WidgetService) {
        var model = this;
        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.wid;
        model.pid = $routeParams.pid;
        model.wgid = $routeParams.wgid;
        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;
        function init() {
            if (model.wgid){
                model.currentWidget = WidgetService.findWidgetById(model.wgid);
            }
        }
        init();
        function updateWidget() {
            WidgetService.updateWidget(model.currentWidget._id, model.currentWidget);
            $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pid + "/widget");
        }
        function deleteWidget() {
            WidgetService.deleteWidget(model.currentWidget._id);
            $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pid + "/widget");
        }
    }
})();