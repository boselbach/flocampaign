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
