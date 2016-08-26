// http://stackoverflow.com/questions/17884399/image-loaded-event-in-for-ng-src-in-angularjs
// 
// 'use strict';
// angular.module('application.components')
//     .directive("onImageload", ["$timeout", function($timeout) {

//     function timeOut(value, scope) {
//         $timeout(function() {
//             scope.imageLoaded = value;
//         });
//     }

//     return {
//         restrict: 'A',
//         link: function(scope, element, attrs) {
//             // element.bind('load', function() {
//             //     timeOut(true, scope);
//             // }).bind('error', function() {
//             //     timeOut(false, scope);
//             // });
//             // 
//             // 
//              element.bind('load', function() {
//                 alert('image is loaded');
//             });
//             element.bind('error', function(){
//                 alert('image could not be loaded');
//             });
//         }
//     };

// }]);