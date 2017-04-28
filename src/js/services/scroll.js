(function() {
    'use strict';

    angular.module('falconio.services.scroll', [])
    .run(['$rootScope', 'Pages', 'Scroll', function($rootScope, Pages, Scroll) {
        var indicate = angular.element('.indicate');
        var triggerPoint = $rootScope.triggerPoint || 100;
        var direction;

        // var points = Scroll.getPoints();

        angular.element(document).bind("mousewheel DOMMouseScroll", function(e) {
            var evt = window.event || e;
            var delta = evt.detail? evt.detail*(-1) : evt.wheelDelta;

            $rootScope.trigger = delta > 0 ? $rootScope.trigger+1 : $rootScope.trigger-1;
            indicate.css('width', (Math.abs($rootScope.trigger*(triggerPoint/100)))+'%');

            $rootScope.$broadcast('scroll', $rootScope.trigger);


            if (Math.abs($rootScope.trigger) === triggerPoint) {
                console.log('trigger');
            }

            if ($rootScope.trigger in points) {
                points[$rootScope.trigger]();
            }

            if ($rootScope.trigger == triggerPoint) {
                Pages.next();
            }

            if ($rootScope.trigger == -(triggerPoint)) {
                Pages.prev();
            }


            e.preventDefault();
        });
    }])
    .factory('Scroll', [function() {
        var points = {};

        var registerPoint = function(point, cb) {
            if (!(point in points)) {
                points[point] = [];
            }

            points[point].push(cb);
        };

        var getPoints = function() {
            return points;
        };

        return {
            registerPoint: registerPoint
        };
    }]);
})();
