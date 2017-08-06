var mongoose = require("mongoose");
var pageSchema = require("./page.schema.server.js");
var db = require("../database");
var pageModel = mongoose.model("PageModel", pageSchema);
pageModel.createPage = createPage;
pageModel.findPageByWebsiteId = findPageByWebsiteId;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;

function createPage(websiteId, page){
    page._website = websiteId;
    return pageModel.create(page, function (err){
        if(err){
            console.log("error");
        }
        else{
            console.log("success");
        }
    });


}
function findPageByWebsiteId(websiteId){
    return pageModel.find({_website: websiteId});
}
function findPageById(pageId) {
    return pageModel.findOne({_id: pageId});
}

function updatePage(pageId, page) {
    return pageModel.update({_id: pageId}, {
        $set: page
    });
}
function deletePage(pageId) {
    return pageModel.remove({_id: pageId});

    // pageModel.findOne({_id: pageId}, function(err, page) {
    //     page.remove();
    // });
}

module.exports = pageModel;


//
