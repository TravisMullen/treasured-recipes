'use strict';

angular.module( 'TreasuredRecipesApp.recipeView', [ 
        'ui.router',
		'TreasuredRecipesApp.recipeService', 
		'TreasuredRecipesApp.attachmentService', 
		'TreasuredRecipesApp.animateScroll', 
        'TreasuredRecipesApp.templates'
	] )

.config( [ '$stateProvider', function( $stateProvider ) {
    $stateProvider.state( 'recipe', {
        url : '/recipe/:slug',
        templateUrl : 'recipeView/recipeView.html',
        controller : 'recipeViewCtrl'
    });
} ] )

.controller( 'recipeViewCtrl', [
	'$q',
    '$scope',
    '$stateParams',
    '$state',
    '$timeout',
    '$interval',
    '$window',

    'recipeService',
    'attachmentService',
    'AnimateScrollService',
    function( $q, $scope, $stateParams, $state, $timeout, $interval, $window,
    recipeService, attachmentService, animateScroll ) {

    animateScroll.run( '.stage', '[ng-click="print(document)"]' ).then( function( res ) {
        if ( res ) {
            console.log( 'animation complete!' );
            $scope.animateScrollComplete = true;
        }
    });
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
} ] );
