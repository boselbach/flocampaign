(function() {
    'use strict';

    angular.module('falconio.templates', [
        'falconio.appConfig'
    ])
    .factory('Templates', ['$http', '$q', 'AppConfig', function($http, $q, AppConfig) {
        var load = function() {
            var routes = AppConfig.getRoutes();
            var promises = [];

            angular.forEach(routes, function(route) {
                var view = ['views', route.view, route.view+'.html'].join('/');

                setTimeout(function() {
                promises.push($http.get(view));    
                });

            });

            return $q.all(promises);
        };

        return {
            load:load
        };
    }]);
})();
