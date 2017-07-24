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
            model.pages = PageService.findPagesForWebsite(model.websiteId);
            model.currentPage = PageService.findPageById(model.pid);
        }
        init();
        function updatePage() {
            PageService.updatePageById(model.currentPage._id, model.currentPage);
            $location.url("/user/" + model.userId + "/website" + model.websiteId + "/page");
        }
        function deletePage() {
            PageService.deletePageById(model.currentPage._id);
            $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page");
        }
    }
})();