(function() {
    'use strict';

    angular.module('falconio.modules.sky', [])
    .directive('sky', [function() {
        return {
            templateUrl: '/flo/modules/sky/sky.html',
            replace: true
        };
    }]);
})();
