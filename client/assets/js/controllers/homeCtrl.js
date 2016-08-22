// info: http://foundation.zurb.com/apps/docs/#!/angular
'use strict';
angular.module('application.controllers')
    .controller('homeCtrl', homeCtrl);


function homeCtrl($scope, $state) {
    $scope.farts = 'load';
    $scope.gotoRecipes = function() {
        $state.go('recipe');
    };


}

homeCtrl.$inject = ['$scope', '$state'];
//     .controller('AutomationCtrl', ['$state', '$rootScope', function($state, $rootScope) {

//         var auto = this; 
//         // auto.s = $state;
//         console.log("auto.$state",auto.$state);
//         console.log("$state.current.name ",$state.current.name );
//         auto.$state = $state.current.name; // for ng-switch
//         if ($state.current.name === 'auto') {
//             $state.go('auto.landing');
//         }

//         $rootScope.$on('$stateChangeStart',
//             function(event, toState, toParams, fromState) {
//                 // event.preventDefault(); 
//                 // console.log("scope.$previousState",scope.$previousState);
                
//                 // console.log("$state.current.name",$state.current.name);
//                 auto.$state = toState.name;
//                 // console.log("scope.$previousState",scope.$previousState);
//             });
        
//         auto.disclaimer = {
//             optin: false
//         };

//         // auto.accept = false;

//         // auto.disclaimer = 'You have unlock a hidden a hidden section. The <code>url</code> for this page was generated at random will not be accessible once you close the application.' + 
//         // 'Deep v craft beer venmo, raw denim chambray duis sustainable artisan fugiat knausgaard portland sapiente adipisicing. Actually pariatur cold-pressed consectetur YOLO. Pinterest quis nesciunt, normcore kale chips enim health goth schlitz DIY pickled. Exercitation typewriter cred velit trust fund chia cupidatat. Kombucha semiotics brooklyn assumenda, kale chips yuccie small batch do velit eiusmod. Accusamus photo booth odio polaroid, meggings commodo actually mollit lumbersexual fixie squid eu flexitarian cray. DIY literally craft beer, fingerstache hella nesciunt fap before they sold out pabst drinking vinegar leggings fashion axe.';

//     }]);