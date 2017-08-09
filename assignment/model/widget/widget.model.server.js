var mongoose = require("mongoose");
var userSchema = require("./widget.schema.server.js");
var db = require("../models.server");
var widgetModel = mongoose.model("widget", userSchema);
var pageSchema = require("../page/page.schema.server.js");
var pageModel = mongoose.model("page", pageSchema);
widgetModel.createWidget = createWidget;
widgetModel.findWidgetsByPageId = findWidgetsByPageId;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

function createWidget(pageId, widget){
    widget._page = pageId;
    return widgetModel.create(widget, function (err){
        if(err){
            console.log("error createWidget");
        }
        else{
            console.log("success createWidget");
        }
    });


}
function updateWidget(widgetId, widget){
    return widgetModel.update({_id: widgetId}, {$set: widget});
}
function deleteWidget(widgetId) {
    return widgetModel.findOne({_id: widgetId}, function(err, widget) {
        widget.remove();

    });
}

function findWidgetById(widgetId) {
    return widgetModel.findOne({_id: widgetId},
        function (err, widget) {
            if (!widget || err) {
                return null;
            }
            else {
                return widget;
            }
        });
}
function findWidgetsByPageId(pageId) {
    // return widgetModel.find({_page: pageId});
    return pageModel.find({_id: pageId}).populate('widgets').exec();
}

function reorderWidget(username, password) {

}

module.exports = widgetModel;


//
