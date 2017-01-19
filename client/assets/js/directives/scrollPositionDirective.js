// angular.module('TreasuredRecipesApp.scrollpos', [])
//     .directive("scrollPosition", function($window) {
//         return {
//             restrict: 'A',
//             // scope: {
//             //     stateClass: '='
//             // },
//             // controller
//             controllerAs: '$scrollPositionCtrl',
//             controller: ['$scope', '$rootScope', '$element', '$window'
//                 function scrollPositionCtrl(scope, element, attrs, $window ) {
//                     var config = {
//                         stageView: '',
//                         targetToView: ''
//                     };
//                     angular.element($window).bind("scroll", function() {
//                         if (this.pageYOffset >= 20) {
//                             scope.boolChangeClass = true;
//                             console.log('Scrolled below header.');
//                         } else {
//                             scope.boolChangeClass = false;
//                             console.log('Header is in view.');
//                         }
//                         scope.$digest();
//                     });
//                 }
//             ]
//         };
//     });
