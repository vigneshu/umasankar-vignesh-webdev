var mongoose = require("mongoose");
var websiteSchema = require("./website.schema.server.js");
var db = require("../database");
var websiteModel = mongoose.model("website", websiteSchema);
websiteModel.findWebsitesByUser = findWebsitesByUser;
websiteModel.createWebsite = createWebsite;
websiteModel.updateWebsite = updateWebsite;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.deleteWebsite = deleteWebsite;

function createWebsite(userId, website){
    website._user = userId;
    return websiteModel.create(website, function (err){
        if(err){
            console.log("error createWebsite");
        }
        else{
            console.log("success createWebsite");
        }
    });


}
function updateWebsite(websiteId, website){
    return websiteModel.update({websiteId: websiteId}, {
        $set: website
    });
}
function deleteWebsite(websiteId) {
    return websiteModel.remove({_id: websiteId});

        // websiteModel.findOne({_id: websiteId}, function(err, website) {
    //     website.remove();
    // });
}

function findWebsiteById(websiteId) {
    return websiteModel.findOne({_id: websiteId},
        function (err, website) {
            if (!website || err) {
                return null;
            }
            else {
                return website;
            }
        });
}


function findWebsitesByUser(userId) {
    return websiteModel.find({_user: userId},
        function (err, website) {
            if (!website || err) {
                return null;
            }
            else {
                return website;
            }
        });
}

module.exports = websiteModel;


//
