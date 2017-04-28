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
