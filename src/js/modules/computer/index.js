(function() {
    'use strict';

    angular.module('falconio.modules.computer', [])
    .directive('computer', [function() {
        return {
            templateUrl: "/flo/modules/computer/computer.html",
            replace: true
        };
    }]);
})();
