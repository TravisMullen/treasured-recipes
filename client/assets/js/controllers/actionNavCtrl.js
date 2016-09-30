// info: http://foundation.zurb.com/apps/docs/#!/angular
function actionNavCtrl( $scope, $state, $timeout, recipeService ) {
    'use strict';
    $scope.$watchCollection( function() {
        return $state.params;
    }, function( p ) {
        // if (p.slug === 'beef-stew') {
        if ( p.slug ) {
            recipeService.get( p.slug ).then( function() {
                recipeService.next( p.slug ).then( function( res ) {
                    $scope.next = res;
                });
                recipeService.prev( p.slug ).then( function( res ) {
                    $scope.prev = res;
                });
            });
            $timeout( function() {
                $scope.showNav = true;
            }, 1000 );

        } else {
            $scope.showNav = false;
        }
    });
}

angular.module( 'TreasuredRecipesApp.controllers' )
    .controller( 'actionNavCtrl', actionNavCtrl );


actionNavCtrl.$inject = [ '$scope', '$state', '$timeout', 'recipeService' ];
