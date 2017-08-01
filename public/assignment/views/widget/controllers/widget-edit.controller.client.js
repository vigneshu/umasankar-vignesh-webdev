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
                WidgetService.findWidgetById(model.wgid)
                .then(function(msg){
                model.currentWidget = msg.data;
                });
            }
        }
        init();
        function updateWidget() {
            WidgetService.updateWidget(model.currentWidget._id, model.currentWidget)
                .then(function(){
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pid + "/widget");
                });

        }
        function deleteWidget() {
            WidgetService.deleteWidget(model.currentWidget._id)
                .then(function(){
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pid + "/widget");
                });

        }
    }
})();