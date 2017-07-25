(function() {
    angular
        .module("WamApp")
        .service("WebsiteService", WebsiteService);
    function WebsiteService() {
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];
        var api = {
            "createWebsite": createWebsite,
            "findWebsitesByUser": findWebsitesByUser,
            "findWebsiteById": findWebsiteById,
            "deleteWebsite": deleteWebsite,
            "updateWebsite": updateWebsite,
        };
        return api;

        function createWebsite(userId, name, description){
            console.log(userId + "," + name + "," + description);
            var website = {};
            website._id = (new Date).getTime();
            website.developerId = userId;
            website.name = name;
            website.description = description;
            websites.push(website);
            return;
        }
        function findWebsitesByUser(userId){
            var sites = [];
            for (var w in websites){
                var website = websites[w];
                if(website.developerId == userId){
                    sites.push(website);
                }
            }
            return sites;
        }
        function updateWebsite(websiteId, value){
            for (var w in websites){
                var website = websites[w];
                if(website._id == websiteId){
                    websites[w].name = value.name;
                    websites[w].description = value.description;
                }
            }
        }
        function deleteWebsite(websiteId){
            for (var w in websites){
                var website = websites[w];
                if(website._id == websiteId){
                    websites.splice(w, 1);
                }
            }
        }
        function findWebsiteById(websiteId){
            // var userWebsites = findWebsitesForUserId(userId);
            for (var w in websites){
                var website = websites[w];
                if(website._id == websiteId){
                    return website;
                }
            }
            return null;
        }
    }
})();