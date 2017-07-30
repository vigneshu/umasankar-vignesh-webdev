(function() {
    angular
        .module("WamApp")
        .service("WidgetService", WidgetService);
    function WidgetService($http) {

        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
        };
        return api;

        function updateWidget(widgetId, value){
            var url = "/api/widget/"+widgetId;
            return $http.put(url, value);
        }
        function deleteWidget(widgetId){
            var url = "/api/widget/"+widgetId;
            return $http.delete(url);
        }
        function findWidgetById(widgetId){
            var url = "/api/widget/"+widgetId;
            return $http.get(url);
        }
        function findWidgetsByPageId(pageId){
            var url = "/api/page/"+ pageId +"/widget";
            return $http.get(url);
        }
        function createWidget(pid, widget){
            var url = "/api/page/"+pid+"/widget";
            return $http.post(url, widget);
        }
    }
})();