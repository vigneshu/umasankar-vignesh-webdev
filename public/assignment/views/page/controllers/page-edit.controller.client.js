(function(){
    angular
        .module("WamApp")
        .controller("editPageController",editPageController);

    function editPageController($location, $routeParams, PageService) {
        var model = this;
        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.wid;
        model.pid = $routeParams.pid;
        model.updatePage = updatePage;
        model.deletePage = deletePage;
        function init() {
            PageService.findPageByWebsiteId(model.websiteId)
                .then(function(msg){
                    model.pages = msg.data;
                });
             PageService.findPageById(model.pid)
                .then(function(msg){
                    model.currentPage = msg.data;
                });
        }
        init();
        function updatePage() {
            PageService.updatePage(model.currentPage._id, model.currentPage)
                .then(function(){
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page");
                });

        }
        function deletePage() {
            PageService.deletePage(model.currentPage._id)
                .then(function(){
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page");
                });
        }
    }
})();