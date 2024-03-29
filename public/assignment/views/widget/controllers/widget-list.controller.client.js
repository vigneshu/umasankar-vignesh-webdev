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
        model.updateOrder = updateOrder;
        function init(){
             WidgetService.findWidgetsByPageId(model.pid)
                .then(function(msg){
                    model.widgets = msg.data;
                });
        }
        init();
        function updateOrder(initial, final) {
            WidgetService.updateOrder(model.pid, initial, final);
        }
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