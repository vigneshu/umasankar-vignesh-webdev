var app = require("../../express");
var widgetModel = require("../model/widget/widget.model.server");
var pageModel = require("../model/page/page.model.server");
app.post("/api/page/:pageId/widget", createWidget);
app.get("/api/page/:pageId/widget", findWidgetsByPageId);
app.get("/api/widget/:widgetId", findWidgetById);
app.put("/api/widget/:widgetId", updateWidget);
app.delete("/api/widget/:widgetId", deleteWidget);
app.put("/api/page/:widgetId", updateWidget);
app.put("/api/page/:pageId/widget", updateOrder);
var multer = require('multer'); // npm install multer --save
var upload = multer({dest: __dirname + '/../../public/uploads'});
app.post("/api/upload", upload.single('myFile'), uploadImage);
function updateOrder(req, res) {
    var pageId = req.params.pageId;
    var initial = req.query.initial;
    var final = req.query.final;
    var loopCount = 0;
    //the initial and final values are indices within that particular page's
    // We need to find the indices in the whole page array
    pageModel.findPageById(pageId)
        .then(function(page){
            var item = page.widgets.splice(initial, 1)[0];
            page.widgets.splice(final, 0, item);
            pageModel
                .updatePage(pageId, {widgets: page.widgets})
                .then(function(msg){
                    res.sendStatus(200);
                }, function (error) {
                    res.sendStatus(404);
                });

        }
    );

}

function uploadImage(req, res) {

    var widgetId = req.body.widgetId;
    var width = req.body.width;
    var myFile = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;
    var isNewWidget = false;
    var widget = {}
    widget = JSON.parse(req.body.currentWidget);
    if (widgetId == "") {
        isNewWidget = true;
    }

    if (myFile) {
        var originalname = myFile.originalname; // file name on user's computer
        var filename = myFile.filename;     // new file name in upload folder
        var path = myFile.path;         // full path of uploaded file
        var destination = myFile.destination;  // folder where file is saved to
        var size = myFile.size;
        var mimetype = myFile.mimetype;
        widget.url = '/uploads/' + filename;
    }

    var callbackUrl = "/assignment/#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget";
    widget.type = "IMAGE";
    if (isNewWidget) {
        widgetModel.createWidget(pageId, widget)
            .then(function(createdWidget){
                pageModel
                    .findPageById(pageId)
                    .then(function (page) {
                        page.widgets.push(createdWidget._id);
                        pageModel
                            .updatePage(pageId, {widgets: page.widgets})
                            .then(function(msg){
                                res.redirect(callbackUrl);
                            });
                    });

            });
    }
    else {
        widgetModel.updateWidget(widgetId,widget)
            .then(function(msg){
                res.redirect(callbackUrl);
            });
    }


}

function createWidget(req, res) {
    var pageId = req.params.pageId;
    var widget = req.body;
    widgetModel.createWidget(pageId, widget)
        .then(function(createdWidget){
            pageModel
                .findPageById(pageId)
                .then(function (page) {
                    page.widgets.push(createdWidget._id);
                    pageModel
                        .updatePage(pageId, {widgets: page.widgets})
                        .then(function(msg){
                            res.json(msg);
                        });
                });

        });
}

function findWidgetsByPageId(req, res) {
    var pageId = req.params.pageId;
    var pageWidgets = [];
    widgetModel.findWidgetsByPageId(pageId)
        .then(function(msg){
            res.json(msg[0].widgets);
        });
}

function findWidgetById(req, res) {
    var widgetId = req.params.widgetId;
    widgetModel.findWidgetById(widgetId)
        .then(function(msg){
            res.json(msg);
        }, function (error) {
            res.sendStatus(404);
        });

}


function updateWidget(req, res) {
    var widgetId = req.params.widgetId;
    var value = req.body;
    widgetModel.updateWidget(widgetId,value)
        .then(function(msg){
            res.json(msg);
        }, function (error) {
            res.sendStatus(404);
        });
}

function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;
    var pageId = req.params.pageId;
    widgetModel.deleteWidget(widgetId)
        .then(function(){
            // pageModel
            //     .findPageById(pageId)
            //     .then(function (page) {
            //         var deleteIndex = user.websites.indexOf(websiteId);
            //         user.websites.splice(deleteIndex, 1);
            //         userModel
            //             .updateUser(userId, {websites: user.websites})
            //             .then(function(msg){
            //                 res.sendStatus(200);
            //             });
            //     });
            res.sendStatus(200);
        }, function (error) {
            res.sendStatus(404);
        });

}
