(function(){
    angular
        .module("WamApp")
        .controller("flickrSearchController",flickrSearchController);

    function flickrSearchController($rootScope ,$location, $routeParams, $http, FlickrService, WidgetService) {
        var model = this;
        model.userId = $routeParams.userId;
        $rootScope.flickrURL = "";
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pid;
        model.wgid = $routeParams.wgid;
        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;
        function init() {
        }
        init();


        function searchPhotos(searchTerm) {
            FlickrService
                .searchPhotos(searchTerm)
                .then(function (response) {
                    var data = response.data.replace('jsonFlickrApi(', '');
                    data = data.substring(0, data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        }
        function selectPhoto(photo) {
            var url = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_'
                + photo.secret + '_b.jpg';
            if (model.wgid == '-1') {
                $rootScope.flickrURL = url;
                $location.url('/user/' + model.userId + '/website/' + model.websiteId +
                    '/page/' + model.pageId + '/widget/new/IMAGE');
            }
            else {
                WidgetService.findWidgetById(model.wgid)
                    .then(function (widget) {
                        widget.url = url;
                        WidgetService.updateWidget(model.wgid, widget)
                            .then(function () {
                                $location.url('/user/' + model.userId + '/website/' + model.websiteId +
                                    '/page/' + model.pageId + '/widget');
                            });
                    });
            }
        }


    }
})();