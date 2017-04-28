(function() {
    'use strict';

    angular.module('falconio.pages.intro', [])
    .run(['AppConfig', function(AppConfig) {
        AppConfig.registerRoute({
            slug: '/',
            view: 'intro',
            controller: 'introController',
            color: '#555669',
            name: 'Welcome',
            step: 0.18
        });
    }])
    .controller('introController', ['$scope', '$timeout', '$q', function($scope, $timeout, $q) {
        $scope.pageClass = 'intro';
        var headline1 = angular.element('h1.first');
        var headline2 = angular.element('h1.second');

        $q.when()
        .then(function() {
            var defer = $q.defer();

            headline1.addClass('animate');

            $timeout(function() {
                defer.resolve();
            }, 2500);

            return defer.promise;
        })
        .then(function() {
            var defer = $q.defer();

            headline1.fadeOut(1000, function() {
                defer.resolve();
            });

            return defer.promise;
        })
        .then(function() {
            var defer = $q.defer();

            headline2.addClass('animate');

            $timeout(function() {
                defer.resolve();
            }, 2000);

            return defer.promise;
        });

    }]);
})();
