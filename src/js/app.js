(function() {
    'use strict';

    angular.module('falconio', [
        'ngRoute',
        'ngAnimate',
        'falconio.modules',
        'falconio.services',
        'falconio.pages',
        'falconio.services.pages'
    ])
    .provider('routing', [function() {
        var routeProviderReference = false;

        this.setReference = function(reference) {
            routeProviderReference = reference;
        };

        this.$get = [function() {
            return {
                getReference: function() {
                    return routeProviderReference;
                }
            };
        }];
    }])
    .config(['$routeProvider', 'routingProvider', function($routeProvider, routingProvider) {
        routingProvider.setReference($routeProvider);
    }])
    .run(['$rootScope', '$route', '$templateCache', 'routing', 'AppConfig', 'Pages', function($rootScope, $route, $templateCache, routing, AppConfig, Pages) {
        var routeProvider = routing.getReference();
        var routes = AppConfig.getRoutes();

        $rootScope.items = AppConfig.getItems();

        angular.forEach(routes, function(route, i) {
            var view = ['/flo/views', route.view, route.view+'.html'].join('/');

            routeProvider
            .when(route.slug, {
                templateUrl: view,
                controller: route.controller,
                color: route.color,
                index: i,
                step: route.step || false
            });
        });

        $rootScope.$on('$locationChangeStart', function(event, next, current) {
            $rootScope.pageTemplate = '';
        });

        $rootScope.$on('$routeChangeSuccess', function(event, next, current) {
            var index = $route.current.$$route.index;
            var step = $route.current.$$route.step;

            AppConfig.setActiveRoute($route.current.$$route);
            $rootScope.isActive = index;
            $rootScope.activeColor = $route.current.$$route.color;
            $rootScope.trigger = 0;


            var supportsOrientationChange = "onorientationchange" in window,
                orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

            window.addEventListener(orientationEvent, function() {
                var stage = angular.element('.stage');
                if (stage) {
                    stage.css('transform', 'translateY('+angular.element(window).height()/2+'px)');
                }

            }, false);

            if (step) {
                var progressCircle = $('#progress-circle'+index);
                var value = 0;

                clearInterval($rootScope.interval);
                progressCircle.circleProgress({
                    value: 0,
                    fill: { color: '#fff' },
                    size: 30
                });
                progressCircle.circleProgress('redraw');
                progressCircle.circleProgress('value', 0);

                $rootScope.interval = setInterval(function() {
                    value += step;
                    progressCircle.circleProgress('value', value);

                    if (value >= 1.0) {
                        clearInterval($rootScope.interval);
                        setTimeout(function() {
                            Pages.next();
                        }, 300);
                    }
                }, 1000);
            }
        });
    }]);

    angular.element(document).ready(function() {
        angular.bootstrap(document, ['falconio']);
    });
})();
