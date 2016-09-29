// info: http://foundation.zurb.com/apps/docs/#!/angular
'use strict';

function recipeCtrl( $q, $scope, $stateParams, $state, $timeout, $interval, $window,
    recipeService, attachmentService, animateScroll ) {
    
    // animateScroll.run('.stage', '[ng-click="print(document)"]').then(function(res) {
    //     // console.log("res", res);
    //     // if (res) {
    //     //     console.log("animation complete!");
    //     // }
    // });
    $scope.$on( '$destroy', function() {
        animateScroll.cancel();
    });



    $scope.print = window.print;
    $scope.ingredients = [];
    if ( $stateParams.slug ) {
        recipeService.get( $stateParams.slug ).then( function( recipe ) {
            $scope.recipe = recipe;

            attachmentService.getAttachmentsByRecipe( $scope.recipe.id ).then( function( results ) {
                $scope.attachments = results;
            });

            recipeService.next( $stateParams.slug ).then( function( next ) {
                $scope.next = next;
                // preload for next 
                attachmentService.getAttachmentsByRecipe( $scope.next.id );

            });
            recipeService.prev( $stateParams.slug ).then( function( prev ) {
                $scope.prev = prev;
                // preload for prev 
                attachmentService.getAttachmentsByRecipe( $scope.prev.id );
            });
        }, function() {
            $state.go( '404' );
        });
    } else {
        recipeService.last().then( function( res ) {
            $state.go( 'recipe', { slug : res.slug });
        });
    }

}

angular.module( 'TreasuredRecipesApp.controllers' )
    .controller( 'recipeCtrl', recipeCtrl );

recipeCtrl.$inject = [
    '$q',
    '$scope',
    '$stateParams',
    '$state',
    '$timeout',
    '$interval',
    '$window',

    'recipeService',
    'attachmentService',
    'animateScroll'
];
