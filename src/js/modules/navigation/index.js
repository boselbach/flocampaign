(function() {
    'use strict';

    angular.module('falconio.modules.navigation', [])
    .controller('navigationController', ['$scope', 'AppConfig', function($scope, AppConfig) {
        $scope.routes = AppConfig.getRoutes();
    }]);
})();
