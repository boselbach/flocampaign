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

        // $rootScope.$on('$viewContentLoaded', function() {
        //      $templateCache.removeAll();
        // });

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

(function() {
    'use strict';

    angular.module('falconio.modules', [
        'falconio.modules.navigation',
        // 'falconio.modules.person',
        'falconio.modules.circles'
    ]);
})();

(function() {
    'use strict';

    angular.module('falconio.pages', [
        'falconio.pages.intro',
        'falconio.pages.discover',
        'falconio.pages.attract',
        'falconio.pages.engage',
        'falconio.pages.connect',
        'falconio.pages.outtro'
    ]);
})();

(function() {
    'use strict';

    angular.module('falconio.services', [
        'falconio.services.pages',
        'falconio.services.keyboard',
    ]);
})();

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


(function() {
    'use strict';

    angular.module('falconio.services.keyboard', [
        'falconio.services.pages'
    ])
    .run(['$document', 'Pages', function($document, Pages) {
        $document.bind('keydown', function(e) {
            switch (e.keyCode) {
                case 37:
                case 38:
                    Pages.prev();
                    break;

                case 39:
                case 40:
                    Pages.next();
                    break;

                default:
                    break;
            }
        });
    }]);
})();

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

(function() {
    'use strict';

    angular.module('falconio.services.scroll', [])
    .run(['$rootScope', 'Pages', 'Scroll', function($rootScope, Pages, Scroll) {
        var indicate = angular.element('.indicate');
        var triggerPoint = $rootScope.triggerPoint || 100;
        var direction;

        // var points = Scroll.getPoints();

        angular.element(document).bind("mousewheel DOMMouseScroll", function(e) {
            var evt = window.event || e;
            var delta = evt.detail? evt.detail*(-1) : evt.wheelDelta;

            $rootScope.trigger = delta > 0 ? $rootScope.trigger+1 : $rootScope.trigger-1;
            indicate.css('width', (Math.abs($rootScope.trigger*(triggerPoint/100)))+'%');

            $rootScope.$broadcast('scroll', $rootScope.trigger);


            if (Math.abs($rootScope.trigger) === triggerPoint) {
                console.log('trigger');
            }

            if ($rootScope.trigger in points) {
                points[$rootScope.trigger]();
            }

            if ($rootScope.trigger == triggerPoint) {
                Pages.next();
            }

            if ($rootScope.trigger == -(triggerPoint)) {
                Pages.prev();
            }


            e.preventDefault();
        });
    }])
    .factory('Scroll', [function() {
        var points = {};

        var registerPoint = function(point, cb) {
            if (!(point in points)) {
                points[point] = [];
            }

            points[point].push(cb);
        };

        var getPoints = function() {
            return points;
        };

        return {
            registerPoint: registerPoint
        };
    }]);
})();

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

(function() {
    'use strict';

    angular.module('falconio.pages.engage', [
        'falconio.appConfig',
        'falconio.modules.person'
    ])
    .run(['AppConfig', function(AppConfig) {
        AppConfig.registerRoute({
            slug: '/engage',
            view: 'engage',
            controller: 'engageController',
            color: '#8F53A1',
            step: 0.16
        });
    }])
    .controller('engageController', ['$scope', function($scope) {
        $scope.pageClass = 'engage';
        $scope.image = 'Engage-cut.png.gif';
        $scope.persons = [
            {type:'', class:'static', delay:0, x:'3%', zIndex:1, size:".3%"},
            {type:'', class:'static', delay:0, x:'5%', zIndex:1, size:".4%"},
            {type:'', class:'static', delay:0, x:'8%', zIndex:2, size:"1%"},
            {type:'', class:'static', delay:0, x:'10%', zIndex:3, size:"2%"},
            {type:'', class:'static', delay:0, x:'5%', zIndex:4, size:"3%"},
            {type:'', class:'static', delay:0, x:'16%', zIndex:20, size:"5%"},,
            {type:'male', class:'static', delay:0, x:'23%', zIndex:6, size:"2.5%"},
            {type:'female', class:'static', delay:0, x:'25%', zIndex:7, size:"3.5%"},
            {type:'female', class:'static goto', delay:0, x:'25%', zIndex:7, size:"3.5%", action:'fb:1400'},
            {type:'female', class:'static', delay:0, x:'35%', zIndex:7, size:"1.2%"},
            {type:'', class:'static', delay:0, x:'45%', zIndex:7, size:".4%"},
            {type:'male', class:'static goto', delay:100, x:'50%', zIndex:5, size:".5%", action:'fb-happy:1800'},
            {type:'', class:'static', delay:500, x:'40%', zIndex:5, size:".3%"},
            {type:'', class:'static goto', delay:1100, x:'30%', zIndex:5, size:".3%", action:'email:1400'},
            {type:'', class:'static goto', delay:1100, x:'32%', zIndex:5, size:".15%", action:'fb-sad:1100'},
            {type:'', class:'static goto', delay:700, x:'35%', zIndex:5, size:".2%"},
            {type:'jenelle1', class:'static goto', delay:1000, x:'33%', zIndex:13, size:"1.8%", action:'fb:1500'},
            {type:'female1', class:'static', delay:400, x:'40%', zIndex:16, size:"3%"},
            {type:'', class:'static', delay:1700, x:'46%', zIndex:5, size:".2%"},
            {type:'male1', class:'static goto', delay:800, x:'46%', zIndex:11, size:"2%", action:'twitter:2000'},
            {type:'veronica1', class:'static goto', delay:2000, x:'48%', zIndex:14, size:"2.5%", action:'fb-happy:1500'},
            {type:'', class:'static', delay:0, x:'45%', zIndex:7, size:".4%"},
            {type:'', class:'static', delay:0, x:'60%', zIndex:1, size:".3%"},
            {type:'', class:'static', delay:0, x:'70%', zIndex:1, size:".3%"},
            {type:'', class:'static', delay:0, x:'80%', zIndex:1, size:".8%"},
            {type:'', class:'static', delay:0, x:'90%', zIndex:1, size:".4%"},
            {type:'', class:'static', delay:0, x:'92%', zIndex:1, size:".6%"},
            {type:'', class:'static', delay:0, x:'96%', zIndex:1, size:".6%"},
            {type:'', class:'static', delay:0, x:'76%', zIndex:1, size:".5%"},
        ];
    }]);
})();

(function() {
    'use strict';

    angular.module('falconio.pages.discover', [
        'falconio.modules.stage'
    ])
    .run(['AppConfig', function(AppConfig) {
        AppConfig.registerRoute({
            slug: '/discover',
            view: 'discover',
            controller: 'discoverController',
            color: '#09d5d9',
            step: 0.18
        });
    }])
    .controller('discoverController', ['$scope', '$rootScope', '$q', '$timeout', function($scope, $rootScope, $q, $timeout) {
        $scope.pageClass = 'discover';
        $scope.image = 'Discover-cut-1.png';
        $scope.persons = [
            {type:'', class:'fadeIn', delay:0, x:'3%', zIndex:1, size:".3%"},
            {type:'', class:'fadeIn', delay:0, x:'5%', zIndex:1, size:".4%"},
            {type:'', class:'fadeIn', delay:0, x:'6%', zIndex:1, size:".44%"},
            {type:'', class:'fadeIn ', delay:0, x:'8%', zIndex:2, size:"1%"},
            {type:'', class:'fadeIn', delay:0, x:'10%', zIndex:3, size:"2%"},
            {type:'', class:'fadeIn', delay:0, x:'5%', zIndex:4, size:"3%"},
            {type:'', class:'fadeIn', delay:0, x:'16%', zIndex:20, size:"5%"},
            {type:'male', class:'fadeIn', delay:0, x:'23%', zIndex:6, size:"2.5%"},
            {type:'female', class:'fadeIn', delay:0, x:'25%', zIndex:7, size:"3.5%"},
            {type:'female', class:'fadeIn', delay:0, x:'35%', zIndex:7, size:"1.2%"},
            {type:'', class:'fadeIn', delay:0, x:'45%', zIndex:7, size:".4%"},
            {type:'', class:'fadeIn', delay:0, x:'60%', zIndex:1, size:".3%"},
            {type:'', class:'fadeIn', delay:0, x:'70%', zIndex:1, size:".3%"},
            {type:'', class:'fadeIn', delay:0, x:'80%', zIndex:1, size:".8%"},
            {type:'', class:'fadeIn', delay:0, x:'90%', zIndex:1, size:".4%"},
            {type:'', class:'fadeIn', delay:0, x:'92%', zIndex:1, size:".6%"},
            {type:'', class:'fadeIn', delay:0, x:'96%', zIndex:1, size:".6%"},
            {type:'', class:'fadeIn', delay:0, x:'76%', zIndex:1, size:".5%"},
        ];
    }]);
})();

(function() {
    'use strict';

    angular.module('falconio.pages.connect', [
        'falconio.appConfig',
        'falconio.modules.person',
        'falconio.modules.sky'
        // 'falconio.modules.media'
    ])
    .run(['AppConfig', function(AppConfig) {
        AppConfig.registerRoute({
            slug: '/connect',
            view: 'connect',
            color: '#11d66d',
            controller:'connectController',
            step: 0.15
        });

        var stage = angular.element('.stage');
        stage.css('transform', 'translateY('+angular.element(window).height()/2+'px)');
    }])
    .controller('connectController', ['$scope', '$timeout', function($scope, $timeout) {
        $scope.pageClass = 'connect';
        $scope.image = 'Connect-cut.png';
        $scope.persons = [
            {type:'', class:'static', delay:0, x:'3%', zIndex:1, size:".3%"},
            {type:'', class:'static', delay:0, x:'5%', zIndex:1, size:".4%"},
            {type:'', class:'static', delay:0, x:'8%', zIndex:2, size:"1%"},
            {type:'', class:'static', delay:0, x:'10%', zIndex:3, size:"2%"},
            {type:'', class:'static', delay:0, x:'5%', zIndex:4, size:"3%"},
            {type:'', class:'static', delay:0, x:'16%', zIndex:20, size:"5%"},,
            {type:'male', class:'static', delay:0, x:'23%', zIndex:6, size:"2.5%"},
            {type:'female', class:'static', delay:0, x:'25%', zIndex:7, size:"3.5%"},
            {type:'female', class:'static falconio', delay:0, x:'25%', zIndex:7, size:"3.5%", action:'fb:1400'},
            {type:'female', class:'static', delay:0, x:'35%', zIndex:7, size:"1.2%"},
            {type:'', class:'static', delay:0, x:'45%', zIndex:7, size:".4%"},
            {type:'male', class:'static falconio', delay:100, x:'50%', zIndex:5, size:".5%", action:'fb-happy:1800'},
            {type:'', class:'static', delay:500, x:'40%', zIndex:5, size:".3%"},
            {type:'', class:'static falconio', delay:1100, x:'30%', zIndex:5, size:".3%", action:'email:1400'},
            {type:'', class:'static falconio', delay:1100, x:'32%', zIndex:5, size:".15%", action:'fb-sad:1100'},
            {type:'', class:'static falconio', delay:700, x:'35%', zIndex:5, size:".2%"},
            {type:'jenelle1', class:'static falconio', delay:1000, x:'33%', zIndex:13, size:"1.8%", action:'fb:1500'},
            {type:'female1', class:'static', delay:400, x:'40%', zIndex:16, size:"3%"},
            {type:'', class:'static', delay:1700, x:'46%', zIndex:5, size:".2%"},
            {type:'male1', class:'static falconio', delay:800, x:'46%', zIndex:11, size:"2%", action:'twitter:2000'},
            {type:'veronica1', class:'static falconio', delay:2000, x:'48%', zIndex:14, size:"2.5%", action:'fb-happy:1500'},
            {type:'', class:'static', delay:0, x:'45%', zIndex:7, size:".4%"},
            {type:'', class:'static', delay:0, x:'60%', zIndex:1, size:".3%"},
            {type:'', class:'static', delay:0, x:'70%', zIndex:1, size:".3%"},
            {type:'', class:'static', delay:0, x:'80%', zIndex:1, size:".8%"},
            {type:'', class:'static', delay:0, x:'90%', zIndex:1, size:".4%"},
            {type:'', class:'static', delay:0, x:'92%', zIndex:1, size:".6%"},
            {type:'', class:'static', delay:0, x:'96%', zIndex:1, size:".6%"},
            {type:'', class:'static', delay:0, x:'76%', zIndex:1, size:".5%"},
        ];

        $(window).resize(function() {
            stage.css('transform', 'translateY('+angular.element(window).height()/2+'px)');
        });

    }]);
})();

(function() {
    'use strict';

    angular.module('falconio.pages.attract', [
        'falconio.modules.sky',
        'falconio.modules.computer'
    ])
    .run(['AppConfig', function(AppConfig) {
        AppConfig.registerRoute({
            slug: '/attract',
            view: 'attract',
            controller: 'attractController',
            color: '#f7bf16',
            step: 0.18
        });
    }])
    .controller('attractController', ['$rootScope', '$scope', function($rootScope, $scope) {
        $scope.pageClass = 'attract';
        $scope.image = 'Attract-cut.png';

        angular.element('.sky').fadeIn(500);
        angular.element('.circles').fadeIn(500);
        $scope.persons = [
            {type:'', class:'static', delay:0, x:'3%', zIndex:1, size:".3%"},
            {type:'', class:'static', delay:0, x:'5%', zIndex:1, size:".4%"},
            {type:'', class:'static', delay:0, x:'6%', zIndex:1, size:".44%"},
            {type:'', class:'static ', delay:0, x:'8%', zIndex:2, size:"1%"},
            {type:'', class:'static', delay:0, x:'10%', zIndex:3, size:"2%"},
            {type:'', class:'static', delay:0, x:'5%', zIndex:4, size:"3%"},
            {type:'', class:'static', delay:0, x:'16%', zIndex:20, size:"5%"},
            {type:'male', class:'static', delay:0, x:'23%', zIndex:6, size:"2.5%"},
            {type:'female', class:'static', delay:0, x:'25%', zIndex:7, size:"3.5%"},
            {type:'female', class:'static', delay:0, x:'35%', zIndex:7, size:"1.2%"},
            {type:'', class:'static', delay:0, x:'45%', zIndex:7, size:".4%"},
            {type:'male', class:'', delay:100, x:'50%', zIndex:5, size:".5%", animate:'shootBlur'},
            {type:'', class:'', delay:500, x:'40%', zIndex:5, size:".3%", animate:'shootBlur'},
            {type:'', class:'', delay:1100, x:'30%', zIndex:5, size:".3%", animate:'shootBlur'},
            {type:'', class:'', delay:1100, x:'32%', zIndex:5, size:".15%", animate:'shootBlur'},
            {type:'', class:'', delay:700, x:'35%', zIndex:5, size:".2%", animate:'shootBlur'},
            {type:'', class:'', delay:1700, x:'46%', zIndex:5, size:".2%", animate:'shootBlur'},
            {type:'jenelle1', class:'', delay:1000, x:'33%', zIndex:13, size:"1.8%", animate:'shootBlur'},
            {type:'female1', class:'', delay:400, x:'40%', zIndex:16, size:"3%", animate:'shootBlur'},
            {type:'male1', class:'', delay:800, x:'46%', zIndex:11, size:"2%", animate:'shootBlur'},
            {type:'veronica1', class:'', delay:2000, x:'48%', zIndex:14, size:"2.5%", animate:'shootBlur'},
            {type:'', class:'static', delay:0, x:'45%', zIndex:7, size:".4%"},
            {type:'', class:'static', delay:0, x:'60%', zIndex:1, size:".3%"},
            {type:'', class:'static', delay:0, x:'70%', zIndex:1, size:".3%"},
            {type:'', class:'static', delay:0, x:'80%', zIndex:1, size:".8%"},
            {type:'', class:'static', delay:0, x:'90%', zIndex:1, size:".4%"},
            {type:'', class:'static', delay:0, x:'92%', zIndex:1, size:".6%"},
            {type:'', class:'static', delay:0, x:'96%', zIndex:1, size:".6%"},
            {type:'', class:'static', delay:0, x:'76%', zIndex:1, size:".5%"},
        ];

        // $timeout(function() {
        //     angular.element('.computer .inner').attr('src', '/flo/assets/images/Attract-cut.png');
        // });
    }]);
})();

(function() {
    'use strict';

    angular.module('falconio.modules.circles', [])
    .directive('circles', [function() {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: '/flo/modules/circles/circles.html',
            link: function(scope, element, attrs) {
                angular.forEach(element.find('.circle'), function(item) {
                    var circle = angular.element(item);

                    circle.on('click', function() {
                        var color = circle.data('i')

                    })
                });
            }
        };
    }]);
})();

(function() {
    'use strict';

    angular.module('falconio.modules.computer', [])
    .directive('computer', [function() {
        return {
            templateUrl: "/flo/modules/computer/computer.html",
            replace: true,
            link: function(scope, element, attrs) {

            }
        };
    }]);
})();

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

(function() {
    'use strict';

    angular.module('falconio.modules.navigation', [])
    .controller('navigationController', ['$scope', 'AppConfig', function($scope, AppConfig) {
        $scope.routes = AppConfig.getRoutes();
    }]);
})();

(function() {
    'use strict';

    angular.module('falconio.modules.media', [])
    .directive('media', ['$timeout', '$q', function($timeout, $q) {
        return {
            templateUrl: '/flo/modules/media/media.html',
            replace: true,
            scope: {},
            link: function(scope, element, attrs) {
                scope.type = attrs.type;

                if (attrs.group.length && attrs.delay.length) {
                    $timeout(function() {
                        var group = angular.element('.person[group="'+attrs.group+'"]');
                        var sending = group.find('.sending');
                        var computer = angular.element('.computer');

                        $q.when()
                        .then(function() {
                            var height =parseInt(attrs.top, 10)- element.height();

                            element.css({
                                zIndex: attrs.zindex,
                                width: attrs.size,
                                left: attrs.left+'px'
                            });

                            element.css({
                                top: (parseInt(attrs.top, 10)-element.height()*1.5)+'px'
                            });
                        })
                        .then(function() {
                            var defer = $q.defer();

                            sending.fadeIn(100, function() {
                                defer.resolve();
                            });

                            return defer.promise;
                        })
                        .then(function(data) {
                            var defer = $q.defer();

                            element.fadeIn(500, function() {
                                defer.resolve();
                            });

                            return defer.promise;
                        })
                        .then(function() {
                            var defer = $q.defer();

                            sending.fadeOut(300);
                            element.animate({
                                'top': '0%',
                                'width': '2.5%',
                            }, 1000, function() {
                                defer.resolve();
                            });

                            return defer.promise;
                        })
                        .then(function() {
                            var defer = $q.defer();

                            element.addClass('circulate');

                            return defer.promise;
                        })

                        if (element.hasClass('falconio')) {
                            $q.when()
                            .then(function() {
                                var defer = $q.defer();

                                $timeout(function() {
                                    angular.element('.incoming').animate({
                                        'opacity': 1
                                    }, 100, function() {
                                        defer.resolve();
                                    });
                                }, 2000);

                                return defer.promise;
                            })
                            .then(function() {
                                var defer = $q.defer();

                                $timeout(function() {
                                    element.animate({
                                        'width': '6%',
                                        'top': computer.offset().top+'px',
                                        'left': computer.offset().left+'px'
                                    }, 1000, function() {
                                        defer.resolve();
                                    });
                                }, 1000);

                                return defer.promise;
                            })
                            .then(function() {
                                var defer = $q.defer();

                                element.fadeOut(300, function() {
                                    defer.resolve();
                                });

                                return defer.promise;
                            })
                            .then(function() {
                                var defer = $q.defer();

                                $timeout(function() {
                                    angular.element('.incoming').animate({
                                        'opacity': 0
                                    }, 100, function() {
                                        defer.resolve();
                                    });
                                }, 1000);

                                return defer.promise;
                            });
                        }

                        if (element.hasClass('goto')) {
                            var items = angular.element('div.person.goto').not(this);
                            var goto = angular.element(items[Math.floor(Math.random()*items.length)]);

                            $timeout(function() {
                                element.animate({
                                    'opacity': 0,
                                    'top': goto.offset().top+'px',
                                    'left': goto.offset().left+'px'
                                }, 1500);
                            }, 3000);
                        }
                    }, attrs.delay);
                }

                $(window).resize(function() {
                    var group = angular.element('.person[group="'+attrs.group+'"]');

                    var position = group.position();

                    element.css({
                        zIndex: attrs.zindex,
                        width: attrs.size,
                        left: attrs.left+'px',
                        top: position.top-element.height()+'px'
                    });
                });
            }
        };
    }]);
})();

(function() {
    'use strict';

    angular.module('falconio.modules.person', [
        'falconio.modules.media'
    ])
    .directive('person', ['$timeout', '$compile', function($timeout, $compile) {
        return {
            templateUrl: '/flo/modules/person/person.html',
            replace: true,
            scope:{},
            link: function(scope, element, attrs) {
                try {
                    scope.type = attrs.type;

                    if (attrs.animate.length) {
                        $timeout(function() {
                            element.css({
                                zIndex: (1000+parseInt(attrs.zIndex, 10)),
                                width: attrs.size,
                                left: attrs.x
                            });
                            element.addClass('animate ' + attrs.animate);
                        }, attrs.delay);
                    } else {
                        element.css({
                            zIndex: (1000+parseInt(attrs.zIndex, 10)),
                            width: attrs.size,
                            left: attrs.x
                        });
                    }

                    if ('action' in attrs && attrs.action.length) {
                        var action = attrs.action.split(':');
                        var position = element.position();
                        var mediaContainer = angular.element('.media-container');

                        mediaContainer.append($compile(
                            angular.element('<media/>')
                            .addClass(attrs.class)
                            .attr('type', action[0])
                            .attr('delay', action[1])
                            .attr('left', position.left)
                            .attr('top', position.top)
                            .attr('size', attrs.size)
                            .attr('zIndex', attrs.zIndex)
                            .attr('group', attrs.group)
                        )(scope));
                    }
                } catch (e) {}
            }
        };
    }]);
})();

(function() {
    'use strict';

    angular.module('falconio.modules.sky', [])
    .directive('sky', [function() {
        return {
            templateUrl: '/flo/modules/sky/sky.html',
            replace: true,
            link: function(scope, element, attrs) {
                // alert('sky');
            }
        };
    }]);
})();

(function() {
    'use strict';

    angular.module('falconio.modules.stage', [])
    .directive('stage', [function() {
        return {
            restrict: 'C',
            link: function(scope, element, attrs) {
                element.css('transform', 'translateY('+angular.element(window).height()/2+'px)');

                var cloud = angular.element('.media-cloud');
                // var mc = angular.element('.media-container');

                if (cloud.length) {
                    cloud.css('transform', 'translateY('+(-(angular.element(window).height())/2)+'px)');
                }

                // 
                // var supportsOrientationChange = "onorientationchange" in window,
                //     orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
                //
                // window.addEventListener(orientationEvent, function() {
                //     alert('HOLY SCREENS BATMAN:' + window.orientation + " " + screen.width);
                // }, false);

                $(window).resize(function() {
                    element.css('transform', 'translateY('+angular.element(window).height()/2+'px)');

                    if (cloud.length) {
                        // cloud.css('transform', 'translateY('+(-(angular.element(window).height())/1.5)+'px)');
                    }
                });
            }
        };
    }]);
})();
