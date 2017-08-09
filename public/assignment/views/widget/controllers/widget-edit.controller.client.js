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
            if (!model.currentWidget || !model.currentWidget.name) {
                model.msg = "Widget name is required";
                return;
            }
            if(model.currentWidget.type == 'YOUTUBE'){
                if (!model.currentWidget.url) {
                    model.msg = "Widget URL format is incorrect";
                    return;
                }
            }
            if(model.currentWidget.type == 'TEXT' || model.currentWidget.type == "HTML"){
                if (!model.currentWidget.text) {
                    model.msg = "Widget text is required";
                    return;
                }
            }
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