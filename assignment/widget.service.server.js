var app = require("../express");
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


app.post("/api/page/:pageId/widget", createWidget);
app.get("/api/page/:pageId/widget", findWidgetsByPageId);
app.get("/api/widget/:widgetId", findWidgetById);
app.put("/api/widget/:widgetId", updateWidget);
app.delete("/api/widget/:widgetId", deleteWidget);

function createWidget(req, res) {
    var pageId = req.params.pageId;
    var widget = req.body;
    var newWidget = {};
    newWidget = widget;
    newWidget._id = (new Date).getTime();
    newWidget.pageId = pageId ;
    widgets.push(newWidget);
    res.json(widget);
}

function findWidgetsByPageId(req, res) {
    var pageId = req.params.pageId;
    var pageWidgets = [];
    for (var w in widgets){
        var widget = widgets[w];
        if(widget.pageId == pageId){
            pageWidgets.push(widget);
        }
    }
    res.json(pageWidgets);
}

function findWidgetById(req, res) {
    var widgetId = req.params.widgetId;
    for (var w in widgets){
        var widget = widgets[w];
        if(widget._id == widgetId){
            res.json(widget);
            return;
        }
    }
    res.sendStatus(404);
}



function updateWidget(req, res) {
    var widgetId = req.params.widgetId;
    var value = req.body;
    for (var w in widgets){
        if(widgets[w]._id == widgetId){
            widgets[w] = value;
            res.json(value);
            return;
        }
    }
    res.sendStatus(404);
}

function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;
    for (var w in widgets){
        var widget = widgets[w];
        if(widget._id == widgetId){
            widgets.splice(w, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);

}