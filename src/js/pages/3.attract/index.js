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
    }]);
})();
