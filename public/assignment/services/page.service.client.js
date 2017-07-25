(function() {
    angular
        .module("WamApp")
        .service("PageService", PageService);
    function PageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];
        var api = {
            "findPageByWebsiteId": findPageByWebsiteId,
            "createPage": createPage,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage,
        };
        return api;

        function createPage(websiteId, name, description) {
            var page = {};
            page._id = (new Date).getTime();
            page.websiteId = websiteId;
            page.name = name;
            page.description = description;
            pages.push(page);
            return;
        }
        function findPageById(pid){
            for (var p in pages){
                var page = pages[p];
                if(page._id == pid){
                    return page;
                }
            }
            return null;
        }
        function findPageByWebsiteId(websiteId){
            var websitePages = [];
            for (var p in pages){
                var page = pages[p];
                if(page.websiteId == websiteId){
                    websitePages.push(page);
                }
            }
            return websitePages;
        }
        function updatePage(pid, value){
            for (var p in pages){
                var page = pages[w];
                if(page._id == pid){
                    pages[p].name = value.name;
                    pages[p].description = value.description;
                }
            }
        }
        function deletePage(pid){
            for (var p in pages){
                var page = pages[p];
                if(page._id == pid){
                    pages.splice(p, 1);
                }
            }
        }
    }
})();