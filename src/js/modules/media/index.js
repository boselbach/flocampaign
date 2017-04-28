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
