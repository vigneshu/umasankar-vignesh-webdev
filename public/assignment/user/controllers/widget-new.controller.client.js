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
        model.createWidget = createWidget;
        function init() {
        }
        init();
        function createWidget(widget) {
            widget.widgetType = model.type;
            if (!widget || !widget.name) {
                model.msg = "Widget name is required";
                return;
            }
            if(widget.widgetType == 'YOUTUBE' || widget.widgetType == "IMAGE"){
                if (!widget.url) {
                    model.msg = "Widget URL format is incorrect";
                    return;
                }
            }
            if(widget.widgetType == 'TEXT' || widget.widgetType == "HTML"){
                if (!widget.text) {
                    model.msg = "Widget text is required";
                    return;
                }
            }

            WidgetService.createWidget(model.pid, widget);
            $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pid + "/widget")

        }
    }
})();
