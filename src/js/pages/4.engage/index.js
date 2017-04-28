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
            step:  0.16
        });
    }])
    .controller('engageController', ['$scope', function($scope) {
        $scope.pageClass = 'engage';
        $scope.image = 'Engage-cut.png.gif';
        $scope.persons = [
            {type: '', class: 'static', delay: 0, x: '3%', zIndex: 1, size: ".3%"},
            {type: '', class: 'static', delay: 0, x: '5%', zIndex: 1, size: ".4%"},
            {type: '', class: 'static', delay: 0, x: '8%', zIndex: 2, size: "1%"},
            {type: '', class: 'static', delay: 0, x: '10%', zIndex: 3, size: "2%"},
            {type: '', class: 'static', delay: 0, x: '5%', zIndex: 4, size: "3%"},
            {type: '', class: 'static', delay: 0, x: '16%', zIndex: 20, size: "5%"},,
            {type: 'male', class: 'static', delay: 0, x: '23%', zIndex: 6, size: "2.5%"},
            {type: 'female', class: 'static', delay: 0, x: '25%', zIndex: 7, size: "3.5%"},
            {type: 'female', class: 'static goto', delay: 0, x: '25%', zIndex: 7, size: "3.5%", action: 'fb: 1400'},
            {type: 'female', class: 'static', delay: 0, x: '35%', zIndex: 7, size: "1.2%"},
            {type: '', class: 'static', delay: 0, x: '45%', zIndex: 7, size: ".4%"},
            {type: 'male', class: 'static goto', delay: 100, x: '50%', zIndex: 5, size: ".5%", action: 'fb-happy: 1800'},
            {type: '', class: 'static', delay: 500, x: '40%', zIndex: 5, size: ".3%"},
            {type: '', class: 'static goto', delay: 1100, x: '30%', zIndex: 5, size: ".3%", action: 'email: 1400'},
            {type: '', class: 'static goto', delay: 1100, x: '32%', zIndex: 5, size: ".15%", action: 'fb-sad: 1100'},
            {type: '', class: 'static goto', delay: 700, x: '35%', zIndex: 5, size: ".2%"},
            {type: 'jenelle1', class: 'static goto', delay: 1000, x: '33%', zIndex: 13, size: "1.8%", action: 'fb: 1500'},
            {type: 'female1', class: 'static', delay: 400, x: '40%', zIndex: 16, size: "3%"},
            {type: '', class: 'static', delay: 1700, x: '46%', zIndex: 5, size: ".2%"},
            {type: 'male1', class: 'static goto', delay: 800, x: '46%', zIndex: 11, size: "2%", action: 'twitter: 2000'},
            {type: 'veronica1', class: 'static goto', delay: 2000, x: '48%', zIndex: 14, size: "2.5%", action: 'fb-happy: 1500'},
            {type: '', class: 'static', delay: 0, x: '45%', zIndex: 7, size: ".4%"},
            {type: '', class: 'static', delay: 0, x: '60%', zIndex: 1, size: ".3%"},
            {type: '', class: 'static', delay: 0, x: '70%', zIndex: 1, size: ".3%"},
            {type: '', class: 'static', delay: 0, x: '80%', zIndex: 1, size: ".8%"},
            {type: '', class: 'static', delay: 0, x: '90%', zIndex: 1, size: ".4%"},
            {type: '', class: 'static', delay: 0, x: '92%', zIndex: 1, size: ".6%"},
            {type: '', class: 'static', delay: 0, x: '96%', zIndex: 1, size: ".6%"},
            {type: '', class: 'static', delay: 0, x: '76%', zIndex: 1, size: ".5%"},
        ];
    }]);
})();
