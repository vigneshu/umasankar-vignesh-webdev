(function() {
        // without dependency it tries to retreive module, with dependency it tries to declaaare a ew module
        angular.module("WamApp").controller("homeController", homeController);
        function homeController( $location) {
            function init(){

            }
            init();
        }
    }
)();