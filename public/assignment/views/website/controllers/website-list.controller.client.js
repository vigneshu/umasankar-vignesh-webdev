(function(){
    angular
        .module("WamApp")
        .controller("websiteController",websiteController);

    function websiteController($routeParams, WebsiteService){
        var model = this;
        model.user = {};
        model.user._id = $routeParams.userId;
        function init(){
            WebsiteService.findWebsitesByUser(model.user._id)
                .then(function(msg){
                    model.websites = msg.data;
                });
        }
        init();

    }
})();