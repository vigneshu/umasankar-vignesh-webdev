(function() {
    angular
        .module("WamApp")
        .service("FlickrService", FlickrService);
    function FlickrService($http) {
        var key = "de7014997f01363b7967eadd0eeadd8c";
        var secret = "fff14c431faf3202";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        var api = {
            "searchPhotos": searchPhotos,
        };
        return api;

        function searchPhotos(searchTerm){
            var url = urlBase
                .replace('API_KEY', key)
                .replace('TEXT', searchTerm);
            return $http.get(url);
        }
    }
})();