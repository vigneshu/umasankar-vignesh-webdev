var app = require("../../express");
var activityModel = require("../model/activity/activity.model.server");
app.post("/api/project/:userId/addActivity", addActivity);

function addActivity(req, res) {
    var stockId = req.params.stockId;
    var message = req.body;
    var type = "";
    return activityModel.addActivity(
        {
            stockId: stockId,
            message: message,
            type: type})
        .then(function (msg){
            res.send(msg);
        })
}
