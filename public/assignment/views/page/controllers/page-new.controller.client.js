(function(){
    angular
        .module("WamApp")
        .controller("newPageController",newPageController);

    function newPageController($location, $routeParams, PageService) {
        var model = this;
        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.wid;
        model.createPage = createPage;
        function init() {
            model.pages = PageService.findPageByWebsiteId(model.websiteId);
        }
        init();
        function createPage(page) {
            if (!page || !page.name) {
                model.msg = "Page name is required";
            }
            else {
                PageService.createPage(model.websiteId, page.name, page.description);
                $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page");
            }
        }
    }
})();