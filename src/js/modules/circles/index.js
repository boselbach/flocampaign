(function() {
    'use strict';

    angular.module('falconio.modules.circles', [])
    .directive('circles', [function() {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: '/flo/modules/circles/circles.html',
            link: function(scope, element, attrs) {
                angular.forEach(element.find('.circle'), function(item) {
                    var circle = angular.element(item);

                    circle.on('click', function() {
                        var color = circle.data('i')
                    });
                });
            }
        };
    }]);
})();
