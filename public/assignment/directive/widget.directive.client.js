(function() {
    angular
        .module("WamApp")
        .directive("widgetD", WidgetDirective);
    function WidgetDirective(){
        function linkFunction(scope, element){
            console.log(element);
            var ul = element.find("ul");
            ul.sortable({
                start: function (event, ui) {
                    console.log($(ui.item).index());
                },
                stop: function (event, ui){

                }

            });

        }
        alert("WidgetDirective");
        return{
            templateUrl: "../assignment/views/widget/templates/widget-list.view.client.html",
            link: linkFunction
        };
    }

})();