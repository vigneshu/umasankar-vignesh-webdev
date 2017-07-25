(function(){
    angular
        .module("WamApp")
        .controller("websiteController",websiteController);

    function websiteController($routeParams, WebsiteService){
        var model = this;
        model.user = {};
        model.user._id = $routeParams.userId;
        function init(){
            model.websites = WebsiteService.findWebsitesByUser(model.user._id);
        }
        init();

    }
})();