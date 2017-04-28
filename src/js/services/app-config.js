(function() {
    'use strict';

    angular.module('falconio.appConfig', [])
    .factory('AppConfig', [function() {
        var routes = [];
        var activeRoute = false;
        var scroll = 0;
        var items = [];

        var registerRoute = function(route) {
            routes.push(route);
        };

        var getRoutes = function() {
            return routes;
        };

        var setActiveRoute = function(route) {
            activeRoute = route;
        };

        var getActiveRoute = function(route) {
            return activeRoute;
        };

        var addItem = function(item) {
            items.push(item);
        };

        var getItems = function() {
            return items;
        }

        return {
            registerRoute: registerRoute,
            getRoutes: getRoutes,
            setActiveRoute: setActiveRoute,
            getActiveRoute: getActiveRoute,
            addItem: addItem,
            getItems: getItems
        };
    }]);
})();
