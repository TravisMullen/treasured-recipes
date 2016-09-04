// // info: http://foundation.zurb.com/apps/docs/#!/angular
// 'use strict';
// angular.module('application.controllers')
//     .controller('backgroundCtrl', backgroundCtrl);


// function backgroundCtrl($scope, $state) {
//     var classTarget = $scope.stateClass || 'classList',
//         activeClasses = [];

//     $scope.$watch(function() {
//         return $state.current.data;
//     }, function(res) {
//         if (res) {
//             if (res[classTarget] && res[classTarget].length) {
//                 for (var i = activeClasses.length - 1; i >= 0; i--) {
//                     var old = activeClasses[i];
//                     $element.removeClass(old);
//                 }
//                 for (var j = $state.current.data[classTarget].length - 1; j >= 0; j--) {
//                     var name = $state.current.data[classTarget][j];
//                     activeClasses.push(name);
//                     $element.addClass(name);
//                 }
//             }
//         }
//     });

// }

// backgroundCtrl.$inject = ['$scope', '$state'];
