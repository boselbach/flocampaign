(function() {
    'use strict';

    angular.module('falconio.services.pages', [
        'falconio.appConfig',
        'falconio.services.keyboard',
        'falconio.pages.intro',
        'falconio.pages.discover',
        'falconio.pages.attract',
        'falconio.pages.engage',
        'falconio.pages.connect',
        'falconio.pages.outtro'
    ])
    .factory('Pages', ['$location', 'AppConfig', function($location, AppConfig) {
        var routes = AppConfig.getRoutes();
        var activeRoute = AppConfig.getActiveRoute();
        var active = 0;

        var prev = function() {
            try {
                active = AppConfig.getActiveRoute();
                window.location.href='#'+routes[active.index-1].slug;
            } catch (e) {}
        };

        var next = function() {
            try {
                active = AppConfig.getActiveRoute();
                window.location.href='#'+routes[active.index+1].slug;
            } catch (e) {}
        };

        return {
            prev: prev,
            next: next
        };
    }]);
})();
