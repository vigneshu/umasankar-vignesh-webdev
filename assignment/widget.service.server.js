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
app.put("/api/page/:widgetId", updateWidget);
app.put("/api/page/:pageId/widget", updateOrder);
var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../public/uploads' });
app.post ("/api/upload", upload.single('myFile'), uploadImage);
function uploadImage(req, res) {

    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;
    var isNewWidget = false;
    var widget = {}
    widget = JSON.parse(req.body.currentWidget);
    if(widgetId == ""){
        isNewWidget = true;
        widget._id = (new Date).getTime();
        widget.pageId = pageId ;
    }

    if(myFile)
    {
        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;
        widget.url = '/uploads/'+filename;
    }

    var callbackUrl   = "/assignment/#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget";
    widget.widgetType = "IMAGE";
    if(isNewWidget)
    {
        widgets.push(widget);
    }
    else{
        for (var w in widgets){
            if(widgets[w]._id == widgetId){
                widgets[w] = widget;
            }
        }
    }

    res.redirect(callbackUrl);
}

function updateOrder(req, res) {
    var pageId = req.params.pageId;
    var initial = req.query.initial;
    var actualInitial = req.query.initial;
    var final = req.query.final;
    var actualFinal = req.query.final;
    var loopCount = 0;
    //the initial and final values are indices within that particular page's
    // We need to find the indices in the whole page array
    for (var w in widgets){
        if (widgets[w].pageId == pageId){

            if(loopCount == initial){
                actualInitial = w;
            }
            if(loopCount == final){
                actualFinal = w;
            }
            loopCount++;
        }
    }
    var item = widgets.splice(actualInitial, 1)[0];
    widgets.splice(actualFinal, 0, item);
    res.sendStatus(200);
}
function getWidgetById(widgetId) {
    for (var w in widgets) {
        if (widgets[w]._id == widgetId) {
            return widgets[w];
        }
    }
    return null;
}
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