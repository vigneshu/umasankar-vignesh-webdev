(function () {
    'use strict';
    angular
        .module('StockApp')
        .directive('back', back);

    function back($window) {
        return {
            restrict: 'AEC',
            template:'<a href><span class="fa fa-arrow-left nav-link vu-white"></span></a>',

            link: function (scope, elem, attrs) {
                console.log("sdsaf");
                elem.bind('click', function () {
                    $window.history.back();
                });
            }
        };
    }

})();