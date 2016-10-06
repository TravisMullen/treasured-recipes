// // info: http://foundation.zurb.com/apps/docs/#!/angular
// function actionNavCtrl( $scope, $state, $timeout, recipeService, animateScroll ) {
//     'use strict';
//     $scope.$watchCollection( function() {
//         return $state.params;
//     }, function( p ) {
//         // if (p.slug === 'beef-stew') {
//         // 
//         // 
//         if ( p.slug ) {
//             recipeService.get( p.slug ).then( function() {


//                 recipeService.next( p.slug ).then( function( res ) {
//                     $scope.next = res;
//                 });
//                 recipeService.prev( p.slug ).then( function( res ) {
//                     $scope.prev = res;
//                 });


//                 animateScroll.listen().then( function( res ) {
//                     console.log( 'res', res );
//                     if ( res === 'complete' ) {
//                         $scope.showNav = true;
//                     }
//                 });
//             });
//             // $timeout( function() {
//             //     $scope.showNav = true;
//             // }, 1000 );

//         } else {
//             $scope.showNav = false;
//         }
//     });
// }

// angular.module( 'TreasuredRecipesApp.actionNavCtrl' )
//     .controller( 'actionNavCtrl', actionNavCtrl );


// actionNavCtrl.$inject = [ '$scope', '$state', '$timeout', 'recipeService', 'animateScroll' ];
