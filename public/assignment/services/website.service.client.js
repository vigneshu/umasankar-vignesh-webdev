(function() {
    angular
        .module("WamApp")
        .service("WebsiteService", WebsiteService);
    function WebsiteService($http) {

        var api = {
            "createWebsite": createWebsite,
            "findWebsitesByUser": findWebsitesByUser,
            "findWebsiteById": findWebsiteById,
            "deleteWebsite": deleteWebsite,
            "updateWebsite": updateWebsite,
        };
        return api;

        function createWebsite(userId, website){
            var url = "/api/user/"+userId+"/website";
            return $http.post(url, website);
        }
        function findWebsitesByUser(userId){
            var url = "/api/user/"+userId+"/website";
            return $http.get(url);
        }
        function updateWebsite(websiteId, value){
            var url = "/api/website/"+websiteId;
            return $http.put(url, value);
        }
        function deleteWebsite(websiteId){
            var url = "/api/website/"+websiteId;
            return $http.delete(url);
        }
        function findWebsiteById(userId, websiteId){
            var url = "/api/website/"+websiteId;
            return $http.get(url);
        }
    }
})();