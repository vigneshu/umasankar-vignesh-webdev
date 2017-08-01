(function() {
    angular
        .module("wbdvDirectives", [])
        .directive("sortable", sortable);
    function sortable(){
        function linkFunction(scope, element){
            var initial, final;
            var ul = element.find("ul");
            ul.sortable({
                start: function (event, ui) {
                    initial = $(ui.item).index();
                },
                stop: function (event, ui){
                    final = $(ui.item).index();
                    scope.callback({initial: initial, final: final});
                }

            });

        }
        return{
            scope: {
                callback: '&'
            },
            link: linkFunction
        };
    }

})();