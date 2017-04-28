(function() {
    'use strict';

    angular.module('falconio.modules.stage', [])
    .directive('stage', [function() {
        return {
            restrict: 'C',
            link: function(scope, element, attrs) {
                element.css('transform', 'translateY('+angular.element(window).height()/2+'px)');

                var cloud = angular.element('.media-cloud');

                if (cloud.length) {
                    cloud.css('transform', 'translateY('+(-(angular.element(window).height())/2)+'px)');
                }

                $(window).resize(function() {
                    element.css('transform', 'translateY('+angular.element(window).height()/2+'px)');
                });
            }
        };
    }]);
})();
