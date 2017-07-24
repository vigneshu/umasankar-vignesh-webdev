(function() {
    angular
        .module("WamApp")
        .service("WidgetService", WidgetService);
    function WidgetService() {
        var widgets = [
                { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
                { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                    "url": "http://lorempixel.com/400/200/"},
                { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
                { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                    "url": "https://youtu.be/AM2Ivdi9c4E" },
                { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
            ];
        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
        };
        return api;

        function updateWidget(widgetId, widget){

        }
        function deleteWidget(widgetId){

        }
        function findWidgetById(widgetId){

        }
        function findWidgetsByPageId(pageId){
            var pageWidgets = [];
            for (var w in widgets){
                var widget = widgets[w];
                if(widget.pageId == pageId){
                    pageWidgets.push(widget);
                }
            }
            return pageWidgets;
        }
        function createWidget(userId, name, description){
            var website = {};
            website._id = (new Date).getTime();
            website.developerId = userId;
            website.name = name;
            website.description = description;
            websites.push(website);
            return;
        }
    }
})();