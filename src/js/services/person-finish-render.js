(function() {
    'use strict';

    angular.module('falconio.services.personFinishRender', [])
    .directive('personFinishRender', ['$timeout', function($timeout) {
        return {
            link: function(scope, element, attrs) {
                if (scope.$last === true) {
                    $timeout(function () {
                        console.log('finish loading')
                        scope.$emit('personRepeatFinished');
                    }, attrs.delay);
                }
            }
        };
    }]);
})();
