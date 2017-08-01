(function() {
    angular
        .module("WamApp")
        .controller("WidgetDirectiveController", WidgetDirectiveController);
    function WidgetDirectiveController(){
        console.log("sss");
        alert("WidgetDirective");
        return{
            templateUrl: "helloworld",
        };
    }

})();