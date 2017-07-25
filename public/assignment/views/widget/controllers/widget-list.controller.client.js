(function(){
    angular
        .module("WamApp")
        .controller("widgetListController",widgetListController);

    function widgetListController($sce, $routeParams, WidgetService){
        var model = this;
        model.user = {};
        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.wid;
        model.pid = $routeParams.pid;
        model.getTrustAsResourceUrl = getTrustAsResourceUrl;
        model.getSafeHtml = getSafeHtml;
        function init(){
            model.widgets = WidgetService.findWidgetsByPageId(model.pid);
        }
        init();
        function getSafeHtml(html) {
            return $sce.trustAsHtml(html);
        }
        function getTrustAsResourceUrl(url) {
            var urlParts = url.split('/');
            var id = urlParts[urlParts.length - 1];
            var idParts = id.split('=');
            id = idParts[idParts.length - 1];
            url = 'https://www.youtube.com/embed/' + id;
            return $sce.trustAsResourceUrl(url);
        }


    }
})();