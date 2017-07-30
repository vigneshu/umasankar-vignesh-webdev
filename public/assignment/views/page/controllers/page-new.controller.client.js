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
            PageService.findPageByWebsiteId(model.websiteId)
                .then(function(msg){
                    model.pages = msg.data;
                });
        }
        init();
        function createPage(page) {
            if (!page || !page.name) {
                model.msg = "Page name is required";
            }
            else {
                PageService.createPage(model.websiteId, page)
                    .then(function(){
                        $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page");
                    });

            }
        }
    }
})();