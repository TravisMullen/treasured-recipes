'use strict';

// Declare app level module which depends on views, and components
angular.module( 'TreasuredRecipesApp', [

    'ui.router',

    'TreasuredRecipesApp.mainView',

    'TreasuredRecipesApp.searchView',
    'TreasuredRecipesApp.recipeView',

    'TreasuredRecipesApp.actionNav',
    'TreasuredRecipesApp.attachmentsView',
    // 'TreasuredRecipesApp.imageView',
    // 
    'TreasuredRecipesApp.stateClass',

    'TreasuredRecipesApp.version'
] ).
config( [ '$locationProvider', '$urlRouterProvider', function( $locationProvider, $urlProvider ) {
    $locationProvider.hashPrefix( '!' );

    $locationProvider.html5Mode({
        enabled : false,
        requireBase : false
    });

    $urlProvider.otherwise( '/catalog/loading' );

} ] );
