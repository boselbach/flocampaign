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
