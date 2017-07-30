(function() {
    angular
        .module("WamApp")
        .service("PageService", PageService);
    function PageService($http) {
        var api = {
            "findPageByWebsiteId": findPageByWebsiteId,
            "createPage": createPage,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage,
        };
        return api;

        function createPage(websiteId, page) {
            var url = "/api/website/" + websiteId + "/page";
            return $http.post(url, page);
        }
        function findPageById(pid){
            var url = "/api/page/"+pid;
            return $http.get(url);
        }
        function findPageByWebsiteId(websiteId){
            var url = "/api/website/" + websiteId + "/page";
            return $http.get(url);
        }
        function updatePage(pid, value){
            var url = "/api/page/"+pid;
            return $http.put(url, value);
        }
        function deletePage(pid){
            var url = "/api/page/"+pid;
            return $http.delete(url);
        }
    }
})();