(function() {
    'use strict';

    angular.module('falconio.pages.outtro', [])
    .run(['AppConfig', function(AppConfig) {
        AppConfig.registerRoute({
            slug: '/meet-your-customers',
            view: 'outtro',
            controller: 'outtroController',
            preload: true,
            name: 'Meet Your Customers',
            step: false
        });
    }])
    .controller('outtroController', ['$scope', function($scope) {
        $scope.pageClass = 'outtro';
    }]);
})();
